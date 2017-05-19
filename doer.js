(function(window,document,undefined){
	var win = window, doc = document;
	var _Doer = window.Doer, _$d = window.$d;
	var message = {
		"error": "参数类型错误"
	};
	var Doer = function(selector){
		return new Doer.prototype.init(selector);
	}
	Doer.prototype = {
		constructor: Doer,
		length: 0,
		errors: function(data){
			if(typeof data != "string"){throw new Error(message.error);return false;}
		},
		init: function(selector,context){
			if(!selector) return this;
			var context = context || doc, elm;
			if(typeof selector === "string"){
				if(selector.charAt(0) == "#" && !(/\s/.test(selector))){
					selector = selector.substring(1);
					elm = doc.getElementById(selector);
					this[0] = elm;
					this.length = 1;
					this.context = context;
					return this;
				}

				if(selector.charAt(0) == "." && !(/\s/.test(selector))){
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

			if(selector.nodeType){
				for (var i = 0; i < selector.length; i++) {
                    this[i] = selector[i];
                }
                this.length = selector.length;
			}
		},
		trim: function(str){
			return !str ? "" : str.replace(/(^\s*) | (\s*$)/g,"");
		},
		hasClass: function(cls){
			this.errors(cls);
			var className = " " + cls + " ",
			    length = this.length;
			for(var i=0; i<length; i++){
				if(this[i].nodeType == 1 && (" " + this[i].className + " ").replace(/\s/g, " ").indexOf(cls) > 0){
					return true;
				}
			}
			return false;

		},
		addClass: function(cls){
			this.errors(cls);
			var reg = new RegExp(/\s|^/g) + cls + new RegExp(/\s|$/g);
			var length = this.length;
			for(var i=0; i<length; i++){
				if(!this[i].className.match(reg)){
					this[i].className += " "+ cls;
				}
			}
			return this;
		},
		removeClass: function(cls){}
	};
	Doer.prototype.init.prototype = Doer.prototype;
	win.$d = Doer;
})(window,document)