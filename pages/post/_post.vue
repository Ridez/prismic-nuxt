<template>
  <div 
    :data-wio-id="post.id" 
    class="project-container container">
    <!-- Button to edit document in dashboard -->
    <!-- <prismic-edit-button :document-id="post.id" /> -->
    <div class="post-content">
      <img 
        :src="post.data.post_image.url" 
        class="post-content__img" >
      <prismic-rich-text 
        :field="post.data.title" 
        class="post-content__title" />
      <prismic-rich-text 
        :field="post.data.desc" 
        class="post-content__desc" />
      <nuxt-link 
        to="/" 
        class="post-content__back-btn">Go back to posts</nuxt-link>
    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export default {
  async asyncData({ params, error, req }) {
    try {
      // Query to get API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })
      // Query to get post content
      const post = await api.query(
        Prismic.Predicates.at('my.post.uid', params.post)
      )
      // Load the edit button
      if (process.client) window.prismic.setupEditButton()
      // Returns data to be used in template
      return {
        post: post.results[0]
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="scss">
.project-container {
  .post-content {
    &__back-btn {
      display: inline-block;
      color: #fff;
      background-color: #000;
      padding: 5px 20px;
      margin-top: 10px;
      text-decoration: none;
    }
    &__img {
      width: 100%;
    }
    &__title {
      margin-top: 30px;
    }
  }
}
</style>
