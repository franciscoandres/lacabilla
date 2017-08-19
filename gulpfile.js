let gulp        = require("gulp");
let uncss       = require("gulp-uncss");
let browserSync = require("browser-sync");
let htmlmin     = require("gulp-htmlmin");
let inline      = require("gulp-inline-source");

let hotline_in_node   = "node_modules/hotlinecss/css/hotline.min.css";
let hotline_in_assets = "assets/stylesheets/hotline.css";

gulp.task("server", function () {
	browserSync({
		server: {
			dir: "./"
		}
	})
});

gulp.task("uncss", function () {
	return gulp.src(hotline_in_node)
		.pipe(uncss({
			html: ['./html/index.html']
		}))
		.pipe(gulp.dest("assets/stylesheets"))
});

gulp.task("html", function () {
	return gulp.src('./html/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});

gulp.task("default", ["server", "uncss", "html"], function () {
	gulp.watch("./html/index.html", ["uncss", "html", browserSync.reload]);
});
