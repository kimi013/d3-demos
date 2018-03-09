/**
 * 路由
 * Created by liuyang on 2018/2/26.
 */
import React, {
    Component
} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import Loadable from 'react-loadable';

/**
 * 加载中组件
 */
class Loading extends Component {
    render() {
        return (
            <h3>Loading...</h3>
        );
    }
}

// 基础图表一
const BasicDemo1 = Loadable({
    loader: () => import('../components/basicDemo1'),
    loading: Loading
});

// 基础图表二
const BasicDemo2 = Loadable({
    loader: () => import ('../components/basicDemo2'),
    loading: Loading
});

// 基础图表三
const BasicDemo3 = Loadable({
    loader: () => import ('../components/basicDemo3'),
    loading: Loading
});

// 动态滚动条
const DynamicLoadingBar = Loadable({
    loader: () => import ('../components/dynamicLoadingBar'),
    loading: Loading
});

// area chart
const AreaChart = Loadable({
    loader: () => import ('../components/areaChart'),
    loading: Loading
});

// line chart
const LineChart = Loadable({
    loader: () => import ('../components/lineChart'),
    loading: Loading
});

// bivariate area chart
const BivariateAreaChart = Loadable({
    loader: () => import ('../components/bivariateAreaChart'),
    loading: Loading
});

// multi-series line chart
const MultiSeriesLineChart = Loadable({
    loader: () => import ('../components/multiSeriesLineChart'),
    loading: Loading
});

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div className="content-container">
                    <ul className="nav-sidebar"
                        style={{
                            minHeight: window.innerHeight
                        }}>
                        <li className="nav-item"><Link to="/">首页</Link></li>
                        <li className="nav-item"><Link to="/basicDemo1">基础图表一</Link></li>
                        <li className="nav-item"><Link to="/basicDemo2">基础图表二</Link></li>
                        <li className="nav-item"><Link to="/basicDemo3">基础图表三</Link></li>
                        <li className="nav-item"><Link to="/dynamicLoadingBar">动态滚动条</Link></li>
                        <li className="nav-item">
                            <a href="https://github.com/d3/d3/wiki/Gallery">官网实例汇总</a>
                        </li>
                        <li className="nav-item"><Link to="/areaChart">Area Chart</Link></li>
                        <li className="nav-item"><Link to="/lineChart">Line Chart</Link></li>
                        <li className="nav-item"><Link to="/bivariateAreaChart">Bivariate Area Chart</Link></li>
                        <li className="nav-item"><Link to="/multiSeriesLineChart">Multi-Series Line Chart</Link></li>

                    </ul>

                    <div className="router-container">
                        <Switch>
                            <Route exact path="/">
                                <h2>D3 Demos</h2>
                            </Route>
                            <Route exact path="/basicDemo1" component={BasicDemo1}/>
                            <Route exact path="/basicDemo2" component={BasicDemo2}/>
                            <Route exact path="/basicDemo3" component={BasicDemo3}/>
                            <Route exact path="/dynamicLoadingBar" component={DynamicLoadingBar}/>
                            <Route exact path="/areaChart" component={AreaChart}/>
                            <Route exact path="/lineChart" component={LineChart}/>
                            <Route exact path="/bivariateAreaChart" component={BivariateAreaChart}/>
                            <Route exact path="/multiSeriesLineChart" component={MultiSeriesLineChart}/>
                        </Switch>
                    </div>

                </div>
            </Router>
        );
    }
}

export default AppRouter;