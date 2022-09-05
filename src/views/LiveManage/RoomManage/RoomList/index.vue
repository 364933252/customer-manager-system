<template>
  <div>
    <el-card>
      <div style="padding: 5px">
        <el-button type="success" @click="navToAddRoom" icon="el-icon-circle-plus-outline">新建直播间</el-button>
      </div>
      <scroll-bar :height="widowHeight - 30 + 'px'">
        <div class="room_live_list_box">
          <div class="room_live_list" v-for="item in roomList" :key="item.roomId">
            <div class="room_live">
              <div class="room_live_item_box">
                <img :src="item.cover_img" class="live_item_bg" alt="" srcset="" />
                <div class="anchor_info_box">
                  <el-avatar>主播</el-avatar>
                  <div style="font-size: 12px; color: #fff; margin-left: 5px">
                    {{ item.anchor_name }}
                  </div>
                </div>
                <div class="room_info_box">
                  <div class="room_status_box">
                    <span class="room_status" v-if="item.live_status === '101'">● 直播中</span>
                    <span class="room_status1" v-if="item.live_status === '102'">● 未开始</span>
                    <span class="room_status2" v-if="item.live_status === '103'">● 已结束</span>
                    <span class="room_status3" v-if="item.live_status === '104'">● 禁播</span>
                    <span class="room_status4" v-if="item.live_status === '105'">● 暂停</span>
                    <span class="room_status5" v-if="item.live_status === '106'">● 异常</span>
                    <span class="room_status6" v-if="item.live_status === '107'">● 已过期</span>
                  </div>
                  <div class="room_name_box">@2022丶价钱散人</div>
                </div>
              </div>
              <div class="room_live_item_info">
                <div class="live_room_title">
                  <strong>直播间信息</strong>
                </div>
                <div class="live_item_info">
                  <div class="info_item">
                    <span class="item_label">房间名称:</span>
                    <div class="item_value">{{ item.name }}</div>
                  </div>
                  <div class="info_item">
                    <span class="item_label">主播名称:</span>
                    <span class="item_value">{{ item.anchor_name }}</span>
                  </div>
                  <div class="info_item">
                    <span class="item_label">开播时间:</span>
                    <el-tooltip class="item" effect="light" :content="item.start_time | dateFilter" placement="top">
                      <span class="item_value">{{
                          item.start_time | dateFilter
                      }}</span>
                    </el-tooltip>
                  </div>
                  <div class="info_item">
                    <span class="item_label">结束时间:</span>
                    <el-tooltip class="item" effect="light" :content="item.end_time | dateFilter" placement="top">
                      <span class="item_value">{{
                          item.end_time | dateFilter
                      }}</span>
                    </el-tooltip>
                  </div>
                </div>
                <el-divider><i class="iconfont icon-kongzhimianban"></i></el-divider>
                <div class="live_room_action">
                  <!-- <div class="action">
                    <span style="margin-right: 5px">是否禁言:</span>
                    <div class="switch_box">
                      <el-switch
                        :width="40"
                        v-model="isNoSay"
                        active-value="1"
                        inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="是"
                        inactive-text="否"
                      ></el-switch>
                    </div>
                  </div> -->
                  <!-- <div class="action">
                    <span style="margin-right: 5px">是否评论:</span>
                    <div class="switch_box">
                      <el-popover placement="top" trigger="click" width="160" @hide="hidePopver">
                        <p>此操作将开启/关闭直播间评论功能，确定继续？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="isNoEditRoom">取消</el-button>
                          <el-button type="primary" size="mini" @click="editRoom(item)">确定</el-button>
                        </div>

                        <el-switch :width="40" v-model="item.close_comment" active-value="1" inactive-value="0"
                          active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"
                          slot="reference"></el-switch>
                      </el-popover>
                    </div>
                  </div> -->
                  <!-- <div class="action">
                    <span style="margin-right: 5px">是否分享:</span>
                    <div class="switch_box">
                      <el-switch
                        :width="40"
                        v-model="isNoSay"
                        active-value="1"
                        inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="是"
                        inactive-text="否"
                      ></el-switch>
                    </div>
                  </div> -->
                  <!-- <div class="action">
                    <span style="margin-right: 5px">是否点赞:</span>
                    <div class="switch_box">
                      <el-popover placement="top" trigger="click" width="160" @hide="hidePopver">
                        <p>此操作将开启/关闭直播间点赞功能，确定继续？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="isNoEditRoom">取消</el-button>
                          <el-button type="primary" size="mini" @click="editRoom(item)">确定</el-button>
                        </div>
                        <el-switch :width="40" slot="reference" v-model="item.close_like" active-value="1"
                          inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" active-text="是"
                          inactive-text="否"></el-switch>
                      </el-popover>
                    </div>
                  </div>
                  <div class="action">
                    <span style="margin-right: 5px">是否客服:</span>
                    <div class="switch_box">
                      <el-popover placement="top" trigger="click" width="160" @hide="hidePopver">
                        <p>此操作将开启/关闭直播间客服功能，确定继续？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="isNoEditRoom">取消</el-button>
                          <el-button type="primary" size="mini" @click="editRoom(item)">确定</el-button>
                        </div>
                        <el-switch :width="40" slot="reference" v-model="item.close_kf" active-value="1"
                          inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" active-text="是"
                          inactive-text="否"></el-switch>
                      </el-popover>
                    </div>
                  </div> -->
                  <!-- <div class="action">
                    <span style="margin-right: 5px">是否回放:</span>
                    <div class="switch_box">
                      <el-switch
                        :width="40"
                        v-model="isNoSay"
                        active-value="1"
                        inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="是"
                        inactive-text="否"
                      ></el-switch>
                    </div>
                  </div> -->
                  <!-- <div class="action">
                    <span style="margin-right: 5px">官方收录:</span>
                    <div class="switch_box">
                      <el-switch
                        :width="40"
                        v-model="isNoSay"
                        active-value="1"
                        inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="是"
                        inactive-text="否"
                      ></el-switch>
                    </div>
                  </div> -->
                  <div class="action_btns">
                    <el-tooltip class="item" effect="dark" content="修改" placement="top">
                      <el-button type="warning" icon="el-icon-edit" circle size="mini" @click="navToEditRoom(item.roomid)"></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" class="item" effect="dark" placement="top">
                      <el-button type="danger" @click="deleteRoom(item.roomid)" icon="el-icon-delete" circle size="mini"></el-button>
                    </el-tooltip>
                    <el-tooltip content="控制台" class="item" effect="dark" placement="top">
                      <el-button type="info" @click="navToControlPanel(item.roomid)" icon="el-icon-setting" circle size="mini"></el-button>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll-bar>
      <div style="display: flex; justify-content: flex-end">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="queryInfo.start" :page-sizes="[12, 24, 36, 48, 50]" :page-size="queryInfo.limit"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import scrollBar from '@/components/common/scrollBar.vue';
