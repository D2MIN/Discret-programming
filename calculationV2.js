// 43
// const startMatrix = [
//     [15, 14,18,16,20],
//     [13, 1, 5, 5, 12],
//     [12,10, 6, 9, 11],
//     [17, 11,12,13,14],
//     [15, 7, 9, 7, 11]
// ];

// 32
// const startMatrix = [
//     [12, 11,14,6,9],
//     [7, 1, 1, 4, 4],
//     [12,14, 15, 12, 7],
//     [16, 8,14,12,10],
//     [10, 13, 15, 9, 12]
// ];

// 23
// const startMatrix = [
//     [3,  4, 10,6,6],
//     [7, 11,10,12,3],
//     [11,11, 15,9,7],
//     [2, 6, 6, 7, 6],
//     [1, 11,10,12,9]
// ];

// 38
// const startMatrix = [
//     [5, 11,10, 9,9],
//     [6,17,16,12,10],
//     [11,19,21,8,10],
//     [7, 14,10,1,6],
//     [6,11,17,10,11]
// ];


function findStartMin(matrix,voidMatrix){
    matrix.forEach((string, stringIndex)=>{
        let min = Infinity;
        let column = 0;
        string.forEach((el, columnIndex)=>{
            if(el < min){
                min = el;
                column = columnIndex;
            }
        });
        voidMatrix[stringIndex][column] = "M";
    });
}

function searchMultiColumn(matrix){
    let columns = {};
    // Проходим по void матрице и ищем совпадения на столбце
    matrix.forEach((string, stringIndex) => {
        string.forEach((el,columIndex) => {
            if (el == "M" || el == "Q"){
                columns[columIndex] ? columns[columIndex] += 1 : columns[columIndex] = 1;
            }
        });
    });
    
    // Находим колонки с +
    let stoneColumns = [];
    for(el in columns){
        if(columns[el] > 1){
            stoneColumns.push(Number(el));
        };
    };

    // Находим строки на которых искать minDef
    let stoneStrings = [];
    matrix.forEach((string, stringIndex) => {
        string.forEach((el,columIndex) => {
            if ((el == "M" || el == "Q") && stoneColumns.indexOf(columIndex) != -1){
                stoneStrings.push(stringIndex);
            }
        });
    });
    
    return [stoneColumns, stoneStrings];
}

// Найти минимум разницу для каждой строки
function searchMinDef(matrix, stoneColumns, stoneString, voidMatrix){
    let minDef = Infinity;
    let stringMinIndex;
    let columnMinIndex;
    matrix.forEach((string,stringIndex)=>{
        const dublString = [...string];
        let sortString = dublString.sort((a, b) => a-b);
        if(stoneString.indexOf(stringIndex) != -1){
            let maybeMin = sortString[1] - sortString[0];
            string.forEach((el,columnIndex)=>{
                if(
                    maybeMin < minDef
                    && voidMatrix[stringIndex][columnIndex] != 'M'
                    && voidMatrix[stringIndex][columnIndex] != 'Q'
                    && el == sortString[1]
                ){
                    minDef = sortString[1] - sortString[0];
                    stringMinIndex = stringIndex;
                    columnMinIndex = columnIndex;
                };
            });
        };
    });

    if(stringMinIndex != undefined){
        voidMatrix[stringMinIndex][columnMinIndex] = 'Q';
        return(minDef);
    }else{
        return 0;
    }
}

function addMinDef(matrix,stoneColumns,minDef){
    stoneColumns.forEach((el)=>{
        for(let i = 0; i < matrix.length; i++){
            matrix[i][el] += minDef;
        };
    });
}

function checkQ(matrix){
    let dublMatrix = [...matrix];
    dublMatrix.forEach((string,stringIndex)=>{
        string.forEach((el,columnIndex)=>{
            if(el == "Q"){
                let flag = true;
                for(let i = 0; i < matrix.length; i++){
                    if(matrix[i][columnIndex] == "M"){
                        flag = false;
                    };
                };
                if(flag){
                    for(let i = 0; i < matrix.length; i++){
                        if(matrix[stringIndex][i] == 'M'){
                            matrix[stringIndex][i] = '';
                        };
                        matrix[stringIndex][columnIndex] = "M";
                    };
                };
            };
        });
    });
};

function checkStatus(matrix){
    let columns = {};
    // Проходим по void матрице и ищем совпадения на столбце
    matrix.forEach((string, stringIndex) => {
        string.forEach((el,columIndex) => {
            if (el == "M"){
                columns[columIndex] ? columns[columIndex] += 1 : columns[columIndex] = 1;
            }
        });
    });

    for(el in columns){
        if(columns[el] > 1){
            return false;
        };
    };
    return true;
}

function calcAnswer(startMatrix, voidMatrix){
    let answer = 0;
    let elPosition = {};
    voidMatrix.forEach((string,stringIndex)=>{
        string.forEach((el,columnIndex)=>{
            if(el == "M"){
                answer += startMatrix[stringIndex][columnIndex];
                elPosition[`${stringIndex}:${columnIndex}`] = startMatrix[stringIndex][columnIndex];
            };
        });
    });

    return [answer, elPosition];
}


function main(matrix){

    const startMatrix = matrix;

    // Матрица для расчетов
    let dublMatrix = JSON.parse(JSON.stringify(startMatrix));


    // Void матрица для обозначений
    let voidMatrix = dublMatrix.map((string)=>{
        return string.map(()=>{
            return '';
        });
    });

    findStartMin(dublMatrix,voidMatrix);

    let statusAnswer = false;
    let step = 0;
    console.log(voidMatrix);
    do {
        [stoneColumns, stoneStrings] = searchMultiColumn(voidMatrix);
        const minDef = searchMinDef(dublMatrix, stoneColumns, stoneStrings, voidMatrix);
        addMinDef(dublMatrix, stoneColumns, minDef);
        checkQ(voidMatrix);
        statusAnswer = checkStatus(voidMatrix);
        
        step +=1;
    } while (!statusAnswer && step < 10);
    
    if(statusAnswer){
        console.log(statusAnswer);
        [answer, elPosition] = calcAnswer(startMatrix, voidMatrix);
        console.log(answer, elPosition)
        return [answer, elPosition];
    }else{
        console.log(statusAnswer, 'Что то пошло не так');
    };
};