import {Message} from "element-ui";

export default function({$axios, redirect}){
    $axios.onError(err => {
        const {statusCode, message} = err.response.data;
        console.log('错误拦截');

        if(statusCode === 400){
            Message.warning({message});
        }
    })
}

//本文件是nuxt自定义的插件
//onError属于window事件