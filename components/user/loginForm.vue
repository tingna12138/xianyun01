<template>
   <el-form 
        status-icon
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form"
        >

       <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名/手机" ></el-input>
       </el-form-item>

        <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="密码" autocomplete=off></el-input>
       </el-form-item>

       <el-form-item>
          <el-button type="primary" class="submit" @click="onSubmit('form')">登录</el-button>
       </el-form-item>
    </el-form>
</template>

<script>
export default {
   data(){
       var validateName = (rule, value, callback) => {
        if (!value) {
         callback(new Error('请输入用户名'));
        }
        else {
           callback();
        }
       }
       return {
           form:{
               username:'',
               password:'',
           },
           rules:{
              username:[
                  {validator:validateName, trigger: 'blur' }
              ],
              password:[
                  { required: true, message: '请输入密码', trigger: 'blur' }
              ]
           },
       }
   },
   methods:{
       onSubmit(formName){
           this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let loginRes=await this.$store.dispatch('user/login',this.form);
            console.log('返回的结果',loginRes)
                //如果直接更改本地存储，存在一个问题：如何将本地存储中数据的变化通知header.vue组件
              //   localStorage.setItem('key',JSON.stringify(res.data));
               this.$store.commit('user/setLoginState',loginRes.data);
               this.$router.push('/');
          } else {

            return false;
          }
        });
       }
   }
}
</script>

<style lang="less">
 .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
    .yes {
        border-color:#67c23a;
    }
</style>