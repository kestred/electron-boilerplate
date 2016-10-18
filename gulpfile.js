const gulp       = require('gulp');
const gulpif     = require('gulp-if');
const livereload = require('gulp-livereload');
const preprocess = require('gulp-preprocess');
const child      = require('child_process');

const paths = {
  dest: 'app',
  html: ['src/**/*.html'],
  css: ['src/**/*.css'],
  ts: ['src/**/*.ts', 'src/**/*.tsx']
};

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(gulpif(process.env.NODE_ENV === 'production', preprocess()))
    .pipe(gulp.dest(paths.dest))
    .pipe(livereload());
});

gulp.task('css', function() {
  gulp.src(paths.css)
    .pipe(gulp.dest(paths.dest))
    .pipe(livereload());
});

gulp.task('typescript', function(callback) {
  child.exec('node_modules/.bin/tsc', function(err, stdout, stderr) {
    if(stdout) console.log(stdout);
    if(stderr) console.log(stderr);
    callback(err);
  });
});

gulp.task('build', ['html', 'css', 'typescript']);

gulp.task('start', ['build'], function(callback) {
  livereload.listen();
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.ts, ['typescript']);

  const electron = child.spawn('node_modules/.bin/electron', ['app'], {stdio: 'inherit'});
  electron.on('exit', function(err) {
    setTimeout(function() { process.exit() });
    callback(err);
  });
});

gulp.task('default', ['start']);
