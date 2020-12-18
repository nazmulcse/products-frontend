<template>
    <div class="text-sm-right">
          <button @click="logout" type="button" class="btn btn-outline-primary">
              Logout
          </button>
      </div>
</template>

<script>
export default {
  name: 'Button',
  methods: {
    logout: function () {
      console.log('tt')
      this.$storage.set('token', '')
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
