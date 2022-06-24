<template>
  <div>
    <el-card :body-style="{height: windowHeight+'px'}">
      
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState({
      windowHeight: state => state.common.tableHeight
    })
  },
  created () {

  }
};
</script>

<style>
</style>