import {
  getRoomList,
  editRomm,
  deleteRoom
} from '@/api/liveManage/roomList/roomList';
import moment from 'moment';
export default {
  components: {
    scrollBar
  },
  data() {
    return {
      queryInfo: {
        start: 1,
        limit: 12
      },
      total: 10,
      roomList: [],
      isNoSay: '',
      isCommentVisible: false,
      visible: false
    };
  },
  computed: {
    ...mapState({
      widowHeight: (state) => state.common.tableHeight
    })
  },
  created() {
    this.getRoomList();
  },
  filters: {
    dateFilter: function (date) {
      return moment(Number(date * 1000)).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  methods: {
    // 获取直播间列表
    getRoomList: async function () {
      const start = this.queryInfo.start - 1;
      const param = {
        Entry: {
          start: start,
          limit: this.queryInfo.limit
        }
      };
      const { data: res } = await getRoomList(param);
      console.log(res);
      this.roomList = res.data.room_info;
      this.total = res.data.total;
    },
    // 跳转添加直播间页面
    navToAddRoom: function () {
      this.$router.push({
        name: 'addRoom'
      });
    },
    // 确定关闭评论
    editRoom: async function (item) {
      const params = {
        Entry: {
          id: Number(item.roomid),
          Name: item.name,
          CoverImg: item.CoverImg,
          StartTime: moment(Number(item.start_time * 1000)).format('YYYY-MM-DD HH:mm:ss'),
          EndTime: moment(Number(item.end_time * 1000)).format('YYYY-MM-DD HH:mm:ss'),
          AnchorName: item.anchor_name,
          AnchorWechat: item.AnchorWechat,
          ShareImg: item.ShareImg,
          FeedsImg: item.FeedsImg,
          IsFeedsPublic: Number(item.is_feeds_public),
          Type: 0,
          CloseLike: Number(item.close_like),
          CloseGoods: Number(item.close_goods),
          CloseComment: Number(item.close_comment),
          CloseReplay: Number(item.close_replay),
          CloseShare: 0,
          CloseKf: Number(item.close_kf)
        }
      };
      console.log(params.Entry, '13');
      const { data: res } = await editRomm(params);
      // this.getRoomList()
      document.body.click()
      // console.log(res);
    },
    // 删除直播间
    deleteRoom: async function (roomid) {
      const params = {
        Entry: {
          id: Number(roomid)
        }
      }
      const confirmResult  = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        this.getRoomList()
        return this.$message.info('已取消删除！')
      }
      const { data: res} = await deleteRoom(params)
      this.getRoomList()
    },
    // 跳转至直播间控制面板
    navToControlPanel: function (id) {
      this.$router.push(`/roomControlPanel/${id}`)
    },
    // 取消关闭评论
    isNoEditRoom: function () {
      document.body.click()
    },
    // 隐藏修改直播间弹框事件
    hidePopver: function () {
      this.getRoomList()
    },
    // 跳转至修改直播间页面
    navToEditRoom: function (roomid) {
      this.$router.push(`/editRoom/${roomid}`)
    },
    handleSizeChange: function (val) {
      console.log(`当前显示${val}条`);
      this.queryInfo.limit = val
      this.getRoomList()
    },
    handleCurrentChange: function (val) {
      console.log(`当前第${val}页`);
      this.queryInfo.start = val
      this.getRoomList()
    }
  }
};
</script>

<style>
@import url('../../../../assets/css/roomList.css');
</style>
