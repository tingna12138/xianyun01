<template>
  <div class="pack clearfix">
    <div class="edit fl">
      <p class="title">发表新攻略</p>
      <div class="desc">分享你的个人游记，让更多人看到哦！</div>
      <el-input v-model="title" placeholder="请输入内容"></el-input>
      <div class="editor">
        <!-- 富文本框 -->
        <!-- <VueEditor @getEditor="sendCreated"/> -->
        <VueEditor :config="config" ref="vueEditor" />
      </div>
      <div class="city">
        选择城市
      </div>
      <div class="send">
        <el-button :plain="true" @click="sendCreated">提交</el-button>&nbsp;&nbsp;
        或者 &nbsp;&nbsp;
        <span class="yellow">保存到草稿箱</span>
      </div>
    </div>
    <div class="draft fr">
      <p class="title">草稿箱 (0)</p>
      <div class="cont clearfix">
        <p class="docu fl">我邮寄嘎乡就是这个，请看凯南吧，希望对你有用</p>
        <span class="el-icon-edit"></span>
      </div>
      <div class="date">2019-10-22</div>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

// import VueEditor from '@/components/post/editor'
export default {
  data() {
    return {
      title: "",
      city: "",
      tip: "",
      config: {
        // 上传图片的配置
        uploadImage: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "files",

          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess: (res, insert) => {
            console.log(res);

            insert(this.$axios.defaults.baseURL + res.data[0].url);
          }
        },
        // 上传视频的配置
        uploadVideo: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "files",

          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data.data.url);
          }
        }
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
    //弹出警告框
    open(mes) {
      this.$message({
        message: "警告哦，这是一条警告消息",
        type: "warning"
      });
    },
    // 发送邮寄的方法
    sendCreated() {
      var quill = this.$refs.vueEditor.editor;
      console.log(quill.root.innerHTML);
      if (!this.title) {
        this.$message({
          message: "标题不能为空",
          type: "warning"
        });
        return;
      }
      if ((quill.root.innerHTML = "")) {
        this.$message({
          message: "描述内容不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.city) {
        this.$message({
          message: "城市不能为空",
          type: "warning"
        });
        return;
      }
      this.$axios({
        url: "/posts",
        method: "post",
        data: {
          content: quill.root.innerHTML,
          title: this.title,
          city: this.city
        }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped lang="less">
.yellow {
  color: #ffa500;
}
.pack {
  padding: 20px;
  width: 1000px;
  margin: 0 auto;
  .edit {
    width: 750px;
    .title {
      font-size: 22px;
    }
    .desc {
      margin: 14px 0 10px;
      font-size: 12px;
      color: #999;
    }
    .editor {
      margin-top: 20px;
      /deep/.ql-editor {
        height: 400px;
      }
    }
    .city {
      margin: 20px 0;
      .el-input {
        margin-left: 20px;
        width: 260px;
      }
    }
  }
  .draft {
    color: #666;
    width: 200px;
    padding: 10px;
    border: 1px solid #ddd;
    .cont {
      color: #333;
      > :hover {
        color: #ffa500;
      }
      .docu {
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>