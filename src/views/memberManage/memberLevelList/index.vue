<template>
  <!-- <div class="el-main_bd"> -->
  <mc-container>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#409eff"
        >
          <el-menu-item :index="item.name" v-for="item in memberMenuList" @click="changeMenu(item)" :key="item.id">{{item.menuName}}</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </mc-container>
  <!-- </div> -->
</template>

<script>
import mcContainer from '@/components/common/container.vue';
export default {
  components: {
    mcContainer
  },
  data() {
    return {
      activeIndex: 'memberLevel',
      memberMenuList: [
        {
          id: 1,
          name: 'memberLevel',
          menuName: '会员等级'
        },
        {
          id: 2,
          name: 'levelGroup',
          menuName: '等级分组'
        }
      ]
    };
  },
  methods: {
    // 切换菜单
    changeMenu: function (item) {
      this.$router.push({name: item.name})
    }
  }
};
</script>

<style scoped>
@import url('../../../assets/css/member.css');
.el-menu-item.is-active {
  background: #fff;
}
.el-main {
  background: #fff;
}
</style>
