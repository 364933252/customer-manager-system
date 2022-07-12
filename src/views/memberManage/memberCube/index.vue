<template>
  <div class="main_box">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          plain
          @click="dialogVisible = true"
          >新建魔方</el-button
        >
      </el-col>
    </el-row>
    <div class="member_cube_box">
        <div class="member_cube_item">
            <el-card shadow="hover">
                <div slot="header">会员魔方1</div>
                <div></div>
            </el-card>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
@import url('../../../assets/css/member.css');
</style>
