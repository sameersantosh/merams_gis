//zoom to black spot url pattern will be.....................
//http://localhost:26074/#map=90.57688635/26.23843705
import Static from 'ol/source/ImageStatic';
import BingMaps from 'ol/source/BingMaps';
import { FullScreen, defaults as defaultControls } from 'ol/control';
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON.js';
import ImageWMS from 'ol/source/ImageWMS';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { DragBox, Select } from 'ol/interaction';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Heatmap, Image as ImageLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { platformModifierKeyOnly } from 'ol/events/condition';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import { Feature } from 'ol/index';
import XYZ from 'ol/source/XYZ';

import { transform, fromLonLat,toLonLat } from 'ol/proj';


import { Geometry, Point } from 'ol/geom';
import { makeRegular } from 'ol/geom/Polygon';
import Draw from 'ol/interaction/Draw.js';
import { LineString, Polygon } from 'ol/geom';
import { getArea, getLength } from 'ol/sphere';
import { unByKey } from 'ol/Observable';


import { ScaleLine } from 'ol/control';
import { getPointResolution, get as getProjection } from 'ol/proj';
import { register } from 'ol/proj/proj4';

//arcgisrest
import {ImageArcGISRest} from 'ol/source';

import Snap from 'ol/interaction/Snap.js';


import Circle from 'ol/geom/Circle.js';

import Geolocation from 'ol/Geolocation.js';

import * as olProj from 'ol/proj';

import html2canvas from 'html2canvas';

  const { KML, GPX } = ol.format;

/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const asset_image=document.getElementById('asset_image');
const video_src=document.getElementById('video_src');
//const asset_image_list=document.getElementById('asset_image_list');
const closer = document.getElementById('popup-closer');
const checkbox_sh = document.getElementById('sh');

const checkbox_mdr = document.getElementById('mdr');
const checkbox_odr = document.getElementById('odr');
const checkbox_lr = document.getElementById('lr');
const checkbox_road_inventory = document.getElementById('ri');
const projectw = document.getElementById('projectw');
const checkbox_road_roughness = document.getElementById('roug');
const bridge = document.getElementById('bridge');
const roadaccident = document.getElementById('roadaccident');

const workhistory=document.getElementById('workhistory');
const viewgrowthpoint=document.getElementById('viewgrowthpoint');
const viewslope=document.getElementById('viewslope');
const boxslab = document.getElementById('bxslab');
const ncisCheckbox = document.getElementById('ncis_status');

const nh=document.getElementById('nh');

const domain_name='http://103.219.61.73/geoserver/megrams/';


const checkbox_culvert = document.getElementById('culvert');
const road_search_btn = document.getElementById('road_search_btn');
const road_search_clear_btn=document.getElementById('road_search_clear_btn');
const road_search_box = document.getElementById('road_search_box_new');

const road_filter_search = document.getElementById('filter_search');
const road_filter_clear=document.getElementById('filter_clear');

const measurement_tool = document.getElementById('measurment_tool');
const exportButton = document.getElementById('export-pdf');
const lengendiv = document.getElementById('legenddiv');
const map_switcher = document.getElementById('layer-select');
const layerSelect = document.getElementById('layer-select');
const advance_query_box=document.getElementById('advance_query_box');
const advance_query_run=document.getElementById('advance_query_run');
const advance_query_clear=document.getElementById('advance_query_clear');
const advance_query_layer=document.getElementById('advance_query_layer');
const advance_query_attrib=document.getElementById('advance_query_attrib');
const advance_query_formula_btn=document.getElementById('advance_query_formula_btn');
const advance_query_result=document.getElementById('advance_query_result');
const latlonlocatebutton=document.getElementById('latlonlocatebutton');
const lattext=document.getElementById('lattext');
const lontext=document.getElementById('lontext');
const latlonlocateclearbutton=document.getElementById('latlonlocateclearbutton');
const large_image_container_close=document.getElementById('large_image_container_close');
const get_value=document.getElementById('getvalue');

const aditional=document.getElementById('aditional');

const radius_text=document.getElementById('radius');

const growth_lat=document.getElementById('growth_lat');
const growth_lon=document.getElementById('growth_lon');

const getfacilitytable=document.getElementById('getfacility');

const getrevchainage=document.getElementById('getrevchainage');
const viewroadimportance=document.getElementById('viewroadimportance');

const viewroadimportanceradius=document.getElementById('viewroadimportanceradius');

const getfacilityforroadimportance=document.getElementById('getfacilityforroadimportance');

const doctable=document.getElementById('doctable');

const division_new = document.getElementById('division_sel');

const traffic_station = document.getElementById('trfcstn');

const legenddiv = document.getElementById('legenddiv');
const calfilter = document.getElementById('calamitySelect');
const disasterCheckbox = document.getElementById('disaster');
//const appendbtn = document.getElementById('coordappend');

let bridge_cat_theme_source=new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_bridge_mst'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});


let roadaccident_theme_source=new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:road_accident'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let facilities_cat_theme_source=new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_facilities'},
  ration: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let box_culvert_theme_source=new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_box_culvert'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let road_inv_theme_source = new ImageWMS({
    url: domain_name+'wms',
    params: { "LAYERS": 'megrams:v_road_inventory'},
    ratio: 1,
    crossOrigin: 'anonymous',
    serverType: 'geoserver',
});

let projectwork_theme_source = new ImageWMS({
    url: domain_name+'wms',
    params: { "LAYERS": 'megrams:v_wms_project_with_road'},
    ratio: 1,
    crossOrigin: 'anonymous',
    serverType: 'geoserver',
});

let black_spot_theme_source = new ImageWMS({
    url: domain_name+'wms',
    params: { "LAYERS": 'megrams:v_black_spot_stretch_geom'},
    ratio: 1,
    crossOrigin: 'anonymous',
    serverType: 'geoserver',
});

let grid_accident_theme_source = new ImageWMS({
    url: domain_name+'wms',
    params: { "LAYERS": 'megrams:rsis_grid_table'},
    ratio: 1,
    crossOrigin: 'anonymous',
    serverType: 'geoserver',
})

let bridge_rating_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: {"LAYERS": 'megrams:mv_bridge_rating'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let work_status_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: {"LAYERS": 'megrams:v_project_inf'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let workhistory_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_road_work_hist_inf', },
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let traffic_station_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_tss_mst'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let traffic_distribution_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_traffic_distribution', },
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let row_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_rwfis_inf', },
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let lr_layer_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:local_road'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let nh_layer_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:national_highway'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let odr_layer_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: {  "LAYERS": 'megrams:other_district_road'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let mdr_layer_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:major_district_road'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let sh_layer_theme_source= new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:state_highway'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let climate_rainfall_layer_theme_source= new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:climate_average_rainfall'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});


let climate_vulnerability_layer_theme_source= new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:climate_vulnerability_obseravtion'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});


let projectw_layer_theme_source= new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_wms_project_with_road'},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let viewgrowthcenter_theme_source =  new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_ecis_growth_center', },
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let viewcalamity_theme_source =  new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_calamity', },
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let viewcalamity_status_theme_source =  new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_ncis_status', },
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let viewslope_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_road_slop_dtl', },
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let ur_layer_theme_source = new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:urban_road', },
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

let road_roughness_source = new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": 'megrams:v_road_roughness_dtl', },
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});



// html2canvas(document.querySelector("#capture")).then(canvas => {
//   alert("hello");
//   document.body.appendChild(canvas)
// });


// document.getElementById('capture').addEventListener('click', function () {


//     const mapCanvas = document.createElement('canvas');
//     const size = map.getSize();
//     mapCanvas.width = size[0];
//     mapCanvas.height = size[1];
//     const mapContext = mapCanvas.getContext('2d');
//     Array.prototype.forEach.call(
//       map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
//       function (canvas) {
//         if (canvas.width > 0) {
//           const opacity =
//             canvas.parentNode.style.opacity || canvas.style.opacity;
//           mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
//           let matrix;
//           const transform = canvas.style.transform;
//           if (transform) {

//             matrix = transform
//               .match(/^matrix\(([^\(]*)\)$/)[1]
//               .split(',')
//               .map(Number);
//           } else {
//             matrix = [
//               parseFloat(canvas.style.width) / canvas.width,
//               0,
//               0,
//               parseFloat(canvas.style.height) / canvas.height,
//               0,
//               0,
//             ];
//           }

//           CanvasRenderingContext2D.prototype.setTransform.apply(
//             mapContext,
//             matrix,
//           );
//           const backgroundColor = canvas.parentNode.style.backgroundColor;
//           if (backgroundColor) {
//             mapContext.fillStyle = backgroundColor;
//             mapContext.fillRect(0, 0, canvas.width, canvas.height);
//           }
//           mapContext.drawImage(canvas, 0, 0);
//         }
//       },
//     );
//     mapContext.globalAlpha = 1;
//     mapContext.setTransform(1, 0, 0, 1, 0, 0);
//     const link = document.getElementById('image-download');

//     link.href = mapCanvas.toDataURL();
//     link.click();
//   map.renderSync();

// });


document.getElementById('capture').addEventListener('click', function () {
   collapseSidebar();
  // map.once('rendercomplete', function () {
    //alert("capture");
    // document.getElementById("legenddiv1").style.display="none";
    // document.getElementById("layer-select").style.display="none";
    // document.getElementById("division_sel").style.display="none";
    // document.getElementById("sidebarCollapse").style.display="none";
    // document.getElementById("location_track").style.display="none";

    if(document.body.contains((document.getElementById("legenddiv1")))==false){

    }else{
     document.getElementById("legenddiv1").style.display="none";
    }

    if(document.body.contains((document.getElementById("layer-select")))==false){

    }else{
     document.getElementById("layer-select").style.display="none";
    }

    if(document.body.contains((document.getElementById("layer-select")))==false){

    }else{
     document.getElementById("division_sel").style.display="none";
    }

    if(document.body.contains((document.getElementById("sidebarCollapse")))==false){

    }else{
     document.getElementById("sidebarCollapse").style.display="none";
    }

    if(document.body.contains((document.getElementById("location_track")))==false){

    }else{
     document.getElementById("location_track").style.display="none";
    }


    var mapCanvas = document.createElement('canvas');
    var size = map.getSize();
    mapCanvas.width = size[0];
    mapCanvas.height = size[1];
    var mapContext = mapCanvas.getContext('2d');
    var mapContainer = document.querySelector('#map');
    html2canvas(mapContainer).then(function(xxx) {
    mapContext.drawImage(xxx, 0, 0);
    var dataURL = xxx.toDataURL('image/png');
        // Create a download link for the image
        var downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'map_with_controls.png';
        document.body.appendChild(downloadLink);
        //downloadLink.click();
        document.body.removeChild(downloadLink);
        document.getElementById('mycanvas').append(xxx)
        mapContext.globalAlpha = 1;
        mapContext.setTransform(1, 0, 0, 1, 0, 0);
        const link = document.getElementById('image-download');
        //document.getElementById('mycanvas').append(mapCanvas)
        //console.log("link="+link);
        //link.href = document.getElementById('mypdf').toDataURL();
        //link.href = mapCanvas.toDataURL();
        document.getElementById('mypdf').style.display="block";
        screenshot();
        //link.click();
      // });
      map.renderSync();
      //alert("capture completed");
      // document.getElementById("legenddiv1").style.display="block";
      // document.getElementById("layer-select").style.display="block";
      // document.getElementById("division_sel").style.display="block";
      // document.getElementById("sidebarCollapse").style.display="block";
      // document.getElementById("location_track").style.display="block";

      if(document.body.contains((document.getElementById("legenddiv1")))==false){

      }else{
       document.getElementById("legenddiv1").style.display="block";
      }

      if(document.body.contains((document.getElementById("layer-select")))==false){

      }else{
       document.getElementById("layer-select").style.display="block";
      }

      if(document.body.contains((document.getElementById("layer-select")))==false){

      }else{
       document.getElementById("division_sel").style.display="block";
      }

      if(document.body.contains((document.getElementById("sidebarCollapse")))==false){

      }else{
       document.getElementById("sidebarCollapse").style.display="block";
      }

      if(document.body.contains((document.getElementById("location_track")))==false){

      }else{
       document.getElementById("location_track").style.display="block";
      }

      collapseSidebar();
    })



});




 //document layer theme


const document_layer_theme = new ImageLayer({
  source: new ImageWMS({
    url: domain_name+'wms',
    params: { "LAYERS": 'megrams:v_attach_document'},
    ratio: 1,
    crossOrigin: 'anonymous',
    serverType: 'geoserver',
  }),
  visible: false,
});


//ecis feature layer




var dynamic_ecis_facilities_within_road_buffer_layer=new VectorLayer({
  style: new Style({
    stroke: new Stroke({
      color: '#FFA500',
      width: 2,
    }),
    fill: new Fill({
      color: '#FFA500',
    }),
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: '#FFA500',
      }),
      stroke: new Stroke({
        color: '#FFA500',
      }),
    }),
  })

  }


  );



// appendbtn.onclick = function(e){
//   alert("append");
//   const url = new URL(window.location.href);
//   url.searchParams.set("lat", "1");
//   url.searchParams.set("lon", "2");

//   console.log(url.toString());
//   // Or update the browser's address bar without reloading:
//   window.history.replaceState(null, "", url.toString());

// }


// setInterval(() => {
//   const url = new URL(window.location.href);
//   const params = url.searchParams;

//   const hasLat = params.has("lat");
//   const hasLon = params.has("lon");

//   if (hasLat && hasLon) {
//     alert("lat and lon exist in the URL!");
//   }
// }, 5000);



//Additional Layer road_layer
const mprams_road=new ImageLayer({
  source: new ImageArcGISRest({
    ratio: 1,
    params: {},
    url: 'https://mprams.in:6443/arcgis/rest/services/mprams/zoom/MapServer',
  }),
  visible: false,
});

//var additionlayers=[];
//for osm map
const layers = [];


aditional.onclick=function(a)
{


var slider=a.srcElement;

//console.log(slider.type);

var cb=a.srcElement;
//console.log("table clicked.........................."+cb.checked);
  if(cb.checked & cb.type=="checkbox")
  {

    //alert(layers.length);
    //console.log("Layer clicked......"+cb.value.split("^")[0]+"  layer name : "+cb.value.split("^")[1]);
    //layers[19].setVisible(true);
   var arcgisorgeoserver=(cb.value.split("^")[1]).split("$")[1];
   var layernameparameter=(cb.value.split("^")[1]).split("$")[0];
   var geoserverlayernameparameter=(cb.value.split("^")[1]).split("$")[2];

   if(arcgisorgeoserver=="ARCGIS")
   {
   var layer=new ImageLayer({
      source: new ImageArcGISRest({
        ratio: 1,
        params: {},
        url: cb.value.split("^")[0],
      }),
      visible: true,
      //zIndex: 10, 
    });
    layer.set('name',layernameparameter);



     //map.addLayer(layer);

     //map.getLayers().extend([layer]);

     map.getLayers().insertAt(4,layer);


    }

    if(arcgisorgeoserver=="GEOSERVER" )
    {

      var layer = new ImageLayer({
        source: new ImageWMS({
          url: cb.value.split("^")[0],
          params: { "LAYERS": geoserverlayernameparameter, },
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        }),
        visible: true,
        //zIndex: 10,
      });
      layer.set('name',layernameparameter);
      //map.addLayer(layer);
      map.getLayers().insertAt(4,layer);
     }


  }
  if(!cb.checked & cb.type=="checkbox")
  {
    var layernameparameter=(cb.value.split("^")[1]).split("$")[0];
    //console.log("Layer un-clicked......"+cb.value.split("^")[0]);
    var maplayers=map.getLayers();

    maplayers.forEach(maplayer => {
      if (maplayer.get('name') && maplayer.get('name') == layernameparameter){
        map.removeLayer(maplayer)
      }
    });


  }


  if(cb.type=="range")
  {

    var child_cb=cb.parentNode.children[0];
    if(child_cb.checked)
    {
   //adjust transparency................

   var layernameparameter=(child_cb.value.split("^")[1]).split("$")[0];
    //console.log("Layer un-clicked......"+cb.value.split("^")[0]);
    var maplayers=map.getLayers();

    maplayers.forEach(maplayer => {
      if (maplayer.get('name') && maplayer.get('name') == layernameparameter){
        maplayer.setOpacity(cb.value/100);

      }
    });



    }




  }


}




large_image_container_close.onclick=function()
{

document.getElementById("large_image_container").style.visibility="hidden";

}


var culvert_id=0;

// base map switcher start
//for bing map

const bing_styles = [
  'OSM',
  'Aerial',
  'AerialWithLabelsOnDemand',
  'CanvasDark',
  'OrdnanceSurvey',

];

  const base_styles = [
    'OSM',
    'Aerial',
    'AerialWithLabelsOnDemand',
    'CanvasDark',
    'World_Imagery',
    'World_Topo_Map'
  ];



// layers.push(new TileLayer({
//   source: new OSM(),
// }));


 let i, ii;
// for (i = 1, ii = bing_styles.length; i < ii; ++i) {
//   layers.push(
//     new TileLayer({
//       visible: false,
//       preload: Infinity,
//       source: new BingMaps({
//         key: 'AiX082K6jqb4WgZE6J0OgyAbQjK-fif19nB63CEwNkefNeO4EaOrEKaPW_FnjaPK',
//         imagerySet: bing_styles[i],
//         crossOrigin: 'anonymous',
//         // use maxZoom 19 to see stretched tiles instead of the BingMaps
//         // "no photos at this zoom level" tiles
//         // maxZoom: 19
//       }),
//     })
//   );
// }


 layers.push(new TileLayer({
        visible: true,
        source: new OSM(),
        zIndex: -1,
  }));


asset_image.onclick=function(a){



var large_image_container=document.getElementById("large_image_container");
large_image_container.style.visibility="visible";
 var tstimage=document.getElementById("asset_image");
 var clonedItem = tstimage.cloneNode(true);

 //clonedItem.setAttribute('height','20%');
 //clonedItem.setAttribute('width', window.innerWidth - 100);
 //clonedItem.setAttribute('height', window.innerHeight - 500);
 //console.log(clonedItem);
 var large_image=document.getElementById("large_image");
 large_image.innerHTML = "";
 large_image.appendChild(clonedItem);
 //large_image.style.height='20%';
 clonedItem.style.height = '80%';
 //clonedItem.setAttribute('height', window.outerHeight-100);
 //clonedItem.setAttribute('width', window.outerWidth-200);
}



function onChange() {



  // const style = map_switcher.value;
  // for (let i = 0, ii = layers.length; i < ii; ++i) {
  //   layers[i].setVisible(bing_styles[i] === style);
  // }

  // const style = map_switcher.value;
  // for (let i = 0; i < layers.length; ++i) {
  //   layers[i].setVisible(base_styles[i] === style);
  // }

  /// SH LAYER CHANGE
  if(sh.checked)
  {
    shView();
  }
  if(!sh.checked)
  {
    shView();
  }

  /// MDR LAYER CHANGE
  if(checkbox_mdr.checked)
  {
    mdrView();
  }
  if(!checkbox_mdr.checked)
  {
    mdrView();
  }

  /// ODR LAYER CHANGE
  if(checkbox_odr.checked)
  {
    odrView();
  }
  if(!checkbox_odr.checked)
  {
    odrView();
  }

  /// LR OR RR LAYER CHANGE
  if (lr.checked)
  {
    lrView();
  }
  if (!lr.checked)
  {
    lrView();
  }

  /// NH LAYER CHANGE
  if (nh.checked)
  {
    nhView();
  }
  if (!nh.checked)
  {
    nhView();
  }

  /// UR LAYER CHANGE
  if(ur.checked) {
    urView();
  }

  if(!ur.checked) {
    urView();
  }

  /// BRIDGE LAYER CHANGE
  if (bridge.checked==true)
  {
    bridgeView();
  }
  if (!bridge.checked== true)
  {
    bridgeView();
  }


  /// ROAD ACCIDENT LAYER CHANGE
  if (roadaccident.checked==true)
  {
    roadAccidentView();
  }
  if (!roadaccident.checked== true)
  {
    roadAccidentView();
  }




  /// BRIDGE RATING LAYER CHANGE
  if(bridgerating.checked==true){
    brdgratingView();
  }
  if(!bridgerating.checked==true){
    brdgratingView();
  }

  /// RI LAYER CHANGE
  if (ri.checked == true) {
    riView();
  }
  else if (!ri.checked == true) {
    riView();
  }


  if (projectw.checked == true) {
    projectView();
  }
  else if (!projectw.checked == true) {
    projectView();
  }




  /// ROUG LAYER CHANGE
  if (roug.checked == true) {
    roughnessView();
  }
  else if (!roug.checked == true) {
    roughnessView();
  }

  /// ROW LAYER CHANGE
  if (row.checked) {
     rowView();
  }
  if (!row.checked) {
     rowView();
  }

  /// TRAFFIC DISTRIBUTION LAYER CHANGE
  if(trfcdistr.checked) {
    trafficdistrbtnView();
  }
  if(!trfcdistr.checked) {
    trafficdistrbtnView();
  }

  /// TRAFFIC STATION LAYER CHANGE
  if (traffic_station.checked==true)
  {
    trafficstationView();
  }
  if (!traffic_station.checked== true)
  {
    trafficstationView();
  }

  /// WORK HISTORY LAYER CHANGE
  if(workhistory.checked) {
    workhistoryView();
  }
  if(!workhistory.checked) {
    workhistoryView();
  }

  /// CULVERT LAYER CHANGE
  if(culvert.checked) {
    culvertView();
  }
  if(!culvert.checked) {
    culvertView();
  }

  /// GROWTH POINT LAYER CHANGE
  if(viewgrowthpoint.checked) {
    growthpointView();
  }
  if(!viewgrowthpoint.checked) {
    growthpointView();
  }

  /// SLOPE LAYER CHANGE
  if(viewslope.checked) {
    slopeView();
  }
  if(!viewslope.checked) {
    slopeView();
  }

  if(boxslab.checked){
    boxslabView();
  }
  if(!boxslab.checked){
    boxslabView();
  }


  /// CULVERT LAYER CHANGE
  if(disaster.checked) {
    calamityView();
  }
  if(!disaster.checked) {
    calamityView();
  }

  if(ncisapproval.checked){
    calamityStatusView();
  }
  if(!ncisapproval.checked){
    calamityStatusView();
  }


  if(accidentheat.checked){
    accidentHeatMap();
  }

  if(!accidentheat.checked){
    accidentHeatMap();
  }


  if(blackspotaccident.checked){
    blackSpotView();
  }

  if(!blackspotaccident.checked){
    blackSpotView();
  }

  if(gridaccident.checked){
    gridAccident();
  }

  if(!gridaccident.checked){
    gridAccident();
  }

  // if(project_status.checked){
  //   workstatusView();
  // }
  // if(!project_status.checked){
  //   workstatusView();
  // }


  road_search_layer.setVisible(true);
  dynamic_layer.setVisible(true);
  dynamic_layer_theme.setVisible(true);

}
map_switcher.addEventListener('change', onChange);
//onChange();

// base map switcher end


//global variables
var road_coden = "";
var jrdcn_coden = "";
var jrdcn_namen = "";
var bridge_id="";
var intl_str_type="";
var calamity_id="";
var project_id="";

//var csrf_token="";

// default zoom, center and rotation
let zoom = 8;
let center = [0, 0];
let rotation = 16;
let lon = 0.0;
let lat = 0.0;

let scaleType = 'scaleline';
let scaleBarSteps = 4;
let scaleBarText = true;
let control;
let lengend;

control = new ScaleLine({
  units: 'metric',
  bar: true,
  steps: scaleBarSteps,
  text: scaleBarText,
  minWidth: 140,
});


if (window.location.hash !== '') {

  const hash = window.location.hash.replace('#map=', '');
  const parts = hash.split('/');
  if (parts.length === 4) {
    zoom = parseFloat(parts[0]);
    center = [parseFloat(parts[1]), parseFloat(parts[2])];
    rotation = parseFloat(parts[3]);
  }
}


//zoom to lat lon logic

latlonlocatebutton.onclick = function () {
  //lon = parseFloat(lontext.value);
  //lat = parseFloat(lattext.value);

  // Use URL values if they exist, otherwise use input values
  //lon = (typeof lon_url !== 'undefined' && lon_url !== null) ? parseFloat(lon_url) : parseFloat(lontext.value);
  //lat = (typeof lat_url !== 'undefined' && lat_url !== null) ? parseFloat(lat_url) : parseFloat(lattext.value);

  lon = parseFloat(lontext.value) ? parseFloat(lontext.value) : parseFloat(lon_url);
  lat = parseFloat(lattext.value) ? parseFloat(lattext.value) : parseFloat(lat_url);

  map.getView().setCenter(transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
  map.getView().setZoom(18);
  var centerLongitudeLatitude = fromLonLat([lon, lat]);
  addMarker(centerLongitudeLatitude);

  
}
//zoom to lat lon clear logic

latlonlocateclearbutton.onclick=function(){

  clearMarker();



}


// start measurment tool.......................
const source = new VectorSource();

const vector = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2,
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ffcc33',
      }),
    }),
  }),
});

