<template>
  <div class="tags">
    <!-- <el-tag
      size="small"
      v-for="(tag, index) in tabsList"
      :key="index"
      :closable="tag.name !== 'homePage'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="clickTag(tag)"
      @close="handleClose(tag, index)"
      >{{ tag.label }}</el-tag
    > -->
    <el-tabs :value="tabName" @tab-click="clickTab" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(tab, index) in tabsList"
        :key="tab.path"
        :closable="tab.name !== 'homePage'"
        :label="tab.label"
        :name="tab.name"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'commonTag',
  data() {
    return {
      tabsName: 'homePage'
    };
  },
  computed: {
    ...mapState({
      tabsList: (state) => state.tabs.tabsList,
      tabName: (state) => state.tabs.tabName
    })
  },
  methods: {
    ...mapMutations({
      close: 'closeTag',
      editTabs: 'editTabsSelected'
    }),
    // 点击tab
    clickTab: function (tab) {
      this.$router.push({ name: tab.name });
      this.editTabs(tab.name)
      this.tabsName = this.tabName
    },
    // 删除tab
    removeTab: function (tab) {
      const index = this.tabsList.findIndex((item, index) => {
        if (item.name == tab) {
            return index
        }
      })
      const length = this.tabsList.length - 1;
      this.close(tab);
      if (tab !== this.$route.name) {
        return;
      }
      // 点击最后侧tag
      if (index === length) {
        this.$router.push({
          name: this.tabsList[index - 1].name
        });
        // this.tabName = this.tabsList[index - 1].name
        this.editTabs(this.tabsList[index - 1].name)
        this.tabsName = this.tabName
      } else {
        this.$router.push({
          name: this.tabsList[index].name
        });
        // this.tabName = this.tabsList[index].name
        this.editTabs(this.tabsList[index].name)
        this.tabsName = this.tabName
        console.log(index)
      }
    },
    // 点击tag
    clickTag: function (tag) {
      this.$router.push({ name: tag.name });
    },
    // 删除tag
    handleClose: function (tag, index) {
      const length = this.tabsList.length - 1;
      this.close(tag);
      if (tag.name !== this.$route.name) {
        return;
      }
      // 点击最后侧tag
      if (index === length) {
        this.$router.push({
          name: this.tabsList[index - 1].name
        });
      } else {
        this.$router.push({
          name: this.tabsList[index].name
        });
      }
    }
  }
};
</script>

<style>
@import url('../../assets/css/home.css');
</style>