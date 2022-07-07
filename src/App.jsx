import { getAllByPlaceholderText } from "@testing-library/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getConnection,
  getcontracteth,
  mintonepoc,
  sendethertocontract,
  sendpoctocontract,
  withdrawethfromcontract,
  withdrawpocfromcontract,
} from "./api";

export const App = () => {
  const [signer, setsigner] = useState(undefined);
  const [provider, setprovider] = useState(undefined);
  const [mintresponse, setmintresponse] = useState("");
  const [mintbtntxt, setmintbtntxt] = useState("Mint 1 POC TOKEN");

  const [etheramount, setetheramount] = useState(0);
  const [ethertransfer, setethertransfer] = useState("");
  const [ethertransferbtn, setethertransferbtn] = useState(
    "Tranfer ethers to to contract"
  );

  const [poctokenamount, setpoctokenammount] = useState(0);
  const [poctransfer, setpoctransfer] = useState("");
  const [poctransferbtn, setpoctransferbtn] = useState(
    "Tranfer POC tokens to contract"
  );

  const [withdrawamount, setwithdrawamount] = useState(0);
  const [withethertransfer, setwithethertransfer] = useState("");
  const [withethertransferbtn, setwithethertransferbtn] =
    useState("Withdraw ethers");

  const [withpoctokenamount, setwithpoctokenamount] = useState(0);
  const [withpoctransfer, setwithpoctransfer] = useState("");
  const [withpoctransferbtn, setwithpoctransferbtn] = useState(
    "Withdraw POC Tokens"
  );

  const [contractEth, setcontractEth] = useState(0);
  const [contractPOC, setcontractPOC] = useState(0);

  useEffect(() => {
    const get = async () => {
      const res = await getcontracteth();
      setcontractEth(res.contract_eth_balance);
      setcontractPOC(res.contract_poc_balance);
    };
    get();
  }, []);

  const onhandleconnect = async () => {
    const response = await getConnection();
    setprovider(response.provider);
    setsigner(response.signer_address);
  };

  const onhandlemintonepoc = async () => {
    if (provider == undefined) {
      alert("please connect wallet first");
      return;
    }

    try {
      setmintbtntxt("Minting...");
      const res = await mintonepoc(provider);
      if (res.status === true) {
        setmintresponse(`https://rinkeby.etherscan.io/tx/${res.hash}`);
      } else {
        setmintresponse("Transaction failed");
      }
      setmintbtntxt("Mint 1 POC TOKEN");
    } catch (err) {
      setmintbtntxt("Mint 1 POC TOKEN");
    }
  };

  const sendether = async () => {
    if (provider == undefined) {
      alert("please connect wallet first");
      return;
    }
    try {
      setethertransferbtn("Transfering...");
      const res = await sendethertocontract(provider, etheramount);
      if (res.status === true) {
        setethertransfer(`https://rinkeby.etherscan.io/tx/${res.hash}`);
      } else {
        setethertransfer("Transaction failed");
      }
      setethertransferbtn("Tranfer ethers to to contract");
    } catch (err) {
      setethertransferbtn("Tranfer ethers to to contract");
    }
  };

  const sendpoctoken = async () => {
    if (provider == undefined) {
      alert("please connect wallet first");
      return;
    }

    try {
      setpoctransferbtn("Transfering...");
      const res = await sendpoctocontract(provider, poctokenamount);
      if (res.status === true) {
        setpoctransfer(`https://rinkeby.etherscan.io/tx/${res.hash}`);
      } else {
        setpoctransfer("Transaction failed");
      }
      setpoctransferbtn("Tranfer POC tokens to contract");
    } catch (err) {
      setpoctransferbtn("Tranfer POC tokens to contract");
    }
  };

  const withdraweth = async () => {
    if (provider == undefined) {
      alert("please connect wallet first");
      return;
    }

    try {
      setwithethertransferbtn("Withdrawing...");
      const res = await withdrawethfromcontract(provider, withdrawamount);
      if (res.status === true) {
        setwithethertransfer(`https://rinkeby.etherscan.io/tx/${res.hash}`);
      } else {
        setwithethertransfer("Transaction failed");
      }
      setwithethertransferbtn("Withdraw ethers");
    } catch (err) {
      setwithethertransferbtn("Withdraw ethers");
    }
  };

  const withpoctoken = async () => {
    if (provider == undefined) {
      alert("please connect wallet first");
      return;
    }

    try {
      setwithpoctransferbtn("Withdrawing...");
      const res = await withdrawpocfromcontract(provider, withpoctokenamount);
      if (res.status === true) {
        setwithpoctransfer(`https://rinkeby.etherscan.io/tx/${res.hash}`);
      } else {
        setwithpoctransfer("Transaction failed");
      }
      setwithpoctransferbtn("Withdraw POC Tokens");
    } catch (err) {
      setwithpoctransferbtn("Withdraw POC Tokens");
    }
  };

  return (
    <div>
      <span>
        There was no admin mentioned in the assignment so the current admin is
        0x5CA43D0639E02D8c7Bd748cd7dF4C60ac5A9829E
      </span>

      <div className="mt">
        <button onClick={onhandleconnect}>
          {provider !== undefined ? (
            <div> {`Connected to: ${signer}`} </div>
          ) : (
            "Connect Metamask"
          )}
        </button>
      </div>
      <div className="mt">
        <button onClick={onhandlemintonepoc}>{mintbtntxt}</button>{" "}
        {mintresponse === "" ? (
          ""
        ) : mintresponse !== "Transaction failed" ? (
          <a href={mintresponse}>rinkeby txn link</a>
        ) : (
          mintresponse
        )}
      </div>
      <div className="mt">
        <input
          type="number"
          onChange={(e) => {
            e.target.value !== ""
              ? setpoctokenammount(e.target.value)
              : setpoctokenammount(0);
          }}
        />{" "}
        <button onClick={sendpoctoken}>{poctransferbtn}</button>{" "}
        {poctransfer === "" ? (
          ""
        ) : poctransfer !== "Transaction failed" ? (
          <a href={poctransfer}>rinkeby txn link</a>
        ) : (
          poctransfer
        )}
      </div>
      <div className="mt">
        <input
          type="number"
          onChange={(e) => {
            e.target.value !== ""
              ? setetheramount(e.target.value)
              : setetheramount(0);
          }}
        />
        <button
          onClick={() => {
            sendether();
          }}
        >
          {ethertransferbtn}
        </button>{" "}
        {ethertransfer === "" ? (
          ""
        ) : ethertransfer !== "Transaction failed" ? (
          <a href={ethertransfer}>rinkeby txn link</a>
        ) : (
          ethertransfer
        )}
      </div>
      <div className="mt">
        <input
          type="number"
          onChange={(e) => {
            e.target.value !== ""
              ? setwithpoctokenamount(e.target.value)
              : setwithpoctokenamount(0);
          }}
        />
        <button onClick={withpoctoken}>{withpoctransferbtn}</button>{" "}
        {withpoctransfer === "" ? (
          ""
        ) : withpoctransfer !== "Transaction failed" ? (
          <a href={withpoctransfer}>rinkeby txn link</a>
        ) : (
          withpoctransfer
        )}
      </div>
      <div className="mt">
        <input
          type="number"
          onChange={(e) => {
            e.target.value !== ""
              ? setwithdrawamount(e.target.value)
              : setwithdrawamount(0);
          }}
        />
        <button onClick={withdraweth}>{withethertransferbtn}</button>{" "}
        {withethertransfer === "" ? (
          ""
        ) : withethertransfer !== "Transaction failed" ? (
          <a href={withethertransfer}>rinkeby txn link</a>
        ) : (
          withethertransfer
        )}
      </div>

      <div className="mt">
        <div className="inf">
          Contract Eth Balance : {contractEth.toString()} ETH
        </div>
        <div className="inf">
          Contract POC Balance : {contractPOC.toString()} POC
        </div>
      </div>
    </div>
  );
};