///test

/**
 * Currently drawn feature.
 * @type {import("../src/ol/Feature.js").default}
 */
let sketch;

/**
 * The help tooltip element.
 * @type {HTMLElement}
 */
let helpTooltipElement;

/**
 * Overlay to show the help messages.
 * @type {Overlay}
 */
let helpTooltip;

/**
 * The measure tooltip element.
 * @type {HTMLElement}
 */
let measureTooltipElement;

/**
 * Overlay to show the measurement.
 * @type {Overlay}
 */
let measureTooltip;

/**
 * Message to show when  drawing a polygon.
 * @type {string}
 */
const continuePolygonMsg = 'Click to continue drawing the polygon';

/**
 * Message to show when  drawing a line.
 * @type {string}
 */
const continueLineMsg = 'Click to continue drawing the line';

/**
 * Handle pointer move.
 * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
 */
const pointerMoveHandler = function (evt) {
  if (evt.dragging) {
    return;
  }
  /** @type {string} */
  let helpMsg = 'Click to start drawing';

  if (sketch) {
    const geom = sketch.getGeometry();
    if (geom instanceof Polygon) {
      helpMsg = continuePolygonMsg;
    } else if (geom instanceof LineString) {
      helpMsg = continueLineMsg;
    }
  }

  helpTooltipElement.innerHTML = helpMsg;
  helpTooltip.setPosition(evt.coordinate);

  helpTooltipElement.classList.remove('hidden');
};

// end measurment tool






/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  document_layer_theme.getSource().updateParams({"CQL_FILTER":"docci_id='-99'"});
  return false;
};

function dispimage(a,b){

  var doccid=b;
  document_layer_theme.setVisible(true);
  document_layer_theme.getSource().updateParams({"CQL_FILTER":"docci_id='"+doccid+"'"});
  document_layer_theme.getSource().refresh();


  if(a.target.title.includes("mp4")){

    video_src.style.display="block";
    asset_image.style.display="none";
    video_src.src="VideoReader?imagename="+a;
  }else{

    asset_image.style.display="block";
    video_src.style.display="none";
    asset_image.src="ImageReader?imagename="+a;
  }

}

const vectorSource_ur = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aurban_road&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


//State Highway
const vectorSource_sh = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Astate_highway&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


//Climate Average Rainfall
const vectorSource_climate_rainfall = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aclimate_average_rainfall&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


//Climate Vulnerability Observation
const vectorSource_vlunerability_observation = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aclimate_vulnerability_obseravtion&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});

//Project work
const vectorSource_projectw = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_wms_project_with_road&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});



//Major District Road
const vectorSource_mdr = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Amajor_district_road&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


//Other District Road
const vectorSource_odr = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aother_district_road&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


const vectorSource_lr = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Ajrdcn_with_road_gis_new&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=lkp_road_category in (\'LR\',\'TR\',\'VR\',\'RR\')',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});

const vectorSource_nh= new VectorSource({

  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3A3Ajrdcn_with_road_gis_new&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=lkp_road_category in (\'NH\')',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',

});




//road_end_point

const road_end_theme = new ImageLayer({
  source: new ImageWMS({
    url: domain_name+'wms',
    params: { "LAYERS": 'megrams:v_road_end_point', },
    ratio: 1,
    crossOrigin: 'anonymous',
    serverType: 'geoserver',
  }),
  visible: false,
});

const traffic_distribution_theme = new ImageLayer({
  source: traffic_distribution_theme_source,
  visible: false,
});


const workhistory_theme = new ImageLayer({
  source: workhistory_theme_source,
  visible: false,
});


//view growth center layer
const viewgrowthcenter_theme = new ImageLayer({
  source: viewgrowthcenter_theme_source,
  visible: false,
});

const viewgrowthcenter_source= new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams:v_ecis_growth_center&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});

const viewgrowthcenter_layer = new VectorLayer({
  source: viewgrowthcenter_source,
  style: new Style({
    stroke: new Stroke({
      color: 'magenta',
      width: 2,
    }),
    fill: new Fill({
      color: 'magenta',
    }),
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({
        color: 'yellow',
        opacity:1,
      }),
      stroke: new Stroke({
        color: 'yellow',
      }),
    }),
  }),
  visible: false,
})


//slope
const viewslope_theme = new ImageLayer({
  source: viewslope_theme_source,
  visible: false,
});


const viewslope_source= new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams:v_road_slop_dtl&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


const viewslope_layer = new VectorLayer({
  source: viewslope_source,
  style: new Style({
    stroke: new Stroke({
      color: 'magenta',
      width: 2,
    }),
    fill: new Fill({
      color: 'magenta',
    }),
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({
        color: 'yellow',
        opacity:1,
      }),
      stroke: new Stroke({
        color: 'yellow',
      }),
    }),
  }),
  visible: false,
})



//Bridge
const vectorSource_bridge = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_bridge_mst&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});

//Road Accident
const vectorSource_roadaccident = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aroad_accident&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});

const vectorSource_balckspot = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_black_spot_stretch_geom&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
})

const vectorSource_gridaccident = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Arsis_grid_table&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
})

//Facilities
const vectorSource_facilities = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_facilities&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
})

//Box Culvert
const vectorSource_box_culvert = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_box_culvert&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


// Traffic Station
const vectorSource_traffic_station =  new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_tss_mst&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});



//Culvert
const vectorSource_culvert = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_road_clvrt_inf&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


//view calamity theme
const viewgrowcalamity_theme = new ImageLayer({
  source: viewcalamity_theme_source,
  visible: false,
});


//view growth center layer
const viewgrowcalamity_status_theme = new ImageLayer({
  source: viewcalamity_status_theme_source,
  visible: false,
});


//Calamity
const vectorSource_calamity = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_calamity&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});

//Calamity
const vectorSource_calamity_status = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_ncis_status&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


//road search layer
const vectorSource_road_search = new VectorSource({
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


const vectorSource_row = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_rwfis_inf&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});

const vectorSource_bridge_rating = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Amv_bridge_rating&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


const vectorSource_work_status = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_project_inf&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
})


const vector_source_traffic_distr = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_traffic_distribution&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});


const vector_source_workhistory_layer= new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_road_work_hist_inf&maxFeatures=50000&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});

//add assam road
const assam_road_source = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aassam_road&maxFeatures=150050&outputFormat=application%2Fjson',
  format: new GeoJSON(),
});


// Create a vector source with a custom loader to handle the data properly
// 4. Modified vector source with loader to handle GeometryCollections
// const vector_source_accident1 = new VectorSource({
//   loader: function(extent, resolution, projection) {
//     const url = this.getUrl();
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         const features = new GeoJSON().readFeatures(data, {
//           dataProjection: 'EPSG:4326',
//           featureProjection: 'EPSG:3857'
//         });
        
//         // Process GeometryCollections and filter null geometries
//         const validFeatures = features.filter(feature => {
//           const geometry = feature.getGeometry();
//           if (!geometry) return false;
          
//           if (geometry.getType() === 'GeometryCollection') {
//             const geometries = geometry.getGeometries();
//             const points = geometries.filter(g => g.getType() === 'Point');
//             if (points.length > 0) {
//               feature.setGeometry(points[0]);
//               return true;
//             }
//             return false;
//           }
//           return geometry.getType() === 'Point';
//         });
        
//         this.addFeatures(validFeatures);
//       })
//       .catch(error => console.error('Error loading accident data:', error));
//   },
//   strategy: bboxStrategy // Optional: use bbox loading strategy for large datasets
// });

const vector_source_accident = new VectorSource({
  url: domain_name + 'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_rsis_hdr&maxFeatures=150050&outputFormat=application%2Fjson',
  format: new GeoJSON(),
  loader: function(extent, resolution, projection) {
    const url = this.getUrl();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const features = new GeoJSON().readFeatures(data, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });
        
        // Filter out features with null geometries and extract Points from GeometryCollections
        const validFeatures = features.filter(feature => {
          const geometry = feature.getGeometry();
          if (!geometry) return false;
          
          if (geometry.getType() === 'GeometryCollection') {
            const geometries = geometry.getGeometries();
            const points = geometries.filter(g => g.getType() === 'Point');
            if (points.length > 0) {
              feature.setGeometry(points[0]); // Use the first point
              return true;
            }
            return false;
          }
          return geometry.getType() === 'Point';
        });
        
        this.addFeatures(validFeatures);
      })
      .catch(error => console.error('Error loading features:', error));
  }
});

// asssam road image layer
const road_inventory = new ImageLayer({
  source: road_inv_theme_source,
  visible: false,
});

const project_work = new ImageLayer({
  source: projectwork_theme_source,
  visible: false,
});

const black_spot_theme = new ImageLayer({
  source: black_spot_theme_source,
  visible: false,
})

const grid_accident_theme = new ImageLayer({
  source: grid_accident_theme_source,
  visible: false,
})

//road roughness theme
const road_roughness = new ImageLayer({
  source: road_roughness_source,
  visible: false,
});



// bridge theme
const bridge_cat_theme = new ImageLayer({
  source: bridge_cat_theme_source,
  visible: false,
});

// bridge theme
const roadaccident_theme = new ImageLayer({
  source: roadaccident_theme_source,
  visible: false,
});




// facilities theme
const facilities_theme = new ImageLayer({
  source: facilities_cat_theme_source,
  visible: false,
})

// bridge theme
const box_culvert_theme = new ImageLayer({
  source: box_culvert_theme_source,
  visible: false,
});


// traffic station theme
const traffic_station_theme = new ImageLayer({
  source: traffic_station_theme_source,
  visible: false,
})

// bridge rating theme
const bridge_rating_theme = new ImageLayer({
  source: bridge_rating_theme_source,
  visible: false,
});

const work_status_theme = new ImageLayer({
  source: work_status_theme_source,
  visible: false,
})



// const wmsSource = new ImageWMS({
//   url: 'http://103.219.61.73:8085/geoserver/cite/wms',
//   params: {"LAYERS": 'megrams:v_road_inventory',},
//   ratio: 1,
//   serverType: 'geoserver',
// });



// add style for various geometry type

const image = new CircleStyle({
  radius: 10,
  fill: new Fill({
    color: 'rgba(0, 0, 0, 1)',
  }),
  stroke: new Stroke({ color: 'black', width: 1 }),
});

const styles = {
  'Point': new Style({
    image: image,
  }),
  'LineString': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 3,
    }),
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 3,
    }),
  }),
  'MultiPoint': new Style({
    image: image,
  }),
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'yellow',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 0, 1)',
    }),
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
  'GeometryCollection': new Style({
    stroke: new Stroke({
      color: 'magenta',
      width: 2,
    }),
    fill: new Fill({
      color: 'magenta',
    }),
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: 'magenta',
      }),
    }),
  }),
  'Circle': new Style({
    stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.2)',
    }),
  }),
};

const styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};


const ur_layer = new VectorLayer({
  source: vectorSource_ur,
  style: new Style({
    stroke: new Stroke({
      color: '#666699',
      width: 3,
    }),
  }),
  visible: false,
})

const ur_layer_theme = new ImageLayer({
  source: ur_layer_theme_source,
  visible: false,
});



const sh_layer = new VectorLayer({
  source: vectorSource_sh,
  style: new Style({
    stroke: new Stroke({
      color: 'green',
      width: 3,
    }),
  }),
  visible: false,
});


const climate_rainfall_layer = new VectorLayer({
  source: vectorSource_climate_rainfall,
  style: new Style({
    stroke: new Stroke({
      color: 'green',
      width: 3,
    }),
  }),
  visible: false,
});



const climate_vulnerability_layer = new VectorLayer({
  source: vectorSource_vlunerability_observation,
  style: new Style({
    stroke: new Stroke({
      color: 'green',
      width: 3,
    }),
  }),
  visible: false,
});


const projectw_layer = new VectorLayer({
  source: vectorSource_projectw,
  style: new Style({
    stroke: new Stroke({
      color: 'green',
      width: 3,
    }),
  }),
  visible: false,
});



// const projectwork_layer = new VectorLayer({
//   source: vectorSource_projectwork,
//   style: new Style({
//     stroke: new Stroke({
//       color: 'green',
//       width: 3,
//     }),
//   }),
//   visible: false,
// });



//state highway theme
const sh_layer_theme = new ImageLayer({
  source: sh_layer_theme_source,
  visible: false,
});

const climate_rianfall_layer_theme = new ImageLayer({
  source: climate_rainfall_layer_theme_source,
  visible: false,
});


const climate_vulnerability_layer_theme = new ImageLayer({
  source: climate_vulnerability_layer_theme_source,
  visible: false,
});



//project work theme
const projectw_layer_theme = new ImageLayer({
  source: projectw_layer_theme_source,
  visible: false,
});

//Major district road layer
const mdr_layer = new VectorLayer({
  source: vectorSource_mdr,
  style: new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 3,
    }),
  }),
  visible: false,
})

// mdr_layer theme
const mdr_layer_theme = new ImageLayer({
  source: mdr_layer_theme_source,
  visible: false,
});

const odr_layer = new VectorLayer({
  source: vectorSource_odr,
  style: new Style({
    stroke: new Stroke({
      color: 'orange',
      width: 3,
    }),
  }),
  opacity: 0.01,
  visible: false,
})


//odr_layer theme
const odr_layer_theme = new ImageLayer({
  source: odr_layer_theme_source,
  visible: false,
});



const lr_layer = new VectorLayer({
  source: vectorSource_lr,
  style: new Style({
    stroke: new Stroke({
      color: '#FF14FE',
      width: 4,
    }),
  }),
  visible: false,
})

//locar road theme
const lr_layer_theme = new ImageLayer({
  source: lr_layer_theme_source,
  visible: false,
});

const nh_layer=new VectorLayer({
  source: vectorSource_nh,
  style: new Style({
    stroke: new Stroke({
      color: '#FF146B',
      width: 1,
    }),
  }),
  visible: false,
  opacity:0.01,
})


// nh_layer theme
const nh_layer_theme = new ImageLayer({
  source: nh_layer_theme_source,
  visible: false,
});

// Animation Configuration - Easily adjustable parameters
const animationConfig = {
  initialRadius: 7,
  maxRadius: 12,  // Increased max radius for more visible animation
  minRadius: 5,
  growthRate: 1,  // Increased growth rate for faster animation
  animationFPS: 24,  // Slightly reduced FPS for better performance
  colors: {
    RFCDD: { fill: 'rgba(255, 0, 0, 0.8)', stroke: 'rgba(180, 0, 0, 1)' },
    RPD: { fill: 'rgba(255, 255, 0, 0.8)', stroke: 'rgba(200, 150, 0, 1)' },
    RFO: { fill: 'rgba(0, 180, 0, 0.8)', stroke: 'rgba(0, 120, 0, 1)' },
    default: { fill: 'rgba(150, 150, 150, 0.8)', stroke: 'rgba(80, 80, 80, 1)' }
  }
};

// Animation state
let currentRadius = animationConfig.initialRadius;
let growing = true;
let lastFrameTime = 0;
let animationFrameId = null;
let isInteracting = false;

// Create cached styles for static features
const staticStyles = {};
Object.keys(animationConfig.colors).forEach(type => {
  if (type !== 'RFCDD') {
    staticStyles[type] = new Style({
      image: new CircleStyle({
        radius: animationConfig.initialRadius,
        fill: new Fill({ color: animationConfig.colors[type].fill }),
        stroke: new Stroke({
          color: animationConfig.colors[type].stroke,
          width: 1.2  // Slightly thicker stroke for better visibility
        }),
      }),
    });
  }
});

// Create the animated style object
const animatedStyle = new Style({
  image: new CircleStyle({
    radius: currentRadius,
    fill: new Fill({ color: animationConfig.colors.RFCDD.fill }),
    stroke: new Stroke({
      color: animationConfig.colors.RFCDD.stroke,
      width: 1.5  // Thicker stroke for animated features
    }),
  }),
});

// Optimized style function
const getFeatureStyle = (feature) => {
  const structType = feature.get('road_status');
  return structType === 'RFCDD' ? animatedStyle : staticStyles[structType] || staticStyles.default;
};

// Enhanced animation loop with smoother progression
const animate = (timestamp) => {
  const frameInterval = 1000 / animationConfig.animationFPS;
  
  if (timestamp - lastFrameTime >= frameInterval) {
    lastFrameTime = timestamp;
    
    // Calculate progress (0 to 1) through current growth phase
    let progress;
    if (growing) {
      progress = (currentRadius - animationConfig.initialRadius) / 
                (animationConfig.maxRadius - animationConfig.initialRadius);
      currentRadius += animationConfig.growthRate * (1.2 - progress * 0.4); // Faster at start
      
      if (currentRadius >= animationConfig.maxRadius) {
        growing = false;
        currentRadius = animationConfig.maxRadius;
      }
    } else {
      progress = (currentRadius - animationConfig.minRadius) / 
                (animationConfig.maxRadius - animationConfig.minRadius);
      currentRadius -= animationConfig.growthRate * (0.8 + progress * 0.4); // Faster at end
      
      if (currentRadius <= animationConfig.minRadius) {
        growing = true;
        currentRadius = animationConfig.minRadius;
      }
    }
    
    // Update the animated style
    animatedStyle.getImage().setRadius(currentRadius);
    
    // Only refresh if not interacting with the map
    if (!isInteracting) {
      vectorSource_calamity.getFeatures().forEach(feature => {
        if (feature.get('road_status') === 'RFCDD') {
          feature.changed();
        }
      });
    }
  }
  
  animationFrameId = requestAnimationFrame(animate);
};


const calamity_status_style = (feature) => {
  //const jrdcnCode = feature.get('jrdcn_code');
  //alert(feature.get('is_approved'))
  const approval_status = feature.get('is_approved');
  const radius = 7; // Fixed radius for all cases
  
  // Determine the style based on jrdcnCode
  if (approval_status=== 1) {
    // Green for valid jrdcnCode
    return new Style({
      image: new CircleStyle({
        radius: radius,
        fill: new Fill({
          color: 'green',
        }),
        stroke: new Stroke({
          color: 'darkgreen',
          width: 1,
        }),
      }),
    });
  } else if (approval_status === 0) {
    // Red for null/undefined (without animation)
    return new Style({
      image: new CircleStyle({
        radius: radius,
        fill: new Fill({
          color: 'red',
        }),
        stroke: new Stroke({
          color: 'darkred',
          width: 1,
        }),
      }),
    });
  } else {
    // Gray for any other case
    return new Style({
      image: new CircleStyle({
        radius: radius,
        fill: new Fill({
          color: 'red',
        }),
        stroke: new Stroke({
          color: 'darkred',
          width: 1,
        }),
      }),
    });
  }
};

// Create the layer with the animated style
// const calamity_layer = new VectorLayer({
//   source: vectorSource_calamity,
//   style: animatedStyle, // Use the style function
//   visible: false,
// });
// Create layers with performance optimizations
const calamity_layer = new VectorLayer({
  source: vectorSource_calamity,
  style: getFeatureStyle,
  visible: false,
  updateWhileAnimating: true,
  updateWhileInteracting: false, // Better performance during interaction
  renderMode: 'vector' // Better for many features
});


const calamity_status_layer = new VectorLayer({
  source: vectorSource_calamity_status,
  style: calamity_status_style,
  visible: false,
})



/// URL PARAMETER
const urlParams = new URLSearchParams(window.location.search);
const layername_url = urlParams.get('layername');
const cql_url=urlParams.get('cql');
const lat_url=urlParams.get('lat');
const lon_url=urlParams.get('lon');

document.addEventListener('DOMContentLoaded', function() {
  //console.log(lat_url+"@@"+lon_url);
  
  if (typeof lat_url !== 'undefined' && lat_url !== null && typeof lon_url !== 'undefined' && lon_url !== null) {
    latlonlocatebutton.click();
  }

});
//alert(cql_url);


//dynamic_layer

const vectorSource_dynamiclayer = new VectorSource({
  url: domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+layername_url+'&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER='+cql_url,
  format: new GeoJSON(),
  crossOrigin: 'anonymous',
});

const dynamic_layer=new VectorLayer({
  source: vectorSource_dynamiclayer,
  // style: new Style({
  //   stroke: new Stroke({
  //     color: '#FF146B',
  //     width: 1,
  //   }),
  // }),
  style: layername_url === 'megrams:v_calamity' ? getFeatureStyle : new Style({
    stroke: new Stroke({
      color: '#FF146B',
      width: 1,
    }),
  }),
  visible: true,
  opacity:1,
  renderMode: 'vector'
})


dynamic_layer.getSource().on('addfeature', function (e) {
   map.getView().fit(dynamic_layer.getSource().getExtent());
   const mapview=map.getView();
   if(layername_url.startsWith("megrams:jrdcn_with_road")|| layername_url.startsWith("megrams:v_rai_connected_population_inf"))
   {}
   else if(layername_url.startsWith("megrams:v_ncis_status"))
   {
    // if (ncisCheckbox) {
    //   ncisCheckbox.checked = true;
    // }
   }
   else
   map.getView().animate({zoom: mapview.getZoom() -5});

});

//dynamic_layer theme

const imgSource_dynamiclayer = new ImageWMS({
  url: domain_name+'wms',
  params: { "LAYERS": layername_url,"CQL_FILTER":cql_url},
  ratio: 1,
  crossOrigin: 'anonymous',
  serverType: 'geoserver',
});

const dynamic_layer_theme=new ImageLayer({
  source: imgSource_dynamiclayer,
  visible: true,
});


// // Function to trigger the animation
// const animate = () => {
//   requestAnimationFrame(animate); // Continuously update the animation
//   vectorSource_calamity.changed(); // Trigger a re-render of the layer
//   vectorSource_dynamiclayer.changed();
// };

// // Start the animation
// animate();



const bridge_layer = new VectorLayer({
  source: vectorSource_bridge,
  visible: false,
});


const roadaccident_layer = new VectorLayer({
  source: vectorSource_roadaccident,
  visible: false,
});

const black_spot_layer = new VectorLayer({
  source: vectorSource_balckspot,
  visible: false,
})

const grid_accident_layer = new VectorLayer({
  source: vectorSource_gridaccident,
  visible: false,
})

const facilities_layer = new VectorLayer({
  source: vectorSource_facilities,
  visible: false,
})


const box_culvert_layer = new VectorLayer({
  source: vectorSource_box_culvert,
  visible: false,
});


const traffic_station_layer =  new VectorLayer({
  source: vectorSource_traffic_station,
  visible: false,
});


const row_layer = new VectorLayer({
  source: vectorSource_row,
  visible: false,
});


const traffic_distribution_layer = new VectorLayer({
  source: vector_source_traffic_distr,
  visible: false,
});


//Circle
const workhistory_layer = new VectorLayer({
  source: vector_source_workhistory_layer,
  visible: false,
});



// Create the heatmap layer with proper configuration
const accidentHeatMap_layer = new Heatmap({
  source: vector_source_accident,
  visible: false,
  blur: 20,
  radius: 15,
  weight: function(feature) {
    // Use fatal_class or number of fatalities as weight
    const fatalClass = feature.get('fatal_class') || 0;
    const fatalities = feature.get('rsish_no_fatal') || 0;
    
    // Return a weight between 0.1 and 1 based on severity
    if (fatalClass === 1) return 1; // Fatal accidents get full weight
    if (fatalities > 0) return 0.5 + (Math.min(fatalities, 5) / 10); // Scale with fatality count
    return 0.3; // Default weight for non-fatal accidents
  },
  gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'] // Blue to red gradient
});


//Layer to show lattitude and longitude over map

const latlonsource = new VectorSource();


const latlonvector = new VectorLayer({
  source: latlonsource,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2,
    }),
    image: new CircleStyle({
      radius: 3,
      fill: new Fill({
        color: '#ffcc33',
      }),
    }),
  }),
  visible: true,
});


const culvert_layer = new VectorLayer({
  source: vectorSource_culvert,
  style: new Style({
    stroke: new Stroke({
      color: 'magenta',
      width: 2,
    }),
    fill: new Fill({
      color: 'magenta',
    }),
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: '#336699',
      }),
      stroke: new Stroke({
        color: '#336699',
      }),
    }),
  }),
  visible: false,
})


const row_theme = new ImageLayer({
  source: row_theme_source,
  visible: false,
});

// bridge rating vector layer

const bridge_rating_layer = new VectorLayer({
  source: vectorSource_bridge_rating,
  visible: false,
})

const work_status_layer = new VectorLayer({
  source: vectorSource_work_status,
  visible: false,
})


// road search layer

