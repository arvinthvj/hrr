var name_drop = false;
var name_drop_x, name_drop_y, name_drop_id;
var desk_removed = false;
var desk_removed_multiple = false;
var total_placed = 0, total_unplaced = 4;
//var canvasBgImage = false;
//var innerMouseDown = false;
var drawCalled = false;
var labelShowHide = false;
var multiSelectPolygon = false;
var multiSelectID;

(function(window) {

var draw_wall = false;
var draw_wall_dash = false;
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
var draw_shape6 = false;
var draw_shape7 = false;
var draw_shape8 = false;
var draw_shape_bg = false;

var draw_room_xxs = false;
var draw_room_xs = false;
var draw_room_s = false;
var draw_room_m = false;
var draw_room_l = false;
var draw_room_xl = false;

var draw_parking = false;
var draw_parking2 = false;
var draw_parking3 = false;
var draw_parking4 = false;
var draw_parking5 = false;
var draw_parking6 = false;
var draw_parking7 = false;
var draw_parking8 = false;

var draw_onewayroadR = false;
var	draw_onewayroadL = false;
var	draw_twowayroad = false;
var	draw_twowayroad90 = false;

var linetype = 'solid';
var draw_text = false;
var draw_copy = false;
var draw_copy_special = false;
var draw_paste = false;
var draw_drag = false;
var dragisDown = false;
var assetsdrag = false;

var dragstartX;
var dragstartY;
var dragwidth;
var dragheight;
var dragangle = 0;
var drawdragoffsetx, drawdragoffsety;
var draw_drag_move = false;
var dragresizehandle = [];
var history = [];
var history_boxes2 = [];
var history_existingLines = [];
var history_texts = [];
var history_polygons = [];
var prevMultiSelect = [];
var hc = 0;
var hl = 0;
var lhc = 0;
var lhl = 0;
var thc = 0;
var thl = 0;
var phc = 0;
var phl = 0;

var img_width = "";
var img_height = "";
var img_new_width = "";
var img_new_height = "";

// holds all our boxes
var boxes2 = [];
// New, holds the 8 tiny boxes that will be our selection handles
// the selection handles will be in this order:
// 0  1  2
// 3     4
// 5  6  7
var selectionHandles = [];
var multpleselection = [];
var polyMultiSelect = [];

// some text objects
var texts = [];
var selectionHandlestexts = [];
var draw_text_value;
var canvas_text_div = document.getElementById('canvas_text_div');
var canvas_text_x = 0 ;
var canvas_text_y = 0;
// this var will hold the index of the selected text
var selectedText = -1;
var tisFocus = false;
var tfocusIndex = 0;//text.length;
var tisCommandKey = false;
var tselected = false;

// Hold canvas information
var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var INTERVAL = 20;  // how often, in milliseconds, we check to see if a redraw is needed
var showIcons_x = 0;
var showIcons_y = 0;
var showdragicon = false;
var dimg;
var isDrag = false;
var isResizeDrag = false;
var expectResize = -1; // New, will save the # of the selection handle if the mouse is over one.
var mx, my; // mouse coordinates

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
//var canvasValid = false;
var boxes2_selectedindex = null;
// The node (if any) being selected.
// If in the future we want to select multiple objects, this will get turned into an array
var mySel = null;
var mySelline = null;
var mySeltext = null;
var sellineindex = null;
// The selection color and width. Right now we have a red selection with a small width
//var mySelColor = '#CC0000';
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
        top: { startx:0,starty:0,endx:0,endy:0,top:false },
        left: { startx:0,starty:0,endx:0,endy:0,left:false },
        right: { startx:0,starty:0,endx:0,endy:0,right:false },
        bottom: { startx:0,starty:0,endx:0,endy:0,bottom:false }
    };
// since we can drag from anywhere in a node
// instead of just its x/y corner, we need to save
// the offset of the mouse when we start dragging.
var offsetx, offsety;
var lsoffsetx, lsoffsety, leoffsetx, leoffsety;
var toffsetx, toffsety;
// Padding and border style widths for mouse offsets
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
var startX = 0;
var startY = 0;
var mouseX = 0;
var mouseY = 0;
var isDrawing = false;
var existingLines = [];
var existingRectLines = [];
var hasLoaded = false;
var imageX = 50;
var imageY = 50;
var imageWidth, imageHeight, imageRight, imageBottom;
var edittextbox=false;
var oldr=0;
var textUpdateX = 0;
var textUpdateY = 0;
var selectedTextSize = 0;
var multiDragInnerRect = false;
/*--------Arun Variable Declaration Start-------------*/
var tempVarToClickShape;
var addRect;
let selectedShape;
/*--------Arun Variable Declaration Start-------------*/
const image = document.getElementById("canvas_img");
const stairs_img = document.getElementById("stairs_img");
const lifts_img = document.getElementById("lifts_img");
const windows_img = document.getElementById("windows_img");
const doors_img = document.getElementById("doors_img");

const onewayroadL = document.getElementById("onewayroadL");
const onewayroadR = document.getElementById("onewayroadR");
const twowayroad = document.getElementById("twowayroad");
const twowayroad90 = document.getElementById("twowayroad90");

const squareroom_img = document.getElementById("squareroom_img");
const lshapedroom_img = document.getElementById("lshapewall_img");
const cshapedroom_img = document.getElementById("cshapewall_img");
const singledesk_img = document.getElementById("singledesk_img");
const singledesk_select_img = document.getElementById("singledesk_select_img");
const singledesk_withoutText = document.getElementById("singledesk_withoutText_img");
const shape2_img = document.getElementById("shape2_img");
const shape2_select_img = document.getElementById("shape2_select_img");
const shape3_img = document.getElementById("shape3_img");
const shape3_select_img = document.getElementById("shape3_select_img");
const shape4_img = document.getElementById("shape4_img");
const shape4_select_img = document.getElementById("shape4_select_img");
const shape5_img = document.getElementById("shape5_img");
const shape5_select_img = document.getElementById("shape5_select_img");
const shape5_withoutText_img = document.getElementById("shape5_withoutText_img");
const shape_bg = document.getElementById("shape_bg");
const shape_bg_select = document.getElementById("shape_bg_select");

const parking_img = document.getElementById("parking_img");
const parking_img_select = document.getElementById("parking_img_select");
const parking_withoutText_img = document.getElementById("parking_withoutText_img");

const room_xxs = document.getElementById("room_xxs");
const room_xxs_select = document.getElementById("room_xxs_select");
const room_xxs_withoutText_img = document.getElementById("room_xxs_withoutText_img");

const room_xs = document.getElementById("room_xs");
const room_xs_select = document.getElementById("room_xs_select");
const room_xs_withoutText_img = document.getElementById("room_xs_withoutText_img");

const room_img = document.getElementById("room_img");
const room_img_select = document.getElementById("room_img_select");
const room_img_withoutText_img = document.getElementById("room_img_withoutText_img");

const room_m = document.getElementById("room_m");
const room_m_select = document.getElementById("room_m_select");
const room_m_withoutText_img = document.getElementById("room_m_withoutText_img");

const room_l = document.getElementById("room_l");
const room_l_select = document.getElementById("room_l_select");
const room_l_withoutText_img = document.getElementById("room_l_withoutText_img");

const room_xl = document.getElementById("room_xl");
const room_xl_select = document.getElementById("room_xl_select");
const room_xl_withoutText_img = document.getElementById("room_xl_withoutText_img");

const canvasGetImage = document.getElementById("canvas_getimage");

/* document.getElementById("draw_undo").disabled = true;
document.getElementById("draw_redo").disabled = true; */
var count_step = 0;
function datahistory(){
	
	count_step = count_step + 1;
	var rects = [];
	if(boxes2.length>0){
		for(var i=0;i<boxes2.length;i++){
			if(boxes2[i] != null){
				//boxes2.push(history[1].boxes[i]);
				var rect = [];
				//new Box2;
				rect.x = boxes2[i].x;
				rect.y = boxes2[i].y;
				rect.w = boxes2[i].w
				rect.h = boxes2[i].h;
				rect.fill = boxes2[i].fill;
				rect.type = boxes2[i].type;
				rect.image = boxes2[i].image;
				rect.selectimage = boxes2[i].selectimage;
				rect.showText = boxes2[i].showText;
				rect.shapecount = boxes2[i].shapecount;
				rect.r = boxes2[i].r;
				//rect.showText = showText;
				//var l = boxes2.length;
				//rect.index = l;
				rect.index = boxes2[i].index;
				rects.push(rect);
			}
		}
		history_boxes2.push(rects);
		//console.log("dontkill::"+boxes2+"::history::"+history_boxes2);
	}
	
	var hlines = [];
	if(existingLines.length>0){
		for(var i=0;i<existingLines.length;i++){
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
	if(texts.length>0){
		for(var i=0;i<texts.length;i++){
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
		//console.log(htexts);
		history_texts.push(htexts);
	}
	
	var hpolygons = [];
	if(polygons.length>0){
		//console.log("datahistory");
		for(var i=0;i<polygons.length;i++){
			var hpolygon = [];
			/*
			polygons.push({
				points: p2,
				rects: rects[1],
				polygonTouch: false,
			});
			*/
			hpolygon.rects = polygons[i].rects;
			hpolygon.polygonTouch = polygons[i].polygonTouch;
			hpolygon.zoneName = polygons[i].zoneName;
			const points = [];
			for(var j=0;j<polygons[i].points.length;j++){
				points.push({
					x: polygons[i].points[j].x,
					y: polygons[i].points[j].y,
					d: polygons[i].points[j].d
				});
			}
			hpolygon.points = points;
			hpolygons.push(hpolygon);
		}
		history_polygons.push(hpolygons);
	}
	
	if(count_step>0){
		
		/* document.getElementById("draw_undo").disabled = false;
		document.getElementById("undo-icon").classList.remove("hide-undo-icon");
		document.getElementById("undo-icon-disabled").classList.add("hide-undo-icon"); */
		//document.getElementById("draw_redo").disabled = false;
		//document.getElementById("redo-icon").classList.remove("hide-undo-icon");
		//document.getElementById("redo-icon-disabled").classList.add("hide-undo-icon");
	}else{
		//document.getElementById("draw_undo").disabled = true;
		//document.getElementById("draw_redo").disabled = true;
		//document.getElementById("undo-icon-disabled").classList.add("hide-undo-icon");
		//document.getElementById(9"redo-icon-disabled").classList.add("hide-undo-icon");
	}
	//console.log(count_step);
	//console.log(history_polygons);
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
}
var tempTextForDelete;
var boxforMultiSelect = [];
function deleteFunction(){
	if(multpleselection != undefined){
		console.log("multpleselection::"+multpleselection);
		console.log("Multiple");
		if(polygonclick == false && selectedText == -1){
			for(let i=0;i<multpleselection.length;i++){
				console.log(multpleselection[i].arrayname);
				if(multpleselection[i].arrayname == "boxes2"){
					boxforMultiSelect.push(multpleselection[i]);
				}
			}
			console.log(boxforMultiSelect);
			console.log(boxes2);
			
			for(let i=0;i<boxforMultiSelect.length;i++){
				if(JSON.stringify(boxes2[i]) === JSON.stringify(boxforMultiSelect[i])){
					selectedElement = i;
					desk_removed == true;
			
					tempTextForDelete = boxforMultiSelect[i].showText; 
					a = document.getElementById(''+tempTextForDelete);
					existingAssignText = true;
					
					if(boxforMultiSelect[i].image.id == "singledesk_img" || boxforMultiSelect[i].image.id == "singledesk_select_img" || boxforMultiSelect[i].image.id == "singledesk_withoutText_img" || boxforMultiSelect[i].image.id == "shape5_img" || boxforMultiSelect[i].image.id == "shape5_select_img" || boxforMultiSelect[i].image.id == "shape5_withoutText_img"){
						unassignDeskFun(a);
					}
					if(boxforMultiSelect[i].image.id == "room_xxs" || boxforMultiSelect[i].image.id == "room_xxs_select" || boxforMultiSelect[i].image.id == "room_xxs_withoutText_img" || boxforMultiSelect[i].image.id == "room_xs" || boxforMultiSelect[i].image.id == "room_xs_select" || boxforMultiSelect[i].image.id == "room_xs_withoutText_img" || boxforMultiSelect[i].image.id == "room_img" || boxforMultiSelect[i].image.id == "room_img_select" || boxforMultiSelect[i].image.id == "room_img_withoutText_img" || boxforMultiSelect[i].image.id == "room_m" || boxforMultiSelect[i].image.id == "room_m_select" || boxforMultiSelect[i].image.id == "room_m_withoutText_img" || boxforMultiSelect[i].image.id == "room_l" || boxforMultiSelect[i].image.id == "room_l_select" || boxforMultiSelect[i].image.id == "room_l_withoutText_img" || boxforMultiSelect[i].image.id == "room_xl" || boxforMultiSelect[i].image.id == "room_xl_select" || boxforMultiSelect[i].image.id == "room_xl_withoutText_img"){
						unassignDeskFun_2(a);
					}
					if(boxforMultiSelect[i].image.id == "parking_img" || boxforMultiSelect[i].image.id == "parking_img_select" || boxforMultiSelect[i].image.id == "parking_withoutText_img"){
						unassignDeskFun_3(a);
					}
					objectRemoveFun(selectedElement);
				}
			}	
		}
	
		if(sellineindex != null && sellineindex != undefined){
			//console.log("callledddd");
			if(polygonclick == false){
				selectedlineToDelete = sellineindex;
				linesDelete = true;
				lineDeleteFun(selectedlineToDelete);
			} 
		}/* */
		if(selectedText != -1){
			//console.log(selectedText);
			if(polygonclick == false){
				selectedTextToDelete = selectedText;
				textDeleteFun(selectedTextToDelete);
			}
		}
		if(selectedPoint != undefined){
			//console.log(selectedPoint);
			if(polygonclick != false){
				for(let k=0;k<polygons.length;k++){
					if(JSON.stringify(polygons[k].points) === JSON.stringify(selectedPoint)){
						selectedZoneToDelete = k;
					}
				}
				zoneDeleteFun(selectedZoneToDelete);
			}
		}
		dragstartX=0;
		dragstartY=0;
		dragwidth=0;
		dragheight=0;
		multpleselection = [];
		draw_drag = false;
		multiDragInnerRect = false;
		document.getElementById('draw_drag').classList.remove("active");
	}else{
		if(selectedShape != undefined && mySel != null && sellineindex == null){
			if(polygonclick == false && selectedText == -1){
				for(let i=0;i<boxes2.length;i++){
					if(JSON.stringify(boxes2[i]) === JSON.stringify(selectedShape)){
						selectedElement = i;
					}
				}
				desk_removed == true;
				
				tempTextForDelete = selectedShape.showText;
				a = document.getElementById(''+tempTextForDelete);
				existingAssignText = true;
				
				if(selectedShape.image.id == "singledesk_img" || selectedShape.image.id == "singledesk_select_img" || selectedShape.image.id == "singledesk_withoutText_img" || selectedShape.image.id == "shape5_img" || selectedShape.image.id == "shape5_select_img" || selectedShape.image.id == "shape5_withoutText_img"){
					unassignDeskFun(a);
				}
				if(selectedShape.image.id == "room_xxs" || selectedShape.image.id == "room_xxs_select" || selectedShape.image.id == "room_xxs_withoutText_img" || selectedShape.image.id == "room_xs" || selectedShape.image.id == "room_xs_select" || selectedShape.image.id == "room_xs_withoutText_img" || selectedShape.image.id == "room_img" || selectedShape.image.id == "room_img_select" || selectedShape.image.id == "room_img_withoutText_img" || selectedShape.image.id == "room_m" || selectedShape.image.id == "room_m_select" || selectedShape.image.id == "room_m_withoutText_img" || selectedShape.image.id == "room_l" || selectedShape.image.id == "room_l_select" || selectedShape.image.id == "room_l_withoutText_img" || selectedShape.image.id == "room_xl" || selectedShape.image.id == "room_xl_select" || selectedShape.image.id == "room_xl_withoutText_img"){
					unassignDeskFun_2(a);
				}
				if(selectedShape.image.id == "parking_img" || selectedShape.image.id == "parking_img_select" || selectedShape.image.id == "parking_withoutText_img"){
					unassignDeskFun_3(a);
				}
				objectRemoveFun(selectedElement);
			}
		}	
		if(sellineindex != null && sellineindex != undefined){
			//console.log("callledddd");
			if(polygonclick == false){
				selectedlineToDelete = sellineindex;
				linesDelete = true;
				lineDeleteFun(selectedlineToDelete);
			} 
		}/* */
		if(selectedText != -1){
			//console.log(selectedText);
			if(polygonclick == false){
				selectedTextToDelete = selectedText;
				textDeleteFun(selectedTextToDelete);
			}
		}
		if(selectedPoint != undefined){
			//console.log(selectedPoint);
			if(polygonclick != false){
				for(let k=0;k<polygons.length;k++){
					if(JSON.stringify(polygons[k].points) === JSON.stringify(selectedPoint)){
						selectedZoneToDelete = k;
					}
				}
				zoneDeleteFun(selectedZoneToDelete);
			}
		}
	}	
}
function lineDeleteFun(selectedlineToDelete){
	var k = selectedlineToDelete;
	existingLines.splice(k,1);
	linesDelete = false;
	sellineindex = null;
	mySelline = null;
	console.log(existingLines);
	redraw();
	
}
function zoneDeleteFun(selectedZoneToDelete){
	var j = selectedZoneToDelete;
	polygons.splice(j,1);
	polygonclick = false;
	console.log(polygons);
	redraw();
}
function textDeleteFun(selectedTextToDelete){
	document.getElementById('canvas_text_div').style.display = 'none';
	document.getElementById('canvas_text').style.display = "none";
	var k = selectedTextToDelete;
	texts.splice(k,1);
	selectedText = -1;
	console.log(texts);
	redraw();
}
function objectRemoveFun(selectedElement){
	var i = selectedElement;
	if(boxes2[i].type != "square" && boxes2[i].type != "lshaped" && boxes2[i].type != "cshaped"){
		if(boxes2[i].image.id != "stairs_img" && boxes2[i].image.id != "lifts_img" && boxes2[i].image.id != "doors_img" && boxes2[i].image.id != "windows_img"){
			/* var desk_id = boxes2[i].showText;
			desk_id = 'Desk-'+desk_id;
			
			var pinkSquaere = document.getElementById(desk_id);
			pinkSquaere.getElementsByClassName('desk_active')[0].style.display = 'none';
			pinkSquaere.getElementsByClassName('desk_remove_active')[0].style.display = 'none';
			
			pinkSquaere.getElementsByClassName('unplaced_div')[0].style.display = 'block';
			pinkSquaere.getElementsByClassName('placed_div')[0].style.display = 'none';
			var unplaced_desks = document.getElementById("unplaced_desks");
			unplaced_desks.appendChild(pinkSquaere);
			pinkSquaere.setAttribute('draggable', true);
			boxes2[i].id = null; */
		}
	}
	boxes2.splice(i, 1);
	for(var k=i;k<boxes2.length;k++){
		boxes2[k].index = k;
	}
	boxes2_selectedindex = null;
	selectedElement = null;
	mySel = null;
	invalidate();
	desk_removed = false;
	placedCountFun();
	linesDelete = false
}

document.getElementById('labelShowHide').onclick=function (e) {
	(labelShowHide) ? labelShowHide = false : labelShowHide = true;
	redraw();
	//console.log(labelShowHide);
}
var undo_count = 0;
/* document.getElementById('draw_undo').onclick=function (e) {
	if(undo_count < count_step){
        undo_count = undo_count + 1;
		undo_redo('undo');
	}else{
		document.getElementById("draw_undo").disabled = true;
	    document.getElementById("undo-icon").classList.add("hide-undo-icon");
	    document.getElementById("undo-icon-disabled").classList.remove("hide-undo-icon");
	}
	document.getElementById("draw_redo").disabled = false;
	document.getElementById("redo-icon").classList.remove("hide-undo-icon");
	document.getElementById("redo-icon-disabled").classList.add("hide-undo-icon");
}
document.getElementById('draw_redo').onclick=function (e) {
	if(undo_count>0){
	  undo_count = undo_count - 1;
	  undo_redo('redo');
	}else{
		document.getElementById("draw_redo").disabled = true;
		document.getElementById("redo-icon").classList.add("hide-undo-icon");
		document.getElementById("redo-icon-disabled").classList.remove("hide-undo-icon");
		document.getElementById("draw_undo").disabled = false;
		document.getElementById("undo-icon").classList.remove("hide-undo-icon");
		document.getElementById("undo-icon-disabled").classList.add("hide-undo-icon");
	}
} */
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
	this.showText = "";
	this.shapecount = 0;
	this.id = null;
}
// New methods on the Box class
Box2.prototype = {
	// we used to have a solo draw function
	// but now each box is responsible for its own drawing
	// mainDraw() will call this with the normal canvas
	// myDown will call this with the ghost canvas with 'black'
	draw: function(context, optionalColor) {
		//alert();
		//console.log(context, optionalColor);
		if (context === gctx) {
			context.fillStyle = 'black'; // always want black for the ghost canvas
		} else {
			context.fillStyle = this.fill;
		}
		// We can skip the drawing of elements that have moved off the screen:
		/* function killed by Arun */
			//if (this.x > WIDTH || this.y > HEIGHT) return;
			//if (this.x + this.w < 0 || this.y + this.h < 0) return;
		/* function killed by Arun */
		//context.fillRect(this.x,this.y,this.w,this.h);
		context.strokeStyle = myRectColor;
		context.lineWidth = 10;
		context.save();
		context.translate(this.x+(this.w/2), this.y+(this.h/2));
		//console.log(this.r);
		context.rotate(this.r);
		context.translate(-(this.x+(this.w/2)), -(this.y+(this.h/2)));
		context.setLineDash([]);
		if(context === gctx){
			//context.fillRect(this.x,this.y,this.w,this.h);
		}
		if(this.type=='image'){
			if(boxes2_selectedindex != null && this.index==boxes2_selectedindex){
				if(this.image == singledesk_img){
					//console.log("singledesk_img:1:"+this.showText);
					(this.showText != '') ? this.image = singledesk_img : this.image = singledesk_withoutText;
				}else if(this.image == shape5_img){
					//console.log("shape5_img");
					(this.showText != '') ? this.image = shape5_img : this.image = shape5_withoutText_img;
				}
				context.drawImage(this.selectimage, this.x, this.y, this.w, this.h);
				context.font = "12px Arial";
				(labelShowHide) ? context.fillStyle = "rgba(0, 0, 0, 0.001)" : context.fillStyle = "rgba(0, 0, 0, 1)" ;
				let metrics = context.measureText(this.showText);
				let xPosForText = this.w-Number(metrics.width)/2;
				let fontHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;//metrics.fontBoundingBoxAscent + 
				context.fillText(""+this.showText,this.x+Math.round((this.w-Number(metrics.width))/2),this.y+(Math.round(this.h-fontHeight)/2)+fontHeight);
			}else{
				if(this.image == singledesk_img){
					//console.log("singledesk_img:2:"+this.showText);
					(this.showText != '') ? this.image = singledesk_img : this.image = singledesk_withoutText;
				}else if(this.image == shape5_img){
					//console.log("shape5_img");
					(this.showText != '') ? this.image = shape5_img : this.image = shape5_withoutText_img;
				}
				context.drawImage(this.image, this.x, this.y, this.w, this.h);
				context.font = "12px Arial";
				(labelShowHide) ? context.fillStyle = "rgba(0, 0, 0, 0.001)" : context.fillStyle = "rgba(0, 0, 0, 1)" ;
				let metrics = context.measureText(this.showText);
				let xPosForText = this.w-Number(metrics.width)/2;
				let fontHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
				context.fillText(""+this.showText,this.x+Math.round((this.w-Number(metrics.width))/2),this.y+(Math.round(this.h-fontHeight)/2)+fontHeight);
			}
		}
		else if(this.type=='zone'){
			console.log('zone');
			context.fillRect(this.x,this.y,this.w,this.h);
		}
		else if(this.type=='square'){	
			//console.log("square::"+this.w,this.h);		
			context.beginPath();
			context.strokeStyle = '#777';
			context.lineWidth = 2;
			context.moveTo(this.x+this.w, this.y+this.h);
			context.lineTo(this.x, this.y+this.h);
			context.lineTo(this.x, this.y);
			context.lineTo(this.x+this.w, this.y);
			context.lineTo(this.x+this.w, this.y+this.h);
			context.stroke();
			
			context.beginPath();
			context.strokeStyle = '#777';
			context.lineWidth = 2;
			context.moveTo(this.x+this.w-7, this.y+this.h-7);
			context.lineTo(this.x+7, this.y+(this.h-7));
			context.lineTo(this.x+7, this.y+7);
			context.lineTo(this.x+(this.w-7), this.y+7);
			context.lineTo(this.x+(this.w-7), this.y+(this.h-7));
			context.stroke();
			
			context.beginPath();
			context.strokeStyle = '#EEEEEE';
			context.lineWidth = 5;
			context.moveTo(this.x+this.w-3.5, this.y+this.h-3.5);
			context.lineTo(this.x+3.5, this.y+this.h-3.5);
			context.lineTo(this.x+3.5, this.y+3.5);
			context.lineTo(this.x+(this.w-3.5), this.y+3.5);
			context.lineTo(this.x+(this.w-3.5), this.y+this.h-3.5);
			context.stroke();
		}
		else if(this.type=='lshaped'){
			//console.log("lshaped::"+this.w,this.h);	
			context.beginPath();
			context.strokeStyle = '#777';
			context.lineWidth = 2;
			context.moveTo(this.x+this.w, this.y+this.h);
			context.lineTo(this.x, this.y+this.h);
			context.lineTo(this.x, this.y);
			context.lineTo(this.x+(this.w/2), this.y);
			context.lineTo(this.x+(this.w/2), this.y+(this.h/2));
			context.lineTo(this.x+this.w, this.y+(this.h/2));
			context.lineTo(this.x+this.w, this.y+this.h);
			context.stroke();
			
			context.beginPath();
			context.strokeStyle = '#777';
			context.lineWidth = 2;
			context.moveTo(this.x+this.w-7, this.y+this.h-7);
			context.lineTo(this.x+7, this.y+(this.h-7));
			context.lineTo(this.x+7, this.y+7);
			context.lineTo(this.x+((this.w/2)-7), this.y+7);
			context.lineTo(this.x+((this.w/2)-7), this.y+((this.h/2)+7));
			context.lineTo(this.x+(this.w-7), this.y+((this.h/2)+7));
			context.lineTo(this.x+(this.w-7), this.y+(this.h-7));
			context.stroke();
			
			context.beginPath();
			context.strokeStyle = '#EEEEEE';
			context.lineWidth = 5;
			context.moveTo(this.x+this.w-3.5, this.y+this.h-3.5);
			context.lineTo(this.x+3.5, this.y+this.h-3.5);
			context.lineTo(this.x+3.5, this.y+3.5);
			context.lineTo(this.x+((this.w/2)-3.5), this.y+3.5);
			context.lineTo(this.x+((this.w/2)-3.5), this.y+(this.h/2)+3.5);
			context.lineTo(this.x+(this.w-3.5), this.y+(this.h/2)+3.5);
			context.lineTo(this.x+(this.w-3.5), this.y+(this.h-3.5));
			context.stroke();
		}
		else if(this.type=='cshaped'){
			//console.log("cshaped::"+this.w,this.h);	
			context.beginPath();
			context.strokeStyle = '#777';
			context.lineWidth = 2;
			context.moveTo(this.x, this.y+this.h);
			context.lineTo(this.x+7, this.y+this.h);
			context.lineTo(this.x+7, this.y+7);
			context.lineTo(this.x+this.w-7, this.y+7);
			context.lineTo(this.x+this.w-7, this.y+this.h);
			context.lineTo(this.x+this.w, this.y+this.h);
			context.lineTo(this.x+this.w, this.y);
			context.lineTo(this.x, this.y);
			context.lineTo(this.x, this.y+this.h);
			context.stroke();
			
			context.beginPath();
			context.strokeStyle = '#EEEEEE';
			context.lineWidth = 5;
			context.moveTo(this.x+4, this.y+this.h-4);
			context.lineTo(this.x+4, this.y+4);
			context.lineTo(this.x+this.w-4, this.y+4);
			context.lineTo(this.x+this.w-4, this.y+this.h-4);
			context.stroke();
		}
		else{
			context.strokeRect(this.x,this.y,this.w,this.h);
		}
		context.restore();
		// draw selection
		// this is a stroke along the box and also 8 new selection handles
		//console.log("mySel:"+mySel);
		//innerMouseDown = false;

		if (mySel === this) {
			//console.log("which is selected?", this);
			innerMouseDown = false;
			selectedShape = this;
			if(isDrag==false){
				context.strokeStyle = mySelColor;
				context.lineWidth = mySelWidth;
				context.save();
				context.translate(this.x+(this.w/2), this.y+(this.h/2));
				context.rotate(this.r);
				context.translate(-(this.x+(this.w/2)), -(this.y+(this.h/2)));
				context.setLineDash([]);
				context.strokeRect(this.x,this.y,this.w,this.h);
				context.restore();
				context.setLineDash([]);
			}
			// draw the boxes
	
			// var half = mySelBoxSize / 2;
			//    8
			// 0  1  2
			// 3     4
			// 5  6  7
	
			// top left, middle, right
			selectionHandles[0].x = this.x-half;
			selectionHandles[0].y = this.y-half;
		
			selectionHandles[1].x = this.x+this.w/2-half;
			selectionHandles[1].y = this.y-half;
		
			selectionHandles[2].x = this.x+this.w-half;
			selectionHandles[2].y = this.y-half;
		
			//middle left
			selectionHandles[3].x = this.x-half;
			selectionHandles[3].y = this.y+this.h/2-half;
		
			//middle right
			selectionHandles[4].x = this.x+this.w-half;
			selectionHandles[4].y = this.y+this.h/2-half;
		
			//bottom left, middle, right
			selectionHandles[6].x = this.x+this.w/2-half;
			selectionHandles[6].y = this.y+this.h-half;
		
			selectionHandles[5].x = this.x-half;
			selectionHandles[5].y = this.y+this.h-half;
		
			selectionHandles[7].x = this.x+this.w-half;
			selectionHandles[7].y = this.y+this.h-half;
		
			selectionHandles[8].x = this.x+this.w/2-half;
			selectionHandles[8].y = this.y-30;

			if(isDrag==false){
				context.fillStyle = mySelBoxColor;
				for (var i = 0; i < 9; i ++) {
					var cur = selectionHandles[i];
					context.save();
					context.translate(this.x+(this.w/2), this.y+(this.h/2));
					context.rotate(this.r);
					context.translate(-(this.x+(this.w/2)), -(this.y+(this.h/2)));
					if(i==8){
						const radius = 6;
						//context.strokeStyle = '#003300';
						context.lineWidth = 2;
						context.beginPath();
						context.setLineDash([]);
						context.moveTo(cur.x+half,cur.y+half);
						context.lineTo(selectionHandles[1].x+half,selectionHandles[1].y+half);
						context.closePath();
						context.stroke();
						context.beginPath();
						context.lineWidth = 2;
						context.arc(cur.x+half, cur.y, radius, 0, 2 * Math.PI, false);
						//context.fillStyle = 'blue';
						context.fill();
						context.stroke();
					}else{
						//context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
						//context.strokeRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
						if(i!=1 && i!=3 && i!=4 && i!=6){
							context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
							context.strokeRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
						}
					}
					context.restore();
				}
			}
			//////////////// Rotation ///////////////////////
			//if(this.r!=null)
			// if(typeof this.r !== 'undefined')
			{
				const newTopLeft = rotate(
					selectionHandles[0].x,
					selectionHandles[0].y,
					this.x+this.w/2-half,
					this.y+this.h/2-half,
					this.r
				);
				selectionHandles[0].x = newTopLeft[0];
				selectionHandles[0].y = newTopLeft[1];
				const newTopCenter = rotate(
					selectionHandles[1].x,
					selectionHandles[1].y,
					this.x+this.w/2-half,
					this.y+this.h/2-half,
					this.r
				);
				selectionHandles[1].x = newTopCenter[0];
				selectionHandles[1].y = newTopCenter[1];
				const newTopRight = rotate(
					selectionHandles[2].x,
					selectionHandles[2].y,
					this.x+this.w/2-half,
					this.y+this.h/2-half,
					this.r
				);
				selectionHandles[2].x = newTopRight[0];
				selectionHandles[2].y = newTopRight[1];
				const newMiddleLeft = rotate(
					selectionHandles[3].x,
					selectionHandles[3].y,
					this.x+this.w/2-half,
					this.y+this.h/2-half,
					this.r
				);
				selectionHandles[3].x = newMiddleLeft[0];
				selectionHandles[3].y = newMiddleLeft[1];
				const newMiddleRight = rotate(
					selectionHandles[4].x,
					selectionHandles[4].y,
					this.x+this.w/2-half,
					this.y+this.h/2-half,
					this.r
				);
				selectionHandles[4].x = newMiddleRight[0];
				selectionHandles[4].y = newMiddleRight[1];
				const newBottomLeft = rotate(
					selectionHandles[5].x,
					selectionHandles[5].y,
					this.x+this.w/2-half,
					this.y+this.h/2-half,
					this.r
				);
				selectionHandles[5].x = newBottomLeft[0];
				selectionHandles[5].y = newBottomLeft[1];
				const newBottomCenter = rotate(
					selectionHandles[6].x,
					selectionHandles[6].y,
					this.x+this.w/2-half,
					this.y+this.h/2-half,
					this.r
				);
				selectionHandles[6].x = newBottomCenter[0];
				selectionHandles[6].y = newBottomCenter[1];
				const newBottomRight = rotate(
					selectionHandles[7].x,
					selectionHandles[7].y,
					this.x+this.w/2-half,
					this.y+this.h/2-half,
					this.r
				);
			
				selectionHandles[7].x = newBottomRight[0];
				selectionHandles[7].y = newBottomRight[1];
			
				if(isResizeDrag == false)
				{
					const newTop = rotate(
					selectionHandles[8].x,
					selectionHandles[8].y,
					this.x+this.w/2-half,
					this.y+this.h/2-half,
					this.r
				);
				selectionHandles[8].x = newTop[0];
				selectionHandles[8].y = newTop[1];
				//oldr=this.r;
				}
				// this.x = newTopLeft[0]+half;
				// this.y = newTopLeft[1]+half;
				// this.w = newBottomRight[0] - newTopLeft[0];
				//  this.h = newBottomRight[1] - newTopLeft[1];
			}
		/////////////// End Rotation ////////////////////
		}
	} // end draw

}
/*------------Arun code start-------------*/
/* var owlCarouselClass = document.getElementsByClassName('owl-carousel');
for(let i = 0; i < owlCarouselClass[0].childNodes[7].childNodes[0].childNodes.length;i++){
	owlCarouselClass[0].childNodes[7].childNodes[0].childNodes[i].setAttribute("data-position", (i+1));
	//console.log(owlCarouselClass[0].childNodes[7].childNodes[0].childNodes[i]);
} */
var shapeClickedForDrag = false;
var clickedShapeClasses = document.getElementsByClassName('floor-desk');
for(let i = 0; i < clickedShapeClasses.length;i++){
	clickedShapeClasses[i].addEventListener("click",shapeClick);
}
function shapeClick() {
	shapeClickedForDrag = true;
	for(let i = 0; i < clickedShapeClasses.length;i++){
		var parentID = clickedShapeClasses[i].parentNode.parentNode;
		parentID.classList.remove('center');
		//clickedShapeClasses[i].style.border = "1px solid #474747";
		//clickedShapeClasses[i].style.boxShadow = "";
	}
	var parentID2 = this.parentNode.parentNode;
	parentID2.classList.add('center');
	//console.log(parentID2);
	//owlCarouselClass.addEventListener('to.owl.carousel', parentID2.data('position')); 
	//this.style.border = "2px solid orange";
	//this.style.boxShadow = "0px 0px 12px 0px rgba(245,222,19,0.75)";
	tempVarToClickShape = this.children;
	//console.log("thisChildren",this.children)
}
/*------------Arun code End-------------*/

//Initialize a new Box, add it, and invalidate the canvas
addRect = function(x, y, w, h, fill,type,image,selectimage,showText,shapecount,rotateAng) {
	if(boxes2.length<1){
		//console.log("boxes2.length in addRect::"+boxes2.length,"::hc::",hc);addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		hc = 1;
	}
	var rect = new Box2;
	rect.x = x;
	rect.y = y;
	rect.w = w
	rect.h = h;
	rect.fill = fill;
	rect.type = type;
	rect.image = image;
	rect.selectimage = selectimage;
	var l = boxes2.length;
	rect.index = l;
	rect.r = rotateAng;
	rect.id = null;
	rect.showText = showText;
	rect.shapecount = shapecount;
	boxes2.push(rect);
	invalidate();
}

// initialize our canvas, add a ghost canvas, set draw loop
// then add everything we want to intially exist on the canvas
function init2() {
  canvas = document.getElementById('canvas');
  HEIGHT = canvas.height;
  WIDTH = canvas.width;
  ctx = canvas.getContext('2d');
  ghostcanvas = document.createElement('canvas');
  ghostcanvas.height = HEIGHT;
  ghostcanvas.width = WIDTH;
  gctx = ghostcanvas.getContext('2d');
  hasLoaded = true;

  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.onselectstart = function () { return false; }

  // fixes mouse co-ordinate problems when there's a border or padding
  // see getMouse for more detail
  if (document.defaultView && document.defaultView.getComputedStyle) {
    stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)     || 0;
    stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)      || 0;
    styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
    styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)  || 0;
  }

  // make mainDraw() fire every INTERVAL milliseconds
  //setInterval(mainDraw, INTERVAL);
	window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
	})();
	
    function animate() {
        //var canvas = document.getElementById('canvas');
        //var context = canvas.getContext('2d');
        // update
        // clear
		// context.clearRect(0, 0, canvas.width, canvas.height);
        // draw stuff
		mainDraw();
        // request new frame
        requestAnimFrame(function() {
			animate();
        });
    }
    animate();
	// set our events. Up and down are for dragging,
	// double click is for making new boxes
	canvas.onmousedown = myDown;
	canvas.onmouseup = myUp;
	canvas.ondblclick = myDblClick;
  
	canvas.onmousemove = myMove;//kdcom
	canvas.onmouseover = myOver;//kdcom
	document.addEventListener('keydown', handleCanvasKeys);
	function handleCanvasKeys(event){
		var special = event.ctrlKey || event.shiftKey;
		var key = event.charCode || event.keyCode;
		if (special && key === 67) {
			draw_copy_click = true;
		}else if(special && key === 86){
			copyFunction();
		}else if(special && key === 46){
			deleteFunction();
		}
		//console.log(this);
	}
	if (canvas.addEventListener)
		canvas.addEventListener("DOMMouseScroll", function(event) {
			//alert("DOMMouseScroll");
			//event.preventDefault();
		}, false);
	else
		canvas.attachEvent("mousewheel", function() {
			//alert("mousewheel");
			
			return false;
		})

  canvas.ondragover = onDragOverForOrangeSquare;
  canvas.ondrop = onDropForOrangeSquare;

  // set up the selection handle boxes
  for (var i = 0; i < 9; i ++) {
    var rect = new Box2;
    selectionHandles.push(rect);
    existingRectLines.push(rect);
	selectionHandlestexts.push(rect);
	dragresizehandle.push(rect);
  }

}


