window.onload = function () {
    Demo6();
    Demo7();
    Demo8();
    Demo9();
    document.getElementById('divKey').onmousedown = function () {
        if (window.event.altKey) {
            alert('按下了alt键');
        } else if (window.event.shiftKey) {
            alert('按下了shift键');
        } else if (window.event.ctrlKey) {
            alert('按下了ctrl键');
        } else {
            alert('只按下了鼠标');
        }
    };
    document.getElementById('btnAll').onclick = function () {
        var cks = document.getElementsByTagName('input');
        for (var i = 0; i < cks.length; i++) {
            cks[i].checked = true;
        }
    };
    document.getElementById('btnNoAll').onclick = function () {
        var cks = document.getElementsByTagName('input');
        for (var i = 0; i < cks.length; i++) {
            cks[i].checked = false;
        }
    };
    document.getElementById('btnFx').onclick = function () {
        var cks = document.getElementsByTagName('input');
        for (var i = 0; i < cks.length; i++) {
            cks[i].checked = !cks[i].checked;
        }
    };

    document.getElementById('divbutton').onmousedown = function (e) {
        var event = window.event || e;
        var lbl = document.getElementById("lblButtonInfo");
        if (event.button === 0) {
            lbl.innerText = "左键被点击";
        }
        else if (event.button === 1) {
            lbl.innerText = "中键被点击";
        }
        else if (event.button === 2) {
            lbl.innerText = "右键被点击";
        } else {
            lbl.innerText = "";
        }
    };
    var txts = document.getElementById("divInputEnter").getElementsByTagName('input');
    var i;
    for (i = 0; i < txts.length; i++) {
        if (txts[i].type === 'text') {
            txts[i].onkeydown = function (event) {
                var char = event.which || event.keyCode;
                if (char === 13) {
                    alert("Enter");
                }
            };
        }
    }
    document.getElementById('btnCommitContent').onclick = function () {
        var name = document.getElementById('txtName').value;
        var content = document.getElementById('txtContent').value;
        var trObj = document.createElement('tr');
        var tdObj1 = document.createElement('td');
        var tdObj2 = document.createElement('td');
        tdObj1.innerText = name;
        tdObj2.innerText = content;
        trObj.appendChild(tdObj1);
        trObj.appendChild(tdObj2);
        document.getElementById('tbContent').appendChild(trObj);
    };
    document.getElementById('btnmouse').onmouseover = function () {
        if (!document.getElementById('dvImg')) {
            var dvObj = document.createElement('div');
            dvObj.id = "dvImg";
            var imObj = document.createElement('img');
            imObj.src = '../Images/0.jpg';
            imObj.height = 500;
            imObj.width = 700;
            dvObj.appendChild(imObj);

            dvObj.style.position = 'absolute';
            dvObj.style.left = this.offsetLeft + 'px'; //左侧距离
            dvObj.style.top = this.offsetTop + this.offsetHeight + 'px';

            document.body.appendChild(dvObj);
        }
    };
    document.getElementById('btnmouse').onmouseout = function () {
        if (document.getElementById('dvImg')) {
            document.body.removeChild(document.getElementById('dvImg'));
        }
    };
    document.getElementById('btnjump').onclick = function () {
        //让页面重新导航,下面的方式在IE浏览器中可以,在火狐和谷歌浏览器中不行
        // window.navigate('http://www.baidu.com');
        //兼容的写法.每个浏览器都可以
        window.location.href = 'http://www.baidu.com';
    };
    document.getElementById('alinknojump').onclick = function (evt) {
        if (window.event.altKey) {
            alert(new Date().toLocaleTimeString());
            //阻止重新跳转
            //取消默认事件
            // window.event.returnValue = false;ie
            //arguments[0].preventDefault();火狐
            return false;//推荐的
        }
        return true;
    }
    var btns = document.getElementById("divBtnHaha").getElementsByClassName('btnHaha');
    for (i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            for (var j = 0; j < btns.length; j++) {
                btns[j].value = '呜呜呜.....';
            }
            this.value = '哈哈..哈.';
        };
    }
    var inputs = document.getElementsByName('btnAtten');
    for (i = 0; i < inputs.length; i++) {
        inputs[i].onblur = function () {
            if (this.value.length === 0) {
                this.style.borderStyle = "solid";
                this.style.borderWidth = 1;
                this.style.borderColor = "red";
            } else {
                this.style.borderStyle = "solid";
                this.style.borderWidth = 1;
                this.style.borderColor = "gray";
            }
        };
    }
    LoginShow();
}

