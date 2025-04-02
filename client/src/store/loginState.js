import { atom } from "recoil";

export const loginState = atom({
    key: 'loginState' ,
    default : {
        isLoading : true ,
        fname : null ,
        username : null ,
        _id : null
    } 
})

