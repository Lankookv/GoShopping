<template>

</template>

<script>
  export default {
    name: "putOffGoodModal",
    methods:{

    }
  }
</script>

<style scoped lang="less">

</style>

putOffGood({
goodId:JSON.stringify(id),
contentType: "application/json"
})
.then((response)=> {
this.massage=response.data.data;
})
