import React, {useEffect, useState} from "react";
import {Button, ListItem, ListItemText, TextField} from "@material-ui/core";
import {db} from "../Baza/firebase_config";
import firebase from "firebase";
/**
 * Komponenta prikaz dashboard- a studentima
 * @param {string} todo
 * @param {boolean} inprogress informacija o dostupnosti knjige
 * @param {string} naziv naziv knjige
 * @param {string} index index studenta koji zeli iznajmiti knjigu
 * @param {id} id id knjige
 *
 * @returns {Object} knjige i info o zauzeću
 * */

export default function ToDoListe({todo, inprogress, id, naziv, index}){


    /**
     * Postavljanje kuka za unos i cuvanje podataka
     * */
    const [todoUpdate, setTodoUpdate] = useState("")
    const [nazivUpdate, setNazivUpdate] = useState("")
    const [indexUpdate, setIndexUpdate] = useState("")


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
     * Funkcija za prikaz najam/ rezervaciju knjige
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
     * Prikaz dashboard-a
     * */
    return(
        <div >
<card> </card>
            <ListItem>
                <ListItemText primary={todo} secondary={inprogress ? "dostupno" : "nije dostupno"}></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText primary={naziv} secondary={id}></ListItemText>
            </ListItem>



            <form>
                <label>Index studenta: </label>
                <TextField placeholder={index} onChange={(e) =>
                {setIndexUpdate(e.target.value)
                    // eslint-disable-next-line no-template-curly-in-string
                    console.log(`ovo ste upisali: ${e.target.value}`)}}/>
                <Button color="primary" onClick={iznajmi}>Iznajmi/ rezervisi</Button>

            </form>





        </div>
    )



}