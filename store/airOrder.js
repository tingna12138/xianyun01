export const state=()=>{
    return {
        orderDetail:{},
        orderInfo:{
            insurances:0,
            num:1
        },
    }
}

export const mutations={
    getOrderDetail(state,order){
        state.orderDetail=order;
    },
    setOrderInfo(state,price) {
        state.orderInfo=price;
    }
}