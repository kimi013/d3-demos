/**
 * Stacked Bar Chart
 * 来源: https://bl.ocks.org/mbostock/3886208
 * Created by liuyang on 2018/3/9.
 */
import React, {
    Component
} from 'react';
import * as d3 from 'd3';

class StackedBarChart extends Component {
    componentDidMount() {
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        };

        var svg = d3.select('#stackedBarChart')
            .append('svg')
            .attr('width', 1000)
            .attr('height', 600);

        var width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom;

        var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var x = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.05)
            // https://github.com/d3/d3-scale/blob/master/README.md#band_align
            .align(0.1);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var z = d3.scaleOrdinal()
            .range([
                '#98abc5',
                '#8a89a6',
                '#7b6888',
                '#6b486b',
                '#a05d56',
                '#d0743c',
                '#ff8c00'
            ]);

        d3.csv('/data/stackedBarChart.csv', function (d, index, columns) {
            for (var i = 1, len = columns.length, t = 0; i < len; i++) {
                t += d[columns[i]] = +d[columns[i]];
            }
            d.total = t;
            return d;
        }, function (err, data) {
            if (err) {
                throw err;
            }

            var keys = data.columns.slice(1);

            data.sort(function (a, b) {
                return b.total - a.total;
            });

            x.domain(data.map(function (d) {
                return d.State;
            }));

            y.domain([0, d3.max(data, function (d) {
                return d.total;
            })]).nice();  // https://github.com/d3/d3-scale/blob/master/README.md#continuous_nice

            z.domain(keys);

            // 画x轴
            g.append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', 'translate(0, ' + height + ')')
                .call(d3.axisBottom(x));

            // 画y轴
            g.append('g')
                .attr('class', 'axis axis-y')
                .call(d3.axisLeft(y).ticks(null, 's'))  // todo?
                .append('text')
                .attr('x', 2)
                .attr('y', y(y.ticks().pop()) + 0.5)  // todo?
                .attr('dy', '0.32em')
                .attr('fill', '#000')
                .attr('font-weight', 'bold')
                .attr('text-anchor', 'start')
                .text('population');

            // 画曲线
            g.append('g')
                .selectAll('g')
                .data(d3.stack().keys(keys)(data))
                .enter()
                .append('g')
                .attr('fill', function (d) {
                    return z(d.key);
                })
                .selectAll('rect')
                .data(function (d) {
                    return d;
                })
                .enter()
                .append('rect')
                .attr('x', function (d) {
                    return x(d.data.State)
                })
                .attr('y', function (d) {
                    return y(d[1]);
                })
                .attr('width', x.bandwidth())
                .attr('height', function (d) {
                    return y(d[0]) - y(d[1]);
                });

            var legend = g.append('g')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .attr('text-anchor', 'end')
                .selectAll('g')
                .data(keys.slice().reverse())
                .enter()
                .append('g')
                .attr('transform', function (d, i) {
                    return 'translate(0,' + i * 20 + ')';
                });

            legend.append('rect')
                .attr('x', width - 19)
                .attr('width', 19)
                .attr('height', 19)
                .attr('fill', z);

            legend.append('text')
                .attr('x', width - 24)
                .attr('y', 9.5)
                .attr('dy', '0.32em')
                .text(function (d) {
                    return d;
                })

        });
    }

    render() {
        return (
            <div id="stackedBarChart"
                 className="basic-demo middle">
                <h3>Stacked Bar Chart</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://bl.ocks.org/mbostock/3886208">官网实例</a>
                </p>
            </div>
        )
    }
}

export default StackedBarChart;