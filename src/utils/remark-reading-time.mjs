const WORDS_PER_MINUTE = 200;

const collectText = node => {
  if (!node || typeof node !== "object") return "";

  let text = "";

  if (typeof node.value === "string") {
    text += node.value + " ";
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      text += collectText(child);
    }
  }

  return text;
};

const getReadingTimeText = text => {
  const wordCount = (text.match(/\S+/g) || []).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
};

export function remarkReadingTime() {
  return function (tree, file) {
    const textOnPage = collectText(tree);
    const readingTime = getReadingTimeText(textOnPage);
    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.readingTime = readingTime;
  };
}
