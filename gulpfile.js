var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"), 
	plumber = require("gulp-plumber"), 
	browserSync = require("browser-sync"),
	uglifycss = require('gulp-uglifycss');


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