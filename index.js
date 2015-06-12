'use strict';

/**
 * Add raw xml to the config.xml file.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  12 June 2015
 */

// module dependencies
var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    Config = require('cordova-config');

// export the module
module.exports = function(xml) {

    var project;

    return through.obj(function(file, enc, cb) {
        project = file;

        // Pipe the file to the next step
        this.push(file);

        cb();
    }, function(cb) {
        try {
            // Load the config.xml file
            var config = new Config(path.join(project.path, 'config.xml'));

            // Adds the raw xml to the config
            config.addRawXML(xml);
            
            // Write the config file
            config.write(function() {
				// Call the callback
				cb();
			});
        }
        catch(err) {
            // Return an error if something went wrong while parsing
            cb(new gutil.PluginError('gulp-cordova-xml', err.message));
        }
    });
};
