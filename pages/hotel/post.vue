<template>
  <div class="container">
      <div class="position">
        <p> <span>{{hotel.big_cate}}</span>
             <span class="el-breadcrumb__separator el-icon-arrow-right"></span>
             <span>{{hotel.real_city}}酒店</span>
             <span class="el-breadcrumb__separator el-icon-arrow-right"></span>
             <span>{{hotel.name}}</span>
        
        </p>
            
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      hotel:{}
    }
  },
    mounted(){
        this.$axios({
            url:'/hotels',
            method:'get',
            params:{
              id:this.$route.query.id
            }}
        ).then(res=>{
           
            this.hotel=res.data.data[0]
             console.log(this.hotel)
        })
    }
}
</script>

<style scoped lang="less">
   .container {
     width: 1000px;
     margin:30px auto;
   }
</style>