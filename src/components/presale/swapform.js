import React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Dropdown from "react-dropdown";
import eth_icon from "../../assets/img/eth_icon.png";
import icicb_icon from "../../assets/img/icicb_icon.png";

function SwapForm(props) {
    const {
        sort,
        token,
        amount,
        handleAmount,
        handleTokenChange,
        active,
    } = props;

    const [styledAmount, setStyledAmount] = useState(0);

    useEffect(() => {
        if (amount !== 0)
            setStyledAmount(parseFloat(Number(amount).toFixed(8)));
        else setStyledAmount(amount);
    }, [amount]);

    const options = [
        { value: "ETH", label: <div>ETH</div> },
        { value: "USDT", label: <div>"USDT"</div> },
    ];

    return (
        <div className="swapForm">
            <Grid container>
                <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
                    style={{
                        padding: 10,
                        position: "relative",
                    }}
                >
                    <Dropdown
                        className="x-font3 bridge-dropdown"
                        options={options}
                        onChange={handleTokenChange}
                        value={token}
                        disabled={!active}
                    />
                </Grid>
                <Grid
                    item
                    xs={5}
                    sm={5}
                    md={6}
                    style={{
                        padding: 20,
                    }}
                    className="medium-value"
                >
                    {sort === "etc" && (
                        <input
                            type="number"
                            step={0.1}
                            className="x-stakeCard-input"
                            placeholder="0.1"
                            onChange={handleAmount}
                            value = {styledAmount}
                        />
                    )}
                    {sort === "optional" && (
                        <input
                            type="number"
                            step={0.1}
                            className="x-stakeCard-input"
                            placeholder="10500"
                            onChange={handleAmount}
                            value = {styledAmount}
                        />
                    )}
                </Grid>
                <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    style={{
                        padding: 20,
                    }}
                >
                    {sort === "etc" && <img src={eth_icon} alt="eth" />}
                    {sort === "optional" && <img src={icicb_icon} alt="eth" />}
                </Grid>
            </Grid>
            <span style={{ color: "white", marginLeft: 10 }}></span>
        </div>
    );
}

export default SwapForm;
