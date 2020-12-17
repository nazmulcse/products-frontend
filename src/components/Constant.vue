<script>
const BASE_URL = 'http://localhost:8080/'
const URL = {
  BASE_URL: BASE_URL,
  API_URL: BASE_URL + 'api/'
}
URL.install = function (Vue) {
  Vue.prototype.$getConst = (key) => {
    return URL[key]
  }
}
export default URL
</script>
