const config = {
	base_url: `${process.env.VUE_API_HOST}:${process.env.VUE_API_PORT}`
}

export default {
	install(Vue) {
		Vue.appConfig = config;
		Vue.prototype.$appConfig = config;
	}
}