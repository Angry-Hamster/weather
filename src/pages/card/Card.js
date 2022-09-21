import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { addFeature as featuresToRedux, deleteFeature } from '../../redux/features/action'
import { setZoom } from '../../redux/config/action'

import { uuid } from "../../helpers/uuid";


import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

// import s from './style.mpdule.css'

const Card = () => {
  const [zoom, setZoom] = useState(5)
  // save zoom in redux persist store

  const flex_features = useSelector((state) => state.features)
  const dispatch = useDispatch()

  const create_point = (coord, color, id) => {
    const iconFeature = new Feature({
      geometry: new Point(coord),
      id: id
    });

    return iconFeature
  }

  const source = new VectorSource({
    features: flex_features.map(elem => create_point(elem.eventcoord, elem.color, elem.id)),
    // features: [create_point([3379604.056736253, 6273514.301035504])]
  });

  const vector = new VectorLayer({
    source: source,
  });

  const raster = new TileLayer({
    source: new OSM(),
  });

  const olmap = new Map({
    target: null,
    controls: [],
    layers: [
      raster,
      vector
    ],
    view: new View({
      center: [3171695.339800574, 6312650.059517515],
      zoom: zoom,
    })
  });


  const meters2degress = (x, y) => {
    let lon = x * 180 / 20037508.34;
    let lat = Math.atan(Math.exp(y * Math.PI / 20037508.34)) * 360 / Math.PI - 90;
    return [lon, lat]
  }

  olmap.on('dblclick', (e) => {
    let flux = false
    olmap.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
      dispatch(deleteFeature({ id: feature.values_.id }))
      flux = true
    })

    if (flux) { return true }

    const random_color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const lonlat = meters2degress(...e.coordinate)
    const lon = lonlat[0], lat = lonlat[1]
    const id = uuid()

    dispatch(featuresToRedux({ id, coord: { lon, lat }, color: random_color, eventcoord: e.coordinate }))
  })

  olmap.getView().on('change:resolution', (e) => {
    console.log(olmap.getView().getZoom());
    // zoom to redux with method setZoom
  });

  useEffect(() => {
    olmap.setTarget("map");

    if (document.querySelectorAll(".ol-viewport").length > 1) {
      document.querySelector(".ol-viewport").remove()
    }
  })

  const width = window.innerWidth + 'px',
    heigth = window.innerHeight - 60 + 'px';
  return (
    <div id="map" style={{ width: width, height: heigth }}>
    </div>
  );

}

export default Card;


// ? style for feature
    // const iconStyle = new Style({
    //   image: new Icon({
    //     fill: new Fill({
    //       color: 'rgba(255,255,255,0.4)',
    //     }),
    //     stroke: new Stroke({
    //       color: '#ff0000',
    //       width: 1.25,
    //     }),
    //     radius: 5,
    //     src: 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/16x16/plain/shape_circle.png'
    //   }),
    //   fill: new Fill({
    //     color: 'rgba(255,255,255,0.4)',
    //   }),
    //   stroke: new Stroke({
    //     color: '#ff0000',
    //     width: 1.25,
    //   }),
    // })

    // iconFeature.setStyle(iconStyle);