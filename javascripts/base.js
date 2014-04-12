$(document).ready(function(){	updateScheduel();	spaceTitleFromContent();
	window.loop = setInterval( updateScheduel, 60000 );	$( window ).on("resize", spaceTitleFromContent );});

function updateScheduel(){
	var _now = new Date().getTime(),		_specialDay = new Date( "2014-7-5 00:00" ).getTime(),		_afterSpecialDay = new Date( "2014-7-6 10:00" ).getTime(),		$schedualItems = $(".agenda").children().not(".header"),		_noActiveItem = true;	
	if(  _now >= _specialDay && _now < _afterSpecialDay ){
		$schedualItems.each( function( i ){			var $item = $(this),				$time = $item.find("time"),				_activetyTime = new Date( $time.attr( "datetime" ) ).getTime();	
			if( _activetyTime >= _now ){				if( _noActiveItem && i ){
					var y = i - 1;					$( $schedualItems[ y ] ).attr( "class", "is-happening" );					_noActiveItem = false;				}			}			else {				$item.addClass( "has-happened" );			}
		});
	}
}function spaceTitleFromContent(){	var $title = $("#title"),		$content = $("#content"),		_marginTop = $content.data("margin-top") ? $content.data("margin-top") : $content.css("margin-top");		if( $title.width() <= 500 ){		$content.css({ "margin-top": $title.height() });		$content.data("margin-top", _marginTop );	}	else {		$content.css({ "margin-top": _marginTop });	}	}