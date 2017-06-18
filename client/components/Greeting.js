import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

export default () => {
    return (
        <div>
            <NavigationBar />
            <FlashMessagesList />
            <div className="jumbotron">
                <h1>Hello react from class greeting!</h1>
            </div>
        </div>
    )
}