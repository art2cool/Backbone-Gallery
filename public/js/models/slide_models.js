define([
// lib
	'backbone',
//deps

	], function (Backbone) {
	
var SlideModel = Backbone.Model.extend({
	urlRoot: '/slides',
		defaults: {
			name: 'empty',
			note: 'kiss you wife',
			img: 'alliance.png',
		
		}
	}); 

return SlideModel;
}); 