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
xhr.open("GET","/assets/michelle/sfcmap.svg",false);
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

var sites= { 
  '_41Ross': ['' ,'caption']
, 'Betty_Ong_Recreation_Center': ['', 'caption'] //Ann?
, 'Cameron_House': ['', 'caption']
, 'CCDC': ['', 'caption']
, 'CCSF': ['#f7b95e', 'caption']
, 'Chinese_Culture_Center': ['' , 'caption']//cultural? //
, 'Chinese_for_Affirmative_Action': ['#f7b95e', 'caption']
, 'Chinese_Hospital': ['#94cdd3', 'caption']
, 'Chinese_Historical_Society_of_America': ['' , 'caption']
, 'Chinese_Newcomer_s_Service_Center': ['' , 'caption']
, 'Chinese_Progressive_Association': ['', 'caption']
, 'Gum_Moon_Residence_Hall': ['', 'caption']
, 'Gordon_J_Lau_Elementary_School': ['' , 'caption']//
, 'I-Hotel': ['#f07b3b', 'caption']
, 'Kubla_Khan_Nightclub': ['#cf2844', 'caption']
, 'Mei_Lun_Yuen': ['#f07b3b', 'caption']
, 'North_Ping_Yuen': ['', 'caption']
, 'Ping_Yuen': ['#f07b3b', 'caption']
, 'Portsmouth_Square': ['##95d1a3' , 'caption']//
, 'Self-Help_for_the_Elderly_-_Geen_Mun_Senior_Center': ['', 'caption'] // Senior Center
, 'Spofford_Alley': ['#f07b3b', 'caption']
, 'St_Mary_s_Square': ['' , 'caption']
, 'West_Ping_Yuen': ['' , 'caption']
, 'Willie_Wong_Playground': ['#95d1a3', 'caption']
, 'Woh_Hei_Yuen': ['#95d1a3', 'caption']
, 'YMCA_Chinatown': ['', 'caption']
}

$.each(sites,
function( key, vals) {
  if(vals[0] != '') {
    $( "#"+key+"_Site" ).parent().hover( function() { $( "#"+key+"_Outline" ).css("display", "inline"); }, function() { $( "#"+key+"_Outline" ).css("display", "none"); });

    $("head").append('<style type="text/css"></style>');
    var hbg = $("head").children(':last');
    hbg.html('.hbg'+key+'{--bs-popover-header-color:#ffffff;--bs-popover-header-bg:'+vals[0]+';}');
  } else {
    $("head").append('<style type="text/css"></style>');
    var hbg = $("head").children(':last');
    hbg.html('.hbg'+key+'{--bs-popover-header-bg:#ffffff;}');
    $("#"+key+"_Site").parent().css('cursor','default')
  }

  new bootstrap.Popover($("#"+key+"_Site").parent(), { trigger:'hover', placement:'top', title : $("#"+key+"_Site").attr('data-name').replace(' Site', ''), content: vals[1], container: 'body', customClass:'hbg'+key })
});

var beforePan

beforePan = function(oldPan, newPan){
          
var stopHorizontal = false
  , stopVertical = false
  , gutterWidth = 900 
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

