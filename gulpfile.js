// Variables -----------------------------------------------------------------------------------------------------------
var gulp = require ('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');



// End of Variables ----------------------------------------------------------------------------------------------------


// Declarations --------------------------------------------------------------------------------------------------------
gulp.task('watch', function(){
   gulp.watch(['./scss/*.scss'], ['sass-process']);
   gulp.watch(['./js/*.js'], ['uglify']);
   gulp.watch(['./build/*.js', './build/*.css', 'index.html']).on('change', browserSync.reload);
});
//This task watchs files for changes, and reloads the browser page when a change has been made and saved. -------

gulp.task('uglify', function(){
   gulp.src('./js/*.js')
   .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
   .pipe(uglify())
   .pipe(gulp.dest('./build'));
});
//This task ugilifies the javascript file, and stores it in the build/js folder. --------

gulp.task('browserSync', function(){
   browserSync.init({
      server: {
         baseDir:'./'
      }
   });
});
//This task runs browserSync on it's own. --------

gulp.task('sass-process', function(){
   gulp.src('./scss/main-style.scss')
   .pipe(sass())
   .pipe(autoprefixer({
      browsers: ['last 2 versions']}))
   .pipe(gulp.dest('./build'))
   .pipe(minifyCSS())
   .pipe(rename('style.min.css'))
   .pipe(gulp.dest('./build'));
});
//This task takes a SASS file, adds vender prefixes, compiles it, minifies it, and stores it in the build/css folder. --------


//End of Declarations --------------------------------------------------------------------------------------------------


// Function Calls ------------------------------------------------------------------------------------------------------
gulp.task('default', ['watch', 'browserSync']);


//End of Function Calls ------------------------------------------------------------------------------------------------
