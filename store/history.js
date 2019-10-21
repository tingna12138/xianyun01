export const state=()=>{
    return {
        searchForm:[]
    }
}

export const mutations={
    setForm(state,data){
        console.log(123,data,state.searchForm)
        state.searchForm.push(data);
    }
}