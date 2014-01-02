;(function() {
  window.background = function(el, theme) {
    var w = el.width, h = el.height;
    var colors = theme in themes ? themes[theme] : themes.terra;
    var ctx = el.getContext('2d');

    function randColor() {
      return colors[Math.floor(colors.length * Math.random())];
    }

    function drawPolygon(points) {
      var f = points.shift();
      ctx.beginPath();
      ctx.moveTo(f[0], f[1]);

      points.forEach(function(p) { ctx.lineTo(p[0], p[1]); });

      ctx.closePath();
      return ctx;
    }

    function rightIsoscele(p, len, dir) {
      dir = dir === 'right' ? 1 : -1;

      return [
        [p[0], p[1]],
        [p[0] + len * dir, p[1]],
        [p[0], p[1] - len * dir]
      ];
    }


    return {
      draw: function(size) {
        var leg = size || 20;
        var cols = w / leg, rows = height / leg;

        for (var x = 0; x <= cols; x++) {
          for (var y = 1; y <= rows + 1; y++) {
            ctx.fillStyle = randColor(colors);
            drawPolygon(rightIsoscele([x * leg, y * leg], leg, 'right')).fill()
            ctx.fillStyle = randColor(colors);
            drawPolygon(rightIsoscele([x * leg + leg, y * leg - leg], leg, 'left')).fill();
          }
        }
      }
    };
  }

  var themes = background.themes = {
    terra: [
      '#E8DDCB',
      '#CDB380',
      '#036564',
      '#033649',
      '#031634'
    ]
  }

  var scripts = document.getElementsByTagName('script');
  var script = scripts[scripts.length - 1].innerHTML;

  if (script) eval(script);
})();
