<template>
<div class="login-container">

  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

    <div class="title-container">
      <h3 class="title">欢迎来到联恒考勤管理系统</h3>
    </div>

    <el-form-item prop="username">
      <span class="svg-container"><i class="icon-user2"></i></span>
      <el-input v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text" auto-complete="on" />
    </el-form-item>

    <el-form-item prop="password">
      <span class="svg-container"><i class="icon-hkpassword"></i></span>
      <el-input :type="passwordType" v-model="loginForm.password" placeholder="请输入密码" name="password" auto-complete="on" @keyup.enter.native="handleLogin" />
      <span class="show-pwd" @click="showPwd"><i class="icon-eye"></i></span>
    </el-form-item>

    <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin"> 登录 </el-button>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('Please enter the user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('Please enter the password'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

  mounted() {
    var me = this;
    /// 当设备加载完毕
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      console.log('device ready');

    }
  },

  created() {

  },
  destroyed() {

  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
        var vm = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          vm.loading = true
          // this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
          //   this.loading = false
          //   this.$router.push({
          //     path: this.redirect || '/'
          //   })
          // }).catch(() => {
          //   this.loading = false
          // })
          setTimeout(function () {
            vm.loading = false;
            vm.$router.push('/Home/')
          }, 2000);
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg: #283443;
$light_gray: #eee;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
        &::first-line {
            color: $light_gray;
        }
    }
}
/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
            background: transparent;
            border: 0;
            -webkit-appearance: none;
            border-radius: 0;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;
            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>
