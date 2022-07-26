<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<form @submit.prevent="addArticle">
						<fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									v-model="article.title"
									class="form-control form-control-lg"
									placeholder="Article Title"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									v-model="article.description"
									class="form-control"
									placeholder="What's this article about?"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									v-model="article.body"
									class="form-control"
									rows="8"
									placeholder="Write your article (in markdown)"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									v-model="tags"
									type="text"
									class="form-control"
									placeholder="Enter tags"
								/>
								<div class="tag-list"></div>
							</fieldset>
							<button class="btn btn-lg pull-xs-right btn-primary">
								Publish Article
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { addArticle } from '../../api/articles';
export default {
	name: 'editorIndex',
	middleware: 'authenticated',
	data() {
		return {
			article: {
				title: '',
				description: '',
				body: '',
				tagList: [],
			},
			tags: '',
		};
	},
	methods: {
		async addArticle() {
			console.log(this.article, 'asdf');
			const params = {
				...this.article,
				tagList: [this.tags],
			};
			const { data } = await addArticle(params);
			console.log(data, 'data');
			this.$router.push({
				name: 'article',
				params: {
					slug: data.article.slug,
				},
			});
		},
	},
};
</script>

<style scoped></style>
