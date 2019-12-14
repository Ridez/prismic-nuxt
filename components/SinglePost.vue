<template>
  <div class="post-card">
    <img 
      :src="post.data.post_image.url" 
      class="post-card__img" >
    <div class="post-card__text-wrapper">
      <prismic-rich-text 
        :field="post.data.title" 
        class="post-card__title" />
      <nuxt-link 
        :to="link" 
        class="post-card__more-btn">Read more</nuxt-link>
    </div>
  </div>
</template>

<script>
import LinkResolver from '~/plugins/link-resolver.js'

export default {
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      link: ''
    }
  },
  created() {
    this.link = LinkResolver(this.post)
  }
}
</script>

<style lang="scss">
.post-card {
  margin-bottom: 30px;
  &__img {
    width: 100%;
    vertical-align: middle;
  }
  &__text-wrapper {
    background-color: #f4f4f4;
    padding: 15px;
    padding-bottom: 20px;
  }
  &__title {
    h1 {
      font-size: 2rem;
    }
  }
  &__more-btn {
    display: inline-block;
    color: #fff;
    background-color: #000;
    padding: 5px 20px;
    margin-top: 10px;
    text-decoration: none;
  }
}
</style>
