package com.texi.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.texi.demo.dao.Passenger;
import com.texi.demo.mapper.PassengerMapper;
import com.texi.demo.service.PassengerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerImpl extends ServiceImpl<PassengerMapper, Passenger> implements PassengerService {

    @Override
    public int login_passenger(String username, String password) {
        QueryWrapper<Passenger> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username);
        List<Passenger> list = baseMapper.selectList(wrapper);
        Passenger passenger = list.get(0);
        // 不存在该用户名
        if (null == passenger){
            return 0;
        } else {
            // 正确密码
            if (password.equals(passenger.getPassword())){
                return 2;
            }
            // 错误密码
            else{
                return 1;
            }
        }
    }
}
