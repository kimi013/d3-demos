/**
 * Bivariate area chart
 * 来源: https://bl.ocks.org/mbostock/3884914
 * Created by liuyang on 2018/3/8.
 */
import React, {
    Component
} from 'react';
import * as d3 from 'd3';

class BivariateAreaChart extends Component {
    componentDidMount() {
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        };

        var svg = d3.select('#bivariateAreaChart')
            .append('svg')
            .attr('width', 600)
            .attr('height', 600);

        var width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom;

        var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var x = d3.scaleTime()
            .rangeRound([0, width]);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var area = d3.area()
            .x(function (d) {
                return x(d.date);
            })
            .y0(function (d) {
                return y(d.low);
            })
            .y1(function (d) {
                return y(d.high);
            });

        d3.tsv('/data/bivariateAreaChart.tsv', function (d) {
            d.date = d3.timeParse('%Y%m%d')(d.date);
            d.high = +d.high;
            d.low = +d.low;
            return d;
        }, function (err, data) {
            if (err) {
                throw err;
            }

            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));

            y.domain([d3.min(data, function (d) {
                return d.low;
            }), d3.max(data, function (d) {
                return d.high;
            })]);


            // 画曲线
            g.append('path')
                .datum(data)
                .attr('fill', 'steelblue')
                .attr('d', area);

            // 画x轴
            g.append('g')
                .attr('transform', 'translate(0, ' + height + ')')
                .call(d3.axisBottom(x));

            // 画y轴
            g.append('g')
                .call(d3.axisLeft(y));
        })
    }

    render() {
        return (
            <div id="bivariateAreaChart"
                 className="basic-demo">
                <h3>Bivariate Area Chart</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://bl.ocks.org/mbostock/3884914">官网实例</a>
                </p>
            </div>
        );
    }
}

export default BivariateAreaChart;