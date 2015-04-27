module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Копирование минифицированного стиля bootstrap в dev
        copy: {
            main: {
                files: [
                    {src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'dev/bootstrap.min.css'}
                ]
            }
        },

        // LESS to CSS
        less: {
            development: {
                options: {
                    paths: ["dev/less"]
                },
                files: {
                    "dev/styles.css": "dev/less/styles.less"
                }
            }
        },

        // Минификация и объединение для production
        cssmin: {
            target: {
                files: {
                    'dist/styles.min.css': ['dev/bootstrap.min.css', 'dev/styles.css']
                }
            }
        },

        // Минификация индексного файла для production
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },

        // наблюдение с livereload
        watch: {
            less: {
                files: [ 'dev/less/*.less', 'dev/index.html' ],
                tasks: [ 'less' ],
                options: {
                    livereload: true
                }
            },
            'bootstrap': {
                files: [ 'bower_components/bootstrap/dist/css/bootstrap.min.css' ],
                tasks: [ 'copy' ],
                options: {
                    livereload: true
                }
            },
            'index': {
                files: [ 'dev/index.html' ],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'less', 'cssmin', 'htmlmin']);

};