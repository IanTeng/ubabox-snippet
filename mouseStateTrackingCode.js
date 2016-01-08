/*inactive-Heatmaps*/
/*inactive-FormAnalytics*/
/*inactive-MicroSurveys*/
var mousestats_project = void 0 == mousestats_project ? "": mousestats_project,
    mousestats_playbackProject = void 0 == mousestats_playbackProject ? "": mousestats_playbackProject,
    mousestats_formAnalyticsProject = void 0 == mousestats_formAnalyticsProject ? [] : mousestats_formAnalyticsProject,
    mousestats_microSurveysProject = void 0 == mousestats_microSurveysProject ? "": mousestats_microSurveysProject,
    mousestats_Site = void 0 == mousestats_Site ? "": mousestats_Site,
    mousestats_xadd = void 0 == mousestats_xadd ? "": mousestats_xadd;
var MouseStatsSharedControl = {
    j: null,
    z: null,
    trackingServerEnpoint: "https:" == location.protocol ? "https://ssl.mousestats.com/monitorv3/?": "http://ssl.mousestats.com/monitorv3/?",
    SurveyServerEnpoint: "https:" == location.protocol ? "https://ssl.mousestats.com/monitorv3/microsurvey?": "http://ssl.mousestats.com/monitorv3/microsurvey?",
    msbg: ["hm", "pb", "fa", "ms"],
    msbi: ["", "", "", ""],
    msbe: ["&", "\u0001", "\u0001", ""],
    mscf: "",
    msbt: [[], [], [], []],
    AccountInfo: [[], [['^http.*://(?:.*\\\\.)?mousestats\\.com.*(/|)(#.*|)$', '5754057138575623110']], [], []],
    mscb: !1,
    msbf: {},
    msbu: [0, 0, 0, 0, 0, 0, 0, 0],
    msav: 0,
    msar: [!1, !1, !1, !1],
    mscg: function(a) {
        if (!this.TrackEnableOrNot() || this.mscb || !this.msal()) return ! 1;
        this.localStorageWrite("", !1);
        this.InitCookie(a);
        this.msae();
        this.getBrowserNameAndVersion.init();
        mousestats_Site = a;
        document && "complete" == document.readyState ? MouseStatsSharedControl.checkModuleLoad() : this.mousestats_addEvtListener(window, "load",
            function() {
                MouseStatsSharedControl.checkModuleLoad()
            });
        this.stopMonitoring();
        this.mscb = !0
    },
    InitCookie: function(a) {
        this.msbf.msbv = a;
        this.msbf.msbh = this.randomGuid();
        a = this.cookieDomainPeriod();
        ".localhost" == a && (a = "");
        var b = new Date,
            b = (new Date(b.getFullYear() + 5, b.getMonth(), b.getDate())).toUTCString(),
            c = new Date;
        c.setTime(c.getTime() + 9E5);
        var c = c.toUTCString(),
            d = this.cookieRead("mousestats_vi");
        5 < d.length ? this.msbf.msbr = d: (this.msbf.msbr = this.randomGuid(), document.cookie = "mousestats_vi=" + this.msbf.msbr + "; path=/; domain=" + a + "; expires=" + b + ";");
        d = this.cookieRead("mousestats_si");
        this.msbf.setDataMsId = 5 < d.length ? d: this.randomGuid();
        document.cookie = "mousestats_si=" + this.msbf.setDataMsId + "; path=/; domain=" + a + "; expires=" + c + ";";
        this.msbf.getPageWidth = "";
        "undefined" !== typeof mousestats_visitorName && 0 !== mousestats_visitorName.length && (this.msbf.getPageWidth =
            mousestats_visitorName);
        "undefined" !== typeof MouseStats_VisitorName && 0 !== MouseStats_VisitorName.length && (this.msbf.getPageWidth = MouseStats_VisitorName)

    },
    checkModuleLoad: function() {
        setTimeout(function() {
                "undefined" !== typeof MouseStats_DisableHeatmaps && !1 !== MouseStats_DisableHeatmaps || MouseStatsSharedControl.msah();
                "undefined" !== typeof MouseStats_DisablePlaybacks && !1 !== MouseStats_DisablePlaybacks || MouseStatsSharedControl.msaf();
                "undefined" !== typeof MouseStats_DisableFormAnalytics && !1 !== MouseStats_DisableFormAnalytics ||
                MouseStatsSharedControl.sendAndClearCommandQueue();
                "undefined" !== typeof MouseStats_DisableMicroSurveys && !1 !== MouseStats_DisableMicroSurveys || MouseStatsSharedControl.msac()

            },
            300)

    },
    //判断是否开启跟踪（根据url的参数或者IE版本）
    TrackEnableOrNot: function() {
        if (0 < window.location.toString().indexOf("disableMonitoring_mousestats")) return ! 1;
        try {
            if ("undefined" !== typeof parent && "undefined" !== typeof parent.WebPlayer) return ! 1
        } catch(b) {}
        try {
            var a = function() {
                var a = navigator.userAgent.toLowerCase();
                return - 1 != a.indexOf("msie") ? parseInt(a.split("msie")[1]) : !1
            };
            if (!1 !== a() && 9 >= a()) return ! 1
        } catch(b) {}
        return MouseStatsSharedControl.blockMonitoring() ?
            !1: !0

    },
    msaw: function(a) {
        var b = location.href;
        return (new RegExp(a.split("+").join("\\+").split("\\\\").join("\\"), "i")).test(b) ? !0: !1
    },
    msaf: function() {
        location.host.toLowerCase();
        for (var a = 0; a < this.AccountInfo[1].length; a++) if (this.msaw(this.AccountInfo[1].a[0])) {
            mousestats_playbackProject = this.AccountInfo[1].a[1];
            break
        }
        try {
            0 !== mousestats_playbackProject.length && MouseStatsSharedControl.generateActionData(function() {
                MouseStatsSharedControl.msaz("fullplayback.v3.public")
            })
        } catch(b) {
            MouseStatsSharedControl.generateActionData(function() {
                MouseStatsSharedControl.msaz("fullplayback.v3.public")
            })
        }
    },
    msah: function() {
        for (var a = "", b = 0; b < this.AccountInfo[0].length; b++) if (this.msaw(this.AccountInfo[0].b[0])) {
            var c = this.AccountInfo[0].b[3],
                d = !1; - 1 === c.indexOf(":") ? this.isMobile() || (d = !0) : (c = c.split(":"), msbx = document.documentElement && 0 !== document.documentElement.clientHeight ? document.documentElement: document.body, msci = msbx.clientWidth || window.innerWidth, msci >= parseInt(c[0]) && msci <= parseInt(c[1]) && (d = !0));
            c = !0;
            if ("undefined" !== typeof MouseStatsCustomCode && "undefined" !== typeof MouseStatsCustomCode.decisionHeatmap) {
                c = MouseStatsCustomCode.decisionHeatmap(this.AccountInfo[0].b[1]);
                try {
                    clearInterval(MouseStatsCustomCode.theI)
                } catch(e) {}
                MouseStatsCustomCode.theI = setInterval("MouseStatsSharedControl.msah()", 1E3)

            }
            d && c && (a = this.AccountInfo[0].b[1], mousestats_xadd = this.AccountInfo[0].b[2]);
            if (0 !== a.length) if ("undefined" !== typeof mousestats_setproject && 0 !== mousestats_setproject.length) {
                if (mousestats_setproject === a) break
            } else break

        }
        "undefined" !== typeof MouseStatsHeatmaps && "undefined" !== typeof MouseStatsHeatmaps.Pause && 0 !== a.length && a !== mousestats_project && (0 !== mousestats_project.length && MouseStatsHeatmaps.Pause(),
            mousestats_project = a, MouseStatsHeatmaps.Resume());
        "undefined" !== typeof MouseStatsHeatmaps && "undefined" !== typeof MouseStatsHeatmaps.Pause && 0 === a.length && MouseStatsHeatmaps.Pause();
        mousestats_project = a;
        0 < mousestats_project.length && "undefined" === typeof MouseStatsHeatmaps && !this.msar[0] && ("undefined" === typeof MouseStats_jQueryHeatmaps ? MouseStatsSharedControl.msaz("heatmap.recording.v3.public") : MouseStatsSharedControl.generateActionData(function() {
            MouseStatsSharedControl.msaz("heatmap.recording.v3.public")
        }))

    },
    msaq: function() {
        for (var a =
            0; a < this.AccountInfo[2].length; a++) this.msaw(this.AccountInfo[2].a[0]) && mousestats_formAnalyticsProject.push([this.AccountInfo[2].a[1], this.AccountInfo[2].a[2]]);
        try {
            0 !== mousestats_formAnalyticsProject.length && MouseStatsSharedControl.generateActionData(function() {
                MouseStatsSharedControl.msaz("forms.v4.public")
            })
        } catch(b) {
            MouseStatsSharedControl.generateActionData(function() {
                MouseStatsSharedControl.msaz("forms.v4.public")
            })
        }

    },
    msac: function() {
        for (var a = void 0 != mousestats_microSurveysProject ? mousestats_microSurveysProject.ID: -1, b = !1, c = 0; c < this.AccountInfo[3].length; c++) if (this.msaw(this.AccountInfo[3].c[0])) {
            mousestats_microSurveysProject =
                this.AccountInfo[3].c[1];
            b = !0;
            break

        }
        b ? mousestats_microSurveysProject.ID !== a && "undefined" !== typeof MouseStatsMicroSurveys && MouseStatsMicroSurveys.Reset() : 0 < a && "undefined" !== typeof MouseStatsMicroSurveys && (MouseStatsMicroSurveys.Destroy(), mousestats_microSurveysProject = void 0);
        try {
            "undefined" !== typeof mousestats_microSurveysProject.ID && MouseStatsSharedControl.msaz("microsurvey.v3.public")
        } catch(d) {
            MouseStatsSharedControl.msaz("microsurvey.v3.public")
        }
        setTimeout("MouseStatsSharedControl.msac()", 2100)

    },
    //加载jqeury
    msad: function(a) {
        if (null !==
            MouseStatsSharedControl.j && MouseStatsSharedControl.j.fn.on) a();
        else if (null !== document.getElementById("mouseStatsQInjection")) setTimeout(function() {
                MouseStatsSharedControl.generateActionData(a)
            },
            200);
        else if ("undefined" !== typeof jQuery && jQuery.fn.on) MouseStatsSharedControl.j = jQuery,
            MouseStatsSharedControl.generateActionData(a);
        else {
            var b = !1,
                c = document.getElementsByTagName("head")[0],
                d = document.createElement("script");
            d.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
            "undefined" !== typeof MouseStats_GoogleBlocked &&
            MouseStats_GoogleBlocked && (d.src = "//code.jquery.com/jquery-1.9.1.min.js");
            d.type = "text/javascript";
            d.id = "mouseStatsQInjection";
            d.onload = d.onreadystatechange = function() {
                if (! (b || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)) {
                    b = !0;
                    d.onload = d.onreadystatechange = null;
                    var c = jQuery.noConflict(!0);
                    MouseStatsSharedControl.j = c;
                    MouseStatsSharedControl.generateActionData(a)
                }
            };
            c.appendChild(d)

        }

    },
    //加载统计代码
    msaz: function(a) {
        var b = "MouseStats-" + a.replace(/\W/g, "");
        if (null === document.getElementById(b)) {
            var c =
                    "http://www2.mousestats.com/static/jstracking/" + a + ".js",
                d = "https://ssl.mousestats.com/static/jstracking/" + a + ".js";
            a = document.createElement("script");
            c = "https:" == location.protocol ? d: c;
            a.id = b;
            a.src = c;
            a.async = !0;
            a.type = "text/javascript";
            document.body.appendChild(a)

        }

    },
    isPlaybackLoaded: function() {
        return "undefined" !== typeof MouseStatsVisitorPlaybacks && MouseStatsVisitorPlaybacks.isLoaded ? !0: !1
    },
    isHeatmapLoaded: function() {
        return "undefined" !== typeof MouseStatsHeatmaps && MouseStatsHeatmaps.isLoaded ? !0: !1
    },
    isFormAnalyticsLoaded: function() {
        return "undefined" !==
        typeof MouseStatsFormAnalytics && MouseStatsFormAnalytics.isLoaded ? !0: !1

    },
    isMicroSurveysLoaded: function() {
        return "undefined" !== typeof MouseStatsMicroSurveys && MouseStatsMicroSurveys.isLoaded ? !0: !1
    },
    stopMonitoring: function() {
        function a() {
            MouseStatsSharedControl.isModulesLoaded(!0)
        }
        this.mousestats_addEvtListener(window, "beforeunload", a);
        this.mousestats_addEvtListener(window, "unload", a)
    },
    //cookie write
    cookieWrite: function(a, b, c) {
        var d = new Date;
        d.setDate(d.getDate() + c);
        var e = this.cookieDomainPeriod();
        ".localhost" == e && (e = "");
        b = escape(b) + (null == c ? "": "; path=/; domain=" +
            e + "; expires=" + d.toUTCString());
        document.cookie = a + "=" + b

    },
    //cookie read
    cookieRead: function(a) {
        var b,
            c,
            d,
            e = document.cookie.split(";");
        for (b = 0; b < e.length; b++) if (c = e.b.substr(0, e.b.indexOf("=")), d = e.b.substr(e.b.indexOf("=") + 1), c = c.replace(/^\s+|\s+$/g, ""), c == a) return unescape(d)
    },
    blockMonitoring: function() {
        if ("undefined" !== typeof MouseStats_EnablePermanentBlockFeature && !0 === MouseStats_EnablePermanentBlockFeature) {
            try {
                if (0 < window.location.toString().indexOf("MouseStatsEnablePermanent")) return this.cookieWrite("mousestats_disable", "",
                    365),
                    !1;
                if (0 < window.location.toString().indexOf("MouseStatsDisablePermanent")) return this.cookieWrite("mousestats_disable", "true", 365),
                    !0;
                if (void 0 !== this.cookieRead("mousestats_disable") && 1 < this.cookieRead("mousestats_disable").length) return ! 0

            } catch(a) {}
            return ! 1

        }

    },
    msbn: function(a, b) {
        this.msbi.a = b;
        return ! 0
    },
    msbk: function(a, b) {
        2 == a && (this.msbt.a = []);
        this.msbt.a.push(b);
        return ! 0
    },
    msce: function(a) {
        "undefined" === typeof a && (a = !1);
        for (var b = "tags:" + this.base64.encode(this.partnerModuleIntegration()) + "*", c = !1, d = 0; d < this.msbg.length; d++) if (0 <
            this.msbi.d.length && 0 < this.msbt.d.length) {
            for (var c = "", e = 0; e < this.msbt.d.length; e++) c += this.msbt.d.e + this.msbe.d;
            b += this.msbg.d + ":" + this.msbi.d + "&data=" + this.base64.encode(c) + "*";
            c = !0
        }
        c && (this.msbl(), this.msav += 1, 200 < this.msav ? this.StopAll() : a ? this.localStorageWrite(b, !0) : this.postData("", b, null))

    },
    //post数据到服务器，通过跨域资源共享（CORS），需要在接收数据的服务器端
    postData: function(a, b, c) {
        if (this.isBot() || 0 < document.location.toString().indexOf("mousestatsDisableSubmit")) return ! 1;
        0 === a.length && (a = this.trackingServerEnpoint);
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

    },
    //移动设备识别
    isMobile: function() {
        try {
            return /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent) ? !0: !1
        } catch(a) {
            try {
                console.log("MS: Error in isMobile")
            } catch(b) {}
            return ! 1
        }
    },
    //判断相关组件是否已经加载
    isModulesLoaded: function(a) {
        var b = !1;
        try {
            b = b || MouseStatsVisitorPlaybacks.isLoaded
        } catch(c) {}
        try {
            b = b || MouseStatsHeatmaps.isLoaded
        } catch(c) {}
        try {
            b =
                b || MouseStatsFormAnalytics.isLoaded

        } catch(c) {}
        if (b) {
            try {
                MouseStatsVisitorPlaybacks.Stop()
            } catch(c) {}
            try {
                MouseStatsHeatmaps.Stop()
            } catch(c) {}
            try {
                MouseStatsFormAnalytics.Stop()
            } catch(c) {}
            try {
                MouseStatsSharedControl.msce(a)
            } catch(c) {}
        }

    },
    StopAll: function() {
        MouseStatsSharedControl.isModulesLoaded(!1)
    },
    //浏览器兼容的addEventListener
    mousestats_addEvtListener: function(a, b, c) {
        document.addEventListener ? a ? a.addEventListener(b, c, !1) : addEventListener(b, c, !1) : attachEvent && (a ? a.attachEvent("on" + b, c) : attachEvent("on" + b, c))
    },
    //与其他分析或个性化引擎的结合
    /*
    */
    partnerModuleIntegration: function() {
        function a(a,
                   b) {
            MouseStats_Commands.push(["tag", a, b])
        }
        var b = "";
        0 < this.msbf.getPageWidth.length && (b += "[" + this.msbf.getPageWidth.trim() + "]");
        try {
            var c = window.ub.page.name;
            "number" != typeof c && "string" != typeof c || a("Unbounce-Name", c)
        } catch(g) {}
        try {
            c = window.ub.page.variantId,
            "number" != typeof c && "string" != typeof c || a("Unbounce-Variant", c)
        } catch(g) {}
        try {
            var d = window.optimizely.data.state.activeExperiments[0],
                c = d;
            "number" != typeof c && "string" != typeof c || a("Optimizely-ExperimentID", c)
        } catch(g) {}
        try {
            d = window.optimizely.data.state.activeExperiments[0],
                c = window.optimizely.data.state.variationNamesMap.d,
            "number" != typeof c && "string" != typeof c || a("Optimizely-VariationName", c)

        } catch(g) {}
        try {
            d = window.optimizely.data.state.activeExperiments[0],
                c = window.optimizely.data.state.variationIdsMap.d,
            "number" != typeof c && "string" != typeof c || a("Optimizely-VariationID", c)
        } catch(g) {}
        try {
            c = window.__variant,
            "number" != typeof c && "string" != typeof c || a("Instapage-Variant", c)
        } catch(g) {}
        if ("undefined" !== typeof MouseStats_Commands && 0 < MouseStats_Commands.length) {
            uniq = function(a,
                            b) {
                var c = {};
                return a.filter(function(a) {
                    a = b ? b.apply(a) : a;
                    return a in c ? !1: c.a = !0
                })
            };
            MouseStats_Commands = uniq(MouseStats_Commands, [].join);
            c = "";
            for (d = 0; d < MouseStats_Commands.length; d++) if (0 === MouseStats_Commands.d[0].indexOf("tag") || 0 === MouseStats_Commands.d[0].indexOf("identify")) try {
                var e = 2 < MouseStats_Commands.d.length ? MouseStats_Commands.d[1].trim() + ":": "",
                    h = 2 < MouseStats_Commands.d.length ? MouseStats_Commands.d[2].trim() : MouseStats_Commands.d[1].trim(),
                    b = b + ("[" + (e + h) + "]");
                0 == MouseStats_Commands.d[0].indexOf("identify") &&
                0 < h.length && (c = "[_ms_identify:" + h.substring(0, 50) + "]")

            } catch(g) {}
            b += c

        }
        return b

    },
    msbc: function() {
        this.msce();
        this.msae()
    },
    msae: function() {
        try {
            clearInterval(this.msbu[0])
        } catch(a) {}
        this.msbu[0] = setInterval("MouseStatsSharedControl.msbc();", 8E3)
    },
    msbl: function() {
        this.msbt = [[], [], []]
    },
    //读取cookie字段
    cookieRead: function(a) {
        for (var b, c, d = document.cookie.split(";"), e = 0; e < d.length; e++) if (b = d.e.substr(0, d.e.indexOf("=")), c = d.e.substr(d.e.indexOf("=") + 1), b = b.replace(/^\s+|\s+$/g, ""), b == a) return unescape(c);
        return ""
    },
    //
    msal: function() {
        return "cookie" in
            document && (0 < document.cookie.length || -1 < (document.cookie = "cenable=yes; path=/;").indexOf.call(document.cookie, "cenable"))

    },
    //生成随机值
    randomGuid: function() {
        for (var a = "", b = 0; 5 > b; b++) a += (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        return a
    },
    //返回cookie写入的域名
    cookieDomainPeriod: function() {
        var a = window.location.host;
        a.indexOf(":") && (a = a.split(":")[0]);
        if (/^([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3})?(:([0-9]{1,5})|)$/.test(a)) return a;
        a = window.location.href;
        a = a.replace(/^http(s)?\:\/\/?/i, "").replace(/^([^\/]+)\/.*/i, "$1");
        a = /\.gov\.|\.edu\.|\.ac\.|\.org\.|\.co\.|\.net\.|\.com\./.test(a) ?
            a.replace(/^([^\.]+\.){1,}([^\.]+\.[^\.]+\.[^\.]+)$/i, "$2") : a.replace(/^([^\.]+\.){1,}([^\.]+\.[^\.]+)$/i, "$2");
        a.indexOf(":") && (a = a.split(":")[0]);
        return "." + a

    },
    //往localStorage写字段
    localStorageWrite: function(a, b) {
        if (b) MouseStatsSharedControl.localStorageWriteFunction("d", a);
        else {
            var c = MouseStatsSharedControl.localStorageWriteFunction("d");
            10 < c.length && (MouseStatsSharedControl.postData("", c, null), MouseStatsSharedControl.localStorageWriteFunction("d", ""))
        }
    },
    //写入localStorage
    localStorageWriteFunction: function(a, b) {
        try {
            var c = !1;
            "undefined" == typeof b && (c = !0);
            if (c) return "undefined" == typeof localStorage["ms_" + a] ? "": localStorage["ms_" + a];
            localStorage["ms_" +
            a] = b;
            return ! 0

        } catch(d) {
            return ""
        }

    },
    //网页爬虫识别
    isBot: function() {
        return /bot|crawler|baiduspider|80legs|ia_archiver|voyager|curl|wget|yahoo! slurp|mediapartners-google|Google Page Speed Insights|Google Web/ig.test(navigator.userAgent) ? !0: !1
    },
    //数据加密
    base64: {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(a) {
            var b = "",
                c,
                d,
                e,
                h,
                g,
                k,
                l = 0;
            for (a = this._utf8_encode(a); l < a.length;) c = a.charCodeAt(l++),
                d = a.charCodeAt(l++),
                e = a.charCodeAt(l++),
                h = c >> 2,
                c = (c & 3) << 4 | d >> 4,
                g = (d & 15) << 2 | e >> 6,
                k = e & 63,
                isNaN(d) ?
                    g = k = 64: isNaN(e) && (k = 64),
                b = b + this._keyStr.charAt(h) + this._keyStr.charAt(c) + this._keyStr.charAt(g) + this._keyStr.charAt(k);
            return b.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, ",").replace(/A/g, "~")

        },
        _utf8_encode: function(a) {
            a = a.replace(/\r\n/g, "\n");
            for (var b = "", c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d & 63 | 128))
            }
            return b
        }

    },
    //操作系统及浏览器识别
    getBrowserNameAndVersion: {
        init: function() {
            this.browser = this.searchString(this.dataBrowser) || "unknown";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "unknown";
            this.OS = this.searchString(this.dataOS) || "unknown"
        },
        searchString: function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a.b.string,
                    d = a.b.prop;
                this.versionSearchString = a.b.versionSearch || a.b.identity;
                if (c) {
                    if ( - 1 != c.indexOf(a.b.subString)) return a.b.identity
                } else if (d) return a.b.identity
            }
        },
        searchVersion: function(a) {
            var b =
                a.indexOf(this.versionSearchString);
            if ( - 1 != b) return parseFloat(a.substring(b + this.versionSearchString.length + 1))

        },
        dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
            {
                string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            {
                prop: window.opera,
                identity: "Opera",
                versionSearch: "Version"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"

            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            },
            {
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "MSIE",
                versionSearch: "MSIE"
            },
            {
                string: navigator.userAgent,
                subString: "Trident",
                identity: "MSIE",
                versionSearch: "rv"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            {
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"

            }],
        dataOS: [{
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
            {
                string: navigator.platform,
                subString: "Mac",
                identity: "Mac"
            },
            {
                string: navigator.userAgent,
                subString: "iPhone",
                identity: "iOS"
            },
            {
                string: navigator.userAgent,
                subString: "iPad",
                identity: "iOS"
            },
            {
                string: navigator.userAgent,
                subString: "iPod",
                identity: "iOS"
            },
            {
                string: navigator.userAgent,
                subString: "Android",
                identity: "Android"
            },
            {
                string: navigator.platform,
                subString: "Linux",
                identity: "Linux"
            }]

    }

};
MouseStatsSharedControl.sendHtmlDataToServer("5395240005006918326");
window.MouseStatsVisitorPlaybacks = [];
window.MouseStatsVisitorPlaybacks.customVariable = function() {};
/* cached:1/5/2016 2:22:35 PM */




