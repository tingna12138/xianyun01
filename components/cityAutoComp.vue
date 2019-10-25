<template>
  <div>
      <el-autocomplete
            class="inline-input"
            v-model="cityname"
            :fetch-suggestions="querySearch"
            placeholder="请输入城市名"
            :trigger-on-focus="false"
            @select="handleSelect"
            @blur="loseFocus"
          ></el-autocomplete>
  </div>
</template>

<script>
export default {
  props:['cityname'],
  data(){
      return {
          city:'',
          cityInfo:[],
      }
  },
  watch:{
      city(newdata) {
          this.$emit('getCity',newdata);
      }
  },
  methods:{
      querySearch(value, cb) {
      if (!value) {
        cb([]);
      } else {
        this.$axios({
          url: "/airs/city",
          emthod: "get",
          params: {
            name: value
          }
        }).then(res => {
          res.data.data.forEach(ele => {
            //将城市末尾的`市`替换掉
            ele.name = ele.name.replace(/市$/g, "");
            ele.value = ele.name;
          });
          this.cityInfo = res.data.data;
          cb(res.data.data);
        });
      }
    },

    //选择城市时触发
    handleSelect(item) {
       console.log(123);
      this.city = item.id;
    }, 
     // 目标城市输入框获得失去焦点时触发
    loseFocus() {
      if (this.cityInfo.length > 0) {
        this.city = this.cityInfo[0].id;
        this.cityname = this.cityInfo[0].name;
      }
    },
  }
}
</script>

<style>

</style>