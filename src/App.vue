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
  mounted() {
    this.getTableHeight();
  },
  watch: {
    clientHeight: {
      handler: function (newVal, oldVal) {
        const tableHeight = newVal - 190;
        this.setHeight(tableHeight);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      setHeight: 'setTableHeight'
    }),
    // 获取屏幕高度，设置表格满屏高度
    getTableHeight: function () {
      window.onresize = () => {
        this.clientHeight =
        document.documentElement.clientHeight || document.bodyclientHeight;
      
      }
      // const tableHeight = height - 190
      console.log(this.clientHeight, '132');
    }
  }
};
</script>

<style>
</style>
