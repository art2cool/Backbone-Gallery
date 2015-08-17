requirejs.config({

	deps: ['app'],

	paths: {
		'jquery' : './lib/jquery-1.9.1.min',
		'underscore' : './lib/underscore-min',
		'backbone'   : './lib/backbone-min',
		'bootstrap'   :'./lib/bootstrap.min',
		'handlebars'  : './lib/handlebars'
		
	},
	shim: {
		'backbone' : {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'

		},
		'handlebars': {
			exports: 'Handlebars'
		}
	}

});