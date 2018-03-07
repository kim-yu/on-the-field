var subject = ['she', 'he']

var throw_actions = ['throws', 'hucks'];
var type_description = ['an IO', 'an OI', 'a high-release', 'a low-release', 'an off-hand', 'a floaty', 'a lasery', 'a wobbly'];
var types = ['forehand', 'backhand', 'hammer', 'scoober', 'thumber', 'push pass', 'greatest'];

var names_for_disc = ['frisbee', 'disc', 'flatball'];

var catch_actions = ['jumps', 'lays out', 'runs'];

function rand_range(maximum) {
    "use strict";
    return Math.floor(Math.random() * (maximum + 1));
}

function range(start, end) {
    var array = [];
    var i = start;
    while (i < end) {
        array.push(i);
        i++;
    }
    return array;
}

function choose(array) {
    "use strict";
    return array[rand_range(array.length - 1)];
}

function produce_play(score) {
    "use strict";
    // THROWER
    // (subject) + (throw_actions) + (type_description)? + (types)

    document.getElementById('play').innerHTML = "";

    // initialize elements
    var disc = document.createElement('div');
    disc.id = 'disc';

    var thrower_subject = document.createElement('div');
    thrower_subject.id = 'thrower_subject';
    thrower_subject.className = 'people';

    var thrower_subject_contents = document.createElement('ul');
    thrower_subject_contents.className = 'stack';
    thrower_subject.appendChild(thrower_subject_contents);

    var catcher_sky = document.createElement('div');
    catcher_sky.id = 'catcher_sky';
    catcher_sky.className = 'people';

    var catcher_sky_contents = document.createElement('ul');
    catcher_sky_contents.className = 'stack';
    catcher_sky.appendChild(catcher_sky_contents);

    var catcher_grass = document.createElement('div');
    catcher_grass.id = 'catcher_grass';
    

    var scoreText = score.replace('<span>','').replace('</span>','').split(' - ');
    var different = parseInt(scoreText[0]);
    var same = parseInt(scoreText[1]);

    var thrower = choose(subject)
    var thrower_text = ['<span>' + thrower + '</span>', choose(throw_actions)]

    if (choose(range(1,3)) == 1) {
        var type = choose(type_description)
        thrower_text.push(type)
    }  else {
        thrower_text.push('a')
    }

    thrower_text.push(choose(types))

    var thrower_textList = "";
    for (var i = 0; i < thrower_text.length; i++) {
        thrower_textList += "<li>" + thrower_text[i] + "</li>"
    }

    thrower_subject_contents.innerHTML = thrower_textList;
    document.getElementById('play').appendChild(thrower_subject);
    var thrower_rect = thrower_subject.getBoundingClientRect();

    var disc_start_top;
    switch (type) {
        case 'a high-release':
            disc_start_top = thrower_rect.top;
            break;
        case 'a low-release':
            disc_start_top = thrower_rect.top + parseInt($('#thrower_subject').height() / 2);
            break;
        default:
            disc_start_top = thrower_rect.top + parseInt($('#thrower_subject').height() / 4);
            break;
    } 
    var disc_start_left = thrower_rect.left + $('#thrower_subject').width() + 5;

    // DISC
    // (names_for_disc)
    var disc_text = choose(names_for_disc);
    disc.style.top = disc_start_top + 'px';
    disc.style.left = disc_start_left + 'px';
    disc.innerHTML = disc_text;
    document.getElementById('play').appendChild(disc);
    
    // CATCHER
    // (subject) + (catch_actions)
    var catcher = choose(subject)
    var catch_action = choose(catch_actions);
    var disc_end_top;
    var disc_end_left;

    if (catch_action == 'jumps') {
        var catcher_text = ['<span>' + catcher + '</span>', catch_action, 'to catch', 'it'];
        var catcher_textList = "";
        for (var i = 0; i < catcher_text.length; i++) {
            catcher_textList += "<li>" + catcher_text[i] + "</li>"
        }
        catcher_sky_contents.innerHTML = catcher_textList;
        document.getElementById('play').appendChild(catcher_sky);
        var catcher_sky_rect = document.getElementById('catcher_sky').getBoundingClientRect();

        disc_end_top = catcher_sky_rect.top - 150;
        disc_end_left = catcher_sky_rect.left - $('#disc').width() - 5;

        setTimeout(
            function() {
                $(function () {
                    $("#disc").animate({
                        top: disc_end_top + 'px',
                        left: disc_end_left + 'px'
                    }, { duration: 1500, queue: false });

                    $("#catcher_sky").animate({
                        top: catcher_sky_rect.top - 200 + 'px' 
                    }, { duration: 1500, queue: false });
                });
            },
            300
        );
    } else if (catch_action == 'lays out') {
        var catcher_text = '<span>' + catcher + '</span>' + ' ' + catch_action + ' to catch it';
        catcher_grass.innerHTML = catcher_text;
        document.getElementById('play').appendChild(catcher_grass);
        var catcher_grass_rect = document.getElementById('catcher_grass').getBoundingClientRect();

        disc_end_top = catcher_grass_rect.top + 70;
        disc_end_left = catcher_grass_rect.left - $('#disc').width() - 120;

        setTimeout(
            function() {
                $(function () {
                    $("#disc").animate({
                        top: disc_end_top + 'px',
                        left: disc_end_left + 'px'
                    }, { duration: 1500, queue: false });

                    $("#catcher_grass").animate({
                        top: catcher_grass_rect.top + 70 + 'px',
                        left: catcher_grass_rect.left - 70 + 'px' 
                    }, { duration: 1500, queue: false });
                });
            },
            300
        );
    } else {
        var catcher_text = ['<span>' + catcher + '</span>', catch_action, 'to catch', 'it'];
        var catcher_textList = "";
        for (var i = 0; i < catcher_text.length; i++) {
            catcher_textList += "<li>" + catcher_text[i] + "</li>"
        }
        catcher_sky_contents.innerHTML = catcher_textList;
        document.getElementById('play').appendChild(catcher_sky);
        var catcher_sky_rect = document.getElementById('catcher_sky').getBoundingClientRect();

        disc_end_top = catcher_sky_rect.top + parseInt($('#catcher_sky').height() / 2) - 30;
        disc_end_left = catcher_sky_rect.left - $('#disc').width() - 5;

        setTimeout(
            function() {
                $(function () {
                    $('#disc').animate({
                        top: disc_end_top + 'px',
                        left: disc_end_left - 120 + 'px'
                    }, { duration: 1500, queue: false });

                    $("#catcher_sky").animate({
                        left: catcher_sky_rect.left - 120 + 'px'
                    }, { duration: 1500, queue: false });
                });
            },
            300
        );
    }

    if (thrower == catcher) {
        same += 1;
    } else {
        different += 1;
    }

    document.getElementById('score').innerHTML = '<span>' + different + '</span>' + ' - ' + same;

    var message = "";
    if (same == 15 or different == 15) {
        if (same == 15) {
            message += 'Yay there were lots of cross gender scores!';
        } else {
            message += 'Hmmmmm "gender-hogging" much?';
        }
    } else {
        message += '<br />Check out <a href="https://www.usaultimate.org/equity/"></a> for more information about gender equity and ultimate frisbee.';
        alert(message);
    }
}
