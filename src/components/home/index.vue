<template lang="html">
    <el-container style="height: device-height; border: 1px solid #eee">
        <!-- 头部 -->
        <el-header style="text-align: right; font-size: 12px">
            <i class="el-icon-menu"></i>
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
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds=defaultOpens>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>导航一</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
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
      // 所有用户
      users: [],
      // 默认打开数据
      defaultOpens: ['1'],
    }
  },
  mounted() {

  },
  methods: {
    // 导出按钮点击事件
    exportBtnDidClick() {
      alert('exportBtnDidClick')
    },

    /// 读取 xlsx 文件
    readExcel(file) {
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          debugger
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: 'binary'
          });
          console.log(workbook);
          for (let sheet in workbook.Sheets) {
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); //获得以第一列为键名的sheet数组对象
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
