<template>
  <div class="pack">
    <!-- 面包屑导航 -->
    <div class="position">
      <p>
        <span class="bold">{{hotel.big_cate}}</span>
        <span class="el-breadcrumb__separator el-icon-arrow-right"></span>
        <span class="bold">{{hotel.real_city}}酒店</span>
        <span class="el-breadcrumb__separator el-icon-arrow-right"></span>
        <span class="col">{{hotel.name}}</span>
      </p>
    </div>

    <!-- 酒店标题部分 -->
    <div class="hotel-title">
      <p class="hotel-name">
        <span class="name">{{hotel.name}}</span>
        <i
          class="iconfont iconhuangguan"
          v-for="item in  hotel.hotellevel ?hotel.hotellevel.level : []"
          :key="item"
        ></i>
      </p>
      <p class="col pinyin">{{hotel.alias}}</p>
      <p class="hotel-desc col">
        <i class="iconfont iconlocation"></i>
        {{hotel.address}}
      </p>
    </div>
    <!-- 图片部分 -->
   <div class="img-row clearfix">
       <div class="left-img fl">
         <img src="../../static/1.jpeg" alt="">
       </div>
       <div class="right-img fl">
            <div class="item fir-item">
              <img src="../../static/1.jpeg" alt="">
              <img src="../../static/2.jpeg" alt="">
            </div>
            <div class="item">
              <img src="../../static/3.jpeg" alt="">
              <img src="../../static/4.jpeg" alt="">
            </div>
            <div class="item">
              <img src="../../static/3.jpeg" alt="">
              <img src="../../static/4.jpeg" alt="">
            </div>
       </div>
   </div>

    <!-- 房价来源 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="价格来源" width="420"></el-table-column>
      <el-table-column prop="name" label="低价房源" width="420"></el-table-column>
      <el-table-column prop="address" label="最低价/每晚" width="160"></el-table-column>
    </el-table>

    <!-- 周边环境 -->
    <div class="around clearfix">
      <div class="around-map fl">
        <div id="container"></div>
      </div>
      <div class="around-around fl"></div>
    </div>

    <!-- 酒店相关信息 -->
    <div class="hotel-set">
      <el-row class="base-info item-row">
        <el-col :span="4">
          <div class="grid-content bg-purple">基本信息</div>
        </el-col>
        <el-col :span="20" class="col">
          <el-row>
            <el-col :span="6">
              入住时间: 14:00之后
            </el-col>
            <el-col :span="6">离店时间: 12:00之前</el-col>
            <el-col :span="6">
              2010年开业 / 2015年装修
            </el-col>
            <el-col :span="6">酒店规模: 148间客房</el-col>
          </el-row>
        </el-col>
      </el-row>
       <el-row class="setting item-row">
        <el-col :span="4">
          <div class="grid-content bg-purple">主要设施</div>
        </el-col>
        <el-col :span="20" class="col" >
            <el-tag>这是一个标签</el-tag>
        </el-col>
      </el-row>
      <el-row class="parking item-row">
        <el-col :span="4">
          <div class="grid-content bg-purple">停车服务</div>
        </el-col>
        <el-col :span="20" class="col">
           -
        </el-col>
      </el-row>
      <el-row class="brand item-row">
        <el-col :span="4">
          <div class="grid-content bg-purple">品牌信息</div>
        </el-col>
        <el-col :span="20" class="col">
            -
        </el-col>
      </el-row>
    </div>

    <!-- 用户评论 -->
    <div class="user-comment">
        <h3>0条真实用户评论</h3>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      hotel: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  mounted() {
    //请求酒店数据
    this.$axios({
      url: "/hotels",
      method: "get",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.hotel = res.data.data[0];
      console.log(this.hotel);
    });
    //地图
    window.onLoad = () => {
      var map = new AMap.Map("container", {
        center: [118.778611, 32.04389],
        zoom: 11
      });
      // var markers = [];

      // this.hotellist.forEach((item, index) => {
      //   var content =
      //     "" +
      //     '<div class="custom-content-marker">' +
      //     '   <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png">' +
      //     `  <div class="close-btn" onclick="clearMarker()">${index +
      //       1}</div>` +
      //     "</div>";

      //   map.add(
      //     new AMap.Marker({
      //       position: new AMap.LngLat(
      //         item.location.longitude,
      //         item.location.latitude
      //       ),
      //       content: content,
      //       offset: new AMap.Pixel(-10, -10),
      //       title: "北京"
      //     })
      //   );
      // });
    };

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=468308d6c66b304b46765af3bd907d2d&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style scoped lang="less">
.bold {
  font-weight: bold;
}
.col {
  color: #666;
}
.pack {
  width: 1000px;
  margin: 30px auto;
  .hotel-name {
    margin-top: 30px;
    .name {
      color: #333;
      font-size: 24px;
    }
    .pinyin {
      margin: 6px 0;
    }
    .iconhuangguan {
      color: #ff9900;
    }
  }
  //图片部分
 .img-row {
   margin-bottom: 30px;
   .fl {
      }
     .left-img {
       width:640px;
       height: 360px;
       overflow: hidden;
       img {
         width: 100%;
         object-fit: contain;
       }
     }
     .right-img {
       margin-left: 20px;
       .item {
         margin-top:10px;
       }
       .fir-item {
           margin-top:0;
         }
        img {
           >:nth-child(2n) {
             margin-left: 10px;
           }
           width: 160px;
           height: 111px;
        }
     }
 }

  //  周边环境
  .around {
    margin: 30px 0;
    #container {
      width: 650px;
      height: 360px;
    }
  }
  //酒店信息
  .item-row {
    padding:20px 5px;
    border-bottom: 1px solid #ddd;
    /deep/.el-tag {
      background:#ddd;
      color:#666;
      border:none;
    }
  }
}
</style>