//wipes the canvas context
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
		drawPolygon(polygons.map(({points}) => points));
		// draw all boxes
		var l = boxes2.length;
		for (var i = 0; i < l; i++) {
			if(boxes2[i] != null){
				boxes2[i].draw(ctx);
			}
		}
		drawlines();
		// Add stuff you want drawn on top all the time here
		drawtexts();
		drawdrag();
		showIcons();
		drawAlignmentLineCanvas();
		desk_name_drop();
		//desk_active();
		desk_remove();
		desk_remove_multiple();
		canvasValid = true;
	}
}

function myOver(e){
	//alert("myOver");
}
/*------Arun--------*/
/* switch() */
function myDrop(e){
	
	getMouse(e);
	/* if(canvasBgImage == true)
	{
        var width = 400;
        var height = 400;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.2)','canvasBgImage');
		// addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',cshapedroom_img,cshapedroom_img,showTextStore);
		canvasBgImage = false;
		dragdraw = false;
	} */
	if(draw_singledesk == true){
		//console.log("shapedesk");
		var width = 50;//70;
		var height = 32;//45;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		draw_singledesk = false;
		dragdraw = false;
	}
	if(draw_shape2 == true){
		var width = 50;//45;
		var height = 32;//45;
		shapecount = 21;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		draw_shape2 = false;
		dragdraw = false;
	}
	if(draw_shape3 == true){
		var width = 50;//58;
		var height = 32;//45;
		shapecount = 22;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		draw_shape3 = false;
		dragdraw = false;
	}
	if(draw_shape4 == true){
		var width = 50;//70;
		var height = 32;//45;
		shapecount = 3;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		draw_shape4 = false;
		dragdraw = false;
	}
	if(draw_shape5 == true){
		//console.log("shape5");
		var width = 50;//45;
		var height = 32;//45;
		shapecount = 4;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 0;
		addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + width + 6, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		draw_shape5 = false;
		dragdraw = false;
	}	
	if(draw_shape6 == true){
		//console.log("shape5");
		var width = 50;//45;
		var height = 32;//45;
		shapecount = 6;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 0;
		addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 0;
		addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + width + 6, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + width + width + 12, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		draw_shape6 = false;
		dragdraw = false;
	}	
	if(draw_shape7 == true){
		var width = 46;//70;
		var height = 46//45;
		shapecount = 7;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',shape5_img,shape5_select_img,showTextStore,shapecount,rotateAng);
		draw_shape7 = false;
		dragdraw = false;
	}	
	if(draw_shape8 == true){
		//console.log("shape5");
		var width = 50;//45;
		var height = 32;//45;
		shapecount = 8;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 0;
		addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 0;
		addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 0;
		addRect(mx - (width / 2) + width + width + width + 18, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + width + 6, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + width + width + 12, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + width + width + width + 18, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
		draw_shape8 = false;
		dragdraw = false;
	}
	if (draw_room_xxs == true) {
		var width = 35;
		var height = 50;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_xxs,room_xxs_select,showTextStore,shapecount,rotateAng);
		draw_room_xxs = false;
		dragdraw = false;
	}
	if (draw_room_xs == true) {
		var width = 60;
		var height = 50;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_xs,room_xs_select,showTextStore,shapecount,rotateAng);
		draw_room_xs = false;
		dragdraw = false;
	}
	if (draw_room_s == true) {
		var width = 86;
		var height = 50;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_img,room_img_select,showTextStore,shapecount,rotateAng);
		draw_room_s = false;
		dragdraw = false;
	}
	if (draw_room_m == true) {
		var width = 112;
		var height = 50;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_m,room_m_select,showTextStore,shapecount,rotateAng);
		draw_room_m = false;
		dragdraw = false;
	}
	if (draw_room_l == true) {
		var width = 124;
		var height = 50;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_l,room_l_select,showTextStore,shapecount,rotateAng);
		draw_room_l = false;
		dragdraw = false;
	}
	if (draw_room_xl == true) {
		var width = 150;
		var height = 50;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_xl,room_xl_select,showTextStore,shapecount,rotateAng);
		draw_room_xl = false;
		dragdraw = false;
	}
	
	if (draw_parking == true) {
		console.log(draw_parking);
		var width = 36;
		var height = 76;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		draw_parking = false;
		dragdraw = false;
	}
	if (draw_parking2 == true) {
		var width = 36;
		var height = 76;
		shapecount = 21;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		draw_parking2 = false;
		dragdraw = false;
	}
	if (draw_parking3 == true) {
		var width = 36;
		var height = 76;
		shapecount = 22;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		draw_parking3 = false;
		dragdraw = false;
	}
	if (draw_parking4 == true) {
		var width = 36;
		var height = 76;
		shapecount = 3;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
		addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
		addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		draw_parking4 = false;
		dragdraw = false;
	}
	if (draw_parking5 == true) {
		var width = 36;
		var height = 76;
		shapecount = 5;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 0;	
		addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + width + 6, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		draw_parking5 = false;
		dragdraw = false;
	}
	if (draw_parking6 == true) {
		var width = 36;
		var height = 76;
		shapecount = 6;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 0;
		addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 0;
		addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + width + 6, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + width + width + 12, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		draw_parking6 = false;
		dragdraw = false;
	}
	if (draw_parking7 == true) {
		var width = 36;
		var height = 76;
		shapecount = 7;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
		addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		addRect(mx - (width / 2) + 3 * width + 18, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
		addRect(mx - (width / 2) + 4 * width + 24, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		draw_parking7 = false;
		dragdraw = false;
	}
	if (draw_parking8 == true) {
		var width = 36;
		var height = 76;
		shapecount = 8;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
		rotateAng = 0;
		addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 0;
		addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 0;
		addRect(mx - (width / 2) + 3 * width + 18, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
		rotateAng = 0;
		addRect(mx - (width / 2) + 4 * width + 24, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + width + 6, my - (height / 2)+ height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + width + width + 12, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;
		addRect(mx - (width / 2) + 3 * width + 18, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		rotateAng = 3.1359214901292827;	
		addRect(mx - (width / 2) + 4 * width + 24, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
		draw_parking8 = false;
		dragdraw = false;
	}

	if (draw_onewayroadR == true) {
		console.log(draw_onewayroadR);
		var width = 300;
		var height = 50;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',onewayroadR,onewayroadR,showTextStore,shapecount,rotateAng);
		draw_onewayroadR = false;
		dragdraw = false;
	}	
	if (draw_onewayroadL == true) {
		console.log(draw_onewayroadL);
		var width = 300;
		var height = 50;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',onewayroadL,onewayroadL,showTextStore,shapecount,rotateAng);
		draw_onewayroadL = false;
		dragdraw = false;
	}	
	if (draw_twowayroad == true) {
		console.log(draw_twowayroad);
		var width = 301;
		var height = 100;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',twowayroad,twowayroad,showTextStore,shapecount,rotateAng);
		draw_twowayroad = false;
		dragdraw = false;
	}	
	if (draw_twowayroad90 == true) {
		console.log(draw_twowayroad90);
		var width = 251;
		var height = 251;
		shapecount = 1;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',twowayroad90,twowayroad90,showTextStore,shapecount,rotateAng);
		draw_twowayroad90 = false;
		dragdraw = false;
	}
	
	if(draw_shape_bg == true){
		//console.log("shape5");
		var width = 730;//45;
		var height = 624;//45;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',getImagePath,getImagePath,'');
		draw_shape_bg = false;
		dragdraw = false;
	}
	if(draw_squareroom == true)
	{
        var width = 400;
        var height = 400;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','square');
		//addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',squareroom_img,squareroom_img,"");
		draw_squareroom = false;
		dragdraw = false;
	}
	if(draw_stairs == true)
	{
        var width = 60;
        var height = 100;
		showTextStore = "";
		shapecount = 0;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',stairs_img,stairs_img,showTextStore,shapecount,rotateAng);
		draw_stairs = false;
		dragdraw = false;
	}
	if(draw_lifts == true)
	{
        var width = 80;
        var height = 61;
		showTextStore = "";
		shapecount = 0;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',lifts_img,lifts_img,showTextStore,shapecount,rotateAng);
		draw_lifts = false;
		dragdraw = false;
	}

	if(draw_doors == true)
	{
        var width = 50;
        var height = 125;
		showTextStore = "";
		shapecount = 0;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',doors_img,doors_img,showTextStore,shapecount,rotateAng);
		draw_doors = false;
		dragdraw = false;
	}

	if(draw_windows == true)
	{
        var width = 40;
        var height = 60;
		showTextStore = "";
		shapecount = 0;
		rotateAng = 0;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',windows_img,windows_img,showTextStore,shapecount,rotateAng);
		draw_windows = false;
		dragdraw = false;
	}

	if(draw_zone == true) {
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
			//zone_id: zone_id,
			r: 0
		});
		//console.log(":drawZone:"+p1);
		dragdraw = false;
	}

	if(draw_lshapedroom == true){
		var width = 400;
		var height = 400;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','lshaped');
		draw_lshapedroom = false;
		dragdraw = false;
	}

	if(draw_cshapedroom == true)
	{
        var width = 400;
        var height = 400;
		addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','cshaped');
		// addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',cshapedroom_img,cshapedroom_img,showTextStore);
		draw_cshapedroom = false;
		dragdraw = false;
	}  

	if(draw_wall == true)
	{
		existingLines.push({
			startX: mx,
			startY: my-100,
			endX: mx,
			endY: my+100,
			type: 'solid'
		});
		draw_wall = false;
		dragdraw = false;
	}
	if(draw_wall_dash == true)
	{
		existingLines.push({
            startX: mx,
            startY: my-100,
            endX: mx,
            endY: my+100,
            type: 'dash'
        });
		draw_wall_dash = false;
		dragdraw = false;
	}
	myDown(e);
	invalidate();
	myUp(e);
	assetsdrag = false;
 
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Functions for drop zone 1 (Orange Square)

function onDragOverForOrangeSquare(event) {
  onDragOver(event);
}
function onDropForOrangeSquare(event) {
	if(assetsdrag == true){
		myDrop(event);
	}else{
		onDrop(event, "orange");
	}
}
function desk_name_drop(){

	if(name_drop == true){
		clear(gctx);
		var l = boxes2.length;
		for(var i = l-1; i >= 0; i--) {
			//draw shape onto ghost context
			boxes2[i].draw(gctx, 'black');
			//get image data at the mouse x,y pixel
			var imageData = gctx.getImageData(name_drop_x, name_drop_y, 1, 1);
			var index = (name_drop_x + name_drop_y * imageData.width) * 4;
			//if the mouse pixel exists, select and break
			if (imageData.data[3] > 0) {
				/*
				boxes2_selectedindex = -1;
				mySel = null;
				isResizeDrag = false;
				isDrag = false;
				expectResize = -1;
				invalidate();
				mySel = boxes2[i];
				offsetx = name_drop_x - mySel.x;
				offsety = name_drop_y - mySel.y;
				mySel.x = name_drop_x - offsetx;
				mySel.y = name_drop_y - offsety;
				var dx = name_drop_x - (mySel.x+mySel.w/2);
				var dy = name_drop_y - (mySel.y+mySel.h/2);
				var angle = Math.atan2(dy, dx);
				oldr = angle;
				*/
				var old_id = '';
				var desk_id = name_drop_id.getAttribute('desk_id');
				if(boxes2[i].id == null){
					old_id = '';
				}else{
					old_id = boxes2[i].id;
				}
				boxes2[i].id = desk_id;
				//console.log(boxes2);
				//isDrag = true;
				//mySelline = null;
				//boxes2_selectedindex = i;
				invalidate();
				clear(gctx);
				//return;
				name_drop_done(name_drop_id,old_id);
			}
		}
		name_drop = false;
	}
}
var placed_desks = document.getElementById("placed_desks");
function name_drop_done(pinkSquaere,old_id){
	var orangeSquare = document.getElementById("drop-element");
	var pinkSquareContainer = document.getElementsByClassName("draggable-container")[0];
	if (!pinkSquaere.parentNode.isSameNode(orangeSquare)){
		if(old_id==''){
			pinkSquaere.getElementsByClassName('unplaced_div')[0].style.display = 'none';
			pinkSquaere.getElementsByClassName('placed_div')[0].style.display = 'block';
			placed_desks.appendChild(pinkSquaere);
			pinkSquaere.setAttribute('draggable', false);
			total_placed = total_placed + 1;
			document.getElementById('total_placed').innerHTML = '('+total_placed+')';
			total_unplaced = total_unplaced - 1;
			document.getElementById('total_unplaced').innerHTML = '('+total_unplaced+')';
		}else{
			pinkSquaere.getElementsByClassName('unplaced_div')[0].style.display = 'none';
			pinkSquaere.getElementsByClassName('placed_div')[0].style.display = 'block';
			placed_desks.appendChild(pinkSquaere);
			pinkSquaere.setAttribute('draggable', false);
			total_placed = total_placed + 1;
			document.getElementById('total_placed').innerHTML = '('+total_placed+')';
			total_unplaced = total_unplaced - 1;
			document.getElementById('total_unplaced').innerHTML = '('+total_unplaced+')';	
			var pinkSquaered = document.getElementById(old_id);
			pinkSquaered.getElementsByClassName('desk_active')[0].style.display = 'none';
			pinkSquaered.getElementsByClassName('desk_remove_active')[0].style.display = 'none';
			pinkSquaered.getElementsByClassName('unplaced_div')[0].style.display = 'block';
			pinkSquaered.getElementsByClassName('placed_div')[0].style.display = 'none';
			var unplaced_desks = document.getElementById("unplaced_desks");
			unplaced_desks.appendChild(pinkSquaered);
			pinkSquaered.setAttribute('draggable', true);
			total_placed = total_placed - 1;
			document.getElementById('total_placed').innerHTML = '('+total_placed+')';
			total_unplaced = total_unplaced + 1;
			document.getElementById('total_unplaced').innerHTML = '('+total_unplaced+')';
		}
	}
	invalidate();
}


function desk_active(){
	//document.getElementsByClassName('desk_active')[0].style.display = 'none';
	//document.getElementsByClassName('desk_remove_active')[0].style.display = 'none';
	let desk_actives = document.getElementsByClassName('desk_active');
    for (let i = 0; i < desk_actives.length; i++){
      desk_actives[i].style.display = "none";
    }
	let desk_remove_actives = document.getElementsByClassName('desk_remove_active');
    for (let i = 0; i < desk_remove_actives.length; i++){
      desk_remove_actives[i].style.display = "none";
    }
  if(boxes2_selectedindex != null){
	var i = boxes2_selectedindex;
	var desk_id = boxes2[i].id;
	if(desk_id != null){
	var pinkSquaere = document.getElementById(desk_id);
    pinkSquaere.getElementsByClassName('desk_active')[0].style.display = 'block';
	pinkSquaere.getElementsByClassName('desk_remove_active')[0].style.display = 'block';
	}
  }
}

function desk_remove(){
	
  if(boxes2_selectedindex != null && desk_removed == true){
	var i = boxes2_selectedindex;
	var desk_id = boxes2[i].id;
	
	if(desk_id != null){
	var pinkSquaere = document.getElementById(desk_id);
    pinkSquaere.getElementsByClassName('desk_active')[0].style.display = 'none';
	pinkSquaere.getElementsByClassName('desk_remove_active')[0].style.display = 'none';

	pinkSquaere.getElementsByClassName('unplaced_div')[0].style.display = 'block';
	pinkSquaere.getElementsByClassName('placed_div')[0].style.display = 'none';
	var unplaced_desks = document.getElementById("unplaced_desks");
    unplaced_desks.appendChild(pinkSquaere);
    pinkSquaere.setAttribute('draggable', true);
	boxes2[i].id = null;

	boxes2.splice(i, 1);
	for(var k=i;k<boxes2.length;k++){
		boxes2[k].index = k;
	}

	//delete boxes2[i];
	boxes2_selectedindex = null;
	//console.log(boxes2);
	mySel = null;
	//isDrag = false;
	invalidate();
	desk_removed = false;

	total_placed = total_placed - 1;
	document.getElementById('total_placed').innerHTML = '('+total_placed+')';
	total_unplaced = total_unplaced + 1;
	document.getElementById('total_unplaced').innerHTML = '('+total_unplaced+')';

		myDown();
	}

	  invalidate();
  }
}


function desk_remove_multiple(){
	if(desk_removed_multiple == true){
	for (var i = 0; i < multpleselection.length; i++) {
         var arrayname = multpleselection[i].arrayname;
         var arrayindex = multpleselection[i].arrayindex;
         if(arrayname=='boxes2'){
           if(boxes2[arrayindex].id != null){
			   var desk_id = boxes2[arrayindex].id;
			   if(desk_id != null){
	var pinkSquaere = document.getElementById(desk_id);
    pinkSquaere.getElementsByClassName('desk_active')[0].style.display = 'none';
	pinkSquaere.getElementsByClassName('desk_remove_active')[0].style.display = 'none';

	pinkSquaere.getElementsByClassName('unplaced_div')[0].style.display = 'block';
	pinkSquaere.getElementsByClassName('placed_div')[0].style.display = 'none';
	var unplaced_desks = document.getElementById("unplaced_desks");
    unplaced_desks.appendChild(pinkSquaere);
    pinkSquaere.setAttribute('draggable', true);
	boxes2[arrayindex].id = null;
	//boxes2.splice(arrayindex, 1);
	delete boxes2[arrayindex];
	for(var k=arrayindex;k<boxes2.length;k++){
		//boxes2[k].index = k;
	}
	//multpleselection.splice(i,1);
	boxes2_selectedindex = null;

	mySel = null;
	//isDrag = false;
	invalidate();
	//desk_removed_multiple = false;
	total_placed = total_placed - 1;
	document.getElementById('total_placed').innerHTML = '('+total_placed+')';
	total_unplaced = total_unplaced + 1;
	document.getElementById('total_unplaced').innerHTML = '('+total_unplaced+')';
	}
		   }

         }
    }
	boxes2 = boxes2.filter(function(e){return e});
	for(var i=0;i<boxes2.length;i++){
		if(boxes2[i] != null){
		boxes2[i].index = i;
		}
	}
	//console.log(boxes2);
	desk_removed_multiple = false;
	clear_select();
	myDown();
 }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Happens when the mouse is moving inside the canvas
function myMove(e){//kdcom

	if(showdragicon == true){
		getMouse(e);
		showIcons_x = mx;
		showIcons_y = my;
		invalidate();
	}
	if(draw_drag == true && draw_drag_move == false){
		
		draghandleMouseMove(e);
	}
	if(draw_drag_move == true){
		console.log("draw_drag_calling");
		getMouse(e);
		dragstartX = mx - drawdragoffsetx;
		dragstartY = my - drawdragoffsety;
		dragmultipleselection(dragstartX,dragstartY);
		// something is changing position so we better invalidate the canvas!
		invalidate();
	} else if (isResizeMultiDrag) {
		

		var oldx = dragstartX;
		var oldy = dragstartY;
		var originalWidthToHeightRatio = dragwidth/dragheight;
		var oldw = dragwidth;
		var oldh = dragheight;

		switch (expectResizeMultiDrag) {
			case 0:
				dragwidth += oldx - mx;
				dragheight = (dragwidth / originalWidthToHeightRatio);
				dragstartX = oldx - (dragwidth-oldw);
				dragstartY = oldy - (dragheight-oldh);
				resizeMultiDrag('topleft',oldx,oldy,oldw,oldh);
				break;
			case 1:
				dragwidth = mx - oldx;
				dragheight = (dragwidth / originalWidthToHeightRatio);
				dragstartY = oldy - (dragheight-oldh);
				resizeMultiDrag('topright',oldx,oldy,oldw,oldh);
				break;
			case 2:
				dragwidth += oldx - mx;
				dragheight = (dragwidth / originalWidthToHeightRatio);
				dragstartX = oldx - (dragwidth-oldw);
				resizeMultiDrag('bottomleft',oldx,oldy,oldw,oldh);
				break;
			case 3:
				dragwidth = mx - oldx;
				dragheight = (dragwidth / originalWidthToHeightRatio);
				resizeMultiDrag('bottomright',oldx,oldy,oldw,oldh);
				break;
			case 4:
				var dx = mx - (dragstartX+dragwidth/2);
				var dy = my - (dragstartY+dragheight/2);
				var angle = Math.atan2(dy, dx);
				//dragangle = angle - (-1.50);
				resizeMultiDrag('rotate',oldx,oldy,oldw,oldh);
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
			if (mx >= cur.x-5 && mx <= (cur.x+5 + mySelBoxSize) &&
				my >= cur.y-5 && my <= (cur.y+5 + mySelBoxSize)) {
				// we found one!
				expectResizeMultiDrag = i;
				invalidate();
				switch (i) {
					case 0:
						this.style.cursor='nw-resize';
						break;
					case 1:
						this.style.cursor='ne-resize';
						break;
					case 2:
						this.style.cursor='sw-resize';
						break;
					case 3:
						this.style.cursor='se-resize';
						break;
					case 4:
						this.style.cursor='grab';
						break;
				}
				return;
			}
		}
		// not over a selection box, return to normal
		isResizeMultiDrag = false;
		expectResizeMultiDrag = -1;
		this.style.cursor='auto';
	}
	if(draw_wall == true){
		if (hasLoaded) {
            getMouse(e);
            mouseX = mx;// - offsetx;
            mouseY = my;// - offsety;
            if (isDrawing) {
                drawlines();
            }
            invalidate();
        }
	}
	if (isDragline) {
		getMouse(e);
		//var lineendx = mySelline.startX
		mySelline.startX = mx - lsoffsetx;
		mySelline.startY = my - lsoffsety;
		mySelline.endX = mx - leoffsetx;
		mySelline.endY = my - leoffsety;
		this.style.cursor='all-scroll';
		//something is changing position so we better invalidate the canvas!
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
		this.style.cursor='all-scroll';
		// something is changing position so we better invalidate the canvas!
		invalidate();
	}else if (isResizeDrag) {
		// time ro resize!
		var oldx = mySel.x;
		var oldy = mySel.y;
		var originalWidthToHeightRatio = mySel.w/mySel.h;
		var oldw = mySel.w;
		var oldh = mySel.h;
		//var oldr = mySel.r;
		// 0  1  2
		// 3     4
		// 5  6  7
		console.log(expectResize);
		
		switch (expectResize) {
			case 0:
				var maxx = Math.abs(oldx - mx);
				var maxy = Math.abs(oldy - my);
				if(maxx+1000 >= maxy){
					if((mySel.w + oldx - mx) > 30){
						mySel.w += oldx - mx;
						mySel.h = (mySel.w / originalWidthToHeightRatio);
						mySel.x = oldx - (mySel.w-oldw);
						mySel.y = oldy - (mySel.h-oldh);
					}else{
						mySel.w = mx - oldx;
						mySel.h = (mySel.w / originalWidthToHeightRatio);
					}
				}else{
					if((mySel.h + oldy - my) > 30){
						mySel.h += oldy - my;
						mySel.w = mySel.h * originalWidthToHeightRatio;
						mySel.x = oldx - (mySel.w-oldw);
						mySel.y = oldy - (mySel.h-oldh);
					}
				}
			break;
			//case 1:
			//mySel.y = my;
			//mySel.h += oldy - my;
			//break;
			case 2:
				if(mx - oldx > 30){
					mySel.w = mx - oldx;
					mySel.h = (mySel.w / originalWidthToHeightRatio);
					mySel.y = oldy - (mySel.h-oldh);
				}else{
					mySel.w += oldx - mx;
					mySel.h = (mySel.w / originalWidthToHeightRatio);
					mySel.x = oldx - (mySel.w-oldw);
				}
			break;
			//case 3:
			//mySel.x = mx;
			//mySel.w += oldx - mx;
			//break;
			//case 4:
			//mySel.w = mx - oldx;
			//break;
			case 5:
				if((mySel.w + oldx - mx) > 30){
					mySel.w += oldx - mx;
					mySel.h = (mySel.w / originalWidthToHeightRatio);
					mySel.x = oldx - (mySel.w-oldw);
				}else{
					mySel.w = mx - oldx;
					mySel.h = (mySel.w / originalWidthToHeightRatio);
					mySel.y = oldy - (mySel.h-oldh);
				}
			break;
				//case 6:
				//mySel.h = my - oldy;
				//break;
			case 7:
				if(mx - oldx > 30){
					mySel.w = mx - oldx;
					mySel.h = (mySel.w / originalWidthToHeightRatio);
				}else{
					mySel.w += oldx - mx;
					mySel.h = (mySel.w / originalWidthToHeightRatio);
					mySel.x = oldx - (mySel.w-oldw);
					mySel.y = oldy - (mySel.h-oldh);
				}
			break;
			case 8:
				var dx = mx - (mySel.x+mySel.w/2);
				var dy = my - (mySel.y+mySel.h/2);
				var angle = Math.atan2(dy, dx);
				mySel.r = angle - (-1.50);// - 1.39;// - oldr;
			break;
		}
		invalidate();
	}
	getMouse(e);
	//if there's a selection see if we grabbed one of the selection handles
	if(mySel !== null && !isResizeDrag) {
		for (var i = 0; i < 9; i++) {
		  // 0  1  2
		  // 3     4
		  // 5  6  7

		  var cur = selectionHandles[i];

		  // we dont need to use the ghost context because
		  // selection handles will always be rectangles
		  if (mx >= cur.x-5 && mx <= (cur.x+5 + mySelBoxSize) &&
			  my >= cur.y-5 && my <= (cur.y+5 + mySelBoxSize)) {
				  
				// we found one!
				expectResize = i;
				invalidate();

				switch (i) {
					case 0:
						this.style.cursor='nw-resize';
						break;
						// case 1:
						// this.style.cursor='n-resize';
						// break;
					case 2:
						this.style.cursor='ne-resize';
						break;
						//case 3:
						//  this.style.cursor='w-resize';
						// break;
						// case 4:
						//  this.style.cursor='e-resize';
						//  break;
					case 5:
						this.style.cursor='sw-resize';
						break;
						//  case 6:
						//  this.style.cursor='s-resize';
						//  break;
					case 7:
						this.style.cursor='se-resize';
						break;
					case 8:
						this.style.cursor='grab';
						break;
				}
				return;
			}
		}
		//not over a selection box, return to normal
		isResizeDrag = false;
		expectResize = -1;
		if(isDrag == false){
			this.style.cursor='auto';
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
			if (mx >= cur.x-5 && mx <= cur.x-5 + mySelBoxSize &&
				my >= cur.y-5 && my <= cur.y-5 + mySelBoxSize) {
				//we found one!
				expectResizeline = i;
				invalidate();
				switch (i) {
					case 0:
						this.style.cursor='col-resize';
					break;
					case 1:
						this.style.cursor='col-resize';
					break;
					case 2:
						//this.style.cursor='ne-resize';
					break;
				}
				return;
			}
			isResizeDragline = false;
			expectResizeline = -1;
			this.style.cursor='auto';
		}
	}
	//if (selectedText > -1)
	if(isDragtext){
        getMouse(e);
        var text = texts[selectedText];
        text.x = mx-toffsetx;
        text.y = my-toffsety;
	    this.style.cursor='all-scroll';
		innerMouseDown = false;
        invalidate();
    }else if (isResizeDragtext) {
		innerMouseDown = false;
		var oldsize = texts[selectedText].size;
		var oldx = texts[selectedText].x;
		var oldy = texts[selectedText].y;
		var nsize = oldsize + 5;
		 canvas_text_div.style.display = 'none';
		// 0  1  2
		// 3     4
		// 5  6  7
		console.log(expectResizetext);
		switch (expectResizetext) {
			case 0:
				if(mx<oldx){
					nsize = oldsize + (oldx - mx)/20;
					if(nsize>8 && nsize <= 60){
						texts[selectedText].size = nsize;
					}
				}else{
					nsize = oldsize - (mx - oldx)/20;
					if(nsize>8 && nsize <= 60){
						texts[selectedText].size = nsize;
					}
				}
			break;
			case 1:
				if(mx < (oldx + texts[selectedText].width)){
					nsize = oldsize - ((oldx + texts[selectedText].width) - mx)/20;
					if(nsize>8 && nsize <= 60){
						texts[selectedText].size = nsize;
					}
				}else{
					nsize = oldsize + (mx - (oldx + texts[selectedText].width))/20;
					if(nsize>8 && nsize <= 60){
						texts[selectedText].size = nsize;
					}
				}
			break;
			case 2:
				if(mx<oldx){
					nsize = oldsize + (oldx - mx)/20;
					if(nsize>8 && nsize <= 60){
						texts[selectedText].size = nsize;
					}
				}else{
					nsize = oldsize - (mx - oldx)/20;
					if(nsize>8 && nsize <= 60){
						texts[selectedText].size = nsize;
					}
				}
			break;
			case 3:
				if(mx < (oldx + texts[selectedText].width)){
					nsize = oldsize - ((oldx + texts[selectedText].width) - mx)/20;
					if(nsize>8 && nsize <= 60){
						texts[selectedText].size = nsize;
					}
				}else{
					nsize = oldsize + (mx - (oldx + texts[selectedText].width))/20;
					if(nsize>8 && nsize <= 60){
						texts[selectedText].size = nsize;
					}
				}
			break;
			case 4:
				var dx = mx - (oldx+texts[selectedText].width/2);
				var dy = my - (oldy+texts[selectedText].height/2);
				var angle = Math.atan2(dy, dx);
				texts[selectedText].r = angle - (-1.50);
				//console.log(texts[selectedText].r);// - 1.39;// - oldr;
			break;
		}
		//console.log("nsize::"+nsize);
		document.getElementById('canvas_text').style.fontSize = nsize +'px';
		document.getElementById('canvas_text').style.height = nsize+10 +'px';
		invalidate();
	}
	if (mySeltext !== null && !isResizeDragtext) {
		for (var i = 0; i < 5; i++) {
			//0  1  2
			//3     4
			//5  6  7
			var cur = selectionHandlestexts[i];
			//we dont need to use the ghost context because
			//selection handles will always be rectangles
			if (mx >= cur.x-5 && mx <= cur.x+5 + mySelBoxSize &&
				my >= cur.y-5 && my <= cur.y+5 + mySelBoxSize) {
				// we found one!
				selectedText = mySeltext;
				expectResizetext = i;
				invalidate();
				switch (i) {
					case 0:
						this.style.cursor='nw-resize';
					break;
					case 1:
						this.style.cursor='ne-resize';
					break;
					case 2:
						this.style.cursor='sw-resize';
					break;
					case 3:
						this.style.cursor='se-resize';
					break;
					case 4:
						this.style.cursor='grab';
					break;
				}
				return;
			}
			isResizeDragtext = false;
			expectResizetext = -1;
			this.style.cursor='auto';
		}
	}

///////////// Red line alignment ////////////////////////////////////////////
	var curPos = {
		top: false,
		left: false,
		right: false,
		bottom: false
	};
	if(boxes2_selectedindex!=null){
		curPos = [];
		//Set up an object representing its current position
		curPos = {
			top: parseInt(boxes2[boxes2_selectedindex].y),
			left: parseInt(boxes2[boxes2_selectedindex].x),
			right: parseInt(boxes2[boxes2_selectedindex].x + boxes2[boxes2_selectedindex].w),
			bottom: parseInt(boxes2[boxes2_selectedindex].y + boxes2[boxes2_selectedindex].h)
		};
	}
	//Set up an object that will let us be able to keep track of newly created lines
	var matches = {
		top: false,
		left: false,
		right: false,
		bottom: false
	}
	//Get the objects from the canvas
	//For each object
	for (var i=0; i<boxes2.length; i++) {
		if(boxes2[i] != null){
		//If the object we are looing at is a line or the object being manipulated, skip it
		if (i === boxes2_selectedindex || boxes2[i].type === 'line' || isDrag == false) { continue; }
			//Set up an object representing the position of the canvas object
			var objPos = {
				top: parseInt(boxes2[i].y),
				left: parseInt(boxes2[i].x),
				right: parseInt(boxes2[i].x + boxes2[i].w),
				bottom: parseInt(boxes2[i].y + boxes2[i].h)
			};
			//Look at all 4 sides of the object and see if the object being manipulated aligns with that side.
			//Top////////////////////////////////////
			if (inRange(objPos.top, curPos.top)) {
				//We match. If we don't already have aline on that side, add one.
				if (!alignmentlines.top.top){
					drawAlignmentLine('top', objPos.top);
					//Keep track of the fact we found a match so we don't remove the line prematurely.
					matches.top = true;
					//Snap the object to the line
					boxes2[boxes2_selectedindex].y = objPos.top;
				}
			}

	            //Left////////////////////////////////////
                if (inRange(objPos.left, curPos.left)) {
                    if (!alignmentlines.left.left)
					{
                        drawAlignmentLine('left', objPos.left);
                        matches.left = true;
                        boxes2[boxes2_selectedindex].x = objPos.left;
                    }
                }
                //Right////////////////////////////////////
                if (inRange(objPos.right, curPos.right)) {
                   if (!alignmentlines.right.right)
					{
                        drawAlignmentLine('right', objPos.right);
                        matches.right = true;
                        boxes2[boxes2_selectedindex].x = objPos.right - boxes2[boxes2_selectedindex].w;
                    }
                }
                //Bottom////////////////////////////////////
                if (inRange(objPos.bottom, curPos.bottom)) {
                    if (!alignmentlines.bottom.bottom)
					{
                        drawAlignmentLine('bottom', objPos.bottom);
                        matches.bottom = true;
                        boxes2[boxes2_selectedindex].y = objPos.bottom - boxes2[boxes2_selectedindex].h;
                    }
                }

	   //Look at the side we matched on. If we did not match, and we have a line, remove the line.
                //for (var j=0; j<matches.length; j++)
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
///////////// Red line alignment end ////////////////////////////////////////


////////////////////////////  dummy /////////////////////////////////////
	/*
	getMouse(e);
  	 clear(gctx);
  var l = boxes2.length;
  for (var i = l-1; i >= 0; i--) {
	  if(boxes2[i] != null){
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

	  var dx = mx - (mySel.x+mySel.w/2);
        var dy = my - (mySel.y+mySel.h/2);
        var angle = Math.atan2(dy, dx);
        oldr = angle;


      //isDrag = true;
     // mySelline = null;
      //boxes2_selectedindex = i;
		console.log(boxes2[i]);
      invalidate();
      clear(gctx);
		//desk_active();
      return;
    }
  }
  }
  */
//////////////////////////// dummy end //////////////////////////////////


}

function drawAlignmentLine(side, pos){
	//console.log("drawAlignmentLine");
	var ln = null;
	switch (side) {
		case 'top':
			alignmentlines.top = { startx:0,starty:pos,endx:canvas.width,endy:pos,top:true };
			break;
		case 'left':
			alignmentlines.left = { startx:pos,starty:0,endx:pos,endy:canvas.height,left:true };
			break;
		case 'right':
			alignmentlines.right = { startx:pos,starty:0,endx:pos,endy:canvas.height,right:true };
			break;
		case 'bottom':
			alignmentlines.bottom = { startx:0,starty:pos,endx:canvas.width,endy:pos,bottom:true };
			break;
	}
}
function drawAlignmentLineCanvas(){
	if(isDrag == true){
		ctx.strokeStyle = '#BA3B46';//'rgba(220,0,0,0.5)';
        ctx.lineWidth = 0.5;
		if(alignmentlines.top.top==true){
		    var sx = alignmentlines.top.startx;
		    var sy = alignmentlines.top.starty;
		    var ex = alignmentlines.top.endx;
		    var ey = alignmentlines.top.endy;
		    ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(sx,sy);
            ctx.lineTo(ex,ey);
            ctx.closePath();
            ctx.stroke();
		}
		if(alignmentlines.left.left==true){
		    var sx = alignmentlines.left.startx;
		    var sy = alignmentlines.left.starty;
		    var ex = alignmentlines.left.endx;
		    var ey = alignmentlines.left.endy;
		    ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(sx,sy);
            ctx.lineTo(ex,ey);
            ctx.closePath();
            ctx.stroke();
		}
		if(alignmentlines.right.right==true){
		    var sx = alignmentlines.right.startx;
		    var sy = alignmentlines.right.starty;
		    var ex = alignmentlines.right.endx;
		    var ey = alignmentlines.right.endy;
		    ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(sx,sy);
            ctx.lineTo(ex,ey);
            ctx.closePath();
            ctx.stroke();
		}
		if(alignmentlines.bottom.bottom==true){
			var sx = alignmentlines.bottom.startx;
		    var sy = alignmentlines.bottom.starty;
		    var ex = alignmentlines.bottom.endx;
		    var ey = alignmentlines.bottom.endy;
		    ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(sx,sy);
            ctx.lineTo(ex,ey);
            ctx.closePath();
            ctx.stroke();
		}
	}
}
var alignTolerance = 10;
function inRange(val1, val2) {
    if ((Math.max(val1, val2) - Math.min(val1, val2)) <= alignTolerance) {
		return true; 
	}
    else { 
		return false; 
	}
}
// Happens when the mouse is clicked in the canvas
function myDown(e){
	console.log("myDown");
	//multpleselection = [];
	if(canvaspanmove == false){
		//innerMouseDown = true;
		getMouse(e);
		//this.style.cursor='auto';
		canvas.style.cursor='auto';
		showdragicon = false;
		var dragdraw = false;
		if(draw_copy_special == true && draw_paste == true){
			pastespecial(mx,my);
		}
		if(draw_wall == true){
			//addRect(mx , my , 60, 65, 'rgba(0,205,0,0.7)');
			//draw_wall = false;
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
	
		if(draw_squareroom == true){
			var width = 100;
			var height = 100;
			shapecount = 0;
			rotateAng = 0;
			// addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)');
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',squareroom_img,squareroom_img,showTextStore,shapecount,rotateAng);
			draw_squareroom = false;
			dragdraw = false;
		}
		if(draw_stairs == true){
			var width = 60;
			var height = 100;
			showTextStore = "";
			shapecount = 0;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',stairs_img,stairs_img,showTextStore,shapecount,rotateAng);
			draw_stairs = false;
			dragdraw = false;
		}
		if(draw_lifts == true){
			var width = 80;
			var height = 61;
			showTextStore = "";
			shapecount = 0;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',lifts_img,lifts_img,showTextStore,shapecount,rotateAng);
			draw_lifts = false;
			dragdraw = false;
		}
		if(draw_doors == true){
			var width = 8;
			var height = 125;
			showTextStore = "";
			shapecount = 0;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',doors_img,doors_img,showTextStore,shapecount,rotateAng);
			draw_doors = false;
			dragdraw = false;
		}
		if(draw_windows == true){
			var width = 12;
			var height = 60;
			showTextStore = "";
			shapecount = 0;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',windows_img,windows_img,showTextStore,shapecount,rotateAng);
			draw_windows = false;
			dragdraw = false;
		}
		if(draw_zone == true){
			//console.log("drawzone");
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
				r: 0
			});
			//console.log(p1);
			dragdraw = false;
		}
		if(draw_lshapedroom == true){
			var width = 100;
			var height = 100;
			shapecount = 0;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',lshapedroom_img,lshapedroom_img,showTextStore,shapecount,rotateAng);
			draw_lshapedroom = false;
			dragdraw = false;
		}
		if(draw_cshapedroom == true){
			var width = 200;
			var height = 200;
			shapecount = 0;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',cshapedroom_img,cshapedroom_img,showTextStore,shapecount,rotateAng);
			draw_cshapedroom = false;
			dragdraw = false;
		}
		if(draw_singledesk == true){
			//console.log("shapedesk");
			var width = 50;//70;
			var height = 32;//45;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			draw_singledesk = false;
			dragdraw = false;
		}
		if(draw_shape2 == true){
			var width = 50;//45;
			var height = 32;//45;
			shapecount = 21;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			draw_shape2 = false;
			dragdraw = false;
		}
		if(draw_shape3 == true){
			var width = 50;//58;
			var height = 32;//45;
			shapecount = 22;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			draw_shape3 = false;
			dragdraw = false;
		}
		if(draw_shape4 == true){
			var width = 50;//70;
			var height = 32;//45;
			shapecount = 3;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			draw_shape4 = false;
			dragdraw = false;
		}
		if(draw_shape5 == true){
			//console.log("shape5");
			var width = 50;//45;
			var height = 32;//45;
			shapecount = 4;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 0;
			addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + width + 6, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			draw_shape5 = false;
			dragdraw = false;
		}	
		if(draw_shape6 == true){
			//console.log("shape5");
			var width = 50;//45;
			var height = 32;//45;
			shapecount = 6;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 0;
			addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 0;
			addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + width + 6, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + width + width + 12, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			draw_shape6 = false;
			dragdraw = false;
		}	
		if(draw_shape7 == true){
			var width = 46;//70;
			var height = 46//45;
			shapecount = 7;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',shape5_img,shape5_select_img,showTextStore,shapecount,rotateAng);
			draw_shape7 = false;
			dragdraw = false;
		}	
		if(draw_shape8 == true){
			//console.log("shape5");
			var width = 50;//45;
			var height = 32;//45;
			shapecount = 8;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 0;
			addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 0;
			addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 0;
			addRect(mx - (width / 2) + width + width + width + 18, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + width + 6, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + width + width + 12, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + width + width + width + 18, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img,showTextStore,shapecount,rotateAng);
			draw_shape8 = false;
			dragdraw = false;
		}
		if (draw_room_xxs == true) {
			var width = 35;
			var height = 50;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_xxs,room_xxs_select,showTextStore,shapecount,rotateAng);
			draw_room_xxs = false;
			dragdraw = false;
		}
		if (draw_room_xs == true) {
			var width = 60;
			var height = 50;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_xs,room_xs_select,showTextStore,shapecount,rotateAng);
			draw_room_xs = false;
			dragdraw = false;
		}
		if (draw_room_s == true) {
			var width = 86;
			var height = 50;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_img,room_img_select,showTextStore,shapecount,rotateAng);
			draw_room_s = false;
			dragdraw = false;
		}
		if (draw_room_m == true) {
			var width = 112;
			var height = 50;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_m,room_m_select,showTextStore,shapecount,rotateAng);
			draw_room_m = false;
			dragdraw = false;
		}
		if (draw_room_l == true) {
			var width = 124;
			var height = 50;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_l,room_l_select,showTextStore,shapecount,rotateAng);
			draw_room_l = false;
			dragdraw = false;
		}
		if (draw_room_xl == true) {
			var width = 150;
			var height = 50;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',room_xl,room_xl_select,showTextStore,shapecount,rotateAng);
			draw_room_xl = false;
			dragdraw = false;
		}
		
		if (draw_parking == true) {
			console.log(draw_parking);
			var width = 36;
			var height = 76;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			draw_parking = false;
			dragdraw = false;
		}
		if (draw_parking2 == true) {
			var width = 36;
			var height = 76;
			shapecount = 21;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			draw_parking2 = false;
			dragdraw = false;
		}
		if (draw_parking3 == true) {
			var width = 36;
			var height = 76;
			shapecount = 22;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			draw_parking3 = false;
			dragdraw = false;
		}
		if (draw_parking4 == true) {
			var width = 36;
			var height = 76;
			shapecount = 3;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
			addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
			addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			draw_parking4 = false;
			dragdraw = false;
		}
		if (draw_parking5 == true) {
			var width = 36;
			var height = 76;
			shapecount = 5;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 0;	
			addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + width + 6, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			draw_parking5 = false;
			dragdraw = false;
		}
		if (draw_parking6 == true) {
			var width = 36;
			var height = 76;
			shapecount = 6;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 0;
			addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 0;
			addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + width + 6, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + width + width + 12, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			draw_parking6 = false;
			dragdraw = false;
		}
		if (draw_parking7 == true) {
			var width = 36;
			var height = 76;
			shapecount = 7;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
			addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			addRect(mx - (width / 2) + 3 * width + 18, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
			addRect(mx - (width / 2) + 4 * width + 24, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			draw_parking7 = false;
			dragdraw = false;
		}
		if (draw_parking8 == true) {
			var width = 36;
			var height = 76;
			shapecount = 8;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
			rotateAng = 0;
			addRect(mx - (width / 2) + width + 6, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 0;
			addRect(mx - (width / 2) + width + width + 12, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 0;
			addRect(mx - (width / 2) + 3 * width + 18, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);	
			rotateAng = 0;
			addRect(mx - (width / 2) + 4 * width + 24, my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2), my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + width + 6, my - (height / 2)+ height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + width + width + 12, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;
			addRect(mx - (width / 2) + 3 * width + 18, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			rotateAng = 3.1359214901292827;	
			addRect(mx - (width / 2) + 4 * width + 24, my - (height / 2) + height + 6, width, height, 'rgba(220,205,65,0.7)','image',parking_img,parking_img_select,showTextStore,shapecount,rotateAng);
			draw_parking8 = false;
			dragdraw = false;
		}
		if (draw_onewayroadR == true) {
			console.log(draw_onewayroadR);
			var width = 300;
			var height = 50;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',onewayroadR,onewayroadR,showTextStore,shapecount,rotateAng);
			draw_onewayroadR = false;
			dragdraw = false;
		}	
		if (draw_onewayroadL == true) {
			console.log(draw_onewayroadL);
			var width = 300;
			var height = 50;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',onewayroadL,onewayroadL,showTextStore,shapecount,rotateAng);
			draw_onewayroadL = false;
			dragdraw = false;
		}	
		if (draw_twowayroad == true) {
			console.log(draw_twowayroad);
			var width = 301;
			var height = 100;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',twowayroad,twowayroad,showTextStore,shapecount,rotateAng);
			draw_twowayroad = false;
			dragdraw = false;
		}	
		if (draw_twowayroad90 == true) {
			console.log(draw_twowayroad90);
			var width = 251;
			var height = 251;
			shapecount = 1;
			rotateAng = 0;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',twowayroad90,twowayroad90,showTextStore,shapecount,rotateAng);
			draw_twowayroad90 = false;
			dragdraw = false;
		}
			
		if(draw_shape_bg == true){
			//console.log("shape5");
			var width = 730;//45;
			var height = 624;//45;
			addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',getImagePath,getImagePath,'');
			draw_shape_bg = false;
			dragdraw = false;
		}
		if(draw_text == true){
			canvas_text_div.style.left = mx-5+'px';
			canvas_text_div.style.top = my+5+'px';
			canvas_text_div.style.display = 'block';
			canvas_text_x = mx-5;
			canvas_text_y = my+5;
			create_text();
			draw_text = false;
			dragdraw = false;
		}else{
			mySeltext = null;
		}
		//we are over a selection box
		if (expectResize !== -1) {
			isResizeDrag = true;
			var dx = mx - (mySel.x+mySel.w/2);
			var dy = my - (mySel.y+mySel.h/2);
			var angle = Math.atan2(dy, dx);
			oldr = angle;
			////console.log('oldr'+oldr);
			return;
		}
	
		if (expectResizeline !== -1) {
			isResizeDragline = true;
			return;
		}
		clear(gctx);
		var l = boxes2.length;
		//console.log(boxes2);
		for (var i = l-1; i >= 0; i--) {
			if(boxes2[i] != null){
				// draw shape onto ghost context
				boxes2[i].draw(gctx, 'black');
				// get image data at the mouse x,y pixel
				var imageData = gctx.getImageData(mx, my, 1, 1);
				var index = (mx + my * imageData.width) * 4;
				// if the mouse pixel exists, select and break
				
				if (imageData.data[3] > 0) {
					
					if(multpleselection[i] == undefined){
						console.log(multiDragInnerRect);
						//if(multiDragInnerRect != true){						
							mySel = boxes2[i];
							offsetx = mx - mySel.x;
							offsety = my - mySel.y;
							mySel.x = mx - offsetx;
							mySel.y = my - offsety;
							var dx = mx - (mySel.x+mySel.w/2);
							var dy = my - (mySel.y+mySel.h/2);
							var angle = Math.atan2(dy, dx);
							oldr = angle;
							isDrag = true;
							mySelline = null;
							boxes2_selectedindex = i;
							//console.log("selectIndex = "+boxes2_selectedindex);
							invalidate();
							clear(gctx); /**/
							multpleselection = [];
							draw_drag = false;
							document.getElementById('draw_drag').classList.remove("active");
							//desk_active();
							return;
						//}
					}
				}
			}
		}
	
		var rl = existingLines.length;
		for(var i = rl-1; i >= 0; i--){
			//existingLines[i].draw(gctx, 'black');
			gctx.fillStyle = 'black';
			gctx.strokeStyle = "black";
			gctx.lineWidth = 20;
			gctx.beginPath();
			gctx.setLineDash([]);
			// for (var i = 0; i < existingLines.length; ++i) {
			var line = existingLines[i];
			gctx.moveTo(line.startX,line.startY);
			gctx.lineTo(line.endX,line.endY);
			gctx.closePath();
			//}
			gctx.stroke();
			//get image data at the mouse x,y pixel
			var imageData = gctx.getImageData(mx, my, 1, 1);
			// if the mouse pixel exists, select and break
			if(imageData.data[3] > 0) {
				if(multpleselection[i] == undefined){
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
					document.getElementById('draw_drag').classList.remove("active");
					return;
				}
			}
		}
	
	
		if (expectResizetext !== -1) {
			isResizeDragtext = true;
			return;
		}
		// mySeltext = null;
/*	
  fo	r (var i = 0; i < texts.length; i++) {
			if (textHittest(mx, my, i)) {
				selectedText = i;
				toffsetx = mx - texts[i].x;
				toffsety = my - texts[i].y;
				mySeltext = i;
				isDragtext = true;
				invalidate();
				return;
			}else{
				document.getElementById('canvas_text_div').style.display = 'none';
				if(draw_text == false)
				{
				resettextbox();
				}
			}
		}
*/	
		var tl = texts.length;
		for(var i = tl-1; i >= 0; i--){
			console.log("text:t1:"+tl);
			text = texts[i];
			gctx.save();
			gctx.translate(text.x+(text.width/2), (text.y-(text.height-2))+((text.height+2)/2));
			gctx.rotate(text.r);
			gctx.translate(-(text.x+(text.width/2)), -((text.y-(text.height-2))+((text.height+2)/2)));
			
			//console.log("gctx-before::"+text.size);
			gctx.font = ""+text.bold+" "+text.italic+" "+text.size+"px "+text.style;//
			
			//ctx.font = "bold 24px verdana, sans-serif ";
			//gctx.fillStyle = text.color;//"#ff0000";
			//console.log(text.width);
			document.getElementById('canvas_text').addEventListener("focus",textAreaFocusIn);
			document.getElementById('canvas_text').addEventListener("blur",textAreaFocusOut);
			if(canvasTextFocusOut){
				gctx.fillStyle = 'rgba(255,255,255,1)';
				gctx.strokeStyle = "rgba(255,255,255,1)";
				gctx.fillText(text.text, text.x, text.y);
			}else{
				gctx.fillStyle = 'rgba(255,255,255,0.25)';
				gctx.strokeStyle = "rgba(255,255,255,0.25)";
				gctx.fillText(text.text, text.x, text.y);
			}
	
			var twidth = gctx.measureText(text.text).width;
			text.width = twidth;
			textAreaResizing(text.width,text.size,text.x,text.y);
			//console.log("jjj"+text.width);
			gctx.fillRect(text.x-5, text.y-(text.height+2), twidth+10, text.height+10);
			gctx.restore();
			var imageData = gctx.getImageData(mx, my, 1, 1);
			if (imageData.data[3] > 0) {
				if(multpleselection[i] == undefined){
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
					tfocusIndex = texts[i].text.length;
					draw_text_value = texts[i].text;
					trender();
					multpleselection = [];
					draw_drag = false;
					document.getElementById('draw_drag').classList.remove("active");
					return;
				}
			}else{
				document.getElementById('canvas_text_div').style.display = 'none';
				document.getElementById('draw_text_size').value = 16;
				if(draw_text == false){
					resettextbox();
				}
				tselected = false;
				tisFocus = false;
				trender();
			}
		}
		if (expectResizeMultiDrag !== -1) {
			isResizeMultiDrag = true;
			return;
		}
		if(mx>dragstartX && my>dragstartY && mx<dragwidth+dragstartX && my<dragheight+dragstartY){
			drawdragoffsetx = mx - dragstartX;
			drawdragoffsety = my - dragstartY;
			draw_drag_move = true;
		}else{
			draw_drag_move = false;
		}
		if(draw_drag == true && draw_drag_move == false){
			console.log("draghandleMouseDown_called");
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

let fontColorForCanvasText = "";
let canvasTextFocusOut = false;
function textAreaFocusOut(){
	canvasTextFocusOut = true;
}
function textAreaFocusIn(){
	canvasTextFocusOut = false;
	//settextsize(mySeltext);
	document.getElementById("canvas_text").style.fontSize = text.size+"px";
}

function textAreaResizing(a,b,x,y){
	//console.log("called::",a);
	//console.log(a,b,x,y,canvas_text_div);
	//canvas_text_div.style.left = x+5+'px';
	//canvas_text_div.style.top = y-5+'px';
	const textAreaHeight = 16;
	const textAreaTN = document.getElementsByTagName("textarea");
	for (let i = 0; i < textAreaTN.length; i++) {
		const textLength = textAreaTN[i].value.length;
		//textAreaTN[i].setAttribute("style", "width:"+textLength+"px;overflow-y:hidden;background: transparent; color: black; border-width: 0px; border: none; caret-color: black;");
	 	if (textAreaTN[i].value == '' || textAreaTN[i].value == 'Text') {
			//console.log('textArearesize1::'+a);
			textAreaTN[i].setAttribute("style","font-size:"+b+"px; width: "+(a)+"px; height:" + (textAreaHeight+10) + "px;overflow-y:hidden;background: transparent; line-height:"+textAreaHeight+"px; color: black; border-width: 1px; border: 1px solid transparent; caret-color: black;resize: none;min-width: 60px");
		} else {
			//console.log('textArearesize2::'+textAreaTN[i].scrollHeight);
			textAreaTN[i].setAttribute("style","font-size:"+b+"px; width: "+(a)+"px; height:" + (b+10) + "px;overflow-y:hidden; line-height:"+b+"px; background: transparent; color: black; border-width: 1px; border: 1px solid transparent; caret-color: black;resize: none;min-width: 60px");
		}
		//textAreaTN[i].addEventListener("input", OnInput, false);
	}
	// function OnInput(e) {
		// this.style.height = 0;
		// this.style.height = (this.scrollHeight) + "px";
	// }
}

function myUp(e){
	console.log("myUp::");
	isDrag = false;
	isResizeDrag = false;
	expectResize = -1;
	invalidate();
	draw_drag_move = false;
	if(draw_drag == true){
		console.log("drawdrag_draghandleMouseUp");
		draghandleMouseUp(e);
	}
	isResizeMultiDrag = false;
	expectResizeMultiDrag = -1;

	isDragline = false;
	isResizeDragline = false;
	expectResizeline = -1;
	if(draw_wall == true){
		if (hasLoaded && e.button === 0) {
			if (isDrawing) {
				existingLines.push({
					startX: startX,
					startY: startY,
					endX: mouseX,
					endY: mouseY,
					type: linetype
				});
				
				var dx = mouseX - startX;
				var dy = mouseY - startY;
				var angle = Math.atan2(dy, dx) * 180 / Math.PI;
				// alert(angle);
				var dheight = 20;
				var dwidth = dx;
				if(dx>dheight){
				dwidth = dx;
				}else{
				dwidth = dy;
				}
				
				var rx = startX;
				var ry = startY;
				if(angle<0){
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

	if(mySeltext!=null){
		edittext();
	}else{
		selectedText = -1;
	}
	// selectedText = -1;
	datahistory();
}

// adds a new node
function myDblClick(e) {
  getMouse(e);

	if(mySeltext!=null){
		edittext();
	}

}

function cleardragobject(){
	draw_wall = false;
	draw_wall_dash = false;
	draw_squareroom = false;
	draw_stairs = false;
	draw_lifts = false;
	draw_doors = false;
	draw_windows = false;
	draw_zone = false;
	draw_lshapedroom = false;
	draw_cshapedroom = false;
	draw_singledesk = false;
	draw_shape2 = false;
	draw_shape3 = false;
	draw_shape4 = false;
	draw_shape5 = false;
	draw_shape6 = false;
	draw_shape7 = false;
	draw_shape8 = false;
	draw_shape_bg = false;
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
	draw_text = false;
	//canvasBgImage = false
}

/*
document.getElementById('draw_wall').onclick=function (e) {
cleardragobject();
draw_wall = true;
linetype = 'solid';
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}

document.getElementById('draw_wall_dash').onclick=function (e) {
cleardragobject();
draw_wall = true;
linetype = 'dash';
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}

document.getElementById('draw_squareroom').onclick=function (e) {
cleardragobject();
draw_squareroom = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}

document.getElementById('draw_stairs').onclick=function (e) {
cleardragobject();
draw_stairs = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}

document.getElementById('draw_lifts').onclick=function (e) {
cleardragobject();
draw_lifts = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}

document.getElementById('draw_doors').onclick=function (e) {
cleardragobject();
draw_doors = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}

document.getElementById('draw_windows').onclick=function (e) {
cleardragobject();
draw_windows = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}

document.getElementById('draw_zone').onclick=function (e) {
cleardragobject();
draw_zone = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}

document.getElementById('draw_lshapedroom').onclick=function (e) {
cleardragobject();
draw_lshapedroom = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}

document.getElementById('draw_cshapedroom').onclick=function (e) {
cleardragobject();
draw_cshapedroom = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}

document.getElementById('draw_singledesk').onclick=function (e) {
cleardragobject();
draw_singledesk = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}
document.getElementById('draw_shape2').onclick=function (e) {
cleardragobject();
draw_shape2 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}
document.getElementById('draw_shape3').onclick=function (e) {
cleardragobject();
draw_shape3 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}
document.getElementById('draw_shape4').onclick=function (e) {
cleardragobject();
draw_shape4 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}
document.getElementById('draw_shape5').onclick=function (e) {
cleardragobject();
draw_shape5 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
}

*/

document.getElementById('draw_singledesk').ondragstart=function (e) {
cleardragobject();
draw_singledesk = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_shape2').ondragstart=function (e) {
cleardragobject();
draw_shape2 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_shape3').ondragstart=function (e) {
cleardragobject();
draw_shape3 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_shape4').ondragstart=function (e) {
cleardragobject();
draw_shape4 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_shape5').ondragstart=function (e) {
cleardragobject();
draw_shape5 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_shape6').ondragstart=function (e) {
cleardragobject();
draw_shape6 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_shape7').ondragstart=function (e) {
cleardragobject();
draw_shape7 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_shape8').ondragstart=function (e) {
cleardragobject();
draw_shape8 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_room_xxs').ondragstart=function (e) {
cleardragobject();
draw_room_xxs = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_room_xs').ondragstart=function (e) {
cleardragobject();
draw_room_xs = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_room_s').ondragstart=function (e) {
cleardragobject();
draw_room_s = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_room_m').ondragstart=function (e) {
cleardragobject();
draw_room_m = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_room_l').ondragstart=function (e) {
cleardragobject();
draw_room_l = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_room_xl').ondragstart=function (e) {
cleardragobject();
draw_room_xl = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_parking').ondragstart=function (e) {
cleardragobject();
draw_parking = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_parking2').ondragstart=function (e) {
cleardragobject();
draw_parking2 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_parking3').ondragstart=function (e) {
cleardragobject();
draw_parking3 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_parking4').ondragstart=function (e) {
cleardragobject();
draw_parking4 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_parking5').ondragstart=function (e) {
cleardragobject();
draw_parking5 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_parking6').ondragstart=function (e) {
cleardragobject();
draw_parking6 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_parking7').ondragstart=function (e) {
cleardragobject();
draw_parking7 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_parking8').ondragstart=function (e) {
cleardragobject();
draw_parking8 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}

document.getElementById('draw_onewayroadR').ondragstart=function (e) {
cleardragobject();
draw_onewayroadR = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_onewayroadL').ondragstart=function (e) {
cleardragobject();
draw_onewayroadL = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_twowayroad').ondragstart=function (e) {
cleardragobject();
draw_twowayroad = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
document.getElementById('draw_twowayroad90').ondragstart=function (e) {
cleardragobject();
draw_twowayroad90 = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}
/* document.getElementById('draw_zone').onclick=function (e) {
cleardragobject();
draw_zone = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
showdragicon = true;
} */
document.getElementById('draw_squareroom').ondragstart=function (e) {
cleardragobject();
draw_squareroom = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}

document.getElementById('draw_stairs').ondragstart=function (e) {
cleardragobject();
draw_stairs = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}

document.getElementById('draw_lifts').ondragstart=function (e) {
cleardragobject();
draw_lifts = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}

document.getElementById('draw_doors').ondragstart=function (e) {
cleardragobject();
draw_doors = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}

document.getElementById('draw_windows').ondragstart=function (e) {
cleardragobject();
draw_windows = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}

document.getElementById('draw_zone').ondragstart=function (e) {
	//alert();
cleardragobject();
draw_zone = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}

document.getElementById('draw_lshapedroom').ondragstart=function (e) {
cleardragobject();
draw_lshapedroom = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}

document.getElementById('draw_cshapedroom').ondragstart=function (e) {
cleardragobject();
draw_cshapedroom = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
}

document.getElementById('draw_wall').ondragstart=function (e) {
cleardragobject();
draw_wall = true;
linetype = 'solid';
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
assetsdrag = true;
}

document.getElementById('draw_wall_dash').ondragstart=function (e) {
cleardragobject();
draw_wall_dash = true;
linetype = 'dash';
//dimg = '../../dragicons/SingleDesk-cursor.svg';
dimg = document.getElementById("squaredrag_img");
assetsdrag = true;
}
/* document.getElementById('canvasGetImage').ondragstart=function (e) {
cleardragobject();
canvasBgImage = true;
//dimg = '../../dragicons/SingleDesk-cursor.svg';
//dimg = document.getElementById("squaredrag_img");
//showdragicon = true;
assetsdrag = true;
} */



document.getElementById('draw_singledesk').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_shape2').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_shape3').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_shape4').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_shape5').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_shape6').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_shape7').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_shape8').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
} /* */

document.getElementById('draw_room_xxs').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_room_xs').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_room_s').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_room_m').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_room_l').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_room_xl').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_parking').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_parking2').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_parking3').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_parking4').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_parking5').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_parking6').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_parking7').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_parking8').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}

document.getElementById('draw_onewayroadR').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_onewayroadL').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_twowayroad').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_twowayroad90').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}

document.getElementById('draw_squareroom').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_stairs').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_lifts').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_doors').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_windows').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_zone').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_lshapedroom').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_cshapedroom').ondragend=function (e) {
	
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_wall').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
document.getElementById('draw_wall_dash').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}

