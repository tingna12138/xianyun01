<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm></OrderForm>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                    <OrderAside></OrderAside>      
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm';
import OrderAside from '@/components/air/orderAside';

export default {
    components:{
        OrderForm,
        OrderAside
    },
    data(){
        return {
        }
    },
    computed:{

    },
     mounted(){
         console.log(this.$route.query)
        this.$axios({
            url:'/airs/'+this.$route.query.id,
            method:'get',
            param:{
                seat_xid:this.$route.query.seat_xid
            }
        }).then(res=>{
            console.log(123,res)
            if(res.status==200) {
                this.$store.commit('airOrder/getOrderDetail',res.data);
            }
        })
    },

    
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>