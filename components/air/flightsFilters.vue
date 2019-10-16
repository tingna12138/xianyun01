<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{ $store.state.airList.list.length>0 ? $store.state.airList.list[0].org_city_name : ''}} 
                - 
                {{ $store.state.airList.list.length>0 ? $store.state.airList.list[0].dst_city_name : ''}}
                2019-06-17
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="options.airport" placeholder="起飞机场" @change="handleAirport">
                     <el-option
                    label="所有"
                    value="所有"
                    >
                    </el-option>
                    <!-- value是传递到事件处理函数中的值 -->
                    <el-option
                    v-for="(item,index) in data.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="options.flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    label="所有"
                    value="所有"
                    >
                    </el-option>

                    <el-option
                    v-for="(item,index) in data.flightTimes"
                    :key="index"
                    :label="item.from +':00-'+ item.to+':00'"
                    :value="item.from +'='+item.to"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="options.company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    label="所有"
                    value="所有"
                    >
                    </el-option>

                    <el-option
                     v-for="(item,index) in data.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                 <el-select size="mini" v-model="options.airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    label="所有"
                    value="所有">
                    </el-option>
                     <el-option
                    label="大"
                    value="L">
                    </el-option>
                     <el-option
                    label="中"
                    value="M">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：<span v-if="options.airport && options.airport !='所有'">{{options.airport}} &nbsp;/</span>&nbsp;
                 <span v-if="options.flightTimes && options.flightTimes !='所有'">{{options.flightTimes.split('=')[0]+'-'+options.flightTimes.split('=')[1]}} &nbsp;/</span>&nbsp;
                 <span v-if="options.company && options.company !='所有'">{{options.company}} &nbsp;/</span>&nbsp;
                 <span v-if="options.airSize && options.airSize !='所有'">{{options.airSize}} &nbsp;/</span>&nbsp;
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    data(){
        return {
            options:{
                airport: "",        // 机场
                flightTimes: "",    // 出发时间
                company: "",        // 航空公司
                airSize: "",        // 机型大小
            },
        }
    },
    watch:{
        data(){
            this.data.flightTimes.forEach(ele => {
                //改变时间格式
            if(ele.from<10 && ele.from!=0) {
               ele.from='0'+ele.from
            }
            if(ele.to<10) {
               ele.from='0'+ele.from
            }
        });
        }
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            this.airport=value;
            this.$store.commit('airList/chFlightsList',this.options);
            //选择白云机场时，数据总量就变成筛选后的数据
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            this.flightTimes=value
           this.$store.commit('airList/chFlightsList',this.options);
        },

         // 选择航空公司时候触发
        handleCompany(value){
            this.company=value;
            this.$store.commit('airList/chFlightsList',this.options);
        },

         // 选择机型时候触发
        handleAirSize(value){
             this.airSize=value;
             this.$store.commit('airList/chFlightsList',this.options);
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){ 
            for(var key in this.options) {
                this.options[key]='';
            }
            this.$store.commit('airList/chFlightsList',this.options);

        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>