import React, { useState, useEffect } from "react";
import "./Banner.css";
import { useSpring, animated } from "@react-spring/web";

// Slider verilerini tanımlayın
const slides = [
  {
    src: "https://upload.wikimedia.org/wikivoyage/en/thumb/2/29/EarthquakeBanner3.jpg/1200px-EarthquakeBanner3.jpg",
    text: "Yardım Et, Değişim Yarat! Dünyanın dört bir yanındaki insanlara yardım elinizi uzatın ve büyük değişimlere öncülük edin.",
  },
  {
    src: "https://clcfc.org/wp-content/uploads/2024/01/BANNERCLC-1200X400PX-1.png",
    text: "Topluluklara Yardım Eli Uzatın. Yerel ve küresel topluluklara destek olun, ihtiyacı olanlara umut ve yardım getirin.",
  },
  {
    src: "https://t3.ftcdn.net/jpg/02/87/64/68/360_F_287646869_EpBkmeh4ESmhE8jmSRYd8JH1BVfXoRxs.jpg",
    text: "Web3 ile Güvenli Bağış Yapın. Web3 teknolojileri kullanarak güvenli ve şeffaf bağış süreçleri oluşturun.",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Her 5 saniyede bir slaytı değiştir

    return () => clearInterval(interval); // Temizle
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
              color: "#fff",
              textAlign: "center",
              backgroundColor: "rgba(43, 47, 42, 0.5)",
              padding: "20px",
            }}>
            <h1>{slides[currentSlide].text}</h1>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Banner;
