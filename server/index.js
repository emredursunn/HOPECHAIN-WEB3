const express = require("express");
const {
  initiateDeveloperControlledWalletsClient,
} = require("@circle-fin/developer-controlled-wallets");
const bodyParser = require("body-parser");
const Web3 = require("web3").default;
const fetch = require("node-fetch");
const forge = require("node-forge");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
});

const web3 = new Web3(
  "https://sepolia.infura.io/v3/3feb96dfc04b490ebde38e30875b43df"
);

const get_cipher_text = async () => {
  let ciphertext = generate_ciphertext(`${process.env.ENTITY_SECRET}`);
  return ciphertext;
};

const fetch_public_key = async (secret) => {
  const local_circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
    apiKey: `${process.env.API_KEY}`,
    entitySecret: secret, // Make sure to enter the entity secret from the step above.
  });

  const response = await local_circleDeveloperSdk.getPublicKey({});
  return response.data.publicKey;
};

const generate_ciphertext = async (secret) => {
  const entitySecret = forge.util.hexToBytes(secret);
  const publicKey = forge.pki.publicKeyFromPem(await fetch_public_key(secret));
  const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create(),
    },
  });
  //console.log("encryptedData:", forge.util.encode64(encryptedData));
  return forge.util.encode64(encryptedData);
};

const port = 5500;

