<template>
  <div class="pack clearfix">
    <!-- 评论提交成功提示 -->
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
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple user-opera">
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <p>
                    <span class="iconfont iconpinglun"></span>
                  </p>
                  评论({{data.comments ? data.comments.length :0 }})
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <span class="iconfont iconstar1"></span>
                  <br />收藏
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <span class="iconfont iconfenxiang"></span>
                  <br />分享
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <span class="iconfont iconding"></span>
                  <br />
                  点赞({{data.like ? data.like.length :0 }})
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <!-- 评论部分 -->
      <div class="comment">
        <p class="title">评论</p>
        <!-- 文本框 -->
        <el-input type="textarea" v-model="content" height="100px" placeholder="请输入评论..."></el-input>

        <!-- 提交评论和添加图片部分 -->
        <div class="send-com clearfix">
          <!-- 上传文件 -->
          <UploadImg class="fl" @click="getImg"></UploadImg>
          <el-button type="primary" class="fr" @click="sendComment">提交</el-button>
        </div>
        <!-- 评论列表 -->
        <div class="all-comment">
          <div class="comment-list clearfix" v-for="(item,index) in commentlist" :key="index">
            <div class="comment-info clearfix smallf">
              <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
              <span class="deep">{{item.account.nickname}}</span>
              <span class="light">{{item.account.created_at}}</span>
              <span class="fr deep">{{item.level}}</span>
            </div>
            <Comment :comment="item.parent" v-if="item.parent"></Comment>
            <div class="comment-content">
              <p>{{item.content}}</p>
              <div>
                <div class="img" v-for="(item1,index1) in item.pics" :key="index1">
                  <img :src="$axios.defaults.baseURL+item1.url" alt />
                </div>
              </div>
            </div>
            <span class="reply fr" @click="replyComment(item.id)">回复</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 右边部分 -->
    <div class="right fr">
      <p class="title">相关攻略</p>
      <ul>
        <li class="clearfix" v-for="(item,index) in recommend" :key="index">
          <div class="fl">
            <img :src="item.images[0]" alt />
          </div>
          <div class="method">
            <p class="overhidden">{{item.title}}</p>
            <p class="smallf light date">{{item.created_at}} 阅读 {{item.watch}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/post/comment";
import UploadImg from "@/components/post/uploadImg";

export default {
  components: {
    Comment,
    UploadImg
  },
  data() {
    return {
      /**
       data{} 攻略数据
       content:评论内容
       pics：评论图片
       commentlist:获取的评论列表
       total:总评论数
       form:回复评论时带的参数
       recommend:相关攻略
       */
      data: {},
      content: "",
      pics: [],
      follow: NaN,
      commentlist: [],
      total: 0,
      recommend: []
    };
  },
  mounted() {
    //相关攻略
    this.$axios({
      url: "/posts/recommend",
      method: "get"
    }).then(res => {
      console.log("相关攻略", res);
      this.recommend = res.data.data;
    });
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
    //获取评论列表
    this.$axios({
      url: "/posts/comments",
      method: "get"
      // params:{
      //   _limit:2
      // }
    }).then(res => {
      console.log("评论数据", res);
      this.commentlist = res.data.data;
      this.total = res.data.total;
    });
  },
  methods: {
    // 提交文章评论请求封装
    comment(data, cd) {
      this.$axios({
        url: "/comments",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.user.userInfo.token ||
            "NO TOKEN"}`
        },
        data
      }).then(res => {
        cd(res);
      });
    },
    //获取子组件里上传的图片
    getImg(item) {
      this.pics = item;
    },
    //提交文章评论
    sendComment() {
      var data = {
        content: this.content,
        pics: this.pics,
        post: this.$route.query.id
      };
      if (this.follow) {
        data.follow = this.follow;
      }
      this.comment(data, res => {
        if (res.status == 200) {
          this.$message({
            message: res.data.message,
            type: "success"
          });

          //获取评论列表
          this.$axios({
            url: "/posts/comments",
            method: "get"
            // params:{
            //   _limit:2
            // }
          }).then(res => {
            console.log("评论数据", res);
            this.commentlist = res.data.data;
            this.total = res.data.total;
          });
        }
      });
    },
    // 简单回复评论
    replyComment(item) {
      this.follow = item;
    }
  }
};
</script>

<style scoped lang="less">
/deep/.reply {
  margin-right: 20px;
  color: rgb(64, 111, 197);
  font-size: 12px;
  cursor: pointer;
}
.yellow {
  color: #ffa500;
}
/deep/.deep {
  color: #666;
}
/deep/.light {
  color: #aaa;
}
/deep/.smallf {
  font-size: 12px;
}
.pack {
  width: 1000px;
  margin: 0 auto;
  .left {
    width: 700px;
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
      margin: 30px 0;
      text-align: center;
      line-height: 30px;
      color: #aaa;
      .iconfont {
        color: #ffa500;
        font-size: 24px;
      }
    }
    //评论部分
    .comment {
      .title {
        margin: 20px 0;
        font-size: 18px;
      }
      /deep/textarea {
        resize: none;
      }
    }
    //提交按钮
    .send-com {
      margin-top: 20px;
      /deep/.el-button {
        padding: 6px 14px;
      }
    }
    //评论列表
    .all-comment {
      border: 1px solid #ddd;
    }
    .comment-list {
      margin: 30px 0;
      padding: 20px 0;
      border-bottom: 1px dashed #ddd;
      //评论头部信息
      .comment-info {
        padding: 0 20px;
        img {
          width: 20px;
          height: 20px;
          border-radius: 20px;
        }
      }
      //评论内容
      .comment-content {
        margin-left: 40px;
        margin-right: 16px;
        .img {
          margin-top: 10px;
          padding: 6px;
          width: 80px;
          height: 80px;
          border: 1px dashed #ddd;
          border-radius: 2px;
          img {
            width: 80px;
            object-fit: contain;
          }
        }
      }
    }
  }
  //左边结束
  .right {
    margin-left: 20px;
    width: 280px;
    .title {
      padding: 10px 0;
      font-size: 18px;
      border-bottom: 1px solid #ddd;
    }
    li {
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
    }
    li {
      width: 280px;
      img {
        width: 100px;
        height: 80px;
      }
      .method {
        position: relative;
        width: 170px;
        height: 80px;
        margin-left: 8px;
        float: left;
        // 标题部分多行移除隐藏
        .overhidden {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        }
        .date {
          position: absolute;
          bottom:0;
        }
      }
  
    }
  }
}
</style>