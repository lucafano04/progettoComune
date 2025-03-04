type Richiesta = {
    oggetto: string,
    testo: string,
    dataOra: Date,
    risposte: Richiesta[];
}

export default Richiesta;