<template>
  <div class="index_box">
    <div class="index_404">
      <div class="index_404_btn" @click="$router.go(-1)"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.index_box {
  position: relative;
  height: 100%;
  .index_404 {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
    width: 100%;
    height: 700px;
    background: url('../../../assets/images/404ps.png') no-repeat top center;
    background-size: 100% 100%;
    z-index: 1;
    .index_404_btn {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%);
      width: 237px;
      height: 71px;
      background: url('../../../assets/images/go_back_btn.png') no-repeat top
        center;
      background-size: 100% 100%;
      z-index: 1;
    }
  }
}
</style>
