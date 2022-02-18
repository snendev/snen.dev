/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";

import { Block, Layer } from "../theme.tsx"

interface CardProps {
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  headerTitle: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

export default function Card({
  children,
  actionButton,
  headerTitle,
  imageSrc,
  imageAlt,
}: CardProps) {
  return (
    <article>
      <Layer
        headerTitle={headerTitle}
        className="card"
      >
        {imageSrc ? (
          <div className="card-preview-container">
            <img src={imageSrc} className="card-preview" alt={imageAlt} />
          </div>
        ) : null}
        <Block>
          {children}
        </Block>
        {actionButton ? (
          <Block>
            {actionButton}
          </Block>
        ) : null}
      </Layer>
    </article>
  );
}
