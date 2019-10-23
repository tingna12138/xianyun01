<template>
  <div>
    <ul class="post-recommend-ul" @mouseleave="leaveUL">
         <!-- 隐藏层 -->
        <div class="city-list hidden" ref="list" >
            <ul>
                <li v-for="(item,index) in list.children" :key="index">
                    <span class="num">{{index}}</span>
                   <a :href="'#'+item.city"  class="city">
                      {{item.city}}
                   </a>
                   <a :href="'#'+item.city" class="desc">
                     {{item.desc}}
                   </a>
                </li>
            </ul>
        </div>
      <li class="post-recommend" 
      v-for="(item,index) in postcity" :key="index" 
       @mouseover="getfocus($event,index)"
       @mouseout="losefocus">
        <span>{{item.type}}</span>
        <span class="el-breadcrumb__separator el-icon-arrow-right"></span>
      </li>
    </ul>
  </div>
</template>

<script>
// import jq from  'jq';

export default {
  props:{
    postcity:{
      type:Array,
      default:[]
    }
  },
  data(){
    return {
      list:[],
      postitems:[],
      city:'',
    }
  },
  watch:{
    $route:{
      deep:true,
      handler(newdata,olddata){
       var hash=decodeURI(newdata.hash).slice(1);
      this.city=hash;
      }
    },
    city(newdata){
      console.log(newdata)
      this.$emit('changeCity',newdata)
    }
  },
  mounted() {
    console.log(this.$route)
    console.log(123);
  },
  methods:{
    getfocus($event,index) {
        this.$refs.list.classList.remove('hidden');
        // $event.fromElement.classList.add('no-right');
        this.list=this.postcity[index]
    },
    losefocus(eve){
      // eve.fromElement.classList.remove('no-right');
    },
    leaveUL(){
      this.$refs.list.classList.add('hidden');
    }
  }
};
</script>

<style scoped lang="less">
a:hover {
  text-decoration: underline;
}
.hidden {
  display: none;
}
.no-right {
  border-right: none !important;
}
ul.post-recommend-ul {
  position: relative;
  > :last-child {
    border-bottom: 1px solid #ddd !important;
  }
  li.post-recommend {
    position: relative;
    padding: 10px;
    border: 1px solid #ddd;
    border-bottom: none;
    background: #fff;
    z-index: 12;
    .el-breadcrumb__separator {
      float: right;
      line-height: 20px;
    }
  }
    .city-list {
    position: absolute;
    width: 350px;
    top: 0;
    right: -370px;
    padding:10px;
    border: 1px solid #ddd;
    background: #fff;
    z-index: 2;
    li {
      padding:10px 0;
    }
    .num {
        font-weight: bold;
        font-style: oblique;
        color:#ffa500;
        font-size: 18px;
    }
    .city {
        margin:0 10px;
        color:#ffa500;
        cursor: pointer;
    }
    .desc {
        color:#666;
        cursor: pointer;

    }
  }
 
  
}
</style>