$(function () {

  $('#bump-queue').submit(function () {
    var roomId = $('#control-code').val().trim(),
        song   = $('#song-id').val().trim();

    console.log('%s, %s', roomId, song);

    $.ajax({
      url: '/bump',
      type: 'POST',
      data: {
        roomId: roomId,
        song: song
      },
      success: function (data, textStatus, xhr) {
        console.log(data, textStatus);
      },
      error: function (xhr, textStatus, err) {
        console.log(err, textStatus);
      }
    })

    return false;
  });
});
