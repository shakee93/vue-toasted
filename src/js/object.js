import animations from './animations.js'

// fade the toast away
export const goAway = (el, delay) => {
    // Animate toast out
    setTimeout(function () {
        animations.animateOut(el, () => {
            if (el.parentNode) el.parentNode.removeChild(el)
        })
    }, delay);

    return true;
};

// change the text of toast
export const changeText = (el, text) => {
    if (typeof HTMLElement === "object" ? text instanceof HTMLElement : text && typeof text === "object" && text !== null && text.nodeType === 1 && typeof text.nodeName === "string"
    ) {
        el.appendChild(text);
    }
    else {
        el.innerHTML = text;
    }

    return this;
};

export const toastObject = (el) => ({
    el: el,
    text: function (text) {
        changeText(el, text);
        return this;
    },
    goAway: function (delay = 800) {
        return goAway(el, delay);
    }
});