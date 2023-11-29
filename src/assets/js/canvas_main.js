var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvas_div = document.getElementById('canvas_div');
var dynHeight = Number(window.innerHeight) - 245;
if (dynHeight < 436) {
  dynHeight = 436;
}
canvas_div.style.height = dynHeight + 'px';
// ;
canvas.width = 5001; // canvas_div.clientWidth;
canvas.height = 2813; // canvas_div.clientHeight;
// ;
// canvas.style.border = "1px solid red";

var canvasValid = false;
var innerMouseDown = false;
var gridshow = 1;
var snapshow = 0;
var cols = 180;
var rows = 140;
var cells = rows * cols;
var size = 10;
var gW = cols * size;
var gH = rows * size;
var canvaspanmove = false;
var multiSelectPolygon = false;

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
/*
document.getElementById('canvas').onmousedown=function (e) {
    isDown = true;
    pX = e.pageX;
    pY = e.pageY;
}
document.getElementById('canvas').onmouseup=function (e) {
    isDown = false;
}
document.getElementById('canvas').onmouseout=function (e) {
    isDown = false;
}
document.getElementById('canvas').onmousemove=function (e) {
    if (isDown) {
        gX += (pX - e.pageX) * speed;
        gY += (pY - e.pageY) * speed;
        pX = e.pageX;
        pY = e.pageY;
        if (gX > 0) gX = 0;
        if (gX < canvas.width - gW * gScale) gX = canvas.width - gW * gScale;
        if (gY > 0) gY = 0;
        if (gY < canvas.height - gH * gScale) gY = canvas.height - gH * gScale;

       // drawGrid();
    }
}
*/
var gridleft = 0;
var gridtop = 0;
var r = 2;
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (scale_factor >= -1) {
    gridleft = -200.4799961090088; // eslint-disable-line
    gridtop = -200.29000005722046; // eslint-disable-line
  }
  if (gridshow == 1) {
    // ;
    ctx.save();
    ctx.translate(gX, gY);
    ctx.scale(gScale, gScale);
    for (var i = gridleft; i < cols; ++i) {
      // ctx.fillStyle = "#eeeeee";
      // ctx.fillRect(i * size, 0, size, headerSize);
      // ctx.strokeRect(i * size, 0, size, headerSize);

      // ctx.fillStyle = "#000000";
      // ctx.save();
      // ctx.translate(i * size + 16, headerSize - 8);
      // ctx.rotate(Math.PI * 1.5);
      // ctx.fillText("Column " + i, 0, 0);
      // ctx.restore();
      for (var j = gridtop; j < rows; ++j) {
        // ctx.fillStyle = grid[i * rows + j];
        // ctx.fillRect(i * size, j * size , size, size);
        if (snapshow == 1) {
          ctx.strokeStyle = '#8a8a8a';
          ctx.lineWidth = 0.2;
          ctx.setLineDash([]);
          ctx.strokeRect(i * size, j * size, size, size);
        }
        ctx.fillStyle = '#474747';
        ctx.fillRect(i * size - r / 2, j * size - r / 2, r, r);
        // ctx.restore();
        // ctx.save();
      }
    }
    ctx.restore();
  }
  canvasValid = false;
}

/*
 * Mousewheel
 */
function handle(delta) {
  // alert("handle");
  gScale += delta * 0.01;
  if (gScale < 1) gScale = 1;
  drawGrid();
}

function wheel(event) {
  var delta = 0;
  if (!event) event = window.event;
  if (event.wheelDelta) {
    delta = event.wheelDelta / 120;
  } else if (event.detail) {
    delta = -event.detail / 3;
  }
  if (delta) {
    handle(delta);
  }
  if (event.preventDefault) {
    event.preventDefault();
  }
  event.returnValue = false;
}

if (window.addEventListener) {
  // window.addEventListener('DOMMouseScroll', wheel, false );//kdcom
}
/* window.onmousewheel = document.onmousewheel = wheel; */

