<template>
  <div>
    <el-card>
      <div slot="header" style="text-align: center">
        <span style="font-weight: bold; font-size: 30px; text-align: center"
          >创建直播间</span
        >
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
              <div class="live_img_box">
                <div class="live_share_box">
                  <el-avatar
                    shape="square"
                    size="medium"
                    src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                  ></el-avatar>
                  <div class="live_share">
                    <div class="live_share_title">
                      <div class="share_title_img">
                        <img
                          src="../../../../../assets/images/x.png"
                          class="title_img"
                          alt=""
                        />
                      </div>
                      <div class="share_title">利中石小程序</div>
                    </div>
                    <div class="share_desc_info">好友邀请你参与直播:</div>
                    <div class="live_share_img">
                      <img
                        src="../../../../../assets/images/share.png"
                        class="share_img"
                        alt=""
                        srcset=""
                      />
                    </div>
                  </div>
                </div>
                <div class="live_form_box">
                  <div class="form_info_box">
                    <div class="info_title">分享卡片封面</div>
                    <div class="info_desc">
                      <div>微信对话框内分享的直播间将以分享卡片的形式呈现</div>
                      <div>建议尺寸:800像素 * 640像素,图片大小不得超过1M。</div>
                    </div>
                  </div>
                  <el-form-item label-width="0">
                    <el-upload
                      class="upload-demo"
                      action="https://dataexpansion.cn/api/business/BroadcastRoom/UploadMedia"
                      list-type="picture"
                      :multiple="false"
                      :limit="1"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </el-form-item>
                </div>
              </div>
              <div class="live_img_box">
                <div class="live_share_box">
                  <img
                    src="../../../../../assets/images/public.png"
                    style="width: 150px; height: 150px"
                    alt=""
                    srcset=""
                  />
                  <div class="live_share1">
                    <div class="live_share_title">
                      <div class="share_title_img">
                        <img
                          src="../../../../../assets/images/x.png"
                          class="title_img"
                          alt=""
                        />
                      </div>
                      <div class="share_title">利中石小程序</div>
                    </div>
                    <div class="share_desc_info">利中石主播</div>
                    <div class="share_goods_box">
                      <div class="goods_box">商品展示</div>
                      <div class="goods_box">商品展示</div>
                    </div>
                  </div>
                </div>
                <div class="live_form_box">
                  <div class="form_info_box">
                    <div class="info_title">直播卡片封面</div>
                    <div class="info_desc">
                      <div>
                        图片建议大小为 800像素 * 800像素。 图片大小不超过
                        300KB。
                      </div>
                      <div>
                        图片内容遵循平台规范后更容易被推荐。 了解官方收录
                      </div>
                    </div>
                  </div>
                  <el-form-item label-width="0">
                    <el-upload
                      class="upload-demo"
                      action="https://dataexpansion.cn/api/business/BroadcastRoom/UploadMedia"
                      list-type="picture"
                      :multiple="false"
                      :limit="1"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </el-form-item>
                </div>
              </div>
              <div class="live_cover_bg_box">
                <div class="live_cover_bg">
                  <div class="cover_bottom_box">
                    <div class="live_comment_box">跟主播说点什么吧</div>
                    <div class="live_care_box">
                      <img src="../../../../../assets/images/care.png" class="care_img" alt="" />
                    </div>
                  </div>
                </div>
                <div class="live_cover_info_box">
                  <div class="cover_info_box">
                    <div class="info_title">分享卡片封面</div>
                    <div class="info_desc">
                      <div>直播间背景墙是每个直播间的默认背景。</div>
                      <div>建议尺寸：600像素 * 1300像素，图片大小不得超过 3M。</div>
                    </div>
                  </div>
                  <el-form-item label-width="0" style="margin-left:15px;">
                    <el-upload
                      class="upload-demo"
                      action="https://dataexpansion.cn/api/business/BroadcastRoom/UploadMedia"
                      list-type="picture"
                      :multiple="false"
                      :limit="1"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </el-form-item>
                  <div class="cover_info_box">
                    <div class="info_title">直播间功能</div>
                    <div class="info_desc">
                      <div>以下两个功能无法在开播后设置开启或关闭</div>
                    </div>
                  </div>
                  <el-form-item label-width="0" style="margin-left:15px;">
                     <el-checkbox true-label="1" false-label="0" v-model="addRoomForm.CloseComment" checked>评论</el-checkbox>
                  </el-form-item>
                  <el-form-item label-width="0" style="margin-left:15px;">
                    <el-checkbox true-label="1" false-label="0" v-model="addRoomForm.CloseLike" checked>点赞</el-checkbox>
                  </el-form-item>
                  <div class="cover_info_box">
                    <div class="info_title">拓展功能</div>
                  </div>
                  <el-form-item label-width="0" style="margin-left:15px;">
                    <el-checkbox true-label="1" false-label="0" v-model="addRoomForm.CloseKf">客服</el-checkbox>
                  </el-form-item>
                </div>
              </div>
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
