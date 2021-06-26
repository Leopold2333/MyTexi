package com.texi.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.texi.demo.dao.Driver;
import com.texi.demo.mapper.DriverMapper;
import com.texi.demo.service.DriverService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Driverimpl extends ServiceImpl<DriverMapper, Driver> implements DriverService {

    @Override
    public int login_driver(String username, String password) {
        QueryWrapper<Driver> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username);
        List<Driver> list = baseMapper.selectList(wrapper);
        Driver driver = list.get(0);
        // 不存在该用户名
        if (null == driver){
            return 0;
        } else {
            // 正确密码
            if (password.equals(driver.getPassword())){
                return 2;
            }
            // 错误密码
            else{
                return 1;
            }
        }
    }

}
