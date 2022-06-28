<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'app',
  data() {
    return {
      clientHeight: `${document.documentElement.clientHeight || document.bodyclientHeight}`
    };
  },
  created() {
    //  window.addEventListener('popstate', this.editTabsSelected, false)
  },
  mounted() {
    this.getTableHeight();
   
  },
  watch: {
    // 监听可视区域高度变化，并赋值给需要自适应高度的组件高度变量
    clientHeight: {
      handler: function (newVal, oldVal) {
        const tableHeight = newVal - 190;
        this.setHeight(tableHeight);
      },
      immediate: true,
      deep: true
    },
    $route: {
      handler: function (newVal, oldVal) {
        console.log(newVal,  oldVal)
        this.editTabsSelected(newVal.name)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      setHeight: 'setTableHeight',
      editTabs: 'editTabsSelected'
    }),
    // 获取屏幕高度，设置自适应高度
    getTableHeight: function () {
      window.onresize = () => {
        this.clientHeight =
        document.documentElement.clientHeight || document.bodyclientHeight;
      
      }
      // const tableHeight = height - 190
      console.log(this.clientHeight, '132');
    },
    // 点击浏览器物理前进后退按钮时tabs变化
    editTabsSelected: function (name) {
      // console.log(this.$router)
      this.editTabs(name)
    }
  }
};
</script>

<style>
</style>
