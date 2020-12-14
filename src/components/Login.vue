<template>
<div class="d-flex h-100 align-items-center">
    <div class="w-100">
        <div class="text-center">
            <h1 class="font-weight-bold h3"><a href="https://mislgsp.gov.bd/bn/login">Product Store</a></h1>
        </div>
        <main class="main">
          <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="card shadow">
                      <vue-progress-bar></vue-progress-bar>
                        <div class="card-body">
                            <header>
                                <h2 class="text-uppercase text-center h5 mb-4 text-secondary font-weight-bold">Login</h2>
                            </header>
                            <hr>
                            <vue-form :state="formstate" @submit.prevent="onSubmit">
                              <validate tag="login">
                                <div class="form-group">
                                    <label class="text-sm-left" for="login">Email</label>
                                    <input v-model="model.email" id="login" type="email" class="form-control" name="email" value="" required autofocus>
                                    <field-messages name="email" show="$dirty && $touched">
                                        <div class="text-danger" slot="required">Email is a required field</div>
                                        <div class="text-danger" slot="email">Email is not valid</div>
                                    </field-messages>
                                </div>
                              </validate>
                              <validate tag="password">
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input v-model="model.password"  id="password" type="password" class="form-control" name="password" required autocomplete="current-password">
                                     <field-messages name="password" show="$dirty && $touched">
                                        <div class="text-danger" slot="required">Password is a required field</div>
                                    </field-messages>
                                </div>
                              </validate>
                                <div class="form-group row mb-0">
                                    <div class="col text-sm-right">
                                        <button type="submit" class="btn btn-primary">
                                            Login
                                        </button>
                                    </div>
                                </div>
                                <hr>
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
import VueForm from 'vue-form'
export default {
  name: 'Login',
  data () {
    return {
      formstate: {},
      model: {
        password: '',
        email: ''
      },
      options: {
        color: '#007AFF',
        strokeWidth: 0.5,
        duration: 1200,
      }
    }
  },
  methods: {
  onSubmit: function () {
    if (this.formstate.$invalid) {
      // alert user and exit early
      //this.$refs.line.animate(1.0)
      this.$Progress.start()
      // return
    } else {
      /* axios.get('https://api.example.com/', {
            params: {
              page: this.page++,
              per_page: this.pageSize,
            }
          })
          .then(res => {
            this.images.concat(res.data)
            
            // Stop scroll-loader
            res.data.length < this.pageSize && (this.loadMore = false)
          })
          .catch(error => {
            console.log(error);
          }) */
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
  color: #42b983;
}
</style>
