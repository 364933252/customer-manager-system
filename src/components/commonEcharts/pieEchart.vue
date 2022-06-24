<template>
  <div>
    <div ref="pieEchart" style="height: 240px">111</div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'pieEchart',
  data() {
    return {};
  },
  mounted() {
    this.initPieEchart();
  },
  methods: {
    // 初始化饼状图
    initPieEchart: function () {
      const options = {
        title: {
          text: '客户分类统计'
        },
        tooltip: {
          trigger: 'item',
          //   formatter: '{a} <br/>{b} : {c} ({d}%)'
          formatter: (params) => {
            return (
              '<div>' +
              params.seriesName +
              '</div>' +
              '<div>' +
              params.marker +
              params.name +':'+params.value +
              '</div>'
            );
          }
        },
        legend: {
          orient: 'vertical',
          top: '5%',
          left: 'right'
        },
        series: [
          {
            name: '客户分类统计',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold',
                lineHeight: 30,
                color: '#000',
                fontStyle: 'oblique',
                formatter: '{b} : {c} \n{d}%'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '普通客户' },
              { value: 735, name: '门客' },
              { value: 580, name: '大客户' },
              { value: 484, name: '经销商' },
              { value: 300, name: '其他客户' }
            ]
          }
        ]
      };
      const E = echarts.init(this.$refs.pieEchart);
      options && E.setOption(options);
    }
  }
};
</script>

<style>
</style>