let gulp  = require("gulp");
let uncss = require("gulp-uncss");
let browserSync = require("browser-sync");
let htmlmin = require("gulp-htmlmin");

let xvx = "node_modules/xvx/css/xvx.min.css";

gulp.task("server", function () {
	browserSync({
		server: {
			dir: "./"
		}
	})
});

gulp.task("css", function () {
	return gulp.src(xvx)
		.pipe(uncss({
			html: ['index.html']
		}))
		.pipe(gulp.dest("assets/stylesheets"))
});

gulp.task("min:html", function () {
	return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});

gulp.task("default", ["server", "min:html"], function () {
	gulp.watch("./index.html", ["css", "min:html", browserSync.reload]);
});
