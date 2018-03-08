/**
 * D3基础图表一
 * 来源: https://juejin.im/post/590186bdac502e0063ce0291
 * Created by liuyang on 2018/2/26.
 */
import React, {
    Component
} from 'react';
import data from '../assets/data/basicDemo.json';
import * as d3 from 'd3';

class BasicDemo2 extends Component {
    componentDidMount() {
        const colorList = d3.schemeCategory10;
        const width = 400,
            height = 400;

        const svg = d3.select('#basicDemo2')
            .append('svg')
            .attr('width', 600)
            .attr('height', 600)
            .attr('class', 'ckt_svg_barChart');

        // x轴比例尺
        const xScale = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([d3.max(data.map(function (d) {
                return d.value;
            })), 0]);

        // y轴比例尺
        const yScale = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.3)
            .domain(data.map(function (d) {
                return d.name;
            }));

        // group
        const group = svg.append('g')
            .attr('transform', 'translate(40, 40)');

        // 画x轴
        group.append('g')
            .attr('class', 'xAxis_barChart')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(d3.axisBottom(xScale));

        // 画y轴
        group.append('g')
            .attr('class', 'yAxis_barChart')
            .call(d3.axisLeft(yScale).ticks(5));   // ticks??

        // 渲染柱子
        group.selectAll('.column')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'column')
            .attr('x', 1)    // ??
            .attr('y', function (d) {
                return yScale(d.name);
            })
            .attr('width', 1)  // ??
            .attr('height', yScale.bandwidth())
            .attr('fill', function (d, i) {
                return colorList[i];
            })
            .transition()
            .duration(1000)
            .delay(function (d, i) {
                return i * 500 / 3;
            })
            .attr('width', function (d) {
                return xScale(d.value);
            });


    }

    render() {
        return (
            <div id="basicDemo2"
                 className="basic-demo">
                <h3>D3基础图表二</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://juejin.im/post/590186bdac502e0063ce0291">掘金</a>
                </p>
            </div>
        )
    }
}

export default BasicDemo2;