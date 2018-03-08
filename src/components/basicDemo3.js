/**
 * D3基础图表
 * 来源: https://juejin.im/post/5893e419128fe10058d08e94
 * Created by liuyang on 2018/2/26.
 */
import React, {
    Component
} from 'react';
import data from '../assets/data/basicDemo.json';
import * as d3 from 'd3';

class BasicDemo3 extends Component {
    componentDidMount() {
        const colorList = d3.schemeCategory10;
        const width = 400,
            height = 400;

        const svg = d3.select('#basicDemo3')
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
                return d.value + 30;
            }))]);

        // group
        const group = svg.append('g')
            .attr('transform', 'translate(40, 40)');

        // x轴
        group.append('g')
            .attr('class', 'xAxis_barChart')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(d3.axisBottom(xScale));   // .call 方法

        // y轴
        group.append('g')
            .attr('class', 'yAxis_barChart')
            .call(d3.axisLeft(yScale));

        // 渲染柱子
        // path知识: https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
        group.selectAll('.path')
            .data(data)
            .enter()
            .append('path')
            .attr('class', 'path')
            .attr('d', () => {         // “上、右、左”的顺序画出路径
                let arr = [];
                let a = {};
                a.centerX = xScale.bandwidth() / 2;
                a.centerY = 1;
                a.end = xScale.bandwidth();
                arr.push('M ' + (a.centerX + 20));
                arr.push(' ');
                arr.push(0);
                arr.push(' L ' + a.centerX * 2);
                arr.push(' ');
                arr.push(a.centerY);
                arr.push(' ');
                arr.push('L 0 ');
                arr.push(a.centerY);
                arr.push(' Z');
                return arr.join('');
            })
            .attr('transform', (d) => {
                return 'translate(' + xScale(d.name) + ',' + height + ')';
            })
            .transition()
            .duration(1000)
            .delay(function (d, i) {
                return i * 500 / 3;
            })
            .attr('d', (d) => {
                let arr = [];
                let a = {};
                a.centerX = xScale.bandwidth() / 2;
                a.centerY = height - yScale(d.value);
                a.end = xScale.bandwidth();
                arr.push('M ' + a.centerX);
                arr.push(' ');
                arr.push(0);
                arr.push(' L' + a.centerX * 2);
                arr.push(' ');
                arr.push(a.centerY);
                arr.push(' ');
                arr.push('L 0 ');
                arr.push(a.centerY);
                arr.push(' Z');
                return arr.join('');
            })
            .attr('transform', (d) => {
                return 'translate(' + xScale(d.name) + ',' + yScale(d.value) + ')';
            })
            .attr('fill', (d, i) => {
                return colorList[i];
            });
    }

    render() {
        return (
            <div id="basicDemo3"
                 className="basic-demo">
                <h3>D3基础图表三</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://juejin.im/post/5893e419128fe10058d08e94">掘金</a>
                </p>
            </div>
        );
    }
}

export default BasicDemo3;