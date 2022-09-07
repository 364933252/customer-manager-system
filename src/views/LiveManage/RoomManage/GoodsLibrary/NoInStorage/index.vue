<template>
    <div class="goods_no_storage_box">
        <el-row>
            <el-col :span="22">
                <el-tabs v-model="queryInfo.status">
                    <el-tab-pane label="未审核" name="0"></el-tab-pane>
                    <el-tab-pane label="审核中" name="1"></el-tab-pane>
                    <el-tab-pane label="审核未通过" name="2"></el-tab-pane>
                    <el-tab-pane label="违规下架" name="3"></el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="2">
                <el-button type="success" icon="el-icon-circle-plus-outline">添加商品</el-button>
            </el-col>
        </el-row>
        <el-table :data="noStorageGoodList" style="width: 100%" :height="windowHeight - 20 + 'px'">
            <el-table-column prop="date" label="基本信息" width="600">
                <template>
                    <div class="goods_info_box">
                        <img src="../../../../../assets/images/x.png" style="width: 100px;height: 100px; border-radius: 10px;" alt="" srcset="">
                        <div class="goods_name">1111111</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="价格" width="200">
            </el-table-column>
            <el-table-column prop="address" label="链接">
            </el-table-column>
            <el-table-column label="操作"  width="120">
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.offset" :page-sizes="[10, 20, 30, 40, 50]" :page-size="queryInfo.limit"
            layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getNoInStorageList } from '@/api/goodsManage/noInStorage/noInStorage'
export default {
    data() {
        return {
            noStorageGoodList: [],
            queryInfo: {
                offset: 1,
                limit: 10,
                status:'0'
            },
            total: 100
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
            console.log(res, '未入库商品列表');
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
}
</script>

<style>
@import url('../../../../../assets/css/goodsLibrary.css');
</style>
