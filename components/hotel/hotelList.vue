<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="img">
          <img :src="hotel.photos" alt="">
        </div>
      </el-col>
      <el-col :span="10" class="document">
        <div>
          <p class="hotel-name">{{hotel.name}}</p>
          <p class="hotel-desc">
           {{hotel.alias}}
            <i class="iconfont iconhuangguan" v-for="item in  hotel.hotellevel ?hotel.hotellevel.level : []" :key="item" ></i>
            {{hotel.hoteltype.name || ''}}
          </p>
            <el-row class="comment">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <i class="el-rate__icon el-icon-star-on" 
                    v-for="item in 5" :key="item"></i>
                  {{hotel.stars}}分
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <span>
                    <i class="yellow">{{hotel.all_remarks}}</i>条评价
                  </span>
                    
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <span>
                    <i class="yellow">{{hotel.num_collected}}</i>篇游记
                  </span>
                </div>
              </el-col>
            </el-row>
          <p class="hotel-position">
            <i class="iconfont iconlocation"></i>
            位于: {{hotel.address}}
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="link-to-brand">
          <el-row>
            <el-col :span="12">携程</el-col>
            <el-col :span="12">
              ￥
              <i class="yellow">175</i>起
              <i class="el-icon-arrow-right"></i>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props:{
    hotel:{
      type:Object,
      default:()=>{}
    }
  },
  mounted(){
    console.log(123,this.hotel)
    //是小数的情况
    if(this.hotel.stars%1){
        
    }
  }
  
};
</script>

<style lang="less">
* {
  color: #666;
}
.yellow {
  color: #f90;
}
.img {
  width: 320px;
  height: 210px;
  background: pink;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    object-fit: contain;
  }
}
.document {
  padding-left: 20px;
  .hotel-name {
    font-size: 24px;
    color: #000;
  }
  .hotel-desc {
    color: #999;
    i {
      color: #f90;
    }
  }
  .comment {
    margin: 14px 0;
  }
  .hotel-position {
    font-size: 14px;
    color: #666;
  }
}
.link-to-brand {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>