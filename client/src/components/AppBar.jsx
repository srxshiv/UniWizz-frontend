import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../store/loginState";
import { useNavigate } from "react-router-dom";
import useLogout from "../utils/useLogout";
import useLogin from "../utils/useLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

function AppBar() {
  useLogin();
  const user = useRecoilValue(loginState);
  const navigate = useNavigate();
  const logout = useLogout();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        !event.target.closest(".dropdown-container") &&
        !event.target.closest(".menu-button")
      ) {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative dropdown-container">
      {/* Glassmorphism App Bar */}
      <div className="fixed top-0 w-full bg-white border-b border-[#EEEEEE] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 ">
            <div
              className="text-2xl font-light text-black cursor-pointer"
              onClick={() => handleNavigate("/")}
            >
              UniWizz
            </div>
            <div className="md:hidden backdrop-blur-lg bg-white/30">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="xl" />
              </button>
            </div>

            {/* Glass navigation */}
            <nav
              className={`md:flex md:items-center md:gap-6 ${
                isMenuOpen ? "block" : "hidden"
              } md:block absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white/30 backdrop-blur-lg border-b md:border-none shadow-md md:shadow-none p-4 md:p-0 rounded-lg`}
            >
              <div className="flex flex-col pxy-4 md:flex-row md:gap-6 items-center">
                {!user.fname ? (
                  <>
                    <button
                      onClick={() => handleNavigate("/signup")}
                      className="relative text-black font-light after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-1/2 after:bottom-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:left-0"
                    >
                      Create Account
                    </button>
                    <button
                      onClick={() => handleNavigate("/login")}
                      className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 transition"
                    >
                      Log in
                    </button>
                  </>
                ) : (
                  <>
                    {[
                      { name: "Home", path: "/" },
                      { name: "My Listings", path: "/seller/home" },
                      { name: "My Gigs", path: "/home/mygigs" },
                      { name: "Find Gigs", path: "/home/gigs" },
                      { name: "Inbox", path: "/inbox" },
                    ].map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavigate(item.path)}
                        className="relative py-2 text-black font-light after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-1/2 after:bottom-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:left-0"
                      >
                        {item.name}
                      </button>
                    ))}

                    {/* User Profile Dropdown */}
                    <div className="relative py-2">
                      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <FontAwesomeIcon icon={faUser} size="xl" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute right-0 w-48 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-md shadow-lg">
                          <button
                            onClick={() => handleNavigate("/home/updateprofile")}
                            className="block w-full text-left px-8 py-4 hover:bg-gray-100 transition"
                          >
                            Update Profile
                          </button>
                          <button
                            onClick={logout}
                            className="block w-full text-left px-8 py-4 hover:bg-gray-100 transition"
                          >
                            Sign Out
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Adding margin below AppBar */}
      <div className="mt-20"></div>
    </div>
  );
}

export default AppBar;
