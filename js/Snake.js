var oSnake = new MySnake();
oSnake.head = null;                     // 蛇头
oSnake.tail = null;                     // 蛇尾

// 方向枚举
var DIRECTIONMENU = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: 1
    }
}

// 初始化
oSnake.init = function (ground) {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, '#008c8c');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, '#abcdef');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, '#abcdef');

    this.head = snakeHead;
    this.tail = snakeBody2;

    // 蛇头
    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);
    // 蛇身
    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);
    // 蛇身
    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    // 形成双向链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;
    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead
    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    // 给蛇先天的添加一个方向 => 向右
    this.direction = DIRECTIONMENU.RIGHT;
}

//  策略处理
oSnake.strategies = {
    move: function (snake, ground, square, flag) {
        // 新建蛇身体
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, '#abcdef');
        newBody.next = snake.head.next;
        newBody.next.last = newBody;
        newBody.last = null;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        // 新建蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, '#008c8c');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(newHead.x, newHead.y);
        ground.append(newHead);
        
        // 删除最后一节地板，添加一块地板
        if(!flag) {
            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);   
            // 更新蛇头和蛇尾
            snake.head = newHead;
            snake.tail = snake.tail.last;
        }

    },
    eat: function (snake, ground, square) {
        this.move(snake, ground, square, true);
        oGame.score ++;
        document.querySelector('.curScore').innerHTML = '当前得分：' + oGame.score + '分';
        createFood(oGround);
    },
    die: function () {
        oGame.over();
    }
}

// 用蛇头做预判，根据自身的方向，判断一下下一个碰到的方块是什么
oSnake.move = function (ground) {
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if(typeof square.touch == 'function') {
        this.strategies[ square.touch() ](this, ground, square);
    }
}