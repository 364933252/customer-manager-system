<template>
  <div>
    <el-card>
      <el-row style="margin-bottom: 10px">
        <el-col :span="8" :offset="6">
          <el-input
            v-model="queryInfo.search"
            placeholder="请输入姓名/联系方式进行搜索"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-dropdown style="margin: 0 5px">
            <span class="el-dropdown-link">
              高级搜索<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-table
        :data="clueTableData"
        :height="windowHeight - 20 + 'px'"
        :header-row-class-name="setTableHeaderClass"
        stripe
        highlight-current-row
        style="width: 100%"
        @row-contextmenu="onContextmenu"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
        <el-table-column prop="gender" label="性别" width="60">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="120"
        ></el-table-column>
        <el-table-column prop="purpose" label="意向等级" width="200">
          <template slot-scope="{ row }">
            <el-rate
              v-model="row.purpose"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              show-text
              allow-half
              :texts="['极差', '失望', '一般', '满意', '很满意']"
              @change="changePurpose(row)"
            >
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="budget" label="预算" width="100">
        </el-table-column>
        <el-table-column prop="style" label="风格" width="200">
        </el-table-column>
        <el-table-column prop="addr" label="地址" width="300">
        </el-table-column>
        <el-table-column prop="source" label="来源" width="100">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="120">
        </el-table-column>
        <el-table-column>
          <template slot-scope="{ row }">
            <el-tooltip effect="dark" content="查看客户详情" placement="top">
              <el-button
                type="primary"
                circle
                icon="el-icon-search"
                size="mini"
                @click="checkCustomerDetail(row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="转为会员" placement="top">
              <el-button
                type="warning"
                circle
                icon="el-icon-medal"
                size="mini"
                @click="transferMember(row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.current"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="queryInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import scrollBar from '@/components/common/scrollBar';
import { mapState, mapMutations } from 'vuex';
export default {
  components: {
    scrollBar
  },
  data() {
    return {
      queryInfo: {
        search: '',
        current: 1,
        size: 10
      },
      clueTableData: [
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 5,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 3,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 1,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 0,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 2,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 5,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 4,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 3,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 4,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 4,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 3,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 4,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 4,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 3,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        },
        {
          name: '李先生',
          gender: '男',
          mobile: '15689360191',
          purpose: 4,
          budget: '50000',
          style: '后现代简约风',
          addr: '山东省枣庄市滕州市龙泉湾36号楼1101',
          source: '广告',
          date: '2022-06-25'
        }
      ],
    };
  },
  computed: {
    ...mapState({
      windowHeight: (state) => state.common.tableHeight
    })
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 设置表格表头颜色
    setTableHeaderClass: function ({ row, column, rowIndex }) {
      if (rowIndex === 0) {
        return 'table_header';
      }
    },
    // 表格右键菜单事件
    onContextmenu(row, column, event) {
      event.preventDefault();
      this.$contextmenu({
        items: [
          {
            label: '返回(B)',
            onClick: () => {
              this.message = '返回(B)';
              console.log('返回(B)');
            }
          },
          { label: '前进(F)', disabled: true },
          { label: '重新加载(R)', divided: true, icon: 'el-icon-refresh' },
          { label: '另存为(A)...' },
          { label: '打印(P)...', icon: 'el-icon-printer' },
          { label: '投射(C)...', divided: true },
          {
            label: '使用网页翻译(T)',
            divided: true,
            minWidth: 0,
            children: [{ label: '翻译成简体中文' }, { label: '翻译成繁体中文' }]
          },
          {
            label: '截取网页(R)',
            minWidth: 0,
            children: [
              {
                label: '截取可视化区域',
                onClick: () => {
                  this.message = '截取可视化区域';
                  console.log('截取可视化区域');
                }
              },
              { label: '截取全屏' }
            ]
          },
          { label: '查看网页源代码(V)', icon: 'el-icon-view' },
          { label: '检查(N)' }
        ],
        event, // 鼠标事件信息
        customClass: 'custom-class', // 自定义菜单 class
        zIndex: 3, // 菜单样式 z-index
        minWidth: 230 // 主菜单最小宽度
      });
      return false;
    },
    // 修改客户意向
    changePurpose: function (row) {
      console.log(row);
    },
    //查看客户详情
    checkCustomerDetail: function (row) {
      this.$router.push({
        name: 'customerDetail',
        params: {
          customObj: row
        }
      })
    },
    // 转为会员
    transferMember: function () {
      console.log('转为会员');
    }
  }
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-table >>> .table_header th {
  background: rgb(247, 247, 247);
}
</style>
