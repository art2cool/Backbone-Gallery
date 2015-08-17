define([
//lib
	'backbone',
	'handlebars'
	//dep
	
	], function (Backbone, Handlebars) {

var SlideForm = Backbone.View.extend({

	template: Handlebars.compile(
		'<div class="row">'+
		'<div class="col-lg-4 col-md-5 col-sm-6"> '+
		'<legend>New Slide Item</legend>'+
				'<input class="form-control" id="userfile"  type="file" name="userfile"  />'+
				'<div id="file_holder"></div></div>'+
		'<div class="col-lg-3 col-md-4 col-sm-5"></br></br>'+
		'<form class="form-group-md ">' +
			'<fieldset>' +
				'<input class="form-control" type="text" name="name" placeholder="Name" /><p></p>' +
				'<input class="form-control" type="text" name="note" placeholder="Note" /><p></p>' +
				'<input class="form-control" type="text" name="url" placeholder="URL" /><p></p>' +
				'<input class="form-control" type="text" name="img" placeholder="IMG" /><p></p>' +
				'<button type="button" class="btn btn-danger">Cancel</button>' +
				'<button type="button" class="btn btn-primary">Save</button>' +
			'</fieldset>' +
		'</form><div></div>'
	),

	render: function  () {
		this.$el.html(this.template());
		this.delegateEvents({
			'click .btn-primary': 'save'
		});

		return this;
	},
	save: function () {
		this.setModelData();
		var that = this;
		var data = this.model.attributes;
		this.model.save(data, 
			{
				success: function (model) {
					console.log('uoplasdfsdf');
					that.collection.add(model);
					Backbone.history.navigate('slides/' + model.get('url'), {trigger: true});
				}
			
			}
		);
		},

	setModelData: function  () {

		this.model.set({
			name: this.$el.find('input[name="name"]').val(),
			note: this.$el.find('input[name="note"]').val(),
			id: null,
			url: this.$el.find('input[name="name"]').val(),
			img: this.$el.find('input[name="img"]').val(),
		});
	}

});
return SlideForm;

});