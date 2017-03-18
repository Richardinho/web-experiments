module.exports = function(grunt) {
	grunt.initConfig({
  	htmlbuild : {

			dist : {
				src : 'index.html',
				dest : 'dist/',
				options : {
					scripts : {
						libs : 'libs/*.js',
						app : 'app/*.js',
						main : 'main.js'
					},
					styles : {
						libs : [
							'css/lib1.css'
						],
						app: 'css/app.css'
					}
	
				}
			}



		}	
	});
	grunt.loadNpmTasks('grunt-html-build');

	//  grunt.registerTask('', []);
}