const road_search_layer = new VectorLayer({
  source: vectorSource_road_search,
  style: new Style({
    stroke: new Stroke({
      color: 'cyan',
      width: 3,
    }),
  }),
  visible: true,
})

road_search_layer.getSource().on('addfeature', function (e) {
  //console.log("temo........." + road_search_layer.getSource().getExtent());
  //alert("zoom.on road working code.......");
  map.getView().fit(road_search_layer.getSource().getExtent());
});



layers.push(accidentHeatMap_layer);

//push all geoserver layer
layers.push(road_search_layer);

layers.push(sh_layer);
layers.push(sh_layer_theme);

layers.push(climate_rainfall_layer);
layers.push(climate_rianfall_layer_theme);

layers.push(climate_vulnerability_layer);
layers.push(climate_vulnerability_layer_theme);

layers.push(mdr_layer);
layers.push(mdr_layer_theme);

layers.push(odr_layer);
layers.push(odr_layer_theme);

layers.push(lr_layer);
layers.push(lr_layer_theme);

layers.push(nh_layer);
layers.push(nh_layer_theme);

layers.push(ur_layer);
layers.push(ur_layer_theme);

layers.push(mprams_road);

road_inventory.set('name','Road Inventory');
layers.push(road_inventory);

layers.push(project_work);

layers.push(projectw_layer);
layers.push(projectw_layer_theme);

road_roughness.set('name','Road Roughness');
layers.push(road_roughness);

layers.push(road_end_theme);

layers.push(bridge_cat_theme);
layers.push(bridge_layer);

layers.push(roadaccident_theme);
layers.push(roadaccident_layer);


layers.push(traffic_station_theme);
layers.push(traffic_station_layer);

layers.push(culvert_layer);

layers.push(vector);
layers.push(latlonvector);

layers.push(row_theme);
layers.push(row_layer);

layers.push(bridge_rating_theme);
layers.push(bridge_rating_layer);

layers.push(traffic_distribution_theme);
layers.push(traffic_distribution_layer);

layers.push(workhistory_theme);
layers.push(workhistory_layer);

layers.push(viewgrowthcenter_theme);
layers.push(viewgrowthcenter_layer);

layers.push(viewslope_theme);
layers.push(viewslope_layer)

layers.push(document_layer_theme);
layers.push(dynamic_layer);
layers.push(dynamic_layer_theme);

layers.push( dynamic_ecis_facilities_within_road_buffer_layer);

layers.push(box_culvert_theme);
layers.push(box_culvert_layer);

layers.push(calamity_layer);
layers.push(viewgrowcalamity_theme);

layers.push(calamity_status_layer);
layers.push(viewgrowcalamity_status_theme);

layers.push(work_status_theme);
layers.push(work_status_layer);

layers.push(facilities_theme);
layers.push(facilities_layer);

layers.push(black_spot_theme);
layers.push(black_spot_layer);

layers.push(grid_accident_theme);
layers.push(grid_accident_layer);

//draw point logic start

const drawPointVector = new VectorLayer({
  source: new VectorSource({wrapX: false}),
});

layers.push(drawPointVector);


drawPointVector.getSource().on('addfeature', function (e) {
  //console.log("temo........." + road_search_layer.getSource().getExtent());
  //alert("zoom.on road working code.......");
 // map.getView().fit(road_search_layer.getSource().getExtent());
 //console.log(drawPointVector.getSource().getExtent());
});



let drawPointInteraction;

const circlevectorsource=   new VectorSource({
  projection: 'EPSG:4326'
});

let features=[];

const circlelayer = new VectorLayer({
  source:circlevectorsource,
   style: [
    new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 3
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      })
    })
  ]
});

layers.push(circlelayer);







function addInteractionTrace() {

  const value = 'Point';
  if (value !== 'None') {
    drawPointInteraction = new Draw({
      type: value,
      source: drawPointVector.getSource(),
      });
    map.addInteraction(drawPointInteraction);
    drawPointInteraction.on('drawstart', function (e) {
      // e.feature.on('change', function (){console.log('change');})
      //console.log("draw started..............");
      features=[];
      circlelayer.getSource().clear();

      var maplayers=map.getLayers();
      removeLayerfromMap(maplayers,'ecis_facilities_connected');
      removeLayerfromMap(maplayers,'dynamic_roads_within_circle_layer');

      });

      drawPointInteraction.on('drawend', function (e) {

        getfacilitytable.click();

        // e.feature.on('change', function (){console.log('change');})
        var geometry = e.feature.getGeometry();
        var extent=geometry.getExtent();
        //console.log(extent[0]+"========="+extent[1]);

       var radius=radius_text.value;
       //alert(radius*1000);


       features=[];
       features.push(new Feature(new Circle([extent[0],extent[1]],radius*1000)));
       circlevectorsource.addFeatures(features);
       //console.log("extent of circle is..............."+circlelayer.getSource().getExtent());
       //console.log([extent[0]+","+extent[1]]+","+2000)

       var lat_lon_for_analysis= transform([extent[0], extent[1]], 'EPSG:3857','EPSG:4326')


      // get ecis facilities within circle.....................





       //faciltiy within circle

       var dynamic_ecis_facilities_within_circle_source = new VectorSource({
        url: 'WebgisCommonController?name='+radius*1000+'-facilitieswithincircle&lon='+lat_lon_for_analysis[0]+'&lat='+lat_lon_for_analysis[1],
        format: new GeoJSON(),
        crossOrigin: 'anonymous',
      });

      var dynamic_ecis_facilities_within_circle_layer=new VectorLayer({
       source: dynamic_ecis_facilities_within_circle_source,
       style: new Style({
        stroke: new Stroke({
          color: '#FFA500',
          width: 2,
        }),
        fill: new Fill({
          color: '#FFA500',
        }),
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: '#FFA500',
          }),
          stroke: new Stroke({
            color: '#FFA500',
          }),
        }),
      })

      }


       );

       dynamic_ecis_facilities_within_circle_layer.set('name','ecis_facilities_connected');
       map.addLayer(dynamic_ecis_facilities_within_circle_layer);

       //end facility within circle




      // roads within circle
       var dynamic_roads_within_circle_source = new VectorSource({
        url: 'WebgisCommonController?name='+radius*1000+'-roadswithincircle&lon='+lat_lon_for_analysis[0]+'&lat='+lat_lon_for_analysis[1],
        format: new GeoJSON(),
        crossOrigin: 'anonymous',
      });

      var dynamic_roads_within_circle_layer=new VectorLayer({
       source: dynamic_roads_within_circle_source,
       style: new Style({
        stroke: new Stroke({
          color: '#FFA500',
          width: 2,
        }),
        fill: new Fill({
          color: '#FFA500',
        }),
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: '#FFA500',
          }),
          stroke: new Stroke({
            color: '#FFA500',
          }),
        }),
      })

      }


       );

       dynamic_roads_within_circle_layer.set('name','dynamic_roads_within_circle_layer');
       map.addLayer(dynamic_roads_within_circle_layer);

      //end road within circle






      growth_lat.value=lat_lon_for_analysis[1];
      growth_lon.value=lat_lon_for_analysis[0];

      //console.log(lat_lon_for_analysis[1]+"              "+lat_lon_for_analysis[0])

      //console.log(growth_lat+"   "+growth_lon)
      //end get ecis facilities within circle.....................

        });
  }




}


// calculate chainge for ECIS Module


const calculatechaingevectorsource=   new VectorSource({
  projection: 'EPSG:4326'
});

let calculatechainagefeatures=[];

const calculatechaingecirclelayer = new VectorLayer({
  source:calculatechaingevectorsource
});

layers.push(calculatechaingecirclelayer);

var ecistabledata;

var chainage_container=document.getElementsByClassName("ecis_calculated_chainage");

const ecis_add_road_segment=document.getElementById("accordionExample");
ecis_add_road_segment.addEventListener('mouseover',(event)=>
{

  chainage_container=document.getElementsByClassName("ecis_calculated_chainage");
  for(i=0;i<chainage_container.length;i++)
  {
      chainage_container[i].addEventListener('click',(event)=>{
      ecistabledata=event.currentTarget;

    });
  }


});


for(i=0;i<chainage_container.length;i++)
{
    chainage_container[i].addEventListener('click',(event)=>{
    ecistabledata=event.currentTarget;

  });
}

getrevchainage.addEventListener('change',(event)=>{
if(event.currentTarget.checked)
{

  //remove event which is used to calculate road importance............................
  map.removeInteraction(selectfroevalroadimp);


  map.un('singleclick', generatePopup);
  viewroadimportance.checked=false;
  map.removeInteraction(select);
  map.addInteraction(selectandcalculatechainage);
  selectandcalculatechainage.on('select', function (e) {
   if(e.target.getFeatures().getLength()>0)
   {
   var features=e.target.getFeatures();
   featureforcalculatingchainage=(features.getArray())[0];

   map.on('singleclick',generatePointToCalculateRevChaiange);
   }
   else
   {
    map.un('singleclick',generatePointToCalculateRevChaiange);

   }

  });




}
else{

  calculatechaingecirclelayer.getSource().clear();
  map.removeInteraction(selectandcalculatechainage);
  map.un('singleclick',generatePointToCalculateRevChaiange);
  map.on('singleclick', generatePopup);
  map.addInteraction(select);

}

});

// end calculate chainge for ECIS Module

const drawpoint=document.getElementById("drawpoint");
drawpoint.addEventListener('change', (event) => {
if(event.currentTarget.checked)
{

  map.un('singleclick', generatePopup);
  addInteractionTrace();
  map.removeInteraction(select);

}
else{
  map.on('singleclick', generatePopup);
  map.removeInteraction(drawPointInteraction);
  drawPointVector.getSource().clear();
  circlelayer.getSource().clear();
  map.addInteraction(select);

}

});

const selectfroevalroadimp = new Select();

function addInteractionForEvalRoadImportance(){

  map.addInteraction(selectfroevalroadimp);
  selectfroevalroadimp.on("select", function(e){


    const roadfeatures=e.target.getFeatures().getArray()[0];
    //alert(roadfeatures.values_.road_code);
    road_new=roadfeatures.values_.road_code;

    //console.log(JSON.stringify(roadfeatures));
    if(e.selected.length==0)
    {
    var maplayers=map.getLayers();
    for(i=0;i<8;i++)
    {
      removeLayerfromMap(maplayers,'ecis_facilities_within_road_buffer');
    }
    }
    if(e.selected.length>0)
    {

  getfacilityforroadimportance.click();
  var radius=viewroadimportanceradius.value;

  var dynamic_ecis_facilities_within_road_buffer_source = new VectorSource({

    url: 'WebgisCommonController?name='+radius*1000+'-facilitiesandroadswithinroadbuffer&roadcode='+roadfeatures.values_.road_code,
    format: new GeoJSON(),
    crossOrigin: 'anonymous',
  });

  dynamic_ecis_facilities_within_road_buffer_source.addEventListener('change', (event) =>{
    //map.getTargetElement().classList.remove('spinner');
    //document.getElementById('loading_halt_panel').style.visibility='hidden';
  });

  dynamic_ecis_facilities_within_road_buffer_layer.setSource(dynamic_ecis_facilities_within_road_buffer_source);


  //dynamic_ecis_facilities_within_road_buffer_layer.set('name','ecis_facilities_within_road_buffer');

  //alert("end="+JSON.stringify(dynamic_ecis_facilities_within_road_buffer_source.getState()));


    }
  //end facility within road buffer



    if(e.target.getFeatures().getLength()>0){
      console.log("started");
      //map.getTargetElement().classList.add('spinner');
      document.getElementById('loading_halt_panel').style.visibility='visible';


    }





  });



  const selectedFeatures = selectfroevalroadimp.getFeatures();
  console.log("importance="+selectedFeatures);


}




viewroadimportance.addEventListener('change', (event) => {
  if(event.currentTarget.checked)
  {
    dynamic_ecis_facilities_within_road_buffer_layer.setVisible(true);
    //remove road chainge calculation interaction.......

    map.removeInteraction(selectfroevalroadimp);
    map.un('singleclick', generatePopup);
    map.removeInteraction(select);
    map.un('singleclick',generatePointToCalculateRevChaiange);
    calculatechaingecirclelayer.getSource().clear();
    map.removeInteraction(selectandcalculatechainage);
    addInteractionForEvalRoadImportance();
    drawPointVector.getSource().clear();
    circlelayer.getSource().clear();
    //map.addInteraction(select);
    getrevchainage.checked=false;

  }
  else{


    dynamic_ecis_facilities_within_road_buffer_layer.setVisible(false);

    //var maplayers=map.getLayers();
    //removeLayerfromMap(maplayers,'ecis_facilities_within_road_buffer');

    map.removeInteraction(selectfroevalroadimp);

    if(getrevchainage.checked){
      map.addInteraction(selectandcalculatechainage);
    }else{
      map.on('singleclick', generatePopup);
      map.addInteraction(select);
      drawPointVector.getSource().clear();
      circlelayer.getSource().clear();
    }

  }

  });




/*
drawpoint.onclick=function(e)
{
if(drawpoint.checked)
{
  //alert("clicked");
  map.un('singleclick', generatePopup);
  addInteractionTrace();
  map.removeInteraction(select);


}
if(!drawpoint.checked)
{
  //alert("unclicked");
  map.on('singleclick', generatePopup);
  map.removeInteraction(drawPointInteraction);
  drawPointVector.getSource().clear();
  circlelayer.getSource().clear();
  map.addInteraction(select);

  //removeLayerfromMap('dynamic_roads_within_circle_layer');


  // removeLayerfromMap('ecis_facilities_connected');
}


}*/






//draw point logic end



//tracing tool logic start
/*
const drawVector = new VectorLayer({
  source: new VectorSource(),
  style: new Style({
    stroke: new Stroke({
      color: 'cyan',
      width: 3,
    }),
  }),
  });

layers.push(drawVector);

let drawInteraction;

const snapInteraction = new Snap({
  source: sh_layer.getSource(),
});



function addInteractionTrace() {
  const value = 'LineString';
  if (value !== 'None') {
    drawInteraction = new Draw({
      type: value,
      source: drawVector.getSource(),
      trace: true,
      traceSource: sh_layer.getSource(),
       });
    map.addInteraction(drawInteraction);
    map.addInteraction(snapInteraction);
  }
}


const traceroadcheckbox=document.getElementById("traceroad");
traceroadcheckbox.onclick=function(e)
{
if(traceroadcheckbox.checked)
{
  alert("clicked");
  map.un('singleclick', generatePopup);
  measurement_tool.style.backgroundColor = "#ff0000";
  addInteractionTrace();
  map.removeInteraction(select);

}
if(!traceroadcheckbox.checked)
{
  alert("unclicked");
  map.on('singleclick', generatePopup);
  measurement_tool.style.backgroundColor = "#ff0000";
  map.removeInteraction(drawInteraction);
  map.removeInteraction(snapInteraction);
  drawVector.getSource().clear();
  map.addInteraction(select);


}


}

//tracing tool logic end

*/


const map = new Map({
  controls: defaultControls().extend([control, new FullScreen()]),
  layers: layers,
    //,

  overlays: [overlay],
  target: 'map',
  view: new View({

    center: fromLonLat([91.89105878434684,25.574624662780753]),
    zoom: zoom,
    constrainRotation: rotation,
  }),
});


map.on('click', (event) => {
  map.forEachFeatureAtPixel(
    event.pixel,
    (feature, layer) => {
      console.log('Feature clicked on layer:', layer);
      console.log('Feature:', feature);
    },
    {
      hitTolerance: 20
    }
  );
});



// Interaction handling
map.on('movestart', () => { 
  isInteracting = true; 
  // Reduce animation quality during interaction
  animationConfig.animationFPS = 12;
});

map.on('moveend', () => { 
  isInteracting = false;
  // Restore normal animation quality
  animationConfig.animationFPS = 24;
});

// Animation lifecycle management
const manageAnimation = () => {
  if (calamity_layer.getVisible() && !animationFrameId) {
    animationFrameId = requestAnimationFrame(animate);
  } else if (!calamity_layer.getVisible() && animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

calamity_layer.on('change:visible', manageAnimation);
calamity_layer.on('unrender', () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
});

// Start animation if layer is initially visible
if (calamity_layer.getVisible()) {
  animationFrameId = requestAnimationFrame(animate);
}



const updateLegend = function (source, id, header) {
  const graphicUrl = source;
  //const img = document.getElementById('legend');

  //alert("hello");

  var rootelem=document.createElement("ul");
      rootelem.setAttribute("id", id+"_root");
      rootelem.setAttribute("class", "list-group list-group-flush");

  var parentelem=document.createElement("li");
      parentelem.setAttribute("id", id+"_list");
      parentelem.setAttribute("class", "list-group-item");

  var childelem = document.createElement("img");
      childelem.setAttribute("id", id+"_image");

  var headingelem=document.createElement("li");
      headingelem.setAttribute("id", id+"_heading");
      headingelem.setAttribute("class", "list-group-item active");



  parentelem.appendChild(childelem);

  rootelem.appendChild(headingelem);
  rootelem.appendChild(parentelem);

  document.getElementById("legenddiv").appendChild(rootelem);

  document.getElementById(id+"_heading").innerHTML=header;

  //lengendiv.append(elem);

  const img = document.getElementById(id+'_image');


  img.src = graphicUrl;
  //console.log("tom:  "+graphicUrl);
};

const updateHeatmapLegend = function(id, header) {
  // Remove existing legend if it exists
  const existingLegend = document.getElementById(id+"_root");
  if (existingLegend) {
    existingLegend.remove();
  }

  // Create legend container (using your existing structure)
  var rootelem = document.createElement("ul");
  rootelem.setAttribute("id", id+"_root");
  rootelem.setAttribute("class", "list-group list-group-flush");

  var headingelem = document.createElement("li");
  headingelem.setAttribute("id", id+"_heading");
  headingelem.setAttribute("class", "list-group-item active");
  headingelem.innerHTML = header;
  headingelem.style.color = "white"; // Set header text color to black

  var parentelem = document.createElement("li");
  parentelem.setAttribute("id", id+"_list");
  parentelem.setAttribute("class", "list-group-item");
  parentelem.style.color = "black"; // Set parent text color to black

  // Create the heatmap legend content
  var legendContent = document.createElement("div");
  legendContent.style.display = "flex";
  legendContent.style.flexDirection = "column";
  legendContent.style.gap = "5px";
  legendContent.style.color = "black"; // Set default text color to black

  // Add gradient bar
  var gradientBar = document.createElement("div");
  gradientBar.style.height = "20px";
  gradientBar.style.width = "100%";
  gradientBar.style.background = "linear-gradient(to right, #00f, #0ff, #0f0, #ff0, #f00)";
  gradientBar.style.borderRadius = "3px";
  gradientBar.style.marginBottom = "5px";
  legendContent.appendChild(gradientBar);

  // Add labels
  var labelsContainer = document.createElement("div");
  labelsContainer.style.display = "flex";
  labelsContainer.style.justifyContent = "space-between";
  
  var minLabel = document.createElement("span");
  minLabel.textContent = "Low";
  minLabel.style.fontSize = "12px";
  minLabel.style.color = "black"; // Set label color to black
  
  var maxLabel = document.createElement("span");
  maxLabel.textContent = "High";
  maxLabel.style.fontSize = "12px";
  maxLabel.style.color = "black"; // Set label color to black
  
  labelsContainer.appendChild(minLabel);
  labelsContainer.appendChild(maxLabel);
  legendContent.appendChild(labelsContainer);

  // Add severity explanation
  var severityItems = [
    {color: "#00f", label: "Minor accidents (no fatalities)"},
    {color: "#0f0", label: "Medium severity"},
    {color: "#f00", label: "Fatal accidents"}
  ];

  severityItems.forEach(item => {
    var itemDiv = document.createElement("div");
    itemDiv.style.display = "flex";
    itemDiv.style.alignItems = "center";
    itemDiv.style.gap = "5px";
    
    var colorBox = document.createElement("div");
    colorBox.style.width = "15px";
    colorBox.style.height = "15px";
    colorBox.style.backgroundColor = item.color;
    colorBox.style.borderRadius = "3px";
    
    var label = document.createElement("span");
    label.textContent = item.label;
    label.style.fontSize = "12px";
    label.style.color = "black"; // Set severity label color to black
    
    itemDiv.appendChild(colorBox);
    itemDiv.appendChild(label);
    legendContent.appendChild(itemDiv);
  });

  parentelem.appendChild(legendContent);
  rootelem.appendChild(headingelem);
  rootelem.appendChild(parentelem);

  // Add to your legend container
  document.getElementById("legenddiv").appendChild(rootelem);
};

// Update the legend when the resolution changes
// map.getView().on('change:resolution', function (event) {
//   const resolution = event.target.getResolution();
//   updateLegend(resolution);
// });

const myHeaders = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "Sec-Fetch-Site": "cross-site",
});

const fetchConfig = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "no-cache"
};

function getBridgeInfo(at,ai)
{


//fetch('http://localhost:9595/webgisresponse/WebgisResponse')

fetch("CommonController?mainkey=getimagelistforwebgis&at="+at+"&ai="+ai, {
    method: "POST",
    headers: {
      "Content-Type": "text/html"
    },
  })
    .then(function(response) {
        // When the page is loaded convert it to text
        //asset_image_list.innerHTML="loading...";
        return response.text()
    })
    .then(function(html) {
      //asset_image_list.innerHTML=html;

      doctable.innerHTML=html;
        // Initialize the DOM parser
        var parser = new DOMParser();

        // Parse the text
        var doc = parser.parseFromString(html, "text/html");


        //console.log(doc);
        //asset_image_list.innerHTML=doc;
    })
    .catch(function(err) {
        //console.log('Failed to fetch page: ', err);
    });




}

function generatePopup(e) {


  doctable.style.display="none";
  const coordinate = e.coordinate;
  //alert(coordinate);
  overlay.setPosition(undefined);
  overlay.setPosition(coordinate);
  content.innerHTML = '<p class="border" style=color:white;font-weight:bold;>No data selected</p>';



}


//right click event
  map.getViewport().addEventListener('contextmenu', function (evt) {
  evt.preventDefault();
  const latlontext=toLonLat(map.getEventCoordinate(evt));
 // console.log(latlontext[0]+" ----- "+latlontext[1]);
  document.getElementById('chainage_panel').style.visibility='visible';
  calculateChainage(latlontext[0],latlontext[1]);
  document.getElementById('cal_chain').innerHTML="";

  })

// register popup event.......
map.on('singleclick', generatePopup);

//un register event
//map.un('singleclick',generatePopup);

//add event to measurment tool

//add event to checkbox
sh.onclick = function (e) {
  shView();
}


cl_rainfall.onclick = function (e) {
  climateRainfallView();
}


vulner_observation.onclick = function (e) {
  climateVulnerabilityView();
}


//add event to checkbox
checkbox_mdr.onclick = function (e) {
 mdrView();
}

//add event to checkbox
checkbox_odr.onclick = function (e) {
  odrView();
}

//NH Layer
nh.onclick=function (e) {
  nhView();
}

///LR Layer
lr.onclick = function (e) {
  lrView();
}

ri.onclick = function (e) {
  riView();
}

projectw.onclick = function (e) {
  projectView();
}

ur.onclick = function(e){
  urView();
}

//add event to checkbox
roug.onclick = function (e) {
  roughnessView();
}

bridge.onclick = function (e) {
  bridgeView();
}

roadaccident.onclick = function (e) {
  roadAccidentView();
}

traffic_station.onclick = function(e){
  trafficstationView();
}

bridgerating.onclick = function(e){
  brdgratingView();
}

culvert.onclick = function (e) {
  culvertView();
}

row.onclick = function (e) {
  rowView();
}

trfcdistr.onclick= function (e) {
  trafficdistrbtnView();
}

workhistory.onclick= function (e) {
  workhistoryView();
}

//add event to view growth center layer
viewgrowthpoint.onclick= function (e) {
  growthpointView();
}

//add event to view slope layer
viewslope.onclick= function (e) {
  slopeView();
}

boxslab.onclick= function (e) {
  boxslabView();
}

disaster.onclick = function (e) {
  calamityView();
}

ncisapproval.onclick = function (e) {
  calamityStatusView();
}

amenities.onclick = function (e) {
  amenitiesView();
}

accidentheat.onclick = function (e){
  accidentHeatMap();
}

blackspotaccident.onclick =  function (e){
  blackSpotView();
}

gridaccident.onclick = function (e){
  gridAccident();
}

let uploadedLayer = null; // store uploaded vector layer

uploadBtn.onclick = function (e){
  //alert("uplaoding");
  document.getElementById('fileInput').click();
}

removeBtn.onclick = function (e){
  // Remove button click
    map.on('singleclick', generatePopup);
    if (uploadedLayer) {
      map.removeLayer(uploadedLayer);
      uploadedLayer = null;
    }
}


