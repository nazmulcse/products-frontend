<script>
const API_URL = 'http://localhost:8080/api/'
const URL = {
  SIGNUP_URL: API_URL + 'auth/register',
  LOGIN_URL: API_URL + 'auth/login'
}
URL.install = function (Vue) {
  Vue.prototype.$getConst = (key) => {
    return URL[key]
  }
}
export default URL
</script>
