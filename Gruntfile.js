module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('test/fixtures/test1.json'),
        simple_bump: {
            files: ['test/tmp/test1.json', 'test/tmp/test2.json', 'test/tmp/test3.txt']
        },

        nodeunit: {
            tests: ['test/*.js']
        },

        clean: {
            test: ['test/tmp']
        }

    });


    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Setup a test helper to test bump in some files.
    grunt.registerTask('copy', 'Copy fixtures to a temp location.', function() {
        grunt.file.copy('test/fixtures/test1.json', 'test/tmp/test1.json');
        grunt.file.copy('test/fixtures/test2.json', 'test/tmp/test2.json');
        grunt.file.copy('test/fixtures/test3.txt', 'test/tmp/test3.txt');
    });


    grunt.registerTask('test', [
        'copy',
        'simple_bump:major',
        'simple_bump:minor',
        'simple_bump:patch',
        'simple_bump:prerelease',
        'simple_bump:prerelease',
        'simple_bump',
        'simple_bump:build',
        'nodeunit',
        'clean:test'
    ]);
    grunt.registerTask('default', ['test']);

};
