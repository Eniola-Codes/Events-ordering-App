import React from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-utils";
import EventList from "../../components/EventList";
import Button from "../../components/Ui/Button";
import ResultTitle from "../../components/results-title/results-title";
import ErrorAlert from "../../components/error-alert/error-alert";

const FilteredEvents = (props) => {
  const router = useRouter();


  if (props.hasError) {
  return  <>
    <ErrorAlert>
     <p>There are no events in this category.</p>
    </ErrorAlert>
    <Button link="/events" className="center"> Go Back</Button>
    </>
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <>
      <ResultTitle date={date} />
      <EventList items={props.events} />
    </>
  );
};

export default FilteredEvents;


export const getServerSideProps = async (context) =>
{
  const {params} = context;
  const filteredData = params.slug;

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {props : {
      hasError : true
    }};
  }

    const filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    });

  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      props : {hasError : true}
    }
  }

  return {
    props : {
      events : filteredEvents,
      date : {
        year : numYear,
        month : numMonth,
      }
    }
  }
}