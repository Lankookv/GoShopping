<template>
  <div>
    <h1>
      用户信息填写
    </h1>
    <h2>
      姓名：
      <input type="text" id="Account"></input>
    </h2>
    <h2>
      电话：
      <input type="text" id="Phone"></input>
    </h2>
    <h2>
      <div class="left">
        住址：
      </div>
      <div class="right">
        <textarea id="Address"></textarea>
      </div>
    </h2>
    <button @click="Msg()">
      提交
    </button>
  </div>
</template>

<style></style>

<script>
  import {buyerDetails, createIntention, login} from "../api";
  export default {
    name: "buyerDetails",
    data() {
      return {
        buyerId:{},
      }
    },
    methods: {
        Msg(){
          if (Account.value == "")
            this.$message.error('姓名不能为空');
          else {
            if (Phone.value == "")
              this.$message.error('电话不能为空');
            else {
              if (Phone.value.length != "11")
                this.$message.error('电话位数不对');
              else {
                var reg = /^\d+$/;
                if (!Phone.value.match(reg))
                  this.$message.error('电话不能为非数字');
                else {
                  if (Address.value == "")
                    this.$message.error('地址不能为空');
                  else {
                    buyerDetails({
                      name: Account.value,
                      phone: Phone.value,
                      location: Address.value,
                      contentType: "application/json"
                      }).then((response)=> {
                      this.$message.success('填写成功');
                      this.buyerId=response.data.data;
                      createIntention({
                        buyerId: this.buyerId,
                        goodId:this.$route.params.bid,
                        contentType: "application/json"
                      })
                        .then((response)=> {
                          // alert("生成意向")
                        })
                      })
                    }
                  }
                }
              }
            }
          }
        }
  }

</script>

<style scoped lang="less">
  h1{
    width: 100%;
    text-align: left;
    margin-left: 5%;
  }
  h2{
    margin-top: 4%;
  }
  input{
    padding:8px;
    width: 25%;
    border: 1px solid;
    border-radius: 10px;
  }
  textarea{
    resize: none;
    width: 45%;
    height: 120px;
    border-radius: 10px;
    padding:8px;
    border: 1px solid;
    text-align: left;
  }
  .left{
    width: 39.2%;
    height: 100px;
    float: left;
    text-align: right;
    margin-right: 0.8%;
  }
  .right{
    width:60%;
    height: 100px;
    float: left;
    text-align: left;
  }
  button{
    width: 15%;
    height: 40px;
    margin-top: 8%;
    font-size: 20px;
    background-color: #F56E1C;
    border: 1px solid;
    border-radius: 10px;
  }
  button:hover{
    width: 15%;
    height: 40px;
    margin-top: 8%;
    font-size: 20px;
    background-color: #F56E1C;
    border: 1px solid #cccccc;
    border-radius: 10px;
  }
</style>
