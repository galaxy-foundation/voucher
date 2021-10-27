import React, { useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import Swapform from "./swapform.js";
import { Grid } from "@material-ui/core";
import { useApplicationContext } from "../../contexts";
import Axios from "axios";
import loadingScreen from "../../assets/img/box.gif";
import {
    fanttomTesnetProvider,
    mainnetProvider,
    icicbProvider,
    presaleContract,
    usdtContract,
} from "../../contract";

import { ethers } from "ethers";
import AlertModal from "../alertModal";
import { store } from "react-notifications-component";
import arrow1 from "../../assets/img/arrow1.png";
import arrow2 from "../../assets/img/arrow2.png";

const { delay, handleErr, fromBigNum, toBigNum } = require("../utils.js");

function PresaleCard() {
    const wallet = useWallet();

    const [usdtBalance, setUsdtBalance] = useState("0");
    const [balance, setBalance] = useState("0");
    const [vBalance, setVBalance] = useState("0");

    const [fromAmount, setFromAmount] = useState("0");
    const [toAmount, setToAmount] = useState("0");

    const [token, setToken] = useState("ETH");
    const [txDatas, setTxDatas] = useState({
        completedTransaction: [],
        conformedTransaction: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [alertInfos, setAlertInfos] = useState({
        title: "text",
        info: "error",
    });
    const [alertOpen, setAlertOpen] = useState(false);

    const [presaleStartTime, setPresaleStartTime] = useState(0);
    const [presaleEndTime, setPresaleEndTime] = useState(0);

    const price = {
        USDT: 25,
        ETH: 105000,
    };

    const getUserData = async () => {
        if (wallet.status === "connected") {
            try {
                const provider = new ethers.providers.Web3Provider(
                    wallet.ethereum
                );
                const signer = await provider.getSigner();

                var signedusdtContract = usdtContract.connect(signer);

                let usdtbalance = await signedusdtContract.balanceOf(
                    wallet.account
                );
                setUsdtBalance(fromBigNum(usdtbalance, 6));

                let balance = await provider.getBalance(wallet.account);
                setBalance(fromBigNum(balance, 18));

                var signedPresaleContract = presaleContract.connect(signer);
                let vBalance = await signedPresaleContract.balanceOf(
                    wallet.account
                );
                setVBalance(fromBigNum(vBalance, 18));
            } catch (err) {
                setBalance("0");
                setUsdtBalance("0");
            }
        }
    };

    useEffect(() => {
        getUserData();
    }, [wallet.status]);

    useEffect(() => {
        if(token === "ETH"){
            if (Number(balance) < Number(fromAmount)) {
                setError(true);
            } else {
                setError(false);
            }
        }
        else {
            if (Number(usdtBalance) < Number(fromAmount)) {
                setError(true);
            } else {
                setError(false);
            }
        }
    }, [fromAmount]);

    //bridge Data
    // const getData = async () => {
    //     try {
    //         let txDatas = await Axios.post(
    //             process.env.REACT_APP_ENDPOINT + "/api/getData"
    //         );
    //         console.log(txDatas.data);
    //         setTxDatas(txDatas.data);
    //     } catch (err) {
    //         handleErr(err);
    //     }
    // };

    // useEffect(()=>{
    //    setInterval(() => {
    //         console.log('This will run every 5 second!');
    //         getData();
    //       }, 5000);
    // },[])

    // exchange amount handle
    const handleAmount = (e) => {
        setFromAmount(e.target.value);
        var toAmount = Number(e.target.value) * price[token];
        if (toAmount < 0) toAmount = 0;
        setToAmount(toAmount);
    };

    useEffect(() => {
        
        console.log(fromAmount,toAmount);
    },[fromAmount,toAmount])

    const handleAmount2 = (e) => {
        setToAmount(e.target.value);
        var fromAmount = Number(e.target.value) / price[token];
        setFromAmount(fromAmount);
    };

    //handle exchange
    const handleExchange = async () => {
        if (wallet.status === "connected") {
            setLoading(true);
            try {
                if (token === "ETH") {
                    buyETH();
                } else {
                    const provider = new ethers.providers.Web3Provider(
                        wallet.ethereum
                    );
                    const signer = await provider.getSigner();
                    var userAddress = await signer.getAddress();
                    let presaleContractAddress = presaleContract.address;

                    let signedUsdtContract = usdtContract.connect(signer);
                    var allowance = await signedUsdtContract.allowance(
                        userAddress,
                        presaleContractAddress
                    );

                    var usdtValue = toBigNum(fromAmount.toString(), 6);
                    console.log(Number(usdtValue), Number(allowance));
                    if (Number(allowance) < Number(usdtValue)) {
                        var tx = await signedUsdtContract.approve(
                            presaleContractAddress,
                            usdtValue * 10
                        );
                        await tx.wait();
                        buyUSDT();
                    } else {
                        buyUSDT();
                    }
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                handleErr(err);
            }
        }
    };

    const buyUSDT = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(wallet.ethereum);
            const signer = await provider.getSigner();
            let signedPresaleContract = presaleContract.connect(signer);

            var usdtValue = toBigNum(fromAmount.toString(), 6);

            var tx = await signedPresaleContract.depositUSDT(usdtValue,wallet.account)
            
            await tx.wait();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
            handleErr(err);
        }
    };

    const buyETH = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(wallet.ethereum);
            const signer = await provider.getSigner();
            let signedPresaleContract = presaleContract.connect(signer);

            var ethValue = toBigNum(Number(fromAmount).toFixed(8),18);
            var tx = await signedPresaleContract.depositETH(wallet.account,{value:ethValue})
            await tx.wait();
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            handleErr(err);
        }
    };

    const handleClose = () => {
        setAlertOpen(false);
    };

    const handleChangeToken = (buyToken) => {
        setToken(buyToken.value);
    };

    const styledNum = (num) => {
        return parseFloat(Number(num).toFixed(4));
    };

    return (
        <div className="PresaleCard">
            <AlertModal
                title={alertInfos.title}
                info={alertInfos.info}
                open={alertOpen}
                handleClose={handleClose}
            />
            <span className="x-font6">
                {" "}
                ICICB <span className="special-font6">Presale</span>
            </span>
            <div className="spacer"></div>
            <Grid xs={12} sm={12} md={12} className="parent-etc">
                <Grid>
                </Grid>
                <Grid container className="x-font3">
                    <Grid item xs={12} sm={12} md={3}></Grid>
                    <Grid item xs={12} sm={12} md={6} style={{ padding: 10 }}>
                        <Swapform
                            sort="etc"
                            token={token}
                            amount={fromAmount}
                            handleAmount={handleAmount}
                            handleTokenChange={handleChangeToken}
                            active={false}
                        ></Swapform>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}></Grid>

                    <Grid item xs={12} sm={12} md={3}></Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        style={{
                            padding: 10,
                        }}
                    >
                        <Swapform
                            sort="optional"
                            token={"ICICB"}
                            amount={toAmount}
                            handleAmount={handleAmount2}
                            active={false}
                        ></Swapform>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}></Grid>
                </Grid>
                <Grid>
                </Grid>
            </Grid>
            <div className="spacer-1"></div>
            <button className="swap-button" onClick={handleExchange}>
                {loading ? (
                    <img src={loadingScreen} width="40px" alt="loading" />
                ) : error === true ? (
                    "Insufficient balance"
                ) : (
                    "EXCHANGE"
                )}
            </button>
        </div>
    );
}

export default PresaleCard;