document.getElementById('canvas_getimage').onchange=function (e) {
	var getImagePath = URL.createObjectURL(event.target.files[0]);

	var img = new Image();
	img.onload = function(){
		img_width = Number(img.width);
		img_height = Number(img.height);
		document.getElementById("bg_image_width").value = img_width;
		document.getElementById("bg_image_height").value = img_height;
	}
	img.src = getImagePath;
	document.getElementById("canvas").style.background = 'url(' + getImagePath + ') no-repeat';
    setcanvasimage = 1;
    canvasbglock = 0;

	var map = document.getElementById('canvas');
	innerMouseDown = true;
	AttachDragTo(map); 
	document.getElementById("canvas").classList.remove("hide-canvas-bg");
}
document.getElementById("bg_image_width").onchange=function(e){
	getImgValues();
	getImgAspectRatio();
	img_new_height = Math.round(img_new_width/aspectRatio);
	document.getElementById("bg_image_height").value = img_new_height;
	bgImage_W_H(img_new_width,img_new_height);
}
document.getElementById("bg_image_height").onchange=function(e){
	getImgValues();
	getImgAspectRatio();
	img_new_width = Math.round(img_new_height*aspectRatio);
	document.getElementById("bg_image_width").value = img_new_width;
	bgImage_W_H(img_new_width,img_new_height);
}
document.getElementById("bg_image_width").onkeyup=function(e){
	getImgValues();
	getImgAspectRatio();
	img_new_height = Math.round(img_new_width/aspectRatio);
	document.getElementById("bg_image_height").value = img_new_height;
	bgImage_W_H(img_new_width,img_new_height);
}
document.getElementById("bg_image_height").onkeyup=function(e){
	getImgValues();
	getImgAspectRatio();
	img_new_width = Math.round(img_new_height*aspectRatio);
	document.getElementById("bg_image_width").value = img_new_width;
	bgImage_W_H(img_new_width,img_new_height);
}
function getImgValues(){
	img_new_width = document.getElementById("bg_image_width").value;
	img_new_height = document.getElementById("bg_image_height").value;
};
function getImgAspectRatio(){
  return aspectRatio = img_width/img_height;
};
function bgImage_W_H(w,h){
	//console.log(w,document.getElementById("canvas").style.backgroundSize);
	document.getElementById("canvas").style.backgroundSize = w + 'px ' + h + 'px';
}
/* document.getElementById('canvasGetImage').ondragend=function (e) {
cleardragobject();
showdragicon = false;
assetsdrag = false;
}
 */
