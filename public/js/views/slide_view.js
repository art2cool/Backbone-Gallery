var SlideView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div style="width:400px;">' +
		'<h1>{{name}}</h1>' +
		'<p><span class="label">{{note}}</span></p>' +
		'<img src="images/{{img}}" class="img-polaroid" />' +
		'</div>'+
	'<p></p>' +
	'<button type="button" class="btn btn-danger confirm-delete">Delete</button>'
	),
	initialize: function () {
		this.listenTo(this.model, "change", this.render);

	},
	

	deleteItem: function () {
		this.model.destroy(
			{
				success: function (model) {
					app.list.remove(model.get('id'));
					app.navigate("", {trigger: true} );
				}
			}
		);
	},
	render: function () {
		this.$el.html(this.template(this.model.attributes));
		this.delegateEvents({
			'click .btn-danger': 'deleteItem'
		});
	
		return this;
	},

});