var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"), 
	plumber = require("gulp-plumber"), 
	browserSync = require("browser-sync"),
	uglifycss = require('gulp-uglifycss'),
	imagemin = require('gulp-imagemin'),
	gulpSeo = require('gulp-seo');


gulp.task("test", function() {console.log("Gulp.js sprawny!");});

gulp.task("css", function() {

	gulp.src("sass/main.scss")
		.pipe(plumber())
		.pipe(sass.sync())
		.pipe(autoprefixer({
			browsers: ["last 5 version", "IE 9"]
		}))
		.pipe(uglifycss({
      		"maxLineLen": 10000,
      		"uglyComments": true
    	}))
		.pipe(gulp.dest("css"))
		.pipe(browserSync.stream());

});

gulp.task('imagemin', function() {
    gulp.src('img/*')
		.pipe(imagemin([
		    imagemin.gifsicle({interlaced: true}),
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 10}),
		    imagemin.svgo({
		        plugins: [
		            {removeViewBox: true},
		            {cleanupIDs: false}
		        ]
		    })
		]))
        .pipe(gulp.dest('img/compressed'))
});

gulp.task('seo', function() {
  return gulp.src('index.html')
  .pipe(gulpSeo({
        list: ['og', 'se', 'schema', 'twitter'],
        meta: {
            title: 'Avangers',
            description: 'Potężny Thanos zbiera Kamienie Nieskończoności w celu narzucenia swojej woli wszystkim istnieniom we wszechświecie. Tylko drużyna superbohaterów znanych jako Avengers może go powstrzymać.',
            author: 'Radoslaw Grzymala',
            keywords: [
				'Iron Man',
				'Bruce Banner',
				'Thanos',
				'Kapitan Ameryka',
				'Joss Whedon',
				'Anthony Russo',
				'Joe Russo',
				'Marvel Studios',
				'Walt Disney Studios Motion Pictures'],
            robots: {
                index: false, // true
                follow: true // true
            },
            revisitAfter: '5 month', // 3 month
            image: 'https://zapodaj.net/images/fabbe407737c2.jpg',
            site_name: 'Avangers',
            type: 'website'
 
        }
    }))
    .pipe(gulp.dest('.'));
});

gulp.task("server", function() {

	browserSync.init({
		server: "."
	});

});

gulp.task("watch", function(){

	gulp.watch("sass/**/*.scss", ["css"]);
	gulp.watch(["*.html"], browserSync.reload);

});


gulp.task("default", ["css", "server", "watch"]);