////////////////////////////////////////  text ////////////////////////////////////////////
document.getElementById('draw_text').onclick=function (e) {
	cleardragobject();
	dimg = document.getElementById("textdrag_img");
	showdragicon = true;
	var tsize = 16;
	document.getElementById('draw_text_size').value = tsize;
	tsize = parseInt(document.getElementById('draw_text_size').value);
	document.getElementById('canvas_text').style.height =  parseInt(tsize + 8) +'px';
    document.getElementById('canvas_text').style.fontSize = tsize +'px';
	document.getElementById('draw_text_bold').classList.remove("active");
	draw_text_bold = false;
    text_bold = '';
	document.getElementById('draw_text_italic').classList.remove("active");
	draw_text_italic = false;
    text_italic='';
	document.getElementById('draw_text_underline').classList.remove("active");
	draw_text_underline = false;
    text_underline='';
	selectedText = -1;
	draw_text = true;
}

var draw_text_bold=false;
var text_bold = '';
document.getElementById('draw_text_bold').onclick=function (e) {
	document.getElementById('canvas_text_div').style.display = 'none';
	if(draw_text_bold){
		draw_text_bold = false;
		text_bold = '';
	}else{
		draw_text_bold = true;
		text_bold = 'bold';
	}
	if(mySeltext!=null){
		var i = mySeltext;
		texts[i].bold = text_bold;
		invalidate();
	}
}
var draw_text_italic=false;
var text_italic = '';
document.getElementById('draw_text_italic').onclick=function (e) {
	document.getElementById('canvas_text_div').style.display = 'none';
	if(draw_text_italic){
		draw_text_italic = false;
		text_italic='';
	}else{
		draw_text_italic = true;
		text_italic='italic';
	}
	if(mySeltext!=null){
		var i = mySeltext;
		texts[i].italic = text_italic;
		invalidate();
	}
}
var draw_text_underline=false;
var text_underline='';
document.getElementById('draw_text_underline').onclick = function (e) {
	document.getElementById('canvas_text_div').style.display = 'none';
	if(draw_text_underline){
		draw_text_underline = false;
		text_underline='';
		document.getElementById('draw_text_underline').classList.remove("active");
	}else{
		draw_text_underline = true;
		text_underline='underline';
		document.getElementById('draw_text_underline').classList.add("active");
	}
	if(mySeltext!=null){
		var i = mySeltext;
		texts[i].underline = text_underline;
		invalidate();
	}
	//console.log("text_underline_Click::"+text_underline);
	
}
 
