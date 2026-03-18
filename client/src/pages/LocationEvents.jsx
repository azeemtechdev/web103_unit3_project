import React, { useState, useEffect } from 'react';
import { getLocationById } from '../services/location';
import { getEventsByLocation } from '../services/events';
import Event from '../components/Event';
import '../css/LocationEvents.css';

const LocationEvents = ({ locationId }) => {
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchLocationAndEvents = async () => {
      const locationData = await getLocationById(locationId);
      setLocation(locationData);

      const eventsData = await getEventsByLocation(locationId);
      setEvents(eventsData);
    };

    fetchLocationAndEvents();
  }, [locationId]);

  if (!location) {
    return <div>Loading...</div>;
  }

  // This JSX now uses the class names from your original CSS file
  return (
    <div className="location-events">
      <header>
        <div className="location-image">
            <img style={{width:"300px"}} src={location.image_url} alt={location.name} />
        </div>
        <div className="location-info">
          <h1>{location.name}</h1>
          <p>{location.description}</p>
        </div>
      </header>

      <main>
        {events.length > 0 ? (
          events.map(event => <Event key={event.id} event={event} />)
        ) : (
          <p>No events scheduled for this location at the moment.</p>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;