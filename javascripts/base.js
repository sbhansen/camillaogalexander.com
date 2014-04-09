$(document).ready(function(){
	var _now = new Date().getTime(),
		_specialDay = new Date( "2014-7-5 00:00" ).getTime(),
		$schedualItems = $(".agenda").children().not(".header"),
		_noActiveItem = true;
		
		console.log( _now );
	
	$schedualItems.each( function(){
	
		var $item = $(this),
			$time = $item.find("time"),
			_activetyTime = new Date( $time.attr( "datetime" ) ).getTime();

		console.log( _activetyTime );
		
		if(  _now >= _specialDay ){
			if( _activetyTime >= _now ){
				if( _noActiveItem ){
					$item.prev().attr( "class", "is-happening" );
					_noActiveItem = false;
				}
			}
			else {
				$item.addClass( "has-happened" );
			}
		}
	});
});