// File selection handler
document.getElementById('fileInput').addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;

  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.kml') || fileName.endsWith('.geojson') || fileName.endsWith('.json') || fileName.endsWith('.gpx')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      let format;
      if (fileName.endsWith('.kml')) format = new KML();
      else if (fileName.endsWith('.geojson') || fileName.endsWith('.json')) format = new GeoJSON();
      else if (fileName.endsWith('.gpx')) format = new GPX();

      const features = format.readFeatures(e.target.result, {
        featureProjection: map.getView().getProjection()
      });
      addVectorLayer(features);
    };
    reader.readAsText(file);

  } else if (fileName.endsWith('.zip')) {
    // ZIP could be Shapefile or KMZ
    JSZip.loadAsync(file).then(zip => {
      // Check if it's KMZ
      const kmlFile = Object.keys(zip.files).find(name => name.toLowerCase().endsWith('.kml'));
      if (kmlFile) {
        zip.files[kmlFile].async('string').then(kmlText => {
          const features = new KML().readFeatures(kmlText, {
            featureProjection: map.getView().getProjection()
          });
          addVectorLayer(features);
        });
      } else {
        // Assume Shapefile ZIP
        shp(file).then(geojson => {
          const features = new GeoJSON().readFeatures(geojson, {
            featureProjection: map.getView().getProjection()
          });
          addVectorLayer(features);
        });
      }
    });

  } else if (fileName.endsWith('.kmz')) {
    JSZip.loadAsync(file).then(zip => {
      const kmlFile = Object.keys(zip.files).find(name => name.toLowerCase().endsWith('.kml'));
      if (!kmlFile) return alert('Invalid KMZ file');
      zip.files[kmlFile].async('string').then(kmlText => {
        const features = new KML().readFeatures(kmlText, {
          featureProjection: map.getView().getProjection()
        });
        addVectorLayer(features);
      });
    });
  } else {
    alert('Unsupported file format');
  }

  // reset file input
  this.value = '';
});


// Add vector layer to map
function addVectorLayer(features) {
  if (uploadedLayer) {
    map.removeLayer(uploadedLayer);
  }

  uploadedLayer = new VectorLayer({
    source: new VectorSource({ features }),
    style: new Style({
      stroke: new Stroke({ color: 'blue', width: 2 }),
      fill: new Fill({ color: 'rgba(0,0,255,0.1)' }),
      image: new CircleStyle({ radius: 5, fill: new Fill({color: 'red'}) })
    })
  });

  map.addLayer(uploadedLayer);
  map.getView().fit(uploadedLayer.getSource().getExtent(), { padding: [20,20,20,20] });
  document.getElementById('removeBtn').disabled = false;
  //addFeatureClickHandler();
}


// // Handle feature click
// function addFeatureClickHandler() {
//   map.un('singleclick', generatePopup);
//   const select = new Select(
//     {
//       layers: [uploadedLayer]
//     }
//   );
//   map.addInteraction(select);

//   select.on('select', function (e) {
//     const feature = e.selected[0];
//     if (feature) {
//       showFeatureInfo(feature.getProperties());
//     } else {
//       document.getElementById('featureInfo').style.display = 'none';
//     }
//   });
// }

// // Show popup info
// function showFeatureInfo(props) {
//   let html = '<b>Feature Info:</b><br/><table style="border-collapse: collapse; width: 100%;">';
//   for (let key in props) {
//     if (key !== 'geometry') {
//       html += `<tr><td style="border-bottom: 1px solid #ddd;"><b>${key}</b></td>
//                    <td style="border-bottom: 1px solid #ddd;">${props[key]}</td></tr>`;
//     }
//   }
//   html += '</table>';
//   const infoDiv = document.getElementById('featureInfo');
//   infoDiv.innerHTML = html;
//   infoDiv.style.display = 'block';
// }

// project_status.onclick = function (e) {
//   workstatusView();
// }


division_new.onchange=function(e) {
  bridgeView();
  roadAccidentView();
  riView();
  projectView();
  brdgratingView();
  culvertView();
  workhistoryView();
  trafficstationView();
  trafficdistrbtnView();
  rowView();
  lrView();
  nhView();
  odrView();
  mdrView();
  shView();
  climateRainfallView();
  climateVulnerabilityView();
  growthpointView();
  slopeView();
  urView();
  roughnessView();
  boxslabView();
  calamityView();
  calamityStatusView();
  amenitiesView();
  //blackSpotView();
}


calfilter.onchange = function(e){
  //alert(period+"@@@@"+dateRange.start+"@@@@"+dateRange.end);

  // Only set to true if currently false
  if (!disasterCheckbox.checked) {
    disasterCheckbox.checked = true;
    disasterCheckbox.dispatchEvent(new Event('change'));
  }
  calamityView();

}


///////////////////////////Global Loader/////////////////////////////////////
// === GLOBAL LOADING INDICATOR (relative to WebGIS container) ===
const mapContainer = document.getElementById("map"); // 👈 change ID if different
const loadingDiv = document.createElement("div");
loadingDiv.id = "map_loading";
loadingDiv.textContent = "Loading...";

Object.assign(loadingDiv.style, {
  position: "absolute", // 👈 absolute inside the map container
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0,0,0,0.7)",
  color: "white",
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  display: "none",
  zIndex: "9999",
});

mapContainer.style.position = "relative"; // ensure container allows absolute positioning
mapContainer.appendChild(loadingDiv);


let activeLoadCount = 0;
function showLoading() {
  if (++activeLoadCount === 1) {
    loadingDiv.style.display = "block";
  }
}
function hideLoading() {
  activeLoadCount = Math.max(0, activeLoadCount - 1);
  if (activeLoadCount === 0) {
    loadingDiv.style.display = "none";
  }
}

// Keep track of which sources already had their first load handled
const loadedSources = new WeakSet();

// === Helper function to attach loading events only once per layer ===
function attachLoadingEvents(source) {
  if (!source || !source.on) return;

  // Prevent re-attaching if already tracked
  if (source._hasLoadingEventsAttached) return;
  source._hasLoadingEventsAttached = true;

  let hasStarted = false;
  let hasCompletedFirstLoad = false;

  const onStart = () => {
    // Count load only once per source, even if multiple tiles fire
    if (!hasStarted && !hasCompletedFirstLoad) {
      hasStarted = true;
      showLoading();
    }
  };

  const onEnd = () => {
    // Wait for the first full load to finish
    if (hasStarted && !hasCompletedFirstLoad) {
      hasCompletedFirstLoad = true;
      hideLoading();

      // Cleanup so this layer won’t trigger future loads (zoom/pan)
      source.un("imageloadstart", onStart);
      source.un("imageloadend", onEnd);
      source.un("imageloaderror", onEnd);
      source.un("featuresloadstart", onStart);
      source.un("featuresloadend", onEnd);
      source.un("featuresloaderror", onEnd);
    }
  };

  source.on("imageloadstart", onStart);
  source.on("imageloadend", onEnd);
  source.on("imageloaderror", onEnd);
  source.on("featuresloadstart", onStart);
  source.on("featuresloadend", onEnd);
  source.on("featuresloaderror", onEnd);
}



/////////////////////////////////////////////////////////////////////////////




