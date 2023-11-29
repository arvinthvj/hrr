// const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let polygons = [],
  polygonTouch = false,
  startX = null,
  startY = null;

var pcanvas;
var pctx;
var rectindex = null;
var rectindex_click = false;
var rectindex_touch = false;
var nrects = [];
var zone_name;
var polygonclick = false;
var polygonclickindex = null;
var polyrotatep_x, polyrotatep_y;
var pmySelBoxSize = 10;
var phalf = pmySelBoxSize / 2;
var cursoronrotor = false;
var polystartrotate = false;
var polyangle = 0;
var pxmax = 0;
var pxmin = 9999;
var pymax = 0;
var pymin = 9999;
var points_old = [];
var ips = false;
var selectedPoint;

pcanvas = document.createElement('canvas');
pcanvas.height = canvas.height;
pcanvas.width = canvas.width;
pctx = pcanvas.getContext('2d');

const pointInPolygon = (x, y, points) => {
  //
  let i,
    j = points.length - 1,
    touch = false;
  /*
	for (i = 0; i < points.length; i++) {
		const pxi = points[i].x,
		pyi = points[i].y,
		pxj = points[j].x,
		pyj = points[j].y;
		if (
			((pyi < y && pyj >= y) || (pyj < y && pyi >= y)) && (pxi <= x || pxj <= x)
		) {
			if (pxi + (y - pyi) / (pyj - pyi) * (pxj - pxi) < x) {
				touch = !touch;
			}
		}
		j = i;
	}
	return touch;
	*/
  pctx.clearRect(0, 0, canvas.width, canvas.height);
  // points.forEach(pointss => {
  pctx.save();
  pctx.strokeStyle = '#FF0000';
  pctx.lineWidth = 10;
  pctx.beginPath();
  points.forEach((p, i) => {
    pctx.lineTo(p.x, p.y);
  });
  pctx.fillStyle = '#fff';
  pctx.fill();
  pctx.stroke();
  pctx.closePath();
  pctx.restore();
  points.forEach((p, i) => {
    if (i < points.length - 1) {
      pctx.save();
      pctx.translate(p.x, p.y);
      pctx.fillStyle = '#2c3e50';
      pctx.fillRect(-5, -5, 10, 10);
      pctx.restore();
    }
  });
  // });

  var imageData = pctx.getImageData(x, y, 1, 1);
  if (imageData.data[0] == 255) {
    //
    touch = !touch;
    //
  }
  return touch;
};

function detectLine(x, y) {
  var imageData = pctx.getImageData(0, 0, canvas.width, canvas.height),
    inputData = imageData.data,
    pData = (~~x + ~~y * canvas.width) * 4;

  var imageData = pctx.getImageData(x, y, 1, 1);
  if (
    imageData.data[0] == 255 &&
    imageData.data[1] == 0 &&
    imageData.data[2] == 0
  ) {
    //
    return true;
  }

  if (inputData[pData + 3]) {
    // return true;
  }

  return false;
}

const polygonPoints = (k, x, y) => {
  //
  const points = [];
  x = x - 50;
  y = y - 50;
  points.push({
    x: x,
    y: y,
    d: 'e',
  });
  points.push({
    x: x + 50,
    y: y,
    d: 'o',
  });
  points.push({
    x: x + 100,
    y: y,
    d: 'e',
  });
  points.push({
    x: x + 100,
    y: y + 50,
    d: 'o',
  });
  points.push({
    x: x + 100,
    y: y + 100,
    d: 'e',
  });
  points.push({
    x: x + 50,
    y: y + 100,
    d: 'o',
  });
  points.push({
    x: x,
    y: y + 100,
    d: 'e',
  });
  points.push({
    x: x,
    y: y + 50,
    d: 'o',
  });
  points.push({
    x: x,
    y: y,
    d: 'e',
  });
  return points;
};

/// /////////////////////////////////////////// Dummy ///////////////////////////////////////

