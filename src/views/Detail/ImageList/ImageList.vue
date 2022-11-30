<template>
  <el-carousel :autoplay="false" height="150px" :loop="false">
      <el-carousel-item v-for="(img, index) in skuImageList" :key="img.id">
        <img :src="img.imgUrl" width="45%" height="90%" @click="changeUrl(index)">
      </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
  name: 'ImageList',
  props: ['skuImageList'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    changeUrl (index) {
      this.$bus.$emit('getUrl', index)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
