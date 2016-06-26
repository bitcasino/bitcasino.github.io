jQuery(function() {
    
	var $ = jQuery;
    
    var Theme = {
      interval: function(condition, action, duration, limit) {
        var counter = 0;
        var looper = setInterval(function(){
          if (counter >= limit || Theme.checkElement(condition)) {
            clearInterval(looper);
          } else {
            action();
            counter++;
          }
        }, duration);
      },
      checkElement: function(selector) {
        return $(selector).length;
      },
      moveMinicart: function() {
        var move = $("#wsite-mini-cart").detach();
        $("#navigation").append(move);
      },
      moveFlyout: function() {
        var move = $("#wsite-menus").detach();
        $("#navigation").append(move);
      }
    }
    

    $(document).ready(function() {
    
        if ($(window).width() >= 768) {
          Theme.interval("#navigation #wsite-mini-cart", Theme.moveMinicart, 800, 5);
          Theme.interval("#navigation #wsite-menus", Theme.moveFlyout, 800, 5);
        }
        
    
        // General styling

        $('body').addClass('postload');
        
        // Mobile menu
        
        $("#mobile").click(function(e){
            e.preventDefault();
            $("#navigation").toggleClass("expanded");
            if ($("#navigation").hasClass("expanded")) {
                $("#navigation-wrap").css({"max-height": ($(window).height() - 50)+ "px"});                
                $("#navmobile").css({"max-height": ($(window).height() - 100)+ "px"});                
            }
            else {
             $("#navigation-wrap").css({"max-height": "0px"});                
           }
        });
        

        // Masthead
        // --------------------------------------------------------------------------------------//
        
        // Sticky Nav

        $('#navigation').waypoint('sticky');
        
        $(window).resize(function() {
            $('#navigation').waypoint('unsticky');
            $('#navigation').waypoint('sticky');
        });

        // search button click action
        
        $('#sitesearch .wsite-search-button').click(function(){
            $("#sitesearch #wsite-header-search-form").toggleClass("expanded");
            if ($("#sitesearch #wsite-header-search-form").hasClass("expanded")) {
                $("#sitesearch").addClass("loaded");                
                $("#sitesearch #wsite-header-search-form .wsite-search-input").focus();                
            }
            return false;
        });
        
        if ($("#sitesearch").html().length <= 0) { $("#search").remove(); }

        
        // Landing Page
        // --------------------------------------------------------------------------------------//

        setTimeout(function() {
            $(".landing-page #landing-scroll").addClass("loaded").click(function(e){
                e.preventDefault();
                $('.landing-page').addClass('scrolled');
            });
        }, 800);
                
        $('.landing-page').waypoint(function() {
            $('.landing-page').addClass('scrolled');
        }, { offset: -5 });
        
        // Mobile galleries
        // --------------------------------------------------------------------------------------//
        
        // Add fullwidth class to gallery thumbs if less than 6
        $('.imageGallery').each(function(){
          if ($(this).children('div').length <= 6) {
            $(this).children('div').addClass('fullwidth-mobile');
          }
        });
        
        var swipeGallery = function() {
          setTimeout(function() {
            var touchGallery = document.getElementsByClassName("fancybox-wrap")[0];
            var mc = new Hammer(touchGallery);
            mc.on("panleft panright", function(ev) {
              if (ev.type == "panleft") {
                $("a.fancybox-next").trigger("click");
              } else if (ev.type == "panright") {
                $("a.fancybox-prev").trigger("click");
              }
              swipeGallery();
            });
          }, 500);
        }

        if ('ontouchstart' in window) {
          $("body").on("click", "a.w-fancybox", function() {
            swipeGallery();
          });
        }
        

        // Storefront
        // --------------------------------------------------------------------------------------//

        // Categories sidebar list in tablet/mobile
        
        $('.wsite-com-sidebar').prepend('<a id="open-categories" href="#">See All Categories</a><a id="close-categories" href="#">X Close</a>');
        $('#open-categories, #close-categories').click(function(e){
            e.preventDefault();
            $('.wsite-com-sidebar').toggleClass('sidebar-expanded');
        });
        
        // Wrap products in subpages
        
        if (!$('.wsite-com-category-subcategory-group').text().trim().length) {
            $('.wsite-com-category-subcategory-group').next("div").remove();
            $(".wsite-com-sidebar").addClass("inner");
        }
        
        // Store Item
        // --------------------------------------------------------------------------------------//
        
        
        $('#wsite-com-product-quantity .wsite-com-product-title').text('Qty');

        // Format Store markup

        $("#wsite-com-product-images-strip a:first-child").addClass("current-thumb");
        
        $("#wsite-com-product-images-strip a").click(function(){
            $(".current-thumb").removeClass("current-thumb");
            $(this).addClass("current-thumb");
        });

        // Cart + Member
        
        $('#nav').on('DOMSubtreeModified propertychange', function() {
          
          if ($(window).width() < 768) {
            $("#nav li a").each(function(){
              // Differentiating post-load nav elements by the presence of an id (only currently available modifier)
              if ($(this).attr("id")) {
                var navLinkId = $(this).attr("id");
                var navLinkParent = $(this).parent().detach();

                // Append to mobile nav if new element
                if (!$("#navmobile #"+navLinkId).length) {
                  $("#navmobile .wsite-menu-default").append(navLinkParent);
                  var newheight = $("#navmobile .wsite-menu-default").height();
                  $(".wsite-mobile-menu").height(newheight);
                }
              }
            });
          }

        });

        // Blog
        // --------------------------------------------------------------------------------------//

        $("#commentReplyTitle").text("Leave a comment");
        
        // Figure out of comment is last in tree
        $(".blogCommentLevel1, .blogCommentLevel2").each(function(){
            if ($(this).parent().next("div").children("div").hasClass("blogCommentLevel0") || $(this).parent().next("div").is("#lastComment")) {
                $(this).addClass("last");
            }
        });


    });
});