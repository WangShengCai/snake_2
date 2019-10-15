function SquareFactory() {

}

SquareFactory.create = function (type, x, y, color) {
    // 判断原型上面有没有这个方法
    if(typeof SquareFactory.prototype[type] == 'undefined') {
        throw new Error('no this type');
    }
    // 判断是否形成了继承关系
    if(SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    // 执行具体的方法函数
    var newSquare = new SquareFactory.prototype[type](x, y, color);
    // 返回这个对象
    return newSquare;
}

SquareFactory.prototype.init = function (square, color, ms) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = SQUAREWIDTH * square.x + 'px';
    square.viewContent.style.top = SQUAREWIDTH * square.y + 'px';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;
    square.touch = function () {
        return ms;
    }
}

SquareFactory.prototype.Floor = function (x, y, color) {
    var oFloor = new MyFloor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oFloor, color, STRATEGYMESSAGENUM.MOVE);
    return oFloor;
}

SquareFactory.prototype.Stone = function (x, y, color) {
    var oStone = new MyStone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oStone, color, STRATEGYMESSAGENUM.DIE);
    return oStone;
}

SquareFactory.prototype.Food = function (x, y, color) {
    var oFood = new MyFood(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oFood, color, STRATEGYMESSAGENUM.EAT);
    oFood.upDate(x, y);
    return oFood;
}

SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var oSnakeHead = new MySnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oSnakeHead, color, STRATEGYMESSAGENUM.DIE);
    oSnakeHead.upDate(x, y);
    return oSnakeHead;
}

SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var oSnakeBody = new MySnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oSnakeBody, color, STRATEGYMESSAGENUM.DIE);
    return oSnakeBody;
}