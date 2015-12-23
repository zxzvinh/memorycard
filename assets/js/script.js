
$(document).ready( function()
{
	var current_try = 0;
	var clicked_once = false;
	var card_front = "assets/images/images.png";
					
			
	previous_image = null;
	previous_image_index = null;
	max_tries = 10;
	current_tries = max_tries;
	number_cards = $(".board .cards .card").length;
	number_slots = $(".board .row .col li").length;
	
	resetBoard();
	
	var clicks = 0;
	$(".board .row .col li").click( function( )
	{
		clicks++;
		var _li = $(this);
		if( clicks == 2 )
		{
			clicks--;
			setTimeout( function(){_li.click();}, 50 );
		}
		else
		{
			image_index = _li.parents(".board").find(".row .col li").index( _li );
			this_image = _li.find("img.card-back").attr("src");
			_li.find("img.card-front").animate({opacity:0}, 500);
			_li.find("img.card-back").animate({opacity:1}, 500, function()
			{
				
				current_try++;
				if( current_try == 1 )
				{
					previous_image = this_image;
					previous_image_index = image_index;
				}
				else if ( current_try == 2 ) //Try #2
				{
					
					if( this_image == previous_image )
					{
						$(".board .row .col li").eq( previous_image_index ).removeClass("hidden");
						$(".board .row .col li").eq( image_index ).removeClass("hidden");
						
						alert("Match!");
						
						num_matches = $(".board .row .col li.hidden").length;
						if( num_matches == 0)
							alert("You Are a WInner!");
					}
					else //No Match
					{
						
						$(".board .row .col li").eq( previous_image_index ).find("img.card-back").animate({opacity:0}, 500);
						$(".board .row .col li").eq( image_index ).find("img.card-back").animate({opacity:0}, 500);
						
						$(".board .row .col li").eq( previous_image_index ).addClass("hidden");
						$(".board .row .col li").eq( image_index ).addClass("hidden");
						
						$(".board .row .col li").eq( previous_image_index ).find("img.card-front").animate({opacity:1}, 500);
						$(".board .row .col li").eq( image_index ).find("img.card-front").animate({opacity:1}, 500);
						
						current_tries--;
						if( current_tries == 0 )
						{
							alert("You are out of tries. Try again!");
							resetBoard();
						}
						else
							$(".max-tries").html(current_tries);
							
					}
					current_try = 0;
				}
				clicks--;
			});
		}
				
	});
	
	function resetBoard()
	{
		$(".board .row .col li").html("<img src='" + card_front + "' class = 'card-front' width='150' height='100' >");
		
		current_tries = max_tries;
		$(".max-tries").html(current_tries);
		
		for( card_index = 0; card_index < number_cards; card_index++ )
		{
			for( card_iteration = 0; card_iteration < 2; card_iteration++ )
			{
				var random_number = Math.floor(Math.random() * number_slots);
				
				while( $(".board .row .col li").eq(random_number).find(".card-back").length > 0 )
				{
					random_number = Math.floor(Math.random() * number_slots);
				}
				
				$(".board .cards .card").eq( card_index ).find("img").clone().appendTo($(".board .row .col li").eq( random_number).addClass("hidden"));
				
			}
		}
		
	}
	
});