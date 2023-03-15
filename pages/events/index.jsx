import React from "react";
import EventList from "../../components/EventList";
import { getAllEvents } from "../../dummy-data";
import EventSearch from "../../components/event-detail/event-search";
import { useRouter } from "next/router";

const AllEvents = ({allEvents}) => {
  const router = useRouter();

  const onFindEventHandler = (year, month) =>
  {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventSearch onSearch={onFindEventHandler}/>
      <EventList items={allEvents} />
    </>
  );
};

export default AllEvents;

export const getStaticProps = async () => {
  const response = await fetch(
    "https://sales-c4869-default-rtdb.firebaseio.com/events.json"
  );

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

  return {
    props: {
      allEvents: transformedData,
    },
  };
};

