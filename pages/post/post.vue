<template>
  <div class="pack clearfix">
    <div class="left fl">
      <!-- 面包屑导航 -->
      <div class="position">
        <p>
          <span class="bold">旅游攻略</span> &nbsp;
          <span class="col bold">/</span>&nbsp;
          <span class="col">攻略详情</span>
        </p>
      </div>
      <!-- 标题 -->
      <div class="title">{{data.title}}</div>
      <!-- 内容部分 -->
      <div class="content clearfix">
        <p class="fr">
          时间：{{new Date(data.created_at)}} &nbsp;&nbsp;&nbsp;&nbsp;
          阅读：{{data.watch}}
        </p>
        <div class="content-des" ref="des"></div>
      </div>
      <!-- 点赞评论部分 -->
      <el-row :gutter="20">
        <el-col :span="12" :offset="6"><div class="grid-content bg-purple user-opera">
             <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">
                 <p> <span class="iconfont iconpinglun"></span> </p>
                  评论({{data.comments ? data.comments.length :0 }})</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">
                  <span class="iconfont iconstar1"></span><br>
                  收藏</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <span class="iconfont iconfenxiang"></span><br>
                  分享</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light">
                  <span class="iconfont iconding"></span><br>
                  点赞({{data.like ? data.like.length :0 }})</div></el-col>
            </el-row>
        </div></el-col>
     </el-row>

     <!-- 评论部分 -->
     <div class="comment">
        <p class="title">评论</p>
      <!-- 文本框 -->
      <el-input type="textarea" v-model="content" height="100px"  placeholder="请输入评论..."></el-input>

      <!-- 提交评论和添加图片部分 -->
      <div class="send-com clearfix">
          <!-- 上传文件 -->
          <UploadImg class="fl"></UploadImg>
           <el-button type="primary" class="fr" @click="sendComment">提交</el-button>
      </div>
      <!-- <Comment></Comment> -->
     </div>
    </div>
    <!-- 右边部分 -->
    <div class="right fr"></div>
  </div>
</template>

<script>
import Comment from '@/components/post/comment';
import UploadImg from '@/components/post/uploadImg';

export default {
  components:{
    Comment,
    UploadImg,
  },
  data() {
    return {
      data: {},
      content:'',
    };
  },
  mounted() {
    console.log(this.$route.query.id);
    this.$axios({
      url: "/posts",
      method: "get",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      console.log(res);
      this.data = res.data.data[0];
      console.dir(this.$refs.des);
      this.$refs.des.innerHTML = this.data.content;
    });
  },
  methods:{
    //提交文章评论
    sendComment(){
      console.log(123)
    }
  }
};
</script>

<style scoped lang="less">
.yellow {
    color:#ffa500;
}
.pack {
  width: 1000px;
  margin: 0 auto;
  .left {
      width:700px;
    .position {
      padding: 20px 0;
      .bold {
        font-weight: bold;
      }
      .col {
        color: #666;
      }
    }
    //   标题
    .title {
      padding-bottom: 20px;
      font-size: 24px;
      font-weight: bold;
      border-bottom: 1px solid #ddd;
    }
    //内容部分
    .content {
      width: 700px;
      padding: 20px 0;
      color: #666;
      /deep/img {
        max-width: 100%;
        object-fit: contain;
      }
    }
    //用户点赞、评论部分
    .user-opera {
        margin:30px 0;
        text-align: center;
        line-height: 30px;
        color:#aaa;
        .iconfont {
            color:#ffa500;
            font-size: 24px;
        }
    }
    //评论部分
    .comment {
      .title {
       margin: 20px 0;
       font-size: 18px;
   }
   /deep/textarea{resize:none;}
    }
    //提交按钮
    .send-com {
      margin-top: 20px;
       /deep/.el-button {
      padding:6px 14px;
    }
    }
  }
  //左边结束
}
</style>