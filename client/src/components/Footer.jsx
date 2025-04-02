import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


const Footer = () => {
    const navigate = useNavigate()
    return (
      <footer className="bg-black text-white py-6 text-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <p className="text-sm">&copy; {new Date().getFullYear()} UniKart. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <button onClick={()=>navigate('/about')} className="hover:text-[#FF9D23] transition">
              About
            </button>
            <a href="https://www.instagram.com/srxshiv/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9D23] transition">
              Found bugs? Contact me :  <FontAwesomeIcon icon="fa-brands fa-instagram" size="xl" />
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  