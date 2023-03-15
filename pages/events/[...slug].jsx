import React from "react";
import { useRouter } from "next/router";
import { getFeaturedEvents } from "../../dummy-data";
import EventList from "../../components/EventList";
import Button from "../../components/Ui/Button";
import ResultTitle from "../../components/results-title/results-title";
import ErrorAlert from "../../components/error-alert/error-alert";

const FilteredEvents = () => {
  const router = useRouter();

  const filteredData = router.query.slug;
  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  console.log(numYear);
  console.log(numMonth);

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <p>Input a valid filter value</p>{" "}
        <Button link="/events">Go Back</Button>
      </>
    );
  }

  const filteredEvents = getFeaturedEvents({
    year: numYear,
    month: numMonth,
  });

  console.log(filteredEvents);

  if (!filteredEvents || filteredEvents.length === 0) {
    <>
    <ErrorAlert>
      return <p>There are no events in this category.</p>;
    </ErrorAlert>
    <Button>God Back</Button>
    </>
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEvents;
