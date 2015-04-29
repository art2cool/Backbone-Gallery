var SlideForm = Backbone.View.extend({

	template: Handlebars.compile(
		
		'<legend>New Slide Item</legend>'+
				'<div class="control-group"><input id="userfile"  type="file" name="userfile"  />'+
				'<div id="file_holder"></div></div>'+

		'<form class="form-horizontal">' +
			'<fieldset>' +
				 '<div class="control-group">' +
					'<input type="text" name="name" placeholder="Name" />' +
				'</div>' +
				'<div class="control-group">' +
					'<input type="text" name="note" placeholder="Note" />' +
				'</div>' +
				'<div class="control-group">' +
					'<input type="text" name="url" placeholder="URL" />' +
				'</div>' +
				'<button type="button" class="btn btn-danger">Cancel</button>' +
				'<button type="button" class="btn btn-primary">Save</button>' +
			'</fieldset>' +
		'</form>'
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
	this.model.save(this.model.attributes, 
		{
			success: function (model) {
				app.list.add(model);
				app.navigate('slides/' + model.get('url'), {trigger: true});
			}
		}
	);
	},

	setModelData: function  () {

		
		
		this.model.set({
			id: null,
			name: this.$el.find('input[name="name"]').val(),
			note: this.$el.find('input[name="note"]').val(),
			url: this.$el.find('input[name="url"]').val(),
			//img: this.$el.find('input[name="userfile"]').val()
		});
	//	console.log(this.model.get('img'));
	}

});

