function Pager(selector) {
    this.selector = selector;
    this.dom = document.querySelector(selector);
    this.domMore = this.dom.querySelector("tfoot td");
    this.tbody = this.dom.querySelector("tbody");
    if (!this.dom) {
        console.error("'" + selector + "' not found!");
        return false;
    }
    eval("this.data = " + this.dom.getAttribute("data-src"));
    this.count = parseInt(this.dom.getAttribute("data-count"));
    this.current = 0;
}
Pager.prototype.more = function() {
    this.domMore.innerText = "加载中...";
    var frag = document.createDocumentFragment();
    for (var i = this.current; i < this.current + this.data.length; i++) {
        if (!this.data[i] || this.data[i][0] == "EOF") break;
        var tr = document.createElement("tr"),
            td1 = document.createElement("td"),
            td2 = document.createElement("td"),
            a = document.createElement("a");
        a.href = "/search/" + this.data[i][0];
        a.appendChild(document.createTextNode(this.data[i][0]));
        td1.appendChild(a);
        td2.appendChild(document.createTextNode(this.data[i][1]));
        tr.appendChild(td1);
        tr.appendChild(td2);
        frag.appendChild(tr);
    }
    this.tbody.appendChild(frag);
    this.current += this.count;
    if (this.current > this.data.length) {
        this.current = this.data.length;
        this.domMore.innerText = "没有更多的数据了";
    } else {
        this.domMore.innerText = "加载更多";
    }
};

function getScrollTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
function getScrollHeight() {
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

var pager = new Pager(".pager");
pager.more();

window.onscroll = function() {
    if (getScrollTop() + getWindowHeight() == getScrollHeight()) {
        setTimeout(function () {
            pager.more();
        }, 200);
    }
};
