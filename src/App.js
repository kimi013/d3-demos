import React, {
    Component
} from 'react';
import AppRouter from './router/index';
import './App.scss';

class App extends Component {
    render() {
        return (
            <AppRouter/>
        );
    }
}

export default App;