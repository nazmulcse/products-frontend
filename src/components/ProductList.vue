<template>
<div class="d-flex h-100 align-items-center">
    <div class="w-100">
        <div class="text-center">
            <h1 class="font-weight-bold h3"></h1>
        </div>
        <main class="main">
          <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="card shadow">
                      <template>
                        <vue-topprogress ref="topProgress"></vue-topprogress>
                      </template>
                        <div class="card-body">
                            <header>
                                <h2 class="text-uppercase text-center h5 text-secondary font-weight-bold">Product List</h2>
                            </header>
                            <hr>
                            <table class="table">
                              <thead class="thead-dark">
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Title</th>
                                  <th scope="col">Description</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item, index) in products" :key="item.id">
                                  <th scope="row">{{ ++index }}</th>
                                  <td>{{ item.title }}</td>
                                  <td>{{ item.description }}</td>
                                  <td>{{ item.price }}</td>
                                  <td>
                                    <router-link :to="{name: 'EditProduct', params:{id:item.id}}">
                                      <button id="myButton" class="btn btn-sm btn-primary">Edit</button>
                                    </router-link>
                                    <router-link :to="{name: 'UserRegistration'}">
                                      <button id="myButton" class="btn btn-sm btn-outline-danger">Delete</button>
                                    </router-link>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                    <footer class="text-center text-muted small mt-2">
                        Design & Developed By <a href="#" class="text-reset" target="_blank" rel="noopener">Nazmul Hasan</a>
                    </footer>
                </div>
            </div>
          </div>
      </main>
    </div>
</div>
</template>

<script>
/* const header = {
  headers: { Authorization: `Bearer ${this.$storage.get('token')}` }
} */
export default {
  name: 'ProductList',
  mounted: function () {
    this.getProducts()
    this.$refs.topProgress.start()
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts: function () {
      let self = this
      // console.log(`Bearer ${this.$storage.get('token')}`)
      this.axios.get('auth/product')
        .then(function (response) {
          self.products = response.data.data
          self.$refs.topProgress.done()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #5442b9;
}
</style>
