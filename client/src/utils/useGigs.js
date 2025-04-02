import axios from "axios";
import React from "react";
import { base_url } from "../App";
import { gigsState } from "../store/gigsState";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

function useGigs(page,limit){
    const setGigs = useSetRecoilState(gigsState)
    const token = localStorage.getItem('unikart-auth')
    const navigate= useNavigate();
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    React.useEffect(()=>{

        setGigs((prev)=>{return {...prev , isLoading : true}})
        
        if(!token) {
            navigate('/login')
        }
        async function getGigs(){
            try{
                const response = await axios.get(`${base_url}/user/gigs?page=${page}&limit=${limit}` , config )
                if(response.status ===200) {
                    setGigs({gigs: response.data.gigs , isLoading: false , pages : response.data.pages})
                }
            }
            catch(error){
                return console.log(error.response.data.message)
            }
        }
        getGigs();
    }, [page,limit,token])
}

export default useGigs;