import _ from 'underscore';

export function updateUnreleasedUrl(currentUrl, latestRelease) {
    let parsedUrl = new URL(currentUrl);
    let arrayOfPathnames = parsedUrl.pathname.split('/');
    let versionToHead = _.last(arrayOfPathnames);

    let versionToReplace = versionToHead.substr(0, versionToHead.indexOf('...HEAD'));

    return currentUrl.replace(versionToReplace, latestRelease);
}