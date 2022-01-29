import React, {useEffect, useState} from "react";
import {db} from "../Baza/firebase_config";
import {ListItem, ListItemText} from "@material-ui/core";

/**
 * Komponenta koja prikazuje broj knjiga
 *
 * @param {number} id  Id knjige
 * @param {boolean} inprogress Boolean da li je knjiga na čiatnju
 * @param {string} todo Naziv knjige
 * @returns {Object} Objekat brojač
 * */
export default function ToDoBroj({todo, inprogress, id}){
    const [broj, setBroj] = useState(0)
    const [NijeObradio, setNijeObradio] = useState(0)
    const [Obradio, setObradio] = useState(0)

    useEffect(() =>{
        dajBroj()
    }, [])

    useEffect(() =>{
        dajGotove()
    }, [])
    useEffect(() =>{
        dajNeGotove()
    }, [])

    /** 
     * Vraćanje broja knjiga ukupno
     * */
    function dajBroj(){
        db.collection('Todo').get().then(snapshot => {
            // eslint-disable-next-line no-restricted-globals
            length = snapshot.size;
            // eslint-disable-next-line no-restricted-globals
            setBroj(length)
            // eslint-disable-next-line no-restricted-globals
            console.log(`broj je ${length}`)
        })
    }
    /**
     * Funkcija koja vraća broj knjiga slobodnih
     * */
    function dajGotove(){
        db.collection('Todo').where("inprogress", "==", true).get().then(snapshot => {
            // eslint-disable-next-line no-restricted-globals
            length = snapshot.size;
            // eslint-disable-next-line no-restricted-globals
            setNijeObradio(length)
            // eslint-disable-next-line no-restricted-globals
            console.log(`broj je neobrađenih ${length}`)
        })

    }
    /**
     * Funkcija koja vraća broj knjiga na čitanju
     * */
    function dajNeGotove(){
        db.collection('Todo').where("inprogress", "==", false).get().then(snapshot => {
            // eslint-disable-next-line no-restricted-globals
            length = snapshot.size;
            // eslint-disable-next-line no-restricted-globals
            setObradio(length)
            // eslint-disable-next-line no-restricted-globals
            console.log(`broj je nobrađenih ${length}`)
        })

    }
    /**
     * Prikaz broja knjiga
     * */
    return(
        <div>

            <h4>Ukupan broj knjiga u bazi: {broj}</h4>
            <h4>Broj slobodnih knjiga: {NijeObradio}</h4>
            <h4>Broj knjiga na čitanju: {Obradio}</h4>

        </div>
    )



}