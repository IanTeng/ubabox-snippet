var uevent = function() {
    this.properties = new Object;
    this.set('t', streamTracker.getp());
}
uevent.prototype = {
    get: function(name) {
        if (this.properties.hasOwnProperty(name)) {
            return this.properties[name];
        }
    },
    set: function(name, value) {
        this.properties[name] = value;
    },
    setEventType: function(event_type) {
        this.set("et", event_type);
    },
    getProperties: function() {
        return this.properties;
    },
    merge: function(properties) {
        for (param in properties) {
            if (properties.hasOwnProperty(param)) {
                this.set(param, properties[param]);
            }
        }
    }
}


var streamTracker={
    startTime: null,
    active:true,
    config: {
        trackStreamEvent:true ,

    },
    op : {
    //movementInterval
    mi:3000,
    //resize interval
    ri:800,
    //streamEventThresold
    set:20},
    //streamBindings
    sbs: ['bme', 'bse', 'bke', 'bce','bre'],
    click: '',
    streamEvent: '',
    movement: '',
    keystroke: '',
    hover: '',
    last_event: '',
    last_movement: '',
    last_resize:'',
    event_queue: [],
    //getOption



    getOption: function(name) {
        return this.config[name];
    },
    strtolower: function(str) {
        return (str + '').toLowerCase();
    },
    //getViewportDimensions
    gvd: function() {
        var v = {};
        v.w = window.innerWidth ? window.innerWidth: document.body.offsetWidth;
        v.h = window.innerHeight ? window.innerHeight: document.body.offsetHeight;
        return v;
    },
    //findPosX
    fpx: function(obj) {
        var curleft = 0;
        if (obj.offsetParent)
        {
            while (obj.offsetParent)
            {
                curleft += obj.offsetLeft
                obj = obj.offsetParent;
            }
        }
        else if (obj.x)
        curleft += obj.x;
        return curleft;
    },
    //findPosY
    fpy: function(obj) {
        var curtop = 0; 
        if (obj.offsetParent)
        {
            while (obj.offsetParent)
            {
                curtop += obj.offsetTop
                obj = obj.offsetParent;
            }
        }
        else if (obj.y)
        curtop += obj.y;
        return curtop;
    },
    //_getTarget
    _gt: function(e) {
        var targ = e.target || e.srcElement;
        if (typeof targ == 'undefined' || targ == null) {
            return null;
        }
        if (targ.nodeType == 3) {
            targ = target.parentNode;
        }
        return targ;
    },
    //getCoords
    gc: function(e) {
        var coords = new Object();
        if (typeof(e.pageX) == 'number') {
            coords.x = e.pageX + '';
            coords.y = e.pageY + '';
        } else {
            coords.x = e.clientX + '';
            coords.y = e.clientY + '';
        }
        return coords;
    },
    // getDomElementProperties
    gdp: function(targ) {
        var properties = new Object();
        properties.det = targ.tagName;
        if (targ.tagName == "A") {
            if (targ.textContent != undefined) {
                properties.dex = targ.textContent;
            } else {
                properties.dex = targ.innerText;
            }
            properties.dtu = targ.href;
        } else if (targ.tagName == "INPUT") {
            properties.dex = targ.value;
        } else if (targ.tagName == "IMG") {
            properties.dtu = targ.parentNode.href;
            properties.dex = targ.alt;
        } else {
            if (targ.textContent != undefined) {
                properties.het = '';
            } else {
                properties.het = '';
            }
        }
        return properties;
    },
    //bindClickEvents
    bce: function() {
            var that = this;
            if (window.addEventListener) {
                window.addEventListener('click',
                    function(e) {
                        that.cdh(e);
                    },
                    false);
            } else if (window.attachEvent) {
                document.attachEvent('onclick',
                    function(e) {
                        that.cdh(e);
                    });
            }

    },
    //clickEventHandler
    cdh: function(e) {
        e = e || window.event;
        var click = new uevent();
        //dom click
        click.setEventType("c");
        var targ = this._gt(e);
        var dom_name = 'N';
        if (targ.hasOwnProperty && targ.hasOwnProperty('name') && targ.name.length > 0) {
            dom_name = targ.name;
        }
        click.set("den", dom_name);
        var dom_value = 'N';
        if (targ.hasOwnProperty && targ.hasOwnProperty('value') && targ.value.length > 0) {
            dom_value = targ.value;
        }
        click.set("dev", dom_value);
        var dom_id = 'N';
        if (targ.hasOwnProperty && targ.hasOwnProperty('id') && targ.id.length > 0) {
            dom_id = targ.id;
        }
        click.set("dei", dom_id);
        var dom_class = 'N';
        if (targ.hasOwnProperty && targ.hasOwnProperty('className') && targ.className.length > 0) {
            dom_class = targ.className;
        }
        click.set("dec", dom_class);
        click.set("det", this.strtolower(targ.tagName));
        //page url
        //click.set("u", window.location.href);
        var viewport = this.gvd();
        click.set("pw", viewport.w);
        click.set("ph", viewport.h);
        var properties = this.gdp(targ);
        click.merge(this.fdp(properties));
        click.set("dx", this.fpx(targ) + '');
        click.set("dy", this.fpy(targ) + '');
        var coords = this.gc(e);
        click.set('cx', coords.x);
        click.set('cy', coords.y);
        this.ateq(click)

        //this.click = full_click;
    },
    //addstreamEventEventBinding
    aseb: function(m) {
        this.sbs.push(m);
    },
    //bindMovementEvents
    bme: function() {
        var t = this;
        document.onmousemove = function(e) {
            t.meh(e);
        }
    },
    //movementEventHandler
    meh: function(e) {
        e = e || window.event;
        var now = this.gts();
        if (now > this.last_movement + this.op.mi) {
            this.m = new uevent();
            this.m.setEventType("m");
            var coords = this.gc(e);
            this.m.set('x', coords.x);
            this.m.set('y', coords.y);
            this.ateq(this.m);
            this.last_movement = now;
        }
    },
    //bindScrollEvents
    bse: function() {
        var that = this;
        window.onscroll = function(e) {
            that.seh(e);
        }
    },
    //scrollEventHandler
    seh: function(e) {
        var e = e || window.event;
        var now = this.gts();
        var event = new uevent();
        event.setEventType('s');
        var coords = this.gsp();
        event.set('x', coords.x);
        event.set('y', coords.y);
        this.ateq(event);
        this.last_scroll = now;
    },
    //getScrollingPosition
    gsp: function() {
        var position = [0, 0];
        if (typeof window.pageYOffset != 'undefined') {
            position = {
                x: window.pageXOffset,
                y: window.pageYOffset
            };
        } else if (typeof document.documentElement.scrollTop != 'undefined' && document.documentElement.scrollTop > 0) {
            position = {
                x: document.documentElement.scrollLeft,
                y: document.documentElement.scrollTop
            };
        } else if (typeof document.body.scrollTop != 'undefined') {
            position = {
                x: document.body.scrollLeft,
                y: document.body.scrollTop
            };
        }
        return position;
    },
    //bindResizeEvents
    bre: function() {
        var that = this;
        window.onresize = function(e) {
            that.resizeEventHandler(e);
        }
    },    
    //resizeEventHandler
    reh: function(e) {
        var e = e || window.event;
        var now = this.gts();
       // console.log(now);
       // console.log(this.last_resize + 1);
        if (now > this.last_resize + this.op.ri) {
        var event = new uevent();
        event.setEventType('r');
        var v = this.gvd();
        event.set("pw", v.width);
        event.set("ph", vv.height);
        //debug
        //console.log(event);
        this.ateq(event);
        this.last_resize = now;
        
        }
    },    
    
    //bindHoverEvents
    bhe: function() {},
    //bindFocusEvents
    bfe: function() {
        var that = this;
    },
    //bindKeypressEvents
    bke: function() {
        var that = this;
        document.onkeypress = function(e) {
            that.keypressEventHandler(e);
        }
    },
    //keypressEventHandler
    keh: function(e) {
        e = e || window.event;
        var targ = this._gt(e);
        if (targ.tagName === 'INPUT' && targ.type === 'password') {
            return;
        }
        var key_code = e.keyCode ? e.keyCode: e.charCode
        var key_value = String.fromCharCode(key_code);
        var event = new uevent();
        event.setEventType('k');
        event.set('kv', key_value);
        event.set('kc', key_code);
        event.set("den", targ.name);
        event.set("dev", targ.value);
        event.set("dei", targ.id);
        event.set("det", targ.tagName);
        this.ateq(event);
    },
    //getTimestamp
    gts: function() {
        return Math.round(new Date().getTime());;
    },
    //getElapsedTime
    getp: function() {
        return this.gts() - this.startTime;
    },
    //addToEventQueue
    ateq: function(event) {
        if (this.active && !this.ipbs()) {
            var now = this.gts();
            if (event != undefined) {
                this.event_queue.push(event.getProperties());
            } else {}
        }
    },
    //isPausedBySibling
    ipbs: function() {
        return false;
    },
    //filterDomProperties
    fdp: function(properties) {
        return properties;
    },
    //sleep
    slp: function(delay) {
        var start = new Date().gts();
        while (new Date().getTime() < start + delay);
    },
    //pause
    ps: function() {
        this.active = false;
    },
    //restart
    rst: function() {
        this.active = true;
    },
    //makeEvent
    met: function() {
        return new uevent();
    },
    //callMethod
    cmd: function(string, data) {
        return this[string](data);
    },
    //addStreamEventBinding
    steb: function(name) {
        this.sbs.push(name);
    },
    //startstreamEventTimer
    sset: function() {
        var interval = 3000
        var that = this;
        var streamEventTimer = setInterval(function() {
                that.lse()
            },
            interval);
    },
    //logStreamEvent
    lse: function() {
        var streamEvent = new uevent();
        if (this.event_queue.length > 5){
            streamEvent.setEventType('stream');
            var viewport = this.gvd();
            streamEvent.set("t", this.startTime);
            //page width
            streamEvent.set("pw", viewport.w);
            //page height
            streamEvent.set("ph", viewport.h);
            streamEvent.set('guid', this.guid);
            //getSiteID
            streamEvent.set('site_id', this.siteid);
            //getCurrentUrl
            streamEvent.set('url', document.location.href);
            //duration
            streamEvent.set('dt', this.getp());
            //stream events
            streamEvent.set('st', JSON.stringify(this.event_queue));
            this.event_queue = [];
            //send Post Request
            console.log(streamEvent);
            return this.tse(streamEvent);
        } else {
            console.log("streamEvent had too few events to log.");
        }
    },
    //trackstreamEvent
    tse: function() {
        this.startTime=this.gts();
        if (this.config.trackStreamEvent) {
            var len = this.sbs.length;
            for (var i = 0; i < len; i++) {
                this.cmd(this.sbs[i]);
            }
            this.sset();

        }
    },
}

streamTracker.tse();
