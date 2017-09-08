import { Toasted } from './js/toast';

// register plugin if it is used via cdn or directly as a script tag
if (typeof window !== 'undefined') {
	window.Toasted = Toasted;
}

export default Toasted