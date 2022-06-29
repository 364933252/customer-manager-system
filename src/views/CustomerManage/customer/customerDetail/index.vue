<template>
  <div>
    <el-card :style="{ height: windowHeight + 80 + 'px' }">
      <div slot="header">
        <span>客户详情</span>
        <el-button
          style="float: right"
          type="primary"
          size="mini"
          plain
          icon="el-icon-arrow-left"
          round
          @click="$router.go(-1)"
          >返回</el-button
        >
      </div>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="customer_info_box">
            <el-descriptions
              class="margin-top"
              size="medium"
              title="基础信息"
              :column="1"
              contentClassName="description_content"
            >
              <template slot="extra">
                <!-- <el-button
                  type="text"
                >操作</el-button> -->
              </template>
              <el-descriptions-item label="用户名">
                <template slot="label">
                  <div class="label_box">
                    <i class="el-icon-postcard i_cls"></i>
                    <span>姓名</span>
                  </div>
                </template>
                萧楚河
              </el-descriptions-item>
              <el-descriptions-item label="用户名">
                <template slot="label">
                  <div class="label_box">
                    <i class="el-icon-user i_cls"></i>
                    <span>性别</span>
                  </div>
                </template>
                男
              </el-descriptions-item>
              <el-descriptions-item label="用户名">
                <template slot="label">
                  <div class="label_box">
                    <i class="el-icon-mobile i_cls"></i>
                    <span>手机号</span>
                  </div>
                </template>
                15689360191
              </el-descriptions-item>
              <el-descriptions-item label="用户名">
                <template slot="label">
                  <div class="label_box">
                    <i class="el-icon-potato-strips i_cls"></i>
                    <span>生日</span>
                  </div>
                </template>
                2000-12-22
              </el-descriptions-item>
              <el-descriptions-item label="用户名">
                <template slot="label">
                  <div class="label_box">
                    <i class="el-icon-medal i_cls"></i>
                    <span>是否会员</span>
                  </div>
                </template>
                是
              </el-descriptions-item>
              <el-descriptions-item label="用户名">
                <template slot="label">
                  <div class="label_box">
                    <i class="el-icon-bangzhu i_cls"></i>
                    <span>微信号</span>
                  </div>
                </template>
                15689360191
              </el-descriptions-item>
              <el-descriptions-item label="用户名">
                <template slot="label">
                  <div class="label_box">
                    <i class="el-icon-time i_cls"></i>
                    <span>创建时间</span>
                  </div>
                </template>
                2022-12-20 12:00-00
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="customer_portrait_box">
            <div class="customer_portrait_title">客户画像</div>
            <div class="cusetomer_portrait_content_box">
              <div class="portrait_content_bg">
                <div class="portrait_box">
                  <div class="portrait">单品偏好: 套装</div>
                  <div class="portrait">单品偏好: 套装</div>
                </div>
                <div class="portrait_box1">
                  <div class="portrait_item_box">
                    <div class="portrait1">单品偏好: 套装</div>
                    <div class="portrait1">单品偏好: 套装</div>
                    <div class="portrait1">单品偏好: 套装</div>
                  </div>
                  <div class="portrait_item_box1">
                    <div class="portrait1">单品偏好: 套装</div>
                    <div class="portrait1">单品偏好: 套装</div>
                    <div class="portrait1">单品偏好: 泳装</div>
                  </div>
                </div>
                <div class="portrait_content_item"></div>
                <div class="portrait_content_item1"></div>
                <div class="portrait_content_item2">
                  <el-avatar :size="80" :src="circleUrl"></el-avatar>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-tabs>
        <el-tab-pane label="地址信息">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-row-class-name="setTableHeaderClass"
            height="210px"
          >
            <el-table-column label="#" type="index" align="center" width="60">
            </el-table-column>
            <el-table-column prop="addr" label="收货地址" width="">
              <template slot-scope="{ row }">
                <div class="addr_box">
                  <div class="addr_left_box">
                    <common-avatar :text="row.name"></common-avatar>
                  </div>
                  <div class="addr_right_box">
                    <div class="addr_right">
                      <span>{{row.name}}</span>
                      <span>{{row.phone}}</span>
                    </div>
                    <div class="addr_right">
                      <el-tag type="success" size="mini" v-if="row.isDefault === 1">默认地址</el-tag>
                      <span>{{row.addr}}</span>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="addrType"
              label="地址类型"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="useTime"
              label="使用次数"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="lastTime"
              label="最近使用时间"
              width="160"
              align="center"
            >
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="{ row }">
                <el-button type="text">失效</el-button>
                <span style="margin: 0 5px">|</span>
                <el-button type="text">修改</el-button>
                <span style="margin: 0 5px" v-if="row.isDefault === 2">|</span>
                <el-button type="text" v-if="row.isDefault === 2">设为默认地址</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="沟通历史">沟通历史</el-tab-pane>
        <el-tab-pane label="短信">短信</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import commonAvatar from '@/components/common/commonAvatar'
export default {
  components: {
    commonAvatar
  },
  data() {
    return {
      circleUrl: require('@/assets/images/1.png'),
      tableData: [
        {
          name: '雷无桀',
          phone: '15689360191',
          addr: '山东省枣庄市滕州市学院中路50号山东墨辰信息科技有限公司',
          addrType: '公司',
          useTime: 12,
          lastTime: '2022-06-26',
          isDefault: 1
        },
        {
          name: '司空长风',
          phone: '15689360192',
          addr: '山东省枣庄市滕州市学院中路50号昊洋大厦',
          addrType: '家',
          useTime: 12,
          lastTime: '2022-06-26',
          isDefault: 2
        },
        {
          name: '唐三',
          phone: '15689360193',
          addr: '山东省枣庄市滕州市学院中路50号山东墨辰信息科技有限公司',
          addrType: '公司',
          useTime: 12,
          lastTime: '2022-06-26',
          isDefault: 2
        },
        {
          name: '无心',
          phone: '15689360194',
          addr: '山东省枣庄市滕州市学院中路50号昊洋大厦',
          addrType: '家',
          useTime: 12,
          lastTime: '2022-06-26',
          isDefault: 2
        },
        {
          name: '张无忌',
          phone: '15689360195',
          addr: '山东省枣庄市滕州市学院中路50号山东墨辰信息科技有限公司',
          addrType: '公司',
          useTime: 12,
          lastTime: '2022-06-26',
          isDefault: 2
        },
        {
          name: '赵敏',
          phone: '15689360196',
          addr: '山东省枣庄市滕州市学院中路50号昊洋大厦',
          addrType: '家',
          useTime: 12,
          lastTime: '2022-06-26',
          isDefault: 2
        }
      ]
    };
  },
  computed: {
    ...mapState({
      windowHeight: (state) => state.common.tableHeight
    })
  },
  created() {
    console.log(this.widowHieght);
  },
  methods: {
    // 设置表格表头颜色
    setTableHeaderClass: function ({ row, column, rowIndex }) {
      if (rowIndex === 0) {
        return 'table_header';
      }
    }
  }
};
</script>

<style scoped>
@import url('../../../../assets/css/customer.css');
.el-table >>> .table_header th {
  background: rgb(29, 116, 255);
  color: #fff;
}
</style>
