<template>
    <div class="goods_no_storage_box">
        <el-row>
            <el-col :span="22">
                <el-tabs v-model="queryInfo.status" @tab-click="getGoodsByStatus">
                    <el-tab-pane label="未审核" name="0"></el-tab-pane>
                    <el-tab-pane label="审核中" name="1"></el-tab-pane>
                    <el-tab-pane label="审核未通过" name="3"></el-tab-pane>
                    <!-- <el-tab-pane label="违规下架" name="3"></el-tab-pane> -->
                </el-tabs>
            </el-col>
            <el-col :span="2">
                <el-button type="success" icon="el-icon-circle-plus-outline" @click="addOpenGoodForm">
                    添加商品</el-button>
            </el-col>
        </el-row>
        <el-table :data="noStorageGoodList" style="width: 100%" :height="windowHeight - 20 + 'px'">
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
                    <el-button type="text" v-if="queryInfo.status === '0' || queryInfo.status === '3'"
                        @click="submitAuditGood(row.goodsId)">提交审核</el-button>
                    <el-button type="text" v-if="queryInfo.status === '1'" @click="repealAuditGood(row.goodsId)">撤销审核
                    </el-button>
                    <el-button type="text" v-if="queryInfo.status === '0' || queryInfo.status === '3'"
                        @click="editOpenGoodForm(row.goodsId)">编辑</el-button>
                    <el-button type="text" @click="deleteGood(row.goodsId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.offset" :page-sizes="[10, 20, 30, 40, 50]" :page-size="queryInfo.limit"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- 添加商品Dialog -->
        <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="addGoodFormDialogVisible" width="30%"
            @close="resetGoodForm">
            <el-form :model="addGoodForm" :rules="addGoodFormRules" ref="addGoodFormRef" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="商品图片" prop="CoverImgUrl">
                    <el-upload class="upload-demo" action="action" list-type="picture" :http-request="uploadGoodImg"
                        :multiple="false" :limit="1" :on-preview="handlePreview" :on-remove="handleGoodImgRemove"
                        :on-change="handleGoodImgChange">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <span style="color: rgb(99, 93, 93);">建议尺寸：300像素 * 300像素，图片大小不得超过1M</span>
                </el-form-item>
                <el-form-item label="商品名称" prop="Name">
                    <el-input v-model="addGoodForm.Name" placeholder="请输入商品名称" minlength="3" maxlength="14"
                        show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="价格类型">
                    <el-radio-group v-model="addGoodForm.PriceType">
                        <el-radio :label="1">一口价</el-radio>
                        <el-radio :label="2">区间价格</el-radio>
                        <el-radio :label="3">显示折扣价</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="价格" prop="Price">
                    <el-row v-if="addGoodForm.PriceType === 1">
                        <el-col :span="10">
                            <el-input v-model="addGoodForm.Price" placeholder="可保留两位小数">
                                <template slot="suffix">元</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" v-if="addGoodForm.PriceType === 2">
                        <el-col :span="10">
                            <el-input v-model="addGoodForm.Price" placeholder="可保留两位小数">
                                <template slot="suffix">元</template>
                            </el-input>
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="addGoodForm.Price2" placeholder="可保留两位小数">
                                <template slot="suffix">元</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" v-if="addGoodForm.PriceType === 3">
                        <el-col :span="11">
                            <el-input v-model="addGoodForm.Price" placeholder="市场价(可保留两位小数)">
                                <template slot="suffix">元</template>
                            </el-input>
                        </el-col>
                        <el-col :span="11">
                            <el-input v-model="addGoodForm.Price2" placeholder="现价(可保留两位小数)">
                                <template slot="suffix">元</template>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="商品路径" prop="Url">
                    <el-input v-model="addGoodForm.Url"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addGoodFormDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addGood">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改商品Dialog -->
        <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="editGoodFormDialogVisible" width="30%"
            @close="resetEidtGoodForm">
            <el-form :model="editGoodForm" :rules="editGoodFormRules" ref="editGoodFormRef" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="商品图片" prop="cover_img_url">
                    <div class="edit_good_img_box">
                        <div class="good_img_box">
                            <img :src="editGoodForm.cover_img_url" v-if="isGoodImg" class="good_img" />
                        </div>
                        <el-upload class="upload-demo" action="action" list-type="picture"
                            :http-request="uploadEditGoodImg" :multiple="false" :limit="1" :on-preview="handlePreview"
                            :on-remove="handleGoodImgRemove" :on-change="handleGoodImgChange">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                    <span style="color: rgb(99, 93, 93);">建议尺寸：300像素 * 300像素，图片大小不得超过1M</span>
                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="editGoodForm.name" placeholder="请输入商品名称" minlength="3" maxlength="14"
                        show-word-limit>
                    </el-input>
                </el-form-item>
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
                <el-form-item label="商品路径" prop="url">
                    <el-input v-model="editGoodForm.url"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editGoodFormDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editGood">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getNoInStorageList, addGood, submitAuditGood, getGoodsDetail, editGood, deleteGood, repealAuditGood } from '@/api/goodsManage/noInStorage/noInStorage'
