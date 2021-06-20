const Module = require('module');

/**
 * Return empty string for import css files
 */
Module.prototype.require = new Proxy(Module.prototype.require, {
	apply(target, thisArg, args) {
		if (/\.(css)$/.test(args[0])) {
			return '';
		}

		return Reflect.apply(target, thisArg, args);
	},
});
