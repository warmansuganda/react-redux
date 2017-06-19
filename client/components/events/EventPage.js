import React from 'react';

import NavigationBar from '../NavigationBar';
import EventForm from './EventForm';

class EventPage extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div className="jumbotron">
                    <EventForm />
                </div>
            </div>
        );
    }
}

export default EventPage;