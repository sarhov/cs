/*!
 * The Final Countdown for jQuery v2.0.2 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2013 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    "use strict";
    function b(a) {
        if (a instanceof Date)
            return a;
        if (String(a).match(g))
            return String(a).match(/^[0-9]*$/) && (a = Number(a)), new Date(a);
        throw new Error("Couldn't cast `" + a + "` to a date object.")
    }
    function c(a) {
        return function(b) {
            var c = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (c)
                for (var e = 0, f = c.length; f > e; ++e) {
                    var g = c[e].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), i = new RegExp(g[0]), j = g[1] || "", k = g[3] || "", l = null;
                    g = g[2], h.hasOwnProperty(g) && (l = h[g], l = Number(a[l])), null !== l && ("!" === j && (l = d(k, l)), "" === j && 10 > l && (l = "0" + l.toString()), b = b.replace(i, l.toString()))
                }
            return b = b.replace(/%%/, "%")
        }
    }
    function d(a, b) {
        var c = "s", d = "";
        return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), 1 === Math.abs(b) ? d : c
    }
    var e = 100, f = [], g = [];
    g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}(\/[0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|"));
    var h = {
        Y: "years",
        m: "months",
        w: "weeks",
        d: "days",
        D: "totalDays",
        H: "hours",
        M: "minutes",
        S: "seconds"
    }, i = function(b, c, d) {
        this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.setFinalDate(c), this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)), this.start()
    };
    a.extend(i.prototype, {
        start: function() {
            if (null !== this.interval)
                throw new Error("Countdown is already running!");
            var a = this;
            this.update(), this.interval = setInterval(function() {
                a.update.call(a)
            }, e)
        },
        stop: function() {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        },
        pause: function() {
            this.stop.call(this)
        },
        resume: function() {
            this.start.call(this)
        },
        remove: function() {
            this.stop(), delete f[this.instanceNumber]
        },
        setFinalDate: function(a) {
            this.finalDate = b(a)
        },
        update: function() {
            return 0 === this.$el.closest("html").length ? (this.remove(), void 0) : (this.totalSecsLeft = this.finalDate.valueOf() - (new Date).valueOf(), this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1e3), this.totalSecsLeft = this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft, this.offset = {
                seconds: this.totalSecsLeft%60,
                minutes: Math.floor(this.totalSecsLeft / 60)%60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60)%24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24)%7,
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),
                years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365)
            }, 0 === this.totalSecsLeft ? (this.stop(), this.dispatchEvent("finish")) : this.dispatchEvent("update"), void 0)
        },
        dispatchEvent: function(b) {
            var d = a.Event(b + ".countdown");
            d.finalDate = this.finalDate, d.offset = a.extend({}, this.offset), d.strftime = c(this.offset), this.$el.trigger(d)
        }
    }), a.fn.countdown = function() {
        var b = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var c = a(this).data("countdown-instance");
            if (void 0 !== c) {
                var d = f[c], e = b[0];
                i.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? d.setFinalDate.call(d, e) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e))
            } else 
                new i(this, b[0], b[1])
        })
    }
});