const polygonPoints2 = (k, x, y) => {
  const points = [];
  x = x - 150;
  y = y - 150;
  points.push({
    x: x,
    y: y,
    d: 'e',
  });
  points.push({
    x: x + 150,
    y: y,
    d: 'o',
  });
  points.push({
    x: x + 200,
    y: y,
    d: 'e',
  });
  points.push({
    x: x + 200,
    y: y + 150,
    d: 'o',
  });
  points.push({
    x: x + 200,
    y: y + 200,
    d: 'e',
  });
  points.push({
    x: x + 150,
    y: y + 200,
    d: 'o',
  });
  points.push({
    x: x,
    y: y + 200,
    d: 'e',
  });
  points.push({
    x: x,
    y: y + 150,
    d: 'o',
  });
  points.push({
    x: x,
    y: y,
    d: 'e',
  });
  return points;
};

const polygonPoints3 = (k, x, y) => {
  const points = [];
  x = x - 50;
  y = y - 50;
  points.push({
    x: x,
    y: y,
    d: 'e',
  });
  points.push({
    x: x + 50,
    y: y,
    d: 'o',
  });
  points.push({
    x: x + 100,
    y: y,
    d: 'e',
  });
  points.push({
    x: x + 100,
    y: y + 50,
    d: 'o',
  });
  points.push({
    x: x + 100,
    y: y + 100,
    d: 'e',
  });
  points.push({
    x: x + 50,
    y: y + 100,
    d: 'o',
  });
  points.push({
    x: x,
    y: y + 100,
    d: 'e',
  });
  points.push({
    x: x,
    y: y + 50,
    d: 'o',
  });
  points.push({
    x: x,
    y: y,
    d: 'e',
  });
  return points;
};

/// /////////////////////////////////////////// Dummy end /////////////////////////////////////

