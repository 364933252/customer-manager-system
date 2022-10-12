<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="4">
                    <el-button type="success" icon="el-icon-circle-plus-outline" @click="openDistributorDialog">新增分销商
                    </el-button>
                </el-col>
            </el-row>
            <el-table :data="distributorTableData" border :height="windowHeight - 20 + 'px'"
                :header-row-class-name="setTableHeaderClass" stripe highlight-current-row style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="ConsumerId" label="客户编号"> </el-table-column>
                <el-table-column prop="RebateType" label="分润方式">
                </el-table-column>
                <el-table-column prop="RebateValue" label="分润比例">
                </el-table-column>
                <el-table-column prop="State" label="客户状态">
                    <template slot-scope="{ row }">
                        <el-switch style="display: block" v-model="row.State" :active-value="1" :inactive-value="0"
                            active-color="#13ce66" inactive-color="#ff4949" active-text="开启" inactive-text="关闭"
                            @change="editDistributorState(row.ConsumerId, row.State)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="Remark" label="备注">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{ row }">
                        <el-tooltip effect="dark" content="修改" placement="top">
                            <el-button type="warning" circle icon="el-icon-edit" size="mini"
                                @click="openEditDistributor(row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.Entry.page" :page-sizes="[100, 200, 300, 400]"
                :page-size="queryInfo.Entry.rows" layout="sizes, prev, pager, next, jumper"
                :total="queryInfo.total">
            </el-pagination>
        </el-card>
        <!-- 新建分銷商 -->
        <el-dialog title="新建分销商" :visible.sync="distributorDialogVisible" width="30%"
            @closed="resetDistirbutorForm">
            <el-form :model="distributorForm" :rules="distributorFormRules" ref="distributorFormRef" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="客户编号" prop="ConsumerId">
                    <el-input v-model="distributorForm.ConsumerId" placeholder="请输入客户手机号"></el-input>
                </el-form-item>
                <el-form-item label="分润方式" prop="RebateType">
                    <el-select v-model="distributorForm.RebateType" placeholder="请选择分润方式">
                        <el-option label="自定义" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分润比例" prop="RebateValue">
                    <el-input v-model="distributorForm.RebateValue" placeholder="请输入分润比例"></el-input>
                </el-form-item>
                <el-form-item label="客户备注" prop="Remark">
                    <el-input v-model="distributorForm.Remark" placeholder="请输入客户备注"></el-input>
                </el-form-item>
                <el-form-item label="客户状态" prop="State" v-if="isEditDistributorState === '1'">
                    <el-radio-group v-model="distributorForm.State">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="distributorDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDistributor" v-if="isEditDistributorState === '1'">确 定</el-button>
                <!-- <el-button type="primary" @click="editDistributor" v-if="isEditDistributorState === '0'">修 改</el-button> -->
            </span>
        </el-dialog>
        <!-- 修改分銷商 -->
        <el-dialog title="修改分销商" :visible.sync="editDistributorDialogVisible" width="30%"
            @closed="resetEditDistirbutorForm">
            <el-form :model="editDistributorForm" :rules="editDistributorFormRules" ref="editDistributorFormRef" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="客户ID" prop="Id">
                    <el-input v-model="editDistributorForm.Id" disabled placeholder="请输入客户手机号"></el-input>
                </el-form-item>
                <el-form-item label="分润方式" prop="RebateType">
                    <el-select v-model="editDistributorForm.RebateType" placeholder="请选择分润方式">
                        <el-option label="自定义" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分润比例" prop="RebateValue">
                    <el-input v-model="editDistributorForm.RebateValue" placeholder="请输入分润比例"></el-input>
                </el-form-item>
                <el-form-item label="客户备注" prop="Remark">
                    <el-input v-model="editDistributorForm.Remark" placeholder="请输入客户备注"></el-input>
                </el-form-item>
                <!-- <el-form-item label="客户状态" prop="State" v-if="isEditDistributorState === '1'">
                    <el-radio-group v-model="editDistributorForm.State">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDistributorDialogVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="addDistributor" v-if="isEditDistributorState === '1'">确 定</el-button> -->
                <el-button type="primary" @click="editDistributor" v-if="isEditDistributorState === '0'">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getDistributorList, addDistributor, editDistributor, closeDistributor } from '@/api/liveManage/distributorList/distributorList'
