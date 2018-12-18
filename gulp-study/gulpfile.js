var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('task-name', () => {
  // return gulp.src('source-files')
  //   .pipe(aGulpPlugin())
  //   .pipe(gulp.dest('destination'))
});

gulp.task('hello', () => {
  console.log('Hello Smith');
});

gulp.task('sass', () => {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//--- 监视文件变动 ---//
/**
 * 第一个参数 要监听的文件
 * 第二个参数 要执行的任务
 */
// gulp.watch('files-to-watch', ['tasks', 'to', 'run']);

gulp.task('watch', () => {
  gulp.watch('app/scss/**/*.scss', gulp.series('sass')); 
  // 当 html, js 文件修改时 浏览器自动重新加载
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.html', browserSync.reload);
})

//--- 构建本地服务器 ---//
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});


//--- 合并js,css文件 ---//
gulp.task('useref', () => {
  return gulp.src('app/*.html')
    .pipe(useref())
    // 仅仅压缩 js 文件
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

//--- 压缩images文件 ---//
gulp.task('images', () => {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

//--- 简单地复制文件 ---//
gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});


gulp.task('run', gulp.series('sass', gulp.parallel('watch', 'browserSync')));