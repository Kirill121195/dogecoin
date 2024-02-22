"use strict";

import gulp from "gulp";
import prettier from "gulp-prettier";

gulp.task('prettier', () => {
	return gulp.src(['./src/**/*.js', './src/**/*.html', './src/**/*.scss', './src/**/*.sass', './src/**/*.pug'])
		.pipe(prettier()) // Указывает на использование настроек из файла .prettierrc
		.pipe(gulp.dest(file => file.base));
});