const
browserSync = require('browser-sync'),
gulp = require('gulp'),
sass = require('gulp-sass'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
watch = require('gulp-watch'),
minify = require('gulp-clean-css'),
nunjucks = require('gulp-nunjucks'),
eslint = require('gulp-eslint'),
postcss = require('gulp-postcss'),
nunjucksRender = require('gulp-nunjucks-render'),
config = require('./config/tasks-config.json'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('autoprefixer'),
lost = require('lost');

gulp.task('html', function(){
    gulp.src(config.sources.views)
    .pipe(gulp.dest(config.public.views));
});

gulp.task('nunjucks', function() {
    return gulp.src(config.sources.nunjucks)
    .pipe(nunjucksRender({
        path: ['src/view/']
    }))
    .pipe(gulp.dest(config.public.views))
});

gulp.task('img', function(){
    gulp.src(config.sources.imgs)
    .pipe(gulp.dest(config.public.imgs));
});

gulp.task('javascript', function() {
    gulp.src(config.sources.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(uglify())
    .pipe(gulp.dest(config.public.scripts));
});

gulp.task('sass', function() {
    gulp.src(config.sources.styles)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(concat('empwr.min.css'))
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(minify({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.public.styles));
})

gulp.task('serve', ['html', 'sass', 'nunjucks', 'javascript'], () => {
    browserSync.init({
        open: false,
        port: 3000,
        notify: true,
        proxy: 'http://localhost:2107'
    });

    gulp.watch(config.sources.imgs, ['img']).on('change', browserSync.reload);
    gulp.watch(config.sources.views, ['html']).on('change', browserSync.reload);
    gulp.watch(config.sources.nunjucksWatch, ['nunjucks']).on('change', browserSync.reload);
    gulp.watch(config.sources.styles, ['sass']).on('change', browserSync.reload);
    gulp.watch(config.sources.scripts, ['javascript']).on('change', browserSync.reload);
});

gulp.task('default', ['sass','javascript', 'html', 'img', 'nunjucks']);


