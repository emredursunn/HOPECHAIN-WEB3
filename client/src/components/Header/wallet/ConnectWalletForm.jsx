import React, { useState } from "react";
import "./Form.css";
import useAuthStore from "../../../store/authStore";
import { getWallet } from "../../../services/service";

const ConnectWalletForm = ({ onClose }) => {
  const { set_wallet_id,set_wallet_address, set_blockchain } = useAuthStore();
  const [walletId, setWalletId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getWallet(walletId)
      alert("Giriş yapıldı!");
      set_wallet_id(data.wallet.id);
      set_wallet_address(data.wallet.address);
      set_blockchain(data.wallet.blockchain);
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
