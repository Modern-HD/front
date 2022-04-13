
let input_list = ['name','addr','food','hobby','music','need_now'];
let scan_list = [];

function click_button() {

    i = 0;
    while(i<6) {
    scan_list[i] = document.getElementById(input_list[i]).value;
    i++;
    };

    scan_list[6] = document.querySelector(`input[name="pet"]:checked`).value;

    const me = {
        uname: scan_list[0],
        addr: scan_list[1],
        like_list: {
            food: scan_list[2],
            hobby: scan_list[3],
            music: scan_list[4],
        },
        need_now: scan_list[5],
        pet: scan_list[6],
    }

    let scan_area = document.getElementById('scan_list');
    let str = `<ul><li>이름: ${me.uname}</li>
        <li>주소: ${me.addr}</li>
        <li>음식: ${me.like_list.food}</li>
        <li>취미: ${me.like_list.hobby}</li>
        <li>음악: ${me.like_list.music}</li>
        <li>반려동물 보유 여부: ${me.pet}</li>
        <li>지금 필요한 것: ${me.need_now}</li></ul>`;

    scan_area.innerHTML = str;
}
