import React from 'react';
import * as d3 from 'd3';

export default class Emission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
    }
    createChart = (val) => {

        var data1 = [
            { ser1: '2013-03-15', ser2: 7 },
            { ser1: '2013-05-15', ser2: 6 },
            { ser1: '2013-07-15', ser2: 8 },
            { ser1: '2013-09-15', ser2: 2 }
        ];

        var data2 = [
            { ser1: '2013-03-15', ser2: 7 },
            { ser1: '2013-03-18', ser2: 1 },
            { ser1: '2013-03-22', ser2: 8 }
        ];
        var dataSet = (val === 1) ? data1 : data2;

        // set the dimensions and margins of the graph
        var margin = { top: 10, right: 30, bottom: 30, left: 50 },
            width = 800 - margin.left - margin.right,
            height = 150 - margin.top - margin.bottom;
        d3.selectAll("svg").remove();
        var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        var x = d3.scaleTime().range([0, width]);
        var xAxis = d3.axisBottom().scale(x);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "myXaxis")

        // Initialize an Y axis
        var y = d3.scaleLinear().range([height, 0]);
        var yAxis = d3.axisLeft().scale(y);
        svg.append("g")
            .attr("class", "myYaxis");
        var data = dataSet.map(item => {
            return { ser1: d3.timeParse("%Y-%m-%d")(item.ser1), ser2: item.ser2 }
        })

        // Create the X axis:
        x.domain(d3.extent(data, function (d) { return d.ser1; }));
        svg.selectAll(".myXaxis").transition()
            .duration(2000)
            .call(xAxis);

        // create the Y axis
        y.domain([0, d3.max(data, function (d) { return d.ser2 })]);
        svg.selectAll(".myYaxis")
            .transition()
            .duration(2000)
            .call(yAxis);

        // Create a update selection: bind to the new data
        var u = svg.selectAll(".lineTest")
            .data([data], function (d) { return d.ser1 });

        // Updata the line
        u
            .enter()
            .append("path")
            .attr("class", "lineTest")
            .merge(u)
            .transition()
            .duration(2000)
            .attr("d", d3.line()
                .x(function (d) { return x(d.ser1); })
                .y(function (d) { return y(d.ser2); }))
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2.5)

        svg.selectAll("circle").remove()

        var circle = svg.selectAll("circle")
            .data(data)

        circle
            .enter()
            .append("circle")
            .attr("class", "circle")
            .merge(circle)
            .transition()
            .duration(2000)
            .attr("fill", "red")
            .attr("stroke", "none")
            .attr("cx", function (d) { return x(d.ser1) })
            .attr("cy", function (d) { return y(d.ser2) })
            .attr("r", 3)
    }
    componentDidMount() {
        //call data and pass it
        this.createChart(1);
    }
    render() {
        return (
            <div>
                <button onClick={() => { this.createChart(1) }}>Week</button>
                <button onClick={() => { this.createChart(2) }}>Year</button>
                <div id="my_dataviz"></div>
            </div>
        )
    }
}
