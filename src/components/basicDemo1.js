/**
 * D3基础图表一
 * 来源: https://juejin.im/post/590186cada2f60005de63c43
 * Created by liuyang on 2018/2/26.
 */
import React, {
    Component
} from 'react';
import data from '../assets/data/basicDemo.json';
import * as d3 from 'd3';

class BasicDemo1 extends Component {
    componentDidMount() {
        const colorList = d3.schemeCategory10;
        const width = 400,
            height = 400;

        const svg = d3.select('#basicDemo1')
            .append('svg')
            .attr('width', 600)
            .attr('height', 600)
            .attr('class', 'ckt_svg_barChart');

        // x轴比例尺
        const xScale = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.3)
            .domain(data.map(function (d) {
                return d.name;
            }));

        // y轴比例尺
        const yScale = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, d3.max(data.map(function (d) {
                return d.value + 30
            }))]);

        // group
        const group = svg.append('g')
            .attr('transform', 'translate(40, 40)');

        // x轴
        const xAxis = group.append('g')
            .attr('class', 'xAxis_barChart')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(d3.axisBottom(xScale));   // .call 方法

        // y轴
        const yAxis = group.append('g')
            .attr('class', 'yAxis_barChart')
            .call(d3.axisLeft(yScale));


        // 渲染柱子
        group.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function (d) {
                return xScale(d.name);
            })
            .attr('y', height)
            .attr('width', xScale.bandwidth())
            .attr('height', 1)   // 为什么
            .attr('fill', function (d, i) {
                return colorList[i];
            })
            .transition()
            .duration(1000)
            .delay(function (d, i) {
                return i * 500 / 3;
            })
            .attr('height', function (d) {
                return height - yScale(d.value);
            })
            .attr('y', function (d) {
                return yScale(d.value);
            });
    }

    render() {
        return (
            <div id="basicDemo1"
                 className="basic-demo">
                <h3>D3基础图表一</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://juejin.im/post/590186cada2f60005de63c43">掘金</a>
                </p>
            </div>
        );
    }
}

export default BasicDemo1;
