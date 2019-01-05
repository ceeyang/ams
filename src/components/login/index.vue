<template lang="html">
    <div class="">
        <span>欢迎来到联恒考勤管理系统</span>
    </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';
export default {
    computed: {
        ...mapState([
            'loginStore',
        ])
    },
}
</script>

<style lang="css" scoped>
</style>
