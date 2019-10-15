// 游戏场景 宽度系数 => 每行有多少个方块 高度系数 => 控制一共多少行
var XLEN = 30;                  // xlen
var YLEN = 30;                  // ylen

// 每个方块多宽
var SQUAREWIDTH = 20;

// 游戏场景的坐标位置
var BAS_X_POINT = 100;          // bas_x_point
var BAS_Y_POINT = 100;          // bas_y_point

// 定义蛇的移动的时间间隔
var INITRVAL = 150;             // initrval

// 定义方块
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}
Square.prototype.touch = function () {
    console.log('touch');
}
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
}

// 定义地板
var MyFloor = tool.extends(Square);

// 定义墙壁
var MyStone = tool.extends(Square);

// 定义食物
var MyFood = tool.single(Square);

// 定义蛇
var MySnake = tool.single(Square);

// 定义蛇头
var MySnakeHead = tool.single(Square);

// 定义蛇身
var MySnakeBody = tool.extends(Square);

// 游戏广场
var MyGround = tool.single(Square);

// 游戏对象
var MyGame = tool.single();

// 策略模式，返回某一个字符串，其实这是一个方法
var STRATEGYMESSAGENUM = {        // strategymessagenum
    MOVE: 'move',
    EAT: 'eat',
    DIE: 'die',
}