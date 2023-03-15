import React from "react";
import EventSummary from "../../components/event-detail/event-summary";
import { useRouter } from "next/router";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/error-alert/error-alert";
import Button from "../../components/Ui/Button";
import { getEventById, getAllPaths} from "../../helpers/api-utils";

const EventDetails = ({event}) => {
  const router = useRouter();

  const eventId = router.query.eventId;

  if (!event) {
    return (
        <div className="center">
          <p>Loading...</p>;
        </div>
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


export const getStaticProps = async (context) => {
  const { params } = context;
  const eventId = params.eventId;

  const eventDetails = await getEventById(eventId);

  return {
    props: {
      event: eventDetails,
    },
    revalidate : 60
  };
};

export const getStaticPaths = async () => {

  const getPaths = await getAllPaths();

  return {
    paths: getPaths,
    fallback: true,
  };
};
