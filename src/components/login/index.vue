<style lang="less">
@gradient-color: #3788ee;
@bg-color: #f7f8fa;
@title-color:#3a3a3a;
@text-color: #7e7e7e;
@placeholder-color: #7e7e7e;
.login-vue {
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: @bg-color;
  .login-container {
    width: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-content {
      letter-spacing: 2px;
      background: #FFF;
      padding: 70px 30px 20px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border-radius: 3px;
      box-sizing: border-box;
      >div {
        margin: 30px 0;
        &.login-input {
          position: relative;
          .placeholder {
            position: absolute;
            color: @placeholder-color;
            top: 6px;
            font-size: 16px;
            transition: all .2s;
            left: 0;
            pointer-events: none;
          }
          input {
            font-size: 16px;
            padding: 8px 0;
            height: 40px;
            width: 100%;
            border: none;
            border-radius: 0;
            border-bottom: 1px solid #d3d3d3;
            box-shadow: inset 0 0 0 1000px #fff;
            outline: none;
            box-sizing: border-box;
            transition: .3s;
            font-weight: 200;
            &:focus {
              border-bottom-color: @gradient-color;
              box-shadow: inset 0 0 0 1000px #fff;
            }
          }
          input:focus + .placeholder, .placeholder.fixed{
            font-size: 13px;
            top: -16px;
          }
          input:-webkit-autofill + .placeholder {
            font-size: 13px;
            top: -16px;
          }
        }
        &.login-title {
          font-size: 30px;
          color: @title-color;
          line-height: 1;
          margin: -16px 0px 40px;
          font-weight: 200;
        }

      }
      > .buttonDiv {
        margin-top: 45px;
        .h-btn {
          padding: 12px 0;
          font-size: 18px;
          opacity: .8;
          border-radius: 3px;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
    .copyright {
      letter-spacing: 1px;
      margin-top: 30px;
      color: @text-color;
      a {
        color: @text-color;
      }
    }
  }
}
</style>

<template>
  <div class="login-vue">
    <div class="login-container">
      <div class="login-content">
        <div class="login-title">管理系统</div>
        <div class="login-name login-input">
          <input type="text" name="username" v-model="login.mobile" autocomplete="off"/>
          <span class="placeholder" :class="{fixed: login.mobile != '' && login.mobile != null}">用户名</span>
        </div>
        <div class="login-password login-input">
          <input type="password" name="password" v-model="login.password" @keyup.enter="submit" autocomplete="off"/>
          <span class="placeholder" :class="{fixed: login.password != '' && login.password != null}">密码</span>
        </div>
        <div class="buttonDiv" >
          <Button :loading="loginloading" v-width="100" style="margin-right: 20px;" color="primary" size="l" @click="submit">登录</Button>
          <Button :loading="registerloading" v-width="100" color="green" size="l" @click="register">注册</Button>
        </div>
      </div>
      <p class="copyright"> Copyright © 2019 vvpvvp - <a href="https://www.heyui.top/">heyui.top</a></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: {
        mobile: '18735674692',
        password: '123456'
      },
      loginloading: false,
      registerloading: false
    };
  },
  mounted() {
  },
  methods: {
    async submit() {
      this.loginloading = true;

      const res = await R.Common.login(this.login)
      if (res.ok) {
        Utils.saveLocal('showmobile', res.data.showmobile);
        Utils.saveLocal('mobile', res.data.mobile);
        Utils.saveLocal('token', res.data.token);
        window.location = '/';
        this.$Message.success(res.msg)
      }
      this.loginloading = false;
      
    },
    async register() {
      this.registerloading = true;

      const res = await R.Common.register(this.login)
      if (res.ok) {
        this.$Message.success(res.msg)
      }
      this.registerloading = false;
    }
  }
};
</script>
