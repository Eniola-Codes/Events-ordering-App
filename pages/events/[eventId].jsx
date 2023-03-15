import React from "react";
import EventSummary from "../../components/event-detail/event-summary";
import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/error-alert/error-alert";
import Button from "../../components/Ui/Button";

const EventDetails = () => {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <>
        <ErrorAlert>
          return <p>Theres no event.</p>;
        </ErrorAlert>
        <Button>Go Back</Button>
      </>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </>
  );
};

export default EventDetails;

const getData = async () =>
{
  
}

export const getStaticProps = async (context) => {
  const { params } = context;

  const eventId = params.eventId;
  console.log(eventId);

  return {
    props: {
      event: "boy",
    },
  };
};

export const getStaticPaths = async () => {
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

  const id = transformedData.map(item == item.id);

  const pathWithParams = id.map((id) => ({
    params: { eventId: id },
  }));

  return {
    paths: pathWithParams,
    fallback: false,
  };
};
