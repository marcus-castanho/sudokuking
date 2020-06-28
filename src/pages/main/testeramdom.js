generateRamdomGame = async () => {
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
    var matrix = [];
    var i = 0;
    var j = 0;

    for (i = 0; i < 9; i++) {
        matrix[i] = [];
        for (j = 0; j < 9; j++) {
            /*var elementIndex = "" + i + j;
            var elementSquare = "";
            var t = 0;

            for (var key in squareElements) {
                if (squareElements[key].includes(elementIndex) === true) {
                    elementSquare = key;
                }
            }*/


            var possibilities = [...Array(9).keys()]

            var rowpossibilities = possibilities.filter(cell => (!matrix[i].includes(cell)));

            var columnpossibilities = [];
            var t = i;
            while (t >= 0) {
                columnpossibilities.push(matrix[t][j]);
                t -= 1;
            }
            columnpossibilities = possibilities.filter(cell => (!columnpossibilities.includes(cell)));

            possibilities = rowpossibilities.filter(x => columnpossibilities.includes(x));


            if (possibilities.length === 0) {
                for (t = 0; t < j; t++) {
                    if (columnpossibilities.includes(matrix[i][t]) === true) {

                        var n = matrix[i][t];
                        matrix[i][j] = matrix[i][t];
                        matrix[i][t] = []
                        possibilities = [...Array(9).keys()];

                        rowpossibilities = possibilities.filter(cell => (!matrix[i].includes(cell)));

                        var k = t;
                        while (k >= 0) {
                            columnpossibilities = [];
                            columnpossibilities.push(matrix[k][t]);
                            k -= 1;
                        }

                        columnpossibilities = possibilities.filter(cell => (!columnpossibilities.includes(cell)));

                        possibilities = rowpossibilities.filter(x => columnpossibilities.includes(x));

                        if (possibilities.length === 0) {

                            matrix[i][j] = [];
                            matrix[i][t] = n;

                            continue
                        }

                        else {
                            matrix[i][t] = possibilities[Math.floor(Math.random() * possibilities.length)];

                            console.log(i, t);
                            console.log('erro');
                            break;
                        }

                    }
                }
            }
            else {
                matrix[i][j] = possibilities[Math.floor(Math.random() * possibilities.length)];
            }

            console.log(columnpossibilities);
            console.log(rowpossibilities);
            console.log(possibilities);



            console.log(matrix[i][j]);
            //console.log(elementSquare);

        }
    }


    await this.setState({ gameTable: matrix });

};

    redoRow = (matrix, i, j, n) => {

        for (j = 0; j < 9; j++) {

            var possibilities = [...Array(9).keys()]

            var rowpossibilities = possibilities.filter(cell => (!matrix[i].includes(cell)));

            var columnpossibilities = [];
            var t = i;
            while (t >= 0) {
                columnpossibilities.push(matrix[t][j]);
                t -= 1;
            }
            columnpossibilities = possibilities.filter(cell => (!columnpossibilities.includes(cell)));

            possibilities = rowpossibilities.filter(x => columnpossibilities.includes(x));


            if (possibilities.length === 0) {

                n = async () => {
                    await this.setState({ redoLimit: this.state.redoLimit + 1 })
                };

                if (n >= 10) {
                    matrix = [];
                    this.generateRamdomGame();
                }

                console.log(n);
                matrix[i] = [];
                this.redoRow(matrix, i, j, n);

            }
            else {
                matrix[i][j] = possibilities[Math.floor(Math.random() * possibilities.length)];
            }
        }

        return matrix[i];
    }