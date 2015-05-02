var ListView = Backbone.View.extend({

	template: Handlebars.compile(
		'<div style="width:600px">{{#each models}}<div style="width:150px"><a href="#/slides/{{attributes.name}}">'+
		'{{attributes.note}}<img src="images/{{attributes.img}}" class="img-polaroid" /></a>'+
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