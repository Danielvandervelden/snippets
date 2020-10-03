const config = {
	base_url: `${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}`
}

export default {
	install(Vue) {
		Vue.appConfig = config;
		Vue.prototype.$appConfig = config;
	}
}