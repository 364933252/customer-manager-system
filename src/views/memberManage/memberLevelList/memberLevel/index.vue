<template>
  <mc-container>
    <el-button
      type="success"
      icon="el-icon-circle-plus-outline"
      plain
      @click="dialogVisible = true"
      >新建等级</el-button
    >
    <!-- 等级列表 start -->
    <div class="member_level_box">
      <div class="member_level_item" v-for="(item, index) in memberLevelList" :key="index">
        <el-card shadow="hover">
          <div :class="'level_item' + item.levelBgIndex">
            <div class="level_item_top">
              <div>{{item.levelName}}</div>
              <div>{{item.storeName}}</div>
            </div>
            <div class="level_item_bottom">
                <div></div>
              <div>有效期:{{item.issuingDate}} - {{item.effectiveDate}}</div>
            </div>
          </div>
          <div class="level_btns">
            <el-button type="warning">编辑</el-button>
            <el-button type="danger">禁用</el-button>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 等级列表 end -->
    <!-- 新建等级对话框 start -->
    <el-dialog title="新建等级" :visible.sync="dialogVisible" width="30%" @close="closeMemberDialog">
      <el-form
        ref="levelFormRef"
        :model="levelForm"
        :rules="levelFormRules"
        label-width="100px"
      >
        <el-form-item label="选择模板:" prop="levelBgIndex">
          <el-carousel
            @change="changeLevelBg"
            :autoplay="false"
            :initial-index="levelForm.levelBgIndex"
            type="card"
            height="100px"
          >
            <el-carousel-item v-for="item in levelBgList" :key="item.id">
              <el-image
                :src="item.src"
                style="height: 100px; width: 100%"
                fit="fill"
              ></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-form-item>
        <el-form-item label="店铺名称:" prop="storeName">
          <el-input
            v-model="levelForm.storeName"
            placeholder="请输入店铺名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="等级名称:" prop="levelName">
          <el-input v-model="levelForm.levelName"></el-input>
        </el-form-item>
        <el-form-item label="发行日期:" prop="issuingDate">
          <el-date-picker
            v-model="levelForm.issuingDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="有效日期:" prop="effectiveDate">
          <el-date-picker
            v-model="levelForm.effectiveDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="等级描述:">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4 }"
            v-model="levelForm.levelDesc"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 新建等级对话框 end -->
  </mc-container>
</template>

<script>
import mcContainer from '@/components/common/container.vue';
import { mapState, mapMutations } from 'vuex';
export default {
  components: {
    mcContainer
  },
  data() {
    return {
      dialogVisible: false,
      levelBgList: [
        {
          id: 1,
          src: require('@/assets/vip_bg/vip1.png')
        },
        {
          id: 2,
          src: require('@/assets/vip_bg/vip2.png')
        },
        {
          id: 3,
          src: require('@/assets/vip_bg/vip3.png')
        }
      ],
      levelForm: {},
      levelFormRules: {
        storeName: [
          { required: true, message: '请输入店铺名称!', trigger: 'blur' }
        ],
        levelName: [
          { required: true, message: '请输入等级名称!', trigger: 'blur' }
        ],
        issuingDate: [
          {
            required: true,
            message: '请选择发行日期!',
            trigger: 'change'
          }
        ],
        effectiveDate: [
          {
            required: true,
            message: '请选择发行日期!',
            trigger: 'change'
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
        memberLevelList: state => state.common.memberLevelList
    })
  },
  methods: {
    ...mapMutations({
        addMemberLevel: 'addMemberLevel'
    }),
    // 切换会员等级背景
    changeLevelBg: function (index) {
      this.levelForm.levelBgIndex = index;
    },
    // 确定新建会员等级
    confirm: function () {
      this.addMemberLevel(this.levelForm)
      this.dialogVisible = false
    },
    // 取消新建会员等级
    cancle: function () {
        this.dialogVisible = false
    },
    // 关闭新建会员等级对话框并初始化
    closeMemberDialog: function () {
        // setTimeout(() => {
        //     this.$refs.levelFormRef.resetFields()
        // }, 1000)
        console.log(this.memberLevelList)
    }
  }
};
</script>

<style scoped>
@import url('../../../../assets/css/member.css');
.el-carousel__item.is-active {
  border: 1px solid rgb(29, 116, 255);
  box-shadow: 0 0 5px rgb(2, 53, 136);
}
</style>
