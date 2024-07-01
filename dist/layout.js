export class Grid {
    constructor(width, heigth, dots) {
        this.grid = [
            '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
            '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
            '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
            '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
            '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
            '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
            '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',
        ];
        this.fill = ".";
        this.grid_width = width;
        this.grid_height = heigth;
        // fill with dots
        if (dots)
            this.fill = ".";
        else
            this.fill = " ";
        for (let i = 0; i < this.grid_width * this.grid_height; i++) {
            this.grid[i] = this.fill;
        }
    }
    // draw rectangle
    //for(let l = 0; l < grid_width*height; l+=grid_width) {
    //    for(let i = 0; i < width; i++) { grid[l+start+i]="*" }
    //}
    drawRectangle(pos_x, pos_y, width, height) {
        let start = pos_y * this.grid_width + pos_x;
        for (let l = 0; l < this.grid_width * height; l += this.grid_width) {
            for (let i = 0; i < width; i++) {
                this.grid[l + start + i] = "*";
            }
        }
    }
    /*drawTextRectangle(pos_x, pos_y, width, height, text) {
        //let text = "text text text ";
        let t = 0;
        let start = pos_y * this.grid_width + pos_x;
        for (let l = 0; l < this.grid_width * height; l += this.grid_width) {
            //for(let i = 0; i < width; i++) { this.grid[l+start+i]=text[(t) % text.length]; t++; } // text repeat
            for (let i = 0; i < width; i++) {
                if(text[(t)] == "\n") { t++; break; }
                else {
                if (t >= text.length)
                    this.grid[l + start + i] = i;//this.fill;
                else
                    this.grid[l + start + i] = i; //text[(t)];
                }
                t++;
            }
        }
    }*/
    drawTextRectangle(pos_x, pos_y, width, height, text) {
        //let text = "text text text ";
        //console.log: '${text}'`)
        let t = 0;
        let start = pos_y * this.grid_width + pos_x;
        for (let l = 0; l < height; l++) {
            //for(let i = 0; i < width; i++) { this.grid[l+start+i]=text[(t) % text.length]; t++; } // text repeat
            for (let i = 0; i < width; i++) {
                if (text[(t)] == "\n") {
                    t++;
                    break;
                }
                else {
                    if (t >= text.length)
                        this.grid[l * this.grid_width + start + i] = this.fill;
                    else {
                        if (text[(t)] == "\t")
                            this.grid[l * this.grid_width + start + i] = this.fill; // Steuerbefehle
                        else
                            this.grid[l * this.grid_width + start + i] = text[(t)];
                    }
                }
                t++;
            }
        }
        //console.log(this.grid.length);
    }
    draw() {
        let grid_str = "";
        for (let i = 0; i < this.grid_width * this.grid_height; i++) {
            if (this.grid[i] == "\n")
                console.log("newline");
            grid_str += this.grid[i];
            if ((i + 1) % this.grid_width == 0)
                grid_str += "\n";
        }
        if (grid_str[grid_str.length - 1] == "\n")
            grid_str = grid_str.substring(0, grid_str.length - 2);
        console.log(grid_str);
    }
}
// grid should be newline free
// grid length should be the same after adding objects
