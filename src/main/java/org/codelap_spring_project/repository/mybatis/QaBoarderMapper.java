package org.codelap_spring_project.repository.mybatis;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.codelap_spring_project.domain.*;

import java.util.List;

@Mapper
public interface QaBoarderMapper {

    List<QaBoarderMain> findAll(@Param("startRow") Integer startRow, @Param("endRow") Integer endRow);

    int totalPage();

    List<QaBoarder> detailQaBoard(String qaid);


    List<QaComment> detailQaBoardComment(String qaid);

    boolean deleteQaBoardComment(String qaid);
    boolean deleteQaBoard(String qaid);

    String getQaSequence();

    void createQaBoard(QaBoarderInsert qaboarder);

    boolean editQaBoard(QaBoarderInsert qaboarder);

    boolean addqacomment (QaCommentInsert qacomment);

    boolean editqacomment (QaCommentInsert qacomment);

    boolean deleteqacomment(String qacommentid);

    void save(QaBoarder qaBoarder);
    QaBoarder findById(Long qaid);
    void update(QaBoarder qaBoarder);

}
