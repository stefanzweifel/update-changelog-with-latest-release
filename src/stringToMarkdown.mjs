import unified from "unified";
import markdown from "remark-parse";

export function stringToMarkdown(markdownString) {
    return unified()
        .use(markdown)
        .parse(markdownString)
}