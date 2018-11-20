const markdownHelpContent = 
`
This plugin supports a formating convention called
[Markdown](https://en.wikipedia.org/wiki/Markdown). It is powerful enough
to make text look nice, but yet, it is simple to use. This tab is a quick
reference for a few Markdown features.

> **Note:** Not all features of Markdown are implemented in this
plugin. For example, some of the page-level markdown features simply
do not make sense within the context of a plugin. When in doubt, try
something and see if it works!

---

#### 1 Basic Text Formatting

Markdown is pretty simple. You can pretty much just start typing and you'll
see what we mean. Just type some sentences and leave a blank line (that is, two
consecutive returns) in between paragraphs.

Inside your paragraphs, you can use markdown to style text by enclosing a
phrase with two matching runs of **a)** double-asterisks, for bold; **b)**
single-underscores, for italics; or, **c)** both. The examples, in the following
table, make this a little more obvious.

| _This Markdown Input_   | _Produces_           |
|:-----------------------:|:--------------------:|
| \`**bold**\`            |  **bold**            |
| \`_italic_\`            |  _italic_            |
| \`_**bold & italic**_\` |  _**bold & italic**_ |

---

#### 2 Headings

Heading are indicated with one or more hash symbols, \`#\`, as the first letter
in the line. The more hashes, the more subordinate the heading. For example,

_**This Markdown Input...**_

\`\`\`
# Heading
## Sub-heading
### Sub-sub-heading
#### You get the idea.
\`\`\`

_**Produces...**_

# Heading
## Sub-heading
### Sub-sub-heading
#### You get the idea.

---

#### 3 Bullet Lists

These are also rather simple. Bullet items begin with an asterisk and may be
indented to created sub-lists. For example,

_**This Markdown Input...**_

\`\`\`
* This is a bullet item.
* And a second bullet item.
  * A nested bullet item.
  * A second nested bullet item.
* Finally, we finish up the list.
\`\`\`

_**Produces...**_

* This is a bullet item.
* And a second bullet item.
  * A nested bullet item.
  * A second nested bullet item.
* Finally, we finish up the list.

---

#### 4 Numbered Lists

These work the same as bullet lists, but instead of the asterisk, use a
numeric one followed by a period, like this "\`1.\`". The number is replaced,
automatically, so you don't have to bother counting the items. For example,

_**This Markdown Input...**_

\`\`\`
1. This is a point.
1. This is another point.
  1. And some more stuff.
  1. And yet, more stuff.
1. And the last one.
\`\`\`

_**Produces...**_

1. This is a point.
1. This is another point.
  1. And some more stuff.
  1. And yet, more stuff.
1. And the last one.

---

Markdown has many features supported by this plugin but all that is far
beyond what can be contained in this little helper tab. But, we hope,
that this very short introduction will get you started.

For more  details, please see the wikipedia link, in the first paragraph. If
you'd like a little more learning support, there is a detailed
[Markdown Tutorial](https://www.markdowntutorial.com/).

Happy motoring!
`;

export default markdownHelpContent;
