import useSWR from 'swr'

const API = "https://sales-c4869-default-rtdb.firebaseio.com/events.json"



export const getAllEvents = async() => {
    const response = await fetch(
API      );
    
      const data = await response.json();
    
      const transformedData = [];
    
      for (let key in data) {
        transformedData.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
          location: data[key].title,
          date: data[key].date,
          image: data[key].image,
          isFeatured: data[key].isFeatured,
        });
      }

      return transformedData;
}

export const getFilteredEvents = async (dateFilter) => {
    const allEvents = await getAllEvents();
    const { year, month } = dateFilter;
  
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
}
export const getFeaturedEvents = async() => {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}

export const getEventById = async(eventId) => {
    const allEvents = await getAllEvents();
    return allEvents.find((item) => item.id == eventId)
}

export const getAllPaths = async() =>
{
    const allEvents = await getFeaturedEvents();
    const id = allEvents.map(item => item.id);

    return id.map((id) => ({
      params: { eventId: id },
    }));
}

