export type MergeHandlerArguments<T = any> = {
	key: string;
	currentValue: T;
	value: T;
	setValue: (newValue: T) => void;
};

export type MergeHandler<T = any> = (
	req: MergeHandlerArguments<T>,
	storage: Record<any, any>,
) => T;

export type HandlerObjectLifecycleStart<T = any> = (
	objects: T[],
	storage: Record<any, any>,
) => void;
export type HandlerObjectLifecycleEnd<T = any> = (
	result: T,
	storage: Record<any, any>,
) => void;

export type MergeHandlerObject<T = any> = {
	fn: MergeHandler<T>;
	onStart?: HandlerObjectLifecycleStart<T>;
	onEnd?: HandlerObjectLifecycleEnd<T>;
};

type HandlerRegistryEntry<T> = {
	handler: MergeHandler<T>;
	storage: Record<any, any>;
	source?: MergeHandlerObject<T>;
};

// TODO: implement option to select strategy between depth/breadth
/**
 * Constructor of merge function
 */
export const configure = <V = any, PGen extends {} = {}>({
	handlers,
}: {
	handlers: (MergeHandler<V> | MergeHandlerObject<V>)[];
}) => {
	const mergeFn = <P extends PGen>(...args: (P | undefined)[]): P => {
		// Initialization
		const handlersRegistry: HandlerRegistryEntry<V>[] = [];
		handlers.forEach((handler) => {
			const storage = {};

			if (typeof handler === 'function') {
				// Simply handler
				handlersRegistry.push({
					handler,
					storage,
				});
			} else {
				// Complexity handler
				if (handler.onStart !== undefined) {
					handler.onStart((args as unknown) as V[], storage);
				}

				handlersRegistry.push({
					handler: handler.fn,
					storage,
					source: handler,
				});
			}
		});

		// Main
		const emptyValueSymbol = {};
		const mergedObject = args.reduce((acc, obj) => {
			// Skip undefined objects
			if (obj === undefined) {
				return acc;
			}

			// Iterate properties of object
			for (const key of Object.keys(obj)) {
				const accProp = (acc as P)[key as keyof P];
				const objProp = obj[key as keyof P];

				// Iterate handlers
				for (const handlerEntry of handlersRegistry) {
					let value: any = emptyValueSymbol;
					const setValue = (newValue: V) => {
						value = newValue;
					};

					const { handler, storage } = handlerEntry;

					handler(
						{
							key,
							currentValue: (accProp as unknown) as V,
							value: (objProp as unknown) as V,
							setValue,
						},
						storage,
					);

					// Skip handler which is not set value
					if (value === emptyValueSymbol) continue;

					// Set value value and break
					(acc as P)[key as keyof P] = value;
					break;
				}
			}

			return acc;
		}, {} as P);

		// End
		handlersRegistry.forEach((handlerEntry) => {
			const { source, storage } = handlerEntry;

			if (source === undefined) return;

			const { onEnd } = source;

			if (onEnd !== undefined) {
				onEnd((mergedObject as unknown) as V, storage);
			}
		});

		return mergedObject as P;
	};

	return mergeFn;
};
