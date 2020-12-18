<template>
<div class="d-flex h-100 align-items-center">
    <div class="w-100">
        <div class="text-center">
            <h1 class="font-weight-bold h3">Product</h1>
        </div>
        <main class="main">
          <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="card shadow">
                      <loading-progress
                          :indeterminate="indeterminate"
                          :hide-background=true
                          size="400"
                          width="345"
                          height="3"
                        />
                        <div class="card-body">
                            <header>
                                <h2 class="text-uppercase text-center h5 mb-4 text-secondary font-weight-bold">Login</h2>
                            </header>
                            <hr>
                            <vue-form :state="formstate" @submit.prevent="onSubmit">
                              <validate tag="div">
                                <div class="form-group">
                                    <label class="text-sm-left" for="login">Email</label>
                                    <input v-model="model.email" id="login" type="email" class="form-control" name="email" value="" required autofocus>
                                    <field-messages name="email" show="$dirty && $touched || $submitted">
                                        <div class="text-danger" slot="required">Email is a required field</div>
                                        <div class="text-danger" slot="email">Email is not valid</div>
                                    </field-messages>
                                </div>
                              </validate>
                              <validate tag="div">
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input v-model="model.password"  id="password" type="password" class="form-control" name="password" required autocomplete="current-password">
                                     <field-messages name="password" show="$dirty && $touched || $submitted">
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
                                <div class="text-center">
                                  New User?
                                  <router-link :to="{name: 'UserRegistration'}">
                                    <button id="myButton" class="btn btn-link">Register</button>
                                  </router-link>
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
export default {
  name: 'Login',
  data () {
    return {
      formstate: {},
      model: {
        password: '',
        email: ''
      },
      indeterminate: false
    }
  },
  methods: {
    onSubmit: function () {
      if (this.formstate.$invalid) {
      } else {
        this.indeterminate = true
        let self = this
        this.axios.post('auth/login', {
          email: this.model.email,
          password: this.model.password
        })
          .then(function (response) {
            console.log(response.data.user)
            self.$storage.set('token', response.data.access_token)
            self.$storage.set('user_id', response.data.user.id)
            self.$storage.set('user_name', response.data.user.name)
            self.$toast.success('Login successfull')
            self.$router.push({name: 'ProductList'})
          })
          .catch(function (error) {
            // handle error
            self.indeterminate = false
            console.log(error.response.status)
            if (error.response.status === 401) {
              self.$toast.error('Sorry, Email and password not matched with our credentials')
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
