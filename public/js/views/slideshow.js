var ViewSlide = Backbone.View.extend({
	template2: Handlebars.compile(
			'<img class="img-polaroid" src="images/{{attributes.img}}" style="max-width:560px; max-height:300px;">'

	),
	render: function () {
		this.$el.html( this.template2(this.model) );
		var that=this;
		$('#player div').fadeOut('slow', function(){
			$('#player').empty();
			$('#player').append( (that.$el).fadeIn('slow') ); 
				
		});

	}
});
var iDinter;
var SlideShowView = Backbone.View.extend({
	template1: Handlebars.compile(
	'<div style="float:left;" align="center">'+
		'<div id="player" class="img-polaroid" style=" margin-top: 10px; width: 600px; height:310px"><div></div>'+
		'</div>'+
		'<br /><input class="btn btn-primary" type="button" id="play" value="Play">'+
		'<input class="btn btn-primary" type="button" id="stop" value="Stop">'+
	'</div>'
		),
	
	events:{
		'click  #play' : 'playShow',
		'click #stop' :  'stopPlay'
	},
	render: function () {
		this.$el.html( this.template1() );
		return this;
	

	},
	playShow: function(){
	var i=0;
			var that=this;
		
		clearInterval(iDinter);
		prints();
		iDinter = setInterval( prints, 3000 );
		function prints(){
			var k = that.collection.models[i];
			that.renderShow(k);
			( i == that.collection.length-1 ) ? i=0 : i++;	
			console.log(k);
		};
		return this;

	},
	stopPlay: function(){
		clearInterval(iDinter);
	},

	renderShow: function(slide) {
	
	var addSlide = new ViewSlide({ model : slide });
 		addSlide.render();

	}

});