function create_text(){
	draw_text_value = document.getElementById('canvas_text').value;
	var draw_text_style = document.getElementById('draw_text_style').value;
	var draw_text_color = "black";//document.getElementById('draw_text_color').value;
	var draw_text_size = parseInt(document.getElementById('draw_text_size').value);
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
		height: 16
	});
	mySeltext = texts.length - 1;
	selectedText = texts.length - 1;
	console.log("createText::"+JSON.stringify(texts));
	document.getElementById('canvas_text').style.width = texts[selectedText]+'px';
	document.getElementById('canvas_text').style.height = texts[selectedText]+'px';
	changePosOfInputText(texts);
	invalidate();
}
function changePosOfInputText(texts){
}

/*document.getElementById('canvas_text_done').onclick=function (e) {
	draw_text_value = document.getElementById('canvas_text').value;
	canvas_text_div.style.display = 'none';
	var draw_text_style = document.getElementById('draw_text_style').value;
	var draw_text_color = document.getElementById('draw_text_color').value;
	var draw_text_size = parseInt(document.getElementById('draw_text_size').value);
	
	texts.push({
		text: draw_text_value,
		x: canvas_text_x,
		y: canvas_text_y,
		style: draw_text_style,
		color: draw_text_color,
		bold: text_bold,
		italic: text_italic,
		underine: text_underline,
		size: draw_text_size,
		r: 0
	});	
	invalidate();
}*/

document.getElementById('draw_text_style').onchange=function (e) {
	document.getElementById('canvas_text').style.display = "none";
	settextstyle();
}


function settextstyle(){
	if(mySeltext!=null){
		var i = mySeltext;
		texts[i].style = document.getElementById('draw_text_style').value;
		invalidate();
   }
}

document.getElementById('draw_text_size').onchange=function (e) {
	settextsize();
}
document.getElementById('draw_text_size').onkeyup=function (e) {
	settextsize();
}
for(let i = 0; i < document.getElementsByClassName('select-list-group-list-item').length;i++){
	document.getElementsByClassName('select-list-group-list-item')[i].onclick=function (e) {
		document.getElementById('draw_text_size').value = document.getElementsByClassName('select-list-group-list-item')[i].innerText; 
		settextsize();
	}
}
function settextsize(mySeltext){
	//console.log("key");
	if(mySeltext!=null){
		var i = mySeltext;
		texts[i].size = parseInt(document.getElementById('draw_text_size').value);		
		//console.log("settextsize"+texts[i].size);
		document.getElementById('canvas_text').style.height =  texts[i].size +'px';
		document.getElementById('canvas_text').style.fontSize = texts[i].size +'px';
		document.getElementById('canvas_text').style.left =  texts[i].x +'px';
		document.getElementById('canvas_text').style.top = texts[i].y - texts[i].size +'px';
		document.getElementById('canvas_text_div').style.left =  texts[i].x +'px';
		document.getElementById('canvas_text_div').style.top = texts[i].y - texts[i].size +'px';
		document.getElementById('canvas_text_div').style.width = texts[i].width +'px';
		invalidate();
	}
}

/* document.getElementById('colorclick1').onclick=function (e) {
	selectfontcolor('#ffffff');
}
document.getElementById('colorclick2').onclick=function (e) {
	selectfontcolor('#000000');
}
document.getElementById('colorclick3').onclick=function (e) {
	selectfontcolor('#ec7124');
}
document.getElementById('colorclick4').onclick=function (e) {
	selectfontcolor('#ca3c27');
}
document.getElementById('colorclick5').onclick=function (e) {
	selectfontcolor('#5928B1');
}
document.getElementById('colorclick6').onclick=function (e) {
	selectfontcolor('#99C2EC');
}
document.getElementById('colorclick7').onclick=function (e) {
	selectfontcolor('#A0DD9F');
}
document.getElementById('colorclick8').onclick=function (e) {
	selectfontcolor('#F8E8A2');
}
document.getElementById('colorclick9').onclick=function (e) {
	selectfontcolor('#F7C099');
}
document.getElementById('colorclick10').onclick=function (e) {
	selectfontcolor('#F7A4A4');
}
document.getElementById('colorclick11').onclick=function (e) {
	selectfontcolor('#BBA5E1');
}
document.getElementById('colorclick12').onclick=function (e) {
	selectfontcolor('#1B6DC1');
}
document.getElementById('colorclick13').onclick=function (e) {
	selectfontcolor('#1D951B');
}
document.getElementById('colorclick14').onclick=function (e) {
	selectfontcolor('#C6A514');
}
document.getElementById('colorclick15').onclick=function (e) {
	selectfontcolor('#D86411');
}
document.getElementById('colorclick16').onclick=function (e) {
	selectfontcolor('#D42A2A');
}
document.getElementById('colorclick17').onclick=function (e) {
	selectfontcolor('#5928B1');
} */
function selectfontcolor(color){
	//console.log("color::"+color);
	canvas_text_div.style.diplay = "none";
	//document.getElementById('color_select_button').style.backgroundColor= color;
	//document.getElementById('draw_text_color').value = color;
	if(mySeltext!=null){
		var i = mySeltext;
		texts[i].color = "black"//document.getElementById('draw_text_color').value;
		//console.log(texts[i].color);
		invalidate();
	}
}
function edittext(){
	console.log("edittext_call1");
	if(mySeltext!=null){
		var i = mySeltext;
		document.getElementById('canvas_text').value = texts[i].text;
		//console.log("edittext_call1:::"+texts[i].text);
		canvas_text_div.style.left = texts[i].x+'px';
		canvas_text_div.style.top = texts[i].y-texts[i].size +'px';		
		canvas_text_div.style.display = 'block';
		//canvas_text_div.style.left
		//document.getElementById('canvas_text').style.height =  texts[i].size +'px';
        document.getElementById('canvas_text').style.fontSize = texts[i].size +'px';
		////console.log("ddd::"+texts[i].r);
		//document.getElementById('canvas_text').style.transform = 'rotate('+texts[i].r+'deg)';
		document.getElementById("canvas_text").focus();
		var twidth = ctx.measureText(texts[i].text).width;
		textAreaResizing(twidth,texts[i].size,texts[i].x,texts[i].y); 
		edittextbox=true;
		invalidate();
	}
}

//var keyUpText = '';
document.getElementById('canvas_text').onkeyup=function (e) {
	//console.log("canvas_text_onkeyup2");
	if(mySeltext!=null){
		var i = mySeltext;
		//texts[i].text = '';
		var keyUpText = document.getElementById('canvas_text').value;
		var keyUpText2 = [];
		keyUpText2 = keyUpText.split(/\n\r?/g);
		//console.log("canvas_text_onkeyup2:::"+keyUpText2);
		texts[i].text = keyUpText2;
		draw_text_value = keyUpText2;
		//console.log("draw_text_value::"+draw_text_value);
		//drawtexts();
		//var len = document.getElementById('canvas_text').value.length;
 		var twidth = ctx.measureText(texts[i].text).width;
		console.log(twidth);
		textAreaResizing(twidth,texts[i].size,texts[i].x,texts[i].y);
		document.getElementById('canvas_text_div').style.width = twidth + "px";
		document.getElementById('canvas_text').style.width = twidth + "px";
		//texts[i].text = keyUpText;
		//document.getElementById('canvas_text').style.width = texts[i].width + 'px';

		
		//var len = document.getElementById('canvas_text').value.length;
		//var twidth = ctx.measureText(texts[i].text).width;
		//console.log(twidth);
		//var mpt = ctx.transformedPoint(twidth,twidth);
		//console.log(mpt.x);
		//twidth = mpt.x;
		//var lspace = twidth/len;
		//document.getElementById('canvas_text').style.width = twidth +'px';
		/**/

		///////////////////////////////////////////////////////////////////////////////////////
		/*
		// write text
			var str = "";
			for(var i = 0; i < draw_text_value.length; i++){
				if(!tselected && tfocusIndex === i){
					str += "|";
				}
				str += draw_text_value[i];
			}
			if(!tselected && tfocusIndex === draw_text_value.length){
				str += "|";
			}
		//console.log(str);
		*/
		tisCommandKey = false;
		//setTimeout(function(){
			
		drawtexts();
		//},100);

		///////////////////////////////////////////////////////////////////////////////////////

		//invalidate();
	}
}
/* document.getElementById('canvas_textEditor').onclick=function (e) {
} */
document.getElementById('canvas_text').onclick=function (e) {
	//editDragBtnContainer.style.display = "block";
	//var t = mySeltext;
	//editDragBtnContainer.childNodes[1].addEventListener("click",textEditorEditFun(t));
    //draw_text_value = document.getElementById('canvas_text').value;
	if(mySeltext!=null){
		tisFocus = true;
		tfocusIndex = draw_text_value.length;
		//this.render();
		drawtexts();
	}else{
		tselected = false;
		tisFocus = false;
		//this.render();
		drawtexts();
	}
}

var oldtid=0;
function trender(){
	// write text
	var str = "";
	for(var i = 0; i < draw_text_value.length; i++){
		if(!tselected && tisFocus && tfocusIndex === i){
			str += "";
		}
		str += draw_text_value[i];
	}
	if(!tselected && tisFocus && tfocusIndex === draw_text_value.length && draw_text_value.includes("|")!=true){
		str += "";
	}
	if(mySeltext!=null){
		var t = mySeltext;
		texts[t].text = str;
		oldtid=t;
		//draw_text_value=texts[t].text;
	}else{
		str = str.replace('', '');
		texts[oldtid].text = str;
		draw_text_value=str;
	}
    invalidate();
	console.log("tfocusIndex");
}
var editDragBtnContainer = document.getElementById('buttonCont');
document.getElementById('canvas_text').onkeydown=function (e) {
	//console.log("canvas_text_inkeydown4");
	//editDragBtnContainer.style.display = "block";
	//var t = mySeltext;
	//editDragBtnContainer.childNodes[1].addEventListener("click",textEditorEditFun(t));
	//editDragBtnContainer.childNodes[1].addEventListener("click",textEditorDragFun);
   /* //var draw_text_value1 = draw_text_value;// texts[mySeltext].text;
	
	//texts[t].text*/
	/* if(e.key === "Meta" || e.key === "Control"){
		console.log("meta::");
		tisCommandKey = true;
	}
	if(tisFocus){
		console.log("tisFocus::");
		e.preventDefault();
	} */
/* 	if(tisCommandKey && e.key === "a"){
		tselected = true;
		trender(); */
		//////////////////////////trender////////////////////////////////////
		/*
	        var str = "";
			for(var i = 0; i < draw_text_value.length; i++){
				if(!tselected && tisFocus && tfocusIndex === i){
					str += "|";
				}
				str += draw_text_value[i];
			}
			if(!tselected && tisFocus && tfocusIndex === draw_text_value.length){
				str += "|";
			}
		if(mySeltext!=null){
			var t = mySeltext;
			texts[t].text = str;
			oldtid=t;
		}else{
			texts[oldtid].text = str;
			draw_text_value=str;
		}
		*/
		//////////////////////////////////trender end/////////////////////////////////////////

		//drawtexts();
/* 		return
	} */
	/* if(tisFocus && e.key === "Backspace"){ */
		
		/* if(tselected){
			tfocusIndex = 0;
			draw_text_value = "";
			tselected = false;
			trender(); */
			///////////////////trender///////////////////////////////////////
			/*
	        var str = "";
			for(var i = 0; i < draw_text_value.length; i++){
				if(!tselected && tisFocus && tfocusIndex === i){
					str += "|";
				}
				str += draw_text_value[i];
			}
			if(!tselected && tisFocus && tfocusIndex === draw_text_value.length){
				str += "|";
			}
			if(mySeltext!=null){
				var t = mySeltext;
				texts[t].text = str;
				oldtid=t;
			}else{
				texts[oldtid].text = str;
				draw_text_value=str;
			}
		*/
	/////////////////////////////////trender end//////////////////////////////////////////
					//drawtexts();
				/* }
				var str = "";
				for(var i =0; i < draw_text_value.length; i++){
					if(i !== tfocusIndex - 1){
						str += draw_text_value[i];
					}
				}

				draw_text_value = str;


				tfocusIndex --;
				if(tfocusIndex <0){
					tfocusIndex = 0;
				}
				trender(); */
				//////////////////////////trender////////////////////////////////////
				/*
				var str = "";
				for(var i = 0; i < draw_text_value.length; i++){
				if(!tselected && tisFocus && tfocusIndex === i){
					str += "|";
				}
				str += draw_text_value[i];
			}
			if(!tselected && tisFocus && tfocusIndex === draw_text_value.length){
				str += "|";
			}
			if(mySeltext!=null){
				var t = mySeltext;
				texts[t].text = str;
				oldtid=t;
			}else{
				texts[oldtid].text = str;
				draw_text_value=str;
			}
			*/
			//////////////////////////////////trender end/////////////////////////////////////////
				//drawtexts();
			/* } */
			/* if(tisFocus && e.key === "ArrowLeft"){
				tfocusIndex --;
				if(tfocusIndex < 0){
					tfocusIndex = 0;
				}
				trender(); */
				///////////////////////trender///////////////////////////////////////
				/*
				var str = "";
				for(var i = 0; i < draw_text_value.length; i++){
				if(!tselected && tisFocus && tfocusIndex === i){
					str += "|";
				}
					str += draw_text_value[i];
				}
				if(!tselected && tisFocus && tfocusIndex === draw_text_value.length){
					str += "|";
				}
			if(mySeltext!=null){
				var t = mySeltext;
				texts[t].text = str;
				oldtid=t;
			}else{
				texts[oldtid].text = str;
				draw_text_value=str;
			}
			*/
	////////////////////////////////trender end///////////////////////////////////////////
				//drawtexts();
			/* } */
			/* if(tisFocus && e.key === "ArrowRight"){
				tfocusIndex ++;
				if(tfocusIndex > draw_text_value.length){
					tfocusIndex = draw_text_value.length;
				}
				trender(); */
				//////////////////////trender////////////////////////////////////////
				/*
	        var str = "";
			for(var i = 0; i < draw_text_value.length; i++){
				if(!tselected && tisFocus && tfocusIndex === i){
					str += "|";
				}
				str += draw_text_value[i];
			}
			if(!tselected && tisFocus && tfocusIndex === draw_text_value.length){
				str += "|";
			}
		 if(mySeltext!=null){
		  var t = mySeltext;
	       texts[t].text = str;
			oldtid=t;
			}else{
				texts[oldtid].text = str;
				draw_text_value=str;
			}
			*/
	//////////////////////////////trender end/////////////////////////////////////////////
				//drawtexts();
			/* } */
			if(!tisCommandKey && tisFocus && (e.keyCode == 32 || (e.keyCode >= 65))){
				//draw_text_value += e.key;
				//tfocusIndex = draw_text_value.length;
				//alert(draw_text_value);
				//trender();
				//drawtexts();
				var str = "";
				for(var i = 0; i < draw_text_value.length; i++){
					// if(tfocusIndex === i){
						// str += e.key;
					// }
					//str += draw_text_value[i];
				}
				if(tfocusIndex === draw_text_value.length){
					//str += e.key;
				}

				if(mySeltext!=null){
					// var t = mySeltext;
					// texts[t].text = str;
					// draw_text_value = str;
					// tfocusIndex ++;
					// trender();
					///////////////////////trender///////////////////////////////////////
						/*
					var str = "";
					for(var i = 0; i < draw_text_value.length; i++){
					if(!tselected && tisFocus && tfocusIndex === i){
						str += "|";
					}
						str += draw_text_value[i];
					}
					if(!tselected && tisFocus && tfocusIndex === draw_text_value.length){
						str += "|";
					}
					if(mySeltext!=null){
					var t = mySeltext;
						texts[t].text = str;
					oldtid=t;
					}else{
					texts[oldtid].text = str;
					draw_text_value=str;
					}
					*/
					//////////////////////////////////trender end/////////////////////////////////////////
				}

			}

	 //document.getElementById('canvas_text').value=draw_text_value;
     // console.log(draw_text_value);

	//setCursor(draw_text_value);
}
function setCursor(pos){
	//console.log(tfocusIndex);
	var tag = document.getElementById("canvas_text");
	// Creates range object
	//var setpos = document.createRange();	
	// Creates object for selection
	//var set = window.getSelection();	
	// Set start position of range
	//console.log(tag,setpos,set,tag.childNodes);
	//setpos.setStart(tag.childNodes[0], pos);	
	// Collapse range within its boundary points
	// Returns boolean
	//setpos.collapse(true);	
	// Remove all ranges set
	//set.removeAllRanges();	
	// Add range with respect to range object.
	//set.addRange(setpos);	
	// Set cursorg on focus
	//document.getElementById("canvas_text").style.fontSize = text.size+"px";
	tag.focus();
}
function resettextbox(){
	if(edittextbox==true){
		//console.log("textResetted"+document.getElementById('draw_text_size').value);
		document.getElementById('draw_text_size').value = 16;
		var tsize = document.getElementById('draw_text_size').value;
		document.getElementById('canvas_text').style.height =  tsize +'px';
		document.getElementById('canvas_text').style.fontSize = tsize +'px';
		//canvas_text_div.style.display = 'none';
		//if(document.getElementById('canvas_text').value == ""){
		document.getElementById('canvas_text').value = 'Text';
		//}
		invalidate();
	}
	edittextbox=false;
}
//////////////////////////////////// end text /////////////////////////////////////////////////////////////
var draw_copy_click = false;
document.getElementById('draw_copy_click').onclick=function (e) {
	if(draw_copy_click == true){
		draw_copy_click = false;
	}else{
		draw_copy_click = true;
	}
}

