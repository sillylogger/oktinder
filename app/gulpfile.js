'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var chalk = require('chalk');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var cssmodule = require('css-modulesify');

var path       = require('path');
var fs         = require('fs-extra');
var liveServer = require('live-server');

function prepareBundler({ watch = false } = {}) {
  var options = { debug: true };
  if(watch) {
    options = Object.assign(options, watchify.args)
  }

  var b = browserify("./js/app.js", options);
  b.transform("babelify", { presets: ["es2015", "react"] })
  b.plugin(cssmodule, {
    rootDir: __dirname,
    output: './output/app.css'
  });

  if(watch) {
    b.plugin(watchify);
    b.on('log', gutil.log);
    b.on('update', () => bundle(b) );
  }

  return b;
}

function bundle(b) {
  return b.bundle()
          .on('error', (err) => gutil.log(chalk.red(err.name) + ': ' + chalk.yellow(err.message)))
          .pipe(source('app.js'))
          .pipe(buffer())
          .pipe(gulp.dest("./output"));
}

gulp.task('compile', function(){
  var bundler = prepareBundler();
  return bundle(bundler);
});

gulp.task('watch', function(){
  var bundler = prepareBundler({ watch: true });
  return bundle(bundler);
});

gulp.task('package', function() {
  var templateLocation = path.join('template.html');
  var template = fs.readFileSync(templateLocation, 'utf8');

  var data = fs.readFileSync(path.join('..', 'updates.json'));
  var result = template.replace(/\{data\}/, data);

  fs.writeFile(path.join('index.html'), result);
});

gulp.task('serve', function() {
  liveServer.start({
    port: 4321,
    root: '.',
    watch: ['output'],
    ignore: ['js', 'node_modules'],
    file: 'index.html'
  });

  console.log('Running on http://0.0.0.0:4321');
});

gulp.task('default', ['compile', 'package', 'serve']);

