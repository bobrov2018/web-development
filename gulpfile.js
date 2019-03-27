'use strict';

var gulp = require('gulp');
var gp   = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
//Очистка директории сборки

gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(gp.clean());
});

gulp.task('sass', function(){
  return gulp.src('src/sass/main.sass')
  .pipe(gp.sourcemaps.init())
  .pipe(gp.sass({}))
  .pipe(gp.autoprefixer('last 10 versions'))
  .pipe(gp.sourcemaps.write())
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.reload({
      stream: true
  }))
});

gulp.task('js', function(){
  return gulp.src('src/js/*.js' )
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.reload({
      stream: true
  }))

});
// сжатие и перенос изображений из рабочей папки в папку сборки
gulp.task('img', () =>
	 gulp.src('src/img/*')
  .pipe(gp.imagemin())
	.pipe(gulp.dest('build/img'))
  .pipe(browserSync.reload({
      stream: true
  }))
);

gulp.watch("src/*.js").on('change', browserSync.reload);

gulp.watch("./*.html").on('change', browserSync.reload);

gulp.task('watch', function(){
  gulp.watch('src/sass/**/*.sass', gulp.series('sass'))
  gulp.watch('src/img/**/*', gulp.series('img'))
  gulp.watch('src/js/**/*.js', gulp.series('js'))

});

gulp.task('default',gulp.series(
  gulp.parallel('sass','js','img'),
  gulp.parallel(['watch'],['serve'])
));
