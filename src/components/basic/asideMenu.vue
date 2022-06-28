<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      active-text-color="#fff"
    >
        <h3 style="text-align: center;">{{isCollapse ? '墨辰' : '墨辰CRM系统'}}</h3>
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu
        :index="item.path"
        v-for="(item, index) in hasChildren"
        :key="index"
      >
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
        >
          <el-menu-item @click="clickMenu(subItem)" v-if="!subItem.children" :index="subItem.path">
            <i :class="'el-icon-' + subItem.icon"></i>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
          <el-submenu :index="subItem.path" v-if="subItem.children">
            <template slot="title">
                <i :class="'el-icon-' + subItem.icon"></i>
                <span>{{ subItem.label }}</span>
            </template>
            <el-menu-item
              :index="sunItem.path"
              v-for="(sunItem, sunIndex) in subItem.children"
              :key="sunIndex"
              @click="clickMenu(sunItem)"
              >
              <i :class="'el-icon-' + sunItem.icon"></i>
              <span>{{ sunItem.label }}</span>
              </el-menu-item
            >
          </el-submenu>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'asideMenu',
  data() {
    return {
        
    };
  },
  computed: {
    ...mapState({
      menuList: (state) => state.tabs.menuList,
      isCollapse: state => state.tabs.isCollapse
    }),
    noChildren: function () {
      return this.menuList.filter((item) => !item.children);
    },
    hasChildren: function () {
      return this.menuList.filter((item) => item.children);
    }
  },
  created() {
    console.log(this.hasChildren);
  },
  methods: {
    ...mapMutations({
        selectMenu: 'selectMenu',
        editTabs: 'editTabsSelected'
    }),
    clickMenu: function (menu) {
      console.log(menu);
      this.$router.push({
        name: menu.name
      });
      this.selectMenu(menu)
      this.editTabs(menu.name)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
@import url('../../assets/css/home.css');
</style>
