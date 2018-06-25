$(document).ready(function () {

    $("#time-remaining").hide();
    $("#start").on('click', game.startGame);
    $(document).on('click', '.selection', game.guessChecker);

})

var game = {

    correct: 0,
    incorrect: 0,
    unanswered: 0,
    i: 0,
    timer: 15,
    timerOn: false,
    timerId: '',

    questions: {
        a: "What is the highest mountain in Colorado?",
        b: "What festival is held in Nederland each year?",
        c: "What is Colorado's state animal?",
        d: "How many 14ers are there in Colorado?",
        e: "How many inches of precipitaion does Denver receive on average?",
        f: "What is the 24 hour record for most snowfall in Colorado?",
    },
    choices: {
        a: ["Mt Meeker", "Mt Elbert", "Pikes Peak", "Longs Peak"],
        b: ["Hemp Fest", "Wildflower Festival", "Marmot Festival", "Frozen Dead Guy Days"],
        c: ["Bighorn Sheep", "Marmot", "Elk", "Moose"],
        d: ["38", "48", "58", "68"],
        e: ["10", "12", "15", "20"],
        f: ["24 inches", "42 inches", "60 inches", "76 inches"],
    },
    answers: {
        a: "Mt Elbert",
        b: "Frozen Dead Guy Days",
        c: "Bighorn Sheep",
        d: "58",
        e: "15",
        f: "76 inches",
    },
    images: {
        a: "images/Mt_Elbert.jpg",
        b: "images/dead_guy.jpg",
        c: "images/sheep.jpg",
        d: "images/14ers.jpg",
        e: "images/rain.jpg",
        f: "images/snow.jpg",
    },


    startGame: function () {

        game.i = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        clearInterval(game.timerId);

        $('#game').show();

        $('#results').html('');

        $('#timer').text(game.timer);

        $('#start').hide();

        $('#time-remaining').show();

        game.startQuestions();

    },

    startQuestions: function () {

        game.timer = 15;
        $('#timer').text(game.timer);

        if (!game.timerOn) {
            game.timerId = setInterval(game.runTimer, 1000);
        }

        var indexQuestions = Object.values(game.questions)[game.i];
        $('#questions').text(indexQuestions)[game.i];

        var questionOptions = Object.values(game.choices)[game.i];

        $.each(questionOptions, function (key, val) {
            $('#choices').append($('<button class="selection btn btn-lg">' + val + '</button>'));
        })

    },

    runTimer: function () {
        if (game.timer > -1 && game.i < Object.keys(game.questions).length) {
            $('#timer').text(game.timer);
            game.timer--;
        } else if (game.timer === -1) {
            game.unanswered++;
            game.result = false;
            clearInterval(game.timerId);
            resultId = setTimeout(game.guessResult, 3000);
            $('#results').html('<h3>At least give it a guess! The answer was ' + Object.values(game.answers)[game.i] +
                '</h3>');
        } else if (game.i === Object.keys(game.questions).length) {
            $('#results').html('<p>Correct: ' + game.correct + '</p>' + '<p>Incorrect: ' + game.incorrect + '</p>' +
                '<p>Unanswered: ' + game.unanswered + '</p>');

            $('#game').hide();

            $('#start').show();
        }
    },

    guessChecker: function () {
        var timeOut;
        var currentAnswer = Object.values(game.answers)[game.i];
        var currentImage = Object.values(game.images)[game.i];

        if ($(this).text() === currentAnswer) {
            $(this).addClass('btn-warning');
            game.correct++;
            clearInterval(game.timerId);
            timeOut = setTimeout(game.guessResult, 1500);
            $('#results').html('<h3>Correct!</h3>' + '<img style="max-height:400px;" src=' +
                currentImage + '>');
        } else {
            $(this).addClass('btn-danger');
            game.incorrect++;
            clearInterval(game.timerId);
            timeOut = setTimeout(game.guessResult, 3000);
            $('#results').html('<h3>Nice try, but the answer was: ' + currentAnswer + '</h3>' +
                '<img style="max-height:400px;" src=' +
                currentImage + '>');
        }
    },

    guessResult: function () {
        game.i++;
        $('.selection').remove();
        $('#results h3').remove();
        $('#results img').remove();
        game.startQuestions();
    }
}