app.post("/createwallet", async (req, res) => {
  const { blockchain } = req.body;
  console.log("Received request to create wallet for blockchain:", blockchain);
  try {
    const response = await circleDeveloperSdk.createWallets({
      accountType: "SCA",
      blockchains: [blockchain],
      count: 1,
      walletSetId: process.env.WALLET_SET_ID,
    });
    console.log("Create wallet response:", response.data);
    res.status(200).json(response.data);
    return response.data
  } catch (error) {
    console.error(
      "Error creating wallet:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getwallet", async (req, res) => {
  const { wallet_id } = req.body;
  try {
    const response = await circleDeveloperSdk.getWallet({ id: wallet_id });
    console.log("here is the wallet:", response.data);
    res.status(200).json(response.data);
    return response.data
  } catch (error) {
    console.log(
      "error getting wallet",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/gettransaction", async (req, res) => {
  const { wallet_id } = req.body;
  try {
    const response = await circleDeveloperSdk.listTransactions({
      walletIds: [`${wallet_id}`],
    });
    console.log("here is the transactions:", response.data.transactions);
    res.status(200).json(response.data.transactions);
    return response.data
  } catch (error) {
    console.log(
      "error getting transactions",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getbalance", async (req, res) => {
  const { wallet_id } = req.body;
  try {
    const response = await circleDeveloperSdk.getWalletTokenBalance({
      id: `${wallet_id}`,
    });
    console.log("here is the balance:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(
      "error getting balance",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/transfertoken", async (req, res) => {
  const { wallet_id, destination_address, amounts, blockchain } = req.body;
  try {
    const response = await circleDeveloperSdk.createTransaction({
      walletId: `${wallet_id}`,
      tokenId: blockchain === 'MATIC-AMOY' ? `${process.env.MATIC_USDC_TOKEN_ID}` :`${process.env.ETH_USDC_TOKEN_ID}`,
      destinationAddress: `${destination_address}`,
      amounts: [`${amounts}`],
      fee: {
        type: "level",
        config: {
          feeLevel: "MEDIUM",
        },
      },
    });
    console.log("transfer gercekleşti", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(
      "transfer error",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "internal server error" });
  }
});

app.post("/applycctp", async (req, res) => {
  const { cctp_sender_wallet_id, cctp_receiver_address } = req.body;
  try {
    await approve_usdc({ cctp_sender_wallet_id });
    // const burn_transaction_id = await burn_usdc({
    //   cctp_sender_wallet_id,
    //   cctp_receiver_address,
    // });
    // await mint_usdc({ burn_transaction_id });
    console.log("attestatinnnnnn:", attestation);
    res.status(200).json({ message: "Request processed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

const approve_usdc = async ({ cctp_sender_wallet_id }) => {
  const ciphertext = await get_cipher_text();
  const props = JSON.stringify({
    abiFunctionSignature: "approve(address,uint256)",
    abiParameters: [`${process.env.TOKEN_MESSENGER_ADDRESS}`, "100000000"],
    idempotencyKey: uuidv4(),
    contractAddress: `${process.env.CONTRACT_ADDRESS}`,
    feeLevel: "HIGH",
    walletId: `${cctp_sender_wallet_id}`,
    entitySecretCiphertext: ciphertext,
  });
  const response = await circleDeveloperSdk.createContractExecutionTransaction({
    ...props,
  });
  console.log(response.data);

  // const url =
  //   "https://api.circle.com/v1/w3s/developer/transactions/contractExecution";
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     abiFunctionSignature: "approve(address,uint256)",
  //     abiParameters: [`${process.env.TOKEN_MESSENGER_ADDRESS}`, "100000000"],
  //     idempotencyKey: uuidv4(),
  //     contractAddress: `${process.env.CONTRACT_ADDRESS}`,
  //     feeLevel: "HIGH",
  //     walletId: `${cctp_sender_wallet_id}`,
  //     entitySecretCiphertext: ciphertext,
  //   }),
  // };

  // try {
  //   const res = await fetch(url, options);
  //   const json = await res.json();
  //   return json.data.id;
  // } catch (error) {
  //   console.log("Internal server error in approve:", error);
  // }
};

const burn_usdc = async ({ cctp_sender_wallet_id, cctp_receiver_address }) => {
  const ciphertext = await get_cipher_text();

  const encodedDestinationAddress = web3.eth.abi.encodeParameter(
    "address",
    `${cctp_receiver_address}`
  );

  console.log("encoded address", encodedDestinationAddress);

  const data = {
    abiFunctionSignature: "depositForBurn(uint256,uint32,bytes32,address)",
    abiParameters: [
      "1000000",
      "7",
      `${encodedDestinationAddress}`,
      `${process.env.CONTRACT_ADDRESS}`,
    ],
    idempotencyKey: uuidv4(),
    contractAddress: `${process.env.TOKEN_MESSENGER_ADDRESS}`,
    feeLevel: "MEDIUM",
    walletId: `${cctp_sender_wallet_id}`,
    entitySecretCiphertext: ciphertext,
  };

  const url =
    "https://api.circle.com/v1/w3s/developer/transactions/contractExecution";
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json.data.id;
  } catch (error) {
    console.log("Internal server error in burn:", error);
  }
};

const fetch_deposit_transaction = async ({ burn_transaction_id }) => {
  const url = `https://api.circle.com/v1/w3s/transactions/${burn_transaction_id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log("yeni", json.data);
      return json.data;
    })
    .catch((err) => console.error("error:" + err));
};

const get_attestation = async ({ burn_transaction_id }) => {
  // 1 - Fetching the deposit transaction object from programmable wallets
  let transaction = await fetch_deposit_transaction({ burn_transaction_id });
  console.log("transaction", transaction);
  // 2 - Decoding and Creating messageBytes and messageHash with a Web3 Library
  // Get messageBytes from EVM logs using tx_hash of thetransaction.
  const transactionReceipt = await web3.eth.getTransactionReceipt(
    transaction.txHash
  );
  const eventTopic = web3.utils.keccak256("MessageSent(bytes)");
  const log = transactionReceipt.logs.find((l) => l.topics[0] === eventTopic);
  const messageBytes = web3.eth.abi.decodeParameters(["bytes"], log.data)[0];
  const messageHash = web3.utils.keccak256(messageBytes);

  // 3 - Fetch Attestation Signature from Circle's Iris API
  // Get attestation signature from iris-api.circle.com
  let attestationResponse = { status: "pending" };
  while (attestationResponse.status != "complete") {
    const response = await fetch(
      `https://iris-api-sandbox.circle.com/attestations/${messageHash}`
    );
    attestationResponse = await response.json();
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log("messageBytes: ", messageBytes);
  console.log("attestationResponse: ", attestationResponse);
  return {
    messageBytes: messageBytes,
    attestation: attestationResponse.attestation,
  };
};

const mint_usdc = async ({ burn_transaction_id }) => {
  const ciphertext = await get_cipher_text();

  const attestation_variables = await get_attestation({ burn_transaction_id });
  console.log(attestation_variables);

  const url =
    "https://api.circle.com/v1/w3s/developer/transactions/contractExecution";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      abiFunctionSignature: "receiveMessage(bytes,bytes)",
      abiParameters: [
        `${attestation_variables.messageBytes}`,
        `${attestation_variables.attestation}`,
      ],
      idempotencyKey: `${uuidv4()}`,
      contractAddress: `${process.env.MESSAGE_TRANSMITTER_ADDRESS}`,
      feeLevel: "MEDIUM",
      walletId: `${process.env.CCTP_RECEIVER_WALLET_ID}`,
      entitySecretCiphertext: ciphertext,
    }),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
};

const check_transfer_state = async ({ id }) => {
  const response = await circleDeveloperSdk.getTransaction({
    id: id,
  });

  console.log("response: ", response.data);
};

const get_transaction_hash = async ({ approveId }) => {
  const url = `https://api.circle.com/v1/w3s/transactions/${approveId}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log("hash:", json);
      return json;
    })
    .catch((err) => console.error("error:" + err));
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(process.env.API_KEY);
});
