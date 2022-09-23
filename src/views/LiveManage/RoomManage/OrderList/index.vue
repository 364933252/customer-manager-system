<template>
    <div>
        <el-card>
            <el-table :data="orderList" style="width: 100%" :height="windowHeight + 20 + 'px'">
                <el-table-column type="expand">
                    <template slot-scope="{ row }">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品 ID">
                                <span>{{ row.goodsInfo[0].GoodId }}</span>
                            </el-form-item>
                            <el-form-item label="商品编号">
                                <span>{{ row.goodsInfo[0].Id }}</span>
                            </el-form-item>
                            <el-form-item label="商品名称">
                                <span>{{ row.goodsInfo[0].GoodName }}</span>
                            </el-form-item>
                            <el-form-item label="商品总数">
                                <span>{{ row.goodsInfo[0].Number }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="订单 ID" prop="Id">
                </el-table-column>
                <el-table-column label="收货人" width="80">
                    <template slot-scope="{ row }">
                        <span>{{row.AddressInfo.Name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="手机号" width="120">
                    <template slot-scope="{ row }">
                        <span>{{row.AddressInfo.Phone}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="收获地址" prop="name">
                    <template slot-scope="{ row }">
                        <span>{{row.AddressInfo.Province + row.AddressInfo.City + row.AddressInfo.Area +
                        row.AddressInfo.Address}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="订单总数" prop="Total">
                </el-table-column>
                <el-table-column label="订单描述" prop="Description">
                </el-table-column>
                <el-table-column label="订单备注" prop="Remark">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{ row }">
                        <el-button type="text" @click="getOrdersInfo(row.Id)">修改订单物流信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.page" :page-sizes="[10, 20, 30, 40, 50]" :page-size="queryInfo.rows"
                layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
            <!-- 修改订单物流地址 -->
            <el-dialog title="修改订单物流地址" :visible.sync="orderAddressDialog" width="30%">
                <el-form ref="orderAddressFromRef" :model="orderAddressFrom" :rules="orderAddressFromRules"
                    label-width="100px">
                    <el-form-item label="订单 ID">
                        <el-input v-model="orderAddressFrom.OrderId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="收货人" prop="Name">
                        <el-input v-model="orderAddressFrom.Name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="Phone">
                        <el-input v-model="orderAddressFrom.Phone"></el-input>
                    </el-form-item>
                    <el-form-item label="所在省" prop="Province">
                        <el-input v-model="orderAddressFrom.Province"></el-input>
                    </el-form-item>
                    <el-form-item label="所在市" prop="City">
                        <el-input v-model="orderAddressFrom.City"></el-input>
                    </el-form-item>
                    <el-form-item label="所在区/县" prop="Area">
                        <el-input v-model="orderAddressFrom.Area"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="Address">
                        <el-input v-model="orderAddressFrom.Address"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="orderAddressDialog = false">取 消</el-button>
                    <el-button type="primary" @click="editOrdersAddress">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getOrderList, getOrdersInfo, editOrdersAddress } from '@/api/orderManage/orderlist/orderList'
export default {
    data() {
        return {
            orderList: [],
            queryInfo: {
                rows: 10,
                page: 1,
                Type: '',
                Sort: ''
            },
            orderAddressDialog: false,
            orderAddressFrom: {
                OrderId: '',
                Name: '',
                Phone: '',
                Province: '',
                City: '',
                Area: '',
                Address: '',
                LogisticsId: ''
            },
            orderAddressFromRules: {
                Name: [
                    { required: true, message: '请输入收货人名称！', trigger: 'blur' },
                ],
                Phone: [
                    { required: true, message: '请输入收货人联系方式！', trigger: 'blur' },
                ],
                Province: [
                    { required: true, message: '请输入收货人所在省份！', trigger: 'blur' },
                ],
                City: [
                    { required: true, message: '请输入收货人所在市！', trigger: 'blur' },
                ],
                Area: [
                    { required: true, message: '请输入收货人所在区/县！', trigger: 'blur' },
                ],
                Address: [
                    { required: true, message: '请输入收货人详细地址！', trigger: 'blur' },
                ],
            }
        }
    },
    computed: {
        ...mapState({
            windowHeight: (state) => state.common.tableHeight
        })
    },
    created() {
        this.getOrderList()
    },
    methods: {
        // 获取商品订单列表
        getOrderList: async function () {
            const params = {
                Entry: this.queryInfo
            }
            const { data: res } = await getOrderList(params)
            this.orderList = res.data
            console.log(res, '订单列表');
        },
        // 获取订单详细信息
        getOrdersInfo: async function (orderId) {
            const params = {
                Entry: {
                    OrderId: orderId
                }
            }
            const { data: res } = await getOrdersInfo(params)
            this.orderAddressFrom.OrderId = res.data.Id
            this.orderAddressFrom.Name = res.data.AddressInfo.Name
            this.orderAddressFrom.Phone = res.data.AddressInfo.Phone
            this.orderAddressFrom.Province = res.data.AddressInfo.Province
            this.orderAddressFrom.City = res.data.AddressInfo.City
            this.orderAddressFrom.Area = res.data.AddressInfo.Area
            this.orderAddressFrom.Address = res.data.AddressInfo.Address
            this.orderAddressDialog = true
            console.log(res, '订单信息');
        },
        // 修改订单物流地址
        editOrdersAddress: async function () {
            const params = {
                Entry: this.orderAddressFrom
            }
            this.$refs.orderAddressFromRef.validate(async valid => {
                if (!valid) return false
                const { data: res } = await editOrdersAddress(params)
                this.getOrderList()
                this.orderAddressDialog = false
            })
        },
        // 重置修改物流信息信息表单
        resetOrdersAddressForm: function () {
            this.$refs.orderAddressFromRef.resetFields()
        },
        handleSizeChange(val) {
            this.queryInfo.rows = val
            this.getOrderList()
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.queryInfo.page = val
            this.getOrderList()
            console.log(`当前页: ${val}`);
        }
    },
}
</script>

<style>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
