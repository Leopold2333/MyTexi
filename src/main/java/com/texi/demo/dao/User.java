package com.texi.demo.dao;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@MappedSuperclass
public class User {
    // 用户id
    @TableId(value = "user_id", type = IdType.ID_WORKER_STR)
    private String user_id;

    @NotEmpty(message = "用户不允许为空")
    private String username;
    // 用户密码
    @Size(min = 6, max = 6, message = "密码是6位")
    @Pattern(regexp = "^[0-9]+$", message = "密码是6位数字")
    private String password;

    public User(String username, String passwd){
        this.username = username;
        this.password = passwd;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return this.password;
    }
}
