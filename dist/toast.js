'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _velocityAnimate = require('velocity-animate');

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

var _hammerjs = require('hammerjs');

var _hammerjs2 = _interopRequireDefault(_hammerjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalOptions = {};

var Toast = {
    show: function show(message, options) {
        _show(message, options);
    },
    success: function success(message, options) {
        options = options || {};
        options.type = "success";
        _show(message, options);
    },
    info: function info(message, options) {
        options = options || {};
        options.type = "info";
        _show(message, options);
    },
    error: function error(message, options) {
        options = options || {};
        options.type = "error";
        _show(message, options);
    },
    setGlobalOptions: function setGlobalOptions(options) {
        globalOptions = options || {};
    }
};

var _show = function _show(message, options) {
    options = options || {};

    // merge global options with options
    Object.assign(options, globalOptions);

    // class name to be added on the toast
    options.className = options.className || "primary";

    // complete call back of the toast
    options.onComplete = options.onComplete || null;

    // toast position
    options.position = options.position || "top-right";

    // toast duration
    options.duration = options.duration || null;

    // normal type will allow the basic color
    options.type = options.type || null;

    var completeCallback = options.onComplete;
    var className = options.className;
    var displayLength = options.duration;

    // Add Type class to the class name list
    if (options.type) {
        className = options.className + " " + options.type.trim();
    }

    var container = document.getElementById('toast-container');

    // Create toast container if it does not exist
    if (container === null) {
        // create notification container
        container = document.createElement('div');
        container.id = 'toast-container';
        container.classList.add(options.position);
        document.body.appendChild(container);
    }

    // Select and append toast
    var newToast = createToast(message);

    // only append toast if message is not undefined
    if (message) {
        container.appendChild(newToast);
    }

    newToast.style.opacity = 0;

    // Animate toast in
    (0, _velocityAnimate2.default)(newToast, { translateY: '-35px', opacity: 1 }, {
        duration: 300,
        easing: 'easeOutCubic',
        queue: false
    });

    // Allows timer to be pause while being panned
    var timeLeft = displayLength;
    var counterInterval;
    if (timeLeft != null) {
        counterInterval = setInterval(function () {
            if (newToast.parentNode === null) window.clearInterval(counterInterval);

            // If toast is not being dragged, decrease its time remaining
            if (!newToast.classList.contains('panning')) {
                timeLeft -= 20;
            }

            if (timeLeft <= 0) {
                // Animate toast out
                (0, _velocityAnimate2.default)(newToast, { "opacity": 0, marginTop: '-40px' }, {
                    duration: 375,
                    easing: 'easeOutExpo',
                    queue: false,
                    complete: function complete() {
                        // Call the optional callback
                        if (typeof completeCallback === "function") completeCallback();
                        // Remove toast after it times out
                        this[0].parentNode.removeChild(this[0]);
                    }
                });
                window.clearInterval(counterInterval);
            }
        }, 20);
    }

    function createToast(html) {

        // Create toast
        var toast = document.createElement('div');
        toast.classList.add('toast');
        if (className) {
            var classes = className.split(' ');

            for (var i = 0, count = classes.length; i < count; i++) {
                toast.classList.add(classes[i]);
            }
        }
        // If type of parameter is HTML Element
        if ((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === "object" ? html instanceof HTMLElement : html && (typeof html === 'undefined' ? 'undefined' : _typeof(html)) === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName === "string") {
            toast.appendChild(html);
        } else {
            // Insert as text;
            toast.innerHTML = html;
        }

        // Bind hammer
        var hammerHandler = new _hammerjs2.default(toast, { prevent_default: false });
        hammerHandler.on('pan', function (e) {
            var deltaX = e.deltaX;
            var activationDistance = 80;

            // Change toast state
            if (!toast.classList.contains('panning')) {
                toast.classList.add('panning');
            }

            var opacityPercent = 1 - Math.abs(deltaX / activationDistance);
            if (opacityPercent < 0) opacityPercent = 0;

            (0, _velocityAnimate2.default)(toast, { left: deltaX, opacity: opacityPercent }, { duration: 50, queue: false, easing: 'easeOutQuad' });
        });

        hammerHandler.on('panend', function (e) {
            var deltaX = e.deltaX;
            var activationDistance = 80;

            // If toast dragged past activation point
            if (Math.abs(deltaX) > activationDistance) {
                (0, _velocityAnimate2.default)(toast, { marginTop: '-40px' }, {
                    duration: 375,
                    easing: 'easeOutExpo',
                    queue: false,
                    complete: function complete() {
                        if (typeof completeCallback === "function") {
                            completeCallback();
                        }
                        toast.parentNode.removeChild(toast);
                    }
                });
            } else {
                toast.classList.remove('panning');
                // Put toast back into original position
                (0, _velocityAnimate2.default)(toast, { left: 0, opacity: 1 }, {
                    duration: 300,
                    easing: 'easeOutExpo',
                    queue: false
                });
            }
        });

        return toast;
    }
};

exports.default = Toast;