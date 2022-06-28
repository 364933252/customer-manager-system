<template>
  <div class="home">
    <el-container class="home_container">
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <aside-menu></aside-menu>
      </el-aside>
      <el-container>
        <el-header height="100">
          <top-header></top-header>
          <common-tag></common-tag>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-footer>
          <bottom-footer></bottom-footer>
        </el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideMenu from '../components/basic/asideMenu.vue';
import topHeader from '@/components/basic/topHeader';
import TopHeader from '../components/basic/topHeader.vue';
import commonTag from '@/components/basic/commonTag';
import bottomFooter from '@/components/basic/bottomFooter';
import { mapState } from 'vuex';
export default {
  components: {
    asideMenu,
    topHeader,
    TopHeader,
    bottomFooter,
    commonTag
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.tabs.isCollapse
    })
  },
  created() {},
  methods: {}
};
</script>

<style>
@import url('../assets/css/home.css');
</style>
