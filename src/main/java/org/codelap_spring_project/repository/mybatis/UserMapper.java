package org.codelap_spring_project.repository.mybatis;

import org.apache.ibatis.annotations.Mapper;
import org.codelap_spring_project.domain.UserInfo;

@Mapper
public interface UserMapper {

    public UserInfo checkedUser(UserInfo userInfo);

}
