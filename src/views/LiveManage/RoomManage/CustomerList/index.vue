<template>
    <div>
        <el-card>
            <el-row style="margin-bottom: 10px">
                <el-col :span="2">
                    <el-button type="success" icon="el-icon-circle-plus-outline"
                        @click="addCustomerDialogVisible = true">新增客户</el-button>
                </el-col>
                <el-col :span="6" :offset="6">
                    <el-input v-model="queryInfo.Query" placeholder="请输入姓名/联系方式进行搜索"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                </el-col>
            </el-row>
            <el-table :data="customerList" border :height="windowHeight - 20 + 'px'"
                :header-row-class-name="setTableHeaderClass" stripe highlight-current-row style="width: 100%">
                <el-table-column type="selection"> </el-table-column>
                <el-table-column type="index" label="序号" width="60"></el-table-column>
                <el-table-column prop="Name" label="姓名" width="80"> </el-table-column>
                <el-table-column prop="Sex" label="性别" width="60">
                    <template slot-scope="{ row }">
                        <span v-if="row.Sex === 1">男</span>
                        <span v-if="row.Sex === 0">女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Phone" label="手机号" width="120"></el-table-column>
                <!-- <el-table-column prop="purpose" label="客户满意度" width="200">
            <template slot-scope="{ row }">
              <el-rate
                v-model="row.purpose"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                show-text
                allow-half
                :texts="['极差', '失望', '一般', '满意', '很满意']"
                @change="changePurpose(row)"
              >
              </el-rate>
            </template>
          </el-table-column> -->
                <el-table-column prop="Email" label="邮箱">
                </el-table-column>
                <el-table-column prop="Company" label="公司名称" width="140">
                </el-table-column>
                <el-table-column prop="Company_address" label="公司地址" width="300">
                </el-table-column>
                <el-table-column prop="Home_address" label="家庭住址" width="300">
                </el-table-column>
                <el-table-column prop="Birthday" label="生日" width="100">
                </el-table-column>
                <el-table-column prop="Remark" label="备注">
                </el-table-column>
                <el-table-column width="80">
                    <template slot-scope="{ row }">
                        <!-- <el-tooltip effect="dark" content="查看客户详情" placement="top">
                <el-button
                  type="primary"
                  circle
                  icon="el-icon-search"
                  size="mini"
                  @click="checkCustomerDetail(row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="转为会员" placement="top">
                <el-button
                  type="warning"
                  circle
                  icon="el-icon-medal"
                  size="mini"
                  @click="transferMember(row)"
                ></el-button>
              </el-tooltip> -->
                        <el-tooltip effect="dark" content="删除" placement="top">
                            <el-button type="danger" circle icon="el-icon-delete" size="mini"
                                @click="transferMember(row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.page" :page-sizes="[100, 200, 300, 400]" :page-size="queryInfo.rows"
                layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </el-card>
        <el-dialog title="新增客户" :visible.sync="addCustomerDialogVisible" :close-on-click-modal="false" width="30%" @close="resetAddLiveCustomerFrom">
            <el-form :model="addCustomerForm" :rules="addCustomerFormRules" ref="addCustomerFormRef" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="姓名:" prop="Name">
                    <el-input v-model="addCustomerForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="Sex">
                    <el-radio-group v-model="addCustomerForm.Sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号:" prop="Phone">
                    <el-input v-model="addCustomerForm.Phone" clearable></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="Email">
                    <el-input v-model="addCustomerForm.Email" clearable></el-input>
                </el-form-item>
                <el-form-item label="公司名称:" prop="Company">
                    <el-input v-model="addCustomerForm.Company" clearable></el-input>
                </el-form-item>
                <el-form-item label="公司地址:" prop="Company_address">
                    <el-input v-model="addCustomerForm.Company_address" clearable></el-input>
                </el-form-item>
                <el-form-item label="家庭住址:" prop="Home_address">
                    <el-input v-model="addCustomerForm.Home_address" clearable></el-input>
                </el-form-item>
                <el-form-item label="生日:" prop="Birthday">
                    <el-date-picker v-model="addCustomerForm.Birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注:" prop="Remark">
                    <el-input type="textarea" v-model="addCustomerForm.Remark" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCustomerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addLiveCustomer">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
  <script>
import scrollBar from '@/components/common/scrollBar';
import { mapState, mapMutations } from 'vuex';
import { getLiveCustomerList, addLiveCustomer } from '@/api/liveManage/customerList/customerList'
export default {
    components: {
        scrollBar
    },
    data() {
        return {
            customerList: [],
            queryInfo: {
                Query: '',
                page: 1,
                rows: 10,
                Type: '',
                Sort: '',
                State: ''
            },
            addCustomerForm: {
                Name: '',
                Sex: '1',
                Phone: '',
                Email: '',
                Company: '',
                Company_address: '',
                Home_address: '',
                Birthday: '',
                Remark: ''
            },
            addCustomerFormRules: {
                Name: [
                    { required: true, message: '请输入客户姓名！', trigger: 'blur' }
                ],
                Phone: [
                { required: true, message: '请输入客户手机号！', trigger: 'blur' }
                ],
                Email: [
                    { required: true, message: '请输入邮箱地址！', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址！', trigger: ['blur', 'change'] }
                ]
            },
            addCustomerDialogVisible: false
        };
    },
    computed: {
        ...mapState({
            windowHeight: (state) => state.common.tableHeight
        })
    },
    created() {
        this.getLiveCustomerList()
    },
    methods: {
        // 获取直播组织客户列表
        getLiveCustomerList: async function () {
            const params = {
                Entry: this.queryInfo
            }
            const { data: res } = await getLiveCustomerList(params)
            this.customerList = res.data
            console.log(res, '直播组织客户列表');
        },
        // 新增直播组织客户
        addLiveCustomer: async function () {
            const params = {
                Entry: this.addCustomerForm
            }
            const {data: res } = await addLiveCustomer(params)
            this.addCustomerDialogVisible = false
        },
        // 关闭重置新增客户Form
        resetAddLiveCustomerFrom: function () {
            this.$refs.addCustomerFormRef.resetFields()
        },
        handleSizeChange(val) {
            this.queryInfo.rows = val
            this.getLiveCustomerList()
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.queryInfo.page = val
            this.getLiveCustomerList()
            // console.log(`当前页: ${val}`);
        },
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
  .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
  }
  
  .el-icon-arrow-down {
      font-size: 12px;
  }
  
  .el-table>>>.table_header th {
      background: rgb(247, 247, 247);
  }
  </style>
  