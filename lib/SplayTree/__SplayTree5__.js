"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = __SplayTree5__;
function __SplayTree5__(diff) {

	var node = function node(v) {
		this.l = this.r = null;
		this.v = v;
	};

	var in_order_traversal = function in_order_traversal(pt, fn) {
		if (pt.l !== null) in_order_traversal(pt.l, fn);
		fn(pt.v);
		if (pt.r !== null) in_order_traversal(pt.r, fn);
	};

	var splay_tree = function splay_tree() {
		this.pt = null;
	};

	splay_tree.prototype.splay = function (v) {

		var l, r, t, y, x, d;
		l = r = x = new node();
		t = this.pt;
		while (true) {
			d = diff(v, t.v);
			if (d < 0) {
				if (!t.l) break;
				if (diff(v, t.l.v) < 0) {
					y = t.l;
					t.l = y.r;
					y.r = t;
					t = y;
					if (!t.l) break;
				}
				r.l = t;
				r = t;
				t = t.l;
			} else if (d > 0) {
				if (!t.r) break;
				if (diff(v, t.r.v) > 0) {
					y = t.r;
					t.r = y.l;
					y.l = t;
					t = y;
					if (!t.r) break;
				}
				l.r = t;
				l = t;
				t = t.r;
			} else break;
		}
		l.r = t.l;
		r.l = t.r;
		t.l = x.r;
		t.r = x.l;

		this.pt = t;

		return d;
	};

	splay_tree.prototype.remove = function (v) {
		if (this.pt === null) return;

		var d = this.splay(v);
		if (d !== 0) return;

		if (this.pt.l === null) this.pt = this.pt.r;else if (this.pt.r === null) this.pt = this.pt.l;else {
			var tmp = this.pt.r;
			this.pt = this.pt.l;
			this.splay(v);
			this.pt.r = tmp;
		}
	};

	splay_tree.prototype.insert = function (v) {
		var n = new node(v);
		if (this.pt !== null) {
			var d = this.splay(v);

			if (d <= 0) {
				n.l = this.pt.l;
				n.r = this.pt;
				this.pt.l = null;
			} else {
				n.r = this.pt.r;
				n.l = this.pt;
				this.pt.r = null;
			}
		}
		this.pt = n;
	};

	splay_tree.prototype.find = function (v) {
		if (this.pt === null) return [false, null];
		var d = this.splay(v);
		return [d === 0, this.pt.v];
	};

	splay_tree.prototype.in_order_traversal = function (fn) {
		if (this.pt !== null) in_order_traversal(this.pt, fn);
	};

	return splay_tree;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TcGxheVRyZWUvX19TcGxheVRyZWU1X18uanMiXSwibmFtZXMiOlsiX19TcGxheVRyZWU1X18iLCJkaWZmIiwibm9kZSIsInYiLCJsIiwiciIsImluX29yZGVyX3RyYXZlcnNhbCIsInB0IiwiZm4iLCJzcGxheV90cmVlIiwicHJvdG90eXBlIiwic3BsYXkiLCJ0IiwieSIsIngiLCJkIiwicmVtb3ZlIiwidG1wIiwiaW5zZXJ0IiwibiIsImZpbmQiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUN3QkEsYztBQUFULFNBQVNBLGNBQVQsQ0FBd0JDLElBQXhCLEVBQTZCOztBQUUzQyxLQUFJQyxPQUFPLFNBQVBBLElBQU8sQ0FBU0MsQ0FBVCxFQUFXO0FBQ3JCLE9BQUtDLENBQUwsR0FBUyxLQUFLQyxDQUFMLEdBQVMsSUFBbEI7QUFDQSxPQUFLRixDQUFMLEdBQVNBLENBQVQ7QUFDQSxFQUhEOztBQUtBLEtBQUlHLHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQVNDLEVBQVQsRUFBYUMsRUFBYixFQUFnQjtBQUN4QyxNQUFHRCxHQUFHSCxDQUFILEtBQVMsSUFBWixFQUFrQkUsbUJBQW1CQyxHQUFHSCxDQUF0QixFQUF5QkksRUFBekI7QUFDbEJBLEtBQUdELEdBQUdKLENBQU47QUFDQSxNQUFHSSxHQUFHRixDQUFILEtBQVMsSUFBWixFQUFrQkMsbUJBQW1CQyxHQUFHRixDQUF0QixFQUF5QkcsRUFBekI7QUFDbEIsRUFKRDs7QUFNQSxLQUFJQyxhQUFhLFNBQWJBLFVBQWEsR0FBVTtBQUFFLE9BQUtGLEVBQUwsR0FBVSxJQUFWO0FBQWlCLEVBQTlDOztBQUVBRSxZQUFXQyxTQUFYLENBQXFCQyxLQUFyQixHQUE2QixVQUFTUixDQUFULEVBQVc7O0FBRXZDLE1BQUlDLENBQUosRUFBT0MsQ0FBUCxFQUFVTyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CQyxDQUFuQjtBQUNBWCxNQUFJQyxJQUFJUyxJQUFJLElBQUlaLElBQUosRUFB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LENBQVFILENBQVIsR0FBWSxJQUFaO0FBQ0EsSUFKRCxNQUtLO0FBQ0plLE1BQUVkLENBQUYsR0FBTSxLQUFLRSxFQUFMLENBQVFGLENBQWQ7QUFDQWMsTUFBRWYsQ0FBRixHQUFNLEtBQUtHLEVBQVg7QUFDQSxTQUFLQSxFQUFMLENBQVFGLENBQVIsR0FBWSxJQUFaO0FBQ0E7QUFDRDtBQUNELE9BQUtFLEVBQUwsR0FBVVksQ0FBVjtBQUNBLEVBakJEOztBQW1CQVYsWUFBV0MsU0FBWCxDQUFxQlUsSUFBckIsR0FBNEIsVUFBU2pCLENBQVQsRUFBVztBQUN0QyxNQUFHLEtBQUtJLEVBQUwsS0FBWSxJQUFmLEVBQXFCLE9BQU8sQ0FBQyxLQUFELEVBQVEsSUFBUixDQUFQO0FBQ3JCLE1BQUlRLElBQUksS0FBS0osS0FBTCxDQUFXUixDQUFYLENBQVI7QUFDQSxTQUFPLENBQUNZLE1BQU0sQ0FBUCxFQUFVLEtBQUtSLEVBQUwsQ0FBUUosQ0FBbEIsQ0FBUDtBQUNBLEVBSkQ7O0FBTUFNLFlBQVdDLFNBQVgsQ0FBcUJKLGtCQUFyQixHQUEwQyxVQUFTRSxFQUFULEVBQVk7QUFDckQsTUFBRyxLQUFLRCxFQUFMLEtBQVksSUFBZixFQUFxQkQsbUJBQW1CLEtBQUtDLEVBQXhCLEVBQTRCQyxFQUE1QjtBQUNyQixFQUZEOztBQUlBLFFBQU9DLFVBQVA7QUFFQSIsImZpbGUiOiJfX1NwbGF5VHJlZTVfXy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX19TcGxheVRyZWU1X18oZGlmZil7XG5cblx0dmFyIG5vZGUgPSBmdW5jdGlvbih2KXtcblx0XHR0aGlzLmwgPSB0aGlzLnIgPSBudWxsO1xuXHRcdHRoaXMudiA9IHY7XG5cdH07XG5cblx0dmFyIGluX29yZGVyX3RyYXZlcnNhbCA9IGZ1bmN0aW9uKHB0LCBmbil7XG5cdFx0aWYocHQubCAhPT0gbnVsbCkgaW5fb3JkZXJfdHJhdmVyc2FsKHB0LmwsIGZuKTtcblx0XHRmbihwdC52KTtcblx0XHRpZihwdC5yICE9PSBudWxsKSBpbl9vcmRlcl90cmF2ZXJzYWwocHQuciwgZm4pO1xuXHR9O1xuXG5cdHZhciBzcGxheV90cmVlID0gZnVuY3Rpb24oKXsgdGhpcy5wdCA9IG51bGw7IH07XG5cblx0c3BsYXlfdHJlZS5wcm90b3R5cGUuc3BsYXkgPSBmdW5jdGlvbih2KXtcblxuXHRcdHZhciBsLCByLCB0LCB5LCB4LCBkO1xuXHRcdGwgPSByID0geCA9IG5ldyBub2RlKCk7XG5cdFx0dCA9IHRoaXMucHQ7XG5cdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdGQgPSBkaWZmKHYsIHQudik7XG5cdFx0XHRpZiAoZCA8IDApIHtcblx0XHRcdFx0aWYgKCF0LmwpIGJyZWFrO1xuXHRcdFx0XHRpZiAoZGlmZih2LCB0LmwudikgPCAwKSB7XG5cdFx0XHRcdFx0eSA9IHQubDtcblx0XHRcdFx0XHR0LmwgPSB5LnI7XG5cdFx0XHRcdFx0eS5yID0gdDtcblx0XHRcdFx0XHR0ID0geTtcblx0XHRcdFx0XHRpZiAoIXQubCkgYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0ci5sID0gdDtcblx0XHRcdFx0ciA9IHQ7XG5cdFx0XHRcdHQgPSB0Lmw7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChkID4gMCkge1xuXHRcdFx0XHRpZiAoIXQucikgYnJlYWs7XG5cdFx0XHRcdGlmIChkaWZmKHYsIHQuci52KSA+IDApIHtcblx0XHRcdFx0XHR5ID0gdC5yO1xuXHRcdFx0XHRcdHQuciA9IHkubDtcblx0XHRcdFx0XHR5LmwgPSB0O1xuXHRcdFx0XHRcdHQgPSB5O1xuXHRcdFx0XHRcdGlmICghdC5yKSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRsLnIgPSB0O1xuXHRcdFx0XHRsID0gdDtcblx0XHRcdFx0dCA9IHQucjtcblx0XHRcdH1cblx0XHRcdGVsc2UgYnJlYWs7XG5cdFx0fVxuXHRcdGwuciA9IHQubDtcblx0XHRyLmwgPSB0LnI7XG5cdFx0dC5sID0geC5yO1xuXHRcdHQuciA9IHgubDtcblxuXHRcdHRoaXMucHQgPSB0O1xuXG5cdFx0cmV0dXJuIGQ7XG5cdH07XG5cblx0c3BsYXlfdHJlZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24odil7XG5cdFx0aWYodGhpcy5wdCA9PT0gbnVsbCkgcmV0dXJuO1xuXG5cdFx0dmFyIGQgPSB0aGlzLnNwbGF5KHYpO1xuXHRcdGlmIChkICE9PSAwKSByZXR1cm47XG5cblx0XHRpZiAgICAgICh0aGlzLnB0LmwgPT09IG51bGwpIHRoaXMucHQgPSB0aGlzLnB0LnI7XG5cdFx0ZWxzZSBpZiAodGhpcy5wdC5yID09PSBudWxsKSB0aGlzLnB0ID0gdGhpcy5wdC5sO1xuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIHRtcCA9IHRoaXMucHQucjtcblx0XHRcdHRoaXMucHQgPSB0aGlzLnB0Lmw7XG5cdFx0XHR0aGlzLnNwbGF5KHYpO1xuXHRcdFx0dGhpcy5wdC5yID0gdG1wO1xuXHRcdH1cblx0fTtcblxuXG5cblx0c3BsYXlfdHJlZS5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24odil7XG5cdFx0dmFyIG4gPSBuZXcgbm9kZSh2KTtcblx0XHRpZiAodGhpcy5wdCAhPT0gbnVsbCkge1xuXHRcdFx0dmFyIGQgPSB0aGlzLnNwbGF5KHYpO1xuXG5cdFx0XHRpZiAoZCA8PSAwKSB7XG5cdFx0XHRcdG4ubCA9IHRoaXMucHQubDtcblx0XHRcdFx0bi5yID0gdGhpcy5wdDtcblx0XHRcdFx0dGhpcy5wdC5sID0gbnVsbDtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRuLnIgPSB0aGlzLnB0LnI7XG5cdFx0XHRcdG4ubCA9IHRoaXMucHQ7XG5cdFx0XHRcdHRoaXMucHQuciA9IG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMucHQgPSBuO1xuXHR9O1xuXG5cdHNwbGF5X3RyZWUucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbih2KXtcblx0XHRpZih0aGlzLnB0ID09PSBudWxsKSByZXR1cm4gW2ZhbHNlLCBudWxsXTtcblx0XHR2YXIgZCA9IHRoaXMuc3BsYXkodik7XG5cdFx0cmV0dXJuIFtkID09PSAwLCB0aGlzLnB0LnZdO1xuXHR9O1xuXG5cdHNwbGF5X3RyZWUucHJvdG90eXBlLmluX29yZGVyX3RyYXZlcnNhbCA9IGZ1bmN0aW9uKGZuKXtcblx0XHRpZih0aGlzLnB0ICE9PSBudWxsKSBpbl9vcmRlcl90cmF2ZXJzYWwodGhpcy5wdCwgZm4pO1xuXHR9O1xuXG5cdHJldHVybiBzcGxheV90cmVlO1xuXG59XG5cbiJdfQ==