/**
 * 动态进度条
 * 来源: https://juejin.im/post/5a81a8946fb9a06334266f05
 * Created by liuyang on 2018/2/27.
 */
import React, {
    Component
} from 'react';
import * as d3 from 'd3';

class DynamicLoadingBar extends Component {
    componentDidMount() {
        // 渐变颜色函数
        const colorLinear = d3.scaleLinear()
            .domain([0, 100])
            .range(['#eee685', '#ee3b3b']);

        const svg = d3.select('#dynamicLoadingBar')
            .append('svg')
            .attr('width', 600)
            .attr('height', 600);

        /**
         * create a new arc generator
         * https://github.com/d3/d3-shape/blob/master/README.md#arc
         */
        const arcGenerator = d3.arc()
            .innerRadius(80)       // 内径
            .outerRadius(100)      // 外径
            .startAngle(0);        // 起始角度，暂不设置结束角度

        const picture = svg.append('g')
            .attr('transform', 'translate(300, 300)');

        const background = picture.append('path')
        // selection.datum方法
        // https://github.com/d3/d3-selection/blob/master/README.md#selection_datum
            .datum({
                endAngle: 2 * Math.PI
            })
            .style('fill', '#fdf5e6')
            .attr('d', arcGenerator);

        const foreground = picture.append('path')
            .datum({
                endAngle: Math.PI / 2
            })
            .style('fill', /*'#2ef4ff'*/'red')
            .attr('d', arcGenerator);

        const dataText = picture.append('text')
            .text(12)
            // svg中text元素的属性
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', '38px');


        // d3.interval方法
        // 类似于setInterval
        // https://github.com/d3/d3-timer/blob/master/README.md#interval
        d3.interval(function () {
            foreground.transition()
                .duration(750)

                // transition.attrTween方法
                // https://github.com/d3/d3-transition/blob/master/README.md#transition_attrTween
                // todo ?
                .attrTween('d', function (d) {

                    // d3.interpolate方法，返回一个函数
                    // https://github.com/d3/d3-interpolate/blob/master/README.md#interpolate'
                    // todo ?
                    const compute = d3.interpolate(
                        d.endAngle,
                        Math.random() * Math.PI * 2
                    );

                    return function (t) {
                        d.endAngle = compute(t);

                        const data = d.endAngle / Math.PI / 2 * 100;

                        // 设置数值
                        d3.select('text')
                            .text(data.toFixed(0) + '%');

                        // 将新参数传入，生成新的圆弧构造器
                        return arcGenerator(d);
                    };
                })

                // transition.styleTween方法
                // https://github.com/d3/d3-transition/blob/master/README.md#transition_styleTween
                // todo ?
                .styleTween('fill', function (d) {
                    return function (t) {
                        const data = d.endAngle / Math.PI / 2 * 100;
                        // 返回数值对应的色值
                        return colorLinear(data);
                    }
                });
        }, 2000);


        // 水平进度条
        d3.interval(function () {
            d3.select('#slider')
                .transition()
                .duration(1000)
                .attrTween('width', function () {
                    const i = d3.interpolate(20, 400),
                        ci = d3.interpolate('#2394f5', '#bdf436'),
                        that = this;

                    return function (t) {
                        that.style.width = i(t) + 'px';
                        that.style.background = ci(t);
                    };
                });
        }, 1500);
    }


    render() {
        return (
            <div id="dynamicLoadingBar"
                 className="basic-demo">
                <h3>动态滚动条</h3>
                <p className="sub-title">
                    来源：
                    <a href="https://juejin.im/post/5a81a8946fb9a06334266f05">掘金</a>
                </p>
                <div id="slider"
                     style={{
                         width: 20,
                         height: 20,
                         background: '#2394f5',
                         margin: 15
                     }}></div>
            </div>
        )
    }
}

export default DynamicLoadingBar;
