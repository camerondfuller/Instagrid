$(function() {
   var list = '';
   var pagination = '';
   var responseFunc = function(instagramApiResponse) {
                        $.each(instagramApiResponse.data, function(index, value){
                           list += '<li>';
                           list += '<div class="photo-cont"><a href="'+value.link+'">';
                           list += '<img src="'+value.images.standard_resolution.url +'"></a>';
                           list += '<div class="user-info-cont">';
                           list += '<img src="'+value.user.profile_picture+'" class="user-pic" />';
                           list += '<div class="social-info"><span class="user-name">'+value.user.username+'</span>';
                           list += '<span><i class="fa fa-comments"></i>'+value.comments.count;
                           list += '<i class="fa fa-heart"></i>'+value.likes.count+'</span>';
                           list += '</div></div></li>';
                        });
                        $('.photo-grid').append(list);
                        pagination = instagramApiResponse.pagination.next_url;
                        list = '';
                     };

   $('.search-button').on('click', function(event) {
      event.preventDefault();

      var $hashtag = $('.search-bar').val();
      console.log($hashtag);

      $('header').addClass('results-header');
      $('.photo-grid').empty();
      $('.load-more').empty();
      if($hashtag === '') {
         $('.photo-grid').append('<li><p> Sorry, nothing to display.</p></li>');
      } else {
         $.ajax({
            dataType:'jsonp',
            method: 'GET',
            url:
            'https://api.instagram.com/v1/tags/'+$hashtag+'/media/recent?count=12&client_id=b8586475183a4ad89a5a0ebd4a36fbc2'
         })
         .done(responseFunc);
         $('.photo-grid').append(list);
         $('.load-more').append('<button class="add-content">Load More</button>');

         $('.add-content').on('click', function(event){
            event.preventDefault();

            $.ajax({
               dataType:'jsonp',
               method: 'GET',
               url: pagination
            })
            .done(responseFunc);
            $('photo-grid').append(list);
         });
      }
   });
});
