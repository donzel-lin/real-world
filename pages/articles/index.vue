<template>
	<div class="article-page">
		<div class="banner">
			<div class="container">
				<h1>{{ article.title }}</h1>

				<div class="article-meta">
					<a href=""><img :src="article.author.image" /></a>
					<div class="info">
						<a href="" class="author">{{ article.author.username }}</a>
						<span class="date">{{ article.updatedAt | timeFilter }}</span>
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
						<span class="date">{{ article.updatedAt | timeFilter }}</span>
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

					<div v-for="comment in comments" :key="comment.id" class="card">
						<div class="card-block">
							<p class="card-text">
								{{ comment.body }}
							</p>
						</div>
						<div class="card-footer">
							<a href="" class="comment-author">
								<img :src="comment.author.image" class="comment-author-img" />
							</a>
							&nbsp;
							<nuxt-link
								:to="{
									name: 'profile',
									params: {
										username: comment.author.username,
									},
								}"
								class="comment-author"
								>{{ comment.author.username }}</nuxt-link
							>
							<span class="date-posted">{{
								comment.updatedAt | timeFilter
							}}</span>
							<span
								class="mod-options"
								v-if="comment.author.username === user.username"
							>
								<i class="ion-trash-a" @click="deleteComment(comment.id)"></i>
							</span>
						</div>
					</div>
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
	deleteComment,
} from '../../api/articles';
import { editFavorite } from '../../api/profile';
import { formateDate } from '../../utils/time';
import { mapState } from 'vuex';
export default {
	name: 'articleIndex',
	data() {
		return {
			comment: {
				body: '',
			},
		};
	},
	filters: {
		timeFilter(date) {
			return formateDate(date);
		},
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
		const [articleRes, commentRes] = await Promise.all([
			getArticle(slug),
			getComment(slug),
		]);

		const { article } = articleRes.data;
		const { comments } = commentRes.data;
		return {
			article,
			comments,
			slug,
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
		},
		async deleteComment(id) {
			const { data } = await deleteComment({
				slug: this.slug,
				id,
			});
		},
	},
};
</script>

<style scoped></style>
