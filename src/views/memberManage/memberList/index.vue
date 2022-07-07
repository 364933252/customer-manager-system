<template>
  <div>
    <div class="search_box">
      <el-row :gutter="6">
        <el-col :span="8" :offset="6">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="text"></el-button>
        </el-col>
      </el-row>
    </div>
    <el-card>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="member_data_box">
              <div class="member_data_item">
                <span class="data_item_title">今日新增会员</span>
                <div class="data">1260</div>
                <span class="data_item_title1">本月累计新增</span>
                <div class="num">165,835人</div>
              </div>
              <div class="member_data_item">
                <div class="data_item_btn">查看</div>
                <div class="data_item_bg"></div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="member_data_box">
              <div class="member_data_item">
                <span class="data_item_title">今日会员消费总额</span>
                <div class="data">1,501,234</div>
                <span class="data_item_title1">本月消费总额</span>
                <div class="num">14,235,456,465,00</div>
              </div>
              <div class="member_data_item">
                <div class="data_item_btn"></div>
                <div class="data_item_bg1"></div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="member_data_box">
              <div class="member_data_item">
                <span class="data_item_title">会员总数</span>
                <div class="data">156,411</div>
                <div class="data_item_type">
                  <div class="item_type">
                    <div>普通会员</div>
                    <div>7898</div>
                  </div>
                  <div class="item_type">
                    <div>黑卡会员</div>
                    <div>3022</div>
                  </div>
                  <div class="item_type">
                    <div>钻石会员</div>
                    <div>2422</div>
                  </div>
                </div>
              </div>
              <div class="member_data_item">
                <div class="data_item_btn"></div>
                <div class="data_item_bg2"></div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover"
            ><div class="member_data_box">
              <div class="member_data_item">
                <span class="data_item_title">本月生日会员</span>
                <div class="data">1260</div>
                <div class="data_item_btn2">发送生日问候</div>
              </div>
              <div class="member_data_item">
                <div class="data_item_btn">查看</div>
                <div class="data_item_bg3"></div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-table
        :data="memberList"
        style="width: 100%"
        stripe
        highlight-current-row
        :height="windowHeight - 170 + 'px'"
        :header-row-class-name="setTableHeaderClass"
      >
        <el-table-column type="selection" width="45">
        </el-table-column>
        <el-table-column
          label="卡号"
          prop="vipCardNum"
          align="center"
        ></el-table-column>
        <el-table-column
          label="手机号"
          prop="mobile"
          align="center"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="微信昵称"
          prop="wechatNick"
          align="center"
        ></el-table-column>
        <el-table-column label="会员等级" prop="memberLevel" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.memberLevel === 0">普通会员</span>
            <span v-if="row.memberLevel === 1">黑胶会员</span>
            <span v-if="row.memberLevel === 2">钻石会员</span>
          </template>
        </el-table-column>
        <el-table-column
          label="积分"
          prop="integral"
          align="center"
        ></el-table-column>
        <el-table-column
          label="累计消费"
          prop="amounts"
          align="center"
        ></el-table-column>
        <el-table-column
          label="所属门店"
          prop="shop"
          align="center"
        ></el-table-column>
        <el-table-column
          label="所属店员"
          prop="mobile"
          align="clerk"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-tooltip effect="dark" content="查看" placement="top">
              <el-button
                type="primary"
                icon="el-icon-search"
                circle
                size="mini"
                @click="checkMember(row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.current"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="queryInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        current: 1,
        size: 10
      }
    };
  },
  computed: {
    ...mapState({
      memberList: (state) => state.common.customerTableData,
      windowHeight: (state) => state.common.tableHeight
    })
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    // 设置表格表头颜色
    setTableHeaderClass: function ({ row, column, rowIndex }) {
      if (rowIndex === 0) {
        return 'table_header';
      }
    },
    // 查看会员详情
    checkMember: function (member) {
      this.$router.push({
        name: 'memberDetail',
        query: {
          member: JSON.stringify(member)
        }
      })
    }
  }
};
</script>

<style scoped>
@import url('../../../assets/css/member.css');
.el-table >>> .table_header th {
  background: rgb(247, 247, 247);
}
</style>
