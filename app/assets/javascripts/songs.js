$(document).ready(function(){

  // hide form on the index page
  // Prob could've done .hide() here?
  $('.new_song').hide(); // removeClass('new_song').addClass('hide_new_song');

  // Add new song link handler
  $('#new_link').click(function(event){

     event.preventDefault();

    // show form on the index page
    $('.new_song').show();

    // Hide the link to create a new song
    $('#new_link').hide();
  });

  // Add new song form handler
  $('#new_song').submit(function(){
      var $form = $('#new_song'),
          $name = $form.find("input[name='song[name]']"),
          $duration = $form.find("input[name='song[duration]']"),
          $price = $form.find("input[name='song[price]']"),
          request_data = {song: {name: $name.val(), duration: $duration.val(), price: $price.val() }};

      event.preventDefault();

      $.ajax({
        type: 'POST',
        url: '/songs',
        data: request_data,
        dataType: 'json'}).
        done(function(song_data){
          var songHTML = '';

          songHTML = "<li id='song_" + song_data.id + "'>Name: " + song_data.name;
          songHTML += ' <a href="/songs/' + song_data.id + '">Show</a>';
          songHTML += '</li>';

          $('#songs').append(songHTML);

          // clear out of the input fields
          $name.val('');
          $duration.val('');
          $price.val('');

          // hide form on the index page
          $('.new_song').hide();

          // Show the link to create a new song
          $('#new_link').show();


        });


  });
});
