const moment = require('moment');
const markdownItLinkAttr = require('markdown-it-link-attributes');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
moment.locale('en');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
let Nunjucks = require("nunjucks");
module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight); 
  // Find and copy any image, maintaining directory structure.
  eleventyConfig.addPassthroughCopy("./src/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("./src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("./src/**/*.png");
  
  // Markdown
  eleventyConfig.setLibrary(
    "md",
    require("markdown-it")("commonmark")
    .use(require("markdown-it-attrs"
    ))
    .use(markdownItLinkAttr, {
      // Make external links open in a new tab.
      pattern: /^https?:\/\//,
      attrs: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    })
  );
  // Options for the `markdown-it` library
  const markdownItOptions = {
    html: true,
  };
  // This object is required inside the renderPermalink function.
  // It's copied directly from the plugin source code.
  const position = {
    false: "push",
    true: "unshift",
  }

  // Copied directly from the plugin source code, with one edit
  // (marked with comments)
  
  const renderPermalink = (slug, opts, state, idx) => {
    const space = () =>
      Object.assign(new state.Token("text", "", 0), {
        content: " ",
      })

    const linkTokens = [
      Object.assign(new state.Token("link_open", "a", 1), {
        attrs: [
          ["class", opts.permalinkClass],
          ["href", opts.permalinkHref(slug, state)],
        ],
      }),
      Object.assign(new state.Token("html_block", "", 0), {
        // Edit starts here:
        content: `<span aria-hidden="true" class="hover:underline text-pink-500">$</span>
        
        `,
        // Edit ends
      }),
      new state.Token("link_close", "a", -1),
    ]

    if (opts.permalinkSpace) {
      linkTokens[position[!opts.permalinkBefore]](space())
    }
    state.tokens[idx + 1].children[position[opts.permalinkBefore]](
      ...linkTokens
    )
  }
  // Options for the `markdown-it-anchor` library
  const markdownItAnchorOptions = {

    permalink: true,
    renderPermalink
  };

  const markdownLib = markdownIt(markdownItOptions).use(
    markdownItAnchor,
    markdownItAnchorOptions
  )


  eleventyConfig.setLibrary("md", markdownLib)
  // Customize Nunjucks Environment
  // this helps with the rendering of posts as lists, and not as code
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/_includes"),
    {
      lstripBlocks: true,
      trimBlocks: true
    }
  );
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
  });

  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

  // Folders to copy to output folder
  // eleventyConfig.addPassthroughCopy("src/styles");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    templateFormats: ["md", "njk"],
    // htmlTemplateEngine: "njk"
  }
};

function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent')) {
    console.warn('Failed to extract excerpt: Document has no property "templateContent".');
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  // The start and end separators to try and match to extract the excerpt
  const separatorsList = [
    { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
    { start: '<p>', end: '</p>' }
  ];

  separatorsList.some(separators => {
    const startPosition = content.indexOf(separators.start);

    // This end position could use "lastIndexOf" to return all the paragraphs rather than just the first
    // paragraph when matching is on "<p>" and "</p>".
    const endPosition = content.indexOf(separators.end);

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
      return true; // Exit out of array loop on first match
    }
  });

  return excerpt;
}

