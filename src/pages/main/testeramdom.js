generateRamdomGame = async () => {

    var matrix = [Array(9).fill(0).map(() => Array(9).fill(0))];
    var i = 0;
    var j = 0;
    var squareElements = {};
    for (i = 0; i < 9; i++) {
        var arr = [...Array(9).keys()]
        squareElements['square' + i] = arr.sort(() => Math.random() - 0.5);
    }

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