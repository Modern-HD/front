document.querySelectorAll('.menu').forEach((el) => {
    el.addEventListener('click', function(){
        // console.log(this.value); // 0: 객실현황 1: 입실 2:퇴실 3:초기화 4:창닫기
        menu_click(this.value);
    })
});

document.getElementById('room_selection1').addEventListener('mouseover', function(){
    // console.log('over1')
    room_selection_gene(1);
})

document.getElementById('room_selection2').addEventListener('mouseover', function(){
    // console.log('over2')
    room_selection_gene(2);
})

document.getElementById('room_selection1').addEventListener('change', function(){
    if (this.value != '') {
        change_enter(this.value);
    }
})

document.getElementById('room_selection2').addEventListener('change', function(){
    // console.log(this.value);
    if (this.value != '') {
        change_leave(this.value);
    }
})

document.getElementById('random_enter_btn').addEventListener('click',function(){
    if(confirm("※개발자 도구\n 랜덤으로 입실 시키겠습니까?")==true){
        random_entering();
    }
});

document.getElementById('live-btn2').addEventListener('click',function(){
    menu_click(0);
});

document.getElementById('entering_btn').addEventListener('click', function(){
    if (entering_vaild()) {
        entering_commit();
        alert('입실 완료!');
        menu_click(0);
        document.getElementById('entering_page').classList.add('display-none');
    }
});

document.getElementById('leaving_btn').addEventListener('click', function(){
    if(confirm('지금 바로 퇴실 하겠습니까?')==true) {
        leaving_commit();
        alert('퇴실 완료!');
        menu_click(0);
        document.getElementById('leaving_page').classList.add('display-none');
        document.getElementById('room_selection2').value = '';
    } 
});

function menu_click(value) {
    switch (value) {
        case 0:
            close_all_window();
            live_refresh();
            open_live_window();
            break;
        case 1:
            close_all_window();
            open_enter_window();
            break;
        case 2:
            close_all_window();
            open_leave_window();
            break;
        case 3:
            if (confirm("정말로 초기화 하시겠습니까?")==true) {
                close_all_window();
                reset_all();
                alert("초기화가 완료 되었습니다.")
            }
            break;
        case 4:
            close_all_window();
            break;
    }
}

function close_all_window() {
    document.querySelectorAll('.modal').forEach((el) => {
        el.classList.add('display-none');
    })
    // document.querySelectorAll('.another-page').forEach((el)=> {
    //     el.classList.add('display-none');
    // })
}

function open_live_window() {
    document.getElementById('live_window').classList.remove('display-none');
}

function open_enter_window() {
    document.getElementById('enter_window').classList.remove('display-none');
}

function open_leave_window() {
    document.getElementById('leave_window').classList.remove('display-none');
}

function room_selection_gene(num) {
    if (num == 1) {
        var room_selector = document.getElementById('room_selection1');
        var valid_func = useable;
        var valid_func2 = select_disable;
    } else if(num == 2) {
        var room_selector = document.getElementById('room_selection2');
        var valid_func = leaveable;
        var valid_func2 = select_disable2;
    } else {
        return
    }
    room_selector.innerHTML = `<option value="" selected disabled>선택하세요</option>`;
    for (let i=0 ; i<5; i++) {
        room_selector.innerHTML += `<option value="" disabled>----${i+1}층----</option>`;
        for(let j=0; j<10; j++) {
            if (j<9) {
                room_selector.innerHTML += `<option value="${hotel[i][j]['방번호']}" ${valid_func2(i, j)}>${i+1}0${j+1}호${valid_func(i,j)}</option>`;
            } else {
                room_selector.innerHTML += `<option value="${hotel[i][j]['방번호']}" ${valid_func2(i, j)}>${i+1}${j+1}호${valid_func(i,j)}</option>`;
            }
        }
    } 
}

function select_disable(i, j) {
    if (hotel[i][j]['사용여부']) {
        return 'disabled';
    } else {
        return '';
    }
}

function select_disable2(i, j) {
    if (hotel[i][j]['사용여부']) {
        return '';
    } else {
        return 'disabled';
    }
}

function useable(i, j) {
        if (hotel[i][j]['사용여부']) {
            return '(사용 중)';
        } else {
            return '(입실 가능)';
        }
}

function leaveable(i,j) {
    if (hotel[i][j]['사용여부']) {
        return '(퇴실 가능)';
    } else {
        return '(빈 방)';
    }
}

function live_refresh() {
    let printf = document.getElementById('live_table');
    printf.innerHTML = '';
    let str = '';
    for (let i=4; i>=0; i--) {
        str += `<tr><td rowspan="2" class="room-floor">${i+1}층</td>`;
        for (let j=5; j<10; j++) {
            str
            += `<td class="room-btn ${room_coloring(i,j)}"><div class="room-num">${hotel[i][j]['방번호']}호</div>
            <div class="room-stat">${use_or_useable(i,j)}</div>
            <p>${enter_or_leave_time(i,j)}</p></td>`;
        }
        str += '</tr>'
        str += '<tr>'
        for (let j=0; j<5; j++) {
            str
            += `<td class="room-btn ${room_coloring(i,j)}"><div class="room-num">${hotel[i][j]['방번호']}호</div>
            <div class="room-stat">${use_or_useable(i,j)}</div>
            <p>${enter_or_leave_time(i,j)}</p></td>`;
        }
        str += '</tr>'
    }
    printf.innerHTML = str;
}

function use_or_useable(i,j) {
    if (hotel[i][j]['사용여부']) {
        return '사용 중';
    } else {
        return '빈 방';
    }
}

