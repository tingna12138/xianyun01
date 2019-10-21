

import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
      //key是保存到本地存储后，存储数据的关键字。有默认值，可以不写
        key: 'yourkey',
        //定义了只将那些js文件里的数据保存到本地存储。默认是store文件夹里的所有文件
        //表示只将store文件夹下面的user.js中的数据保存到本地存储
        paths: ['user','history']
    })(store)
  })
}