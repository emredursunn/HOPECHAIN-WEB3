import React, { useState } from "react";
import "./Header.css";
import ConnectWalletForm from "./wallet/ConnectWalletForm";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";
import CreateWalletForm from "./wallet/CreateWalletForm";
import { useSpring, animated } from "@react-spring/web";

const Header = () => {
  const [showConnectWalletForm, setShowConnectWalletForm] = useState(false);
  const [showCreateWalletForm, setShowCreateWalletForm] = useState(false);
  const { wallet_id, set_wallet_id, set_wallet_address, set_blockchain } =
    useAuthStore();

  const handleConnectFormClick = () => {
    setShowConnectWalletForm(true);
  };

  const handleCloseConnectWalletForm = () => {
    setShowConnectWalletForm(false);
  };

  const handleCreateFormClick = () => {
    setShowCreateWalletForm(true);
  };

  const handleCloseCreateWalletForm = () => {
    setShowCreateWalletForm(false);
  };

  const handleLogout = () => {
    set_wallet_id("");
    set_wallet_address("");
    set_blockchain("");
    alert("Çıkış yapıldı");
  };

  const props = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { tension: 220, friction: 120 },
    delay: 100,
  });

  return (
    <animated.div style={props}>
      <header className="header">
        <div className="logo">
          <Link to="/">HOPECHAIN</Link>
        </div>
        <nav className="nav">
          {wallet_id ? (
            <>
              <Link to="/about">Hakkında</Link>
              <Link to="/transactionHistory">İşlem Geçmişi</Link>
              <Link to="/balance">Bakiye</Link>
              <a href="#" onClick={handleLogout}>
                Çıkış Yap
              </a>
            </>
          ) : (
            <>
              <Link to="/about">Hakkında</Link>
              <a href="#" onClick={handleCreateFormClick}>
                Cüzdan oluştur
              </a>
              <a href="#" onClick={handleConnectFormClick}>
                Cüzdan Bağla
              </a>
            </>
          )}
        </nav>
        {showConnectWalletForm && (
          <ConnectWalletForm onClose={handleCloseConnectWalletForm} />
        )}

        {showCreateWalletForm && (
          <CreateWalletForm onClose={handleCloseCreateWalletForm} />
        )}
      </header>
    </animated.div>
  );
};

export default Header;
