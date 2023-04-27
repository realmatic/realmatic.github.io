xhr = new XMLHttpRequest();
xhr.open("GET","/assets/michelle/media/Combined.svg",false);
//xhr.open("GET","/assets/michelle/media/HoverOnly.svg",false);
// Following line is just to be on the safe side;
// not needed if your server delivers SVG with correct MIME type
xhr.overrideMimeType("image/svg+xml");
xhr.onload = function(e) {
  // You might also want to check for xhr.readyState/xhr.status here
  document.getElementById("svgContainer")
    .appendChild(xhr.responseXML.documentElement);
};
xhr.send("");

const outlineList = document.querySelectorAll('g[id$="Outline"]');
for (const i of outlineList.values()) { i.style='display:none'; }

$( "#aCCSF" ).hover( function() { $( "#CCSF_Outline" ).css("display", "inline"); }, function() { $( "#CCSF_Outline" ).css("display", "none"); });
$( "#aCCSF" ).attr("href", "http://www.yahoo.com/")

$("head").append('<style type="text/css"></style>');
var newStyleElement = $("head").children(':last');
newStyleElement.html('.pccsf{--bs-popover-header-bg:'+$('.cls-15').css("fill")+';}');

new bootstrap.Popover($("#aCCSF"), { trigger:'hover', placement:'top', title : 'CCSF popover title', content: null, container: 'body', customClass:'pccsf' })

var beforePan

beforePan = function(oldPan, newPan){
          
var stopHorizontal = false
  , stopVertical = false
  , gutterWidth = 600 
  , gutterHeight = 600 
// Computed variables
  , sizes = this.getSizes()
  , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
  , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
  , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
  , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)

  customPan = {}
  customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
  customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

  return customPan
}

svgPanZoom('#buildings', {
  zoomEnabled: true
  , controlIconsEnabled: true
  , fit: 1
  , center: 1
  , beforePan: beforePan
  , minZoom: 1
  , maxZoom: 10
  , dblClickZoomEnabled: false
});

