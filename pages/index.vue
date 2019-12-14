<template>
  <section class="container">
    <div class="row">
      <div 
        v-for="post in posts" 
        :key="post.id" 
        :post="post"
        class="col">
        <SinglePost :post="post"/>
      </div>
    </div>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import SinglePost from '~/components/SinglePost.vue'

export default {
  components: {
    SinglePost
  },
  data() {
    return {
      link: ''
    }
  },
  async asyncData({ context, error, req }) {
    try {
      // Query to get API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

      // Query to get posts content
      const blogPosts = await api.query(
        Prismic.Predicates.at('document.type', 'post'),
        { orderings: '[my.post.title]' }
      )
      // Load the edit button
      if (process.client) window.prismic.setupEditButton()
      // Returns data to be used in template
      return {
        posts: blogPosts.results
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="scss">
.container {
  max-width: 1280px;
  margin: 100px auto;
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    .col {
      flex: 0 0 33.3333%;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  p {
    margin-bottom: 15px;
  }
}
</style>
