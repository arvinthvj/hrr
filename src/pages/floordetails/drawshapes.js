import {
  getImageFroms3Bucket,
  handleImageUploadtoS3Bucket,
} from '../../services/s3Bucket';

export function shapes(refs, reformStatic, unplacedCount) {
  var innerMouseDown = false;
  var name_drop = false;
  var name_drop_x, name_drop_y, name_drop_id;
  var desk_removed = false;
  var desk_removed_multiple = false;
  var total_placed = 0,
    total_unplaced = 0;
  var mouse_changed_x = 0;
  var mouse_changed_y = 0;
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  var mx, my; // mouse coordinates
  var scale_factor;
  var canvasValid = false;
  var boxes2 = [];
  var history_boxes2 = [];
  var polygons = [];
  var draw_Rect = false;
  var drawBox = [];
  var reformPlacedId = [];
  var placedDeskId = [];
  var existingLines = [];
  var gridshow = 1;
  var snapshow = 0;
  var cols = 180;
  var rows = 140;
  var cells = rows * cols;
  var size = 10;
  var gW = cols * size;
  var gH = rows * size;
  var addRect;
  let selectedShape;
  var canvaspanlock = 1;
  var floorType = 1;
  let scaleFactor = 1.1;
  let zoneUpdate = { status: false, data: [] };
  let reformRectHistory = [];
  var getS3image = false;

  var setcanvasimage = 0;
  var canvasbglock = 0;
  var imgBase64;
  var boxesAssetId = '';

  var img_width = '';
  var img_height = '';
  var img_new_width = '';
  var img_new_height = '';
  var canvaspanmove = false;
  var xp = 0;
  var yp = 0;
  var canvasClick = false;
  var dropElement = '';

  var drawCalled = false;
  var labelShowHide = false;
  var multiSelectPolygon = false;
  var multiSelectID;
  var modifiedX = 0;

  var locationClassName = document.getElementsByClassName('locate-manage')
    ? document.getElementsByClassName('locate-manage')
    : '';
  var placed_desks = document.getElementById('placed_desks')
    ? document.getElementById('placed_desks')
    : '';

  var gX = 0,
    gY = 0,
    pX = 0,
    pY = 0,
    gScale = 1,
    speed = 2;

  var size = 10;

  var polygonTouch = false,
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
  var stylePaddingLeft;
  var stylePaddingTop;
  var styleBorderLeft;
  var styleBorderTop;
  var mx;
  var my;
  var scale_factor;
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
  var canvasValid;
  var ctx;
  var canvas = refs.canvasRef;
  var imageCoordinates = { x: '', y: '' };
  var texts = [];
  var mySeltext = null;
  var history_polygons = [];
  var c = canvas.getContext('2d');
  var showdragicon = false;
  var dimg;
  var assetsdrag = false;
  var draw_wall = false;
  var draw_wall_dash = false;
  var draw_squareroom = false;
  var draw_stairs = false;
  var draw_lifts = false;
  var draw_doors = false;
  var draw_windows = false;
  var draw_zone = { status: false, zoneId: '', name: '' };
  var draw_lshapedroom = false;
  var draw_cshapedroom = false;
  var draw_singledesk = false;
  var draw_parking = false;
  var draw_parking2 = false;
  var draw_parking3 = false;
  var draw_parking4 = false;
  var draw_parking5 = false;
  var draw_parking6 = false;
  var draw_parking7 = false;
  var draw_parking8 = false;
  var draw_room_xxs = false;
  var draw_room_xs = false;
  var draw_room_s = false;
  var draw_room_m = false;
  var draw_room_l = false;
  var draw_room_xl = false;
  var draw_regularc = false;
  var draw_regularl = false;
  var draw_shape2 = false;
  var draw_shape3 = false;
  var draw_shape4 = false;
  var draw_shape5 = false;
  var draw_shape6 = false;
  var draw_shape7 = false;
  var draw_shape8 = false;
  var draw_text = false;
  var tempVarToClickShape;
  var shapeClickedForDrag = false;
  var draw_shape_bg = false;
  var mySel = null;
  var selectedPoint;
  var multidragInnerRect = false;
  var draw_onewayroadR = false;
  var draw_onewayroadL = false;
  var draw_twowayroad = false;
  var draw_twowayroad90 = false;

  (function (window) {
    var linetype = 'solid';
    var draw_copy = false;
    var dragdraw = false;
    var draw_copy_special = false;
    var draw_paste = false;
    var draw_drag = false;
    var dragisDown = false;
    var dragstartX;
    var dragstartY;
    var dragwidth;
    var dragheight;
    var dragangle = 0;
    var drawdragoffsetx, drawdragoffsety;
    var draw_drag_move = false;
    var dragresizehandle = [];
    var history = [];
    var history_existingLines = [];
    var history_texts = [];
    var prevMultiSelect = [];
    var zone_name;
    var selectionHandles = [];
    var multpleselection = [];
    var selectionHandlestexts = [];
    var draw_text_value;
    var canvas_text_div = refs.canvasTextDiv;
    var canvas_text_x = 0;
    var canvas_text_y = 0;
    var tisFocus = false;
    var tfocusIndex = 0;
    var tisCommandKey = false;
    var tselected = false;
    // this var will hold the index of the selected text
    var selectedText = -1;
    var WIDTH;
    var HEIGHT;
    var INTERVAL = 20; // how often, in milliseconds, we check to see if a redraw is needed
    var showIcons_x = 0;
    var showIcons_y = 0;
    var isDrag = false;
    var isResizeDrag = false;
    var expectResize = -1; // New, will save the # of the selection handle if the mouse is over one.
    var isDragline = false;
    var isResizeDragline = false;
    var expectResizeline = -1;
    var isDragtext = false;
    var isResizeDragtext = false;
    var expectResizetext = -1;
    var isResizeMultiDrag = false;
    var expectResizeMultiDrag = -1;
    // when set to true, the canvas will redraw everything
    // invalidate() just sets this to false right now
    // we want to call invalidate() whenever we make a change
    var boxes2_selectedindex = null;
    // The node (if any) being selected.
    // If in the future we want to select multiple objects, this will get turned into an array
    mySel = null;
    var mySelline = null;
    var sellineindex = null;
    // The selection color and width. Right now we have a red selection with a small width
    // var mySelColor = '#CC0000';
    var myRectColor = '#282A35';
    var mySelColor = '#0F62AB';
    var mySelWidth = 2;
    var mySelBoxColor = '#FFFFFF'; // New for selection boxes
    var mySelBoxSize = 10;
    var half = mySelBoxSize / 2;
    // we use a fake canvas to draw individual shapes for selection testing
    var ghostcanvas;
    var gctx; // fake canvas context
    var alignmentlines = {
      top: {
        startx: 0,
        starty: 0,
        endx: 0,
        endy: 0,
        top: false,
      },
      left: {
        startx: 0,
        starty: 0,
        endx: 0,
        endy: 0,
        left: false,
      },
      right: {
        startx: 0,
        starty: 0,
        endx: 0,
        endy: 0,
        right: false,
      },
      bottom: {
        startx: 0,
        starty: 0,
        endx: 0,
        endy: 0,
        bottom: false,
      },
    };
    // since we can drag from anywhere in a node
    // instead of just its x/y corner, we need to save
    // the offset of the mouse when we start dragging.
    var offsetx, offsety;
    var lsoffsetx, lsoffsety, leoffsetx, leoffsety;
    var toffsetx, toffsety;
    // Padding and border style widths for mouse offsets
    var startX = 0;
    var startY = 0;
    var mouseX = 0;
    var mouseY = 0;
    var isDrawing = false;
    var existingRectLines = [];
    var hasLoaded = false;
    var rectindex = null;
    var polygonclickindex = null;
    var textUpdateX = 0;
    var textUpdateY = 0;
    var selectedTextSize = 0;
    pcanvas = document.createElement('canvas');
    pcanvas.height = canvas.height;
    pcanvas.width = canvas.width;
    pctx = pcanvas.getContext('2d');

    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    ctx = canvas.getContext('2d');
    trackTransforms(ctx);

    ctx.strokeStyle = '#8a8a8a';
    ctx.lineWidth = 0.2;
    ctx.font = '14px sans-serif';

    var imageX = 50;
    var imageY = 50;
    var imageWidth, imageHeight, imageRight, imageBottom;
    var edittextbox = false;
    var oldr = 0;

    const image = refs.canvasImg;
    const stairs_img = refs.stairsImg;
    const lifts_img = refs.liftImg;
    const windows_img = refs.windowImg;
    const doors_img = refs.doorwayImg;
    const onewayroadL = refs.oneWayLImg;
    const onewayroadR = refs.oneWayRImg;
    const twowayroad = refs.twoWayImg;
    const twowayroad90 = refs.twoWay90Img;
    const lshapedroom_img = refs.lshapewallImg;
    const cshapedroom_img = refs.cshapewallImg;
    const singledesk_img = refs.singledeskImg;
    const parking_img = refs.parkingImg;
    const parking_img_select = refs.parkingImgSelect;
    const parking_img_white = refs.parkingImgWhite;
    const singledesk_select_img = refs.singledeskSelect;
    const singledesk_withoutText = refs.singledeskWithoutText;
    const shape2_img = refs.shape2Img;
    const shape2_select_img = refs.shape2Select;
    const shape3_img = refs.shape3Img;
    const shape3_select_img = refs.shape3Select;
    const shape4_img = refs.shape4Img;
    const shape4_select_img = refs.shape4Select;
    const shape5_img = refs.shape5Img;
    const shape5_select_img = refs.shape5Select;
    const shape5_withoutText_img = refs.shape5WithoutText;
    const room_img = refs.roomImg;
    const room_select_img = refs.roomImgSelect;
    const room_white_img = refs.roomSImgwhite;
    const room_xxs = refs.roomXXS;
    const room_xxs_select = refs.roomXXSSelect;
    const room_xxs_white = refs.roomXXSWhite;
    const room_xs = refs.roomXS;
    const room_xs_select = refs.roomXSSelect;
    const room_xs_white = refs.roomXSWhite;
    const room_m = refs.roomM;
    const room_m_select = refs.roomMSelect;
    const room_m_white = refs.roomMWhite;
    const room_l = refs.roomL;
    const room_l_select = refs.roomLSelect;
    const room_l_white = refs.roomLWhite;
    const room_xl = refs.roomXL;
    const room_xl_select = refs.roomXLSelect;
    const room_xl_white = refs.roomXLWhite;
    const squareRoom = refs.squareRoom;

    const regularc_img = refs.regularC;
    const regularl_img = refs.regularL;
    const regularl_select_img = refs.regularLSelect;
    const regularc_select_img = refs.regularCSelect;
    const canvasGetImage = refs.canvasGetImage;
    var count_step = 0;
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
                innerMouseDown = false;
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
          c.font = '14px sans-serif';
          labelShowHide
            ? (c.fillStyle = 'rgba(255, 255, 255, 0.001)')
            : (c.fillStyle = 'rgba(255, 255, 255, 1)');
          c.fillText(
            zone_name,
            (xmin + xmax) / 2 - ztwidth / 2,
            (ymin + ymax) / 2 + 5,
          );

          /// ///////////////////// Rotation /////////////////////////
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

    function datahistory() {
      count_step = count_step + 1;
      var rects = [];
      if (boxes2.length > 0) {
        for (var i = 0; i < boxes2.length; i++) {
          if (boxes2[i] != null) {
            var rect = [];
            rect.x = boxes2[i].x;
            rect.y = boxes2[i].y;
            rect.w = boxes2[i].w;
            rect.h = boxes2[i].h;
            rect.fill = boxes2[i].fill;
            rect.type = boxes2[i].type;
            rect.image = boxes2[i].image;
            rect.selectimage = boxes2[i].selectimage;
            rect.showText = boxes2[i].showText;
            rect.assettype = boxes2[i].assettype;
            rect.asset_name_id = boxes2[i].asset_name_id;
            rect.shapecount = boxes2[i].shapecount;
            rect.r = boxes2[i].r;
            rect.index = boxes2[i].index;
            rect.id = boxes2[i].id;
            rects.push(rect);
          }
        }
        history_boxes2.push(rects);
      }

      var hlines = [];
      if (existingLines.length > 0) {
        for (var i = 0; i < existingLines.length; i++) {
          var hline = [];
          hline.startX = existingLines[i].startX;
          hline.startY = existingLines[i].startY;
          hline.endX = existingLines[i].endX;
          hline.endY = existingLines[i].endY;
          hline.type = existingLines[i].type;
          hlines.push(hline);
        }
        history_existingLines.push(hlines);
      }

      var htexts = [];
      if (texts.length > 0) {
        for (var i = 0; i < texts.length; i++) {
          var htext = [];
          htext.text = texts[i].text;
          htext.x = texts[i].x;
          htext.y = texts[i].y;
          htext.style = texts[i].style;
          htext.color = texts[i].color;
          htext.bold = texts[i].bold;
          htext.italic = texts[i].italic;
          htext.underline = texts[i].underline;
          htext.size = texts[i].size;
          htexts.push(htext);
        }
        history_texts.push(htexts);
      }

      var hpolygons = [];
      if (polygons.length > 0) {
        for (var i = 0; i < polygons.length; i++) {
          var hpolygon = [];
          hpolygon.rects = polygons[i].rects;
          hpolygon.polygonTouch = polygons[i].polygonTouch;
          hpolygon.zoneName = polygons[i].zoneName;
          hpolygon.zone_id = polygons[i].zone_id;
          const points = [];
          for (var j = 0; j < polygons[i].points.length; j++) {
            points.push({
              x: polygons[i].points[j].x,
              y: polygons[i].points[j].y,
              d: polygons[i].points[j].d,
            });
          }
          hpolygon.points = points;
          hpolygons.push(hpolygon);
        }
        history_polygons.push(hpolygons);
      }

      if (count_step > 0) {
      } else {
      }
    }

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
    drawGrid(0, 0);
    if (window.addEventListener) {
    }
    var selectedElement;
    var selectedTextToDelete;
    var selectedZoneToDelete;
    var selectedlineToDelete;
    var linesDelete = false;
    document.getElementById('deleteBtn').onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      deleteFunction();
    };

    var tempTextForDelete;
    var boxforMultiSelect = [];
    function deleteFunction() {
      // if (multpleselection != undefined) {
      //   if (polygonclick == false && selectedText == -1) {
      //     for (let i = 0; i < multpleselection.length; i++) {
      //       if (multpleselection[i].arrayname == "boxes2") {
      //         boxforMultiSelect.push(multpleselection[i]);
      //       }
      //     }
      //     for (let i = 0; i < boxforMultiSelect.length; i++) {
      //       if (boxes2[i] === boxforMultiSelect[i]) {
      //         selectedElement = i;
      //         desk_removed == true;
      //         tempTextForDelete = boxforMultiSelect[i].showText;
      //         var a = document.getElementById("" + tempTextForDelete);
      //         existingAssignText = true;
      //         if (
      //           boxforMultiSelect[i]?.id != null &&
      //           boxforMultiSelect[i]?.id != ""
      //         )
      //           unassignDeskFun(a);
      //         objectRemoveFun(selectedElement);
      //       }
      //     }
      //   }

      //   if (sellineindex != null && sellineindex != undefined) {
      //     if (polygonclick == false) {
      //       selectedlineToDelete = sellineindex;
      //       linesDelete = true;
      //       lineDeleteFun(selectedlineToDelete);
      //     }
      //   }
      //   if (selectedText != -1) {
      //     if (polygonclick == false) {
      //       selectedTextToDelete = selectedText;
      //       textDeleteFun(selectedTextToDelete);
      //     }
      //   }
      //   if (selectedPoint != undefined) {
      //     if (polygonclick != false) {
      //       for (let k = 0; k < polygons.length; k++) {
      //         if (polygons[k].points === selectedPoint) {
      //           selectedZoneToDelete = k;
      //         }
      //       }
      //       zoneDeleteFun(selectedZoneToDelete);
      //     }
      //   }
      //   dragstartX = 0;
      //   dragstartY = 0;
      //   dragwidth = 0;
      //   dragheight = 0;
      //   multpleselection = [];
      //   draw_drag = false;
      //   multidragInnerRect = false;
      //   document.getElementById("draw_drag").classList.remove("active");
      // } else {
      if (selectedShape != undefined) {
        if (polygonclick == false && selectedText == -1) {
          for (let i = 0; i < boxes2.length; i++) {
            if (boxes2[i] === selectedShape) {
              selectedElement = i;
            }
          }
          desk_removed == true;
          tempTextForDelete = selectedShape.showText;
          var a = document.getElementById('' + tempTextForDelete);
          existingAssignText = true;
          if (selectedShape?.id != null && selectedShape?.id != '')
            unassignDeskFun(a);
          objectRemoveFun(selectedElement);
        }

        if (sellineindex != null && sellineindex != undefined) {
          if (polygonclick == false) {
            selectedlineToDelete = sellineindex;
            linesDelete = true;
            lineDeleteFun(selectedlineToDelete);
          }
        }
        if (selectedText != -1) {
          if (polygonclick == false) {
            selectedTextToDelete = selectedText;
            textDeleteFun(selectedTextToDelete);
          }
        }
        if (selectedPoint != undefined) {
          if (polygonclick != false) {
            for (let k = 0; k < polygons.length; k++) {
              if (polygons[k].points === selectedPoint) {
                selectedZoneToDelete = k;
              }
            }
            zoneDeleteFun(selectedZoneToDelete);
          }
        }
        dragstartX = 0;
        dragstartY = 0;
        dragwidth = 0;
        dragheight = 0;
        multpleselection = [];
        draw_drag = false;
        multidragInnerRect = false;
        document.getElementById('draw_drag').classList.remove('active');
      } else {
        if (
          selectedShape != undefined &&
          mySel != null &&
          sellineindex == null
        ) {
          if (polygonclick == false && selectedText == -1) {
            for (let i = 0; i < boxes2.length; i++) {
              if (boxes2[i] === selectedShape) {
                selectedElement = i;
              }
            }
            desk_removed == true;

            tempTextForDelete = selectedShape.showText;
            a = document.getElementById('' + tempTextForDelete);
            existingAssignText = true;

            if (selectedShape?.id != null && selectedShape?.id != '')
              unassignDeskFun(a);
            objectRemoveFun(selectedElement);
          }
        }
        if (sellineindex != null && sellineindex != undefined) {
          if (polygonclick == false) {
            selectedlineToDelete = sellineindex;
            linesDelete = true;
            lineDeleteFun(selectedlineToDelete);
          }
        } /* */
        if (selectedText != -1) {
          if (polygonclick == false) {
            selectedTextToDelete = selectedText;
            textDeleteFun(selectedTextToDelete);
          }
        }
        if (selectedPoint != undefined) {
          if (polygonclick != false) {
            for (let k = 0; k < polygons.length; k++) {
              if (polygons[k].points === selectedPoint) {
                selectedZoneToDelete = k;
              }
            }
            zoneDeleteFun(selectedZoneToDelete);
          }
        }
      }
    }

    function lineDeleteFun(selectedlineToDelete) {
      var k = selectedlineToDelete;
      existingLines.splice(k, 1);
      linesDelete = false;
      sellineindex = null;
      mySelline = null;

      redraw();
    }
    function zoneDeleteFun(selectedZoneToDelete) {
      var j = selectedZoneToDelete;
      polygons.splice(j, 1);
      polygonclick = false;

      redraw();
    }
    function textDeleteFun(selectedTextToDelete) {
      document.getElementById('canvas_text_div').style.display = 'none';
      document.getElementById('canvas_text').style.display = 'none';
      var k = selectedTextToDelete;

      texts.splice(k, 1);
      selectedText = -1;
      redraw();
    }

    function objectRemoveFun(selectedElement) {
      var i = selectedElement;
      if (
        boxes2[i].type != 'square' &&
        boxes2[i].type != 'lshaped' &&
        boxes2[i].type != 'cshaped'
      ) {
        if (
          boxes2[i].image.id != 'stairs_img' &&
          boxes2[i].image.id != 'lifts_img' &&
          boxes2[i].image.id != 'doors_img' &&
          boxes2[i].image.id != 'windows_img'
        ) {
        }
      }
      boxes2.splice(i, 1);
      for (var k = i; k < boxes2.length; k++) {
        boxes2[k].index = k;
      }
      boxes2_selectedindex = null;
      selectedElement = null;
      mySel = null;
      invalidate();
      desk_removed = false;
      placedCountFun(floorType);
      linesDelete = false;
    }

    document.getElementById('labelShowHide').onclick = function (e) {
      if (labelShowHide) {
        labelShowHide = false;
        document.getElementById('hideLabel').style.display = 'none';
        document.getElementById('showLabel').style.display = 'block';
      } else {
        labelShowHide = true;
        document.getElementById('hideLabel').style.display = 'block';
        document.getElementById('showLabel').style.display = 'none';
      }
      redraw();
    };

    // Box object to hold data
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
      this.shapecount = 0;
      this.id = null;
    }
    // New methods on the Box class
    Box2.prototype = {
      // we used to have a solo draw function
      // but now each box is responsible for its own drawing
      // mainDraw() will call this with the normal canvas
      // myDown will call this with the ghost canvas with 'black'
      draw: function (context, optionalColor) {
        if (context === gctx) {
          context.fillStyle = 'black'; // always want black for the ghost canvas
        } else {
          context.fillStyle = this.fill;
        }
        // We can skip the drawing of elements that have moved off the screen:
        /* function killed by Arun */

        /* function killed by Arun */
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
            if (this.image == singledesk_img) {
              this.showText != ''
                ? (this.image = singledesk_img)
                : (this.image = singledesk_withoutText);
            } else if (this.image == shape5_img) {
              this.showText != ''
                ? (this.image = shape5_img)
                : (this.image = shape5_withoutText_img);
            } else if (this.image == parking_img) {
              this.showText != ''
                ? (this.image = parking_img_white)
                : (this.image = parking_img);
            } else if (this.image == room_xxs) {
              this.showText != ''
                ? (this.image = room_xxs_white)
                : (this.image = room_xxs);
            } else if (this.image == room_xs) {
              this.showText != ''
                ? (this.image = room_xs_white)
                : (this.image = room_xs);
            } else if (this.image == room_img) {
              this.showText != ''
                ? (this.image = room_white_img)
                : (this.image = room_img);
            } else if (this.image == room_m) {
              this.showText != ''
                ? (this.image = room_m_white)
                : (this.image = room_m);
            } else if (this.image == room_l) {
              this.showText != ''
                ? (this.image = room_l_white)
                : (this.image = room_l);
            } else if (this.image == room_xl) {
              this.showText != ''
                ? (this.image = room_xl_white)
                : (this.image = room_xl);
            }
            context.drawImage(this.selectimage, this.x, this.y, this.w, this.h);
            context.font = '12px Arial';
            labelShowHide
              ? (context.fillStyle = 'rgba(0, 0, 0, 0.001)')
              : (context.fillStyle = 'rgba(0, 0, 0, 1)');
            let metrics = context.measureText(this.showText);
            let xPosForText = this.w - Number(metrics.width) / 2;
            let fontHeight =
              metrics.actualBoundingBoxAscent +
              metrics.actualBoundingBoxDescent; // metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
            context.fillText(
              '' + this.showText,
              this.x + Math.round((this.w - Number(metrics.width)) / 2),
              this.y + Math.round(this.h - fontHeight) / 2 + fontHeight,
            );
          } else {
            if (this.image == singledesk_img) {
              this.showText != ''
                ? (this.image = singledesk_img)
                : (this.image = singledesk_withoutText);
            } else if (this.image == shape5_img) {
              this.showText != ''
                ? (this.image = shape5_img)
                : (this.image = shape5_withoutText_img);
            } else if (this.image == parking_img) {
              this.showText != ''
                ? (this.image = parking_img_white)
                : (this.image = parking_img);
            } else if (this.image == room_xxs) {
              this.showText != ''
                ? (this.image = room_xxs_white)
                : (this.image = room_xxs);
            } else if (this.image == room_xs) {
              this.showText != ''
                ? (this.image = room_xs_white)
                : (this.image = room_xs);
            } else if (this.image == room_img) {
              this.showText != ''
                ? (this.image = room_white_img)
                : (this.image = room_img);
            } else if (this.image == room_m) {
              this.showText != ''
                ? (this.image = room_m_white)
                : (this.image = room_m);
            } else if (this.image == room_l) {
              this.showText != ''
                ? (this.image = room_l_white)
                : (this.image = room_l);
            } else if (this.image == room_xl) {
              this.showText != ''
                ? (this.image = room_xl_white)
                : (this.image = room_xl);
            }
            context.drawImage(this.image, this.x, this.y, this.w, this.h);
            context.font = '12px Arial';
            labelShowHide
              ? (context.fillStyle = 'rgba(0, 0, 0, 0.001)')
              : (context.fillStyle = 'rgba(0, 0, 0, 1)');
            let metrics = context.measureText(this.showText);
            let xPosForText = this.w - Number(metrics.width) / 2;
            let fontHeight =
              metrics.actualBoundingBoxAscent +
              metrics.actualBoundingBoxDescent; // metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
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
          context.strokeRect(this.x, this.y, this.w, this.h);
        }
        context.restore();
        // draw selection
        // this is a stroke along the box and also 8 new selection handles
        if (mySel === this) {
          innerMouseDown = false;
          selectedShape = this;
          if (isDrag == false) {
            context.strokeStyle = mySelColor;
            context.lineWidth = mySelWidth;
            context.save();
            context.translate(this.x + this.w / 2, this.y + this.h / 2);
            context.rotate(this.r);
            context.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
            context.setLineDash([]);
            context.strokeRect(this.x, this.y, this.w, this.h);
            context.restore();
            context.setLineDash([]);
          }
          // draw the boxes
          //    8
          // 0  1  2
          // 3     4
          // 5  6  7

          // top left, middle, right
          selectionHandles[0].x = this.x - half;
          selectionHandles[0].y = this.y - half;

          selectionHandles[1].x = this.x + this.w / 2 - half;
          selectionHandles[1].y = this.y - half;

          selectionHandles[2].x = this.x + this.w - half;
          selectionHandles[2].y = this.y - half;

          // middle left
          selectionHandles[3].x = this.x - half;
          selectionHandles[3].y = this.y + this.h / 2 - half;

          // middle right
          selectionHandles[4].x = this.x + this.w - half;
          selectionHandles[4].y = this.y + this.h / 2 - half;

          // bottom left, middle, right
          selectionHandles[6].x = this.x + this.w / 2 - half;
          selectionHandles[6].y = this.y + this.h - half;

          selectionHandles[5].x = this.x - half;
          selectionHandles[5].y = this.y + this.h - half;

          selectionHandles[7].x = this.x + this.w - half;
          selectionHandles[7].y = this.y + this.h - half;

          selectionHandles[8].x = this.x + this.w / 2 - half;
          selectionHandles[8].y = this.y - 30;

          if (isDrag == false) {
            context.fillStyle = mySelBoxColor;
            for (var i = 0; i < 9; i++) {
              var cur = selectionHandles[i];
              context.save();
              context.translate(this.x + this.w / 2, this.y + this.h / 2);
              context.rotate(this.r);
              context.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
              if (i == 8) {
                const radius = 6;
                context.lineWidth = 2;
                context.beginPath();
                context.setLineDash([]);
                context.moveTo(cur.x + half, cur.y + half);
                context.lineTo(
                  selectionHandles[1].x + half,
                  selectionHandles[1].y + half,
                );
                context.closePath();
                context.stroke();
                context.beginPath();
                context.lineWidth = 2;
                context.arc(cur.x + half, cur.y, radius, 0, 2 * Math.PI, false);
                context.fill();
                context.stroke();
              } else {
                if (i != 1 && i != 3 && i != 4 && i != 6) {
                  context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
                  context.strokeRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
                }
              }
              context.restore();
            }
          }
          /// ///////////// Rotation ///////////////////////
          {
            const newTopLeft = rotate(
              selectionHandles[0].x,
              selectionHandles[0].y,
              this.x + this.w / 2 - half,
              this.y + this.h / 2 - half,
              this.r,
            );
            selectionHandles[0].x = newTopLeft[0];
            selectionHandles[0].y = newTopLeft[1];
            const newTopCenter = rotate(
              selectionHandles[1].x,
              selectionHandles[1].y,
              this.x + this.w / 2 - half,
              this.y + this.h / 2 - half,
              this.r,
            );
            selectionHandles[1].x = newTopCenter[0];
            selectionHandles[1].y = newTopCenter[1];
            const newTopRight = rotate(
              selectionHandles[2].x,
              selectionHandles[2].y,
              this.x + this.w / 2 - half,
              this.y + this.h / 2 - half,
              this.r,
            );
            selectionHandles[2].x = newTopRight[0];
            selectionHandles[2].y = newTopRight[1];
            const newMiddleLeft = rotate(
              selectionHandles[3].x,
              selectionHandles[3].y,
              this.x + this.w / 2 - half,
              this.y + this.h / 2 - half,
              this.r,
            );
            selectionHandles[3].x = newMiddleLeft[0];
            selectionHandles[3].y = newMiddleLeft[1];
            const newMiddleRight = rotate(
              selectionHandles[4].x,
              selectionHandles[4].y,
              this.x + this.w / 2 - half,
              this.y + this.h / 2 - half,
              this.r,
            );
            selectionHandles[4].x = newMiddleRight[0];
            selectionHandles[4].y = newMiddleRight[1];
            const newBottomLeft = rotate(
              selectionHandles[5].x,
              selectionHandles[5].y,
              this.x + this.w / 2 - half,
              this.y + this.h / 2 - half,
              this.r,
            );
            selectionHandles[5].x = newBottomLeft[0];
            selectionHandles[5].y = newBottomLeft[1];
            const newBottomCenter = rotate(
              selectionHandles[6].x,
              selectionHandles[6].y,
              this.x + this.w / 2 - half,
              this.y + this.h / 2 - half,
              this.r,
            );
            selectionHandles[6].x = newBottomCenter[0];
            selectionHandles[6].y = newBottomCenter[1];
            const newBottomRight = rotate(
              selectionHandles[7].x,
              selectionHandles[7].y,
              this.x + this.w / 2 - half,
              this.y + this.h / 2 - half,
              this.r,
            );

            selectionHandles[7].x = newBottomRight[0];
            selectionHandles[7].y = newBottomRight[1];

            if (isResizeDrag == false) {
              const newTop = rotate(
                selectionHandles[8].x,
                selectionHandles[8].y,
                this.x + this.w / 2 - half,
                this.y + this.h / 2 - half,
                this.r,
              );
              selectionHandles[8].x = newTop[0];
              selectionHandles[8].y = newTop[1];
            }
          }
          /// //////////// End Rotation ////////////////////
        }
      }, // end draw
    };

    var shapeClickedForDrag = false;
    var clickedShapeClasses = document.getElementsByClassName('floor-desk');
    for (let i = 0; i < clickedShapeClasses.length; i++) {
      clickedShapeClasses[i].addEventListener('click', shapeClick);
    }

    function shapeClick() {
      shapeClickedForDrag = true;
      for (let i = 0; i < clickedShapeClasses.length; i++) {
        var parentID = clickedShapeClasses[i].parentNode.parentNode;
        parentID.classList.remove('center');
      }
      var parentID2 = this.parentNode.parentNode;
      parentID2.classList.add('center');
      tempVarToClickShape = this.children[0]?.id;
    }

    // Initialize a new Box, add it, and invalidate the canvas
    // addRect = function(x, y, w, h, fill,type,image,selectimage,asset_id,showText,assettype,asset_name_id,r) {
    addRect = function (
      x,
      y,
      w,
      h,
      fill,
      type,
      image,
      selectimage,
      asset_id,
      showText,
      assettype,
      asset_name_id,
      shapecount,
      rotateAng,
    ) {
      let degToRad;
      degToRad = rotateAng;

      var rect = new Box2();
      rect.x = x;
      rect.y = y;
      rect.w = w;
      rect.h = h;
      rect.fill = fill;
      rect.type = type;
      rect.image = image;
      rect.assettype = assettype || null;
      rect.asset_name_id = asset_name_id || null;
      rect.selectimage = selectimage;
      var l = boxes2.length;
      rect.index = l;
      rect.r = rotateAng ? degToRad : 0;
      rect.id = asset_id;
      rect.showText = showText || '';
      rect.shapecount = shapecount;
      boxes2.push(rect);
      reformRectHistory.push(rect);
      invalidate();
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

    const polygonPoints = (k, x, y) => {
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

    // initialize our canvas, add a ghost canvas, set draw loop
    // then add everything we want to intially exist on the canvas
    function init2() {
      canvas = refs.canvasRef;
      HEIGHT = canvas.height;
      WIDTH = canvas.width;
      ctx = canvas.getContext('2d');
      c = canvas.getContext('2d');
      ghostcanvas = document.createElement('canvas');
      ghostcanvas.height = HEIGHT;
      ghostcanvas.width = WIDTH;
      gctx = ghostcanvas.getContext('2d');
      hasLoaded = true;
      // fixes a problem where double clicking causes text to get selected on the canvas
      canvas.onselectstart = function () {
        return false;
      };

      // fixes mouse co-ordinate problems when there's a border or padding
      // see getMouse for more detail
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

      // make mainDraw() fire every INTERVAL milliseconds
      // setInterval(mainDraw, INTERVAL);   /// nithya commented and added below arun's code
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
        var canvas = refs.canvasRef;
        var context = canvas.getContext('2d');
        // draw stuff
        mainDraw();
        // request new frame
        requestAnimFrame(function () {
          animate();
        });
      }
      animate();

      // set our events. Up and down are for dragging,
      // double click is for making new boxes
      canvas.onmousedown = myDown;
      canvas.onmouseup = myUp;
      canvas.ondblclick = myDblClick;
      canvas.onclick = myClick;
      canvas.onmousemove = myMove;
      canvas.onmouseover = myOver;
      document.addEventListener('keydown', handleCanvasKeys);
      function handleCanvasKeys(event) {
        var special = event.ctrlKey || event.shiftKey;
        var key = event.charCode || event.keyCode;
        if (special && key === 67) {
          draw_copy_click = true;
        } else if (special && key === 86) {
          copyFunction();
        } else if (special && key === 46) {
          deleteFunction();
        }
      }
      if (canvas.addEventListener)
        canvas.addEventListener('DOMMouseScroll', function (event) {}, false);
      else
        canvas.attachEvent('mousewheel', function () {
          return false;
        });
      canvas.ondragover = onDragOverForOrangeSquare;
      canvas.ondrop = onDropForOrangeSquare;

      // set up the selection handle boxes
      for (var i = 0; i < 9; i++) {
        var rect = new Box2();
        selectionHandles.push(rect);
        existingRectLines.push(rect);
        selectionHandlestexts.push(rect);
        dragresizehandle.push(rect);
      }
      datahistory();
    }

    canvas.addEventListener('mousedown', e => {
      innerMouseDown = false;
      let { clientX, clientY } = e;
      getMouse(e);
      const x = mx,
        y = my;
      const lx = clientX,
        ly = clientY;
      canvasClick = true;

      if (dropElement !== '') {
        const checkPlaced =
          dropElement.target.className.includes('placed_Element');
        if (checkPlaced == false) {
          unplacedElemDrop(dropElement);
          dropElement = '';
        }
      }

      polygons.forEach((polygon, i) => {
        polygons[polygons.length - 1].rects = rectForEach(
          polygons[polygons.length - 1].rects,
          x,
          y,
          true,
        );
        if (canvaspanmove == false) {
          if (pointInPolygon(x, y, polygons[i].points)) {
            selectedPoint = [];
            selectedPoint = polygons[i].points;
            const p = polygons[i];
            polygons.splice(i, 1);
            polygons.push(p);
            polygons[polygons.length - 1].polygonTouch = true;
            startX = x;
            startY = y;
            polygonclick = true;
            polygonclickindex = polygons.length - 1;
          } else {
            polygonclick = false;
          }
        }
      });

      if (cursoronrotor == true) {
        polystartrotate = true;
      }
    });

    canvas.addEventListener('mousemove', e => {
      let { clientX, clientY } = e;
      getMouse(e);
      const x = mx,
        y = my;
      polygons.forEach((polygon, i) => {
        polygons[i].rects = rectForEach(polygons[i].rects, x, y, false);
        const rect = polygons[i].rects.filter(r => r.touch)[0];

        if (canvaspanmove == false) {
          if (rect) {
            innerMouseDown = false;
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
                if (
                  polygons[i].points[polygons[i].points.length - 2].d == 'o'
                ) {
                  var tcx =
                    (polygons[i].points[polygons[i].points.length - 3].x + x) /
                    2;
                  var tcy =
                    (polygons[i].points[polygons[i].points.length - 3].y + y) /
                    2;
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
            drawPolygon(polygons.map(({ points }) => points));
          }
        }

        if (polygons[i].polygonTouch && !rect) {
          polygons[i].points.forEach(point => {
            point.x += x - startX;
            point.y += y - startY;
          });
          drawPolygon(polygons.map(({ points }) => points));
          startX = x;
          startY = y;
        }

        if (polystartrotate == true && i == polygonclickindex) {
          innerMouseDown = false;
          var dx = mx - (pxmin + pxmax) / 2;
          var dy = my - (pymin + pymax) / 2;
          var angle = Math.atan2(dy, dx);
          polyangle = angle - -1.5;
          polygons[i].r = polyangle;
          var pcx = pxmin + (pxmax - pxmin) / 2;
          var pcy = pymin + (pymax - pymin) / 2;

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
        } else {
          cursoronrotor = false;
        }
      });
    });

    canvas.addEventListener('mouseout', e => {});

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

          if (rect.index === 0) {
            polygons[i].points[0].x = x;
            polygons[i].points[0].y = y;
            polygons[i].points[polygons[i].points.length - 1].x = x;
            polygons[i].points[polygons[i].points.length - 1].y = y;
          } else {
            polygons[i].points[rect.index].x = x;
            polygons[i].points[rect.index].y = y;
          }

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
      polystartrotate = false;
      points_old = [];
    });

    // wipes the canvas context
    function clear(c) {
      c.clearRect(0, 0, WIDTH, HEIGHT);
    }

    // Main draw loop.
    // While draw is called as often as the INTERVAL variable demands,
    // It only ever does something if the canvas gets invalidated by our code
    function mainDraw() {
      if (canvasValid == false) {
        clear(ctx);
        redraw();
        // Add stuff you want drawn in the background all the time here
        drawGrid();

        drawPolygon(polygons.map(({ points }) => points));
        // draw all boxes
        var l = boxes2.length;
        for (var i = 0; i < l; i++) {
          if (boxes2[i] != null) {
            boxes2[i].draw(ctx);
          }
        }

        drawlines();

        // Add stuff you want drawn on top all the time here

        drawtexts();
        drawdrag();
        showIcons();
        drawAlignmentLineCanvas();
        canvasValid = true;
      }
    }

    function myOver(e) {}

    function myDrop(e) {
      getMouse(e);
      boxes2_selectedindex = null;
      polygonclick = false;
      if (draw_singledesk == true) {
        var width = 70;
        var height = 45;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        draw_singledesk = false;
        dragdraw = false;
      }
      if (draw_shape2 == true) {
        var width = 70;
        var height = 45;
        shapecount = 21;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        draw_shape2 = false;
        dragdraw = false;
      }
      if (draw_shape3 == true) {
        var width = 70;
        var height = 45;
        shapecount = 22;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        draw_shape3 = false;
        dragdraw = false;
      }
      if (draw_shape4 == true) {
        var width = 70;
        var height = 45;
        shapecount = 3;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        addRect(
          mx - width / 2 + width + width + 12,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        draw_shape4 = false;
        dragdraw = false;
      }
      if (draw_shape5 == true) {
        var width = 70;
        var height = 45;
        shapecount = 4;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        draw_shape5 = false;
        dragdraw = false;
      }
      if (draw_shape6 == true) {
        var width = 70;
        var height = 45; // 45;
        shapecount = 6;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + width + 12,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + width + 12,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        draw_shape6 = false;
        dragdraw = false;
      }
      if (draw_shape7 == true) {
        var width = 70; // 70;
        var height = 70; // 45;
        shapecount = 7;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          shape5_img,
          shape5_select_img,
          boxesAssetId,
          showTextStore,
          1,
          6,
          shapecount,
          rotateAng,
        );
        draw_shape7 = false;
        dragdraw = false;
      }
      if (draw_shape8 == true) {
        var width = 70;
        var height = 45; // 45;
        shapecount = 8;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + width + 12,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + width + width + 18,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + width + 12,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + width + width + 18,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          singledesk_img,
          singledesk_select_img,
          boxesAssetId,
          showTextStore,
          1,
          1,
          shapecount,
          rotateAng,
        );
        draw_shape8 = false;
        dragdraw = false;
      }
      if (draw_shape_bg == true) {
        var width = 730; // 45;
        var height = 624; // 45;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          shape_bg,
          shape_bg_select,
          showTextStore,
        );
        draw_shape_bg = false;
        dragdraw = false;
      }
      if (draw_squareroom == true) {
        var width = 400;
        var height = 400;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'square',
          '',
          '',
          '',
          '',
          4,
          6,
        );
        draw_squareroom = false;
        dragdraw = false;
      }

      if (draw_stairs == true) {
        var width = 60;
        var height = 100;
        shapecount = 0;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          stairs_img,
          stairs_img,
          '',
          '',
          4,
          11,
          shapecount,
          rotateAng,
        );
        draw_stairs = false;
        dragdraw = false;
      }

      if (draw_lifts == true) {
        var width = 80;
        var height = 61;
        shapecount = 0;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          lifts_img,
          lifts_img,
          '',
          '',
          4,
          12,
          shapecount,
          rotateAng,
        );
        draw_lifts = false;
        dragdraw = false;
      }

      if (draw_doors == true) {
        var width = 50;
        var height = 125;
        shapecount = 0;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          doors_img,
          doors_img,
          '',
          '',
          4,
          13,
          shapecount,
          rotateAng,
        );
        draw_doors = false;
        dragdraw = false;
      }

      if (draw_windows == true) {
        var width = 40;
        var height = 60;
        shapecount = 0;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          windows_img,
          windows_img,
          '',
          '',
          4,
          14,
          shapecount,
          rotateAng,
        );
        draw_windows = false;
        dragdraw = false;
      }

      if (draw_onewayroadR == true) {
        console.log(draw_onewayroadR);
        var width = 300;
        var height = 50;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          onewayroadR,
          onewayroadR,
          '',
          '',
          4,
          18,
          shapecount,
          rotateAng,
        );
        draw_onewayroadR = false;
        dragdraw = false;
      }
      if (draw_onewayroadL == true) {
        console.log(draw_onewayroadL);
        var width = 300;
        var height = 50;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          onewayroadL,
          onewayroadL,
          '',
          '',
          4,
          19,
          shapecount,
          rotateAng,
        );
        draw_onewayroadL = false;
        dragdraw = false;
      }
      if (draw_twowayroad == true) {
        console.log(draw_twowayroad);
        var width = 301;
        var height = 100;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          twowayroad,
          twowayroad,
          '',
          '',
          4,
          20,
          shapecount,
          rotateAng,
        );
        draw_twowayroad = false;
        dragdraw = false;
      }
      if (draw_twowayroad90 == true) {
        console.log(draw_twowayroad90);
        var width = 251;
        var height = 251;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          twowayroad90,
          twowayroad90,
          '',
          '',
          4,
          21,
          shapecount,
          rotateAng,
        );
        draw_twowayroad90 = false;
        dragdraw = false;
      }

      if (draw_room_xxs == true) {
        var width = 35;
        var height = 50;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          room_xxs,
          room_xxs_select,
          boxesAssetId,
          showTextStore,
          2,
          17,
          shapecount,
          rotateAng,
        );
        draw_room_xxs = false;
        dragdraw = false;
      }
      if (draw_room_xs == true) {
        var width = 60;
        var height = 50;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          room_xs,
          room_xs_select,
          boxesAssetId,
          showTextStore,
          2,
          7,
          shapecount,
          rotateAng,
        );
        draw_room_xs = false;
        dragdraw = false;
      }
      if (draw_room_s == true) {
        var width = 86;
        var height = 50;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          room_img,
          room_select_img,
          boxesAssetId,
          showTextStore,
          2,
          2,
          shapecount,
          rotateAng,
        );
        draw_room_s = false;
        dragdraw = false;
      }
      if (draw_room_m == true) {
        var width = 112;
        var height = 50;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          room_m,
          room_m_select,
          boxesAssetId,
          showTextStore,
          2,
          8,
          shapecount,
          rotateAng,
        );
        draw_room_m = false;
        dragdraw = false;
      }
      if (draw_room_l == true) {
        var width = 124;
        var height = 50;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          room_l,
          room_l_select,
          boxesAssetId,
          showTextStore,
          2,
          9,
          shapecount,
          rotateAng,
        );
        draw_room_l = false;
        dragdraw = false;
      }
      if (draw_room_xl == true) {
        var width = 150;
        var height = 50;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          room_xl,
          room_xl_select,
          boxesAssetId,
          showTextStore,
          2,
          10,
          shapecount,
          rotateAng,
        );
        draw_room_xl = false;
        dragdraw = false;
      }

      if (draw_parking == true) {
        var width = 36;
        var height = 76;
        shapecount = 1;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        draw_parking = false;
        dragdraw = false;
      }
      if (draw_parking2 == true) {
        var width = 36;
        var height = 76;
        shapecount = 21;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        draw_parking2 = false;
        dragdraw = false;
      }
      if (draw_parking3 == true) {
        var width = 36;
        var height = 76;
        shapecount = 22;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        draw_parking3 = false;
        dragdraw = false;
      }
      if (draw_parking4 == true) {
        var width = 36;
        var height = 76;
        shapecount = 3;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        addRect(
          mx - width / 2 + width + width + 12,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        draw_parking4 = false;
        dragdraw = false;
      }
      if (draw_parking5 == true) {
        var width = 36;
        var height = 76;
        shapecount = 5;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        draw_parking5 = false;
        dragdraw = false;
      }
      if (draw_parking6 == true) {
        var width = 36;
        var height = 76;
        shapecount = 6;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + width + 12,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + width + 12,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        draw_parking6 = false;
        dragdraw = false;
      }
      if (draw_parking7 == true) {
        var width = 36;
        var height = 76;
        shapecount = 7;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        addRect(
          mx - width / 2 + width + width + 12,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        addRect(
          mx - width / 2 + 3 * width + 18,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        addRect(
          mx - width / 2 + 4 * width + 24,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        draw_parking7 = false;
        dragdraw = false;
      }
      if (draw_parking8 == true) {
        var width = 36;
        var height = 76;
        shapecount = 8;
        rotateAng = 0;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + width + 12,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + width + width + width + 18,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 0;
        addRect(
          mx - width / 2 + 4 * width + 24,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + 6,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + width + 12,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + width + width + width + 18,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        rotateAng = 3.1359214901292827;
        addRect(
          mx - width / 2 + 4 * width + 24,
          my - height / 2 + height + 6,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          parking_img,
          parking_img_select,
          boxesAssetId,
          showTextStore,
          3,
          3,
          shapecount,
          rotateAng,
        );
        draw_parking8 = false;
        dragdraw = false;
      }

      if (draw_regularl == true) {
        var width = 45;
        var height = 40;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          regularl_img,
          regularl_select_img,
          boxesAssetId,
          showTextStore,
          1,
          15,
        );
        draw_regularl = false;
        dragdraw = false;
      }
      if (draw_regularc == true) {
        var width = 45;
        var height = 35;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'image',
          regularc_img,
          regularc_select_img,
          boxesAssetId,
          showTextStore,
          1,
          16,
        );
        draw_regularc = false;
        dragdraw = false;
      }

      if (draw_zone.status == true) {
        var width = 200;
        var height = 200;
        draw_zone.status = false;
        var zone_names = draw_zone?.name;
        let p1 = polygonPoints(5, mx, my);
        let rects = drawPolygon([p1]);
        polygons.push({
          points: p1,
          rects: rects[0],
          polygonTouch: false,
          zoneName: zone_names,
          zone_id: draw_zone?.zoneId,
          r: 0,
        });
        dragdraw = false;
      }

      if (draw_lshapedroom == true) {
        var width = 400;
        var height = 400;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'lshaped',
          '',
          '',
          '',
          '',
          4,
          8,
        );
        draw_lshapedroom = false;
        dragdraw = false;
      }

      if (draw_cshapedroom == true) {
        var width = 400;
        var height = 400;
        addRect(
          mx - width / 2,
          my - height / 2,
          width,
          height,
          'rgba(220,205,65,0.7)',
          'cshaped',
          '',
          '',
          '',
          '',
          4,
          7,
        );
        draw_cshapedroom = false;
        dragdraw = false;
      }

      if (draw_wall == true) {
        existingLines.push({
          startX: mx,
          startY: my - 100,
          endX: mx,
          endY: my + 100,
          type: 'solid',
        });
        draw_wall = false;
        dragdraw = false;
      }

      if (draw_wall_dash == true) {
        existingLines.push({
          startX: mx,
          startY: my - 100,
          endX: mx,
          endY: my + 100,
          type: 'dash',
        });
        draw_wall_dash = false;
        dragdraw = false;
      }
      myDown(e);
      invalidate();
      myUp(e);
      assetsdrag = false;
    }
    // Functions for drop zone 1 (Orange Square)
    function onDragOverForOrangeSquare(event) {
      onDragOver(event);
    }

    function onDropForOrangeSquare(event) {
      if (assetsdrag == true) {
        myDrop(event);
      } else {
        onDrop(event, 'orange');
      }
    }

    function desk_name_drop() {
      if (name_drop == true) {
        clear(gctx);
        var l = boxes2.length;
        var desk_id = boxes2[i]?.id;
        for (var i = l - 1; i >= 0; i--) {
          const excludeShapes = [
            'square',
            'cshaped',
            'zone',
            'lshaped',
            'stairs',
          ];
          const excludeImg = ['stairs', 'lifts', 'doors', 'windows'];
          if (
            !reformPlacedId.includes(boxes2[i].id) &&
            !excludeShapes.includes(boxes2[i].type)
          ) {
            // draw shape onto ghost context
            boxes2[i].draw(gctx, 'black');

            // get image data at the mouse x,y pixel
            var imageData = gctx.getImageData(name_drop_x, name_drop_y, 1, 1);
            var index = (name_drop_x + name_drop_y * imageData.width) * 4;

            // if the mouse pixel exists, select and break
            if (imageData.data[3] > 0) {
              var old_id = '';
              var desk_id = name_drop_id.getAttribute('desk_id');
              if (boxes2[i].id == null) {
                old_id = '';
              } else {
                old_id = boxes2[i].id;
              }
              boxes2[i].id = desk_id;

              invalidate();
              clear(gctx);
              name_drop_done(name_drop_id, old_id);
            }
          }
          name_drop = false;
        }
      }
    }

    function name_drop_done(pinkSquaere, old_id) {
      var orangeSquare = document.getElementById('drop-element');
      var pinkSquareContainer = document.getElementsByClassName(
        'draggable-container',
      )[0];

      if (!pinkSquaere.parentNode.isSameNode(orangeSquare)) {
        if (old_id == '') {
          pinkSquaere.getElementsByClassName('unplaced_div')[0].style.display =
            'none';
          pinkSquaere.getElementsByClassName('placed_div')[0].style.display =
            'block';
          placed_desks?.appendChild(pinkSquaere);
          pinkSquaere.setAttribute('draggable', false);
          total_placed = total_placed + 1;
          if (document?.getElementById('total_placed')?.innerHTML)
            document.getElementById('total_placed').innerHTML =
              '(' + total_placed + ')';
          total_unplaced = total_unplaced - 1;
          if (document?.getElementById('total_unplaced')?.innerHTML)
            document.getElementById('total_unplaced').innerHTML =
              '(' + total_unplaced + ')';
        } else {
          pinkSquaere.getElementsByClassName('unplaced_div')[0].style.display =
            'none';
          pinkSquaere.getElementsByClassName('placed_div')[0].style.display =
            'block';
          placed_desks?.appendChild(pinkSquaere);
          pinkSquaere.setAttribute('draggable', false);
          total_placed = total_placed + 1;
          if (document?.getElementById('total_placed')?.innerHTML)
            document.getElementById('total_placed').innerHTML =
              '(' + total_placed + ')';
          total_unplaced = total_unplaced - 1;
          if (document?.getElementById('total_unplaced')?.innerHTML)
            document.getElementById('total_unplaced').innerHTML =
              '(' + total_unplaced + ')';
          var pinkSquaered = document.getElementById(old_id);
          pinkSquaered.getElementsByClassName('desk_active')[0].style.display =
            'none';
          pinkSquaered.getElementsByClassName(
            'desk_remove_active',
          )[0].style.display = 'none';
          pinkSquaered.getElementsByClassName('unplaced_div')[0].style.display =
            'block';
          pinkSquaered.getElementsByClassName('placed_div')[0].style.display =
            'none';
          var unplaced_desks = document.getElementById('unplaced_desks');
          unplaced_desks?.appendChild(pinkSquaered);
          pinkSquaered.setAttribute('draggable', true);
          total_placed = total_placed - 1;
          if (document?.getElementById('total_placed')?.innerHTML)
            document.getElementById('total_placed').innerHTML =
              '(' + total_placed + ')';
          total_unplaced = total_unplaced + 1;
          if (document?.getElementById('total_unplaced')?.innerHTML)
            document.getElementById('total_unplaced').innerHTML =
              '(' + total_unplaced + ')';
        }
      }
      invalidate();
    }

    function desk_active() {
      const exclShape = ['square', 'cshaped', 'lshaped'];
      let desk_actives = document.getElementsByClassName('desk_active');
      for (let i = 0; i < desk_actives.length; i++) {
        desk_actives[i].style.display = 'none';
      }
      let desk_remove_actives =
        document.getElementsByClassName('desk_remove_active');
      for (let i = 0; i < desk_remove_actives.length; i++) {
        desk_remove_actives[i].style.display = 'none';
      }

      if (
        boxes2_selectedindex != null &&
        boxes2[boxes2_selectedindex].assettype !== 4 &&
        boxes2[boxes2_selectedindex].type !== 'square' &&
        boxes2[boxes2_selectedindex].type !== 'cshaped' &&
        boxes2[boxes2_selectedindex].type !== 'lshaped'
      ) {
        var i = boxes2_selectedindex;
        var desk_id = boxes2[i].id;
        if (desk_id != null) {
          var pinkSquaere = document.getElementById(desk_id);
          pinkSquaere.getElementsByClassName('desk_active')[0].style.display =
            'block';
          pinkSquaere.getElementsByClassName(
            'desk_remove_active',
          )[0].style.display = 'block';
        }
      }
    }

    function desk_remove() {
      if (boxes2_selectedindex != null && desk_removed == true) {
        var i = boxes2_selectedindex;
        var desk_id = boxes2[i].id;
        if (desk_id != null) {
          var pinkSquaere = document.getElementById(desk_id);
          pinkSquaere.getElementsByClassName('desk_active')[0].style.display =
            'none';
          pinkSquaere.getElementsByClassName(
            'desk_remove_active',
          )[0].style.display = 'none';

          pinkSquaere.getElementsByClassName('unplaced_div')[0].style.display =
            'block';
          pinkSquaere.getElementsByClassName('placed_div')[0].style.display =
            'none';
          var unplaced_desks = document.getElementById('unplaced_desks');
          unplaced_desks?.appendChild(pinkSquaere);
          pinkSquaere.setAttribute('draggable', true);
          boxes2[i].id = null;

          boxes2.splice(i, 1);
          for (var k = i; k < boxes2.length; k++) {
            boxes2[k].index = k;
          }

          boxes2_selectedindex = null;

          mySel = null;

          invalidate();
          desk_removed = false;

          total_placed = total_placed - 1;
          if (document?.getElementById('total_placed')?.innerHTML)
            document.getElementById('total_placed').innerHTML =
              '(' + total_placed + ')';
          total_unplaced = total_unplaced + 1;
          if (document?.getElementById('total_unplaced')?.innerHTML)
            document.getElementById('total_unplaced').innerHTML =
              '(' + total_unplaced + ')';

          myDown();
        }

        invalidate();
      }
    }

    function desk_remove_multiple() {
      if (desk_removed_multiple == true) {
        for (var i = 0; i < multpleselection.length; i++) {
          var arrayname = multpleselection[i].arrayname;
          var arrayindex = multpleselection[i].arrayindex;
          if (arrayname == 'boxes2') {
            if (boxes2[arrayindex].id != null) {
              var desk_id = boxes2[arrayindex].id;
              if (desk_id != null) {
                var pinkSquaere = document.getElementById(desk_id);
                pinkSquaere.getElementsByClassName(
                  'desk_active',
                )[0].style.display = 'none';
                pinkSquaere.getElementsByClassName(
                  'desk_remove_active',
                )[0].style.display = 'none';

                pinkSquaere.getElementsByClassName(
                  'unplaced_div',
                )[0].style.display = 'block';
                pinkSquaere.getElementsByClassName(
                  'placed_div',
                )[0].style.display = 'none';
                var unplaced_desks = document.getElementById('unplaced_desks');
                unplaced_desks?.appendChild(pinkSquaere);
                pinkSquaere.setAttribute('draggable', true);
                boxes2[arrayindex].id = null;

                delete boxes2[arrayindex];
                for (var k = arrayindex; k < boxes2.length; k++) {}

                boxes2_selectedindex = null;

                mySel = null;

                invalidate();

                total_placed = total_placed - 1;
                if (document?.getElementById('total_placed')?.innerHTML)
                  document.getElementById('total_placed').innerHTML =
                    '(' + total_placed + ')';
                total_unplaced = total_unplaced + 1;
                if (document?.getElementById('total_unplaced')?.innerHTML)
                  document.getElementById('total_unplaced').innerHTML =
                    '(' + total_unplaced + ')';
              }
            }
          }
        }
        boxes2 = boxes2.filter(function (e) {
          return e;
        });
        for (var i = 0; i < boxes2.length; i++) {
          if (boxes2[i] != null) {
            boxes2[i].index = i;
          }
        }

        desk_removed_multiple = false;
        clear_select();
        myDown();
      }
    }

    // Happens when the mouse is moving inside the canvas
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
        // something is changing position so we better invalidate the canvas!
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
            // dragangle = angle - -1.5;
            resizeMultiDrag('rotate', oldx, oldy, oldw, oldh);
            break;
        }

        invalidate();
      }
      getMouse(e);
      // if there's a selection see if we grabbed one of the selection handles
      if (multpleselection.length > 0 && !isResizeMultiDrag) {
        for (var i = 0; i < 5; i++) {
          var cur = dragresizehandle[i];

          // we dont need to use the ghost context because
          // selection handles will always be rectangles
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
        // not over a selection box, return to normal
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
        this.style.cursor = 'all-scroll';

        // something is changing position so we better invalidate the canvas!
        invalidate();
      } else if (isResizeDragline) {
        var oldsx = mySelline.startX;
        var oldsy = mySelline.startY;
        var oldex = mySelline.endX;
        var oldey = mySelline.endY;

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

      if (isDrag) {
        getMouse(e);

        mySel.x = mx - offsetx;
        mySel.y = my - offsety;
        this.style.cursor = 'all-scroll';
        // something is changing position so we better invalidate the canvas!
        invalidate();
      } else if (isResizeDrag) {
        // time ro resize!
        var oldx = mySel.x;
        var oldy = mySel.y;
        var originalWidthToHeightRatio = mySel.w / mySel.h;
        var oldw = mySel.w;
        var oldh = mySel.h;

        // 0  1  2
        // 3     4
        // 5  6  7

        switch (expectResize) {
          case 0:
            if (mySel?.assettype == null || mySel?.assettype == 4) {
              var maxx = Math.abs(oldx - mx);
              var maxy = Math.abs(oldy - my);
              if (maxx + 1000 >= maxy) {
                if (mySel.w + oldx - mx > 30) {
                  mySel.w += oldx - mx;
                  mySel.h = mySel.w / originalWidthToHeightRatio;
                  mySel.x = oldx - (mySel.w - oldw);
                  mySel.y = oldy - (mySel.h - oldh);
                } else {
                  mySel.w = mx - oldx;
                  mySel.h = mySel.w / originalWidthToHeightRatio;
                }
              } else {
                if (mySel.h + oldy - my > 30) {
                  mySel.h += oldy - my;
                  mySel.w = mySel.h * originalWidthToHeightRatio;
                  mySel.x = oldx - (mySel.w - oldw);
                  mySel.y = oldy - (mySel.h - oldh);
                }
              }
            }
            break;
          case 2:
            if (mySel?.assettype == null || mySel?.assettype == 4) {
              if (mx - oldx > 30) {
                mySel.w = mx - oldx;
                mySel.h = mySel.w / originalWidthToHeightRatio;
                mySel.y = oldy - (mySel.h - oldh);
              } else {
                mySel.w += oldx - mx;
                mySel.h = mySel.w / originalWidthToHeightRatio;
                mySel.x = oldx - (mySel.w - oldw);
              }
            }
            break;
          case 5:
            if (mySel?.assettype == null || mySel?.assettype == 4) {
              if (mySel.w + oldx - mx > 30) {
                mySel.w += oldx - mx;
                mySel.h = mySel.w / originalWidthToHeightRatio;
                mySel.x = oldx - (mySel.w - oldw);
              } else {
                mySel.w = mx - oldx;
                mySel.h = mySel.w / originalWidthToHeightRatio;
                mySel.y = oldy - (mySel.h - oldh);
              }
            }
            break;
          case 7:
            if (mySel?.assettype == null || mySel?.assettype == 4) {
              if (mx - oldx > 30) {
                mySel.w = mx - oldx;
                mySel.h = mySel.w / originalWidthToHeightRatio;
              } else {
                mySel.w += oldx - mx;
                mySel.h = mySel.w / originalWidthToHeightRatio;
                mySel.x = oldx - (mySel.w - oldw);
                mySel.y = oldy - (mySel.h - oldh);
              }
            }
            break;
          case 8:
            var dx = mx - (mySel.x + mySel.w / 2);
            var dy = my - (mySel.y + mySel.h / 2);
            var angle = Math.atan2(dy, dx);
            mySel.r = angle - -1.5; // - 1.39;// - oldr;
            break;
        }
        invalidate();
      }

      getMouse(e);
      // if there's a selection see if we grabbed one of the selection handles
      if (mySel !== null && !isResizeDrag) {
        for (var i = 0; i < 9; i++) {
          // 0  1  2
          // 3     4
          // 5  6  7
          var cur = selectionHandles[i];

          // we dont need to use the ghost context because
          // selection handles will always be rectangles
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
        // not over a selection box, return to normal
        isResizeDrag = false;
        expectResize = -1;
        if (isDrag == false) {
          this.style.cursor = 'auto';
        }
      }

      if (mySelline !== null && !isResizeDragline) {
        for (var i = 0; i < 3; i++) {
          // 0  1  2
          // 3     4
          // 5  6  7
          var cur = existingRectLines[i];

          // we dont need to use the ghost context because
          // selection handles will always be rectangles
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
                break;
            }
            return;
          }
          isResizeDragline = false;
          expectResizeline = -1;
          this.style.cursor = 'auto';
        }
      }

      if (isDragtext) {
        getMouse(e);
        var text = texts[selectedText];
        text.x = mx - toffsetx;
        text.y = my - toffsety;
        this.style.cursor = 'all-scroll';
        innerMouseDown = false;
        invalidate();
      } else if (isResizeDragtext) {
        innerMouseDown = false;
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
        refs.canvasText.style.fontSize = nsize + 'px';
        refs.canvasText.style.height = nsize + 10 + 'px';

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
      if (canvaspanmove == false) {
        getMouse(e);
        canvas.style.cursor = 'auto';
        showdragicon = false;
        var dragdraw = false;

        if (draw_copy_special == true && draw_paste == true) {
          pastespecial(mx, my);
        }

        if (draw_wall == true) {
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
          shapecount = 0;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            squareroom_img,
            squareroom_img,
            showTextStore,
            shapecount,
            rotateAng,
          );
          draw_squareroom = false;
          dragdraw = false;
        }

        if (draw_stairs == true) {
          var width = 60;
          var height = 100;
          shapecount = 0;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            stairs_img,
            stairs_img,
            '',
            '',
            4,
            11,
            shapecount,
            rotateAng,
          );
          draw_stairs = false;
          dragdraw = false;
        }

        if (draw_lifts == true) {
          var width = 50;
          var height = 50;
          shapecount = 0;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            lifts_img,
            lifts_img,
            '',
            '',
            4,
            12,
            shapecount,
            rotateAng,
          );
          draw_lifts = false;
          dragdraw = false;
        }

        if (draw_doors == true) {
          var width = 50;
          var height = 50;
          shapecount = 0;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            doors_img,
            doors_img,
            '',
            '',
            4,
            13,
            shapecount,
            rotateAng,
          );
          draw_doors = false;
          dragdraw = false;
        }

        if (draw_windows == true) {
          var width = 12;
          var height = 60;
          shapecount = 0;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            windows_img,
            windows_img,
            '',
            '',
            4,
            14,
            shapecount,
            rotateAng,
          );
          draw_windows = false;
          dragdraw = false;
        }

        if (draw_zone.status == true) {
          var width = 200;
          var height = 200;
          draw_zone.status = false;
          var zone_names = draw_zone?.name;
          let p1 = polygonPoints(5, mx, my);
          let rects = drawPolygon([p1]);
          polygons.push({
            points: p1,
            rects: rects[0],
            polygonTouch: false,
            zoneName: zone_names,
            zone_id: draw_zone?.zoneId,
            r: 0,
          });
          dragdraw = false;
        }

        if (draw_lshapedroom == true) {
          var width = 200;
          var height = 200;
          shapecount = 0;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            lshapedroom_img,
            lshapedroom_img,
            showTextStore,
            shapecount,
            rotateAng,
          );
          draw_lshapedroom = false;
          dragdraw = false;
        }

        if (draw_cshapedroom == true) {
          var width = 200;
          var height = 200;
          shapecount = 0;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            cshapedroom_img,
            cshapedroom_img,
            showTextStore,
            shapecount,
            rotateAng,
          );
          draw_cshapedroom = false;
          dragdraw = false;
        }

        if (draw_singledesk == true) {
          var width = 70;
          var height = 45;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          draw_singledesk = false;
          dragdraw = false;
        }
        if (draw_parking == true) {
          var width = 36;
          var height = 76;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          draw_parking = false;
          dragdraw = false;
        }
        if (draw_parking2 == true) {
          var width = 36;
          var height = 76;
          shapecount = 21;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          draw_parking2 = false;
          dragdraw = false;
        }
        if (draw_parking3 == true) {
          var width = 36;
          var height = 76;
          shapecount = 22;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          draw_parking3 = false;
          dragdraw = false;
        }
        if (draw_parking4 == true) {
          var width = 36;
          var height = 76;
          shapecount = 3;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          addRect(
            mx - width / 2 + width + width + 12,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          draw_parking4 = false;
          dragdraw = false;
        }
        if (draw_parking5 == true) {
          var width = 36;
          var height = 76;
          shapecount = 5;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          draw_parking5 = false;
          dragdraw = false;
        }
        if (draw_parking6 == true) {
          var width = 36;
          var height = 76;
          shapecount = 6;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + width + 12,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + width + 12,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          draw_parking6 = false;
          dragdraw = false;
        }
        if (draw_parking7 == true) {
          var width = 36;
          var height = 76;
          shapecount = 7;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          addRect(
            mx - width / 2 + width + width + 12,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          addRect(
            mx - width / 2 + 3 * width + 18,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          addRect(
            mx - width / 2 + 4 * width + 24,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          draw_parking7 = false;
          dragdraw = false;
        }
        if (draw_parking8 == true) {
          var width = 36;
          var height = 76;
          shapecount = 8;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + width + 12,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + width + width + 18,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + 4 * width + 24,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + width + 12,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + width + width + 18,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + 4 * width + 24,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            parking_img,
            parking_img_select,
            boxesAssetId,
            showTextStore,
            3,
            3,
            shapecount,
            rotateAng,
          );
          draw_parking8 = false;
          dragdraw = false;
        }

        if (draw_room_xxs == true) {
          var width = 35;
          var height = 50;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            room_xxs,
            room_xxs_select,
            boxesAssetId,
            showTextStore,
            2,
            17,
            shapecount,
            rotateAng,
          );
          draw_room_xxs = false;
          dragdraw = false;
        }
        if (draw_room_xs == true) {
          var width = 60;
          var height = 50;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            room_xs,
            room_xs_select,
            boxesAssetId,
            showTextStore,
            2,
            7,
            shapecount,
            rotateAng,
          );
          draw_room_xs = false;
          dragdraw = false;
        }
        if (draw_room_s == true) {
          var width = 86;
          var height = 50;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            room_img,
            room_select_img,
            boxesAssetId,
            showTextStore,
            2,
            2,
            shapecount,
            rotateAng,
          );
          draw_room_s = false;
          dragdraw = false;
        }
        if (draw_room_m == true) {
          var width = 112;
          var height = 50;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            room_m,
            room_m_select,
            boxesAssetId,
            showTextStore,
            2,
            8,
            shapecount,
            rotateAng,
          );
          draw_room_m = false;
          dragdraw = false;
        }
        if (draw_room_l == true) {
          var width = 124;
          var height = 50;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            room_l,
            room_l_select,
            boxesAssetId,
            showTextStore,
            2,
            9,
            shapecount,
            rotateAng,
          );
          draw_room_l = false;
          dragdraw = false;
        }
        if (draw_room_xl == true) {
          var width = 150;
          var height = 50;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            room_xl,
            room_xl_select,
            boxesAssetId,
            showTextStore,
            2,
            10,
            shapecount,
            rotateAng,
          );
          draw_room_xl = false;
          dragdraw = false;
        }

        if (draw_onewayroadR == true) {
          console.log(draw_onewayroadR);
          var width = 300;
          var height = 50;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            onewayroadR,
            onewayroadR,
            '',
            '',
            4,
            18,
            shapecount,
            rotateAng,
          );
          draw_onewayroadR = false;
          dragdraw = false;
        }
        if (draw_onewayroadL == true) {
          console.log(draw_onewayroadL);
          var width = 300;
          var height = 50;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            onewayroadL,
            onewayroadL,
            '',
            '',
            4,
            19,
            shapecount,
            rotateAng,
          );
          draw_onewayroadL = false;
          dragdraw = false;
        }
        if (draw_twowayroad == true) {
          console.log(draw_twowayroad);
          var width = 301;
          var height = 100;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            twowayroad,
            twowayroad,
            '',
            '',
            4,
            20,
            shapecount,
            rotateAng,
          );
          draw_twowayroad = false;
          dragdraw = false;
        }
        if (draw_twowayroad90 == true) {
          console.log(draw_twowayroad90);
          var width = 251;
          var height = 251;
          shapecount = 1;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            twowayroad90,
            twowayroad90,
            '',
            '',
            4,
            21,
            shapecount,
            rotateAng,
          );
          draw_twowayroad90 = false;
          dragdraw = false;
        }

        if (draw_regularl == true) {
          var width = 75;
          var height = 45;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            regularl_img,
            regularl_select_img,
            boxesAssetId,
            showTextStore,
            1,
            15,
          );
          draw_regularl = false;
          dragdraw = false;
        }
        if (draw_regularc == true) {
          var width = 45;
          var height = 45;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            regularc_img,
            regularc_select_img,
            boxesAssetId,
            showTextStore,
            1,
            16,
          );
          draw_regularc = false;
          dragdraw = false;
        }

        if (draw_shape2 == true) {
          var width = 70;
          var height = 45;
          shapecount = 21;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          draw_shape2 = false;
          dragdraw = false;
        }
        if (draw_shape3 == true) {
          var width = 70;
          var height = 45;
          shapecount = 22;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          draw_shape3 = false;
          dragdraw = false;
        }
        if (draw_shape4 == true) {
          var width = 70;
          var height = 45;
          shapecount = 3;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          addRect(
            mx - width / 2 + width + width + 12,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          draw_shape4 = false;
          dragdraw = false;
        }
        if (draw_shape5 == true) {
          var width = 70;
          var height = 45;
          shapecount = 4;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          draw_shape5 = false;
          dragdraw = false;
        }
        if (draw_shape6 == true) {
          var width = 70;
          var height = 45; // 45;
          shapecount = 6;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + width + 12,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + width + 12,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          draw_shape6 = false;
          dragdraw = false;
        }
        if (draw_shape7 == true) {
          var width = 70; // 70;
          var height = 70; // 45;
          shapecount = 7;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            shape5_img,
            shape5_select_img,
            boxesAssetId,
            showTextStore,
            1,
            6,
            shapecount,
            rotateAng,
          );
          draw_shape7 = false;
          dragdraw = false;
        }
        if (draw_shape8 == true) {
          var width = 70;
          var height = 45;
          shapecount = 8;
          rotateAng = 0;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + width + 12,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 0;
          addRect(
            mx - width / 2 + width + width + width + 18,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + 6,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + width + 12,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          rotateAng = 3.1359214901292827;
          addRect(
            mx - width / 2 + width + width + width + 18,
            my - height / 2 + height + 6,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            singledesk_img,
            singledesk_select_img,
            boxesAssetId,
            showTextStore,
            1,
            1,
            shapecount,
            rotateAng,
          );
          draw_shape8 = false;
          dragdraw = false;
        }
        if (draw_shape_bg == true) {
          var width = 730; // 45;
          var height = 624; // 45;
          addRect(
            mx - width / 2,
            my - height / 2,
            width,
            height,
            'rgba(220,205,65,0.7)',
            'image',
            shape_bg,
            shape_bg_select,
            showTextStore,
          );
          draw_shape_bg = false;
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
              if (multpleselection[i] == undefined) {
                if (multidragInnerRect != true) {
                  mySel = boxes2[i];
                  offsetx = mx - mySel.x;
                  offsety = my - mySel.y;
                  mySel.x = mx - offsetx;
                  mySel.y = my - offsety;

                  var dx = mx - (mySel.x + mySel.w / 2);
                  var dy = my - (mySel.y + mySel.h / 2);
                  var angle = Math.atan2(dy, dx);
                  oldr = angle;

                  isDrag = true;
                  mySelline = null;
                  boxes2_selectedindex = i;
                  invalidate();
                  clear(gctx);
                  multpleselection = [];
                  draw_drag = false;
                  refs.drawDrag.classList.remove('active');
                  return;
                }
              }
            }
          }
        }

        var rl = existingLines.length;
        for (var i = rl - 1; i >= 0; i--) {
          gctx.fillStyle = 'black';
          gctx.strokeStyle = 'black';
          gctx.lineWidth = 20;
          gctx.beginPath();
          gctx.setLineDash([]);

          var line = existingLines[i];
          gctx.moveTo(line.startX, line.startY);
          gctx.lineTo(line.endX, line.endY);
          gctx.closePath();

          gctx.stroke();

          // get image data at the mouse x,y pixel
          var imageData = gctx.getImageData(mx, my, 1, 1);

          // if the mouse pixel exists, select and break
          if (imageData.data[3] > 0) {
            if (multpleselection[i] == undefined) {
              isDragline = true;

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
              multpleselection = [];
              draw_drag = false;
              refs.drawDrag.classList.remove('active');
              return;
            }
          }
        }

        if (expectResizetext !== -1) {
          isResizeDragtext = true;
          return;
        }

        var tl = texts.length;
        for (var i = tl - 1; i >= 0; i--) {
          var text = texts[i];
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
            text.size +
            'px ' +
            text.style;
          gctx.fillStyle = text.color; // "#ff0000";
          textAreaResizing(text.width, text.size);
          refs.canvasText.addEventListener('focus', textAreaFocusIn);
          refs.canvasText.addEventListener('blur', textAreaFocusOut);
          if (canvasTextFocusOut) {
            gctx.fillStyle = 'rgba(255,255,255,1)';
            gctx.strokeStyle = 'rgba(255,255,255,1)';
            gctx.fillText(text.text, text.x, text.y);
          } else {
            gctx.fillStyle = 'rgba(255,255,255,0.25)';
            gctx.strokeStyle = 'rgba(255,255,255,0.25)';
            gctx.fillText(text.text, text.x, text.y);
          }
          var twidth = gctx.measureText(text.text).width;
          gctx.fillRect(
            text.x - 5,
            text.y - (text.height + 2),
            twidth + 10,
            text.height + 10,
          );
          gctx.restore();
          var imageData = gctx.getImageData(mx, my, 1, 1);
          if (imageData.data[3] > 0) {
            if (multpleselection[i] == undefined) {
              mySel = null;
              mySelline = null;
              selectedText = i;
              toffsetx = mx - texts[i].x;
              toffsety = my - texts[i].y;
              mySeltext = i;
              isDragtext = true;
              invalidate();
              clear(gctx);
              tisFocus = true;
              tfocusIndex = texts[i]?.text?.length;
              draw_text_value = texts[i]?.text;
              trender();
              multpleselection = [];
              draw_drag = false;
              refs.drawDrag.classList.remove('active');
              return;
            }
          } else {
            refs.canvasTextDiv.style.display = 'none';
            refs.drawTextSize ? (refs.drawTextSize.value = 16) : '';
            if (draw_text == false) {
              resettextbox();
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
    }

    let fontColorForCanvasText = '';
    let canvasTextFocusOut = false;
    function textAreaFocusOut() {
      canvasTextFocusOut = true;
    }
    function textAreaFocusIn() {
      canvasTextFocusOut = false;
      document.getElementById('canvas_text').style.fontSize = text.size + 'px';
    }
    function textAreaResizing(a, b, x, y) {
      const textAreaHeight = b;
      const textAreaTN = document.getElementsByTagName('textarea')
        ? document.getElementsByTagName('textarea')
        : '';
      for (let i = 0; i < textAreaTN.length; i++) {
        const textLength = textAreaTN[i].value.length;
        if (textAreaTN[i].value == '' || textAreaTN[i].value == 'Text') {
          textAreaTN[i].setAttribute(
            'style',
            'font-size:' +
              b +
              'px; width: ' +
              (a + 10) +
              '; height:' +
              textAreaHeight +
              'px;overflow-y:hidden;background: transparent; color: transparent; border-width: 1px; border: none; caret-color: black;resize: none;min-width: 60px',
          );
        } else {
          textAreaTN[i].setAttribute(
            'style',
            'font-size:' +
              b +
              'px; width: ' +
              (a + 10) +
              'px; height:' +
              textAreaTN[i].scrollHeight +
              'px;overflow-y:hidden;background: transparent; color:transparent; border-width: 1px; border: none; caret-color: black;resize: none;min-width: 60px',
          );
        }
        textAreaTN[i].addEventListener('input', OnInput, false);
      }
      function OnInput(e) {
        this.style.height = 0;
        this.style.height = this.scrollHeight + 'px';
      }
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
      datahistory();
    }

    // adds a new node
    function myDblClick(e) {
      getMouse(e);
      if (mySeltext != null) {
        edittext();
      }
    }

    function dragEndFun() {
      cleardragobject();
      showdragicon = false;
      assetsdrag = false;
    }

    if (refs.floorReff.drawWall) {
      refs.floorReff.drawWall.ondragstart = function () {
        cleardragobject();
        draw_wall = true;
        linetype = 'solid';
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.drawWall.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.drawWallDash) {
      refs.floorReff.drawWallDash.ondragstart = function () {
        cleardragobject();
        draw_wall_dash = true;
        linetype = 'dash';
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.drawWallDash.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.drawSquareRoom) {
      refs.floorReff.drawSquareRoom.ondragstart = function () {
        cleardragobject();
        draw_squareroom = true;
        dimg = refs.singleDeskDragImg;
        assetsdrag = true;
      };
      refs.floorReff.drawSquareRoom.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.drawStairs) {
      refs.floorReff.drawStairs.ondragstart = function () {
        cleardragobject();
        draw_stairs = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.drawStairs.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.drawLifts) {
      refs.floorReff.drawLifts.ondragstart = function () {
        cleardragobject();
        draw_lifts = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.drawLifts.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.drawDoors) {
      refs.floorReff.drawDoors.ondragstart = function () {
        cleardragobject();
        draw_doors = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.drawDoors.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.drawWindows) {
      refs.floorReff.drawWindows.ondragstart = function () {
        cleardragobject();
        draw_windows = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.drawWindows.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.drawOneWayR) {
      refs.floorReff.drawOneWayR.ondragstart = function (e) {
        cleardragobject();
        draw_onewayroadR = true;
        //dimg = '../../dragicons/SingleDesk-cursor.svg';
        //dimg = document.getElementById("squaredrag_img");
        //showdragicon = true;
        assetsdrag = true;
      };
      refs.floorReff.drawOneWayR.ondragend = function (e) {
        cleardragobject();
        showdragicon = false;
        assetsdrag = false;
      };
    }
    if (refs.floorReff.drawOneWayL) {
      refs.floorReff.drawOneWayL.ondragstart = function (e) {
        cleardragobject();
        draw_onewayroadL = true;
        //dimg = '../../dragicons/SingleDesk-cursor.svg';
        //dimg = document.getElementById("squaredrag_img");
        //showdragicon = true;
        assetsdrag = true;
      };
      refs.floorReff.drawOneWayL.ondragend = function (e) {
        cleardragobject();
        showdragicon = false;
        assetsdrag = false;
      };
    }
    if (refs.floorReff.drawTwoWay) {
      refs.floorReff.drawTwoWay.ondragstart = function (e) {
        cleardragobject();
        draw_twowayroad = true;
        //dimg = '../../dragicons/SingleDesk-cursor.svg';
        //dimg = document.getElementById("squaredrag_img");
        //showdragicon = true;
        assetsdrag = true;
      };
      refs.floorReff.drawTwoWay.ondragend = function (e) {
        cleardragobject();
        showdragicon = false;
        assetsdrag = false;
      };
    }
    if (refs.floorReff.drawTwoWay90) {
      refs.floorReff.drawTwoWay90.ondragstart = function (e) {
        cleardragobject();
        draw_twowayroad90 = true;
        //dimg = '../../dragicons/SingleDesk-cursor.svg';
        //dimg = document.getElementById("squaredrag_img");
        //showdragicon = true;
        assetsdrag = true;
      };
      refs.floorReff.drawTwoWay90.ondragend = function (e) {
        cleardragobject();
        showdragicon = false;
        assetsdrag = false;
      };
    }

    if (refs.floorReff.drawLshapedRoom) {
      refs.floorReff.drawLshapedRoom.ondragstart = function () {
        cleardragobject();
        draw_lshapedroom = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.drawLshapedRoom.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.drawCshapedRoom) {
      refs.floorReff.drawCshapedRoom.ondragstart = function () {
        cleardragobject();
        draw_cshapedroom = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.drawCshapedRoom.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawSingledesk) {
      refs.floorReff.deskReff.drawSingledesk.ondragstart = function () {
        cleardragobject();
        draw_singledesk = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawSingledesk.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawShape2) {
      refs.floorReff.deskReff.drawShape2.ondragstart = function () {
        cleardragobject();
        draw_shape2 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawShape2.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawShape3) {
      refs.floorReff.deskReff.drawShape3.ondragstart = function () {
        cleardragobject();
        draw_shape3 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawShape3.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawShape4) {
      refs.floorReff.deskReff.drawShape4.ondragstart = function () {
        cleardragobject();
        draw_shape4 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawShape4.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawShape5) {
      refs.floorReff.deskReff.drawShape5.ondragstart = function () {
        cleardragobject();
        draw_shape5 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawShape5.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawShape6) {
      refs.floorReff.deskReff.drawShape6.ondragstart = function () {
        cleardragobject();
        draw_shape6 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawShape6.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawShape7) {
      refs.floorReff.deskReff.drawShape7.ondragstart = function () {
        cleardragobject();
        draw_shape7 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawShape7.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawShape8) {
      refs.floorReff.deskReff.drawShape8.ondragstart = function () {
        cleardragobject();
        draw_shape8 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawShape8.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawParking) {
      refs.floorReff.deskReff.drawParking.ondragstart = function () {
        cleardragobject();
        draw_parking = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawParking.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawParking2) {
      refs.floorReff.deskReff.drawParking2.ondragstart = function () {
        cleardragobject();
        draw_parking2 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawParking2.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawParking3) {
      refs.floorReff.deskReff.drawParking3.ondragstart = function () {
        cleardragobject();
        draw_parking3 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawParking3.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawParking4) {
      refs.floorReff.deskReff.drawParking4.ondragstart = function () {
        cleardragobject();
        draw_parking4 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawParking4.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawParking5) {
      refs.floorReff.deskReff.drawParking5.ondragstart = function () {
        cleardragobject();
        draw_parking5 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawParking5.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawParking6) {
      refs.floorReff.deskReff.drawParking6.ondragstart = function () {
        cleardragobject();
        draw_parking6 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawParking6.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawParking7) {
      refs.floorReff.deskReff.drawParking7.ondragstart = function () {
        cleardragobject();
        draw_parking7 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawParking7.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawParking8) {
      refs.floorReff.deskReff.drawParking8.ondragstart = function () {
        cleardragobject();
        draw_parking8 = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawParking8.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawRoomXXS) {
      refs.floorReff.deskReff.drawRoomXXS.ondragstart = function () {
        cleardragobject();
        draw_room_xxs = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawRoomXXS.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawRoomXS) {
      refs.floorReff.deskReff.drawRoomXS.ondragstart = function () {
        cleardragobject();
        draw_room_xs = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawRoomS.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawRoomS) {
      refs.floorReff.deskReff.drawRoomS.ondragstart = function () {
        cleardragobject();
        draw_room_s = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawRoomS.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawRoomM) {
      refs.floorReff.deskReff.drawRoomM.ondragstart = function () {
        cleardragobject();
        draw_room_m = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawRoomM.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.floorReff.deskReff.drawRoomL) {
      refs.floorReff.deskReff.drawRoomL.ondragstart = function () {
        cleardragobject();
        draw_room_l = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawRoomL.ondragend = function () {
        dragEndFun();
      };
    }
    if (refs.floorReff.deskReff.drawRoomXL) {
      refs.floorReff.deskReff.drawRoomXL.ondragstart = function () {
        cleardragobject();
        draw_room_xl = true;
        dimg = refs.squareDragImg;
        assetsdrag = true;
      };
      refs.floorReff.deskReff.drawRoomXL.ondragend = function () {
        dragEndFun();
      };
    }

    if (refs.canvasGetImage) {
      refs.canvasGetImage.onchange = function (e) {
        var getImagePath = URL.createObjectURL(e.target.files[0]);

        var img = new Image();
        img.onload = function () {
          img_width = Number(img.width);
          img_height = Number(img.height);
          img_new_width = Number(img.width);
          img_new_height = Number(img.height);
          document.getElementById('bg_image_width').value = img_width;
          document.getElementById('bg_image_height').value = img_height;
        };
        img.src = getImagePath;
        var file = e.target.files[0];
        handleImageUploadtoS3Bucket(
          file,
          'image',
          data => {
            imgBase64 = data;
          },
          true,
        );
        canvas.style.background = 'url(' + getImagePath + ') no-repeat';
        setcanvasimage = 1;
        canvasbglock = 0;

        var map = canvas;
        innerMouseDown = true;
        AttachDragTo(map);
        canvas.classList.remove('hide-canvas-bg');
      };
    }

    function reformbgImage(imagePath) {
      if (imagePath) {
        canvas.style.background = 'url(' + imagePath + ') no-repeat';
        setcanvasimage = 1;
        canvasbglock = 1;

        document.getElementById('lockbtn')
          ? document.getElementById('lockbtn').classList.add('active')
          : '';
        document.getElementById('bgunlock')
          ? (document.getElementById('bgunlock').style.display = 'none')
          : '';
        document.getElementById('bglock')
          ? (document.getElementById('bglock').style.display = 'block')
          : '';

        var map = canvas;
        innerMouseDown = false;
        AttachDragTo(map);
        canvas.classList.remove('hide-canvas-bg');
      }
    }
    if (document.getElementById('bg_image_width')) {
      document.getElementById('bg_image_width').onchange = function (e) {
        getImgValues();
        var aspectRatio = getImgAspectRatio();
        img_new_height = Math.round(img_new_width / aspectRatio);
        document.getElementById('bg_image_height').value = img_new_height;
        bgImage_W_H(img_new_width, img_new_height);
      };
      document.getElementById('bg_image_width').onkeyup = function (e) {
        getImgValues();
        var aspectRatio = getImgAspectRatio();
        img_new_height = Math.round(img_new_width / aspectRatio);
        document.getElementById('bg_image_height').value = img_new_height;
        bgImage_W_H(img_new_width, img_new_height);
      };
    }
    if (document.getElementById('bg_image_height')) {
      document.getElementById('bg_image_height').onchange = function (e) {
        getImgValues();
        var aspectRatio = getImgAspectRatio();
        img_new_width = Math.round(img_new_height * aspectRatio);
        document.getElementById('bg_image_width').value = img_new_width;
        bgImage_W_H(img_new_width, img_new_height);
      };
      document.getElementById('bg_image_height').onkeyup = function (e) {
        getImgValues();
        var aspectRatio = getImgAspectRatio();
        img_new_width = Math.round(img_new_height * aspectRatio);
        document.getElementById('bg_image_width').value = img_new_width;
        bgImage_W_H(img_new_width, img_new_height);
      };
    }

    function getImgValues() {
      img_new_width = document.getElementById('bg_image_width')
        ? document.getElementById('bg_image_width').value
        : '';
      img_new_height = document.getElementById('bg_image_height')
        ? document.getElementById('bg_image_height').value
        : '';
    }
    function getImgAspectRatio() {
      return img_width / img_height;
    }
    function bgImage_W_H(w, h) {
      canvas.style.backgroundSize = w + 'px ' + h + 'px';
    }

    /// /////////////////////////////////////  text ////////////////////////////////////////////
    if (refs.drawText) {
      refs.drawText.onclick = function () {
        cleardragobject();
        refs.drawText.classList.add('active');
        draw_text = true;
        dimg = refs.textDragImg;
        showdragicon = true;

        var tsize = 16;
        refs.drawTextSize ? (refs.drawTextSize.value = tsize) : '';

        tsize = parseInt(refs.drawTextSize.value);
        refs.canvasText.style.height = parseInt(tsize + 8) + 'px';
        refs.canvasText.style.fontSize = tsize + 'px';
        refs.drawTextBold.classList.remove('active');
        draw_text_bold = false;
        text_bold = '';
        refs.drawTextItalic.classList.remove('active');
        draw_text_italic = false;
        text_italic = '';
        refs.drawTextUnderline.classList.remove('active');
        draw_text_underline = false;
        text_underline = '';
        selectedText = -1;
      };
    }

    var draw_text_bold = false;
    var text_bold = '';
    if (refs.drawTextBold) {
      refs.drawTextBold.onclick = function () {
        refs.canvasTextDiv.style.display = 'none';
        if (mySeltext != null) {
          if (draw_text_bold) {
            draw_text_bold = false;
            text_bold = '';
            refs.drawTextBold.classList.remove('active');
          } else {
            draw_text_bold = true;
            text_bold = 'bold';
            refs.drawTextBold.classList.add('active');
          }
          var i = mySeltext;
          texts[i].bold = text_bold;
          invalidate();
        }
      };
    }
    var draw_text_italic = false;
    var text_italic = '';
    if (refs.drawTextItalic) {
      refs.drawTextItalic.onclick = function () {
        refs.canvasTextDiv.style.display = 'none';
        if (mySeltext != null) {
          if (draw_text_italic) {
            draw_text_italic = false;
            text_italic = '';
            refs.drawTextItalic.classList.remove('active');
          } else {
            draw_text_italic = true;
            text_italic = 'italic';
            refs.drawTextItalic.classList.add('active');
          }
          var i = mySeltext;
          texts[i].italic = text_italic;
          invalidate();
        }
      };
    }
    var draw_text_underline = false;
    var text_underline = '';
    if (refs.drawTextUnderline) {
      refs.drawTextUnderline.onclick = function () {
        refs.canvasTextDiv.style.display = 'none';
        if (mySeltext != null) {
          if (draw_text_underline) {
            draw_text_underline = false;
            text_underline = '';
            refs.drawTextUnderline.classList.remove('active');
          } else {
            draw_text_underline = true;
            text_underline = 'underline';
            refs.drawTextUnderline.classList.add('active');
          }
          var i = mySeltext;
          texts[i].underline = text_underline;
          invalidate();
        }
      };
    }

    function create_text() {
      refs.drawText.classList.remove('active');
      draw_text_value = refs.canvasText.value;
      var draw_text_style = refs.drawTextStyle.value;
      var draw_text_color = 'black';
      var draw_text_size = parseInt(refs.drawTextSize.value);
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
        width: 40,
        height: 16,
      });
      mySeltext = texts.length - 1;
      selectedText = texts.length - 1;

      refs.canvasText
        ? (refs.canvasText.style.left = canvas_text_x + 'px')
        : '';
      refs.canvasText ? (refs.canvasText.style.top = canvas_text_y + 'px') : '';
      invalidate();
    }

    if (refs.drawTextStyle) {
      refs.drawTextStyle.onchange = function (e) {
        refs.canvasText ? (refs.canvasText.style.display = 'none') : '';
        settextstyle();
      };
    }

    function selectfontcolor(color) {
      canvas_text_div.style.diplay = 'none';
      if (mySeltext != null) {
        var i = mySeltext;

        texts[i].color = 'black';
        invalidate();
      }
    }

    function edittext() {
      if (mySeltext != null) {
        var i = mySeltext;
        refs.canvasText.value = texts[i].text;
        canvas_text_div.style.left = texts[i].x + 'px';
        canvas_text_div.style.top = texts[i].y - texts[i].size + 'px';
        canvas_text_div.style.display = 'block';
        refs.canvasText.style.fontSize = texts[i].size + 'px';
        refs.canvasText.focus();
        edittextbox = true;
        invalidate();
      }
    }

    if (refs.canvasText) {
      refs.canvasText.onkeyup = function (e) {
        if (mySeltext != null) {
          var i = mySeltext;
          var keyUpText = document.getElementById('canvas_text')?.value;
          var keyUpText2 = [];
          keyUpText2 = keyUpText.split(/\n\r?/g);
          texts[i].text = keyUpText2;
          draw_text_value = keyUpText2;
          var twidth = ctx.measureText(texts[i].text)?.width;
          textAreaResizing(twidth, texts[i].size, texts[i].x, texts[i].y);
          tisCommandKey = false;
          drawtexts();
        }
      };
    }

    if (refs.canvasText) {
      refs.canvasText.onclick = function (e) {
        if (mySeltext != null) {
          tisFocus = true;
          tfocusIndex = draw_text_value.length;
          drawtexts();
        } else {
          tselected = false;
          tisFocus = false;
          drawtexts();
        }
      };
    }

    var oldtid = 0;
    function trender() {
      // write text
      var str = '';
      for (var i = 0; i < draw_text_value.length; i++) {
        if (!tselected && tisFocus && tfocusIndex === i) {
          str += '';
        }
        str += draw_text_value[i];
      }
      if (
        !tselected &&
        tisFocus &&
        tfocusIndex === draw_text_value?.length &&
        draw_text_value.includes('|') != true
      ) {
        str += '';
      }
      if (mySeltext != null) {
        var t = mySeltext;
        texts[t].text = str;
        oldtid = t;
      } else {
        str = str.replace('', '');
        texts[oldtid].text = str;
        draw_text_value = str;
      }
      invalidate();
    }

    var editDragBtnContainer = document.getElementById('buttonCont');
    refs.canvasText.onkeydown = function (e) {
      if (!tisCommandKey && tisFocus && (e.keyCode == 32 || e.keyCode >= 65)) {
        var str = '';
        for (var i = 0; i < draw_text_value?.length; i++) {}
        if (tfocusIndex === draw_text_value?.length) {
        }

        if (mySeltext != null) {
        }
      }
      setCursor(draw_text_value);
    };
    function setCursor(pos) {
      var tag = refs.canvasText;

      tag.focus();
    }

    function resettextbox() {
      if (edittextbox == true) {
        refs.drawTextSize.value = 16;
        var tsize = refs.drawTextSize.value;
        refs.canvasText.style.height = tsize + 'px';
        refs.canvasText.style.fontSize = tsize + 'px';

        refs.canvasText.value = 'Text';
        // }
        invalidate();
      }
      edittextbox = false;
    }

    var draw_copy_click = false;
    if (refs.drawCopyClick) {
      refs.drawCopyClick.onclick = function (e) {
        if (draw_copy_click == true) {
          draw_copy_click = false;
        } else {
          draw_copy_click = true;
        }
      };
    }

    if (refs.drawCopy) {
      refs.drawCopy.onclick = function () {
        copyFunction();
        document.getElementById('draw_copy_click').classList.remove('active');
      };
    }

    function copyFunction() {
      if (draw_copy_click == true) {
        draw_copy = true;

        if (boxes2_selectedindex != null) {
          var i = boxes2_selectedindex;

          var rect = new Box2();
          rect.x = boxes2[i].x;
          rect.y = boxes2[i].y + 60;
          rect.w = boxes2[i].w;
          rect.h = boxes2[i].h;
          rect.fill = boxes2[i].fill;
          rect.type = boxes2[i].type;
          rect.image = boxes2[i].image;
          rect.assettype = boxes2[i].assettype;
          rect.asset_name_id = boxes2[i].asset_name_id || '';
          rect.selectimage = boxes2[i].selectimage;
          rect.showText = '';
          rect.shapecount = boxes2[i].shapecount;
          rect.r = boxes2[i].r;
          var l = boxes2.length;
          rect.index = l;
          boxes2.push(rect);
          invalidate();
        }

        if (sellineindex != null) {
          var i = sellineindex;

          existingLines.push({
            startX: existingLines[i].startX,
            startY: existingLines[i].startY + 60,
            endX: existingLines[i].endX,
            endY: existingLines[i].endY + 60,
            type: existingLines[i].type,
          });

          invalidate();
        }

        if (mySeltext != null) {
          var i = mySeltext;
          texts.push({
            text: texts[i].text,
            x: texts[i].x,
            y: texts[i].y + 60,
            style: texts[i].style,
            color: texts[i].color,
            bold: texts[i].bold,
            italic: texts[i].italic,
            underline: texts[i].underline,
            size: texts[i].size,
          });

          invalidate();
        }

        if (polygonclick) {
          let points = [];
          for (var j = 0; j < selectedPoint.length; j++) {
            points.push({
              x: selectedPoint[j].x,
              y: selectedPoint[j].y + 60,
              d: selectedPoint[j].d,
            });
          }
          let rects = drawPolygon([points]);
          polygons.push({
            points: points,
            rects: rects[0],
            polygonTouch: false,
            zoneName: polygons[polygonclickindex].zoneName,
            r: 0,
          });
        }

        if (multpleselection.length != 0) {
          for (var m = 0; m < multpleselection.length; m++) {
            var arrayname = multpleselection[m].arrayname;
            var arrayindex = multpleselection[m].arrayindex;
            if (arrayname == 'boxes2') {
              var i = arrayindex;

              if (boxes2[i] != null) {
                var rect = new Box2();
                rect.x = boxes2[i].x;
                rect.y = boxes2[i].y + dragheight + 10;
                rect.w = boxes2[i].w;
                rect.h = boxes2[i].h;
                rect.fill = boxes2[i].fill;
                rect.type = boxes2[i].type;
                rect.image = boxes2[i].image;
                rect.assettype = boxes2[i].assettype;
                rect.asset_name_id = boxes2[i].asset_name_id || '';
                rect.selectimage = boxes2[i].selectimage;
                rect.showText = '';
                rect.shapecount = shapecount;
                rect.r = boxes2[i].r;
                var l = boxes2.length;
                rect.index = l;
                boxes2.push(rect);
              }
            }

            if (arrayname == 'existingLines') {
              var i = arrayindex;
              existingLines.push({
                startX: existingLines[i].startX,
                startY: existingLines[i].startY + dragheight + 10,
                endX: existingLines[i].endX,
                endY: existingLines[i].endY + dragheight + 10,
                type: existingLines[i].type,
              });
            }

            if (arrayname == 'texts') {
              var i = arrayindex;
              texts.push({
                text: texts[i].text,
                x: texts[i].x,
                y: texts[i].y + dragheight + 60,
                style: texts[i].style,
                color: texts[i].color,
                bold: texts[i].bold,
                italic: texts[i].italic,
                underline: texts[i].underline,
                size: texts[i].size,
              });
            }
            if (arrayname == 'polygons') {
            }
          }
          invalidate();
        }
      }
      draw_copy_click = false;
    }

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
          rect.assettype = boxes2[i].assettype;
          rect.asset_name_id = boxes2[i].asset_name_id || '';
          rect.selectimage = boxes2[i].selectimage;
          rect.showText = boxes2[i].showText;
          rect.shapecount = shapecount;
          rect.r = boxes2[i].r;
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
              rect.assettype = boxes2[i].assettype;
              rect.asset_name_id = boxes2[i].asset_name_id || '';
              rect.selectimage = boxes2[i].selectimage;
              rect.showText = boxes2[i].showText;
              rect.shapecount = shapecount;
              rect.r = boxes2[i].r;
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
          if (arrayname == 'polygons') {
          }
        }
        invalidate();
      }

      draw_copy_special = false;
      draw_paste = false;
    }

    if (refs.drawDrag) {
      refs.drawDrag.onclick = function () {
        if (draw_drag == true) {
          refs.drawDrag.classList.remove('active');
          draw_drag = false;
        } else {
          refs.drawDrag.classList.add('active');
          draw_drag = true;
          canvaspanlock = 1;
          canvaspanmove = true;
        }
      };
    }

    function clear_select() {
      multpleselection = [];
      draw_drag = false;
      draw_drag_move = false;
      draw_copy_special = false;
      draw_paste = false;
      invalidate();
    }

    function showIcons() {
      if (showdragicon == true) {
        var dw = 28;
        var dh = 28;
        ctx.drawImage(dimg, showIcons_x - dw / 2, showIcons_y - dh / 2, dw, dh);
        canvas.style.cursor = 'crosshair';
      }
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

    var textOfArray = [];
    function drawtexts() {
      textOfArray = [];
      for (var i = 0; i < texts.length; i++) {
        var textd = texts[i];
        textd.width = ctx.measureText(textd.text).width;
        textd.height = textd.size; // 16;
      }

      for (var i = 0; i < texts.length; i++) {
        var text = texts[i];

        ctx.save();
        ctx.translate(
          text.x + text.width / 2,
          text.y - (text.height - 2) + (text.height + 2) / 2,
        );
        ctx.rotate(text.r);
        ctx.translate(
          -(text.x + text.width / 2),
          -(text.y - (text.height - 2) + (text.height + 2) / 2),
        );

        ctx.font =
          '' +
          text.bold +
          ' ' +
          text.italic +
          ' ' +
          text.size +
          'px ' +
          text.style; // "+text.underline+"//killedUnderline
        refs.canvasText.style.display = 'none';
        ctx.fillStyle = 'black';
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
        if (canvasTextFocusOut) {
          refs.canvasTextDiv.style.display = 'none';
          refs.canvasText.style.display = 'none';
          var hexToRgbaColor = hexToRgbA(text.color);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
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
        } else {
          if (selectedText == i) {
            refs.canvasText.style.font =
              '' +
              text.bold +
              ' ' +
              text.italic +
              ' ' +
              text.size +
              'px ' +
              text.style;
            ctx.fillStyle = 'rgba(255,255,255,0.10)';
            textOfArray = text.text;
            var xt = text.x;
            var yt = text.y;
            for (let i = 0; i <= textOfArray.length; i++) {
              ctx.fillText(textOfArray[i], xt, yt * (i + 1));
            }
            var twidth = ctx.measureText(text.text).width;
            text.width = twidth;
          } else {
            var hexToRgbaColor = hexToRgbA(text?.color);

            ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
            ctx.fillText(text.text, text.x, text.y);
          }
        }
        var twidth = ctx.measureText(text.text).width;
        text.width = twidth;

        textAreaResizing(text.width, text.size, text.x, text.y);

        if (selectedText == i) {
          if (text.underline == 'underline') {
            if (draw_text_underline) {
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
          }
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgba(15,98,171,0.9)';
          ctx.strokeRect(
            text.x - 5,
            text.y - text.size,
            twidth + 10,
            text.height + 10,
          );
          if (canvaspanmove) {
            refs.canvasTextDiv.style.left =
              Number(text.x - 5 + mouse_changed_x) + 'px';
            refs.canvasTextDiv.style.top =
              Number(text.y - text.size + mouse_changed_y) + 'px';
          }

          settextproperty(i);
        }
        ctx.restore();

        if (selectedText == i) {
          var half = mySelBoxSize / 2;
          //    8
          // 0  1  2
          // 3     4
          // 5  6  7

          // top left, middle, right
          selectionHandlestexts[0].x = text.x - 5 - half;
          selectionHandlestexts[0].y = text.y - (text.height + 2) - half;

          selectionHandlestexts[1].x = text.x - 5 + twidth + 10 - half;
          selectionHandlestexts[1].y = text.y - (text.height + 2) - half;

          selectionHandlestexts[2].x = text.x - 5 - half;
          selectionHandlestexts[2].y =
            selectionHandlestexts[0].y + (text.height + 10);

          selectionHandlestexts[3].x = text.x - 5 + twidth + 10 - half;
          selectionHandlestexts[3].y = selectionHandlestexts[2].y;

          ctx.fillStyle = mySelBoxColor;
          for (var t = 0; t < 5; t++) {
            var cur = selectionHandlestexts[t];
            ctx.save();
            ctx.translate(
              text.x + text.width / 2,
              text.y - (text.height - 2) + (text.height + 2) / 2,
            );
            ctx.rotate(text.r);
            ctx.translate(
              -(text.x + text.width / 2),
              -(text.y - (text.height - 2) + (text.height + 2) / 2),
            );

            if (t == 4) {
            } else {
              ctx.strokeStyle = 'rgba(15,98,171,0.9)';
              ctx.lineWidth = 2;
              ctx.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
              ctx.strokeRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
            }
            ctx.restore();
          }

          const newTopLeft = rotate(
            selectionHandlestexts[0].x,
            selectionHandlestexts[0].y,
            text.x + text.width / 2 - half,
            text.y - (text.height - 2) + (text.height + 2) / 2,
            text.r,
          );
          selectionHandlestexts[0].x = newTopLeft[0];
          selectionHandlestexts[0].y = newTopLeft[1];

          const newTopRight = rotate(
            selectionHandlestexts[1].x,
            selectionHandlestexts[1].y,
            text.x + text.width / 2 - half,
            text.y - (text.height - 2) + (text.height + 2) / 2,
            text.r,
          );

          selectionHandlestexts[1].x = newTopRight[0];
          selectionHandlestexts[1].y = newTopRight[1];

          const newBottomLeft = rotate(
            selectionHandlestexts[2].x,
            selectionHandlestexts[2].y,
            text.x + text.width / 2 - half,
            text.y - (text.height - 2) + (text.height + 2) / 2,
            text.r,
          );

          selectionHandlestexts[2].x = newBottomLeft[0];
          selectionHandlestexts[2].y = newBottomLeft[1];
          const newBottomRight = rotate(
            selectionHandlestexts[3].x,
            selectionHandlestexts[3].y,
            text.x + text.width / 2 - half,
            text.y - (text.height - 2) + (text.height + 2) / 2,
            text.r,
          );

          selectionHandlestexts[3].x = newBottomRight[0];
          selectionHandlestexts[3].y = newBottomRight[1];

          if (isResizeDragtext == false) {
            const newTop = rotate(
              selectionHandlestexts[4].x,
              selectionHandlestexts[4].y,
              text.x + text.width / 2 - half,
              text.y - (text.height - 2) + (text.height + 2) / 2,
              text.r,
            );
            selectionHandlestexts[4].x = newTop[0];
            selectionHandlestexts[4].y = newTop[1];
          }
        }
      }

      if (selectedText == -1) {
        resettextbox();
        refs.drawTextSize ? (refs.drawTextSize.value = 16) : '';
        var tsize = refs.drawTextSize ? refs.drawTextSize.value : '';
        refs.canvasText.style.height = tsize + 'px';
        refs.canvasText.style.fontSize = tsize + 'px';

        refs.canvasText ? (refs.canvasText.value = 'Text') : '';

        refs.drawTextBold.classList.remove('active');
        draw_text_bold = false;
        text_bold = '';
        refs.drawTextItalic.classList.remove('active');
        draw_text_italic = false;
        text_italic = '';
        refs.drawTextUnderline.classList.remove('active');
        draw_text_underline = false;
        text_underline = '';
      }
    }
    function hexToRgbA(hex) {
      var c;
      try {
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
          c = hex.substring(1).split('');
          if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c = '0x' + c.join('');
          return (
            'rgba(' +
            [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
            ',1)'
          );
        }
      } catch (e) {
        throw new Error('Bad Hex');
      }
    }
    function textUnderLineFun(context, text, x, y, color, textSize, lineColor) {
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

    // test if x,y is inside the bounding box of texts[textIndex]
    function textHittest(x, y, textIndex) {
      var text = texts[textIndex];
      return (
        x >= text.x - 5 - half &&
        x <= text.x - 5 + text.width + 10 - half &&
        y >= text.y - (text.height + 2) - half - text.height &&
        y <= text.y
      );
    }

    function settextproperty(index) {
      var text = texts[index];
      refs.drawTextStyle ? (refs.drawTextStyle.value = text?.style) : '';
      refs.drawTextSize
        ? (refs.drawTextSize.value = parseFloat(text?.size).toFixed(2) + 'pt')
        : '';
      selectfontcolor(text?.color);
      text_bold = text?.bold;
      text_italic = text?.italic;
      text_underline = text?.underline;
      if (text_bold != '') {
        refs.drawTextBold.classList.add('active');
        draw_text_bold = true;
      } else {
        refs.drawTextBold.classList.remove('active');
        draw_text_bold = false;
        text_bold = '';
      }
      if (text_italic != '') {
        refs.drawTextItalic.classList.add('active');
        draw_text_italic = true;
      } else {
        refs.drawTextItalic.classList.remove('active');
        draw_text_italic = false;
        text_italic = '';
      }
      if (text_underline == 'underline') {
        refs.drawTextUnderline.classList.add('active');
        draw_text_underline = true;
      } else {
        refs.drawTextUnderline.classList.remove('active');
        draw_text_underline = false;
        text_underline = '';
      }
    }

    function dragmultipleselection(x, y) {
      startX = 0;
      startY = 0;
      for (var i = 0; i < multpleselection.length; i++) {
        var arrayname = multpleselection[i].arrayname;
        var arrayindex = multpleselection[i].arrayindex;
        var dx = multpleselection[i].dx;
        var dy = multpleselection[i].dy;
        var nx = dx + x;
        var ny = dy + y;
        multpleselection[i].x = nx;
        multpleselection[i].y = ny;
        if (arrayname == 'boxes2') {
          boxes2[arrayindex].x = nx;
          boxes2[arrayindex].y = ny;
        }
        if (arrayname == 'existingLines') {
          var dxe = multpleselection[i].dxe;
          var dye = multpleselection[i].dye;
          var nxe = dxe + x;
          var nye = dye + y;
          existingLines[arrayindex].startX = nx;
          existingLines[arrayindex].startY = ny;
          existingLines[arrayindex].endX = nxe;
          existingLines[arrayindex].endY = nye;
        }
        if (arrayname == 'texts') {
          texts[arrayindex].x = nx;
          texts[arrayindex].y = ny;
        }
        if (arrayname == 'polygons') {
          multiSelectPolygon = true;
          if (startX == 0 && startY == 0) {
            startX = multpleselection[i].points[0].x;
            startY = multpleselection[i].points[0].y;
          }
          multiSelectID = i;
          for (let k = 0; k < multpleselection[i].points.length; k++) {
            var pointX = 0;
            var pointY = 0;
            pointX = x - startX;
            pointY = y - startY;
            multpleselection[i].points[k].x =
              Number(multpleselection[i].points[k].x) + pointX;
            multpleselection[i].points[k].y =
              Number(multpleselection[i].points[k].y) + pointY;
          }
          startX = x;
          startY = y;
          drawPolygon(polygons.map(({ points }) => points));
        }
      }
    }

    function draghandleMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();

      getMouse(e);
      // save the starting x/y of the rectangle
      dragstartX = parseInt(mx);
      dragstartY = parseInt(my);

      // set a flag indicating the drag has begun
      dragisDown = true;
    }

    function draghandleMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();

      var minx_1 = Number.POSITIVE_INFINITY;
      var miny_1 = Number.POSITIVE_INFINITY;
      var maxx_1 = 0;
      var maxy_1 = 0;

      // the drag is over, clear the dragging flag
      if (isResizeMultiDrag == false && multpleselection.length == 0) {
        var x = dragstartX;
        var y = dragstartY;

        var minx = Number.POSITIVE_INFINITY;
        var miny = Number.POSITIVE_INFINITY;
        var maxx = 0;
        var maxy = 0;
        multpleselection = [];
        if (multpleselection[i] == undefined) {
          for (var i = 0; i < boxes2.length; i++) {
            if (boxes2[i] != null) {
              if (isNegative(dragwidth) == false) {
                if (
                  x <= boxes2[i].x &&
                  x + dragwidth >= boxes2[i].x &&
                  y <= boxes2[i].y &&
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
                    r: boxes2[i].r,
                  });
                }
              } else {
                modifiedX = x + dragwidth;
                if (
                  (modifiedX <= boxes2[i].x ||
                    modifiedX <= boxes2[i].x + boxes2[i].w) &&
                  modifiedX + dragwidth * -1 >= boxes2[i].x &&
                  (y <= boxes2[i].y || y <= boxes2[i].y + boxes2[i].h) &&
                  y + dragheight >= boxes2[i].y
                ) {
                  // if(prevMultiSelect[i] != null){
                  // multpleselection = prevMultiSelect;
                  // }else{
                  // console.log(boxes2);
                  /* if(prevMultiSelect[i] == null){*/
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
                    r: boxes2[i].r,
                  });
                  /* }else{
										for(let j = 0; j < prevMultiSelect.length;j++){
											if(JSON.stringify(boxes2[i]) === JSON.stringify(prevMultiSelect[j])){
												minx = Math.min(minx, boxes2[i].x)
												// x = minx;
												miny = Math.min(miny, boxes2[i].y)
												// y = miny;
												maxx = Math.max(maxx, boxes2[i].x + boxes2[i].w);
												maxy = Math.max(maxy, boxes2[i].y + boxes2[i].h);
												multpleselection.push({
													arrayname: 'boxes2',
													arrayindex: i,
													dx:boxes2[i].x,
													dy:boxes2[i].y,
													x:boxes2[i].x,
													y:boxes2[i].y,
													w:boxes2[i].w,
													h:boxes2[i].h
												});
											}
										}*/
                  // }
                  // }
                }
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

              miny = Math.min(miny, existingLines[i].startY);

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

              miny = Math.min(miny, texts[i].y - texts[i].size);

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
          for (let i = 0; i < polygons.length; i++) {
            if (polygons[i] != null) {
              var minXofPoly;
              var maxXofPoly;
              var minYofpoly;
              var maxYofPoly;
              var xCordPoly = [];
              var yCordPoly = [];

              for (let k = 0; k < polygons[i].points.length; k++) {
                xCordPoly.push(polygons[i].points[k].x);
                yCordPoly.push(polygons[i].points[k].y);
              }
              function findMin(arrayVal) {
                return Math.min(...arrayVal);
              }
              function findMax(arrayVal) {
                return Math.max(...arrayVal);
              }

              if (
                x <= findMin(xCordPoly) &&
                x + dragwidth >= findMax(xCordPoly) &&
                y <= findMin(yCordPoly) &&
                y + dragheight >= findMax(yCordPoly)
              ) {
                minx = Math.min(minx, findMin(xCordPoly));

                miny = Math.min(miny, findMin(yCordPoly));

                maxx = Math.max(maxx, findMax(xCordPoly));
                maxy = Math.max(maxy, findMax(yCordPoly));

                multpleselection.push({
                  arrayname: 'polygons',
                  arrayindex: i,

                  points: polygons[i].points,
                  rects: polygons[i].rects,
                  polygonTouch: polygons[i].polygonTouch,

                  zoneName: polygons[i].zoneName,
                });
                multiSelectPolygon = true;
              }
            }
          }
        }

        prevMultiSelect = multpleselection;
        function isNegative(negWidth) {
          if (Math.sign(negWidth) == -1) {
            return true;
          }
          return false;
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
          multidragInnerRect = false;
        } else {
          multidragInnerRect = true;
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
      } else {
        for (var i = 0; i < multpleselection.length; i++) {
          minx_1 = Math.min(minx_1, multpleselection[i].x);

          miny_1 = Math.min(miny_1, multpleselection[i].y);

          maxx_1 = Math.max(
            maxx_1,
            multpleselection[i].x + multpleselection[i].w,
          );
          maxy_1 = Math.max(
            maxy_1,
            multpleselection[i].y + multpleselection[i].h,
          );
        }
        dragstartX = minx_1;
        dragstartY = miny_1;
        dragwidth = Math.abs(maxx_1 - dragstartX);
        dragheight = Math.abs(maxy_1 - dragstartY);

        if (
          mx > dragstartX &&
          mx < dragstartX + dragwidth &&
          my > dragstartY &&
          my < dragstartY + dragheight
        ) {
          multidragInnerRect = true;
        } else {
          dragstartX = 0;
          dragstartY = 0;
          dragwidth = 0;
          dragheight = 0;
          multpleselection = [];
          draw_drag = false;
          refs.drawDrag.classList.remove('active');
          multidragInnerRect = false;
        }
      }
      dragisDown = false;

      invalidate();
    }

    function draghandleMouseOut(e) {
      e.preventDefault();
      e.stopPropagation();

      // the drag is over, clear the dragging flag
      dragisDown = false;
    }

    function draghandleMouseMove(e) {
      e.preventDefault();
      e.stopPropagation();
      getMouse(e);
      // if we're not dragging, just return
      if (!dragisDown) {
        return;
      }

      // get the current mouse position
      let dragmouseX = parseInt(mx);
      let dragmouseY = parseInt(my);

      // Put your mousemove stuff here

      // clear the canvas
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      // calculate the rectangle width/height based
      // on starting vs current mouse position
      dragwidth = dragmouseX - dragstartX;
      dragheight = dragmouseY - dragstartY;

      // draw a new rect from the start position
      // to the current mouse position
      // ctx.strokeRect(dragstartX, dragstartY, width, height);
      invalidate();
    }

    function drawdrag() {
      console.log('drawDrag_call');
      if (draw_drag == true && multpleselection.length < 1) {
        ctx.fillStyle = 'rgba(223, 241, 252, 0.7)';
        ctx.fillRect(dragstartX, dragstartY, dragwidth, dragheight);
        ctx.strokeRect(dragstartX, dragstartY, dragwidth, dragheight);
      }
      if (multpleselection.length > 0) {
        ctx.save();
        ctx.translate(dragstartX + dragwidth / 2, dragstartY + dragheight / 2);
        ctx.rotate(dragangle);
        ctx.translate(
          -(dragstartX + dragwidth / 2),
          -(dragstartY + dragheight / 2),
        );
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(dragstartX, dragstartY, dragwidth, dragheight);
        ctx.strokeRect(dragstartX, dragstartY, dragwidth, dragheight);
        ctx.restore();

        dragresizehandle[0].x = dragstartX - half;
        dragresizehandle[0].y = dragstartY - half;

        dragresizehandle[1].x = dragstartX + dragwidth - half;
        dragresizehandle[1].y = dragstartY - half;

        dragresizehandle[2].x = dragstartX - half;
        dragresizehandle[2].y = dragstartY + dragheight - half;

        dragresizehandle[3].x = dragstartX + dragwidth - half;
        dragresizehandle[3].y = dragstartY + dragheight - half;

        dragresizehandle[4].x = dragstartX + dragwidth / 2 - half;
        dragresizehandle[4].y = dragstartY - 30;

        for (var i = 0; i < 5; i++) {
          ctx.save();
          ctx.translate(
            dragstartX + dragwidth / 2,
            dragstartY + dragheight / 2,
          );
          ctx.rotate(dragangle);
          ctx.translate(
            -(dragstartX + dragwidth / 2),
            -(dragstartY + dragheight / 2),
          );
          ctx.fillStyle = '#ffffff';
          if (i == 4) {
            const radius = 8;

            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(
              dragresizehandle[i].x + half,
              dragresizehandle[i].y + half,
            );
            ctx.lineTo(dragresizehandle[i].x + half, dragstartY);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.arc(
              dragresizehandle[i].x + half,
              dragresizehandle[i].y,
              radius,
              0,
              2 * Math.PI,
              false,
            );

            ctx.fill();
            ctx.stroke();
          } else {
            ctx.fillRect(
              dragresizehandle[i].x,
              dragresizehandle[i].y,
              mySelBoxSize,
              mySelBoxSize,
            );
            ctx.strokeRect(
              dragresizehandle[i].x,
              dragresizehandle[i].y,
              mySelBoxSize,
              mySelBoxSize,
            );
          }
          ctx.restore();

          const newTopLeft = rotate(
            dragresizehandle[i].x,
            dragresizehandle[i].y,
            dragstartX + dragwidth / 2 - half,
            dragstartY + dragheight / 2 - half,
            dragangle,
          );

          dragresizehandle[i].x = newTopLeft[0];
          dragresizehandle[i].y = newTopLeft[1];
        }

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
            var oldr = multpleselection[i].r;
            const newTopLeft = rotate(
              oldx,
              oldy,
              dragstartX + dragwidth / 2,
              dragstartY + dragheight / 2,
              dragangle,
            );
            boxes2[arrayindex].x = newTopLeft[0];
            boxes2[arrayindex].y = newTopLeft[1];
            boxes2[arrayindex].r = oldr + dragangle;
          }
          if (arrayname == 'polygons') {
            for (let k = 0; k < multpleselection[i].points.length; k++) {}
          }
        }
      }
    }

    function resizeMultiDrag(task, doldx, doldy, doldw, doldh) {
      var doriginalWidthToHeightRatio = dragwidth / dragheight;

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
            multpleselection[i].x = boxes2[arrayindex].x;
            multpleselection[i].y = boxes2[arrayindex].y;
          }

          if (task == 'topright') {
            boxes2[arrayindex].w += (dragwidth - doldw) / dragdeskratio;
            boxes2[arrayindex].h =
              boxes2[arrayindex].w / originalWidthToHeightRatio;

            boxes2[arrayindex].x += (dragwidth - doldw) / dragdeskxratio;
            boxes2[arrayindex].y +=
              (doldy - dragstartY) / dragdeskyratio - (doldy - dragstartY);
            multpleselection[i].x = boxes2[arrayindex].x;
            multpleselection[i].y = boxes2[arrayindex].y;
          }
          if (task == 'bottomleft') {
            boxes2[arrayindex].w += (doldx - dragstartX) / dragdeskratio;
            boxes2[arrayindex].h =
              boxes2[arrayindex].w / originalWidthToHeightRatio;

            boxes2[arrayindex].x +=
              (doldx - dragstartX) / dragdeskxratio - (doldx - dragstartX);
            boxes2[arrayindex].y += (dragheight - doldh) / dragdeskyratio; // -(dragstartY - doldy);
            multpleselection[i].x = boxes2[arrayindex].x;
            multpleselection[i].y = boxes2[arrayindex].y;
          }
          if (task == 'bottomright') {
            boxes2[arrayindex].w += (dragwidth - doldw) / dragdeskratio;
            boxes2[arrayindex].h =
              boxes2[arrayindex].w / originalWidthToHeightRatio;

            boxes2[arrayindex].x += (dragwidth - doldw) / dragdeskxratio;
            boxes2[arrayindex].y += (dragheight - doldh) / dragdeskyratio;
            multpleselection[i].x = boxes2[arrayindex].x;
            multpleselection[i].y = boxes2[arrayindex].y;
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
    document.getElementById('heading-1-1').onclick = function (e) {};
    document.getElementById('heading-1-2').onclick = function (e) {};

    var assignbtncls;
    var unassignbtncls;
    var unassAccrdin;
    var assAccrdin;
    var unAssContainer;
    var assContainer;
    var unAssColpsBtn;
    var assColpsBtn;
    var unAssCount;
    var assCount;
    var unAssHeadin;
    var assHeadin;
    var assCollapseid;
    var unassCollapseid;
    if (selectedShape?.assettype == 1) {
      assignbtncls = 'assignBtn';
      unassignbtncls = 'unassign-desk';
      unassAccrdin = 'unassignAccordin';
      assAccrdin = 'assignAccordin';
      unAssContainer = 'accordion-1';
      assContainer = 'accordion-1-2';
      unAssColpsBtn = 'unassignColapsBtn';
      assColpsBtn = 'assignColapsBtn';
      unAssCount = 'acc_1_1_unAsignCount';
      assCount = 'acc_1_2_asignCount';
      unAssHeadin = 'heading-1-1';
      assHeadin = 'heading-1-2';
      unassCollapseid = 'collapse-1-1';
      assCollapseid = 'collapse-1-2';
    } else if (selectedShape?.assettype == 2) {
      assignbtncls = 'assignRoomBtn';
      unassignbtncls = 'unassign-room';
      unassAccrdin = 'unassignAccordinRoom';
      assAccrdin = 'assignAccordinRoom';
      unAssContainer = 'accordion-2';
      assContainer = 'accordion-2-2';
      unAssColpsBtn = 'unassignColapsBtnRoom';
      assColpsBtn = 'assignColapsBtnRoom';
      unAssCount = 'acc_2_1_unAsignCount';
      assCount = 'acc_2_2_asignCount';
      unAssHeadin = 'heading-2-1';
      assHeadin = 'heading-2-2';
      unassCollapseid = 'collapse-2-1';
      assCollapseid = 'collapse-2-2';
    } else if (selectedShape?.assettype == 3) {
      assignbtncls = 'assignParkBtn';
      unassignbtncls = 'unassign-park';
      unassAccrdin = 'unassignAccordinPark';
      assAccrdin = 'assignAccordinPark';
      unAssContainer = 'accordion-3';
      assContainer = 'accordion-3-2';
      unAssColpsBtn = 'unassignColapsBtnPark';
      assColpsBtn = 'assignColapsBtnPark';
      unAssCount = 'acc_3_1_unAsignCount';
      assCount = 'acc_3_2_asignCount';
      unAssHeadin = 'heading-3-1';
      assHeadin = 'heading-3-2';
      unassCollapseid = 'collapse-3-1';
      assCollapseid = 'collapse-3-2';
    }

    var assignBtnClasses = document.getElementsByClassName('assignBtn');
    var assignBtnClassesRoom = document.getElementsByClassName('assignRoomBtn');
    var assignBtnClassesPark = document.getElementsByClassName('assignParkBtn');

    var unassignBtnClasses = document.getElementsByClassName('unassign-desk');
    var unassignBtnClassesRoom =
      document.getElementsByClassName('unassign-room');
    var unassignBtnClassesPark =
      document.getElementsByClassName('unassign-park');

    var unassignAccordin = document.getElementsByClassName('unassignAccordin');
    var unassignAccordinRoom = document.getElementsByClassName(
      'unassignAccordinRoom',
    );
    var unassignAccordinPark = document.getElementsByClassName(
      'unassignAccordinPark',
    );

    var assignAccordin = document.getElementsByClassName('assignAccordin');
    var assignAccordinRoom =
      document.getElementsByClassName('assignAccordinRoom');
    var assignAccordinPark =
      document.getElementsByClassName('assignAccordinPark');

    for (let i = 0; i < assignBtnClasses?.length; i++) {
      assignBtnClasses[i].onclick = function (e) {
        assignValToShapes(this.parentNode);
      };
    }
    for (let i = 0; i < assignBtnClassesRoom?.length; i++) {
      assignBtnClassesRoom[i].onclick = function (e) {
        assignValToShapes(this.parentNode);
      };
    }
    for (let i = 0; i < assignBtnClassesPark?.length; i++) {
      assignBtnClassesPark[i].onclick = function (e) {
        assignValToShapes(this.parentNode);
      };
    }
    for (let i = 0; i < unassignBtnClasses?.length; i++) {
      unassignBtnClasses[i].onclick = function (e) {
        assignValToShapes(this.parentNode);
      };
    }
    for (let i = 0; i < unassignBtnClassesRoom?.length; i++) {
      unassignBtnClassesRoom[i].onclick = function (e) {
        assignValToShapes(this.parentNode);
      };
    }
    for (let i = 0; i < unassignBtnClassesPark?.length; i++) {
      unassignBtnClassesPark[i].onclick = function (e) {
        assignValToShapes(this.parentNode);
      };
    }
    var unAssignedContainer = document.getElementById('accordion-1');
    var unAssignedContainerRoom = document.getElementById('accordion-2');
    var unAssignedContainerPark = document.getElementById('accordion-3');

    var assignedContainer = document.getElementById('accordion-1-2');
    var assignedContainerRoom = document.getElementById('accordion-2-2');
    var assignedContainerPark = document.getElementById('accordion-3-2');

    var unassignColapsBtn = document.getElementById('unassignColapsBtn');
    var unassignColapsBtnRoom = document.getElementById(
      'unassignColapsBtnRoom',
    );
    var unassignColapsBtnPark = document.getElementById(
      'unassignColapsBtnPark',
    );

    var assignColapsBtn = document.getElementById('assignColapsBtn');
    var assignColapsBtnRoom = document.getElementById('assignColapsBtnRoom');
    var assignColapsBtnPark = document.getElementById('assignColapsBtnPark');

    var acc_1_1_unAsignCount = document.getElementById('acc_1_1_unAsignCount');
    var acc_2_1_unAsignCount = document.getElementById('acc_2_1_unAsignCount');
    var acc_3_1_unAsignCount = document.getElementById('acc_3_1_unAsignCount');

    var acc_1_2_asignCount = document.getElementById('acc_1_2_asignCount');
    var acc_2_2_asignCount = document.getElementById('acc_2_2_asignCount');
    var acc_3_2_asignCount = document.getElementById('acc_3_2_asignCount');

    var deskCount = document.getElementById('desk-count-total');
    var roomCount = document.getElementById('room-count-total');
    var parkCount = document.getElementById('park-count-total');

    var unAssignedIds = [];
    var unAssignedRoomIds = [];
    var unAssignedParkIds = [];
    var assignedIds = [];
    var assignedRoomIds = [];
    var assignedParkIds = [];

    var tempAssignText;
    var existingAssignText = false;
    var directUnassign = false;

    function assignValToShapes(a) {
      tempAssignText = selectedShape?.showText;

      if (selectedShape?.assettype == 1) {
        assignbtncls = 'assignBtn';
        unassignbtncls = 'unassign-desk';
        unassAccrdin = 'unassignAccordin';
        assAccrdin = 'assignAccordin';
        unAssContainer = 'accordion-1';
        assContainer = 'accordion-1-2';
        unAssColpsBtn = 'unassignColapsBtn';
        assColpsBtn = 'assignColapsBtn';
        unAssCount = 'acc_1_1_unAsignCount';
        assCount = 'acc_1_2_asignCount';
        unAssHeadin = 'heading-1-1';
        assHeadin = 'heading-1-2';
        unassCollapseid = 'collapse-1-1';
        assCollapseid = 'collapse-1-2';
      } else if (selectedShape?.assettype == 2) {
        assignbtncls = 'assignRoomBtn';
        unassignbtncls = 'unassign-room';
        unassAccrdin = 'unassignAccordinRoom';
        assAccrdin = 'assignAccordinRoom';
        unAssContainer = 'accordion-2';
        assContainer = 'accordion-2-2';
        unAssColpsBtn = 'unassignColapsBtnRoom';
        assColpsBtn = 'assignColapsBtnRoom';
        unAssCount = 'acc_2_1_unAsignCount';
        assCount = 'acc_2_2_asignCount';
        unAssHeadin = 'heading-2-1';
        assHeadin = 'heading-2-2';
        unassCollapseid = 'collapse-2-1';
        assCollapseid = 'collapse-2-2';
      } else if (selectedShape?.assettype == 3) {
        assignbtncls = 'assignParkBtn';
        unassignbtncls = 'unassign-park';
        unassAccrdin = 'unassignAccordinPark';
        assAccrdin = 'assignAccordinPark';
        unAssContainer = 'accordion-3';
        assContainer = 'accordion-3-2';
        unAssColpsBtn = 'unassignColapsBtnPark';
        assColpsBtn = 'assignColapsBtnPark';
        unAssCount = 'acc_3_1_unAsignCount';
        assCount = 'acc_3_2_asignCount';
        unAssHeadin = 'heading-3-1';
        assHeadin = 'heading-3-2';
        unassCollapseid = 'collapse-3-1';
        assCollapseid = 'collapse-3-2';
      }

      if (selectedShape != undefined && mySel != null) {
        if (a?.childNodes[1]?.classList == assignbtncls) {
          var selectedNameToAssign = a?.id;
          var selectedIdToAssign = a?.getAttribute('desk_id');
          var unassignElemToPush = a.parentNode.parentNode;
          a.childNodes[1].innerText = 'Unassign';
          a?.childNodes[1]?.classList?.remove(assignbtncls);
          a?.childNodes[1]?.classList?.add(unassignbtncls);
          a?.parentNode?.parentNode?.classList?.remove(unassAccrdin);
          a?.parentNode?.parentNode?.classList?.add(assAccrdin);
          a.parentNode.parentNode.removeAttribute(
            'data-bs-parent',
            '#' + unAssContainer,
          );
          a.parentNode.parentNode.setAttribute(
            'data-bs-parent',
            '#' + assContainer,
          );
          a.parentNode.parentNode.removeAttribute(
            'aria-labelledby',
            unAssHeadin,
          );
          a.parentNode.parentNode.setAttribute('aria-labelledby', assHeadin);
          a.parentNode.parentNode.removeAttribute('id', unassCollapseid);
          a.parentNode.parentNode.setAttribute('id', assCollapseid);
          a.parentNode.parentNode.style.display = 'none';
          var tempNodeToAppend = a.parentNode.parentNode;
          a.parentNode.parentNode.remove();

          if (selectedShape?.assettype == 1) {
            assignedContainer.append(tempNodeToAppend);

            assignColapsBtn.setAttribute('aria-expanded', true);
          } else if (selectedShape?.assettype == 2) {
            assignedContainerRoom.append(tempNodeToAppend);
            assignColapsBtnRoom.setAttribute('aria-expanded', true);
          } else if (selectedShape?.assettype == 3) {
            assignedContainerPark.append(tempNodeToAppend);
            assignColapsBtnPark.setAttribute('aria-expanded', true);
          }
          var assignClasses = document.getElementsByClassName(assAccrdin);
          for (let i = 0; i < assignClasses?.length; i++) {
            assignClasses[i].style.display = 'block';
          }

          if (selectedShape.image == singledesk_withoutText) {
            selectedShape.image = singledesk_img;
          } else if (selectedShape.image == shape5_withoutText_img) {
            selectedShape.image = shape5_img;
          } else if (selectedShape.image == parking_img) {
            selectedShape.image = parking_img_white;
          } else if (selectedShape.image == room_xxs) {
            selectedShape.image = room_xxs_white;
          } else if (selectedShape.image == room_xs) {
            selectedShape.image = room_xs_white;
          } else if (selectedShape.image == room_img) {
            selectedShape.image = room_white_img;
          } else if (selectedShape.image == room_m) {
            selectedShape.image = room_m_white;
          } else if (selectedShape.image == room_l) {
            selectedShape.image = room_l_white;
          } else if (selectedShape.image == room_xl) {
            selectedShape.image = room_xl_white;
          }

          selectedShape.showText = '' + selectedNameToAssign;
          selectedShape.id = '' + selectedIdToAssign;
          redraw();
          countAssignChild();

          if (selectedShape?.assettype == 1)
            assignColapsBtn.to = hrefForAccordin_2;
          else if (selectedShape?.assettype == 2)
            assignColapsBtnRoom.to = hrefForAccordinRoom_2;
          else if (selectedShape?.assettype == 3)
            assignColapsBtnPark.to = hrefForAccordinPark_2;

          countUnassignChild();

          if (selectedShape?.assettype == 1)
            unassignColapsBtn.to = hrefForAccordin_1;
          else if (selectedShape?.assettype == 2)
            unassignColapsBtnRoom.to = hrefForAccordinRoom_1;
          else if (selectedShape?.assettype == 3)
            unassignColapsBtnPark.to = hrefForAccordinPark_1;

          if (selectedShape.showText != '') {
            if (tempAssignText != '') {
              a = document.getElementById(tempAssignText);
              existingAssignText = true;
              unassignDeskFun(a);
            }
          }
        } else {
          if (
            selectedShape.showText != '' &&
            selectedShape.showText == a.childNodes[0].innerText
          ) {
            unassignDeskFun(a);
          }
        }
      } else {
        if (
          a.childNodes[1].classList == 'assignBtn' ||
          a.childNodes[1].classList == 'assignRoomBtn' ||
          a.childNodes[1].classList == 'assignParkBtn'
        ) {
        } else {
          directUnassign = true;
          unassignDeskFun(a);
        }
      }
    }
    var selectedBoxElemt;
    var selectedElemForUnassign;
    function unassignDeskFun(a) {
      var selectedNameToAssign = a.childNodes[0].innerText;
      if (directUnassign) {
        for (let i = 0; i < boxes2.length; i++) {
          if (boxes2[i].showText === selectedNameToAssign) {
            selectedBoxElemt = i;
          }
        }
        selectedElemForUnassign = boxes2[selectedBoxElemt];
      } else {
        selectedElemForUnassign = selectedShape;
      }

      if (selectedElemForUnassign?.assettype == 1) {
        assignbtncls = 'assignBtn';
        unassignbtncls = 'unassign-desk';
        unassAccrdin = 'unassignAccordin';
        assAccrdin = 'assignAccordin';
        unAssContainer = 'accordion-1';
        assContainer = 'accordion-1-2';
        unAssColpsBtn = 'unassignColapsBtn';
        assColpsBtn = 'assignColapsBtn';
        unAssCount = 'acc_1_1_unAsignCount';
        assCount = 'acc_1_2_asignCount';
        unAssHeadin = 'heading-1-1';
        assHeadin = 'heading-1-2';
        unassCollapseid = 'collapse-1-1';
        assCollapseid = 'collapse-1-2';
      } else if (selectedElemForUnassign?.assettype == 2) {
        assignbtncls = 'assignRoomBtn';
        unassignbtncls = 'unassign-room';
        unassAccrdin = 'unassignAccordinRoom';
        assAccrdin = 'assignAccordinRoom';
        unAssContainer = 'accordion-2';
        assContainer = 'accordion-2-2';
        unAssColpsBtn = 'unassignColapsBtnRoom';
        assColpsBtn = 'assignColapsBtnRoom';
        unAssCount = 'acc_2_1_unAsignCount';
        assCount = 'acc_2_2_asignCount';
        unAssHeadin = 'heading-2-1';
        assHeadin = 'heading-2-2';
        unassCollapseid = 'collapse-2-1';
        assCollapseid = 'collapse-2-2';
      } else if (selectedElemForUnassign?.assettype == 3) {
        assignbtncls = 'assignParkBtn';
        unassignbtncls = 'unassign-park';
        unassAccrdin = 'unassignAccordinPark';
        assAccrdin = 'assignAccordinPark';
        unAssContainer = 'accordion-3';
        assContainer = 'accordion-3-2';
        unAssColpsBtn = 'unassignColapsBtnPark';
        assColpsBtn = 'assignColapsBtnPark';
        unAssCount = 'acc_3_1_unAsignCount';
        assCount = 'acc_3_2_asignCount';
        unAssHeadin = 'heading-3-1';
        assHeadin = 'heading-3-2';
        unassCollapseid = 'collapse-3-1';
        assCollapseid = 'collapse-3-2';
      }
      var unassignElemToPush = a.parentNode.parentNode;
      a.childNodes[1].innerText = 'Assign';
      a.childNodes[1].classList.remove(unassignbtncls);
      a.childNodes[1].classList.add(assignbtncls);
      a.parentNode.parentNode.classList.remove(assAccrdin);
      a.parentNode.parentNode.classList.add(unassAccrdin);
      a.parentNode.parentNode.removeAttribute(
        'data-bs-parent',
        '#' + assContainer,
      );
      a.parentNode.parentNode.setAttribute(
        'data-bs-parent',
        '#' + unAssContainer,
      );
      a.parentNode.parentNode.removeAttribute('aria-labelledby', assHeadin);
      a.parentNode.parentNode.setAttribute('aria-labelledby', unAssHeadin);
      a.parentNode.parentNode.removeAttribute('id', assCollapseid);
      a.parentNode.parentNode.setAttribute('id', unassCollapseid);
      a.parentNode.parentNode.style.display = 'none';

      var tempNodeToAppend = a.parentNode.parentNode;
      a.parentNode.parentNode.remove();

      if (selectedElemForUnassign?.assettype == 1) {
        unAssignedContainer.append(tempNodeToAppend);
        unassignColapsBtn.setAttribute('aria-expanded', true);
      } else if (selectedElemForUnassign?.assettype == 2) {
        unAssignedContainerRoom.append(tempNodeToAppend);
        unassignColapsBtnRoom.setAttribute('aria-expanded', true);
      } else if (selectedElemForUnassign?.assettype == 3) {
        unAssignedContainerPark.append(tempNodeToAppend);
        unassignColapsBtnPark.setAttribute('aria-expanded', true);
      }
      var unassignClasses = document.getElementsByClassName(unassAccrdin);
      for (let i = 0; i < unassignClasses?.length; i++) {
        unassignClasses[i].style.display = 'block';
      }

      if (existingAssignText == false) {
        if (selectedElemForUnassign.image == singledesk_img) {
          selectedElemForUnassign.image = singledesk_withoutText;
        } else if (selectedElemForUnassign.image == shape5_img) {
          selectedElemForUnassign.image = shape5_withoutText_img;
        } else if (selectedElemForUnassign.image == parking_img_white) {
          selectedElemForUnassign.image = parking_img;
        } else if (selectedElemForUnassign.image == room_xxs_white) {
          selectedElemForUnassign.image = room_xxs;
        } else if (selectedElemForUnassign.image == room_xs_white) {
          selectedElemForUnassign.image = room_xs;
        } else if (selectedElemForUnassign.image == room_white_img) {
          selectedElemForUnassign.image = room_img;
        } else if (selectedElemForUnassign.image == room_m_white) {
          selectedElemForUnassign.image = room_m;
        } else if (selectedElemForUnassign.image == room_l_white) {
          selectedElemForUnassign.image = room_l;
        } else if (selectedElemForUnassign.image == room_xl_white) {
          selectedElemForUnassign.image = room_xl;
        }
        selectedElemForUnassign.showText = '';
        selectedElemForUnassign.id = null;
        // tempAssignText = "";
      }
      redraw();
      countAssignChild();

      if (selectedElemForUnassign?.assettype == 1)
        assignColapsBtn.to = hrefForAccordin_2;
      else if (selectedElemForUnassign?.assettype == 2)
        assignColapsBtnRoom.to = hrefForAccordinRoom_2;
      else if (selectedElemForUnassign?.assettype == 3)
        assignColapsBtnPark.to = hrefForAccordinPark_2;

      countUnassignChild();

      if (selectedElemForUnassign?.assettype == 1)
        unassignColapsBtn.to = hrefForAccordin_1;
      else if (selectedElemForUnassign?.assettype == 2)
        unassignColapsBtnRoom.to = hrefForAccordinRoom_1;
      else if (selectedElemForUnassign?.assettype == 3)
        unassignColapsBtnPark.to = hrefForAccordinPark_1;

      existingAssignText = false;
      directUnassign = false;
    }
    var hrefForAccordin_1;
    var hrefForAccordinRoom_1;
    var hrefForAccordinPark_1;
    var hrefForAccordin_2;
    var hrefForAccordinRoom_2;
    var hrefForAccordinPark_2;
    function countUnassignChild() {
      hrefForAccordin_1 = '';
      hrefForAccordinRoom_1 = '';
      hrefForAccordinPark_1 = '';
      acc_1_1_unAsignCount.innerText = unassignAccordin.length;
      deskCount.innerText =
        assignAccordin.length +
        '/' +
        (assignAccordin.length + unassignAccordin.length);
      acc_2_1_unAsignCount.innerText = unassignAccordinRoom.length;
      roomCount.innerText =
        assignAccordinRoom.length +
        '/' +
        (assignAccordinRoom.length + unassignAccordinRoom.length);
      acc_3_1_unAsignCount.innerText = unassignAccordinPark.length;
      parkCount.innerText =
        assignAccordinPark.length +
        '/' +
        (assignAccordinPark.length + unassignAccordinPark.length);

      for (let i = 0; i < unassignAccordin.length; i++) {
        unAssignedIds.push(unassignAccordin[i].id);
      }
      for (let i = 0; i < unassignAccordinRoom.length; i++) {
        unAssignedRoomIds.push(unassignAccordinRoom[i].id);
      }
      for (let i = 0; i < unassignAccordinPark.length; i++) {
        unAssignedParkIds.push(unassignAccordinPark[i].id);
      }
      hrefForAccordin_1 = unAssignedIds.join(',#');
      hrefForAccordin_1 = '#' + hrefForAccordin_1;
      hrefForAccordinRoom_1 = unAssignedRoomIds.join(',#');
      hrefForAccordinRoom_1 = '#' + hrefForAccordinRoom_1;
      hrefForAccordinPark_1 = unAssignedParkIds.join(',#');
      hrefForAccordinPark_1 = '#' + hrefForAccordinPark_1;
    }
    function countAssignChild() {
      hrefForAccordin_2 = '';
      hrefForAccordinRoom_2 = '';
      hrefForAccordinPark_2 = '';
      acc_1_2_asignCount.innerText = assignAccordin.length;
      deskCount.innerText =
        assignAccordin.length +
        '/' +
        (assignAccordin.length + unassignAccordin.length);
      acc_2_2_asignCount.innerText = assignAccordinRoom.length;
      roomCount.innerText =
        assignAccordinRoom.length +
        '/' +
        (assignAccordinRoom.length + unassignAccordinRoom.length);
      acc_3_2_asignCount.innerText = assignAccordinPark.length;
      parkCount.innerText =
        assignAccordinPark.length +
        '/' +
        (assignAccordinPark.length + unassignAccordinPark.length);
      for (let i = 0; i < assignAccordin.length; i++) {
        assignedIds.push(assignAccordin[i].id);
      }
      for (let i = 0; i < assignAccordinRoom.length; i++) {
        assignedRoomIds.push(assignAccordinRoom[i].id);
      }
      for (let i = 0; i < assignAccordinPark.length; i++) {
        assignedParkIds.push(assignAccordinPark[i].id);
      }
      hrefForAccordin_2 = assignedIds.join(',#');
      hrefForAccordin_2 = '#' + hrefForAccordin_2;
      hrefForAccordinRoom_2 = assignedRoomIds.join(',#');
      hrefForAccordinRoom_2 = '#' + hrefForAccordinRoom_2;
      hrefForAccordinPark_2 = assignedParkIds.join(',#');
      hrefForAccordinPark_2 = '#' + hrefForAccordinPark_2;
    }

    var showTextStore = '';
    var shapecount = 0;
    var rotateAng = 0;
    var clickedTextClasses = document.getElementsByClassName(
      'workspace-draggable-text',
    )
      ? document.getElementsByClassName('workspace-draggable-text')
      : null;
    if (
      clickedTextClasses !== null &&
      clickedTextClasses !== undefined &&
      clickedTextClasses !== ''
    ) {
      for (let i = 0; i < clickedTextClasses.length; i++) {
        clickedTextClasses[i].ondragstart = function (event) {
          unplacedElemDrag(event);
        };
        clickedTextClasses[i].ondragend = function (event) {
          unplacedElemDrop(event);
        };
      }
    }

    // Draggable Element Functions
    function unplacedElemDrag(event) {
      if (shapeClickedForDrag == true) {
        event.dataTransfer.setData('text/plain', event.target.id); // "draggable-element"

        showTextStore = event.target.getAttribute('desk_id');

        boxesAssetId = event.target.id;
        var unplacedElemDrag = event.target.id;
        event.dataTransfer.effectsAllowed = 'move';
        event.target.style.cursor = 'move'; // change cursor style

        event.target.classList.add('hide');
        var imageIdToDraw;
        tempVarToClickShape == undefined
          ? (imageIdToDraw = 'drawPopup')
          : (imageIdToDraw = tempVarToClickShape);
        switch (imageIdToDraw) {
          case 'draw_singledesk':
            draw_singledesk = true;
            break;
          case 'draw_shape5':
            draw_shape5 = true;
            break;
          case 'draw_shape3':
            draw_shape3 = true;
            break;
          case 'draw_shape4':
            draw_shape4 = true;
            break;
          case 'draw_shape2':
            draw_shape2 = true;
            break;
          case 'regular_l':
            draw_regularl = true;
            break;
          case 'regular_c':
            draw_regularc = true;
            break;
          case 'room_desk':
            draw_room = true;
            break;
          case 'parking_desk':
            draw_parking = true;
            break;
          default:
        }
        assetsdrag = true;
      }
    }
    var placedCountForChild = 0;
    var unPlacedCountForChild = 0;
    var locationClassName = document.getElementsByClassName('locate-manage')
      ? document.getElementsByClassName('locate-manage')
      : '';

    function unplacedElemDrop(event) {
      const placedCheck = boxes2.some(b => b?.id == event?.target?.id);
      dropElement = event;

      if (shapeClickedForDrag == true && placedCheck) {
        placedCountForChild = 0;
        unPlacedCountForChild = 0;
        var dropElem = event.target;

        event.target.style.cursor = 'pointer';
        event.target.classList.remove('hide');
        event.target.draggable = false;
        event.target.classList.remove('unplaced_Element');
        event.target.classList.add('placed_Element');
        event.target.remove();
        dropElem.childNodes[0].style.cssText = 'display: block';
        dropElem.childNodes[1].style.cssText = 'display: none';
        var locationExactChildName =
          locationClassName?.length > 0
            ? locationClassName[0]?.childNodes[1]?.childNodes[0]
            : '';
        locationExactChildName?.append(event?.target);
        placedCountFun(floorType);
        cleardragobject();
        showdragicon = false;
        assetsdrag = false;
      }
    }

    var placedCountFun = id => {
      const floor_id = id || floorType;
      var unplacedAssetCount = 0;
      var placedAssetCount = 0;

      if (locationClassName?.length > 0) {
        if (
          Object.keys(
            locationClassName[0]?.childNodes[1]?.childNodes[0]?.children,
          ).length > 0
        ) {
          const placedsliceData =
            locationClassName[0]?.childNodes[1]?.childNodes[0]?.children;
          const placedSliceRes = Object.fromEntries(
            Object.entries(placedsliceData)?.slice(1),
          );
          const placedSliceArr = Object.entries(placedSliceRes);
          placedAssetCount = floor_id
            ? placedSliceArr?.filter(
                r => r[1]?.getAttribute('type') == floor_id,
              )?.length
            : 0;
        }

        if (
          Object.keys(
            locationClassName[1]?.childNodes[1]?.childNodes[0]?.children,
          ).length > 0
        ) {
          const unplacedsliceData =
            locationClassName[1]?.childNodes[1]?.childNodes[0]?.children;
          const unplacedSliceRes = Object.fromEntries(
            Object.entries(unplacedsliceData)?.slice(0, -1),
          );
          const unplacedSliceArr = Object.entries(unplacedSliceRes);
          unplacedAssetCount = floor_id
            ? unplacedSliceArr?.filter(
                r => r[1]?.getAttribute('type') == floor_id,
              )?.length
            : 0;
        }
        var placedHeaderForCount =
          locationClassName[0]?.childNodes[0]?.childNodes[0]?.children[0];
        var unPlacedHeaderForCount =
          locationClassName[1]?.childNodes[0]?.childNodes[0]?.children[0];
        placedHeaderForCount.innerHTML = '(' + placedAssetCount + ')';
        unPlacedHeaderForCount.innerHTML = '(' + unplacedAssetCount + ')';
      }
    };

    var removableElem;

    var removeSelectItemBtn = document.getElementById('deleteBtn');
    removeSelectItemBtn
      ? removeSelectItemBtn.addEventListener('click', removeSelectedBtnFn)
      : '';

    var removeSelectedBtnFn = function () {
      removableElem.remove();
    };

    function reformPlacedDesk(id) {
      reformPlacedId.push(String(id));
      const elem = document.getElementById(`${id}`);
      if (elem !== null) {
        elem.getElementsByClassName('placed_div')[0]
          ? (elem.getElementsByClassName('placed_div')[0].style.display =
              'block')
          : '';
        elem.getElementsByClassName('placed_div')[0]
          ? (elem.getElementsByClassName('unplaced_div')[0].style.display =
              'none')
          : '';
        elem.setAttribute('draggable', false);
        elem.classList.remove('hide');
        elem.classList.remove('unplaced_Element');
        elem.classList.add('placed_Element');
        placed_desks?.appendChild(elem);
      }

      canvasValid = false;
    }

    function myClick(e) {
      getMouse(e);
      var l = boxes2.length;
    }

    // to get asset image after save
    function selectImage(typeId, nameId, type) {
      switch (typeId) {
        case 1: {
          if (nameId == 1)
            return {
              img: singledesk_img,
              select: singledesk_select_img,
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
          if (nameId == 15)
            return {
              img: regularl_img,
              select: regularl_select_img,
              img_type: 'image',
            };
          if (nameId == 6)
            return {
              img: shape5_img,
              select: shape5_select_img,
              img_type: 'image',
            };
          if (nameId == 16)
            return {
              img: regularc_img,
              select: regularc_select_img,
              img_type: 'image',
            };
        }
        case 2: {
          if (nameId == 17)
            return {
              img: room_xxs,
              select: room_xxs_select,
              img_type: 'image',
            };
          if (nameId == 7)
            return {
              img: room_xs,
              select: room_xs_select,
              img_type: 'image',
            };
          if (nameId == 2)
            return {
              img: room_img,
              select: room_select_img,
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
        }
        case 3: {
          if (nameId == 3)
            return {
              img: parking_img,
              select: parking_img_select,
              img_type: 'image',
            };
        }
        case 4: {
          if (nameId == 11)
            return { img: stairs_img, select: stairs_img, img_type: 'image' };
          if (nameId == 12)
            return { img: lifts_img, select: lifts_img, img_type: 'image' };
          if (nameId == 13)
            return { img: doors_img, select: doors_img, img_type: 'image' };
          if (nameId == 14)
            return { img: windows_img, select: windows_img, img_type: 'image' };
          if (nameId == 18)
            return { img: onewayroadR, select: onewayroadR, img_type: 'image' };
          if (nameId == 19)
            return { img: onewayroadL, select: onewayroadL, img_type: 'image' };
          if (nameId == 20)
            return { img: twowayroad, select: twowayroad, img_type: 'image' };
          if (nameId == 21)
            return {
              img: twowayroad90,
              select: twowayroad90,
              img_type: 'image',
            };
        }
        default:
          return {
            img: singledesk_img,
            select: singledesk_select_img,
            img_type: 'image',
          };
      }
    }

    const reformData = reformStatic?.reform_details || reformStatic;

    if (
      reformData?.length > 0 &&
      reformData != 'No data' &&
      reformData != 'error'
    ) {
      reformData?.map((i, idx) => {
        if (reformData[0]?.asset_label_status) {
          if (reformData[0]?.asset_label_status == 1) {
            labelShowHide = true;
            document.getElementById('hideLabel').style.display = 'block';
            document.getElementById('showLabel').style.display = 'none';
          } else {
            labelShowHide = false;
            document.getElementById('showLabel').style.display = 'block';
            document.getElementById('hideLabel').style.display = 'none';
          }
        }

        if (reformData[0]?.asset_bg_cordinates?.length > 0) {
          img_width = Number(i?.asset_bg_cordinates[0]?.img_width);
          img_height = Number(i?.asset_bg_cordinates[0]?.img_height);
          xp = Number(i?.asset_bg_cordinates[0]?.x);
          yp = Number(i?.asset_bg_cordinates[0]?.y);
          imageCoordinates = { x: xp, y: yp };
          document.getElementById('bg_image_width').value = img_width;
          document.getElementById('bg_image_height').value = img_height;
        }

        if (reformData[0]?.asset_bg !== null && getS3image == false) {
          getS3image = true;
          getImageFroms3Bucket(
            i?.asset_bg,
            'image',
            data => {
              imgBase64 = i?.asset_bg;
              img_new_width = img_width;
              img_new_height = img_height;
              reformbgImage(data);

              bgImage_W_H(img_width, img_height);
              canvas.style.backgroundPositionX = xp + 'px';
              canvas.style.backgroundPositionY = yp + 'px';
            },
            true,
          );
        }

        if (i?.type_info == 'text') {
          texts?.push({
            text: i?.asset_cordinates[0]?.text,
            x: i?.asset_cordinates[0]?.x,
            y: i?.asset_cordinates[0]?.y,
            style: i?.asset_cordinates[0]?.style,
            color: '#000000',
            bold: i?.asset_cordinates[0]?.bold,
            italic: i?.asset_cordinates[0]?.italic,
            underline: i?.asset_cordinates[0]?.underline,
            height: i?.asset_height,
            width: i?.asset_width,
            size: i?.asset_cordinates[0]?.size,
            r: i?.asset_degree,
          });
        } else if (i?.type_info == 'solid' || i?.type_info == 'dash') {
          existingLines.push({
            startX: i?.asset_cordinates[0][0]['startX'],
            startY: i?.asset_cordinates[0][0]['startY'],
            endX: i?.asset_cordinates[0][0]['endX'],
            endY: i?.asset_cordinates[0][0]['endY'],
            type: i?.type_info,
          });
        } else if (i?.type_info == 'zone' && i?.asset_cordinates[0].points) {
          polygons.push({
            points: i?.asset_cordinates[0].points,
            rects: i?.asset_cordinates[0].rects,
            polygonTouch: false,
            zoneName: i?.asset_zone_name || i?.asset_label,
            zone_id: i?.asset_zone_id || null,
            r: 0,
          });
        } else {
          const x = i?.asset_cordinates[0][0]['x'];
          const y = i?.asset_cordinates[0][0]['y'];
          const w = i?.asset_width;
          const h = i?.asset_height;
          const r = Number(i?.asset_degree);
          const type = i?.type_info;
          const asset_name_id = i?.asset_name_id || null;
          const assettype = i?.asset_type || null;
          const assetId = i?.asset_id || null;
          const assetText = i?.asset_label || null;

          const excludeShapes = ['square', 'lshaped', 'cshaped'];
          const placedAsset = document.getElementById(`${assetId}`);

          if (excludeShapes.includes(i?.type_info))
            addRect(
              x - 0,
              y - 0,
              w,
              h,
              'rgba(190, 200, 254,0.7)',
              i?.type_info,
              '',
              '',
              '',
              '',
              '',
              '',
              r,
            );

          if (!excludeShapes.includes(i?.type_info)) {
            const imageData = selectImage(assettype, asset_name_id, type);
            addRect(
              x - 0,
              y - 0,
              w,
              h,
              'rgba(220,205,65,0.7)',
              imageData?.img_type,
              imageData?.img,
              imageData?.select,
              assetId,
              assetText,
              assettype,
              asset_name_id,
              '',
              r,
            );
          }

          if (i?.asset_id != null) {
          }
        }
      });
    }

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
        x: x + 250,
        y: y,
        d: 'o',
      });
      points.push({
        x: x + 300,
        y: y,
        d: 'e',
      });
      points.push({
        x: x + 300,
        y: y + 250,
        d: 'o',
      });
      points.push({
        x: x + 300,
        y: y + 300,
        d: 'e',
      });
      points.push({
        x: x + 250,
        y: y + 300,
        d: 'o',
      });
      points.push({
        x: x,
        y: y + 300,
        d: 'e',
      });
      points.push({
        x: x,
        y: y + 250,
        d: 'o',
      });
      points.push({
        x: x,
        y: y,
        d: 'e',
      });
      return points;
    };

    function drawRotatedRect(x, y, width, height, degrees) {
      // first save the untranslated/unrotated context
      ctx.save();

      ctx.beginPath();
      // move the rotation point to the center of the rect
      ctx.translate(x + width / 2, y + height / 2);
      // rotate the rect
      ctx.rotate((degrees * Math.PI) / 180);

      // draw the rect on the transformed context
      // Note: after transforming [0,0] is visually [x,y]
      //       so the rect needs to be offset accordingly when drawn

      ctx.fillStyle = 'rgba(0,0,255,0.5)';
      ctx.fillRect(0, 0, width, height);

      // restore the context to its untranslated/unrotated state
      ctx.restore();
    }

    /// ////////////////////// dummy end ////////////////////////////////

    // If you dont want to use <body onLoad='init()'>
    // You could uncomment this init() reference and place the script reference inside the body tag
    // init();
    window.init2 = init2;
  })(window);

  // Andy added, as a replacement for
  // <body onLoad="init2()">
  $(document).ready(function () {
    // Your code here
    init2();
  });

  var placedCountFun = id => {
    const floor_id = id || floorType;
    var unplacedAssetCount = 0;
    var placedAssetCount = 0;

    if (locationClassName?.length > 0) {
      if (
        Object.keys(
          locationClassName[0]?.childNodes[1]?.childNodes[0]?.children,
        ).length > 0
      ) {
        const placedsliceData =
          locationClassName[0]?.childNodes[1]?.childNodes[0]?.children;
        const placedSliceRes = Object.fromEntries(
          Object.entries(placedsliceData)?.slice(1),
        );
        const placedSliceArr = Object.entries(placedSliceRes);
        placedAssetCount = floor_id
          ? placedSliceArr?.filter(r => r[1]?.getAttribute('type') == floor_id)
              ?.length
          : 0;
      }

      if (
        Object.keys(
          locationClassName[1]?.childNodes[1]?.childNodes[0]?.children,
        ).length > 0
      ) {
        const unplacedsliceData =
          locationClassName[1]?.childNodes[1]?.childNodes[0]?.children;
        const unplacedSliceRes = Object.fromEntries(
          Object.entries(unplacedsliceData)?.slice(0, -1),
        );
        const unplacedSliceArr = Object.entries(unplacedSliceRes);
        unplacedAssetCount = floor_id
          ? unplacedSliceArr?.filter(
              r => r[1]?.getAttribute('type') == floor_id,
            )?.length
          : 0;
      }
      var placedHeaderForCount =
        locationClassName[0]?.childNodes[0]?.childNodes[0]?.children[0];
      var unPlacedHeaderForCount =
        locationClassName[1]?.childNodes[0]?.childNodes[0]?.children[0];
      placedHeaderForCount.innerHTML = '(' + placedAssetCount + ')';
      unPlacedHeaderForCount.innerHTML = '(' + unplacedAssetCount + ')';
    }
  };

  var getDefaultCarousel = function () {
    var workspaceSelected = [];
    var roomSelected = [];
    var parkingSelected = [];
    var finalWorkspace;
    workspaceSelected = document.getElementsByClassName('floor-workspace')
      ? document.getElementsByClassName('floor-workspace')
      : [];

    for (var i = 0; i < workspaceSelected?.length; i++) {
      var parentID = workspaceSelected[i]?.parentNode?.parentNode;
      parentID?.classList?.remove('center');
      if (workspaceSelected[i]?.children[0]?.id == 'draw_shape3') {
        var parentID2 = workspaceSelected[i]?.parentNode?.parentNode;
        parentID2?.classList?.add('center');
        finalWorkspace = workspaceSelected[i];
      }
    }
    roomSelected = document.getElementsByClassName('floor-room')
      ? document.getElementsByClassName('floor-room')
      : [];
    parkingSelected = document.getElementsByClassName('floor-parking')
      ? document.getElementsByClassName('floor-parking')
      : [];
    if (floorType == 1) {
      var parentID = finalWorkspace?.parentNode?.parentNode;
      parentID?.classList?.add('center');
      shapeClickedForDrag = true;
      tempVarToClickShape = finalWorkspace?.children[0]?.id;
    } else if (floorType == 2) {
      var parentID = roomSelected[0]?.parentNode?.parentNode;
      parentID?.classList.add('center');
      shapeClickedForDrag = true;
      tempVarToClickShape = roomSelected[0]?.children[0]?.id;
    } else if (floorType == 3) {
      var parentID = parkingSelected[0]?.parentNode?.parentNode;
      parentID?.classList.add('center');
      shapeClickedForDrag = true;
      tempVarToClickShape = parkingSelected[0]?.children[0]?.id;
    }
  };

  function setFloorTypeFun(id) {
    floorType = id;
    placedCountFun(id);
    getDefaultCarousel();
    dropElement = '';
  }

  var AttachDragTo = (function () {
    var _AttachDragTo = function (el) {
      this.el = el;
      this.mouse_is_down = false;
      this.init();
    };

    _AttachDragTo.prototype = {
      onMousemove: function (e) {
        if (innerMouseDown) {
          if (!this.mouse_is_down) return;
          var tg = e.target,
            x = e.clientX,
            y = e.clientY;
          if (canvasbglock == 0) {
            tg.style.backgroundPositionX = x - this.origin_x + xp + 'px';
            tg.style.backgroundPositionY = y - this.origin_y + yp + 'px';
          }
          if (canvaspanmove == true) {
            tg.style.backgroundPositionX = x - this.origin_x + xp + 'px';
            tg.style.backgroundPositionY = y - this.origin_y + yp + 'px';
          }
        }
      },

      onMousedown: function (e) {
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

        xp = this.origin_bg_pos_x;
        yp = this.origin_bg_pos_y;

        imageCoordinates = { x: this.origin_bg_pos_x, y: this.origin_bg_pos_y };
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
        this.el.addEventListener(
          'mousedown',
          this.onMousedown.bind(this),
          false,
        );
        this.el.addEventListener('mouseup', this.onMouseup.bind(this), false);
        this.el.addEventListener(
          'mousemove',
          this.onMousemove.bind(this),
          false,
        );
      },
    };

    return function (el) {
      new _AttachDragTo(el);
    };
  })();

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
    imageCoordinates = { x: xp, y: yp };
  }

  function bglock() {
    if (setcanvasimage == 1) {
      if (canvasbglock == 0) {
        canvasbglock = 1;
        document.getElementById('bgunlock').style.display = 'none';
        document.getElementById('bglock').style.display = 'block';
        document.getElementById('lockbtn').classList.add('active');
      } else {
        canvasbglock = 0;
        document.getElementById('bgunlock').style.display = 'block';
        document.getElementById('bglock').style.display = 'none';
        document.getElementById('lockbtn').classList.remove('active');
      }
    }
  }

  function removecanvasbg() {
    setcanvasimage = 0;
    refs.canvasGetImage.value = '';
    imgBase64 = '';
    img_height = 0;
    img_width = 0;
    img_new_height = 0;
    img_new_width = 0;
    xp = 0;
    yp = 0;
    imageCoordinates = { x: 0, y: 0 };

    setcanvasimage = 0;
    canvasbglock = 0;

    document.getElementById('lockbtn').classList.remove('active');
    document.getElementById('bgunlock').style.display = 'block';
    document.getElementById('bglock').style.display = 'none';

    document.getElementById('bg_image_width').value = img_width;
    document.getElementById('bg_image_height').value = img_height;

    canvas.classList.add('hide-canvas-bg');
  }

  var gkhead = new Image();
  // bydefault pan is lock

  var lastX = canvas.width / 2,
    lastY = canvas.height / 2;

  var dragStart, dragged;

  var mouse_changed_x = 0;
  var mouse_changed_y = 0;

  canvas.addEventListener(
    'mousedown',
    function (evt) {
      if (canvaspanlock == 0) {
        evt.target.style.cursor = 'grab';
        document.body.style.mozUserSelect =
          document.body.style.webkitUserSelect =
          document.body.style.userSelect =
            'none';
        lastX = evt.offsetX || evt.pageX - canvas.offsetLeft;
        lastY = evt.offsetY || evt.pageY - canvas.offsetTop;
        dragStart = ctx.transformedPoint(lastX, lastY);
        dragged = false;
        canvasValid = false;
      } else {
        canvaspanmove = false;
        evt.target.style.cursor = 'auto';
      }
    },
    false,
  );

  canvas.addEventListener(
    'mousemove',
    function (evt) {
      if (canvaspanlock == 0) {
        evt.target.style.cursor = 'grab';
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
      } else {
        canvaspanmove = false;
      }
    },
    false,
  );

  var last_scale_scroll = 1;
  let last_scale = 1;
  var scale_factor = 0;
  function scalezoom(delta) {
    last_scale_scroll = delta;

    var pt = ctx.transformedPoint(0, 0);
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

  function panlock() {
    mySel = null;
    if (canvaspanlock == 0) {
      canvaspanlock = 1;
      canvaspanmove = true;
    } else {
      canvaspanlock = 0;
      canvaspanmove = false;
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

  function showSave() {
    return {
      boxes2,
      polygons,
      existingLines,
      imgBase64,
      imageCoordinates,
      texts,
      img_new_height,
      img_new_width,
      labelShowHide,
      canvasbg,
    };
  }

  function rotate(x, y, cx, cy, angle, oldr) {
    return [
      (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
      (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy - 2,
    ];
  }

  // Add active class to the current button (highlight it)

  var btns = document.getElementsByClassName('toolSelection')
    ? document.getElementsByClassName('toolSelection')
    : [];
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
      var old_classes = this.className;
      var elems = document.querySelector('.active');
      if (elems !== null) {
      }
      if (old_classes == 'toolSelection active') {
        this.classList.remove('active');
      } else {
        this.className += ' active';
      }
    });
  }

  // Variables

  // Feature detection from Modernizr
  var div = document.createElement('div');

  // Generic onDragOver and onDrop Functions
  function onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

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

    // Add padding and border style widths to offset
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

  function onDrop(event, color) {
    event.preventDefault();
    getMouse(event);

    // Extract id of element and get it's reference
    var id = event.dataTransfer.getData('text/plain');
    var pinkSquaere = document.getElementById(id)
      ? document.getElementById(id)
      : '';

    name_drop = true;
    name_drop_x = mx;
    name_drop_y = my;
    name_drop_id = pinkSquaere;
    canvasValid = false;
  }

  // Draggable Element Functions
  function onDragStartForPinkSquare(event) {
    event.dataTransfer.setData('text/plain', event.target.id); // "draggable-element"
    // define allowed effects
    event.dataTransfer.effectsAllowed = 'move';

    // change cursor style
    event.target.style.cursor = 'move';

    // To possibly create a drag image then hide the original
    setTimeout(() => event.target.classList.add('hide'), 0);
  }

  function onDragEndForPinkSquare(event) {
    event.target.style.cursor = 'pointer';
    event.target.classList.remove('hide');
  }

  function desk_delete() {
    desk_removed = true;
    canvasValid = false;
  }

  function desk_delete_multiple() {
    desk_removed_multiple = true;
    canvasValid = false;
  }

  const redrawPolygon = pointss => {
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
              innerMouseDown = false;
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

        c.font = '14px sans-serif';

        c.fillText(
          zone_name,
          (xmin + xmax) / 2 - ztwidth / 2,
          (ymin + ymax) / 2 + 5,
        );

        /// ///////////////////// Rotation /////////////////////////
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
          c.translate(pxmin + (pxmax - pxmin) / 2, pymin + (pymax - pymin) / 2);
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
        /// ///////////////////// Rotation end ///////////////////////
      }

      pindex = pindex + 1;
      rectss.push(rects);
    });

    canvasValid = false;
    return rectss;
  };

  const getZoneUpdate = data => {
    zoneUpdate = { status: true, data: data };

    if (data.length > 0 && zoneUpdate.status == true) {
      const zoneUpdateIndex =
        history_polygons[history_polygons.length - 1] ||
        polygons[polygons.length - 1];
      const arrToObj = zoneUpdateIndex
        ? zoneUpdateIndex?.map(f => Object.assign({}, f))
        : '';
      const zx =
        arrToObj !== '' &&
        arrToObj.map(obj => {
          const r = data.find(z => z.floorplanzone_id == obj.zone_id);
          return r ? { ...obj, zoneName: r?.floorplanzone_name } : obj;
        });

      polygons = [];
      if (zoneUpdateIndex && zoneUpdateIndex.length > 0) {
        zx.length > 0 &&
          zx.map(c =>
            polygons.push({
              points: c.points,
              rects: c.rects,
              polygonTouch: false,
              zoneName: c.zoneName,
              zone_id: c.zone_id,
              r: 0,
            }),
          );
        zx.length > 0 &&
          zx.map(
            (p, i) =>
              (polygons[i].rects = redrawPolygon(
                polygons.map(({ points }) => points),
              )[i]),
          );
      }
    }

    zoneUpdate.status = false;
  };

  function settextstyle(val) {
    refs.canvasText.style.display = 'none';
    if (mySeltext != null) {
      var i = mySeltext;
      texts[i].style = val?.value;
      canvasValid = false;
    }
  }

  function settextsize(val) {
    if (mySeltext != null) {
      var i = mySeltext;
      texts[i].size = parseInt(val?.value);
      refs.canvasText.style.height = texts[i].size + 'px';
      refs.canvasText.style.fontSize = texts[i].size + 'px';
      refs.canvasText.style.left = texts[i].x + 'px';
      refs.canvasText.style.top = texts[i].y - texts[i].size + 'px';
      refs.canvasTextDiv.style.left = texts[i].x + 'px';
      refs.canvasTextDiv.style.top = texts[i].y - texts[i].size + 'px';

      canvasValid = false;
    }
  }

  const zoneDragStart = zone => {
    cleardragobject();
    draw_zone = {
      status: true,
      zoneId: zone?.floorplanzone_id,
      name: zone?.floorplanzone_name,
    };

    dimg = refs.squareDragImg;

    assetsdrag = true;
  };

  function cleardragobject() {
    draw_wall = false;
    draw_wall_dash = false;
    draw_squareroom = false;
    draw_stairs = false;
    draw_lifts = false;
    draw_doors = false;
    draw_windows = false;
    draw_zone.status = false;
    draw_lshapedroom = false;
    draw_cshapedroom = false;
    draw_singledesk = false;
    draw_room_xxs = false;
    draw_room_xs = false;
    draw_room_s = false;
    draw_room_m = false;
    draw_room_l = false;
    draw_room_xl = false;
    draw_parking = false;
    draw_parking2 = false;
    draw_parking3 = false;
    draw_parking4 = false;
    draw_parking5 = false;
    draw_parking6 = false;
    draw_parking7 = false;
    draw_parking8 = false;
    draw_onewayroadR = false;
    draw_onewayroadL = false;
    draw_twowayroad = false;
    draw_twowayroad90 = false;
    draw_shape2 = false;
    draw_shape3 = false;
    draw_shape4 = false;
    draw_shape5 = false;
    draw_shape6 = false;
    draw_shape7 = false;
    draw_shape8 = false;
    draw_text = false;
    draw_regularc = false;
    draw_regularl = false;
    draw_shape_bg = false;
  }

  const zoneDragEnd = () => {
    cleardragobject();
    showdragicon = false;
    assetsdrag = false;
  };

  return {
    onDragStartForPinkSquare,
    zoneDragEnd,
    zoneDragStart,
    settextstyle,
    settextsize,
    getZoneUpdate,
    onDragEndForPinkSquare,
    desk_delete,
    showSave,
    desk_delete_multiple,
    total_placed,
    total_unplaced,
    scalegrid,
    panlock,
    showgrid,
    showsnap,
    scalezoom,
    showcanvasbg,
    bglock,
    removecanvasbg,
    canvaspanlock,
    setFloorTypeFun,
  };
}
