import emailjs from "emailjs-com";
import React from 'react';
import {Button, TextareaAutosize, TextField} from "@material-ui/core";
/**
 * Komponenta kontakt forme
 *
 * @returns {emailjs} sljanje povratne poruke na e-mail
 * */

export default function ContactUs() {
    /**
     * Funkcija koja salje e-mail
     * */
    function sendEmail(e) {
        e.preventDefault();
        /**
         * Spajanje na servis slanja sa podacima
         * */
        emailjs.sendForm('service_25nmqxm', 'template_x864q36', e.target, 'user_d7D9fE6n7JYMGnlOJFyKK')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    }
    /**
     * Prikaz forme za unos podataka
     * */
    return(
        <div>
            <h2>Zahtjeve unesite ovdje:</h2>
            <div className="container">
                <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                            <TextField type="text" className="form-control" placeholder="Index/id" name="name"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <TextField type="email" className="form-control" placeholder="Email adresa" name="email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <TextField type="text" className="form-control" placeholder="Naslov rada" name="subject"/>
                        </div>
                        <div> <br/> </div>
                        <div> <br/> </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <TextareaAutosize className="form-control" id="" cols="30" rows="8" placeholder="Dodatna poruka" name="message"></TextareaAutosize>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <Button variant="contained" color="primary" type="submit" className="btn btn-info" value="Pošalji">Pošalji</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}