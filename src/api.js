import { ethers } from "ethers";
import token_abi from "./poc_token.json";
import contract_abi from "./poc_contract.json";
import { contractAddress } from "./contractAddress";
export const getConnection = async () => {
  // console.log("connecting to metamask..");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const network = await provider.getNetwork();
  if (network.name !== "rinkeby") {
    alert("please connect to rinkeby network and try again ");
    return;
  }
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();
  const signer_address = await signer.getAddress();

  // console.log("connected to metamask..");
  return { provider, signer_address };
};

export const mintonepoc = async (provider) => {
  console.log("minting one token to user wallet");
  const contract = new ethers.Contract(
    contractAddress.POC_TOKEN,
    token_abi,
    provider
  );

  const connected = contract.connect(await provider.getSigner());
  const res = await connected.anyonecanmint();
  console.log(res);
  res.wait();

  return { status: true, hash: res.hash };
};

export const sendethertocontract = async (provider, amount) => {
  const contract = new ethers.Contract(
    contractAddress.POC_TOKEN,
    token_abi,
    provider
  );

  const tx = {
    to: contractAddress.POC_CONTRACT,
    value: ethers.utils.parseEther(amount.toString()),
  };

  const signer = await provider.getSigner();
  const res = await signer.sendTransaction(tx);
  console.log(res);
  res.wait();

  return { status: true, hash: res.hash };
};

export const sendpoctocontract = async (provider, amount) => {
  const contract = new ethers.Contract(
    contractAddress.POC_TOKEN,
    token_abi,
    provider
  );

  const connected = contract.connect(await provider.getSigner());
  //   const res =await connected.
  console.log(connected);

  const res = await connected.transfer(
    contractAddress.POC_CONTRACT,
    ethers.utils.parseEther(amount.toString())
  );

  console.log(res);
  res.wait();

  return { status: true, hash: res.hash };
};

export const withdrawethfromcontract = async (provider, amount) => {
  const contract = new ethers.Contract(
    contractAddress.POC_CONTRACT,
    contract_abi,
    provider
  );

  const connected = contract.connect(await provider.getSigner());
  //   const res =await connected.
  //   console.log(connected);

  const res = await connected.withdrawEth(
    ethers.utils.parseEther(amount.toString())
  );

  console.log(res);
  res.wait();

  return { status: true, hash: res.hash };
};

export const withdrawpocfromcontract = async (provider, amount) => {
  const contract = new ethers.Contract(
    contractAddress.POC_CONTRACT,
    contract_abi,
    provider
  );

  const connected = contract.connect(await provider.getSigner());
  //   const res =await connected.
  // console.log(connected);

  const res = await connected.widthdrawERC20(
    ethers.utils.parseEther(amount.toString()),
    contractAddress.POC_TOKEN
  );

  //   console.log(res);
  res.wait();

  return { status: true, hash: res.hash };
};

export const getcontracteth = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const poc_token = new ethers.Contract(
    contractAddress.POC_TOKEN,
    token_abi,
    provider
  );
  let contract_poc_balance = await poc_token.balanceOf(
    contractAddress.POC_CONTRACT
  );
  const contract = new ethers.Contract(
    contractAddress.POC_CONTRACT,
    contract_abi,
    provider
  );

  let contract_eth_balance = await contract.getcontractbalance();
  contract_eth_balance = ethers.utils.formatEther(contract_eth_balance);
  contract_poc_balance = ethers.utils.formatEther(contract_poc_balance);

  return { contract_poc_balance, contract_eth_balance };
};
