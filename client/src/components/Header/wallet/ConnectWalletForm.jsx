import React, { useState } from "react";
import "./Form.css";
import useAuthStore from "../../../store/authStore";
import axios from "axios";

const ConnectWalletForm = ({ onClose }) => {
  const { set_wallet_id,set_wallet_address, set_blockchain } = useAuthStore();
  const [walletId, setWalletId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://hopechain-web-3-backend.vercel.app/getwallet", {
        wallet_id: walletId,
      });
      console.log(response);
      alert("Giriş yapıldı!");
      set_wallet_id(response.data.wallet.id);
      set_wallet_address(response.data.wallet.address);
      set_blockchain(response.data.wallet.blockchain);
      onClose();
    } catch (error) {
      alert("Geçerli ID giriniz!");
    }
  };

  return (
    <div className="auth-form-overlay">
      <div className="auth-form-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Cüzdanını bağla</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Wallet ID:</label>
            <input
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
              required
            />
          </div>

          <button type="submit">Onayla</button>
        </form>
      </div>
    </div>
  );
};

export default ConnectWalletForm;
