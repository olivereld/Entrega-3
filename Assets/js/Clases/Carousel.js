
function initCarousel(){
$(function(){
								
    // If there are gallery thumbs on the page
    if ($('#gallery-thumbs').length > 0) {
    
        // Cache the thumb selector for speed
        var thumb = $('#gallery-thumbs').find('.thumb');
    
        // How many thumbs do you want to show & scroll by
        var visibleThumbs = 5;
    
        // Put slider into variable to use public functions
        var gallerySlider = $('#gallery').bxSlider({
            slideWidth: 300,
            controls: true,
            pager: false,
            easing: 'easeInOutQuint',
            infiniteLoop: true,
            speed: 500,
            auto: true,
            adaptiveHeight: false,
            onSlideAfter: function (currentSlideNumber) {
                var currentSlideNumber = gallerySlider.getCurrentSlide();
                thumb.removeClass('pager-active');
                thumb.eq(currentSlideNumber).addClass('pager-active');
            },
    
            onSlideNext: function () {
                var currentSlideNumber = gallerySlider.getCurrentSlide();
                slideThumbs(currentSlideNumber, visibleThumbs);
            },
    
            onSlidePrev: function () {
                var currentSlideNumber = gallerySlider.getCurrentSlide();
                slideThumbs(currentSlideNumber, visibleThumbs);
            }
        });
    
        // When clicking a thumb
        thumb.click(function (e) {
    
            // -6 as BX slider clones a bunch of elements
            gallerySlider.goToSlide($(this).closest('.thumb-item').index());
    
            // Prevent default click behaviour
            e.preventDefault();
        });
    
        // Thumbnail slider
        var thumbsSlider = $('#gallery-thumbs').bxSlider({
            controls: true,
            pager: false,
            easing: 'easeInOutQuint',
            infiniteLoop: false,
            minSlides: 5,
            maxSlides: 5,
            slideWidth: 100,
            slideMargin: 10,
            shrinkItems: true
        });
    
        // Function to calculate which slide to move the thumbs to
        function slideThumbs(currentSlideNumber, visibleThumbs) {
    
            // Calculate the first number and ignore the remainder
            var m = Math.floor(currentSlideNumber / visibleThumbs);
    
            // Multiply by the number of visible slides to calculate the exact slide we need to move to
            var slideTo = m * visibleThumbs;
    
            // Tell the slider to move
            thumbsSlider.goToSlide(m);
        }
    
        // When you click on a thumb
        $('#gallery-thumbs').find('.thumb').click(function () {
    
            // Remove the active class from all thumbs
            $('#gallery-thumbs').find('.thumb').removeClass('pager-active');
    
            // Add the active class to the clicked thumb
            $(this).addClass('pager-active');
    
        });
    
    }
    
        });
    }