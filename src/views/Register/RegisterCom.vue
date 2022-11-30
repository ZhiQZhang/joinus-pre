<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/home/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" v-model="phone" @blur="handler(phone, $event)" placeholder="请输入你的手机号" />
        <span class="error-msg">{{errMsg}}</span>
      </div>
      <div class="content" style="padding-left: 115px">
        <label>验证码:</label>
        <input type="text" v-model="code" placeholder="请输入验证码" />
        <button
          :class="disabled ? 'op' : ''"
          ref="codebtn"
          :disabled="disabled"
          style="width: 100px; height: 34px; margin-left: 10px"
          @click="sendCode(phone)">
          <span v-show="!disabled">获取验证码</span>
          <span v-show="disabled" style="padding-top:10px;transform:translateX(30px)">{{curCount}}s后可重新发送</span>
        </button>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          v-model="password"
          placeholder="请输入你的登录密码"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" v-model="repeatPwd" placeholder="请输入确认密码" />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterCom',
  data () {
    return {
      phone: '',
      password: '',
      repeatPwd: '',
      code: '',
      disabled: false,
      curCount: 0,
      errMsg: ''
    }
  },
  methods: {
    async sendCode (phone) {
      let count = 60
      this.curCount = count
      this.disabled = true
      let timer = window.setInterval(() => {
        if (this.curCount === 0) {
          window.clearInterval(timer)
          this.disabled = false
        } else {
          this.curCount -= 1
        }
      }, 1000)
      try {
        await this.$store.dispatch('user/getCode', phone)
        this.code = this.$store.state.user.code
      } catch (error) {
        alert('发送失败')
      }
    },
    async userRegister () {
      try {
        await this.$store.dispatch('user/userRegister', { phone: this.phone, code: this.code, password: this.password })
        this.$router.push('/home/login')
      } catch (error) {
        alert(error.message)
      }
    },
    handler (type, event) {
      let pattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (event.target.value !== '' && pattern.test(event.target.value)) {
        this.errMsg = '手机号符合'
      } else {
        this.errMsg = '手机号不正确'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      margin-bottom: 18px;
      position: relative;
      display: flex;
      justify-content: center;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;
      display: flex;
      justify-content: center;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      display: flex;
      justify-content: center;
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
.op {
  opacity: 0.5;
}
</style>
