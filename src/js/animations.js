import anime from 'animejs'

let duration = 300;

export default {
    animateIn : (el) => {
        anime({
            targets : el,
            translateY: '-35px',
            opacity: 1,
            duration: duration,
            easing: 'easeOutCubic'
        })
    },
    animateOut : (el, onComplete) => {
        anime({
            targets : el,
            opacity : 0,
            marginTop : '-40px',
            duration: duration,
            easing: 'easeOutExpo',
            complete: onComplete
        })
    },
     animateOutBottom : (el, onComplete) => {
        anime({
            targets : el,
            opacity : 0,
            marginBottom : '-40px',
            duration: duration,
            easing: 'easeOutExpo',
            complete: onComplete
        })
    },
    animateReset : (el) => {
        anime({
            targets : el,
            left: 0, 
            opacity: 1,
            duration: duration,
            easing: 'easeOutExpo',
        })
    },
    animatePanning : (el, left, opacity) => {
        anime({
			targets : el,
			duration : 10,
			easing: 'easeOutQuad',
			left: left,
			opacity: opacity
		})
    },
    animatePanEnd : (el, onComplete) => {
        anime({
            targets : el,
            opacity : 0,
            duration: duration,
            easing: 'easeOutExpo',
            complete: onComplete
        })
    },
    clearAnimation : (toasts) => {

	    let timeline = anime.timeline();

	    toasts.forEach((t) => {
		    timeline.add({
			    targets : t.el,
			    opacity : 0,
			    right : '-40px',
			    duration: 300,
			    offset : '-=150',
			    easing: 'easeOutExpo',
			    complete: () => {
				    t.remove();
			    }
            });
	    })

    }
}