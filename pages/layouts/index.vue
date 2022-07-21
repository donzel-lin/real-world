<template>
	<div>
		<!--  顶部导航栏-->
		<nav class="navbar navbar-light">
			<div class="container">
				<!--      <a class="navbar-brand" href="index.html">conduit</a>-->
				<nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
				<ul class="nav navbar-nav pull-xs-right">
					<li class="nav-item">
						<!-- Add "active" class when you're on that page" -->
						<nuxt-link class="nav-link" exact to="/">Home</nuxt-link>
					</li>
					<template v-if="user">
						<li class="nav-item">
							<nuxt-link class="nav-link" to="/article/1">
								<i class="ion-compose"></i>&nbsp;New Article
							</nuxt-link>
						</li>
						<li class="nav-item">
							<nuxt-link class="nav-link" to="/settings">
								<i class="ion-gear-a"></i>&nbsp;Settings
							</nuxt-link>
						</li>
						<li class="nav-item">
							<nuxt-link class="nav-link" to="/profile/123">
								<img
									class="user-pic"
									src="https://img2.baidu.com/it/u=1474431687,1721287933&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
									alt=""
								/>
								alvin
							</nuxt-link>
						</li>
					</template>
					<template v-else>
						<li class="nav-item">
							<nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
						</li>
						<li class="nav-item">
							<nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
						</li>
					</template>
				</ul>
			</div>
		</nav>
		<!--  顶部导航栏-->
		<!--  子路由-->
		<nuxt-child />
		<!--  底部footer-->
		<footer>
			<div class="container">
				<a href="/" class="logo-font">conduit</a>
				<span class="attribution">
					An interactive learning project from
					<a href="https://thinkster.io">Thinkster</a>. Code &amp; design
					licensed under MIT.
				</span>
			</div>
		</footer>
		<!--  底部footer-->
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'default',
	computed: {
		...mapState('user', ['user']),
	},
};
</script>

<style scoped></style>
