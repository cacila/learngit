(function(b, c) {
  var d = b.documentElement, resizeEvt = 'orientationchange' in c ? 'orientationchange' : 'resize',
  recalc = function() {
	var a = d.clientWidth
	if (!a) return;
	d.style.fontSize = (20 * (a / 375)) + 'px';},
	anime = c.requestAnimationFrame || c.webkitRequestAnimationFrame ||c.mozRequestAnimationFrame || c.oRequestAnimationFrame ||
	function(e) {
      return setTimeout(e, 16.67)
	};
	if (!b.addEventListener) return;
	c.addEventListener(resizeEvt, recalc, false);
	b.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)