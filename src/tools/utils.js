/**
 * @file utils.js
 * @desc 工具函数库
 * @version 0.0.1
 * @author Linbin 
 * @date 2017-9-10-22*
 */

/**
 * 解除对象之间的关联性的方法
 * @author linbin 
 * @date   2019-10-22
 * @param  {Array}   vueData 数据
 */
const parse = function (vueData) {
    return JSON.parse(JSON.stringify(vueData));
};

/**
 * 数字前加0
 * @author linbin 
 * @date   2019-10-22
 * @param  {Number}   num 需要修改的数字
 * @param  {Number}   bit 0的位数
 */
const fillZero = function (num, bit = 0) {
    let str = num.toString();
    if (str.length < bit) {
        let n = bit - str.length;
        while (n--) {
            str = '0' + str;
        }
    }
    return str;
};

/**
 * 获取日期 yyyy-mm-dd
 * @author linbin
 * @date   2019-10-22
 * @param  {Date}     time 某个时间
 */
const getDate = function (time = new Date().getTime()) {
    let date = new Date(time);
    let formatDate = `${date.getFullYear()}-${fillZero(date.getMonth() + 1, 2)}-${fillZero(date.getDate(), 2)}`;
    return formatDate;
};

/**
 * 获取时间 HH-MM-SS
 * @author linbin
 * @date   2019-10-22
 * @param  {Date}     time 某个时间
 */
const getTime = function (time = new Date().getTime()) {
    let date = new Date(time);
    let formatTime = `${fillZero(date.getHours(), 2)}:${fillZero(date.getMinutes(), 2)}:${fillZero(date.getSeconds(), 2)}`;
    return formatTime;
};
/**
 * 获取时间 yyyy-mm-dd HH:MM:SS
 * @author linbin
 * @date   2019-10-22
 * @param  {Date}     time 某个时间
 */
const getDateTime = function (time = new Date().getTime()) {
    let date = new Date(time);
    let formatTime = `${date.getFullYear()}-${fillZero(date.getMonth() + 1, 2)}-${fillZero(date.getDate(), 2)} ${fillZero(date.getHours(), 2)}:${fillZero(date.getMinutes(), 2)}:${fillZero(date.getSeconds(), 2)}`;
    return formatTime;
};

/**
 * 数字金额大写转换(可以处理整数,小数,负数)
 * @author linbin
 * @date   2019-10-22
 * @param  {string | float}   n 数字金额
 * @return {string}     大写金额
 */
const digitUppercase = function (n) {
    let fraction = ['角', '分'];
    let digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    let unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    let head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
};

/**
 * 校验是否为空
 * @author linbin 
 * @date   2019-10-22
 * @param  {String | Object}   data 校验的内容
 */
const isEmpty = function (data) {
    if (typeof (data) === 'undefined' || data === '' || data === null) {
        return true;
    } else {
        return false;
    }
};

/**
 * 显示数字为xxx,xxx
 * @author linbin 
 * @date   2019-10-22
 */
