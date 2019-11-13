<template>
  <div>
      nprrogress测试
  </div>
</template>

<script>
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

console.log('123')
 NProgress.start()

export default {
   mounted(){
       setTimeout(()=>{
           NProgress.done();
       },4000)
   }
}
</script>

<style>

</style>