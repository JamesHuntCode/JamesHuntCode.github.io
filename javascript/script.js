$(document).ready(function () {
    // Set the height of the welcome image container
    var pageHeight = $(window).height() - 50;
    $("#welcome").css('height', pageHeight + 'px');


    // Ensure, even when the page size is changed, the container proportions remain consistent.
    /*$(window).resize( function () {
        let pageHeight = $(window).height() - 50;
        $("#welcome").css('height', pageHeight + 'px');
    });*/



    // Scroll to page elements from the navigation bar:
    $('#navbar a').on('click', function (e) {
        e.preventDefault();

        let linkClicked = $(this).text().toUpperCase();
        let selectedElement;

        switch (linkClicked) {

            case "CV":
                window.location = 'jameshuntfullcv.docx';
                return;
            case "JAMESHUNTCODE":
                selectedElement = $("#navbar");
            break;
            case "ABOUT":
                selectedElement = $("#about-me");
            break;
            case "SKILL SET":
                selectedElement = $("#skillset");
            break;
            case "EXPERIENCE":
                selectedElement = $("#experience");
            break;
            case "CONTACT":
                selectedElement = $("#contact-me");
            break;

        }

        let scrollTo = function(where) {
            $('html, body').animate({scrollTop: where.offset().top - 50}, 1500);
        };

        scrollTo(selectedElement);
    });
});
