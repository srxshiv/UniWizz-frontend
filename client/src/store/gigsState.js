import { atom } from "recoil";

export const gigsState = atom({
    key: ' gigsState' ,
    default : {
        isLoading : true ,
        gigs : {} , 
        pages : 0
    }
})