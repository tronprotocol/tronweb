module.exports = function(grunt) {

    grunt.initConfig({
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            dev: {
                singleRun: false,
                autoWatch: true
            },
            prod: {
                singleRun: true
            }
        }
    });

    // Automatically load in all Grunt npm tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
