package org.codelap_spring_project.repository.mybatis;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.codelap_spring_project.domain.*;

import java.util.List;


@Mapper
public interface TourShopMapper {
    /**
     * @date : 2024. 6. 21.
     * @author : 노가현
     * @description : tourshop main페이지의 내용을 요청한다.
     */

    List<TourshopMain> findAll(@Param("startRow") Integer startRow,@Param("endRow") Integer endRow);
    int totalPage();

    List<Tourshop> shopDetail(String id);

    List<TourshopReview> shopDetailReview(String id);

//    boolean shopDeletereview(String id);
    boolean shopDelete(String id);

    String getSequence();

    void addProduct(TourshopInsert tourshop);
//
//    boolean editBoarder(BoaderInsert boarder);
//
//    boolean addcomment(CommentInsert comment);
//
//    boolean editComment(CommentInsert comment);
//
//    boolean deletecomment(String comment_id);
}
