
// Export the module
module.exports = function(grunt) {

    var semver = require('semver');
    var _ = require('underscore');


    // Error handler
    function handleError(error, message) {
        if (error) {
            grunt.log.error(error);
        }
        grunt.fail.warn(message || 'simple bump task has failed.');
    }



    grunt.registerTask('simple_bump', 'Super simple version bump', function () {

        grunt.log.writeln('this.args:', this.args);

        var args = this.args;
        var releaseType = args[0] || 'build';
        var buildMeta = args[1];
        var meta = args[2];


        // check for valid release type
        if (releaseType) {
            releaseType = releaseType.toLowerCase();
            if (!/^(major|minor|patch|prerelease|build)$/i.test(releaseType) && !semver.valid(releaseType)) {
                handleError(null, '"' + releaseType + '" is not a valid release type, or a semantic version.');
                return;
            }
        }

        // Get configuration and set the options
        var options = this.options();
        var configFiles = grunt.config('simple_bump').files || 'package.json';
        var files = _.isArray(configFiles) ? configFiles : [configFiles];
        grunt.log.warn('files:', files);
        // Bump it up!
        files.filter(function(filepath) {
            // Remove nonexistent files.
            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('File "' + filepath.cyan + '" not found.');
                return false;
            } else {
                return true;
            }
        })
        .forEach(function(filepath) {
            try {
                var file = grunt.file.read(filepath);
                var meta = JSON.parse(file);
                grunt.log.writeln('try->meta', meta.version);
                grunt.log.writeln('Bumping "' + filepath.cyan + '":');
            }
            catch(e) {
                handleError(e, 'bump failed.');
            }
        });


//        var config = ['string', 'array'].indexOf(type(taskConfig)) !== -1 ? { files: taskConfig } : taskConfig;
//        var files = type(config.files) === 'array' ? config.files : [config.file || config.files];
//        var o = grunt.util._.extend({
//            dateformat: 'YYYY-MM-DD HH:mm:ss Z',
//            normalize: true,
//            updateProps: {}
//        }, config.options || {});
//        var norm = {};
//
//        if (!files.length) {
//            grunt.log.warn('Nothing to bump up.');
//            return;
//        }

        // Create an object of property setters
//        var setters = {
//            version: function (old, type, o, buildMeta) {
//                if (semver.valid(type)) {
//                    return type;
//                }
//                var oldVersion = semver.valid(old);
//                if (!oldVersion) {
//                    grunt.log.warn('Version "' + old + '" is not a valid semantic version.');
//                    return;
//                }
//                var newVersion = type !== 'build' ? semver.inc(oldVersion, type) : oldVersion;
//                if (buildMeta) {
//                    newVersion += '+' + buildMeta;
//                }
//                return newVersion;
//            }
//        };
//        Object.keys(config.setters || {}).forEach(function (key) {
//            setters[key] = config.setters[key];
//        });

        // Flip updateProps map for easier usage
//        var updatePropsMap = {};
//        Object.keys(o.updateProps).forEach(function (key) {
//            updatePropsMap[o.updateProps[key]] = key;
//        });

        // Bumpup the files
//        files.filter(function (filepath) {
//            // Remove nonexistent files.
//            if (!grunt.file.exists(filepath)) {
//                grunt.log.warn('File "' + filepath.cyan + '" not found.');
//                return false;
//            } else {
//                return true;
//            }
//        }).forEach(function (filepath) {
//            try {
//                var file = grunt.file.read(filepath);
//                var meta = JSON.parse(file);
//                var indentation = detectIndentation(file);
//
//                grunt.log.verbose.writeln('Bumping "' + filepath.cyan + '":');
//
//                // Update properties with defined setters
//                Object.keys(setters).forEach(function (key) {
//                    if (!Object.prototype.hasOwnProperty.call(meta, key)) {
//                        return;
//                    }
//
//                    var newValue;
//                    if (o.normalize && norm[key] != null) {
//                        newValue = norm[key];
//                    } else {
//                        norm[key] = newValue = setters[key](meta[key], releaseType, o, buildMeta);
//                    }
//
//                    if (newValue != null) {
//                        meta[key] = newValue;
//                        grunt.log.verbose.writeln(grunt.util.repeat(Math.max(16 - key.length, 0), ' ') + key + ' : ' + newValue);
//                    }
//                });
//
//                // Stringify new metafile and save
//                if (!grunt.file.write(filepath, JSON.stringify(meta, null, indentation))) {
//                    grunt.log.warn('Couldn\'t write to "' + filepath + '"');
//                }
//
//                // Update config property
//                if (updatePropsMap[filepath]) {
//                    grunt.config.set(updatePropsMap[filepath], meta);
//                }
//            } catch (error) {
//                failed(error, 'Bumpup failed.');
//            }
//        }, this);

//        grunt.log.writeln('Bumped to: ' + norm.version);
    });
};
