<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="toggleShown" @mouseleave="leaveIndex">
        <h2 class="all">全部商品分类</h2>
        <transition name="fade">
          <div class="sort" v-show="shown">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(cate_first, index) in categoryList"
                :key="cate_first.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="cate_first.categoryName"
                    :data-category1Id="cate_first.categoryId"
                    href="javascript: ;"
                    >{{ cate_first.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="cate_second in cate_first.categoryChild"
                    :key="cate_second.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="cate_second.categoryName"
                          :data-category2Id="cate_second.categoryId"
                          href="javascript: ;"
                          >{{ cate_second.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="cate_third in cate_second.categoryChild"
                          :key="cate_third.categoryId"
                        >
                          <a
                            :data-categoryName="cate_third.categoryName"
                            :data-category3Id="cate_third.categoryId"
                            href="javascript: ;"
                            >{{ cate_third.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 导入mapState等需要大括号括起来，否则报错导入的问题
import { mapState } from 'vuex'
export default {
  name: 'TypenavView',
  data () {
    return {
      currentIndex: -1,
      shown: true
    }
  },
  mounted () {
    this.$store.dispatch('home/categoryList')
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList
    })
  },
  methods: {
    changeIndex (index) {
      this.currentIndex = index
    },
    leaveIndex () {
      this.currentIndex = -1
      if (this.$route.path === '/home/search') {
        this.shown = false
      }
    },
    goSearch (event) {
      const { categoryname, category1id, category2id, category3id } = event.target.dataset
      if (categoryname) {
        const location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        location.query = query
        location.params = this.$route.params
        this.$router.push(location)
      }
    },
    toggleShown () {
      if (this.$route.path === '/home/search' || this.$route.name === 'detail') {
        this.shown = !this.shown
      }
    }
  },
  watch: {
    $route (to) {
      if (to.path !== '/home') {
        this.shown = false
      } else {
        this.shown = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
      a:hover {
        text-decoration: none;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        height: 450px;
        overflow: hidden;
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: skyblue;
          a {
            text-decoration: none;
          }
        }
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
}
</style>