function enter_or_leave_time(i,j) {
    if (hotel[i][j]['사용여부']) {
        return `입실 시간: ${hotel[i][j]['입실시간']}</p><p>퇴실 예정: ${hotel[i][j]['퇴실시간']}`;
    } else {
        if (hotel[i][j]['퇴실시간']=='') {
            return '퇴실 정보 없음';
        }
        return `최근 퇴실: ${hotel[i][j]['퇴실시간']}`;
    }
}

function room_coloring(i,j) {
    if (hotel[i][j]['사용여부']) {
        return 'room-red';
    } else {
        return 'room-green';
    }
}

function random_entering() {
    for (let i=0; i<random_gene(25,50);i++){
        let floor = random_gene(0,4);
        let room = random_gene(0,9);
        let now = new Date();
        let ran_time = new Date(random_gene(0,60*60*24*1000*3));
        let enter_time = new Date(now - ran_time);
        hotel[floor][room]['사용여부'] = true;
        hotel[floor][room]['입실시간'] = `${per2d(enter_time.getMonth()+1)}-${per2d(enter_time.getDate())} ${per2d(enter_time.getHours())}:${per2d(enter_time.getMinutes())}`;
        hotel[floor][room]['퇴실시간'] = `${per2d(enter_time.getMonth()+1)}-${per2d(enter_time.getDate()+random_gene(4,8))} ${per2d(random_gene(7,23))}:00`;
        hotel[floor][room]['인원수'] = random_gene(1,6);
    }
    alert('랜덤 입실이 완료 되었습니다.');
}

function per2d(num) {
    if (num < 10) {
        return `0${num}`
    }
    return `${num}`
}

function random_gene(min,max) {
    return Math.floor(Math.random()*(max+1-min))+min;
}

function change_enter(room_number) {
    let floor = find_room_floor(room_number);
    let room = find_room_num(room_number);
    room_images_change(room, 1);
    document.getElementById('entering_page').classList.remove('display-none');
    document.getElementById('room_num_area').innerText = `${hotel[floor][room]['방번호']}`
}

function change_leave(room_number) {
    let floor = find_room_floor(room_number);
    let room = find_room_num(room_number);
    room_images_change(room, 2);
    document.getElementById('leaving_page').classList.remove('display-none');
    document.getElementById('room_num_area2').innerText = `${hotel[floor][room]['방번호']}`;
    document.getElementById('leaving_enter_time2').innerText = `${hotel[floor][room]['입실시간']}`;
    document.getElementById('leaving_leave_time2').innerText = `${hotel[floor][room]['퇴실시간']}`;
    document.getElementById('leaving_human2').innerText = `${hotel[floor][room]['인원수']}`;
}

function find_room_floor(room_num) {
    // console.log(
    //     parseInt(room_num.toString().charAt(0))-1
    // );
    return parseInt(room_num.toString().charAt(0))-1;
}
function find_room_num(room_num) {
    // console.log(
    //     parseInt(room_num.toString().substr(1,2))-1
    // );
    return parseInt(room_num.toString().substr(1,2))-1;
}

function room_images_change(room_num, cases) {
    let printf = document.getElementById(`room_images${cases}`);
    if (room_num<3) {
        printf.innerHTML = `<img src="src/images/room_image1.jpg">`;
    } else if (room_num<7){
        printf.innerHTML = `<img src="src/images/room_image2.jpg">`;
    } else {
        printf.innerHTML = `<img src="src/images/room_image3.jpg">`;
    }
}

function entering_vaild() {
    let result = true;
    let input_date = document.getElementById('input_date1').value;
    let input_date2 = new Date(input_date);
    let now = new Date(); 
    // console.log(input_date2);
    // console.log(now);
    if (input_date == '') {
        result = false;
        alert('퇴실 날짜를 입력해주세요');
    } else if (document.getElementById('input_hour1').value == '') {
        result = false;
        alert('퇴실 시간을 입력해주세요');
    } else if (document.getElementById('input_human1').value == '') {
        result = false;
        alert('인원수를 입력해주세요');
    } else if (input_date2-now<0) {
        result = false;
        alert('내일부터 퇴실 하실 수 있습니다.');
    }
    return result;
}

function entering_commit() {
    let number = document.getElementById('room_num_area').innerText;
    let floor = find_room_floor(number);
    let room = find_room_num(number);
    let now = new Date();
    let now2 = `${per2d(now.getMonth()+1)}-${per2d(now.getDate())} ${per2d(now.getHours())}:${per2d(now.getMinutes())}`
    let leave_date = new Date(document.getElementById('input_date1').value);
    let leave_date2 = `${per2d(leave_date.getMonth()+1)}-${per2d(leave_date.getDate())} ${document.getElementById('input_hour1').value}:00`
    hotel[floor][room]['사용여부'] = true;
    hotel[floor][room]['입실시간'] = now2;
    hotel[floor][room]['퇴실시간'] = leave_date2;
    hotel[floor][room]['인원수'] = parseInt(document.getElementById('input_human1').value);
    input_refresh();
}

function leaving_commit() {
    let number = document.getElementById('room_num_area2').innerText;
    let floor = find_room_floor(number);
    let room = find_room_num(number);
    let now = new Date();
    let now2 = `${per2d(now.getMonth()+1)}-${per2d(now.getDate())} ${per2d(now.getHours())}:${per2d(now.getMinutes())}`
    hotel[floor][room]['사용여부'] = false;
    hotel[floor][room]['입실시간'] = '';
    hotel[floor][room]['퇴실시간'] = now2;
    hotel[floor][room]['인원수'] = 0;
}

function input_refresh() {
    document.getElementById('room_selection1').value = '';
    document.getElementById('input_date1').value = '';
    document.getElementById('input_hour1').value = '';
    document.getElementById('input_human1').value = '';
}