const drawPolygon = pointss => {
  // c.clearRect(0, 0, canvas.width, canvas.height);
  //
  const rectss = [];
  var pindex = 0;
  pointss.forEach(points => {
    var ztx = 0;
    var zty = 0;
    var zlen = 0;
    var xmax = 0;
    var xmin = 999;
    var ymax = 0;
    var ymin = 999;

    const rects = [];

    c.save();
    c.strokeStyle = '#0F62AB';
    c.lineWidth = 1;
    c.beginPath();
    points.forEach((p, i) => {
      if (p.d == 'e') {
        c.lineTo(p.x, p.y);
      }
      if (p.d == 'o' && i == rectindex) {
        c.lineTo(p.x, p.y);
      }

      ztx = ztx + p.x;
      zty = zty + p.y;
      zlen = zlen + 1;
    });
    c.fillStyle = 'rgba(15, 98, 171,0.7)';
    c.fill();
    c.stroke();
    c.closePath();
    c.restore();
    points.forEach((p, i) => {
      if (i < points.length - 1) {
        if (xmax < p.x) {
          xmax = p.x;
        }
        if (ymax < p.y) {
          ymax = p.y;
        }

        if (xmin > p.x) {
          xmin = p.x;
        }
        if (ymin > p.y) {
          ymin = p.y;
        }

        if (p.d == 'e') {
          c.fillStyle = '#FFFFFF';
          rects.push({
            x: p.x - 5,
            y: p.y - 5,
            w: 10,
            h: 10,
            index: i,
            down: false,
            touch: false,
            d: 'e',
          });
        } else {
          c.fillStyle = '#0F62AB';
          rects.push({
            x: p.x - 5,
            y: p.y - 5,
            w: 10,
            h: 10,
            index: i,
            down: false,
            touch: false,
            d: 'o',
          });
        }
        if (typeof polygons !== 'undefined' && polygons.length > 0) {
          if (pindex == polygonclickindex && polygonclick == true) {
            //
            for (var i = 0; i < polygons.length; i++) {
              //
            }
            c.save();
            c.translate(p.x, p.y);
            c.fillRect(-5, -5, 10, 10);
            c.strokeStyle = '#0F62AB';
            c.strokeRect(-5, -5, 10, 10);
            c.restore();
          }
        }
      }
    });
    if (typeof polygons !== 'undefined' && polygons.length > 0) {
      zone_name = polygons[pindex].zoneName;
      var ztwidth = c.measureText(zone_name).width;
      labelShowHide
        ? (c.fillStyle = 'rgba(255, 255, 255, 0.001)')
        : (c.fillStyle = 'rgba(255, 255, 255, 1)');
      // c.fillStyle = '#FFFFFF';//"#ff0000";
      // c.fillText(zone_name, (ztx/zlen)-(ztwidth/3), zty/zlen+10);
      c.fillText(
        zone_name,
        (xmin + xmax) / 2 - ztwidth / 2,
        (ymin + ymax) / 2 + 5,
      );

      /// ///////////////////// Rotation /////////////////////////
      if (pindex == polygonclickindex) {
        polyangle = polygons[pindex].r;
        if (pindex == polygonclickindex && polygonclick == true) {
          //
          points.forEach((p, i) => {
            points_old.push({
              x: p.x,
              y: p.y,
              d: p.d,
            });
          });
          polyrotatep_x = (xmin + xmax) / 2;
          polyrotatep_y = ymin - 30;
          pxmax = xmax;
          pxmin = xmin;
          pymax = ymax;
          pymin = ymin;
        }

        c.save();
        c.translate(pxmin + (pxmax - pxmin) / 2, pymin + (pymax - pymin) / 2);
        c.rotate(polyangle);
        c.translate(
          -(pxmin + (pxmax - pxmin) / 2),
          -(pymin + (pymax - pymin) / 2),
        );
        /*
				//if(polystartrotate == false)
				{
				c.strokeRect(pxmin, pymin, pxmax-pxmin, pymax-pymin);
			
				const radius = 8;
					
				//context.strokeStyle = '#003300';
				c.lineWidth = 2;
				c.beginPath();
				c.setLineDash([]);
				c.moveTo(((pxmin+pxmax)/2),pymin);
				c.lineTo(((pxmin+pxmax)/2),pymin-30);
				
				//c.moveTo(polyrotatep_x,polyrotatep_y);
				//c.lineTo(polyrotatep_x,polyrotatep_y-30);
					
				c.closePath();
				c.stroke();
				c.beginPath();
				c.lineWidth = 2;	
				c.arc(((pxmin+pxmax)/2), pymin-30, radius, 0, 2 * Math.PI, false);
				//c.arc(points[1].x, points[1].y-30, radius, 0, 2 * Math.PI, false);	
				//context.fillStyle = 'blue';
				ctx.fill();	
				ctx.stroke();
				
				}
				*/
        if (pindex == polygonclickindex) {
          var pcx = pxmin + (pxmax - pxmin) / 2;
          var pcy = pymin + (pymax - pymin) / 2;
          let lx = polyrotatep_x;
          let ly = polyrotatep_y;
          polyrotatep_x =
            (lx - pcx) * Math.cos(polyangle) -
            (ly - pcy) * Math.sin(polyangle) +
            pcx;
          polyrotatep_y =
            (lx - pcx) * Math.sin(polyangle) +
            (ly - pcy) * Math.cos(polyangle) +
            pcy;
        }
        c.restore();
      }
      /// ///////////////////// Rotation end ///////////////////////
    }

    pindex = pindex + 1;
    rectss.push(rects);
  });
  //
  canvasValid = false;
  return rectss;
};

