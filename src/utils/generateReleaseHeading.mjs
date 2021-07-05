import {u} from 'unist-builder';

export function generateReleaseHeading(repository_url, previous_version, latest_version, release_date) {
    return u('heading', {
        depth: 2
    }, [
        u('link', {
            url: `${repository_url}/compare/${previous_version}...${latest_version}`
        }, [
            u('text', latest_version)
        ]),
        u('text', ` - ${release_date}`)
    ]);
}