<template>
  <div class="container clearfix">
     <div class="recommend fl">
         左边推荐部分
         <RecommendCity :postcity="postcity" @changeCity="changeCity"></RecommendCity>

             <p class="recommend-img">推荐城市</p>
             <img src="" alt="">
     </div>
     <div class="contain fr">
         <div class="search">
             <input type="text" v-model="input" placeholder="请输入想去的地方，比如：广州">
             <span class="el-icon-search" @click="search"></span>
         </div>
         <div class="center">
            <p class="recom">
              推荐： <span class="ele" >广州</span>  <span class="ele">北京</span>    <span class="ele">上海</span>
            </p>
            <div class="wirte-doc clearfix">
                <div class="write-recom fl">推荐攻略</div>
                <nuxt-link to="/post/thought">
                  <el-button type="primary fr" icon="el-icon-edit">写游记</el-button>
                </nuxt-link>
            </div>
         </div>
         
         <!-- 城市列表 -->
         <CityList :data="data"></CityList>
         <!-- 分页代码 -->
         <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSize"
            :page-size="4"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
     </div>
  </div>
</template>

<script>
 import RecommendCity from '@/components/post/recommendCity';
 import CityList from '@/components/post/cityList'
export default {
  components: {
      RecommendCity,
      CityList
  },
  data(){
    return {
      input:'',
      postcity:[],
      city:'',
      data:[],
      //分页
      currentPage:1,
      pageSize:[4,8,16,20],
      total:0,
    }
  },
  watch:{
   city(newdata) {
     if(newdata) {
       var params={city:newdata}
     }
      this.$axios({
      url: "/posts",
      method: "get",
      params,
    }).then(res => {
      console.log(res);
      this.data = res.data.data;
      this.total=res.data.total;
    });
   }
  },
  mounted(){
    this.$axios({
      url:'/posts/cities',
      method:'get'
    }).then(res=>{
      console.log(res);
      this.postcity=res.data.data;
    })
    //请求攻略列表
     this.$axios({
      url: "/posts",
      method: "get"
    }).then(res => {
      console.log(res);
      this.data = res.data.data;
      this.total=res.data.total;
    });
  },
  methods:{
    changeCity(item){
      this.city=item;
    },
    // 输入框搜索城市
    search(){
      this.city=this.input;
    },
    // f分页方法
    handleSizeChange(){},
    handleCurrentChange(){}
  }
}
</script>
   
<style scoped lang="less">

   .container {
    padding: 30px;
    width:1000px;
    margin:0 auto;
    .recommend {
      width: 260px;
      .recommend-img {
        padding:10px;
        margin: 20px 0 10px;
        border-bottom: 1px solid #ddd;
      }
      >img {
        display: block;
        width: 100%;
      }
    }
    // 右边部分
    .contain {
      
      // 搜索部分
      .search {
         width:700px;
         height: 40px;
         border:2px solid #ffa500;
         input {
           margin-top: 1px;
           width: 660px;
           height: 90%;
           border:none;
           vertical-align: top;
           text-indent: 2em;
           outline: none;
         }
         .el-icon-search { 
           line-height: 40px;
           font-size: 24px;
           color:#ffa500;
           font-weight: bold;
         }
      }
      .center {
        margin-top: 20px;
        .recom {
          color:#666;
          font-size: 12px;
        }

        .wirte-doc {
          border-bottom: 1px solid #ddd;
          .write-recom {
            padding: 14px 0;
            font-size: 20px;
            color:#ffa500;
            border-bottom: 2px solid #ffa500;
          }
        }
      }
    }
   }
</style>
