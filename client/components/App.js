import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 

import routes from '../routes';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Router>{routes}</Router>
            </div>
        );
    }
}

export default App;