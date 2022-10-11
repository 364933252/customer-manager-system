<template>
  <div>
    <el-card>
      <div slot="header" style="text-align: center">
        <span style="font-weight: bold; font-size: 30px; text-align: center">创建直播间</span>
      </div>
      <div>
        <el-form ref="addRoomFormRef" :model="addRoomForm" label-position="left" label-width="110px"
          :rules="addRoomFormRules">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="直播类型" class="form_item">
                <el-radio-group v-model="addRoomForm.Type">
                  <el-radio label="0">手机直播</el-radio>
                  <el-radio label="1">推流设备直播</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="直播间标题" class="form_item" prop="Name">
                <el-input v-model="addRoomForm.Name" placeholder="填写本次直播的标题" maxlength="17" show-word-limit clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="开播时间" required>
                <el-col :span="8">
                  <el-form-item prop="StartTime">
                    <el-date-picker v-model="addRoomForm.StartTime" type="datetime" placeholder="选择开播时间"
                      value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="EndTime">
                    <el-date-picker v-model="addRoomForm.EndTime" type="datetime" placeholder="选择结束时间"
                      value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="主播昵称" prop="AnchorName" class="form_item">
                <el-input v-model="addRoomForm.AnchorName" placeholder="填写本次直播的主播昵称" maxlength="15" show-word-limit
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="主播微信账号" prop="AnchorWechat" class="form_item">
                <el-input v-model="addRoomForm.AnchorWechat" placeholder="请输入主播微信账号" clearable></el-input>
              </el-form-item>
              <el-form-item label="主播副号" class="form_item" prop="SubAnchorWechat">
                <el-input v-model="addRoomForm.SubAnchorWechat" placeholder="请输入主播副号微信账号" clearable></el-input>
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
                  <el-avatar shape="square" size="medium"
                    src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
                  <div class="live_share">
                    <div class="live_share_title">
                      <div class="share_title_img">
                        <img src="../../../../../assets/images/x.png" class="title_img" alt="" />
                      </div>
                      <div class="share_title">利中石小程序</div>
                    </div>
                    <div class="share_desc_info">好友邀请你参与直播:</div>
                    <div class="live_share_img">
                      <img :src="shareImgSrc" class="share_img" alt="" srcset="" />
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
                  <el-form-item label-width="0" prop="ShareImg">
                    <!-- 直播间分享图上传 -->
                    <el-upload class="upload-demo" action="action" list-type="picture"
                      :http-request="uploadLiveShareImg" :multiple="false" :limit="1" :on-preview="handlePreview"
                      :on-remove="handleShareRemove" :on-change="handleShareChange">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </div>
              </div>
              <div class="live_img_box">
                <div class="live_share_box">
                  <img src="../../../../../assets/images/public.png" style="width: 150px; height: 150px" alt=""
                    srcset="" />
                  <div class="live_share1">
                    <div class="live_share_title">
                      <div class="share_title_img">
                        <img src="../../../../../assets/images/x.png" class="title_img" alt="" />
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
                  <el-form-item label-width="0" prop="FeedsImg">
                    <!--直播卡片图片上传 -->
                    <el-upload class="upload-demo" action="action" list-type="picture" :http-request="uploadLiveImg"
                      :multiple="false" :limit="1" :on-preview="handlePreview" :on-remove="handleFeedsRemove"
                      :on-change="handleLiveChange">
                      <el-button size="small" type="primary">点击上传</el-button>
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
                    <div class="info_title">直播间背景墙</div>
                    <div class="info_desc">
                      <div>直播间背景墙是每个直播间的默认背景。</div>
                      <div>
                        建议尺寸：600像素 * 1300像素，图片大小不得超过 3M。
                      </div>
                    </div>
                  </div>
                  <el-form-item label-width="0" prop="CoverImg" style="margin-left: 15px">
                    <!-- 直播背景墙图片上传 -->
                    <el-upload class="upload-demo" action="action" list-type="picture"
                      :http-request="uploadLiveCoverImg" :multiple="false" :limit="1" :on-preview="handlePreview"
                      :on-remove="handleCoverRemove" :on-change="handleLiveCoverChange">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                  <div class="cover_info_box">
                    <div class="info_title">直播间功能</div>
                    <div class="info_desc">
                      <div>以下两个功能无法在开播后设置开启或关闭</div>
                    </div>
                  </div>
                  <el-form-item label-width="0" style="margin-left: 15px">
                    <el-checkbox true-label="0" false-label="1" v-model="addRoomForm.CloseComment">评论
                    </el-checkbox>
                  </el-form-item>
                  <el-form-item label-width="0" style="margin-left: 15px">
                    <el-checkbox true-label="0" false-label="1" v-model="addRoomForm.CloseLike">点赞</el-checkbox>
                  </el-form-item>
                  <div class="cover_info_box">
                    <div class="info_title">拓展功能</div>
                  </div>
                  <el-form-item label-width="0" style="margin-left: 15px">
                    <el-checkbox true-label="0" false-label="1" v-model="addRoomForm.CloseKf">客服</el-checkbox>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-form-item>
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
              ">
              <el-button type="primary" @click="addLiveRoom">立即创建</el-button>
              <el-button>取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUploadImgUrl, uploadImg, addLiveRoom } from '@/api/liveManage/roomAdd/roomAdd';
