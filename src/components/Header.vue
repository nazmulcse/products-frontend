<template>
  <div class="card">
    <div class="card-body">
      <div class="row justify-content-center">
        <div class="col-sm-9">
          <h2 class="text-uppercase h5 text-center font-weight-bold">{{ userName }}</h2>
        </div>
        <div class="col-sm-3">
          <Button></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      userName: this.$storage.get('user_name')
    }
  }
}
</script>