function urView(){

  if (!ur.checked) {
    ur_layer.setVisible(false);
    ur_layer_theme.setVisible(false);
    if(document.body.contains((document.getElementById("ur_root")))==false){

    }else{
      document.getElementById("ur_root").remove();
      document.getElementById("ur_image").style.display="none";
    }
  }

  if(document.getElementById('division_sel').value =="NA"){

    if (ur.checked) {

      if(document.body.contains((document.getElementById("ur_root")))==false){

      }else{
        document.getElementById("ur_root").remove();
        document.getElementById("ur_image").style.display="none";
      }
      document.getElementById("ur_image").style.display="block";

      if (vectorSource_ur.getUrl()) {
        vectorSource_ur.clear();
        vectorSource_ur.refresh();
      }

      vectorSource_ur.setUrl(domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aurban_road&maxFeatures=50000&outputFormat=application%2Fjson');
      attachLoadingEvents(vectorSource_ur);

      ur_layer_theme_source= new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:urban_road'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(ur_layer_theme_source);

      ur_layer_theme.setSource(ur_layer_theme_source);

      ur_layer.setVisible(true);
      ur_layer_theme.setVisible(true);
      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(ur_layer_theme.getSource().getLegendUrl(resolution), 'ur', 'Urban Road');

    }

  }else{

    if (ur.checked) {

      if(document.body.contains((document.getElementById("ur_root")))==false){

      }else{
        document.getElementById("ur_root").remove();
        document.getElementById("ur_image").style.display="none";
      }
      document.getElementById("ur_image").style.display="block";

      if (vectorSource_ur.getUrl()) {
        vectorSource_ur.clear();
        vectorSource_ur.refresh();
      }


      vectorSource_ur.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aurban_road&maxFeatures=50000&outputFormat=application%2Fjson'"+document.getElementById('division_sel').value+"'");
      attachLoadingEvents(vectorSource_ur);

      ur_layer_theme_source= new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:urban_road', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(ur_layer_theme_source);

      ur_layer_theme.setSource(ur_layer_theme_source);

      ur_layer.setVisible(true);
      ur_layer_theme.setVisible(true);
      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(ur_layer_theme.getSource().getLegendUrl(resolution), 'ur', 'Urban Road');

    }

  }

}

function shView(){

  if (!sh.checked) {
    sh_layer.setVisible(false);
    sh_layer_theme.setVisible(false);
    if(document.body.contains((document.getElementById("sh_root")))==false){

    }else{
      document.getElementById("sh_root").remove();
      document.getElementById("sh_image").style.display="none";
    }
  }

  if(document.getElementById('division_sel').value =="NA"){

    if (sh.checked) {

      if(document.body.contains((document.getElementById("sh_root")))==false){

      }else{
        document.getElementById("sh_root").remove();
        document.getElementById("sh_image").style.display="none";
      }
      document.getElementById("sh_image").style.display="block";

      if (vectorSource_sh.getUrl()) {
        vectorSource_sh.clear();
        vectorSource_sh.refresh();
      }

      vectorSource_sh.setUrl(domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Astate_highway&maxFeatures=50000&outputFormat=application%2Fjson');
      attachLoadingEvents(vectorSource_sh);

      sh_layer_theme_source= new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:state_highway'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(sh_layer_theme_source);

      sh_layer_theme.setSource(sh_layer_theme_source);

      sh_layer.setVisible(true);
      sh_layer_theme.setVisible(true);
      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(sh_layer_theme.getSource().getLegendUrl(resolution), 'sh', 'State Highway');

    }

  }else{

    if (sh.checked) {

      if(document.body.contains((document.getElementById("sh_root")))==false){

      }else{
        document.getElementById("sh_root").remove();
        document.getElementById("sh_image").style.display="none";
      }
      document.getElementById("sh_image").style.display="block";

      if (vectorSource_sh.getUrl()) {
        vectorSource_sh.clear();
        vectorSource_sh.refresh();
      }

      vectorSource_sh.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Astate_highway&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=jrdcn_short_code='"+document.getElementById('division_sel').value+"'");
      attachLoadingEvents(vectorSource_sh);

      sh_layer_theme_source= new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:state_highway', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(sh_layer_theme_source);

      sh_layer_theme.setSource(sh_layer_theme_source);

      sh_layer.setVisible(true);
      sh_layer_theme.setVisible(true);
      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(sh_layer_theme.getSource().getLegendUrl(resolution), 'sh', 'State Highway');

    }

  }

}





function climateRainfallView(){

  if (!cl_rainfall.checked) {
    climate_rainfall_layer.setVisible(false);
    climate_rianfall_layer_theme.setVisible(false);
    
    if(document.body.contains((document.getElementById("cl_rainfall_root")))==false){

    }else{
      document.getElementById("cl_rainfall_root").remove();
      document.getElementById("cl_rainfall_image").style.display="none";
    }
  }

 

    if (cl_rainfall.checked) {

      if(document.body.contains((document.getElementById("cl_rainfall_root")))==false){

      }else{
        document.getElementById("cl_rainfall_root").remove();
        document.getElementById("cl_rainfall_image").style.display="none";
      }
      document.getElementById("cl_rainfall_image").style.display="block";

      if (vectorSource_climate_rainfall.getUrl()) {
        vectorSource_climate_rainfall.clear();
        vectorSource_climate_rainfall.refresh();
      }

      vectorSource_climate_rainfall.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aclimate_average_rainfall&maxFeatures=50000&outputFormat=application%2Fjson");
      //attachLoadingEvents(vectorSource_climate_rainfall);

      climate_rainfall_layer_theme_source= new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:climate_average_rainfall'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      climate_rianfall_layer_theme.setSource(climate_rainfall_layer_theme_source);

      climate_rainfall_layer.setVisible(true);
      climate_rianfall_layer_theme.setVisible(true);
      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(climate_rianfall_layer_theme.getSource().getLegendUrl(resolution), 'cl_rainfall', 'Average Rainfall');

    }

}





function climateVulnerabilityView(){

  if (!vulner_observation.checked) {
    climate_vulnerability_layer.setVisible(false);
    climate_vulnerability_layer_theme.setVisible(false);
    if(document.body.contains((document.getElementById("vulner_root")))==false){

    }else{
      document.getElementById("vulner_root").remove();
      document.getElementById("vulner_image").style.display="none";
    }
  }

    if (vulner_observation.checked) {

      if(document.body.contains((document.getElementById("vulner_root")))==false){

      }else{
        document.getElementById("vulner_root").remove();
        document.getElementById("vulner_image").style.display="none";
      }
      document.getElementById("vulner_image").style.display="block";

      if (vectorSource_vlunerability_observation.getUrl()) {
        vectorSource_vlunerability_observation.clear();
        vectorSource_vlunerability_observation.refresh();
      }

      vectorSource_vlunerability_observation.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aclimate_vulnerability_obseravtion&maxFeatures=50000&outputFormat=application%2Fjson");
      //attachLoadingEvents(vectorSource_vlunerability_observationy);

      climate_vulnerability_layer_theme_source= new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:climate_vulnerability_obseravtion'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      //attachLoadingEvents(sh_layer_theme_source);

      climate_vulnerability_layer_theme.setSource(climate_vulnerability_layer_theme_source);

      climate_vulnerability_layer.setVisible(true);
      climate_vulnerability_layer_theme.setVisible(true);
      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(climate_vulnerability_layer_theme.getSource().getLegendUrl(resolution), 'vulner', 'Vulnerability Observation');

    }


}


function mdrView(){

  if (!checkbox_mdr.checked) {
    mdr_layer.setVisible(false);
    mdr_layer_theme.setVisible(false);
    if(document.body.contains((document.getElementById("mdr_root")))==false){

    }else{
      document.getElementById("mdr_root").remove();
      document.getElementById("mdr_image").style.display="none";
    }

  }

  if(document.getElementById('division_sel').value =="NA"){

    if (checkbox_mdr.checked) {

      if(document.body.contains((document.getElementById("mdr_root")))==false){

      }else{
        document.getElementById("mdr_root").remove();
        document.getElementById("mdr_image").style.display="none";
      }
      document.getElementById("mdr_image").style.display="block";

      if (vectorSource_mdr.getUrl()) {
        vectorSource_mdr.clear();
        vectorSource_mdr.refresh();
      }

      vectorSource_mdr.setUrl(domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Amajor_district_road&maxFeatures=50000&outputFormat=application%2Fjson');
      attachLoadingEvents(vectorSource_mdr);

      mdr_layer_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:major_district_road'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(mdr_layer_theme_source);

      mdr_layer_theme.setSource(mdr_layer_theme_source);

      mdr_layer.setVisible(true);
      mdr_layer_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(mdr_layer_theme.getSource().getLegendUrl(resolution), 'mdr', 'Major District Road');

    }

  }else{

    if (checkbox_mdr.checked) {

      if(document.body.contains((document.getElementById("mdr_root")))==false){

      }else{
        document.getElementById("mdr_root").remove();
        document.getElementById("mdr_image").style.display="none";
      }
      document.getElementById("mdr_image").style.display="block";

      if (vectorSource_mdr.getUrl()) {
        vectorSource_mdr.clear();
        vectorSource_mdr.refresh();
      }

      vectorSource_mdr.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Amajor_district_road&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=jrdcn_short_code='"+document.getElementById('division_sel').value+"'");
      attachLoadingEvents(vectorSource_mdr);

      mdr_layer_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:major_district_road', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(mdr_layer_theme_source);

      mdr_layer_theme.setSource(mdr_layer_theme_source);

      mdr_layer.setVisible(true);
      mdr_layer_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(mdr_layer_theme.getSource().getLegendUrl(resolution), 'mdr', 'Major District Road');

    }

  }

}


function odrView(){

  if (!checkbox_odr.checked) {
    odr_layer.setVisible(false);
    odr_layer_theme.setVisible(false);
    if(document.body.contains((document.getElementById("odr_root")))==false){

    }else{
      document.getElementById("odr_root").remove();
      document.getElementById("odr_image").style.display="none";
    }

  }

  if(document.getElementById('division_sel').value =="NA"){

    if (checkbox_odr.checked) {

      if(document.body.contains((document.getElementById("odr_root")))==false){

      }else{
        document.getElementById("odr_root").remove();
        document.getElementById("odr_image").style.display="none";
      }
      document.getElementById("odr_image").style.display="block";

      if (vectorSource_odr.getUrl()) {
        vectorSource_odr.clear();
        vectorSource_odr.refresh();
      }

      vectorSource_odr.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aother_district_road&maxFeatures=50000&outputFormat=application%2Fjson");
      attachLoadingEvents(vectorSource_odr);

      odr_layer_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: {  "LAYERS": 'megrams:other_district_road'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(odr_layer_theme_source);

      odr_layer_theme.setSource(odr_layer_theme_source);

      odr_layer.setVisible(true);
      odr_layer_theme.setVisible(true);



      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(odr_layer_theme.getSource().getLegendUrl(resolution), 'odr', 'Other District Road');

    }

  }else{

    if (checkbox_odr.checked) {

      if(document.body.contains((document.getElementById("odr_root")))==false){

      }else{
        document.getElementById("odr_root").remove();
        document.getElementById("odr_image").style.display="none";
      }
      document.getElementById("odr_image").style.display="block";

      if (vectorSource_odr.getUrl()) {
        vectorSource_odr.clear();
        vectorSource_odr.refresh();
      }

      vectorSource_odr.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Aother_district_road&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=jrdcn_short_code='"+document.getElementById('division_sel').value+"'");
      attachLoadingEvents(vectorSource_odr);

      odr_layer_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: {  "LAYERS": 'megrams:other_district_road', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(odr_layer_theme_source);

      odr_layer_theme.setSource(odr_layer_theme_source);

      odr_layer.setVisible(true);
      odr_layer_theme.setVisible(true);


      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(odr_layer_theme.getSource().getLegendUrl(resolution), 'odr', 'Other District Road');

    }

  }

}

function nhView(){

  if (!nh.checked) {
      nh_layer.setVisible(false);
      nh_layer_theme.setVisible(false);

      if(document.body.contains((document.getElementById("nh_root")))==false){

      }else{
        document.getElementById("nh_root").remove();
        document.getElementById("nh_image").style.display="none";
      }

  }

  if(document.getElementById('division_sel').value =="NA"){

    if (nh.checked) {

      if(document.body.contains((document.getElementById("nh_root")))==false){

      }else{
        document.getElementById("nh_root").remove();
        document.getElementById("nh_image").style.display="none";
      }
      document.getElementById("nh_image").style.display="block";

      if (vectorSource_nh.getUrl()) {
        vectorSource_nh.clear();
        vectorSource_nh.refresh();
      }

      vectorSource_nh.setUrl(domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Ajrdcn_with_road_gis_new&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=lkp_road_category in (\'NH\')');
      attachLoadingEvents(vectorSource_nh);

      nh_layer_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:national_highway'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(nh_layer_theme_source);

      nh_layer_theme.setSource(nh_layer_theme_source);

      nh_layer.setVisible(true);
      nh_layer_theme.setVisible(true);


      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(nh_layer_theme.getSource().getLegendUrl(resolution), 'nh', 'National Highway');


    }

  }else{

    if (nh.checked) {

      if(document.body.contains((document.getElementById("nh_root")))==false){

      }else{
        document.getElementById("nh_root").remove();
        document.getElementById("nh_image").style.display="none";
      }
      document.getElementById("nh_image").style.display="block";

      if (vectorSource_nh.getUrl()) {
        vectorSource_nh.clear();
        vectorSource_nh.refresh();
      }

      vectorSource_nh.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Ajrdcn_with_road_gis_new&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=lkp_road_category in (\'NH\') and jrdcn_short_code='"+document.getElementById('division_sel').value+"'");
      attachLoadingEvents(vectorSource_nh);

      nh_layer_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:national_highway', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(nh_layer_theme_source);

      nh_layer_theme.setSource(nh_layer_theme_source);

      nh_layer.setVisible(true);
      nh_layer_theme.setVisible(true);


      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(nh_layer_theme.getSource().getLegendUrl(resolution), 'nh', 'National Highway');

    }

  }

}

function lrView(){

  if (!lr.checked) {

    lr_layer.setVisible(false);
    lr_layer_theme.setVisible(false);
    if(document.body.contains((document.getElementById("lr_root")))==false){

    }else{
      document.getElementById("lr_root").remove();
      document.getElementById("lr_image").style.display="none";
    }

  }

  if(document.getElementById('division_sel').value =="NA"){

    if (lr.checked) {

      if(document.body.contains((document.getElementById("lr_root")))==false){

      }else{
        document.getElementById("lr_root").remove();
        document.getElementById("lr_image").style.display="none";
      }
      document.getElementById("lr_image").style.display="block";

      if (vectorSource_lr.getUrl()) {
        vectorSource_lr.clear();
        vectorSource_lr.refresh();
      }

      vectorSource_lr.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Ajrdcn_with_road_gis_new&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=lkp_road_category in (\'LR\',\'TR\',\'VR\',\'RR\')");
      attachLoadingEvents(vectorSource_lr);

      lr_layer_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:local_road'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(lr_layer_theme_source);

      lr_layer_theme.setSource(lr_layer_theme_source);

      lr_layer.setVisible(true);
      lr_layer_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(lr_layer_theme.getSource().getLegendUrl(resolution), 'lr', 'Local Road');

    }

  }else{

    if (lr.checked) {

      if(document.body.contains((document.getElementById("lr_root")))==false){

      }else{
        document.getElementById("lr_root").remove();
        document.getElementById("lr_image").style.display="none";
      }
      document.getElementById("lr_image").style.display="block";

      if (vectorSource_lr.getUrl()) {
        vectorSource_lr.clear();
        vectorSource_lr.refresh();
      }

      vectorSource_lr.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Ajrdcn_with_road_gis_new&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=lkp_road_category in (\'LR\',\'TR\',\'VR\',\'RR\') and jrdcn_short_code='"+document.getElementById('division_sel').value+"'");
      attachLoadingEvents(vectorSource_lr);

      lr_layer_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:local_road', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(vectorSource_lr);

      lr_layer_theme.setSource(lr_layer_theme_source);

      lr_layer.setVisible(true);
      lr_layer_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(lr_layer_theme.getSource().getLegendUrl(resolution), 'lr', 'Local Road');

    }

  }

}

function roughnessView(){

  if (!roug.checked == true){
    road_roughness.setVisible(false)
    if(document.body.contains((document.getElementById("roug_root")))==false){

    }else{
      document.getElementById("roug_root").remove();
      document.getElementById("roug_image").style.display="none";
    }
  }

  if(document.getElementById('division_sel').value =="NA"){

    if (roug.checked == true){

      if(document.body.contains((document.getElementById("roug_root")))==false){

      }else{
        document.getElementById("roug_root").remove();
        document.getElementById("roug_image").style.display="none";
      }
      document.getElementById("roug_image").style.display="block";

      road_roughness_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_road_roughness_dtl'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(road_roughness_source);

      road_roughness.setSource(road_roughness_source);

      road_roughness.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(road_roughness.getSource().getLegendUrl(resolution), 'roug', 'Roughness');

    }

  }else{

    if (roug.checked == true){

      if(document.body.contains((document.getElementById("roug_root")))==false){

      }else{
        document.getElementById("roug_root").remove();
        document.getElementById("roug_image").style.display="none";
      }
      document.getElementById("roug_image").style.display="block";

      road_roughness_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_road_roughness_dtl', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(road_roughness_source);

      road_roughness.setSource(road_roughness_source);

      road_roughness.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(road_roughness.getSource().getLegendUrl(resolution), 'roug', 'Roughness');

    }

  }

}

function rowView(){

  if(!row.checked){
    row_layer.setVisible(false);
    row_theme.setVisible(false);
    if(document.body.contains((document.getElementById("row_root")))==false){

    }else{
      document.getElementById("row_root").remove();
      document.getElementById("row_image").style.display="none";
    }
  }

  if(document.getElementById('division_sel').value =="NA"){

    if(row.checked){

      if(document.body.contains((document.getElementById("row_root")))==false){

      }else{
        document.getElementById("row_root").remove();
        document.getElementById("row_image").style.display="none";
      }
      document.getElementById("row_image").style.display="block";

      row_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_rwfis_inf', },
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(row_theme_source);

      row_theme.setSource(row_theme_source);

      row_layer.setVisible(true);
      row_layer.setOpacity(0);
      row_theme.setVisible(true);
      row_theme.setOpacity(1);
      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(row_theme.getSource().getLegendUrl(resolution), 'row', 'Right of Way');

    }

  }else{

    if(row.checked){

      if(document.body.contains((document.getElementById("row_root")))==false){

      }else{
        document.getElementById("row_root").remove();
        document.getElementById("row_image").style.display="none";
      }
      document.getElementById("row_image").style.display="block";

      row_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_rwfis_inf', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(row_theme_source);

      row_theme.setSource(row_theme_source);

      row_layer.setVisible(true);
      row_layer.setOpacity(0);
      row_theme.setVisible(true);
      row_theme.setOpacity(1);
      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(row_theme.getSource().getLegendUrl(resolution), 'row', 'Right of Way');

    }

  }

}

function trafficdistrbtnView(){

  if(!trfcdistr.checked) {
    traffic_distribution_layer.setVisible(false);
    traffic_distribution_theme.setVisible(false);

    if(document.body.contains((document.getElementById("trfcdistr_root")))==false){

    }else{
      document.getElementById("trfcdistr_root").remove();
      document.getElementById("trfcdistr_image").style.display="none";
    }

  }

  if(document.getElementById('division_sel').value =="NA"){

    if(trfcdistr.checked) {

      if(document.body.contains((document.getElementById("trfcdistr_root")))==false){

      }else{
        document.getElementById("trfcdistr_root").remove();
        document.getElementById("trfcdistr_image").style.display="none";
      }
      document.getElementById("trfcdistr_image").style.display="block";

      traffic_distribution_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_traffic_distribution', },
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(traffic_distribution_theme_source);

      traffic_distribution_theme.setSource(traffic_distribution_theme_source);

      traffic_distribution_layer.setVisible(true);
      traffic_distribution_layer.setOpacity(0.1);

      traffic_distribution_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(traffic_distribution_theme.getSource().getLegendUrl(resolution), 'trfcdistr', 'Traffic Distribution');

    }

  }else{

    if(trfcdistr.checked) {

      if(document.body.contains((document.getElementById("trfcdistr_root")))==false){

      }else{
        document.getElementById("trfcdistr_root").remove();
        document.getElementById("trfcdistr_image").style.display="none";
      }
      document.getElementById("trfcdistr_image").style.display="block";

      traffic_distribution_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_traffic_distribution', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(traffic_distribution_theme_source);

      traffic_distribution_theme.setSource(traffic_distribution_theme_source);

      traffic_distribution_layer.setVisible(true);
      traffic_distribution_layer.setOpacity(0.1);

      traffic_distribution_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(traffic_distribution_theme.getSource().getLegendUrl(resolution), 'trfcdistr', 'Traffic Distribution');

    }

  }

}

function trafficstationView(){

  if(!traffic_station.checked){
      traffic_station_layer.setVisible(false);
      traffic_station_theme.setVisible(false);

      if(document.body.contains((document.getElementById("traffic_station_root")))==false){

      }else{
        document.getElementById("traffic_station_root").remove();
        document.getElementById("traffic_station_image").style.display="none";
      }

  }

  if(document.getElementById('division_sel').value =="NA"){

    if(traffic_station.checked){

      if(document.body.contains((document.getElementById("traffic_station_root")))==false){

      }else{
        document.getElementById("traffic_station_root").remove();
        document.getElementById("traffic_station_image").style.display="none";
      }
      document.getElementById("traffic_station_image").style.display="block";

      traffic_station_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_tss_mst'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(traffic_station_theme_source);

      traffic_station_theme.setSource(traffic_station_theme_source);

      traffic_station_layer.setVisible(true);
      traffic_station_layer.setOpacity(0.1);
      traffic_station_theme.setVisible(true);
      //new
      //lengendiv.style.display ="block";
      const resolution= map.getView().getResolution();
      updateLegend(traffic_station_theme.getSource().getLegendUrl(resolution), 'traffic_station', 'Traffic Station');

    }

  }else{

    if(traffic_station.checked){

      if(document.body.contains((document.getElementById("traffic_station_root")))==false){

      }else{
        document.getElementById("traffic_station_root").remove();
        document.getElementById("traffic_station_image").style.display="none";
      }
      document.getElementById("traffic_station_image").style.display="block";


      traffic_station_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_tss_mst', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(traffic_station_theme_source);

      traffic_station_theme.setSource(traffic_station_theme_source);

      traffic_station_layer.setVisible(true);
      traffic_station_layer.setOpacity(0.1);
      traffic_station_theme.setVisible(true);
      //new
      //lengendiv.style.display ="block";
      const resolution= map.getView().getResolution();
      updateLegend(traffic_station_theme.getSource().getLegendUrl(resolution), 'traffic_station', 'Traffic Station');

    }

  }

}

function workhistoryView(){

  if(!workhistory.checked) {
      workhistory_layer.setVisible(false);
      workhistory_theme.setVisible(false);
      if(document.body.contains((document.getElementById("workhistory_root")))==false){

      }else{
        document.getElementById("workhistory_root").remove();
        document.getElementById("workhistory_image").style.display="none";
      }
  }

  if(document.getElementById('division_sel').value =="NA"){

    if(workhistory.checked) {

      if(document.body.contains((document.getElementById("workhistory_root")))==false){

      }else{
        document.getElementById("workhistory_root").remove();
        document.getElementById("workhistory_image").style.display="none";
      }
      document.getElementById("workhistory_image").style.display="block";

      workhistory_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_road_work_hist_inf', },
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(workhistory_theme_source);

      workhistory_theme.setSource(workhistory_theme_source);

      workhistory_layer.setVisible(true);
      workhistory_layer.setOpacity(0.1);

      workhistory_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(workhistory_theme.getSource().getLegendUrl(resolution), 'workhistory', 'Work History');

    }

  }else{

    if(workhistory.checked) {

      if(document.body.contains((document.getElementById("workhistory_root")))==false){

      }else{
        document.getElementById("workhistory_root").remove();
        document.getElementById("workhistory_image").style.display="none";
      }
      document.getElementById("workhistory_image").style.display="block";

      workhistory_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_road_work_hist_inf', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(workhistory_theme_source);

      workhistory_theme.setSource(workhistory_theme_source);

      workhistory_layer.setVisible(true);
      workhistory_layer.setOpacity(0.1);

      workhistory_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(workhistory_theme.getSource().getLegendUrl(resolution), 'workhistory', 'Work History');

    }

  }

}

function culvertView(){

  if (!culvert.checked){
      culvert_layer.setVisible(false);
  }

  if(document.getElementById('division_sel').value =="NA"){

    if (culvert.checked){

      if (vectorSource_culvert.getUrl()) {
        vectorSource_culvert.clear();
        vectorSource_culvert.refresh();
      }

      vectorSource_culvert.setUrl(domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_road_clvrt_inf&maxFeatures=50000&outputFormat=application%2Fjson');
      attachLoadingEvents(vectorSource_culvert);
      culvert_layer.setVisible(true);

    }

  }else{

    if (culvert.checked){

      if (vectorSource_culvert.getUrl()) {
        vectorSource_culvert.clear();
        vectorSource_culvert.refresh();
      }

      vectorSource_culvert.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_road_clvrt_inf&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=jrdcn_short_code='"+document.getElementById('division_sel').value+"'");
      attachLoadingEvents(vectorSource_culvert);
      culvert_layer.setVisible(true);

    }

  }

}

function brdgratingView(){

  if(!bridgerating.checked){
    bridge_rating_layer.setVisible(false);
    bridge_rating_theme.setVisible(false);

    if(document.body.contains((document.getElementById("brdgrating_root")))==false){

    }else{
      document.getElementById("brdgrating_root").remove();
      document.getElementById("brdgrating_image").style.display="none";
    }

  }

  if(document.getElementById('division_sel').value =="NA"){

    if(bridgerating.checked){

      if(document.body.contains((document.getElementById("brdgrating_root")))==false){

      }else{
        document.getElementById("brdgrating_root").remove();
        document.getElementById("brdgrating_image").style.display="none";
      }
      document.getElementById("brdgrating_image").style.display="block";

      bridge_rating_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: {"LAYERS": 'megrams:mv_bridge_rating'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(bridge_rating_theme_source);

      bridge_rating_theme.setSource(bridge_rating_theme_source);

      bridge_rating_layer.setVisible(true);
      bridge_rating_layer.setOpacity(0.1);
      bridge_rating_theme.setVisible(true);
      //new
      //lengendiv.style.display ="block";
      const resolution= map.getView().getResolution();
      updateLegend(bridge_rating_theme.getSource().getLegendUrl(resolution), 'brdgrating', 'Bridge Rating');

    }

  }else{

    if(bridgerating.checked){

      if(document.body.contains((document.getElementById("brdgrating_root")))==false){

      }else{
        document.getElementById("brdgrating_root").remove();
        document.getElementById("brdgrating_image").style.display="none";
      }
      document.getElementById("brdgrating_image").style.display="block";

      bridge_rating_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: {"LAYERS": 'megrams:mv_bridge_rating', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(bridge_rating_theme_source);

      bridge_rating_theme.setSource(bridge_rating_theme_source);

      bridge_rating_layer.setVisible(true);
      bridge_rating_layer.setOpacity(0.1);
      bridge_rating_theme.setVisible(true);
      //new
      //lengendiv.style.display ="block";
      const resolution= map.getView().getResolution();
      updateLegend(bridge_rating_theme.getSource().getLegendUrl(resolution), 'brdgrating', 'Bridge Rating');

    }

  }

}

function riView(){

  if (!ri.checked ) {
      road_inventory.setVisible(false);
      if(document.body.contains((document.getElementById("ri_root")))==false){

      }else{
        document.getElementById("ri_root").remove();
        document.getElementById("ri_image").style.display="none";
      }
  }

  if(document.getElementById('division_sel').value =="NA"){

    if (ri.checked){

      if(document.body.contains((document.getElementById("ri_root")))==false){

      }else{
        document.getElementById("ri_root").remove();
        document.getElementById("ri_image").style.display="none";
      }
      document.getElementById("ri_image").style.display="block";

      road_inv_theme_source = new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:v_road_inventory'},
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
      });
      attachLoadingEvents(road_inv_theme_source);

      road_inventory.setSource(road_inv_theme_source);


      road_inventory.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(road_inventory.getSource().getLegendUrl(resolution), 'ri', 'Road Inventory');

    }


  }else{

    if (ri.checked){


      if(document.body.contains((document.getElementById("ri_root")))==false){

      }else{
        document.getElementById("ri_root").remove();
        document.getElementById("ri_image").style.display="none";
      }
      document.getElementById("ri_image").style.display="block";

      road_inv_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_road_inventory', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
     });
     attachLoadingEvents(road_inv_theme_source);

     road_inventory.setSource(road_inv_theme_source);

      road_inventory.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(road_inventory.getSource().getLegendUrl(resolution), 'ri', 'Road Inventory');


    }

  }

}


function projectView(){

  if (!projectw.checked) {
    projectw_layer.setVisible(false);
    projectw_layer_theme.setVisible(false);
    if(document.body.contains((document.getElementById("projectw_root")))==false){

    }else{
      document.getElementById("projectw_root").remove();
      document.getElementById("projectw_image").style.display="none";
    }
  }

  if(document.getElementById('division_sel').value =="NA"){

    if (projectw.checked) {

      if(document.body.contains((document.getElementById("projectw_root")))==false){

      }else{
        document.getElementById("projectw_root").remove();
        document.getElementById("projectw_image").style.display="none";
      }
      document.getElementById("projectw_image").style.display="block";

      if (vectorSource_projectw.getUrl()) {
        vectorSource_projectw.clear();
        vectorSource_projectw.refresh();
      }

      vectorSource_projectw.setUrl(domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_wms_project_with_road&maxFeatures=50000&outputFormat=application%2Fjson');
      attachLoadingEvents(vectorSource_projectw);

      projectw_layer_theme_source= new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_wms_project_with_road'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(projectw_layer_theme_source);

      projectw_layer_theme.setSource(projectw_layer_theme_source);

      projectw_layer.setVisible(true);
      projectw_layer_theme.setVisible(true);
      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(projectw_layer_theme.getSource().getLegendUrl(resolution), 'projectw', 'Project Work');

    }

  }else{

    if (projectw.checked) {

      if(document.body.contains((document.getElementById("projectw_root")))==false){

      }else{
        document.getElementById("projectw_root").remove();
        document.getElementById("projectw_image").style.display="none";
      }
      document.getElementById("projectw_image").style.display="block";

      if (vectorSource_projectw.getUrl()) {
        vectorSource_projectw.clear();
        vectorSource_projectw.refresh();
      }

      vectorSource_projectw.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_wms_project_with_road&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=jrdcn_short_code='"+document.getElementById('division_sel').value+"'");
      attachLoadingEvents(vectorSource_projectw);

      projectw_layer_theme_source= new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_wms_project_with_road', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(projectw_layer_theme_source);
      projectw_layer_theme.setSource(projectw_layer_theme_source);

      projectw_layer.setVisible(true);
      projectw_layer_theme.setVisible(true);
      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(projectw_layer_theme.getSource().getLegendUrl(resolution), 'projectw', 'Project Work');

    }

  }

}










// function projectView(){

//   if (!projectw.checked ) {

//       project_work.setVisible(false);
//       if(document.body.contains((document.getElementById("projectw_root")))==false){

//       }else{
//         document.getElementById("projectw_root").remove();
//         document.getElementById("projectw_image").style.display="none";
//       }
//   }

//   if(document.getElementById('division_sel').value =="NA"){

//     if (projectw.checked){

//       if(document.body.contains((document.getElementById("projectw_root")))==false){

//       }else{
//         document.getElementById("projectw_root").remove();
//         document.getElementById("projectw_image").style.display="none";
//       }
//       document.getElementById("projectw_image").style.display="block";


//        if (vectorSource_projectwork.getUrl()) {
//         vectorSource_projectwork.clear();
//         vectorSource_projectwork.refresh();
//       }

//       vectorSource_projectwork.setUrl(domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_wms_project_with_road&maxFeatures=50000&outputFormat=application%2Fjson');
//       attachLoadingEvents(vectorSource_projectwork);



//       projectwork_theme_source = new ImageWMS({
//           url: domain_name+'wms',
//           params: { "LAYERS": 'megrams:v_wms_project_with_road'},
//           ratio: 1,
//           crossOrigin: 'anonymous',
//           serverType: 'geoserver',
//       });
//       attachLoadingEvents(projectwork_theme_source);

//       project_work.setSource(projectwork_theme_source);


//       project_work.setVisible(true);

//       //new
//       //lengendiv.style.display = "block";
//       const resolution = map.getView().getResolution();
//       updateLegend(project_work.getSource().getLegendUrl(resolution), 'projectw', 'Project Work');

//     }


//   }else{

//     if (projectw.checked){



//       if(document.body.contains((document.getElementById("projectw_root")))==false){

//       }else{
//         document.getElementById("projectw_root").remove();
//         document.getElementById("projectw_image").style.display="none";
//       }
//       document.getElementById("projectw_image").style.display="block";

//       projectwork_theme_source = new ImageWMS({
//         url: domain_name+'wms',
//         params: { "LAYERS": 'megrams:v_wms_project_with_road', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
//         ratio: 1,
//         crossOrigin: 'anonymous',
//         serverType: 'geoserver',
//      });
//      attachLoadingEvents(projectwork_theme_source);

//      project_work.setSource(projectwork_theme_source);
//      project_work.setVisible(true);

//       //new
//       //lengendiv.style.display = "block";
//       const resolution = map.getView().getResolution();
//       updateLegend(project_work.getSource().getLegendUrl(resolution), 'projectw', 'Project Work');


//     }

//   }

// }






function bridgeView(){

  if (!bridge.checked){
    bridge_layer.setVisible(false);
    bridge_cat_theme.setVisible(false);

    if(document.body.contains((document.getElementById("bridge_root")))==false){

    }else{
      document.getElementById("bridge_root").remove();
      document.getElementById("bridge_image").style.display="none";
    }

  }

  if(document.getElementById('division_sel').value =="NA"){

    if (bridge.checked){

        if(document.body.contains((document.getElementById("bridge_root")))==false){

        }else{
          document.getElementById("bridge_root").remove();
          document.getElementById("bridge_image").style.display="none";
        }
        document.getElementById("bridge_image").style.display="block";


        bridge_cat_theme_source=new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:v_bridge_mst'},
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        });
        attachLoadingEvents(bridge_cat_theme_source);

        bridge_layer.setVisible(true);
        bridge_layer.setOpacity(0.1);

        bridge_cat_theme.setSource(bridge_cat_theme_source);

        bridge_cat_theme.setVisible(true);
        //new
      //lengendiv.style.display = "block";
        const resolution = map.getView().getResolution();
        updateLegend(bridge_cat_theme.getSource().getLegendUrl(resolution), 'bridge', 'Bridge');

    }

  }else{

    if (bridge.checked){

      if(document.body.contains((document.getElementById("bridge_root")))==false){

      }else{
        document.getElementById("bridge_root").remove();
        document.getElementById("bridge_image").style.display="none";
      }
      document.getElementById("bridge_image").style.display="block";

      bridge_cat_theme_source=new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_bridge_mst', "CQL_FILTER":"jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(bridge_cat_theme_source);

        bridge_layer.setVisible(true);
        bridge_layer.setOpacity(0.1);

        bridge_cat_theme.setSource(bridge_cat_theme_source);

        bridge_cat_theme.setVisible(true);
        //new
      //lengendiv.style.display = "block";
        const resolution = map.getView().getResolution();
        updateLegend(bridge_cat_theme.getSource().getLegendUrl(resolution), 'bridge', 'Bridge');

    }

  }

}



function roadAccidentView(){
  if (!roadaccident.checked){
    
    roadaccident_layer.setVisible(false);
    roadaccident_theme.setVisible(false);

    if(document.body.contains((document.getElementById("roadaccident_root")))==false){

    }else{
      document.getElementById("roadaccident_root").remove();
      document.getElementById("roadaccident_image").style.display="none";
    }

  }

  if(document.getElementById('division_sel').value =="NA"){

    if (roadaccident.checked){

        if(document.body.contains((document.getElementById("roadaccident_root")))==false){
        }else{
          document.getElementById("roadaccident_root").remove();
          document.getElementById("roadaccident_image").style.display="none";
        }
        document.getElementById("roadaccident_image").style.display="block";


        roadaccident_theme_source=new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:road_accident'},
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        });
        attachLoadingEvents(roadaccident_theme_source);

        roadaccident_layer.setVisible(true);
        roadaccident_layer.setOpacity(0.1);

        roadaccident_theme.setSource(roadaccident_theme_source);

        roadaccident_theme.setVisible(true);
        //new
      //lengendiv.style.display = "block";
        const resolution = map.getView().getResolution();
        updateLegend(roadaccident_theme.getSource().getLegendUrl(resolution), 'roadaccident', 'Road Accident');

    }

  }else{

    if (roadaccident.checked){

      if(document.body.contains((document.getElementById("roadaccident_root")))==false){

      }else{
        document.getElementById("roadaccident_root").remove();
        document.getElementById("roadaccident_image").style.display="none";
      }
      document.getElementById("roadaccident_image").style.display="block";

      roadaccident_theme_source=new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:road_accident', "CQL_FILTER":"jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(roadaccident_theme_source);

        roadaccident_layer.setVisible(true);
        roadaccident_layer.setOpacity(0.1);

        roadaccident_theme.setSource(roadaccident_theme_source);

        roadaccident_theme.setVisible(true);
        //new
      //lengendiv.style.display = "block";
        const resolution = map.getView().getResolution();
        updateLegend(roadaccident_theme.getSource().getLegendUrl(resolution), 'roadaccident', 'Road Accident');

    }

  }

}





function boxslabView(){


  if (!boxslab.checked) {
    box_culvert_layer.setVisible(false);
    box_culvert_theme.setVisible(false);

    if(document.body.contains((document.getElementById("box_root")))==false){

    }else{
      document.getElementById("box_root").remove();
      document.getElementById("boxslab_image").style.display="none";
    }
  }

  if(document.getElementById('division_sel').value == "NA"){

    if  (boxslab.checked)  {

      if(document.body.contains((document.getElementById("box_root")))==false){

      }else{
        document.getElementById("box_root").remove();
        document.getElementById("boxslab_image").style.display="none";
      }
      document.getElementById("boxslab_image").style.display="block";

      box_culvert_theme_source= new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:v_box_culvert'},
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
      });
      attachLoadingEvents(box_culvert_theme_source);

      box_culvert_layer.setVisible(true);
      box_culvert_layer.setOpacity(0.1);

      box_culvert_theme.setSource(box_culvert_theme_source);
      box_culvert_theme.setVisible(true);

      //lengendiv.style.display = "block";

      const resolution = map.getView().getResolution();
      updateLegend(box_culvert_theme.getSource().getLegendUrl(resolution), 'box', 'Box/Slab Culvert');

    }

  }else{

    if(boxslab.checked) {

        if(document.body.contains((document.getElementById("box_root")))==false){

        }else{
          document.getElementById("box_root").remove();
          document.getElementById("boxslab_image").style.display="none";
        }
        document.getElementById("boxslab_image").style.display="block";

        box_culvert_theme_source= new ImageWMS({
          url: domain_name+ 'wms' ,
          params: { "LAYERS": 'megrams:v_box_culvert', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        });
        attachLoadingEvents(box_culvert_theme_source);

        box_culvert_layer.setVisible(true);
        box_culvert_layer.setOpacity(0.1);

        box_culvert_theme.setSource(box_culvert_theme_source);

        box_culvert_theme.setVisible(true);

        const resolution = map.getView().getResolution();
        updateLegend(box_culvert_theme.getSource().getLegendUrl(resolution), 'box', 'Box/Slab Culvert');
    }
  }

}


function slopeView(){

  if(!viewslope.checked) {
    viewslope_layer.setVisible(false);
    viewslope_theme.setVisible(false);
    if(document.body.contains((document.getElementById("slope_root")))==false){

    }else{
      document.getElementById("slope_root").remove();
      document.getElementById("slope_image").style.display="none";
    }
  }

  if(document.getElementById('division_sel').value =="NA"){

    if(viewslope.checked) {

      if(document.body.contains((document.getElementById("slope_root")))==false){

      }else{
        document.getElementById("slope_root").remove();
        document.getElementById("slope_image").style.display="none";
      }
      document.getElementById("slope_image").style.display="block";

      viewslope_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_road_slop_dtl', },
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(viewslope_theme_source);

      viewslope_theme.setSource(viewslope_theme_source);

      viewslope_theme.setVisible(true);
      viewslope_layer.setOpacity(0.1);

      viewslope_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(viewslope_theme.getSource().getLegendUrl(resolution), 'slope', 'Slope');


    }

  }else{

    if(viewslope.checked) {

      if(document.body.contains((document.getElementById("slope_root")))==false){

      }else{
        document.getElementById("slope_root").remove();
        document.getElementById("slope_image").style.display="none";
      }
      document.getElementById("slope_image").style.display="block";

      viewslope_theme_source = new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_road_slop_dtl', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(viewslope_theme_source);

      viewslope_theme.setSource(viewslope_theme_source);

      viewslope_theme.setVisible(true);
      viewslope_layer.setOpacity(0.1);

      viewslope_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(viewslope_theme.getSource().getLegendUrl(resolution), 'slope', 'Slope');

    }

  }

}

function growthpointView(){

  if(!viewgrowthpoint.checked) {
    viewgrowthcenter_layer.setVisible(false);
    viewgrowthcenter_theme.setVisible(false);
    if(document.body.contains((document.getElementById("growthpoint_root")))==false){

    }else{
      document.getElementById("growthpoint_root").remove();
      document.getElementById("growthpoint_image").style.display="none";
    }
  }

  if(document.getElementById('division_sel').value =="NA"){

    if(viewgrowthpoint.checked) {

      if(document.body.contains((document.getElementById("growthpoint_root")))==false){

      }else{
        document.getElementById("growthpoint_root").remove();
        document.getElementById("growthpoint_image").style.display="none";
      }
      document.getElementById("growthpoint_image").style.display="block";

      viewgrowthcenter_theme_source =  new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_ecis_growth_center'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(viewgrowthcenter_theme_source);

      viewgrowthcenter_theme.setSource(viewgrowthcenter_theme_source);

      viewgrowthcenter_layer.setVisible(true);
      viewgrowthcenter_layer.setOpacity(0.1);

      viewgrowthcenter_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(viewgrowthcenter_theme.getSource().getLegendUrl(resolution), 'growthpoint', 'Growth Point');

    }

  }else{

    if(viewgrowthpoint.checked) {

      if(document.body.contains((document.getElementById("growthpoint_root")))==false){

      }else{
        document.getElementById("growthpoint_root").remove();
        document.getElementById("growthpoint_image").style.display="none";
      }
      document.getElementById("growthpoint_image").style.display="block";

      viewgrowthcenter_theme_source =  new ImageWMS({
        url: domain_name+'wms',
        params: { "LAYERS": 'megrams:v_ecis_growth_center'},
        ratio: 1,
        crossOrigin: 'anonymous',
        serverType: 'geoserver',
      });
      attachLoadingEvents(viewgrowthcenter_theme_source);

      viewgrowthcenter_theme.setSource(viewgrowthcenter_theme_source);

      viewgrowthcenter_layer.setVisible(true);
      viewgrowthcenter_layer.setOpacity(0.1);

      viewgrowthcenter_theme.setVisible(true);

      //new
      //lengendiv.style.display = "block";
      const resolution = map.getView().getResolution();
      updateLegend(viewgrowthcenter_theme.getSource().getLegendUrl(resolution), 'growthpoint', 'Growth Point');

    }

  }

}



function calamityView(){

  
  const period=document.getElementById('calamitySelect').value;

  const dateRange = getDateRange(period);

  //alert(dateRange.start+"@@"+dateRange.end);

  if (!disaster.checked){
      calamity_layer.setVisible(false);

      if(document.body.contains((document.getElementById("calamity_root")))==false){

      }else{
        document.getElementById("calamity_root").remove();
        document.getElementById("calamity_image").style.display="none";
      }
  }

  if(document.getElementById('division_sel').value =="NA" && period=="NA"){

    //alert("all na");

    if (disaster.checked){

      if(document.body.contains((document.getElementById("calamity_root")))==false){

      }else{
        document.getElementById("calamity_root").remove();
        document.getElementById("calamity_image").style.display="none";
      }
      document.getElementById("calamity_image").style.display="block";

      if (vectorSource_calamity.getUrl()) {
        vectorSource_calamity.clear();
        vectorSource_calamity.refresh();
      }

      vectorSource_calamity.setUrl(domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_calamity&maxFeatures=50000&outputFormat=application%2Fjson');
      attachLoadingEvents(vectorSource_calamity);

      calamity_layer.setVisible(true);
      const resolution = map.getView().getResolution();
      updateLegend(viewgrowcalamity_theme.getSource().getLegendUrl(resolution), 'calamity', 'Calamity');
    }

  }else if (document.getElementById('division_sel').value =="NA" && period!="NA"){
    //alert("division selected and period NA")
      if(period=="today" || period=="yesterday"){

        
        if (disaster.checked){

          if(document.body.contains((document.getElementById("calamity_root")))==false){

          }else{
            document.getElementById("calamity_root").remove();
            document.getElementById("calamity_image").style.display="none";
          }
          document.getElementById("calamity_image").style.display="block";

          if (vectorSource_calamity.getUrl()) {
            vectorSource_calamity.clear();
            vectorSource_calamity.refresh();
          }

          vectorSource_calamity.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_calamity&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=created_date='"+dateRange.start+"'");
          attachLoadingEvents(vectorSource_calamity);

          calamity_layer.setVisible(true);
          const resolution = map.getView().getResolution();
          updateLegend(viewgrowcalamity_theme.getSource().getLegendUrl(resolution), 'calamity', 'Calamity');
        }

      }else{

        if (disaster.checked){

          if(document.body.contains((document.getElementById("calamity_root")))==false){

          }else{
            document.getElementById("calamity_root").remove();
            document.getElementById("calamity_image").style.display="none";
          }
          document.getElementById("calamity_image").style.display="block";

          if (vectorSource_calamity.getUrl()) {
            vectorSource_calamity.clear();
            vectorSource_calamity.refresh();
          }

          vectorSource_calamity.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_calamity&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=created_date between '"+dateRange.start+"' and '"+dateRange.end+"'");
          attachLoadingEvents(vectorSource_calamity);

          calamity_layer.setVisible(true);
          const resolution = map.getView().getResolution();
          updateLegend(viewgrowcalamity_theme.getSource().getLegendUrl(resolution), 'calamity', 'Calamity');
        }

      }
  
  
  
  }else if(document.getElementById('division_sel').value!="NA" && period=="NA"){

    //alert("division selected and period  NA");

    if (disaster.checked){

      if(document.body.contains((document.getElementById("calamity_root")))==false){

      }else{
        document.getElementById("calamity_root").remove();
        document.getElementById("calamity_image").style.display="none";
      }
      document.getElementById("calamity_image").style.display="block";

      if (vectorSource_calamity.getUrl()) {
        vectorSource_calamity.clear();
        vectorSource_calamity.refresh();
      }

      vectorSource_calamity.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_calamity&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=jrdcn_short_code='"+document.getElementById('division_sel').value+"'");
      attachLoadingEvents(vectorSource_calamity);

      calamity_layer.setVisible(true);
      const resolution = map.getView().getResolution();
      updateLegend(viewgrowcalamity_theme.getSource().getLegendUrl(resolution), 'calamity', 'Calamity');
    }

  }
  else{
    //alert("both selected");
    // if (disaster.checked){

    //   if(document.body.contains((document.getElementById("calamity_root")))==false){

    //   }else{
    //     document.getElementById("calamity_root").remove();
    //     document.getElementById("calamity_image").style.display="none";
    //   }
    //   document.getElementById("calamity_image").style.display="block";

    //   if (vectorSource_calamity.getUrl()) {
    //     vectorSource_calamity.clear();
    //     vectorSource_calamity.refresh();
    //   }

    //   vectorSource_calamity.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_calamity&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=jrdcn_short_code='"+document.getElementById('division_sel').value+"' and ");

    //   calamity_layer.setVisible(true);
    //   const resolution = map.getView().getResolution();
    //   updateLegend(viewgrowcalamity_theme.getSource().getLegendUrl(resolution), 'calamity', 'Calamity');
    // }

  if (disaster.checked){
    if(period=="today" || period=="yesterday"){

        
        if (disaster.checked){

          if(document.body.contains((document.getElementById("calamity_root")))==false){

          }else{
            document.getElementById("calamity_root").remove();
            document.getElementById("calamity_image").style.display="none";
          }
          document.getElementById("calamity_image").style.display="block";

          if (vectorSource_calamity.getUrl()) {
            vectorSource_calamity.clear();
            vectorSource_calamity.refresh();
          }

          vectorSource_calamity.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_calamity&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=jrdcn_short_code='"+document.getElementById('division_sel').value+"' and created_date='"+dateRange.start+"'");
          attachLoadingEvents(vectorSource_calamity);

          calamity_layer.setVisible(true);
          const resolution = map.getView().getResolution();
          updateLegend(viewgrowcalamity_theme.getSource().getLegendUrl(resolution), 'calamity', 'Calamity');
        }

      }else{

        if (disaster.checked){

          if(document.body.contains((document.getElementById("calamity_root")))==false){

          }else{
            document.getElementById("calamity_root").remove();
            document.getElementById("calamity_image").style.display="none";
          }
          document.getElementById("calamity_image").style.display="block";

          if (vectorSource_calamity.getUrl()) {
            vectorSource_calamity.clear();
            vectorSource_calamity.refresh();
          }

          vectorSource_calamity.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_calamity&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=jrdcn_short_code='"+document.getElementById('division_sel').value+"' and created_date between '"+dateRange.start+"' and '"+dateRange.end+"'");
          attachLoadingEvents(vectorSource_calamity);

          calamity_layer.setVisible(true);
          const resolution = map.getView().getResolution();
          updateLegend(viewgrowcalamity_theme.getSource().getLegendUrl(resolution), 'calamity', 'Calamity');
        }

      }

    }


  }

}


function calamityStatusView(){
  if (!ncisapproval.checked){
      calamity_status_layer.setVisible(false);

      if(document.body.contains((document.getElementById("calamity_status_root")))==false){

      }else{
        document.getElementById("calamity_status_root").remove();
        document.getElementById("calamity_status_image").style.display="none";
      }
  }

  if(document.getElementById('division_sel').value =="NA"){

    if (ncisapproval.checked){

      if(document.body.contains((document.getElementById("calamity_status_root")))==false){

      }else{
        document.getElementById("calamity_status_root").remove();
        document.getElementById("calamity_status_image").style.display="none";
      }
      document.getElementById("calamity_status_image").style.display="block";

      if (vectorSource_calamity_status.getUrl()) {
        vectorSource_calamity_status.clear();
        vectorSource_calamity_status.refresh();
      }

      vectorSource_calamity_status.setUrl(domain_name+'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_ncis_status&maxFeatures=50000&outputFormat=application%2Fjson');
      attachLoadingEvents(vectorSource_calamity);

      calamity_status_layer.setVisible(true);
      const resolution = map.getView().getResolution();
      updateLegend(viewgrowcalamity_status_theme.getSource().getLegendUrl(resolution), 'calamity_status', 'Calamity Approval Status');
    }

  }else{

    if (ncisapproval.checked){

      if(document.body.contains((document.getElementById("calamity_status_root")))==false){

      }else{
        document.getElementById("calamity_status_root").remove();
        document.getElementById("calamity_status_image").style.display="none";
      }
      document.getElementById("calamity_status_image").style.display="block";

      if (vectorSource_calamity_status.getUrl()) {
        vectorSource_calamity_status.clear();
        vectorSource_calamity_status.refresh();
      }

      vectorSource_calamity_status.setUrl(domain_name+"ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Av_ncis_status&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=jrdcn_short_code='"+document.getElementById('division_sel').value+"'");
      attachLoadingEvents(vectorSource_calamity);

      calamity_status_layer.setVisible(true);
      const resolution = map.getView().getResolution();
      updateLegend(viewgrowcalamity_status_theme.getSource().getLegendUrl(resolution), 'calamity_status', 'Calamity Approval Status');
    }

  }

}

  
function amenitiesView(){

  if (!amenities.checked){
    facilities_layer.setVisible(false);
    facilities_theme.setVisible(false);

    if(document.body.contains((document.getElementById("facilities_root")))==false){

    }else{
      document.getElementById("facilities_root").remove();
      document.getElementById("facilities_image").style.display="none";
    }

  }

  if(document.getElementById('division_sel').value =="NA"){

    if (amenities.checked){

        if(document.body.contains((document.getElementById("facilities_root")))==false){

        }else{
          document.getElementById("facilities_root").remove();
          document.getElementById("facilities_image").style.display="none";
        }
        document.getElementById("facilities_image").style.display="block";


        facilities_cat_theme_source=new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:v_facilities'},
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        });
        attachLoadingEvents(facilities_cat_theme_source);

        facilities_layer.setVisible(true);
        facilities_layer.setOpacity(0.1);

        facilities_theme.setSource(facilities_cat_theme_source);

        facilities_theme.setVisible(true);
        //new
      //lengendiv.style.display = "block";
        const resolution = map.getView().getResolution();
        updateLegend(facilities_theme.getSource().getLegendUrl(resolution), 'facilities', 'Amenities');

    }

  }else{

  
    if (amenities.checked){

        if(document.body.contains((document.getElementById("facilities_root")))==false){

        }else{
          document.getElementById("facilities_root").remove();
          document.getElementById("facilities_image").style.display="none";
        }
        document.getElementById("facilities_image").style.display="block";


        facilities_cat_theme_source=new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:v_facilities'},
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        });
        attachLoadingEvents(facilities_cat_theme_source);

        facilities_layer.setVisible(true);
        facilities_layer.setOpacity(0.1);

        facilities_theme.setSource(facilities_cat_theme_source);

        facilities_theme.setVisible(true);
        //new
      //lengendiv.style.display = "block";
        const resolution = map.getView().getResolution();
        updateLegend(facilities_theme.getSource().getLegendUrl(resolution), 'facilities', 'Amenities');

    }

  }

}



function accidentHeatMap() {

  if (!accidentheat.checked){
    accidentHeatMap_layer.setVisible(false);

    if(document.body.contains((document.getElementById("accident_heatmap_root")))==false){

    }else{
      document.getElementById("accident_heatmap_root").remove();
      document.getElementById("accident_heatmap_image").style.display="none";
    }

  }

  
  if (accidentheat.checked) {
    vector_source_accident.refresh(); // Force reload data
    accidentHeatMap_layer.setVisible(true);
    console.log('Heatmap activated. Features count:', vector_source_accident.getFeatures().length);
    updateHeatmapLegend('accident_heatmap', 'Accident Heatmap');
    // Debug: log first few features
    // const features = vector_source_accident.getFeatures();
    // if (features.length > 0) {
    //   console.log('Sample feature:', {
    //     geometry: features[0].getGeometry().getType(),
    //     coordinates: features[0].getGeometry().getCoordinates(),
    //     properties: features[0].getProperties()
    //   });
    // }
  } else {
    accidentHeatMap_layer.setVisible(false);
    console.log('Heatmap deactivated');
    if(document.body.contains((document.getElementById("accident_heatmap_root")))==false){

    }else{
      document.getElementById("accident_heatmap_root").remove();
      document.getElementById("accident_heatmap_image").style.display="none";
    }
  }
}





function blackSpotView(){
  if (!blackspotaccident.checked){
      black_spot_layer.setVisible(false);
      black_spot_theme.setVisible(false);

      if(document.body.contains((document.getElementById("black_spot_root")))==false){

      }else{
        document.getElementById("black_spot_root").remove();
        document.getElementById("black_spot_image").style.display="none";
      }
  }


  if (blackspotaccident.checked){

    if (vectorSource_balckspot.getUrl()) {
        vectorSource_balckspot.clear();
        vectorSource_balckspot.refresh();
      }




        black_spot_theme_source=new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:v_black_spot_stretch_geom'},
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        });
        attachLoadingEvents(black_spot_theme_source);

        
        black_spot_layer.setVisible(true);
        black_spot_layer.setOpacity(0.1);

        black_spot_theme.setSource(black_spot_theme_source);

        black_spot_theme.setVisible(true);

    const resolution = map.getView().getResolution();
    updateLegend(black_spot_theme.getSource().getLegendUrl(resolution), 'black_spot', 'Black Spot');

  }else{
    black_spot_layer.setVisible(false);
    if(document.body.contains((document.getElementById("black_spot_root")))==false){

    }else{
      document.getElementById("black_spot_root").remove();
      document.getElementById("black_spot_image").style.display="none";
    }
  }

  

}


