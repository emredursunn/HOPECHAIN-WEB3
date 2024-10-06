import React, { useState } from "react";
import Select from "react-select";
import "./Form.css";
import useAuthStore from "../../../store/authStore";
import { createWallet } from "../../../services/service";

const blockchainOptions = [
  { value: "MATIC-AMOY", label: "Polygon (MATIC)" },
  { value: "ETH-SEPOLIA", label: "Ethereum" },
];

const CreateWalletForm = ({ onClose }) => {
  const [selectedBlockchain, setSelectedBlockchain] = useState(null);
  const { wallet_id, set_wallet_id, set_wallet_address, set_blockchain } =
    useAuthStore();

  const handleCopyWalletId = () => {
    navigator.clipboard.writeText(wallet_id);
    alert("Wallet ID copied to clipboard");
  };

  const handleSubmit = async () => {
    if (!selectedBlockchain) {
      alert("Lütfen bir blockchain ağı seçin.");
      return;
    }
    try {
      const data = await createWallet(selectedBlockchain.value)
      const wallet = data.wallets[0];
      set_wallet_id(wallet.id);
      set_wallet_address(wallet.address);
      set_blockchain(wallet.blockchain);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <div className="auth-form-overlay">
      <div className="auth-form-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {wallet_id ? (
          <div className="wallet-id-container">
            <p>
              Cüzdanınız {selectedBlockchain ? selectedBlockchain.label : ""}{" "}
              ağında oluşturuldu!
            </p>
            <p>Wallet ID: {wallet_id}</p>
            <button onClick={handleCopyWalletId}>Kopyala</button>
          </div>
        ) : (
          <>
            <h2>Cüzdan Yarat</h2>
            <div className="form-group">
              <label>Blockchain ağı:</label>
              <Select
                options={blockchainOptions}
                onChange={setSelectedBlockchain}
                placeholder="Blockchain ağı seçin"
                value={selectedBlockchain} 
              />
            </div>

            <button onClick={handleSubmit}>Onayla</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateWalletForm;
