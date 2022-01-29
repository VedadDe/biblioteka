import React, {useEffect, useState} from "react";
import {Button, ListItem, ListItemText, Table, TableCell, TableHead, TableRow, TextField, TableBody} from "@material-ui/core";
import {db} from "../Baza/firebase_config";
import firebase from "firebase";


export default function Artikli({id, cijena, kolicina, naziv, popust, radnja1, radnja2, radnja3, skladiste, duzina_liste}){

    const radnja = parseInt(1)
    const hitno = false;
    const email = "daasda@gmail.com";
    const telefon = "062 222 222"
    const imePrezime = "Ime Prezime"
    const napomena = "napomena";

    cijena=parseFloat(cijena)
    kolicina=parseInt(kolicina)
    popust=parseFloat(popust)
    radnja1=parseInt(radnja1)
    radnja2=parseInt(radnja2)
    radnja3=parseInt(radnja3)
    skladiste=parseInt(skladiste)
    duzina_liste=parseInt(duzina_liste)
    popust=1-popust;


    let cijenaNakonPopusta;
    cijenaNakonPopusta = cijena-(1-popust)*cijena;
    if(popust==0){
        cijenaNakonPopusta = cijena

    }else {popust=1-popust}

    let radnjaNovo=radnja1-1;

    function naruci(e){
        e.preventDefault()
        console.log("narucujem sa id: " + id)
        db.collection("Narudzba").add({
            naziv: naziv,
            radnja: radnja,
            popust: (popust).toFixed(2)*100,
            platiti: cijenaNakonPopusta,
            cijenaPrijePopusta: cijena,
            gotovo: false,
            datum: firebase.firestore.FieldValue.serverTimestamp(),
            hitno: hitno,
            ime: imePrezime,
            email: email,
            telefon: telefon,
            napomena: napomena

        })
        db.collection("Artikli").doc(id).update({
            radnja1: radnjaNovo
        })
    }
    return(
        <div >
<card> </card>
            <Table>
                <TableBody>
                    <TableCell component="th" scope="row">
                        <Button onClick={naruci}>{naziv}</Button>
                    </TableCell>

                    <TableCell align="left" style={{width:'12%'}}>{cijena}</TableCell>
                    <TableCell align="left" style={{width:'15%'}}>{radnja1}</TableCell>
                    <TableCell align="left" style={{width:'11%'}}>{radnja2}</TableCell>
                    <TableCell align="left" style={{width:'10%'}}>{radnja3}</TableCell>
                    <TableCell align="left" style={{width:'10%'}}>{skladiste}</TableCell>
                    <TableCell align="center" style={{width:'10%'}}>{(popust).toFixed(2)*100} %</TableCell>
                    <TableCell align="right" style={{width:'10%'}}>{cijenaNakonPopusta}</TableCell>

                </TableBody>

            </Table>


        </div>
    )



}