function gridAccident(){

  if (!gridaccident.checked){
      grid_accident_layer.setVisible(false);
      grid_accident_theme.setVisible(false);

      if(document.body.contains((document.getElementById("grid_accident_root")))==false){

      }else{
        document.getElementById("grid_accident_root").remove();
        document.getElementById("grid_accident_image").style.display="none";
      }
  }


  if (gridaccident.checked){

    if (vectorSource_gridaccident.getUrl()) {
        vectorSource_gridaccident.clear();
        vectorSource_gridaccident.refresh();
      }




        grid_accident_theme_source=new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:rsis_grid_table'},
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        });
        attachLoadingEvents(grid_accident_theme_source);

        
        grid_accident_layer.setVisible(true);
        grid_accident_layer.setOpacity(0.1);

        grid_accident_theme.setSource(grid_accident_theme_source);

        grid_accident_theme.setVisible(true);

    const resolution = map.getView().getResolution();
    updateLegend(grid_accident_theme.getSource().getLegendUrl(resolution), 'grid_accident', 'Accident Grid');

  }else{
    grid_accident_layer.setVisible(false);
    if(document.body.contains((document.getElementById("grid_accident_root")))==false){

    }else{
      document.getElementById("grid_accident_root").remove();
      document.getElementById("grid_accident_image").style.display="none";
    }
  }

}



// function workstatusView(){

//   if(!project_status.checked){
//     work_status_layer.setVisible(false);
//     work_status_theme.setVisible(false);

//     if(document.body.contains((document.getElementById("workstatus_root")))==false){

//     }else{
//       document.getElementById("workstatus_root").remove();
//       document.getElementById("workstatus_image").style.display="none";
//     }

//   }

//   if(document.getElementById('division_sel').value =="NA"){

//     if(project_status.checked){

//       if(document.body.contains((document.getElementById("workstatus_root")))==false){

//       }else{
//         document.getElementById("workstatus_root").remove();
//         document.getElementById("workstatus_image").style.display="none";
//       }
//       document.getElementById("workstatus_image").style.display="block";

//       work_status_theme_source = new ImageWMS({
//         url: domain_name+'wms',
//         params: {"LAYERS": 'megrams:v_project_inf'},
//         ratio: 1,
//         crossOrigin: 'anonymous',
//         serverType: 'geoserver',
//       });

//       work_status_theme.setSource(work_status_theme_source);

//       work_status_layer.setVisible(true);
//       work_status_layer.setOpacity(0.1);
//       work_status_theme.setVisible(true);
//       const resolution= map.getView().getResolution();
//       updateLegend(work_status_theme.getSource().getLegendUrl(resolution), 'workstatus', 'Project Status');

//     }

//   }else{

//     if(project_status.checked){

//       if(document.body.contains((document.getElementById("workstatus_root")))==false){

//       }else{
//         document.getElementById("workstatus_root").remove();
//         document.getElementById("workstatus_image").style.display="none";
//       }
//       document.getElementById("workstatus_image").style.display="block";

//       work_status_theme_source = new ImageWMS({
//         url: domain_name+'wms',
//         params: {"LAYERS": 'megrams:v_project_inf', "CQL_FILTER": "jrdcn_short_code='"+document.getElementById('division_sel').value+"'"},
//         ratio: 1,
//         crossOrigin: 'anonymous',
//         serverType: 'geoserver',
//       });

//       work_status_theme.setSource(work_status_theme_source);

//       work_status_layer.setVisible(true);
//       work_status_layer.setOpacity(0.1);
//       work_status_theme.setVisible(true);
//       const resolution= map.getView().getResolution();
//       updateLegend(work_status_theme.getSource().getLegendUrl(resolution), 'workstatus', 'Project Status');

//     }

//   }

// }




//add event to road search button
function roadSearch(e){

  if (vectorSource_road_search.getUrl()) {
    vectorSource_road_search.clear();
    vectorSource_road_search.refresh();

  }

  vectorSource_road_search.setUrl("http://103.219.61.73/geoserver/megrams/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=megrams%3Ajrdcn_with_road_gis_new&maxFeatures=50000&outputFormat=application%2Fjson&CQL_FILTER=road_code='" + document.getElementById('road_search_box_new').value + "'");

  road_search_btn.click();

}

function roadSearchClear(e)
{

  if (vectorSource_road_search.getUrl()) {


    vectorSource_road_search.clear();
    //vectorSource_road_search.refresh();

  }

}


road_search_clear_btn.onclick=roadSearchClear;


road_search_btn.onclick = roadSearch;
road_filter_search.onclick=function(e)
{
  roadSearch(e);
}
road_filter_clear.onclick=roadSearchClear;

//handle click for calculating chainage
var selectedFeaturesforchainagecalculation;
const selectandcalculatechainage=new Select();

var featureforcalculatingchainage;


function isOnLine(a, b, c) {
  var tolerance = 5;
  var lengthca2  = Math.pow(c[0] - a[0], 2) + Math.pow(c[1] - a[1], 2);
  var lengthba2  = Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2);
  if (lengthca2 > lengthba2) {
    return false;
  }
  var dotproduct = (c[0] - a[0]) * (b[0] - a[0]) + (c[1] - a[1]) * (b[1] - a[1]);
  if (dotproduct < 0.0) {
    return false;
  } else if (Math.abs(Math.pow(dotproduct, 2) - lengthca2 * lengthba2) > tolerance) {
    return false;
  } else {
    return true;
  }
}


// calculate chainge for ECIS Module




import proj4 from 'proj4';
proj4.defs('EPSG:32646', '+proj=utm +zone=46 +datum=WGS84 +units=m +no_defs');
register(proj4);
const proj32646 = getProjection('EPSG:32646');
proj32646.setExtent([90.00, 0.00, 96.00, 84.00]);

function generatePointToCalculateRevChaiange(e) {
  var found = false;
  var length = 0;
  const coordinate = e.coordinate;

 // const revisedcoordinate= transform(coordinate, 'EPSG:3857','EPSG:4326');



   const geometry=featureforcalculatingchainage.getGeometry();
  //console.log("Selected road length is..................."+geometry.getLength());
   var closestPoint = geometry.getClosestPoint(coordinate);




   const coordinates=((geometry.getCoordinates()));
   const coordinatesarr=coordinates[0];


   for(var i=0;i<coordinatesarr.length-1;i++)
   {
    var p0 = coordinatesarr[i];
    var p1 = coordinatesarr[i + 1];
    if (isOnLine(p0, p1, closestPoint)) {
      var dx = closestPoint[0] - p0[0];
      var dy = closestPoint[1] - p0[1];
      var distance1 = Math.sqrt(dx * dx + dy * dy);
      length += distance1;
      found = true;
      break;
    } else {
      //length += new LineString([p0, p1]).getLength();
      length += new LineString([transform(p0, 'EPSG:3857',proj32646), transform(p1, 'EPSG:3857',proj32646)]).getLength();
    }



   }

const rsi_offset=featureforcalculatingchainage.values_.rsi_offset;
const ecis_road_code=featureforcalculatingchainage.values_.road_code;
//console.log("rsi offset is....."+ecis_road_code);
//console.log("splited road length is..................."+((length/1000)+rsi_offset)+" km");
try
{

    var data=ecistabledata.getAttribute('data')
    const ecis_tr=ecistabledata.parentNode;
    ecis_tr.cells[0].innerHTML=ecis_road_code;

    if(data=='st')
    {
    ecistabledata.innerHTML=((length/1000)+rsi_offset).toFixed(3);
    calculatechainagefeatures=[];
    calculatechainagefeatures.push(new Feature(new Point([closestPoint[0],closestPoint[1]],1000)));
    calculatechaingevectorsource.addFeatures(calculatechainagefeatures);

    }
    if(data=='ed')
    {
    ecistabledata.innerHTML=((length/1000)+rsi_offset).toFixed(3);
    calculatechainagefeatures=[];
    calculatechainagefeatures.push(new Feature(new Point([closestPoint[0],closestPoint[1]],1000)));
    calculatechaingevectorsource.addFeatures(calculatechainagefeatures);
    }
// end calculate chainge for ECIS Module

ecistabledata="";
}
catch(error)
{
  alert("Select Start or End Chainage !");

}
}



//handle click
const select = new Select();
map.addInteraction(select);
const selectedFeatures = select.getFeatures();

// a DragBox interaction used to use features by drawing boxes
const dragBox = new DragBox({
  condition: platformModifierKeyOnly,
});

map.addInteraction(dragBox);

dragBox.on('boxend', function () {
  // features that intersect the box geometry are added to the
  // collection of selected features

  // if the view is not obliquely rotated the box geometry and
  // its extent are equalivalent so intersecting features can
  // be added directly to the collection
  const rotation = map.getView().getRotation();
  const oblique = rotation % (Math.PI / 2) !== 0;
  const candidateFeatures = oblique ? [] : selectedFeatures;
  const extent = dragBox.getGeometry().getExtent();
  vectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
    candidateFeatures.push(feature);
  });

  // when the view is obliquely rotated the box extent will
  // exceed its geometry so both the box and the candidate
  // feature geometries are rotated around a common anchor
  // to confirm that, with the box geometry aligned with its
  // extent, the geometries intersect
  if (oblique) {
    const anchor = [0, 0];
    const geometry = dragBox.getGeometry().clone();
    geometry.rotate(-rotation, anchor);
    const extent = geometry.getExtent();
    candidateFeatures.forEach(function (feature) {
      const geometry = feature.getGeometry().clone();
      geometry.rotate(-rotation, anchor);
      if (geometry.intersectsExtent(extent)) {
        selectedFeatures.push(feature);
      }
    });
  }
});


function getRougYear(){

  //alert("roug="+road_coden);

  fetch("CommonController?mainkey=showsurveyyear&jrdcnCode="+jrdcn_coden+"&dirflag=A&roadnum="+road_coden, {
    method: "post",
    headers: {
      "Content-Type": "text/html",
    },
  })
  .then(function(response) {
     return response.text()
  })
  .then(function(html) {
    document.getElementById('rougyr').innerHTML=html;
  })
  .catch(function(err) {
      //console.log('Failed to fetch page: ', err);
  });

}

