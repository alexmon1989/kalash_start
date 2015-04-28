module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // LESS to CSS
        less: {
            development: {
                options: {
                    paths: ["dev/assets/less"]
                },
                files: {
                    "dev/assets/css/custom.css": "dev/assets/less/custom.less"
                }
            }
        },

        // Минификация и объединение css
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            target: {
                files: {
                    'dev/assets/css/styles.min.css': [
                        'dev/assets/plugins/bootstrap/css/bootstrap.min.css',
                        'dev/assets/css/style.css',
                        'dev/assets/plugins/animate.css',
                        'dev/assets/plugins/line-icons/line-icons.css',
                        'dev/assets/css/custom.css'
                    ]
                }
            }
        },

        // Минификация индексного файла для production
        htmlmin: {
            main: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dev/index.min.html': 'dev/index.html'
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'dev/assets/js/scripts.min.js': [
                        'dev/assets/plugins/jquery/jquery.min.js',
                        'dev/assets/plugins/jquery/jquery-migrate.min.js',
                        'dev/assets/plugins/back-to-top.js',
                        'dev/assets/plugins/backstretch/jquery.backstretch.min.js',
                        'dev/assets/js/custom.js'
                    ]
                }
            }
        },

        // Очистка dist
        clean: ["dist"],

        // Сборка проекта в dist
        copy: {
            main: {
                files: [
                    {src: ['dev/index.min.html'], dest: 'dist/index.html'},
                    {src: ['dev/favicon.png'], dest: 'dist/favicon.png'},
                    {src: ['dev/assets/css/styles.min.css'], dest: 'dist/assets/css/styles.min.css'},
                    {src: ['dev/assets/plugins/font-awesome/css/font-awesome.min.css'], dest: 'dist/assets/plugins/font-awesome/css/font-awesome.min.css'},
                    {src: ['dev/assets/img/krasnodar.jpg'], dest: 'dist/assets/img/krasnodar.jpg'},
                    {src: ['dev/assets/img/vladikavkaz.jpg'], dest: 'dist/assets/img/vladikavkaz.jpg'},
                    {src: ['dev/assets/img/products.png'], dest: 'dist/assets/img/products.png'},
                    {src: ['dev/assets/img/bg/header.jpg'], dest: 'dist/assets/img/bg/header.jpg'},
                    {src: ['dev/assets/img/bg/bg.jpg'], dest: 'dist/assets/img/bg/bg.jpg'},
                    {src: ['dev/assets/js/scripts.min.js'], dest: 'dist/assets/js/scripts.min.js'},
                    {src: ['dev/assets/plugins/font-awesome/css/font-awesome.min.css'], dest: 'dist/assets/plugins/font-awesome/css/font-awesome.min.css'},
                    {src: ['dev/assets/plugins/font-awesome/fonts/fontawesome-webfont.woff'], dest: 'dist/assets/plugins/font-awesome/fonts/fontawesome-webfont.woff'},
                    {src: ['dev/assets/plugins/font-awesome/fonts/fontawesome-webfont.ttf'], dest: 'dist/assets/plugins/font-awesome/fonts/fontawesome-webfont.ttf'}
                ]
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['less', 'cssmin', 'htmlmin', 'uglify', 'clean', 'copy']);
    grunt.registerTask('dist', ['clean', 'copy']);

};