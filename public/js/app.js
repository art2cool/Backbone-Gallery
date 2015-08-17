define([
// lib
	'backbone',
	
//deps
	'./models/slide_models',
	'./collections/list',
	'./views/list_view',
	'./views/slide_form',
	'./views/slide_view',
	'./views/slideshow'


	], 
function (Backbone, SlideModel, ListCollections, ListView, SlideForm, SlideView, SlideShowView) {

var AppRouter = Backbone.Router.extend({
	routes: {
		"": "list",
		"slides/new": "slideForm",
		"slides/:slide": "slideDetails",
		"show" : "slideShow"
	},

	initialize: function () {
		this.list = new ListCollections();
		this.list.fetch();

		this.slideModel = new SlideModel();
		this.slideView = new SlideView({
			model: this.slideModel
		});

		this.listView = new ListView({ collection: this.list });
		
		this.slideForm = new SlideForm({ model: new SlideModel(), collection: this.list} );

		this.slideShow = new SlideShowView({ collection: this.list });
		},

	list: function () {
		$('#app').html(this.listView.render().el);

	},

	slideForm: function () {

		$('#app').html(this.slideForm.render().el);
		var namefile = 'alliance.png';
		var upload = new AjaxUpload('#userfile', { 
			action: '/api/photo', 
		onSubmit : function(file, extension){ 
			namefile = '' + file;
			$('input[name="url"]').val(namefile.substring(0,namefile.length-4));
			$('input[name="img"]').val(namefile);
			$('#file_holder').empty();
			$('#file_holder').prepend("<span> Uploading ..... " + namefile + " </span>");

			upload.setData({'file': file}); 
		}, 
		onComplete : function(file, response){ 
			$('#file_holder').empty();
			$('#file_holder').prepend("<h5>"+namefile+" Uploaded </h5>");
			$('#file_holder').prepend("<img src='/images/"+namefile+"' class='img-thumbnail' style='max-width:300px;' alt='picture'>");
			} 
		});
	},
	slideDetails: function (slide) {
		this.slideView.model = this.list.get(slide)
		$('#app').html(this.slideView.render().el);
	},

	slideShow: function () {

		$('#app').html(this.slideShow.render().el);
	}
	});

	var app = new AppRouter();
	


	$(function() {
		Backbone.history.start();
	});

}); 