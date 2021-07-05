export function findHeadingWithText(searchQuery, node) {
    if (node.type !== 'heading') {
        return false;
    }
    if (node.depth !== 2) {
        return false;
    }

    return node.type === 'heading' &&
        node.depth === 2 &&
        node.children[0].type === 'link' &&
        node.children[0].children[0].value === searchQuery;
}