import {describe, expect, test} from '@jest/globals';
import { Feld } from '../feld';

describe('Fussball', () => {
    beforeEach(()=>{
        // Fußballfeld erzeugen
    });

    describe('Tor', () => {
        it('should detect tor event', () => {
            // schauen ob es ein Tor gibt
            let feld = new Feld();
            feld.setPositionOnBoard("x", feld.feld_length - 4, 8);
            feld.setPositionOnBoard("x", feld.feld_length - 4, 9);
            feld.setPositionOnBoard("x", feld.feld_length - 4, 10);
            feld.setPositionOnBoard("x", feld.feld_length - 4, 11);
            feld.setPositionOnBoard("x", feld.feld_length - 4, 12);
            console.log(feld.feld);
            expect(false).toBe(true);
        })
    })
})