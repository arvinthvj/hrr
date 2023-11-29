export function test(canvas, ref) {
  var ctx = canvas.getContext('2d');
  canvas.width = 5001;
  canvas.height = 2813;
  var canvasValid = false;
  var gridshow = 1;
  var snapshow = 0;
  var cols = 180;
  var rows = 140;
  var cells = rows * cols;
  var size = 10;
  var gW = cols * size;
  var gH = rows * size;
  var gX = 0,
    gY = 0,
    pX = 0,
    pY = 0,
    gScale = 1,
    speed = 2;
  var isDown = false;
  ctx.strokeStyle = '#8a8a8a';
  ctx.lineWidth = 0.2;
  ctx.font = '14px sans-serif';

  var grid = [];
  for (var i = 0; i < cells; ++i) {
    if (Math.random() < 0.5) {
      grid.push('#FF8ED6');
    } else {
      grid.push('#8ED6FF');
    }
  }
  drawGrid(0, 0);

  var gridleft = 0;
  var gridtop = 0;
  var r = 2;
  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gridshow == 1) {
      ctx.save();
      ctx.translate(gX, gY);
      ctx.scale(gScale, gScale);
      for (var i = gridleft; i < cols; ++i) {
        for (var j = gridtop; j < rows; ++j) {
          if (snapshow == 1) {
            ctx.strokeStyle = '#8a8a8a';
            ctx.lineWidth = 0.2;
            ctx.setLineDash([]);
            ctx.strokeRect(i * size, j * size, size, size);
          }
          ctx.fillStyle = '#474747';
          ctx.fillRect(i * size - r / 2, j * size - r / 2, r, r);
        }
      }
      ctx.restore();
    }
    canvasValid = false;
  }

  if (window.addEventListener) {
  }

  function showgrid() {
    if (gridshow == 0) {
      gridshow = 1;
      document.getElementById('showgrid').style.display = 'block';
      document.getElementById('hidegrid').style.display = 'none';
    } else {
      gridshow = 0;
      document.getElementById('showgrid').style.display = 'none';
      document.getElementById('hidegrid').style.display = 'block';
    }
    drawGrid();
  }

  function showsnap() {
    if (snapshow == 0) {
      snapshow = 1;
    } else {
      snapshow = 0;
    }
    drawGrid();
  }

  function scalegrid(delta) {
    gScale = delta * 0.1;
    if (gScale < 1) gScale = 1;
    drawGrid();
  }
  drawGrid();

  var setcanvasimage = 0;
  var canvasbglock = 0;
  var canvasbg = 0;
  function showcanvasbg() {
    if (setcanvasimage == 1) {
      if (canvasbg == 0) {
        canvas.classList.add('hide-canvas-bg');
        canvasbg = 1;
        document.getElementById('showbgimage').style.display = 'none';
        document.getElementById('hidebgimage').style.display = 'block';
      } else {
        canvas.classList.remove('hide-canvas-bg');
        canvasbg = 0;
        document.getElementById('showbgimage').style.display = 'block';
        document.getElementById('hidebgimage').style.display = 'none';
      }
    }
  }

  function bglock() {
    if (setcanvasimage == 1) {
      if (canvasbglock == 0) {
        canvasbglock = 1;
        document.getElementById('bgunlock').style.display = 'none';
        document.getElementById('bglock').style.display = 'block';
      } else {
        canvasbglock = 0;
        document.getElementById('bgunlock').style.display = 'block';
        document.getElementById('bglock').style.display = 'none';
      }
    }
  }

  function removecanvasbg() {
    setcanvasimage = 0;
    ref.canvasGetImage.value = '';
    canvas.classList.add('hide-canvas-bg');
  }

  var gkhead = new Image();
  var canvaspanlock = 1; // bydefault pan is lock

  var ctx = canvas.getContext('2d');
  trackTransforms(ctx);

  function redraw() {
    // Clear the entire canvas
    var p1 = ctx.transformedPoint(0, 0);
    var p2 = ctx.transformedPoint(canvas.width, canvas.height);
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    canvasValid = false;
  }

  var lastX = canvas.width / 2,
    lastY = canvas.height / 2;
  var dragStart, dragged;
  var mouse_changed_x = 0;
  var mouse_changed_y = 0;

  canvas.addEventListener(
    'mousedown',
    function (evt) {
      if (canvaspanlock == 0) {
        document.body.style.mozUserSelect =
          document.body.style.webkitUserSelect =
          document.body.style.userSelect =
            'none';
        lastX = evt.offsetX || evt.pageX - canvas.offsetLeft;
        lastY = evt.offsetY || evt.pageY - canvas.offsetTop;
        dragStart = ctx.transformedPoint(lastX, lastY);
        dragged = false;
        canvasValid = false;
      }
    },
    false,
  );

  canvas.addEventListener(
    'mousemove',
    function (evt) {
      if (canvaspanlock == 0) {
        lastX = evt.offsetX || evt.pageX - canvas.offsetLeft;
        lastY = evt.offsetY || evt.pageY - canvas.offsetTop;
        dragged = true;
        if (dragStart) {
          var pt = ctx.transformedPoint(lastX, lastY);
          ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
          var mpt = ctx.transformedPointInverse(
            pt.x - dragStart.x,
            pt.y - dragStart.y,
          );
          mouse_changed_x = mpt.x;
          mouse_changed_y = mpt.y;
          if (dragStart.x - pt.x < 0) {
            gridleft = gridleft - (pt.x - dragStart.x) / size;
          } else {
            cols = cols + (dragStart.x - pt.x) / size;
          }
          if (dragStart.y - pt.y < 0) {
            gridtop = gridtop - (pt.y - dragStart.y) / size;
          } else {
            rows = rows + (dragStart.y - pt.y) / size;
          }
          redraw();
        }
      }
    },
    false,
  );

  canvas.addEventListener(
    'mouseup',
    function (evt) {
      if (canvaspanlock == 0) {
        dragStart = null;
        canvasValid = false;
      }
    },
    false,
  );

  let scaleFactor = 1.1;

  var last_scale_scroll = 1;
  let last_scale = 1;
  var scale_factor = 0;
  function scalezoom(delta) {
    last_scale_scroll = delta;
    var pt = ctx.transformedPoint(lastX, lastY);
    ctx.translate(pt.x, pt.y);
    var factor = Math.pow(scaleFactor, delta);
    ctx.scale(factor, factor);
    ctx.translate(-pt.x, -pt.y);
    redraw();
    canvasValid = false;
    last_scale = last_scale_scroll;
    if (delta > 0) {
      scale_factor = scale_factor + 1;
    } else {
      scale_factor = scale_factor - 1;
    }
    movepan();
  }

  function panlock() {
    if (canvaspanlock == 0) {
      canvaspanlock = 1;
    } else {
      canvaspanlock = 0;
    }
  }

  function movepan() {
    var mcoordX = 0; // canvas.offsetLeft;
    var mcoordY = 0; // canvas.offsetTop;
    var pt = ctx.transformedPoint(0, 0);
    for (var i = 0; i < 1; i++) {
      mcoordX = mcoordX + 1;
      mcoordY = mcoordY + 1;
      dragStart = ctx.transformedPoint(mcoordX, mcoordY);
      ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
      var mpt = ctx.transformedPointInverse(
        pt.x - dragStart.x,
        pt.y - dragStart.y,
      );
      mouse_changed_x = mpt.x;
      mouse_changed_y = mpt.y;

      if (dragStart.x - pt.x < 0) {
        gridleft = gridleft - (pt.x - dragStart.x) / size;
      } else {
        cols = cols + (dragStart.x - pt.x) / size;
      }
      if (dragStart.y - pt.y < 0) {
        gridtop = gridtop - (pt.y - dragStart.y) / size;
      } else {
        rows = rows + (dragStart.y - pt.y) / size;
      }
      redraw();
      canvasValid = false;
    }
    dragStart = null;
  }

  gkhead.src =
    'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
  function trackTransforms(ctx) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function () {
      return xform;
    };

    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function () {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(ctx);
    };
    var restore = ctx.restore;
    ctx.restore = function () {
      xform = savedTransforms.pop();
      return restore.call(ctx);
    };
    var scale = ctx.scale;
    ctx.scale = function (sx, sy) {
      xform = xform.scaleNonUniform(sx, sy);
      return scale.call(ctx, sx, sy);
    };
    var rotate = ctx.rotate;
    ctx.rotate = function (radians) {
      xform = xform.rotate((radians * 180) / Math.PI);
      return rotate.call(ctx, radians);
    };
    var translate = ctx.translate;
    ctx.translate = function (dx, dy) {
      xform = xform.translate(dx, dy);
      return translate.call(ctx, dx, dy);
    };
    var transform = ctx.transform;
    ctx.transform = function (a, b, c, d, e, f) {
      var m2 = svg.createSVGMatrix();
      m2.a = a;
      m2.b = b;
      m2.c = c;
      m2.d = d;
      m2.e = e;
      m2.f = f;
      xform = xform.multiply(m2);
      return transform.call(ctx, a, b, c, d, e, f);
    };
    var setTransform = ctx.setTransform;
    ctx.setTransform = function (a, b, c, d, e, f) {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(ctx, a, b, c, d, e, f);
    };
    var pt = svg.createSVGPoint();
    ctx.transformedPoint = function (x, y) {
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(xform.inverse());
    };
    ctx.transformedPointInverse = function (x, y) {
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(xform.inverse().inverse());
    };
  }
  return {
    scalegrid,
    panlock,
    showgrid,
    showsnap,
    scalezoom,
    showcanvasbg,
    bglock,
    removecanvasbg,
  };
}
