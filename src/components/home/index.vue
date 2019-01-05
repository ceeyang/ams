<template lang="html">
    <el-container class="home-page">
        <!-- 头部 -->
        <el-header class="home-page-header">
            <el-dropdown @command="dropdownCommand">
                <span class="el-dropdown-link">
                    {{currentSheet}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <template v-for="(sheet, index) in totalSheets",:key="index">
                        <el-dropdown-item :command="index">{{sheet}}</el-dropdown-item>
                    </template>
                </el-dropdown-menu>
            </el-dropdown>
            <span>联恒考勤管理系统</span>
            <el-upload
                ref="upload"
                action="/upload/"
                :on-change="readExcel"
                :show-file-list="false"
                :auto-upload="false">
                <el-button
                    slot="trigger"
                    icon="el-icon-upload"
                    size="small"
                    type="primary">
                    上传文件
                </el-button>
            </el-upload>
        </el-header>

        <!-- main container -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside class="home-page-left-aside">
                <el-menu
                    default-active="1"
                    @open="handleOpen"
                    @close="handleClose">
                    <template v-for="(user, index) in allUsers">
                        <el-menu-item :index="user">{{user}}</el-menu-item>
                    </template>
                </el-menu>
            </el-aside>

            <!-- tableview -->
            <el-main>
              <el-table :data="tableData">
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="date" label="日期" width="140"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import XLSX from 'xlsx';
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),

      // 月份
      // 默认打开数据
      defaultOpens: ['1'],
      currentSheet: '月份',
      totalSheets: ['1月份', '2月份', '3月份', '4月份'],

      // 用户
      allUsers: ['张三', '李四', '小五'],

    }
  },
  mounted() {

  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    // 月份下拉列表点击事件
    dropdownCommand(index) {
      this.currentSheet = this.totalSheets[index];
    },

    // 导出按钮点击事件
    exportBtnDidClick() {
      alert('exportBtnDidClick')
    },

    /// 读取 xlsx 文件
    readExcel(file) {
      const fileReader = new FileReader();
      var vm = this;
      fileReader.onload = (ev) => {
        try {
          debugger
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: 'binary'
          });
          console.log(workbook);
          vm.totalSheets = [];
          for (let sheet in workbook.Sheets) {
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); //获得以第一列为键名的sheet数组对象
            vm.totalSheets.push(sheet)
            console.log(sheet);
            console.log(sheetArray);
          }
        } catch (e) {
          this.$message.warning('文件类型不正确！');
          return false;
        }
      };
      fileReader.readAsBinaryString(file.raw);
    }
  }
}
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
