import Velocity from 'velocity-animate';

// fade the toast away
export const goAway = (el, delay) => {
    // Animate toast out
    setTimeout(function () {
        Velocity(el, {"opacity": 0, marginTop: '-40px'}, {
            duration: 375,
            easing: 'easeOutExpo',
            queue: false,
            complete: function () {

                if (this[0].parentNode) {
                    this[0].parentNode.removeChild(this[0]);
                }

            }
        });
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

// add a close button to toast
export const addCloseButton = (el) => {


    // create a close button
    let close = document.createElement('button');
    close.innerText = "x";
    close.className = 'toasted-close';

    // add eventListener to close the toast
    close.addEventListener('click', () => {
        goAway(el, 0);
    });

    // append the close button to the toast
    el.appendChild(close);


};

export const toastObject = (el) => ({
    el: el,
    text: function (text) {
        changeText(el, text);
        return this;
    },
    goAway: function (delay = 800) {
        return goAway(el, delay);
    },
    addClose: function () {
        addCloseButton(el);
        return this;
    }
});