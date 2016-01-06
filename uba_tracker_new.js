function UBATRACKER(){
            var a=this;
            var k=window;
            a.d=document;
            a.trackingServer='http://ubabox.com';
            a.b=[];
            a.bp=[];
            //a.replace
            a.replace = function(a, b, d) {
                return ! a ||
                0 > a.indexOf(b) ? a: a.split(b).join(d)
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
                var guid = "";
                for (var i = 1; i <= 32; i++){
                  var n = Math.floor(Math.random()*16.0).toString(16);
                  guid +=   n;
                  if((i==8)||(i==12)||(i==16)||(i==20))
                    guid += "-";
                }
                return guid;    
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
                        e = a.cookieLifetime,
                        g;
                b = "" + b;
                e = e ? ("" + e).toUpperCase() : "";
                d && "SESSION" !=
                e && "NONE" != e && ((g = "" != b ? parseInt(e ? e: 0) : -60) ? (d = new Date, d.setTime(d.getTime() + 1E3 * g)) : 1 == d && (d = new Date, g = d.getYear(), d.setYear(g + 5 + (1900 > g ? 1900: 0))));
                return c && "NONE" != e ? (a.d.cookie = c + "=" + a.escape("" != b ? b: "[[B]]") + "; path=/;" + (d && "SESSION" != e ? " expires=" + d.toGMTString() + ";": "") + (f ? " domain=" + f + ";": ""), a.cookieRead(c) == b) : 0
            };
            a.foreachVar = function(c, b) {
                var d,
                        f,
                        e,
                        g,
                        m = "";
                e = f = "";
                if (a.lightProfileID) d = a.K,
                (m = a.lightTrackVars) && (m = "," + m + "," + a.ga.join(",") + ",");
                else {
                    d = a.c;
                    if (a.pe || a.linkType) m = a.linkTrackVars,
                            f = a.linkTrackEvents,
                    a.pe && (e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1), a[e] && (m = a[e].yb, f = a[e].xb));
                    m && (m = "," + m + "," + a.A.join(",") + ",");
                    f && m && (m += ",events,")
                }
                b && (b = "," + b + ",");
                for (f = 0; f < d.length; f++) e = d[f],
                (g = a[e]) && (!m || 0 <= m.indexOf("," + e + ",")) && (!b || 0 <= b.indexOf("," + e + ",")) && c(e, g)
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
                var c = a.cookieRead("s_fid"),
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
                a.cookieWrite("s_fid", c, 1) || (c = 0);
                return c
            };
            //send request
            a.send=function(a){
                var i = new Image(2, 2);
                i.onLoad = function() {};
                i.src = a;
            };
            //ajax post
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
                var s= a.trackingServer,ps= a.trackingServer+"/collect/log";
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
                window.onload=ss;
            };
            a.tl = a.trackLink = function(c, b, d) {
                a.b.linkObject = c;
                a.b.linkType = b;
                a.b.linkName = d;
                return a.track()
            };

            a.Util = {
                urlEncode: a.escape,
                urlDecode: a.unescape,
                cookieRead: a.cookieRead,
                cookieWrite: a.cookieWrite,
                getQueryParam: function(c, b, d) {
                    var f;
                    b || (b = a.pageURL ? a.pageURL: k.location);
                    d || (d = "&");
                    return c &&
                    b && (b = "" + b, f = b.indexOf("?"), 0 <= f && (b = d + b.substring(f + 1) + d, f = b.indexOf(d + c + "="), 0 <= f && (b = b.substring(f + d.length + c.length + 1), f = b.indexOf(d), 0 <= f && (b = b.substring(0, f)), 0 < b.length))) ? a.unescape(b) : ""
                }
            };

        }

        var uba=new UBATRACKER();
        uba.trackingServer="http://collector.ubabox.com";
       uba.track();
