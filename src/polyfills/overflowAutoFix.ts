const getSize = (node: HTMLElement) => ({
	x: node.scrollWidth - node.clientWidth,
	y: node.scrollHeight - node.clientHeight,
});

const handleNode = (
	node: HTMLElement,
	callback: (obj: { x: number; y: number }) => void,
) => {
	const size = getSize(node);
	if (size.y > 0 && size.x == 0) {
		requestAnimationFrame(() => {
			const newSize = getSize(node);

			if (newSize.x > 0) {
				callback(newSize);
			}
		});
	} else {
		callback(size);
	}
};

/**
 * Tool for correction a size of elements with `overflow: auto`
 *
 * This tool detect resize of element and call user handler with calculated X and Y indents
 *
 * WARNING: to avoid memory leaks you must call a clean function when element removed from DOM or when you want stop handling
 * Return cleanup function that is stop a observing
 *
 * Original bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1424328
 */
export const overflowAutoFix = (
	wrapper: HTMLElement,
	callback: (obj: { x: number; y: number }) => void,
) => {
	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			const node = entry.target;
			if (!(node instanceof HTMLElement) || node !== wrapper) continue;

			handleNode(node, callback);
		}
	});

	observer.observe(wrapper);

	return () => observer.disconnect();
};
