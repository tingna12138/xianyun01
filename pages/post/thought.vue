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
       <CItyAutoComp @getCity="getCity" :cityname="cityname"></CItyAutoComp>
      </div>
      <div class="send">
        <el-button :plain="true" @click="sendCreated">提交</el-button>&nbsp;&nbsp;
        或者 &nbsp;&nbsp;
        <span class="yellow keep-draft" @click="keepDraft">保存到草稿箱</span>
      </div>
    </div>
    <div class="draft fr">
      <p class="title">草稿箱 (0)</p>
      <div class="cont clearfix"
        v-for="(item,index) in $store.state.post.draft" 
        :key="index">
        <p class="docu fl" 
           @click="editDraft(index)" >
           {{item.title}} 
          <span class="el-icon-edit"></span>
        </p> 
        <span class="del fr" @click="deleteDraft(index)">删除</span>
      </div>
      <div class="date" >2019-10-22</div>
    </div>
  </div>
</template>

<script>
import CItyAutoComp from "@/components/cityAutoComp";

import "quill/dist/quill.snow.css";
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

export default {
  data() {
    return {
      cityname:'',
      title: "",
      city: "",
      tip: "",
      draft:[],
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
    VueEditor,
    CItyAutoComp,
  },
  methods: {
    //重新编辑草稿
    editDraft(index){
      var quill = this.$refs.vueEditor.editor;
      this.city=this.$store.state.post.draft[index].city;
      this.title=this.$store.state.post.draft[index].title;
      this.cityname=this.$store.state.post.draft[index].cityname;
      quill.root.innerHTML=this.$store.state.post.draft[index].content;
      console.log('编辑器内容',quill.root.innerHTML)
    },
    //删除草稿
    deleteDraft(index) {
      console.log(123);
      this.$store.commit('post/delDraft',index);
    },
    //保存到草稿
    keepDraft(){
       var quill = this.$refs.vueEditor.editor;
       var data={
         content:quill.root.innerHTML,
         title: this.title,
         city: this.city,
         cityname:this.cityname
       };
       this.$store.commit('post/setDraft',data)
       this.city='';
       this.title='';
       this.cityname='';
       quill.root.innerHTML='';
    },
    // 发送邮寄的方法
    sendCreated() {
      var quill = this.$refs.vueEditor.editor;
      console.log('评论内容',quill.root.innerHTML);

      if (!this.title) {
        this.$message({
          message: "标题不能为空",
          type: "warning"
        });
        return;
      }
      if (!quill.root.innerHTML) {
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
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token ||
            "NO TOKEN"}`
        },
        data: {
          content: quill.root.innerHTML,
          title: this.title,
          city: this.city
        }
      }).then(res => {
         if(res.status==200) {
             this.$message({
             message: "评论发布成功",
             type: "success"
        });
        //清空数据
        this.city='';
        this.title='';
        this.cityname='';
        quill.root.innerHTML='';
         }
      });
    },
     getCity(city) {
      console.log('city',city)
       this.city=city;
    },
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
      padding:10px 0;
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
      .del {
        cursor: pointer;
        font-size: 12px;
        color:#aaa;
      }
      .del:hover {
          color:#ffa500;
        }
    }
  }
}
.keep-draft {
  cursor:pointer;
}
</style>