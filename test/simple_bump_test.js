
var grunt = require('grunt');

exports.simpleBump = {

    allVersions: function(test){
        var file1 = JSON.parse(grunt.file.read('test/tmp/test1.json')).version;
        var file2 = JSON.parse(grunt.file.read('test/tmp/test2.json')).version;
        var file3 = JSON.parse(grunt.file.read('test/tmp/test3.txt')).version;
        test.expect(3);
        test.strictEqual(file1, '1.1.1-1+2', 'testing file1');
        test.strictEqual(file2, '1.1.1-1+2', 'testing file2');
        test.strictEqual(file3, '1.1.1-1+2', 'testing file3');
        test.done();
    }
};
