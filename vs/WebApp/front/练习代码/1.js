/*from tccdn minify at 2015-10-12 7:36:08,file：/touch/public/slider/0.0.1/slider.js?v=11*/
(function() {
    $.fn.slider = function(f) {
        var g = [];
        for (var d = 0, e = this.length; d < e; d++) {
            g.push(new c(this[d], f))
        }
        if (g.length === 1) {
            return g[0]
        } else {
            if (g.length > 1) {
                return g
            }
        }
    };

    function c(e, j) {
        $.extend(this, {
            content: "ul",
            item: "li",
            loop: true,
            speed: 300,
            duration: 3000,
            autoScroll: true
        }, j);
        e = $(e);
        var d = $(this.content, e),
            g = $(this.item, e);
        this.elem = e;
        this.content = d;
        this.index = 0;
        this.length = g.length;
        if (g.length <= 1) {
            return this
        }
        e.css({
            overflow: "hidden",
            position: "relative"
        });
        d.css({
            position: "relative",
            width: "100%"
        });
        for (var f = 1, h = g.length; f < h; f++) {
            $(g[f]).css({
                position: "absolute",
                width: "100%",
                top: 0,
                left: f * 100 + "%"
            })
        }
        a.call(this, g.length);
        if (this.loop) {
            $(g.first().clone()).css({
                position: "absolute",
                width: "100%",
                top: 0,
                left: g.length * 100 + "%"
            }).appendTo(d)
        }
        this.to(this.active ? this.active : 0);
        b.call(this);
        if (this.autoScroll) {
            this.start()
        }
    }

    function b() {
        var d = this;
        this.elem.on("touchstart", function(f) {
            var g = f.touches[0];
            d._startLocation = {
                x: g.pageX,
                y: g.pageY
            };
            d._isStart = false
        }).on("touchmove", function(g) {
            if (g.touches.length > 1 || g.scale && g.scale !== 1) {
                return
            }
            var j = g.touches[0],
                f = j.pageX - d._startLocation.x;
            if (!d._isStart) {
                d._isStart = Math.abs(f) > Math.abs(j.pageY - d._startLocation.y)
            }
            if (d._isStart) {
                g.preventDefault();
                clearTimeout(d.timer);
                var k = d.index,
                    h = d.elem.width();
                if (d.loop) {
                    if (d.index === 0 && f > 0) {
                        k = d.length
                    }
                } else {
                    f = f / ((d.index === 0 && f > 0 || d.index == d.length && f < 0) ? (Math.abs(f) / h + 1) : 1)
                }
                d.content.css({
                    "-webkit-transform": "translate3d(-" + 100 * (k - f / h) + "%, 0, 0)"
                });
                d._distX = f
            }
        }).on("touchend touchcancel", function(f) {
            if (d._isStart) {
                if (d._distX < 0) {
                    f.preventDefault();
                    d.next()
                } else {
                    f.preventDefault();
                    d.previous(true)
                }
            }
        })
    }
    c.prototype.to = function(d) {
        this.stop();
        var e = this;
        this.content.animate({
            "-webkit-transform": "translate3d(-" + d * 100 + "%, 0, 0)"
        }, this.speed, "ease", function() {
            if (d === e.length) {
                e.content.css({
                    "-webkit-transform": "translate3d(0, 0, 0)"
                });
                d = 0
            }
            e.index = d;
            if (e.indicators) {
                $(e.indicators.removeClass("active")[d]).addClass("active")
            }
            e.fn && e.fn()
        })
    };
    c.prototype.previous = function(e) {
        if (!this.loop && this.index === 0) {
            this.to(this.index);
            return
        }
        var d = this.index - 1;
        if (this.index === 0) {
            d = this.length - 1;
            if (!e) {
                this.content.css({
                    "-webkit-transform": "translate3d(-" + 100 * (this.length) + "%, 0, 0)"
                })
            }
        }
        this.to(d);
        if (this.autoScroll) {
            this.start()
        }
    };
    c.prototype.next = function() {
        if (!this.loop && this.index === this.length - 1) {
            this.to(this.index);
            return
        }
        this.to(this.index + 1);
        if (this.autoScroll) {
            this.start()
        }
    };
    c.prototype.start = function() {
        var d = this;
        this.timer = setTimeout(function() {
            d.next()
        }, this.duration)
    };
    c.prototype.stop = function() {
        clearTimeout(this.timer)
    };

    function a(g) {
        var d = '<span class="indicator">';
        for (var e = 0; e < g; e++) {
            d += "<i></i>"
        }
        d += "</span>";
        this.elem.append(d);
        var f = $(".indicator", this.elem);
        f.css({
            "margin-left": -f.width() / 2 + "px"
        });
        this.indicators = $("i", f);
        $(this.indicators[0]).addClass("active")
    }
})();
