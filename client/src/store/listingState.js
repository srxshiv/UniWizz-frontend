import { atom } from "recoil";

export const listingState = atom({
    key: ' listingState' ,
    default : {
        isLoading : true ,
        listings : {} ,
        totalListings: 0 , 
        pages : 0
    }
})