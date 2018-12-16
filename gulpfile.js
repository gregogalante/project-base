var babelify = require('babelify')
var gulp = require('gulp')
var rename = require('gulp-rename')
var cssSass = require('gulp-sass')
var cssAutoprefixer = require('gulp-autoprefixer')
var jsBro = require('gulp-bro')
var jsUglify = require('gulp-uglify')
var imgImagemin = require('gulp-imagemin')
var imgCache = require('gulp-cache')
var merge = require('merge-stream')

var browserSync = require('browser-sync').create()

var jsSource = './src/js/main.js'
var cssSources = [
  './src/css/main.scss'
]

// Development tasks:
// //////////////////////////////////////////////////////////////////

// Deafult task
gulp.task('default', function () {
  // init browserify
  browserSync.init({
    server: './src'
  })

  // watch sass files **
  gulp.watch('./src/css/**/*', ['css'])
  // watch js files **
  gulp.watch('./src/js/**/*', ['js'])

  // watch sass files for autoreload
  gulp.watch('./src/css/*').on('change', browserSync.reload)
})

// CSS tasks
gulp.task('css', function () {
  return gulp.src(cssSources)
  .pipe(cssSass().on('error', cssSass.logError))
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('./src/css'))
})

// JS tasks
gulp.task('js', function () {
  return gulp.src(jsSource)
  .pipe(jsBro({
    transform: [
      babelify.configure({ presets: ['@babel/env'] })
    ]
  }))
  .pipe(rename('main.min.js'))
  .pipe(gulp.dest('./src/js'))
})

// Build tasks:
// //////////////////////////////////////////////////////////////////

// Build task
gulp.task('build', ['build_css', 'build_js', 'build_img', 'build_copy'])

// Build CSS tasks
gulp.task('build_css', function () {
  return gulp.src(cssSources)
  .pipe(cssSass({outputStyle: 'compressed'}))
  .pipe(cssAutoprefixer())
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('./build/css'))
})

// Build JS tasks
gulp.task('build_js', function () {
  return gulp.src(jsSource)
  .pipe(jsBro({
    transform: [
      babelify.configure({ presets: ['@babel/env'] })
    ]
  }))
  .pipe(jsUglify())
  .pipe(rename('main.min.js'))
  .pipe(gulp.dest('./build/js'))
})

// Build IMG tasks
gulp.task('build_img', function () {
  return gulp.src('src/images/**/*')
    .pipe(imgCache(imgImagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/images'))
})

// Copy static files
gulp.task('build_copy', function () {
  var files = gulp.src('./src/*')
    .pipe(gulp.dest('./build'))
  var fonts = gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./build/fonts'))
  var extra = gulp.src('./src/extra/**/*')
    .pipe(gulp.dest('./build/extra'))
  return merge(files, fonts, extra)
})