const rectForEach = (rects, x, y, down) => {
  //
  rects.forEach((rect, i) => {
    if (down) {
      if (
        x >= rect.x &&
        x <= rect.x + rect.w &&
        y >= rect.y &&
        y <= rect.y + rect.h
      ) {
        rect.down = true;
        //
        rectindex = rect.index;
        rectindex_click = true;
        nrects.push(rect);
      }
    } else {
      if (
        x >= rect.x &&
        x <= rect.x + rect.w &&
        y >= rect.y &&
        y <= rect.y + rect.h &&
        rect.down
      ) {
        rect.touch = true;
        //
        rectindex = rect.index;
        rectindex_touch = true;
        rectindex_click = true;
        nrects.push(rect);
      }
    }
    //
  });
  return rects;
};
const init = () => {
  //
  // let p1 = polygonPoints(5, 100, 100);

  // let p2 = polygonPoints(3, 250, 100);

  // let p3 = polygonPoints(6, 400, 100);

  // let rects = drawPolygon([p1, p2, p3]);

  // let rects = drawPolygon([p1]);
  /*
	polygons.push({
		points: p1,
		rects: rects[0],
		polygonTouch: false,
	});
	*/
  /*
	polygons.push({
		points: p2,
		rects: rects[1],
		polygonTouch: false,
	});
	
	polygons.push({
		points: p3,
		rects: rects[2],
		polygonTouch: false,
	});
	*/
  if (document.defaultView && document.defaultView.getComputedStyle) {
    stylePaddingLeft =
      parseInt(
        document.defaultView.getComputedStyle(canvas, null)['paddingLeft'],
        10,
      ) || 0;
    stylePaddingTop =
      parseInt(
        document.defaultView.getComputedStyle(canvas, null)['paddingTop'],
        10,
      ) || 0;
    styleBorderLeft =
      parseInt(
        document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'],
        10,
      ) || 0;
    styleBorderTop =
      parseInt(
        document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'],
        10,
      ) || 0;
  }
  canvas.addEventListener('mousedown', e => {
    let { clientX, clientY } = e;
    getMouse(e);
    const x = mx,
      y = my;
    const lx = clientX,
      ly = clientY;
    polygons.forEach((polygon, i) => {
      polygons[polygons.length - 1].rects = rectForEach(
        polygons[polygons.length - 1].rects,
        x,
        y,
        true,
      );
      if (pointInPolygon(x, y, polygons[i].points)) {
        // alert('in');
        selectedPoint = [];
        selectedPoint = polygons[i].points;
        //
        const p = polygons[i];
        polygons.splice(i, 1);
        polygons.push(p);
        polygons[polygons.length - 1].polygonTouch = true;
        startX = x;
        startY = y;
        polygonclick = true;
        polygonclickindex = polygons.length - 1;
      } else {
        // alert('out');
        // drawPolygon(polygonPoints(5, x, y));
        polygonclick = false;
        // polygonclickindex = null;
      }
    });

    if (cursoronrotor == true) {
      polystartrotate = true;
    }
  });

  // polygons.push({
  //  points: p1,
  //  rects: rects[0],
  //  polygonTouch: false,
  canvas.addEventListener('mousemove', e => {
    let { clientX, clientY } = e;
    getMouse(e);
    const x = mx,
      y = my;
    // const i = polygons.length - 1;
    polygons.forEach((polygon, i) => {
      polygons[i].rects = rectForEach(polygons[i].rects, x, y, false);
      const rect = polygons[i].rects.filter(r => r.touch)[0];
      // rectindex_touch = rectindex_click;
      // rectindex_click = false;
      // const rect = rectindex_click;
      //
      if (rect) {
        if (rect.index === 0) {
          polygons[i].points[0].x = x;
          polygons[i].points[0].y = y;
          polygons[i].points[polygons[i].points.length - 1].x = x;
          polygons[i].points[polygons[i].points.length - 1].y = y;
        } else {
          polygons[i].points[rectindex].x = x;
          polygons[i].points[rectindex].y = y;
        }
        if (polygons[i].points[rectindex].d == 'e') {
          if (rect.index === 0) {
            if (polygons[i].points[polygons[i].points.length - 2].d == 'o') {
              var tcx =
                (polygons[i].points[polygons[i].points.length - 3].x + x) / 2;
              var tcy =
                (polygons[i].points[polygons[i].points.length - 3].y + y) / 2;
              polygons[i].points[polygons[i].points.length - 2].x = tcx;
              polygons[i].points[polygons[i].points.length - 2].y = tcy;
            }
            if (polygons[i].points[rectindex + 1].d == 'o') {
              var tcx = (polygons[i].points[rectindex + 2].x + x) / 2;
              var tcy = (polygons[i].points[rectindex + 2].y + y) / 2;
              polygons[i].points[rectindex + 1].x = tcx;
              polygons[i].points[rectindex + 1].y = tcy;
            }
          } else {
            if (polygons[i].points[rectindex - 1].d == 'o') {
              var tcx = (polygons[i].points[rectindex - 2].x + x) / 2;
              var tcy = (polygons[i].points[rectindex - 2].y + y) / 2;
              polygons[i].points[rectindex - 1].x = tcx;
              polygons[i].points[rectindex - 1].y = tcy;
            }
            if (polygons[i].points[rectindex + 1].d == 'o') {
              var tcx = (polygons[i].points[rectindex + 2].x + x) / 2;
              var tcy = (polygons[i].points[rectindex + 2].y + y) / 2;
              polygons[i].points[rectindex + 1].x = tcx;
              polygons[i].points[rectindex + 1].y = tcy;
            }
          }
        }
        // alert('single point drag');
        drawPolygon(polygons.map(({ points }) => points));
      }

      if (polygons[i].polygonTouch && !rect) {
        polygons[i].points.forEach(point => {
          point.x += x - startX;
          point.y += y - startY;
        });
        drawPolygon(polygons.map(({ points }) => points));
        startX = x;
        startY = y;
        //
      }
      if (polystartrotate == true && i == polygonclickindex) {
        var dx = mx - (pxmin + pxmax) / 2;
        var dy = my - (pymin + pymax) / 2;
        var angle = Math.atan2(dy, dx);
        polyangle = angle - -1.5;
        // polygonrotate(polyangle,pxmin,pymin,pxmax-pxmin,pymax-pymin);
        //
        polygons[i].r = polyangle;
        var pcx = pxmin + (pxmax - pxmin) / 2;
        var pcy = pymin + (pymax - pymin) / 2;
        /*
				polygons[i].points.forEach(point => {
				if(i == polygonclickindex){
					let lx = point.x, ly = point.y;
					point.x = (lx - pcx) * Math.cos(polyangle) - (ly - pcy) * Math.sin(polyangle) + pcx;
					point.y = (lx - pcx) * Math.sin(polyangle) + (ly - pcy) * Math.cos(polyangle) + pcy;
					}	   
				});
				*/
        for (var pi = 0; pi < points_old.length; pi++) {
          let lx = points_old[pi].x,
            ly = points_old[pi].y;
          var npx =
            (lx - pcx) * Math.cos(polyangle) -
            (ly - pcy) * Math.sin(polyangle) +
            pcx;
          var npy =
            (lx - pcx) * Math.sin(polyangle) +
            (ly - pcy) * Math.cos(polyangle) +
            pcy;
          polygons[i].points[pi].x = npx;
          polygons[i].points[pi].y = npy;
        }
        drawPolygon(polygons.map(({ points }) => points));
      }
      if (
        mx >= polyrotatep_x - 5 &&
        mx <= polyrotatep_x + 5 + pmySelBoxSize &&
        my >= polyrotatep_y - 5 &&
        my <= polyrotatep_y + 5 + pmySelBoxSize
      ) {
        // cursoronrotor = true;
        // canvas.style.cursor='grab';
      } else {
        cursoronrotor = false;
        canvas.style.cursor = 'auto';
      }
    });
  });
  canvas.addEventListener('mouseout', e => {
    // rects.forEach(rect => {});
  });
  canvas.addEventListener('mouseup', e => {
    let { clientX, clientY } = e;
    getMouse(e);
    const x = mx,
      y = my;
    rectindex_touch = false;
    rectindex_click = false;
    polygons.forEach((polygon, i) => {
      const rect = polygons[i].rects.filter(r => r.touch)[0];
      if (polygons[i].polygonTouch && !rect) {
        selectedPoint = polygons[i].points;
        polygons[i].points.forEach(point => {
          point.x += x - startX;
          point.y += y - startY;
        });
        polygonclick = true;
        polygons[i].rects = drawPolygon(polygons.map(({ points }) => points))[
          i
        ];
      }
      polygons[i].polygonTouch = false;

      if (rect) {
        polygons[i].rects[rect.index].touch = false;
        polygons[i].rects[rect.index].down = false;
        polygonclick = true;
        //
        if (rect.index === 0) {
          polygons[i].points[0].x = x;
          polygons[i].points[0].y = y;
          polygons[i].points[polygons[i].points.length - 1].x = x;
          polygons[i].points[polygons[i].points.length - 1].y = y;
        } else {
          polygons[i].points[rect.index].x = x;
          polygons[i].points[rect.index].y = y;
        }
        // polygons[i].rects = drawPolygon(polygons.map(({points}) => points))[i];
        var p_x = 0;
        var p_y = 0;
        var c_x = 0;
        var c_y = 0;
        var a_x = 0;
        var a_y = 0;
        var np_x = 0;
        var np_y = 0;
        var na_x = 0;
        var na_y = 0;
        let start = 0;
        let deleteCount = 0;
        let start1 = 0;
        let d = '';
        if (rect.index === 0) {
          p_x = polygons[i].points[polygons[i].points.length - 1].x;
          p_y = polygons[i].points[polygons[i].points.length - 1].y;
          c_x = polygons[i].points[rect.index].x;
          c_y = polygons[i].points[rect.index].y;
          a_x = polygons[i].points[rect.index + 1].x;
          a_y = polygons[i].points[rect.index + 1].y;
          start = rect.index;
          start1 = rect.index + 2;
          d = polygons[i].points[rect.index].d;
          polygons[i].points[rect.index].d = 'e';
        } else {
          p_x = polygons[i].points[rect.index - 1].x;
          p_y = polygons[i].points[rect.index - 1].y;
          c_x = polygons[i].points[rect.index].x;
          c_y = polygons[i].points[rect.index].y;
          a_x = polygons[i].points[rect.index + 1].x;
          a_y = polygons[i].points[rect.index + 1].y;
          start = rect.index;
          start1 = rect.index + 2;
          d = polygons[i].points[rect.index].d;
          polygons[i].points[rect.index].d = 'e';
        }
        np_x = (p_x + c_x) / 2;
        np_y = (p_y + c_y) / 2;
        na_x = (a_x + c_x) / 2;
        na_y = (a_y + c_y) / 2;
        if (d == 'o') {
          polygons[i].points.splice(start, deleteCount, {
            x: np_x,
            y: np_y,
            d: 'o',
          });
          polygons[i].points.splice(start1, deleteCount, {
            x: na_x,
            y: na_y,
            d: 'o',
          });
        }
        polygons[i].rects = drawPolygon(polygons.map(({ points }) => points))[
          i
        ];
      }
    });
    // polygons.forEach((polygon, i) => {
    // polygons[i].rects = drawPolygon(polygons.map(({points}) => points))[i];
    //
    // });
    //
    polystartrotate = false;
    points_old = [];
  });
};

function getMouse(e) {
  //
  var element = canvas,
    offsetX = 0,
    offsetY = 0;
  if (element.offsetParent) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  offsetX += stylePaddingLeft;
  offsetY += stylePaddingTop;

  offsetX += styleBorderLeft;
  offsetY += styleBorderTop;

  mx = e.pageX - offsetX - mouse_changed_x;
  my = e.pageY - offsetY - mouse_changed_y;

  if (scale_factor > 0) {
    for (s = 0; s < scale_factor; s++) {
      mx = mx / scaleFactor;
      my = my / scaleFactor;
    }
  } else {
    for (s = 0; s < Math.abs(scale_factor); s++) {
      mx = mx * scaleFactor;
      my = my * scaleFactor;
    }
  }
  //
}
init();
