<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info" 
                     :model="item"
                     v-for="(item, index) in passengers" :key="index">

                <div class="member-info-item" >
                    <el-form-item label="乘机人类型" >
                        <el-input placeholder="姓名" class="input-with-select"
                        v-model="item.username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择"
                            >
                                <el-option label="成人" value="1"
                                   ></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select"
                        v-model="item.id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser()">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item" v-for="(item,index) in $store.state.airOrder.orderDetail.insurances" :key="index">
                    <el-checkbox 
                    @change="changed(item,index)"
                    :label="item.type+'：￥'+item.price+'/份×1  最高赔付'+item.compensation" 
                    border>
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="checkPhone"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            passengers:[
                {
                    username:'',
                    id:''
                }
            ],
            insurances:[],
            contactName:'',
            contactPhone:'',
            checkPhone:''
        }
    },
    mounted(){

    },
    //计算机票总价的方法
    methods: {
        //代码提取
        changeOrder(){
             this.$store.commit('airOrder/setOrderInfo',{insurances:this.insurances.length,num:this.passengers.length});
        },
        //当保险栏的数据发生变化
        changed(item,index){
            //返回true就在原来长度的基础上 +1；
            //返回false就在原来长度的基础上 -1；
            //第一个参数是用于循环的数组
            //第二个参数是你传进来的参数

             if(this.insurances.indexOf(index+1)>-1) {
                  this.insurances.splice(this.insurances.indexOf(index+1),1);
             }
             else {
                  this.insurances.push(index+1)
             }
             this.changeOrder()

        },
        // 添加乘机人
        handleAddUsers(){
            //添加乘客，就在passenger数组中添加一个乘客对象
            this.passengers.push( {
                    name:'',
                    passport:''
                });
            this.changeOrder();     
        },
        
        // 移除乘机人
        handleDeleteUser(){

        },
        
        // 发送手机验证码
        handleSendCaptcha(){
             this.$axios({
                      url:'/captchas',
                      method:'post',
                      data:{tel:this.contactPhone}
                  }).then(res=>{
                       if(res.status==200){
                           this.checkCap=res.data.code;
                           this.$alert(res.data.code, '验证码是', {
                            confirmButtonText: '确定',
                             });
                       }
                  })
        },

        // 提交订单
        handleSubmit(){
                    this.$router.push('/air/pay?id=1');

            let option={
                    users:this.passengers,
                    insurances:this.insurances,
                    contactName:this.contactName,
                    contactPhone:this.contactPhone,
                    invoice:false,
                    captcha:this.checkPhone,
                    seat_xid:this.$route.query.seat_xid,
                    air:this.$route.query.id

                }
                console.log('订单参数',option);
            this.$axios({
                url:'/airorders',
                method:'post',
                headers:{
                     Authorization: `Bearer ${this.$store.state.user.userInfo.token || 'NO TOKEN'}`
                },
                data:option
            }).then(res=>{
                console.log(res);
                if(res.status==200) {
                    // this.$router.push('/air/pay?id='+res.data.data.id);
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>