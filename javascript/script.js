$(document).ready(function () {
    // Set the height of the slideshow / set position of text
    var pageHeight = $(window).height() - 50;
    $("#slideshow").css('height', pageHeight + 'px');
    $('#slideshow h3').css('marginBottom', (pageHeight / 2.5) + 'px');

    // Ensure, even when the page is resized, the size remains consistent.
    $(window).resize( function () {
        var pageHeight = $(window).height() - 50;
        $("#slideshow").css('height', pageHeight + 'px');
        $('#slideshow h3').css('marginBottom', (pageHeight / 2.5) + 'px');
    });

    // Project-Highlights shake on hover:
    $('.highlight-image, .skill-set-image').hover(function () {
        $(this).addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated pulse');
        });
    });

    // Scroll to page elements from the navigation bar:
    $('#navbar a').on('click', function (e) {
        e.preventDefault();

        var linkClicked = $(this).text().toUpperCase();
        var selectedElement;

        switch (linkClicked) {

            case "JAMESHUNTCODE":
            selectedElement = $("#navbar");
            break;
            case "ABOUT":
            selectedElement = $("#about-me");
            break;
            case "SKILLS":
            selectedElement = $("#my-skills");
            break;
            case "HIGHLIGHTS":
            selectedElement = $("#projects");
            break;
            case "INTERESTS":
            selectedElement = $("#current-interests");
            break;
            case "HIRE ME":
            selectedElement = $("#hire-me");
            break;
            case "CONTACT":
            selectedElement = $("#contact-me");
            break;

        }

        var scrollTo = function(where) {
            $('html, body').animate({scrollTop: where.offset().top - 50}, 1500);
        }

        scrollTo(selectedElement);
    });

    // Scroll to page elements from the footer:
    $('#footer a').on('click', function (e) {
        e.preventDefault();

        var linkClicked = $(this).text().toUpperCase();
        var selectedElement;

        switch (linkClicked) {

            case "TOP OF PAGE":
            selectedElement = $("#navbar");
            break;
            case "ABOUT ME":
            selectedElement = $("#about-me");
            break;
            case "MY SKILL SET":
            selectedElement = $("#my-skills");
            break;
            case "PROJECT HIGHLIGHTS":
            selectedElement = $("#projects");
            break;
            case "WORK & INTERESTS":
            selectedElement = $("#current-interests");
            break;
            case "HIRE ME":
            selectedElement = $("#hire-me");
            break;
            case "CONTACT ME":
            selectedElement = $("#contact-me");
            break;
            case "EMAIL ME":
            selectedElement = $("#contact-me");
            break;

        }

        var scrollTo = function(where) {
            $('html, body').animate({scrollTop: where.offset().top - 50}, 1500);
            console.log(where.offset().top);
        }

        scrollTo(selectedElement);
    });

    // Set Copyright Date
    var copyrightNotice = $('#copyright');
    var year = new Date().getFullYear();
    copyrightNotice.html("© " + year + " James Hunt");
});
