import { Token, tokens as parseTokens } from "../../../../deps/rusty-markdown.ts";

import suspendData from "./suspendData.ts";

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

export type Node = LeafNode | TreeNode
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

export default function readMarkdown(
  slug: string
): RootNode {
  const pathname = `/entries/${slug}.md`;
  return suspendData(
    pathname,
    async () => {
      const response = await fetch(pathname);
      const text =  await response.text();
      return renderMarkdown(text);
    },
  );
}