var uba_commands = uba_commands || [],
    uba = {
        isDebug: undefined == typeof playbackDebug ? !1: playbackDebug,
        isLoaded: !1,
        msdz: {
            msdo: {
                msdc: 0,
                msde: 0,
                msdf: 0,
                msdg: 0,
                msck: 0,
                msds:
            },
            mscb: [],
            msdv: {
                x: 0,
                y: 0
            },
            msdb: +new Date,
            msdl: 0,
            msbb: [],
            mscs: [],
            mscp: {
                x: 0,
                y: 0
            },
            msce: {
                x: 0,
                y: 0
            },
            msca: {
                x: 0,
                y: 0
            },
            msbw: {
                x: 0,
                y: 0
            },
            msbf: {
                x: 0,
                y: 0
            },
            msal: [],
            msaj: [],
            msdn: !1,
            msav: [],
            msdy: !1
        },
        mscf: {
            msdr: 0,
            msah: null,
            msam: null,
            msaa: null,
            msaz: null,
            msag: null
        },
        msbv: null,
        msdu: null,
        msbl: !0,
        timestamp: 0,
        msct: function() {
            try {
                this.debugLog([15] Start);
                if (!MouseStatsSharedControl.TrackEnableOrNot()) {
                    return ! 0
                };
                if (1 == this.isLoaded) {
                    return ! 1
                };
                uba.setTimestamp();
                this.msbn();
                uba.debug(msbn);
                this.msar();
                uba.setTimestamp();
                this.msby();
                uba.debug(msby);
                this.sendHtmlDataToServer();
                uba.setTimestamp();
                this.msbm();
                uba.debug(msbm);
                this.msas();
                this.sendAndClearCommandQueue();
                this.msaz();
                this.msbj();
                this.debugLog([15] End);
            } catch(a) {
                undefined == typeof console && (console = {}),
                undefined == typeof console.log && (console.log = function() {}),
                    console.log(mserr:  + console.log(a.message))
            }
        },
        msbn: function() {
            uba.msdy || (uba.msdz = JSON.parse(JSON.stringify(uba.msbv)), this.isLoaded = !1, this.msdz.msdb = +new Date)
        },
        //mscg发送本页面的html数据到服务器上面
        sendHtmlDataToServer: function() {
            //debug
            this.debugLog([16] Start);
            //
            if (!uba.msdy) {
                if (0 === this.msdz.mscb.length) {
                    setTimeout(uba.sendHtmlDataToServer();, 500)
                } else {
                    //发送document数据 html就是document的数据
                    var e = ss=pb&a=init&wi= + this.msdz.msdo.msdc + &p= + this.msdz.msdo.msde + &vn= + this.escape(this.msdz.msdo.msds) + &v= + this.msdz.msdo.msdf + &s= + this.msdz.msdo.msdg + &r= + this.msdz.msdo.msck + &path= + this.escape(location.href) + &ref= + this.escape(document.referrer) + &title= + this.escape(document.title) + &sc= + screen.width + x + screen.height + &tou= + (ontouchstart in document.documentElement && MouseStatsSharedControl.isMobile()) + &browser= + this.escape(MouseStatsSharedControl.getBrowserNameAndVersion.browser) + &browserversion= + this.escape(MouseStatsSharedControl.getBrowserNameAndVersion.version) + &os= + this.escape(MouseStatsSharedControl.getBrowserNameAndVersion.OS) + &html= + MouseStatsSharedControl.base64.encode(uba.rebuidHTMLDocument());
                    MouseStatsSharedControl.postData(, e,
                        function() {
                            uba.msch()
                        });
                };
                this.debugLog([16] End);
            };
        },
        msch: function() {
            this.debugLog([17] called);
            this.msdz.msdn = !0;
            this.isLoaded = this.msdz.msdn;
        },
        msbr: function() {
            this.msdu(window).off(.mousestats);
            this.msdu(document).off(.mousestats);
        },
        msbm: function() {
            this.debugLog([12] Start);
            this.msbr();
            try {
                clearInterval(this.mscf.msah)
            } catch(c) {};
            this.mscf.msah = setInterval(uba.mscl();, 200);
            uba.setTimestamp();
            uba.msdu(window).on(blur.mousestats,
                function(e) {
                    try {
                        uba.msbl = !1,
                        uba.msae(15) && uba.msed({
                            type: 15
                        })
                    } catch(j) {
                        undefined == typeof console && (console = {}),
                        undefined == typeof console.log && (console.log = function() {}),
                            console.log(mserr:  + console.log(j.message))
                    }
                }).on(focus.mousestats,
                function(e) {
                    try {
                        uba.msbl = !0,
                        uba.msae(16) && uba.msed({
                            type: 16
                        })
                    } catch(j) {
                        undefined == typeof console && (console = {}),
                        undefined == typeof console.log && (console.log = function() {}),
                            console.log(mserr:  + console.log(j.message))
                    }
                });
            uba.debug(b1);
            uba.setTimestamp();
            uba.msdu(document).on(scroll.mousestats,
                function(e) {
                    try {
                        uba.msdz.trackingServerEnpoint = {
                            x: uba.msdu(window).scrollLeft(),
                            y: uba.msdu(window).scrollTop()
                        }
                    } catch(j) {
                        undefined == typeof console && (console = {}),
                        undefined == typeof console.log && (console.log = function() {}),
                            console.log(mserr:  + console.log(j.message))
                    }
                }).on(mousemove.mousestats,
                function(e) {
                    try {
                        uba.msdz.mscp = {
                            x: e.pageX,
                            y: e.pageY
                        }
                    } catch(j) {
                        undefined == typeof console && (console = {}),
                        undefined == typeof console.log && (console.log = function() {}),
                            console.log(mserr:  + console.log(j.message))
                    }
                }).on(click.mousestats,
                function(e) {
                    try {
                        uba.msae(1) && uba.msed({
                            type: 1,
                            x: e.pageX,
                            y: e.pageY,
                            target: uba.getValueInMsDataspace(e.target, data-ms-id)
                        })
                    } catch(j) {
                        undefined == typeof console && (console = {}),
                        undefined == typeof console.log && (console.log = function() {}),
                            console.log(mserr:  + console.log(j.message))
                    }
                }).on(mousedown.mousestats, a, :input,
                function(e) {
                    try {
                        uba.msed({
                            type: 6,
                            x: e.pageX,
                            y: e.pageY,
                            target: uba.getValueInMsDataspace(this, data-ms-id)
                        })
                    } catch(j) {
                        undefined == typeof console && (console = {}),
                        undefined == typeof console.log && (console.log = function() {}),
                            console.log(mserr:  + console.log(j.message))
                    }
                }).on(focus.mousestats, :input,
                function(e) {
                    try {
                        uba.msed({
                            type: 10,
                            target: uba.getValueInMsDataspace(e.target, data-ms-id)
                        })
                    } catch(j) {
                        undefined == typeof console && (console = {}),
                        undefined == typeof console.log && (console.log = function() {}),
                            console.log(mserr:  + console.log(j.message))
                    }
                }).on(blur.mousestats, :input,
                function(e) {
                    try {
                        uba.msed({
                            type: 11,
                            target: uba.getValueInMsDataspace(e.target, data-ms-id)
                        })
                    } catch(j) {
                        undefined == typeof console && (console = {}),
                        undefined == typeof console.log && (console.log = function() {}),
                            console.log(mserr:  + console.log(j.message))
                    }
                }).on(submit.mousestats, form,
                function(e) {
                    try {
                        uba.msed({
                            type: 12,
                            target: uba.getValueInMsDataspace(e.target, data-ms-id)
                        })
                    } catch(j) {
                        undefined == typeof console && (console = {}),
                        undefined == typeof console.log && (console.log = function() {}),
                            console.log(mserr:  + console.log(j.message))
                    }
                });
            uba.debug(b2);
            try {
                clearInterval(this.mscf.TrackEnableOrNot)
            } catch(c) {};
            this.mscf.TrackEnableOrNot = setInterval(uba.msaw, 3E3);
            uba.setTimestamp();
            this.msap();
            uba.debug(b3);
            uba.setTimestamp();
            var e = uba.msbh();
            uba.debug(b4);
            uba.setTimestamp();
            for (var e = e.split(,), j = 0; j < e.length; j += 1) {
                var k = e.j.trim();
                if (0 != k.length) {
                    uba.msdu(k).off(mouseenter.mousestats).off(mouseleave.mousestats).on(mouseenter.mousestats,
                        function(e) {
                            try {
                                uba.msed({
                                    type: 26,
                                    x: e.pageX,
                                    y: e.pageY,
                                    target: uba.getValueInMsDataspace(this, data-ms-id)
                                })
                            } catch(j) {
                                undefined == typeof console && (console = {}),
                                undefined == typeof console.log && (console.log = function() {}),
                                    console.log(mserr:  + console.log(j.message))
                            }
                        }).on(mouseleave.mousestats,
                        function(e) {
                            try {
                                uba.msed({
                                    type: 27,
                                    x: e.pageX,
                                    y: e.pageY,
                                    target: uba.getValueInMsDataspace(this, data-ms-id)
                                })
                            } catch(j) {
                                undefined == typeof console && (console = {}),
                                undefined == typeof console.log && (console.log = function() {}),
                                    console.log(mserr:  + console.log(j.message))
                            }
                        })
                };
            };
            uba.debug(b5);
            if (ontouchstart in document.documentElement && MouseStatsSharedControl.isMobile()) {
                uba.msdu(document).on(touchstart.mousestats,
                    function(e) {
                        try {
                            e = e.originalEvent.changedTouches,
                            0 !== e.length && uba.msed({
                                type: 21,
                                x: e[0].pageX,
                                y: e[0].pageY
                            })
                        } catch(j) {
                            undefined == typeof console && (console = {}),
                            undefined == typeof console.log && (console.log = function() {}),
                                console.log(mserr:  + console.log(j.message))
                        }
                    }).on(touchend.mousestats,
                    function(e) {
                        try {
                            uba.msdz.trackingServerEnpoint = {
                                x: uba.msdu(window).scrollLeft(),
                                y: uba.msdu(window).scrollTop()
                            },
                                e = e.originalEvent.changedTouches,
                            0 !== e.length && uba.msed({
                                type: 22,
                                x: e[0].pageX,
                                y: e[0].pageY
                            })
                        } catch(j) {
                            undefined == typeof console && (console = {}),
                            undefined == typeof console.log && (console.log = function() {}),
                                console.log(mserr:  + console.log(j.message))
                        }
                    }).on(touchmove.mousestats,
                    function(e) {
                        try {
                            uba.msdz.trackingServerEnpoint = {
                                x: uba.msdu(window).scrollLeft(),
                                y: uba.msdu(window).scrollTop()
                            },
                                e = e.originalEvent.changedTouches,
                            0 !== e.length && (uba.msdz.mscp = {
                                x: e[0].pageX,
                                y: e[0].pageY
                            },
                            uba.msae(23) && uba.mscl(!0, !0, !1))
                        } catch(j) {
                            undefined == typeof console && (console = {}),
                            undefined == typeof console.log && (console.log = function() {}),
                                console.log(mserr:  + console.log(j.message))
                        }
                    }).on(orientationchange.mousestats,
                    function(e) {
                        try {
                            uba.msed({
                                type: 24,
                                x: undefined == typeof window.orientation ? 0: window.orientation
                            })
                        } catch(j) {
                            undefined == typeof console && (console = {}),
                            undefined == typeof console.log && (console.log = function() {}),
                                console.log(mserr:  + console.log(j.message))
                        }
                    })
            };
            this.debugLog([12] End);
        },
        msaw: function() {
            try {
                uba.msdu(:input:visible).each(function(e, j) {
                    try {
                        null === uba.getValueInMsDataspace(j, data-ms-val) && setInterval(function() {
                                try {
                                    if (!uba.msbl) {
                                        return ! 1
                                    };
                                    var e = uba.msdu(j);
                                    if (e) {
                                        var l = uba.getValueInMsDataspace(e[0], data-ms-val);
                                    === l && (l = );
                                        var m = uba.msci(e);
                                        l !== m && (undefined != typeof l && null != l && uba.msed({
                                            type: 14,
                                            target: uba.getValueInMsDataspace(e[0], data-ms-id),
                                            value: m
                                        }), null === m && (m =  ), uba.setDataspaceValue(e[0], data-ms-val, m));
                                    };
                                } catch(f) {
                                    undefined == typeof console && (console = {}),
                                    undefined == typeof console.log && (console.log = function() {}),
                                        console.log(mserr:  + console.log(f.message))
                                }
                            },
                            350)
                    } catch(d) {
                        undefined == typeof console && (console = {}),
                        undefined == typeof console.log && (console.log = function() {}),
                            console.log(mserr:  + console.log(d.message))
                    }
                })
            } catch(a) {
                undefined == typeof console && (console = {}),
                undefined == typeof console.log && (console.log = function() {}),
                    console.log(mserr:  + console.log(a.message))
            }
        },
        msap: function() {
            try {
                uba.msdu(*).on(scroll.mousestats,
                    function(e) {
                        try {
                            if (scroll === uba.msdu(this).css(overflow) || scroll === uba.msdu(this).css(overflow-y) || scroll === uba.msdu(this).css(overflow-x) || auto === uba.msdu(this).css(overflow) || auto === uba.msdu(this).css(overflow-y)) {
                                var j = uba.getValueInMsDataspace(this, data-ms-id);
                                j && (uba.msdz.msal.j = {
                                    x: uba.msdu(this).scrollLeft(),
                                    y: uba.msdu(this).scrollTop()
                                });
                            }
                        } catch(d) {
                            undefined == typeof console && (console = {}),
                            undefined == typeof console.log && (console.log = function() {}),
                                console.log(mserr:  + console.log(d.message))
                        }
                    })
            } catch(a) {
                undefined == typeof console && (console = {}),
                undefined == typeof console.log && (console.log = function() {}),
                    console.log(mserr:  + console.log(a.message))
            }
        },
        msci: function(e) {
            if (!e) {
                return
            };
            var j = ;
            e.attr(type) && (j = e.attr(type).toLowerCase());
            if (checkbox === j || radio === j) {
                return e.prop(checked).toString()
            };
            var k = null !== e.val() ? e.val() : ;
            if (password === j || e.hasClass(sensitive)) {
                k = k.replace(/[^\s\\]/g, *)
            };
            return k;
        },
        mscl: function(e, j, k, l) {
            undefined == typeof e && (e = !0);
            undefined == typeof j && (j = !0);
            undefined == typeof k && (k = !0);
            undefined == typeof l && (l = !0);
            e && (uba.msdq(uba.msdz.mscp, uba.msdz.msce) || uba.msed({
                type: 0,
                x: uba.msdz.mscp.x,
                y: uba.msdz.mscp.y
            }), uba.msdz.msce.x = uba.msdz.mscp.x, uba.msdz.msce.y = uba.msdz.mscp.y);
            j && (uba.msdq(uba.msdz.trackingServerEnpoint, uba.msdz.cookieRead) || uba.msed({
                type: 2,
                x: uba.msdz.trackingServerEnpoint.x,
                y: uba.msdz.trackingServerEnpoint.y
            }), uba.msdz.cookieRead.x = uba.msdz.trackingServerEnpoint.x, uba.msdz.cookieRead.y = uba.msdz.trackingServerEnpoint.y);
            try {
                if (l) {
                    var m = uba.msdz.msal,
                        n = uba.msdz.randomGuid,
                        o;
                    for (o in m) {
                        m.hasOwnProperty(o) && (n.o || (n.o = {
                            x: 0,
                            y: 0
                        }), uba.msdq(m.o, n.o) || uba.msed({
                            type: 29,
                            x: m.o.x,
                            y: m.o.y,
                            target: o
                        }), uba.msdz.randomGuid.o.x = uba.msdz.msal.o.x, uba.msdz.randomGuid.o.y = uba.msdz.msal.o.y)
                    };
                }
            } catch(g) {};
            k && uba.isModulesLoaded() && uba.msed({
                type: 3,
                x: uba.msdz.msbf.x,
                y: uba.msdz.msbf.y
            });
        },
        msdq: function(e, j) {
            return e.x === j.x && e.y === j.y ? !0: !1
        },
        msao: function() {
            var e = {
                    x: 0,
                    y: 0
                },
                e = {
                    x: undefined !== typeof window.innerWidth ? window.innerWidth : uba.msdu(window).width(),
                    y: undefined !== typeof window.innerHeight ? window.innerHeight : uba.msdu(window).height()
                };
            0 == e.x && 0 == e.y && (e = document.getElementsByTagName(body)[0], e = {
                x: e.clientWidth,
                y: e.clientHeight
            });
            return uba.msdq(e, uba.msdz.msbf) ? !1: (uba.msdz.msbf.x = e.x, uba.msdz.msbf.y = e.y, !0);
        },
        getPageWidth: function() {
            this.debugLog([2] called);
            var e = uba.msdu(window).width(),
                j = uba.msdu(window).height();
            return {
                x: e,
                y: j
            };
        },
        msar: function() {
            uba.msdy || (this.debugLog([13] called), this.msdz.msdo.msdc = MouseStatsSharedControl.msbf.msbv, this.msdz.msdo.msde = mousestats_playbackProject, this.msdz.msdo.msck = MouseStatsSharedControl.randomGuid(), this.msdz.msdo.msdf = MouseStatsSharedControl.msbf.msbr, this.msdz.msdo.msdg = MouseStatsSharedControl.msbf.setDataMsId, this.msdz.msdo.msds = MouseStatsSharedControl.msbf.getPageWidth)
        },
        debugLog: function(e) {
            if (this.isDebug) {
                if (undefined != typeof debugDic) {
                    for (var j = 0; j < debugDic.length; j++) {
                        e = e.replace([ + debugDic.j[0] + ], debugDic.j[1])
                    }
                };
                console.log(MSPD:  + e);
            }
        },
        msbh: function() {
            for (var e = , j = {},
                     e = /:hover/, k = 0; k < window.document.styleSheets.length; k++) {
                var l = window.document.styleSheets.k;
                try {
                    for (var m = l.cssRules ? l.cssRules : l.rules, l = 0; l < m.length; l++) {
                        var n = m.l;
                        if (e.test(n.selectorText)) {
                            for (var o = n.selectorText.split(,), q, r = 0; r < o.length; r++) {
                                q = o.r.trim(),
                                e.test(e) && ( - 1 < q.indexOf(::) && (q = q.substring(0, q.indexOf(::))), -1 < q.indexOf(:) && (q = q.substring(0, q.indexOf(:))), j.q = !0)
                            }
                        };
                    }
                } catch(p) {
                    this.debugLog([20] has external css.)
                };
            };
            e = .mslisten, a;
            for (s in j) {
                0 < s.length && (e += ,  + s)
            };
            return e;
        },
        msed: function(e) {
            try {
                28 == e.type && this.debugLog([6] start: + JSON.stringify(e));
                undefined == typeof e && (e = {});
                if (undefined == typeof e.type || null == e.type || 0 > e.type) {
                    e.type = -1
                };
                if (undefined == typeof e.x || null == e.x || 0 > e.x) {
                    e.x = 0
                };
                if (undefined == typeof e.y || null == e.y || 0 > e.y) {
                    e.y = 0
                };
                if (undefined == typeof e.target || null == e.target) {
                    e.target =
                };
                if (undefined == typeof e.value || null == e.value) {
                    e.value =
                }; - 1 !== e.type && (e.date = +new Date - this.msdz.msdb, this.msdz.mscb.push(e), e = !1, uba.msae(55) && (e = 10240 < this.msax(this.msdz.mscb)), (200 < this.msdz.mscb.length || e) && this.mscq());
            } catch(b) {
                undefined == typeof console && (console = {}),
                undefined == typeof console.log && (console.log = function() {}),
                    console.log(mserr:  + console.log(b.message))
            }
        },
        sendAndClearCommandQueue: function() {
            try {
                if (!uba.msdy) {
                    if (undefined !== typeof uba_commands && 0 < uba_commands.length) {
                        for (var e = 0; e < uba_commands.length; e++) {
                            try {
                                this.msed({
                                    type: 17,
                                    target: uba_commands.e.key,
                                    value: uba_commands.e.value
                                })
                            } catch(b) {}
                        };
                        uba_commands = [];
                    };
                    try {
                        clearInterval(this.mscf.msaa)
                    } catch(b) {};
                    this.mscf.msaa = setInterval(uba.sendAndClearCommandQueue();, 2E3);
                }
            } catch(b) {
                undefined == typeof console && (console = {}),
                undefined == typeof console.log && (console.log = function() {}),
                    console.log(mserr:  + console.log(b.message))
            }
        },
        mscq: function(e) {
            try {
                if (this.debugLog([7] called), !uba.msdy && 0 !== this.msdz.mscb.length) {
                    if (undefined == typeof e && (e = !0), this.msdz.msdn) {
                        e = [];
                        e = this.msdz.mscb.slice();
                        this.msdz.mscb = [];
                        for (var j = , k = 0; k < e.length; k++) {
                            var l = e.k;
                            undefined != typeof l.type && undefined != typeof l.target && undefined != typeof l.value && (j += l.type +   + l.date +   + l.x +   + l.y +   + this.msac(l.target) +   + this.msac(l.value) +  );
                        };
                        var m = e[e.length - 1].date,
                            n = m - this.msdz.msdl;
                        this.msdz.msdl = m;
                        MouseStatsSharedControl.msbn(1, a=data&wi= + this.msdz.msdo.msdc + &p= + this.msdz.msdo.msde + &v= + this.msdz.msdo.msdf + &s= + this.msdz.msdo.msdg + &r= + this.msdz.msdo.msck + &t= + m + &td= + n);
                        MouseStatsSharedControl.msbk(1, j);
                        this.msas();
                    } else {
                        this.debugLog([7] jump-out:1)
                    }
                }
            } catch(h) {
                undefined == typeof console && (console = {}),
                undefined == typeof console.log && (console.log = function() {}),
                    console.log(mserr:  + console.log(h.message))
            }
        },
        msas: function() {
            if (!uba.msdy) {
                try {
                    clearInterval(this.mscf.localStorageWrite)
                } catch(a) {};
                this.mscf.localStorageWrite = setInterval(uba.mscq();, 6E3);
            }
        },
        msaz: function() {
            if (!uba.msdy) {
                var e = 1;
                undefined !== typeof MouseStats_PlaybackTrackPerformance && 0.9 < MouseStats_PlaybackTrackPerformance && (e = MouseStats_PlaybackTrackPerformance);
                2 > e && 4692543100778222636 == this.msdz.msdo.msdc.toString() && (e = 2.5);
                try {
                    clearInterval(this.mscf.msaz)
                } catch(b) {};
                this.mscf.msaz = setInterval(uba.AccountInfo();, 1E3 * e);
            }
        },
        //IE5/6/7版本的发送数据代码msco
        ie6SendPostData: function() {
            this.debugLog([10] called);
            if (window.XMLHttpRequest && !/msie 5|msie 6|msie 7/i.test(navigator.appVersion)) {
                var e = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function() {
                    if ( - 1 == arguments[1].indexOf(.mousestats.com/monitor) && -1 == arguments[1].indexOf(localhost:) && -1 == arguments[1].indexOf(::1:1111) && -1 == arguments[1].indexOf(/monitorpv2/)) {
                        uba.debugLog([10] prot.open);
                        this.mscz = uba.msdz.mscs.length;
                        var j = {
                            _sequence: this.mscz + 1,
                            _time: +new Date - uba.msdz.msdb,
                            _url: arguments[1],
                            _postData: ,
                            _responseText: ,
                            _contentType:
                        };
                        uba.msdz.mscs.push(j);
                        uba.msed({
                            type: 19,
                            x: j[_sequence],
                            y: 0
                        });
                        this.addEventListener ? this.addEventListener(readystatechange, uba.InitCookie, !1) : this.attachEvent && this.attachEvent(onreadystatechange, uba.InitCookie);
                        uba.debugLog([10] aj:  + j[_sequence] + , url:  + j[_url]);
                    };
                    e.apply(this, arguments);
                };
                var j = XMLHttpRequest.prototype.send;
                XMLHttpRequest.prototype.send = function() {
                    if (void(0) != this.mscz && 0 < arguments.length) {
                        uba.debugLog([10] prot.send);
                        var e = uba.msdz.mscs[this.mscz];
                        e[_postData] = arguments[0] || ;
                        uba.debugLog([10] aj:  + e[_sequence] + , datal:  + e[_postData].length);
                    };
                    j.apply(this, arguments);
                };
            };
        },
        msak: function() {
            uba.debugLog([11] ready:  + this.readyState);
            if (4 == this.readyState && (200 == this.status || 304 == this.status)) {
                var e = uba.msdz.mscs[this.mscz];
                e[_responseText] = this.responseText;
                e[_contentType] = this.getResponseHeader(content-type);
                uba.debugLog([11] ready store:  + e[_sequence]);
                uba.msed({
                    type: 20,
                    x: e[_sequence],
                    y: 0,
                    target: ,
                    value: JSON.stringify(e)
                });
            };
        },
        msae: function(e) {
            var j = 10;
            switch (e) {
                case 1:
                    j = 25;
                    break;;
                case 15:
                    ;
                case 16:
                    j = 10;
                    break;;
                case 23:
                    j = 200;
                    break;;
                case 55:
                    j = 500;
                    break;;
                default:
                    j = 10;;
            };
            if (0 === j) {
                return ! 0
            };
            var k = uba.msdz.postData.e;
            if (k && 0 != k && +new Date - k < j) {
                return ! 1
            };
            uba.msdz.postData.e = +new Date;
            return ! 0;
        },
        msax: function(e) {
            var j = [];
            e = .e;
            for (var k = 0; e.length;) {
                var l = e.pop();
                if (boolean === typeof l) {
                    k += 4
                } else {
                    if (string === typeof l) {
                        k += 2 * l.length
                    } else {
                        if (number === typeof l) {
                            k += 8
                        } else {
                            if (object === typeof l && -1 === j.indexOf(l)) {
                                for (i in j.push(l), l) {
                                    e.push(l.i)
                                }
                            }
                        }
                    }
                };
            };
            return k;
        },
        escape: function(e) {
            return encodeURIComponent(e)
        },
        msac: function(e) {
            return e.replace(/\0/g, ).replace(/\1/g, )
        },
        msea: function() {
            this.sendAndClearCommandQueue();
            clearInterval(this.mscf.localStorageWrite);
            clearInterval(this.mscf.msah);
            clearInterval(this.mscf.msaa);
            this.msbr();
            this.msed({
                type: 25
            });
            this.mscq(!1);
            this.msbn();
        },
        msbj: function() {
            if (!uba.msdy && undefined !== typeof window.onMouseStatsPlaybackStartRecording) {
                try {
                    window.onMouseStatsPlaybackStartRecording()
                } catch(a) {}
            }
        },
        sessionId: function() {
            return this.msdz.msdo.msdg
        },
        visitorId: function() {
            return this.msdz.msdo.msdf
        },
        recordId: function() {
            return this.msdz.msdo.msck
        },
        sessionPlaybackUrl: function() {
            return this.isLoaded ? http://www.mousestats.com/playbackprojectv2/play/ + this.msdz.msdo.msde + /?s= + this.sessionId() + &r=1 :
        },
        customVariable: function(e, j) {
            uba.msed(17, {
                target: e,
                value: j
            });
            return ! 0;
        },
        Resume: function() {
            undefined !== typeof MouseStats_PausedPlaybacks && !0 === MouseStats_PausedPlaybacks && (MouseStats_PausedPlaybacks = void(0), uba.msdk())
        },
        NewRecording: function() {
            this.Stop();
            this.msct();
        },
        Stop: function() {
            this.msea()
        },
        isRecording: function() {
            return this.msdz.msdn
        },
        trackNewElements: function() {
            this.msbm()
        },
        msdk: function() {
            this.debugLog([19] called);
            if (!MouseStatsSharedControl.TrackEnableOrNot()) {
                return ! 0
            };
            if (undefined !== typeof MouseStats_PausedPlaybacks && !0 === MouseStats_PausedPlaybacks) {
                return ! 1
            };
            uba.msdu = MouseStatsSharedControl.j;
            null === uba.msbv && (uba.msbv = JSON.parse(JSON.stringify(uba.msdz)));
            var e = !1;
            complete == window.document.readyState ? (e = !0, uba.msct()) : (uba.msdu(document).ready(function() {
                e = !0;
                uba.msct();
            }), complete !== window.document.readyState && uba.msdu(document).load(function() {
                e || (e = !0, this.debugLog([19] method B), uba.msct())
            }));
        },
        msec: {
            mscc: function() {
                for (var e, j = [], k = 0; 256 > k; k++) {
                    e = k;
                    for (var l = 0; 8 > l; l++) {
                        e = e & 1 ? 3988292384 ^ e >>> 1: e >>> 1
                    };
                    j.k = e;
                };
                return j;
            },
            msdx: function(e) {
                for (var j = window.msdw || (window.msdw = uba.msec.base64()), k = -1, l = 0; l < e.length; l++) {
                    k = k >>> 8 ^ j[(k ^ e.charCodeAt(l)) & 255]
                };
                return (k ^ -1) >>> 0;
            }
        },
        msbk: function(e) {
            var j = e;
            8 < j.length && (j = this.msec.msdx(e));
            return j;
        },
        isNoneContentTag: function(e) {
            return / == e.charAt(0) || # == e.charAt(0) || ! == e.charAt(0) || /SCRIPT|STYLE|META|PARAM|EMBED|HTML/ .test(e.toUpperCase()) ? !1: !0
        },
        isDomContentSensitive: function(e, j) {
            return /^(on|aria|action|data-ng-|method|ajaxify|ng-|_)/i.test(j.toLowerCase()) || value == j && undefined !== typeof e && null !== e && undefined !== typeof e.attributes.class && 0 <= e.attributes.class.value.indexOf(sensitive) ? !1: !0
        },
        isHasChildren: function(e) {
            if (0 === e.childElementCount) {
                return ! 1
            };
            for (var j = 0; j < e.children.length; j++) {
                if (this.isNoneContentTag(e.children.j.tagName)) {
                    return ! 0
                }
            };
            return ! 1;
        },
        setDataspaceValue: function(e, j, k) {
            if (!e) {
                return null
            };
            undefined == typeof e.msDataSpace && (e.msDataSpace = {});
            e.msDataSpace.j = k.toString();
            return ! 0;
        },
        deleteDataSpaceValue: function(e, j) {
            if (!e) {
                return null
            };
            delete e.msDataSpace.j;
            return ! 0;
        },
        //根据key返回节点的msDataspace的值，如msdm（e,"data-ms-id"）返回的是e节点的data-ms-id的值
        getValueInMsDataspace: function(e, j) {
            if (!e || undefined == typeof e.msDataSpace) {
                return null
            };
            var k = e.msDataSpace.j;
            undefined === typeof k && (k = null);
            return k;
        },
        dataspaceCopy: function(e) {
            if (!e || undefined === typeof e.msDataSpace) {
                return null
            };
            var j = [],
                k;
            for (k in e.msDataSpace) {
                e.msDataSpace.hasOwnProperty(k) && j.push({
                    key: k,
                    value: e.msDataSpace.k
                })
            };
            return j;
        },
        msda: function(e, j, k) {
            if (j && null !== this.getValueInMsDataspace(e, data-ms-txtcrc) && this.isHasChildren(e)) {
                return this.deleteDataSpaceValue(e, data-ms-txtcrc),
                    !1
            };
            if (k) {
                if (this.isHasChildren(e)) {
                    return ! 1
                };
                this.setDataspaceValue(e, data-ms-txtcrc, this.msbk(e.innerHTML));
            };
            return ! 0;
        },
        msbd: function(e, j) {
            if (j) {
                for (var k = this.dataspaceCopy(e), l = 0; l < k.length; l++) {
                    0 === k.l.key.indexOf(data-ms-crc-) && this.deleteDataSpaceValue(e, k.l.key)
                }
            };
            for (var l = 0, k = e.attributes, m = k.length; l < m; l++) {
                var n = k.item(l).nodeName.toLowerCase();
                this.isDomContentSensitive(e, n) && this.setDataspaceValue(e, data-ms-crc- + n, this.msbk(k.item(l).value));
            };
            return ! 0;
        },
        mscx: function(e) {
            uba.mscf.msdr += 1;
            this.setDataspaceValue(e, data-ms-id, uba.mscf.msdr);
            if (e.parentNode && 1 === e.parentNode.nodeType) {
                var j = this.getValueInMsDataspace(e.parentNode, data-ms-childs);
                null === j && (j = );
                j +=  + uba.mscf.msdr.toString() + .;
                this.setDataspaceValue(e.parentNode, data-ms-childs, j);
            };
            return ! 0;
        },
        msab: function(e, j) {
            if (e && 1 === e.nodeType) {
                var k = this.getValueInMsDataspace(e, data-ms-childs);
                null !== k && (k = (. + k + .).replace(. + j + ., .), 2 <= k.length && (k = k.slice(0, -1).substring(1)), 0 < k.length ? this.setDataspaceValue(e, data-ms-childs, k) : this.deleteDataSpaceValue(e, data-ms-childs));
            };
            return ! 0;
        },
        msbo: function(e) {
            this.mscx(e);
            this.msbd(e, !1);
            this.msda(e, !1, !0);
        },
        //计算target是父节点的第几个子节点
        caculateParentIndex: function(e) {
            if (e && e.parentNode) {
                for (var j = 0; j < e.parentNode.children.length; j++) {
                    if (e.parentNode.children.j == e) {
                        return j
                    }
                }
            };
            return 0;
        },
        msby: function() {
            if (!uba.msdy) {
                var e = document.getElementsByTagName(*);
                uba.msbg(msby, !0);
                for (var j = e.length; j--;) {
                    var k = e.j;
                    if (this.isNoneContentTag(k.tagName)) {
                        if (this.getValueInMsDataspace(k, data-ms-id)) {
                            this.msda(k, !0, !0)
                        } else {
                            if (this.msbo(k), !uba.msbg(msby, !1)) {
                                break
                            }
                        }
                    };
                };
            }
        },
        msan: function() {
            if (!uba.msbl) {
                return ! 1
            };
            if (!uba.msdy) {
                var e = +new Date;
                uba.msbg(msan, !0);
                for (var j = document.getElementsByTagName(*), k = j.length; k--;) {
                    try {
                        var l = j.k;
                        if (this.isNoneContentTag(l.tagName)) {
                            var m = !0;
                            if (this.getValueInMsDataspace(l, data-ms-id)) {
                                m = !1;
                                this.getValueInMsDataspace(l, data-ms-id);
                                for (var n = !1, o = this.dataspaceCopy(l), q = 0; q < o.length; q++) {
                                    if ( - 1 !== o.q.key.indexOf(data-ms-crc-)) {
                                        var r = o.q.key.replace(data-ms-crc-, );
                                        undefined === typeof l.attributes.r && (this.msbi(6, l, r), n = !0);
                                    }
                                };
                                for (var q = 0, z = l.attributes, v = z.length; q < v; q++) {
                                    var E = z.item(q).nodeName.toLowerCase();
                                    if (this.isDomContentSensitive(l, E)) {
                                        var x = this.msbk(z.item(q).value),
                                            F = this.getValueInMsDataspace(l, data-ms-crc- + E);
                                        null == F ? (this.msbi(5, l, E, z.item(q).value), n = !0) : x.toString() !== F.toString() && (this.msbi(4, l, E, z.item(q).value), n = !0);
                                    };
                                };
                                n && this.msbd(l, !0);
                                n = !1;
                                if (this.getValueInMsDataspace(l, data-ms-childs)) {
                                    for (var G = this.getValueInMsDataspace(l, data-ms-childs).slice(0, -1).split(.), H = G.slice(), I = Array(G.length), w = 0; w < l.children.length; w++) {
                                        var t = this.getValueInMsDataspace(l.children.w, data-ms-id);
                                        if (t) {
                                            var J = G.indexOf(t);
                                            if (0 <= J) {
                                                G.J = ,
                                                    I.J = !0
                                            } else {
                                                this.msbo(l.children.w);
                                                var K = this.getValueInMsDataspace(l, data-ms-id);
                                                this.msbi(3, l.children.w, null, null, K);
                                                for (q = 0; q < l.children.w.children.length; q++) {
                                                    var u = this.getValueInMsDataspace(l.children.w.children.q, data-ms-id);
                                                    u && (this.msab(l.children.w, u), this.msbo(l.children.w.children.q));
                                                };
                                            };
                                        };
                                    };
                                    q = [];
                                    for (w = 0; w < I.length; w++) { ! 0 !== I.w && (this.msab(l, H.w), q.push(H.w))
                                    };
                                    q.length === H.length && (q = [], this.isHasChildren(l) || (n = !0));
                                    if (0 < q.length) {
                                        for (var L = 0; L < q.length; L++) {
                                            this.msbi(1, q.L, null, null, this.getValueInMsDataspace(l, data-ms-id))
                                        }
                                    };
                                };
                                if (null !== this.getValueInMsDataspace(l, data-ms-txtcrc) || n) {
                                    x = this.msbk(l.innerHTML),
                                        F = null !== this.getValueInMsDataspace(l, data-ms-txtcrc) ? this.getValueInMsDataspace(l, data-ms-txtcrc) : -1,
                                    x.toString() !== F.toString() && this.msbi(2, l)
                                };
                                this.msda(l, !0, !0);
                            };
                            if (m) {
                                var y = l.parentNode;
                                if (y && this.getValueInMsDataspace(y, data-ms-id) && !this.getValueInMsDataspace(y, data-ms-txtcrc)) {
                                    m = !1;
                                    for (w = 0; w < y.children.length; w++) {
                                        this.getValueInMsDataspace(y.children.w, data-ms-id) && (m = !0)
                                    };
                                    this.msbo(l);
                                    if (m) {
                                        K = l.parentNode ? this.getValueInMsDataspace(l.parentNode, data-ms-id) : ,
                                            this.msbi(3, l, null, null, K)
                                    } else {
                                        for (var M = y.getElementsByTagName(*), w = 0; w < M.length; w++) {
                                            this.getValueInMsDataspace(M.w, data-ms-id) || this.msbo(M.w)
                                        };
                                        this.msbi(2, y);
                                    };
                                } else {
                                    this.msbo(l)
                                };
                            };
                            if (!uba.msbg(msan, !1)) {
                                return
                            };
                        };
                    } catch(D) {
                        undefined == typeof console && (console = {}),
                        undefined == typeof console.log && (console.log = function() {}),
                            console.log(mserr:  + console.log(D.message))
                    }
                };
                e = 40 * ( + new Date - e);
                1E3 > e && (e = 1E3);
                MouseStats_PlaybackTrackPerformance = Math.ceil(e / 1E3);
                this.msaz();
            };
        },
        msbi: function(e, j, k, l, m) {
            j = this.generateActionData(e, j, k, l, m);
            uba.msed({
                type: 28,
                x: e,
                y: 0,
                target: m ? m: j.id,
                value: JSON.stringify(j)
            });
        },
        //生成一条动作记录
        generateActionData: function(e, j, k, l, m) {
            var n = {};
            n.action = e;
            n.id = string == typeof j ? j: this.getValueInMsDataspace(j, data-ms-id);
            switch (e) {
                case 1:
                    n.parent = m;
                    break;;
                case 2:
                    n.html = this.mscu(j, !1);
                    break;;
                case 3:
                    n.html = this.mscu(j, !0);
                    n.pos = this.caculateParentIndex(j);
                    n.id = m;
                    break;;
                case 4:
                    ;
                case 5:
                    n.attrName = k;
                    n.attrValue = l;
                    break;;
                case 6:
                    n.attrName = k;;
            };
            return n;
        },
        htmlClone: function(e) {
            if (!e || !e.tagName) {
                return
            };
            if (e.outerHTML) {
                return e.outerHTML
            };
            var j = document.createElement(div);
            j.appendChild(e.cloneNode(!0));
            return j.innerHTML;
        },
        setDataMsId: function(e) {
            e = (undefined == typeof e ? document: e).getElementsByTagName(*);
            for (var j = e.length; j--;) {
                var k = e.j,
                    l = this.getValueInMsDataspace(k, data-ms-id);
                l && k.setAttribute(data-ms-id, l);
            };
        },
        removeDataMsId: function(e) {
            e = (undefined == typeof e ? document: e).getElementsByTagName(*);
            for (var j = e.length; j--;) {
                var k = e.j;
                k.getAttribute(data-ms-id) && k.removeAttribute(data-ms-id);
            };
        },
        msbe: function(e, j) {
            function k(e) {
                for (var j = e.tagName.toString().toUpperCase(), l = [], k = 0, m = e.attributes, n = m.length; k < n && !(k >= m.length); k++) {
                    var x = m.item(k).nodeName.toLowerCase();
                    uba.SurveyServerEnpoint(e, x) || -1 !== x.indexOf(data-ms-id) || l.push(x);
                };
                for (k = 0; k < l.length; k++) {
                    e.removeAttribute(l.k)
                };
                SCRIPT !== j && NOSCRIPT !== j || e.parentNode.removeChild(e);
            }
            for (var l = e.cloneNode(!0), m = l.getElementsByTagName(*), n = m.length; n--;) {
                k(m.n)
            };
            m = ;
            undefined !== typeof j && 1 == j ? (k(l), m = document.createElement(div), m.appendChild(l), m = m.innerHTML) : m = l.innerHTML;
            m = m.replace(/\x3c!-- StartMouseStatsHide ([\s\S]*?)--\x3e([\s\S]*?)\x3c!-- EndMouseStatsHide --\x3e/g, <!--MShide-->);
            return m = m.replace(/\s+/g,  ).replace(/\x3c!--[\s\S]*?--\x3e/g,  );
        },
        //重建自己的html的document文档msdp
        rebuidHTMLDocument: function() {
            function e(e) {
                e = head == e ? document.head || document.getElementsByTagName(head)[0] : document.body || document.getElementsByTagName(body)[0];
                return uba.mscu(e, !0);
            }
            return function() {
                    if (!document.doctype) {
                        return
                    };
                    var e = document.doctype;
                    return <!DOCTYPE  + e.name + (e.publicId ?  PUBLIC " + e.publicId + " : ) + (!e.publicId && e.systemId ?  SYSTEM : ) + (e.systemId ?  " + e.systemId + " : ) + >;
                } () +
                +
                    function(e) {
                        for (var k = document.getElementsByTagName(e)[0].attributes, l = < + e, m = 0, n = k.length; m < n; m++) {
                            l +=   + k.m.name + =" + k.m.value + "
                        }; (e = uba.getValueInMsDataspace(document.getElementsByTagName(e)[0], data-ms-id)) && (l +=  data-ms-id=" + e + ");
                        return l + >;
                    } (html) + e(head) + head + e(body) + body></html>;
        },
        mscu: function(e, j) {
            for (var k = e.cloneNode(!0), l = e.getElementsByTagName(*), m = k.getElementsByTagName(*), n = l.length; n--;) {
                var o = this.getValueInMsDataspace(l.n, data-ms-id);
                o && m.n.setAttribute(data-ms-id, o);
                o = -1 < (  + m.n.className +  ).replace(/[\n\t]/g,  ).indexOf( sensitive ); (password === m.n.type || o && void(0) != m.n.value) && m.n.setAttribute(value, m.n.value.replace(/[^\s\\]/g, *));
            }; ! 0 === j && (o = this.getValueInMsDataspace(e, data-ms-id)) && k.setAttribute(data-ms-id, o);
            return uba.msbe(k, j);
        },
        msbg: function(e, j) {
            j && (uba.msdz.msav.e = +new Date);
            var k = uba.msdz.msav.e;
            if (undefined == typeof k) {
                return ! 0
            };
            if (2E3 < +new Date - k) {
                try {
                    console.log(MouseStats: safely stopped due to lack of resources)
                } catch(c) {};
                uba.msdy = !0;
                return ! 1;
            };
            return ! 0;
        },
        setTimestamp: function() {
            uba.timestamp = +new Date
        },
        debug: function(e) {
            undefined != typeof MS_DEBUG_PERF && console.log(e + :  + ( + new Date - uba.timestamp).toString())
        }
    };
uba.msdk();