document.getElementById('draw_copy').onclick=function (e) {
	copyFunction();
	document.getElementById('draw_copy_click').classList.remove("active");
}
function copyFunction(){
	if(draw_copy_click == true){
		draw_copy = true;
		if(boxes2_selectedindex!=null){
			//console.log(":::"+boxes2[i].type);
			var i = boxes2_selectedindex;
			var rect = new Box2;
			rect.x = boxes2[i].x;
			rect.y = boxes2[i].y+60;
			rect.w = boxes2[i].w
			rect.h = boxes2[i].h;
			rect.fill = boxes2[i].fill;
			rect.type = boxes2[i].type;
			rect.image = boxes2[i].image;
			rect.selectimage = boxes2[i].selectimage;
			var l = boxes2.length;
			rect.index = l;
			rect.showText = boxes2[i].showText;
			rect.shapecount = boxes2[i].shapecount;
			boxes2.push(rect);
			invalidate();
		}

		if(sellineindex!=null){
			var i = sellineindex;
			existingLines.push({
				startX: existingLines[i].startX,
				startY: existingLines[i].startY+60,
				endX: existingLines[i].endX,
				endY: existingLines[i].endY+60,
				type: existingLines[i].type
            });
			invalidate();
		}
		if(mySeltext!=null){
			var i = mySeltext;
			texts.push({
				text: texts[i].text,
				x: texts[i].x,
				y: texts[i].y+60,
				style: texts[i].style,
				color: texts[i].color,
				bold: texts[i].bold,
				italic: texts[i].italic,
				underline: texts[i].underline,
				size: texts[i].size
			});
			invalidate();
		}
		if(polygonclick){
			let points = [];
			for(var j=0;j<selectedPoint.length;j++){
				points.push({
					x: selectedPoint[j].x,
					y: selectedPoint[j].y+60,
					d: selectedPoint[j].d
				});
			}
			let rects = drawPolygon([points]);
			polygons.push({
				points: points,
				rects: rects[0],
				polygonTouch: false,
				zoneName: "",
				r: 0
			});
		}
		if(multpleselection.length!=0){
			for (var m = 0; m < multpleselection.length; m++) {
				var arrayname = multpleselection[m].arrayname;
				var arrayindex = multpleselection[m].arrayindex;
				if(arrayname=='boxes2'){
					var i = arrayindex;
					if(boxes2[i] != null){
						var rect = new Box2;
						rect.x = boxes2[i].x;
						rect.y = boxes2[i].y+dragheight+10;
						rect.w = boxes2[i].w
						rect.h = boxes2[i].h;
						rect.fill = boxes2[i].fill;
						rect.type = boxes2[i].type;
						rect.image = boxes2[i].image;
						rect.selectimage = boxes2[i].selectimage;
						var l = boxes2.length;
						rect.index = l;
						rect.showText = showText;
						rect.shapecount = shapecount;
						boxes2.push(rect);
					}
				}
				if(arrayname=='existingLines'){
					var i = arrayindex;
					existingLines.push({
						startX: existingLines[i].startX,
						startY: existingLines[i].startY+dragheight+10,
						endX: existingLines[i].endX,
						endY: existingLines[i].endY+dragheight+10,
						type: existingLines[i].type
					});
				}
				if(arrayname=='texts'){
					var i = arrayindex;
					texts.push({
						text: texts[i].text,
						x: texts[i].x,
						y: texts[i].y+dragheight+60,
						style: texts[i].style,
						color: texts[i].color,
						bold: texts[i].bold,
						italic: texts[i].italic,
						underline: texts[i].underline,
						size: texts[i].size
					});
				}
				if(arrayname == 'polygons'){
					//console.log("polygonsCalled");
					/* var i = arrayindex;
					let p1 = polygonPoints(5, mx, my);
					console.log(p1);
					let rects = drawPolygon([p1]);
					polygons.push({
						points: p1,
						rects: rects[0],
						polygonTouch: false,
						zoneName: zone_names,
						r: 0
					}); */
				}
			}
			invalidate();
		}
	}
	draw_copy_click = false;
}
function pastespecial(pastex,pastey){
	//console.log("paste called");
	if(boxes2_selectedindex!=null){	
		var i = boxes2_selectedindex;
		//console.log(boxes2[i]);
		if(boxes2[i] != null){
			var rect = new Box2;
			rect.x = pastex-boxes2[i].w/2;
			rect.y = pastey-boxes2[i].h/2;
			rect.w = boxes2[i].w
			rect.h = boxes2[i].h;
			rect.fill = boxes2[i].fill;
			rect.type = boxes2[i].type;
			rect.image = boxes2[i].image;
			rect.selectimage = boxes2[i].selectimage;
			var l = boxes2.length;
			rect.index = l;
			rect.showText = showText;
			rect.shapecount = shapecount;
			boxes2.push(rect);
			invalidate();
		}
	}
	
	if(sellineindex!=null){
		var i = sellineindex;
		var ewx=existingLines[i].startX - existingLines[i].endX;
		var ewy=existingLines[i].startY - existingLines[i].endY;
		existingLines.push({
			startX: pastex,
			startY: pastey,
			endX: pastex + ewx,
			endY: pastey + ewy,
			type: existingLines[i].type
		});
		invalidate();
	}
	
	if(mySeltext!=null){
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
			size: texts[i].size
		});
		invalidate();
	}
	
	if(multpleselection.length!=0){	
		for (var m = 0; m < multpleselection.length; m++) {
			var arrayname = multpleselection[m].arrayname;
			var arrayindex = multpleselection[m].arrayindex;
			var dx = multpleselection[m].dx;
			var dy = multpleselection[m].dy;
			var nx = dx + pastex;
			var ny = dy + pastey;
			if(arrayname=='boxes2'){		
				var i = arrayindex;
				if(boxes2[i] != null){
					var rect = new Box2;
					rect.x = nx-boxes2[i].w/2;
					rect.y = ny-boxes2[i].h/2;
					rect.w = boxes2[i].w
					rect.h = boxes2[i].h;
					rect.fill = boxes2[i].fill;
					rect.type = boxes2[i].type;
					rect.image = boxes2[i].image;
					rect.selectimage = boxes2[i].selectimage;
					var l = boxes2.length;
					rect.index = l;
					rect.showText = showText;
					rect.shapecount = shapecount;
					boxes2.push(rect);
				}
			}
			if(arrayname=='existingLines'){
				var i = arrayindex;
				var ewx=existingLines[i].startX - existingLines[i].endX;
				var ewy=existingLines[i].startY - existingLines[i].endY;
				existingLines.push({
					startX: nx,
					startY: ny,
					endX: nx + ewx,
					endY: ny + ewy,
					type: existingLines[i].type
				});
			}
			if(arrayname=='texts'){
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
					size: texts[i].size
				});
			}
 			if(arrayname == 'polygons'){
				//console.log("polygonsCalled2");
				/*var i = arrayindex;
				let p1 = polygonPoints(5, mx, my);
				console.log(p1);
				let rects = drawPolygon([p1]);
				polygons.push({
					points: p1,
					rects: rects[0],
					polygonTouch: false,
					zoneName: zone_names,
					r: 0
				});*/
			} 
		}
		invalidate();
	}
	draw_copy_special = false;
	draw_paste = false;
}

/* document.getElementById('draw_copy_special').onclick=function (e) {
	draw_copy_special = true;
} */
/* 
document.getElementById('draw_paste').onclick=function (e) {
	draw_paste = true;
} */

document.getElementById('draw_drag').onclick=function (e) {
  if(draw_drag==true){
    draw_drag = false;
  }else{
    draw_drag = true;
  }

}

/* document.getElementById('draw_select').onclick=function (e) {
	clear_select();
} */

function clear_select(){
	multpleselection = [];
	draw_drag = false;
	draw_drag_move = false;
	draw_copy_special = false;
	draw_paste = false;
	invalidate();
}

function showIcons() {
	if(showdragicon==true)
	{
	var dw = 28;
	var dh = 28;
	ctx.drawImage(dimg, showIcons_x-dw/2, showIcons_y-dh/2, dw, dh);
	canvas.style.cursor='crosshair';
	}
}


function invalidate() {
  canvasValid = false;
}

// Sets mx,my to the mouse position relative to the canvas
// unfortunately this can be tricky, we have to worry about padding and borders
function getMouse(e) {
	//console.log("sdfsdf");
    var element = canvas, offsetX = 0, offsetY = 0;
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

    if(scale_factor>0){
		for(s=0;s<scale_factor;s++){
			mx = mx / scaleFactor;
			my = my / scaleFactor;
        }
	}else{
        for(s=0;s<Math.abs(scale_factor);s++){
			mx = mx * scaleFactor;
			my = my * scaleFactor;
        }
    }
   //console.log(mx+','+my+' | '+mouse_changed_x+','+mouse_changed_y+' | '+scale_factor);
}


function drawlines() {
    //HEIGHT = canvas.height;
    //WIDTH = canvas.width;
    //ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if(mySelline!== null){
	
		existingRectLines[0].x = mySelline.startX;
		existingRectLines[0].y = mySelline.startY;
	
		existingRectLines[1].x = mySelline.endX;
		existingRectLines[1].y = mySelline.endY;
	
		existingRectLines[2].x = (mySelline.startX+mySelline.endX)/2;
		existingRectLines[2].y = (mySelline.startY+mySelline.endY)/2;

        var li=sellineindex;
        var line = existingLines[li];
        existingLines[li].startX = line.startX;
        existingLines[li].startY = line.startY;
        existingLines[li].endX = line.endX;
        existingLines[li].endY = line.endY;
    }

        /*
			context.strokeStyle = '#EEEEEE';
			context.lineWidth = 8;
			context.strokeRect(this.x+4,this.y+4,this.w-8,this.h-8);
			var square_lineWidth = 2;
			context.strokeStyle = '#777777';
			context.lineWidth = square_lineWidth;
			context.strokeRect(this.x+1,this.y+1,this.w-2,this.h-2);
			context.strokeRect(this.x+8,this.y+8,this.w-16,this.h-16);
		*/

        //ctx.strokeStyle = myRectColor;
        //ctx.lineWidth = 10;

	     ctx.strokeStyle = '#EEEEEE';
         ctx.lineWidth = 8;
	     ctx.lineCap = "square";
         var lines = false;
         for (var i = 0; i < existingLines.length; ++i) {
               var line = existingLines[i];
               if(line.type=='dash')
               {

				ctx.lineWidth = 4;
				ctx.strokeStyle = '#777777';

                ctx.beginPath();
                ctx.setLineDash([1]);
                ctx.moveTo(line.startX,line.startY);
                ctx.lineTo(line.endX,line.endY);
                ctx.closePath();
                ctx.stroke();

				ctx.lineWidth = 3;
				ctx.strokeStyle = '#EEEEEE';
				ctx.beginPath();
               ctx.setLineDash([]);
                ctx.moveTo(line.startX,line.startY);
                ctx.lineTo(line.endX,line.endY);
                ctx.closePath();
                ctx.stroke();

               }else{

				ctx.lineWidth = 8;
				ctx.strokeStyle = '#777777';

				ctx.beginPath();
                ctx.setLineDash([1]);
                ctx.moveTo(line.startX,line.startY);
                ctx.lineTo(line.endX,line.endY);
                ctx.closePath();
                ctx.stroke();

				ctx.lineWidth = 4;
				ctx.strokeStyle = '#EEEEEE';
				ctx.beginPath();
                ctx.setLineDash([]);
                ctx.moveTo(line.startX,line.startY);
                ctx.lineTo(line.endX,line.endY);
                ctx.closePath();
                ctx.stroke();
               }

               lines = true;
            }



            if (isDrawing) {
               //ctx.strokeStyle = "darkred";
              if(linetype=='dash'){
               ctx.lineWidth = 4;
			   ctx.strokeStyle = '#777777';
               ctx.beginPath();
               ctx.setLineDash([1]);
               ctx.moveTo(startX,startY);
               ctx.lineTo(mouseX,mouseY);
               ctx.closePath();
               ctx.stroke();

			   ctx.lineWidth = 3;
			   ctx.strokeStyle = '#EEEEEE';
               ctx.beginPath();
               ctx.setLineDash([]);
               ctx.moveTo(startX,startY);
               ctx.lineTo(mouseX,mouseY);
               ctx.closePath();
               ctx.stroke();
              }else{
               ctx.lineWidth = 8;
			   ctx.strokeStyle = '#777777';
               ctx.beginPath();
               ctx.setLineDash([1]);
               ctx.moveTo(startX,startY);
               ctx.lineTo(mouseX,mouseY);
               ctx.closePath();
               ctx.stroke();

			   ctx.lineWidth = 4;
			   ctx.strokeStyle = '#EEEEEE';
               ctx.beginPath();
               ctx.setLineDash([]);
               ctx.moveTo(startX,startY);
               ctx.lineTo(mouseX,mouseY);
               ctx.closePath();
               ctx.stroke();
              }

            }

            ctx.setLineDash([]);
            ctx.lineWidth = 2;
            ctx.strokeStyle = mySelColor;
            if(mySelline!== null){

                 ctx.fillStyle = mySelBoxColor;
             for (var i = 0; i < 2; i ++) {
               var cur = existingRectLines[i];
               ctx.fillRect(cur.x-5, cur.y-5, mySelBoxSize, mySelBoxSize);
               ctx.strokeRect(cur.x-5, cur.y-5, mySelBoxSize, mySelBoxSize);
               }
            }
    }

var textOfArray = [];
function drawtexts(){
	console.log("drawtexts3");
	textOfArray = [];
	//drawCalled = true;
    for (var i = 0; i < texts.length; i++) {
		var textd = texts[i];
		textd.width = ctx.measureText(textd.text).width;
		textd.height = textd.size;//16;
		//console.log("drawtexts::"+textd.width);
    }
	for (var i = 0; i < texts.length; i++) {
		var text = texts[i];
	    ctx.save();
        ctx.translate(text.x+(text.width/2), (text.y-(text.height-2))+((text.height+2)/2));
        ctx.rotate(text.r);
        ctx.translate(-(text.x+(text.width/2)), -((text.y-(text.height-2))+((text.height+2)/2)));
		ctx.font = ""+text.bold+" "+text.italic+" "+text.size+"px "+text.style;//"+text.underline+"//killedUnderline     
		//ctx.font = "bold 24px verdana, sans-serif ";
		if(text.underline == "underline"){
			textUnderLineFun(ctx,text.text,text.x,text.y,text.color,text.size,"rgba(0, 0, 0, 0.9)");
		}
		if(canvasTextFocusOut){
			document.getElementById('canvas_text_div').style.display = 'none';
			document.getElementById('canvas_text').style.display = "none";
			ctx.fillStyle = "rgba(0, 0, 0, 0.9)";//''+hexToRgbaColor;
			ctx.fillText(text.text, text.x, text.y);
			if(text.underline == "underline"){
				textUnderLineFun(ctx,text.text,text.x,text.y,text.color,text.size,"rgba(0, 0, 0, 0.9)");
			}
		}else{
			if(selectedText==i){
				console.log("2::"+mySeltext);
				//document.getElementById('canvas_text').value = ''+text.text;
				//console.log("text.size::"+text.size);
				document.getElementById("canvas_text").style.font = ""+texts[i].bold+" "+texts[i].italic+" "+texts[i].size+"px "+texts[i].style;
				//document.getElementById("canvas_text_div").style.left = texts[i].x+'px';
				//document.getElementById("canvas_text_div").style.top = texts[i].y-texts[i].size +'px';
				document.getElementById("canvas_text").style.left = texts[i].x+"px";
				document.getElementById("canvas_text").style.top = texts[i].y+"px";
				document.getElementById("canvas_text").style.fontSize = text.size+"px";
				ctx.fillStyle = 'rgba(255,255,255,0.10)';
				textOfArray = text.text;
				
				//console.log(text.text,textOfArray);
				var xt = text.x;
				var yt = text.y;
				for(let i=0;i<= textOfArray.length;i++){
					//console.log(yt*(i+1));
					ctx.fillText(textOfArray[i], xt, yt*(i+1));
				}
				////console.log(text.text,"::");
 				    var twidth = ctx.measureText(text.text).width;
					text.width = twidth;
					textAreaResizing(twidth,text.size,text.x,text.y);
				/* if(text.underline == "underline"){
					textUnderLineFun(ctx,text.text,text.x,text.y,text.color,text.size,"rgba(0, 0, 0, 0.9)");
				} */
			}else{
				ctx.fillStyle = "edittext_call1rgba(0, 0, 0, 0.9)";//''+hexToRgbaColor;
				ctx.fillText(text.text, text.x, text.y);
 				var twidth = ctx.measureText(text.text).width;
				text.width = twidth;
				textAreaResizing(twidth,text.size,text.x,text.y);
			}
		}
		//console.log(mySeltext);
        var twidth = ctx.measureText(text.text).width;
        text.width = twidth;
		textAreaResizing(twidth,text.size,text.x,text.y);
		//textUnderLineFun(ctx,text.text,text.x,text.y,text.color,text.size);
        if(selectedText==i){
			//console.log("selectedText-before::"+text.width);
			if(text.underline == "underline"){
				////console.log("drawText-selected::"+text.underline+"::"+draw_text_underline);
				if(draw_text_underline){
					textUnderLineFun(ctx,text.text,text.x,text.y,text.color,text.size,"rgba(0, 0, 0, 0.9)");
				}
			}
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'rgba(15,98,171,0.9)';
			ctx.strokeRect(text.x-5, text.y-(text.size), twidth+10, text.height+10);
			if(canvaspanmove){
				console.log(mouse_changed_x,mouse_changed_y);
				document.getElementById("canvas_text_div").style.left = Number((text.x-5)+mouse_changed_x)+"px";
				document.getElementById("canvas_text_div").style.top = Number((text.y-(text.size))+mouse_changed_y)+"px";
			}
			 
			 /* if(draw_text_underline){
				 text.underline = "underline";
			 }else{
				 text.underline = "";	
			 } */
			// text.underline = "";
			/* if(text.underline = "underline"){
				
			} */

			settextproperty(i);
		}
	    ctx.restore();

		if(selectedText==i){
			var half = mySelBoxSize / 2;
			//    8
			// 0  1  2
			// 3     4
			// 5  6  7

			// top left, middle, right
			selectionHandlestexts[0].x = text.x-5-half;
			selectionHandlestexts[0].y = text.y-(text.height+2)-half;
		
			selectionHandlestexts[1].x = text.x-5+twidth+10-half;
			selectionHandlestexts[1].y = text.y-(text.height+2)-half;
		
			selectionHandlestexts[2].x = text.x-5-half;
			selectionHandlestexts[2].y = selectionHandlestexts[0].y+(text.height+10);
		
			selectionHandlestexts[3].x = text.x-5+twidth+10-half;
			selectionHandlestexts[3].y = selectionHandlestexts[2].y;
		
			/* selectionHandlestexts[4].x = text.x+twidth/2-half;
			selectionHandlestexts[4].y = text.y-(text.height)-30; */
			ctx.fillStyle = mySelBoxColor;
			for (var t = 0; t < 5; t ++) {
				var cur = selectionHandlestexts[t];
				ctx.save();
				ctx.translate(text.x+(text.width/2), (text.y-(text.height-2))+((text.height+2)/2));
				ctx.rotate(text.r);
				ctx.translate(-(text.x+(text.width/2)), -((text.y-(text.height-2))+((text.height+2)/2)));
				//ctx.translate(cur.x+(half), cur.y+(half));
				//ctx.rotate(this.r);
				//ctx.translate(-(cur.x+(half)), -(cur.y+(half)));
	
				if(t==4){
/* 					const radius = 6;
					ctx.strokeStyle = 'rgba(15,98,171,0.9)';
					ctx.lineWidth = 2;
					ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(cur.x+half,cur.y+half);
					ctx.lineTo(text.x+twidth/2,selectionHandlestexts[0].y+half);
					ctx.closePath();
					ctx.stroke();
					ctx.beginPath();
					ctx.lineWidth = 2;
					ctx.arc(cur.x+half, cur.y, radius, 0, 2 * Math.PI, false);
					//ctx.fillStyle = 'blue';
					ctx.fill();
					ctx.stroke(); */
				}else{
					ctx.strokeStyle = 'rgba(15,98,171,0.9)';
					ctx.lineWidth = 2;
					ctx.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
					ctx.strokeRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
				}
				ctx.restore();
				//ctx.fillStyle = 'black';
				//ctx.fillText(cur.x+','+cur.y, cur.x, cur.y);
				//console.log(this.r);
			}
	
			const newTopLeft = rotate(
			selectionHandlestexts[0].x,
			selectionHandlestexts[0].y,
			text.x+text.width/2-half,
			(text.y-(text.height-2))+((text.height+2)/2),
			text.r
			);
			selectionHandlestexts[0].x = newTopLeft[0];
			selectionHandlestexts[0].y = newTopLeft[1];
	
			const newTopRight = rotate(
			selectionHandlestexts[1].x,
			selectionHandlestexts[1].y,
			text.x+text.width/2-half,
			(text.y-(text.height-2))+((text.height+2)/2),
			text.r
			);
	
			selectionHandlestexts[1].x = newTopRight[0];
			selectionHandlestexts[1].y = newTopRight[1];
	
			const newBottomLeft = rotate(
			selectionHandlestexts[2].x,
			selectionHandlestexts[2].y,
			text.x+text.width/2-half,
			(text.y-(text.height-2))+((text.height+2)/2),
			text.r
			);
	
			selectionHandlestexts[2].x = newBottomLeft[0];
			selectionHandlestexts[2].y = newBottomLeft[1];
			const newBottomRight = rotate(
			selectionHandlestexts[3].x,
			selectionHandlestexts[3].y,
			text.x+text.width/2-half,
			(text.y-(text.height-2))+((text.height+2)/2),
			text.r
			);
	
			selectionHandlestexts[3].x = newBottomRight[0];
			selectionHandlestexts[3].y = newBottomRight[1];
	
			if(isResizeDragtext == false){
				const newTop = rotate(
				selectionHandlestexts[4].x,
				selectionHandlestexts[4].y,
				text.x+text.width/2-half,
				(text.y-(text.height-2))+((text.height+2)/2),
				text.r
				);
				selectionHandlestexts[4].x = newTop[0];
				selectionHandlestexts[4].y = newTop[1];
				//oldr=this.r;
			}
			//console.log(text);
        }
    }
	if(selectedText == -1){
		//console.log("selectedText -1");
		resettextbox();
		//console.log("selectedID::"+document.getElementById('draw_text_size').value);
		document.getElementById('draw_text_size').value = 16;
		var tsize = document.getElementById('draw_text_size').value;
		document.getElementById('canvas_text').style.height =  tsize +'px';
		document.getElementById('canvas_text').style.fontSize = tsize +'px';
		//canvas_text_div.style.display = 'none';
		//if(document.getElementById('canvas_text').value == ""){
		document.getElementById('canvas_text').value = 'Text';
		//canvas_text_div.style.left = texts[i].x+'px';
		//canvas_text_div.style.top = texts[i].y-texts[i].size +'px';
		//document.getElementById('canvas_text_div').style.left = +'px';
		
		//}
		document.getElementById('draw_text_bold').classList.remove("active");
		draw_text_bold = false;
        text_bold = '';
		document.getElementById('draw_text_italic').classList.remove("active");
		draw_text_italic = false;
        text_italic='';
		document.getElementById('draw_text_underline').classList.remove("active");
		draw_text_underline = false;
        text_underline='';
		//textUnderLineFun(ctx,text.text,text.x,text.y,text.color,text.size,"rgba(15, 98, 171, 0.1)");
		//console.log("box empty iruntha varum::"+text_underline+"::",document.getElementById('draw_text_underline').classList);
	}
	//
	
}
function hexToRgbA(hex){
	console.log(hex);
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}
function textUnderLineFun(context, text, x, y, color, textSize,lineColor){//killedUnderline
	//alert(text.underline);
 	context.save();
	var textWidth =context.measureText(text).width;
	var startX;
	var startY = y+(parseInt(textSize)/15);
	var endX;
	var endY = startY;
	var underlineHeight = parseInt(textSize)/15;
	if(underlineHeight < 1){
		underlineHeight = 1;
	}
	context.beginPath();
	startX = x;
	endX = x + textWidth;	
	context.strokeStyle = lineColor;
	//context.lineWidth = underlineHeight;
	context.moveTo(startX,y+2);
	context.lineTo(endX+6,y+2);
	context.stroke();/*  */
}


// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(x, y, textIndex) {
    var text = texts[textIndex];
    //return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
	 return (x >= text.x-5-half && x <= text.x-5 + text.width+10-half && y >= (text.y-(text.height+2)-half) - text.height && y <= text.y);
}

function settextproperty(index){
	
	var text = texts[index];

	//draw_text_value = text.text;
    //ctx.font = ""+text.bold+" "+text.italic+" "+text.underine+" "+text.size+"px "+text.style;

	document.getElementById('draw_text_style').value = text.style;
	//console.log("settextproperty-before::"+text.size);
	//console.log("textvalue::"+document.getElementById('draw_text_size').value);
	document.getElementById('draw_text_size').value = parseFloat(text.size).toFixed(2);

	selectfontcolor(text.color);
	text_bold = text.bold;
	text_italic = text.italic;
	text_underline = text.underline;
	//console.log(text_bold,text_italic,text_underline);
	if(text_bold != ''){
		document.getElementById('draw_text_bold').classList.add("active");
		draw_text_bold = true;
	}else{
		document.getElementById('draw_text_bold').classList.remove("active");
		draw_text_bold = false;
        text_bold = '';
	}
	if(text_italic != ''){
		document.getElementById('draw_text_italic').classList.add("active");
		draw_text_italic = true;
	}else{
		document.getElementById('draw_text_italic').classList.remove("active");
		draw_text_italic = false;
        text_italic = '';
	}
	//console.log("text_italic::"+text_italic);
	if(text_underline == 'underline'){
		document.getElementById('draw_text_underline').classList.add("active");
		draw_text_underline = true;
		//text_underline = 'underline';
	}else{
		document.getElementById('draw_text_underline').classList.remove("active");
		draw_text_underline = false;
        text_underline = '';
	}
	//console.log('text_underline::'+text_underline+"::"+document.getElementById('draw_text_underline').classList);
	//document.getElementById('canvas_text_div').style.display = 'block';

}

function dragmultipleselection(x,y){
	console.log("dragmultipleselection::"+multpleselection);
	startX = 0; startY = 0;
	//polyMultiSelect = [];
    for(var i = 0; i < multpleselection.length; i++) {
        var arrayname = multpleselection[i].arrayname;
        var arrayindex = multpleselection[i].arrayindex;
        var dx = multpleselection[i].dx;
        var dy = multpleselection[i].dy;
        var nx = dx + x;
        var ny = dy + y;
		multpleselection[i].x = nx;
        multpleselection[i].y = ny;
        if(arrayname=='boxes2'){
           boxes2[arrayindex].x = nx;
           boxes2[arrayindex].y = ny;
		   //console.log(boxes2[arrayindex].x,boxes2[arrayindex].y);
        }
        if(arrayname=='existingLines'){
           var dxe = multpleselection[i].dxe;
           var dye = multpleselection[i].dye;
           var nxe = dxe + x;
           var nye = dye + y;
           existingLines[arrayindex].startX = nx;
           existingLines[arrayindex].startY = ny;
           existingLines[arrayindex].endX = nxe;
           existingLines[arrayindex].endY = nye;
        }
        if(arrayname=='texts'){
           texts[arrayindex].x = nx;
           texts[arrayindex].y = ny;
        }
		
		if(arrayname == 'polygons'){
			multiSelectPolygon = true;
			if(startX == 0 && startY == 0){
				startX = multpleselection[i].points[0].x;
				startY = multpleselection[i].points[0].y;
			}
			//console.log(startX,startY);
			multiSelectID = i;
			console.log(multpleselection[i].points);
			for(let k = 0; k < multpleselection[i].points.length; k++){
				
				//console.log(i,k,x,y,multpleselection[i].points[k].x, multpleselection[i].points[k].y);
				var pointX = 0;
				var pointY = 0;
				pointX = (x - startX);
				pointY = (y - startY);
				multpleselection[i].points[k].x = Number(multpleselection[i].points[k].x) + pointX;
				multpleselection[i].points[k].y = Number(multpleselection[i].points[k].y) + pointY;
			}
			startX = x;
			startY = y;		
			drawPolygon(polygons.map(({points}) => points)); 
		}
		//console.log(multpleselection);
    }
}

