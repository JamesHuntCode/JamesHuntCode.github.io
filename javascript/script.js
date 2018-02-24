$(document).ready(function() {
    // Areas of the document that have been  dynamically revealed
    var aboutHasRevealed, skillsetHasRevealed, projectsHaveRevealed, contactInfoHasRevealed = false;

    // Only fade in elements when the page is above a certain width (not on tablets etc)
    var validWidthForAnimations = $(window).width() >= 768;

    // Method to run page scale check and reveal sections if already visible by user
    var runInitialCheck = function() {
        // Check short fact section
        if (checkIfOnScreen($('#divider'))) {
            if (!aboutHasRevealed) {
                revealShortFacts();
                aboutHasRevealed = true;
            }
        }

        // Check skill set section
        if (checkIfOnScreen($('#top-row-skills'))) {
            if (!skillsetHasRevealed) {
                revealSkills();
                skillsetHasRevealed = true;
            }
        }

        // Check recent projects section
        if (checkIfOnScreen($('#job-app-img'))) {
            if (!projectsHaveRevealed) {
                displayProjects(topImages, true);
                projectsHaveRevealed = true;
            }
        }

        // Check contact / social media section
        if (checkIfOnScreen($('#contact-information'))) {
            if (!contactInfoHasRevealed) {
                revealContactDetails();
                contactInfoHasRevealed = true;
            }
        }

        windowSizeChecks();
    }
    var runningChecks = setTimeout(runInitialCheck, 10);

    // Certain elements are to only be displayed at specific resolutions
    var windowSizeChecks = function () {
        // Check navigation bar text size
        if ($(window).width() <= 908) {
            $('#nav-bar a').css('fontSize', '15px');
        } else {
            $('#nav-bar a').css('fontSize', '20px');
        }

        // Only display slideshow above a specified resolution
        if ($(window).width() <= 1121) { // 760px
            $('.slideshow-content h1, #github-profile-link, #github-frogger-link, #github-defender-link').css('fontSize', '40px');
            $('.slideshow-content h3, #github-profile-link, #github-frogger-link, #github-defender-link').css('fontSize', '20px');
        } else {
            $('.slideshow-content h1, #github-profile-link, #github-frogger-link, #github-defender-link').css('fontSize', '60px');
            $('.slideshow-content h3, #github-profile-link, #github-frogger-link, #github-defender-link').css('fontSize', '30px');
        }

        if ($(window).width() <= 760) {
            $('#nav-bar').hide();
            $('#mobile-nav').show();

            $('#summary').hide();
            $('#spacer').hide();

            $('.github-repo-link').hide();
        } else {
            $('#nav-bar').show();
            $('#mobile-nav').hide();

            $('#summary').show();
            $('#spacer').show();

            $('.github-repo-link').show();
        }

        // Text align center about section when screen shrinks below a certain threshold
        // Shrink skill summaries alongside
        if ($(window).width() <= 990) {
            $('#info-about-james').css('textAlign', 'center');

            $('.skill-text-summary').css('fontSize', '12px');

            $('.fact-about-james').css('fontSize', '12px');
        } else {
            $('#info-about-james').css('textAlign', 'left');

            $('.skill-text-summary').css('fontSize', '16px');

            $('.fact-about-james').css('fontSize', '16px');
        }
    }

    $(window).resize(function() {
        windowSizeChecks();
    });

    // Check what content is visible on user scroll
    $(document).scroll(function() {
        // Check short fact section
        if (checkIfOnScreen($('#divider'))) {
            if (!aboutHasRevealed) {
                revealShortFacts();
                aboutHasRevealed = true;
            }
        }

        // Check skill set section
        if (checkIfOnScreen($('#top-row-skills'))) {
            if (!skillsetHasRevealed) {
                revealSkills();
                skillsetHasRevealed = true;
            }
        }

        // Check recent projects section
        if (checkIfOnScreen($('#job-app-img'))) {
            if (!projectsHaveRevealed) {
                displayProjects(topImages, true);
                projectsHaveRevealed = true;
            }
        }

        // Check contact / social media section
        if (checkIfOnScreen($('#contact-information'))) {
            if (!contactInfoHasRevealed) {
                revealContactDetails();
                contactInfoHasRevealed = true;
            }
        }
    });

    // Method to check if a certain element is visible by the user
    var checkIfOnScreen = function(elem) {
        var currentPos = elem.offset();
        var currentTop = currentPos.top - $(window).scrollTop();
        var screenHeight = $(window).height();

        return (currentTop > screenHeight) ? false : true;
    }

    // NAVIGATION BAR

    $('#nav-content').hide();

    $('#expand-me').on('click', function() {
        $('#nav-content').slideToggle();
        $('#nav-arrow').toggleClass('rotated');
    });

    $('#nav-content a').on('click', function() {
        $('#nav-content').slideToggle();
        $('#nav-arrow').toggleClass('rotated');
    });

    $('#nav-bar a').hover(function() {
        $(this).animate({color: '#008080'}, 200);
    }, function() {
        $(this).animate({color: '#ffffff'}, 200);
    });

    $('#nav-bar a, #mobile-nav a').on('click', function() {
        switch ($(this).text().toUpperCase()) {
            case "ABOUT JAMES":
                sendUserTo("about-james");
            break;
            case "JAMES' SKILLS":
                sendUserTo("james-skills");
            break;
            case "JAMES' PROJECTS":
                sendUserTo("james-projects");
            break;
            case "CONTACT JAMES":
                sendUserTo("contact-james");
            break;
        }
    });

    // Method used to scroll the page to a specific location
    var sendUserTo = function(location) {
        var selectedElem;
        var adjust = $('#nav-bar-spacer').height();

        switch (location) {
            case "top":
                selectedElem = $("#nav-bar-spacer");
            break;
            case "about-james":
                selectedElem = $('#about-james');
            break;
            case "james-skills":
                selectedElem = $('#professional-skillset');
            break;
            case "james-projects":
                selectedElem = $('#james-recent-projects');
            break;
            case "james-social-media":
                selectedElem = $('#james-social-media');
            break;
            case "contact-james":
                selectedElem = $('#contact-james');
            break;
        }

        var scrollTo = function(where) {
            $('html, body').animate({scrollTop: where.offset().top - adjust}, 1000);
        }

        scrollTo(selectedElem);
    }

    // END OF NAVIGATION BAR

    // SUMMARY (SLIDESHOW)


    // END OF SUMMARY (SLIDESHOW)

    // ABOUT && SKILLSET
    var factLogos = [$('#uni-logo'), $('#git-logo'), $('#plym-logo')];

    var hideFactLogos = function() {
        for (let i = 0; i < factLogos.length; i++) {
            factLogos[i].hide();
        }
    }

    // reveal of facts about James on scroll
    var revealShortFacts = function() {
        for (let i = 0; i < factLogos.length; i++) {
            factLogos[i].show("drop", {direction: "up"}, 500);
        }
    }

    // Prepare document for reveal of skills on scroll
    var topSkillLogos = [$('#c-sharp-logo'), $('#javascript-logo'), $('#sql-logo')];
    var topSkillHeaders = [$('#c-sharp-header'), $('#javascript-header'), $('#sql-header')];
    var topSkillSummaries = [$('#c-sharp-summary'), $('#javascript-summary'), $('#sql-summary')];
    var topGitLinks = [$('#c-sharp-link'), $('#js-link'), $('#sql-link')];

    var bottomSkillLogos = [$('#processing-logo'), $('#html-css-logo'), $('#android-logo')];
    var bottomSkillHeaders = [$('#processing-header'), $('#html-css-header'), $('#android-header')];
    var bottomSkillSummaries = [$('#processing-summary'), $('#html-css-summary'), $('#android-summary')];
    var bottomGitLinks = [$('#processing-link'), $('#html-css-link'), $('#android-link')];

    var allSkillBasedContent = [topSkillLogos, topSkillHeaders, topSkillSummaries, topGitLinks, bottomSkillLogos, bottomSkillHeaders, bottomSkillSummaries, bottomGitLinks];

    // Keep skillset content hidden initially
    var hideSkillset = function() {
        for (let i = 0; i < allSkillBasedContent.length; i++) {
            for (let j = 0; j < allSkillBasedContent[i].length; j++) {
                allSkillBasedContent[i][j].css('opacity', 0);
            }
        }
    }

    // Method to reveal skill set to user
    var revealSkills = function() {
        // Dynamic reveal of skills on scroll
        var interval = 0;

        var fadeReveal = function(elements) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].delay(interval).animate({opacity: '1'}, 500);
                interval += 100;
            }
        }

        // Start cycle
        for (let i = 0; i < allSkillBasedContent.length; i++) {
            fadeReveal(allSkillBasedContent[i]);
        }
    }

    // END OF ABOUT && SKILLSET

    // MY RECENT PROJECTS

    // Code handling reveal of initial 3 projects
    var topImages = [$('#job-app-img'), $('#doodle-jump-img'), $('#car-hire-img')];
    var bottomImages = [$('#defender-img'), $('#flappy-bird-img'), $('#pong-img'), $('#galaga-img')];

    // Method to display project images
    var displayProjects = function(elems, top) {
        var growthOffset;

        if (top) {
            growthOffset = 0;
            for (let i = 0; i < elems.length; i++) {
                elems[i].delay(growthOffset).queue(function(next) {
                    elems[i].addClass('full-size-top');
                });
                growthOffset += 175;
            }
        } else {
            setTimeout(function() {
                for (let i = 0; i < elems.length; i++) {
                    elems[i].addClass('full-size-bottom');
                }
            }, 200);
        }

        growthOffset = 0;
    }

    // Direct user to GitHub via embedded link when they hover
    $('.project-gif-top, .project-gif-bottom').hover(function() {
        $(this).css('boxShadow', '0px 0px 35px #808080');
    }, function() {
        $(this).css('boxShadow', '0px 0px 10px #333');
    });

    // Method to shrink off project images
    var hideProjects = function(elems, top) {
        var shrinkOffset;

        if (top) {
            shrinkOffset = 0;
            for (let i = 0; i < elems.length; i++) {
                elems[i].delay(shrinkOffset).queue(function(next) {
                    elems[i].removeClass('full-size-top');
                    shrinkOffset += 175;
                });
            }
        } else {
            for (let i = 0; i < elems.length; i++) {
                elems[i].removeClass('full-size-bottom');
            }
        }

        shrinkOffset = 0;
    }

    // Code handling the user requesting to see more projects
    $('#bottom-4-projects').hide();

    var currentContent = $('#projects-direct').text();

    $('.drop-down-button').hover(function() {
        $(this).animate({opacity: '1'}, 250);
    }, function() {
        $(this).animate({opacity: '0.7'}, 250);
    });

    $('#projects-drop-button').on('click', function() {
        $(this).toggleClass('rotated');
        // Dynamically change user instructions
        if (currentContent.toLowerCase() === "want to see more? click below!") {
            $('#projects-direct').html("Click again to hide.");
            currentContent = "Click again to hide content.";
            displayProjects(bottomImages, false);
        } else {
            $('#projects-direct').html("Want to see more? Click below!");
            currentContent = "Want to see more? Click below!";
            hideProjects(bottomImages, false);
        }
        $('#bottom-4-projects').slideToggle(800);
    });

    $('#view-all a').hover(function() {
        $(this).animate({color: '#808080'}, 200);
    }, function() {
        $(this).animate({color: '#333'}, 200);
    });

    // END OF MY RECENT PROJECTS

    // JAMES' SOCIAL MEDIA

    $('#twitter-prof-link').hover(function() {
        $(this).animate({color: '#808080'}, 250);
    }, function() {
        $(this).animate({color: '#333'}, 250);
    });

    var configProfile = {
        "profile": {"screenName": 'JamesHuntCode'},
        "id": '958381736337072129',
        "domId": 'tweets',
        "maxTweets": 2,
        "enableLinks": true,
        "showUser": false,
        "showTime": true,
        "showImages": false,
        "lang": 'en'
    }
    twitterFetcher.fetch(configProfile);

    // END OF JAMES' SOCIAL MEDIA

    // CONTACT JAMES

    // Hide content in preparation for dynamic reveal
    var contactImages = [$('#email-img'), $('#linked-in-img'), $('#twitter-img'), $('#github-img')];
    var contactHeaders = [$('#email-header'), $('#linked-in-header'), $('#twitter-header'), $('#github-header')];
    var contactAddresses = [$('#email-summary'), $('#linked-in-summary'), $('#twitter-summary'), $('#github-summary')];

    var allContent = [contactImages, contactHeaders, contactAddresses];

    // Hide contact images initially
    var hideContactInfo = function() {
        for (let i = 0; i < allContent.length; i++) {
            for (let j = 0; j < allContent[i].length; j++) {
                allContent[i][j].css('opacity', '0');
            }
        }
    }

    // Method to dynamically reveal contact information
    var revealContactDetails = function() {
        var offset = 0;

        for (let i = 0; i < allContent.length; i++) {
            for (let j = 0; j < allContent[i].length; j++) {
                allContent[i][j].delay(offset).animate({opacity: '1'}, 500);
                offset += 100;
            }
        }
    }

    $('#contact-james a').hover(function() {
        $(this).animate({color: '#808080'}, 200);
    }, function() {
        $(this).animate({color: '#333'}, 200);
    });

    // Method working with hiding/showing the email James section
    $('#contact-form').hide();

    $('#email-drop-button').on('click', function() {
        $(this).toggleClass('rotated');
        // Dynamically change user instructions
        if ($('#email-direct').text().toLowerCase() === "click below to email james!") {
            $('#email-direct').html("Click again to hide.");
        } else {
            $('#email-direct').html("Click below to email James!");
        }
        $('#contact-form').slideToggle(1000);
    });

    // END OF CONTACT JAMES

    // FOOTER

    $('.footer-link a, .redirect-user').hover(function() {
        $(this).animate({color: '#808080'}, 200);
    }, function() {
        $(this).animate({color: '#ffffff'}, 200);
    });

    $('.redirect-user').on('click', function() {
        switch ($(this).text().toUpperCase()) {
            case "RETURN TO TOP":
                sendUserTo("top");
            break;
            case "ABOUT JAMES":
                sendUserTo("about-james");
            break;
            case "JAMES' PROJECTS":
                sendUserTo("james-projects");
            break;
            case "JAMES' SOCIAL MEDIA":
                sendUserTo("james-social-media");
            break;
            case "CONTACT JAMES":
                sendUserTo("contact-james");
            break;
        }
    });

    // Automatically update date of copyright notice in footer
    var copyright = $('#copyright-notice');

    var date = new Date();
    var thisYear = date.getFullYear();

    copyright.html('© ' + thisYear + ' James Hunt Some Rights Reserved');

    // END OF FOOTER

    // Only allow animation reveals on specific devices
    var hideAll = function () {
        if (validWidthForAnimations) {
            hideFactLogos();
            hideSkillset();
            hideContactInfo();
        } else {
            var aboutHasRevealed, skillsetHasRevealed, projectsHaveRevealed, contactInfoHasRevealed = true;
        }
    }
    hideAll();
});

