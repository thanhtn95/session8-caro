const unmark = 0;
const markX = 1;
const markO = 2;

function cell(x, y) {
    this.x = x;
    this.y = y;
    this.value = unmark;

    this.getCode = function () {
        let text = '<div class="cell" id="' + x + '-' + y + '"onclick="change(' + x + ',' + y + ')"></div>';
        return text;
    }

    this.draw = function () {
        let selectedCell = document.getElementById(x + '-' + y);
        switch (this.value) {
            case 1:
                selectedCell.innerHTML = "X";
                break;
            case 2:
                selectedCell.innerHTML = "O"
                break;
            default:
                selectedCell.innerHTML = "";
        }
    }
}

function board(row, col, elementId) {
    this.row = row;
    this.col = col;
    this.id = elementId;
    this.turn = markX;
    this.cells = [];
    this.flag = false;

    this.draw = function () {
        let board = document.getElementById(this.id);
        board.innerHTML = "";
        for (let i = 0; i < this.row; i++) {
            let rows = [];
            this.cells.push(rows);
            for (let j = 0; j < this.col; j++) {
                let tmp = new cell(i, j);
                rows.push(tmp);
                board.innerHTML += tmp.getCode();
            }
        }
    }
    this.play = function (x, y) {
        if (this.flag) {
            return;
        } else {
            let selected = this.cells[x][y];
            if (selected.value == unmark) {
                selected.value = this.turn;
                selected.draw();
                this.check(x, y);
                if (this.turn == markX) {
                    this.turn = markO;
                } else this.turn = markX;
            }
        }
    }

    this.check = function (x, y) {
        let selected = this.cells[x][y];
        let count = 1;
        let flag = false;
        for (let i = y + 1; i < this.col; i++) {
            if (this.cells[x][i].value == selected.value) {
                count++;
            } else break;
        }
        for (let i = y - 1; i >= 0; i--) {
            if (this.cells[x][i].value == selected.value) {
                count++;
            } else break;
        }
        this.gameOver(selected.value, count);

        count = 1;
        for (let i = x + 1; i < this.row; i++) {
            if (this.cells[i][y].value == selected.value) {
                count++;
            } else break;
        }
        for (let i = x - 1; i >= 0; i--) {
            if (this.cells[i][y].value == selected.value) {
                count++;
            } else break;
        }
        this.gameOver(selected.value, count);
        count = 1;
        let tmpx = x;
        let tmpy = y;
        while (tmpx + 1 < this.row && tmpy + 1 < this.col) {
            if (this.cells[tmpx + 1][tmpy + 1].value == selected.value) {
                count++;
                tmpx++;
                tmpy++;
            } else break;
        }
        tmpx = x;
        tmpy = y;
        while (tmpx - 1 >= 0 && tmpy - 1 >= 0) {
            if (this.cells[tmpx - 1][tmpy - 1].value == selected.value) {
                count++;
                tmpx--;
                tmpy--;
            } else break;
        }
        this.gameOver(selected.value, count);
        count = 1;
        tmpx = x;
        tmpy = y;
        while (tmpx + 1 < this.row && tmpy - 1 >= 0) {
            if (this.cells[tmpx + 1][tmpy - 1].value == selected.value) {
                count++;
                tmpx++;
                tmpy--;
            } else break;
        }
        tmpx = x;
        tmpy = y;
        while (tmpx - 1 >= 0 && tmpy + 1 < this.col) {
            if (this.cells[tmpx - 1][tmpy + 1].value == selected.value) {
                count++;
                tmpx--;
                tmpy++;
            } else break;
        }
        console.log(count);
        this.gameOver(selected.value, count);

    }
    this.gameOver = function (value, count) {
        let out;
        switch (value) {
            case 1:
                out = "X";
                break;

            case 2:
                out = "O";
                break;
        }
        if (count >= 5) {
            alert("Game Over " + out + " win!!");
            this.flag = true;
        }
    }

}

let Board = new board(20, 20, 'board');
Board.draw();

function change(x, y) {
    Board.play(x, y);
}

function reset() {
    Board.draw();
}