window.onresize = function () {
    LoginShow();
}
function Demo1() {
    var n = "";
    if (typeof (n) != 'undefined' && n != null) {
        alert('可用');
    } else {
        alert('不可用');
    }
}

function Demo2() {
    n = 100;
    alert("A1:" + n);
};
//Demo2();
//alert("A2:" + n);

if (true) {
    var sum = 100;
    for (var i = 0; i < 100; i++) {
        sum += i;
    }
}
//js中没有块级作用域
//alert("I:" + i);

function Demo3() {
    var strs = new Array(8, 21, 5, 39, 12, 12, 19, 37);
    var max = strs[0];
    for (var i = 1; i < strs.length; i++) {
        if (max < strs[i]) {
            max = strs[i];
        }
    }
    alert("最大值是：" + max);
}
function Demo4() {
    var strs = new Array("梅西 ", " 卡卡", " 郑大世");
    var strResult = "";
    for (var i = 0; i < strs.length - 1; i++) {
        strResult += strs[i] + "|";
    }
    alert(strResult + strs[strs.length - 1]);
}
function Demo5() {
    var strs = new Array(1, 2, 3, 4, 5, 6, 7);
    var i;
    for (i = 0; i < strs.length / 2; i++) {
        var tem = strs[i];
        strs[i] = strs[strs.length - 1 - i];
        strs[strs.length - 1 - i] = tem;
    }
    var result = "";
    for (i = 0; i < strs.length; i++) {
        result += strs[i] + "  ";
    }
    alert(result);
}
function Demo6() {
    var i = 1;
    setInterval(function () {
        i++;
        document.getElementById('txtInterval').value = i;
    }, 1000);
}

function coverit() {
    var cover = document.getElementById("cover");
    var covershow = document.getElementById("coverShow");
    var img = document.getElementById("imgloading");
    cover.style.display = 'block';
    covershow.style.display = 'block';

    setTimeout("showTime()", 3000);
}
function showTime() {
    var cover = document.getElementById("cover");
    var covershow = document.getElementById("coverShow");
    cover.style.display = '';
    covershow.style.display = '';
}

var timeoutIdIndex = 0;
var timeoutId = window.setTimeout(function () {
    console.log("Hello World(setTimeout) " + timeoutIdIndex++);
},
    1000);
function clearTimeoutDemo() {
    window.clearTimeout(timeoutId);
}

var intervalIdIndex = 0;
var intervalId = window.setInterval(function () {
    console.log("Hello World(setInterval) " + intervalIdIndex++);
},
    1000);
function setIntervalDemo() {
    window.clearInterval(intervalId);
}

window.setInterval(function () {
    var tt = document.title; //获取值
    document.title = tt.substr(1) + tt.charAt(0);
},
    500);

function SetTimeOutReadme(btn) {
    btn.disabled = true;
    var i = 5;
    var setId = setInterval(function () {
        i--;
        if (i <= 0) {
            clearInterval(setId); //清除计时器
            btn.value = '同意';
            //注意
            btn.disabled = false;
        } else {
            btn.value = '请仔细阅读协议(' + i + ')';
        }
    }, 1000);
}
function Demo7() {
    var len = document.getElementById("t1").getElementsByTagName("tr").length;
    for (var i = 1; i < len; i += 2) {
        var tr = document.getElementsByTagName("tr")[i];
        tr.style.backgroundColor = "#0078d7";
    }
}

function Clicktr(tr) {
    tr.style.backgroundColor = "#0078d7";
    var trs = document.getElementById("t2").getElementsByTagName("tr");
    var len = trs.length;
    for (var i = 0; i < len; i++) {
        if (trs[i].id != tr.id) {
            trs[i].style.backgroundColor = "white";
        }
    }
}

function Demo8() {
    var trs = document.getElementById('t3').getElementsByTagName('tr');
    for (var i = 0; i < trs.length; i++) {
        trs[i].onclick = function () {
            for (var j = 0; j < trs.length; j++) {
                trs[j].style.backgroundColor = '';
            }
            this.style.backgroundColor = '#0078d7';
        };
    }
}

