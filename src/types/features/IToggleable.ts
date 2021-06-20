/**
 * Interface of togglable component
 *
 * Implement it if you need a switch of on/off state
 */
export interface IToggleable {
	/**
	 * Opened state
	 */
	opened?: boolean;

	/**
	 * Opened state setter
	 */
	setOpened?: (newState: boolean) => void;
}
