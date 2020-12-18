<template>
    <div class="form-group row mt-3 px-5">
      <div class="col text-sm-right">
          <button @click="logout" type="button" class="btn btn-primary">
              Logout
          </button>
      </div>
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
