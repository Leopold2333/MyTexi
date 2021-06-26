$('#put').click(function () {
    let userName = $('#userName').val()
    if ('' === userName) {
        alert('用户名不能为空')
        return
    }

    let password = $('#password').val()
    if ('' === password) {
        alert('密码不能为空')
        return
    }

    let type = $('#type').val()
    if ('' === type) {
        alert('账号类型不能为空')
        return
    }

    $.ajax({
        type: 'POST',
        url: '/putRegisterInfo',
        data: {'userName': userName, 'password': password, 'type': type},
        success: function (data) {
            alert('注册成功 您的账户是:' + data)
            $('#userName').val('')
            $('#password').val('')
        }
    })

})

