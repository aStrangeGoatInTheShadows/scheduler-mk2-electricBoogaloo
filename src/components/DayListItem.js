import React from "react";
import classNames from "classnames/bind";

import "components/DayListItem.scss";
import { tsPropertySignature } from "@babel/types";

export default function DayListItem(props) {
  const formatSpots = () => {
    if (!props.spots) {
      return "no spots remaining";
    }

    if (props.spots === 1) {
      return "1 spot remaining";
    }

    return `${props.spots} spots remaining`;
  };

  let dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  return (
    <li className={dayListItemClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
