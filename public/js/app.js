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
		
		this.slideForm = new SlideForm({model: new SlideModel()});
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

					$('#file_holder').empty();
					$('#file_holder').prepend("<span> Uploading ..... " + namefile + " </span>");

					upload.setData({'file': file}); 
				}, 
				onComplete : function(file, response){ 
					$('#file_holder').empty();
					$('#file_holder').prepend("<h5>"+namefile+" Uploaded </h5>");
					$('#file_holder').prepend("<img src='/images/"+namefile+"' class='img-polaroid' style='max-width:200px;' alt='picture'>");
				} 
			});

		},
	slideDetails: function (slide) {
		this.slideView.model = this.list.get(slide);
		$('#app').html(this.slideView.render().el);
	},

	slideShow: function () {
		$('#app').html('slideShow');
	}
});

var app = new AppRouter();



$(function() {
	Backbone.history.start();
});