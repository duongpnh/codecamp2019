import React from 'react';
import Navigation from './Navigation'
import { BrowserRouter as Router, HashRouter } from 'react-router-dom'
import Content from '../components/Content'
import './App.scss'
import history from '../history'

const App = () => {
    return (
        <HashRouter history={history}>
            <Navigation />
            <Content />
        </HashRouter>
    );
}

export default App;
