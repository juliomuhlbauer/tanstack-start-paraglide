// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_example_message = /** @type {(inputs: { username: NonNullable<unknown> }) => string} */ (i) => {
	return `Hello world ${i.username}`
};

const de_example_message = /** @type {(inputs: { username: NonNullable<unknown> }) => string} */ (i) => {
	return `Guten Tag ${i.username}`
};

/**
* This function has been compiled by [Paraglide JS](https://inlang.com/m/gerre34r).
*
* - Changing this function will be over-written by the next build.
*
* - If you want to change the translations, you can either edit the source files e.g. `en.json`, or
* use another inlang app like [Fink](https://inlang.com/m/tdozzpar) or the [VSCode extension Sherlock](https://inlang.com/m/r7kp499g).
* 
* @param {{ username: NonNullable<unknown> }} inputs
* @param {{ locale?: "en" | "de" }} options
* @returns {string}
*/
/* @__NO_SIDE_EFFECTS__ */
export const example_message = (inputs, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.example_message(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("example_message", locale)
	if (locale === "en") return en_example_message(inputs)
	return de_example_message(inputs)
};