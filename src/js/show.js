import Hammer from 'hammerjs';
import animations from './animations'
import {toastObject} from './object'
const uuid = require('shortid');

let _options = {};
let _instance = null;
/**
 * parse Options
 *
 * @param options
 * @returns {{el: *, text: text, goAway: goAway}}
 */
const parseOptions = function (options) {

	// class name to be added on the toast
	options.className = options.className || null;

	// complete call back of the toast
	options.onComplete = options.onComplete || null;

	// toast position
	options.position = options.position || "top-right";

	// toast duration
	options.duration = options.duration || null;

	// keep toast open on mouse over
	options.keepOnHover = options.keepOnHover || false;

	// normal type will allow the basic color
	options.theme = options.theme || "toasted-primary";

	// normal type will allow the basic color
	options.type = options.type || "default";

	// class name to be added on the toast container
	options.containerClass = options.containerClass || null;

	// check if the fullWidth is enabled
	options.fullWidth = options.fullWidth || false;

	// get icon name
	options.icon = options.icon || null;

	// get action name
	options.action = options.action || null;

	// check if the toast needs to be fitted in the screen (no margin gap between screen)
	options.fitToScreen = options.fitToScreen || null;

	// check if closes the toast when the user swipes it
	options.closeOnSwipe = typeof options.closeOnSwipe !== 'undefined' ? options.closeOnSwipe : true;

	// get the icon pack name. defaults to material
	options.iconPack = options.iconPack || 'material';

	/* transform options */

	// toast class
	if (options.className && typeof(options.className) === "string") {
		options.className = options.className.split(' ');
	}

	if (!options.className) {
		options.className = [];
	}

	(options.theme) && options.className.push(options.theme.trim());
	(options.type) && options.className.push(options.type);


	// toast container class
	if (options.containerClass && typeof(options.containerClass) === "string") {
		options.containerClass = options.containerClass.split(' ');
	}

	if (!options.containerClass) {
		options.containerClass = [];
	}

	(options.position) && options.containerClass.push(options.position.trim());
	(options.fullWidth) && options.containerClass.push('full-width');
	(options.fitToScreen) && options.containerClass.push('fit-to-screen');

	_options = options;
	return options;
};


const createToast = function (html, options) {

	// Create toast
	let toast = document.createElement('div');
	toast.classList.add('toasted');

	// set unique identifier
	toast.hash = uuid.generate();

	if (options.className) {
		options.className.forEach((className) => {
			toast.classList.add(className);
		});
	}

	// If type of parameter is HTML Element
	if (typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName === "string"
	) {
		toast.appendChild(html);
	}
	else {
		// Insert as text;
		toast.innerHTML = html;
	}

	// add material icon if available
	createIcon(options, toast);


	if (options.closeOnSwipe) {
		// Bind hammer
		let hammerHandler = new Hammer(toast, {prevent_default: false});
		hammerHandler.on('pan', function (e) {
			let deltaX = e.deltaX;
			let activationDistance = 80;

			// Change toast state
			if (!toast.classList.contains('panning')) {
				toast.classList.add('panning');
			}

			let opacityPercent = 1 - Math.abs(deltaX / activationDistance);
			if (opacityPercent < 0)
				opacityPercent = 0;

			animations.animatePanning(toast, deltaX, opacityPercent)

		});

		hammerHandler.on('panend', function (e) {
			let deltaX = e.deltaX;
			let activationDistance = 80;

			// If toast dragged past activation point
			if (Math.abs(deltaX) > activationDistance) {

				animations.animatePanEnd(toast, function () {
					if (typeof(options.onComplete) === "function") {
						options.onComplete();
					}

					if (toast.parentNode) {
						_instance.remove(toast);
					}
				})

			} else {
				toast.classList.remove('panning');
				// Put toast back into original position
				animations.animateReset(toast)

			}
		});
	}

	// create and append actions
	if (Array.isArray(options.action)) {
		options.action.forEach((action) => {
			let el = createAction(action, toastObject(toast, _instance));
			if (el) toast.appendChild(el)
		})
	}
	else if (typeof options.action === 'object') {
		let action = createAction(options.action, toastObject(toast, _instance));
		if (action) toast.appendChild(action)
	}

	return toast;
};

const createIcon = (options, toast) => {

	// add material icon if available
	if (options.icon) {

		let iel = document.createElement('i');
		iel.setAttribute('aria-hidden', 'true');

		switch (options.iconPack) {
			case 'fontawesome' :

				iel.classList.add('fa');

				let faName = (options.icon.name) ? options.icon.name : options.icon;

				if(faName.includes('fa-')) {
					iel.classList.add(faName.trim());
				}
				else {
					iel.classList.add('fa-' + faName.trim());
				}

				break;
			case 'mdi':

				iel.classList.add('mdi');

				let mdiName = (options.icon.name) ? options.icon.name : options.icon;

				if (mdiName.includes('mdi-')) {
					iel.classList.add(mdiName.trim());
				}
				else {
					iel.classList.add('mdi-' + mdiName.trim());
				}

				break;
			case 'custom-class':

				let classes = (options.icon.name) ? options.icon.name : options.icon;

				if (typeof classes === 'string') {
					classes.split(' ').forEach((className) => {
						iel.classList.add(className)
					})
				}
				else if (Array.isArray(classes)) {
					classes.forEach((className) => {
						iel.classList.add(className.trim())
					})
				}

				break;
			case 'callback' :
				let callback = (options.icon && options.icon instanceof Function) ? options.icon : null;

				if(callback) {
					iel = callback(iel);
				}

				break;
			default:
				iel.classList.add('material-icons');
				iel.textContent = (options.icon.name) ? options.icon.name : options.icon;
		}

		if (options.icon.after) {
			iel.classList.add('after');
		}

		appendIcon(options, iel, toast);
	}

}

