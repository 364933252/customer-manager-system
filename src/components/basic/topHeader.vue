<template>
  <div>
    <div class="header">
      <div class="header_left">
        <el-button
          :type="isCollapse ? 'primary' : ''"
          size="mini"
          @click="changeCollapse"
          :icon="isCollapse ? 'el-icon-turn-off' : 'el-icon-open'"
          circle
        ></el-button>
        <div style="margin-left: 10px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in tabsList"
              :key="index"
              :to="item.path"
              >{{ item.label }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </div>
      <div class="header_right">
        <div class="user_info">
          <span style="font-weight: bold">设计师</span>
          <span style="margin: 5px">|</span>
          <span>韩梅梅</span>
        </div>
        <el-dropdown>
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="remind_box">
          <el-badge :value="15" class="item">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-bell" style="font-size: 20px;"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">
                评论
                <el-badge class="mark" :value="12" />
              </el-dropdown-item>
              <el-dropdown-item class="clearfix">
                回复
                <el-badge class="mark" :value="3" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </el-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'topHeader',
  data() {
    return {
      circleUrl:
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F09%2F20210709142454_dc8dc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658313075&t=814f031254e22d9ebeb362a11394cb1f'
    };
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.tabs.isCollapse,
      tabsList: (state) => state.tabs.tabsList
    })
  },
  methods: {
    ...mapMutations({
      changeAside: 'isCollapse'
    }),
    // 侧边栏扩展收缩
    changeCollapse: function () {
      this.changeAside();
    }
  }
};
</script>

<style>
@import url('../../assets/css/home.css');
</style>