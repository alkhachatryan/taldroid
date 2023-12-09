function nextMove(color)
{
    $('.piece').removeClass('taldroid-hnt')
    $('.piece').removeClass('taldroid-hnt')
    const classes = []
    $('div.piece').each(function (index) {
        classes.push($(this).attr('class'))
    })
    $.ajax({
        contentType: "application/json; charset=utf-8",
        url: 'http://localhost:8000',
        type:'post',
        data: JSON.stringify({
            pieces: classes,
            to_move: color
        })
    }).done(function (res) {
        const map = {
            a: 1,
            b: 2,
            c: 3,
            d: 4,
            e: 5,
            f: 6,
            g: 7,
            h: 8,
        }
        const from = res['moves'][0]
        const to = res['moves'][1]
        const fromClassName = '.square-' + map[from[0]] + from[1];
        const toClassName = '.square-' + map[to[0]] + to[1];
        $(fromClassName).addClass('taldroid-hnt')
        $(toClassName).addClass('taldroid-hnt')

        $("#mtd").val(res['moves'][0] + ' ' + res['moves'][1])
    })
}

if (
    location.href.startsWith('https://www.chess.com/play')
    || location.href.startsWith('https://www.chess.com/game')
) {
    const $board = jQuery("wc-chess-board");
    $board.ready(function () {
        setTimeout(function () {
            jQuery('html').prepend('<button id="gnmw" style="position: absolute; left: 100px; top: 100px; width: 50px; z-index: 9999999">WHITE TO MOVE</button>')
            jQuery('html').prepend('<button id="gnmb" style="position: absolute; left: 100px; top: 200px; width: 50px; z-index: 9999999">BLACK TO MOVE</button>')
            jQuery('html').prepend('<input type="text" id="mtd" style="position: absolute; left: 100px; top: 300px; width: 50px">')
            jQuery('html').prepend('<style>.taldroid-hnt {background-color: red!important;}</style>')
        }, 2000)

        $(document)
            .on('click', '#gnmw', function (e) {
                e.preventDefault();
                nextMove('white')
            })
            .on('click', '#gnmb', function (e) {
                e.preventDefault();
                nextMove('black')
            })
            .on('click', function (e) {
                $(".taldroid-hnt").removeClass('taldroid-hnt')
            })
    })
}




