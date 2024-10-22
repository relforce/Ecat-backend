var express = require("express");
const bs58 = require("bs58");
const {
  Connection,
  PublicKey,
  Keypair,
  clusterApiUrl,
} = require("@solana/web3.js");
const {
  getOrCreateAssociatedTokenAccount,
  transfer,
} = require("@solana/spl-token");
require("dotenv").config();
const { route } = require("../app");
const User = require("../models/UserModel");
const {
  DAILY_REWARD_LIST,
  CHANNEL_BOT_KEY,
  DAILY_TASK_NAME,
  TG_CHANNEL_TASK_NAME,
  EXCHANGE_TASK_NAME,
  INVITE_TASK_NAME,
  AIRDROP_TASK_NAME,
} = require("../constants");
const { connect } = require("mongoose");
var router = express.Router();

const connection = new Connection(clusterApiUrl("devnet", "confirmed"));

// Load private key from environment vairables

const privateKeyArray = process.env.PRIVATE_KEY;
const senderKeypair = Keypair.fromSecretKey(bs58.decode(privateKeyArray));

router.post("/connect-wallet", async function (req, res) {
  const userData = await User.findOne({ tg_id: req.user_id }).select([
    "tasks",
    "wallet_address",
  ]);

  const existingTask = userData.tasks.find(
    (value) => value.name == AIRDROP_TASK_NAME
  );

  if (existingTask && userData.wallet_address) {
    return res.json({ status: "success", user: userData });
  }

  return res.json({ status: "error", message: "Please connect your wallet." });
});

router.post("/check-wallet", async function (req, res, next) {
  try {
    const userData = await User.findOne({ tg_id: req.user_id });

    return res.json({
      status: "success",
      user: userData,
      message: "Please connect your wallet.",
    });
  } catch (e) {
    return next(e);
  }
});

router.post("/onclaim", async function (req, res) {
  const userData = await User.findOne({ tg_id: req.user_id }).select([
    "point",
    "wallet_address",
    "tg_id",
  ]);
  const claimAmount = req.body._claimAmount;
  console.log("claimAmount", userData, claimAmount);
  try {
    if (!userData.wallet_address || !userData.point) {
      return res
        .status(400)
        .json({ error: "Invalid request, missing parameters" });
    }

    const recipientPublicKey = new PublicKey(userData.wallet_address);
    const mintPublickKey = new PublicKey(process.env.TOKEN_ADDRESS);

    // Get the sender's associated token account for the specified token
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      senderKeypair,
      mintPublickKey,
      senderKeypair.publicKey
    );

    // Get or create the recipient's associated token account
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      senderKeypair,
      mintPublickKey,
      recipientPublicKey
    );

    // Transfer tokens
    const signature = await transfer(
      connection,
      senderKeypair,
      senderTokenAccount.address,
      recipientTokenAccount.address,
      senderKeypair.publicKey,
      claimAmount * 100000000
    );
    console.log("signature", signature);
    const newPoint = userData.point - claimAmount;
    try {
      console.log("tgid", userData.tg_id);
      const result = await User.updateOne(
        { tg_id: userData.tg_id },
        { $set: { point: newPoint } }
      );
      userData.point = newPoint;
      await userData.save();
      console.log("result", result);
      if (result.nModified === 0) {
        console.log("response3");
      }
      console.log("response4");
    } catch (error) {
      console.log("response5");
    }
    console.log("log->response0", userData);
    // res.status(200).json({success: true, signature});
    
    return res.json({ status: "success", user: userData, signed: signature });
    console.log("log->response1");
  } catch (error) {
    console.error("Error transferring tokens:", error);
    return next(e);
  } 
});

module.exports = router;
