// 建立websocket连接
let socket
let userId = $('#userId').text()
let host = window.location.host
let ws_url = 'ws://' + host + '/login/' + userId
socket = new WebSocket(ws_url)

socket.onmessage = function(msg) {
    if ('arrive' == msg.data) {  // 用户达到 司机可以提交费用信息
        alert('用户已经到达终点, 您可以编辑费用信息了')
        $('#costDiv').show()
        $('#state').text('4')

    }
    else {                      // 订单完成
        $.ajax({
            type: 'POST',
            url: '/confirmFinish',
            data: {},
            success: function (data) {
                $('#state').text('0')
                $('#active').show()
                $('#costDiv').hide()
            }
        })
    }
}


// 司机点击查找订单按钮
$('#search').click(function () {
    let region = $('#region').val()

    $.ajax({
        type: 'POST',
        url: '/searchOrder',
        data: {'region': region},
        success: function (data) {
            $('#active').hide()
            let text = ''
            for(let i in data){
                let temp = '<div>订单号:<span>' + data[i].id + '</span>客户Id:<span>' + data[i].ownerId +
                    '</span>起始位置<span>' + data[i].startRegion + '</span>' + '结束位置<span>' + data[i].endRegion +
                    '</span><button onclick="take_order($(this))">接单</button></div>'
                text += temp
            }
            $('#orderList').html(text)
        }
    })
})

// 接收订单按钮
// elem = $(this)
function take_order(elem){
    let order_id = $(elem.parent().children().get(0)).text()
    let customer_id = $(elem.parent().children().get(1)).text()

    // 先告知后端
    $.ajax({
        type: 'POST',
        url: '/takeOrder',
        data: {'id': order_id, 'customerId':customer_id},
        success: function (data) {
            if ('ok' == data) {
                alert('您已成功接收订单')

                // 前端改状态
                $('#lookUp').hide()
                $('#inactive').hide()
                $('#active').hide()
                $('#orderList').hide()
                $('#state').text('2')
                $('#verifyDiv').show()
            }

            // 未能成功接收订单
            else {
                alert('该订单已经被别人接了')
            }
        }
    })
}

// 反激活
$('#inactive').click(function () {
    $.ajax({
        type: 'POST',
        url: '/inactive',
        data: {},
        success: function (data) {
            $('#orderList').hide()
            $('#active').show()
            $('#inactive').hide()
            $('#state').text('0')
        }
    })
})

// 激活
$('#active').click(function () {
    $.ajax({
        type: 'POST',
        url: '/onActive',
        data: {'data': 'ok'},
        success: function (data) {
            $('#active').hide()
            $('#inactive').show()
            $('#search').show()
            $('#state').text('1')
        }
    })
})

// 验证信息
$('#verify').click(function () {
    let verifyCode = $('#verifyCode').val()
    $.ajax({
        type: 'POST',
        url: '/verify',
        data: {'verifyCode': verifyCode},
        success: function (data) {
            if ('ok' == data) {
                $('#state').text(3)
                $('#verifyDiv').hide()
            }
            else if ('failed' == data) {
                alert('验证码错误')
            }
        }
    })
})

// 付款信息
$('#putCost').click(function () {
    let cost = $('#cost').val()
    $.ajax({
        type: 'POST',
        url: '/putCost',
        data: {'cost': cost},
        success: function (data) {
            alert('费用信息提交成功，等待用户付款')
            $('#costDiv').hide()
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