function draghandleMouseDown(e) {
	//console.log("draghandleMouseDown::");
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
	console.log("draghandleMouseUp::");
	e.preventDefault();
    e.stopPropagation();
    // the drag is over, clear the dragging flag
	// dragisDown = false;
    var minx_1 = Number.POSITIVE_INFINITY;
	var miny_1 = Number.POSITIVE_INFINITY;
	var maxx_1 = 0;
	var maxy_1 = 0;
	 //console.log("multpleselection[i]::",multpleselection);
	if(isResizeMultiDrag == false && multpleselection.length == 0){
		var x = dragstartX;
		var y = dragstartY;
		
		var minx = Number.POSITIVE_INFINITY;
		var miny = Number.POSITIVE_INFINITY;
		var maxx = 0;
		var maxy = 0;
		multpleselection = [];
		// multpleselection boxes2 existingLines
		//console.log(prevMultiSelect,multpleselection);
		//setTimeout(() => {
			/* if(prevMultiSelect[i] != null || prevMultiSelect[i] != undefined){
				multpleselection = prevMultiSelect;
				console.log("prevMultiSelect::"+prevMultiSelect);
			} */
			
			if(multpleselection[i] == undefined){
				//console.log("multpleselection::"+multpleselection);
				for (var i = 0; i < boxes2.length; i++) {
					if(boxes2[i] != null){
						console.log("coming",x,y,dragwidth,dragheight);	
						console.log(isNegative(dragwidth));
						//if(x <= boxes2[i].x && x+dragwidth >= boxes2[i].x && y <= boxes2[i].y && y+dragheight >= boxes2[i].y){
						if(isNegative(dragwidth) == false){
							console.log(":widthDrag:"+x,boxes2[i].x);
							if((x <= boxes2[i].x) && x+dragwidth >= boxes2[i].x && (y <= boxes2[i].y) && y+dragheight >= boxes2[i].y){
								
								//if(prevMultiSelect[i] != null){
									//multpleselection = prevMultiSelect;
								//}else{
									//console.log(boxes2);
									/* if(prevMultiSelect[i] == null){*/
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
											h:boxes2[i].h,
											r:boxes2[i].r
										}); 
									/*}else{
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
									//}
								//}
							}
						}else{
							modifiedX = x+dragwidth;
							if((modifiedX <= boxes2[i].x || modifiedX <= boxes2[i].x + boxes2[i].w) && modifiedX+(dragwidth*(-1)) >= boxes2[i].x && (y <= boxes2[i].y || y <= boxes2[i].y + boxes2[i].h) && y+dragheight >= boxes2[i].y){
								
								//if(prevMultiSelect[i] != null){
									//multpleselection = prevMultiSelect;
								//}else{
									//console.log(boxes2);
									/* if(prevMultiSelect[i] == null){*/
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
											h:boxes2[i].h,
											r:boxes2[i].r
										}); 
									/*}else{
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
									//}
								//}
							}
						}
					}
				}
			
				//console.log(prevMultiSelect);
				//console.log(multpleselection);//KillMulti
		
				for (var i = 0; i < existingLines.length; i++) {
					if(x <= existingLines[i].startX && x+dragwidth >= existingLines[i].startX && y <= existingLines[i].startY && y+dragheight >= existingLines[i].startY){
						minx = Math.min(minx, existingLines[i].startX)
						//  x = minx;
						miny = Math.min(miny, existingLines[i].startY)
						//  y = miny;
						maxx = Math.max(maxx, existingLines[i].startX);
						maxy = Math.max(maxy, existingLines[i].startY);
		
						multpleselection.push({
							arrayname: 'existingLines',
							arrayindex: i,
							dx:existingLines[i].startX,
							dy:existingLines[i].startY,
							dxe:existingLines[i].endX,
							dye:existingLines[i].endY
						});
					}
				}
		
				for (var i = 0; i < texts.length; i++) {
					if(x <= texts[i].x && x+dragwidth >= texts[i].x && y <= texts[i].y && y+dragheight >= texts[i].y){
		
						minx = Math.min(minx, texts[i].x);
						// x = minx;
						miny = Math.min(miny, texts[i].y-texts[i].size);
						// y = miny;
						maxx = Math.max(maxx, texts[i].x + texts[i].width);
						maxy = Math.max(maxy, texts[i].y + texts[i].height);
		
						multpleselection.push({
							arrayname: 'texts',
							arrayindex: i,
							dx:texts[i].x,
							dy:texts[i].y
						});
					}
				}
				for(let i = 0; i < polygons.length; i++){
					
					if (polygons[i] != null) {
						var minXofPoly;
						var maxXofPoly;
						var minYofpoly;
						var maxYofPoly;
						var xCordPoly = [];
						var yCordPoly = [];
						
						for(let k = 0; k < polygons[i].points.length; k++){
							xCordPoly.push(polygons[i].points[k].x);
							yCordPoly.push(polygons[i].points[k].y);
						}
						function findMin(arrayVal) {   
							return Math.min(...arrayVal); 
						} 
						function findMax(arrayVal) {   
							return Math.max(...arrayVal); 
						} 	
						//console.log(findMin(xCordPoly),findMin(yCordPoly),findMax(xCordPoly),findMax(yCordPoly));
						//if ((x <= polygons[i].points[0].x || x <= polygons[i].points[0].x + polygons[i].rects[i].w) && x + dragwidth >= polygons[i].rects[i].x && (y <= polygons[i].rects[i].y || y <= polygons[i].rects[i].y + polygons[i].rects[i].h) && y + dragheight >= polygons[i].rects[i].y) {
						if(x <= findMin(xCordPoly) && x+dragwidth >= findMax(xCordPoly) && y <= findMin(yCordPoly) && y+dragheight >= findMax(yCordPoly)){
							minx = Math.min(minx, findMin(xCordPoly))
							// x = minx;
							miny = Math.min(miny, findMin(yCordPoly))
							// y = miny;
							maxx = Math.max(maxx, findMax(xCordPoly));
							maxy = Math.max(maxy, findMax(yCordPoly));
		
							multpleselection.push({
								arrayname: 'polygons',
								arrayindex: i,
								points: polygons[i].points,
								rects: polygons[i].rects,
								polygonTouch: polygons[i].polygonTouch,
								zoneName: polygons[i].zoneName
							});
							multiSelectPolygon = true;
						}
					}
				}
			}
		//},10);
		prevMultiSelect = multpleselection;
		console.log(prevMultiSelect);
		//console.log(multpleselection);
		function isNegative(negWidth){
			if(Math.sign(negWidth) == -1){
				return true;
			}
			return false;
		}
		getMouse(e);
		if((mx<dragstartX && my<dragstartY) || (mx>dragwidth+dragstartX && my>dragheight+dragstartY)){
			draw_drag = false;
			multiDragInnerRect = false;
			dragstartX=0;
			dragstartY=0;
			dragwidth=0;
			dragheight=0;
		}

		dragstartX = minx;
		dragstartY = miny;
		dragwidth = Math.abs(maxx - dragstartX);
		dragheight = Math.abs(maxy - dragstartY);

		for (var i = 0; i < multpleselection.length; i++) {
			multpleselection[i].dx = multpleselection[i].dx - dragstartX;
			multpleselection[i].dy = multpleselection[i].dy - dragstartY;
			if(multpleselection[i].arrayname=='existingLines'){
				multpleselection[i].edx = multpleselection[i].edx - dragstartX;
				multpleselection[i].edy = multpleselection[i].edy - dragstartY;
			}
		}
		if(multpleselection.length==0){
			dragstartX=0;
			dragstartY=0;
			dragwidth=0;
			dragheight=0;
		}
		console.log("coming here");
	}else{
		
		for (var i = 0; i < multpleselection.length; i++) {
			minx_1 = Math.min(minx_1, multpleselection[i].x)
			// x = minx;
			miny_1 = Math.min(miny_1, multpleselection[i].y)
			// y = miny;
			maxx_1 = Math.max(maxx_1, multpleselection[i].x + multpleselection[i].w);
			maxy_1 = Math.max(maxy_1, multpleselection[i].y + multpleselection[i].h);
		}
		dragstartX = minx_1;
		dragstartY = miny_1;
		dragwidth = Math.abs(maxx_1 - dragstartX);
		dragheight = Math.abs(maxy_1 - dragstartY);
		isInsideRect(mx, my, dragstartX,dragstartY,dragwidth,dragheight);
		
		
		//if((mx<dragstartX && my<dragstartY) || (mx>dragwidth+dragstartX && my>dragheight+dragstartY)){

		if(mx > dragstartX && mx < dragstartX + dragwidth && my > dragstartY && my < dragstartY + dragheight){
			multiDragInnerRect = true;
		}else{
			dragstartX=0;
			dragstartY=0;
			dragwidth=0;
			dragheight=0;
			multpleselection = [];
			draw_drag = false;
			multiDragInnerRect = false;
			document.getElementById('draw_drag').classList.remove("active");
		}
	}
    dragisDown = false;
    invalidate();
}
function isInsideRect(x, y, a, b, c, d) {
	console.log(x,y,a,b,c,d); 
  return x > a && x < a + c && y > b && y < b + d;
}

function draghandleMouseOut(e) {
	console.log("draghandlemouseout::");
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    dragisDown = false;
}

function draghandleMouseMove(e) {
	//console.log("draghandleMouseMove::");  
	e.preventDefault();
    e.stopPropagation();
    getMouse(e);
    // if we're not dragging, just return
    if (!dragisDown) {
        return;
    }

    // get the current mouse position
    dragmouseX = parseInt(mx);
    dragmouseY = parseInt(my);

    // Put your mousemove stuff here

    // clear the canvas
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    // calculate the rectangle width/height based
    // on starting vs current mouse position
    dragwidth = dragmouseX - dragstartX;
    dragheight = dragmouseY - dragstartY;

    // draw a new rect from the start position
    // to the current mouse position
    //ctx.strokeRect(dragstartX, dragstartY, width, height);
    invalidate();
}

function drawdrag(){ 
console.log("drawDrag_call");
   if(draw_drag==true && multpleselection.length<1){
		//ctx.fillStyle = 'rgba(0, 0, 0, 0)';
		ctx.fillStyle = 'rgba(15, 98, 171, 0.3)';
		ctx.fillRect(dragstartX, dragstartY, dragwidth, dragheight);
		ctx.strokeRect(dragstartX, dragstartY, dragwidth, dragheight);
	}
	//console.log(multpleselection);
	if(multpleselection.length>0){
		//console.log("drawdrag");
	    ctx.lineWidth = 2;
	    ctx.save();
        ctx.translate(dragstartX+(dragwidth/2), dragstartY+(dragheight/2));
		
        ctx.rotate(dragangle);
        ctx.translate(-(dragstartX+(dragwidth/2)), -(dragstartY+(dragheight/2)));
		ctx.fillStyle = 'rgba(0, 0, 0, 0)';
		ctx.fillRect(dragstartX, dragstartY, dragwidth, dragheight);
		ctx.strokeRect(dragstartX, dragstartY, dragwidth, dragheight);
		ctx.restore();
		dragresizehandle[0].x = dragstartX - half;
		dragresizehandle[0].y = dragstartY - half;
	
		dragresizehandle[1].x = (dragstartX + dragwidth) - half;
		dragresizehandle[1].y = dragstartY - half;
	
		dragresizehandle[2].x = dragstartX - half;
		dragresizehandle[2].y = (dragstartY+dragheight) - half;
	
		dragresizehandle[3].x = (dragstartX + dragwidth) - half;
		dragresizehandle[3].y = (dragstartY+dragheight) - half;
	
		dragresizehandle[4].x = (dragstartX + dragwidth/2) - half;
		dragresizehandle[4].y = dragstartY-30;
		
		for(var i=0; i<5; i++){
			ctx.save();
			ctx.translate(dragstartX+(dragwidth/2), dragstartY+(dragheight/2));
			ctx.rotate(dragangle);
			ctx.translate(-(dragstartX+(dragwidth/2)), -(dragstartY+(dragheight/2)));
			ctx.fillStyle = '#ffffff';
			if(i==4){
				const radius = 6;
				//context.strokeStyle = '#003300';
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.setLineDash([]);
				ctx.moveTo(dragresizehandle[i].x+half,dragresizehandle[i].y+half);
				ctx.lineTo(dragresizehandle[i].x+half,dragstartY);
				ctx.closePath();
				ctx.stroke();
				ctx.beginPath();
				ctx.lineWidth = 2;
				ctx.arc(dragresizehandle[i].x+half, dragresizehandle[i].y, radius, 0, 2 * Math.PI, false);
				//context.fillStyle = 'blue';
				ctx.fill();
				ctx.stroke();
			}else{
				ctx.fillRect(dragresizehandle[i].x, dragresizehandle[i].y, mySelBoxSize, mySelBoxSize);
				ctx.strokeRect(dragresizehandle[i].x, dragresizehandle[i].y, mySelBoxSize, mySelBoxSize);
			}
			ctx.restore();
			const newTopLeft = rotate(
				dragresizehandle[i].x,
				dragresizehandle[i].y,
				dragstartX + dragwidth/2-half,
				dragstartY + dragheight/2-half,
				dragangle
			);
			dragresizehandle[i].x = newTopLeft[0];
			dragresizehandle[i].y = newTopLeft[1];
		}
		for(var i=0; i<multpleselection.length; i++){
			var arrayname = multpleselection[i].arrayname;
			var arrayindex = multpleselection[i].arrayindex;
			var dx = multpleselection[i].dx;
			var dy = multpleselection[i].dy;
			if(arrayname=='boxes2'){
 				var oldx = multpleselection[i].x;
				var oldy = multpleselection[i].y;
				var originalWidthToHeightRatio = multpleselection[i].w/multpleselection[i].h;
				var oldw = multpleselection[i].w;
				var oldh = multpleselection[i].h;
				var oldr = multpleselection[i].r;
				const newTopLeft = rotate(
					oldx,
					oldy,
					dragstartX + dragwidth/2-half,
					dragstartY + dragheight/2-half,
					dragangle
				);
				//console.log(newTopLeft);
				boxes2[arrayindex].x = newTopLeft[0];
				boxes2[arrayindex].y = newTopLeft[1];
				boxes2[arrayindex].r = oldr+dragangle;
				
				//console.log(dragangle,oldr);
				//boxes2[arrayindex].r = dragangle;
			}
			if(arrayname=='polygons'){
 				/*//console.log("polygonscalled4::"+multpleselection[i].points);//KillMulti
 				multiSelectPolygon = true;
				multiSelectID = i;
			 	for(var j=0;j<multpleselection[i].points.length;j++){
					console.log(dragstartX,multpleselection[i].points[j].x,dragstartY,multpleselection[i].points[j].y);
					//points.push({
						multpleselection[i].points[j].x = dragstartX - multpleselection[i].points[j].x,
						multpleselection[i].points[j].y = dragstartY - multpleselection[i].points[j].y,
						multpleselection[i].points[j].d = multpleselection[i].points[j].d
					//});
				}
				//drawPolygon([multpleselection[i].points]); 
				for(let k = 0; k < multpleselection[i].points.length; k++){
					//console.log("polygonscalled4::"+multpleselection[i].points[k].x+"::::"+multpleselection[i].points[k].y);
					var pointX = 0;
					var pointY = 0;
					pointX = (dragstartX - startX);
					pointY = (dragstartY - startY);
					multpleselection[i].points[k].x = multpleselection[i].points[k].x + pointX;
					multpleselection[i].points[k].y = multpleselection[i].points[k].y + pointY;
				} 
				//drawPolygon([multpleselection[i].points]);
				startX = x;
				startY = y; 
				let points = [];
				for(var j=0;j<multpleselection[i].points.length;j++){
					points.push({
						x: multpleselection[i].points[j].x,
						y: multpleselection[i].points[j].y+60,
						d: multpleselection[i].points[j].d
					});
				}
				let rects = drawPolygon([points]);
				polygons.push({
					points: points,
					rects: rects[0],
					polygonTouch: false,
					zoneName: "",
					r: 0
				}); */
			}
		}
    }
} 

function resizeMultiDrag(task,doldx,doldy,doldw,doldh){
	console.log("resizeMultiDrag");
	//var doldx = dragstartX;
    //var doldy = dragstartY;
	var doriginalWidthToHeightRatio = dragwidth/dragheight;
	//var doldw = dragwidth;
	//var doldh = dragheight;

	for (var i = 0; i < multpleselection.length; i++) {
		var arrayname = multpleselection[i].arrayname;
        var arrayindex = multpleselection[i].arrayindex;
        var dx = multpleselection[i].dx;
        var dy = multpleselection[i].dy;


		if(arrayname=='boxes2'){

		   var oldx = multpleselection[i].x;
           var oldy = multpleselection[i].y;
	       var originalWidthToHeightRatio = multpleselection[i].w/multpleselection[i].h;
	       var oldw = multpleselection[i].w;
	       var oldh = multpleselection[i].h;

		   var dragdeskratio = doldw / boxes2[arrayindex].w;
		   var dragdeskxratio = doldw / dx;
		   var dragdeskyratio = doldh / dy;

			if(task=='topleft'){
				boxes2[arrayindex].w +=  ((doldx - dragstartX)/ dragdeskratio);
				boxes2[arrayindex].h = boxes2[arrayindex].w / originalWidthToHeightRatio;
				boxes2[arrayindex].x += ((doldx - dragstartX)/ dragdeskxratio)-(doldx - dragstartX);
				boxes2[arrayindex].y += ((doldy - dragstartY)/ dragdeskyratio)-(doldy - dragstartY);
				multpleselection[i].x = boxes2[arrayindex].x;
				multpleselection[i].y = boxes2[arrayindex].y;
			}

		if(task=='topright'){
			 boxes2[arrayindex].w += ((dragwidth - doldw)/ dragdeskratio);
			   boxes2[arrayindex].h = boxes2[arrayindex].w / originalWidthToHeightRatio;

			 boxes2[arrayindex].x += ((dragwidth - doldw) / dragdeskxratio);
			   boxes2[arrayindex].y += ((doldy - dragstartY)/ dragdeskyratio)-(doldy - dragstartY);
			   multpleselection[i].x = boxes2[arrayindex].x;
			   multpleselection[i].y = boxes2[arrayindex].y;
		}
		if(task=='bottomleft'){
			 boxes2[arrayindex].w +=  ((doldx - dragstartX)/ dragdeskratio);
			   boxes2[arrayindex].h = boxes2[arrayindex].w / originalWidthToHeightRatio;

			 boxes2[arrayindex].x += ((doldx - dragstartX)/ dragdeskxratio)-(doldx - dragstartX);
			   boxes2[arrayindex].y += ((dragheight - doldh)/ dragdeskyratio);//-(dragstartY - doldy);
			   multpleselection[i].x = boxes2[arrayindex].x;
			  multpleselection[i].y = boxes2[arrayindex].y;
		}
		if(task=='bottomright'){
			 boxes2[arrayindex].w += ((dragwidth - doldw)/ dragdeskratio);
			   boxes2[arrayindex].h = boxes2[arrayindex].w / originalWidthToHeightRatio;

			   boxes2[arrayindex].x += ((dragwidth - doldw) / dragdeskxratio);
			   boxes2[arrayindex].y += ((dragheight - doldh)/ dragdeskyratio);
			   multpleselection[i].x = boxes2[arrayindex].x;
			   multpleselection[i].y = boxes2[arrayindex].y;
		}
		if(task=='rotate'){
			var dx = mx - (dragstartX+dragwidth/2);
            var dy = my - (dragstartY+dragheight/2);
            var angle = Math.atan2(dy, dx);
            dragangle = angle - (-1.50);
		}

	  }

	 }
	console.log(multpleselection);
}

//////// dummy //////////////////////////////////////////////////////
	/*
	 var width = 70;
       var height = 45;
       addRect(414 - (width / 2), 151 - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img);
	   addRect(568 - (width / 2), 151 - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img);
	   addRect(414 - (width / 2), 257 - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img);
	   addRect(568 - (width / 2), 257 - (height / 2), width, height, 'rgba(220,205,65,0.7)','image',singledesk_img,singledesk_select_img);
	*/
//////// dummy end /////////////////////////////////////////////////
document.getElementById('heading-1-1').onclick=function (e) {
	//alert("heading-1-1");
}
document.getElementById('heading-1-2').onclick=function (e) {
	//alert("heading-1-2");
}
var assignBtnClasses = document.getElementsByClassName('assignBtn');
var unassignBtnClasses = document.getElementsByClassName('unassign-desk');
var unassignAccordin = document.getElementsByClassName('unassignAccordin');
var assignAccordin = document.getElementsByClassName('assignAccordin');

for(let i = 0; i < assignBtnClasses.length;i++){
	assignBtnClasses[i].onclick = function(e){
		assignValToShapes(this.parentNode);
	}
}
for(let i = 0; i < unassignBtnClasses.length;i++){
	unassignBtnClasses[i].onclick = function(e){
		assignValToShapes(this.parentNode);
	}
}
var unAssignedContainer = document.getElementById('accordion-1');
var assignedContainer = document.getElementById('accordion-1-2');
var unassignColapsBtn = document.getElementById('unassignColapsBtn');
var assignColapsBtn = document.getElementById('assignColapsBtn');
var acc_1_1_unAsignCount = document.getElementById('acc_1_1_unAsignCount');
var acc_1_2_asignCount = document.getElementById('acc_1_2_asignCount');

/*---------Shapes Start----------------*/
var unAssignedIds = [];
var assignedIds = [];
var tempAssignText;
var existingAssignText = false;
var directUnassign = false;

