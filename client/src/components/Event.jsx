import React from 'react';
import '../css/Event.css';

const Event = ({ event }) => {
  // Helper to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article className="event-information">
      {/* The background image */}
      <img src={event.image_url} alt={event.title} />

      {/* The overlay that slides in on hover */}
      <div className="event-information-overlay">
        <div className="text">
          <h3>{event.title}</h3>
          
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i> 
            {formatDate(event.date)} <br /> 
            {event.time}
          </p>
          
          <p className="event-description">
            {event.description}
          </p>

          {/* If you still need the time remaining logic later, it would go here */}
          {event.remaining && (
             <p id={`remaining-${event.id}`}>{event.remaining}</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default Event;