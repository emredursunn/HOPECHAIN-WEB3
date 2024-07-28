import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import axios from "axios";
import "./Balance.css"; // CSS dosyasını ekleyin

export default function Balance() {
  const { wallet_id } = useAuthStore();
  const [tokenBalances, setTokenBalances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://hopechain-web-3-backend.vercel.app/getbalance", {
          wallet_id,
        });
        console.log(response.data);
        setTokenBalances(response.data.tokenBalances);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [wallet_id]);

  return (
    <div className="balance-container">
      <h1>Token Balances</h1>
      <p>Wallet Id: {wallet_id}</p>
      <p>
        Add some tokens {" "}
        <a href={"https://console.circle.com/faucet"} target="_blank">
          Faucet
        </a>
      </p>
      {tokenBalances.length === 0 ? (
        <p>No tokens found.</p>
      ) : (
        <table className="balance-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Amount</th>
              <th>Symbol</th>
              <th>Blockchain</th>
            </tr>
          </thead>
          <tbody>
            {tokenBalances.map((balance, index) => (
              <tr key={index}>
                <td>{balance.token.name}</td>
                <td>{balance.amount}</td>
                <td>{balance.token.symbol}</td>
                <td className="token-cell">
                  <img
                    src={
                      balance.token.blockchain === "MATIC-AMOY"
                        ? "/polygon.png"
                        : "/eth.png"
                    }
                    alt="coinimg"
                    className="token-image"
                  />
                  <span>{balance.token.blockchain}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
