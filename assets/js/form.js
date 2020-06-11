document.write();
$(document).ready(function () {
    $('#sign').on('submit',function (e) {
        e.preventDefault();
        const sheet=$('#sign')[0];
        var form = new FormData(sheet);
        form.append('file',$('input[type=file]')[0].files[0]);
        $.ajax({
            url: "/apply/register",
            type: 'POST',
            contentType: false,
            processData: false, // required
            data:  form,
            success: function (data) {
                alert(data);
                window.location('/');
            }, error: function (data) {
                alert(data.responseText)
                setTimeout(function () {
                    $('.create').prop('disabled',false);
                },1000)
            }
        });
    })
    $('#clear').on('click',function (e) {
        e.preventDefault();
        $('input[type=text],input[type=file], select, textarea').each(function () {
            $(this).val('');
        })
    })
})