const thousandFormat = function (num = 0) {
    const str = (+num).toString().split(".");
    const int = nums => nums.split("").reverse().reduceRight((t, v, i) => t + (i % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");
    const dec = nums => nums.split("").reduce((t, v, i) => t + ((i + 1) % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");
    return str.length > 1 ? `${int(str[0])}.${dec(str[1])}` : int(str[0]);

};

/**
 * xxx,xxx变回数字
 * @author linbin 
 * @date   2019-10-22
 * @param  {Number}   price 以分为单位的价格
 */
const thousandToNumber = function (num) {
    let arryNum = num.split('.');
    let numInteger = arryNum[0].split(',').join(''); // 字符串转数字
    if (arryNum[1]) {
        numInteger = numInteger + '.' + arryNum[1];
    }
    return Number(numInteger);
};

/**
 * 超过N个数变为...
 * @author linbin 
 * @date   2019-10-22
 * @param  {String}   data 数据
 * @return {Number}   num 位数
 */
const showExplainData = function (data, num = 8) {
    if (isEmpty(data)) {
        return '';
    }
    if (String(data).length > num) {
        return String(data).substr(0, num) + '...';
    } else {
        return data;
    }
};
/**
 * 时间函数
 * @author linbin 
 * @date   2019-10-22
 * @param 变量 Number
 * @return {
     Array
 } ["06-13", "06.13", "2018-06-13", "06月13日", "2018-06-13 11:11", "2018-06-13 11:11:11"]
 */
const dateResult = (value = 0) => {
    let dateTime = new Date();
    dateTime = dateTime.valueOf();
    dateTime = dateTime + value * 24 * 60 * 60 * 1000;
    dateTime = new Date(dateTime);
    let ys = dateTime.getFullYear();
    let ms = dateTime.getMonth() + 1;
    let ds = dateTime.getDate();
    let hs = dateTime.getHours();
    let is = dateTime.getMinutes();
    let ss = dateTime.getSeconds();
    if (ms < 10) {
        ms = `0${ms}`;
    }
    if (ds < 10) {
        ds = `0${ds}`;
    }
    if (ss < 10) {
        ss = `0${ss}`;
    }
    let nowFormat1 = `${ms}-${ds}`;
    let nowFormat2 = `${ms}.${ds}`;
    let nowFormat3 = `${ys}-${ms}-${ds}`;
    let nowFormat4 = `${ms}月${ds}日`;
    let nowFormat5 = `${ys}-${ms}-${ds} ${hs}:${is}`;
    let nowFormat6 = `${ys}-${ms}-${ds} ${hs}:${is}:${ss}`;
    let nowFormat = [nowFormat1, nowFormat2, nowFormat3, nowFormat4, nowFormat5, nowFormat6];
    return nowFormat;

};

/**
 * 获取指定日期的周的第一天、月的第一天、季的第一天、年的第一天
 * @author linbin 
 * @date   2019-10-22
 */
// 获取这周的周一
const getFirstDayOfWeek = function (date = new Date()) {
    var weekday = date.getDay() || 7;
    date.setDate(date.getDate() - weekday + 1);
    return getDate(date);
};
// 获取当月第一天
const getFirstDayOfMonth = function (date = new Date()) {
    date.setDate(1);
    return getDate(date);
};
// 获取当季第一天
const getFirstDayOfSeason = function (date = new Date()) {
    var month = date.getMonth();
    if (month < 3) {
        date.setMonth(0);
    } else if (month > 2 && month < 6) {
        date.setMonth(3);
    } else if (month > 5 && month < 9) {
        date.setMonth(6);
    } else if (month < 8 && month < 11) {
        date.setMonth(9);
    }
    date.setDate(1);
    return getDate(date);
};
// 获取当年第一天
const getFirstDayOfYear = function (date = new Date()) {
    date.setDate(1);
    date.setMonth(0);
    return getDate(date);
};
/**
 * 价格：分转元
 * @author linbin
 * @date   2019-12-02
 * @param  {Number}   price 以分为单位的价格
 */
const minuteToYuan = function (price, isThousand) {
    price = parseFloat(price);
    if (isNaN(price)) {
        return '0.00';
    }
    let num = (price / 100).toFixed(2);
    if (Math.abs(num) === 0) {
        return '0.00';
    } else if (isThousand) {
        return thousandFormat(num);
    } else {
        return num;
    }
};
/**
 * 元转分
 * @author  linbin
 * @date    2019-12-02
 * @param	{Number}   price 以元为单位的价格
 */
const yuanToMinute = function (price) {
    price = parseFloat(price);
    if (isNaN(price)) {
        return 0;
    }
    return (price * 100).toFixed(0);
};
/**
 * 判断类型
 * @author  linbin
 * @date    2020-07-22
 * @param	{val,type}  val:传入的值 type:判断的值
 */
const dataTypeJudge = function (val, type) {
    const dataType = Object.prototype.toString.call(val).replace(/\[object (\w+)\]/, "$1").toLowerCase();
    return type ? dataType === type : dataType;
}
/**
 * 下拉框变成对象
 * @author  linbin
 * @date    2020-09-22
 */
const arrayToProps = function (list = [], key = "label", value = "value") {
    let props = {};
    list.forEach(el => {
        props[el[value]] = el[key]
    })
    return props;
}
/**
 * 生成uuid
 * @author  linbin
 * @date    2020-10-09
 */
const UUID = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

// 判断安卓或者ios终端
const testMobileType = function() {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isAndroid) {
      return 'android'
    } else if (isiOS) {
      return 'ios'
    } else {
      return 'pc'
    }
  }
  // 校验手机号码
const isPhone = function(val) {
    var patrn = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
    if (!patrn.test(val) || val === '') {
      return false
    } else {
      return true
    }
  }

  // 防抖
  const _debounce = function(fn, delay) {
    var delay1 = delay || 200
    var timer
    return function () {
      var th = this
      var args = arguments
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        timer = null
        fn.apply(th, args)
      }, delay1)
    }
  }
  // 节流
  const _throttle = function(fn, interval) {
    var last
    var timer
    var interval1 = interval || 200
    return function () {
      var th = this
      var args = arguments
      var now = +new Date()
      if (last && now - last < interval) {
        clearTimeout(timer)
        timer = setTimeout(function () {
          last = now
          fn.apply(th, args)
        }, interval1)
      } else {
        last = now
        fn.apply(th, args)
      }
    }
  }

export {
    parse, // 解除对象之间的关联性的方法
    fillZero, // 数字前加0
    getDate, // 获取日期 yyyy-mm-dd
    getTime, // 获取时间 yyyy-mm-dd
    digitUppercase, // 数字金额大写转换(可以处理整数,小数,负数)
    isEmpty, // 校验是否为空
    showExplainData, // 价格转千分位展示
    dateResult, // 获取时间
    getFirstDayOfWeek, // 获取这周的周一
    getFirstDayOfMonth, // 获取当月第一天
    getFirstDayOfSeason, // 获取当季第一天
    getFirstDayOfYear, // 获取当年第一天
    thousandToNumber, // 千分位转数字
    thousandFormat, // 数字转千分
    getDateTime, // 获取时间 yyyy-mm-dd HH:MM:SS
    minuteToYuan, // 价格：分转元
    yuanToMinute, // 价格：元转分
    dataTypeJudge, //判断类型
    arrayToProps,
    UUID,
    isPhone,    // 判断手机号码
    _debounce,   // 防抖
    _throttle,   // 节流
};