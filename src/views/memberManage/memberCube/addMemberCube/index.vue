<template>
  <div>
    <el-card>
      <div slot="header">新建魔方</div>
      <div>
        <div class="cube_filter_box">
          <div
            class="cube_filter_item"
            v-for="(item, index) in filtersList"
            :key="item.id"
          >
            <div class="filter_item_left">{{ item.filterName }}</div>
            <div class="filter_item_right">
              <div
                v-for="(subItem, subIndex) in item.filters"
                :key="subItem.id"
                class="filter_box"
                :class="subItem.status ? 'filter_box-active' : ''"
                @click="selectFilterCondition(index, subIndex)"
              >
                {{ subItem.name }}
              </div>
            </div>
          </div>
          <div class="cube_filter_item">
            <div class="filter_item_left">筛选名称</div>
            <div class="filter_item_right">
              <!-- <el-input v-model="" placeholder=""></el-input> -->
            </div>
          </div>
          <div class="cube_filter_item">
            <div class="filter_item_left">筛选满足</div>
            <div class="filter_item_right"></div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filtersList: [
        {
          id: 1,
          filterName: '会员资料',
          filters: [
            {
              id: 1,
              status: false,
              name: '性别'
            },
            {
              id: 2,
              status: false,
              name: '年龄'
            },
            {
              id: 3,
              status: false,
              name: '生日'
            },
            {
              id: 4,
              status: false,
              name: '开卡时间'
            },
            {
              id: 5,
              status: false,
              name: '客户来源'
            },
            {
              id: 6,
              status: false,
              name: '取消关注'
            }
          ]
        },
        {
          id: 2,
          filterName: '会员账号',
          filters: [
            {
              id: 1,
              status: false,
              name: '会员等级'
            },
            {
              id: 2,
              status: false,
              name: '储值余额'
            },
            {
              id: 3,
              status: false,
              name: '积分余额'
            },
            {
              id: 4,
              status: false,
              name: '可用券张数'
            }
          ]
        },
        {
          id: 3,
          filterName: '交易数据',
          filters: [
            {
              id: 1,
              status: false,
              name: '消費次數'
            },
            {
              id: 2,
              status: false,
              name: '距上次消费天数'
            },
            {
              id: 3,
              status: false,
              name: '累计消费金额'
            },
            {
              id: 4,
              status: false,
              name: '单笔消费金额'
            },
            {
              id: 5,
              status: false,
              name: '累计储值金额'
            },
            {
              id: 6,
              status: false,
              name: '单笔储值金额'
            }
          ]
        }
      ],
      filtrates: {
        sex: {

        }
      }
    };
  },
  methods: {
    // 选择筛选条件
    selectFilterCondition: function (index, subIndex) {
      this.filtersList[index].filters[subIndex].status =
        !this.filtersList[index].filters[subIndex].status;
    }
  }
};
</script>

<style scoped>
@import url('../../../../assets/css/member.css');
</style>
