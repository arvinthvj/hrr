import { handleImageUploadtoS3Bucket } from '../../services/s3Bucket';
export function shapes(
  ref,
  locate = null,
  amentiesFilter = '',
  search_id = '',
  searchData = '',
  setS3Flag,
) {
  var canvasValid = false;
  var mouse_changed_x = 0;
  var mouse_changed_y = 0;
  var scale_factor;
  var scaleFactor = 1.1;
  var boxes2 = [];
  var boxes2_selectedindex = null;
  var mouseHover = '';
  var canvas = ref.canvasRef;
  canvas.width = 2560;
  canvas.height = 1440;
  var locateReform = false;
  var imageURI;
  let newLocateData = [];
  var canvaspanlock = 1;
  var cols = 180;
  var rows = 140;
  var cells = rows * cols;
  var size = 10;
  var ctx;
  ctx = canvas.getContext('2d');
  var dragStart;
  var tisFocus = false;
  var tfocusIndex = 0;
  var tselected = false;
  var gridleft = 0;
  var gridtop = 0;
  var r = 2;
  var dragStart, dragged;

  var mouse_changed_x = 0;
  var mouse_changed_y = 0;
  var mx, my; // mouse coordinates

  var lastX = canvas.width / 2,
    lastY = canvas.height / 2;
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;

  (function (window) {
    var draw_wall = false;
    var draw_squareroom = false;
    var draw_stairs = false;
    var draw_lifts = false;
    var draw_doors = false;
    var draw_windows = false;
    var draw_zone = false;
    var draw_lshapedroom = false;
    var draw_cshapedroom = false;
    var draw_singledesk = false;
    var draw_shape2 = false;
    var draw_shape3 = false;
    var draw_shape4 = false;
    var draw_shape5 = false;
    var linetype = 'solid';
    var draw_text = false;
    var draw_copy_special = false;
    var draw_paste = false;
    var draw_drag = false;
    var dragisDown = false;
    var dragstartX;
    var dragstartY;
    var dragwidth;
    var dragheight;
    var drawdragoffsetx, drawdragoffsety;
    var draw_drag_move = false;
    var dragresizehandle = [];
    var history_boxes2 = [];
    var history_existingLines = [];
    var history_texts = [];
    var history_polygons = [];
    var hc = 0;

    var selectionHandles = [];
    var multpleselection = [];
    var texts = [];
    var text;
    var selectionHandlestexts = [];
    var draw_text_value;
    var canvas_text_div = document.getElementById('canvas_text_div');
    var canvas_text_x = 0;
    var canvas_text_y = 0;
    var selectedText = -1;
    var c = canvas.getContext('2d');
    var WIDTH;
    var HEIGHT;
    var ctx;
    ctx = canvas.getContext('2d');
    trackTransforms(ctx);
    var showdragicon = false;
    var isDrag = false;
    var isResizeDrag = false;
    var expectResize = -1; // New, will save the # of the selection handle if the mouse is over one.
    var pcanvas;
    var pctx;

    var isDragline = false;
    var isResizeDragline = false;
    var expectResizeline = -1;
    var isDragtext = false;
    var isResizeDragtext = false;
    var expectResizetext = -1;
    var isResizeMultiDrag = false;
    var expectResizeMultiDrag = -1;

    var mySel = null;
    var mySelline = null;
    var mySeltext = null;
    var sellineindex = null;

    var myRectColor = '#282A35';
    var mySelColor = '#0F62AB';
    var mySelBoxColor = '#FFFFFF'; // New for selection boxes
    var mySelBoxSize = 10;
    var half = mySelBoxSize / 2;
    // we use a fake canvas to draw individual shapes for selection testing
    var ghostcanvas;
    var gctx; // fake canvas context
    var alignmentlines = {
      top: { startx: 0, starty: 0, endx: 0, endy: 0, top: false },
      left: { startx: 0, starty: 0, endx: 0, endy: 0, left: false },
      right: { startx: 0, starty: 0, endx: 0, endy: 0, right: false },
      bottom: { startx: 0, starty: 0, endx: 0, endy: 0, bottom: false },
    };

    var offsetx, offsety;
    var lsoffsetx, lsoffsety, leoffsetx, leoffsety;
    var toffsetx, toffsety;

    var startX = 0;
    var startY = 0;
    var mouseX = 0;
    var mouseY = 0;
    var rectindex = null;
    var isDrawing = false;
    var existingLines = [];
    var existingRectLines = [];
    var hasLoaded = false;
    var polygons = [];
    var polygonclickindex = null;
    var polygonclick = false;

    pcanvas = document.createElement('canvas');
    pcanvas.height = canvas.height;
    pcanvas.width = canvas.width;
    pctx = pcanvas.getContext('2d');
    // var zone_name;
    var edittextbox = false;
    var oldr = 0;
    const image = document.getElementById('canvas_img');
    const stairs_img = document.getElementById('stairs_img');
    const lifts_img = document.getElementById('lifts_img');
    const windows_img = document.getElementById('windows_img');
    const doors_img = document.getElementById('doors_img');
    const onewayR_img = document.getElementById('onewayR_img');
    const onewayL_img = document.getElementById('onewayL_img');
    const twoway_img = document.getElementById('twoway_img');
    const twoway90_img = document.getElementById('twoway90_img');
    const lshapedroom_img = document.getElementById('lshapewall_img');
    const singledesk_img = document.getElementById('singledesk_img');
    const singledesk_img_red = document.getElementById('singledesk_img_red');
    const parking_img = document.getElementById('parking_img');
    const parking_select_img = document.getElementById('parking_select_img');
    const parking_booked = document.getElementById('parking_booked');
    const parking_bookedme = document.getElementById('parking_bookedme');
    const parking_avail = document.getElementById('parking_avail');
    const singledesk_img_bookedme = document.getElementById(
      'singledesk_img_bookedme',
    );
    const singledesk_img_aval = document.getElementById('singledesk_img_aval');

    const regular_c = document.getElementById('regular_c');
    const regular_l = document.getElementById('regular_l');

    const regular_c_booked = document.getElementById('regular_c_booked');
    const regular_c_bookedme = document.getElementById('regular_c_bookedme');
    const regular_c_unavail = document.getElementById('regular_c_unavail');
    const regular_c_avail = document.getElementById('regular_c_avail');
    const regular_c_request = document.getElementById('regular_c_request');
    const regular_c_select = document.getElementById('regular_c_select');

    const regular_l_booked = document.getElementById('regular_l_booked');
    const regular_l_bookedme = document.getElementById('regular_l_bookedme');
    const regular_l_unavail = document.getElementById('regular_l_unavail');
    const regular_l_avail = document.getElementById('regular_l_avail');
    const regular_l_request = document.getElementById('regular_l_request');
    const regular_l_select = document.getElementById('regular_l_select');

    const desk_unavail = document.getElementById('desk_unavail');
    const parkingRequest = document.getElementById('parking_request');
    const roomRequest = document.getElementById('room_request');
    const deskRequest = document.getElementById('desk_request');

    const room_booked = document.getElementById('room_booked');
    const roomDesk = document.getElementById('room_img');
    const room_bookedme = document.getElementById('room_bookedme');
    const room_avail = document.getElementById('room_avail');
    const room_select_img = document.getElementById('room_select_img');

    const singledesk_select_img = document.getElementById(
      'singledesk_select_img',
    );
    const shape2_img = document.getElementById('shape2_img');
    const shape2_select_img = document.getElementById('shape2_select_img');
    const shape3_img = document.getElementById('shape3_img');
    const shape3_select_img = document.getElementById('shape3_select_img');
    const shape4_img = document.getElementById('shape4_img');
    const shape4_select_img = document.getElementById('shape4_select_img');
    const shape5_img = document.getElementById('shape5_img');
    const shape5_select_img = document.getElementById('shape5_select_img');

    const parkingUnavail = document.getElementById('parking_unavail');
    const room_unavail = document.getElementById('room_unavail');
    const shape3_booked = document.getElementById('shape3_booked');
    const shape3_bookedme = document.getElementById('shape3_bookedme');
    const shape3_request = document.getElementById('shape3_request');
    const shape3_unavail = document.getElementById('shape3_unavail');
    const shape3_avail = document.getElementById('shape3_avail');
    const shape2_booked = document.getElementById('shape2_booked');
    const shape2_bookedme = document.getElementById('shape2_bookedme');
    const shape2_request = document.getElementById('shape2_request');
    const shape2_unavail = document.getElementById('shape2_unavail');
    const shape2_avail = document.getElementById('shape2_avail');

    const room_xxs = document.getElementById('room_xxs');
    const room_xs = document.getElementById('room_xs');
    const room_m = document.getElementById('room_m');
    const room_l = document.getElementById('room_l');
    const room_xl = document.getElementById('room_xl');

    const room_xxs_select = document.getElementById('room_xxs_select');
    const room_xs_select = document.getElementById('room_xs_select');
    const room_m_select = document.getElementById('room_m_select');
    const room_l_select = document.getElementById('room_l_select');
    const room_xl_select = document.getElementById('room_xl_select');

    const room_xxs_avail = document.getElementById('room_xxs_avail');
    const room_xxs_booked = document.getElementById('room_xxs_booked');
    const room_xxs_bookedme = document.getElementById('room_xxs_bookedme');
    const room_xxs_req = document.getElementById('room_xxs_req');
    const room_xxs_unavail = document.getElementById('room_xxs_unavail');

    const room_xs_avail = document.getElementById('room_xs_avail');
    const room_xs_booked = document.getElementById('room_xs_booked');
    const room_xs_bookedme = document.getElementById('room_xs_bookedme');
    const room_xs_req = document.getElementById('room_xs_req');
    const room_xs_unavail = document.getElementById('room_xs_unavail');

    const room_m_avail = document.getElementById('room_m_avail');
    const room_m_booked = document.getElementById('room_m_booked');
    const room_m_bookedme = document.getElementById('room_m_bookedme');
    const room_m_req = document.getElementById('room_m_req');
    const room_m_unavail = document.getElementById('room_m_unavail');

    const room_l_avail = document.getElementById('room_l_avail');
    const room_l_booked = document.getElementById('room_l_booked');
    const room_l_bookedme = document.getElementById('room_l_bookedme');
    const room_l_req = document.getElementById('room_l_req');
    const room_l_unavail = document.getElementById('room_l_unavail');

    const room_xl_avail = document.getElementById('room_xl_avail');
    const room_xl_booked = document.getElementById('room_xl_booked');
    const room_xl_bookedme = document.getElementById('room_xl_bookedme');
    const room_xl_req = document.getElementById('room_xl_req');
    const room_xl_unavail = document.getElementById('room_xl_unavail');
    function Box2() {
      this.x = 0;
      this.y = 0;
      this.w = 1; // default width and height?
      this.h = 1;
      this.fill = '#FFFFFF';
      this.type = 'image';
      this.image = image;
      this.selectimage = image;
      this.index = -1;
      this.r = 0;
      this.id = null;
    }

    // New methods on the Box class
    Box2.prototype = {
      draw: function (context) {
        if (context === gctx) {
          context.fillStyle = 'black'; // always want black for the ghost canvas
        } else {
          context.fillStyle = this.fill;
        }
        if (this.x > WIDTH || this.y > HEIGHT) return;
        if (this.x + this.w < 0 || this.y + this.h < 0) return;

        context.strokeStyle = myRectColor;
        context.lineWidth = 10;
        context.save();
        context.translate(this.x + this.w / 2, this.y + this.h / 2);
        context.rotate(this.r);
        context.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
        context.setLineDash([]);
        if (context === gctx) {
        }
        if (this.type == 'image') {
          if (
            boxes2_selectedindex != null &&
            this.index == boxes2_selectedindex
          ) {
            context.drawImage(this.selectimage, this.x, this.y, this.w, this.h);
            context.font = '12px Arial';
            context.fillStyle = 'rgba(0, 0, 0, 0.001)';
            let metrics = context.measureText(this.showText);
            let fontHeight =
              metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
            context.fillText(
              '' + this.showText,
              this.x + Math.round((this.w - Number(metrics.width)) / 2),
              this.y + Math.round(this.h - fontHeight) / 2 + fontHeight,
            );
          } else {
            context.drawImage(this.image, this.x, this.y, this.w, this.h);
            context.font = '12px Arial';
            context.fillStyle = 'rgba(0, 0, 0, 0.001)';
            let metrics = context.measureText(this.showText);
            let fontHeight =
              metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
            context.fillText(
              '' + this.showText,
              this.x + Math.round((this.w - Number(metrics.width)) / 2),
              this.y + Math.round(this.h - fontHeight) / 2 + fontHeight,
            );
          }
        } else if (this.type == 'zone') {
          context.fillRect(this.x, this.y, this.w, this.h);
        } else if (this.type == 'square') {
          context.beginPath();
          context.strokeStyle = '#777';
          context.lineWidth = 2;
          context.moveTo(this.x + this.w, this.y + this.h);
          context.lineTo(this.x, this.y + this.h);
          context.lineTo(this.x, this.y);
          context.lineTo(this.x + this.w, this.y);
          context.lineTo(this.x + this.w, this.y + this.h);
          context.stroke();

          context.beginPath();
          context.strokeStyle = '#777';
          context.lineWidth = 2;
          context.moveTo(this.x + this.w - 7, this.y + this.h - 7);
          context.lineTo(this.x + 7, this.y + (this.h - 7));
          context.lineTo(this.x + 7, this.y + 7);
          context.lineTo(this.x + (this.w - 7), this.y + 7);
          context.lineTo(this.x + (this.w - 7), this.y + (this.h - 7));
          context.stroke();

          context.beginPath();
          context.strokeStyle = '#EEEEEE';
          context.lineWidth = 5;
          context.moveTo(this.x + this.w - 3.5, this.y + this.h - 3.5);
          context.lineTo(this.x + 3.5, this.y + this.h - 3.5);
          context.lineTo(this.x + 3.5, this.y + 3.5);
          context.lineTo(this.x + (this.w - 3.5), this.y + 3.5);
          context.lineTo(this.x + (this.w - 3.5), this.y + this.h - 3.5);
          context.stroke();
        } else if (this.type == 'lshaped') {
          context.beginPath();
          context.strokeStyle = '#777';
          context.lineWidth = 2;
          context.moveTo(this.x + this.w, this.y + this.h);
          context.lineTo(this.x, this.y + this.h);
          context.lineTo(this.x, this.y);
          context.lineTo(this.x + this.w / 2, this.y);
          context.lineTo(this.x + this.w / 2, this.y + this.h / 2);
          context.lineTo(this.x + this.w, this.y + this.h / 2);
          context.lineTo(this.x + this.w, this.y + this.h);
          context.stroke();

          context.beginPath();
          context.strokeStyle = '#777';
          context.lineWidth = 2;
          context.moveTo(this.x + this.w - 7, this.y + this.h - 7);
          context.lineTo(this.x + 7, this.y + (this.h - 7));
          context.lineTo(this.x + 7, this.y + 7);
          context.lineTo(this.x + (this.w / 2 - 7), this.y + 7);
          context.lineTo(this.x + (this.w / 2 - 7), this.y + (this.h / 2 + 7));
          context.lineTo(this.x + (this.w - 7), this.y + (this.h / 2 + 7));
          context.lineTo(this.x + (this.w - 7), this.y + (this.h - 7));
          context.stroke();

          context.beginPath();
          context.strokeStyle = '#EEEEEE';
          context.lineWidth = 5;
          context.moveTo(this.x + this.w - 3.5, this.y + this.h - 3.5);
          context.lineTo(this.x + 3.5, this.y + this.h - 3.5);
          context.lineTo(this.x + 3.5, this.y + 3.5);
          context.lineTo(this.x + (this.w / 2 - 3.5), this.y + 3.5);
          context.lineTo(
            this.x + (this.w / 2 - 3.5),
            this.y + this.h / 2 + 3.5,
          );
          context.lineTo(this.x + (this.w - 3.5), this.y + this.h / 2 + 3.5);
          context.lineTo(this.x + (this.w - 3.5), this.y + (this.h - 3.5));
          context.stroke();
        } else if (this.type == 'cshaped') {
          context.beginPath();
          context.strokeStyle = '#777';
          context.lineWidth = 2;
          context.moveTo(this.x, this.y + this.h);
          context.lineTo(this.x + 7, this.y + this.h);
          context.lineTo(this.x + 7, this.y + 7);
          context.lineTo(this.x + this.w - 7, this.y + 7);
          context.lineTo(this.x + this.w - 7, this.y + this.h);
          context.lineTo(this.x + this.w, this.y + this.h);
          context.lineTo(this.x + this.w, this.y);
          context.lineTo(this.x, this.y);
          context.lineTo(this.x, this.y + this.h);
          context.stroke();

          context.beginPath();
          context.strokeStyle = '#EEEEEE';
          context.lineWidth = 5;
          context.moveTo(this.x + 4, this.y + this.h - 4);
          context.lineTo(this.x + 4, this.y + 4);
          context.lineTo(this.x + this.w - 4, this.y + 4);
          context.lineTo(this.x + this.w - 4, this.y + this.h - 4);
          context.stroke();
        } else {
          context.strokeRect(this.x + 5, this.y + 5, this.w - 10, this.h - 10);
        }
        context.restore();
      }, // end draw
    };
    function addRect(
      x,
      y,
      w,
      h,
      fill,
      type,
      image,
      selectimage,
      assetId,
      showText,
      r,
    ) {
      if (boxes2.length < 1) {
        hc = 1;
      }
      var rect = new Box2();
      rect.x = x;
      rect.y = y;
      rect.w = w;
      rect.h = h;
      rect.fill = fill;
      rect.type = type;
      rect.image = image;
      rect.selectimage = selectimage;
      var l = boxes2.length;
      rect.index = l;
      rect.r = r ? r : 0;
      rect.id = assetId;
      rect.showText = showText || '';
      boxes2.push(rect);
      invalidate();
    }

    const drawPolygon = pointss => {
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
          var zone_name = polygons[pindex].zoneName;
          var ztwidth = c.measureText(zone_name).width;
          c.font = '14px sans-serif';
          c.fillStyle = 'rgba(255, 255, 255, 1)';
          c.fillText(
            zone_name,
            (xmin + xmax) / 2 - ztwidth / 2,
            (ymin + ymax) / 2 + 5,
          );

          if (pindex == polygonclickindex) {
            polyangle = polygons[pindex].r;

            if (pindex == polygonclickindex && polygonclick == true) {
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
            c.translate(
              pxmin + (pxmax - pxmin) / 2,
              pymin + (pymax - pymin) / 2,
            );
            c.rotate(polyangle);
            c.translate(
              -(pxmin + (pxmax - pxmin) / 2),
              -(pymin + (pymax - pymin) / 2),
            );
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
        }

        pindex = pindex + 1;
        rectss.push(rects);
      });
      canvasValid = false;
      return rectss;
    };

    const pointInPolygon = (x, y, points) => {
      let i,
        j = points.length - 1,
        touch = false;
      pctx.clearRect(0, 0, canvas.width, canvas.height);
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
      var imageData = pctx.getImageData(x, y, 1, 1);
      if (imageData.data[0] == 255) {
        touch = !touch;
      }

      return touch;
    };

    const rectForEach = (rects, x, y, down) => {
      rects.forEach((rect, i) => {
        if (down) {
          if (
            x >= rect.x &&
            x <= rect.x + rect.w &&
            y >= rect.y &&
            y <= rect.y + rect.h
          ) {
            rect.down = true;

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

            rectindex = rect.index;
            rectindex_touch = true;
            rectindex_click = true;
            nrects.push(rect);
          }
        }
      });

      return rects;
    };
    function init2() {
      canvas = ref.canvasRef;
      HEIGHT = canvas.height;
      WIDTH = canvas.width;
      ctx = canvas.getContext('2d');
      ghostcanvas = document.createElement('canvas');
      ghostcanvas.height = HEIGHT;
      ghostcanvas.width = WIDTH;
      gctx = ghostcanvas.getContext('2d');
      hasLoaded = true;
      canvas.onselectstart = function () {
        return false;
      };
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
            document.defaultView.getComputedStyle(canvas, null)[
              'borderLeftWidth'
            ],
            10,
          ) || 0;
        styleBorderTop =
          parseInt(
            document.defaultView.getComputedStyle(canvas, null)[
              'borderTopWidth'
            ],
            10,
          ) || 0;
      }
      window.requestAnimFrame = (function (callback) {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

      function animate() {
        var canvas = ref.canvasRef;
        var context = canvas.getContext('2d');
        mainDraw();
        // request new frame
        requestAnimFrame(function () {
          animate();
        });
      }
      animate();
      canvas.onmousedown = myDown;
      canvas.onmouseup = myUp;
      canvas.onclick = myClick;
      canvas.onmousemove = myMove;
      canvas.onmouseover = myOver;
      for (var i = 0; i < 9; i++) {
        var rect = new Box2();
        selectionHandles.push(rect);
        existingRectLines.push(rect);
        selectionHandlestexts.push(rect);
        dragresizehandle.push(rect);
      }
    }
    function clear(c) {
      c.clearRect(0, 0, WIDTH, HEIGHT);
    }

    function mainDraw() {
      if (canvasValid == false) {
        clear(ctx);
        redraw();

        drawPolygon(polygons.map(({ points }) => points));

        var l = boxes2.length;
        for (var i = 0; i < l; i++) {
          if (boxes2[i] != null) {
            boxes2[i].draw(ctx);
          }
        }

        drawlines();

        drawtexts();

        drawAlignmentLineCanvas();

        canvasValid = true;
      }
    }

    function myOver(e) {
      getMouse(e);
    }

    function myMove(e) {
      if (showdragicon == true) {
        getMouse(e);
        showIcons_x = mx;
        showIcons_y = my;
        invalidate();
      }

      if (draw_drag == true && draw_drag_move == false) {
        draghandleMouseMove(e);
      }

      if (draw_drag_move == true) {
        getMouse(e);

        dragstartX = mx - drawdragoffsetx;
        dragstartY = my - drawdragoffsety;
        dragmultipleselection(dragstartX, dragstartY);
        invalidate();
      } else if (isResizeMultiDrag) {
        var oldx = dragstartX;
        var oldy = dragstartY;
        var originalWidthToHeightRatio = dragwidth / dragheight;
        var oldw = dragwidth;
        var oldh = dragheight;

        switch (expectResizeMultiDrag) {
          case 0:
            dragwidth += oldx - mx;
            dragheight = dragwidth / originalWidthToHeightRatio;
            dragstartX = oldx - (dragwidth - oldw);
            dragstartY = oldy - (dragheight - oldh);
            resizeMultiDrag('topleft', oldx, oldy, oldw, oldh);
            break;
          case 1:
            dragwidth = mx - oldx;
            dragheight = dragwidth / originalWidthToHeightRatio;
            dragstartY = oldy - (dragheight - oldh);
            resizeMultiDrag('topright', oldx, oldy, oldw, oldh);
            break;
          case 2:
            dragwidth += oldx - mx;
            dragheight = dragwidth / originalWidthToHeightRatio;
            dragstartX = oldx - (dragwidth - oldw);
            resizeMultiDrag('bottomleft', oldx, oldy, oldw, oldh);
            break;
          case 3:
            dragwidth = mx - oldx;
            dragheight = dragwidth / originalWidthToHeightRatio;
            resizeMultiDrag('bottomright', oldx, oldy, oldw, oldh);
            break;
          case 4:
            var dx = mx - (dragstartX + dragwidth / 2);
            var dy = my - (dragstartY + dragheight / 2);
            var angle = Math.atan2(dy, dx);
            dragangle = angle - -1.5;
            resizeMultiDrag('rotate', oldx, oldy, oldw, oldh);
            break;
        }

        invalidate();
      }
      getMouse(e);
      if (multpleselection.length > 0 && !isResizeMultiDrag) {
        for (var i = 0; i < 5; i++) {
          var cur = dragresizehandle[i];

          if (
            mx >= cur.x - 5 &&
            mx <= cur.x + 5 + mySelBoxSize &&
            my >= cur.y - 5 &&
            my <= cur.y + 5 + mySelBoxSize
          ) {
            // we found one!

            expectResizeMultiDrag = i;
            invalidate();

            switch (i) {
              case 0:
                this.style.cursor = 'nw-resize';
                break;
              case 1:
                this.style.cursor = 'ne-resize';
                break;
              case 2:
                this.style.cursor = 'sw-resize';
                break;
              case 3:
                this.style.cursor = 'se-resize';
                break;
              case 4:
                this.style.cursor = 'grab';
                break;
            }
            return;
          }
        }

        isResizeMultiDrag = false;
        expectResizeMultiDrag = -1;
        this.style.cursor = 'auto';
      }

      if (draw_wall == true) {
        if (hasLoaded) {
          getMouse(e);
          mouseX = mx; // - offsetx;
          mouseY = my; // - offsety;

          if (isDrawing) {
            drawlines();
          }
          invalidate();
        }
      }

      if (isDragline) {
        getMouse(e);

        mySelline.startX = mx - lsoffsetx;
        mySelline.startY = my - lsoffsety;

        mySelline.endX = mx - leoffsetx;
        mySelline.endY = my - leoffsety;

        invalidate();
      } else if (isResizeDragline) {
        switch (expectResizeline) {
          case 0:
            mySelline.startX = mx;
            mySelline.startY = my;
            break;
          case 1:
            mySelline.endX = mx;
            mySelline.endY = my;
            break;
          case 2:
            break;
        }
        invalidate();
      }

      getMouse(e);

      if (mySel !== null && !isResizeDrag) {
        for (var i = 0; i < 9; i++) {
          var cur = selectionHandles[i];

          if (
            mx >= cur.x - 5 &&
            mx <= cur.x + 5 + mySelBoxSize &&
            my >= cur.y - 5 &&
            my <= cur.y + 5 + mySelBoxSize
          ) {
            // we found one!
            expectResize = i;
            invalidate();

            switch (i) {
              case 0:
                this.style.cursor = 'nw-resize';
                break;

              case 2:
                this.style.cursor = 'ne-resize';
                break;

              case 5:
                this.style.cursor = 'sw-resize';
                break;

              case 7:
                this.style.cursor = 'se-resize';
                break;
              case 8:
                this.style.cursor = 'grab';
                break;
            }
            return;
          }
        }

        isResizeDrag = false;
        expectResize = -1;
        this.style.cursor = 'auto';
      }

      if (mySelline !== null && !isResizeDragline) {
        for (var i = 0; i < 3; i++) {
          var cur = existingRectLines[i];
          if (
            mx >= cur.x - 5 &&
            mx <= cur.x - 5 + mySelBoxSize &&
            my >= cur.y - 5 &&
            my <= cur.y - 5 + mySelBoxSize
          ) {
            // we found one!
            expectResizeline = i;
            invalidate();

            switch (i) {
              case 0:
                this.style.cursor = 'col-resize';
                break;
              case 1:
                this.style.cursor = 'col-resize';
                break;
              case 2:
                // this.style.cursor='ne-resize';
                break;
            }
            return;
          }
          isResizeDragline = false;
          expectResizeline = -1;
          this.style.cursor = 'auto';
        }
      }

      // if (selectedText > -1)
      if (isDragtext) {
        getMouse(e);
        var text = texts[selectedText];
        text.x = mx - toffsetx;
        text.y = my - toffsety;
        invalidate();
      } else if (isResizeDragtext) {
        var oldsize = texts[selectedText].size;
        var oldx = texts[selectedText].x;
        var oldy = texts[selectedText].y;
        var nsize = oldsize + 5;
        canvas_text_div.style.display = 'none';
        // 0  1  2
        // 3     4
        // 5  6  7
        switch (expectResizetext) {
          case 0:
            if (mx < oldx) {
              nsize = oldsize + (oldx - mx) / 20;
              if (nsize > 8 && nsize <= 60) {
                texts[selectedText].size = nsize;
              }
            } else {
              nsize = oldsize - (mx - oldx) / 20;
              if (nsize > 8 && nsize <= 60) {
                texts[selectedText].size = nsize;
              }
            }

            break;
          case 1:
            if (mx < oldx + texts[selectedText].width) {
              nsize = oldsize - (oldx + texts[selectedText].width - mx) / 20;
              if (nsize > 8 && nsize <= 60) {
                texts[selectedText].size = nsize;
              }
            } else {
              nsize = oldsize + (mx - (oldx + texts[selectedText].width)) / 20;
              if (nsize > 8 && nsize <= 60) {
                texts[selectedText].size = nsize;
              }
            }
            break;
          case 2:
            if (mx < oldx) {
              nsize = oldsize + (oldx - mx) / 20;
              if (nsize > 8 && nsize <= 60) {
                texts[selectedText].size = nsize;
              }
            } else {
              nsize = oldsize - (mx - oldx) / 20;
              if (nsize > 8 && nsize <= 60) {
                texts[selectedText].size = nsize;
              }
            }
            break;
          case 3:
            if (mx < oldx + texts[selectedText].width) {
              nsize = oldsize - (oldx + texts[selectedText].width - mx) / 20;
              if (nsize > 8 && nsize <= 60) {
                texts[selectedText].size = nsize;
              }
            } else {
              nsize = oldsize + (mx - (oldx + texts[selectedText].width)) / 20;
              if (nsize > 8 && nsize <= 60) {
                texts[selectedText].size = nsize;
              }
            }
            break;
          case 4:
            var dx = mx - (oldx + texts[selectedText].width / 2);
            var dy = my - (oldy + texts[selectedText].height / 2);
            var angle = Math.atan2(dy, dx);
            texts[selectedText].r = angle - -1.5; // - 1.39;// - oldr;
            break;
        }
        document.getElementById('canvas_text').style.fontSize = nsize + 'px';
        document.getElementById('canvas_text').style.height = nsize + 10 + 'px';

        invalidate();
      }

      if (mySeltext !== null && !isResizeDragtext) {
        for (var i = 0; i < 5; i++) {
          // 0  1  2
          // 3     4
          // 5  6  7

          var cur = selectionHandlestexts[i];

          // we dont need to use the ghost context because
          // selection handles will always be rectangles
          if (
            mx >= cur.x - 5 &&
            mx <= cur.x + 5 + mySelBoxSize &&
            my >= cur.y - 5 &&
            my <= cur.y + 5 + mySelBoxSize
          ) {
            // we found one!
            selectedText = mySeltext;
            expectResizetext = i;
            invalidate();

            switch (i) {
              case 0:
                this.style.cursor = 'nw-resize';
                break;
              case 1:
                this.style.cursor = 'ne-resize';
                break;
              case 2:
                this.style.cursor = 'sw-resize';
                break;
              case 3:
                this.style.cursor = 'se-resize';
                break;
              case 4:
                this.style.cursor = 'grab';
                break;
            }
            return;
          }
          isResizeDragtext = false;
          expectResizetext = -1;
          this.style.cursor = 'auto';
        }
      }

      /// ////////// Red line alignment ////////////////////////////////////////////
      var curPos = {
        top: false,
        left: false,
        right: false,
        bottom: false,
      };
      if (boxes2_selectedindex != null) {
        curPos = [];
        // Set up an object representing its current position
        curPos = {
          top: parseInt(boxes2[boxes2_selectedindex].y),
          left: parseInt(boxes2[boxes2_selectedindex].x),
          right: parseInt(
            boxes2[boxes2_selectedindex].x + boxes2[boxes2_selectedindex].w,
          ),
          bottom: parseInt(
            boxes2[boxes2_selectedindex].y + boxes2[boxes2_selectedindex].h,
          ),
        };
      }
      // Set up an object that will let us be able to keep track of newly created lines
      var matches = {
        top: false,
        left: false,
        right: false,
        bottom: false,
      };

      // Get the objects from the canvas
      // For each object
      for (var i = 0; i < boxes2.length; i++) {
        if (boxes2[i] != null) {
          // If the object we are looing at is a line or the object being manipulated, skip it
          if (
            i === boxes2_selectedindex ||
            boxes2[i].type === 'line' ||
            isDrag == false
          ) {
            continue;
          }

          // Set up an object representing the position of the canvas object
          var objPos = {
            top: parseInt(boxes2[i].y),
            left: parseInt(boxes2[i].x),
            right: parseInt(boxes2[i].x + boxes2[i].w),
            bottom: parseInt(boxes2[i].y + boxes2[i].h),
          };

          // Look at all 4 sides of the object and see if the object being manipulated aligns with that side.
          // Top////////////////////////////////////
          if (inRange(objPos.top, curPos.top)) {
            // We match. If we don't already have aline on that side, add one.
            if (!alignmentlines.top.top) {
              drawAlignmentLine('top', objPos.top);
              // Keep track of the fact we found a match so we don't remove the line prematurely.
              matches.top = true;
              // Snap the object to the line
              boxes2[boxes2_selectedindex].y = objPos.top;
            }
          }

          // Left////////////////////////////////////
          if (inRange(objPos.left, curPos.left)) {
            if (!alignmentlines.left.left) {
              drawAlignmentLine('left', objPos.left);
              matches.left = true;
              boxes2[boxes2_selectedindex].x = objPos.left;
            }
          }
          // Right////////////////////////////////////
          if (inRange(objPos.right, curPos.right)) {
            if (!alignmentlines.right.right) {
              drawAlignmentLine('right', objPos.right);
              matches.right = true;
              boxes2[boxes2_selectedindex].x =
                objPos.right - boxes2[boxes2_selectedindex].w;
            }
          }
          // Bottom////////////////////////////////////
          if (inRange(objPos.bottom, curPos.bottom)) {
            if (!alignmentlines.bottom.bottom) {
              drawAlignmentLine('bottom', objPos.bottom);
              matches.bottom = true;
              boxes2[boxes2_selectedindex].y =
                objPos.bottom - boxes2[boxes2_selectedindex].h;
            }
          }

          // Look at the side we matched on. If we did not match, and we have a line, remove the line.
          // for (var j=0; j<matches.length; j++)
          {
            var mtop = matches.top;
            var linetop = alignmentlines.top.top;
            if (!mtop && linetop) {
              alignmentlines.top.top = false;
            }

            var mleft = matches.left;
            var lineleft = alignmentlines.left.left;
            if (!mleft && lineleft) {
              alignmentlines.left.left = false;
            }

            var mright = matches.right;
            var lineright = alignmentlines.right.right;
            if (!mright && lineright) {
              alignmentlines.right.right = false;
            }

            var mbottom = matches.bottom;
            var linebottom = alignmentlines.bottom.bottom;
            if (!mbottom && linebottom) {
              alignmentlines.bottom.bottom = false;
            }
          }
          invalidate();
        }
      }
      /// ////////// Red line alignment end ////////////////////////////////////////

      /// /////////////////////////  dummy /////////////////////////////////////

      //   let p4 = [
      //   {x: 352, y: 61, d: 'e'},
      //   {x: 379, y: 64, d: 'o'},
      //   {x: 406, y: 67, d: 'e'},
      //   {x: 396, y: 92.5, d: 'o'},
      //   {x: 386, y: 118, d: 'e'},
      //   {x: 394, y: 135, d: 'o'},
      //   {x: 402, y: 152, d: 'e'},
      //   {x: 377, y: 156.5, d: 'o'},
      //   {x: 352, y: 161, d: 'e'},
      //   {x: 352, y: 111, d: 'o'},
      //   {x: 352, y: 61, d: 'e'}
      // ]
      //          let rects = drawPolygon([p4]);
      //          polygons.push({
      //         points: p4,
      //         rects: rects[0],
      //         polygonTouch: false,
      //         zoneName: 'Nancy',
      //         r: 0
      //       });

      getMouse(e);
      clear(gctx);
      var l = boxes2.length;
      for (var i = l - 1; i >= 0; i--) {
        if (boxes2[i] != null) {
          // draw shape onto ghost context
          boxes2[i].draw(gctx, 'black');

          // get image data at the mouse x,y pixel
          var imageData = gctx.getImageData(mx, my, 1, 1);
          var index = (mx + my * imageData.width) * 4;

          // if the mouse pixel exists, select and break
          if (imageData.data[3] > 0) {
            mySel = boxes2[i];
            offsetx = mx - mySel.x;
            offsety = my - mySel.y;
            mySel.x = mx - offsetx;
            mySel.y = my - offsety;

            var dx = mx - (mySel.x + mySel.w / 2);
            var dy = my - (mySel.y + mySel.h / 2);
            var angle = Math.atan2(dy, dx);
            oldr = angle;

            // isDrag = true;
            // mySelline = null;
            boxes2_selectedindex = i;

            mouseHover = boxes2[i].id;
            invalidate();
            clear(gctx);
            // desk_active();
            return;
          }
        }
      }
      /// ///////////////////////// dummy end //////////////////////////////////
    }

    function drawAlignmentLine(side, pos) {
      var ln = null;
      switch (side) {
        case 'top':
          alignmentlines.top = {
            startx: 0,
            starty: pos,
            endx: canvas.width,
            endy: pos,
            top: true,
          };
          break;
        case 'left':
          alignmentlines.left = {
            startx: pos,
            starty: 0,
            endx: pos,
            endy: canvas.height,
            left: true,
          };
          break;
        case 'right':
          alignmentlines.right = {
            startx: pos,
            starty: 0,
            endx: pos,
            endy: canvas.height,
            right: true,
          };
          break;
        case 'bottom':
          alignmentlines.bottom = {
            startx: 0,
            starty: pos,
            endx: canvas.width,
            endy: pos,
            bottom: true,
          };
          break;
      }
    }

    function drawAlignmentLineCanvas() {
      if (isDrag == true) {
        ctx.strokeStyle = 'rgba(220,53,69,0.5)';
        ctx.lineWidth = 0.5;
        if (alignmentlines.top.top == true) {
          var sx = alignmentlines.top.startx;
          var sy = alignmentlines.top.starty;
          var ex = alignmentlines.top.endx;
          var ey = alignmentlines.top.endy;
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.closePath();
          ctx.stroke();
        }
        if (alignmentlines.left.left == true) {
          var sx = alignmentlines.left.startx;
          var sy = alignmentlines.left.starty;
          var ex = alignmentlines.left.endx;
          var ey = alignmentlines.left.endy;
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.closePath();
          ctx.stroke();
        }
        if (alignmentlines.right.right == true) {
          var sx = alignmentlines.right.startx;
          var sy = alignmentlines.right.starty;
          var ex = alignmentlines.right.endx;
          var ey = alignmentlines.right.endy;
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.closePath();
          ctx.stroke();
        }
        if (alignmentlines.bottom.bottom == true) {
          var sx = alignmentlines.bottom.startx;
          var sy = alignmentlines.bottom.starty;
          var ex = alignmentlines.bottom.endx;
          var ey = alignmentlines.bottom.endy;
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }

    var alignTolerance = 10;
    function inRange(val1, val2) {
      if (Math.max(val1, val2) - Math.min(val1, val2) <= alignTolerance) {
        return true;
      } else {
        return false;
      }
    }

    // Happens when the mouse is clicked in the canvas

    function myDown(e) {
      getMouse(e);
      this.style.cursor = 'auto';
      showdragicon = false;

      var dragdraw = false;

      if (draw_copy_special == true && draw_paste == true) {
        pastespecial(mx, my);
      }

      if (draw_wall == true) {
        // addRect(mx , my , 60, 65, 'rgba(0,205,0,0.7)');
        // draw_wall = false;

        if (hasLoaded && e.button === 0) {
          if (!isDrawing) {
            startX = mx;
            startY = my;

            isDrawing = true;
          }

          drawlines();
          invalidate();
        }
        dragdraw = false;
      }

      if (draw_squareroom == true) {
        var width = 100;
        var height = 100;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'square',
        );
        draw_squareroom = false;
        dragdraw = false;
      }

      if (draw_stairs == true) {
        var width = 60;
        var height = 100;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          stairs_img,
          stairs_img,
          4,
          11,
        );
        draw_stairs = false;
        dragdraw = false;
      }

      if (draw_lifts == true) {
        var width = 80;
        var height = 61;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          lifts_img,
          lifts_img,
          4,
          12,
        );
        draw_lifts = false;
        dragdraw = false;
      }

      if (draw_doors == true) {
        var width = 50;
        var height = 125;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          doors_img,
          doors_img,
          4,
          13,
        );
        draw_doors = false;
        dragdraw = false;
      }

      if (draw_windows == true) {
        var width = 40;
        var height = 60;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          windows_img,
          windows_img,
          4,
          14,
        );
        draw_windows = false;
        dragdraw = false;
      }

      if (draw_zone == true) {
        var width = 200;
        var height = 200;
        // addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(190, 200, 254,0.7)','zone');
        draw_zone = false;
        var zone_names = document.getElementById('zone_name').value;
        let p1 = polygonPoints(5, mx, my);
        let rects = drawPolygon([p1]);
        polygons.push({
          points: p1,
          rects: rects[0],
          polygonTouch: false,
          zoneName: zone_names,
          r: 0,
        });

        dragdraw = false;
      }

      if (draw_lshapedroom == true) {
        var width = 100;
        var height = 100;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'lshaped',
          lshapedroom_img,
          lshapedroom_img,
        );
        draw_lshapedroom = false;
        dragdraw = false;
      }

      if (draw_cshapedroom == true) {
        var width = 100;
        var height = 100;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'cshaped',
          '',
          '',
        );
        draw_cshapedroom = false;
        dragdraw = false;
      }

      if (draw_singledesk == true) {
        var width = 55;
        var height = 40;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
        );
        draw_singledesk = false;
        dragdraw = false;
      }
      if (draw_shape2 == true) {
        var width = 45;
        var height = 45;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          shape2_img,
          shape2_select_img,
        );
        draw_shape2 = false;
        dragdraw = false;
      }
      if (draw_shape3 == true) {
        var width = 58;
        var height = 45;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          shape3_img,
          shape3_select_img,
        );
        draw_shape3 = false;
        dragdraw = false;
      }
      if (draw_shape4 == true) {
        var width = 75;
        var height = 40;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          shape4_img,
          shape4_select_img,
        );
        draw_shape4 = false;
        dragdraw = false;
      }
      if (draw_shape5 == true) {
        var width = 45;
        var height = 45;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          shape5_img,
          shape5_select_img,
        );
        draw_shape5 = false;
        dragdraw = false;
      }

      if (draw_text == true) {
        canvas_text_div.style.left = mx - 5 + 'px';
        canvas_text_div.style.top = my + 5 + 'px';
        canvas_text_div.style.display = 'block';
        canvas_text_x = mx - 5;
        canvas_text_y = my + 5;
        create_text();
        draw_text = false;
        dragdraw = false;
      } else {
        mySeltext = null;
      }

      // we are over a selection box
      if (expectResize !== -1) {
        isResizeDrag = true;

        var dx = mx - (mySel.x + mySel.w / 2);
        var dy = my - (mySel.y + mySel.h / 2);
        var angle = Math.atan2(dy, dx);
        oldr = angle;

        return;
      }

      if (expectResizeline !== -1) {
        isResizeDragline = true;
        return;
      }

      clear(gctx);
      var l = boxes2.length;
      for (var i = l - 1; i >= 0; i--) {
        if (boxes2[i] != null) {
          // draw shape onto ghost context
          boxes2[i].draw(gctx, 'black');

          // get image data at the mouse x,y pixel
          var imageData = gctx.getImageData(mx, my, 1, 1);
          var index = (mx + my * imageData.width) * 4;

          // if the mouse pixel exists, select and break
          if (imageData.data[3] > 0) {
            mySel = boxes2[i];
            offsetx = mx - mySel.x;
            offsety = my - mySel.y;
            mySel.x = mx - offsetx;
            mySel.y = my - offsety;

            var dx = mx - (mySel.x + mySel.w / 2);
            var dy = my - (mySel.y + mySel.h / 2);
            var angle = Math.atan2(dy, dx);
            oldr = angle;

            isDrag = false;
            mySelline = null;
            boxes2_selectedindex = i;
            invalidate();
            clear(gctx);
            // desk_active();
            return;
          }
        }
      }

      var rl = existingLines.length;
      for (var i = rl - 1; i >= 0; i--) {
        // existingLines[i].draw(gctx, 'black');

        gctx.fillStyle = 'black';
        gctx.strokeStyle = 'black';
        gctx.lineWidth = 20;
        gctx.beginPath();
        gctx.setLineDash([]);
        // for (var i = 0; i < existingLines.length; ++i) {
        var line = existingLines[i];
        gctx.moveTo(line.startX, line.startY);
        gctx.lineTo(line.endX, line.endY);
        gctx.closePath();
        // }

        gctx.stroke();

        // get image data at the mouse x,y pixel
        var imageData = gctx.getImageData(mx, my, 1, 1);

        // if the mouse pixel exists, select and break
        if (imageData.data[3] > 0) {
          isDragline = false;

          mySelline = existingLines[i];
          sellineindex = i;
          lsoffsetx = mx - mySelline.startX;
          lsoffsety = my - mySelline.startY;
          mySelline.startX = mx - lsoffsetx;
          mySelline.startY = my - lsoffsety;

          leoffsetx = mx - mySelline.endX;
          leoffsety = my - mySelline.endY;
          mySelline.endX = mx - leoffsetx;
          mySelline.endY = my - leoffsety;
          mySel = null;
          invalidate();
          clear(gctx);
          return;
        }
      }

      if (expectResizetext !== -1) {
        isResizeDragtext = true;
        return;
      }
      // mySeltext = null;

      var tl = texts.length;
      for (var i = tl - 1; i >= 0; i--) {
        text = texts[i];

        gctx.save();
        gctx.translate(
          text.x + text.width / 2,
          text.y - (text.height - 2) + (text.height + 2) / 2,
        );
        gctx.rotate(text.r);
        gctx.translate(
          -(text.x + text.width / 2),
          -(text.y - (text.height - 2) + (text.height + 2) / 2),
        );
        gctx.font =
          '' +
          text.bold +
          ' ' +
          text.italic +
          ' ' +
          text.underline +
          ' ' +
          text.size +
          'px ' +
          text.style;
        // ctx.font = "bold 24px verdana, sans-serif ";
        // gctx.fillStyle = text.color;//"#ff0000";
        gctx.fillStyle = 'black';
        gctx.strokeStyle = 'black';
        gctx.fillText(text.text, text.x, text.y);
        var twidth = gctx.measureText(text.text).width;
        // text.width = twidth;
        gctx.fillRect(
          text.x - 5,
          text.y - (text.height + 2),
          twidth + 10,
          text.height + 10,
        );

        gctx.restore();

        var imageData = gctx.getImageData(mx, my, 1, 1);
        if (imageData.data[3] > 0) {
          mySel = null;
          mySelline = null;
          selectedText = i;
          toffsetx = mx - texts[i].x;
          toffsety = my - texts[i].y;
          mySeltext = i;
          isDragtext = false;
          invalidate();
          clear(gctx);
          tisFocus = true;
          tfocusIndex = texts[i]?.text?.length;
          draw_text_value = texts[i]?.text;
          // trender();
          return;
        } else {
          document.getElementById('canvas_text_div').style.display = 'none';
          if (draw_text == false) {
            //  resettextbox();
          }
          tselected = false;
          tisFocus = false;
        }
      }

      if (expectResizeMultiDrag !== -1) {
        isResizeMultiDrag = true;
        return;
      }
      if (
        mx > dragstartX &&
        my > dragstartY &&
        mx < dragwidth + dragstartX &&
        my < dragheight + dragstartY
      ) {
        drawdragoffsetx = mx - dragstartX;
        drawdragoffsety = my - dragstartY;
        draw_drag_move = true;
      } else {
        draw_drag_move = false;
      }

      if (draw_drag == true && draw_drag_move == false) {
        draghandleMouseDown(e);
      }

      // havent returned means we have selected nothing
      mySel = null;
      mySelline = null;
      boxes2_selectedindex = null;
      sellineindex = null;
      // clear the ghost canvas for next time
      clear(gctx);
      // invalidate because we might need the selection border to disappear
      invalidate();
    }

    // adds a new node
    function myClick(e) {
      getMouse(e);
      var l = boxes2.length;
    }

    function myUp(e) {
      isDrag = false;
      isResizeDrag = false;
      expectResize = -1;
      invalidate();

      draw_drag_move = false;
      if (draw_drag == true) {
        draghandleMouseUp(e);
      }

      isResizeMultiDrag = false;
      expectResizeMultiDrag = -1;

      isDragline = false;
      isResizeDragline = false;
      expectResizeline = -1;
      if (draw_wall == true) {
        if (hasLoaded && e.button === 0) {
          if (isDrawing) {
            existingLines.push({
              startX: startX,
              startY: startY,
              endX: mouseX,
              endY: mouseY,
              type: linetype,
            });

            var dx = mouseX - startX;
            var dy = mouseY - startY;
            var angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            // alert(angle);
            var dheight = 20;
            var dwidth = dx;
            if (dx > dheight) {
              dwidth = dx;
            } else {
              dwidth = dy;
            }

            var rx = startX;
            var ry = startY;
            if (angle < 0) {
              rx = mouseX;
              ry = mouseY;
            }
            isDrawing = false;
          }

          drawlines();
        }
        draw_wall = false;
      }
      isDragtext = false;
      isResizeDragtext = false;
      expectResizetext = -1;

      if (mySeltext != null) {
        edittext();
      } else {
        selectedText = -1;
      }
    }

    function create_text() {
      draw_text_value = document.getElementById('canvas_text').value;
      canvas_text_div.style.display = 'none';
      var draw_text_style = document.getElementById('draw_text_style').value;
      var draw_text_color = document.getElementById('draw_text_color').value;
      var draw_text_size = parseInt(
        document.getElementById('draw_text_size').value,
      );

      texts.push({
        text: draw_text_value,
        x: canvas_text_x,
        y: canvas_text_y,
        style: draw_text_style,
        color: draw_text_color,
        bold: text_bold,
        italic: text_italic,
        underline: text_underline,
        size: draw_text_size,
        r: 0,
      });

      mySeltext = texts.length - 1;
      selectedText = texts.length - 1;
      document.getElementById('canvas_text').value = 'Text';

      invalidate();
    }

    document.getElementById('canvas_text_done').onclick = function () {
      draw_text_value = document.getElementById('canvas_text').value;
      canvas_text_div.style.display = 'none';
      var draw_text_style = document.getElementById('draw_text_style').value;
      var draw_text_color = document.getElementById('draw_text_color').value;
      var draw_text_size = parseInt(
        document.getElementById('draw_text_size').value,
      );

      texts.push({
        text: draw_text_value,
        x: canvas_text_x,
        y: canvas_text_y,
        style: draw_text_style,
        color: draw_text_color,
        bold: text_bold,
        italic: text_italic,
        underline: text_underline,
        size: draw_text_size,
        r: 0,
      });

      invalidate();
    };

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

    var grid = [];
    for (var i = 0; i < cells; ++i) {
      if (Math.random() < 0.5) {
        grid.push('#FF8ED6');
      } else {
        grid.push('#8ED6FF');
      }
    }

    // drawGrid(0, 0);

    // function redraw(){

    //   // Clear the entire canvas
    //   var p1 = ctx.transformedPoint(0,0);
    //   var p2 = ctx.transformedPoint(canvas.width,canvas.height);
    //   ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

    //   ctx.save();
    //   ctx.setTransform(1,0,0,1,0,0);
    //   ctx.clearRect(0,0,canvas.width,canvas.height);
    //   ctx.restore();
    //   canvasValid = false;

    //   // ctx.drawImage(gkhead,0,0);

    // }

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
          // canvasValid = false;
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
        }
      },
      false,
    );

    function edittext() {
      if (mySeltext != null) {
        var i = mySeltext;
        document.getElementById('canvas_text').value = texts[i].text;
        canvas_text_div.style.left = texts[i].x + 'px';
        canvas_text_div.style.top = texts[i].y - texts[i].size + 'px';
        canvas_text_div.style.display = 'block';
        // document.getElementById('canvas_text').style.height =  texts[i].size +'px';
        document.getElementById('canvas_text').style.fontSize =
          texts[i].size + 'px';
        document.getElementById('canvas_text').focus();
        edittextbox = true;
        invalidate();
      }
    }

    document.getElementById('canvas_text').onkeyup = function (e) {
      if (mySeltext != null) {
        var i = mySeltext;
        texts[i].text = '';
        draw_text_value = document.getElementById('canvas_text').value;
        texts[i].text = draw_text_value;
        invalidate();
      }
    };

    /// ///////////////////////////////// end text /////////////////////////////////////////////////////////////

    function pastespecial(pastex, pastey) {
      if (boxes2_selectedindex != null) {
        var i = boxes2_selectedindex;
        if (boxes2[i] != null) {
          var rect = new Box2();
          rect.x = pastex - boxes2[i].w / 2;
          rect.y = pastey - boxes2[i].h / 2;
          rect.w = boxes2[i].w;
          rect.h = boxes2[i].h;
          rect.fill = boxes2[i].fill;
          rect.type = boxes2[i].type;
          rect.image = boxes2[i].image;
          rect.selectimage = boxes2[i].selectimage;
          rect.id = boxes2[i].id;
          var l = boxes2.length;
          rect.index = l;
          boxes2.push(rect);

          invalidate();
        }
      }

      if (sellineindex != null) {
        var i = sellineindex;
        var ewx = existingLines[i].startX - existingLines[i].endX;
        var ewy = existingLines[i].startY - existingLines[i].endY;

        existingLines.push({
          startX: pastex,
          startY: pastey,
          endX: pastex + ewx,
          endY: pastey + ewy,
          type: existingLines[i].type,
        });

        invalidate();
      }

      if (mySeltext != null) {
        var i = mySeltext;
        texts.push({
          text: texts[i].text,
          x: pastex,
          y: pastey,
          style: texts[i].style,
          color: texts[i].color,
          bold: texts[i].bold,
          italic: texts[i].italic,
          underline: texts[i].underline,
          size: texts[i].size,
        });

        invalidate();
      }

      if (multpleselection.length != 0) {
        for (var m = 0; m < multpleselection.length; m++) {
          var arrayname = multpleselection[m].arrayname;
          var arrayindex = multpleselection[m].arrayindex;
          var dx = multpleselection[m].dx;
          var dy = multpleselection[m].dy;
          var nx = dx + pastex;
          var ny = dy + pastey;
          if (arrayname == 'boxes2') {
            var i = arrayindex;
            if (boxes2[i] != null) {
              var rect = new Box2();
              rect.x = nx - boxes2[i].w / 2;
              rect.y = ny - boxes2[i].h / 2;
              rect.w = boxes2[i].w;
              rect.h = boxes2[i].h;
              rect.fill = boxes2[i].fill;
              rect.type = boxes2[i].type;
              rect.image = boxes2[i].image;
              rect.selectimage = boxes2[i].selectimage;
              rect.id = boxes2[i].id;
              var l = boxes2.length;
              rect.index = l;
              boxes2.push(rect);
            }
          }

          if (arrayname == 'existingLines') {
            var i = arrayindex;
            var ewx = existingLines[i].startX - existingLines[i].endX;
            var ewy = existingLines[i].startY - existingLines[i].endY;

            existingLines.push({
              startX: nx,
              startY: ny,
              endX: nx + ewx,
              endY: ny + ewy,
              type: existingLines[i].type,
            });
          }

          if (arrayname == 'texts') {
            var i = arrayindex;
            texts.push({
              text: texts[i].text,
              x: nx,
              y: ny,
              style: texts[i].style,
              color: texts[i].color,
              bold: texts[i].bold,
              italic: texts[i].italic,
              underline: texts[i].underline,
              size: texts[i].size,
            });

            invalidate();
          }
        }

        invalidate();
      }

      draw_copy_special = false;
      draw_paste = false;
    }

    function invalidate() {
      canvasValid = false;
    }

    function drawlines() {
      if (mySelline !== null) {
        existingRectLines[0].x = mySelline.startX;
        existingRectLines[0].y = mySelline.startY;

        existingRectLines[1].x = mySelline.endX;
        existingRectLines[1].y = mySelline.endY;

        existingRectLines[2].x = (mySelline.startX + mySelline.endX) / 2;
        existingRectLines[2].y = (mySelline.startY + mySelline.endY) / 2;

        var li = sellineindex;
        var line = existingLines[li];
        existingLines[li].startX = line.startX;
        existingLines[li].startY = line.startY;
        existingLines[li].endX = line.endX;
        existingLines[li].endY = line.endY;
      }

      ctx.strokeStyle = '#EEEEEE';
      ctx.lineWidth = 8;
      ctx.lineCap = 'square';
      var lines = false;
      for (var i = 0; i < existingLines.length; ++i) {
        var line = existingLines[i];
        if (line.type == 'dash') {
          ctx.lineWidth = 4;
          ctx.strokeStyle = '#777777';

          ctx.beginPath();
          ctx.setLineDash([1]);
          ctx.moveTo(line.startX, line.startY);
          ctx.lineTo(line.endX, line.endY);
          ctx.closePath();
          ctx.stroke();

          ctx.lineWidth = 3;
          ctx.strokeStyle = '#EEEEEE';
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(line.startX, line.startY);
          ctx.lineTo(line.endX, line.endY);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.lineWidth = 8;
          ctx.strokeStyle = '#777777';

          ctx.beginPath();
          ctx.setLineDash([1]);
          ctx.moveTo(line.startX, line.startY);
          ctx.lineTo(line.endX, line.endY);
          ctx.closePath();
          ctx.stroke();

          ctx.lineWidth = 4;
          ctx.strokeStyle = '#EEEEEE';
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(line.startX, line.startY);
          ctx.lineTo(line.endX, line.endY);
          ctx.closePath();
          ctx.stroke();
        }

        lines = true;
      }
      if (isDrawing) {
        // ctx.strokeStyle = "darkred";
        if (linetype == 'dash') {
          ctx.lineWidth = 4;
          ctx.strokeStyle = '#777777';
          ctx.beginPath();
          ctx.setLineDash([1]);
          ctx.moveTo(startX, startY);
          ctx.lineTo(mouseX, mouseY);
          ctx.closePath();
          ctx.stroke();

          ctx.lineWidth = 3;
          ctx.strokeStyle = '#EEEEEE';
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(startX, startY);
          ctx.lineTo(mouseX, mouseY);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.lineWidth = 8;
          ctx.strokeStyle = '#777777';
          ctx.beginPath();
          ctx.setLineDash([1]);
          ctx.moveTo(startX, startY);
          ctx.lineTo(mouseX, mouseY);
          ctx.closePath();
          ctx.stroke();

          ctx.lineWidth = 4;
          ctx.strokeStyle = '#EEEEEE';
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(startX, startY);
          ctx.lineTo(mouseX, mouseY);
          ctx.closePath();
          ctx.stroke();
        }
      }

      ctx.setLineDash([]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = mySelColor;
      if (mySelline !== null) {
        ctx.fillStyle = mySelBoxColor;
        for (var i = 0; i < 2; i++) {
          var cur = existingRectLines[i];
          ctx.fillRect(cur.x - 5, cur.y - 5, mySelBoxSize, mySelBoxSize);
          ctx.strokeRect(cur.x - 5, cur.y - 5, mySelBoxSize, mySelBoxSize);
        }
      }
    }
    function drawtexts() {
      for (var i = 0; i < texts.length; i++) {
        var textd = texts[i];
        // textd.width = ctx.measureText(textd.text).width;
        textd.height = textd.size; // 16;
      }
      for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        ctx.save();
        ctx.font =
          '' +
          text.bold +
          ' ' +
          text.italic +
          ' ' +
          text.size +
          'px ' +
          text.style;
        // ctx.font = "bold 24px verdana, sans-serif ";
        ctx.fillStyle = text.color; // "#ff0000";
        ctx.fillText(text.text, text.x, text.y);
        if (text.underline == 'underline') {
          textUnderLineFun(
            ctx,
            text.text,
            text.x,
            text.y,
            text.color,
            text.size,
            'rgba(0, 0, 0, 0.9)',
          );
        }
        var twidth = ctx.measureText(text.text).width;
        text.width = twidth;
        if (selectedText == i) {
        }

        ctx.restore();
      }
    }

    function textUnderLineFun(context, text, x, y, color, textSize, lineColor) {
      // killedUnderline
      // context.save();
      var textWidth = context.measureText(text).width;
      var startX;
      var startY = y + parseInt(textSize) / 15;
      var endX;
      var endY = startY;
      var underlineHeight = parseInt(textSize) / 15;
      if (underlineHeight < 1) {
        underlineHeight = 1;
      }
      context.beginPath();
      startX = x;
      endX = x + textWidth;
      context.strokeStyle = color;
      context.moveTo(startX, y + 2);
      context.lineTo(endX + 6, y + 2);
      context.stroke();
    }

    function draghandleMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();
      getMouse(e);
      dragstartX = parseInt(mx);
      dragstartY = parseInt(my);
      dragisDown = true;
    }
    function draghandleMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();

      if (isResizeMultiDrag == false) {
        var x = dragstartX;
        var y = dragstartY;
        multpleselection = [];
        var minx = Number.POSITIVE_INFINITY;
        var miny = Number.POSITIVE_INFINITY;
        var maxx = 0;
        var maxy = 0;
        for (var i = 0; i < boxes2.length; i++) {
          if (boxes2[i] != null) {
            if (
              (x <= boxes2[i].x || x <= boxes2[i].x + boxes2[i].w) &&
              x + dragwidth >= boxes2[i].x &&
              (y <= boxes2[i].y || y <= boxes2[i].y + boxes2[i].h) &&
              y + dragheight >= boxes2[i].y
            ) {
              minx = Math.min(minx, boxes2[i].x);
              // x = minx;
              miny = Math.min(miny, boxes2[i].y);
              // y = miny;
              maxx = Math.max(maxx, boxes2[i].x + boxes2[i].w);
              maxy = Math.max(maxy, boxes2[i].y + boxes2[i].h);

              multpleselection.push({
                arrayname: 'boxes2',
                arrayindex: i,
                dx: boxes2[i].x,
                dy: boxes2[i].y,
                x: boxes2[i].x,
                y: boxes2[i].y,
                w: boxes2[i].w,
                h: boxes2[i].h,
              });
            }
          }
        }
        for (var i = 0; i < existingLines.length; i++) {
          if (
            x <= existingLines[i].startX &&
            x + dragwidth >= existingLines[i].startX &&
            y <= existingLines[i].startY &&
            y + dragheight >= existingLines[i].startY
          ) {
            minx = Math.min(minx, existingLines[i].startX);
            //  x = minx;
            miny = Math.min(miny, existingLines[i].startY);
            //  y = miny;
            maxx = Math.max(maxx, existingLines[i].startX);
            maxy = Math.max(maxy, existingLines[i].startY);
            multpleselection.push({
              arrayname: 'existingLines',
              arrayindex: i,
              dx: existingLines[i].startX,
              dy: existingLines[i].startY,
              dxe: existingLines[i].endX,
              dye: existingLines[i].endY,
            });
          }
        }
        for (var i = 0; i < texts.length; i++) {
          if (
            x <= texts[i].x &&
            x + dragwidth >= texts[i].x &&
            y <= texts[i].y &&
            y + dragheight >= texts[i].y
          ) {
            minx = Math.min(minx, texts[i].x);
            // x = minx;
            miny = Math.min(miny, texts[i].y);
            // y = miny;
            maxx = Math.max(maxx, texts[i].x + texts[i].width);
            maxy = Math.max(maxy, texts[i].y + texts[i].height);

            multpleselection.push({
              arrayname: 'texts',
              arrayindex: i,
              dx: texts[i].x,
              dy: texts[i].y,
            });
          }
        }

        getMouse(e);
        if (
          (mx < dragstartX && my < dragstartY) ||
          (mx > dragwidth + dragstartX && my > dragheight + dragstartY)
        ) {
          draw_drag == false;
          dragstartX = 0;
          dragstartY = 0;
          dragwidth = 0;
          dragheight = 0;
        }

        dragstartX = minx;
        dragstartY = miny;
        dragwidth = Math.abs(maxx - dragstartX);
        dragheight = Math.abs(maxy - dragstartY);

        for (var i = 0; i < multpleselection.length; i++) {
          multpleselection[i].dx = multpleselection[i].dx - dragstartX;
          multpleselection[i].dy = multpleselection[i].dy - dragstartY;
          if (multpleselection[i].arrayname == 'existingLines') {
            multpleselection[i].edx = multpleselection[i].edx - dragstartX;
            multpleselection[i].edy = multpleselection[i].edy - dragstartY;
          }
        }
        if (multpleselection.length == 0) {
          dragstartX = 0;
          dragstartY = 0;
          dragwidth = 0;
          dragheight = 0;
        }
      }
      dragisDown = false;
      invalidate();
    }
    function draghandleMouseMove(e) {
      e.preventDefault();
      e.stopPropagation();
      getMouse(e);
      if (!dragisDown) {
        return;
      }
      dragmouseX = parseInt(mx);
      dragmouseY = parseInt(my);
      dragwidth = dragmouseX - dragstartX;
      dragheight = dragmouseY - dragstartY;
      invalidate();
    }
    function resizeMultiDrag(task, doldx, doldy, doldw, doldh) {
      for (var i = 0; i < multpleselection.length; i++) {
        var arrayname = multpleselection[i].arrayname;
        var arrayindex = multpleselection[i].arrayindex;
        var dx = multpleselection[i].dx;
        var dy = multpleselection[i].dy;

        if (arrayname == 'boxes2') {
          var oldx = multpleselection[i].x;
          var oldy = multpleselection[i].y;
          var originalWidthToHeightRatio =
            multpleselection[i].w / multpleselection[i].h;
          var oldw = multpleselection[i].w;
          var oldh = multpleselection[i].h;

          var dragdeskratio = doldw / boxes2[arrayindex].w;
          var dragdeskxratio = doldw / dx;
          var dragdeskyratio = doldh / dy;
          if (task == 'topleft') {
            boxes2[arrayindex].w += (doldx - dragstartX) / dragdeskratio;
            boxes2[arrayindex].h =
              boxes2[arrayindex].w / originalWidthToHeightRatio;
            boxes2[arrayindex].x +=
              (doldx - dragstartX) / dragdeskxratio - (doldx - dragstartX);
            boxes2[arrayindex].y +=
              (doldy - dragstartY) / dragdeskyratio - (doldy - dragstartY);
          }
          if (task == 'topright') {
            boxes2[arrayindex].w = oldw - (dragstartX - doldx) / dragdeskratio;
            boxes2[arrayindex].h =
              boxes2[arrayindex].w / originalWidthToHeightRatio;
            boxes2[arrayindex].y +=
              (doldy - dragstartY) / dragdeskyratio - (doldy - dragstartY);
          }
          if (task == 'bottomleft') {
            boxes2[arrayindex].w += (doldx - dragstartX) / dragdeskratio;
            boxes2[arrayindex].h =
              boxes2[arrayindex].w / originalWidthToHeightRatio;
            boxes2[arrayindex].x +=
              (doldx - dragstartX) / dragdeskxratio - (doldx - dragstartX);
          }
          if (task == 'bottomright') {
            boxes2[arrayindex].w += (dragwidth - doldw) / dragdeskratio;
            boxes2[arrayindex].h =
              boxes2[arrayindex].w / originalWidthToHeightRatio;
            boxes2[arrayindex].x = oldx - (boxes2[arrayindex].w - oldw); // ((doldx - dragstartX)/ dragdeskxratio)-(doldx - dragstartX);
          }
          if (task == 'rotate') {
            var dx = mx - (dragstartX + dragwidth / 2);
            var dy = my - (dragstartY + dragheight / 2);
            var angle = Math.atan2(dy, dx);
            dragangle = angle - -1.5;
          }
        }
      }
    }
    function filteredColor(color, nameId) {
      switch (color) {
        default: {
          if (nameId == 1)
            return {
              img: singledesk_img,
              select: singledesk_select_img,
              img_type: 'image',
            };
          if (nameId == 2)
            return {
              img: roomDesk,
              select: room_select_img,
              img_type: 'image',
            };
          if (nameId == 3)
            return {
              img: parking_img,
              select: parking_select_img,
              img_type: 'image',
            };
          if (nameId == 4)
            return {
              img: shape3_img,
              select: shape3_select_img,
              img_type: 'image',
            };
          if (nameId == 5)
            return {
              img: shape2_img,
              select: shape2_select_img,
              img_type: 'image',
            };
          if (nameId == 6)
            return {
              img: shape5_img,
              select: shape5_select_img,
              img_type: 'image',
            };
          if (nameId == 7)
            return { img: room_xs, select: room_xs_select, img_type: 'image' };
          if (nameId == 8)
            return { img: room_m, select: room_m_select, img_type: 'image' };
          if (nameId == 9)
            return { img: room_l, select: room_l_select, img_type: 'image' };
          if (nameId == 10)
            return { img: room_xl, select: room_xl_select, img_type: 'image' };
          if (nameId == 15)
            return {
              img: regular_l,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 16)
            return {
              img: regular_c,
              select: regular_c_select,
              img_type: 'image',
            };
          if (nameId == 17)
            return {
              img: room_xxs,
              select: room_xxs_select,
              img_type: 'image',
            };
          if (nameId == 18)
            return {
              img: onewayR_img,
              select: onewayR_img,
              img_type: 'image',
            };
          if (nameId == 19)
            return {
              img: onewayL_img,
              select: onewayL_img,
              img_type: 'image',
            };
          if (nameId == 20)
            return {
              img: twoway_img,
              select: twoway_img,
              img_type: 'image',
            };
          if (nameId == 21)
            return {
              img: twoway90_img,
              select: twoway90_img,
              img_type: 'image',
            };
        }
      }
    }
    function colorCode(color, nameId) {
      switch (color) {
        case '#D99797': {
          if (nameId == 1)
            return {
              img: singledesk_img_red,
              select: singledesk_select_img,
              img_type: 'image',
            };
          if (nameId == 2)
            return {
              img: room_booked,
              select: room_select_img,
              img_type: 'image',
            };
          if (nameId == 3)
            return {
              img: parking_booked,
              select: parking_select_img,
              img_type: 'image',
            };
          if (nameId == 4)
            return {
              img: shape3_booked,
              select: shape3_select_img,
              img_type: 'image',
            };
          if (nameId == 5)
            return {
              img: shape2_booked,
              select: shape2_select_img,
              img_type: 'image',
            };
          if (nameId == 6)
            return {
              img: regular_l_booked,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 7)
            return {
              img: room_xs_booked,
              select: room_xs_select,
              img_type: 'image',
            };
          if (nameId == 8)
            return {
              img: room_m_booked,
              select: room_m_select,
              img_type: 'image',
            };
          if (nameId == 9)
            return {
              img: room_l_booked,
              select: room_l_select,
              img_type: 'image',
            };
          if (nameId == 10)
            return {
              img: room_xl_booked,
              select: room_xl_select,
              img_type: 'image',
            };
          if (nameId == 15)
            return {
              img: regular_l_booked,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 16)
            return {
              img: regular_c_booked,
              select: regular_c_select,
              img_type: 'image',
            };
          if (nameId == 17)
            return {
              img: room_xxs_booked,
              select: room_xxs_select,
              img_type: 'image',
            };
        }
        case '#006600': {
          if (nameId == 1)
            return {
              img: singledesk_img_aval,
              select: singledesk_select_img,
              img_type: 'image',
            };
          if (nameId == 2)
            return {
              img: room_avail,
              select: room_select_img,
              img_type: 'image',
            };
          if (nameId == 3)
            return {
              img: parking_avail,
              select: parking_select_img,
              img_type: 'image',
            };
          if (nameId == 4)
            return {
              img: shape3_avail,
              select: shape3_select_img,
              img_type: 'image',
            };
          if (nameId == 5)
            return {
              img: shape2_avail,
              select: shape2_select_img,
              img_type: 'image',
            };
          if (nameId == 6)
            return {
              img: regular_l_avail,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 7)
            return {
              img: room_xs_avail,
              select: room_xs_select,
              img_type: 'image',
            };
          if (nameId == 8)
            return {
              img: room_m_avail,
              select: room_m_select,
              img_type: 'image',
            };
          if (nameId == 9)
            return {
              img: room_l_avail,
              select: room_l_select,
              img_type: 'image',
            };
          if (nameId == 10)
            return {
              img: room_xl_avail,
              select: room_xl_select,
              img_type: 'image',
            };
          if (nameId == 15)
            return {
              img: regular_l_avail,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 16)
            return {
              img: regular_c_avail,
              select: regular_c_select,
              img_type: 'image',
            };
          if (nameId == 17)
            return {
              img: room_xxs_avail,
              select: room_xxs_select,
              img_type: 'image',
            };
        }
        case '#DCDCDC': {
          if (nameId == 1)
            return {
              img: desk_unavail,
              select: singledesk_select_img,
              img_type: 'image',
            };
          if (nameId == 2)
            return {
              img: room_unavail,
              select: room_select_img,
              img_type: 'image',
            };
          if (nameId == 3)
            return {
              img: parkingUnavail,
              select: parking_select_img,
              img_type: 'image',
            };
          if (nameId == 4)
            return {
              img: shape3_unavail,
              select: shape3_select_img,
              img_type: 'image',
            };
          if (nameId == 5)
            return {
              img: shape2_unavail,
              select: shape2_select_img,
              img_type: 'image',
            };
          if (nameId == 6)
            return {
              img: regular_l_unavail,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 7)
            return {
              img: room_xs_unavail,
              select: room_xs_select,
              img_type: 'image',
            };
          if (nameId == 8)
            return {
              img: room_m_unavail,
              select: room_m_select,
              img_type: 'image',
            };
          if (nameId == 9)
            return {
              img: room_l_unavail,
              select: room_l_select,
              img_type: 'image',
            };
          if (nameId == 10)
            return {
              img: room_xl_unavail,
              select: room_xl_select,
              img_type: 'image',
            };
          if (nameId == 15)
            return {
              img: regular_l_unavail,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 16)
            return {
              img: regular_c_unavail,
              select: regular_c_select,
              img_type: 'image',
            };
          if (nameId == 17)
            return {
              img: room_xxs_unavail,
              select: room_xxs_select,
              img_type: 'image',
            };
        }
        case '#65A2D9': {
          if (nameId == 1)
            return {
              img: singledesk_img_bookedme,
              select: singledesk_select_img,
              img_type: 'image',
            };
          if (nameId == 2)
            return {
              img: room_bookedme,
              select: room_select_img,
              img_type: 'image',
            };
          if (nameId == 3)
            return {
              img: parking_bookedme,
              select: parking_select_img,
              img_type: 'image',
            };
          if (nameId == 4)
            return {
              img: shape3_bookedme,
              select: shape3_select_img,
              img_type: 'image',
            };
          if (nameId == 5)
            return {
              img: shape2_bookedme,
              select: shape2_select_img,
              img_type: 'image',
            };
          if (nameId == 6)
            return {
              img: regular_l_bookedme,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 7)
            return {
              img: room_xs_bookedme,
              select: room_xs_select,
              img_type: 'image',
            };
          if (nameId == 8)
            return {
              img: room_m_bookedme,
              select: room_m_select,
              img_type: 'image',
            };
          if (nameId == 9)
            return {
              img: room_l_bookedme,
              select: room_l_select,
              img_type: 'image',
            };
          if (nameId == 10)
            return {
              img: room_xl_bookedme,
              select: room_xl_select,
              img_type: 'image',
            };
          if (nameId == 15)
            return {
              img: regular_l_bookedme,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 16)
            return {
              img: regular_c_bookedme,
              select: regular_c_select,
              img_type: 'image',
            };
          if (nameId == 17)
            return {
              img: room_xxs_bookedme,
              select: room_xxs_select,
              img_type: 'image',
            };
        }
        case '#F8D49B': {
          if (nameId == 1)
            return {
              img: deskRequest,
              select: singledesk_select_img,
              img_type: 'image',
            };
          if (nameId == 2)
            return {
              img: roomRequest,
              select: room_select_img,
              img_type: 'image',
            };
          if (nameId == 3)
            return {
              img: parkingRequest,
              select: parking_select_img,
              img_type: 'image',
            };
          if (nameId == 4)
            return {
              img: shape3_request,
              select: shape3_select_img,
              img_type: 'image',
            };
          if (nameId == 5)
            return {
              img: shape2_request,
              select: shape2_select_img,
              img_type: 'image',
            };
          if (nameId == 6)
            return {
              img: regular_l_request,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 7)
            return {
              img: room_xs_req,
              select: room_xs_select,
              img_type: 'image',
            };
          if (nameId == 8)
            return {
              img: room_m_req,
              select: room_m_select,
              img_type: 'image',
            };
          if (nameId == 9)
            return {
              img: room_l_req,
              select: room_l_select,
              img_type: 'image',
            };
          if (nameId == 10)
            return {
              img: room_xl_req,
              select: room_xl_select,
              img_type: 'image',
            };
          if (nameId == 15)
            return {
              img: regular_l_request,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 16)
            return {
              img: regular_c_request,
              select: regular_c_select,
              img_type: 'image',
            };
          if (nameId == 17)
            return {
              img: room_xxs_req,
              select: room_xxs_select,
              img_type: 'image',
            };
        }
        default: {
          if (nameId == 1)
            return {
              img: singledesk_img,
              select: singledesk_select_img,
              img_type: 'image',
            };
          if (nameId == 2)
            return {
              img: roomDesk,
              select: room_select_img,
              img_type: 'image',
            };
          if (nameId == 3)
            return {
              img: parking_img,
              select: parking_select_img,
              img_type: 'image',
            };
          if (nameId == 4)
            return {
              img: shape3_img,
              select: shape3_select_img,
              img_type: 'image',
            };
          if (nameId == 5)
            return {
              img: shape2_img,
              select: shape2_select_img,
              img_type: 'image',
            };
          if (nameId == 6)
            return {
              img: shape5_img,
              select: shape5_select_img,
              img_type: 'image',
            };
          if (nameId == 7)
            return {
              img: room_xs,
              select: room_xs_select,
              img_type: 'image',
            };
          if (nameId == 8)
            return {
              img: room_m,
              select: room_m_select,
              img_type: 'image',
            };
          if (nameId == 9)
            return {
              img: room_l,
              select: room_l_select,
              img_type: 'image',
            };
          if (nameId == 10)
            return {
              img: room_xl,
              select: room_xl_select,
              img_type: 'image',
            };
          if (nameId == 11)
            return { img: stairs_img, select: stairs_img, img_type: 'image' };
          if (nameId == 12)
            return { img: lifts_img, select: lifts_img, img_type: 'image' };
          if (nameId == 13)
            return { img: doors_img, select: doors_img, img_type: 'image' };
          if (nameId == 14)
            return { img: windows_img, select: windows_img, img_type: 'image' };
          if (nameId == 15)
            return {
              img: regular_l,
              select: regular_l_select,
              img_type: 'image',
            };
          if (nameId == 16)
            return {
              img: regular_c,
              select: regular_c_select,
              img_type: 'image',
            };
          if (nameId == 17)
            return {
              img: room_xxs,
              select: room_xxs_select,
              img_type: 'image',
            };
          if (nameId == 18)
            return {
              img: onewayR_img,
              select: onewayR_img,
              img_type: 'image',
            };
          if (nameId == 19)
            return {
              img: onewayL_img,
              select: onewayL_img,
              img_type: 'image',
            };
          if (nameId == 20)
            return {
              img: twoway_img,
              select: twoway_img,
              img_type: 'image',
            };
          if (nameId == 21)
            return {
              img: twoway90_img,
              select: twoway90_img,
              img_type: 'image',
            };
        }
      }
    }
    if (locate?.length > 0) {
      newLocateData = locate?.map((i, idx) => {
        if (locate[0]?.label_status) {
          labelShowHide = locate[0]?.label_status == 1 ? true : false;
        }
        const deskShapes = [1, 2, 3];
        if (i?.type_info == 'solid' || i?.type_info == 'dash') {
          existingLines.push({
            startX: i?.my_cordinate[0][0]['startX'],
            startY: i?.my_cordinate[0][0]['startY'],
            endX: i?.my_cordinate[0][0]['endX'],
            endY: i?.my_cordinate[0][0]['endY'],
            type: i?.type_info,
          });
        } else if (i?.type_info == 'zone' && i?.my_cordinate[0].points) {
          polygons.push({
            points: i?.my_cordinate[0].points,
            rects: i?.my_cordinate[0].rects,
            polygonTouch: false,
            zoneName: i?.label,
            r: 0,
          });
        } else if (i?.type_info == 'text') {
          texts.push({
            text: i?.my_cordinate?.[0]?.['text'],
            x: i?.my_cordinate?.[0]?.['x'],
            y: i?.my_cordinate?.[0]?.['y'],
            style: i?.my_cordinate?.[0]?.['style'],
            color: i?.my_cordinate?.[0]?.['color'],
            bold: i?.my_cordinate?.[0]?.['bold'],
            italic: i?.my_cordinate?.[0]?.['italic'],
            underline: i?.my_cordinate?.[0]?.['underline'],
            size: i?.my_cordinate?.[0]?.['size'],
            r: 0,
          });
        } else {
          const x = i?.my_cordinate?.[0]?.[0]['x'];
          const y = i?.my_cordinate?.[0]?.[0]['y'];
          const w = i?.width;
          const h = i?.height;
          const r = Number(i?.degree);
          const asset_name_id = i?.asset_name_id || null;
          const assettype = i?.asset_type || null;
          const asset_id = i?.asset_id || null;
          const asset_label = i?.label || null;
          if (i?.type_info == 'square')
            addRect(x - 0, y - 0, w, h, 'rgba(190, 200, 254,0.7)', 'square');
          else if (i?.type_info == 'cshaped')
            addRect(
              x - 0,
              y - 0,
              w,
              h,
              'rgba(190, 200, 254,0.7)',
              'cshaped',
              '',
              '',
            );
          else if (i?.type_info == 'lshaped')
            addRect(
              x - 0,
              y - 0,
              w,
              h,
              'rgba(190, 200, 254,0.7)',
              'lshaped',
              '',
              '',
            );
          else if (deskShapes.includes(assettype) && asset_name_id != null) {
            let icon;
            if (
              amentiesFilter !== '' &&
              (amentiesFilter?.work?.length != 0 ||
                amentiesFilter?.room?.length != 0 ||
                amentiesFilter?.park?.length != 0)
            ) {
              const itemAmen =
                i?.asset_amenities !== null && i?.asset_amenities !== ''
                  ? i?.asset_amenities.split(',')
                  : '';
              const workSameAmen =
                itemAmen !== ''
                  ? itemAmen?.filter(a =>
                      amentiesFilter?.work.includes(Number(a)),
                    )
                  : [];
              const roomSameAmen =
                itemAmen !== ''
                  ? itemAmen?.filter(a =>
                      amentiesFilter?.room.includes(Number(a)),
                    )
                  : [];
              const parkSameAmen =
                itemAmen !== ''
                  ? itemAmen?.filter(a =>
                      amentiesFilter?.park.includes(Number(a)),
                    )
                  : [];
              if (
                (assettype == 1 &&
                  workSameAmen?.length == amentiesFilter?.work?.length) ||
                (assettype == 2 &&
                  roomSameAmen?.length == amentiesFilter?.room?.length) ||
                (assettype == 3 &&
                  parkSameAmen?.length == amentiesFilter?.park?.length)
              )
                icon = colorCode(i?.asset_color, asset_name_id);
              else icon = filteredColor(i?.asset_color, asset_name_id);
            } else if (search_id !== '' && search_id !== null) {
              if (asset_id == search_id)
                icon = colorCode(i?.asset_color, asset_name_id);
              else icon = filteredColor(i?.asset_color, asset_name_id);
            } else if (searchData !== '') {
              if (asset_id == searchData?.asset_id)
                icon = colorCode(i?.asset_color, asset_name_id);
              else icon = filteredColor(i?.asset_color, asset_name_id);
            } else {
              const degToRad = (r * Math.PI) / 180.0;
              icon = colorCode(i?.asset_color, asset_name_id);
            }
            addRect(
              x - 0,
              y - 0,
              w,
              h,
              'rgba(220,205,65,0.7)',
              'image',
              icon?.img,
              icon?.select,
              i?.asset_id,
              asset_label,
              r,
            );
          } else if (assettype == 4) {
            if (asset_name_id == 11)
              addRect(
                x - 0,
                y - 0,
                w,
                h,
                'rgba(220,205,65,0.7)',
                'image',
                stairs_img,
                stairs_img,
                '',
                '',
                r,
              );
            if (asset_name_id == 12)
              addRect(
                x - 0,
                y - 0,
                w,
                h,
                'rgba(220,205,65,0.7)',
                'image',
                lifts_img,
                lifts_img,
                '',
                '',
                r,
              );
            if (asset_name_id == 13)
              addRect(
                x - 0,
                y - 0,
                w,
                h,
                'rgba(220,205,65,0.7)',
                'image',
                doors_img,
                doors_img,
                '',
                '',
                r,
              );
            if (asset_name_id == 14)
              addRect(
                x - 0,
                y - 0,
                w,
                h,
                'rgba(220,205,65,0.7)',
                'image',
                windows_img,
                windows_img,
                '',
                '',
                r,
              );
            if (asset_name_id == 18)
              addRect(
                x - 0,
                y - 0,
                w,
                h,
                'rgba(220,205,65,0.7)',
                'image',
                onewayR_img,
                onewayR_img,
                '',
                '',
                r,
              );
            if (asset_name_id == 19)
              addRect(
                x - 0,
                y - 0,
                w,
                h,
                'rgba(220,205,65,0.7)',
                'image',
                onewayL_img,
                onewayL_img,
                '',
                '',
                r,
              );
            if (asset_name_id == 20)
              addRect(
                x - 0,
                y - 0,
                w,
                h,
                'rgba(220,205,65,0.7)',
                'image',
                twoway_img,
                twoway_img,
                '',
                '',
                r,
              );
            if (asset_name_id == 21)
              addRect(
                x - 0,
                y - 0,
                w,
                h,
                'rgba(220,205,65,0.7)',
                'image',
                twoway90_img,
                twoway90_img,
                '',
                '',
                r,
              );
          }
        }
        return { ...i, flag: true };
      });
      locateReform = true;
    }
    window.init2 = init2;
  })(window);
  $(document).ready(function () {
    init2();
  });
  function getMouse(e) {
    var element = canvas,
      offsetX = 0,
      offsetY = 0;
    if (element.offsetParent) {
      do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
    }
    offsetX += stylePaddingLeft;
    offsetY += stylePaddingTop;
    offsetX += styleBorderLeft;
    offsetY += styleBorderTop;
    mx = e.pageX - offsetX - mouse_changed_x;
    my = e.pageY - offsetY - mouse_changed_y;
    if (scale_factor > 0) {
      for (let s = 0; s < scale_factor; s++) {
        mx = mx / scaleFactor;
        my = my / scaleFactor;
      }
    } else {
      for (let s = 0; s < Math.abs(scale_factor); s++) {
        mx = mx * scaleFactor;
        my = my * scaleFactor;
      }
    }
  }
  var last_scale_scroll = 1;
  let last_scale = 1;
  var scale_factor = 0;
  function scalezoom(delta) {
    last_scale_scroll = delta;
    {
    }
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
  function redraw() {
    var p1 = ctx.transformedPoint(0, 0);
    var p2 = ctx.transformedPoint(canvas.width, canvas.height);
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    canvasValid = false;
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
  function panlock() {
    if (canvaspanlock == 0) {
      canvaspanlock = 1;
    } else {
      canvaspanlock = 0;
    }
  }

  function selectedBox() {
    if (boxes2[boxes2_selectedindex]) return boxes2[boxes2_selectedindex].id;
  }

  function onMouseHover() {
    return mouseHover;
  }
  const getCanvas = () => {
    if (locate.length > 0 && locate !== null && locateReform == true)
      return canvas;
  };
  const getCanvasImg = ref => {
    ref.current.toBlob(blob => {
      let file = new File([blob], 'canvasShapshot.png', { type: 'image/png' });
      handleImageUploadtoS3Bucket(file, 'image', data => {
        setS3Flag({ flag: true, data: data });
      });
    }, 'image/png');
  };
  return {
    selectedBox,
    onMouseHover,
    getCanvasImg,
    imageURI,
    getCanvas,
    panlock,
    scalezoom,
  };
}
