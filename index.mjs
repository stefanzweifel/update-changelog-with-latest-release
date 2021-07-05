import fs from 'fs';
import unified from 'unified';
import markdown from 'remark-parse';
import stringify from 'remark-stringify';
import find from 'unist-util-find';
import {modifyChildren} from 'unist-util-modify-children';
import {generateReleaseHeading} from './src/utils/generateReleaseHeading.mjs';
import {findHeadingWithText} from "./src/findHeadingWithText.mjs";
import {stringToMarkdown} from "./src/stringToMarkdown.mjs";
import {generateUpdatedUnreleasedHeading} from "./src/utils/generateUpdatedUnreleasedHeading.mjs";
import {u} from "unist-builder";
import parseArgs from 'minimist';

const args = parseArgs(process.argv.slice(2));


const REPO_URL = args['repository'];
const LATEST_VERSION = args['latest-version']
const PREVIOUS_VERSION = args['previous-version']
const RELEASE_DATE = args['release-date']
const RELEASE_CHANGELOG = args['release-changelog']
const PATH_TO_CHANGELOG = args['path-to-changelog']

// Transform Markdown String to AST
const markdownToPaste = stringToMarkdown(RELEASE_CHANGELOG);

const contents = unified()
    .use(markdown)

    // Find the Heading for the last release
    // Prepend the given Markdown and a new Heading pointing to the newest release to the LATEST_RELEASE Heading
    // Update the Unreleased Heading to point to the newest release

    .use(function () {
        return transformer;

        function transformer(tree) {
            let unreleasedHeading = find(tree, function (node) {
                return findHeadingWithText('Unreleased', node)
            })
            let updatedUnreleasedHeading = generateUpdatedUnreleasedHeading(REPO_URL, LATEST_VERSION);

            unreleasedHeading.children[0].url = updatedUnreleasedHeading.children[0].url;
        }
    })

    // Replace HTML Comment with to be pastable Markdown
    // This actually works!
    .use(function () {
        return function (ast) {
            modifyChildren(function (node, index, parent) {
                if (node.type === 'html' && node.value === '<!-- Content should be placed here -->') {
                    let versionHeading = generateReleaseHeading(REPO_URL, PREVIOUS_VERSION, LATEST_VERSION, RELEASE_DATE);

                    parent.children.splice(index, 1, markdownToPaste);
                    parent.children.splice(index, 0, versionHeading);
                    parent.children.splice(index, 0, u('html', '<!-- Content should be placed here -->'));
                    return index + 3;
                }
            })(ast);
        }
    })

    // Convert AST To Markdown again
    .use(stringify)

    // File to read
    .processSync(fs.readFileSync(PATH_TO_CHANGELOG))
    .toString();

process.stdout.write(contents);
