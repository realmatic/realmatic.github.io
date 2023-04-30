// render directory 
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    var jObj = JSON.parse(this.responseText);
    //console.log("Json parsed data is: " + JSON.stringify(jObj));
    let text = "<div class='row'><h3 class='my-4'>DIRECTORY</h3>"
    for (let x in jObj) {
      text += "<h4 class='my-3'>" + jObj[x].CATOGERY + "</h4>";
      s = jObj[x].SITES
      for (let y in s) {
        text += "<div class='col-sm-3'>"
        text += "<p>" + s[y].NAME + "<br>" + s[y].STREET+ "<br>" + s[y].CITY + "<br>"
        if ( s[y].WEBSITE != '' ) {
            text += "<a href='" + s[y].WEBSITE + "'>Link to Website</a>"
        }
        text += "</div>"
      }
    }
    text += "</div>"
    document.getElementById("dirContainer").innerHTML = text;
  }
};
xmlhttp.open("GET", "/assets/michelle/sfcmap.json", true);
xmlhttp.send();

// render map
xhr = new XMLHttpRequest();
xhr.open("GET","/assets/michelle/media/sfcmap.min.svg",false);
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

var sites= { 'CCSF': '#f7b95e'
,'Woh_Hei_Yuen': '#95d1a3'
, 'Ping_Yuen': '#f07b3b'
, 'Willie_Wong_Playground': '#95d1a3'
, 'Spofford_Alley': '#f07b3b'
, 'Kubla_Khan_Nightclub': '#cf2844'
, 'Mei_Lun_Yuen': '#f07b3b'
, 'I-Hotel': '#f07b3b'
, 'Portsmouth_Square': '##95d1a3'
, 'Chinese_for_Affirmative_Action': '#f7b95e'
, 'Chinese_Hospital': '#94cdd3'
}

$.each(sites,
function( key, color) {
  $( "#"+key+"_Site" ).parent().hover( function() { $( "#"+key+"_Outline" ).css("display", "inline"); }, function() { $( "#"+key+"_Outline" ).css("display", "none"); });

  $("head").append('<style type="text/css"></style>');
  var hbg = $("head").children(':last');
  hbg.html('.hbg'+key+'{--bs-popover-header-bg:'+color+';}');

  new bootstrap.Popover($("#"+key+"_Site").parent(), { trigger:'hover', placement:'top', title : $("#"+key+"_Site").attr('data-name').replace(' Site', ''), content: null, container: 'body', customClass:'hbg'+key })
});

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

svgPanZoom('#SFChinatown2023', {
  zoomEnabled: true
  , controlIconsEnabled: true
  , fit: 1
  , center: 1
  , beforePan: beforePan
  , minZoom: 1
  , maxZoom: 10
  , dblClickZoomEnabled: false
});

