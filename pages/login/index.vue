<template>
	<div class="auth-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">{{ buttonString }}</h1>
					<p class="text-xs-center">
						<nuxt-link v-if="isLogin" to="/register"
							>Need an account?</nuxt-link
						>
						<nuxt-link v-else to="/login">Have an account?</nuxt-link>
					</p>

					<ul class="error-messages">
						<template v-for="(value, key) in errors">
							<li v-for="item in value" :key="item">{{ key }}: {{ item }}</li>
						</template>
					</ul>

					<form @submit.prevent="onSubmit">
						<fieldset v-if="!isLogin" class="form-group">
							<input
								v-model="user.username"
								required
								class="form-control form-control-lg"
								type="text"
								placeholder="Your Name"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								type="email"
								v-model="user.email"
								class="form-control form-control-lg"
								placeholder="Email"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								v-model="user.password"
								class="form-control form-control-lg"
								type="password"
								placeholder="Password"
							/>
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
import { login, register } from '~/api/user';
import { mapState, mapMutations } from 'vuex';
const Cookie = process.client ? require('js-cookie') : null;
export default {
	name: 'LoginIndex',
	middleware: 'notAuthenticated',
	data() {
		return {
			user: {
				username: '',
				email: 'applewennie895@163.com',
				password: 'nie13517247387',
			},
			errors: {},
		};
	},
	computed: {
		isLogin() {
			return this.$route.name === 'login';
		},
		buttonString() {
			return this.isLogin ? 'Sign in' : 'Sign up';
		},
	},
	methods: {
		...mapMutations('user', ['setUser']),
		async onSubmit() {
			try {
				const request = this.isLogin ? login : register;
				const { data } = await request(this.user);
				console.log(data, 'res');
				this.setUser(data.user);
				Cookie.set('user', JSON.stringify(data.user));
				this.$router.push('/');
			} catch (e) {
				console.dir(e.response.data.errors, 'e');
				this.errors = e.response.data.errors;
			}
		},
	},
};
</script>

<style scoped></style>
