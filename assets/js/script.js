$( document ).ready( function () {
    $('#intro-button').click( function () {
        console.log('intro');
        transitionTo('main');
    });
    $('#start-training-button').click( function () {
        startTraining(10);    
    });
});

function transitionTo(panel) {
	var id = '#' + panel + '-panel';
	$('.panel').fadeOut(300);
	setTimeout( function () {
		$(id).fadeIn(300);
	}, 300);
}

//Random generator
function getNCommands(num) {
    var commands = ['left', 'baseline', 'right'];
    var tempCommands = [];
    var outCommands = [];
    for (var i = 0; i < num; i++) {
        tempCommands = shuffle(commands);
        outCommands = outCommands.concat(tempCommands);
    }
    console.log(outCommands);
    return outCommands;
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function armUp(dir) {
    var arm = '#person-arm-' + dir;
    changeLabel(dir);
    if (dir == 'left') {
        moveBarIndicatorTo(0);
        $(arm).addClass('move-arm-left');
        setTimeout( function () {
            $(arm).removeClass('move-arm-left');
        }, 2000);
    } else if (dir == 'right') {
        moveBarIndicatorTo(100);
        $(arm).addClass('move-arm-right');
        setTimeout( function () {
            $(arm).removeClass('move-arm-right');
        }, 2000);
    } else {
        moveBarIndicatorTo(50);    
    }
}

function changeLabel(label) {
    if (label == null) {
        $('#command-label').text('');    
    } else {
        $('#command-label').text(label);    
    }
}

function startTraining(num) {
    var commandList = getNCommands(num);
    commandList.forEach( function (command, i) {
        setTimeout( function () {
            armUp(command);     
        }, 2500*i);
    });
    setTimeout( function () {
        changeLabel();
    }, 2500*commandList.length);
}

function moveBarIndicatorTo(percentage) {
    if ( percentage < 0 ) {
        percentage = 0;    
    } else if (percentage > 100) {
        percentage = 100;    
    }
    var left = percentage*475/100;
    $('#estimate-indicator').css({'left':left});
}