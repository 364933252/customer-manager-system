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
                <img :src="item.cover_img" class="live_item_bg" alt="" srcset="">
                <div class="anchor_info_box">
                  <el-avatar>主播</el-avatar>
                  <div style="font-size: 12px; color: #fff; margin-left: 5px;">2022丶富家子弟</div>
                </div>
                <div class="room_info_box">
                  <div class="room_status_box">
                    <span class="room_status">● 直播中</span>
                  </div>
                  <div class="room_name_box">
                    @2022丶价钱散人
                  </div>
                </div>
              </div>
              <div class="room_live_item_info">
                <div class="live_room_title">
                  <strong>直播间信息</strong>
                </div>
                <div class="live_item_info">
                  <div class="info_item">
                    <span class="item_label">房间名称:</span>
                    <div class="item_value">{{  item.name  }}</div>
                  </div>
                  <div class="info_item">
                    <span class="item_label">主播名称:</span>
                    <span class="item_value">{{  item.anchor_name  }}</span>
                  </div>
                  <div class="info_item">
                    <span class="item_label">开播时间:</span>
                    <span class="item_value">{{  item.start_time | dateFilter  }}</span>
                  </div>
                  <div class="info_item">
                    <span class="item_label">结束时间:</span>
                    <span class="item_value">{{  item.end_time | dateFilter  }}</span>
                  </div>
                </div>
                <el-divider><i class="iconfont icon-kongzhimianban"></i></el-divider>
                <div class="live_room_action">
                  <div class="action">
                    <span style="margin-right: 5px;">是否禁言:</span>
                    <div class="switch_box">
                      <el-switch :width="40" v-model="isNoSay" active-value="1" inactive-value="0"
                        active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
                    </div>
                  </div>
                  <div class="action">
                    <span style="margin-right: 5px;">是否评论:</span>
                    <div class="switch_box">
                      <el-switch :width="40" v-model="isNoSay" active-value="1" inactive-value="0"
                        active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
                    </div>
                  </div>
                  <div class="action">
                    <span style="margin-right: 5px;">是否分享:</span>
                    <div class="switch_box">
                      <el-switch :width="40" v-model="isNoSay" active-value="1" inactive-value="0"
                        active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
                    </div>
                  </div>
                  <div class="action">
                    <span style="margin-right: 5px;">是否点赞:</span>
                    <div class="switch_box">
                      <el-switch :width="40" v-model="isNoSay" active-value="1" inactive-value="0"
                        active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
                    </div>
                  </div><div class="action">
                    <span style="margin-right: 5px;">是否客服:</span>
                    <div class="switch_box">
                      <el-switch :width="40" v-model="isNoSay" active-value="1" inactive-value="0"
                        active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
                    </div>
                  </div>
                  <div class="action">
                    <span style="margin-right: 5px;">是否回放:</span>
                    <div class="switch_box">
                      <el-switch :width="40" v-model="isNoSay" active-value="1" inactive-value="0"
                        active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
                    </div>
                  </div>
                  <div class="action">
                    <span style="margin-right: 5px;">官方收录:</span>
                    <div class="switch_box">
                      <el-switch :width="40" v-model="isNoSay" active-value="1" inactive-value="0"
                        active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
                    </div>
                  </div>
                  <div class="action_btns">
                    <!-- <el-button type="primary" icon="el-icon-search" circle size="mini"></el-button> -->
                    <el-button type="warning" icon="el-icon-edit" circle size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
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
import { getRoomList } from '@/api/liveManage/roomList/roomList';
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
      isNoSay: ''
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
      this.roomList = res.data.room_info;
      this.total = res.data.total;
    },
    // 跳转添加直播间页面
    navToAddRoom: function () {
      this.$router.push({
        name: 'addRoom'
      })
    },
    handleSizeChange: function (val) {
      console.log(`当前显示${val}条`);
    },
    handleCurrentChange: function (val) {
      console.log(`当前第${val}页`);
    }
  }
};
</script>

<style>
@import url('../../../../assets/css/roomList.css');
</style>
