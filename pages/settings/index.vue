<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>

					<form @submit.prevent="submitUser">
						<fieldset>
							<fieldset class="form-group">
								<input
									v-model="userInfo.image"
									class="form-control"
									type="text"
									placeholder="URL of profile picture"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									v-model="userInfo.username"
									class="form-control form-control-lg"
									type="text"
									placeholder="Your Name"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									v-model="userInfo.bio"
									class="form-control form-control-lg"
									rows="8"
									placeholder="Short bio about you"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									v-model="userInfo.email"
									class="form-control form-control-lg"
									type="text"
									placeholder="Email"
								/>
							</fieldset>
							<!-- <fieldset class="form-group">
								<input
									v-model="userInfo.password"
									class="form-control form-control-lg"
									type="password"
									placeholder="Password"
								/>
							</fieldset> -->
							<button class="btn btn-lg btn-primary pull-xs-right">
								Update Settings
							</button>
						</fieldset>
					</form>
					<hr />
					<!-- <button class="btn btn-outline-danger">
						Or click here to logout.
					</button> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { updateUser } from '../../api/user';
export default {
	name: 'index',
	middleware: 'authenticated',
	data() {
		return {
			userInfo: null,
		};
	},
	computed: {
		...mapState('user', ['user']),
	},
	created() {
		this.userInfo = {
			email: this.user.email,
			token: this.user.token,
			username: this.user.username,
			bio: this.user.bio,
			image: this.user.image,
		};
	},
	methods: {
		async submitUser() {
			const formData = new FormData();
			const user = {
				...this.userInfo,
			};
			// formData.append('user', user);
			const { data } = await updateUser(user);
		},
	},
};
</script>

<style scoped></style>