function Demo9() {
    var trs = document.getElementById('t4').getElementsByTagName('tr');
    for (var i = 0; i < trs.length; i++) {
        if (i % 2 === 0) {
            trs[i].style.backgroundColor = '';
        } else {
            trs[i].style.backgroundColor = '#0078d7';
        }
    }
}

function QA() {
    if (window.confirm("确认要删除")) {
        alert("删除成功！");
    }
    else {
        alert("未删除!");
    }
}

function InputNumber() {
    var num = window.prompt("请输入一个数字", 0);
    if (num) {
        var a = parseInt(num);
        alert("你输入的数字是：" + a);
    }
    else {
        alert("Error");
    }
}

var CreaseNum = 10;
function MoveDiv() {
    var divMove = document.getElementById("divSize");
    var width = divMove.offsetWidth + CreaseNum;
    var height = divMove.offsetHeight + CreaseNum;
    CreaseNum = CreaseNum + 0.02 * 0.5 * 9.8 * 9.8;
    divMove.style.width = width + "px";
    divMove.style.height = height + "px";
}
function AutoExpand() {
    setInterval(MoveDiv, 500);
}

function LoginShow() {
    var lh = document.getElementById("loginDiv").offsetHeight;
    var lw = document.getElementById("loginDiv").offsetWidth;

    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var scy = document.body.scrollTop || window.scrollY;
    var topp = ((h - lh) / 2) + "px";
    document.getElementById("loginDiv").style.top = topp;
    var leftp = ((w - lw) / 2) + "px";
    document.getElementById("loginDiv").style.left = leftp;
}

function SetAttr() {
    var tds = document.getElementById('tbAttr').getElementsByTagName('td');
    for (var i = 0; i < tds.length; i++) {
        tds[i].setAttribute('score', (i + 1) * 10);
        tds[i].onclick = function () {
            alert(this.getAttribute('score'));//获取每个单元格的属性的值
        };
    }
}

function ShowWindowsInfo() {
    var userAgent = window.navigator.userAgent;
    //浏览器宽度信息
    var screenwh = window.screen.width + "  " + window.screen.height;
    var availWh = window.screen.availWidth + "  " + window.screen.availHeight;
    var appName = window.navigator.appName;
    var appCodeName = window.navigator.appCodeName;
    var appVersion = window.navigator.appVersion;
    var authentication = window.navigator.authentication;
    var language = window.navigator.language;
    var languages = window.navigator.languages;
    debugger;
}

var dic = {
    "百度": "http://www.baidu.com",
    "新浪": "http://www.sina.cn",
    "谷歌": "http://www.google.com"
};

function CreateTable1() {
    var tbObj = document.createElement('table');
    tbObj.border = "1";
    for (var key in dic) {
        var trObj = document.createElement('tr');
        var tdObj1 = document.createElement('td');
        if (typeof (tdObj1.innerText) == 'string') {
            tdObj1.innerText = key; //文字
        } else {
            tdObj1.textContent = key;
        }
        var tdObj2 = document.createElement('td');
        tdObj2.innerHTML = '<a href="' + dic[key] + '">' + key + '</a>';
        trObj.appendChild(tdObj1);
        trObj.appendChild(tdObj2);
        tbObj.appendChild(trObj);
    }
    document.body.appendChild(tbObj);
}

//兼容写法
function CreateTable2() {
    var tbObj = document.createElement('table');
    tbObj.border = '1';
    for (var key in dic) {
        var trObj = tbObj.insertRow(-1);
        var tdObj1 = trObj.insertCell(-1);
        tdObj1.innerText = key;
        var tdObj2 = trObj.insertCell(-1);
        tdObj2.innerHTML = '<a href="' + dic[key] + '">' + key + '</a>';
    }
    document.body.appendChild(tbObj);
}

function ChangeFontStyle(e) {
    var oCodeDiv = document.getElementById("idCodeDiv");
    var oDiv = document.getElementById("idDiv");
    if (document.getElementById("idSel")) {
        var sValue = document.getElementById("idSel").options[e.selectedIndex].value;
        oDiv.style.fontStyle = sValue;
        oCodeDiv.innerText = "font-style : " + sValue + ";";
    }
}

function NumberToChar() {
    var html = "";
    for (var i = 0; i < 1000; i++) {
        var y = String.fromCharCode(i); // 将值转换为字符
        html += i + "(" + y + ")  ";
        if (i > 0 && i % 10 === 0) {
            html += "\n";
        }
    }
    document.getElementById("lblKeyCode").innerText = html;
}