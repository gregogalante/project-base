var gulp = require('gulp')

// Dependencies
var sass = require('gulp-sass')

// Deafult task
gulp.task('default', function () {
  console.log('Welcome to project base')
  // Watch sass files ** gulp-sass
  gulp.watch('./css/**/*.scss', ['sass'])
})

// Sass tasks
gulp.task('sass', function () {
  return gulp.src('./css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
})
