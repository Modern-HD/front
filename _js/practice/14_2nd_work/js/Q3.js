const calc = {
    arr: [''], // 항 구분
    stat: 0, // 현재 작성 중인 항
    printf: document.getElementById('printf'), // 출력 위치
}

const btn_num = document.querySelectorAll('.num');
btn_num.forEach( (btn) => {
    btn.addEventListener('click', function() {
        let this_text = this.innerText.toString(); // 숫자를 연산하지 않고 뒤에 붙이기 위해 문자열로 변환합니다.
        if (calc.arr[calc.stat].toString() === '0') { // 입력을 0부터 시작하였을 때 발생하는 문제를 처리합니다.
            if (this_text === '0') {
                return; // 0을 입력한 상태에서 0을 입력하는 것을 방지 ex)00
            } else {
                calc.arr[calc.stat] = ''; // 0을 입력한 상태에서 다른 숫자 입력시 기존에 있던 0을 덮어씌웁니다.
            }
        }
        add_num(this_text);
    })
});

document.querySelector('.dot').addEventListener('click', function() {
    if (calc.arr[calc.stat] == '') {
        add_num('0.'); // 아무것도 없는 상태에서 .을 입력하면 자동으로 0이 추가됩니다.
    } else if(calc.arr[calc.stat].indexOf('.') == -1){
        add_num('.');
    } else {
        alert('.은 한 번만 사용하실 수 있습니다.');
    }
})

const btn_oper = document.querySelectorAll('.oper');
btn_oper.forEach( (btn) => {
    btn.addEventListener('click', function() {
        if (calc.stat >= 2) {
            alert('연산자는 한 번만 사용하실 수 있습니다.');
        } else {
            add_oper(this.innerText);
        }
    })
});

document.querySelector('.clr').addEventListener('click', function(){
    clear();
    reset();
});

document.querySelector('.resol').addEventListener('click', function() {
    if (calc.stat>=2 && calc.arr[calc.stat] != '') {
        display_last();
        calc.printf.innerText += ` = ${resolve(parseFloat(calc.arr[0]), parseFloat(calc.arr[2]))}`;
        clear();
    } else {
        alert('계산 할 수 없습니다.');
    }
});

function add_num (num) {
    calc.arr[calc.stat] += num;
    display();
}

function add_oper (oper) {
    if(calc.arr[0] == '') {
        alert('숫자를 먼저 입력하십시오.')
        return;
    }

    calc.stat++;
    calc.arr[calc.stat] = oper;
    display();

    calc.stat++;
    calc.arr[calc.stat] = '';
}

function display() {
    reset();
    for (let i = 0; i<=calc.stat; i++) {
        if (i%2 == 0) {
            if (i == calc.stat) {
                calc.printf.innerText += calc.arr[i];
            } else {
                calc.printf.innerText += parseFloat(calc.arr[i]); // 의미 없는 0 출력 방지
            }
        } else {
            calc.printf.innerText += calc.arr[i]; // 연산자 출력
        }
    }
}

function display_last() {
    reset();
    for (let i = 0; i<=calc.stat; i++) {
        if (i%2 == 0) {
            calc.printf.innerText += parseFloat(calc.arr[i]);
        } else {
            calc.printf.innerText += calc.arr[i];
        }
    }
}

function reset() {
    calc.printf.innerText = '';
}

function clear() {
    calc.arr = [''];
    calc.stat = 0;
}

function resolve(a, b) {
    let result = 0;
    switch (calc.arr[1]) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '×':
            result = a * b;
            break;
        case '÷':
            if (b == 0) {
                alert('0으로 나눌 수 없습니다.');
                result = 'ERROR';
                break;
            }
            result = a / b;
            break;
        default:
            alert('에러 발생');
            result = 'ERROR';
            break;
    }
    return result;
}