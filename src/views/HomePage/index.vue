<template>
  <div>
    <div class="home_page_top">
      <div :class="'home_page_item' + index" v-for="(item, index) in topReportList" :key="index">
        <div class="item">
          <div class="item_child">
            <span
              style="font-size: 30px; font-weight: bold; margin-bottom: 10px"
              >{{item.num}}</span
            >
            <div style="margin-top: 10px; font-size: 14px">{{item.title}}</div>
          </div>
        </div>
        <div class="item">
          <img src="../../assets/images/tb_icon.png" alt="" srcset="" />
        </div>
      </div>
    </div>
    <el-row>
      <el-col :span="14">
        <el-card>
          <line-chart></line-chart>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <pie-echart></pie-echart>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-card>
          <message-module></message-module>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card>
          <bar-echart></bar-echart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lineChart from '@/components/commonEcharts/lineChart';
import pieEchart from '@/components/commonEcharts/pieEchart';
import barEchart from '@/components/commonEcharts/barEchart';
import messageModule from './messageModule'
export default {
  components: {
    lineChart,
    pieEchart,
    barEchart,
    messageModule
  },
  data() {
    return {
      topReportList: [
        {
          num: '1,799',
          title: '本周新建线索'
        },
        {
         num: '2,799',
         title: '本周新建客户' 
        },
        {
          num: '3,780',
          title: '本周新接订单'
        },
        {
          num: '180',
          title: '本周新建活动'
        },
        {
          num: '87',
          title: '本周新建工作计划'
        }
      ]
    };
  }
};
</script>

<style scoped>
@import url('../../assets/css/homePage.css');
</style>
