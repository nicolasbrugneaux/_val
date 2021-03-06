var http            = require( 'http' ),
    https           = require( 'https' ),
    irc             = require( 'irc' );
    fs              = require( 'fs' ),
    moonRegex       = /(?:m([o]+)n)/,
    spaceRegex      = /(?:sp([a]+)ce)/,
    nicoFlipped     = false;

module.exports = function PlainText( _bot, apiGet, userData, userConfig, nouns )
{
    return function( from, to, text, botText )
    {
        var command = text.slice( 1 ).split( ' ' )[ 0 ];
        var moon    = moonRegex.exec( command );
        var space   = spaceRegex.exec( command );

        if ( command.slice( command.length - 3 ) === 'end' )
        {
            var num = Math.floor( Math.random() * ( nouns.length ) );
            var noun = nouns[ num ];

            botText = command + 's ' + noun[ 0 ];

            var target = text.split( ' ' );

            if ( target && target[ 1 ] )
            {
              var connections = [ ' to ', ' at ' ];
              num = Math.floor( Math.random() * ( connections.length ) );
              botText += connections[ num ] + target[ 1 ];
            }
            _bot.action( from, botText );
            botText = '';

        }
        else if ( command.slice( command.length - 5 ) === 'fetti' )
        {
            var type = command.slice( 0, command.length - 5 );
            var word = type;

            switch ( type )
            {
                case 'doge':
                    word = [ 'wow ', 'Ð ', 'doge ', 'moon ', 'ÐÐÐ ', 'such ', 'is ' ];
                    break;
                case 'con':
                    word = '´ . \' ';
                    break;
                case 'spooky':
                    word = [ '\\༼☯༽/ ', '༼°°༽ ', 'SPOOKY ', 'GHOSTS ' ];
                    break;
                case 'moon':
                    word = [ 'moon ', 'moooooooon ', 'doge ', 'wow ' ];
                    break;
                case 'troll':
                    word = [ 'http://trololololololololololo.com/', 'http', 'trolo', 'lolo', 'ololo.com', 'troll'  ];
                    break;
                case 'trøll':
                    word = [ 'http://trølølølølølølølølølølø.cøm/', 'http', 'trølø', 'lølø', 'ølølø.cøm', 'trøll'  ];
                    break;
                case 'xmas':
                case 'christmas':
                    word = [ 'ʕ◔ᴥ◔ʔ ', '☃ ', 'presents ', '✦ ', 'santa ', '⁂ ', 'satan ' ];
                    break;
            }

            if ( type.length > userConfig.fettiWordLength )
            {
                word = 'toolong';
            }

            if ( typeof word === 'string' )
            {
                word = [ word ];
            }

            var i, lenI, option;

            for ( i = 0, lenI = userConfig.fettiOptions.length; i < lenI; i++ )
            {
                word.push ( userConfig.fettiOptions[ i ] + ' ' );
            }

            for ( i = 0; i < userConfig.fettiLength; i++ )
            {
                option   = Math.floor( Math.random() * word.length );
                botText += word[ option ];
            }
        }
        else if ( moon && moon[1] )
        {
            botText = 'm';
            var moonLength = moon[1].length;
            for ( var j = 0; j < moonLength; j++ )
            {
              botText += 'ooo';
            }
            botText += 'n';

            if ( moonLength < 4 )
            {
              botText = 'To the ' + botText + '!';
            }
            if ( moonLength > 6 )
            {
              botText = botText.toUpperCase() + '!!!!!!!!';
            }
        }
        else if ( space && space[1] )
        {
            botText = 'sp';
            var spaceLength = space[1].length;
            for ( var k = 0, lenK = spaceLength; k < lenK; k++ )
            {
              botText += 'aa';
            }
            botText += 'ce';
            botText = botText.toUpperCase() + '!!!!';
        }
        else
        {
            switch ( command )
            {
                case 'fight':
                    botText = '(ง︡\'-\'︠)ง';
                    break;
                case 'levelSelect':
                    botText = 'B A B A ↑ ↓ B A ← → B A (start)';
                    break;
                case 'konami':
                    botText = '↑ ↑ ↓ ↓ ← → ← → B A (start)';
                    break;
                case 'rain':
                    botText = 'ヽ｀、ヽ｀ヽヽ｀、ヽ｀ヽヽ｀、ヽ｀ヽ(¬_¬ )ヽ｀、ヽ｀ヽ｀、ヽ｀';
                    break;
                case 'dance':
                    botText = '♪┏(・o･)┛♪┗ ( ･o･) ┓♪';
                    break;
                case 'domo':
                    botText = '\\|°▿▿▿▿°|/';
                    break;
                case 'barrelroll':
                    botText = '(._.)  ( l: )  ( .-. )  ( :l )  (._.)';
                    break;
                case 'hedgehog':
                    botText = '(•ᴥ• )́`́\'́`́\'́⻍ ';
                    break;
                case 'lurk':
                    botText = '┬┴┬┴┤(･_├┬┴┬┴';
                    break;
                case 'lurkbear':
                    botText = '┬┴┬┴┤ʕ•ᴥ├┬┴┬┴';
                    break;
                case 'wave':
                    botText = to + ' o/';
                    break;
                case 'internet':
                    botText = 'ଘ(੭*ˊᵕˋ)੭* ̀ˋ ɪɴᴛᴇʀɴᴇᴛs';
                    break;
                case 'cornflakes':
                case 'snowflakes':
                    botText = '❅ ❆ ❄ ❆ ❆ ❄ ❆ ❅ ❆ ❆ ❅ ❆ ❄ ❄ ❅ ❄ ❆ ❆ ❆ ❄ ❆ ❆ ❄ ❆ ❆ ❅ ❅ ❄ ❄ ❅ ❄ ❄ ❄ ❆ ❄ ❅ ❆ ❅ ❅ ❄';
                    break;
                case 'moonflakes':
                    botText = '☽ ❅ ❅ ❄ ☾ ❆ ❅ ☽ ❆ ❆ ☾ ❅ ☽ ☾ ❄ ❅ ☾ ❄ ☽ ☽ ❆ ☽ ❄ ❄ ☾ ☾ ❆ ☾ ❅ ☾ ☾ ❅ ❄ ☾ ❄ ☾ ❅ ❄ ☾ ❆';
                    break;
                case 'whale':
                    botText = 'https://www.youtube.com/watch?v=xo2bVbDtiX8';
                    break;
                case 'safety':
                    botText = 'https://www.youtube.com/watch?v=AjPau5QYtYs';
                    break;
                case 'tacos':
                    botText = 'https://www.youtube.com/watch?v=W0-esOKooEE&index=28&list=RDHsKXvAymwUg';
                    break;
                case 'flipnico':
                    botText     = '(╯°Д°）╯︵/(.□ . ) ᵇᵘᵗ ᴵ\'ᵐ ᶰᶦᶜᵒ﹗';
                    nicoFlipped = true;
                    _bot.say( 'nico, I\'m so sorry! ' + to + ' just flipped you like a little turtle. It\'s not my fault, I swear!! Now you\'re stuck on your back in ' + from + ' ' );
                    break;
                case 'putthenicoback':
                    botText     = '(._. ) ノ( ゜-゜ノ)';
                    nicoFlipped = false;
                    break;
                case 'shrug':
                    botText     = '¯\\_(ツ)_/¯';
                    break;
                case 'yes!':
                    botText = '( ･ㅂ･)و ̑̑';
                    break;
                case 'no!':
                    botText = '｡゜(｀Д´)゜｡';
                    break;
                case 'why?!':
                    botText = 'ლ(ಠ_ಠლ)';
                    break;
                case 'why!?':
                    botText = 'щ(ಥДಥщ)';
                    break;
                case '...':
                    botText = 'ಠ_ಠ';
                    break;
                case 'facepalm':
                    botText = '(－‸ლ)';
                    break;
                case 'bot':
                    botText = 'I AM BOT\nINSERT DOGE';
                    break;
                case 'disappearinacloudofsmoke':
                    setTimeout( function(){ _bot.say( from, 'I mean...  why would you just assume you can have any new ability you want....' ) }, 5500 );
                    botText = 'no...  you don\'t have that ability.  stupid.';
                    break;
                case 'google':
                    text = text.split( ' ' ).slice( 1 ).join( '%20' );
                    botText = 'http://www.lmgtfy.com/?q=' + text;
                    break;
                case 'w':
                case 'wiki':
                    text = text.split( ' ' ).slice( 1 ).join( '%20' );
                    botText = 'http://en.wikipedia.org/wiki/' + text;
                    break;
                case 'g':
                case 'pic':
                case 'gif':
                    text = text.split( ' ' ).slice( 1 ).join( '%20' );
                    if ( command === 'gif' )
                    {
                        text += '%20filetype:gif';
                    }
                    botText = 'https://www.google.com/search?btnG=1&nfpr=1&pws=0&q=' + text;
                    if ( command === 'gif' || command === 'pic' )
                    {
                        botText += '&tbm=isch';
                    }
                    break;
                case 'witchhunt':
                    botText = 'http://i.imgur.com/x63cdJW.jpg';
                    break;
                case 'wow':
                    botText = 'https://i.imgur.com/8rhlusE.gif';
                    break;
                case 'flipthetable':
                    botText = '(╯°□°）╯︵ ┻━┻';
                    break;
                case 'chilloutbro':
                case 'putthetableback':
                    botText = '┬──┬ ノ( ゜-゜ノ)';
                    break;
                case 'vampire':
                    botText = '(°,..,°)';
                    break;
                case 'ping':
                    botText = to + ': pong';
                    break;
                case 'isnicoflipped':
                    if ( nicoFlipped === true )
                    {
                        botText = 'yes';
                    }
                    else
                    {
                        botText = 'no';
                    }
                    break;
                case 'badyoutube':
                case 'germanysgottalent':
                    var choices = [ 'https://www.youtube.com/watch?v=IeWAPVWXLtM',
                                    'https://www.youtube.com/watch?v=dNUUCHsgRu8',
                                    'https://www.youtube.com/watch?v=PJQVlVHsFF8'
                                    ];
                    var choice = Math.floor( Math.random() * choices.length );
                    botText = choices[ choice ];
                    break;
            }
        }

        if ( nicoFlipped === true && to === 'nico' && command !== 'flipnico' && command !== 'putthenicoback' && command !== 'isnicoflipped' )
        {
            botText = 'I\'m sorry, nico... I can\'t hear you while you\'re flipped';
        }

        return botText;
    };
};