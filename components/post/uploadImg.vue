<template>
  <div>
  <el-upload
     :action="$axios.defaults.baseURL+'/upload'"
     name="files"
    list-type="picture-card"
    :on-success	="upSuccess">
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </div>
</template>

<script>
export default {
   data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        pics:[],
      };
    },
    methods: {
      handleRemove(file) {
        console.log(file);

      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
         console.log(3)
      },
      //文件添加成功
      //response是我们想要的数据
      upSuccess(response, file, fileList) {
        this.pics.push(response[0])
        this.$emit('click',this.pics)
        console.log('图片上传成功',response[0])
      }
    }
}
</script>

<style scoped lang="less">
  /deep/.el-upload {
    position: relative;
    width:100px;
    height:100px;
    /deep/.el-icon-plus {
      position: absolute;
      top:46px;
      left: 36px;
      font-size: 24px;
      line-height: 5px !important;
    }
  }
</style>