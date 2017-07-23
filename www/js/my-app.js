// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

var collection_of_words = [
    ['T','A','B','L','E'],
    ['C','H','A','I','R'],
    ['D','O','O','R'],
    ['W','I','N','D','O','W']
];


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    /*on load*/
    var word = collection_of_words[Math.floor(Math.random()*collection_of_words.length)];
    var get_word = getWord(word);
    $('.text-container').html(get_word);

     /*keyboard event*/
    $$('.keyboard a').on('click', function(){
        var elem = this;
        inputLetter(elem);
    });

});


/***********************************custom function***********************************/

/*get word and display*/
function getWord(word){
    var html = '';
    $.each(word, function( index, value ) {
        html += '<input class="letters letters_'+index+'" type="text" alt="'+value+'">';
    });
    return html;
}

/*get word and display*/
function inputLetter(elem){
    var letter = $(elem).html();
    var input_elem = $('.text-container input');

    $.each(input_elem, function(index, item) {
        if($(item).val() === ''){
            $(item).val(letter);
            letterChecker($(item));
            wordChecker(index,input_elem);
            return false;
        }
    });
}

/*letter checker*/
function letterChecker(input_elem){

    var correct_letter = input_elem.attr('alt');
    var user_input_letter = input_elem.val();

    if(correct_letter != user_input_letter){

        var current_image_index = $('.banner-img').attr('alt');
        var display_image_index = parseInt(current_image_index) + 1;

        $('.banner-img').attr("src","img/life/life_"+display_image_index+".gif");
        $('.banner-img').attr('alt', display_image_index);

        input_elem.css('background','red');
        input_elem.css('color','white');
        input_elem.delay( 800 ).val('');
    }else{
        input_elem.css('background','white');
        input_elem.css('color','black');
    }

}

/*word checker*/
function wordChecker(index,input_elem){

    var correct_word = input_elem.map(function() {
            return $(this).attr('alt');
    }).get();

    var correct_word_lenght = correct_word.length;

    if(correct_word_lenght == (index+1)){

        var user_input_word = input_elem.map(function() {
            return $(this).val();
        }).get();

        var correct_word = correct_word.join("");
        var user_input_word = user_input_word.join("");

        if(correct_word === user_input_word){
            myApp.alert('You are correct', 'Custom Title!');
        }else{
            myApp.alert('You are wrong', 'Custom Title!');
        }

    }

    
}

/**/


