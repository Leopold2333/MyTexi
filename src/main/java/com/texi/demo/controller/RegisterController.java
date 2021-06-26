package com.texi.demo.controller;

import com.texi.demo.dao.Driver;
import com.texi.demo.dao.Passenger;
import com.texi.demo.service.DriverService;
import com.texi.demo.service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/Register")
public class RegisterController {
    @Autowired
    DriverService driverService;
    @Autowired
    PassengerService passengerService;

    // 注册界面
    @GetMapping("/Regist")
    String UserLogin(HttpServletRequest request, HttpServletResponse response){
        return "regist";
    }

    // 提交注册信息
    @ResponseBody
    @PostMapping("/submitRegist")
    String put_login_info(@RequestParam(name="userName")String userName, @RequestParam(name="password")String password,
                          @RequestParam(name="type")String type, HttpServletRequest request) {

        boolean result = false;
        System.out.println("???");
        if ("0".equals(type)) {  // 客户
            Passenger passenger = new Passenger(userName, password);
            System.out.println(passenger);
            result = passengerService.save(passenger);
        }
        else {            // 司机
            Driver driver = new Driver(userName, password);
            System.out.println(driver);
            result = driverService.save(driver);
        }
        return String.valueOf(result);
    }
}
