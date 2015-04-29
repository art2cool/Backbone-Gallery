var ListCollections = Backbone.Collection.extend({
	comparator: 'name',
	model: SlideModel,
	url: '/slides'
});