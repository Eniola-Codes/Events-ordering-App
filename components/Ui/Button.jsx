import React from "react";
import Link from "next/link";
import classes from "./Button.module.css";

const Button = (props) => {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
