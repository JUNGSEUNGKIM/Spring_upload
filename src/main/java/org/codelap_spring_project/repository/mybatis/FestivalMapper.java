package org.codelap_spring_project.repository.mybatis;

import org.apache.ibatis.annotations.Param;
import org.codelap_spring_project.domain.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface FestivalMapper {

    List<FestivalImg> findLocationLonlat(String lat, String lon);
    List<Festival> findAllFestival();

    List<Festival> findAllFestivalth();

    List<FestivalImg> findAllFestivalList();
    List<FestivalImg> findIdFestivalList(String festivalid);
    List<FestivalImg> findLocFestivalList(String loc);

    List<Market> findAllMarketList(@Param("latitude")Double latitude, @Param("longitude") Double longitude);

    List<Market> findAllMarketList();

    List<Restaurants> findAllRestaurantsList(@Param("latitude")Double latitude, @Param("longitude") Double longitude);
    List<Restaurants> findAllRestaurantsList();
    List<Event> findIdEvent(String eventid);

    List<Event> findRandom(String loc);

    List<Event> findDefault();

    List<Festival> getLocation(String id);

    List<Event> getEventLocation(String id);




}
