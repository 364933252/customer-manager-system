<template>
    <div class="goods_no_storage_box">
        <el-table :data="inStorageGoodList" style="width: 100%" :height="windowHeight + 20 + 'px'">
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
            <el-table-column label="操作" width="120">
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.start" :page-sizes="[10, 20, 30, 40, 50]" :page-size="queryInfo.limit"
            layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data() {
        return {
            inStorageGoodList: [
                {
                    
                }
            ],
            activeName: 'first',
            queryInfo: {
                start: 1,
                limit: 10
            },
            total: 100
        }
    },
    computed: {
        ...mapState({
            windowHeight: (state) => state.common.tableHeight
        })
    },
    methods: {
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
