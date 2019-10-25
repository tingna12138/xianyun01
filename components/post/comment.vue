<template>
  <div class="comment-pack clearfix">
       <div class="comment-info clearfix smallf">
            <span class="deep">{{comment.account ? comment.account.nickname : ''}}</span>
           <span class="light">{{comment.account ? comment.account.created_at : ''}}</span>
           <span class="fr deep">{{comment.level}}</span>
       </div>
       <commentP 
         :comment="comment.parent"
          v-if="comment.parent"></commentP>
       <div class="comment-content">
            <p>{{comment.content}}</p>
              <div>
                <div class="img" 
                   v-for="(item1,index1) in comment.pics&&comment.pics.length>0 ? comment.pics : []"
                   :key="index1" >
                <img :src="$axios.defaults.baseURL+item1.url" alt="">
              </div>
              </div>
       </div>
       <span class="reply fr">回复</span>
  </div>
</template>

<script>

export default {
  name:'commentP',
  props:{
    comment:{
      type:Object,
      default:()=>{ return {}}
    }
  },
    data(){
        return {
            content:'',
        }
    },
  mounted(){
    
  }
}
</script>

<style scoped lang="less">
   .comment-pack {
       margin:10px 6px 20px;
       padding:10px;
       border:1px solid #ddd;
       background:#f9f9f9;
   }
   .comment-content {
         margin-top:20px;
         margin-left:16px;
         margin-right:16px;
         .img {
           margin-top: 10px;
           padding:6px;
           width: 80px;
           height: 80px;
           border:1px dashed #ddd;
           border-radius: 2px;
           img {
            
             width: 80px;
             object-fit: contain;
           }
         }
       }
</style>