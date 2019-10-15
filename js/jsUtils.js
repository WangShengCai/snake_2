let tool = {
    // 原型继承
    inherit: function (target, origin) {
        let temp = function () {};
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },
    // 私有属性继承
    extends: function (origin) {
        let result = function () {
            // this = {};
            origin.apply(this, arguments);
            // return this;
        };
        this.inherit(result, origin);
        return result;
    },
    // 单例
    single: function (origin) {
        let singleResult = (function () {
            let instance;
            return function () {
                if(typeof instance == 'object') {
                    return instance;
                }
                origin && origin.apply(this, arguments);
                instance = this;
            }
        }())
        origin && this.inherit(singleResult, origin);
        return singleResult;
    }
}