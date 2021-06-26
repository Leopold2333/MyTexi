// 随着我们的js技术日益强大，thymeleaf 基本上就用于初始化了
$('#put').click(function () {
    let owner = $('#owner').val()
    let start_region = $('#start_region').val()
    let end_region = $('#end_region').val()

    $.ajax({
        type: 'POST',
        url: '/putCreateOrderInfo',
        data: {'owner': owner, 'start_region': start_region, 'end_region': end_region},
        success: function (data) {
            alert('创建成功')
            window.location.href = "/main"

        }
    })

})