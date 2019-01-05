<template lang="html">
    <div class="login-page">
        <!-- <img class="login-page-logo" src="../../assets/logo.png"> -->
        <span class="login-page-welcome">{{welcome}}</span>
        <div class="login-page-input-view">
            <el-input placeholder="请输入您的账号" v-model="account" clearable></el-input>
            <el-input placeholder="请输入您的密码" v-model="password" clearable></el-input>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';
export default {
    data() {
        return {
            welcome: '欢迎来到联恒考勤管理系统',
            account: '',
            password: '',
        }
    },
    computed: {
        ...mapState([
            'loginStore',
        ])
    },
}
</script>

<style lang="css" scoped>
</style>
