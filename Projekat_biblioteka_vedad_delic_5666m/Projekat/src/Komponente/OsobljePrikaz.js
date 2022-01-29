import React, {useEffect, useState} from "react";
import {Button, ListItem, ListItemText, TextField} from "@material-ui/core";
import {db} from "../Baza/firebase_config";
import firebase from "firebase";

/**
 * Komponenta prikaz dashboard- a osoblja biblioteke
 * @param {string} todo
 * @param {boolean} inprogress informacija o dostupnosti knjige
 * @param {string} naziv naziv knjige
 * @param {string} index index studenta koji zeli iznajmiti knjigu
 * @param {id} id id knjige
 *
 * @returns {Object} knjige i info o zauzeću
 * */


export default function ToDoList({todo, inprogress, id, naziv, index}){


        function promijeniGotovo(){
            db.collection("Todo").doc(id).update({
                inprogress: ! inprogress,
                index: ''

            })
        }
    /**
     * Funkcija za brisanje knjige iz baze
     * */
        function obrisi(){
            db.collection("Todo").doc(id).delete();
            console.log("pozvao brisanje")
        }
    /**
     * Postavljanje kuka
     * */
    const [todoUpdate, setTodoUpdate] = useState("")
    const [nazivUpdate, setNazivUpdate] = useState("")
    const [indexUpdate, setIndexUpdate] = useState("")
    /**
     * Funkcija za azuriranje knjiga u bazi
     * */

    function updateTodo(e) {
        e.preventDefault()
        console.log("pokusavas kliknuti")
        db.collection("Todo").doc(id).update({
            todo: todoUpdate,
            naziv: nazivUpdate


        })
        //setTodoInput("")
    }


    /**
     * Funkcija za iznajmljivanje knjiga studentu, trazi unos indexa
     * */
    function iznajmi(e) {
        e.preventDefault()
        console.log("pokusavas kliknuti")
        db.collection("Todo").doc(id).update({
            index: indexUpdate,
            inprogress: false

        })
        //setTodoInput("")
    }

    /**
     * Prikaz dashboard-a za osoblje
     * */
    return(
        <div >
<card> </card>
            <ListItem>
                <ListItemText primary={todo} secondary={inprogress ? "učini dostupno" : "nije dostupno"}></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText primary={naziv} secondary={id}></ListItemText>
            </ListItem>
            <form>
                <TextField placeholder={todo} onChange={(e) =>
                {setTodoUpdate(e.target.value)
                    // eslint-disable-next-line no-template-curly-in-string
                    console.log(`ovo ste upisali: ${e.target.value}`)}}/>
                <TextField placeholder={naziv} onChange={(e) =>
                {setNazivUpdate(e.target.value)
                    // eslint-disable-next-line no-template-curly-in-string
                    console.log(`ovo ste upisali: ${e.target.value}`)}}/>
                <Button color="primary" onClick={updateTodo}>Promijeni</Button>

            </form>


            <form>
                <label>Index studenta: </label>
                <TextField placeholder={index} onChange={(e) =>
                {setIndexUpdate(e.target.value)
                    // eslint-disable-next-line no-template-curly-in-string
                    console.log(`ovo ste upisali: ${e.target.value}`)}}/>
                <Button color="primary" onClick={iznajmi}>Iznajmi</Button>

            </form>


            <Button variant="contained" color="primary" onClick={promijeniGotovo}>{inprogress ? "nije dostupno" : "dostupno"}</Button>
            <Button variant="contained" color="secondary" onClick={obrisi}> Ukloni</Button>



        </div>
    )



}