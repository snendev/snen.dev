/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { Link } from "../../../deps/react-router-dom.tsx";

import { Layer, Block, Highlight } from "../theme.tsx"
import cx from "../classnames.ts"

import readMarkdown, { Node } from "./api/readMarkdown.ts"

function renderChild(child: Node) {
  return <MarkdownNode node={child} />
}

interface AsideBlockProps { childNodes: Node[] }

function AsideBlock({ childNodes }: AsideBlockProps): JSX.Element {
  const [ isOpen, setIsOpen ] = React.useState(false)

  const heading = childNodes[0]?.tag === "heading" ? childNodes[0] : null
  const nodes = heading === null ? childNodes : childNodes.slice(1)

  function toggleOpen() {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  return (
    <Layer
      backgroundColor="surface"
      headerLeft={heading ? (
        <div className="cursor-pointer" onClick={toggleOpen} aria-role="button">
          {renderChild(heading)}
        </div>
      ) : null}
    >
      <Block>
        <div className={cx("collapsible", isOpen ? undefined : "collapsed")}>
          {nodes.map(renderChild)}
        </div>
        <div
          aria-role="button"
          className={cx("cursor-pointer", "icon", "fa", "fa-solid", isOpen ? "fa-chevron-up" : "fa-chevron-down")}
          onClick={toggleOpen}
        />
      </Block>
    </Layer>
  )
}

interface MarkdownNodeProps {
  node: Node
}

function MarkdownNode({ node }: MarkdownNodeProps): JSX.Element | null {
  switch (node.tag) {
    case "heading": {
      const {level, children} = node
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      return (
        <Tag>
          {children.map(renderChild)}
        </Tag>
      )
    }
    case "link": {
      const { url, children } = node
      const isLocalLink = (
        url.startsWith("/") || url.startsWith("./") || url.startsWith("../")
      ) && !url.startsWith('/git')
      return isLocalLink
        ? (
          <Link to={url}>
            {children.map(renderChild)}
          </Link>
        )
        : (
          <a href={url}>
            {children.map(renderChild)}
          </a>
        )
    }
    case "image": {
      const { url, children } = node
      const textChild = children.at(0)
      const content = textChild?.tag === "text" && textChild.content || ""
      return <img src={url} alt={content} />
    }
    case "codeBlock": {
      const { kind, language, children } = node
      return (
        <pre>
          <Layer>
            <Block>
              <code>
                {children.map(renderChild)}
              </code>
            </Block>
          </Layer>
        </pre>
      )
    }
    case "paragraph": {
      const { children } = node
      return (
        <p>
          {children.map(renderChild)}
        </p>
      )
    }
    case "blockQuote": {
      const { children } = node
      return (
        <AsideBlock childNodes={children} />
      )
    }
    case "list": {
      const { children } = node
      return (
        <ul>
          {children.map(renderChild)}
        </ul>
      )
    }
    case "listItem": {
      const { children } = node
      return (
        <li>
          {children.map(renderChild)}
        </li>
      )
    }
    case "table": {
      const { children } = node
      return (
        <table>
          {children.map(renderChild)}
        </table>
      )
    }
    case "tableHead": {
      const { children } = node
      return (
        <th>
          {children.map(renderChild)}
        </th>
      )
    }
    case "tableRow": {
      const { children } = node
      return (
        <tr>
          {children.map(renderChild)}
        </tr>
      )
    }
    case "tableCell": {
      const { children } = node
      return (
        <td>
          {children.map(renderChild)}
        </td>
      )
    }
    case "emphasis": {
      const { children } = node
      return (
        <em>
          {children.map(renderChild)}
        </em>
      )
    }
    case "strong": {
      const { children } = node
      return (
        <strong>
          {children.map(renderChild)}
        </strong>
      )
    }
    case "strikethrough": {
      const { children } = node
      return (
        <s>
          {children.map(renderChild)}
        </s>
      )
    }
    case "text": {
      const { content } = node
      return <>{content}</>
    }
    case "code": {
      const { content } = node
      return (
        <Highlight backgroundColor="accent">
          <code>{content}</code>
        </Highlight>
      )
    }
    case "html": {
      const { content } = node
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }
    default: return null
    // case "footnoteReference": {}
    // case "footnoteDefinition": {}
  }
}

// TODO: consider somehow attaching preview CSS
// const clampedCss = "clamp-text-3-lines"
function getPreviewNodes(childNodes: Node[], limitSections: number): Node[] {
  const nodes = limitSections === undefined ? childNodes : childNodes.slice(0, limitSections);
  if (nodes[nodes.length - 1].tag === "heading") {
    return nodes.slice(0, nodes.length - 1);
  }
  return nodes
}

interface MarkdownProps {
  slug: string
  limitSections?: number
}

export default function Markdown({ slug, limitSections }: MarkdownProps) {
  const { children } = readMarkdown(slug)
  const nodes = React.useMemo(() =>
    limitSections
      ? getPreviewNodes(children, limitSections)
      : children,
    [children, limitSections],
  )
  return (
    <>
      {nodes.map((childNode) => (
        <MarkdownNode node={childNode} />
      ))}
    </>
  );
}
