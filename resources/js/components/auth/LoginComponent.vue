<template>
  <v-main>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Login</v-toolbar-title>
              </v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="loginForm" v-model="valid">
                <v-text-field
                  label="Email"
                  name="email"
                  v-model="email"
                  :rules="emailRules"
                  :error="errors['email']"
                  :error-messages="errors['email']"
                  type="text"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  v-model="password"
                  :rules="passwordRules"
                  hint="At last 6 characters"
                  min="6"
                  type="password"
                  required
                  outlined
                >
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.native="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  import * as actions from '../../store/action-types'
  import withSnackbar from '../mixins/withSnackbar'

  export default {
    mixins: [withSnackbar],
    data () {
      return {
        errors: [],
        email: '',
        emailRules: [
          (v) => !!v || 'Email is mandatory',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email have to be a valid email'
        ],
        password: '',
        passwordRules: [
          (v) => !!v || 'Password is mandatory',
          (v) => v.length >= 6 || 'Password have to be at least 6 characters long'
        ],
        valid: false,
        loginLoading: false
      }
    },
    created () {
      this.$vuetify.theme.dark = true
    },
    props: {},
    methods: {
      login () {
        if (this.$refs.loginForm.validate()) {
          this.loginLoading = true
          const credentials = {
            'email': this.email,
            'password': this.password
          }
          this.$store.dispatch(actions.LOGIN, credentials).then(response => {
            this.loginLoading = false
            window.location = '/home'
          }).catch(error => {
            if (error.response && error.response.status === 442) {
              this.showError({
                message: 'Invalid data',
              })
            } else {
              this.showError(error)
            }
            this.error == error.response.data.errors
          }).then(() => {
            this.loginLoading = false
          })
        }
      }
    },
  }
</script>
