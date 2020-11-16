<template>
    <div>
      <div>this is an about page</div>
      <div>this is an about page</div>
       <Button type="primary" @click="info">Display info prompt</Button>
    </div>
</template>

<script>
export default {
    props: {

    },
    components: {

    },
    data() {
        return {

        };
    },
    created() {
      this.$Message.success('zheshishenme')
    },
    mounted() {

    },
    methods: {
      info() {
        this.$Message.error('这是一个错误弹窗')
      }
    }
};
</script>

<style scoped lang="less">

</style>
