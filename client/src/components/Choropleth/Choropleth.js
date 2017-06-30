import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

export default class WorldMap extends Component {
    constructor() {
        super()
        this.state = {
            worlddata: [],
        }

        this.handleCountryClick = this.handleCountryClick.bind(this)
    }
    projection() {
        return geoMercator()
            .scale(100)
            .translate([ 800 / 2, 450 / 2 ])
    }
    handleCountryClick(countryIndex, e) {
        // console.log("Clicked on country: ", this.state.worlddata[countryIndex])
        this.props.showTooltip(countryIndex, e.clientX, e.clientY);
    }
    handleMouseEnter(e) {
        this.props.showTooltip(e.clientX, e.clientY);
    }
    handleMouseLeave() {
        this.props.hideTooltip();
    }
    componentDidMount() {
        fetch("./data/world-110m.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`)
                    return
                }
                response.json().then(worlddata => {
                    this.setState({
                        worlddata: feature(worlddata, worlddata.objects.countries).features,
                    })
                })
            })
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
                                className="country"
                                fill={ `rgba(200,190,14,${1 / this.state.worlddata.length * i}` }
                                stroke="#e8bb47"
                                strokeWidth={ 0.5 }
                                onClick={ (e) => this.handleCountryClick(i, e) }
                                onMouseMove={(e) => this.handleMouseEnter(e)}
                                onMouseLeave={() => this.handleMouseLeave()}
                            />
                        ))
                    }
                </g>
            </svg>
        )
    }
}
