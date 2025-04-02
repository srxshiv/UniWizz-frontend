import axios from "axios";
import React from "react";
import { base_url } from "../App";
import { listingState } from "../store/listingState";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

function useListings(page,limit,category){
    const setListings = useSetRecoilState(listingState)
    const token = localStorage.getItem('unikart-auth')
    const navigate= useNavigate();
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    React.useEffect(()=>{

        setListings((prev)=>{return {...prev , isLoading : true}})
        
        if(!token) {
            navigate('/login')
        }
        async function getListings(){
            try{
                console.log(page , limit)
                const response = await axios.get(`${base_url}/user/listings?page=${page}&limit=${limit}&category=${category}` , config )
                if(response.status ===200) {
                    setListings({listings: response.data.listings , isLoading: false , totalListings:response.data.totalListings , pages : response.data.pages})
                }
            }
            catch(error){
                return console.log(error.response.data.message)
            }
        }
        getListings();
    }, [page,limit,category])
}

export default useListings;