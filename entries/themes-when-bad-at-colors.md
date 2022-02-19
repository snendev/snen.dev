# Seriously, colors are hard.

While building this site I came upon an interesting problem: I'm really bad at color stuff. More accurately, I have no practice or experience whatsoever working to make reasonable color palettes, so figuring out how to get a functional design for this site was challenging. To help out, I set some constraints for myself and built a tool that let me "debug" my color scheme. This brief article will go through the decisions I made and what I learned in the process.

## Exposition

Here's the thing: It's not that I don't know anything about colors. Up to this point, I've studied plenty of theoretical ideas about accessibility and contrast ratios, themes and theming systems in React, and other motifs in the neighborhood of "things about color in web design".

But in practice, when I wanted _this thing to be blue_, all the blues I pick look bad. I struggled to place colors, too, not knowing whether this should be the header, or the gutter, or the background...

I had used plenty of tools to try to build reasonable palettes. [coolors.co](https://coolors.co/) is really useful. A lot of this work was actually inspired by the time I spent playing around in [palettte](https://palettte.app/). I had even tried just hand-baking [figma](https://www.figma.com/) mocks. However, exploring and iterating with these tools can take a long time, and I ran into the same issues when I would bring these palettes back to the site. Even if I knew how to use the tools, without having practice actually _designing for color_, it wasn't going to look good.

Eventually, I reasoned that it would try to build something to help me "debug" my colors. If I could edit the page live, with the help of some specific structures and some nice math, I was sure I could iterate fast enough to _at worst_ stumble upon something half-decent. Plus, the quicker I could iterate, the more I could poke around, visualize, and explore ideas; the more I could practice and learn.

At time of writing, that currently looks something like this:

![A development screenshot of the theme explorer.](/theme-explorer-dev-photo.png)

And hopefully by the time you read this, the website looks a little prettier. :)

## Thinking with Themes

First, I needed to solve the engineering side of this. I already knew some techniques for building "theme-rich" UI components in React, and so I started by creating some structures around these techniques. (These can be found in the [`theme.tsx`](/git/snen.dev/tree/main/src/client/app/theme.tsx) file in the site's source code.) Once the theme was integrated into my components, React could decide itself what the particular shade of any given hue it should use in each case.

I also had to pick my colors, so I had to build some controls to tweak the theme live. These are usable on this website at the [theme-explorer](/theme-explorer), so feel free to go mess with it!

### Hues

I opted to think about my colors in HSL units, which makes it very easy to gauge contrast ratios. There might be pros and cons to that. I don't know. I just feel more comfortable with math than my eyeballs. Anyway, armed with the unit of a "hue", I figured I would need about 4 hues:

- a theme-defining "primary" color --> blue
- an "accent" color for capturing the reader's attention --> green
- a "surface" color for providing colorful backdrops --> purple
- a "warning" color for errors and other "unhappy path" states --> red

These hues would each need a few shades.

### Shades

I also wanted to support a light and a dark theme, so I searched for resources on best practices related to "theming" principles to help streamline and constrain my designs. The most useful resource I found was [material design's dark theme guide](https://material.io/design/color/dark-theme.html#behavior); reading that helped me break down how I wanted to use greyscale shades, before worrying about colors. I also used the [Accessibility Developer Guide](https://www.accessibility-developer-guide.com/introduction/) which had some nice resource (and, usefully, described best practices for minimum contrast ratios).

I decided to use two sets of shades for each hue, one set for light shades and one for dark shades. I would also manage a set of dark-grey shades and a set of light-grey shades. My reasoning was that by separating these, it is easy to define light and dark themes: in dark mode, the dark shades are the "base" colors and the light shades are the "contrast" colors; in light mode, the reverse.

Now that I knew how many (and what type) of colors I wanted, I built controls in the [theme-explorer](/theme-explorer) to match. From there, I figured, I could use the same ideology behind [palettte](https://palettte.app/) to make a reasonable theme: pick a few saturations and lightnesses, interpolate, and tweak. The theme explorer playground is basically just this, although I don't have the convenient interpolation step.

## Conclusion

At the end of the day, it might not be perfect, but I think it's at least _legible_, which is a good place to start.

That's all for this one. I like to build tools that help me think about problems and learn things better. Hopefully this inspires you to do the same, and if you struggle with certain design concepts like me, I hope you can build tools that help you learn too.

If you want to look at the code for this project, check it out on the [github](/git/snen.dev/tree/main/src/client/app/pages/tech/themes/ThemePlayground.tsx).
