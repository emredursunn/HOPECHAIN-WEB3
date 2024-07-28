import React from "react";
import Card from "../../components/Card/Card";
import { charities } from "../../utils/charities";
import Banner from "../../components/Banner/Banner";
import './Home.css'

export default function Home() {
  const handleDonate = (amount, name) => {
    if (amount) {
      alert(`Donate ${amount} to ${name}`);
    } else {
      alert("Enter valid amount");
    }
  };

  return (
    <>
      <Banner />
      <div className="card-container">
        {charities.map((charity, index) => (
          <Card
            key={index}
            name={charity.name}
            index={index}
            description={charity.description}
            img={charity.img}
            onDonateClick={handleDonate}
          />
        ))}
      </div>
    </>
  );
}
