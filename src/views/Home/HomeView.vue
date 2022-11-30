<template>
  <div>
    <HeaderCom/>
    <TypenavView v-show="$route.path === '/home' || $route.path === '/home/search'"/>
    <router-view></router-view>
    <SwiperlistViews v-show="$route.path === '/home'"/>
    <RecommendView v-show="$route.path === '/home'"/>
    <RankView v-show="$route.path === '/home'"/>
    <LikeView v-show="$route.path === '/home'"/>
    <FloorView v-for="list in floorList" :key="list.id" :list="list" :imgList="list.carouselList" v-show="$route.path === '/home'"/>
    <BrandView v-show="$route.path === '/home'"/>
    <FooterCom v-show="$route.meta.isShow"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderCom from '@/components/Header/HeaderCom.vue'
import FooterCom from '@/components/Footer/FooterCom.vue'
import SwiperlistViews from '@/views/Home/ListContainer/SwiperlistViews.vue'
import RecommendView from '@/views/Home/Recommend/RecommendView.vue'
import RankView from '@/views/Home/Rank/RankView.vue'
import LikeView from '@/views/Home/Like/LikeView.vue'
import FloorView from '@/views/Home/Floor/FloorView.vue'
import BrandView from '@/views/Home/Brand/BrandView.vue'
import { mapState } from 'vuex'
export default {
  name: 'HomeView',
  components: {
    HeaderCom,
    FooterCom,
    SwiperlistViews,
    RecommendView,
    RankView,
    LikeView,
    FloorView,
    BrandView
  },
  data () {
    return {
    }
  },
  computed: {
    // files () {
    //   const fileStr = require.context('@/assets/img', false, /(\.jpg|\.jpeg)$/).keys()
    //   fileStr.forEach((item, index, fileStr) => {
    //     const newItem = item.substring(2)
    //     fileStr[index] = newItem
    //   })
    //   return fileStr
    // }
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  async mounted () {
    try {
      await this.$store.dispatch('home/getFloorList')
      await this.$store.dispatch('user/getUserInfo')
    } catch (error) {
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/home') {
        this.$router.go()
      }
    }
  }
}
</script>

<style scoped>

</style>
