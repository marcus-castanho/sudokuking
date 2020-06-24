generateRamdomGame = async () => {
    var matrix = [];
    var squareElements = {
        square0: ["00", "01", "02", "10", "11", "12", "20", "21", "22"],
        square1: ["03", "04", "05", "13", "14", "15", "23", "24", "25"],
        square2: ["06", "07", "08", "16", "17", "18", "26", "27", "28"],
        square3: ["30", "31", "32", "40", "41", "42", "50", "51", "52"],
        square4: ["33", "34", "35", "43", "44", "45", "53", "54", "55"],
        square5: ["36", "37", "38", "46", "47", "48", "56", "57", "58"],
        square6: ["60", "61", "62", "70", "71", "72", "80", "81", "82"],
        square7: ["63", "64", "65", "73", "74", "75", "83", "84", "85"],
        square8: ["66", "67", "68", "76", "77", "78", "86", "87", "88"],
    };
    var a = 1;
    var b = 0;

    console.log(a.find(item => (item == 1)));

    console.log(squareIndex.square00.indexOf("" + a + b));

    var i = 0;
    var j = 0;

    for (i = 0; i < 9; i++) {
        matrix[i] = [];
        for (j = 0; j < 9; j++) {
            var elementIndex = "" + i + j;
            var t = 0;
            /*for (t = 0; t < 9; t++) {
                if (squareElements.["square" + i].includes(elementIndex)===true) {
                    squareElements.["square" + i]=matrix[i][j];
                    break;
                }
            }*/

            var possibilities = [0, 1, 2, 3, 4, 5, 6, 7, 8];

            const rowpossibilities = possibilities.filter(cell => (!matrix[i].includes(cell)));

            var columnpossibilities = [];
            while (t >= 0) {
                columnpossibilities.push(matrix[t][j]);
                t -= 1;
            }
            columnpossibilities = possibilities.filter(cell => (!columnpossibilities.includes(cell)));

            squarepossibilites

            possibilities = rowpossibilities.filter(x => columnpossibilities.includes(x));

            if (possibilities == undefined) {
                t = 0;
                for (t = 0; t < j; t++) {
                    if (columnpossibilities.includes(matrix[i][t]) == true) {
                        matrix[i][j] = matrix[i][t];
                        possibilities = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                        rowpossibilities = possibilities.filter(cell => (!matrix[i].includes(cell)));
                        columnpossibilities = possibilities.filter(cell => (!columnpossibilities.includes(cell)));
                        possibilities = rowpossibilities.filter(x => columnpossibilities.includes(x));
                    }
                }
            }

            matrix[i][j] = possibilities[Math.floor(Math.random() * possibilities.length)];

        }

    }
}


/*await this.setState({ gameTable: matrix }, function () {
    console.log(this.state.gameTable);
});

};*/
