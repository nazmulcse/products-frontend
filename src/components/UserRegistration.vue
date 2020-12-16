<template>
<div class="d-flex h-100 align-items-center">
    <div class="w-100">
        <div class="text-center">
            <h1 class="font-weight-bold h3">Product</h1>
        </div>
        <main class="main">
          <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow">
                      <loading-progress
                          :indeterminate="indeterminate"
                          :hide-background=true
                          size="550"
                          width="535"
                          height="3"
                        />
                        <div class="card-body">
                            <header>
                                <h2 class="text-uppercase text-center h5 mb-4 text-secondary font-weight-bold">User Registration</h2>
                            </header>
                            <hr>
                            <vue-form :state="formstate" @submit.prevent="onSubmit">
                              <validate tag="div">
                                <div class="form-group">
                                    <label class="text-sm-left" for="full_name">Full Name</label>
                                    <input v-model="full_name" id="full_name" type="text" class="form-control" name="full_name" value="" required autofocus>
                                    <field-messages name="full_name" show="$dirty && $touched || $submitted">
                                        <div class="text-danger" slot="required">Full Name is a required field</div>
                                    </field-messages>
                                </div>
                              </validate>
                              <validate tag="div">
                                <div class="form-group">
                                    <label class="text-sm-left" for="login">Email</label>
                                    <input v-model="email" id="login" type="email" class="form-control" name="email" value="" required>
                                    <field-messages name="email" show="$dirty && $touched || $submitted">
                                        <div class="text-danger" slot="required">Email is a required field</div>
                                        <div class="text-danger" slot="email">Email is not valid</div>
                                    </field-messages>
                                </div>
                              </validate>
                              <validate tag="div">
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input v-model="password"  id="password" type="password" class="form-control" name="password" required autocomplete="current-password">
                                     <field-messages name="password" show="$dirty && $touched || $submitted">
                                        <div class="text-danger" slot="required">Password is a required field</div>
                                    </field-messages>
                                </div>
                              </validate>
                              <validate tag="div">
                                <div class="form-group">
                                    <label for="confirm_password">Confirm Password</label>
                                    <input v-model="confirm_password"  id="confirm_password" type="password" class="form-control" name="confirm_password" required>
                                     <field-messages name="confirm_password" show="$dirty && $touched || $submitted">
                                        <div class="text-danger" slot="required">Confirm password is a required field</div>
                                    </field-messages>
                                    <div class="text-danger">{{ confirm_password_error }}</div>
                                </div>
                              </validate>
                                <div class="form-group row mb-0">
                                    <div class="col text-sm-right">
                                        <button type="submit" class="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                <hr>
                                <div class="text-center">
                                  Already have an account?
                                  <router-link :to="{name: 'Login'}">
                                    <button id="login" class="btn btn-link">Login</button>
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
  name: 'UserRegistration',
  data () {
    return {
      formstate: {},
      confirm_password_error: '',
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
      indeterminate: false
    }
  },
  watch: {
    // whenever question changes, this function will run
    confirm_password: function (newConfirmPassword, oldConfirmPassword) {
      // this.$storage.set('num', 110)
      console.log(this.$storage.get('num'))
      if (this.password !== newConfirmPassword) {
        this.confirm_password_error = 'Not matched with password'
      } else {
        this.confirm_password_error = ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      if (this.formstate.$invalid) {
        // alert user and exit early
        // this.$router.push({name: 'Login'})
      } else {
        this.indeterminate = true
        let self = this
        this.axios.post('auth/register', {
          name: this.full_name,
          email: this.email,
          password: this.password
        })
          .then(function (response) {
            // console.log(response)
            // this.indeterminate = false
            self.$toast.success('Registration completed successfully! Please login now')
            self.$router.push({name: 'Login'})
          })
          .catch(error => {
            self.indeterminate = false
            console.log(error)
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
