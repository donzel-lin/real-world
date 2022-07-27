<template>
	<div>
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
				<span class="date-posted">{{ comment.updatedAt | formateDate }}</span>
				<span
					class="mod-options"
					v-if="comment.author.username === user.username"
				>
					<i class="ion-trash-a" @click="deleteComment(comment.id)"></i>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
import { getComment, addComment, deleteComment } from '../../api/articles';
import { mapState } from 'vuex';
export default {
	name: 'Comment',
	props: {
		slug: {
			type: String,
			defautl: '',
		},
	},
	data() {
		return {
			comments: [],
		};
	},
	computed: {
		...mapState('user', ['user']),
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			const { data } = await getComment(this.slug);
			const { comments } = data;
			this.comments = comments;
		},
		async deleteComment(id) {
			const { data } = await deleteComment({
				slug: this.slug,
				id,
			});
			this.fetchData();
		},
	},
};
</script>
<style lang="scss" scoped></style>
