async function delete_tuple(ino) {
    try {
        const url = 'http://hyeondae.dothome.co.kr/api/items/delete';
        const config = {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({id:ino})
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        return await result;
    } catch (err) {
        console.log(err);
    }
};
