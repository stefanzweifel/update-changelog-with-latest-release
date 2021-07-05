import {modifyChildren} from "unist-util-modify-children";

export function replacePlaceholderWithChange(ast, markdownToPaste) {
    return function (ast) {
        modifyChildren(function (node, index, parent) {
            if (node.type === 'html' && node.value === '<!-- Content should be placed here -->') {
                parent.children.splice(index, 1, markdownToPaste);
                return index + 1;
            }
        })(ast);
    }
}