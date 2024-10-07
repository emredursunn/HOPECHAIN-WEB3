import React, { useState, useEffect } from "react";
import "./Banner.css";
import { useSpring, animated } from "@react-spring/web";

// Slider verilerini tanımlayın
const slides = [
  {
    src: "https://upload.wikimedia.org/wikivoyage/en/thumb/2/29/EarthquakeBanner3.jpg/1200px-EarthquakeBanner3.jpg",
    text: "Donate and Give Life. Give hand for people where lives all around of world and lead big revolution.",
  },
  {
    src: "https://clcfc.org/wp-content/uploads/2024/01/BANNERCLC-1200X400PX-1.png",
    text: "Give a hand to organizations. Support local and global organizations. Bring hope to who needs.",
  },
  {
    src: "https://t3.ftcdn.net/jpg/02/87/64/68/360_F_287646869_EpBkmeh4ESmhE8jmSRYd8JH1BVfXoRxs.jpg",
    text: "Donate safer with Hopechain. Throw a step to web3 world and create safe donation progress.",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(interval); // Clear
  }, []);

  const props = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { tension: 220, friction: 120 },
    delay: 250,
  });

  return (
    <animated.div style={props}>
      <div className="banner">
        <div
          className="banner-slide"
          style={{
            backgroundImage: `url(${slides[currentSlide].src})`,
          }}
        >
          <div style={{
              textAlign: "center",
              backgroundColor: "rgba(43, 47, 42, 0.5)",
              padding: "20px",
            }}>
            <h1 style={{color:"#fff"}}>{slides[currentSlide].text}</h1>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Banner;
