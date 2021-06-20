type Callback<T> = (value: T) => void;

/**
 * Simple event channel to send and handle messages
 */
export class SimpleEventChannel<T> {
	protected handlers: Set<Callback<T>> = new Set();

	public subscribe = (fn: Callback<T>) => {
		this.handlers.add(fn);
	};

	public unsubscribe = (fn: Callback<T>) => {
		this.handlers.delete(fn);
	};

	public send = (value: T) => {
		this.handlers.forEach((handler) => handler(value));
	};
}
