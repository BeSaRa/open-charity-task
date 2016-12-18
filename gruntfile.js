module.exports = function (grunt) {


    // grunt config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // uglify task configuration

        uglify: {
            build: {
                options: {
                    beautify: false,
                    sourceMap: true
                },
                src: ['src/js/*.js'],
                dest: 'build/js/script.js'
            }
        },
        sass: {
            build: {
                options: {
                    sourceMap: true,
                    outputStyle:'expanded'
                },
                files: {
                    'build/css/style.css': 'src/css/style.scss'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['uglify:build']
            },
            css : {
                files:  ['src/css/*.scss'],
                tasks : ['sass:build']
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'sass' , 'watch']);
};