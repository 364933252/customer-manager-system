<template>
  <div>
    <div class="scroll_bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scrollBar',
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.scroll_bar {
  width: 100%;
  height: 400px;
  overflow: auto;
  // 滚动条整体部分
  &::-webkit-scrollbar {
    width: 6px; //对垂直方向滚动条
    height: 6px; //对水平方向滚动条
  }

  //滚动的滑块
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #c7e8ff //滚动条的颜色
;
  }

  //内层滚动槽
  &::-webkit-scrollbar-track-piece {
    background-color: rgba(224, 223, 223, 0.959);
  }
}
</style>
