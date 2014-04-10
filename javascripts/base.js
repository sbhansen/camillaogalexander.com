$(document).ready(function(){
	updateScheduel();
	window.loop = setInterval( updateScheduel, 60000 );
	$( window ).on("scroll", function(){
		
		if( window.location.search.indexOf("unicornsAreNotHorses") <= 0 )
			return false;
			
		// Bruk en clone av det orginale objectet som fixed og sett visibility hidden på orginalen.
			
		$frames = $(".framed");
	
		$frames.each( function( i ){
			
			var offset = $( this ).offset(),
				elmHeight = $( this ).outerHeight(),
				elmTop = offset.top,
				elmBottom = elmTop + elmHeight,
				winHeight = $( window ).height(),
				winTop = $( window ).scrollTop(),
				winBottom = winTop + winHeight;
							
				if( winBottom > elmBottom ){
					$( this ).addClass( "pinned" );
					$( this ).next().css("margin-top", elmHeight );
				}
				else {
					$( this ).removeClass( "pinned" );
					$( this ).next().css("margin-top", 0 );
				}
		});
		if( $( this ).scrollTop() > 0 ){
			$("body").addClass("scroll");
		}
		else {
			$("body").removeClass("scroll");
		}
	});
});

function updateScheduel(){
	var _now = new Date().getTime(),
		_specialDay = new Date( "2014-7-5 00:00" ).getTime(),
		_afterSpecialDay = new Date( "2014-7-6 10:00" ).getTime(),
		$schedualItems = $(".agenda").children().not(".header"),
		_noActiveItem = true;
	
	if(  _now >= _specialDay && _now < _afterSpecialDay ){
		
		$schedualItems.each( function( i ){
	
			var $item = $(this),
				$time = $item.find("time"),
				_activetyTime = new Date( $time.attr( "datetime" ) ).getTime();	
		
			if( _activetyTime >= _now ){
				if( _noActiveItem && i ){
					var y = i - 1;
					$( $schedualItems[ y ] ).attr( "class", "is-happening" );
					_noActiveItem = false;
				}
			}
			else {
				$item.addClass( "has-happened" );
			}
		});
		console.log("doing");		
	}
}