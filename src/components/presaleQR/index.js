import React,{useEffect,useState} from "react";
import {Grid} from '@material-ui/core';
import EthereumQRPlugin from 'ethereum-qr-code'
import {delay,handleErr,fromBigNum, toBigNum} from "../utils.js";
import {
    fanttomTesnetProvider, mainnetProvider, icicbProvider,
    presaleContract, usdtContract
} from "../../contract"
import {ethers} from "ethers"

var QRCode = require('qrcode')

function PresaleCard (){

    const [dataURI, setDataURL] = useState("");
    const [recipient, setRecipient] = useState("");

    const price = {
        "USDT" : 1000,
        "ETH" : 3000000
    }

    const validate = (address)=>{
        return ethers.utils.isAddress(address);
    }

    const qr = new EthereumQRPlugin()

    useEffect(()=>{
            var param = {
                "to": presaleContract.address,
                "value": 0,
                "gas": 100000,
                
            }
            var qrCode = qr.toDataUrl(param);

            qrCode.then((qrCodeDataUri) => {
                console.log(qrCodeDataUri.dataURL)
                setDataURL(qrCodeDataUri.dataURL)
            })
    },[])
  
    const handleRecipientChange = (e)=>{
        setRecipient(e.target.value);
    }
// /<div><input type="text" value = {recipient} onChange={handleRecipientChange}></input></div>
    return (
        <div className = "PresaleCard">
        
        <span className = "x-font6"> ICICB Presale</span>    
        <div className = "spacer"></div>
        <Grid container className = "x-font3">
            <Grid item xs = {12} sm = {12} md = {3} >
            </Grid>
            <Grid item xs = {12} sm = {12} md = {6} style={{border:'1px solid gray', padding:10}}>
                    <div className = "spacer"></div>
                    <div id="ICICB_Voucher_App">{dataURI!==""?<img src = {dataURI} alt = "dataURI" width="300" height="300"/>:""}</div>
                <div className = "x-font6">Please send only ETH. Price :{price["ETH"]} Voucher</div>
            </Grid> 
            <Grid item xs = {12} sm = {12} md = {3} >
            </Grid>
        </Grid>
        
        <div className = "spacer-1"></div>
        </div>
    )
}

export default PresaleCard;