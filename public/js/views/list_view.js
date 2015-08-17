define([
//lib
	'backbone',
	'handlebars',
	//dep
	
	'../app'
	], function (Backbone, Handlebars, app) {

	var ListView = Backbone.View.extend({

		template: Handlebars.compile(
			'<div class="row">{{#each models}}<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6"><a href="#/slides/{{attributes.name}}">'+
			'{{attributes.name}}<img src="images/{{attributes.img}}" class="img-thumbnail"/></a>'+
			'</div>{{/each}}' +
			'</div>'
		),
		initialize: function () {
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, "add", this.render);
			this.listenTo(this.collection, "remove", this.render);
		},
		render: function () {
			console.log('render list');
			this.$el.html(this.template(this.collection));
			return this;
		}

	});
	return ListView;

});