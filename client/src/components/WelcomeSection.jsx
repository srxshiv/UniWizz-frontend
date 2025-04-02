import React, { useEffect, useState } from "react";

const WelcomeSection = ({ listings }) => {
  const isMobile = window.innerWidth < 640;
  const limitedListings = isMobile ? listings.slice(0, 8) : listings.slice(0, 12);

  const positions = isMobile
    ? [
        { top: "72%", left: "10%", width: "100px", height: "100px", delay: "0s" },
        { top: "57%", left: "60%", width: "90px", height: "90px", delay: "0.2s" },
        { top: "18%", left: "10%", width: "110px", height: "110px", delay: "0.4s" },
        { top: "50%", left: "15%", width: "95px", height: "95px", delay: "0.6s" },
        { top: "20%", left: "65%", width: "105px", height: "105px", delay: "0.8s" },
        { top: "70%", left: "40%", width: "90px", height: "90px", delay: "1s" },
        { top: "75%", left: "65%", width: "105px", height: "105px", delay: "0.8s" },
        { top: "30%", left: "40%", width: "105px", height: "105px", delay: "0.8s" },
      ]
    : [
        { top: "12%", left: "8%", width: "160px", height: "160px", delay: "0s" },
        { top: "15%", left: "60%", width: "120px", height: "120px", delay: "0.2s" },
        { top: "12%", left: "35%", width: "200px", height: "200px", delay: "0.4s" },
        { top: "50%", left: "25%", width: "130px", height: "130px", delay: "0.6s" },
        { top: "40%", left: "75%", width: "190px", height: "190px", delay: "0.8s" },
        { top: "75%", left: "35%", width: "150px", height: "150px", delay: "1s" },
        { top: "60%", left: "55%", width: "110px", height: "110px", delay: "1.2s" },
        { top: "15%", left: "80%", width: "140px", height: "140px", delay: "1.4s" },
        { top: "25%", left: "20%", width: "125px", height: "125px", delay: "1.6s" },
        { top: "65%", left: "10%", width: "135px", height: "135px", delay: "1.8s" },
        { top: "75%", left: "60%", width: "145px", height: "145px", delay: "2s" },
        { top: "75%", left: "75%", width: "130px", height: "130px", delay: "2.2s" },
      ];

  // Text fade-in effect
  const [textVisible, setTextVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setTextVisible(true), 300);
  }, []);

  return (
    <div className="relative h-[500px] sm:h-[750px] flex items-center justify-center overflow-hidden bg-white">
      {/* Floating Listings (Structured Layout with Smooth Animation) */}
      {limitedListings.map((item, index) => (
        <div
          key={index}
          className="absolute rounded-lg shadow-lg overflow-hidden animate-float-box"
          style={{
            top: positions[index].top,
            left: positions[index].left,
            width: positions[index].width,
            height: positions[index].height,
            animationDelay: positions[index].delay,
          }}
        >
          <img
            src={item.images || "/default-image.png"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Marketplace Text */}
      <div
        className="absolute text-black transition-opacity"
      >
        <p className="text-center font-thin md:text-[40px] drop-shadow-glow">
        Your University's
        </p>
        <p className="text-center text-5xl font-thin md:text-7xl drop-shadow-glow">
          Marketplace
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;
