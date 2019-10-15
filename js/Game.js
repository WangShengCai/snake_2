var oGame = new MyGame();
oGame.timer = null;
oGame.score = 0;

oGame.init = function () {
    // 游戏广场初始化
    oGround.init();
    // 蛇初始化
    oSnake.init(oGround);
    // 初始化食物
    createFood(oGround);
    // 绑定事件
    document.onkeydown = function (e) {
        if(e.key == 'ArrowLeft' && oSnake.direction != DIRECTIONMENU.RIGHT) {
            oSnake.direction = DIRECTIONMENU.LEFT;
        } else if(e.key == 'ArrowUp' && oSnake.direction != DIRECTIONMENU.DOWN) {
            oSnake.direction = DIRECTIONMENU.UP;
        } else if(e.key == 'ArrowRight' && oSnake.direction != DIRECTIONMENU.LEFT) {
            oSnake.direction = DIRECTIONMENU.RIGHT;
        } else if(e.key == 'ArrowDown' && oSnake.direction != DIRECTIONMENU.UP) {
            oSnake.direction = DIRECTIONMENU.DOWN;
        }
    } 
    var btn = document.querySelector('#btn');
    btn.onclick = function () {
        oGame.start();
    }
}
oGame.init();

oGame.start = function () {
    this.timer = setInterval(function () {
        oSnake.move(oGround);
    },INITRVAL)
}

oGame.over = function () {
    clearInterval(this.timer);
    alert('累计得分：' + this.score);
    document.querySelector('.curScore').innerHTML = '当前得分：0 分';
    oGame.init();
}

function createFood(ground) {
    var x = null;
    var y = null;
    var flag = true;
    while(flag) {
        x = 1 + Math.floor(Math.random() * (XLEN - 2));
        y = 1 + Math.floor(Math.random() * (YLEN - 2));
        var ok = true;
        for(var node = oSnake.head; node; node = node.next) {
            if(x == node.x && y == node.y) {
                ok = false;
                break;
            }
        }
        if(ok) {
            flag = false;
        }
    }
    var oFood = SquareFactory.create('Food', x, y, '#f40');
    ground.remove(oFood.x, oFood.y);
    ground.append(oFood);
}