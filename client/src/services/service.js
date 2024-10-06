import axios from "axios";

export const getBalance = async (wallet_id) => {
  const response = await axios.post(
    "https://hopechain-web-3-backend.vercel.app/getbalance",
    {
      wallet_id,
    }
  );
  return response.data;
};

export const getTransaction = async (wallet_id) => {
  const response = await axios.post(
    "https://hopechain-web-3-backend.vercel.app/gettransaction",
    {
      wallet_id: wallet_id,
    }
  );
  return response.data;
};

export const transferToken = async (wallet_id,destination_address,amounts,blockchain) => {
  const response = await axios.post("https://hopechain-web-3-backend.vercel.app/transfertoken", {
    wallet_id,
    destination_address,
    amounts,
    blockchain,
  });
  return response;
};

export const createWallet = async (blockchain) => {
  const response = await axios.post("https://hopechain-web-3-backend.vercel.app/createwallet", {
    blockchain // Doğru değeri göndermeye dikkat edin
  });
  return response.data
};

export const getWallet = async (wallet_id) => {
  const response = await axios.post("https://hopechain-web-3-backend.vercel.app/getwallet", {
    wallet_id
  });
  return response.data
} 

