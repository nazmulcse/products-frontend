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
                <div class="col-md-8">
                    <div class="card shadow">
                      <template>
                        <vue-topprogress ref="topProgress"></vue-topprogress>
                      </template>
                        <div class="card-body">
                            <header>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <h2 class="text-uppercase h5 text-secondary font-weight-bold">{{ pageTitle }}</h2>
                                    </div>
                                    <div class="col-sm-6 text-right">
                                        <router-link :to="{name: 'ProductList'}">
                                            <button class="btn btn-sm btn-secondary">Go back to list</button>
                                        </router-link>
                                    </div>
                                </div>
                            </header>
                            <hr>

                            <vue-form enctype="multipart/form-data" :state="formstate" @submit.prevent="onSubmit">
                              <validate tag="div">
                                <div class="form-group">
                                    <label class="text-sm-left" for="product_title">Title</label>
                                    <input v-model="product_title" id="product_title" type="text" class="form-control" name="product_title" value="" required autofocus>
                                    <field-messages name="product_title" show="$submitted">
                                        <div class="text-danger" slot="required">This field is required</div>
                                    </field-messages>
                                </div>
                              </validate>
                              <validate tag="div">
                                <div class="form-group">
                                    <label class="text-sm-left" for="product_description">Description</label>
                                    <input v-model="product_description" id="product_description" type="text" class="form-control" name="product_description" value="" required>
                                    <field-messages name="product_description" show="$submitted">
                                        <div class="text-danger" slot="required">This field is required</div>
                                    </field-messages>
                                </div>
                              </validate>
                              <validate tag="div">
                                <div class="form-group">
                                    <label class="text-sm-left" for="product_price">Price</label>
                                    <input v-model="product_price" id="product_price" type="number" class="form-control" name="product_price" value="" required>
                                    <field-messages name="product_price" show="$submitted">
                                        <div class="text-danger" slot="required">This field is required</div>
                                    </field-messages>
                                </div>
                              </validate>
                              <validate tag="div">
                                <div class="file-upload-group form-group">
                                  <label for="image_ward_meeting" class=" d-block">
                                      Image
                                  </label>
                                  <div class="file-upload-item ">
                                      <div class="input-group">
                                          <div class="custom-file">
                                              <input accept="image/jpeg,image/jpeg,image/gif,image/png" type="file" name="image" @change="selectFile" class="custom-file-input ">
                                              <label class="custom-file-label" for="image">
                                                  {{ customFileLabel }}
                                              </label>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                              </validate>
                                <div class="form-group row mb-0">
                                    <div class="col text-sm-right">
                                        <button type="submit" class="btn btn-primary">
                                            {{ buttonLabel }}
                                        </button>
                                    </div>
                                </div>
                            </vue-form>

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
    if (this.$storage.get('token')) {
      if (this.$route.params.id) {
        this.getProducts()
        this.buttonLabel = 'Update Product'
        this.pageTitle = 'Edit Product'
        this.$refs.topProgress.start()
      }
    } else {
      this.$router.push({name: 'Login'}).catch(() => {})
    }
  },
  data () {
    return {
      formstate: {},
      product_id: this.$route.params.id ? this.$route.params.id : '',
      customFileLabel: 'Choose file',
      pageTitle: 'Add Product',
      product_title: '',
      product_description: '',
      product_price: '',
      product_image: null,
      buttonLabel: 'Save Product'
    }
  },
  methods: {
    selectFile: function (event) {
      this.product_image = event.target.files[0]
      this.customFileLabel = event.target.files[0].name
    },
    getProducts: function () {
      let self = this
      // console.log(`Bearer ${this.$storage.get('token')}`)
      this.axios.get('auth/product/edit/' + this.$route.params.id)
        .then(function (response) {
          self.product_title = response.data.data.title
          self.product_description = response.data.data.description
          self.product_price = response.data.data.price
          self.$refs.topProgress.done()
        })
        .catch(error => {
          console.log(error)
          self.$refs.topProgress.done()
          if (error.response.status === 401) {
            self.$router.push({name: 'Login'})
          }
        })
    },
    onSubmit: function () {
      if (this.formstate.$invalid) {
      } else {
        this.$refs.topProgress.start()
        let self = this
        const data = new FormData()
        console.log(this.product_id)
        data.append('product_id', this.product_id)
        data.append('user_id', this.$storage.get('user_id'))
        data.append('title', this.product_title)
        data.append('description', this.product_description)
        data.append('price', this.product_price)
        if (this.product_image) {
          data.append('image', this.product_image)
        }
        this.axios.post('auth/product/update', data)
          .then(function (response) {
            self.product_image = null
            if (self.product_id) {
              self.$toast.success('Product updated successfully')
            } else {
              // self.$router.go(0)
              self.$toast.success('Product saved successfully')
            }
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
