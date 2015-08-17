define([
// lib
	'backbone',
//deps
	'../models/slide_models'

	], function (Backbone, SlideModel) {
	
	var ListCollections = Backbone.Collection.extend({
		comparator: 'name',
		model: SlideModel,
		url: '/slides'
	});

	return ListCollections;
})
