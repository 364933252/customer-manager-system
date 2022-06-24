<template>
  <div ref="barEchart" style="height: 240px"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'barEchart',
  data() {
    return {};
  },
  mounted() {
    this.initBarEchart()
  },
  methods: {
    // 初始化柱状图
    initBarEchart: function () {
      const dataAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      const option = {
        title: {
            text: '我的项目TOP10'
        },
        xAxis: {
          // type: 'category',
          data: dataAxis
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            console.log(params)
            return (
              '<div>' +
              params.name +
              '</div>' +
              '<div>' +
              params.marker +
              '销售额:' +
              params.value +'万' +
              '</div>'
            );
          }
        },
        series: [
          {
            data: [
              {
                value: 923,
                name: '沃美舒',
                itemStyle: {
                  color: '#1D74FF'
                }
              },
              {
                value: 868,
                name: '沃美舒',
                itemStyle: {
                  color: '#C7E8FF'
                }
              },
              {
                value: 712,
                name: '沃美舒',
                itemStyle: {
                  color: '#1D74FF'
                }
              },
              {
                value: 674,
                name: 'Knoya卡诺亚',
                itemStyle: {
                  color: '#C7E8FF'
                }
              },
              {
                value: 658,
                name: '伊百丽EBERY',
                itemStyle: {
                  color: '#1D74FF'
                }
              },
              {
                value: 584,
                name: '巧夺天工',
                itemStyle: {
                  color: '#C7E8FF'
                }
              },
              {
                value: 499,
                name: 'QM曲美家居',
                itemStyle: {
                  color: '#1D74FF'
                }
              },
              {
                value: 444,
                name: 'IKEA宜家',
                itemStyle: {
                  color: '#C7E8FF'
                }
              },
              {
                value: 389,
                name: 'D3空间',
                itemStyle: {
                  color: '#1D74FF'
                }
              },
              {
                value: 344,
                name: '尚品优选',
                itemStyle: {
                  color: '#C7E8FF'
                }
              }
            ],
            type: 'bar'
          }
        ]
      };
      const E = echarts.init(this.$refs.barEchart)
      option && E.setOption(option)
    }
  }
};
</script>

<style>
</style>