define([
//lib
	'backbone',
	'handlebars',
	//dep
	'app'

	], function (Backbone, Handlebars, app) {

var SlideView = Backbone.View.extend({
	template: Handlebars.compile(
		'<div class="row"><div class="col-lg-9 col-md-10">' +
		'<h1>{{name}}</h1>' +
		'<p><span class="label">{{note}}</span></p>' +
		'<img src="images/{{img}}" class="img-thumbnail img-responsive" />' +
		'</div></div>'+
	'<p></p>' +
	'<button type="button" class="btn btn-danger confirm-delete">Delete</button>'+
	'<button type="button" class="btn btn-primary confirm-edit">Edit</button>'
	),
	initialize: function () {
		this.listenTo(this.model, "change", this.render);

	},
	

	deleteItem: function () {
		var that = this;
		this.model.destroy(
			{
				success: function (model) {
					Backbone.history.navigate('', {trigger: true})
					//that.collection.remove(model.get('id'));
				
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
	return SlideView;
});