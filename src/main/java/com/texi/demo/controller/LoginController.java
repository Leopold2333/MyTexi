package com.texi.demo.controller;

import com.texi.demo.service.DriverService;
import com.texi.demo.service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/Login")
public class LoginController {

    int NO_EXIST = 0;
    int WRONG_PASSWORD = 1;
    int SUCCESS = 2;

    @Autowired
    DriverService driverService;
    @Autowired
    PassengerService passengerService;

    // 登录界面
    @GetMapping("/Login")
    String UserLogin(HttpServletRequest request, HttpServletResponse response){
//        List<User> list = userService.list(null);
        Object userId = request.getSession().getAttribute("userId");
        if(null == userId) {
            return "login";
        } else{
            return "redirect:/main";
        }
    }

    // 提交登录信息
    @ResponseBody
    @PostMapping("/submitLogin")
    String put_login_info(@RequestParam(name="userName")String userName, @RequestParam(name="password")String password,
                          @RequestParam(name="type")int type, HttpServletRequest request) {

        int result_number = 0;
        if (0 == type) {    // 客户
            result_number = passengerService.login_passenger(userName, password);
        } else {            // 司机
            result_number = driverService.login_driver(userName, password);
        }

        if (this.SUCCESS == result_number) {
            request.getSession().setAttribute("userName", userName);
            request.getSession().setAttribute("type", type);  // 0 客户 其他司机
            request.getSession().setAttribute("state", 0); // 两种类型的初始状态
        }

        return String.valueOf(result_number);
    }
}
