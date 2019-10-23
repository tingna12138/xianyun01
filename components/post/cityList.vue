<template>
  <div class="pack">
    <!-- 图片显示  --三张或者三张以上 -->
    <div class="item" v-for="(item,index) in data" :key="index" v-if="item.images.length>2">
     <nuxt-link :to="'/post/post/?id='+item.id" >
        <p class="title">{{item.title}}</p>
     </nuxt-link>
      <P class="desc">
        {{item.summary}}
      </P>

      <div class="post-img clearfix">
        <div class="fl img-pack" v-for="(item1,index) in item.images" :key="index" v-if="index<3">
          <img :src="item1" alt />
        </div>
      </div>
      <p class="info">
        <span class="el-icon-location-information"></span>
        北京市
        &nbsp;&nbsp;
        by
        <img
          :src="$axios.defaults.baseURL+item.account.defaultAvatar"
          alt
        />
        <span class="yellow">{{item.account.nickname}}</span> &nbsp;&nbsp;
        <span class="el-icon-view"></span>
        8763
        <span class="zan yellow fr">54赞</span>
      </p>
    </div>

    <!-- 图片显示  --一张或者两张 -->
    <div
      class="item-less clearfix"
      v-for="(item,index) in data"
      :key="index"
      v-if="item.images.length<3"
    >
      <div class="left fl">
        <img :src="item.images[0]" alt />
      </div>
      <div class="right fl">
        <p class="title">{{item.title}}</p>
        <P class="desc">
          {{item.summary}}
        </P>
        <p class="info">
          <span class="el-icon-location-information"></span>
          北京市
          &nbsp;&nbsp;
          by
          <img
            :src="$axios.defaults.baseURL+item.account.defaultAvatar"
            alt
          />
          <span class="yellow">{{item.account.nickname}}</span> &nbsp;&nbsp;
          <span class="el-icon-view"></span>
          8763
          <span class="zan yellow fr">54赞</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Array,
      default:[],
      
    }
  },
  data(){
    return {
     flag:false
    }
  },
  methods:{
    getflag(){
      this.flag=true;
      console.log(123);
    }
  }
};
</script>

<style scoped lang="less">
.nuxt-link:hover {
  
}
.yellow {
  color: #ffa500;
}
.pack {
  width: 700px;
}
//三张或者三张以上的图片
.item {
  margin-top: 20px;
  border-bottom: 1px solid #ddd;
  .post-img {
    overflow: hidden;
    .img-pack {
      margin-top: 10px;
      > :first-child {
        margin-left: 0;
      }
      margin-left: 10px;
      width: 220px;
      height: 150px;
      overflow: hidden;
      img {
        width: 220px;
        height: 150px;
      }
    }
  }
}
//标题单行溢出隐藏
.title {
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// 描述部分多行移除隐藏
.desc {
  font-size: 14px;
  color:#666;
  margin-top: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
//每条数据下面的额小字体
.info {
  padding: 20px 0;
  font-size: 12px;
  color: #666;
  line-height: 14px;
  img {
    position: relative;
    top: -1px;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    vertical-align: middle;
  }
}

.item-less {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  .left {
    img {
      width: 220px;
      height: 150px;
    }
  }
  .right {
    margin-left: 10px;
    .title {
      width: 470px;
    }
    .desc {
      width: 450px;
    }
  }
}
</style>