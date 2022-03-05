/// COPIED ONLY TO BUILD FOR BROWSER
/// https://deno.land/x/rusty_markdown@v0.4.1/mod.ts
// MIT License

// Copyright (c) 2020 SrKomodo

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { Token } from "https://deno.land/x/rusty_markdown@v0.4.1/event.ts";
export type { Token };

// @deno-types="https://deno.land/x/rusty_markdown@v0.4.1/wasm/deno_rusty_markdown.d.ts"
import { html as html_, tokens as tokens_ } from "./markdown/wasm.js";

/**
 * Option object containing flags for enabling extra features that are not part
 * of the CommonMark spec.
 */
export interface Options {
  /** Enables Github flavored tables. */
  tables?: boolean;
  /**
   * Enables footnotes[^1].
   *
   * [^1]: Like this.
   */
  footnotes?: boolean;
  /** Enables strikethrough text, ~~like this~~. */
  strikethrough?: boolean;
  /** Enables Github flavored task lists. */
  tasklists?: boolean;
  /** Enables smart punctuation (turns -- into –) */
  smartPunctuation?: boolean;
}

/**
 * Encodes options to pass them to WebAssembly
 *
 * @param options - Options to encode
 * @returns Encoded options
 */

// Copyright (c) 2020 SrKomodo

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
function encodeOptions(options: Options): number {
  return (+(options.tables ?? false) << 1) +
    (+(options.footnotes ?? false) << 2) +
    (+(options.strikethrough ?? false) << 3) +
    (+(options.tasklists ?? false) << 4) +
    (+(options.smartPunctuation ?? false) << 5);
}

/** Parses the given Markdown text into a list of tokens. */
export function tokens(text: string, options: Options = {}): Token[] {
  return tokens_(text, encodeOptions(options));
}

/** Parses the given tokens into HTML. */
export function html(tokens: Token[]): string {
  return html_(tokens);
}