export default {
  data() {
    var ShareImgValidate = (rule, value, callback) => {
      console.log(value, '2222');
      if (this.addRoomForm.ShareImg === '' || this.addRoomForm.ShareImg === undefined) {
        callback(new Error('请上传分享卡片封面'))
      } else {
        console.log('1111');
        callback()
      }
    }
    var FeedsImgValidate = (rule, value, callback) => {
      if (this.addRoomForm.FeedsImg === '' || this.addRoomForm.ShareImg === undefined) {
        callback(new Error('请上传直播卡片封面'))
      } else {
        callback()
      }
    }
    var CoverImgValidate = (rule, value, callback) => {
      if (this.addRoomForm.CoverImg === '' || this.addRoomForm.ShareImg === undefined) {
        callback(new Error('请上传直播间背景墙'))
      } else {
        callback()
      }
    }
    return {
      addRoomForm: {
        Type: '0',
        Name: '',
        StartTime: '',
        EndTime: '',
        AnchorName: '',
        AnchorWechat: '',
        SubAnchorWechat: '',
        IsFeedsPublic: '0',
        ShareImg: '',
        FeedsImg: '',
        CoverImg: '',
        CloseComment: '0',
        CloseLike: '0',
        CloseKf: '0'
      },
      shareImgSrc: require('../../../../../assets/images/share.png'),
      addRoomFormRules: {
        Name: [
          { required: true, message: '请输入直播间标题!', tigger: 'blur' },
          { min: 3, max: 17, message: '长度在 3 到 17 个字符', trigger: 'blur' }
        ],
        StartTime: [
          {
            type: 'string',
            required: true,
            message: '请选择开播时间!',
            tigger: 'change'
          }
        ],
        EndTime: [
          {
            type: 'string',
            required: true,
            message: '请选择结束时间!',
            tigger: 'change'
          }
        ],
        AnchorName: [
          { required: true, message: '请输入主播昵称!', tigger: 'blur' }
        ],
        AnchorWechat: [
          { required: true, message: '请输入主播微信账号!', tigger: 'blur' }
        ],
        SubAnchorWechat: [
          { required: true, message: '请输入主播副号微信账号!', tigger: 'blur' }
        ],
        ShareImg: [
          { required: true, validator: ShareImgValidate, tigger: 'change' }
        ],
        FeedsImg: [
          { required: true, validator: FeedsImgValidate, tigger: 'change' }
        ],
        CoverImg: [
          { required: true, validator: CoverImgValidate, tigger: 'change' }
        ]
      }
    };
  },
  created() { },
  methods: {
    // 获取直播开始/结束时间
    // getTime: function (e) {
    //   this.addRoomForm.StartTime = e[0];
    //   this.addRoomForm.EndTime = e[1];
    // },
    // 上传直播间所需图片
    uploadLiveShareImg: async function (e) {
      const formData = new FormData();
      formData.append('media', e.file);
      const { data: res } = await getUploadImgUrl();
      const { data: res1 } = await uploadImg(res.data, formData);
      console.log(res1, '111222111');
      this.addRoomForm.ShareImg = res1.media_id
      console.log(this.addRoomForm, '456456465');
    },
    // 上传直播间所需图片
    uploadLiveImg: async function (e) {
      const formData = new FormData();
      formData.append('media', e.file);
      const { data: res } = await getUploadImgUrl();
      console.log(res, '上传路径');
      const { data: res1 } = await uploadImg(res.data, formData);
      this.addRoomForm.FeedsImg = res1.media_id
    },
    // 上传直播间所需图片
    uploadLiveCoverImg: async function (e) {
      const formData = new FormData();
      formData.append('media', e.file);
      const { data: res } = await getUploadImgUrl();
      console.log(res, '上传路径');
      const { data: res1 } = await uploadImg(res.data, formData);
      this.addRoomForm.CoverImg = res1.media_id
    },
    // 创建直播间
    addLiveRoom: function () {
      console.log(this.addRoomForm);
      this.$refs.addRoomFormRef.validate(async valid => {
        if (!valid) return false
        const params = {
          Entry: this.addRoomForm
        }
        const { data: res } = await addLiveRoom(params)
        this.$refs.addRoomFormRef.resetFields()
        console.log(res, '创建直播间');
      })
    },
    // 删除上传图片
    handleShareRemove(file, fileList) {
      console.log(file, fileList);
      this.addRoomForm.ShareImg = ''
    },
    handleFeedsRemove(file, fileList) {
      console.log(file, fileList);
      this.addRoomForm.FeedsImg = ''
    },
    handleCoverRemove(file, fileList) {
      console.log(file, fileList);
      this.addRoomForm.CoverImg = ''
    },
    //
    handlePreview(file) {
      console.log(file);
    },
    handleShareChange(file, fileList) {
      //   this.addRoomForm.ShareImg = file;
    },
    handleLiveChange(file, fileList) {
      //   this.addRoomForm.FeedsImg = file;
    },
    handleLiveCoverChange(file, fileList) {
      //   this.addRoomForm.CoverImg = file;
    }
  }
};
</script>

<style>
@import url('../../../../../assets/css/roomList.css');
</style>
