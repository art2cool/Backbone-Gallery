var ListView = Backbone.View.extend({

	template: Handlebars.compile(
		'<div style="width:150px">{{#each models}}<div><a href="#/slides/{{attributes.name}}">'+
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
		this.$el.html(this.template(this.collection));
		return this;
		console.log(app.list.toJSON());
	}

});