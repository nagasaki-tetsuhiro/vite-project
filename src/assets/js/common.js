$(function() {

  // ファイル削除ボタン
  $(".file-upload__delete").on('click',function(){
    $(this).parent().remove();
  });

  $(document).on('click', '.file-upload__delete', function () {
		$(this).parent().remove();
	});
  
});