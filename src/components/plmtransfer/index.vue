<template>
    <div>
        <div class="plm_transfer_box">
            <div class="plm_transfer_item_box">
                <scrollBar height="">
                    <div class="trnasfer_item_box">
                        <el-checkbox v-model="checked">直播间1</el-checkbox>
                    </div>
                </scrollBar>
            </div>
            <div class="plm_transfer_btns"></div>
            <div class="plm_transfer_item_box"></div>
        </div>
    </div>
</template>

<script>
    import scrollBar from '@/components/common/scrollBar'
    export default {
        components: {
            scrollBar
        },
        name: 'PLMTransfer',
        data() {
            return {
                leftData: [
                    {name: '直播间1', checked: false},
                    {name: '直播间2', checked: false},
                    {name: '直播间3', checked: false},
                    {name: '直播间4', checked: false},
                    {name: '直播间5', checked: false},
                    {name: '直播间6', checked: false},
                ]
            }
        },
    }
</script>

<style>
</style>
