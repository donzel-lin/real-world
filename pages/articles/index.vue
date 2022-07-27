<template>
	<div class="article-page">
		<div class="banner">
			<div class="container">
				<h1>{{ article.title }}</h1>

				<div class="article-meta">
					<a href=""><img :src="article.author.image" /></a>
					<div class="info">
						<a href="" class="author">{{ article.author.username }}</a>
						<span class="date">{{ article.updatedAt | formateDate }}</span>
					</div>
					<button
						class="btn btn-sm"
						:class="{
							'btn-secondary': article.author.following,
							'btn-outline-secondary': !article.author.following,
						}"
						@click="followUser"
					>
						<i class="ion-plus-round"></i>
						&nbsp; {{ article.author.following ? 'Unfollow' : 'Follow' }}
						{{ article.author.username }}
					</button>
					&nbsp;&nbsp;
					<button
						class="btn btn-sm"
						:class="{
							'btn-primary': article.favorited,
							'btn-outline-primary': !article.favorited,
						}"
						@click="favoriteArticle(article)"
					>
						<i class="ion-heart"></i>
						&nbsp;
						{{ article.favorited ? 'Unfavorite Article' : 'Favorite Post' }}
						<span class="counter">({{ article.favoritesCount }})</span>
					</button>
				</div>
			</div>
		</div>

		<div class="container page">
			<div class="row article-content">
				<div class="col-md-12">
					<p>
						{{ article.body }}
					</p>
				</div>
			</div>

			<hr />

			<div class="article-actions">
				<div class="article-meta">
					<a href=""><img :src="article.author.image" /></a>
					<div class="info">
						<a href="" class="author">{{ article.author.username }}</a>
						<span class="date">{{ article.updatedAt | formateDate }}</span>
					</div>

					<button
						class="btn btn-sm"
						:class="{
							'btn-secondary': article.author.following,
							'btn-outline-secondary': !article.author.following,
						}"
						@click="followUser"
					>
						<i class="ion-plus-round"></i>
						&nbsp; {{ article.author.following ? 'Unfollow' : 'Follow' }}
						{{ article.author.username }}
					</button>
					&nbsp;&nbsp;
					<button
						class="btn btn-sm"
						:class="{
							'btn-primary': article.favorited,
							'btn-outline-primary': !article.favorited,
						}"
						@click="favoriteArticle(article)"
					>
						<i class="ion-heart"></i>
						&nbsp;
						{{ article.favorited ? 'Unfavorite Article' : 'Favorite Post' }}
						<span class="counter">({{ article.favoritesCount }})</span>
					</button>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12 col-md-8 offset-md-2">
					<form class="card comment-form" @submit.prevent="addComment">
						<div class="card-block">
							<textarea
								class="form-control"
								placeholder="Write a comment..."
								rows="3"
								v-model="comment.body"
							></textarea>
						</div>
						<div class="card-footer">
							<img :src="user.image" class="comment-author-img" />
							<button class="btn btn-sm btn-primary">Post Comment</button>
						</div>
					</form>
					<comment :key="commentKey" :slug="slug" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getArticle,
	faroriteArticle,
	getComment,
	addComment,
} from '../../api/articles';
import { editFavorite } from '../../api/profile';
import { mapState } from 'vuex';
import Comment from '../components/Comment.vue';
export default {
	name: 'articleIndex',
	components: {
		Comment,
	},
	data() {
		return {
			comment: {
				body: '',
			},
			commentKey: +new Date().getTime(),
		};
	},
	computed: {
		...mapState('user', ['user']),
	},
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
		const { slug } = params;
		const [articleRes] = await Promise.all([getArticle(slug)]);

		const { article } = articleRes.data;
		return {
			article,
			slug,
		};
	},
	head() {
		return {
			title: this.article.title,
			meta: [
				{
					hid: '121',
					name: this.article.description,
					content: '哈哈哈哈哈',
				},
			],
		};
	},
	methods: {
		async followUser() {
			const { data } = await editFavorite({
				username: this.article.author.username,
				method: this.article.author.following ? 'delete' : 'post',
			});
			const { profile } = data;
			this.article.author.following = profile.following;
		},
		async favoriteArticle(article) {
			const { data } = await faroriteArticle({
				slug: article.slug,
				method: article.favorited ? 'delete' : 'post',
			});
			const { article: newArticle } = data;
			this.article = newArticle;
		},
		async addComment() {
			const params = {
				comment: this.comment,
				slug: this.slug,
			};
			const { data } = await addComment(params);
			this.refreshComment();
		},
		async refreshComment() {
			this.comment = {
				body: '',
			};
			this.commentKey = +new Date().getTime();
		},
	},
};
</script>

<style scoped></style>
