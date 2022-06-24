<template>
  <div class="container">
    <div class="login">
      <div class="login_box">
        <div class="login_box_left">
          <div class="left_img"></div>
          <div class="left_img1"></div>
          <div class="left_img2"></div>
          <div class="left_img3"></div>
          <div class="left_img4"></div>
          <div class="left_img5"></div>
          <div class="left_img6"></div>
          <div class="left_img7"></div>
        </div>
        <div class="login_box_right">
          <div class="login_form_header">
            <img src="../assets/logo.png" class="logo_cls" alt="" />
            <span>墨辰CRM系统</span>
          </div>
          <!-- <div class="login_nav_box">
            <ul class="nav_item">
              <li class="item">账号登录</li>
              <li class="item">扫码登录</li>
            </ul>
          </div> -->
          <div class="login_form_box">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
              <el-form-item label="" prop="username">
                <el-input
                  v-model="loginForm.username"
                  prefix-icon="el-icon-user"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  prefix-icon="el-icon-lock"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item>
                <div class="form_btn">
                  <el-button type="primary" @click="login">登录</el-button>
                  <el-button type="">重置</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
         { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 登录
    login: function () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) return this.$router.push('/home')
      })
    }
  }
};
</script>
<style scoped>
@import url('../assets/css/login.css');
</style>
