<template>
<div class="product">
  <Header></Header>
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
                              <div class="row">
                                <div class="col-sm-6">
                                    <h2 class="text-uppercase h5 text-secondary font-weight-bold">Product List</h2>
                                </div>
                                <div class="col-sm-6 text-right">
                                    <router-link :to="{name: 'AddProduct'}">
                                        <button class="btn btn-sm btn-secondary">Add Product</button>
                                    </router-link>
                                </div>
                              </div>
                            </header>
                            <hr>
                            <table class="table">
                              <thead class="thead-dark">
                                <tr>
                                  <th width="5%" scope="col">#</th>
                                  <th width="20%" scope="col">Title</th>
                                  <th width="20%" scope="col">Description</th>
                                  <th width="20%" scope="col">Price</th>
                                  <th width="20%" scope="col">Image</th>
                                  <th width="35%" scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item, index) in products" :key="item.id">
                                  <th scope="row">{{ index+1 }}</th>
                                  <td>{{ item.title }}</td>
                                  <td>{{ item.description }}</td>
                                  <td>{{ item.price }}</td>
                                  <td>
                                    <a v-if="item.image !== null && item.image !== ''" :href="baseURL + item.image" target="_blank" rel="noopener">
                                      <img width="50" height="50" :src="baseURL + item.image" class="card-img card-img-scheme" alt="">
                                    </a>
                                  </td>
                                  <td>
                                    <router-link :to="{name: 'EditProduct', params:{id:item.id}}">
                                      <button id="myButton" class="btn btn-sm btn-primary">Edit</button>
                                    </router-link>
                                    <button v-on:click="removeProduct(item.id, index)" class="btn btn-sm btn-outline-danger">Delete</button>
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

export default {
  name: 'ProductList',
  mounted: function () {
    if (this.$storage.get('token')) {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.$storage.get('token')}`
      this.axios.defaults.baseURL = this.$getConst('API_URL')
      this.getProducts()
      this.$refs.topProgress.start()
    } else {
      this.$router.push({name: 'Login'}).catch(() => {})
    }
  },
  data () {
    return {
      products: [],
      baseURL: this.$getConst('BASE_URL')
    }
  },
  methods: {
    removeProduct: function (productId, index) {
      if (confirm('Are you sure?')) {
        this.$refs.topProgress.start()
        let self = this
        this.axios.post('auth/product/delete', {
          product_id: productId
        })
          .then(function (response) {
            self.products.splice(index, 1)
            self.$toast.success('Product deleted successfully')
            self.$refs.topProgress.done()
          })
          .catch(error => {
            console.log(error)
            if (error.response.status === 401) {
              self.$toast.error('Sorry, You are unauthorized user')
            } else {
              self.$toast.error('Sorry, An error occured. Try again')
            }
          })
      }
    },
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
          if (error.response.status === 401) {
            self.$router.push({name: 'Login'})
          }
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
