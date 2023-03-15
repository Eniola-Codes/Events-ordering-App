import Link from "next/link";
import Image from "next/image";
import React from "react";
import classes from "./event-item.module.css";
import Button from "./Ui/Button";
import ArrowRightIcon from  './icons/arrow-right-icon';
import DateIcon from "./icons/date-icon";
import AddressIcon from './icons/address-icon';

const eventItem = (props) => {
  const { title, id, date, location, image } = props;

  const humanReadableDate = new Date(date).toLocaleString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const explorelink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={image} alt={title}></img>
      <div className={classes.content}>
        <div className={classes.summary}>
         <h2>{title}</h2>
          <div className={classes.date}>
          <span> <DateIcon /></span><time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
          <span> <AddressIcon /></span> <address>{formattedAddress}</address>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <Button link={`/events/${id}`}>
          <span>Explore events</span>
          <span className={classes.icon}> <ArrowRightIcon /> </span>
        </Button>
      </div>
    </li>
  );
};

export default eventItem;
