
function makePage(pageUrl, comments, favorites, likes, user) {
    
    //let item = $('.gallery__item').first().clone();
    let grid  = $('.gallery__grid');
    
    let item  = $('<div></div>').addClass('gallery__item');
    let link  = $('<a></a>').attr('href', pageUrl);
    let img   = $('<img>').attr('src', pageUrl);
    let desc  = $('<div></div>').addClass('gallery__desc');
    let count = $('<div></div>').addClass('gallery__counts');
    let like  = $('<em></em>').append($('<i></i> ').addClass('icon icon__like')).append(likes);
    let fav   = $('<em></em>').append($('<i></i> ').addClass('icon icon__favorite')).append(favorites);
    let comm  = $('<em></em>').append($('<i></i> ').addClass('icon icon__comment')).append(comments);
    
    item.append(link.append(img));
    count.append(like).append(fav).append(comm);
    desc.append(count);
    item.append(desc);
    $('.gallery__grid').append(item);
}

function getFoto(name) {
    var name = name || 'money';
    
    var API_KEY = '6749197-c46759db6d577b1d706cdf4d4';
    var URL = "https://pixabay.com/api/?key="+API_KEY+"&per_page=4&min_width=350&q="+encodeURIComponent(name);
    $.getJSON(URL, function(data){
      console.log(data);
    if (parseInt(data.totalHits) > 0) {
        
        $.each(data.hits, function(i, item){ 
            let pageUrl     = item.webformatURL;
            let comments    = item.comments;
            let favorites   = item.favorites;
            let likes       = item.likes;
            let user        = item.user;
    
            makePage(pageUrl, comments, favorites, likes, user);
         });
        }
    else
        console.log('No hits');
    });
}

$(document).ready(function(){
    getFoto();
    
    let searchFrom = $('#search_name');
    searchFrom.on('focus', () => {
      $('body').addClass('focus');
    });
    searchFrom.on('blur', () => {
      $('body').removeClass('focus');
      searchFrom.val('');
    });
    
    $('.form-group').on('submit', (e) => {
      e.preventDefault();
      let value = searchFrom.val();
      console.log(value);
      $('.gallery__grid').html('');
      getFoto(value);
      searchFrom.val('');
    });
});