module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('test/test1.json'),
        simple_bump: {
            files: ['test/test1.json']
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('test', function (type, build) {
        var parts = ['simple_bump'];
        if (type) {
            parts.push(type);
        }
        if (build) {
            parts.push(build);
        }
        grunt.task.run('logver');
        grunt.task.run(parts.join(':'));
        grunt.task.run('logver');
    });

    grunt.registerTask('logver', function () {
        grunt.log.writeln('version: ' + grunt.config.process('<%= pkg.version %>'));
    });


    grunt.registerTask('default', ['simple_bump']);
};
