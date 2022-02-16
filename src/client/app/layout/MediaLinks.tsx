/** @jsx React.createElement */
import React from "../../../deps/react.ts";

import { useThemeMode } from "../theme.tsx"
import cx from "../classnames.ts"

interface MediaLinkProps {
  children: React.ReactNode
  href: string
}

function MediaLink({ children, href }: MediaLinkProps): JSX.Element {
  const mode = useThemeMode()
  return (
    <div className="block-5">
      <a href={href} target="_blank" className={cx("media-link", mode)}>
        {children}
      </a>
    </div>
  )
}

export default function Navbar() {
  return (
    <section>
      <address>
        <MediaLink href="https://twitter.com/snendev">
          <span className={cx("icon", "twitter-icon", "fab", "fa-brands", "fa-twitter")} />
          <span className="twitter-handle-text">@snendev</span>
        </MediaLink>
        <MediaLink href="https://github.com/snendev">
          {/* https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/downloads/twitter-external-brand-guidelines-01272021.pdf */}
          <span className={cx("icon", "fab", "fa-brands", "fa-github")} />
          <span>@snendev</span>
        </MediaLink>
        <MediaLink href="mailto:me@snen.dev">
          <span className={cx("icon", "fa", "fa-solid", "fa-envelope")} />
          <span>me@snen.dev</span>
        </MediaLink>
        <MediaLink href="/feed">
          <span className={cx("icon", "icon-padding", "fa", "fa-solid", "fa-rss")} />
          <span>RSS</span>
        </MediaLink>
      </address>
    </section>
  );
}
