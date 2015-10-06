var gulp       = require('gulp');
var gutil      = require('gulp-util');
var inject     = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var watch      = require('gulp-watch');

var babelify    = require('babelify');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var assign      = require('lodash.assign');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');


var files = {
    index: './src/index.html',
    entryModules: ['./src/es6/main.js']
};
var dests = {
    js: './src/js',
    src: './src'
};
var globs = {
    js: './src/js/**/*.js'
};

function bundle(watch) {
    var browserifyOpts = {
        entries: files.entryModules,
        debug: true
    };

    var bundler;
    if (watch) {
        bundler = watchify(browserify(assign({}, watchify.args, browserifyOpts)));
    } else {
        bundler = browserify(browserifyOpts);
    }
    bundler.transform(babelify);

    function rebundle() {
        bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(dests.js));
    }

    if (watch) {
        bundler.on('update', rebundle);
    }

    bundler.on('log', gutil.log);

    rebundle();
}

gulp.task('inject:js', function() {
    return gulp
        .src(files.index)
        .pipe(inject(gulp.src(globs.js, {read: false}), {relative:true}))
        .pipe(gulp.dest(dests.src));
});

gulp.task('bundle', function() {
    return bundle(false);
});

gulp.task('bundle:watch', function() {
    return bundle(true);
});

gulp.task('serve', ['bundle:watch', 'inject:js'], function() {
    browserSync.init({
        server: {
            baseDir: dests.src
        }
    });

    watch('./src/js/bundle.js', function() {
        browserSync.reload();
    });
});

gulp.task('default', ['serve']);
