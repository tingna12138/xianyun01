export const state=()=>{
    return {
        userInfo:{}
    }
}

export const mutations={
    setLoginState(state,data){
         state.userInfo=data;
    }
}

export const actions={
    //提取公共方法

    //登录
    //直接和外部接触的是login方法
   async login(state,data) {
      return await this.$axios({
            url:'/accounts/login',
            method:'post',
            data,
        }).then(res=>{
            if(res.status==200) {
               return res
            }
        })
    },
    //注册
    async register(state,data) {
        return await this.$axios({
            url:'/accounts/register',
            method:'post',
            data,
        }).then(res=>{
            if(res.status==200) {
                return res;
        }
        })
    }

}