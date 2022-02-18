/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { Link } from "../../../deps/react-router-dom.tsx";

import { Block, Layer } from "../theme.tsx";
import cx from "../classnames.ts"

interface MiniCardProps {
  to: string;
  title: string;
  label: string;
}

export default function MiniCard({
  to,
  title,
  label,
}: MiniCardProps) {
  return (
    <Link to={to} className={cx("mini-card", "button-link")} >
      <Layer className="card">
        <Block additionalDepth={1}>
          <h4>{title}</h4>
          <p>{label}</p>
        </Block>
      </Layer>
    </Link>
  );
}
