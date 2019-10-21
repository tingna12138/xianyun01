<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <h4>
      酒店
      <span class="el-breadcrumb__separator el-icon-arrow-right"></span>南京市预定酒店
    </h4>

    <!-- 价格查询部分开始 ----选择器-多选  ---练级选择器中的多选-->
    <div class="search-price">
      <el-row>
        <!-- 选择城市 -->
        <el-col :span="5">
          <el-autocomplete
            class="inline-input"
            v-model="cityname"
            :fetch-suggestions="querySearch"
            placeholder="请输入城市名"
            :trigger-on-focus="false"
            @select="handleSelect"
            @blur="loseFocus"
          ></el-autocomplete>
        </el-col>

        <!-- 入住时间段 -->
        <el-col :span="9">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="livetime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="confirLiveTime"
          ></el-date-picker>
        </el-col>

        <!-- 入住人数 -->
        <el-col :span="5" class="travel-num">
          <el-popover placement="top" width="300" v-model="visible" class="el-popo">
            <div class="clearfix chose-num">
              每间
              <div class="fr" style="position:relative">
                  <span class="adult">成人</span>
                  <span class="child">儿童</span>
                <el-select v-model="valueaudult" 
                    placeholder="" 
                    class="num-select"
                    @change="changeAdultNum">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>

                <el-select v-model="valuechild" placeholder="" class="num-select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div style="text-align: right;" class="confir">
              <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
            </div>
            <el-button slot="reference" class="button">
              未选定人数
              <i class="iconfont iconuser fr"></i>
            </el-button>
          </el-popover>
        </el-col>

        <!-- 查看价格按钮 -->
        <el-col :span="3">
          <el-button type="primary" @click="onSubmit">查看价格</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 价格查询部分结束 -->

    <!-- 城市景点介绍部分开始-->
    <div class="scen-descr">
      <el-row>
        <el-col :span="14">
          <el-row class="left-row">
            <el-col :span="3">区域：</el-col>
            <el-col
              :span="21"
            >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
          </el-row>
        </el-col>
        <el-col :span="10" class="rigth-row-col">345</el-col>
      </el-row>
    </div>
    <!-- 城市景点介绍部分结束 -->

    <!-- 过滤器部分开始 -->
    <div class="filter clearfix">
        <div class="price fl">
        <div class="block content">
          <p class="desc">
            <span class="price-desc">价格</span>
            <span class="scale">0-4000</span>
          </p>
          <el-slider v-model="price"></el-slider>
        </div>
      </div>
      <!-- 酒店等级 -->
      <div class="filter-item fl">
        <div class="content">
          <p class="desc">
            <span class="price-desc">住宿等级</span>
          </p>
          <el-dropdown>
            <span class="el-dropdown-link">
              下拉菜单
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-circle-check" command="1">黄金糕</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check" command="2">狮子头</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check" command="3">螺蛳粉</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check" command="4">双皮奶</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check" command="5">蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 过滤器部分结束 -->

    <!-- 酒店列表开始 -->
    <HotelList class="hotel-list"  
        v-for="(item,index) in hotellist" 
        :key="index" 
        :hotel="item"></HotelList>
  </div>
</template>

<script>
import HotelList from "@/components/hotel/hotelLIst.vue";