function getPconYear(){

  //alert("pcon="+csrf_token);

  fetch("CommonController?mainkey=getyearpad&jrdcnCode="+jrdcn_coden+"&dirflag=A&roadnum="+road_coden, {
    method: "post",
    headers: {
      "Content-Type": "text/html"
    },
  })
  .then(function(response) {
     return response.text()
  })
  .then(function(html) {
    document.getElementById('pconyr').innerHTML=html;
  })
  .catch(function(err) {
      //console.log('Failed to fetch page: ', err);
  });

}


function calculateChainage(lon,lat){

  //alert("pcon="+csrf_token);

  fetch("CommonController?mainkey=calculatechainage&lon="+lon+"&lat="+lat, {
    method: "post",
    headers: {
      "Content-Type": "text/html"
    },
  })
  .then(function(response) {
     return response.text()
     //alert("chainage....");
  })
  .then(function(html) {
    document.getElementById('cal_chain').innerHTML=html;
  })
  .catch(function(err) {
     // console.log('Failed to fetch page: ', err);
  });

}



// ----- Custom layers registry -----
  const customLayers = {};
  let customLayerCount = 0;

  // ----- Keep reference to OSM layer -----
    const osmLayer = new ol.layer.Tile({
      source: new ol.source.OSM(),
      visible: true,
      zIndex: -1
    });
    map.addLayer(osmLayer);

function addCustomLayer(url, name, save = false, id = null) {
      if (!url.includes("{z}") || !url.includes("{x}") || !url.includes("{y}")) {
        alert("Invalid URL. Must contain {z}/{x}/{y}");
        return;
      }

      const layerId = id || "layer_" + Date.now();
      customLayerCount++;

      const newLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({ url, crossOrigin: "anonymous" }),
        visible: false,
        zIndex: -1
      });

      map.addLayer(newLayer);
      customLayers[layerId] = newLayer;

      // Add to dropdown if not exists
      if (![...layerSelect.options].some(o => o.value === layerId)) {
        const option = document.createElement("option");
        option.value = layerId;
        option.textContent = name || `Custom Layer ${Object.keys(customLayers).length}`;
        layerSelect.appendChild(option);
      }

      // Add to modal list
      addLayerToList(layerId, name);

      // Save in localStorage
      if (save) {
        const savedLayers = JSON.parse(localStorage.getItem("customLayers") || "[]");
        savedLayers.push({ id: layerId, url, name });
        localStorage.setItem("customLayers", JSON.stringify(savedLayers));
      }
    }

    function addLayerToList(layerId, name) {
      const list = document.getElementById("addedLayersList");
      const item = document.createElement("div");
      item.className = "list-group-item d-flex justify-content-between align-items-center";
      item.id = "list_" + layerId;

      item.innerHTML = `
        <span>${name}</span>
        <button class="btn btn-sm btn-danger">Remove</button>
      `;

      // Remove handler
      item.querySelector("button").addEventListener("click", () => {
        removeCustomLayer(layerId);
      });

      list.appendChild(item);
    }

    function removeCustomLayer(layerId) {
      const layer = customLayers[layerId];
      if (!layer) return;

      const wasSelected = (layerSelect.value === layerId);

      // Remove from map
      map.removeLayer(layer);
      delete customLayers[layerId];

      // Remove from dropdown
      const option = [...layerSelect.options].find(o => o.value === layerId);
      if (option) option.remove();

      // If currently selected layer is removed → fallback to OSM
      if (wasSelected) {
        layerSelect.value = "OSM";
        osmLayer.setVisible(true);
        Object.values(customLayers).forEach(l => l.setVisible(false));
      }

      // Remove from modal list
      const item = document.getElementById("list_" + layerId);
      if (item) item.remove();

      // Remove from localStorage
      const savedLayers = JSON.parse(localStorage.getItem("customLayers") || "[]");
      const updated = savedLayers.filter(l => l.id !== layerId);
      localStorage.setItem("customLayers", JSON.stringify(updated));
    }

    // ----- Switcher -----
    layerSelect.addEventListener("change", () => {
      const selected = layerSelect.value;

      if (selected === "osm") {
        osmLayer.setVisible(true);
        Object.values(customLayers).forEach(layer => layer.setVisible(false));
      } else {
        osmLayer.setVisible(false);
        Object.entries(customLayers).forEach(([id, layer]) => {
          layer.setVisible(id === selected);
        });
      }
    });

    // ----- Restore saved layers -----
    const savedLayers = JSON.parse(localStorage.getItem("customLayers") || "[]");
    savedLayers.forEach(({ id, url, name }) => addCustomLayer(url, name, false, id));

    // ----- Modal handler -----
    document.getElementById("confirmAddLayerBtn").addEventListener("click", () => {
      const urlEl = document.getElementById("addLayerInput");
      const nameEl = document.getElementById("addLayerName");

      const url = urlEl.value.trim();
      const name = nameEl.value.trim();

      if (!url || !name) {
        alert("Both Name and URL are required.");
        return;
      }

      addCustomLayer(url, name, true);

      // reset form
      urlEl.value = "";
      nameEl.value = "";

      // close modal
      const modalEl = document.getElementById("addLayerModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      // ✅ Just clean up leftover backdrop if Bootstrap forgets
      setTimeout(() => {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) backdrop.remove();
      }, 300);
    });






selectedFeatures.on(['add', 'remove'], function () {
  //alert(roadiddb+"@@@"+road_coden);
  //alert("hello");
  video_src.style.display="none";
  asset_image.style.display="none";

  console.log("selectedFeatures="+selectedFeatures.getArray().toString());
  var assetclicked="";
  const names = selectedFeatures.getArray().map(function (feature) {

    //alert("hello 2");

    assetclicked=feature.id_;

    doctable.style.display="block";

    //console.log(feature);
    //console.log(feature);

    //alert(assetclicked);



    if(assetclicked.startsWith('jrdcn_with_road')||assetclicked.startsWith('other_district_road')||assetclicked.startsWith('state_highway')||assetclicked.startsWith('major_district')||assetclicked.startsWith('urban_road'))
    {

     //alert("getting="+assetclicked);
      bridge_id=-1;
    //console.log(""+feature.get('road_code')+"--"+feature.get('jrdcn_code'));

    road_coden = feature.get('road_code').toString().trim();
    jrdcn_coden = feature.get('jrdcn_code').toString().trim();
    jrdcn_namen = feature.get('jrdcn_short_code').toString().trim();
    var roadname = feature.get('rd_name');
    var rdname = feature.get('road_name');
    var rdcategory = feature.get('lkp_road_category');
    var rdlength = feature.get('road_length');


    var district=feature.get('district');
    var block=feature.get('jrdcn_name');
    //alert(road_coden+"--"+jrdcn_coden+"--"+jrdcn_namen);
    document.getElementById("jrdcnidfordb").value=block;
    document.querySelector('#jrdcnidfordb').dispatchEvent(new Event('change', { 'bubbles': true }));

    document.getElementById("roadidfordb").value=road_coden;
    document.querySelector('#roadidfordb').dispatchEvent(new Event('change', { 'bubbles': true }));


    roadname="District:"+ district +"</br>Division: "+ block +"</br>Road Name: " + rdname +"</br>Road Length (km): " + rdlength.toFixed(3)+ "</br>Road Category: " + rdcategory;

    }



    else if(assetclicked.startsWith('v_bridge_mst'))
    {
    bridge_id=feature.get('bridge_id');
    var bridge_cat=feature.get('bridge_cat');
    var road_name=feature.get('road_name');
    var start_chainage=feature.get('start_chainage');
    var district=feature.get('district');
    var block=feature.get('jrdcn_name');
    intl_str_type = feature.get('intl_str_typ');
    var struct_type=feature.get('structure_type');
    //roadname=bridge_cat;
    roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+block+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr>"+"<tr><td>Chainage(km): </td><td>"+start_chainage+"</td></tr><tr><td>"+"Bridge Type: </td><td>"+bridge_cat+"</td></tr><tr><td>"+"Structure Type: </td><td>"+struct_type+"</td></tr></table>";



    }
     else if(assetclicked.startsWith('v_wms_project_with_road'))
    {
    
    function formatDate(dateVal) {
    if (!dateVal) return '';
    // works for "2025-12-31Z", "2025-12-31T00:00:00Z", etc.
    return dateVal.toString().split('T')[0].replace('Z', '');
    }

    function formatDateIndian(dateVal) {
    if (!dateVal) return '';

    // Extract YYYY-MM-DD part
    var d = dateVal.toString().split('T')[0].replace('Z', '');
    var parts = d.split('-'); // [YYYY, MM, DD]

    if (parts.length !== 3) return dateVal;

    return parts[2] + '-' + parts[1] + '-' + parts[0];
}


   // alert("gettingdata="+assetclicked);
    //console.log(""+feature.get('road_code')+"--"+feature.get('road_name'));
    var project_id=feature.get('project_id');
    var project_name=feature.get('project_name');
    //var project_start_date=feature.get('project_start_date');
    //var project_end_date=feature.get('project_end_date');
    //var project_start_date = formatDate(feature.get('project_start_date'));
    //var project_end_date = formatDate(feature.get('project_end_date'));
    var project_start_date = formatDateIndian(feature.get('project_start_date'));
    var project_end_date = formatDateIndian(feature.get('project_end_date'));
    var remarks=feature.get('remarks');
    var project_status=feature.get('proj_status');
    var division=feature.get('jrdcn_name');
    var road_name=feature.get('road_name');
    var road_category=feature.get('lkp_road_category');
    var road_number=feature.get('road_number');
    var road_length=feature.get('road_length');


   
    //roadname=bridge_cat;
    roadname="<table><tr><td>Project Name: </td><td>"+project_name+"</td></tr><tr><td>Start Date: </td><td>"+project_start_date +"</td></tr><tr><td>End Date: </td><td>"+project_end_date +"</td></tr><tr><td>Remarks: </td><td>"+remarks+"</td></tr><tr><td>Project Status: </td><td>"+project_status+"</td></tr><tr><td>Division: </td><td>"+division+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr>"+"<tr></tr><tr><td>"+"Road Category: </td><td>"+road_category+"</td></tr><tr><td>"+"Road Number: </td><td>"+road_number+"</td></tr><tr><td>"+"Road Length (km): </td><td>"+road_length.toFixed(3)+"</td></tr></table>";




    }

    else if(assetclicked.startsWith('road_accident'))
    {
   // alert("gettingdata="+assetclicked);
    //console.log(""+feature.get('road_code')+"--"+feature.get('road_name'));
    var project_id=feature.get('id');
    var remarks=feature.get('rsis_remarks');
    var division=feature.get('division');
    var road_name=feature.get('road_name');
    var police_station=feature.get('rsish_police_station');
    var name_place=feature.get('rsish_name_place');
    var accident_spot=feature.get('rsish_accident_spot');
    var long=feature.get('rsish_long');
    var lat=feature.get('rsish_lat');
    var area=feature.get('rsish_area');
    var accident_class=feature.get('lkp_accident_class');
    var collision_type=feature.get('rsish_collision_type');
    


    roadname="<table><tr><td>Division: </td><td>"+division+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr>"+"<tr></tr><tr><td>Police Station: </td><td>"+police_station+"</td></tr><tr><td>Name Place: </td><td>"+name_place+"</td></tr><tr><td>Accident Spot: </td><td>"+accident_spot+"</td></tr><tr><td>Longitude: </td><td>"+long+"</td></tr><tr><td>Latitude: </td><td>"+lat+"</td></tr><tr><td>Area: </td><td>"+area+"</td></tr><tr><td>Accident Class: </td><td>"+accident_class+"</td></tr><tr><td>Collision Type: </td><td>"+collision_type+"</td></tr><tr><td>Remarks: </td><td>"+remarks+"</td></tr></table>";
    }

    else if(assetclicked.startsWith('v_facilities'))
    {
    //bridge_id=feature.get('bridge_id');
    var feature_cat=feature.get('ecis_f_category');
    var description=feature.get('ecis_f_desc');
    //roadname=bridge_cat;
    //roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+block+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr>"+"<tr><td>Chainage(km): </td><td>"+start_chainage+"</td></tr><tr><td>"+"Bridge Type: </td><td>"+bridge_cat+"</td></tr><tr><td>"+"Structure Type: </td><td>"+struct_type+"</td></tr></table>";
    roadname="<table><tr><td>Amenity Type:</td><td>"+feature_cat+"</td></tr><tr><td>Description:</td><td>"+description+"</td></tr></table>";


    }
    else if(assetclicked.startsWith('v_box_culvert'))
    {
      bridge_id=feature.get('bridge_id');
      var bridge_cat=feature.get('bridge_cat');
      var road_name=feature.get('road_name');
      var start_chainage=feature.get('start_chainage');
      var district=feature.get('district');
      var block=feature.get('jrdcn_name');
      intl_str_type = feature.get('intl_str_typ');
      var structure_type = feature.get('structure_type');
      //roadname=bridge_cat;
      roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Sub-Division: </td><td>"+block+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr>"+"<tr><td>Chainage(km): </td><td>"+start_chainage+"</td></tr><tr><td>"+"Bridge Type: </td><td>"+bridge_cat+"</td></tr><tr><td>"+"Structure Type: </td><td>"+structure_type+"</td></tr></table>";



      }
    else if(assetclicked.startsWith('v_road_clvrt_inf'))
    {

    var culvert_type=feature.get('lkp_struct_type');
    culvert_id=feature.get('rclvi_id');
    var road_name=feature.get('road_name');
    var start_chainage=feature.get('start_chainage');
    var district=feature.get('district');
    var block=feature.get('jrdcn_name');
    roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+block+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr>"+"<tr><td>Chainage(km): </td><td>"+start_chainage+"</td></tr><tr><td>"+"Culvert Type: </td><td>"+culvert_type+"</td></tr></table>";


    }
    else if(assetclicked.startsWith('v_ecis_growth_center'))
    {

      var center_name=feature.get("center_name");
      var connected_feature=feature.get("feature_connected");
       connected_feature=(connected_feature.replace("{","")).replace("}","");
      var connect_features=connected_feature.split(",");
      var dyanmic_table_row="";

      for(i=0;i<connect_features.length;i++)
      {

        dyanmic_table_row=dyanmic_table_row+"<tr><td>"+(connect_features[i].split("-"))[0]+"</td><td>"+(connect_features[i].split("-"))[1]+"</td></tr>";

      }

      roadname="<table><tr><td>Growth Name: </td><td>"+center_name+"</td></tr>"+dyanmic_table_row+"</table>";


    }
    else if(assetclicked.startsWith('v_rwfis_inf'))
    {


    var row_type=feature.get('rwfisi_feature');
    var safety_hazard=feature.get('rwfisi_safety_hazard');

    var road_name=feature.get('road_name');
    var start_chainage=feature.get('start_chainage');
    var district=feature.get('district');
    var block=feature.get('jrdcn_name');
    roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+block+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr>"+"<tr><td>Chainage(km): </td><td>"+start_chainage+"</td></tr><tr><td>"+"Row Feature: </td><td>"+row_type+"</td></tr><tr><td>"+"Safety Hazard: </td><td>"+safety_hazard+"</td></tr></table>";

    //roadname="<table><tr><td colspan=2>"+row_type+"</br></td></tr></table>";

    }
    else if(assetclicked.startsWith('mv_bridge_rating'))
    {


    var bridge_condition=feature.get('bridge_rating');
    bridge_id=feature.get('bc_bridge_id');
    var brdige_category=feature.get('bridge_category');

    var road_name=feature.get('road_name');
    var start_chainage=feature.get('location');
    var district=feature.get('district');
    var block=feature.get('jrdcn_name');

    roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+block+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr>"+"<tr><td>Chainage(km): </td><td>"+start_chainage+"</td></tr><tr><td>"+"Bridge Condition: </td><td>"+bridge_condition+"</td></tr><tr><td>"+"Bridge Catgory: </td><td>"+brdige_category+"</td></tr></table>";

    //roadname="<table><tr><td colspan=2>"+row_type+"</br></td></tr></table>";

    }
    else if(assetclicked.startsWith('v_traffic_distribution'))
    {


    var traffic_cat=feature.get('lkp_traffic_cat');
    var road_name=feature.get('road_name');
    road_coden=feature.get('road_code').toString().trim();
    var district=feature.get('district');
    var block=feature.get('block');
    roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+block+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr><tr><td>Traffic Category: </td><td>"+traffic_cat+"</td></tr></table>";

    //roadname="<table><tr><td colspan=2>"+row_type+"</br></td></tr></table>";

    }
    else if(assetclicked.startsWith('v_road_work_hist_inf'))
    {


    var maintenance_term=feature.get('maintenance_term');
    var road_name=feature.get('road_name');
    road_coden=feature.get('road_code').toString().trim();
    var district=feature.get('district');
    jrdcn_namen=feature.get('jrdcn_name');
    roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+jrdcn_namen+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr><tr><td>Maintenance Term: </td><td>"+maintenance_term+"</td></tr></table>";

    //roadname="<table><tr><td colspan=2>"+row_type+"</br></td></tr></table>";

    }
    else if(assetclicked.startsWith('v_tss_mst'))
      {

      var road_name=feature.get('road_name');
      road_coden=feature.get('road_code').toString().trim();
      var district=feature.get('district');
      jrdcn_namen=feature.get('jrdcn_name');
      var station_name=feature.get('tss_station_name');
      var station_code=feature.get('tss_short_code');
      var station_id=feature.get('tss_id');
      roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+jrdcn_namen+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr><tr><td>Station Name: </td><td>"+station_name+"</td></tr>"
      +"<tr><td>Station Code: </td><td>"+station_code+"</td></tr><tr><td>Station Id: </td><td>"+station_id+"</td></tr>"
      +"</table>";

      //roadname="<table><tr><td colspan=2>"+row_type+"</br></td></tr></table>";

      }
      else if(assetclicked.startsWith('v_calamity'))
      {
        calamity_id=feature.get('id');
        var status=feature.get('lkpi_name');
        var latitude=feature.get('lat');
        var longitude=feature.get('lon');
        var firstname=feature.get('firstname');
        var middlename=feature.get('middlename');
        var lastname=feature.get('lastname');
        var created_date=feature.get('date');
        var approved_by=feature.get('username');
        var approval_date=feature.get('new_approved_date');
        var district = feature.get('district');
        var division = feature.get('jrdcn_name');
        var road_name= feature.get('road_name');
        var road_code= feature.get('road_code');
        var road_category = feature.get('lkp_road_category');
        var road_length = feature.get('road_length'); 
        var chainage = feature.get('chainage');

        //roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+block+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr>"+"<tr><td>Chainage(km): </td><td>"+start_chainage+"</td></tr><tr><td>"+"Culvert Type: </td><td>"+culvert_type+"</td></tr></table>";
        roadname="<table><tr><td>Staus: </td><td>"+status+"</td></tr><tr><td>District: </td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+division+"</td></tr><tr><td>Chainage: </td><td>"+chainage+"</td></tr><tr><td>Road Name: </td><td>"+road_name+"</td></tr><tr><td>Road Code: </td><td>"+road_code+"</td></tr><tr><td>Road Category: </td><td>"+road_category+"</td></tr><tr><td>Road Length: </td><td>"+road_length+"</td></tr><tr><td>Approved By: </td><td>"+approved_by+"</td></tr><tr><td>Approval Date: </td><td>"+approval_date+"</td></tr><tr><td>"+"Co-ordinates: </td><td>"+latitude+"; "+longitude+"</td></tr><tr><td>"+"Uploaded Date: </td><td>"+created_date+"</td></tr></table>";
      }
      else if(assetclicked.startsWith('v_ncis_status'))
        {
          calamity_id=feature.get('id');
          var status=feature.get('approved_status');
          var latitude=feature.get('lat');
          var longitude=feature.get('lon');
          var firstname=feature.get('firstname');
          var middlename=feature.get('middlename');
          var lastname=feature.get('lastname');
          var created_date=feature.get('date');
          var approved_by=feature.get('username');
          var approval_date=feature.get('new_approved_date');
          var district = feature.get('district');
          var division = feature.get('jrdcn_name');

          var ncis_style="";
          if(status=="Approved"){
            ncis_style="<tr><td>Staus: </td><td>"+status+"</td></tr>"+
                      "<tr><td>District: </td><td>"+district+"</td></tr>"+
                      "<tr><td>Division: </td><td>"+division+"</td></tr>"+
                      "<tr><td>Approved By: </td><td>"+approved_by+"</td></tr>"+
                      "<tr><td>Approval Date: </td><td>"+approval_date+"</td></tr>";
          }else{
            ncis_style="<tr><td>Staus: </td><td>"+status+"</td></tr>"+
                      "<tr><td>District: </td><td>"+district+"</td></tr>"+
                      "<tr><td>Division: </td><td>"+division+"</td></tr>";
          }
          

          //roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+block+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr>"+"<tr><td>Chainage(km): </td><td>"+start_chainage+"</td></tr><tr><td>"+"Culvert Type: </td><td>"+culvert_type+"</td></tr></table>";
          roadname="<table>"+ncis_style+"<tr><td>"+"Latitude: </td><td>"+latitude+"</td></tr><tr><td>"+"Longitude: </td><td>"+longitude+"</td></tr><tr><td>"+"Created By: </td><td>"+firstname+" "+middlename+" "+lastname+"</td></tr><tr><td>"+"Uploaded Date: </td><td>"+created_date+"</td></tr></table>";
        }
        else if(assetclicked.startsWith('v_project_inf'))
          {
            var status=feature.get('proj_status');
            project_id=feature.get('prod_id');
            
            //roadname="<table><tr><td>District:</td><td>"+district+"</td></tr><tr><td>Division: </td><td>"+block+"</td></tr><tr><td colspan=2>Road Name: "+road_name+"</br></td></tr>"+"<tr><td>Chainage(km): </td><td>"+start_chainage+"</td></tr><tr><td>"+"Culvert Type: </td><td>"+culvert_type+"</td></tr></table>";
            roadname="<table><tr><td>Staus: </td><td>"+status+"</td></tr><tr><td>"+"Project Id: </td><td>"+project_id+"</td></tr></table>";
          
          }

    return roadname;

  });
  if (assetclicked.startsWith('jrdcn_with_road')||assetclicked.startsWith('other_district_road')||assetclicked.startsWith('state_highway')||assetclicked.startsWith('major_district')||assetclicked.startsWith('urban_road')) {

    getBridgeInfo('ROAD',road_coden);



    //alert("lr="+  csrf_token+"---"+road_coden+"--"+jrdcn_coden);


    jrdcn_new=jrdcn_namen;
    road_new=road_coden;

    getRougYear();
    getPconYear();


    //roadiddb.value=road_coden;
    //console.log(names);

    //alert("href='ReportController?mainkey=roadinventory&jrdcn="+jrdcn_coden+"&rid="+road_coden+"&isupdn=A&OWASP_CSRFTOKEN="+csrf_token+"'");

    //var contents="href='ReportController?mainkey=roadinventory&jrdcn="+jrdcn_coden+"&rid="+road_coden+"&isupdn=A&OWASP_CSRFTOKEN="+csrf_token+"'";

    //content.innerHTML = '<p>'+names.join(', ')+" <br><a href='http://103.219.61.73:8085' target='_new'>Road Inventory Report</a>";

    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + "<table class='border' style='width: 100%;background:#746a6a;'>"+
    "<tr id='road_inv_web'><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=roadinventory&jrdcn=" + jrdcn_namen + "&rid=" + road_coden + "' target='_new'>Road Inventory</a> </td></tr>" +
    "<tr id='cul_web'><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=cul&jrdcn=" + jrdcn_namen + "&rid=" + road_coden + "&isupdn=A' target='_new'>Culvert Inventory</a> </td></tr>" +

    "<tr id='row_web'><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=RWFIS&jrdcn=" + jrdcn_namen + "&rid=" + road_coden + "&isupdn=A' target='_new'>Right of Way</a> </td></tr>" +

    // "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=roug&&finyr=2022&jrdcn=" + jrdcn_namen + "&rid=" + road_coden + "&isupdn=A' target='_new'>Road Roughness</a></td></tr>"+
    "<tr id='roug_web'><td style='background-color: gray;'><label>Road Roughness</label></td></tr>"+
    "<tr id='roug_yr_web'><td style='width: 100%;'><select id='rougyr' style='width: 100%;'>"+
    "</select></td></tr>" +

    // "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=pcon_stretch&&finyr=2022&jrdcn=" + jrdcn_namen + "&rid=" + road_coden + "&isupdn=A' target='_new'>Pavement Condition</a></td></tr>"+
    "<tr id='pcon_strtch_web'><td style='background-color: gray;'><label>Pavement Condition Stretch</label></td></tr>"+
    "<tr id='pcon_yr_web'><td style='width: 100%;'><select id='pconyr' style='width: 100%;'>"+
    "</select></td></tr>" +

    "<tr id='pcomp_web'><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=comp_stretch&jrdcn=" + jrdcn_namen + "&rid=" + road_coden + "&isupdn=A' target='_new'>Pavement Composition</a> </td></tr>" +

    // "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=pcon_stretch&jrdcn=" + jrdcn_namen + "&rid=" + road_coden + "&isupdn=A' target='_new'>Pavement Condition</a> </td></tr>" +


   "</table>";

  } else   if (assetclicked.startsWith('v_bridge_mst')) {

    getBridgeInfo('BRDG',bridge_id);

    //overlay.setPosition(undefined);
    // content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + "<table class='border' style='width: 100%;background:#746a6a;'>"+
    // "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=brdgrpt&bridgeid=" + bridge_id + "&isupdn=A' target='_new'>Bridge Inventory Report</a> </td></tr>" +
    // "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=brdgrptrating&bridgeid=" + bridge_id + "&isupdn=A' target='_new'>Bridge Condition</a> </td></tr>" +
    // "</table>";


    if(intl_str_type=="BRDG"){

      content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + "<table class='border' style='width: 100%;background:#746a6a;'>"+
                          "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=brdgrpt&bridgeid=" + bridge_id + "&isupdn=A' target='_new'>Bridge Inventory Report</a> </td></tr>" +
                          "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=brdgrptrating&bridgeid=" + bridge_id + "&isupdn=A' target='_new'>Bridge Condition</a> </td></tr>" +
                          "</table>";

    }
    else if (intl_str_type=="STEELBRDG"){

      content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + "<table class='border' style='width: 100%;background:#746a6a;'>"+
                          "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=steelbrdgrpt&bridgeid=" + bridge_id + "&isupdn=A' target='_new'>Bridge Inventory Report</a> </td></tr>" +
                          "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=steelbrdgrptgis&bridgeid=" + bridge_id + "&isupdn=A' target='_new'>Bridge Condition</a> </td></tr>" +
                          "</table>";


    }else if (intl_str_type=="SEMI_PERMANENT"){

      content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + "<table class='border' style='width: 100%;background:#746a6a;'>"+
                          "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=semiPermanentbrdgrpt&bridgeid=" + bridge_id + "&isupdn=A' target='_new'>Bridge Inventory Report</a> </td></tr>" +
                          "</table>";


    }




  }
  else   if (assetclicked.startsWith('v_wms_project_with_road')) {

    getBridgeInfo('WMS',project_id);

    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + "<table class='border' style='width: 100%;background:#746a6a;'>"+
                        "</table>";
  }


  else   if (assetclicked.startsWith('road_accident')) {

    getBridgeInfo('WMS',project_id);

    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + "<table class='border' style='width: 100%;background:#746a6a;'>"+
                        "</table>";
  }





  else   if (assetclicked.startsWith('v_box_culvert')) {

    getBridgeInfo('BRDG',bridge_id);

    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + "<table class='border' style='width: 100%;background:#746a6a;'>"+
                        "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=clvrtrpt&bridgeid=" + bridge_id + "&isupdn=A' target='_new'>Box/Slab Culvert Inventory Report</a> </td></tr>" +
                        "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=clvrtrptcongis&bridgeid=" + bridge_id + "&isupdn=A' target='_new'>Box/Slab Culvert Condition</a> </td></tr>" +
                        "</table>";



  }
  else   if (assetclicked.startsWith('v_road_clvrt_inf')) {

    getBridgeInfo('CUL',culvert_id);

    //alert(culvert_id);


    //overlay.setPosition(undefined);
    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') ;

  }
  else   if (assetclicked.startsWith('v_facilities')) {

    //getBridgeInfo('CUL',culvert_id);

    //alert(culvert_id);


    //overlay.setPosition(undefined);
    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') ;

  }
  else   if (assetclicked.startsWith('v_ecis_growth_center')) {

    //getBridgeInfo('CUL',culvert_id);

    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') ;

  }


  else if(assetclicked.startsWith('v_rwfis_inf'))
  {

    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') ;

  }
  else if(assetclicked.startsWith('mv_bridge_rating')){
    //call external function
    getBridgeInfo('BRDG',bridge_id);

    //overlay.setPosition(undefined);
    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + "<table class='border' style='width: 100%;background:#746a6a;'>"+
    "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=brdgrptrating&bridgeid=" + bridge_id + "&isupdn=A' target='_new'>Bridge Rating Report</a> </td></tr>" +
    "</table>";
  }
  else if(assetclicked.startsWith('v_traffic_distribution')) {


    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + "<table class='border' style='width: 100%;background:#746a6a;'>"+
    "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=trfcdistributioncurrent&rid=" + road_coden + "&isupdn=A' target='_new'>Traffic Distribution Report</a> </td></tr>" +
    "</table>";
  }
  else if(assetclicked.startsWith('v_road_work_hist_inf')) {


    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + " <table class='border' style='width: 100%;background:#746a6a;'>"+
    "<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=WHIST&jrdcn="+jrdcn_namen+"&rid="+road_coden+"' target='_new'>Work History</a> </td></tr>" +
    "</table>";
  }
  else if(assetclicked.startsWith('v_tss_mst')) {


    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + " <table class='border' style='width: 100%;background:#746a6a;'>"+
    //"<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=WHIST&jrdcn="+jrdcn_namen+"&rid="+road_coden+"' target='_new'>Work History</a> </td></tr>" +
    "</table>";
  }
  else if(assetclicked.startsWith('v_calamity')) {

    getBridgeInfo('CALAMITY',calamity_id);

    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + " <table class='border' style='width: 100%;background:#746a6a;'>"+
    //"<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=WHIST&jrdcn="+jrdcn_namen+"&rid="+road_coden+"' target='_new'>Work History</a> </td></tr>" +
    "</table>";
  }
  else if(assetclicked.startsWith('v_ncis_status')) {

    getBridgeInfo('CALAMITY',calamity_id);

    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + " <table class='border' style='width: 100%;background:#746a6a;'>"+
    //"<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=WHIST&jrdcn="+jrdcn_namen+"&rid="+road_coden+"' target='_new'>Work History</a> </td></tr>" +
    "</table>";
  }else if(assetclicked.startsWith('v_project_inf')) {
    getBridgeInfo('PIS',project_id);

    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;font-size:12px;background:#89a88d9e;margin-bottom:6px;>' + names.join(', ') + " <table class='border' style='width: 100%;background:#746a6a;'>"+
    //"<tr><td><a style='color:white;font-weight:bold;' href='ReportController?mainkey=WHIST&jrdcn="+jrdcn_namen+"&rid="+road_coden+"' target='_new'>Work History</a> </td></tr>" +
    "</table>";
  }
  else
  {
    asset_image.src="";
    //asset_image_list.innerHTML="";
    content.innerHTML = '<p class="border" style=color:white;font-weight:bold;>No data selected</p>';

  }
});






