import { Dati } from "../../types";

async function getInfoGenerali(): Promise<Dati.DatiGenericiCitta>{
    const response = await fetch(`/api/v1/generalInfo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.status !== 200)
        throw new Error((await response.json()).details);
    const data = await response.json();
    return data as Dati.DatiGenericiCitta;
}

/**
 * Restituisce il gradiente di colore a partire da rosso-giallo-verde in base alla soddisfazione
 * @param {float} soddisfazione la soddisfazione da cui ricavare il colore (1-5) + 0 se non sono presenti dati
 * @param {boolean} toGrey se true restituisce il colore in scala di grigio 
 * @returns il colore da assegnare
 */
function getColorFromSoddisfazione(soddisfazione: number, toGrey: boolean = false): string{
    if(soddisfazione === 0){
        if(toGrey)
            return '#a0a0a0';
        return '#000000';
    }
    let red, green;
    if(soddisfazione <= 1.5){ // Red to orange
        red = 255;
        green = ((soddisfazione-1)/0.5)*127;
    }else if(soddisfazione <= 2.5) { // Orange to yellow
        red = 255;
        green = 128+((soddisfazione-1.5)/1)*127;
    }else if(soddisfazione <= 3.5) { // Yellow to green-yellow
        red = 255-((soddisfazione-2.5)/1)*255;
        green = 255;
    }else { // Green-yellow to green
        red = 0;
        green = ((soddisfazione-3.5)/1.5)*255;
    }
    red = Math.round(red);
    green = Math.round(green);
    // console.log(soddisfazione, toGrey,  toGrey ? `#${(red*0.8).toString(16).split('.')[0].padStart(2, '0')}${(green*0.8).toString(16).split('.')[0].padStart(2, '0')}00` : `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}00`);
    return toGrey ? `#${(red*0.8).toString(16).split('.')[0].padStart(2, '0')}${(green*0.8).toString(16).split('.')[0].padStart(2, '0')}00` : `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}00`;

    // return toGrey ? `rgb(${red*0.8},${green*0.8},${0})` : `rgb(${red},${green},0)`;
}

const misc = {
    getInfoGenerali,
    getColorFromSoddisfazione
}

export default misc;
export {
    getInfoGenerali,
    getColorFromSoddisfazione
}