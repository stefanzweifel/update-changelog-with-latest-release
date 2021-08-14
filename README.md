# update-changelog-with-latest-release

> Node CLI to add latest release notes to a CHANGELOG using the [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) format.

**Note:** I've rewritten this project in PHP. Checkout the [changelog-updater CLI](https://github.com/stefanzweifel/php-changelog-updater) or the [changelog-updater GitHub Action](https://github.com/stefanzweifel/changelog-updater-action).

## Usage

**⚠️ This was an experiment. Use at your own risk!**

Execute the CLI like the example below. You currently have to provide a lot of information. (The goal for the future would be to infer as much information as possible from the existing CHANGELOG.md).

```shell
node dist/index.js --repository='https://github.com/stefanzweifel/update-changelog-with-latest-release' \
    --latest-version='v1.1.0' \
    --previous-version='v1.0.0' \
    --release-date='2021-08-01' \
    --path-to-changelog='CHANGELOG.md' \
    --release-changelog='### Added
- Foo
- Bar'
```
The updated CHANGELOG is piped to stdout.

### Options
All options are currently required.

#### `--repository`
URL of the repository. Used to generate links in heading.

#### `--latest-version`
Name of the most recent version. Used to update the "Unreleased" heading.

#### `--previous-version`
Name of the version previous to the most recent version. Used to generate compare URL between latest and previous version.

#### `--path-to-changelog`
The path to your CHANGELOG.md.

#### `--release-changelog`
List of changes for the latest version. Should be a markdown string.


## Tests

> TODO


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/stefanzweifel/update-changelog-with-latest-release/tags).

## Credits

* [Stefan Zweifel](https://github.com/stefanzweifel)
* [All Contributors](https://github.com/stefanzweifel/update-changelog-with-latest-release/graphs/contributors)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
