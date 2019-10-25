<template>
  <div id="app">
    <VueEditor :config="config" ref="vueEditor"/>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
    VueEditor = require('vue-word-editor').default
}

export default {
name: 'app',

data(){
  return {
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
  }
},

components: {
  VueEditor
},
// watch:{
//    $refs.vueEditor.editor(){
//      var quill = this.$refs.vueEditor.editor;
//     console.log(quill.root.innerHTML);
//    }
// },
methods:{
  get(){
    var quill = this.$refs.vueEditor.editor;
    console.log(quill.root.innerHTML);
  }
}
}
</script>