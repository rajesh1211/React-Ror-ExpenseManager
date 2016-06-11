var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-clean-css');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');

gulp.task('build-css', function() {
  var sassStream = gulp.src('app/assets/stylesheets/*.scss')
      .pipe(sass())
      .pipe(concat('sass-files.scss'))

  var cssStream = gulp.src('vendor/assets/stylesheets/bootstrap/css/bootstrap.css')
      .pipe(concat('css-files.css'))      
  
  // stdout.write(cssStream);
  var jqueryuiStream = gulp.src('vendor/assets/stylesheets/jquery-ui.css')
      .pipe(concat('jqueryui.css'))
  // stdout.write(jqueryuiStream);
  var mergeStream = merge(cssStream,sassStream,jqueryuiStream)
      .pipe(concat('styles.css'))
      .pipe(minify())
      .pipe(gulp.dest('public/assets/stylesheets/'))
  return mergeStream;
})

gulp.task('build-js', function() {


  var mergeStream = gulp.src([  
                                
                                'public/assets/javascripts/build/tile.js',      
                                'public/assets/javascripts/build/row.js',
                                'public/assets/javascripts/build/table.js',
                                'public/assets/javascripts/build/form.js',
                                'public/assets/javascripts/build/summary.js',
                                'public/assets/javascripts/build/expense.js',
                                'public/assets/javascripts/build/main.js',
                                'public/assets/javascripts/build/confirm.js',
                                'public/assets/javascripts/build/responseMessage.js'
                            ])
    .pipe(uglify())
    .pipe(concat('application.js'))
    .pipe(gulp.dest('public/assets/javascripts/'));

 return mergeStream;   
});

gulp.task('watch', function() {
  gulp.watch(['app/assets/stylesheets/*.scss'], ['build-css']);
})