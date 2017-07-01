import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

export default class WorldMap extends Component {
    constructor() {
        super()
        this.state = {
            worlddata: [],
            emissions: {}
        }
    }

    projection() {
        return geoMercator()
            .scale(100)
            .translate([ 800 / 2, 450 / 2 ])
    }

    handleMouseEnter(data) {
        this.props.showTooltip(data);
    }
    handleMouseLeave() {
        this.props.hideTooltip();
    }
    componentDidMount() {
        fetch("./data/world-110m.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`)
                    return;
                }
                response.json().then(worlddata => {
                    this.setState({
                        worlddata: feature(worlddata, worlddata.objects.countries).features,
                    })
                })
            });
        fetch("./data/electricity.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`)
                    return;
                }
                response.json().then(emissions => {
                    this.setState({
                        emissions
                    })
                })
            });
    }
    render() {
        return (
            <svg width="100%" height="100%" viewBox="0 0 800 450">
                <g className="countries">
                    {
                        this.state.worlddata.map((d,i) => (
                            <path
                                key={ `path-${ i }` }
                                d={ geoPath().projection(this.projection())(d) }
                                className={(this.state.emissions[d.id])?"country": ""}
                                fill={ (this.state.emissions[d.id])?`rgba(200,190,14,${this.state.emissions[d.id]["CO2"]}`:"#efefef" }
                                stroke={(this.state.emissions[d.id])?"#e89f46": "#ddd"}
                                strokeWidth={ 0.6 }
                                onMouseOver={() => this.handleMouseEnter(this.state.emissions[d.id])}
                                onMouseLeave={() => this.handleMouseLeave()}
                            />
                        ))
                    }
                </g>
            </svg>
        )
    }
}