function assignValToShapes(a){
	console.log(selectedShape.image.id);
	tempAssignText = selectedShape.showText;
	if(selectedShape != undefined && mySel != null){
		if(selectedShape.image.id == "singledesk_img" || selectedShape.image.id == "singledesk_select_img" || selectedShape.image.id == "singledesk_withoutText_img" || selectedShape.image.id == "shape5_img" || selectedShape.image.id == "shape5_select_img" || selectedShape.image.id == "shape5_withoutText_img"){
			if(a.childNodes[3].classList == "assignBtn"){	
				var selectedNameToAssign = a.childNodes[0].nextSibling.innerText;
				var unassignElemToPush = a.parentNode.parentNode;
				a.childNodes[3].innerText = "Unassign";
				a.childNodes[3].classList.remove("assignBtn");
				a.childNodes[3].classList.add("unassign-desk");
				a.parentNode.parentNode.classList.remove('unassignAccordin');
				a.parentNode.parentNode.classList.add('assignAccordin');
				a.parentNode.parentNode.removeAttribute('data-bs-parent','#accordion-1');
				a.parentNode.parentNode.setAttribute('data-bs-parent','#accordion-1-2');
				a.parentNode.parentNode.removeAttribute('aria-labelledby','heading-1-1');
				a.parentNode.parentNode.setAttribute('aria-labelledby','heading-1-2');
				var tempNodeToAppend = a.parentNode.parentNode;
				a.parentNode.parentNode.remove();
				assignedContainer.childNodes[0].nextSibling.append(tempNodeToAppend);	
				if(selectedShape.image == singledesk_withoutText){
					selectedShape.image = singledesk_img;
				}else if(selectedShape.image == shape5_withoutText_img){//shape5_img
					selectedShape.image = shape5_img;
				}
				selectedShape.showText = ""+selectedNameToAssign;
				redraw();
				countAssignChild();
				assignColapsBtn.href = hrefForAccordin_2;
				countUnassignChild();
				unassignColapsBtn.href = hrefForAccordin_1;
				if(selectedShape.showText != ""){
					if(tempAssignText != ""){
						a = document.getElementById(''+tempAssignText);
						existingAssignText = true;
						unassignDeskFun(a);
					}
				}
			}else{
				if(selectedShape.showText != "" && selectedShape.showText == a.childNodes[0].nextSibling.innerText){
					unassignDeskFun(a);
				}
			}
		}
	}else{
		if(a.childNodes[3].classList == "assignBtn"){
		}else{
			directUnassign = true;
			unassignDeskFun(a);
		}
	}
}
var selectedBoxElemt;
var selectedElemForUnassign;
function unassignDeskFun(a){
	var selectedNameToAssign = a.childNodes[0].nextSibling.innerText;
	if(directUnassign){
		for(let i=0;i<boxes2.length;i++){
			if(boxes2[i].showText === selectedNameToAssign){
				selectedBoxElemt = i;
			}
		}
		selectedElemForUnassign = boxes2[selectedBoxElemt];
	}else{
		selectedElemForUnassign = selectedShape;
	}
	var unassignElemToPush = a.parentNode.parentNode;
	a.childNodes[3].innerText = "Assign";
	a.childNodes[3].classList.remove("unassign-desk");
	a.childNodes[3].classList.add("assignBtn");
	a.parentNode.parentNode.classList.remove('assignAccordin');
	a.parentNode.parentNode.classList.add('unassignAccordin');
	a.parentNode.parentNode.removeAttribute('data-bs-parent','#accordion-1-2');
	a.parentNode.parentNode.setAttribute('data-bs-parent','#accordion-1');
	a.parentNode.parentNode.removeAttribute('aria-labelledby','heading-1-2');
	a.parentNode.parentNode.setAttribute('aria-labelledby','heading-1-1');
	var tempNodeToAppend = a.parentNode.parentNode;
	a.parentNode.parentNode.remove();
	unAssignedContainer.childNodes[0].nextSibling.append(tempNodeToAppend);
	if(existingAssignText == false){
		if(selectedElemForUnassign.image == singledesk_img){
			selectedElemForUnassign.image = singledesk_withoutText;
		}else if(selectedElemForUnassign.image == shape5_img){
			selectedElemForUnassign.image = shape5_withoutText_img;
		}
		selectedElemForUnassign.showText = "";
	}
	redraw();
	countAssignChild();
	assignColapsBtn.href = hrefForAccordin_2;
	countUnassignChild();
	unassignColapsBtn.href = hrefForAccordin_1;
	existingAssignText = false;
	directUnassign = false;
}
var hrefForAccordin_1; 
var hrefForAccordin_2; 
function countUnassignChild(){
	hrefForAccordin_1 = '';
	acc_1_1_unAsignCount.innerText = unassignAccordin.length;
	for(let i = 0; i < unassignAccordin.length; i++){
		unAssignedIds.push(unassignAccordin[i].id)
	}
	hrefForAccordin_1 = unAssignedIds.join(",#");
	hrefForAccordin_1 = "#"+hrefForAccordin_1;
}
function countAssignChild(){
	hrefForAccordin_2 = '';
	acc_1_2_asignCount.innerText = assignAccordin.length;
	for(let i = 0; i < assignAccordin.length; i++){
		assignedIds.push(assignAccordin[i].id)
	}
	hrefForAccordin_2 = assignedIds.join(",#");
	hrefForAccordin_2 = "#"+hrefForAccordin_2;
}
/*---------Shapes End----------------*/
var assignBtnClasses_2 = document.getElementsByClassName('assignBtn_2');
var unassignBtnClasses_2 = document.getElementsByClassName('unassign-desk_2');
var unassignAccordin_2 = document.getElementsByClassName('unassignAccordin_2');
var assignAccordin_2 = document.getElementsByClassName('assignAccordin_2');
for(let i = 0; i < assignBtnClasses_2.length;i++){
	assignBtnClasses_2[i].onclick = function(e){
		assignValToShapes_2(this.parentNode);
	}
}
for(let i = 0; i < unassignBtnClasses_2.length;i++){
	unassignBtnClasses_2[i].onclick = function(e){
		assignValToShapes_2(this.parentNode);
	}
}
var unAssignedContainer_2 = document.getElementById('accordion-1-3');
var assignedContainer_2 = document.getElementById('accordion-1-4');
var unassignColapsBtn_2 = document.getElementById('unassignColapsBtn_2');
var assignColapsBtn_2 = document.getElementById('assignColapsBtn_2');
var acc_1_3_unAsignCount = document.getElementById('acc_1_3_unAsignCount');
var acc_1_4_asignCount = document.getElementById('acc_1_4_asignCount');
/*---------rooms start---------------*/
var unAssignedIds_2 = [];
var assignedIds_2 = [];
var tempAssignText_2;
var existingAssignText_2 = false;
var directUnassign_2 = false;
function assignValToShapes_2(a){
	
	tempAssignText_2 = selectedShape.showText;
	if(selectedShape != undefined && mySel != null){
		if(selectedShape.image.id == "room_xxs" || selectedShape.image.id == "room_xxs_select" || selectedShape.image.id == "room_xxs_withoutText_img" || selectedShape.image.id == "room_xs" || selectedShape.image.id == "room_xs_select" || selectedShape.image.id == "room_xs_withoutText_img" || selectedShape.image.id == "room_img" || selectedShape.image.id == "room_img_select" || selectedShape.image.id == "room_img_withoutText_img" || selectedShape.image.id == "room_m" || selectedShape.image.id == "room_m_select" || selectedShape.image.id == "room_m_withoutText_img" || selectedShape.image.id == "room_l" || selectedShape.image.id == "room_l_select" || selectedShape.image.id == "room_l_withoutText_img" || selectedShape.image.id == "room_xl" || selectedShape.image.id == "room_xl_select" || selectedShape.image.id == "room_xl_withoutText_img"){
			if(a.childNodes[3].classList == "assignBtn_2"){	
				var selectedNameToAssign = a.childNodes[0].nextSibling.innerText;
				var unassignElemToPush = a.parentNode.parentNode;
				a.childNodes[3].innerText = "Unassign";
				a.childNodes[3].classList.remove("assignBtn_2");
				a.childNodes[3].classList.add("unassign-desk_2");
				a.parentNode.parentNode.classList.remove('unassignAccordin_2');
				a.parentNode.parentNode.classList.add('assignAccordin_2');
				a.parentNode.parentNode.removeAttribute('data-bs-parent','#accordion-1-3');
				a.parentNode.parentNode.setAttribute('data-bs-parent','#accordion-1-4');
				a.parentNode.parentNode.removeAttribute('aria-labelledby','heading-1-3');
				a.parentNode.parentNode.setAttribute('aria-labelledby','heading-1-4');
				var tempNodeToAppend = a.parentNode.parentNode;
				a.parentNode.parentNode.remove();
				assignedContainer_2.childNodes[0].nextSibling.append(tempNodeToAppend);	
				if(selectedShape.image == room_xxs_withoutText_img){
					selectedShape.image = room_xxs;
				}else if(selectedShape.image == room_xs_withoutText_img){
					selectedShape.image = room_xs;
				}else if(selectedShape.image == room_img_withoutText_img){
					selectedShape.image = room_img;
				}else if(selectedShape.image == room_m_withoutText_img){
					selectedShape.image = room_m;
				}else if(selectedShape.image == room_l_withoutText_img){
					selectedShape.image = room_l;
				}else if(selectedShape.image == room_xl_withoutText_img){
					selectedShape.image = room_xl;
				}
				selectedShape.showText = ""+selectedNameToAssign;
				redraw();
				countAssignChild_2();
				assignColapsBtn_2.href = hrefForAccordin_4;
				countUnassignChild_2();
				unassignColapsBtn_2.href = hrefForAccordin_3;
				if(selectedShape.showText != ""){
					if(tempAssignText_2 != ""){
						a = document.getElementById(''+tempAssignText_2);
						existingAssignText_2 = true;
						unassignDeskFun_2(a);
					}
				}
			}else{
				if(selectedShape.showText != "" && selectedShape.showText == a.childNodes[0].nextSibling.innerText){
					unassignDeskFun_2(a);
				}
			}
		}
	}else{
		if(a.childNodes[3].classList == "assignBtn_2"){
		}else{
			directUnassign_2 = true;
			unassignDeskFun_2(a);
		}
	}
}
var selectedBoxElemt_2;
var selectedElemForUnassign_2;
function unassignDeskFun_2(a){
	var selectedNameToAssign = a.childNodes[0].nextSibling.innerText;
	if(directUnassign_2){
		for(let i=0;i<boxes2.length;i++){
			if(boxes2[i].showText === selectedNameToAssign){
				selectedBoxElemt_2 = i;
			}
		}
		selectedElemForUnassign_2 = boxes2[selectedBoxElemt_2];
	}else{
		selectedElemForUnassign_2 = selectedShape;
	}
	var unassignElemToPush = a.parentNode.parentNode;
	a.childNodes[3].innerText = "Assign";
	a.childNodes[3].classList.remove("unassign-desk_2");
	a.childNodes[3].classList.add("assignBtn_2");
	a.parentNode.parentNode.classList.remove('assignAccordin_2');
	a.parentNode.parentNode.classList.add('unassignAccordin_2');
	a.parentNode.parentNode.removeAttribute('data-bs-parent','#accordion-1-4');
	a.parentNode.parentNode.setAttribute('data-bs-parent','#accordion-1-3');
	a.parentNode.parentNode.removeAttribute('aria-labelledby','heading-1-4');
	a.parentNode.parentNode.setAttribute('aria-labelledby','heading-1-3');
	var tempNodeToAppend = a.parentNode.parentNode;
	a.parentNode.parentNode.remove();
	unAssignedContainer_2.childNodes[0].nextSibling.append(tempNodeToAppend);
	if(existingAssignText_2 == false){
		if(selectedShape.image == room_xxs){
			selectedShape.image = room_xxs_withoutText_img;
		}else if(selectedShape.image == room_xs){
			selectedShape.image = room_xs_withoutText_img;
		}else if(selectedShape.image == room_img){
			selectedShape.image = room_img_withoutText_img;
		}else if(selectedShape.image == room_m){
			selectedShape.image = room_m_withoutText_img;
		}else if(selectedShape.image == room_l){
			selectedShape.image = room_l_withoutText_img;
		}else if(selectedShape.image == room_xl){
			selectedShape.image = room_xl_withoutText_img;
		}
		selectedElemForUnassign.showText = "";
	}
	redraw();
	countAssignChild_2();
	assignColapsBtn_2.href = hrefForAccordin_4;
	countUnassignChild_2();
	unassignColapsBtn_2.href = hrefForAccordin_3;
	existingAssignText_2 = false;
	directUnassign_2 = false;
}
var hrefForAccordin_3; 
var hrefForAccordin_4; 
function countUnassignChild_2(){
	hrefForAccordin_3 = '';
	acc_1_1_unAsignCount.innerText = unassignAccordin_2.length;
	for(let i = 0; i < unassignAccordin_2.length; i++){
		unAssignedIds_2.push(unassignAccordin_2[i].id)
	}
	hrefForAccordin_3 = unAssignedIds_2.join(",#");
	hrefForAccordin_3 = "#"+hrefForAccordin_3;
}
function countAssignChild_2(){
	hrefForAccordin_4 = '';
	acc_1_2_asignCount.innerText = assignAccordin_2.length;
	for(let i = 0; i < assignAccordin_2.length; i++){
		assignedIds_2.push(assignAccordin_2[i].id)
	}
	hrefForAccordin_4 = assignedIds_2.join(",#");
	hrefForAccordin_4 = "#"+hrefForAccordin_4;
}
/*---------rooms end---------------*/
var assignBtnClasses_3 = document.getElementsByClassName('assignBtn_3');
var unassignBtnClasses_3 = document.getElementsByClassName('unassign-desk_3');
var unassignAccordin_3 = document.getElementsByClassName('unassignAccordin_3');
var assignAccordin_3 = document.getElementsByClassName('assignAccordin_3');
for(let i = 0; i < assignBtnClasses_3.length;i++){
	assignBtnClasses_3[i].onclick = function(e){
		assignValToShapes_3(this.parentNode);
	}
}
for(let i = 0; i < unassignBtnClasses_3.length;i++){
	unassignBtnClasses_3[i].onclick = function(e){
		assignValToShapes_3(this.parentNode);
	}
}
var unAssignedContainer_3 = document.getElementById('accordion-1-5');
var assignedContainer_3 = document.getElementById('accordion-1-6');
var unassignColapsBtn_3 = document.getElementById('unassignColapsBtn_3');
var assignColapsBtn_3 = document.getElementById('assignColapsBtn_3');
var acc_1_5_unAsignCount = document.getElementById('acc_1_5_unAsignCount');
var acc_1_6_asignCount = document.getElementById('acc_1_6_asignCount');
/*---------parking start-----------*/
var unAssignedIds_3 = [];
var assignedIds_3 = [];
var tempAssignText_3;
var existingAssignText_3 = false;
var directUnassign_3 = false;
function assignValToShapes_3(a){
	tempAssignText_3 = selectedShape.showText;
	if(selectedShape != undefined && mySel != null){
		if(selectedShape.image.id == "parking_img" || selectedShape.image.id == "parking_img_select" || selectedShape.image.id == "parking_withoutText_img"){
			if(a.childNodes[3].classList == "assignBtn_3"){	
				var selectedNameToAssign = a.childNodes[0].nextSibling.innerText;
				var unassignElemToPush = a.parentNode.parentNode;
				a.childNodes[3].innerText = "Unassign";
				a.childNodes[3].classList.remove("assignBtn_3");
				a.childNodes[3].classList.add("unassign-desk_3");
				a.parentNode.parentNode.classList.remove('unassignAccordin_3');
				a.parentNode.parentNode.classList.add('assignAccordin_3');
				a.parentNode.parentNode.removeAttribute('data-bs-parent','#accordion-1-5');
				a.parentNode.parentNode.setAttribute('data-bs-parent','#accordion-1-6');
				a.parentNode.parentNode.removeAttribute('aria-labelledby','heading-1-5');
				a.parentNode.parentNode.setAttribute('aria-labelledby','heading-1-6');
				var tempNodeToAppend = a.parentNode.parentNode;
				a.parentNode.parentNode.remove();
				assignedContainer_3.childNodes[0].nextSibling.append(tempNodeToAppend);	
				console.log(selectedShape.image)
				if(selectedShape.image == parking_img){
					selectedShape.image = parking_withoutText_img;
				}
				selectedShape.showText = ""+selectedNameToAssign;
				redraw();
				countAssignChild_3();
				assignColapsBtn_3.href = hrefForAccordin_4;
				countUnassignChild_3();
				unassignColapsBtn_3.href = hrefForAccordin_3;
				if(selectedShape.showText != ""){
					if(tempAssignText_3 != ""){
						a = document.getElementById(''+tempAssignText_3);
						existingAssignText_3 = true;
						unassignDeskFun_3(a);
					}
				}
			}else{
				if(selectedShape.showText != "" && selectedShape.showText == a.childNodes[0].nextSibling.innerText){
					unassignDeskFun_3(a);
				}
			}
		}	
	}else{
		if(a.childNodes[3].classList == "assignBtn_3"){
		}else{
			directUnassign_3 = true;
			unassignDeskFun_3(a);
		}
	}
}
var selectedBoxElemt_3;
var selectedElemForUnassign_3;
function unassignDeskFun_3(a){
	var selectedNameToAssign = a.childNodes[0].nextSibling.innerText;
	if(directUnassign_3){
		for(let i=0;i<boxes2.length;i++){
			if(boxes2[i].showText === selectedNameToAssign){
				selectedBoxElemt_3 = i;
			}
		}
		selectedElemForUnassign_3 = boxes2[selectedBoxElemt_3];
	}else{
		selectedElemForUnassign_3 = selectedShape;
	}
	console.log(selectedElemForUnassign_3);
	var unassignElemToPush = a.parentNode.parentNode;
	a.childNodes[3].innerText = "Assign";
	a.childNodes[3].classList.remove("unassign-desk_3");
	a.childNodes[3].classList.add("assignBtn_3");
	a.parentNode.parentNode.classList.remove('assignAccordin_3');
	a.parentNode.parentNode.classList.add('unassignAccordin_3');
	a.parentNode.parentNode.removeAttribute('data-bs-parent','#accordion-1-6');
	a.parentNode.parentNode.setAttribute('data-bs-parent','#accordion-1-5');
	a.parentNode.parentNode.removeAttribute('aria-labelledby','heading-1-6');
	a.parentNode.parentNode.setAttribute('aria-labelledby','heading-1-5');
	var tempNodeToAppend = a.parentNode.parentNode;
	a.parentNode.parentNode.remove();
	unAssignedContainer_3.childNodes[0].nextSibling.append(tempNodeToAppend);
	if(existingAssignText_3 == false){
		if(selectedElemForUnassign.image == parking_withoutText_img){
			selectedElemForUnassign.image = parking_img;
		}
		selectedElemForUnassign.showText = "";
	}
	redraw();
	countAssignChild_3();
	assignColapsBtn_3.href = hrefForAccordin_6;
	countUnassignChild_3();
	unassignColapsBtn_3.href = hrefForAccordin_5;
	existingAssignText_3 = false;
	directUnassign_3 = false;
}
var hrefForAccordin_5; 
var hrefForAccordin_6;
function countUnassignChild_3(){
	hrefForAccordin_5 = '';
	acc_1_1_unAsignCount.innerText = unassignAccordin_3.length;
	for(let i = 0; i < unassignAccordin_3.length; i++){
		unAssignedIds_3.push(unassignAccordin_3[i].id)
	}
	hrefForAccordin_5 = unAssignedIds_3.join(",#");
	hrefForAccordin_5 = "#"+hrefForAccordin_5;
}
function countAssignChild_3(){
	hrefForAccordin_6 = '';
	acc_1_2_asignCount.innerText = assignAccordin_3.length;
	for(let i = 0; i < assignAccordin_3.length; i++){
		assignedIds_3.push(assignAccordin_3[i].id)
	}
	hrefForAccordin_6 = assignedIds_3.join(",#");
	hrefForAccordin_6 = "#"+hrefForAccordin_6;
}
/*---------parking End-----------*/


/* document.getElementById('showconsole').onclick=function (e) {
	console.log("Desk");
	console.log(boxes2);
	console.log("Zone");
	console.log(polygons);
	console.log("Line");
	console.log(existingLines);
	console.log("multidrag");
	//console.log(multpleselection);
} */
//var unplacedElemDrag = document.getElementById("Desk-001");
/*---------------Arun code Start---------------*/
var showTextStore = '';
var shapecount = 0;
var rotateAng = 0;
var clickedTextClasses = document.getElementsByClassName('workspace-draggable-text');
for(let i = 0; i < clickedTextClasses.length;i++){
	clickedTextClasses[i].ondragstart = function(event){unplacedElemDrag(event)}
	clickedTextClasses[i].ondragend = function(event){unplacedElemDrop(event)}
}
// Draggable Element Functions
function unplacedElemDrag(event){
	//console.log(tempVarToClickShape+ 'tempVarToClickShape:::');
	if(shapeClickedForDrag == true){
		event.dataTransfer.setData("text/plain", event.target.id); // "draggable-element"
		showTextStore = event.target.id;
		showTextStore = showTextStore.slice(-3);
		var unplacedElemDrag = event.target.id;
		event.dataTransfer.effectsAllowed = "move";
		event.target.style.cursor = "move";// change cursor style
		//setTimeout(()=>event.target.classList.add('hide'), 0);// To possibly create a drag image then hide the original
		event.target.classList.add('hide');
		var imageIdToDraw;
		(tempVarToClickShape == undefined) ? imageIdToDraw = "drawPopup" : imageIdToDraw = tempVarToClickShape[0].id;
		switch(imageIdToDraw){
			case "draw_singledesk":
				draw_singledesk = true;
				break;
			case "draw_shape5":
				draw_shape5 = true;
				break;
			case "draw_shape3":
				draw_shape3 = true;
				break;
			case "draw_shape4":
				draw_shape4 = true;
				break;
			case "draw_shape2":
				draw_shape2 = true;
				break;
			default:
				console.log("id is not identified");
		}
		assetsdrag = true;
	}
}
var placedCountForChild = 0;
var unPlacedCountForChild = 0;
var locationClassName = document.getElementsByClassName('locate-manage');

function unplacedElemDrop(event){
	if(shapeClickedForDrag == true){
		placedCountForChild = 0;
		unPlacedCountForChild = 0;
		var dropElem = event.target;
		event.target.style.cursor = "pointer";
		event.target.classList.remove('hide');
		event.target.draggable = false;
		event.target.classList.remove('unplaced_Element');
		event.target.classList.add('placed_Element');
		event.target.remove();
		var locationExactChildName = locationClassName[0].childNodes[3].childNodes[1];
		locationExactChildName.append(event.target);
		placedCountFun();
		cleardragobject();
		showdragicon = false;
		assetsdrag = false;
	}
}
var placedCountFun = function(){		
	placedCountForChild = locationClassName[0].childNodes[3].childNodes[1].children.length-1;
	unPlacedCountForChild = locationClassName[1].childNodes[3].childNodes[1].children.length;
	placedHeaderForCount = locationClassName[0].childNodes[1].childNodes[1].childNodes[1];
	unPlacedHeaderForCount = locationClassName[1].childNodes[1].childNodes[1].children[0];
	placedHeaderForCount.innerHTML = "("+placedCountForChild+")";
	unPlacedHeaderForCount.innerHTML = "("+unPlacedCountForChild+")";
}
var removableElem;
var removeSelectItemBtn = document.getElementById("deleteBtn");
removeSelectItemBtn.addEventListener("click",removeSelectedBtnFn);
/* kill */
/* var placedElemClasses = document.getElementsByClassName('placed_Element');
for(let i = 0; i < placedElemClasses.length;i++){
	placedElemClasses[i].addEventListener("click",placedElemClick);
} */
/* function placedElemClick(){
	removableElem = this;
	this.classList.remove('placed_Element');
	this.classList.add('unplaced_Element');
	removeSelectItemBtn.addEventListener("click",removeSelectedBtnFn);
} */
var removeSelectedBtnFn = function(){
	//alert("hi");
	removableElem.remove();
}
/*---------------Arun code End---------------*/
// If you dont want to use <body onLoad='init()'>
// You could uncomment this init() reference and place the script reference inside the body tag
//init();
window.init2 = init2;
})(window);

// Andy added, as a replacement for
// <body onLoad="init2()">
$(document).ready(function(){
  // Your code here
  init2();
});


//document.getElementById ("draw_wall").addEventListener ("click", drawwall, false);



function rotate(x, y, cx, cy, angle,oldr) {
	//console.log("rotate::",x,y, cx, cy, angle,(x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,(x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy	);	
  return [
    (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
    (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy - 2,
  ];
}

function adjustRectangle(rectangle, bottomRightX, bottomRightY, angle) {
  const center = [
    rectangle.x + rectangle.width / 2,
    rectangle.y + rectangle.height / 2
  ];
  const rotatedA = rotate(rectangle.x, rectangle.y, cx, cy);
  const newCenter = [
    (rotatedA[0] + bottomRightX) / 2,
    (rotatedA[1] + bottomRightY) / 2,
  ];
  const newTopLeft = rotate(
    rotatedA[0],
    rotatedA[1],
    newCenter[0],
    newCenter[1],
    -angle
  );
  const newBottomRight = rotate(
    bottomRightX,
    bottomRightY,
    newCenter[0],
    newCenter[1],
    -angle
  );

  rectangle.x = newTopLeft[0];
  rectangle.y = newTopLeft[1];
  rectangle.width = newBottomRight[0] - newTopLeft[0];
  rectangle.height = newBottomRight[1] - newTopLeft[1];
}



function drawRotatedRect(x, y, width, height, degrees) {
	

    // first save the untranslated/unrotated context
    ctx.save();

    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate(x + width / 2, y + height / 2);
    // rotate the rect
    ctx.rotate(degrees * Math.PI / 180);

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
   // ctx.rect(-width / 2, -height / 2, width, height);
   // ctx.rect(width / 2, height / 2, width, height);
    ctx.fillStyle = 'rgba(0,0,255,0.5)';
    ctx.fillRect(0, 0, width, height);

   // ctx.fillStyle = "gold";
   // ctx.fill();

    // restore the context to its untranslated/unrotated state
    ctx.restore();

}


// Add active class to the current button (highlight it)
//var header = document.getElementById("myDIV");
//var btns = header.getElementsByClassName("btn");
var btns = document.getElementsByClassName("toolSelection");
for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function() {
		//var current = document.getElementsByClassName("active");
		//current[0].className = current[0].className.replace(" active", "");
		var old_classes = this.className;
		var elems = document.querySelector(".active");
		if(elems !== null){
			//elems.classList.remove("active");
		}
		if(old_classes == "toolSelection active"){
			this.classList.remove("active");
		}else{
			this.className += " active";
		}
		//console.log("id Class");
		//if(document.getElementById("draw_text_underline").className == "toolSelection3 active"){
			//document.getElementById("draw_text_underline").classList.remove("active");
		//}
	});
}


	// Variables
var orangeSquare = document.getElementById("drop-element");
var pinkSquareContainer = document.getElementsByClassName("draggable-container")[0];

//Feature detection from Modernizr
var div = document.createElement("div");

//if ("draggable" in div || ("ondragstart" in div && "ondrop" in div))
  //console.log("Drag and Drop API is supported!");


// Generic onDragOver and onDrop Functions
function onDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function onDrop(event, color) {
  event.preventDefault();
	getMouse(event);
  //alert(mx);

  // Extract id of element and get it's reference
  var id = event.dataTransfer.getData("text/plain");
  var pinkSquaere = document.getElementById(id);

    name_drop = true;
	name_drop_x = mx;
	name_drop_y = my;
	name_drop_id = pinkSquaere;
	canvasValid = false;

  // Only append element, if it's not already appended to that elem
  // i.e. if that element is not it's parent

 /*
  if (color === "pink") {
    if (!pinkSquaere.parentNode.isSameNode(pinkSquareContainer))
      event.target.appendChild(pinkSquaere);
  } else {
    if (!pinkSquaere.parentNode.isSameNode(orangeSquare))
      event.target.appendChild(pinkSquaere);
  }
*/
}



// Functions for drop zone 2 (Pink bordered Square)

function onDragOverForPinkSquareContainer(event) {
  onDragOver(event);
}

function onDropForPinkSquareContainer(event) {
  onDrop(event, "pink");
}

function desk_delete(){
	desk_removed = true;
	canvasValid = false;
}
function desk_delete_multiple(){
	//desk_removed_multiple = true;
	canvasValid = false;
}
