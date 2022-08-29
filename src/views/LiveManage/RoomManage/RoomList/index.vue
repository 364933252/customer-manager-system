<template>
  <div>
    <el-card>
      <div style="padding: 5px">
        <el-button type="success" @click="navToAddRoom" icon="el-icon-circle-plus-outline"
          >新建直播间</el-button
        >
      </div>
      <scroll-bar :height="widowHeight - 30 + 'px'">
        <el-row :gutter="0">
          <el-col :span="4" v-for="item in roomList" :key="item.roomid">
            <el-card :body-style="{ padding: '0px' }">
              <img
                :src="item.cover_img"
                class="room_item_img"
                alt=""
                srcset=""
              />
              <div style="padding: 14px">
                <span class="room_item_label">房间名称:</span
                ><span style="font-size: 12px">{{ item.name }}</span>
                <!-- <div class="bottom clearfix"> -->
                <div class="time_box">
                  <time class="time">
                    <span
                      class="room_item_label"
                      style="color: rgb(11, 252, 71)"
                      >开始时间:</span
                    >{{ item.start_time | dateFilter }}
                  </time>
                </div>
                <div class="time_box">
                  <time class="time">
                    <span class="room_item_label" style="color: #ff0000"
                      >结束时间:</span
                    >{{ item.end_time | dateFilter }}
                  </time>
                </div>
                <div>
                  <span class="room_item_label">是否禁言:</span>
                  <el-switch
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="是"
                  inactive-text="否"
                  v-model="value1"
                >
                </el-switch>
                </div>
                <div class="room_btns_box">
                  <el-button type="primary" icon="el-icon-search" circle size="mini"></el-button>
                  <el-button type="warning" icon="el-icon-edit" circle size="mini"></el-button>
                  <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                </div>
                <!-- </div> -->
              </div>
            </el-card>
          </el-col>
        </el-row>
      </scroll-bar>
      <div style="display: flex; justify-content: flex-end">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.start"
          :page-sizes="[12, 24, 36, 48, 50]"
          :page-size="queryInfo.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
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
      value1: ''
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
