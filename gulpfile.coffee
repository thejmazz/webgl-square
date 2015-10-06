gulp       = require 'gulp'
babel      = require 'gulp-babel'
concat     = require 'gulp-concat'
inject     = require 'gulp-inject'
sourcemaps = require 'gulp-sourcemaps'
watch      = require 'gulp-watch'

browserSync = require('browser-sync').create()
wiredep     = require('wiredep').stream


index = './src/index.html'

globs =
    es6: './src/es6/**/*.es6.js'
    js: './src/js/**/*.js'

dests =
    js: './src/js'
    src: './src'

gulp.task 'babel', ->
    return gulp
        .src(globs.es6)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dests.js))

gulp.task 'wiredep', ->
    return gulp
        .src(index)
        .pipe(wiredep())
        .pipe(gulp.dest(dests.src))

gulp.task 'inject:js', ->
    return gulp
        .src(index)
        .pipe(inject(gulp.src(globs.js, {read: false}), {relative:true}))
        .pipe(gulp.dest(dests.src))

gulp.task 'inject', ['inject:js', 'wiredep']

gulp.task 'serve', ['inject'], ->
    browserSync.init
        server:
            baseDir: dests.src
            routes:
                '/bower_components': './bower_components'

    watch globs.es6, ->
        gulp.start 'babel'

    watch globs.js, ->
        gulp.start 'inject'

gulp.task 'default', ['serve']
