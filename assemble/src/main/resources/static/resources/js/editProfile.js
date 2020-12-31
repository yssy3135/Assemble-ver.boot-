$(document).ready(function() {
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#file-input").on('change', function(){
        readURL(this);
    });
    $("#modifySub").click(function(){
        alert("수정이 완료되었습니다.");
        document.frm.submit();
    });

});