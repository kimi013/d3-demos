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
        /**
         * d3.schemeCategory10:
         * https://github.com/d3/d3-scale-chromatic/blob/master/README.md#categorical
         */
        const colorList = d3.schemeCategory10;

        const width = 400,
            height = 400;

        /**
         * init svg, selection类型
         */
        const svg = d3.select('#basicDemo1')
            .append('svg')
            .attr('width', 600)
            .attr('height', 600)
            .attr('class', 'ckt_svg_barChart');

        /**
         * x轴刻度 - 种类
         * 返回值是函数
         */
        const xScale = d3.scaleBand()
            .rangeRound([0, width])

            // padding设置的值相当于占1step的比例
            // 其中step为band最左边到相邻band最左边的距离
            .paddingInner(0.3)
            .paddingOuter(0.3)
            .domain(data.map(function (d) {
                return d.name;
            }));


        /**
         * y轴比例尺 - 数值
         * 返回值是函数
         */
        const yScale = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, d3.max(data.map(function (d) {
                return d.value + 30;
            }))]);

        // group
        const group = svg.append('g')
            .attr('transform', 'translate(40, 40)');

        /**
         * 添加x轴
         * xAxis是selection类型
         * selection.call方法:
         * https://github.com/d3/d3-selection/blob/master/README.md#selection_call
         */
        const xAxis = group.append('g')
            .attr('class', 'xAxis_barChart')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(d3.axisBottom(xScale));


        // 添加y轴
        const yAxis = group.append('g')
            .attr('class', 'yAxis_barChart')
            .call(d3.axisLeft(yScale));


        // 渲染柱子
        group.selectAll('.bar')

            // 关联数据
            .data(data)
            .enter()

            // 添加柱子
            .append('rect')
            .attr('class', 'bar')

            // 柱子的x位置
            .attr('x', function (d) {
                return xScale(d.name);
            })

            // 柱子的y位置，暂时设置为最底部
            .attr('y', height)

            // 柱子的高度，暂时设置为1
            .attr('height', 1)

            // 柱子的宽度
            .attr('width', xScale.bandwidth())

            // 填充颜色
            .attr('fill', function (d, i) {
                return colorList[i];
            })

            // 设置动画
            .transition()
            .duration(1000)
            .delay(function (d, i) {
                return i * 500 / 3;
            })

            // 重新设置一次高度，产生动画效果
            .attr('height', function (d) {
                return height - yScale(d.value);
            })

            // 重新设置一次y位置，产生动画效果
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
