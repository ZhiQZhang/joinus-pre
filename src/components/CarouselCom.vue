<template>
  <div class="carousel">
    <el-carousel style="width:60%;">
      <el-carousel-item v-for="(file, index) in files" :key="index">
        <img :src="require('@/assets/img/' + file)" width="100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'CarouselCom',
  props: ['files']
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.carousel{
  display: flex;
  justify-content: center;
}
</style>
