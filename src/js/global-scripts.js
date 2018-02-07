(function($) {

    var main = {

        initialize: function () {
            main.browser();
            main.accessibleFocus();
            main.objectFit();
            main.domReady();
    },

    //---------------------------------------------------------------------------------------------
    // BROWSER DETECTION
    //---------------------------------------------------------------------------------------------
    browser: function() {
        $body = $('body');
        if(navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0) {
           /* Microsoft Internet Explorer detected in. */
           $body.addClass('ie');
        }
        
        $body.attr('browser', bowser.name).attr('version', bowser.version);
		
		if (bowser.mobile === true) {
			$body.attr('device', 'mobile');
		}
		if (bowser.tablet === true) {
			$body.attr('device', 'tablet');
		}
		if ($body.attr('device') === null) {
			$body.attr('device', 'desktop');
		}
    },

    //---------------------------------------------------------------------------------------------
    // ACCESSIBLE FOCUS
    //---------------------------------------------------------------------------------------------
    accessibleFocus: function() {
		function handleFirstTab(e) {
			if (e.keyCode === 9) {
				document.body.classList.add('user-is-tabbing');
			
				window.removeEventListener('keydown', handleFirstTab);
				window.addEventListener('mousedown', handleMouseDownOnce);
			}
		}
		
		function handleMouseDownOnce() {
			document.body.classList.remove('user-is-tabbing');
			
			window.removeEventListener('mousedown', handleMouseDownOnce);
			window.addEventListener('keydown', handleFirstTab);
		}
		
		window.addEventListener('keydown', handleFirstTab);
		
		$('input[type=search]').on('focus', function(){
		  // replace CSS font-size with 16px to disable auto zoom on iOS
		  $(this).data('fontSize', $(this).css('font-size')).css('font-size', '16px');
		}).on('blur', function(){
		  // put back the CSS font-size
		  $(this).css('font-size', $(this).data('fontSize'));
		});
    },
	
	
    //---------------------------------------------------------------------------------------------
    // Initialize objectfit
    //---------------------------------------------------------------------------------------------
    objectFit: function() {

        if ( ! Modernizr.objectfit ) {
            $('.object-fit:NOT(body)').each(function () {

                var src = jQuery(this).attr('src');

                jQuery(this).parent().css({
                    "background-image" : "url('" + src + "')",
                    "background-size" : "cover",
                    "background-position": "center center"
                });

                jQuery(this).css({
                    "opacity" : "0"
                });
            });
        }

    },

	//---------------------------------------------------------------------------------------------
    // DOM READY (TO TRIGGER ANIMATIONS) -- KEEP THIS AS LAST JS FUNCTION
    //---------------------------------------------------------------------------------------------
    domReady: function() {
        // Attach window events
        $(window).on('load', function(){
            $('body').addClass('ready');
        });
    },


};

$(document).ready(main.initialize);
}(jQuery));