document.write();
$(document).ready(function () {
    var input;
    var textarea;
    $('#sign').on('submit',function (e) {
        e.preventDefault();
        if(textarea>=1||input>=1){
            return bad_message('你輸入的資料已超過字數限制!')
        }
        $('input[type=submit]').prop('disabled',true)
        const form = $('#sign').serialize();
        $.ajax({
            url: "/apply/register",
            type: 'POST',
            data:  form,
            success: function (data) {
                good_message(data);
                setTimeout(function () {
                    window.location.href='/';
                },1000)

            }, error: function (data) {
                bad_message(data.responseText)
                setTimeout(function () {
                    $('input[type=submit]').prop('disabled',false);
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
    $('input').on('input',function () {
        input=$('input').length;
        $('input').each(function () {
            if($(this).val().length>30){
                $(this).css('border-color','red');
                input++;
            }else{
                $(this).css('border-color', '#e5e6e7');
                input--;
            }
        })
    })
    $('textarea').on('input',function () {
        textarea=$('textarea').length;
        $('textarea').each(function () {
            if($(this).val().length>200){
                $(this).css('border-color','red');
                textarea++;
            }else {
                $(this).css('border-color', '#e5e6e7');
                textarea--;
            }
        })
    })
})