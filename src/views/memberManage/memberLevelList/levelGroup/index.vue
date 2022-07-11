<template>
  <div>
    <el-button type="success" icon="el-icon-circle-plus-outline" plain @click="dialogVisible = true"
      >新建分组</el-button
    >
    <el-table
      :data="memberGroupList"
      style="width: 100%"
      :header-row-class-name="setTableHeaderClass"
      border
      stripe
      :height="tableHight -60 + 'px'"
    >
      <el-table-column label="序号" type="index" width="60" align="center">
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="分组名称"
        width=""
        align="center"
      >
      </el-table-column>
      <el-table-column label="分组详情" width="" align="center">
        <template>
          <el-button type="text" icon="el-icon-view"></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="" align="center"> </el-table-column>
    </el-table>
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
    <el-dialog
      title="新建分组"
      :visible.sync="dialogVisible"
      @close="resetMemberGroupForm"
      width="30%">
      <el-form :model="memberGroupForm" :rules="memberGroupFormRules" ref="memberGroupFormRef" label-width="100px">
        <el-form-item label="分组名称:" prop="groupName">
          <el-input v-model="memberGroupForm.groupName" placeholder="请输入分组名称"></el-input>
        </el-form-item>
        <el-form-item label="分组描述:">
          <el-input v-model="memberGroupForm.groupDesc" type="textarea" :autosize="{minRows: 4}" placeholder="请输入分组描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      memberGroupList: [],
      queryInfo: {
        currentPage: 1,
        pageSize: 10
      },
      memberGroupForm: {},
      memberGroupFormRules: {
        groupName: [
          {required: true, message: '请输入分组名称', trigger: 'blur'}
        ]
      },
      dialogVisible: false
    };
  },
  computed: {
    ...mapState({
      tableHight: state => state.common.tableHeight
    })
  },
  methods: {
    // 设置表格表头颜色
    setTableHeaderClass: function ({ row, column, rowIndex }) {
      if (rowIndex === 0) {
        return 'table_header';
      }
    },
    // 弹框关闭， 初始化新增分组Form
    resetMemberGroupForm: function () {
      this.$refs.memberGroupFormRef.resetFields()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
.el-table >>> .table_header th {
  background: rgb(247, 247, 247);
}
</style>
