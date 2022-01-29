import './Komponente/css/App.css';
import {Button, Table, TableCell, TableHead, TableRow, TextField} from "@material-ui/core";
import React, {Component, useEffect, useState} from "react";
import {db} from "./Baza/firebase_config";
import firebase from "firebase";
import ToDoList from "./Komponente/OsobljePrikaz";
import ToDoBroj from "./Komponente/Brojac";
import ToDoListe from "./Komponente/StudentPrikaz";
import ContactUs from "./Komponente/contactForm";
import Artikli from "./Komponente/ArtikliPrikaz";


/**
 * Komponenta glavnog prikaza aplikacije. Cilj aplikacije je napraviti centralni univerzitetski sistem za biblioteku odnosno za:
 * najam, rezervaciju, usnos i brisanje knjiga.
 * Program se može instalirati na računaru osoblja, koje ima potpuni uvid i sve funkcionalnosti, ali također se može
 * instalirati i na više računara u biblioteci kako bi studenti samostalno mogli provjeeriti dostupnost knjige i izvršiti
 * njenu rezervaciju.
 * @param {string} todos  nazivi knjiga
 *
 * @returns {Object} knjige i info o zauzeću
 * */


function App() {
    /**
     * Postavljanje kuka
     *
     * @param {string} todos
     * @param {string} todoInput  nazivi knjiga
     * @param {string} indexInput  unos indexa
     * @param {string} student  Prikaz studenta ili admin panela
     * @returns {Object}
     *
     * */
    const [todos, setTodos] = useState([])
    const [todoInput, setTodoInput] = useState("")
    const [indexInput, setIndexInput] = useState("")
    const [nazivInput, setNazivInput] = useState("")
    const [student, setStudent] = useState(0)


    const [artikli, setArtikli] = useState()

    const [nazivArtikkla, setNazivArtikla] = useState()
    const [cijena, setCijena] = useState()
    const [kolicina, setKolicina] = useState()




    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)





    /**
     * Postavljanje useEffect kuka, za automatsko azuriranje
     * */
    useEffect(() =>{
        getTodos()
    }, [])
    useEffect(() =>{
        getArtikli()
    }, [])
    useEffect(() =>{
        getTodosIznajmljene()
    }, [])
    useEffect(() =>{
        getTodosSlobodne()
    }, [])
    useEffect(() =>{
        studentMode()
    }, [])
    function studentMode(){
        //setStudent(1)
        if(student == 1 )
            setStudent(0)
        else
            setStudent(0)



            console.log("Student da ne" + student)

    }
   /**
    * Fja nova za artikle*/
   function getArtikli(){
       db.collection("Artikli").onSnapshot(function (querySnapshot){
           setArtikli(
               querySnapshot.docs.map((doc)=>({
                   id:doc.id,
                   cijena: doc.data().cijena,
                   kolicina: doc.data().kolicina,
                   naziv: doc.data().naziv,
                   popust: doc.data().popust,
                   radnja1: doc.data().radnja1,
                   radnja2: doc.data().radnja2,
                   radnja3: doc.data().radnja3,
                   skladiste: doc.data().skladiste


               })))
       })
       setStudent(1)
   }

    function addArtikal(e){
        e.preventDefault()
        console.log("pokusavas kliknuti")
        db.collection("Artikli").add({
            cijena: cijena,
            naziv: nazivArtikkla,
            skladiste: kolicina,
            radnja1: 0,
            radnja2: 0,
            radnja3: 0,
            kolicina: kolicina,
            popust: 1

        })
        setKolicina(0)
        setNazivArtikla("")
        setCijena(0)
    }
    /**
     * Funkcija, za uzimanje svih knjiga iz baze pomocu onSnapshot kreiranja upita
     *
     * */
    function getTodos(){
        db.collection("Todo").onSnapshot(function (querySnapshot){
            setTodos(
                querySnapshot.docs.map((doc)=>({
                    id:doc.id,
                    todo: doc.data().todo,
                    ime: doc.data().naziv,
                    inprogress: doc.data().inprogress,
                    index: doc.data().index

                })))
        })
    }
    /**
     * Funkcija, za uzimanje iznajmljenih knjiga iz baze pomocu onSnapshot kreiranja upita
     * */

    function getTodosIznajmljene(){
        db.collection("Todo").where("inprogress","==", false).onSnapshot(function (querySnapshot){
            setTodos(
                querySnapshot.docs.map((doc)=>({
                    id:doc.id,
                    todo: doc.data().todo,
                    ime: doc.data().naziv,
                    inprogress: doc.data().inprogress,
                    index: doc.data().index

                })))
        })
    }
    /**
     * Funkcija, za uzimanje slobodnih knjiga iz baze pomocu onSnapshot kreiranja upita
     * */
    function getTodosSlobodne(){
        db.collection("Todo").where("inprogress","==", true).onSnapshot(function (querySnapshot){
            setTodos(
                querySnapshot.docs.map((doc)=>({
                    id:doc.id,
                    todo: doc.data().todo,
                    ime: doc.data().naziv,
                    inprogress: doc.data().inprogress,
                    index: doc.data().index

                })))
        })
    }
    /**
     * Funkcija, za pretragu iznajmljene knjige po indexu studenta
     * */
    function traziIndex(){
        db.collection("Todo").where("index","==", indexInput).onSnapshot(function (querySnapshot){
            setTodos(
                querySnapshot.docs.map((doc)=>({
                    id:doc.id,
                    todo: doc.data().todo,
                    ime: doc.data().naziv,
                    inprogress: doc.data().inprogress,
                    index: doc.data().index

                })))
        })
    }


    /**
     * Funkcija, za dodavanje novih knjiga u bazu
     * */
    function addTodo(e){
        e.preventDefault()
        console.log("pokusavas kliknuti")
        db.collection("Todo").add({
            inprogress: true,
            // eslint-disable-next-line no-undef
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            todo: todoInput,
            naziv: nazivInput,
            index: ""

        })
        setTodoInput("")
    }


    /**
     * Prikaz dashboarda za osoblje, po defaultnoj vrijednosti
     * */
    if (student==0 ){
    return (
        <div className="App">
            <header className="App-header">
                Centralni bibliotekarsi sistem Univerziteta
            </header>
            <div>
                <img src="https://www.unsa.ba//themes/unsa/images/logo.jpg"  width="90" height="60"/>
            </div>

            <label className="Naslov">Dodaj novi naslov u biblioteku</label>
            <form>
                <TextField id="standard-basic" label="Autor" onChange={(e) =>
                {setTodoInput(e.target.value)

                    // eslint-disable-next-line no-template-curly-in-string
                    console.log(`ovo ste upisali: ${e.target.value}`)}}/>

                <TextField id="standard-basic" label="Naziv" onChange={(e) =>
                {setNazivInput(e.target.value)

                    // eslint-disable-next-line no-template-curly-in-string
                    console.log(`ovo ste upisali: ${e.target.value}`)}}/>


                <Button color="primary" onClick={addTodo}>Dodaj</Button>

            </form>


            <form>
                <TextField id="standard-basic" label="Pretraga po indexu" onChange={(e) =>
                {setIndexInput(e.target.value)

                    // eslint-disable-next-line no-template-curly-in-string
                    console.log(`ovo ste upisali: ${e.target.value}`)}}/>

                <Button color="primary" onClick={traziIndex}>Trazi</Button>

            </form>
            <div> <br/> </div>





            <Button variant="outlined" color="secondary" onClick={getTodosIznajmljene}>PRIKAŽI ZAUZETE</Button>
            <Button variant="outlined" color="disabled" onClick={getTodos}>PRIKAŽI SVE</Button>
            <Button variant="outlined" color="primary" onClick={getTodosSlobodne}>PRIKAŽI SLOBODNE</Button>


            <Button variant="outlined" color="primary" onClick={studentMode}>Studentski prikaz</Button>
            <Button variant="outlined" color="primary" onClick={getArtikli}>Artikli</Button>


            {todos.map((todo)=>(
                <ToDoList index={todo.index} todo={todo.todo} inprogress={todo.inprogress} id={todo.id} naziv={todo.ime}></ToDoList>
            ))}


            <ToDoBroj></ToDoBroj>
        </div>




    );}
    /**
     * Pozivanje Todoo prikaza dashboarda za studente, Moguce pristupiti jedino klikom na dugme
     * */
  else if(student==2){
    return (
        /*Standardni html/js kod*/
        <div className="App1">
            <header className="App-header">
                Centralni bibliotekarsi sistem Univerziteta - Studetski prikaz
            </header>
            <div>
                <img src="https://www.unsa.ba//themes/unsa/images/logo.jpg"  width="90" height="60"/>
            </div>


            <form>
                <TextField id="standard-basic" label="Pretraga po indexu" onChange={(e) =>
                {setIndexInput(e.target.value)

                    // eslint-disable-next-line no-template-curly-in-string
                    console.log(`ovo ste upisali: ${e.target.value}`)}}/>

                <Button color="primary" onClick={traziIndex}>Trazi</Button>

            </form>
            <div> <br/> </div>






            <Button variant="outlined" color="primary" onClick={getTodosSlobodne}>PRIKAŽI SLOBODNE</Button>



            {todos.map((todo)=>(
                <ToDoListe index={todo.index} todo={todo.todo} inprogress={todo.inprogress} id={todo.id} naziv={todo.ime}></ToDoListe>
            ))}
            <div><br/><br/></div>
            <Button variant="outlined" color="primary" onClick={studentMode}>Admin prikaz</Button>
            <div> <br/> </div>
            <div> <br/> </div>


            <ContactUs></ContactUs>


        </div>




    );}
  else if(student == 1){

        return (
            <div>
                <form>
                    <TextField id="standard-basic" label="Naziv" onChange={(e) =>
                    {setNazivArtikla(e.target.value)

                        // eslint-disable-next-line no-template-curly-in-string
                        console.log(`ovo ste upisali: ${e.target.value}`)}}/>
                    <TextField id="standard-basic" label="Cijena" onChange={(e) =>
                    {setCijena(parseInt(e.target.value))

                        // eslint-disable-next-line no-template-curly-in-string
                        console.log(`ovo ste upisali: ${e.target.value}`)}}/>
                    <TextField id="standard-basic" label="Kolicina" onChange={(e) =>
                    {setKolicina(parseInt(e.target.value))

                        // eslint-disable-next-line no-template-curly-in-string
                        console.log(`ovo ste upisali: ${e.target.value}`)}}/>

                    <Button color="primary" onClick={addArtikal}>Dodaj</Button>

                </form>
            <Table>
                <br/>
                <TableHead>
                    <TableRow>
                        <TableCell style={{width:'12%'}}>naziv</TableCell>
                        <TableCell align="right" style={{width:'10%'}}>cijena</TableCell>
                        <TableCell align="right" style={{width:'10%'}}>radnja1</TableCell>
                        <TableCell align="right" style={{width:'10%'}}>radnja2</TableCell>
                        <TableCell align="right" style={{width:'10%'}}>radnja3</TableCell>
                        <TableCell align="right" style={{width:'10%'}}>skladiste</TableCell>
                        <TableCell align="right" style={{width:'10%'}}>popust</TableCell>
                        <TableCell align="right" style={{width:'10%'}}>Cijena sa popustom</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
                {       console.log("velicina: " + artikli.length)
                }


                {artikli.map((todo)=>(
                    <Artikli id={todo.id} cijena={todo.cijena} kolicina={todo.kolicina} naziv={todo.naziv} popust={todo.popust} radnja1={todo.radnja1} radnja2={todo.radnja2} radnja3={todo.radnja3} skladiste={todo.skladiste} duzina_liste={artikli.length}></Artikli>
                ))}


                <ToDoBroj></ToDoBroj>
            </div>




        );}


}

export default App;
