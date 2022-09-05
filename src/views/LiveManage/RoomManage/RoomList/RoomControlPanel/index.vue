<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span style="font-size: 16px;  font-weight: bold;">直播间控制台</span>
            </div>
            <el-row>
                <el-col :span="16" :offset="4">
                    <div class="room_control_panel_box">
                        <div class="room_info_box">
                            <div class="room_info">
                                <div class="room_info_img">
                                    <img src="../../../../../assets/images/live1.jpg" class="info_img" alt="" srcset="">
                                </div>
                                <div class="room_info_box">
                                    <div>
                                        <div class="room_title">夏凉浮生半城雪</div>
                                        <div class="room_info_item">开播时间: {{ roomInfo.StartTime }} - {{ roomInfo.EndTime
                                        }}
                                        </div>
                                        <div class="room_info_item">房间号: {{ roomInfo.RoomId }}</div>
                                        <div class="room_info_item">主播: {{ roomInfo.AnchorName }} &nbsp; 微信号:
                                            {{ roomInfo.AnchorWechat }}</div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                            <el-divider></el-divider>
                            <div class="room_status_box">
                                <span style="font-size: 24px; font-weight: bold; color: rgb(134, 129, 129);">{{
                                        roomInfo.liveStatus
                                }}</span>
                            </div>
                        </div>
                        <div class="room_control_panel">
                            <el-tabs v-model="activeName">
                                <el-tab-pane label="设置" name="first">
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-card shadow="hover">
                                                <div class="room_control_item">
                                                    <div class="control_item">
                                                        <div class="control_item_right">
                                                            <div class="control_title">直播间禁言</div>
                                                            <div class="control_desc">开启后，所有观众无法在直播间发表评论。</div>
                                                        </div>
                                                        <div class="control_item_right">
                                                            <el-switch v-model="roomContorlForm.banComment" active-value="1"
                                                                inactive-value="0" active-color="#13ce66"
                                                                inactive-color="#ff4949" @change="isBanComment">
                                                            </el-switch>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-card shadow="hover">
                                                <div class="room_control_item">
                                                    <div class="control_item">
                                                        <div>
                                                            <div class="control_title">直播间回放</div>
                                                            <div class="control_desc">开启后，观众可在直播结束页面查看本场直播回放。</div>
                                                        </div>
                                                        <div>
                                                            <el-switch v-model="roomContorlForm.closeReplay" active-value="1"
                                                                inactive-value="0" active-color="#13ce66"
                                                                inactive-color="#ff4949" @change="isCloseReplay">
                                                            </el-switch>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-card shadow="hover">
                                                <div class="room_control_item">
                                                    <div class="control_item">
                                                        <div>
                                                            <div class="control_title">直播客服</div>
                                                            <div class="control_desc">开启后，将在直播间卡片内显示客服入口。</div>
                                                            <div class="control_desc">直播前请核对有足够多的客服人员，以保证客服效果。</div>
                                                        </div>
                                                        <div>
                                                            <el-switch v-model="roomContorlForm.closeKf" active-value="1"
                                                                inactive-value="0" active-color="#13ce66"
                                                                inactive-color="#ff4949" @change="isCloseKf">
                                                            </el-switch>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-card shadow="hover">
                                                <div class="room_control_item">
                                                    <div class="control_item">
                                                        <div>
                                                            <div class="control_title">主播副号</div>
                                                            <div class="control_desc">微信号：{{ roomInfo.SubAnchorWechat }}
                                                            </div>
                                                            <div class="control_desc">直播时，主播副号能在主播端进行商品推送、抽奖等操作。</div>
                                                        </div>
                                                        <div>
                                                            <el-button type="text" @click="editSubAnchor"
                                                                v-if="roomInfo.SubAnchorWechat">更改</el-button>
                                                            <el-button type="text" @click="addSubAnchor" v-else>添加副号
                                                            </el-button>
                                                            <el-button type="text"><span style="color: #ff0000;"
                                                                    @click="removeSubAnchor">删除</span></el-button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="room_control_assistant">
                            <el-card shadow="never">
                                <div slot="header" class="clearfix">
                                    <span style="font-weight: bold;">直播小助手</span>
                                    <el-popover placement="bottom-end" width="400" trigger="click"
                                        @hide="resetroomContorlForm">
                                        <div>添加小助手</div>
                                        <el-divider></el-divider>
                                        <el-form :model="roomContorlForm.user" :rules="roomContorlFormRules"
                                            ref="roomContorlFormRef" class="demo-ruleForm">
                                            <el-form-item prop="username">
                                                <el-input placeholder="输入微信号来添加小助手"
                                                    v-model="roomContorlForm.user.username" clearable>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item prop="nickname">
                                                <el-input placeholder="输入小助手昵称" v-model="roomContorlForm.user.nickname"
                                                    clearable>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="submitRoomAssistant">立即创建
                                                </el-button>
                                                <el-button @click="resetroomContorlForm">重置</el-button>
                                            </el-form-item>
                                        </el-form>
                                        <el-button slot="reference" style="float: right; padding: 3px 0" type="text">
                                            添加小助手</el-button>
                                    </el-popover>
                                </div>
                                <div class="assistant_list_box">
                                    <el-row :gutter="20">
                                        <el-col :span="6">
                                            <el-card shadow="hover">
                                                <div class="assistant_item">
                                                    <div class="assistant_item_img">
                                                        <img src="../../../../../assets/images/live1.jpg"
                                                            class="item_img_box" alt="" srcset="">
                                                    </div>
                                                    <div class="assistant_item_info_box">
                                                        <div class="assistant_item_name">主播</div>
                                                        <div class="assistant_item_wechat">x15153833300</div>
                                                        <div class="assistant_item_btn">
                                                            <el-button type="danger" @click="removeRoomAssistant">移除
                                                            </el-button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-card>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <!-- 添加/修改主播副号 -->
        <el-dialog :title="title" :visible.sync="subAnchorDialogVisible" width="30%" :close-on-click-modal="false"
            @closed="resetSubAnchorForm">
            <el-form :model="subAnchorForm" :rules="subAnchorFormRules" ref="subAnchorFormRulesRef" label-width="120px"
                class="demo-ruleForm">
                <el-form-item prop="username" label="副号微信号">
                    <el-input placeholder="输入微信号来添加小助手" v-model="subAnchorForm.username" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <span style="color: rgb(104, 102, 102);">直播时，主播副号能在主播端进行推送商品，抽奖等操作。</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="subAnchorDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSubAnchorForm" v-if="title === '新增主播副号'">确 定</el-button>
                <el-button type="primary" @click="eidtSubAnchorForm" v-if="title === '修改主播副号'">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getRoomDetail } from '@/api/liveManage/roomEdit/roomEdit'
