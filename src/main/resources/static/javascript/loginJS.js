$('#put').click(function () {
    let userId = $('#userId').val()
    if ('' === userId) {
        alert('用户ID不能为空')
        return
    }

    let password = $('#password').val()
    if ('' === password) {
        alert('密码不能为空')
        return
    }

    let type = $('input:radio[name="type"]:checked').val()
    if (null == type) {
        alert('账号类型不能为空')
        return
    }

    $.ajax({
        type: 'POST',
        url: '/putLoginInfo',
        data: {'userId': userId, 'password': password, 'type': type},
        success: function (data) {
            if (2 == data) {    // 成功
                window.location.href = "/main";
            }
            else if (1 == data) {
                alert('密码错误');
                $('#password').val('')
            }
            else if (0 == data) {
                alert('用户名不存在')
                $('#userId').val('')
                $('#password').val('')
            }
        }
    })
})