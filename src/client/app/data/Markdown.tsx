/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { Link } from "../../../deps/react-router-dom.tsx";
import { Token, tokens as parseTokens } from "../../../deps/rusty-markdown.ts";

import { Layer, Block, Highlight } from "../theme.tsx"
import cx from "../classnames.ts"

type Tag =
  | "paragraph"
  | "blockQuote"
  | "list"
  | "listItem"
  | "footnoteDefinition"
  | "table"
  | "tableHead"
  | "tableRow"
  | "tableCell"
  | "emphasis"
  | "strong"
  | "strikethrough"

type LeafTag =
  | "text"
  | "code"
  | "html"
  | "footnoteReference"

interface RootNode {
  tag: "root";
  children: Node[];
}
interface BasicNodeData {
  tag: Tag;
}
interface HeaderNodeData {
  tag: "heading";
  level: number
}
interface ResourceNodeData {
  tag: "link" | "image"
  kind: "inline" | "email" | "reference" | "collapsed" | "shortcut" | "autolink"
  title: string
  url: string
}
interface CodeBlockNodeData {
  tag: "codeBlock";
  kind: "indented" | "fenced";
  language?: string;
}
type TreeNodeData = BasicNodeData | HeaderNodeData | ResourceNodeData | CodeBlockNodeData
type TreeNode = TreeNodeData & { children: Node[] }
interface LeafNode {
  tag: LeafTag
  content: string
}

type Node = LeafNode | TreeNode
type NodePointer = number[]

function isLeafNode(node: Node): node is LeafNode {
  const {tag} = node
  return tag === "text" || tag === "code" || tag === "html" || tag === "footnoteReference"
}

function getNodeAt(tree: RootNode, pointer: NodePointer): Node | null {
  return pointer.reduce<Node | null>(
    (currentNode, nextChildIndex) => {
      if (!currentNode) return null
      if (!isLeafNode(currentNode)) {
        return currentNode.children[nextChildIndex] ?? null
      }
      return null
    },
    tree as unknown as Node,
  )
}

function setNodeAt(tree: RootNode, pointer: NodePointer, node: Node | LeafNode): void {
  const childIndex = pointer[pointer.length - 1] ?? 0
  const parentNode = getNodeAt(tree, pointer.slice(0, pointer.length - 1))
  if (!parentNode) return
  if (isLeafNode(parentNode)) throw new Error("<Markdown>: Something has gone horribly wrong.")
  parentNode.children[childIndex] = node
}

function makeStartTokenNode(token: TreeNodeData): TreeNode {
  return {...token, children: []}
}

function reduceTokenTree(
  [tree, pointer]: [RootNode, NodePointer],
  token: Token,
): [RootNode, NodePointer] {
  switch (token.type) {
    // node-defining tokens
    // "start" implies a new child node
    // this means spawning a new sibling with children
    case "start": {
      const { type: _, ...data } = token
      const newNode: Node = makeStartTokenNode(data)
      setNodeAt(tree, pointer, newNode)
      pointer.push(0)
      return [tree, pointer]
    }
    // "end" means traverse up to the parent node
    case "end": {
      // just go up a level
      pointer.pop()
      // then increment
      const currentIndex = pointer.pop()
      if (currentIndex === undefined) {
        throw new Error("<Markdown>: Something has gone horribly wrong!")
      }
      pointer.push(currentIndex + 1)

      return [tree, pointer]
    }
    // contentful tokens
    case "text":
    case "code":
    case "html": {
      const newNode: LeafNode = {
        tag: token.type,
        content: token.content,
      };
      setNodeAt(tree, pointer, newNode);
      const lastIndex = pointer.pop() ?? -1;
      pointer.push(lastIndex + 1);
      break;
    }
    // ignorable tokens
    case "footnoteReference":
    case "taskListMarker":
    case "softBreak":
    case "hardBreak":
    case "rule": {
      break;
    }
    default: throw new Error(`Unexpected markdown token: ${token}`)
  }
  return [tree, pointer]
} 

function makeRoot(): RootNode { 
  return {tag: "root", children: []}
}

function renderMarkdown(markdown: string): RootNode {
  const tokens = parseTokens(markdown, {
    strikethrough: true,
    footnotes: false,
    smartPunctuation: true,
  })
  // fold the event loop into a tree of content
  const [ tree ] = tokens.reduce<[RootNode, NodePointer]>(
    reduceTokenTree,
    [makeRoot(), [0]],
  )
  return tree
}

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
      return url.startsWith("/") || url.startsWith("./") || url.startsWith("../")
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

interface MarkdownProps {
  source: string
}

export default function Markdown({ source }: MarkdownProps) {
  const { children } = React.useMemo(() => renderMarkdown(source), [source])

  return (
    <>
      {children.map((childNode) => (
        <MarkdownNode node={childNode} />
      ))}
    </>
  );
}
