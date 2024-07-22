package org.codelap_spring_project.repository.mybatis;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.codelap_spring_project.domain.*;

import java.util.List;

@Mapper
public interface BoarderMapper {

    /**
     * @name : register
     * @date : 2024. 6. 14.
     * @author : 김정승
     * @description : 게시판의 main페이지의 내용을 요청한다.
     */
    List<BoarderMain> findAll(@Param("startRow") Integer startRow, @Param("endRow") Integer endRow);
//    List<BoarderMain> findAll(@Param("startRow") Integer startRow, @Param("endRow") Integer endRow, @Param("main") String main);
    int totalPage();

    List<Boarder> detailBoard(String id);

    List<Comment> detailBoardComment(String id);

    boolean deleteBoardComment(String id);
    boolean deleteBoard(String id);

    String getSequence();

    void createBoard(BoaderInsert boarder);

    boolean editBoarder(BoaderInsert boarder);

    boolean addcomment(CommentInsert comment);

    boolean editComment(CommentInsert comment);

    boolean deletecomment(String comment_id);






    void save(Boarder boarder);
    Boarder findById(Long id);
    void update(Boarder boarder);
    List<Boarder> findByNameAndPrice(@Param("itemName") String itemName, @Param("price") Integer price);
}
