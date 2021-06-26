package com.texi.demo.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan({"com.texi.demo.mapper"})
public class UserConfig {
}
