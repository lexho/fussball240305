//import { readFileSync } from 'fs';
import { Position } from './position.js';
import { Rectangle } from './rectangle.js';
export class Feld {
    constructor() {
        this.feld0 = `                                                                                       
                                                                                       
  ###################################################################################  
  #                                        #                                        #  
  #                                        #                                        #  
  ##############                           #                           ##############  
  #            #                           #                           #            #  
  ######       #                           #                           #       ######  
  #    #       #                         #####                         #       #    #  
  #    #       #                        #  #  #                        #       #    #  
  #    #       #                       #   #   #                       #       #    #  
  #    #       #                        #  #  #                        #       #    #  
  #    #       #                         #####                         #       #    #  
  ######       #                           #                           #       ######  
  #            #                           #                           #            #  
  ##############                           #                           ##############  
  #                                        #                                        #  
  #                                        #                                        #  
  ###################################################################################  
                                                                                       
                                                                                       `;
        this.feld_length = 88;
        this.feld_height = 20;
        /*try {
            const data = readFileSync('./feld.txt', 'utf-8');
            //console.log(data);
            //this.feld0 = data;
        } catch (err) {
            console.log(err);
        }*/
        this.feld = this.feld0;
    }
    get(p) {
        return this.feld[p];
    }
    setPositionOnBoard(sign, x, y) {
        //console.log("set position on board")
        // sign '*'
        // x Spalten
        // y Reihen
        // p
        let p = y * this.feld_length + x;
        let feld1 = "";
        for (let i = 0; i < this.feld.length; i++) {
            if (i == p)
                feld1 = feld1.concat(sign);
            else
                feld1 = feld1.concat(this.feld[i]);
        }
        //console.log(feld1);
        //return feld1;
        this.feld = feld1;
        //this.feld[p] = sign;
    }
    getInitial(p) {
        return this.feld0[p];
    }
    isOnBoard(pos) {
        if (pos.x > 0 && pos.y > 0 && pos.x < this.feld_length && pos.y < this.feld_height)
            return true;
    }
    isOut(pos) {
        //console.log("isOut?");
        let pos_corrected = new Position(pos.x - 2, pos.y - 2);
        //console.log(`position corrected: ${pos.x-2}/${pos.y-2}`)
        //console.log(`länge: ${this.feld_length} breite: ${this.feld_height}`);
        let rectangle = new Rectangle(this.feld_length - 4, this.feld_height - 4);
        return rectangle.ausserhalb(pos_corrected);
        // borders
        /*this.feld_length - 4 // torlinie
        this.feld_length - 3 // out rechts
        0 + 1 // out links
        0 + 1// out oben
        this.feld_height - 3// out unten
        /*for(let yy = 2; yy < this.feld_height - 4; yy++) {
            this.setPositionOnBoard('x', this.feld_length - 4,yy);
        }
        for(let yy = 2; yy < this.feld_height - 4; yy++) {
            this.setPositionOnBoard('x', 0,yy);
        }
        for(let xx = ; xx < this.feld_length - 4; xx++) {
            this.setPositionOnBoard('x', xx, this.feld_length - 4);
        }*/
        /*
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            x                            x
            x                            x
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        */
        /*if(((pos.x > this.feld_length - 4 && pos.y >= 0) &&  // oben
            (pos.x > this.feld_length - 4 && pos.y < this.feld_length)) || // oben
            ((pos.x >= 0 && pos.y > this.feld_height - 4) && // unten
            (pos.x < this.feld_height && pos.y > this.feld_height - 4))    // unten
        )
            return true;
        else return false;*/
    }
    isFree(pos) {
        let p = pos.y * this.feld_length + pos.x;
        //console.log(`p: ${p} feld frei?: ${this.feld[p]}`)
        return (this.feld[p] == ' ' || this.feld[p] == '#') && this.feld[p] != 'o';
    }
}