function showgrid() {
  // alert("showgrid");
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
  // alert("showsnap");
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

var AttachDragTo = (function () {
  var _AttachDragTo = function (el) {
    this.el = el;
    this.mouse_is_down = false;
    this.init();
  };

  _AttachDragTo.prototype = {
    onMousemove: function (e) {
      // ;
      if (innerMouseDown == true) {
        if (!this.mouse_is_down) return;
        var tg = e.target,
          x = e.clientX,
          y = e.clientY;
        if (canvasbglock == 0) {
          tg.style.backgroundPositionX =
            x - this.origin_x + this.origin_bg_pos_x + 'px';
          tg.style.backgroundPositionY =
            y - this.origin_y + this.origin_bg_pos_y + 'px';
        }
        if (canvaspanmove == true) {
          tg.style.backgroundPositionX =
            x - this.origin_x + this.origin_bg_pos_x + 'px';
          tg.style.backgroundPositionY =
            y - this.origin_y + this.origin_bg_pos_y + 'px';
        }
      }
    },

    onMousedown: function (e) {
      // ;
      innerMouseDown = true;
      this.mouse_is_down = true;
      this.origin_x = e.clientX;
      this.origin_y = e.clientY;
    },

    onMouseup: function (e) {
      var tg = e.target,
        styles = getComputedStyle(tg);

      this.mouse_is_down = false;
      this.origin_bg_pos_x = parseInt(
        styles.getPropertyValue('background-position-x'),
        10,
      );
      this.origin_bg_pos_y = parseInt(
        styles.getPropertyValue('background-position-y'),
        10,
      );
    },

    init: function () {
      var styles = getComputedStyle(this.el);
      this.origin_bg_pos_x = parseInt(
        styles.getPropertyValue('background-position-x'),
        10,
      );
      this.origin_bg_pos_y = parseInt(
        styles.getPropertyValue('background-position-y'),
        10,
      );

      // attach events
      this.el.addEventListener('mousedown', this.onMousedown.bind(this), false);
      this.el.addEventListener('mouseup', this.onMouseup.bind(this), false);
      this.el.addEventListener('mousemove', this.onMousemove.bind(this), false);
    },
  };

  return function (el) {
    new _AttachDragTo(el);
  };
})();

/** * IMPLEMENTATION ***/
// 1. Get your element.
// var map = document.getElementById('canvas');
// 2. Attach the drag.
// AttachDragTo(map);

/* function changebackground(event){
       var getImagePath = URL.createObjectURL(event.target.files[0]);
		//getMeta(getImagePath);

       document.getElementById("canvas").style.background = 'url(' + getImagePath + ') no-repeat';
        setcanvasimage = 1;
        canvasbglock = 0;

		//1. Get your element.
		var map = document.getElementById('canvas');
		//2. Attach the drag.
		//if(canvasBgImage){
			innerMouseDown = true;
			AttachDragTo(map); 
		//}
		document.getElementById("canvas").classList.remove("hide-canvas-bg");
}
function getMeta(url){
    $('<img id="imageID"/>',{
        src: url,
        on: {
            load: (e) => {
                .width(), $(e.target).height());
            },
        }
    });
} */

var canvasbg = 0;
function showcanvasbg() {
  if (setcanvasimage == 1) {
    if (canvasbg == 0) {
      document.getElementById('canvas').classList.add('hide-canvas-bg');
      canvasbg = 1;
      document.getElementById('showbgimage').style.display = 'none';
      document.getElementById('hidebgimage').style.display = 'block';
    } else {
      document.getElementById('canvas').classList.remove('hide-canvas-bg');
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
  document.getElementById('canvas_getimage').value = '';
  document.getElementById('canvas').classList.add('hide-canvas-bg');
}

// var canvas = document.getElementsByTagName('canvas')[0];
// canvas.width = 800;
// canvas.height = 600;

var gkhead = new Image();
var canvaspanlock = 1; // bydefault pan is lock

// window.onload = function(){

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
  // ctx.drawImage(gkhead,0,0);
}
// redraw();

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
      // canvasValid = false;
    } else {
      canvaspanmove = false;
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
      canvaspanmove = true;
      if (dragStart) {
        var pt = ctx.transformedPoint(lastX, lastY);
        ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
        var mpt = ctx.transformedPointInverse(
          pt.x - dragStart.x,
          pt.y - dragStart.y,
        );
        mouse_changed_x = mpt.x;
        mouse_changed_y = mpt.y;
        // ;
        // ;
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
        // canvasValid = false;
      }
    } else {
      canvaspanmove = false;
    }
  },
  false,
);

