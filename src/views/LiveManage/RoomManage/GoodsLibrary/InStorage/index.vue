<template>
    <div class="goods_no_storage_box">
        <el-table :data="inStorageGoodList" style="width: 100%" :height="windowHeight + 20 + 'px'">
            <el-table-column label="基本信息" width="600">
                <template slot-scope="{row}">
                    <div class="goods_info_box">
                        <img :src="row.coverImgUrl" style="width: 100px;height: 100px; border-radius: 10px;" alt=""
                            srcset="">
                        <div class="goods_name">{{row.name}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="价格" width="200">
                <template slot-scope="{row}">
                    <span v-if="row.priceType === '1'">{{row.price}}元</span>
                    <span v-if="row.priceType === '2'">{{row.price}}元 ~ {{row.price2}}元</span>
                    <div class="line_price_box" v-if="row.priceType === '3'">
                        <div class="line_price">市场价:{{row.price}}元</div>
                        <div class="price">现价{{row.price2}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="url" label="链接">
            </el-table-column>
            <el-table-column label="操作" align="center" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" @click="editOpenGoodForm(row.goodsId)">编辑</el-button>
                    <el-button type="text" @click="deleteGood(row.goodsId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.start" :page-sizes="[10, 20, 30, 40, 50]" :page-size="queryInfo.limit"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="editGoodFormDialogVisible" width="30%"
            @close="resetEidtGoodForm">
            <el-form :model="editGoodForm" :rules="editGoodFormRules" ref="editGoodFormRef" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="价格类型">
                    <el-radio-group v-model="editGoodForm.price_type">
                        <el-radio label="1">一口价</el-radio>
                        <el-radio label="2">区间价格</el-radio>
                        <el-radio label="3">显示折扣价</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-row v-if="editGoodForm.price_type === '1'">
                        <el-col :span="10">
                            <el-input v-model="editGoodForm.price" placeholder="可保留两位小数">
                                <template slot="suffix">元</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" v-if="editGoodForm.price_type === '2'">
                        <el-col :span="10">
                            <el-input v-model="editGoodForm.price" placeholder="可保留两位小数">
                                <template slot="suffix">元</template>
                            </el-input>
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="editGoodForm.price2" placeholder="可保留两位小数">
                                <template slot="suffix">元</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" v-if="editGoodForm.price_type === '3'">
                        <el-col :span="11">
                            <el-input v-model="editGoodForm.price" placeholder="市场价(可保留两位小数)">
                                <template slot="suffix">元</template>
                            </el-input>
                        </el-col>
                        <el-col :span="11">
                            <el-input v-model="editGoodForm.price2" placeholder="现价(可保留两位小数)">
                                <template slot="suffix">元</template>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editGoodFormDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editGoodPrice">修改价格</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getNoInStorageList, addGood, submitAuditGood, getGoodsDetail, editGood, deleteGood, repealAuditGood } from '@/api/goodsManage/noInStorage/noInStorage'
export default {
    data() {
        var validatePrice = (rule, value, callback) => {
            if (!value) {
                callback(new Error('价格不能为空!'))
            } else if (value.split('.').length > 2) {
                callback(new Error('请输入正确格式的金额!'))
            } else {
                // value = Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2) //四舍五入
                // // value = Number(value).toFixed(2)  //不足补位
                // this.addGoodForm.Price = value
                callback()
            }
        }
        return {
            inStorageGoodList: [],
            activeName: 'first',
            queryInfo: {
                offset: 1,
                limit: 10,
                status: '2'
            },
            total: 100,
            editGoodFormDialogVisible: false,
            editGoodForm: {},
            editGoodFormRules: {
                price: [
                    { required: true, validator: validatePrice, tigger: 'blur' },
                    {
                        pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message: '请输入正确额格式,可保留两位小数',
                        tigger: 'blur'
                    }
                ]
            },
            title: '',
        }
    },
    computed: {
        ...mapState({
            windowHeight: (state) => state.common.tableHeight
        })
    },
    created() {
        this.getInStorageList()
    },
    methods: {
        // 获取未入库商品列表
        getInStorageList: async function () {
            const params = {
                Entry: {
                    offset: this.queryInfo.offset - 1,
                    limit: this.queryInfo.limit,
                    status: this.queryInfo.status
                }
            }
            const { data: res } = await getNoInStorageList(params)
            this.inStorageGoodList = res.data.goods
            this.total = Number(res.data.total)
            console.log(res, '未入库商品列表');
        },
        // 打开修改商品价格form表单
        editOpenGoodForm: function (goodId) {
            this.title = '修改商品价格'
            this.getGoodDetail(goodId)
            this.editGoodFormDialogVisible = true
        },
        // 修改商品价格
        editGoodPrice: async function () {
            const params = {
                Entry: {
                    goodsId: this.editGoodForm.goods_id,
                    CoverImgUrl: this.editGoodForm.cover_img_url,
                    Name: this.editGoodForm.name,
                    PriceType: this.editGoodForm.price_type,
                    Price: this.editGoodForm.price,
                    Price2: this.editGoodForm.price2,
                    Url: this.editGoodForm.url,
                    ThirdPartyAppid: this.editGoodForm.third_party_tag,
                }
            }
            const { data: res } = await editGood(params)
            console.log(res, '修改商品');
        },
        // 获取商品详情
        getGoodDetail: async function (goodId) {
            const goodIds = []
            goodIds.push(goodId)
            const params = {
                Entry: {
                    goods_ids: goodIds
                }
            }
            console.log(params);
            const { data: res } = await getGoodsDetail(params)
            this.editGoodForm = res.data.goods[0]
            console.log(res, '商品详情');
        },
        // 删除商品
        deleteGood: async function (goodsId) {
            const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                this.getInStorageList()
                return this.$message.info('已取消删除！')
            }
            const params = {
                Entry: {
                    goodsId
                }
            }
            const { data: res } = await deleteGood(params)
            this.getInStorageList()
        },
        // 重置修改商品价格表单
        resetEidtGoodForm: function () {
            this.$refs.editGoodFormRef.resetFields()
        },
        handleSizeChange(val) {
            this.queryInfo.limit = val
            this.getInStorageList()
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.queryInfo.offset = val
            this.getInStorageList()
            console.log(`当前页: ${val}`);
        }
    },
}
</script>

<style>
@import url('../../../../../assets/css/goodsLibrary.css');
</style>
