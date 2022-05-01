function load_history() {
    load_history_data().then(result => {
        console.log(result.items);
        print_history_list(result.items);
    });
}

async function load_history_data() {
    try {
        const url = "http://hyeondae.dothome.co.kr/api/items/read";
        const resp = await fetch(url);
        const respText = await resp.text();
        const save_obj = await JSON.parse(respText);
        return await save_obj;
    } catch (err) {
        console.log(err);
    }
}

function print_history_list(items) {
    print_area = document.getElementById('save_print');
    print_area.innerHTML = '';
    items.forEach(el=>{
        print_area.innerHTML += `<tr>`;
        print_area.innerHTML += `<td class="col-1">${el.id}</td>
        <td class="col-1">${el.name}</td>
        <td class="col-2">${el.description}</td>
        <td class="col-1">${el.price}초</td>
        <td class="col-1">${el.category_id}회</td>
        <td class="col-2">${el.created}</td>
        <td class="col-2">${el.modified}</td>
        <td class="col-05 del-btn" data-ino="${el.id}"><i class="fa fa-times-circle del-btn" data-ino=${el.id}></i></td>`;
        print_area.innerHTML += `</tr>`;
    })
}