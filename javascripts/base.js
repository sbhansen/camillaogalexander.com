$(document).ready(function(){
	updateScheduel();
	window.loop = setInterval( updateScheduel, 60000 );		$cards = $("#title, .framed");	$clones = $cards.clone();	$cards.addClass("card");	$clones.addClass("clone");	$("body").prepend( $clones );	
	$( window ).on("scroll", function(){
						var winHeight = $( window ).height(),			winTop = $( window ).scrollTop(),			winBottom = winTop + winHeight;				//console.log( winBottom );
		// Bruk en clone av det orginale objectet som fixed og sett visibility hidden på orginalen.	
		$cards.each( function( i ){
			
			var $current = $( this ),				$clone = $( $clones[ i ] ),				offset = $current.offset(),
				elmHeight = $current.height(),
				elmTop = offset.top,
				elmBottom = elmTop + elmHeight;			
				if( winBottom >= elmBottom && elmTop - winTop <= 0 ){					if( elmHeight >= winHeight ){						$current.addClass("bottom");												$clone.addClass("bottom");
					}
					$current.addClass("pinned");											$clone.addClass("pinned");
				}
				else {
					$current.removeClass("pinned bottom");
					$clone.removeClass("pinned bottom");
				}
		});
	});});

function updateScheduel(){
	var _now = new Date().getTime(),		_specialDay = new Date( "2014-7-5 00:00" ).getTime(),		_afterSpecialDay = new Date( "2014-7-6 10:00" ).getTime(),		$schedualItems = $(".agenda").children().not(".header"),		_noActiveItem = true;	
	if(  _now >= _specialDay && _now < _afterSpecialDay ){
		$schedualItems.each( function( i ){			var $item = $(this),				$time = $item.find("time"),				_activetyTime = new Date( $time.attr( "datetime" ) ).getTime();	
			if( _activetyTime >= _now ){				if( _noActiveItem && i ){
					var y = i - 1;					$( $schedualItems[ y ] ).attr( "class", "is-happening" );					_noActiveItem = false;				}			}			else {				$item.addClass( "has-happened" );			}
		});
	}
}