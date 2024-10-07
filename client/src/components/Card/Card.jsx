import React, { useState } from "react";
import "./Card.css";
import { useSpring, animated } from "@react-spring/web";
import { charities } from "../../utils/charities";
import useAuthStore from "../../store/authStore";
import { transferToken } from "../../services/service";

const findDestinationAddressByOrganization = ({ name }) => {
  const organization = charities.find((c) => c.name === name);
  return organization.wallet_address;
};

const Card = ({ name, index, description, img, onDonateClick }) => {
  const [amount, setAmount] = useState("");
  const { wallet_id, blockchain } = useAuthStore();

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleOnDonateClick = async () => {
    const destination_address = findDestinationAddressByOrganization({ name });
    console.log(destination_address);
    try {
      const response = await transferToken({
        wallet_id,
        destination_address,
        amounts: amount,
        blockchain,
      });
      if (response.status >= 200 && response.status < 300) {
        onDonateClick(amount, name);
        setAmount("");
      }
    } catch (error) {
      console.log("transfer error", error);
    }
  };

  const props = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { tension: 220, friction: 120 },
    delay: 300 * (index + 1),
  });

  return (
    <animated.div style={props}>
      <div className="card">
        <div className="image-container">
          <img src={img} alt={name} className="image" />
        </div>
        <div className="content">
          <h3 className="name">{name}</h3>
          <p className="description">{description}</p>
          <div className="actions">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="amount-input"
              placeholder="Amount"
              min={0.000000001}
            />
            <button className="donate-button" onClick={handleOnDonateClick}>
              Donate
            </button>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Card;
