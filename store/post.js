export const state=()=>{
    return {
       draft:[]
    }
}

export const mutations={
    setDraft(state,data){
        console.log(12345)
         state.draft.push(data);
    },
    delDraft(state,index) {
        state.draft.splice(index,1);
    }
}