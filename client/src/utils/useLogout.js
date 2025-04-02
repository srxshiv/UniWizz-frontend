import { useNavigate } from "react-router-dom";

function useLogout() {
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem('unikart-auth');
        navigate('/login');
    };
}

export default useLogout