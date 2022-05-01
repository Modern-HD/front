
function game_save_to_server() {
    let uname = document.getElementById('uname').value;
    let score = `S: ${game.strike}, B: ${game.ball}, O: ${game.out}`;
    let start_time = `${game.start_time.getFullYear()}-${game.start_time.getMonth()+1}-${game.start_time.getDate()} ${game.start_time.getHours()}:${game.start_time.getMinutes()}:${game.start_time.getSeconds()}`;

    save_obj.name = `${uname}`;
    save_obj.description = `${score}`;
    save_obj.price = `${game.total_time}`;
    save_obj.category_id = `${game.count}`;
    save_obj.created = `${start_time}`;

    save_commit(save_obj).then(result => {
        console.log(result);
        console.log(result.message);
        let printf = document.getElementById('result_area');
        printf.innerHTML += `<li>${uname}님, ${result.message}</li>`;
    });
}

async function save_commit(obj) {
    try {
        const url = 'http://hyeondae.dothome.co.kr/api/items/create';
        const config = {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(obj)
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        return await result;
    } catch (err) {
        console.log(err);
    }
}