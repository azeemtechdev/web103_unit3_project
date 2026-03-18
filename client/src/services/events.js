import api from './api';

export const getEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const getEventsByLocation = async (locationId) => {
  try {
    const response = await api.get(`/events/location/${locationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching events for location ${locationId}:`, error);
    return [];
  }
};