canvas.addEventListener(
  'mouseup',
  function (evt) {
    if (canvaspanlock == 0) {
      dragStart = null;
      // if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
      canvasValid = false;
    } else {
      canvaspanmove = false;
    }
  },
  false,
);

var scaleFactor = 1.1;

var zoom = function (clicks) {
  // alert(clicks);
  var pt = ctx.transformedPoint(lastX, lastY);
  ctx.translate(pt.x, pt.y);
  var factor = Math.pow(scaleFactor, clicks);
  // salert(factor);
  ctx.scale(factor, factor);
  ctx.translate(-pt.x, -pt.y);
  redraw();
  canvasValid = false;
};

var last_scale_scroll = 1;
var last_scale = 1;
var scale_factor = 0;
function scalezoom(delta) {
  // var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
  last_scale_scroll = delta;
  // if(delta < last_scale)
  {
    // delta = -(delta);
  }

  // if (delta) zoom(delta);
  // return evt.preventDefault() && false;
  // ;
  var pt = ctx.transformedPoint(0, 0);
  ctx.translate(pt.x, pt.y);
  var factor = Math.pow(scaleFactor, delta);
  // alert(factor);

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
  // ;
  // if(dragStart.x-pt.x<0){
  // gridleft = 0;
  // }else{
  // cols = 0;
  // gridtop = 0;
  // rows = 0;
  // }
  //	movepan();
  // ;
  if (scale_factor == -9) {
    document.getElementById('zoom-minusID').disabled = true;
    document.getElementById('zoom-plusID').disabled = false;
  }
  if (scale_factor == 9) {
    document.getElementById('zoom-plusID').disabled = true;
    document.getElementById('zoom-minusID').disabled = false;
  }
}

function panlock() {
  if (canvaspanlock == 0) {
    canvaspanlock = 1;
    canvaspanmove = true;
  } else {
    canvaspanlock = 0;
    canvaspanmove = false;
  }
}

function movepan() {
  // Move step = 20 pixels
  // canvas.dispatchEvent(new Event('mousedown'));

  /*	
		
	mcoordX = 30;//canvas.offsetLeft;
    mcoordY = 30;//canvas.offsetTop;
		
		
	//lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
      //    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
         dragStart = ctx.transformedPoint(mcoordX,mcoordY);
		 //dragStart.x = 10;
		// dragStart.y = 10;
          dragged = false;
          canvasValid = false;	
		
	for(var i=0;i<1;i++){	
		mcoordX=mcoordX+1;
		mcoordY=mcoordY+1;
    // Create new mouse event
    let ev = new MouseEvent("mousemove", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: mcoordX,
        clientY: mcoordY
    });

    // Send event
    document.getElementById('canvas').dispatchEvent(ev);
	//canvas.dispatchEvent(new Event('mousemove'));	
	}	
	//canvas.dispatchEvent(new Event('mouseup'));	
	dragStart = null;	
		
	
		 //movepan();
	*/

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
      // canvas.width = canvas.width + gridleft;
    } else {
      cols = cols + (dragStart.x - pt.x) / size;
    }
    if (dragStart.y - pt.y < 0) {
      gridtop = gridtop - (pt.y - dragStart.y) / size;
      // canvas.height = canvas.height + gridtop;
    } else {
      rows = rows + (dragStart.y - pt.y) / size;
    }
    // ;
    // setTimeout(function(){
    redraw();
    // },100);
    canvasValid = false;
  }
  dragStart = null;
}

/*   
      var handleScroll = function(evt){
          var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
          if (delta) zoom(delta);
          return evt.preventDefault() && false;
      };
      
      canvas.addEventListener('DOMMouseScroll',handleScroll,false);
      canvas.addEventListener('mousewheel',handleScroll,false);
      */
//	};

gkhead.src =
  'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';

// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
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