// Only call specific methods after all other HTML elements have loaded
$(window).on('load', function() {
    // Start slideshow when all images have loaded successfully
    var slideshowNotVisible = function() {
        var topOfWindow = $(window).scrollTop();

        var navbarHeight = $('#nav-bar').height();
        var slideshowHeight = $('#summary').height();
        var spacerHeight = $('#spacer').height();

        var totalHeight = Number(navbarHeight) + Number(slideshowHeight) + Number(spacerHeight);

        return (Number(topOfWindow) >= totalHeight);
    }

    // Prepare content for slideshow
    $('#left').addClass('active');
    $('#center').addClass('not-active');
    $('#right').addClass('not-active');

    $('#website-slide-content h1').hide();
    $('#website-slide-content h3').hide();

    $('#website-slide-content h1').delay(1000).slideDown(1000);
    $('#website-slide-content h3').delay(2000).slideDown(1000);

    $('#coding-slide-content h1').hide();
    $('#coding-slide-content h3').hide();

    $('#minigame-slide-content h1').hide();
    $('#minigame-slide-content h3').hide();

    var slideshowTimer;
    var running;
    var paused;
    var initialLoop;

    // Main slideshow method
    var slideshow = function(topSlide, middleSlide, bottomSlide) {
        running = true;
        paused = false;
        initialLoop = true;

        // Pause slideshow if it has left user's viewport
        $(document).scroll(function() {
            if (slideshowNotVisible()) {
                clearInterval(slideshowTimer);
                paused = true;
            } else {
                paused = false;
                if (running && !paused) {
                    clearInterval(slideshowTimer);
                    slideshowTimer = setInterval(changeSlides, 7000);
                }
            }
        });

        // Stop slideshow when user leaves page
        $(window).on('blur', function() {
            clearInterval(slideshowTimer);
            paused = true;
        });

        // Restart slideshow when user comes back
        $(window).on('focus', function() {
            paused = false;
            if (running && !paused) {
                clearInterval(slideshowTimer);
                slideshowTimer = setInterval(changeSlides, 7000);
            }
        });

        // Method to show the top slide
        var showTopSlide = function() {
            if (running) {
                // Automatic
                topSlide.hide();
                topSlide.show("slide", {direction: "up"}, 1000);
                bottomSlide.hide("slide", {direction: "down"}, 1000);
            } else {
                // User requested
                topSlide.show("slide", {direction: "up"}, 1000);
                middleSlide.hide("slide", {direction: "down"}, 1000);
                bottomSlide.hide("slide", {direction: "down"}, 1000);
            }

            // Change slide controls
            setSelectedControlTo('#left');
            setNoLongerSelectedTo('#center', '#right');
        }

        // Method to show the middle slide
        var showMiddleSlide = function() {
            if (running) {
                // Automatic
                middleSlide.hide();
                middleSlide.show("slide", {direction: "up"}, 1000);
                topSlide.hide("slide", {direction: "down"}, 1000);
            } else {
                // User requested
                middleSlide.hide();
                middleSlide.show("slide", {direction: "up"}, 1000);
                topSlide.hide("slide", {direction: "down"}, 1000);
                bottomSlide.hide("slide", {direction: "down"}, 1000);
            }

            // Introduce content
            $('#coding-slide-content h1').delay(750).slideDown(750);
            $('#coding-slide-content h3').delay(1500).slideDown(750);

            // Change slide controls
            setSelectedControlTo('#center');
            setNoLongerSelectedTo('#left', '#right');
        }

        // Method to show the bottom slide
        var showBottomSlide = function() {
            if (running) {
                // Automatic
                bottomSlide.hide();
                bottomSlide.show("slide", {direction: "up"}, 1000);
                middleSlide.hide("slide", {direction: "down"}, 1000);
            } else {
                // User requested
                bottomSlide.hide();
                bottomSlide.show("slide", {direction: "up"}, 1000);
                topSlide.hide("slide", {direction: "down"}, 1000);
                middleSlide.hide("slide", {direction: "down"}, 1000);
            }

            // Introduce content
            $('#minigame-slide-content h1').delay(750).slideDown(750);
            $('#minigame-slide-content h3').delay(1500).slideDown(750);

            // Change slide controls
            setSelectedControlTo('#right');
            setNoLongerSelectedTo('#left', '#center');
        }

        var counter = 2;

        // Method to auto-change slides
        var changeSlides = function() {
            if (counter === 1) {
                showTopSlide();
                counter++;
                initialLoop = false;
            } else if (counter === 2) {
                showMiddleSlide();
                counter++;
            } else if (counter == 3) {
                showBottomSlide();
                counter = 1;
            }
        }
        clearInterval(slideshowTimer);
        slideshowTimer = setInterval(changeSlides, 7000);

        // Only show controls when user hovers over slideshow
        var slideControls = [$('#left'), $('#center'), $('#right')];

        for (let i = 0; i < slideControls.length; i++) {
            slideControls[i].css('opacity', 0);
        }

        var offsetEase;
        var looping = false;

        $('#summary').hover(function() {
            if (!looping) { offsetEase = 0 };
            for (let i = 0; i < slideControls.length; i++) {
                slideControls[i].delay(offsetEase).animate({opacity: '1'}, 400);
                offsetEase += 100;
                looping = true;
            }
            looping = false;
        }, function() {
            offsetEase = 0;
            for (let i = 0; i < slideControls.length; i++) {
                slideControls[i].delay(offsetEase).animate({opacity: '0'}, 400);
                offsetEase += 100;
            }
        });

        // Handle user request to change slide
        $('.slideshow-control-button').on('click', function() {
            running = false;
            if ($(this).is('#left')) {
                clearInterval(slideshowTimer);
                if (counter != 1 || initialLoop) {
                    initialLoop = false;
                    showTopSlide();
                    setSelectedControlTo('#left');
                    setNoLongerSelectedTo('#center', '#right');
                    counter = 1;
                }
            } else if ($(this).is('#center')) {
                clearInterval(slideshowTimer);
                if (counter != 2 || initialLoop) {
                    initialLoop = false;
                    showMiddleSlide();
                    setSelectedControlTo('#center');
                    setNoLongerSelectedTo('#left', '#right');
                    counter = 2;
                }
            } else {
                clearInterval(slideshowTimer);
                if (counter != 3 || initialLoop) {
                    initialLoop = false;
                    showBottomSlide();
                    setSelectedControlTo('#right');
                    setNoLongerSelectedTo('#left', '#center');
                    counter = 3;
                }
            }
        });

        // Method to change selected slideshow control
        var setSelectedControlTo = function(applyControlTo) {
            var changeMe = $(applyControlTo);

            changeMe.addClass('active');
            changeMe.removeClass('not-active');
        }

        // Method to remove focus from previously selected slideshow controls
        var setNoLongerSelectedTo = function(elem1, elem2) {
            var elemToChange1 = $(elem1);
            var elemToChange2 = $(elem2);

            elemToChange1.addClass('not-active');
            elemToChange1.removeClass('active');

            elemToChange2.addClass('not-active');
            elemToChange2.removeClass('active');
        }
    }

    // Initiate slideshow
    var minigameSlide = $('#minigames');
    var codingSlide = $('#coding-passion');
    var websiteSlide = $('#stunning-websites');
    slideshow(websiteSlide, codingSlide, minigameSlide);

    // Link leading user to my github profile
    $('.slideshow-content a').hover(function () {
        $(this).animate({color: '#808080'}, 200);
    }, function() {
        $(this).animate({color: '#ffffff'}, 200);
    });

    // Load iframe element after all other elements
    $('#blog-frame').attr('src', 'https://jameshuntcode.wordpress.com');
});
