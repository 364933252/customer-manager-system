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
            <span>利中石PLM系统</span>
          </div>
          <!-- <div class="login_nav_box">
            <ul class="nav_item">
              <li class="item">账号登录</li>
              <li class="item">扫码登录</li>
            </ul>
          </div> -->
          <div class="login_form_box">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
              <el-form-item label="" prop="Entry.Phone">
                <el-input v-model="loginForm.Entry.Phone" placeholder="请输入手机号" prefix-icon="el-icon-user" clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="" prop="Entry.Password">
                <div class="send_msg">
                  <el-input type="text" v-model="loginForm.Entry.Password" placeholder="请输入验证码"
                    prefix-icon="el-icon-mobile" clearable></el-input>
                  <el-button type="primary" v-if="!isSend" @click="sendMsg">获取验证码</el-button>
                  <div v-if="isSend">
                    <el-button type="info" disabled plain>{{ second }}s</el-button>
                  </div>
                </div>
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
import { loginApi, sendMsg } from '@/api/login/login';
export default {
  data() {
    return {
      loginForm: {
        comm: {
          PortId: '101'
        },
        Entry: {
          Phone: '15689360191',
          Password: '280586',
          LoginType: '901'
        }
      },
      loginFormRules: {
        'Entry.Phone': [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        'Entry.Password': [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      second: 60,
      isSend: false
    };
  },
  methods: {
    // 登录
    login: async function () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return false
        const { data: res } = await loginApi(this.loginForm)
        if (res.code !== 200) return false
        window.sessionStorage.setItem('AccessToken', res.data[0].AccessToken)
        window.sessionStorage.setItem('BusinessId', res.data[0].BusinessId)
        window.sessionStorage.setItem('OrgnName', res.data[0].OrgnName)
        window.sessionStorage.setItem('RefreshToken', res.data[0].RefreshToken)
        window.sessionStorage.setItem('TypeName', res.data[0].TypeName)
        this.$router.push('/home')
      });
    },
    // 倒计时
    countDown: async function () {
      var interVal = setInterval(() => {
        var second = this.second;
        if (second === 0) {
          this.isSend = false;
          this.second = 60;
          clearInterval(interVal);
        } else {
          second--;
          this.second = second;
          this.isSend = true;
        }
      }, 1000);
    },
    // 发送验证码
    sendMsg: async function () {
      const param = {
        Entry: {
          Phone: this.loginForm.Entry.Phone
        }
      };

      this.$refs.loginFormRef.validateField('Entry.Phone', async valid => {
        console.log(valid, '发送验证码校验')
        if (valid) return false
        const { data: res } = await sendMsg(param)
        if (res.code === 1 ) return this.$message.warning('发送频繁，请稍后再试！')
        this.countDown()
      })
    }
  }
};
</script>
<style scoped>
@import url('../assets/css/login.css');
</style>
