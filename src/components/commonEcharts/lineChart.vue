<template>
  <div>
    <div ref="lineEcharts" style="height: 240px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'lineChart',
  data() {
    return {};
  },
  mounted() {
    this.initLineEcharts();
  },
  methods: {
    // 初始化折线图
    initLineEcharts: function () {
      const options = {
        title: {
          text: '上周销售情况(单位: 万)'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
        //   formatter: (params) => {
        //     return  '<div>' + params[0].name + '</div>';
        //   }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销售额',
            type: 'line',
            stack: 'Total',
            areaStyle: {
                color: '#A4DFF7'
            },
            emphasis: {
              focus: 'series'
            },
            data: [150, 28, 101, 334, 90, 761, 810]
          }
        ]
      };
      const E = echarts.init(this.$refs.lineEcharts);
      options && E.setOption(options);
    }
  }
};
</script>

<style>
</style>
