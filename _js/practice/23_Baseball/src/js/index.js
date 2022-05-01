        // ----시작부-------
        const game = {
            com_nums: [],
            my_nums: [],
            strike: 0,
            ball: 0,
            out: 0,
            count: 0,
            start_time: 0,
            end_time: 0,
            total_time: 0,
        }
        const save_obj = {};
        const board = document.getElementById('board_print');
        com_nums_gene();
        console.log(game.com_nums);
        // ---------------

        // -------이벤트영역----------
        document.getElementById('open_save_btn').addEventListener('click', function(){
            load_history();
            document.getElementById('save_window').classList.remove('display-none');
        });

        document.querySelectorAll('.modal-close-btn').forEach(el=> {
            el.addEventListener('click',close_all_window);
        })

        document.getElementById('start_btn').addEventListener('click', function(){
            let input_num = document.getElementById('input_text').value;
            if (input_num.length<3) {
                board.innerText = '3자리 숫자를 입력해주세요';
                return;
            }
            if (game.count == 0) {
                game.start_time = new Date();
            }
            for (let i=0; i < input_num.length; i++) {
                game.my_nums[i] = parseInt(input_num.charAt(i));
            }
            game_start();
        });

        document.querySelectorAll('td.btn').forEach((el)=>{
            el.addEventListener('click', function(){
                board.innerText = '';
                let input_num = document.getElementById('input_text').value;
                for (let i=0; i < input_num.length; i++) {
                    if (el.innerText == input_num.charAt(i)) {
                        board.innerText = '같은 숫자는 입력하실 수 없습니다.';
                        return;
                    }
                }
                if (input_num.length>2 && !(el.innerText == 'C' ||  el.innerText == '◀')) {
                    board.innerText = '3자리까지만 입력 가능합니다.';
                    return;
                }
                number_input(el.innerText.toString());
            })
        });

        document.addEventListener('click', (e) => {
            if(e.target.classList.contains('del-btn')) {
                const ino = e.target.dataset.ino;
                console.log(ino);
                if (confirm(`${ino}번 항목을 정말로 삭제하시겠습니까?`)==true) {
                    delete_tuple(ino).then(result => {
                        console.log(result);
                        alert(result.message);
                        load_history();
                    });
                }
            }
        });

        // ------------------------


        // --------함수영역------------
        function number_input(value) {
            let input_area = document.getElementById('input_text');
            switch (value) {
                case '9':
                case '8':
                case '7':
                case '6':
                case '5':
                case '4':
                case '3':
                case '2':
                case '1':
                case '0':
                    input_area.value += value;
                    break;
                case '◀':
                    input_area.value = input_area.value.slice(0,-1);
                    break;
                case 'C':
                    input_area.value = ''
                    break;
                default:
                    break;
            }
        }

        function game_start() {
            let strike = 0;
            let ball = 0;
            let out = 0;
            let result = true;
            for (let i=0; i<3; i++){
                for (let j=0; j<3; j++) {
                    if (i==j) {
                        if (game.my_nums[i] == game.com_nums[i]) {
                            strike++;
                            result = false;
                        }
                    } else {
                        if (game.my_nums[i] == game.com_nums[j]) {
                            ball++;
                            result = false;
                        }
                    }
                }
            }
            if (result) {
                out++;
            }
            console.log(`스트라이크: ${strike}, 볼: ${ball}, 아웃: ${out}`)
            game.strike += strike;
            game.ball += ball;
            game.out += out;
            game.count++;
            result_print(strike, ball, out);
            set_refresh();
            if (game.strike >= 3) {
                game.end_time = new Date();
                game.total_time = ((game.end_time-game.start_time)/1000).toFixed(0);
                if(document.getElementById('uname').value != '') {
                    game_save_to_server();
                }
                game_end();
                reset();
            }
        }

        function result_print(strike, ball, out) {
            board.innerHTML = '';
            let str = '';
            if (strike>0) {
                str += '<span class="text-orange mg-x-2">'
                for(let i=0; i<strike; i++) {
                    str += '●';
                }
                str += '</span>'
            }
            if (ball>0) {
                str += '<span class="text-green mg-x-2">'
                for(let i=0; i<ball; i++) {
                    str += '●';
                }
                str += '</span>'
            }
            if (out>0) {
                str = '<span class="text-red mg-x-2">●</span>'
            }
            board.innerHTML = str;
            let printf = document.getElementById('result_area');
            printf.innerHTML += `<li>${game.count}회차: 스트라이크: ${strike}, 볼: ${ball}, 아웃: ${out}</li>`;
        }

        function game_end() {
            let printf = document.getElementById('result_area');
            board.innerHTML += '게임 종료!';
            printf.innerHTML += `<li>게임종료! 지금까지...스트라이크: ${game.strike}, 볼: ${game.ball}, 아웃: ${game.out}</li>`;
            printf.innerHTML += `<li>소요 시간: ${game.total_time}초</li>`;
        }

        function reset() {
            game.count = 0;
            game.strike = 0;
            game.ball = 0;
            game.out = 0;
            game.start_time = 0;
            game.end_time = 0;
        }

        function set_refresh() {
            game.my_nums = [];
            game.com_nums = [];
            com_nums_gene();
            document.getElementById('input_text').value = '';
            console.log(game.com_nums);
        }

        function random_gene(min, max) {
            return Math.floor(Math.random()*(max+1)-min)+min;
        }

        function com_nums_gene() {
            while(game.com_nums.length<3) {
                let ran_num = random_gene(0,9);
                if (game.com_nums.indexOf(ran_num)==-1) {
                    game.com_nums.push(ran_num);
                }
            }
        }

        function close_all_window() {
            document.querySelectorAll('.modal').forEach((el)=>{
                el.classList.add('display-none');
            });
        }
