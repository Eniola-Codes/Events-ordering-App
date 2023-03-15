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
const events = await getAllEvents();

  return {
    props: {
      allEvents: events,
    },
    revalidate : 30
  };
};

