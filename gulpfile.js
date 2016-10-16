// Project-base by G.Galante

// @@ GULPFILE Dependencies
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

var gulp = require('gulp')

// Dependencies gulp plugin css
var css_sass = require('gulp-sass')
var css_autoprefixer = require('gulp-autoprefixer')

// Dependencies gulp plugin js
var js_concat = require('gulp-concat')
var js_babel = require('gulp-babel')
var js_uglify = require('gulp-uglify')

// Dependencies gulp plugin images
var img_imagemin = require('gulp-imagemin')
var img_cache = require('gulp-cache')

// Others
var browserSync = require('browser-sync').create()
var merge = require('merge-stream')

// @@ GULPFILE Tasks
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Deafult task
gulp.task('default', function () {
  console.log('Welcome to project base')
  // Init browserify
  browserSync.init({
    server: './src'
  })
  // Watch sass files **
  gulp.watch('./src/css/**/*', ['css'])
  // Watch js files **
  gulp.watch('./src/js/**/*', ['js'])
  // Watch everything for autoreload
  gulp.watch('./src/**/*').on('change', browserSync.reload)
})

// @@ GULPFILE CSS-Tasks
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// CSS tasks
gulp.task('css', function () {
  return gulp.src('./src/css/main.scss')
  .pipe(css_sass().on('error', css_sass.logError))
  .pipe(gulp.dest('./src/css'))
})

// @@ GULPFILE JS-Tasks
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// JS tasks
gulp.task('js', function () {
  return gulp.src(['./src/js/vendor/*.js', './src/js/custom.js'])
  .pipe(js_concat('main.js'))
  .pipe(js_babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./src/js'))
})

// @@ GULPFILE Build-Tasks
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

gulp.task('build', ['build_css', 'build_js', 'build_img', 'build_copy'])

// CSS tasks
gulp.task('build_css', function () {
  return gulp.src('./src/css/main.scss')
  .pipe(css_sass({outputStyle: 'compressed'}))
  .pipe(css_autoprefixer())
  .pipe(gulp.dest('./build/css'))
})

// JS tasks
gulp.task('build_js', function () {
  return gulp.src(['./src/js/vendor/*.js', './src/js/custom.js'])
  .pipe(js_concat('main.js'))
  .pipe(js_babel({
    presets: ['es2015']
  }))
  .pipe(js_uglify())
  .pipe(gulp.dest('./build/js'))
})

// IMG tasks
gulp.task('build_img', function () {
  return gulp.src('src/images/**/*')
    .pipe(img_cache(img_imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/images'))
})

// Others files
gulp.task('build_copy', function () {
  var files = gulp.src('./src/*')
    .pipe(gulp.dest('./build'))
  var fonts = gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./build/fonts'))
  var icons = gulp.src('./src/icons/**/*')
    .pipe(gulp.dest('./build/icons'))
  return merge(files, fonts, icons)
})
