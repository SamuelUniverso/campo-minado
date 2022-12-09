function field(cols_count, rows_count, mines) {
    var rows = [];

    //put mines in the field. If there's none, fill with "0"
    for (var i = 0; i < rows_count; i++) {
        rows[i] = [];
        for (var j = 0; j < cols_count; j++) {
            if (mines.map(x => JSON.stringify(x)).includes("[" + i + "," + j + "]")) {
                rows[i][j] = "*";
            } else {
                rows[i][j] = 0;
            }
        }
    }

// * * *   (i-1, j-1)  (i-1, j)  (i-1, j+1)
// * ? *   (i, j-1)       ?      (i, j+1)
// * * *   (i+1, j-1)  (i+1, j)  (i+1, j+1)

//sum numbers now that the mines are in position
for (var i = 0; i < rows_count; i++) {
    for (var j = 0; j < cols_count; j++) {
        if (rows[i][j] != '*') {
            if (rows[i - 1] !== undefined && rows[i - 1][j - 1] === '*') rows[i][j]++;
            if (rows[i - 1] !== undefined && rows[i - 1][j    ] === '*') rows[i][j]++;
            if (rows[i - 1] !== undefined && rows[i - 1][j + 1] === '*') rows[i][j]++;

            if (rows[i][j - 1] == '*') rows[i][j]++;
            if (rows[i][j + 1] == '*') rows[i][j]++;

            if (rows[i + 1] !== undefined && rows[i + 1][j - 1] === '*') rows[i][j]++;
            if (rows[i + 1] !== undefined && rows[i + 1][j    ] === '*') rows[i][j]++;
            if (rows[i + 1] !== undefined && rows[i + 1][j + 1] === '*') rows[i][j]++;
        }
    }
}

    return rows;
}

function clicou(event) {
    if(event.target.textContent === '*')
    {
        for(element of document.querySelectorAll('span')) {
            element.setAttribute('class', '');
        }
        alert('Fim de jogo!');
        window.location.reload();
    } else {
        event.target.childNodes[0].setAttribute('class', '');
    }
}

function drawTable(rows) {
    var table = document.getElementById('field');
    for (row of rows) {
        var tr = document.createElement('tr');
        for (col of row) {
            var td = document.createElement('td');
            var span = document.createElement('span');
            span.textContent = col;
            span.setAttribute('class', 'invisible');
            td.addEventListener('click', clicou);
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

}

function randomMines(quantity, cols, rows) {
    mines = [];
    for(var i = 0; i < quantity; i++) {
        var positionRow = parseInt(Math.random() * rows);
        var positionCol = parseInt(Math.random() * cols);
        mines.push([positionRow, positionCol]);
    }
    return mines;
}

var mines = randomMines(10, 8, 8); // [[0, 7], [3, 3], [5, 2], [7, 7], [4, 2], [1, 2]];
var myField = field(8, 8, mines);
drawTable(myField);