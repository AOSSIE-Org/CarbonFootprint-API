import React from 'react';
import * as d3 from 'd3';

export default class Steps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
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
        var data = (val === 1) ? data1 : data2;

        // set the dimensions and margins of the graph
        var margin = { top: 10, right: 30, bottom: 80, left: 50 },
            width = 660 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        d3.selectAll("svg").remove();
        var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
                
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "myXaxis")

        // Initialize an Y axis
        var y = d3.scaleLinear().range([height, 0]);
        var yAxis = d3.axisLeft().scale(y);
        svg.append("g")
            .attr("class", "myYaxis");
        var x = d3.scaleBand()
                .range([ 0, width ])
                .domain(data.map(function(d) { return d.ser1; }))
                .padding(0.2);
        var xAxis = d3.axisBottom().scale(x);

        // // Create the X axis:
        // x.domain(d3.extent(data, function (d) { return d.ser1; }));
        svg.selectAll(".myXaxis").transition()
            .duration(2000)
            .call(xAxis)
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
        

        // create the Y axis
        y.domain([0, d3.max(data, function (d) { return d.ser2 })]);
        svg.selectAll(".myYaxis")
            .transition()
            .duration(2000)
            .call(yAxis);

        // Create a update selection: bind to the new data
        var u = svg.selectAll("rect")
            .data(data)

        u
            .enter()
            .append("rect") // Add a new rect for each new elements
            .merge(u) // get the already existing elements as well
            .transition() // and apply changes to all of them
            .duration(1000)
            .attr("x", function (d) { return x(d.ser1); })
            .attr("y", function (d) { return y(d.ser2); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.ser2); })
            .attr("fill", "#69b3a2")

        // If less group in the new dataset, I delete the ones not in use anymore
        u
            .exit()
            .remove()
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
