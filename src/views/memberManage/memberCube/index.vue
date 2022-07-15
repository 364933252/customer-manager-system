<template>
  <div>
    <el-card>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-button
            type="success"
            icon="el-icon-circle-plus-outline"
            plain
            @click="dialogVisible = true"
            >新建魔方</el-button
          >
        </el-col>
      </el-row>
      <scroll-bar :height="tableHight -20 + 'px'">
        <div class="member_cube_box">
          <div class="member_cube_item">
            <el-card>
              <div slot="header">会员魔方1</div>
              <div>
                <div class="cube_item"><span>时间:</span> 2022-07-14</div>
                <div class="cube_item"><span>人数:</span> 2022-07-14</div>
                <div class="cube_item_action">
                  <span>操作:</span>
                  <div class="cube_btns">
                    <div class="bts">
                      <el-button
                        type="primary"
                        plain
                        size="small"
                        icon="el-icon-info"
                        >详情</el-button
                      >
                    </div>
                    <div class="bts">
                      <el-button
                        type="success"
                        plain
                        size="small"
                        icon="el-icon-s-ticket"
                        >发券</el-button
                      >
                    </div>
                    <div class="bts">
                      <el-button
                        type="warning"
                        plain
                        size="small"
                        icon="el-icon-refresh"
                        >计算</el-button
                      >
                    </div>
                    <div class="bts">
                      <el-button
                        type="danger"
                        plain
                        size="small"
                        icon="el-icon-search"
                        >删除</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </scroll-bar>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import scrollBar from '@/components/common/scrollBar';
export default {
  components: {
    scrollBar
  },
  data() {
    return {
      queryInfo: {
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    ...mapState({
      tableHight: (state) => state.common.tableHeight
    })
  },
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
@import url('../../../assets/css/member.css');
</style>
