
function makePage(pageUrl, comments, favorites, likes, user) {
    
    let item = $('.gallery__item').first().clone();
    
    $(item).find('img').attr('src', pageUrl);
    let text        = document.createTextNode( ' ' + comments);
    let favText     = document.createTextNode( ' ' + favorites);
    let likesText   = document.createTextNode( ' ' + likes);

    $(text).insertAfter($(item).find('.icon__like'));
    $(favText).insertAfter($(item).find('.icon__favorite'));
    $(likesText).insertAfter($(item).find('.icon__comment'));
    $(item).find('.gallery__desc a ').text(user); 

    $('.gallery__grid').append(item);
}

function getFoto() {
    var API_KEY = '6749197-c46759db6d577b1d706cdf4d4';
    var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
    $.getJSON(URL, function(data){
    if (parseInt(data.totalHits) > 0) {
        
        $.each(data.hits, function(i, item){ 
            let pageUrl     = item.webformatURL;
            let comments    = item.comments;
            let favorites   = item.favorites;
            let likes       = item.likes;
            let user        = item.user;
    
            makePage(pageUrl, comments, favorites, likes, user);
         });
         $('.gallery__item').first().hide();
        }
    else
        console.log('No hits');
    });
}

$(document).ready(function(){
    getFoto();
    
    
    $('#search_name').on('focus', () => {
      $('body').addClass('focus');
    });
    $('#search_name').on('blur', () => {
      $('body').removeClass('focus');
    });
    
    
});