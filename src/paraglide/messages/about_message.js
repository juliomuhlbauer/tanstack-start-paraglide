// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_about_message = /** @type {(inputs: {}) => string} */ () => {
	return `About message`
};

const de_about_message = /** @type {(inputs: {}) => string} */ () => {
	return `Über uns`
};

/**
* This function has been compiled by [Paraglide JS](https://inlang.com/m/gerre34r).
*
* - Changing this function will be over-written by the next build.
*
* - If you want to change the translations, you can either edit the source files e.g. `en.json`, or
* use another inlang app like [Fink](https://inlang.com/m/tdozzpar) or the [VSCode extension Sherlock](https://inlang.com/m/r7kp499g).
* 
* @param {{}} inputs
* @param {{ locale?: "en" | "de" }} options
* @returns {string}
*/
/* @__NO_SIDE_EFFECTS__ */
export const about_message = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.about_message(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("about_message", locale)
	if (locale === "en") return en_about_message(inputs)
	return de_about_message(inputs)
};