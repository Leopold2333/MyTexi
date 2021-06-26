package com.texi.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.texi.demo.dao.Driver;

public interface DriverService extends IService<Driver> {
    int login_driver(String username, String password);
}
