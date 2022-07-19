<template>

  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ buttonString }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ buttonString }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login } from "~/api/user";

export default {
name: "LoginIndex",
  data() {
    return {
      user: {
        email: "applewennie895@163.com",
        password: "nie13517247387"
      }
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    },
    buttonString() {
      return this.isLogin ? 'Sign in' : 'Sign up'
    }
  },
  methods: {
    async onSubmit() {
       const { data } = await login(this.user)
      console.log(data, 'res')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
