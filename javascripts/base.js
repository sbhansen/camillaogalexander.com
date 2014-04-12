$(document).ready(function(){
	updateScheduel();
	window.loop = setInterval( updateScheduel, 60000 );		myScroll = new IScroll('#scrollWrapper', {		probeType: 3,		mouseWheel: true,	});		myScroll.on('scroll', snapulate );	myScroll.on('scrollEnd', snapulate );		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);		$cards = $(" #content > div ");	$clones = $cards.clone();	$cards.addClass("card");	$clones.addClass("clone");	$("#clones").append( $clones );});
function snapulate(){	var winHeight = $( window ).height(),		winTop = - this.y,		winBottom = winTop + winHeight,		cardsHeight = - $cards.last().innerHeight();			$cards.each( function(){ cardsHeight += $(this).innerHeight() });				myScroll.maxScrollY = -cardsHeight;		$cards.each( function( i ){				var $current = $( this ),			$clone = $( $clones[ i ] ),			offset = $current.offset(),			elmHeight = $current.height(),			elmTop = offset.top,			elmBottom = elmTop + elmHeight;				if( elmHeight >= winHeight ){			if( elmBottom <= winHeight ){				$clone.addClass("pinned bottom");				$current.addClass("pinned bottom");													}			else {				$current.removeClass("pinned bottom");				$clone.removeClass("pinned bottom");			}		}		else {			if( elmTop <= 0 ){				$clone.addClass("pinned");				$current.addClass("pinned");			}			else {				$current.removeClass("pinned bottom");				$clone.removeClass("pinned bottom");			}		}	});}
function updateScheduel(){
	var _now = new Date().getTime(),		_specialDay = new Date( "2014-7-5 00:00" ).getTime(),		_afterSpecialDay = new Date( "2014-7-6 10:00" ).getTime(),		$schedualItems = $(".agenda").children().not(".header"),		_noActiveItem = true;	
	if(  _now >= _specialDay && _now < _afterSpecialDay ){
		$schedualItems.each( function( i ){			var $item = $(this),				$time = $item.find("time"),				_activetyTime = new Date( $time.attr( "datetime" ) ).getTime();	
			if( _activetyTime >= _now ){				if( _noActiveItem && i ){
					var y = i - 1;					$( $schedualItems[ y ] ).attr( "class", "is-happening" );					_noActiveItem = false;				}			}			else {				$item.addClass( "has-happened" );			}
		});
	}
}