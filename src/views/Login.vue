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
            <el-form
              ref="loginFormRef"
              :model="loginForm"
              :rules="loginFormRules"
            >
              <el-form-item label="" prop="Entry.phone">
                <el-input
                  v-model="loginForm.Entry.phone"
                  placeholder="请输入手机号"
                  prefix-icon="el-icon-user"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="Entry.Password">
                <div class="send_msg">
                  <el-input
                    type="text"
                    v-model="loginForm.Entry.Password"
                    placeholder="请输入验证码"
                    prefix-icon="el-icon-mobile"
                    clearable
                  ></el-input>
                  <el-button type="primary" v-if="!isSend" @click="countDown"
                    >获取验证码</el-button
                  >
                  <div v-if="isSend">
                    <el-button type="info" disabled plain
                      >{{ second }}s</el-button
                    >
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
import axios from '@/utils/axios';
export default {
  data() {
    return {
      loginForm: {
        comm: {
          PortId: '101'
        },
        Entry: {
          phone: '',
          Password: '',
          LoginType: '901'
        }
      },
      loginFormRules: {
        'Entry.phone': [
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
        loginApi(this.loginForm).then(res => {
          console.log(res);
        })
        
      });
    },
    // 倒计时
    countDown: async function () {
      console.log(111);
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
      this.sendMsg();
    },
    // 发送验证码
    sendMsg: async function () {
      const param = {
        Entry: {
          Phone: this.loginForm.Entry.phone
        }
      };
      axios.post('/api/Authorize/SendPassWord',param).then(res => {
        console.log(res);
      });
      // const res = await this.$http.post('https://dataexpansion.cn/api/Authorize/SendPassWord',param)
      // console.log(res);
    }
  }
};
</script>
<style scoped>
@import url('../assets/css/login.css');
</style>
