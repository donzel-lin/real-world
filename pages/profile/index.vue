<template>
	<div class="profile-page">
		<div class="user-info">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<img :src="profile.image" class="user-img" />
						<h4>{{ profile.username }}</h4>
						<p>
							{{ profile.bio }}
						</p>
						<button
							v-if="isSelf"
							class="btn btn-sm btn-outline-secondary action-btn"
							@click="goToSettings"
						>
							<i class="ion-gear-a"></i>
							&nbsp; Edit Profile Settings
						</button>
						<button
							v-else
							class="btn btn-sm btn-outline-secondary action-btn"
							@click="followUser"
						>
							<i class="ion-plus-round"></i>
							&nbsp; {{ profile.following ? 'Unfollow' : 'Follow' }}
							{{ username }}
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<div class="articles-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									exact
									:to="{
										name: 'profile',
										params: {
											username: this.username,
										},
									}"
									>My Articles
								</nuxt-link>
							</li>
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									exact
									:to="{
										name: 'profile',
										params: {
											username: this.username,
											favorite: 'favorites',
										},
									}"
									>Favorited Articles
								</nuxt-link>
							</li>
						</ul>
					</div>

					<div
						v-for="article in articles"
						:key="article.slug"
						class="article-preview"
					>
						<div class="article-meta">
							<a href=""><img :src="article.author.image" /></a>
							<div class="info">
								<a href="" class="author">article.author.username</a>
								<span class="date">article.updatedAt</span>
							</div>
							<button
								class="btn btn-sm pull-xs-right"
								:class="{
									'btn-primary': article.favorited,
									'btn-outline-primary': !article.favorited,
								}"
								@click="favoriteArticle(article)"
							>
								<i class="ion-heart"></i> {{ article.favoritesCount }}
							</button>
						</div>
						<nuxt-link
							:to="{
								name: 'article',
								params: {
									slug: article.slug,
								},
							}"
							class="preview-link"
						>
							<h1>{{ article.title }}</h1>
							<p>{{ article.description }}</p>
							<span>{{ article.body }}</span>
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getProfile, editFavorite } from '../../api/profile';
import { getArticles, faroriteArticle } from '../../api/articles';
import { mapState } from 'vuex';
export default {
	name: 'idnex',
	middleware: 'authenticated',
	async asyncData({
		isDev,
		route,
		store,
		env,
		params,
		query,
		req,
		res,
		redirect,
		error,
	}) {
		const { username, favorite } = params;
		const { user } = store.state.user;
		const { data } = await getProfile({ username });
		const key = !!favorite ? 'favorited' : 'author';

		const { data: articleData } = await getArticles({
			[key]: username,
			offset: 0,
			limit: 5,
		});
		const { articles, articlesCount } = articleData;
		return {
			profile: data.profile,
			username,
			articles,
			articlesCount,
		};
	},
	computed: {
		...mapState('user', ['user']),
		isSelf() {
			return this.username === this.user.username;
		},
	},
	methods: {
		goToSettings() {
			this.$router.push({
				name: 'settings',
			});
		},
		async followUser() {
			const { data } = await editFavorite({
				username: this.username,
				method: this.profile.following ? 'delete' : 'post',
			});
			const { profile } = data;
			this.profile = profile;
		},
		async favoriteArticle(article) {
			const { data } = await faroriteArticle({
				slug: article.slug,
				method: article.favorited ? 'delete' : 'post',
			});
			const { article: newArticle } = data;
			const index = this.articles.findIndex(x => x.slug === newArticle.slug);
			this.articles.splice(index, 1, newArticle);
		},
	},
};
</script>

<style scoped></style>
