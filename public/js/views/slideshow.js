var SlideShowView = Backbone.View.extend({
	template1: Handlebars.compile(
	'<div align="center">'+
		'<div id="player" class="img-polaroid" style=" margin-top: 10px; width: 400px; height:210px">'+
//			'<div><img class="img-polaroid" src="images/{{attributes.img}}" style="max-width:400px; max-height:200px;"></div>'+
		'</div>'+
		'<br /><input class="btn btn-primary" type="button" id="play" value="Play">'+
		'<input class="btn btn-primary" type="button" id="stop" value="Stop">'+
	'</div>'
		),
	template2: Handlebars.compile(

	),
	
	events:{
		'click  #play' : 'playShow',
		'click #stop' :  'stopPlay'
	},
	render: function () {
		this.$el.html(this.template1());
		return this;
	},
	playShow: function(){
		console.log(this.collection.models[1].toJSON());
		$('#player div').html(this.slideShow.render().el);
	}
	
	},
	stopPlay: function(){
		console.log('stop click');
	},

});