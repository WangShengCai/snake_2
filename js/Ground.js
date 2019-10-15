var oGround = new MyGround(BAS_X_POINT, BAS_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);

// 初始化方块
oGround.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = '#0ff';
    document.body.appendChild(this.viewContent);

    this.SquareTable = [];
    for(var y = 0;y < YLEN; y ++) {                 // 行
        this.SquareTable[y] = new Array(XLEN);
        for(x = 0;x < XLEN; x ++) {                 // 列
            if(x == 0 || x == XLEN - 1 || y == 0 || y == YLEN - 1) {
                var newSquare = SquareFactory.create('Stone', x, y, 'black');
            } else {
                var newSquare = SquareFactory.create('Floor', x, y, 'orange');
            }
            this.viewContent.appendChild(newSquare.viewContent);
            this.SquareTable[y][x] = newSquare;
        }
    }
}

// 移除方块
oGround.remove = function (x, y) {
    var curSquare = this.SquareTable[y][x];                     // 当前方块
    this.viewContent.removeChild(curSquare.viewContent);        // 视觉上移除
    this.SquareTable[y][x] = null;                              // 数组中移除
}

// 插入方块
oGround.append = function (square) {
    this.viewContent.appendChild(square.viewContent);
    this.SquareTable[square.y][square.x] = square;
}