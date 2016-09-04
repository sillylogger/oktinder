'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var cssmodule = require('css-modulesify');

var path       = require('path');
var fs         = require('fs-extra');
var liveServer = require('live-server');

var opts = {
  entries: "./js/app.js",
  debug: true
};

var b, once = false;

function bundle() {
  if(!once) {
    b.transform("babelify", { presets: ["es2015", "react"] })

    b.plugin(require('css-modulesify'), {
      rootDir: __dirname,
      output: './output/app.css'
    });

    once = true;
  }

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest("./output"));
}

gulp.task('js', function(){
  b = browserify(opts);
  b.on('log', gutil.log);
  b.on('update', bundle);
  b.on('error', gutil.log.bind(gutil, 'Browserify Error'))
  return bundle();
});

gulp.task('js:watch', function(){
  b = watchify(browserify(opts));
  b.on('log', gutil.log);
  b.on('update', bundle);
  b.on('error', gutil.log.bind(gutil, 'Browserify Error'))
  return bundle();
});


gulp.task('serve', function() {
  var templateLocation = path.join('template.html');
  var template = fs.readFileSync(templateLocation, 'utf8');

  var data = fs.readFileSync(path.join('..', 'updates.json'));
  var result = template.replace(/\{data\}/, data);

  fs.writeFile(path.join('index.html'), result);

  liveServer.start({
    port: 4321,
    root: '.',
    watch: ['output'],
    ignore: ['js', 'node_modules'],
    file: 'index.html'
  });

  console.log('Running on http://0.0.0.0:4321');
});


