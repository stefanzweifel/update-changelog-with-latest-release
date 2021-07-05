import {u} from 'unist-builder';

/**
 * Generate 2nd-level heading used for "Unreleased"
 * @param repository_url
 * @param latest_version
 * @returns {{type: "heading", children: ({type: "link"} & {url: string})[]} & {depth: number}}
 */
export function generateUpdatedUnreleasedHeading(repository_url, latest_version) {
    return u('heading', {
        depth: 2
    }, [
        u('link', {
            url: `${repository_url}/compare/${latest_version}...HEAD`
        }, [
            u('text', 'Unreleased')
        ]),
    ]);
}