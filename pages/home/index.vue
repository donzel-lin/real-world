<template>
	<div class="home-page">
		<div class="banner">
			<div class="container">
				<h1 class="logo-font">alvin-deploy</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>

		<div class="container page">
			<div class="row">
				<div class="col-md-9">
					<div class="feed-toggle">
						<ul class="nav nav-pills outline-active">
							<li v-if="user" class="nav-item">
								<nuxt-link
									class="nav-link"
									exact
									:class="{ active: tab === 'your_feed' }"
									:to="{
										name: 'home',
										query: {
											tab: 'your_feed',
										},
									}"
									>Your Feed
								</nuxt-link>
							</li>
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									exact
									:class="{ active: tab === 'global_feed' }"
									:to="{
										name: 'home',
										query: {
											tab: 'global_feed',
										},
									}"
									>Global Feed
								</nuxt-link>
							</li>
							<li class="nav-item" v-if="tag">
								<nuxt-link
									class="nav-link"
									exact
									:class="{ active: tab === tag }"
									:to="{
										name: 'home',
										query: {
											tab: tag,
											tag,
										},
									}"
									>#{{ tag }}
								</nuxt-link>
							</li>
						</ul>
					</div>
					<template v-for="article in articles">
						<div class="article-preview" :key="article.slug">
							<div class="article-meta">
								<a href="profile.html"><img :src="article.author.image" /></a>
								<div class="info">
									<nuxt-link
										:to="{
											name: 'profile',
											params: {
												username: article.author.username,
											},
										}"
										class="author"
										>{{ article.author.username }}</nuxt-link
									>
									<span class="date">{{ article.updatedAt }}</span>
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
					</template>
				</div>

				<div class="col-md-3">
					<div class="sidebar">
						<p>Popular Tags</p>

						<div class="tag-list">
							<template v-for="tag in tags">
								<nuxt-link
									:key="tag"
									:to="{
										name: 'home',
										query: {
											tag,
											page: $route.query.page,
										},
									}"
									class="tag-pill tag-default"
									>{{ tag }}</nuxt-link
								>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getArticles, getMyArticles, faroriteArticle } from '@/api/articles';
import { getTags } from '@/api/tags';
import { mapState } from 'vuex';
export default {
	name: 'HomeIndex',
	watchQuery: ['page', 'tag', 'tab'],
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
		const { page, tag, tab } = query;
		const loadArticles =
			store.state.user.user && tab === 'your_feed'
				? getMyArticles
				: getArticles;
		const limit = 20;
		const [articleRes, tagRes] = await Promise.all([
			loadArticles({
				tag,
				limit,
				offset: (Number.parseInt(page || 1) - 1) * limit,
			}),
			getTags(),
		]);
		const { articlesCount, articles } = articleRes.data;
		const { tags } = tagRes.data;
		return {
			articlesCount,
			articles,
			tags,
			page,
			tag,
			tab: tag || 'global_feed',
		};
	},
	computed: {
		...mapState('user', ['user']),
	},
	methods: {
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
