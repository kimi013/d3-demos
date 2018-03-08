/**
 * Area chart
 * 来源: https://bl.ocks.org/mbostock/3883195
 * Created by liuyang on 2018/3/8.
 */
import React, {
    Component
} from 'react';
import * as d3 from 'd3';

class AreaChart extends Component {
    componentDidMount() {
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        };

        var svg = d3.select('#areaChart')
            .append('svg')
            .attr('width', 600)
            .attr('height', 600);

        var width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom;

        var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var x = d3.scaleTime()                // x轴
                .rangeRound([0, width]),
            y = d3.scaleLinear()              // y轴
                .rangeRound([height, 0]);

        // https://github.com/d3/d3-shape/blob/master/README.md#area
        var area = d3.area()
            .x(function (d) {
                return x(d.date);
            })
            .y1(function (d) {
                return y(d.close)
            });

        d3.tsv('/data/areaChart.tsv', function (d) {
            // https://github.com/d3/d3-time-format/blob/master/README.md#timeParse
            d.date = d3.timeParse('%d-%b-%y')(d.date);
            d.close = +d.close;
            return d;
        }, function (err, data) {
            if (err) {
                throw err;
            }

            // https://github.com/d3/d3-array/blob/master/README.md#extent
            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));

            y.domain([0, d3.max(data, function (d) {
                return d.close;
            })]);

            area.y0(y(0));

            g.append('path')
                .datum(data)
                .attr('fill', 'steelblue')
                .attr('d', area);

            g.append('g')
                .attr('transform', 'translate(0, ' + height + ')')
                .call(d3.axisBottom(x));

            g.append('g')
                .call(d3.axisLeft(y))
                .append('text')
                .attr('fill', '#000')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '0.71em')
                .attr('text-anchor', 'end')
                .text('Price ($)');
        });
    }

    render() {
        return (
            <div id="areaChart"
                 className="basic-demo">
                <h3>Area Chart</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://bl.ocks.org/mbostock/3883195">官网实例</a>
                </p>
            </div>
        )
    }
}

export default AreaChart;