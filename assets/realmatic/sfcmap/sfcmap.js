// render map
xhr = new XMLHttpRequest();
xhr.open("GET","/assets/realmatic/sfcmap/sfcmap.svg",false);
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
  '_41Ross': ['','a collaborative art space founded by CCDC and the Chinese Culture Center']
, 'Betty_Ann_Ong_Recreation_Center': ['','a state-of-the-art recreational facility']
, 'Cameron_House': ['','building strength and resilience through family-centered programs']
, 'Chinatown_Community_Development_Center': ['','strengthening community and enhancing quality of life in Chinatown']
, 'Chinese_for_Affirmative_Action': ['#f7b95e','a community based civil rights organization']
, 'Chinese_Hospital': ['#94cdd3','a full-service hospital providing compassionate, patient-centered healthcare']
, 'Chinese_Culture_Center': ['','a cultural anchor committed to racial equality through education and contemporary art']
, 'Chinese_Historical_Society_of_America': ['','collecting, preserving, and illuminating the history of Chinese in America']
, 'Chinese_Newcomers_Service_Center': ['','a multilingual agency providing transitional guidance and empowering immigrants']
, 'Chinese_Progressive_Association': ['','promoting collective power to demand better living and working conditions for all']
, 'City_College_of_SF_-_Chinatown': ['#f7b95e','empowering students with life skills, social knowledge, and self-confidence']
, 'Gordon_J_Lau_Elementary_School': ['','established in 1885 as the "Chinese Primary School," continues to provide education for local residents']
, 'Gum_Moon_Residence_Hall': ['#f07b3b','providing sanctuary for women and children in geographic and social transition']
, 'International_Hotel': ['#f07b3b','historical site of landmark affordable housing advocacy in Chinatown']
, 'Kubla_Khan_Nightclub': ['#cf2844','once a lively cabaret nightclub in the 1940s, now a fine arts shop']
, 'Mei_Lun_Yuen': ['#f07b3b','a 185-unit complex constructed under the HUD 236 Program']
, 'North_Ping_Yuen': ['','1961 annex to Ping Yuen, adding 185 additional units']
, 'Ping_Yuen': ['#f07b3b','landmark housing project, providing 234-units to low-income families']
, 'Portsmouth_Square': ['','Popular open space public park, dating back to Spanish California']
, 'Self-Help_for_the_Elderly_-_Geen_Mun': ['','providing support to seniors in order to promote independence, dignity, and self-worth']
, 'Spofford_Alley': ['#f07b3b','historic alley of Chinatown, one of the many involved in the Alleyways Program']
, 'St_Mary_s_Square': ['','a rooftop green space located on top of a multi-level garage']
, 'West_Ping_Yuen': ['','an addition to Central Ping Yuen completed in 1956']
, 'Willie_Wong_Playground': ['#95d1a3','an urban park featuring playgrounds, athletic courts, and a gym']
, 'Woh_Hei_Yuen_Park': ['#95d1a3','a small urban park with a robust recreation center offering a wide range of programs']
, 'YMCA_Chinatown': ['','founded in 1911, serving the community as a recreation center and social site']
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

  new bootstrap.Popover($("#"+key+"_Site").parent(), { trigger:'hover', placement:'top', title : $("#"+key+"_Site").attr('data-name').replace(' Site', ''), html:true, content: '<i>'+ vals[1] +'</i><img src="/assets/realmatic/sfcmap/placeholder-chinese-dragon.png" class="img-fluid">', container: 'body', customClass:'hbg'+key })
/*
  new bootstrap.Popover($("#"+key+"_Site").parent(), { trigger:'hover', placement:'top', title : $("#"+key+"_Site").attr('data-name').replace(' Site', ''), html:true, content: '<i>'+ vals[1] +'</i>', container: 'body', customClass:'hbg'+key })
*/
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

