package com.texi.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.texi.demo.dao.Passenger;

public interface PassengerService extends IService<Passenger> {
    int login_passenger(String username, String password);
}
