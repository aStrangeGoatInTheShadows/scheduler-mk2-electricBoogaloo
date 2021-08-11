import React from "react";
import classNames from "classnames/bind";

import "components/DayListItem.scss";

// This generates one specific day for the list on left hand side bar
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
    <li
      className={dayListItemClass}
      onClick={() => {
        props.setDay(props.name);
      }}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
