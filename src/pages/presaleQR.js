import React from 'react';
import {Grid} from '@material-ui/core';
import PresaleQRCard from "../components/presaleQR"
import Nav from '../components/nav';

function Home(){
    //console.log(chainId);
    return(
        <div>
        <Nav />
        <Grid container >
            <Grid item xs = {12} sm = {1} md = {1}>
            </ Grid>
            <Grid item xs = {12} sm = {10} md = {10}>
                <PresaleQRCard />
            </Grid>
            <Grid item xs = {12} sm = {1} md = {1}>
            </ Grid>
        </Grid>
        </div>
    )
}

export default Home;