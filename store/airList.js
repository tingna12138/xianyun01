
export const state=()=>{
    return {
        list:[],
        flightsList:[]
    }
}

// const getters={
//     getWiFiList: state => {
//       return state.changedflightsList;
//     }
//   };

//   export default new Vuex.Store({
//     state,
//     getters,
//     mutations,
//     actions
//   });

  export const mutations={
    setFlightsList(state,data){
       state.list=data,
       state.flightsList=data
    },
    chFlightsList(state,options) {
        state.flightsList=state.list;

        function changeItems(name,item){
            if(item && item !='所有') {
                state.flightsList = state.flightsList.filter(ele => {
                    if(ele[name]==item){
                        return true;
                    } 
                });
            }
        }
        //判断机场
        changeItems('org_airport_name',options.airport);
        
        //判断出发时间
        if(options.flightTimes !=='所有' && options.flightTimes) {
            let data=options.flightTimes.split('=');
            let arr=[]
            console.log('时间数组',data);
           state.flightsList = state.flightsList.filter(ele => {
             arr = ele.dep_time.split(':')
             if(Number(arr[0])>=Number(data[0]) && Number(arr[0])<Number(data[1])){
                 return ele;
             } 
         });
        }
        //判断航空公司
        changeItems('airline_name',options.company);
        
        //判断机型
        changeItems('plane_size',options.airSize);

    },
    chFlightTimes(state,data) {
        //data是时间区间数组
        //数组第一个值是from
        //数组第二个值是to
       if(data[0]=='所有') {
           state.flightsList=state.flightsList;
       }
       else {
        let arr=[]
        console.log('时间数组',data);
        state.flightsList = state.list.filter(ele => {
            // console.log(arr[0])
            arr = ele.dep_time.split(':')
            if(Number(arr[0])>Number(data[0]) && Number(arr[0])<Number(data[1])){
                console.log(ele)
                return ele;
            } 
        });
       }
    }

}