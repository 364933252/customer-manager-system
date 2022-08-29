<template>
  <div>
    <el-card>
      <div style="padding: 5px;">
        <el-button type="success" icon="el-icon-circle-plus-outline">新建直播间</el-button>
      </div>
      <scroll-bar :height="(widowHeight-30) + 'px'">
        <el-row :gutter="0">
          <el-col :span="4" v-for="item in roomList" :key="item.roomid">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../../../../assets/images/live7.jpg" class="room_item_img" alt="" srcset="">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">123</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </scroll-bar>
      <div style="display: flex; justify-content: flex-end;">
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
  getRoomList
} from '@/api/liveManage/roomList/roomList'
import { async } from 'q';
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
      roomList: []
    }
  },
  computed: {
    ...mapState({
      widowHeight: state => state.common.tableHeight
    })
  },
  created() {
    this.getRoomList()
  },
  methods: {
    // 获取直播间列表
    getRoomList: async function () {
      const start = this.queryInfo.start - 1
      const param = {
        Entry: {
          start: start,
          limit: this.queryInfo.limit
        }
      }
      const res = await getRoomList(param)
      // this.roomList = res.room_info
      // this.total = res.total
      console.log(res.data, '直播间列表地');
    },
    handleSizeChange: function (val) {
      console.log(`当前显示${val}条`);
    },
    handleCurrentChange: function (val) {
      console.log(`当前第${val}页`);
    }
  },
}
</script>

<style>
  @import url("../../../../assets/css/roomList.css");
</style>
