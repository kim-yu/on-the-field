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

function produce_play() {
    "use strict";
    // THROWER
    // (subject) + (throw_actions) + (type_description)? + (types)

    var thrower_text = ['<span>' + choose(subject) + '</span>', choose(throw_actions)]

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

    var thrower_subject = document.getElementById('throw');
    thrower_subject.innerHTML = thrower_textList;
    var thrower_rect = thrower_subject.getBoundingClientRect();

    var disc_start_top;
    switch (type) {
        case 'a high-release':
            console.log('high');
            disc_start_top = thrower_rect.top;
            break;
        case 'a low-release':
            console.log('low');
            disc_start_top = thrower_rect.top + parseInt($('#thrower_subject').height() / 2);
            break;
        default:
            console.log('no');
            disc_start_top = thrower_rect.top + parseInt($('#thrower_subject').height() / 4);
            break;
    } 
    var disc_start_left = thrower_rect.left + $('#thrower_subject').width() + 5;

    // DISC
    // (names_for_disc)
    var disc_text = choose(names_for_disc);
    var disc = document.getElementById("disc");
    disc.style.top = disc_start_top + 'px';
    disc.style.left = disc_start_left + 'px';
    disc.innerHTML = disc_text;
    console.log(disc.style.top);
    console.log(disc.style.left);
    
    // CATCHER
    // (subject) + (catch_actions)

    var catch_action = choose(catch_actions);
    var disc_end_top;
    var disc_end_left;
    var catcher_rect;
    
    if (catch_action == 'jumps') {
        var catcher_text = ['<span>' + choose(subject) + '</span>', catch_action, 'to catch', 'it'];
        var catcher_textList = "";
        for (var i = 0; i < catcher_text.length; i++) {
            catcher_textList += "<li>" + catcher_text[i] + "</li>"
        }
        var catcher_sky = document.getElementById("catch_sky");
        catcher_sky.innerHTML = catcher_textList;
        catcher_rect = catcher_sky.getBoundingClientRect();

        disc_end_top = catcher_rect.top - 150;
        disc_end_left = catcher_rect.left - $('#disc').width() - 5;

        setTimeout(
            function() {
                $(function () {
                    $("#disc").animate({
                        top: disc_end_top + 'px',
                        left: disc_end_left + 'px'
                    }, { duration: 1500, queue: false });

                    $("#catcher_sky").animate({
                        top: catcher_rect.top - 200 + 'px' 
                    }, { duration: 1500, queue: false });
                });
            },
            300
        );
    } else if (catch_action == 'lays out') {
        var catcher_text = '<span>' + choose(subject) + '</span>' + ' ' + catch_action + ' to catch it';
        var catcher_grass = document.getElementById("catcher_grass")
        catcher_grass.innerHTML = catcher_text;
        catcher_rect = catcher_grass.getBoundingClientRect();

        disc_end_top = catcher_rect.top + 50;
        disc_end_left = catcher_rect.left - $('#disc').width() - 100;

        setTimeout(
            function() {
                $(function () {
                    $("#disc").animate({
                        top: disc_end_top + 'px',
                        left: disc_end_left + 'px'
                    }, { duration: 1500, queue: false });

                    $("#catcher_grass").animate({
                        top: catcher_rect.top + 50 + 'px',
                        left: catcher_rect.left - 50 + 'px' 
                    }, { duration: 1500, queue: false });
                });
            },
            300
        );
    } else {
        var catcher_text = ['<span>' + choose(subject) + '</span>', catch_action, 'to catch', 'it'];
        var catcher_textList = "";
        for (var i = 0; i < catcher_text.length; i++) {
            catcher_textList += "<li>" + catcher_text[i] + "</li>"
        }
        var catcher_sky = document.getElementById("catch_sky");
        catcher_sky.innerHTML = catcher_textList;
        catcher_rect = catcher_sky.getBoundingClientRect();

        disc_end_top = catcher_rect.top;
        disc_end_left = catcher_rect.left - $('#disc').width() - 5;

        setTimeout(
            function() {
                $('#disc').animate({
                    top: disc_end_top + 'px',
                    left: disc_end_left - 100 + 'px'
                }, { duration: 1500, queue: false });

                $('#catcher_sky').animate({
                    left: catcher_rect.left - 100 + 'px'
                }, { duration: 1500, queue: false })
            },
            300
        );
    }
    
}
