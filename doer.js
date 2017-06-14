(function(window, document, undefined) {
	var win = window,
		doc = document;
	var _Doer = window.Doer,
		_$d = window.$d;
	var message = {
		"error": "参数类型错误"
	};
	var core_rnotwhite = /\S+/g;
	var Doer = function(selector) {
		return new Doer.prototype.init(selector);
	}
	Doer.prototype = {
		constructor: Doer,
		length: 0,
		errors: function(data) {
			if (!data || typeof data != "string") {
				throw new Error(message.error);
				return false;
			}
		},
		init: function(selector, context) {
			if (!selector) return this;
			var context = context || doc,
				elm;
			if (typeof selector === "string") {
				if (selector.charAt(0) == "#" && !(/\s/.test(selector))) {
					selector = selector.substring(1);
					elm = doc.getElementById(selector);
					this[0] = elm;
					this.length = 1;
					this.context = context;
					return this;
				}
				if (selector.charAt(0) == "." && !(/\s/.test(selector))) {
					elm = context.querySelectorAll(selector);
					for (var i = 0; i < elm.length; i++) {
						this[i] = elm[i];
					}
					this.selector = selector;
					this.length = elm.length;
					this.context = context;
					return this;
				}
			}
			if (selector.nodeType) {
				for (var i = 0; i < selector.length; i++) {
					this[i] = selector[i];
				}
				this.length = selector.length;
			}
		},
		trim: function(str) {
			return !str ? "" : str.replace(/(^\s*) | (\s*$)/g, "");
		},
		hasClass: function(cls) {
			this.errors(cls);
			var className = " " + cls + " ",
				length = this.length;
			for (var i = 0; i < length; i++) {
				if (this[i].nodeType == 1 && (" " + this[i].className + " ").replace(/\s/g, " ").indexOf(cls) > 0) {
					return true;
				}
			}
			return false;

		},
		addClass: function(cls) {
			this.errors(cls);
			var length = this.length,
				cur, classes, _elem, k = 0;
			classes = (cls || "").match(core_rnotwhite) || [];
			for (var i = 0; i < length; i++) {
				_elem = this[i];
				cur = _elem ? (" " + _elem.className + " ").replace(/\s/g, " ") : "";
				while (k < classes.length) {
					if (cur.indexOf(" " + classes[k] + " ") < 0) {
						_elem.className += " " + classes[k];
					}
					k++;
				}
			}
			return this;
		},
		removeClass: function(cls) {
			this.errors(cls);
			var length = this.length,
				cur, classes, _elem, k = 0;
			classes = (cls || "").match(core_rnotwhite) || [];
			for (var i = 0; i < length; i++) {
				_elem = this[i];
				cur = _elem ? (" " + _elem.className + " ").replace(/\s/g, " ") : "";
				while (k < classes.length) {
					if (cur.indexOf(" " + classes[k] + " ") >= 0) {
						cur = cur.replace(" " + classes[k] + " ", " ");
					}
					k++;
				}
				_elem.className = this.trim(cur);
			}
			return this;
		}, 
		//add action
		css: function(attr, val) {
            for (var i = 0; i < this.length; i++) {
                if (typeof attr == 'string') {
                    if (arguments.length == 1) {
                        return getComputedStyle(this[i], null)[attr];
                    }
                    this[i].style[attr] = val;
                } else {
                    var self = this[i];
                    Ye.each(attr, function(attr, val) {
                        self.cssText += '' + attr + ':' + val + ';';
                    });
                }
            }
            return this;
        },
        attr: function(attr, val) {
            for (var i = 0; i < this.length; i++) {
                if (typeof attr == 'srting') {
                    if (arguments.length == 1) {
                        return this[i].getAttribute(attr);
                    }
                    this[i].setAttribute(attr, val);
                } else {
                    var self = this[i];
                    f.each(attr, function(attr, val) {
                        self.setAttribute(attr, val);
                    });
                }
            }
            return this;
        },
        data: function(attr, val) {
            for (var i = 0; i < this.length; i++) {
                if (typeof attr == 'string') {
                    if (arguments.length == 1) {
                        return this[i].getAttribute('data-' + attr);
                    }
                    this[i].setAttribute('data-' + attr, val);
                } else {
                    var self = this[i];
                    f.each(attr, function(attr, val) {
                        self.setAttribute('data-' + attr, val);
                    });
                }
            }
            return this;
        },
        next: function() {
            return sibling(this[0], 'nextSibling');
        },
        prev: function() {
            return sibling(this[0], 'previousSibling');
        },
		parent: function() {
            var parent = this[0].parentNode;
            parent && parent.nodeType !== 11 ? parent : null;
            var a = Ye();
            a[0] = parent;
            a.length = 1;
            a.selector = parent.tagName.toLowerCase();
            return a;
        },
        parents: function() {
            var a = Ye(),
                i = 0;
            while ((this[0] = this[0].parentNode) && this[0].nodeType !== 9) {
                if (this[0].nodeType == 1) {
                    a[i] = this[0];
                    i++;
                }
            }
            a.length = i;
            console.log(a);
            return a;
        },
        find: function(selector) {
            if (!selector) return;
            var context = this.selector;
            return new Ye(context + ' ' + selector);
        },
        first: function() {
            return new Ye(this[0]);
        },
        last: function() {
            var num = this.length - 1;
            return new Ye(this[num]);
        },
        eq: function(num) {
            var num = num < 0 ? (this.length - 1) : num;
            return new Ye(this[num]);
        },
        get: function(num) {
            var num = num < 0 ? (this.length - 1) : num;
            return this[num];
        },
        html: function(value) {
            if (value === undefined) {
                return this[0].innerHTML;
            } else {
                for (var i = 0; i < this.length; i++) {
                    this[i].innerHTML = value;
                }
            }
            return this;
        },
		append: function(str) {
            for (var i = 0; i < this.length; i++) {
                domAppend(this[i], 'beforeend', str);
            }
            return this;
        },
        before: function(str) {
            for (var i = 0; i < this.length; i++) {
                domAppend(this[i], 'beforeBegin', str);
            }
            return this;
        },
        after: function(str) {
            for (var i = 0; i < this.length; i++) {
                domAppend(this[i], 'afterend', str);
            }
            return this;
        },
        remove: function() {
            //删除自身
            for (var i = 0; i < this.length; i++) {
                this[i].parentNode.removeChild(this[i]);
            }
        },
		width: function(w) {
            if (arguments.length == 1) {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.width = w + 'px';
                }
            } else {
                if (this[0].document = doc) {
                    return this[0].innerWidth;
                } else if (this[0].nodeType == 9) {
                    return document.documentElement.clientWidth;
                } else {
                    return parseInt(getComputedStyle(this[0], null)['width']);
                }
            }
        },
        height: function(h) {
            if (arguments.length == 1) {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.height = w + 'px';
                }
            } else {
                if (this[0].document = doc) {
                    return this[0].innerheight;
                } else if (this[0].nodeType == 9) {
                    return document.documentElement.clientheight;
                } else {
                    return parseInt(getComputedStyle(this[0], null)['height']);
                }
            }
        }
		//add end
	};
	Doer.prototype.init.prototype = Doer.prototype;
	win.$d = Doer;
})(window, document)