const appendIcon = (options, el, toast) => {

	if (options.icon) {

		if (options.icon.after && options.icon.name) {
			toast.appendChild(el);
		}
		else if (options.icon.name) {
			toast.insertBefore(el, toast.firstChild);
		}
		else {
			toast.insertBefore(el, toast.firstChild);
		}

	}

}

/**
 * Create Action for the toast
 *
 * @param action
 * @param toastObject
 * @returns {Element}
 */
const createAction = (action, toastObject) => {


	if (!action) {
		return null;
	}

	let el = document.createElement('a');
	el.classList.add('action');
	el.classList.add('ripple');

	if (action.text) {
		el.text = action.text
	}

	if (action.href) {
		el.href = action.href
	}

	if (action.target) {
		el.target = action.target
	}

	if (action.icon) {

		// add icon class to style it
		el.classList.add('icon');

		// create icon element
		let iel = document.createElement('i');


		switch (_options.iconPack) {
			case 'fontawesome' :
				iel.classList.add('fa');

				if(action.icon.includes('fa-')) {
					iel.classList.add(action.icon.trim());
				}
				else {
					iel.classList.add('fa-' + action.icon.trim());
				}

				break;
			case 'mdi':
				iel.classList.add('mdi');

				if (action.icon.includes('mdi-')) {
					iel.classList.add(action.icon.trim());
				}
				else {
					iel.classList.add('mdi-' + action.icon.trim());
				}

				break;
			case 'custom-class':

				if (typeof action.icon === 'string') {
					action.icon.split(' ').forEach((className) => {
						el.classList.add(className)
					})
				}
				else if (Array.isArray(action.icon)) {
					action.icon.forEach((className) => {
						el.classList.add(className.trim())
					})
				}

				break;
			default:
				iel.classList.add('material-icons');
				iel.textContent = action.icon;
		}


		// append it to the button
		el.appendChild(iel);
	}

	if (action.class) {

		if(typeof action.class === 'string') {
			action.class.split(' ').forEach((className) => {
				el.classList.add(className)
			})
		}
		else if(Array.isArray(action.class)) {
			action.class.forEach((className) => {
				el.classList.add(className.trim())
			})
		}
	}

	// initiate push with ready
	if(action.push) {

		el.addEventListener('click', (e) => {
			e.preventDefault();

			// check if vue router passed through global options
			if(!_options.router) {
				console.warn('[vue-toasted] : Vue Router instance is not attached. please check the docs');
				return;
			}

			_options.router.push(action.push);

			// fade away toast after action.
			if(!action.push.dontClose) {
				toastObject.goAway(0);
			}
		})

	}

	if (action.onClick && typeof action.onClick === 'function') {
		el.addEventListener('click', (e) => {

			if (action.onClick) {
				e.preventDefault()
				action.onClick(e, toastObject)
			}

		})
	}

	return el;
};

/**
 * this method will create the toast
 *
 * @param instance
 * @param message
 * @param options
 * @returns {{el: *, text: text, goAway: goAway}}
 */
export default function (instance, message, options) {

	// share the instance across
	_instance = instance;

	options = parseOptions(options);
	const container = _instance.container;

	options.containerClass.unshift('toasted-container');

	// check if the container classes has changed if so update it
	if (container.className !== options.containerClass.join(' ')) {
		container.className = "";
		options.containerClass.forEach((className) => {
			container.classList.add(className);
		});
	}

	// Select and append toast
	let newToast = createToast(message, options);

	// only append toast if message is not undefined
	if (message) {
		container.appendChild(newToast);
	}

	newToast.style.opacity = 0;

	// Animate toast in
	animations.animateIn(newToast)


	// Allows timer to be pause while being panned
	let timeLeft = options.duration;
	let counterInterval;
	if (timeLeft !== null) {

		const createInterval = () => setInterval(function () {
			if (newToast.parentNode === null)
				window.clearInterval(counterInterval);

			// If toast is not being dragged, decrease its time remaining
			if (!newToast.classList.contains('panning')) {
				timeLeft -= 20;
			}

			if (timeLeft <= 0) {
				// Animate toast out

				animations.animateOut(newToast, function () {
					// Call the optional callback
					if (typeof(options.onComplete) === "function")
						options.onComplete();
					// Remove toast after it times out
					if (newToast.parentNode) {
						_instance.remove(newToast);
					}

				})

				window.clearInterval(counterInterval);
			}
		}, 20);

		counterInterval = createInterval();

		// Toggle interval on hover
		if (options.keepOnHover) {
			newToast.addEventListener('mouseover', () => {
				window.clearInterval(counterInterval);
			});
			newToast.addEventListener('mouseout', () => {
				counterInterval = createInterval();
			});
		}
	}

	return toastObject(newToast, _instance);
};