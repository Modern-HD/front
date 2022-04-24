const hotel = [];

for (let i = 0; i<5; i++){
    hotel[i] = new Array()
    for(let j = 0; j<10; j++){
        hotel[i][j] = new Object({
            '방번호': '',
            '사용여부': false,
            '입실시간': '',
            '퇴실시간': '',
            '인원수': 0
        });
        if (j+1<10) {
            hotel[i][j]['방번호'] = parseInt(`${i+1}0${j+1}`);
        } else {
            hotel[i][j]['방번호'] = parseInt(`${i+1}${j+1}`);
        }
    }
}

function reset_all() {
    for (let i = 0; i<5; i++){
        hotel[i] = new Array()
        for(let j = 0; j<10; j++){
            hotel[i][j] = new Object({
                '방번호': '',
                '사용여부': false,
                '입실시간': '',
                '퇴실시간': '',
                '인원수': 0,
            });
            if (j+1<10) {
                hotel[i][j]['방번호'] = parseInt(`${i+1}0${j+1}`);
            } else {
                hotel[i][j]['방번호'] = parseInt(`${i+1}${j+1}`);
            }
        }
    }
}

// hotel[0]: 1층
// hotel[0][0]: 1층의 101호
