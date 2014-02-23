
// Export the module
module.exports = function(grunt) {

    var semver = require('semver');
    var detectIndent = require('detect-indent');


    // Error handler
    function handleError(error, message) {
        if (error) {
            grunt.log.error(error);
        }
        grunt.fail.warn(message || 'simple bump task has failed.');
    }



    grunt.registerTask('simple_bump', 'Super simple version bump', function () {

        var args = this.args;
        var releaseType = args[0] || 'build';
        var buildMeta = args[1];
        var configFiles = grunt.config('simple_bump')?  grunt.config('simple_bump').files : ['package.json'];
        var files = Array.isArray(configFiles) ? configFiles : [configFiles];
        // TODO: add support fo sync version between all files
//        var options = this.options({
//            sync: false
//        });
//        var sync = options.sync;



        // check for valid release type
        if (releaseType) {
            releaseType = releaseType.toLowerCase();
            if (!/^(major|minor|patch|prerelease|build)$/i.test(releaseType) && !semver.valid(releaseType)) {
                handleError(null, '"' + releaseType + '" is not a valid release type, or a semantic version.');
                return;
            }
        }

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
                // Get the filepath
                var file = grunt.file.read(filepath);
                // Get the current indentation
                var indent = detectIndent(file) || '    ';
                grunt.log.ok('Bumping "' + filepath + '":' + releaseType.magenta);

                // Get the current version
                var parsedFile = JSON.parse(file);
                var currentVersion = parsedFile.version;
                var buildNo = currentVersion.split('+')[1] || 0;
                var newVersion = '';
                currentVersion = semver.valid(currentVersion);

                grunt.log.ok('Was:', currentVersion);


                // Bump version
                if (releaseType === 'build') {
                    if (buildMeta) {
                        newVersion = currentVersion + '+' + buildMeta;
                    }
                    else {
                        buildNo++;
                        newVersion = currentVersion + '+' + buildNo;
                    }
                }
                else {
                    var suffix = buildMeta? ('+' + buildMeta) : '';
                    newVersion = semver.inc(currentVersion, releaseType) + suffix;
                }

                parsedFile.version = newVersion;
                grunt.file.write(filepath, JSON.stringify(parsedFile, null, indent));
                grunt.log.ok('Bumped to ' + newVersion.cyan);

            }
            catch(e) {
                handleError(e, 'bump failed.');
            }
        });
    });
};
