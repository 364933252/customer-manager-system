<template>
  <div class="msg_box">
    <div class="msg_title_box">
      <div class="msg_title">消息</div>
      <div class="operate"></div>
    </div>
    <div class="scroll_bar">
      <el-card shadow="hover">
        <el-row>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
            ><div class="grid-content bg-purple">1</div></el-col
          >
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
            ><div class="grid-content bg-purple-light">20</div></el-col
          >
        </el-row>
      </el-card>
      <el-card shadow="hover">
        <el-row>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
            ><div class="grid-content bg-purple">1</div></el-col
          >
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
            ><div class="grid-content bg-purple-light">20</div></el-col
          >
        </el-row>
      </el-card>
      <el-card shadow="hover">
        <el-row>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
            ><div class="grid-content bg-purple">1</div></el-col
          >
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
            ><div class="grid-content bg-purple-light">20</div></el-col
          >
        </el-row>
      </el-card>
      <el-card shadow="hover">
        <el-row>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
            ><div class="grid-content bg-purple">1</div></el-col
          >
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
            ><div class="grid-content bg-purple-light">20</div></el-col
          >
        </el-row>
      </el-card>
      <el-card shadow="hover">
        <el-row>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
            ><div class="grid-content bg-purple">1</div></el-col
          >
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
            ><div class="grid-content bg-purple-light">20</div></el-col
          >
        </el-row>
      </el-card>
      <el-card shadow="hover">
        <el-row>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
            ><div class="grid-content bg-purple">1</div></el-col
          >
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
            ><div class="grid-content bg-purple-light">20</div></el-col
          >
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'messageModule',
  data() {
    return {
      count: 0
    };
  },
  methods: {
    load() {
      this.count += 2;
    }
  }
};
</script>

<style>
@import url('../../../assets/css/homePage.css');
</style>
