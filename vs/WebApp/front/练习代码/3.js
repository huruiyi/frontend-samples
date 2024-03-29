/*from tccdn minify at 2015-11-24 14:36:04,file：/touch/public/dialog/0.0.1/dialog.js*/ ! function() {
    function a() {
        var e = b.attr("hl-cls");
        clearTimeout(c), b.removeClass(e).removeAttr("hl-cls"), b = null, d.off("touchend touchmove touchcancel", a)
    }
    var b, c, d = $(document);
    $.fn.highlight = function(e, f) {
        return this.each(function() {
            var g = $(this);
            g.css({
                "-webkit-tap-highlight-color": "rgba(255,255,255,0)"
            }).off("touchstart.hl"), e && g.on("touchstart.hl", function(h) {
                var i;
                b = f ? (i = $(h.target).closest(f, this)) && i.length && i : g, b && (b.attr("hl-cls", e), c = setTimeout(function() {
                    b.addClass(e)
                }, 100), d.on("touchend touchmove touchcancel", a))
            })
        })
    }
}(),
function() {
    function a(a) {
        this._options = this._options || {}, $.extend(this._options, d), $.extend(this._options, a), this.init()
    }

    function b(a) {
        var b, c, d, e = this,
            f = e._options;
        switch (a.type) {
            case f.RotateChangeEvent:
                f._isOpen && this.refresh();
                break;
            case "touchmove":
                f.scrollMove && a.preventDefault();
                break;
            case "click":
                if (f._mask && ($.contains(f._mask[0], a.target) || f._mask[0] === a.target)) return "function" == typeof f.maskClick && f.maskClick();
                c = f._wrap.get(0), (b = $(a.target).closest(".close", c)) && b.length ? e.close() : (b = $(a.target).closest(".ui-dialog-btns .ui-btn", c)) && b.length && (d = f.buttons[b.attr("data-key")], d && d.apply(e, arguments))
        }
    }
    var c = {
            close: '<a class="close" title="关闭"></a>',
            mask: '<div class="ui-mask"></div>',
            title: '<div class="ui-dialog-title"></div>',
            wrap: '<div class="ui-dialog"><div class="ui-dialog-content"></div>BTNSTRING</div> '
        },
        d = {
            autoOpen: !1,
            className: "",
            buttons: null,
            closeBtn: !1,
            mask: !0,
            width: 300,
            height: "auto",
            title: void 0,
            content: null,
            scrollMove: !0,
            container: null,
            maskClick: null,
            beforeOpen: null,
            afterOpen: null,
            beforeClose: null,
            afterClose: null,
            style: null,
            closeTime: 2e3,
            className: ""
        };
    a.prototype.getWrap = function() {
        return this._options._wrap
    }, a.prototype.init = function() {
        var a, d = this,
            e = d._options,
            f = 0,
            g = {};
        e.eventHand = $.proxy(b, d), e._container = $(e.container || document.body), (e._cIsBody = e._container.is("body")) || e._container.addClass("ui-dialog-container`"), g.btns = a = [], e.buttons && $.each(e.buttons, function(b) {
            a.push({
                index: ++f,
                text: b,
                key: b
            })
        }), e._mask = e.mask ? $(c.mask).appendTo(e._container) : null;
        var h = "";
        if (a[0]) {
            h = '<div class="ui-dialog-btns">';
            for (var f = 0, i = a.length; i > f; f++) {
                var j = a[f];
                h += '<a class="ui-btn ui-btn-' + f + '" data-key="' + j.key + '">' + j.text + "</a>"
            }
            h += "</div>"
        }
        e._wrap = $(c.wrap.replace("BTNSTRING", h)).appendTo(e._container), e._content = $(".ui-dialog-content", e._wrap), e._title = $(c.title), e._close = e.closeBtn && $(c.close).appendTo(e._title).highlight("close-hover").on("click", function() {
            d.close()
        }), d.title(e.title), d.content(e.content), a.length && $(".ui-dialog-btns .ui-btn", e._wrap).highlight("ui-state-hover"), e._wrap.css({
            width: e.width,
            height: e.height
        }).addClass(e.className), e.RotateChangeEvent = "onorientationchange" in window ? "orientationchange" : "resize", $(window).on(e.RotateChangeEvent, e.eventHand), e._wrap.on("click", e.eventHand), e._mask && e._mask.on("click", e.eventHand), e.autoOpen && d.open()
    }, a.prototype.calculate = function() {
        var a, b, c = this,
            d = c._options,
            e = document.body,
            f = {},
            g = d._cIsBody,
            h = Math.round;
        return d.mask && (f.mask = g ? {
            width: "100%",
            height: Math.max(e.scrollHeight, e.clientHeight)
        } : {
            width: "100%",
            height: "100%"
        }), a = d._wrap.offset(), b = $(window), f.wrap = {
            left: "50%",
            marginLeft: -h(d._wrap.width() / 2) + "px",
            top: g ? h(b.height() / 2) + window.pageYOffset : "50%",
            marginTop: -h(d._wrap.height() / 2) + "px"
        }, f
    }, a.prototype.refresh = function() {
        var a, b, c = this,
            d = c._options;
        return b = function() {
            a = c.calculate(), a.mask && d._mask.css(a.mask), d._wrap.css(a.wrap)
        }, $.os && $.os.ios && document.activeElement && /input|textarea|select/i.test(document.activeElement.tagName) ? (document.body.scrollLeft = 0, setTimeout(b, 200)) : setTimeout(b, 200), c
    }, a.prototype.open = function(a) {
        var b, c = this._options,
            d = this;
        if (!c._isOpen) {
            if (a && d.content(a), c._isOpen = !0, "tip" == c.style) {
                c.mask && c._mask.addClass("ui-dialog-tran-03"), c._wrap.addClass("ui-dialog-black");
                var e = d.getWrap();
                setTimeout(function() {
                    c.mask && c._mask.animate({
                        opacity: 0
                    }, 1e3, "ease-out", function() {
                        c._mask.css({
                            opacity: ""
                        })
                    }), e.animate({
                        opacity: 0
                    }, 1e3, "ease-out", function() {
                        e.css({
                            opacity: "1"
                        }), d.close()
                    })
                }, c.closeTime)
            }
            if ("function" == typeof c.beforeOpen && (b = c.beforeOpen()), b) return this;
            c._wrap.css({
                display: "block"
            }), c._mask && c._mask.css({
                display: "block"
            }), this.refresh(), $(document).on("touchmove", c.eventHand), "function" == typeof c.afterOpen && c.afterOpen()
        }
    }, a.prototype.close = function(a) {
        var b = this._options;
        return "tip" == b.style && b.mask && b._mask.removeClass("ui-dialog-tran-03"), "function" == typeof b.beforeClose && b.beforeClose(), b._isOpen = !1, b._wrap.css({
            display: "none"
        }), a ? this : (b._mask && b._mask.css({
            display: "none"
        }), $(document).off("touchmove", b.eventHand), "function" == typeof b.afterClose && b.afterClose(this), this)
    }, a.prototype.title = function(a) {
        var b = this._options,
            c = void 0 !== a;
        return c && (a = (b.title = a) ? "<h3>" + a + "</h3>" : a, b._title.html(a)[a ? "prependTo" : "remove"](b._wrap), b._close && b._close.prependTo(b.title ? b._title : b._wrap)), c ? this : b.title
    }, a.prototype.content = function(a) {
        var b = this._options,
            c = void 0 !== a;
        return c && b._content.empty().append(b.content = a), c ? this : b.content
    }, a.prototype.destroy = function() {
        var a = this._options;
        return $(window).off(a.RotateChangeEvent, a.eventHand), $(document).off("touchmove", a.eventHand), a._wrap.off("click", a.eventHand).remove(), a._mask && a._mask.off("click", a.eventHand).remove(), a._close && a._close.highlight(), this
    }, $.dialog = function(b) {
        return new a(b)
    }
}(),
function() {
    function a(a, b) {
        var c = {
            autoOpen: !0,
            closeBtn: !1,
            style: "tip",
            mask: b,
            closeTime: 1e3,
            content: a
        };
        return $.dialog(c)
    }

    function b(b, e) {
        e ? "object" == typeof d ? d.open(b) : d = a(b, !0) : "object" == typeof c ? c.open(b) : c = a(b, !1)
    }
    var c, d;
    $.tip = b
}();
