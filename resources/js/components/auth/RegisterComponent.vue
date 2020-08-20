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
              <v-toolbar-title>User registration</v-toolbar-title>
            </v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="registrationForm" v-model="valid">
                  <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="nameRules"
                    :error="errors['name']"
                    :error-messages="errors['name']"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Email"
                    v-model="email"
                    :rules="emailRules"
                    :error="errors['email']"
                    :error-messages="errors['email']"
                    required
                  ></v-text-field>
                  <v-text-field
                    name="password"
                    label="Password"
                    v-model="password"
                    :rules="passwordRules"
                    :error="errors['password']"
                    :error-messages="errors['password']"
                    hint="At least 8 characters"
                    min="8"
                    type="password"
                    required
                  >
                  </v-text-field>
                  <v-text-field
                    name="password"
                    label="Password confirmation"
                    v-model="passwordConfirmation"
                    :rules="passwordRules"
                    :error="errors['password']"
                    :error-messages="errors['password']"
                    hint="At least 8 characters"
                    min="8"
                    type="password"
                    required
                  ></v-text-field>
              </v-form>
              <a href="/login" color="primary">
                I already have an user
              </a>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn :loading="registerLoading" color="primary" class="white--text" @click.native="register">Register</v-btn>
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
      internalAction: this.action,
      name: '',
      nameRules: [
        (v) => !!v || 'User name is mandatory'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'Mail is mandatory',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email have to be valid'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is mandatory',
        (v) => v.length >= 8 || 'Password at least have to be 8 characters'
      ],
      passwordConfirmation: '',
      valid: false,
      registerLoading: false
    }
  },
  created () {
    this.$vuetify.theme.dark = true
  },
  props: {
    action: {
      type: String,
      default: null
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    register () {
      if (this.$refs.registrationForm.validate()) {
        this.registerLoading = true
        const user = {
          'name': this.name,
          'email': this.email,
          'password': this.password,
          'password_confirmation': this.passwordConfirmation,
        }
        this.$store.dispatch(actions.REGISTER, user).then(response => {
          window.location = '/home'
        }).catch(error => {
          if (error.response && error.response.status === 422) {
            this.showError({
              message: 'Invalid data'
            })
          } else {
            this.showError(error)
          }
          this.errors = error.response.data.errors
        }).then(() => {
          this.registerLoading = false
          console.log('register loading: ', false);
        })
      }
    }
  }
}
</script>
