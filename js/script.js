$(function() {

   $('button').on('click', function(event) {
      event.preventDefault();

      var $hashtag = $('.search-bar').val();
      var list = '';

      console.log($hashtag);

      $('header').addClass('results-header');

      $('.photo-grid').empty();

      $.ajax({
         dataType:'jsonp',
         method: 'GET',
         url:
         'https://api.instagram.com/v1/tags/'+$hashtag+'/media/recent?count=12&client_id=b8586475183a4ad89a5a0ebd4a36fbc2'
      })
      .done(function(instagramApiResponse) {
         console.log(instagramApiResponse);
         $.each(instagramApiResponse.data, function(index, value){
            list += '<li>';
            list += '<div class="item-cont"><a href="'+value.link+'">';
            list += '<img src="'+value.images.standard_resolution.url +'"></a>';
            list += '<div class="transparent">';
            list += '<img src="'+value.user.profile_picture+'" class="user-pic" />';
            list += '<div class="social-info"><span class="user-name">'+value.user.username+'</span>';
            list += '<span><i class="fa fa-comments"></i>'+value.comments.count;
            list += '<i class="fa fa-heart"></i>'+value.likes.count+'</span>';
            list += '</div></div></div></li>';
            console.log(list);
         });
      $('.photo-grid').append(list);
      });
   });



   //end document
});
