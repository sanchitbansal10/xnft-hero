import React, { useEffect, useState } from "react";
import { getOdds, getSports } from "../lib/api";
import { getMarketDataFromOddsResponse } from "../lib/utils";
import Table from 'react-bootstrap/Table';
import { View, Text, Button, TextInput } from "react-native";
import * as sdk from "@hxronetwork/parimutuelsdk";
import PlacePosition from "../components/PlacePosition";
import NumberInput from "../components/AmountInput";



export function SportOdds({ pariObj, parimutuelWeb3 }) {
    const [oddsToShow, setOddsToShow] = useState(null)
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        getOdds('soccer_epl')
            .then(data => {
                setOddsToShow(getMarketDataFromOddsResponse(data))
            })
        // getSports()
    }, [])
    if (oddsToShow && pariObj) {
        console.log({ oddsToShow })
        console.log({ pariObj })
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Match</th>
                            <th>Home</th>
                            <th>Home Lay</th>
                            <th>Draw</th>
                            <th>Draw Lay</th>
                            <th>Away</th>
                            <th>Away Lay</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{oddsToShow.homeTeam} vs {oddsToShow.awayTeam}</td>
                            <td>{oddsToShow.odds[0].price}</td>
                            <td>{oddsToShow.odds[0].price - 0.08}</td>
                            <td>{oddsToShow.odds[2].price}</td>
                            <td>{oddsToShow.odds[2].price - 0.07}</td>
                            <td>{oddsToShow.odds[1].price}</td>
                            <td>{oddsToShow.odds[1].price - 0.09}</td>
                        </tr>

                        <tr>
                            <td> Better at half time <NumberInput onChange={setAmount} /></td>
                            <td>
                                <Button
                                    color="green"
                                    title={pariObj.longOdds}
                                    onPress={() => {
                                        PlacePosition(
                                            parimutuelWeb3,
                                            pariObj?.pubkey,
                                            amount.toString(),
                                            sdk.PositionSideEnum.LONG
                                        );
                                        console.log(`Entered ${amount} USDC LONG position!`)
                                    }}
                                />
                            </td>
                            <td>
                                <Button
                                    title={pariObj.shortOdds}
                                    color="red"
                                    onPress={() => {
                                        PlacePosition(
                                            parimutuelWeb3,
                                            pariObj?.pubkey,
                                            amount.toString(),
                                            sdk.PositionSideEnum.SHORT
                                        );
                                        console.log(`Entered ${amount} USDC SHORT position!`)
                                    }}
                                /></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
    return (
        null
    );
}
