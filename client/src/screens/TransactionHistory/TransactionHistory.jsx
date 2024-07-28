// src/pages/TransactionHistory.js
import React, { useEffect, useState } from "react";
import "./TransactionHistory.css";
import { charities } from "../../utils/charities";
import axios from "axios";
import useAuthStore from "../../store/authStore";

const findOrganizationByAddress = (address) => {
  const organization = charities.find((c) => c.wallet_address === address);
  if (organization) {
    return organization.name;
  }
  return "Unknown Organization";
};

const TransactionHistory = () => {
  const { wallet_id } = useAuthStore();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://hopechain-web-3-backend.vercel.app/gettransaction",
          {
            wallet_id: wallet_id,
          }
        );
        const transactionsList = response.data;

        const mappedTransactionsList = transactionsList.map((t) => {
          const organization = findOrganizationByAddress(t.destinationAddress);
          return { ...t, organization: organization };
        });

        setTransactions(mappedTransactionsList);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, [wallet_id]);

  return (
    <div className="transaction-history">
      <h1>Transaction History</h1>
      <table>
        <thead>
          <tr>
            <th>Network</th>
            <th>Amount</th>
            <th>Tx Hash</th>
            <th>State</th>
            <th>Date</th>
            <th>Organization</th>
          </tr>
        </thead>
        {wallet_id && (
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="network-cell">
                  <img
                    src={"/eth.jpg"}
                    alt={`${transaction.blockchain} logo`}
                    className="network-logo"
                  />
                  {transaction.blockchain}
                </td>
                <td>{transaction.amounts[0]}</td>
                <td>{transaction.txHash}</td>
                <td>{transaction.state}</td>
                <td>{transaction.createDate}</td>
                <td>{transaction.organization}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TransactionHistory;
