/**
 * Stacked Area Chart
 * 来源: https://bl.ocks.org/mbostock/3885211
 * Created by liuyang on 2018/3/8.
 */
import React, {
    Component
} from 'react';
import * as d3 from 'd3';

class StackedAreaChart extends Component {
    componentDidMount() {
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        };

        var svg = d3.select('#stackedAreaChart')
            .append('svg')
            .attr('width', 1000)
            .attr('height', 600);

        var width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom;

        var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var x = d3.scaleTime()
                .range([0, width]),
            y = d3.scaleLinear()
                .range([height, 0]),
            z = d3.scaleOrdinal(d3.schemeCategory10);

        // https://github.com/d3/d3-shape/blob/master/README.md#stack
        var stack = d3.stack();

        var area = d3.area()
            .x(function (d, i) {
                return x(d.data.date);
            })
            .y0(function (d) {
                return y(d[0]);
            })
            .y1(function (d) {
                return y(d[1]);
            });

        d3.tsv('/data/stackedAreaChart.tsv', type, function (err, data) {
            if (err) {
                throw err;
            }

            var keys = data.columns.slice(1);

            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));
            z.domain(keys);

            // https://github.com/d3/d3-shape/blob/master/README.md#stack_keys
            stack.keys(keys);

            console.log(stack(data));

            // 每一层
            var layer = g.selectAll('.layer')
            // https://github.com/d3/d3-shape/blob/master/README.md#_stack
                .data(stack(data))
                .enter()
                .append('g')
                .attr('class', 'layer');

            layer.append('path')
                .attr('class', 'area')
                .style('fill', function (d) {
                    return z(d.key);
                })
                .attr('d', area);

            // https://github.com/d3/d3-selection/blob/master/README.md#selection_filter
            layer.filter(function (d) {
                return d[d.length - 1][1] - d[d.length - 1][0] > 0.01;
            })
                .append('text')
                .attr('x', width - 6)
                .attr('y', function (d) {
                    return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2);
                })
                .attr('dy', '0.35em')
                .style('font', '10px sans-serif')
                .style('text-anchor', 'end')
                .text(function (d) {
                    return d.key;
                });

            // 画x轴
            g.append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x));

            // 画y轴
            g.append('g')
                .attr('class', 'axis axis-y')
                .call(d3.axisLeft(y));
        });

        /**
         * 调整数据结构
         * @param d
         * @param index
         * @param columns
         */
        function type(d, index, columns) {
            d.date = d3.timeParse("%Y %b %d")(d.date);
            for (var i = 1, len = columns.length, c; i < len; i++) {
                c = columns[i];
                d[c] = d[c] / 100;
            }
            return d;
        }

    }

    render() {
        return (
            <div id="stackedAreaChart"
                 className="basic-demo middle">
                <h3>Stacked Area Chart</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://bl.ocks.org/mbostock/3885211">官网实例</a>
                </p>
            </div>
        )
    }
}

export default StackedAreaChart;