var   gulp = require('gulp');
      gutil = require('gulp-util');
      sass = require('gulp-ruby-sass');
      uglify = require('gulp-uglify'),
      minifycss = require('gulp-minify-css'),
      watch = require('gulp-watch'),
      concat = require('gulp-concat'),
      notify = require('gulp-notify'),
      connect = require('gulp-connect');


gulp.task('connect', function() {
  connect.server();
});

gulp.task('sass', function () {
	gulp.src('src/css/styles.scss')
	.pipe(sass())
	.pipe(minifycss())
	.pipe(concat("base.min.css"))
	.pipe(gulp.dest('dest/css'))
	.pipe(notify({
      	message: "Sass compiled!"
    }));
});

gulp.task('blogSass', function () {
  gulp.src('src/css/blog-header-footer.scss')
  .pipe(sass())
  .pipe(minifycss())
  .pipe(concat("blog-header-footer.min.css"))
  .pipe(gulp.dest('dest/css'))
});

gulp.task('js', function() {
  gulp.src('src/js/*.js')
  	.pipe(uglify())
  	.pipe(concat("site.min.js"))
  	.pipe(gulp.dest('dest/js'))
    .pipe(notify({
        message: "JavaScript compiled!"
    }));

});

gulp.task('watch', function() {
  	gulp.watch('src/css/styles.scss', function() {
    	gulp.run('sass');
  	});
    gulp.watch('src/css/blog-header-footer.scss', function() {
      gulp.run('blogSass');
    });

  	gulp.watch('src/js/*.js', function() {
	    gulp.run('js');
	  });
});

gulp.task('default', ['connect', 'sass', 'blogSass', 'js', 'watch']);