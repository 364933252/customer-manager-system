<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card>
          <!-- <div class="member_detail_header">
            <i class="el-icon-user"></i>会员详情
          </div> -->
          <div slot="header"><i class="el-icon-user"></i>消费记录</div>
          <div class="member_detail_item" :style="{height: windowHeight + 'px'}">
            <el-card shadow="never">
              <div slot="header">
                <i class="iconfont icon-huiyuanguanli1 icon_cls"></i>会员信息
              </div>
              <div class="member_info_box">
                <div class="member_info_item">
                  <div class="info_item_left">会员昵称</div>
                  <div class="info_item_right">王小二</div>
                </div>
                <div class="member_info_item">
                  <div class="info_item_left">会员编号</div>
                  <div class="info_item_right">100010123</div>
                </div>
                <div class="member_info_item">
                  <div class="info_item_left">等级</div>
                  <div class="info_item_right">黄金会员.lv3</div>
                </div>
                <div class="member_info_item">
                  <div class="info_item_left">注册来源</div>
                  <div class="info_item_right">微信小程序-固诺家居</div>
                </div>
                <div class="member_info_item">
                  <div class="info_item_left">注册日期</div>
                  <div class="info_item_right">2022-07-07</div>
                </div>
              </div>
            </el-card>
            <el-card shadow="never">
              <div slot="header">
                <i class="iconfont icon-kehuguanli icon_cls"></i>个人信息
              </div>
              <div class="member_info_box">
                <div class="member_info_item">
                  <div class="info_item_left">城市</div>
                  <div class="info_item_right">四川</div>
                </div>
                <div class="member_info_item">
                  <div class="info_item_left">性别</div>
                  <div class="info_item_right">男</div>
                </div>
                <div class="member_info_item">
                  <div class="info_item_left">年龄</div>
                  <div class="info_item_right">22岁</div>
                </div>
                <div class="member_info_item">
                  <div class="info_item_left">出生日期</div>
                  <div class="info_item_right">2000-07-07</div>
                </div>
                <div class="member_info_item">
                  <div class="info_item_left">联系方式</div>
                  <div class="info_item_right">0632-5912279</div>
                </div>
              </div>
            </el-card>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card>
          <div slot="header">
            <i class="iconfont icon-shouxinxiangqing-xiaofeijilu icon_cls"></i
            >消费记录
          </div>
          <div>
            <el-card shadow="never">
              <div slot="header">
                <i class="iconfont icon-shaixuan icon_cls"></i>筛选
              </div>
              <div>
                <el-date-picker
                  v-model="queryInfo.query"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
                <el-button
                  type="primary"
                  style="margin-left: 15px"
                  icon="el-icon-search"
                  >搜索</el-button
                >
              </div>
            </el-card>
            <el-card shadow="never">
              <div slot="header">
                <i class="iconfont icon-shaixuan2 icon_cls"></i>消费列表
              </div>
              <div>
                <el-table
                  :data="expenseCalenderData"
                  border
                  style="width: 100%"
                  :height="windowHeight - 205 + 'px'"
                >
                  <el-table-column
                    prop="expense_time"
                    align="center"
                    label="时间"
                    width=""
                  >
                  </el-table-column>
                  <el-table-column
                    prop="expense_type"
                    align="center"
                    label="类型"
                    width=""
                  >
                  </el-table-column>
                  <el-table-column
                    prop="expense_money"
                    align="center"
                    label="金额"
                    width=""
                  >
                  </el-table-column>
                  <el-table-column
                    prop="expense_platform"
                    label="平台"
                    align="center"
                    width=""
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="queryInfo.currentPage"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400"
                >
                </el-pagination>
              </div>
            </el-card>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card>
          <div slot="header">
            <i class="iconfont icon-coins icon_cls"></i>积分记录
          </div>
          <div>
            <el-card shadow="never">
              <div slot="header">
                <i class="iconfont icon-shaixuan icon_cls"></i>筛选
              </div>
              <div>
                <el-date-picker
                  v-model="queryInfo.query"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
                <el-button
                  type="primary"
                  style="margin-left: 15px"
                  icon="el-icon-search"
                  >搜索</el-button
                >
              </div>
            </el-card>
            <el-card shadow="never">
              <div slot="header">
                <i class="iconfont icon-jifenmingxi icon_cls"></i>消费列表
              </div>
              <div>
                <el-table
                  :data="expenseCalenderData"
                  border
                  style="width: 100%"
                  :height="windowHeight - 205 + 'px'"
                >
                  <el-table-column
                    prop="expense_time"
                    align="center"
                    label="时间"
                    width=""
                  >
                  </el-table-column>
                  <el-table-column
                    prop="expense_type"
                    align="center"
                    label="积分使用"
                    width=""
                  >
                  </el-table-column>
                  <el-table-column
                    prop="expense_money"
                    align="center"
                    label="积分"
                    width=""
                  >
                  </el-table-column>
                  <el-table-column
                    prop="expense_platform"
                    label="平台"
                    align="center"
                    width=""
                  >
                  </el-table-column>
                </el-table>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="queryInfo.currentPage"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400"
                >
                </el-pagination>
              </div>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        currentPage: 1
      },
      expenseCalenderData: [
        {
          expense_time: '2022-07-07',
          expense_type: '购买商品',
          expense_money: '1000',
          expense_platform: '微信小程序-固诺家居'
        },
        {
          expense_time: '2022-07-07',
          expense_type: '购买商品',
          expense_money: '1000',
          expense_platform: '微信小程序-固诺家居'
        },
        {
          expense_time: '2022-07-07',
          expense_type: '购买商品',
          expense_money: '1000',
          expense_platform: '微信小程序-固诺家居'
        }
      ],
      tableHeight: '90%',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      windowHeight: (state) => state.common.tableHeight
    })
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
@import url('../../../../assets/css/member.css');
</style>
