import React from "react";
import EventItems from "./EventItems";
import classes from './event-list.module.css'

const eventList = (props) => {
  return (
      <ul className={classes.list}>
        {props.items.map((event) => (
          <EventItems
            key={event.id}
            title={event.title}
            id={event.id}
            date={event.date}
            description={event.description}
            location={event.location}
            image={event.image}
          />
        ))}
      </ul>
  );
};

export default eventList;
