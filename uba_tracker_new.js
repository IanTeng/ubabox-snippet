function UBATRACKER(){
    var a=this;
    var k=window;
    var a.d=document;
    a.config={
        trackingServer:'collector.ubabox.com',
        account:'316494664'
    };
    a.trackingServer='http://ubabox.com';
    a.b=[];
    a.bp=[];
    //a.replace
    a.replace = function(a, b, d) {
        return ! a ||
        0 > a.indexOf(b) ? a: a.split(b).join(d)
    };

    //addEventLisener 为了兼容IE和CHROME等多浏览器
    a.addEventListener=function e(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
    };

    //a.escape
    a.escape = function(c) {
        var b,
                d;
        if (!c) return c;
        c = encodeURIComponent(c);
        for (b = 0; 7 > b; b++) d = "+~!*()'".substring(b, b + 1),
        0 <= c.indexOf(d) && (c = a.replace(c, d, "%" + d.charCodeAt(0).toString(16).toUpperCase()));
        return c
    };
    //a.unescape
    a.unescape = function(c) {
        if (!c) return c;
        c = 0 <= c.indexOf("+") ? a.replace(c, "+", " ") : c;
        try {
            return decodeURIComponent(c)
        } catch(b) {}
        return unescape(c)
    };
    a.guid=function() {
        for (var a = "", b = 0; 5 > b; b++) a += (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        return a
    };
    a.gd=a.guid();
    //cookie domain
    a.gb = function() {
        var c = k.location.hostname,
                b = a.fpCookieDomainPeriods,
                d;
        b || (b = a.cookieDomainPeriods);
        if (c && !a.cookieDomain &&
                !/^[0-9.]+$/.test(c) && (b = b ? parseInt(b) : 2, b = 2 < b ? b: 2, d = c.lastIndexOf("."), 0 <= d)) {
            for (; 0 <= d && 1 < b;) d = c.lastIndexOf(".", d - 1),
                    b--;
            a.cookieDomain = 0 < d ? c.substring(d) : c
        }
        return a.cookieDomain
    };
   //cookieRead
    a.c_r = a.cookieRead = function(c) {
        c = a.escape(c);
        var b = " " + a.d.cookie,
                d = b.indexOf(" " + c + "="),
                f = 0 > d ? d: b.indexOf(";", d);
        c = 0 > d ? "": a.unescape(b.substring(d + 2 + c.length, 0 > f ? b.length: f));
        return "[[B]]" != c ? c: ""
    };
    //cookieWrite
    a.c_w = a.cookieWrite = function(c, b, d) {
        var f = a.gb(),
                e = a.d.cookieLifetime,
                g;
        b = "" + b;
        e = e ? ("" + e).toUpperCase() : "";
        d && "SESSION" !=
        e && "NONE" != e && ((g = "" != b ? parseInt(e ? e: 0) : -60) ? (d = new Date, d.setTime(d.getTime() + 1E3 * g)) : 1 == d && (d = new Date, g = d.getYear(), d.setYear(g + 5 + (1900 > g ? 1900: 0))));
        return c && "NONE" != e ? (a.d.cookie = c + "=" + a.escape("" != b ? b: "[[B]]") + "; path=/;" + (d && "SESSION" != e ? " expires=" + d.toGMTString() + ";": "") + (f ? " domain=" + f + ";": ""), a.cookieRead(c) == b) : 0
    };

    //get request data init
    a.kb=a.initData = function() {
        a.b.s=screen.width + "x" + screen.height;//screen size
        a.b.g=document.location.href;          //pageUrl
        a.b.r=document.referrer;              //referrer
        a.b.vid= a.hb();
        a.b.b= a.getBrowser();
        a.b.o= a.getOS();
        //return a.b
    };
    //post request data init
    a.pb= function() {
        a.bp.s=screen.width + "x" + screen.height;//screen size
        a.bp.g=document.location.href;          //pageUrl
        a.bp.r=document.referrer;              //referrer
        a.bp.vid= a.hb();
        a.bp.b= a.getBrowser();
        a.bp.o= a.getOS();
       // return a.b
    };
   //getBrowser
    a.gb=a.getBrowser= function () {
        var b = "Other";
        var ua = k.navigator.userAgent;
        var br = {
            Sogou: /SE\s2\.X|SogouMobileBrowser/,
            Explorer2345: /2345Explorer|2345chrome|Mb2345Browser/,
            Liebao: /LBBROWSER/,
            QQBrowser: /QQBrowser/,
            Baidu: /BAIDUBrowser|baidubrowser|BaiduHD/,
            UC: /UBrowser|UCBrowser|UCWEB/,
            MiuiBrowser: /MiuiBrowser/,
            Wechat: /MicroMessenger/,
            MobileQQ: /Mobile\/\w{5,}\sQQ\/(\d+[\.\d]+)/,
            Shoujibaidu: /baiduboxapp/,
            Firefox: /Firefox/,
            Maxthon: /Maxthon/,
            Se360: /360S|EE/,
            TheWorld: /TheWorld/,
            Weibo: /__weibo__/,
            Opera: /Opera|OPR\/(\d+[\.\d]+)/,
            Edge: /Edge/,
            AndroidBrowser: /Android.*Mobile\sSafari|Android\/(\d[\.\d]+)\sRelease\/(\d[\.\d]+)\sBrowser\/AppleWebKit(\d[\.\d]+)/i,
            IE: /Trident|MSIE/,
            Chrome: /Chrome|CriOS/,
            Safari: /Version[|\/]([\w.]+)(\s\w.+)?\s?Safari|like\sGecko\)\sMobile\/\w{3,}$/,

        };
        for (var i in br) {
            if (br[i].exec(ua)) {
                b = i;
                break
            }
        }
        return b
    };
    //爬虫识别
    a.isBot=function() {
        return /bot|crawler|baiduspider|80legs|ia_archiver|voyager|curl|wget|yahoo! slurp|mediapartners-google|Google Page Speed Insights|Google Web/ig.test(navigator.userAgent) ? !0: !1
    },
    //Mobie Device Check
    a.device=function(){
        return /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent) ? "mobile": "pc";
    };
    //getOS
    a.go=a.getOS=function() {
        var os = "Others";
        var ua = k.navigator.userAgent;
        osReg = {
            Windows10: /(Windows 10.0|Windows NT 10.0)/,
            Windows8: /(Windows 8|Windows NT 6.2|Windows 8.1|Windows NT 6.3)/,
            Windows7:/(Windows 7|Windows NT 6.1)/,
            WindowsVista:/Windows NT 6.0/,
            WindowsServer2003:/Windows NT 5.2/,
            WindowsXP:/(Windows NT 5.1|Windows XP)/,
            Windows2000:/(Windows NT 5.0|Windows 2000)/,
            WindowsME:/(Win 9x 4.90|Windows ME)/,
            Android:/Android/,
            Linux:/(Linux|X11)/,
            iOS:/(iPhone|iPad|iPod)/,
            MacOSX:/Mac OS X/,
            MacOS:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
            UNIX:/UNIX/
    }
        for (var i in osReg) {
            if (osReg[i].exec(ua)) {
                os = i;
                break
            }
        }
        return os
    };
    //generate VisitorID
    a.hb = function() {
        var c = a.cookieRead("ubaid"),
                b = "",
                d = "",
                f;
        f = 8;
        var e = 4;
        if (!c || 0 > c.indexOf("-")) {
            for (c = 0; 16 > c; c++) f = Math.floor(Math.random() * f),
                    b += "0123456789ABCDEF".substring(f, f + 1),
                    f = Math.floor(Math.random() * e),
                    d += "0123456789ABCDEF".substring(f, f + 1),
                    f = e = 16;
            c = b + d
        }
        a.cookieWrite("ubaid", c, 1) || (c = 0);
        return c
    };
    //send request
    a.send=function(a){
        var i = new Image(2, 2);
        i.onLoad = function() {};
        i.src = a;
    };
    //post data with CORS跨域资源共享，a->url,b->data,c->callback
    a.ubapost=function(a, b, c) {
        var d = !1;
        window.XMLHttpRequest && (d = "withCredentials" in new XMLHttpRequest);
        var e = !1;
        d || window.XDomainRequest || (e = !0);
        if (window.XMLHttpRequest && d || e) try {
            var h = new window.XMLHttpRequest;
            h.open("POST", a, !0);
            h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            h.onreadystatechange = function() { (4 == this.readyState && 200 == this.status || void 0 == this.readyState) && "function" == typeof c && c()
            };
            h.send(b)
        } catch(k) {} else if (window.XDomainRequest) try {
            var g = new f.XDomainRequest;
            g.open("post", a);
            "function" == typeof c && (g.onload = c);
            g.onerror = function() {};
            g.onprogress = function() {};
            g.ontimeout = function() {};
            g.timeout = 6E3;
            setTimeout(function() {
                    g.send(b)
                },
                200)

        } catch(k) {}

    }

    //ajax post with iframe
    a.psend=function(data){
     // Add the iframe with a unique name
        var ic = document.getElementById("uba-a1c2d9f6");
        if(!ic){ic= document.createElement("iframe");}
        var u = "uba-a1c2d9f6";
        document.body.appendChild(ic);
        ic.style.display = "none";
        ic.contentWindow.name = u;
        ic.id=u;

        // construct a form with hidden inputs, targeting the iframe
        var form=document.getElementById("uba-a2");
        if(!form){form= document.createElement("form");}
        form.target = u;
        form.action = "http://collector.ubabox.com/collector/log";
        form.method = "POST";
        form.id="uba-a2";

        // repeat for each parameter
        for (i in data){
            if(data[i]){
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = i;
                input.value = data[i];
                form.appendChild(input);
            }

        }

        document.body.appendChild(form);
        form.submit();
        document.getElementById("uba-a2").innerHTML="" ;
    };
    //buid query param for sending
    a.bq= a.buidQuery=function(b){
        var c='v=1.0';
        for (i in b){
            if(b[i]!=''){c+="&"+i+"="+ a.escape(b[i])}}
        return c
    };
    //send event data
    a.t = a.track = function() {
       a.initData();
        var s= a.config.trackingServer;
        //a.doPlugins(a);
        var url;
        var f = new Date;
        var e = "s" + Math.floor(f.getTime() / 108E5) % 10 + Math.floor(1E13 * Math.random());
        var q=a.bq(a.b);
        url= s+"/collect/log/"+e+"?log=1&"+q;
        //clear vars
        a.b=[];
        a.send(url);
        //post send
        function ss(){a.pb();a.psend(a.bp)}
        //To Do:window.onload should change to addEventLisener
        a.addEventListener(window,"load",ss)
        //window.onload=ss;
    };
    a.tl = a.trackLink = function(c, b, d) {
        a.b.linkObject = c;
        a.b.linkType = b;
        a.b.linkName = d;
        return a.track()
    };
    //base64编码
    a.Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(e) {
            var t,
                n,
                r,
                i,
                o,
                a,
                s,
                l = "",
                c = 0;
            for (e = Base64._utf8_encode(e); c < e.length;) t = e.charCodeAt(c++),
                n = e.charCodeAt(c++),
                r = e.charCodeAt(c++),
                i = t >> 2,
                o = (3 & t) << 4 | n >> 4,
                a = (15 & n) << 2 | r >> 6,
                s = 63 & r,
                isNaN(n) ? a = s = 64: isNaN(r) && (s = 64),
                l = l + this._keyStr.charAt(i) + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(s);
            return  l.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, ",").replace(/B/g, "~")
        },
        decode: function(e) {
            var t,
                n,
                r,
                i,
                o,
                a,
                s,
                l = "",
                c = 0;
            e=e.replace(/-/g, "+").replace(/_/g, "/").replace(/,/g, "=").replace(/~/g, "B");
            for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < e.length;) i = this._keyStr.indexOf(e.charAt(c++)),
                o = this._keyStr.indexOf(e.charAt(c++)),
                a = this._keyStr.indexOf(e.charAt(c++)),
                s = this._keyStr.indexOf(e.charAt(c++)),
                t = i << 2 | o >> 4,
                n = (15 & o) << 4 | a >> 2,
                r = (3 & a) << 6 | s,
                l += String.fromCharCode(t),
            64 != a && (l += String.fromCharCode(n)),
            64 != s && (l += String.fromCharCode(r));
            return l = Base64._utf8_decode(l)
        },
        _utf8_encode: function(e) {
            e = e.replace(/\r\n/g, "\n");
            for (var t = "", n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                128 > r ? t += String.fromCharCode(r) : r > 127 && 2048 > r ? (t += String.fromCharCode(192 | r >> 6), t += String.fromCharCode(128 | 63 & r)) : (t += String.fromCharCode(224 | r >> 12), t += String.fromCharCode(128 | 63 & r >> 6), t += String.fromCharCode(128 | 63 & r))
            }
            return t
        },
        _utf8_decode: function(e) {
            for (var t = "", n = 0, r = c1 = c2 = 0; n < e.length;) r = e.charCodeAt(n),
                128 > r ? (t += String.fromCharCode(r), n++) : r > 191 && 224 > r ? (c2 = e.charCodeAt(n + 1), t += String.fromCharCode((31 & r) << 6 | 63 & c2), n += 2) : (c2 = e.charCodeAt(n + 1), c3 = e.charCodeAt(n + 2), t += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3), n += 3);
            return t
        }
    };


//  a.getQueryParam
    a.getQueryParam = function(c, b, d) {
        var f;
        b || (b = a.pageURL ? a.pageURL: k.location);
        d || (d = "&");
        return c &&
        b && (b = "" + b, f = b.indexOf("?"), 0 <= f && (b = d + b.substring(f + 1) + d, f = b.indexOf(d + c + "="), 0 <= f && (b = b.substring(f + d.length + c.length + 1), f = b.indexOf(d), 0 <= f && (b = b.substring(0, f)), 0 < b.length))) ? a.unescape(b) : ""
    }
}

var uba=new UBATRACKER();
uba.trackingServer="http://collector.ubabox.com";
uba.track();
