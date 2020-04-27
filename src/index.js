import './utils.js'
import VueAuth from './authenticate.js'

/**
 * VueAuth plugin
 * @param {Object} Vue
 * @param {Object} options
 */
function plugin(Vue, options) {
  if (plugin.installed) return
  plugin.installed = true
  let vueAuthInstance = null;
  Object.defineProperties(Vue.prototype, {
    $oauth: {
      get() {
        if (!vueAuthInstance) {
          // Request handler library not found, throw error
          if (!this.$http) {
            throw new Error('Request handler instance not found')
          }
          vueAuthInstance = new VueAuth(this.$http, options)
        }
        return vueAuthInstance
      }
    }
  })
}

/**
 * External factory helper for ES5 and CommonJS
 * @param  {Object} $http     Instance of request handling library
 * @param  {Object} options   Configuration object
 * @return {VueAuth}  VueAuth instance
 */
plugin.factory = function ($http, options) {
  return new VueAuth($http, options)
}

export default plugin
