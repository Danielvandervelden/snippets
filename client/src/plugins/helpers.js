const helpers = {
	/**
	 * 
	 * @param {El} element This element will be the element on which the error message should be appended to.
	 * @param {String} message The message that should be appended
	 */
	message(element, message, type = 'error', fadeOut = true) {
		const el = document.createElement('span');
		el.classList.add(`${type}-message`);
		message ? el.innerText = message : "You didn't fill in a message";

		element.appendChild(el);

		if(fadeOut) {
			setTimeout(() => {
				const fadeEffect = setInterval(() => {
					if(!el.style.opacity) {
						el.style.opacity = 1;
					}
		
					if(el.style.opacity > 0) {
						el.style.opacity -= .1;
					} else {
						element.removeChild(el);
						clearInterval(fadeEffect);
					}
		
				}, 100)
			}, 2000)
		}
	},
	
	/**
	 * 
	 * @param {El} element The element you want to start searching up from
	 * @param {String} target The selector you want to look for (class or id)
	 */
	parent(element, target) {
		let selectorType = undefined;

		if(!element || !target) {
			return console.error("Please make sure to fill in the correct parameters")
		}

		if(/^./.test(target)) {
			selectorType = 'class'
		} else if(/^#/.test(target)) {
			selectorType = 'id'
		}
		
		function checkParent(el, selector) {
			if(selector === 'class') {
				if(el && el.classList && el.classList.contains(target.replace('.', ''))) return el;
				if(el.parentNode) return checkParent(el.parentNode, selector);
				return false;
			} else if(selector === 'id') {
				if(el.getAttribute('id') === target.replace("#", '')) return el;
				if(el.parentNode) return checkParent(el.parentNode, selector);
				return false;
			}
		}
		
		if(selectorType) {
			return checkParent(element, selectorType);
		} else {
			return "Invalid selector";
		}
	}
}

export default {
	install(Vue) {
		Vue.helpers = helpers;
		Vue.prototype.$helpers = helpers;
	}
}