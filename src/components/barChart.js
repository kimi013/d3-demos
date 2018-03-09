/**
 * Bar Chart
 * 来源: https://bl.ocks.org/mbostock/3885304
 * Created by liuyang on 2018/3/9.
 */
import React, {
    Component
} from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
    componentDidMount() {
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        };

        var svg = d3.select('#barChart')
            .append('svg')
            .attr('width', 1000)
            .attr('height', 600);

        var width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom;

        var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var x = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.1);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);


        d3.tsv('/data/barChart.tsv', function (d) {
            d.frequency = +d.frequency;
            return d;
        }, function (err, data) {
            if (err) {
                throw err;
            }

            x.domain(data.map(function (d) {
                return d.letter;
            }));

            y.domain([0, d3.max(data, function (d) {
                return d.frequency;
            })]);

            // 画x轴
            g.append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x));

            // 画y轴
            g.append('g')
                .attr('class', 'axis axis-y')
                // https://github.com/d3/d3-axis/blob/master/README.md#axis_ticks
                .call(d3.axisLeft(y).ticks(10, '%'))
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '0.71em')
                .attr('text-anchor', 'end')
                .text('Frequency')
                .style('fill', '#000');

            // 画柱子
            g.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .style('fill', 'steelblue')
                .attr('width', x.bandwidth())
                .attr('height', function (d) {
                    return height - y(d.frequency);
                })
                .attr('x', function (d) {
                    return x(d.letter);
                })
                .attr('y', function (d) {
                    return y(d.frequency);
                })

        })
    }

    render() {
        return (
            <div id="barChart"
                 className="basic-demo middle">
                <h3>Bar Chart</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://bl.ocks.org/mbostock/3885304">官网实例</a>
                </p>
            </div>
        );
    }
}

export default BarChart;