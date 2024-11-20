const btnCalc = document.getElementById("calcBtn");
const answerSection = document.getElementById("answer");
const answerElemSection = document.getElementById("answerElem");

btnCalc.addEventListener('click', ()=>{
    let matrix = [];
    for(let i = 1; i <= 5; i++){
        let row = [];
        for(let j = 1; j <= 5; j++){
            let input = document.getElementById(`input${i}${j}`);
            row.push(Number(input.value));
        }
        matrix.push(row);
    }

    let answer = window.main(matrix);
    console.log(answer, elPosition);

    if(answer != false){
        [answer, elPosition] = answer;
        answerSection.innerHTML = `<h1>Ответ: ${answer}</h1>`;
        let positionsHtml = Object.keys(elPosition).map(key => `<h2 class="elPos">(${key}): ${elPosition[key]}</h2>`).join('');
        answerElemSection.innerHTML = `<h1>На позициях:</h1>${positionsHtml}`;
    }else{
        answerSection.innerHTML = `<h1>Ошибка решения :(</h1>`;
    }
});