export default {
    data() {
        return {
            queryInfo: {
                Entry: {
                    rows: 10,
                    page: 1,
                    Type: '',
                    Sort: ''
                },
                total: 0
            },
            distributorTableData: [],
            distributorDialogTitle: '',
            distributorDialogVisible: false,
            editDistributorDialogVisible: false,
            isEditDistributorState: '',
            distributorForm: {},
            editDistributorForm: {},
            distributorFormRules: {
                ConsumerId: [
                    { required: true, message: '请输入客户手机号!', trigger: 'blur' }
                ],
                RebateType: [
                    { required: true, message: '请选择分润方式!', trigger: 'change' }
                ],
                RebateValue: [
                    { required: true, message: '请输入分润比例!', trigger: 'blur' }
                ],
                Remark: [
                    { required: true, message: '请输入客户备注!', trigger: 'blur' }
                ],
                State: [
                    { required: true, message: '请选择客户状态', trigger: 'change' }
                ]
            },
            editDistributorFormRules: {
                Id: [
                    { required: true, message: '请输入客户手机号!', trigger: 'blur' }
                ],
                RebateType: [
                    { required: true, message: '请选择分润方式!', trigger: 'change' }
                ],
                RebateValue: [
                    { required: true, message: '请输入分润比例!', trigger: 'blur' }
                ],
                Remark: [
                    { required: true, message: '请输入客户备注!', trigger: 'blur' }
                ],
                State: [
                    { required: true, message: '请选择客户状态', trigger: 'change' }
                ]
            },
            distributorState: ''
        }
    },
    computed: {
        ...mapState({
            windowHeight: (state) => state.common.tableHeight
        })
    },
    created() {
        this.getDistributorList()
    },
    methods: {
        // 获取分销商列表
        getDistributorList: async function () {
            const params = {
                Entry: this.queryInfo.Entry
            }
            const { data: res } = await getDistributorList(this.queryInfo)
            this.distributorTableData = res.data
            // this.queryInfo.total = 
            console.log(res, '分销商列表');
        },
        // 打开新建分销商Dialog
        openDistributorDialog: function () {
            this.distributorDialogTitle = '新增分销商'
            this.isEditDistributorState = '1'
            this.distributorDialogVisible = true
        },
        // 新建分销商账号
        addDistributor: function () {
            this.$refs.distributorFormRef.validate(async valid => {
                if (!valid) return false
                const params = {
                    Entry: this.distributorForm
                }
                const { data: res } = await addDistributor(params)
                this.getDistributorList()
                this.distributorDialogVisible = false
                console.log(res);
            })
        },
        // 修改分销商状态
        editDistributorState: async function (ConsumerId, State) {
            const confirmResult = await this.$confirm('此操作将开启/关闭分销商账号,确定继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                this.getDistributorList()
                return this.$message.info('已取消修改！')
            }
            const params = {
                Entry: {
                    Id: ConsumerId,
                    State: State
                }
            }
            const { data: res } = await closeDistributor(params)
            this.getDistributorList()
            console.log(res, '修改装填');
        },
        // 打开修改分销商账号Dialog
        openEditDistributor: function (distributor) {
            this.editDistributorForm = distributor
            this.distributorDialogTitle = '修改分销商'
            this.isEditDistributorState = '0'
            this.editDistributorDialogVisible = true
        },
        // 修改分销商账号
        editDistributor: function () {
            this.$refs.editDistributorFormRef.validate(async valid => {
                if (!valid) return false
                const params = {
                    Entry: this.editDistributorForm
                }
                const { data: res } = await editDistributor(params)
                this.getDistributorList()
                this.editDistributorDialogVisible = false
                // this.distributorForm = {}
                console.log(res);
            })
        },
        // 重置新增分销商From表单
        resetDistirbutorForm: function () {
            this.$refs.distributorFormRef.resetFields()
        },
        // 重置修改分销商From表单
        resetEditDistirbutorForm: function () {
            this.$refs.editDistributorFormRef.resetFields()
        },
        handleSizeChange(val) {
            this.queryInfo.Entry.rows = val
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.queryInfo.Entry.page = val
            // console.log(`当前页: ${val}`);
        },
        // 设置表格表头颜色
        setTableHeaderClass: function ({ row, column, rowIndex }) {
            if (rowIndex === 0) {
                return 'table_header';
            }
        }
    },
}
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
