import Hammer from 'hammerjs';
import animations from './animations.js'
import {toastObject} from './object'

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

	// normal type will allow the basic color
	options.theme = options.theme || "primary";

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

	return options;
};


const createToast = function (html, options) {

	// Create toast
	let toast = document.createElement('div');
	toast.classList.add('toasted');

	if (options.className) {
		options.className.forEach((className) => {
			toast.classList.add(className);
		});
	}

	// add material icon if available
	if (options.icon) {

		let iel = document.createElement('i');
		iel.classList.add('material-icons');

		if (options.icon.after && options.icon.name) {
			iel.textContent = options.icon.name;
			iel.classList.add('after');
			html += iel.outerHTML
		}
		else if (options.icon.name) {
			iel.textContent = options.icon.name;
			html = iel.outerHTML + html
		}
		else {
			iel.textContent = options.icon;
			html = iel.outerHTML + html
		}
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
					toast.parentNode.removeChild(toast);
				}
			})

		} else {
			toast.classList.remove('panning');
			// Put toast back into original position
			animations.animateReset(toast)

		}
	});

	// create and append actions
	if (Array.isArray(options.action)) {
		options.action.forEach((action) => {
			let el = createAction(action, toastObject(toast));
			if (el) toast.appendChild(el)
		})
	}
	else if (typeof options.action === 'object') {
		let action = createAction(options.action, toastObject(toast));
		if (action) toast.appendChild(action)
	}

	return toast;
};

/**
 * Create Action for the toast
 *
 * @param action
 * @param toastObject
 * @returns {Element}
 */
const createAction = (action, toastObject) => {

	if (!action) {
		return;
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

	if (action.icon) {

		// add icon class to style it
		el.classList.add('icon');

		// create icon element
		let iel = document.createElement('i');
		iel.classList.add('material-icons');
		iel.textContent = action.icon

		// append it to the button
		el.appendChild(iel);
	}

	if (action.class) {

		switch (typeof action.class) {
			case 'string' :
				action.class.split(' ').forEach((className) => {
					el.classList.add(className)
				})
				break;
			case 'array' :
				action.class.forEach((className) => {
					el.classList.add(className)
				})
		}
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
 * @param message
 * @param options
 * @returns {{el: *, text: text, goAway: goAway}}
 */
export default function (message, options) {

	options = parseOptions(options);

	let container = document.getElementById('toasted-container');

	// Create toast container if it does not exist
	if (container === null) {
		// create notification container
		container = document.createElement('div');
		container.id = 'toasted-container';
		document.body.appendChild(container);
	}

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
	if (timeLeft != null) {
		counterInterval = setInterval(function () {
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
						newToast.parentNode.removeChild(newToast);
					}

				})

				window.clearInterval(counterInterval);
			}
		}, 20);
	}

	return toastObject(newToast);
};