export default {
  components: {
    HotelList
  },
  data() {
    return {
        /**
         * hotellist:存放所有酒店数据
         * cityInfo:城市列表
         * form:筛选城市数据的参数集合
         * options:入住人数选项的集合
         */

      hotellist:[],
      cityInfo:[],
      cityname:'',
      form:{
          city:'',
          enterTime:'',
          person:1,
      },
        options: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "4"
        },
        {
          value: "5",
          label: "5"
        },
        {
          value: "6",
          label: "6"
        },
        {
          value: "7",
          label: "7"
        }
      ],
      //住宿时间段
      livetime:'',
      //双向绑定旅客人数的输入框标签
      valueaudult:1,
      valuechild:'',

      //过滤器部分
      price:50,


      restaurants: [],
      state1: "",
      state2: "",
      visible: false,
    };
  },
   mounted() {
    this.$axios({
      url: "/hotels",
      method: "get",
     
    }).then(res => {
        if(res.status==200) {
             this.hotellist=res.data.data
             console.log(this.hotellist);
        }
    });
    //
    // this.restaurants = this.loadAll();
  },
  methods: {
      //点击 查看价格  触发
    onSubmit() {
        console.log(this.form)
    },
    //选择城市输入框获得焦点时触发
    //value是输入框中的值
    querySearch(value, cb) {
     if(!value){
                cb([])
            }
           else {
               this.$axios({
               url:'/airs/city',
               emthod:'get',
               params:{
                   name:value
               }
           }).then(res=>{
               console.log(123,res);
              res.data.data.forEach(ele => {
                  //将城市末尾的`市`替换掉
                  ele.name=ele.name.replace(/市$/g,'');
                  ele.value=ele.name
              });
              this.cityInfo=res.data.data;
              cb(res.data.data);
           })
           }
    },

    //选择城市时触发
    handleSelect(item) {
       this.form.city=item.id;
    },

    // 目标城市输入框获得失去焦点时触发
        loseFocus(){
             if(this.cityInfo.length>0) {
                this.form.city=this.cityInfo[0].id;
                this.cityname=this.cityInfo[0].name
             }

        },
    //去顶选定的时间后触发
    //返回的是一个数组：入住时间和离开时间
    confirLiveTime(item){
         console.log(456,item)
         this.form.enterTime=item[0]
    },
   //改变选择器的数据时，触发
   changeAdultNum(item){
         console.log(item);
         this.form.person=item;
   },

   //过滤器滑动条
   formatTooltip(val) {
     console.log(123,val)
        return val / 100;
      },



    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
  }
}
</script>

<style lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  //   border: 1px solid red;
  h4 {
    padding: 20px 0;
    font-size: 14px;
    color: #606266;
    font-weight: normal;
  }
  .search-price {
    position: relative;
    z-index: 10;
  }
}
//价格查询部分
.search-price {
  .el-col {
    padding-right: 20px;
  }
  .travel-num {
    .button {
      width: 100%;
      text-align: left;
      * {
        color: #c0c4cc;
      }
      .iconuser {
        line-height: 10px;
      }
    }
  }
}
//入住人数输入框---从他的祖父元素el-elect开始
.num-select {
  /deep/.el-input__inner {
    width: 90px;
    height: 28px;
    font-size: 12px;
    color: #333;
  }
  /deep/.el-icon-arrow-up {
    line-height: 30px;
  }
}
.confir {
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding: 20px 0 10px;
  * {
    color: #fff;
  }
}
.el-button {
  * {
    color: #fff;
  }
}
//给 ’成人‘定位
.adult,.child {
    position: absolute;
    font-size: 12px;
    color:#333;
    z-index:999;
    top:5px;
    
}
.adult {
    left:40px;
} 
.child {
    right:28px;
}

// 城市介绍部分开始
.scen-descr {
  margin-top: 30px;
  border: 1px solid red;
  .left-row {
    margin-bottom: 30px;
    padding-right: 20px;
    font-size: 14px;
    color: #666666;
  }
  .rigth-row-col {
    height: 260px;
    background: pink;
  }
}

//过滤器部分
.filter {
  border: 1px solid #ddd;
  margin-top: 30px;
  .fl {
    padding: 5px 0;
    width: 19%;
  }
  .price {
    width: 24%;
  }
  :last-child {
    .content {
      border: none;
    }
  }
  .content {
    padding: 0 20px;
    border-right: 1px solid #ddd;
    color: #666;
    .desc {
      margin-bottom: 10px;
    }
    .scale {
      float: right;
    }
  }
  .filter-item {
    .el-dropdown {
      width: 100%;
      margin: 11px 0;
      font-size: 12px;
      cursor: pointer;
    }
    i {
      font-size: 16px;
      float: right;
    }
  }
}

// 酒店列表
.hotel-list {
  margin-top: 30px;
}
</style>