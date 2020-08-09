// @ts-nocheck
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as d3 from 'd3';
import moment from 'moment';
import { Responsive, Segment, Header, Icon, Divider, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getData } from './UtilDatafetch';
import Emission from '../EmissionGraph/Emission';
import Steps from '../StepsGraph/Steps';

class DailyEmission extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noOfMonths: 9,
      width: 550,
      value: 'Emissions',
      statement: 'Your CO2 emission for the past months'
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateMapSize);
    this.updateMapSize();
    this.create();
  }
  componentDidUpdate() {
    this.create();
  }
  updateMapSize = () => {
    const noOfMonths = (window.innerWidth <= 700) ? Math.floor(window.innerWidth / 100) + 1 : 9;
    const width = (window.innerWidth <= 700) ? noOfMonths * (550 / 9) : 550;
    this.setState({ noOfMonths: noOfMonths, width: width });
  }

  calendarHeatmap() {
    // defaults
    let width = this.state.width;
    let height = 140;
    let legendWidth = 100;
    let selector = null;
    let SQUARE_LENGTH = 11;
    let SQUARE_PADDING = 2;
    let MONTH_LABEL_PADDING = 6;
    let now = moment()
      .endOf('day')
      .toDate();
    let yearAgo = moment()
      .startOf('day')
      .subtract(this.state.noOfMonths, 'month')
      .toDate();
    let startDate = null;
    let counterMap = {};
    let data = [];
    let max = null;
    let colorRange;
    let tooltipEnabled = true;
    let tooltipUnit = 'emission';
    let legendEnabled = true;
    let onClick = null;
    let weekStart = 0; //0 for Sunday, 1 for Monday
    let locale = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      No: 'No',
      on: 'on',
      Less: 'Less',
      More: 'More'
    };
    let v = Number(d3.version.split('.')[0]);

    // setters and getters
    chart.data = function (value) {
      if (!arguments.length) {
        return data;
      }

      data = value;

      counterMap = {};

      data.forEach(function (element, index) {
        let key = moment(element.date).format('YYYY-MM-DD');
        let counter = counterMap[key] || 0;
        counterMap[key] = counter + element.count;
      });

      return chart;
    };

    chart.max = function (value) {
      if (!arguments.length) {
        return max;
      }
      max = value;
      return chart;
    };

    chart.selector = function (value) {
      if (!arguments.length) {
        return selector;
      }
      selector = value;
      return chart;
    };

    chart.startDate = function (value) {
      if (!arguments.length) {
        return startDate;
      }
      yearAgo = value;
      now = moment(value)
        .endOf('day')
        .add(1, 'year')
        .toDate();
      return chart;
    };

    chart.colorRange = function (value) {
      if (!arguments.length) {
        return colorRange;
      }
      colorRange = value;
      return chart;
    };

    chart.tooltipEnabled = function (value) {
      if (!arguments.length) {
        return tooltipEnabled;
      }
      tooltipEnabled = value;
      return chart;
    };

    chart.tooltipUnit = function (value) {
      if (!arguments.length) {
        return tooltipUnit;
      }
      tooltipUnit = value;
      return chart;
    };

    chart.legendEnabled = function (value) {
      if (!arguments.length) {
        return legendEnabled;
      }
      legendEnabled = value;
      return chart;
    };

    chart.onClick = function (value) {
      if (!arguments.length) {
        return onClick();
      }
      onClick = value;
      return chart;
    };

    chart.locale = function (value) {
      if (!arguments.length) {
        return locale;
      }
      locale = value;
      return chart;
    };

    function chart() {
      d3.select(chart.selector())
        .selectAll('svg.calendar-heatmap')
        .remove(); // remove the existing chart, if it exists

      let dateRange = d3.timeDays(yearAgo, now); // generates an array of date objects within the specified range
      let monthRange = d3.timeMonths(
        moment(yearAgo)
          .startOf('month')
          .toDate(),
        now
      ); // it ignores the first month if the 1st date is after the start of the month
      let firstDate = moment(dateRange[0]);
      if (chart.data().length === 0) {
        max = 1000000;
      } else if (max === null) {
        max = d3.max(chart.data(), function (d) {
          return d.count;
        }); // max data value
      }

      // color range
      let color = d3
        .scaleLinear()
        .range(chart.colorRange())
        .domain([0, max]);

      let tooltip;
      let dayRects;

      drawChart();

      function drawChart() {
        let svg = d3
          .select(chart.selector())
          .style('position', 'relative')
          .append('svg')
          .attr('width', width)
          .attr('class', 'calendar-heatmap')
          .attr('height', height)
          .style('padding', '36px');

        dayRects = svg.selectAll('.day-cell').data(dateRange); //  array of days for the last yr

        let enterSelection = dayRects
          .enter()
          .append('rect')
          .attr('class', 'day-cell')
          .attr('width', SQUARE_LENGTH)
          .attr('height', SQUARE_LENGTH)
          .attr('fill', function (d) {
            return color(countForDate(d));
          })
          .attr('x', function (d, i) {
            let cellDate = moment(d);
            let result =
              cellDate.week() -
              firstDate.week() +
              firstDate.weeksInYear() * (cellDate.weekYear() - firstDate.weekYear());
            return result * (SQUARE_LENGTH + SQUARE_PADDING);
          })
          .attr('y', function (d, i) {
            return (
              MONTH_LABEL_PADDING + formatWeekday(d.getDay()) * (SQUARE_LENGTH + SQUARE_PADDING)
            );
          })
          .attr('style', 'transform: translateY(10px);');

        if (typeof onClick === 'function') {
          (v === 3 ? enterSelection : enterSelection.merge(dayRects)).on('click', function (d) {
            let count = countForDate(d);
            onClick({ date: d, count: count });
          });
        }

        if (chart.tooltipEnabled()) {
          (v === 3 ? enterSelection : enterSelection.merge(dayRects))
            .on('mouseenter', function (d, i) {
              tooltip = d3
                .select(chart.selector())
                .append('div')
                .attr('class', 'day-cell-tooltip')
                .html(tooltipHTMLForDate(d))
                .style('left', function () {
                  return Math.floor(i / 7) * SQUARE_LENGTH + 'px';
                })
                .style('top', function () {
                  return (
                    formatWeekday(d.getDay()) * (SQUARE_LENGTH + SQUARE_PADDING) +
                    MONTH_LABEL_PADDING * 2 +
                    'px'
                  );
                });
            })
            .on('mouseout', function (d, i) {
              tooltip.remove();
            });
        }

        if (chart.legendEnabled()) {
          let colorRange = [color(0)];
          for (let i = 3; i > 0; i--) {
            colorRange.push(color(max / i));
          }

          let legendGroup = svg.append('g');
          legendGroup
            .selectAll('.calendar-heatmap-legend')
            .data(colorRange)
            .enter()
            .append('rect')
            .attr('class', 'calendar-heatmap-legend')
            .attr('width', SQUARE_LENGTH)
            .attr('height', SQUARE_LENGTH)
            .attr('x', function (d, i) {
              return width - legendWidth + (i + 1) * 13;
            })
            .attr('y', height + SQUARE_PADDING + 30)
            .attr('fill', function (d) {
              return d;
            })
            .attr('style', 'transform: translateY(-50px);');

          legendGroup
            .append('text')
            .attr('class', 'calendar-heatmap-legend-text calendar-heatmap-legend-text-less')
            .attr('x', width - legendWidth - 13)
            .attr('y', height + SQUARE_LENGTH)
            .text(locale.Less)
            .attr('style', 'transform: translateY(-20px);');

          legendGroup
            .append('text')
            .attr('class', 'calendar-heatmap-legend-text calendar-heatmap-legend-text-more')
            .attr('x', width - legendWidth + SQUARE_PADDING + (colorRange.length + 1) * 13)
            .attr('y', height + SQUARE_LENGTH)
            .text(locale.More)
            .attr('style', 'transform: translateY(-20px);');
        }

        dayRects.exit().remove();
        svg
          .selectAll('.month')
          .data(monthRange)
          .enter()
          .append('text')
          .attr('class', 'month-name')
          .text(function (d) {
            if (d.getMonth() === new Date().getMonth() - 9) return '';
            return locale.months[d.getMonth()];
          })
          .attr('x', function (d, i) {
            let matchIndex = 0;
            dateRange.find(function (element, index) {
              matchIndex = index;
              return moment(d).isSame(element, 'month') && moment(d).isSame(element, 'year');
            });

            return Math.floor(matchIndex / 7) * (SQUARE_LENGTH + SQUARE_PADDING);
          })
          .attr('y', 0) // fix these to the top
          .attr('style', 'transform: translateY(10px);');

        locale.days.forEach(function (day, index) {
          index = formatWeekday(index);
          if (index % 2) {
            svg
              .append('text')
              .attr('class', 'day-initial')
              .attr(
                'transform',
                'translate(-8,' + (SQUARE_LENGTH + SQUARE_PADDING) * (index + 1) + ')'
              )
              .style('text-anchor', 'middle')
              .attr('dy', '2')
              .text(day);
          }
        });
      }

      function pluralizedTooltipUnit(count) {
        if ('string' === typeof tooltipUnit) {
          return tooltipUnit + (count === 1 ? '' : 's');
        }
        for (let i in tooltipUnit) {
          let _rule = tooltipUnit[i];
          let _min = _rule.min;
          let _max = _rule.max || _rule.min;
          _max = _max === 'Infinity' ? Infinity : _max;
          if (count >= _min && count <= _max) {
            return _rule.unit;
          }
        }
      }

      function tooltipHTMLForDate(d) {
        let dateStr = moment(d).format('ddd, MMM Do YYYY');
        let count = countForDate(d);
        return (
          '<span><strong>' +
          (count ? count : locale.No) +
          ' ' +
          pluralizedTooltipUnit(count) +
          '</strong> ' +
          locale.on +
          ' ' +
          dateStr +
          '</span>'
        );
      }

      function countForDate(d) {
        let key = moment(d).format('YYYY-MM-DD');
        return counterMap[key] || 0;
      }

      function formatWeekday(weekDay) {
        if (weekStart === 1) {
          if (weekDay === 0) {
            return 6;
          } else {
            return weekDay - 1;
          }
        }
        return weekDay;
      }

      chart.data().map(function (day) {
        return day.date.toDateString();
      });
    }

    return chart;
  }

  create = () => {
    getData().then(data => {
      let yearData = data;
      let chartData = yearData.map(dateElement => {
        return {
          date: new Date(dateElement.date),
          count: dateElement.quantity
        };
      });

      this.calendarHeatmap()
        .data(chartData)
        .selector(this.refs.jsHeatmap)
        .tooltipEnabled(true)
        .colorRange(['#ebedf0', '#e1b809'])
        .onClick(function (data) {
        })();
    });
  };
  handleChange = (event) => { this.setState({ value: event.target.value }); }
  componentDidMount(){
    console.log(this.state);
  }
  render() {
    return (
      // <div style={{background: "#FFFFFF"}}>
      <Responsive as={Segment} raised className="screenhide">
        <Header as="h3" style={{ display: 'flex' }}>
          <Icon name="leaf" />
          <Header.Content>
            <select value={this.state.value} onChange={this.handleChange} style={{ float:'left',padding:'5px' }}>
              <option value="Emissions">Emissions</option>
              <option value="CO2">Emissions saved</option>
              <option value="Steps">Steps</option>
            </select>
            <br/><br/>
            <Header.Subheader>Your CO2 emission for the past months</Header.Subheader>
          </Header.Content>
          <Button
            as={Link}
            to="/profile/enter"
            color="twitter"
            style={{ marginLeft: 'auto',marginBottom: 'auto' }}
            ref="entryModal">
            <Icon name="add" />
            Today's entry
          </Button>
        </Header>
        <Divider />
        <Grid centered columns={1}>
          <Grid.Column style={{ textAlign: 'center' }}>
            { this.state.value==='Emissions' && <div ref="jsHeatmap" style={{ margin: '-36px auto' }} />}
            { this.state.value==='CO2' && <Emission />}
            { this.state.value==='Steps' && <Steps />}
          </Grid.Column>
        </Grid>
      </Responsive>
      // </div>
    );
  }
}

export default withRouter(DailyEmission);
