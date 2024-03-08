import {describe, expect, test} from '@jest/globals';
import { Feld } from '../dist/feld.js';
import { Tor } from '../dist/tor.js'
import { Position } from '../dist/position.js'

describe('Fussball', () => {
    beforeEach(()=>{
        // Fußballfeld erzeugen
    });

    describe('Tor', () => {
        it('should detect tor event', () => {
            // schauen ob es ein Tor gibt
            let feld = new Feld();

            console.log(feld.feld_length);
            let tor = new Tor();
            //console.log(`${feld.feld_length-2} ${feld.feld_height/2}`);
            expect(tor.contains(feld, new Position(feld.feld_length-2,feld.feld_height/2))).toBeTruthy();
        })
    })
})