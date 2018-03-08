/**
 * Line chart
 * 来源: https://bl.ocks.org/mbostock/3883245
 * Created by liuyang on 2018/3/8.
 */
import React, {
    Component
} from 'react';
import * as d3 from 'd3';

class LineChart extends Component {
    componentDidMount() {
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        };

        var svg = d3.select('#lineChart')
            .append('svg')
            .attr('width', 600)
            .attr('height', 600);

        var width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom;

        var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // x scale 未添加domain
        var x = d3.scaleTime()
            .rangeRound([0, width]);

        // y scale 未添加domain
        var y = d3.scaleLinear()
            .rangeRound([height, 0]);


        var line = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.close);
            });

        d3.tsv('/data/areaChart.tsv', function (d) {
            d.date = d3.timeParse('%d-%b-%y')(d.date);
            d.close = +d.close;
            return d;
        }, function (err, data) {
            if(err) {
                throw err;
            }

            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));

            y.domain([0, d3.max(data, function (d) {
                return d.close;
            })]);

            // 画x轴
            g.append('g')
                .attr('transform', 'translate(0' + ',' + height + ')')
                .call(d3.axisBottom(x));

            // 画y轴
            g.append('g')
                .call(d3.axisLeft(y))
                .append('text')
                .text('Price ($)')
                .attr('fill', '#000')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '0.71em')
                .attr('text-anchor', 'end');


            // 画曲线
            g.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('stroke-width', 1.5)
                .attr('d', line);
        });
    }

    render() {
        return (
            <div id="lineChart"
                 className="basic-demo">
                <h3>Line Chart</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://bl.ocks.org/mbostock/3883245">官网实例</a>
                </p>
            </div>
        )
    }
}

export default LineChart;
