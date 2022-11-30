<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="goodInshop in cartInfoList"
          :key="goodInshop.id"
        >
          <li class="cart-list-con1">
            <input @change="updateCheck(goodInshop, $event)"
            style="margin-top:50%" type="checkbox" name="chk_list" :checked="goodInshop.isChecked" />
          </li>
          <li class="cart-list-con2">
            <img :src="goodInshop.imgUrl" />
            <div class="item-msg">
              {{ goodInshop.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{goodInshop.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('reduce',-1,goodInshop)" :style="goodInshop.skuNum <= 1 ? 'pointer-events: none;' : ''">-</a>
            <input
              autocomplete="off"
              type="number"
              minnum="1"
              class="itxt"
              :value="goodInshop.skuNum"
              @blur="handler('edit',$event.target.value*1,goodInshop)"
            />
            <a class="plus" @click="handler('add',1,goodInshop)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{goodInshop.cartPrice * goodInshop.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(goodInshop.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" @change="updateAllCart(cartInfoList, $event)" :checked="isAllchecked && cartInfoList.length > 0" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delCheckedCart()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span style="color:red;">{{checkedCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价(不含运费):</em>
          <i class="summoney">{{Sum}} 元</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/home/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted () {
    this.getCartData()
  },
  methods: {
    getCartData () {
      this.$store.dispatch('cart/getCartList')
    },
    async updateCheck (goodInshop, event) {
      try {
        await this.$store.dispatch('cart/updateChecked', { skuId: goodInshop.skuId, isChecked: event.target.checked === true ? 1 : 0 })
        this.getCartData()
      } catch (error) {
        console.log(error.message)
      }
    },
    handler: throttle(async function (type, disNum, goodInshop) {
      switch (type) {
        case 'add':
          disNum = 1
          break
        case 'reduce':
          disNum = goodInshop.skuNum <= 1 ? 0 : -1
          break
        case 'edit':
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - goodInshop.skuNum
          }
          break
      }
      await this.$store.dispatch('Detail/AddOrUpdateShopCart', { skuId: goodInshop.skuId, skuNum: disNum })
      this.getCartData()
    }, 3000),
    async deleteCart (id) {
      try {
        await this.$store.dispatch('cart/delCart', id)
        this.getCartData()
      } catch (error) {
        console.log(error.message)
      }
    },
    delCheckedCart () {
      this.cartInfoList.forEach(async (item) => {
        if (item.isChecked === 1) {
          await this.$store.dispatch('cart/delCart', item.skuId)
          this.getCartData()
        }
      })
    },
    updateAllCart (cartInfoList, event) {
      let isChecked = event.target.checked ? '1' : '0'
      cartInfoList.forEach(async (item) => {
        if (item.isChecked !== isChecked) {
          await this.$store.dispatch('cart/updateChecked', { skuId: item.skuId, isChecked })
          this.getCartData()
        }
      })
    }
  },
  computed: {
    ...mapState({
      cartInfoList: state => state.cart.cartInfoList
    }),
    Sum () {
      let sum = 0
      this.cartInfoList.forEach(item => {
        if (item.isChecked === 1) {
          sum += item.skuNum * item.skuPrice
        }
      })
      return sum
    },
    isAllchecked () {
      return this.cartInfoList.every(item => item.isChecked === 1)
    },
    checkedCount () {
      let count = 0
      this.cartInfoList.forEach(item => {
        if (item.isChecked === 1) count += 1
      })
      return count
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 20%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 20%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 20%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 23%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 4.5%;
        }

        .cart-list-con5 {
          width: 12.5%;
          transform: translateX(120%);

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;
          transform: translateX(155%);

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;
          transform: translateX(210%);

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
:deep(input::-webkit-outer-spin-button),
:deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none !important;
}
:deep(input[type='number']) {
  -moz-appearance: textfield;
}
</style>