import { isBanComment, isCloseReplay, isCloseKf, addSubAnchorForm, eidtSubAnchorForm, removeSubAnchor, submitRoomAssistant, removeRoomAssistant, searchRoomAssistant } from '@/api//liveManage//roomControlPanel/roomControl'
export default {
    data() {
        return {
            roomInfo: {},
            activeName: 'first',
            roomContorlForm: {
                roomId: '',
                banComment: '',
                closeKf: '',
                closeReplay: '',
                user: {
                    username: '',
                    nickname: ''
                }
            },
            roomContorlFormRules: {
                username: [
                    { required: true, message: '输入微信号来添加小助手', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '输入小助手昵称', trigger: 'blur' }
                ]
            },
            title: '',
            subAnchorDialogVisible: false,
            subAnchorForm: {
                roomId: '',
                username: ''
            },
            subAnchorFormRules: {
                username: [
                    { required: true, message: '填写副号的微信号', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.roomContorlForm.roomId = this.$route.params.id
        this.subAnchorForm.roomId = this.$route.params.id
        this.getRoomDetail(this.$route.params.id)
    },
    methods: {
        // 获取直播间详情
        getRoomDetail: async function (id) {
            const params = {
                Entry: {
                    RoomId: id
                }
            }
            const { data: res } = await getRoomDetail(params)
            this.roomInfo = res.data
            console.log(res, '直播间详情');
        },
        // 重置直播小助手表单
        resetroomContorlForm: function () {
            this.$refs.roomContorlFormRef.resetFields()
        },
        // 添加直播小助手
        submitRoomAssistant: async function () {
            const params = {
                Entry: this.roomContorlForm
            }
            const { data: res} = await submitRoomAssistant()
            document.body.click()
            this.getRoomDetail(this.roomContorlForm.roomId)
        },
        // 删除直播间小助手
        removeRoomAssistant: async function () {
            const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                this.getRoomDetail(this.roomContorlForm.roomId)
                return this.$message.info('已取消删除！')
            }
            const params = {
                Entry: {
                    roomId: this.roomContorlForm.roomId,
                    username: this.roomContorlForm.user.username
                }
            }
            const { data: res } = await removeSubAnchor(params)
            this.getRoomDetail(this.roomContorlForm.roomId)
        },
        // 查询直播间小助手
        searchRoomAssistant: async function () {
            const params = {
                Entry: {
                    roomId: this.roomContorlForm.roomId
                }
            }
            const { data: res} = await searchRoomAssistant(params)
            this.getRoomDetail(this.roomContorlForm.roomId)
        },
        // 添加主播副号弹窗
        addSubAnchor: function () {
            this.title = '新增主播副号'
            this.subAnchorDialogVisible = true
        },
        // 修改主播副号弹窗
        editSubAnchor: function () {
            this.title = '修改主播副号'
            this.subAnchorDialogVisible = true
        },
        // 重置添加主播副号表单
        resetSubAnchorForm: function () {
            this.$refs.subAnchorFormRulesRef.resetFields()
        },
        // 添加主播副号
        addSubAnchorForm: async function () {
            const params = {
                Entry: this.subAnchorForm
            }
            const { data: res } = await addSubAnchorForm(params) 
            this.subAnchorDialogVisible = false
        },
        // 修改主播副号
        eidtSubAnchorForm: async function () {
            const params = {
                Entry: this.subAnchorForm
            }
            const { data: res } = await eidtSubAnchorForm(params) 
            this.subAnchorDialogVisible = false
        },
        // 删除主播副号
        removeSubAnchor: async function () {
            const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                this.getRoomDetail(this.roomContorlForm.roomId)
                return this.$message.info('已取消删除！')
            }
            const params = {
                Entry: {
                    roomId: this.subAnchorForm.roomId
                }
            }
            const { data: res } = await removeSubAnchor(params) 
            this.getRoomDetail(this.roomContorlForm.roomId)
        },
        // 开启/关闭直播间全局禁言
        isBanComment: async function () {
            const confirmResult = await this.$confirm('此操作将开启/关闭直播间全局禁言, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                this.getRoomDetail(this.roomContorlForm.roomId)
                return this.$message.info('已取消操作！')
            }
            const params = {
                Entry: this.roomContorlForm
            }
            const { data: res} = await isBanComment(params)
            this.getRoomDetail(this.roomContorlForm.roomId)
        },
        // 开启/关闭回放
        isCloseReplay: async function () {
            const confirmResult = await this.$confirm('此操作将开启/关闭回放, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                this.getRoomDetail(this.roomContorlForm.roomId)
                return this.$message.info('已取消操作！')
            }
            const params = {
                Entry: this.roomContorlForm
            }
            const { data: res} = await isCloseReplay(params)
            this.getRoomDetail(this.roomContorlForm.roomId)
        },
        // 开启/关闭直播客服
        isCloseKf: async function () {
            const confirmResult = await this.$confirm('此操作将开启/关闭直播客服, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            console.log(confirmResult, '4454565465');
            if (confirmResult !== 'confirm') {
                this.getRoomDetail(this.roomContorlForm.roomId)
                return this.$message.info('已取消操作！')
            }
            const params = {
                Entry: this.roomContorlForm
            }
            const { data: res} = await isCloseKf(params)
            this.getRoomDetail(this.roomContorlForm.roomId)
        }
    },
}
</script>

<style>
@import url('../../../../../assets/css/roomList.css');
</style>