import { getUploadImgUrl, uploadImg } from '@/api/liveManage/roomAdd/roomAdd';
export default {
    data() {
        var validCoverImgUrl = (rule, value, callback) => {
            if (this.addGoodForm.CoverImgUrl === '' || this.addGoodForm.CoverImgUrl === undefined) {
                callback(new Error('请上传商品图片'))
            } else {
                callback()
            }
        }
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
            noStorageGoodList: [],
            queryInfo: {
                offset: 1,
                limit: 10,
                status: '0'
            },
            total: 100,
            addGoodFormDialogVisible: false,
            addGoodForm: {
                CoverImgUrl: '',
                Name: '',
                PriceType: 1,
                Price: '',
                Price2: '',
                Url: '',
                ThirdPartyAppid: ''
            },
            addGoodFormRules: {
                CoverImgUrl: [
                    { required: true, validator: validCoverImgUrl, tigger: 'change' }
                ],
                Name: [
                    { required: true, message: '请输入商品名称!', tigger: 'blur' }
                ],
                Price: [
                    { required: true, validator: validatePrice, tigger: 'blur' },
                    {
                        pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message: '请输入正确额格式,可保留两位小数',
                        tigger: 'blur'
                    }
                ],
                Url: [
                    { required: true, message: '请输入商品路径!', tigger: 'blur' }
                ]
            },
            editGoodFormDialogVisible: false,
            editGoodForm: {},
            editGoodFormRules: {
                cover_img_url: [
                    { required: true, validator: validCoverImgUrl, tigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入商品名称!', tigger: 'blur' }
                ],
                price: [
                    { required: true, validator: validatePrice, tigger: 'blur' },
                    {
                        pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message: '请输入正确额格式,可保留两位小数',
                        tigger: 'blur'
                    }
                ],
                url: [
                    { required: true, message: '请输入商品路径!', tigger: 'blur' }
                ]
            },
            title: '',
            isGoodImg: true
        }
    },
    computed: {
        ...mapState({
            windowHeight: (state) => state.common.tableHeight
        })
    },
    created() {
        this.getNoInStorageList()
    },
    methods: {
        // 获取未入库商品列表
        getNoInStorageList: async function () {
            const params = {
                Entry: {
                    offset: this.queryInfo.offset - 1,
                    limit: this.queryInfo.limit,
                    status: this.queryInfo.status
                }
            }
            const { data: res } = await getNoInStorageList(params)
            this.noStorageGoodList = res.data.goods
            this.total = Number(res.data.total)
            console.log(res, '未入库商品列表');
        },
        // 根据商品审核状态查询商品列表
        getGoodsByStatus: async function (tab, event) {
            this.getNoInStorageList()
            console.log(this.queryInfo.status);
        },
        // 上传添加商品所需图片
        uploadGoodImg: async function (e) {
            const formData = new FormData();
            formData.append('media', e.file);
            const { data: res } = await getUploadImgUrl();
            const { data: res1 } = await uploadImg(res.data, formData);
            this.addGoodForm.CoverImgUrl = res1.media_id
            console.log(res1, '111222111');
        },
        // 上传修改商品所需图片
        uploadEditGoodImg: async function (e) {
            const formData = new FormData();
            formData.append('media', e.file);
            const { data: res } = await getUploadImgUrl();
            const { data: res1 } = await uploadImg(res.data, formData);
            this.editGoodForm.cover_img_url = res1.media_id
            this.isGoodImg = false
            console.log(res1, '111222111');
        },
        // 打开添加商品form表单
        addOpenGoodForm: function () {
            this.title = '添加商品'
            this.addGoodFormDialogVisible = true
        },
        // 打开修改商品form表单
        editOpenGoodForm: function (goodId) {
            this.title = '修改商品'
            this.getGoodDetail(goodId)
            this.editGoodFormDialogVisible = true
        },
        // 添加商品
        addGood: function () {
            console.log(this.addGoodForm);
            this.$refs.addGoodFormRef.validate(async valid => {
                if (!valid) return false
                const params = {
                    Entry: this.addGoodForm
                }
                const { data: res } = await addGood(params)
                this.addGoodFormDialogVisible = false
                console.log(res, '添加商品');
            })
        },
        // 修改商品
        editGood: async function () {
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
        // 商品重新提交审核
        submitAuditGood: async function (goodsId) {
            const confirmResult = await this.$confirm('此操作将重新提交审核商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                this.getNoInStorageList()
                return this.$message.info('已取消删除！')
            }
            const params = {
                Entry: {
                    goodsId: goodsId
                }
            }
            const { data: res } = await submitAuditGood(params)
            console.log(res, '商品审核');
        },
        // 撤销审核
        repealAuditGood: function () {

        },
        // 删除商品
        deleteGood: async function (goodsId) {
            const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                this.getNoInStorageList()
                return this.$message.info('已取消删除！')
            }
            const params = {
                Entry: {
                    goodsId
                }
            }
            const { data: res } = await deleteGood(params)
            this.getNoInStorageList()
        },
        // 重置新增商品表单
        resetGoodForm: function () {
            this.$refs.addGoodFormRef.resetFields()
        },
        // 重置修改商品表单
        resetEidtGoodForm: function () {
            this.$refs.editGoodFormRef.resetFields()
        },
        // 删除上传图片
        handleGoodImgRemove(file, fileList) {
            console.log(file, fileList);
            this.addRoomForm.ShareImg = ''
        },
        handlePreview(file) {
            console.log(file);
        },
        handleGoodImgChange(file, fileList) {
            //   this.addRoomForm.FeedsImg = file;
        },
        handleSizeChange(val) {
            this.queryInfo.limit = val
            this.getNoInStorageList()
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.queryInfo.offset = val
            this.getNoInStorageList()
            console.log(`当前页: ${val}`);
        }
    },
}
</script>

<style>
@import url('../../../../../assets/css/goodsLibrary.css');
</style>
