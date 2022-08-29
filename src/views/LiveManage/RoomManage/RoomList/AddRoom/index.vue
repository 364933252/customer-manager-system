<template>
  <div>
    <el-card>
      <div slot="header" style="text-align: center;">
        <span style="font-weight: bold; font-size: 30px;text-align: center;">创建直播间</span>
      </div>
      <div>
        <el-form
          ref="addRoomFormRef"
          :model="addRoomForm"
          label-position="left"
          label-width="100px"
        >
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="直播类型" class="form_item">
                <el-radio-group v-model="addRoomForm.Type">
                  <el-radio label="0">手机直播</el-radio>
                  <el-radio label="1">推流设备直播</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="直播间标题" class="form_item">
                <el-input
                  v-model="addRoomForm.Name"
                  placeholder="填写本次直播的标题"
                  maxlength="17"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="开播时间" class="form_item">
                <el-date-picker
                  v-model="roomDate"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="getTime"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="主播昵称" class="form_item">
                <el-input
                  v-model="addRoomForm.AnchorName"
                  placeholder="填写本次直播的主播昵称"
                  maxlength="15"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="主播微信账号" class="form_item">
                <el-input
                  v-model="addRoomForm.AnchorWechat"
                  placeholder="请输入主播微信账号"
                ></el-input>
              </el-form-item>
              <el-form-item label="主播副号" class="form_item">
                <el-input
                  v-model="addRoomForm.SubAnchorWechat"
                  placeholder="请输入主播微信账号"
                ></el-input>
              </el-form-item>
              <el-form-item label="官方收录" class="form_item">
                <el-radio-group v-model="addRoomForm.IsFeedsPublic">
                  <el-radio label="1">开启</el-radio>
                  <el-radio label="0">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addRoomForm: {},
      roomDate: []
    };
  },
  methods: {
    // 获取直播开始/结束时间
    getTime: function (e) {
      this.addRoomForm.StartTime = e[0];
      this.addRoomForm.EndTime = e[1];
    }
  }
};
</script>

<style>
@import url('../../../../../assets/css/roomList.css');
</style>
