var pjson = require('./package.json');
var system = require('system');
var args = system.args;

console.log( pjson.name + ' ' + pjson.version + ' by ' + pjson.author );

if ( args.length === 1 ) {
	console.log( pjson.description );
	console.log( "Usage:\n\tphantomjs " + args[0] + ' <plugin_slug> [<output_file.csv>]' );
	phantom.exit();
}

var slug = args[1];

var page = require('webpage').create();
var fs = require('fs');

var url = 'https://wordpress.org/plugins/' + slug + '/advanced/';

var csvFileName;
if ( args.length > 2 ) {
	csvFileName = args[2];
} else {
	 csvFileName = slug + '-stats.csv';
}

var headersText = '"date","version","installsActive","installsYesterday","installsTotal","issuesMonthTotal","issuesMonthResolved"';

if ( ! fs.exists( csvFileName ) ) {
	fs.write( csvFileName, headersText + "\n", 'a' );
}

console.log( 'Retrieving: ' + url );

page.open( url, function( status ) {
	if ( 'success' == status ) {
		var row = {};
		
		row.date = new Date().toISOString().split('T')[0];

		row.version = page.evaluate( function() {
			return jQuery('.widget.plugin-meta li:nth-child(1) strong').text();
		} );
		
		row.installsActive = page.evaluate( function() {
			return jQuery('.widget.plugin-meta li:nth-child(3) strong').text();
		} );
		
		row.installsYesterday = page.evaluate( function() {
			return jQuery('#plugin-download-history-stats tbody tr:nth-child(2) td').text();
		} );
		
		row.installsTotal = page.evaluate( function() {
			return jQuery('#plugin-download-history-stats tbody tr:nth-child(4) td').text();
		} );

		row.issuesMonthTotal = page.evaluate( function() {
			return jQuery('.widget.plugin-support .counter-count').text().trim().split(' out of ')[1];
		} );

		row.issuesMonthResolved = page.evaluate( function() {
			return jQuery('.widget.plugin-support .counter-count').text().trim().split(' out of ')[0];
		} );


		var rowText =
			'"' + row.date
			+ '","' + row.version
			+ '","' + row.installsActive
			+ '",' + row.installsYesterday
			+ ',' + row.installsTotal
			+ ',' + row.issuesMonthTotal
			+ ',' + row.issuesMonthResolved;

		console.log( headersText );
		console.log( rowText );

		console.log( 'Writing to: ' + csvFileName );
		fs.write( csvFileName, rowText + "\n", 'a' );

	} else {
		console.error( 'Could not retrieve page' );
		phantom.exit( 1 );
	}

	phantom.exit();

} );