function addMarker(coordinates) {
  //console.log(coordinates);
  var marker = new Feature(new Point(coordinates));
  var zIndex = 1;
  marker.setStyle(new Style({
    image: new CircleStyle(({
      radius: 6,
      fill: new Fill({ color: 'red' }),
    })),
    zIndex: zIndex
    // autoPan: true,
    // autoPanAnimation: {
    //   duration: 2000,
    // },
  }));

  //latlonsource.clear();
  latlonvector.setVisible(true);
  //latlonvector.setOpacity(1);
  latlonsource.addFeature(marker);

}

function clearMarker() {

  latlonsource.clear();
  lontext.value="";
  lattext.value="";
}




map.on('postrender', function (evt) {

  //var extent = vectorSource_road_search.getExtent();
  //map.getView().fit(extent, map.getSize());
  //zoom
  if (window.location.hash !== '') {


    const hash = window.location.hash.replace('#map=', '');
    const parts = hash.split('/');
    if (parts.length === 2) {
      lon = parseFloat(parts[0]);
      lat = parseFloat(parts[1])
      map.getView().setCenter(transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
      map.getView().setZoom(18);
      window.location.hash = '';

      var centerLongitudeLatitude = fromLonLat([lon, lat]);
      addMarker(centerLongitudeLatitude);

    }
  }

});

// start measurement tool

map.on('pointermove', pointerMoveHandler);

map.getViewport().addEventListener('mouseout', function () {
  helpTooltipElement.classList.add('hidden');
});

const typeSelect = document.getElementById('type');

let draw; // global so we can remove it later

/**
 * Format length output.
 * @param {LineString} line The line.
 * @return {string} The formatted length.
 */
const formatLength = function (line) {
  const length = getLength(line);
  let output;
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
  } else {
    output = Math.round(length * 100) / 100 + ' ' + 'm';
  }
  return output;
};

/**
 * Format area output.
 * @param {Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
const formatArea = function (polygon) {
  const area = getArea(polygon);
  let output;
  if (area > 10000) {
    output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
  } else {
    output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
  }
  return output;
};

function addInteraction() {
  const type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
  draw = new Draw({
    source: source,
    type: type,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2,
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
      }),
    }),
  });


  createMeasureTooltip();
  createHelpTooltip();

  let listener;
  draw.on('drawstart', function (evt) {
    // set sketch
    sketch = evt.feature;

    /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
    let tooltipCoord = evt.coordinate;

    listener = sketch.getGeometry().on('change', function (evt) {
      const geom = evt.target;
      let output;
      if (geom instanceof Polygon) {
        output = formatArea(geom);
        tooltipCoord = geom.getInteriorPoint().getCoordinates();
      } else if (geom instanceof LineString) {
        output = formatLength(geom);
        tooltipCoord = geom.getLastCoordinate();
      }
      measureTooltipElement.innerHTML = output;
      measureTooltip.setPosition(tooltipCoord);
    });
  });

  draw.on('drawend', function () {
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
    measureTooltip.setOffset([0, -7]);
    // unset sketch
    sketch = null;
    // unset tooltip so that a new one can be created
    measureTooltipElement = null;
    createMeasureTooltip();
    unByKey(listener);
  });
}

/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'ol-tooltip hidden';
  helpTooltip = new Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left',
  });
  map.addOverlay(helpTooltip);
  helpTooltipElement.classList.add('hide_label');
}

/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
  measureTooltip = new Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center',
    stopEvent: false,
    insertFirst: false,
  });
  map.addOverlay(measureTooltip);
}

/**
 * change the geometry type.
 */
typeSelect.onchange = function () {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();


measurement_tool.onclick = function (e) {


  if ("" + e.target == "[object HTMLTableElement]" || "" + e.target == "[object HTMLTableCellElement]") {
    if (measurement_tool.style.backgroundColor == "rgb(0, 0, 0)") {
      //rgb(0, 0, 0)
      //rgb(57, 172, 115)
      map.un('singleclick', generatePopup);
      measurement_tool.style.backgroundColor = "#ff0000";
      map.addInteraction(draw);
      map.removeInteraction(select);
      helpTooltipElement.classList.remove('hide_label');

    }
    else {
      helpTooltipElement.classList.add('hide_label');
      map.on('singleclick', generatePopup);
      measurement_tool.style.backgroundColor = "#000000"
      //#39ac73
      //#0000
      map.removeInteraction(draw);

      var staticTooltip = document.getElementsByClassName("ol-tooltip-static")[0];
      if (staticTooltip) {
        staticTooltip.parentNode.removeChild(staticTooltip);
        createMeasureTooltip();
      }


      source.clear();
      source.refresh();
      map.addInteraction(select);
    }

  }




}




//edn measurment tool

const dims = {
  a0: [1189, 841],
  a1: [841, 594],
  a2: [594, 420],
  a3: [420, 297],
  a4: [297, 210],
  a5: [210, 148],
};


const scaleLine = new ScaleLine({ bar: true, text: true, minWidth: 125 });

const exportOptions = {
  useCORS: true,
  ignoreElements: function (element) {
    const className = element.className || '';
    return !(
      className.indexOf('ol-control') === -1 ||
      className.indexOf('ol-scale') > -1 ||
      (className.indexOf('ol-attribution') > -1 &&
        className.indexOf('ol-uncollapsible'))
    );
  },
};


// exportButton.addEventListener(
//   "click",
//   function () {
//     exportButton.disabled = true;
//     document.body.style.cursor = "progress";

//     var format = document.getElementById("format").value;
//     var resolution = document.getElementById("resolution").value;
//     var dim = dims[format];
//     var width = Math.round((dim[0] * resolution) / 25.4);
//     var height = Math.round((dim[1] * resolution) / 25.4);
//     var size = map.getSize();
//     var viewResolution = map.getView().getResolution();

//     map.once("rendercomplete", function () {
//       var mapCanvas = document.createElement("canvas");
//       mapCanvas.width = width;
//       mapCanvas.height = height;
//       var mapContext = mapCanvas.getContext("2d");
//       Array.prototype.forEach.call(
//         document.querySelectorAll(".ol-layer canvas"),
//         function (canvas) {
//           if (canvas.width > 0) {
//             var opacity = canvas.parentNode.style.opacity;
//             mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
//             var transform = canvas.style.transform;

//             var matrix = transform
//               .match(/^matrix\(([^\(]*)\)$/)[1]
//               .split(",")
//               .map(Number);
//             // Apply the transform to the export map context
//             CanvasRenderingContext2D.prototype.setTransform.apply(
//               mapContext,
//               matrix
//             );
//             mapContext.drawImage(canvas, 0, 0);
//           }
//         }
//       );
//       var pdf = new jspdf.jsPDF("landscape", undefined, format);
//       pdf.addImage(mapCanvas, "JPEG", 0, 0, dim[0], dim[1]);
//       if (ri.checked == true) {
//         var img = document.getElementById("legend");
//         //console.log("legend")
//         pdf.addImage(img, "JPEG", 0, dim[1] - img.height, 30, 30);
//       }
//       //console.log("adding image")
//       pdf.save("map.pdf");
//       // Reset original map size
//       map.setSize(size);
//       map.getView().setResolution(viewResolution);
//       exportButton.disabled = false;
//       document.body.style.cursor = "auto";
//     });

//     // Set print size
//     var printSize = [width, height];
//     map.setSize(printSize);
//     var scaling = Math.min(width / size[0], height / size[1]);
//     map.getView().setResolution(viewResolution / scaling);
//   },
//   false
// );



//GEOLOCATION

const positionFeature = new Feature();
positionFeature.setStyle(
  new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#3399CC',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2,
      }),
    }),
  }),
);


const view = new View({
  center: [0, 0],
  zoom: 7,
});


// Geeolocation
const geolocation = new Geolocation({
  // enableHighAccuracy must be set to true to have the heading value.
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: view.getProjection(),
});

function el(id) {
  return document.getElementById(id);
}

el('track').addEventListener('click', function () {
  geolocation.setTracking(this.checked);
  ///alert("hello");

  //alert("checking="+document.getElementById('track').checked);

  if(document.getElementById('track').checked){
    //alert("hello true");
  }else{
    //alert("hello false");
    clearMarker();
  }
});


// update the HTML page when the position changes.
geolocation.on('change', function () {

 // alert(geolocation.getTracking());
  const coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);

  var latlon = olProj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');

  lon = parseFloat(latlon[0]);
  lat = parseFloat(latlon[1]);
  map.getView().setCenter(transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
  map.getView().setZoom(18);
  var centerLongitudeLatitude = fromLonLat([lon, lat]);
  addMarker(centerLongitudeLatitude);


  // el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
  // el('altitude').innerText = geolocation.getAltitude() + ' [m]';
  // el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
  // el('heading').innerText = geolocation.getHeading() + ' [rad]';
  // el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
  //alert(ol.proj.transform(geolocation.getPosition(), 'EPSG:3857', 'EPSG:4326'));
  //alert(latlon);
});

// handle geolocation error.
geolocation.on('error', function (error) {
  // const info = document.getElementById('info');
  // info.innerHTML = error.message;
  // info.style.display = '';
});



const accuracyFeature = new Feature();

geolocation.on('change:accuracyGeometry', function () {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});



geolocation.on('change:position', function () {
  //const coordinates = geolocation.getPosition();
  //positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);

  //alert(JSON.stringify(new Point(coordinates)));



  //var lon = latlon[0];
  //var lat = latlon[1];

  //console.log("lat="+lat+"@@@lon="+lon);

  // var latlon = olProj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');

  // lon = parseFloat(latlon[0]);
  // lat = parseFloat(latlon[1]);
  // map.getView().setCenter(transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
  // map.getView().setZoom(18);
  // var centerLongitudeLatitude = fromLonLat([lon, lat]);
  // addMarker(centerLongitudeLatitude);


});

// new VectorLayer({
//   map: map,
//   source: new VectorSource({
//     features: [accuracyFeature, positionFeature],
//   }),
// });








//advance query clear logic
advance_query_clear.onclick=function()
{
  advance_query_box.value="";
  var maparr =map.getAllLayers();

  for( i=0;i<maparr.length;i++)
  {

    if(maparr[i].get('name')=='Road Roughness')
    {
          var source= new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:v_road_roughness_dtl' },
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        });
         maparr[i].setSource(source);
         maparr[i].setVisible(false);
    }

    if(maparr[i].get('name')=='Road Inventory')
    {
          var source= new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:v_road_inventory', },
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        });
         maparr[i].setSource(source);
         maparr[i].setVisible(false);
    }


  }




}


//advance query logic

advance_query_formula_btn.onclick=function(a)
{

advance_query_box.value=advance_query_box.value+" "+a.target.value;

}



advance_query_layer.onchange=function()
{

  advance_query_box.value="";


fetch("CommonController?mainkey=wamattriblist&wamid="+advance_query_layer.value.split("$")[0], {
  method: "post",
  headers: {
    "Content-Type": "text/html"
  },
})
.then(function(response) {
   return response.text()
})
.then(function(html) {
  advance_query_attrib.innerHTML=html;
})
.catch(function(err) {
   // console.log('Failed to fetch page: ', err);
});





}

advance_query_attrib.ondblclick=function()
{



advance_query_box.value=advance_query_box.value+" "+advance_query_attrib.value;

}

function load_advance_query_result()
{


  //advance_query_result.innerHTML="<option title='58'>abcd</option><option title='52'>12345</option><option title='54'>zzzz</option>";

 if(advance_query_layer.value.split("$")[1]=="Road Roughness")
 {

  fetch("CommonController?mainkey=wamresultlist&advquery="+advance_query_box.value+"&assetcode=ROUG", {
    method: "post",
    headers: {
      "Content-Type": "text/html"
    },
  })
  .then(function(response) {
     return response.text()
  })
  .then(function(html) {
    advance_query_result.innerHTML=html;
  })
  .catch(function(err) {
     // console.log('Failed to fetch page: ', err);
  });

 }
 if(advance_query_layer.value.split("$")[1]=="Road Inventory")
 {

  //alert("Road Inventory.....");
  fetch("CommonController?mainkey=wamresultlist&advquery="+advance_query_box.value+"&assetcode=RI", {
    method: "post",
    headers: {
      "Content-Type": "text/html"
    },
  })
  .then(function(response) {
     return response.text()
  })
  .then(function(html) {
    advance_query_result.innerHTML=html;
  })
  .catch(function(err) {
     // console.log('Failed to fetch page: ', err);
  });

 }
 if(advance_query_layer.value.split("$")[1]=="Culvert")
 {

  //alert("Road Inventory.....");
  fetch("CommonController?mainkey=wamresultlist&advquery="+advance_query_box.value+"&assetcode=CUL", {
    method: "post",
    headers: {
      "Content-Type": "text/html"
    },
  })
  .then(function(response) {
     return response.text()
  })
  .then(function(html) {
    advance_query_result.innerHTML=html;
  })
  .catch(function(err) {
      //console.log('Failed to fetch page: ', err);
  });

 }
 if(advance_query_layer.value.split("$")[1]=="Work History")
 {

  //alert("Road Inventory.....");
  fetch("CommonController?mainkey=wamresultlist&advquery="+advance_query_box.value+"&assetcode=WHIST", {
    method: "post",
    headers: {
      "Content-Type": "text/html"
    },
  })
  .then(function(response) {
     return response.text()
  })
  .then(function(html) {
    advance_query_result.innerHTML=html;
  })
  .catch(function(err) {
      //console.log('Failed to fetch page: ', err);
  });

 }




}

advance_query_result.onclick=function(a)
{

road_search_box.value=a.target.title;
road_search_btn.click();

}

advance_query_run.onclick =function()
{
  load_advance_query_result();
  var layername=advance_query_layer.value.split("$")[1];
  var cql=advance_query_box.value;
  var maparr =map.getAllLayers();
  for( i=0;i<maparr.length;i++)
  {

    if(maparr[i].get('name')==layername & layername=="Road Roughness")
    {

          //alert("Roughness");
          var source= new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:v_road_roughness_dtl',"CQL_FILTER":cql },
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        });
         maparr[i].setSource(source);
         maparr[i].setVisible(true);
    }
    if(maparr[i].get('name')==layername & layername=="Road Inventory")
    {
          //alert("Inventory"+cql);
          var source= new ImageWMS({
          url: domain_name+'wms',
          params: { "LAYERS": 'megrams:v_road_inventory',"CQL_FILTER":cql },
          ratio: 1,
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        });
         maparr[i].setSource(source);
         maparr[i].setVisible(true);
    }
  }

}

function loadLayer()
{

  fetch("CommonController?mainkey=wamlist", {
    method: "post",
    headers: {
      "Content-Type": "text/html"
    },
  })
  .then(function(response) {
     return response.text()
  })
  .then(function(html) {
    advance_query_layer.innerHTML=html;
  })
  .catch(function(err) {
     // console.log('Failed to fetch page: ', err);
  });


}

loadLayer();

//end advance query logic

//tracing logic.........











// get value
get_value.onclick=function(a){
  //alert("Road Inventory.....");

  //alert('asset='+advance_query_layer.value.split("$")[1]+'______attribute='+document.getElementById('advance_query_attrib').value)


  if(document.getElementById('advance_query_attrib').value==""){
   alert("Please select value!");
  }else{

   document.getElementById('loading_halt_panel').style.visibility='visible';
   fetch("CommonController?mainkey=getattribvalue&asset="+advance_query_layer.value.split("$")[1]+"&attribute="+document.getElementById('advance_query_attrib').value, {
    method: "post",
    headers: {
      "Content-Type": "text/html"
    },
  })
   .then(function(response) {
       return response.text()
   })
   .then(function(html) {
     advance_query_attrib_unique.innerHTML=html;
     document.getElementById('loading_halt_panel').style.visibility='hidden';
   })
   .catch(function(err) {
      // console.log('Failed to fetch value: ', err);
       document.getElementById('loading_halt_panel').style.visibility='hidden';
   });
 }
}

advance_query_attrib_unique.ondblclick=function()
{



advance_query_box.value=advance_query_box.value+"'"+advance_query_attrib_unique.value+"'";

}


function removeLayerfromMap(maplayers,layername)
{

  for( i=0;i<maplayers.getLength();i++)
  {

  var test=(maplayers.item(i));
  console.log(test.get('name')+"======"+layername);
   if (test.get('name') == layername)
   {

     map.removeLayer(test);
     map.removeLayer(test);
     map.removeLayer(test);
     map.removeLayer(test);


   }


  }

  /*

  maplayers.forEach(cde => {
    //console.log(maplayer);
    if (cde.get('name') == layername) {
      map.removeLayer(cde)
      console.log("matched layer is......."+layername)
    }
  });

  */

}


function getDateRange(period) {

  if(period=="NA"){
    return "";
  }

  const today = new Date();
  const startDate = new Date();
  const endDate = new Date();
  
  switch(period) {
    case 'today':
      startDate.setDate(today.getDate());
      endDate.setDate(today.getDate());
      break;
    case 'yesterday':
      startDate.setDate(today.getDate() - 1);
      endDate.setDate(today.getDate() - 1);
      break;
    case '7days':
      startDate.setDate(today.getDate() - 7);
      break;
    case 'thisweek':
      startDate.setDate(today.getDate() - today.getDay());
      break;
    case 'lastweek':
      startDate.setDate(today.getDate() - today.getDay() - 7);
      endDate.setDate(today.getDate() - today.getDay() - 1);
      break;
    case 'thismonth':
      startDate.setDate(1);
      break;
    case 'lastmonth':
      startDate.setMonth(today.getMonth() - 1, 1);
      endDate.setMonth(today.getMonth(), 0);
      break;
    case 'past30days':
      startDate.setDate(today.getDate() - 30);
      break;
    case 'thisyear':
      startDate.setMonth(0, 1);
      break;
    case 'lastyear':
      startDate.setFullYear(today.getFullYear() - 1, 0, 1);
      endDate.setFullYear(today.getFullYear() - 1, 11, 31);
      break;
    default:
      return null;
  }
  
  // Format dates as yyyy-mm-dd
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  return {
    start: formatDate(startDate),
    end: formatDate(endDate)
  };
}












