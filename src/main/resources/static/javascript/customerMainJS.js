// 建立web socket连接
let socket
let userId = $('#userId').text()
let host = window.location.host
let ws_url = 'ws://' + host + '/login/' + userId
socket = new WebSocket(ws_url)


//  被接收订单 和 验证码被司机输入
socket.onmessage = function(msg) {
    if ('accept' == msg.data) {

        // 接收到消息以后 通知后端修改状态 -- 这样可以确保前端收到了消息
        $.ajax({
            type: 'POST',
            url: '/orderAccepted',
            data: {},
            success: function (data) {
                alert('您的订单已经被接收')
                $('#state').text('2')
            }
        })

    }
    else if ('verified' == msg.data) {
        $.ajax({
            type: 'POST',
            url: '/onCar',
            data: {},
            success: function (data) {
                alert('司机已经确认您上车')
                $('#state').text('3')
                $('#arrive').show()
            }
        })
    }
    else {   // 数字 代表费用
        $('#cost').text(msg.data)
        $('#finishDiv').show()
    }
}

// 创建订单
$('#create').click(function() {
    window.location.href = '/createOrder'
})

// 查看订单
$('#lookUp').click(function () {
    window.location.href = '/lookUpOrder'
})

// 删除订单 (ajax)
$('#cancel').click(function () {
    $.ajax({
        type: 'POST',
        url: '/cancelOrder',
        data: {},
        success: function (data) {
            if ('ok' == data) {    // 成功
                alert('订单已被取消')
                $('#state').text('0')
                $('#lookUp').hide()
                $('#finish').hide()
                $('#cancel').hide()
                $('#create').show()
            }
            else {
                alert('取消失败')
            }
        }
    })
})

// 确认到达(ajax)
$('#arrive').click(function () {
    $.ajax({
        type: 'POST',
        url: '/arrive',
        success: function (data) {
            $('#state').text('4')
            $('#arrive').hide()
        }
    })
})

// 完成订单 (ajax)
$('#finish').click(function () {
    let comment = $('#comment').val()
    let score = $('#score').val()
    let cost = $('#cost').text()

    $.ajax({
        type: 'POST',
        url: '/finishOrder',
        data: {'cost': cost, 'comment': comment, 'score': score},
        success: function (data) {
            $('#finishDiv').hide()
            $('#state').text('0')
            $('#create').show()
            $('#cancel').hide()
            $('#lookUp').hide()
        }
    })
})

// 退出
$('#quit').click(function () {
    $.ajax({
        type: 'POST',
        url: '/quit',
        data: {},
        success: function () {
            window.location.href = "/login"
        }
    })
})



