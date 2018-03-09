/**
 * Pie Chart
 * 来源: https://bl.ocks.org/mbostock/3887235
 * Created by liuyang on 2018/3/9.
 */
import React, {
    Component
} from 'react';
import * as d3 from 'd3';

class PieChart extends Component {
    componentDidMount() {
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        };

        var svg = d3.select('#pieChart')
            .append('svg')
            .attr('width', 600)
            .attr('height', 600);

        var width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom;

        var radius = Math.min(width, height) / 2;

        var g = svg.append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        var color = d3.scaleOrdinal([
            '#98abc5',
            '#8a89a6',
            '#7b6888',
            '#6b486b',
            '#a05d56',
            '#d0743c',
            '#ff8c00'
        ]);

        var pie = d3.pie()
            .sort(null)
            .value(function (d) {
                return d.population;
            });

        var path = d3.arc()
            .outerRadius(radius - 50)
            .innerRadius(0);

        var label = d3.arc()
            .outerRadius(radius - 90)
            .innerRadius(radius - 90);

        d3.csv('/data/pieChart.csv', function (d) {
            d.population = +d.population;
            return d;
        }, function (err, data) {
            var arc = g.selectAll('.arc')
                .data(pie(data))
                .enter()
                .append('g')
                .attr('class', 'arc');

            arc.append('path')
                .attr('d', path)
                .attr('stroke', '#fff')
                .attr('fill', function (d) {
                    return color(d.data.age);
                });

            arc.append('text')
                .attr('transform', function (d) {
                    // https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
                    return 'translate(' + label.centroid(d) + ')';
                })
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .style('font', '10px sans-serif')
                .text(function (d) {
                    return d.data.age;
                });
        });
    }

    render() {
        return (
            <div id="pieChart"
                 className="basic-demo">
                <h3>Pie Chart</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://bl.ocks.org/mbostock/3887235">官网实例</a>
                </p>
            </div>
        )
    }
}

export default PieChart;
