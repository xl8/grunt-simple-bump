[![Build Status](https://travis-ci.org/xl8/grunt-simple-bump.png?branch=master)](https://travis-ci.org/xl8/grunt-simple-bump)

# grunt-simple-bump
-------------------------------

> Super simple version bump for grunt.

grunt-simple-bump is a super simple version bumping utility. no fancy stuff, minimal as possiable, just bump a version;


## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-simple-bump --save-dev
```

Add this line to your project's `Gruntfile.coffee`:

```js
grunt.loadNpmTasks 'grunt-simple-bump'
```

## The "simple_bump" task

### Overview
In your project's Gruntfile, add a section named `simple_bump`.

```js
grunt.initConfig({
        simple_bump: {
            files: ['package.json', 'component.json', 'somefile.txt']
        }
    });
    
```

## Usage

```js
grunt simple_bump
```
By default, the *build* version is bumped.
You can specify a different release type bump in 1st argument:
```js
grunt simple_bump:[releaseType]
```
And the build meta suffix in 2nd argument:
```js
grunt simple_bump:[releaseType]:[buildmeta]
```
Available release types are:

- **major**: Will bump the major `x.0.0` part of a version string.
- **minor**: Will bump the minor `0.x.0` part of a version string.
- **patch**: Will bump the patch `0.0.x` part of a version string.
- **prerelease**: Will bump the prerelease `0.0.0-x` part of a version string.
- **build**: Tells bumpup that you are changing only the buildmeta suffix and nothing else should be modified.
- 
Full possible version format: `major.minor.patch-prerelease+buildmeta`
The prerelease part is appended only in **prerelease** bump type, and removed when present in **major**, **minor**, or **patch** bumps.

The `buildmeta` suffix has to be passed manually:
```shell
grunt simple_bump:[releaseType]:123
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## Issues
Please use the [github issues list](https://github.com/xl8/grunt-coffeelinter/issues) to report any issues. If possible, please include a link to an open github repo with the smallest failing example of your issue. Even better, fork the project, create a failing test case and issue a pull request with the issue number referenced in the pull request. Super better, fork the project create a failing test case, fix the problem, and issue a pull request with the test and fix referencing the issue number. 
