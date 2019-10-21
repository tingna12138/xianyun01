<template>
    <div class="aside">
        <div class="air-info">
            <el-row type="flex" justify="space-between" class="info-top">
                <div>{{$store.state.airOrder.orderDetail.dep_date ||''}}</div>
                <div>{{$store.state.airOrder.orderDetail.org_city_name || ''}} - {{$store.state.airOrder.orderDetail.dst_city_name}}</div>
            </el-row>    
            <el-row 
            type="flex" 
            justify="space-between" 
            align="middle" 
            class="info-step">
                <el-col :span="5" class="flight-airport">
                    <strong>{{$store.state.airOrder.orderDetail.dep_time || ''}}</strong>
                    <span>{{$store.state.airOrder.orderDetail.org_airport_name || ''}}{{$store.state.airOrder.orderDetail.org_airport_quay || ''}}</span>
                </el-col>
                <el-col :span="14" class="flight-time">
                    <span>---  ---</span>
                    <span>{{$store.state.airOrder.orderDetail.airline_name || ''}}{{$store.state.airOrder.orderDetail.flight_no || ''}}</span>
                </el-col>
                <el-col :span="5" class="flight-airport">
                    <strong>{{$store.state.airOrder.orderDetail.arr_time || ''}}</strong>
                    <span>浦东机场T2</span>
                </el-col>
            </el-row> 
        </div>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>订单总价</span>
            <span>金额</span>
            <span>数量</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>成人机票</span>
            <span>￥{{$store.state.airOrder.orderDetail.base_price || ''}}</span>
            <span>x{{orderInfo.num}}</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>机建＋燃油</span>
            <span>¥{{$store.state.airOrder.orderDetail.airport_tax_audlet || ''}}/人/单程</span>
            <span>x{{orderInfo.num}}</span>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle" class="info-bar">
            <span>应付总额：{{orderInfo.totalPrice ||($store.state.airOrder.orderDetail.base_price+50) || ''}}</span>
            <span class="price">￥ {{orderInfo.totalPrice ||($store.state.airOrder.orderDetail.base_price+50) || ''}}  </span>
        </el-row>           
    </div>
</template>

<script>
export default {
    data(){
        return {
            orderInfo:{
                totalPrice:null,
                num:1,
                insurances:0,
            }
        }
    },
   mounted(){
        this.orderInfo.totalPrice=this.$store.state.airOrder.orderDetail.base_price
    },
    computed: {
        // rankTime(){
        //     // 数据还未请求回来
        //     if(!this.data.dep_time) return "";

        //     // 转化为分钟
        //     const dep = this.data.dep_time.split(":");
        //     const arr = this.data.arr_time.split(":");
        //     const depVal = dep[0] * 60 + +dep[1];
        //     const arrVal = arr[0] * 60 + +arr[1];

        //     // 到达时间相减得到分钟
        //     let dis = arrVal - depVal;

        //     // 如果是第二天凌晨时间段，需要加24小时
        //     if(dis < 0){
        //         dis = arrVal + 24 * 60 - depVal;
        //     }

        //     // 得到相差时间
        //     return `${ Math.floor(dis / 60)}时${dis % 60}分`
        // },
        change(){
            //通过这种方式可以监听vuex中对象的变化
           return this.$store.state.airOrder.orderInfo
        }
    },
    watch:{
        change(fir,sec) {
            this.orderInfo.insurances=fir.insurances;
            this.orderInfo.num=fir.num;
            this.orderInfo.totalPrice=this.$store.state.airOrder.orderDetail.base_price;
            this.orderInfo.totalPrice += fir.insurances*30 +50 ;
            this.orderInfo.totalPrice *= fir.num ;
           
        }
    }
}
</script>

<style scoped lang="less">
/*aside*/
.aside{
    width: 350px;
    height: fit-content;
    border:1px #ddd solid;
}

.air-info{
    padding:15px;

    .info-top{
        margin-bottom:10px;
        > div:last-child{
            font-size:14px;
        }
    }

    .info-step{
        .flight-airport{
            strong{
                display: block;
                font-size: 22px;
                font-weight: normal;
            }

            span{
                font-size: 12px;
                color:#999;
            }
        }

        .flight-time{
            text-align: center;
            font-size: 12px;
            color:#999;
            span{
                display: block;
            }
        }
    }
}

.info-bar{
    border-top:1px #ddd dashed;
    padding: 10px 15px;
    font-size: 14px;
    color: #666;

    .price{
        font-size:28px;
        color: orange;
    }
}
</style>