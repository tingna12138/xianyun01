<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                placeholder="用户名手机"
                v-model="form.username">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input 
                placeholder="验证码" 
                v-model="form.captcha">
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                placeholder="你的名字"
                v-model="form.nickname">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                placeholder="密码" 
                type="password"
                v-model="form.password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPas">
                <el-input 
                placeholder="确认密码" 
                type="password"
                v-model="form.checkPas">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit('form')">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
        var validatecaptcha = (rule, value, callback) => {
                
                  if(!value) {
                      callback(new Error('请输入验证码'));
                  }
                  else if(value !=this.checkCap || !this.checkCap){
                      callback(new Error('验证码输入错误'));
                  }
                  else {
                     callback(); 
                  }

                  
        }
        var validatePass = (rule, value, callback) => {
            if(!this.form.password){
                callback(new Error('请输入密码'));
            }
            else if(this.form.password !=this.form.checkPas) {
                 callback(new Error('两次输入的密码不一致'));
            }
            else {
                 callback();
            }
        }
        return {
            // 表单数据
            form: {
                username:'',
                captcha:'',
                nickname:'',
                password:'',
                checkPas:'',
                
            },
            checkCap:'',
            // 表单规则
            rules: {
                username:[
                  { required: true, message: '请输入用户名', trigger: 'blur' }
              ],
              password:[
                  { required: true, message: '请输入密码', trigger: 'blur' }
              ],
               nickname:[
                  { required: true, message: '请输入昵称', trigger: 'blur' }
              ],
              captcha:[
                  {validator:validatecaptcha, trigger: 'blur' }
              ],
               checkPas:[
                   { validator: validatePass, trigger: 'blur' }
              ],
            },
        }
    },
    methods: {
        // 发送验证码
        handleSendCaptcha(){
              if(this.form.username){
                  this.$axios({
                      url:'/captchas',
                      method:'post',
                      data:{tel:this.form.username}
                  }).then(res=>{
                       if(res.status==200){
                           this.checkCap=res.data.code;
                           this.$alert(res.data.code, '验证码是', {
                            confirmButtonText: '确定',
                             });
                       }
                  })
              }
              else {
                  this.$alert('请输入电话号码', '提示', {
                            confirmButtonText: '确定',
                            type:'warning'
                             });
              }
        },


        // 注册
        handleRegSubmit(formName){
           this.$refs[formName].validate(async (valid) => {
               if(valid) {
                  const {checkPas ,...props}=this.form;
                 let registerRes= await this.$store.dispatch('user/register',props);
                 this.$store.commit('user/setLoginState',registerRes.data);
                 this.$router.push('/');
               }
               else {
                   this.$alert('请先把数据格式更改过来哦', '警告', {
                            confirmButtonText: '确定',
                            type:'warning'
                             });
               }
           })
        }
    }
}
</script>

<style scoped lang="less">
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
</style>