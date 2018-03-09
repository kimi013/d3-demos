/**
 * Multi-Series Line Chart
 * 来源: https://bl.ocks.org/mbostock/3884955
 * Created by liuyang on 2018/3/8.
 */
import React, {
    Component
} from 'react';
import * as d3 from 'd3';

class MultiSeriesLineChart extends Component {
    componentDidMount() {
        var margin = {
            top: 20,
            right: 80,
            bottom: 30,
            left: 50
        };

        var svg = d3.select('#multiSeriesLineChart')
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

        var line = d3.line()
            // https://github.com/d3/d3-shape/blob/master/README.md#line_curve
            // https://github.com/d3/d3-shape/blob/master/README.md#curveBasis
            .curve(d3.curveBasis)
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.temperature);
            });

        d3.tsv('/data/multiSeriesLineChart.tsv', type, function (err, data) {
            if (err) {
                throw err;
            }

            var cities = data.columns.slice(1).map(function (id) {
                return {
                    id: id,
                    values: data.map(function (d) {
                        return {
                            date: d.date,
                            temperature: d[id]
                        };
                    })
                }
            });

            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));

            y.domain([
                d3.min(cities, function (c) {
                    return d3.min(c.values, function (d) {
                        return d.temperature;
                    });
                }),
                d3.max(cities, function (c) {
                    return d3.max(c.values, function (d) {
                        return d.temperature;
                    });
                })
            ]);

            z.domain(cities.map(function (c) {
                return c.id;
            }));

            // 画x轴
            g.append('g')
                .attr("class", "axis axis-x")
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x));

            // 画y轴
            g.append('g')
                .call(d3.axisLeft(y))
                .attr("class", "axis axis-y")
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '0.71em')
                .attr('fill', '#000')
                .text('Temperature, ºF');

            // 每一条曲线
            var city = g.selectAll('.city')
                .data(cities)
                .enter()
                .append('g')
                .attr('class', 'city');

            // 每一条曲线添加path
            city.append('path')
                .attr('class', 'line')
                .attr('d', function (d) {
                    return line(d.values);
                })
                .attr('fill', 'none')
                .style('stroke', function (d) {
                    return z(d.id);
                });

            // 每一条曲线添加text
            city.append('text')
                .datum(function (d) {
                    return {
                        id: d.id,
                        value: d.values[d.values.length - 1]
                    };
                })
                .attr('transform', function (d) {
                    return 'translate(' + x(d.value.date) + ',' + y(d.value.temperature) + ')';
                })
                .attr('x', 3)
                .attr('dy', '0.35em')
                .style('font', '10px sans-serif')
                .text(function (d) {
                    return d.id;
                });
        });

        /**
         * 数据转换函数
         * @param d
         * @param index
         * @param columns
         * @returns {*}
         */
        function type(d, index, columns) {
            d.date = d3.timeParse('%Y%m%d')(d.date);
            for (var i = 1, len = columns.length, c; i < len; i++) {
                c = columns[i];
                d[c] = +d[c];
            }
            return d;
        }

    }

    render() {
        return (
            <div id="multiSeriesLineChart"
                 className="basic-demo middle">
                <h3>Multi-Series Line Chart</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://bl.ocks.org/mbostock/3884955">官网实例</a>
                </p>
            </div>
        );
    }
}

export default MultiSeriesLineChart;