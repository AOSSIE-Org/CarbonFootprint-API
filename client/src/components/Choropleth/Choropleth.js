import React from 'react';
import ReactDOM from 'react-dom';
import 'topojson';

var topojson = require('topojson');
var MapChoropleth = require('react-d3-map-choropleth').MapChoropleth;

import './Choropleth.css';

export default class Choropleth extends React.Component {

    render() {
        let width = 960;
        let height = 600;

        let topodata = require('json!../data/us.json');
        let unemploy = require('dsv?delimiter=\t!../data/unemployment.tsv')

        let dataStates = topojson.mesh(topodata, topodata.objects.states, function(a, b) { return a !== b; });
        let dataCounties = topojson.feature(topodata, topodata.objects.counties).features;

        let domain = {
            scale: 'quantize',
            domain: [0, .15],
            range: d3.range(9).map(function(i) { return "q" + i + "-9"; })
        };
        let domainValue = function(d) { return +d.rate; };
        let domainKey = function(d) {return +d.id};
        let mapKey = function(d) {return +d.id};

        let scale = 1280;
        let translate = [width / 2, height / 2];
        let projection = 'albersUsa';

        return(
            <MapChoropleth
                width= {width}
                height= {height}
                dataPolygon= {dataCounties}
                dataMesh= {dataStates}
                scale= {scale}
                domain= {domain}
                domainData= {unemploy}
                domainValue= {domainValue}
                domainKey= {domainKey}
                mapKey = {mapKey}
                translate= {translate}
                projection= {projection}
                showGraticule= {true}
            />
        );
    }
}

