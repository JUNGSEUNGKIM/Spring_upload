package org.codelap_spring_project.controller;

import org.codelap_spring_project.domain.*;
import org.codelap_spring_project.repository.mybatis.FestivalMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = { "${cors.allowed-origins}" },allowCredentials = "true",methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RequestMapping("/festival")
public class FestivalController {
    private final FestivalMapper festivalMapper;

    @Autowired
    public FestivalController(FestivalMapper festivalMapper){this.festivalMapper = festivalMapper;}

    @GetMapping("/svfestivalselect")
    public Map<String, Object> festivalListGet(){
        List<Festival> festival;
        festival = festivalMapper.findAllFestival();
        Map<String, Object> result = new HashMap<>();
        result.put("festival",festival);
//        System.out.println(festival+":::::::::::::::");

        List<List<String>> boarderList = new ArrayList<>();

        for (Festival fes : festival) {
            String[] board = new String[11]; // 적절한 크기로 변경해야 함
            board[0] = fes.getFestivalid();
            board[1] = fes.getFestivalname();// 예시로 한 개의 요소만 담음
            board[2] = fes.getLocation();
            board[3] = fes.getStartdate();
            board[4] = fes.getEnddate();
            board[5] = fes.getDescription();
            board[6] = fes.getWebsite();
            board[7] = fes.getRoadaddress();
            board[8] = fes.getJibunaddress();
            board[9] = fes.getLatitude();
            board[10] = fes.getLongitude();
            boarderList.add(Arrays.asList(board));
        }
        result.put("festival", boarderList);

        return result;

     }

     @GetMapping("/festival")
    public List<Map<String, Object>> festivalList(@RequestParam(required = false,defaultValue = "")String loc,
                                                  @RequestParam(required = false,defaultValue = "")String festival_id){
        List<FestivalImg> festivalList = null;
        if(loc.equals("") && festival_id.equals("")){
            festivalList = festivalMapper.findAllFestivalList();
        }else if(loc.equals("")){
            festivalList = festivalMapper.findIdFestivalList(festival_id);
        } else if (festival_id.equals("")) {
            festivalList = festivalMapper.findLocFestivalList(loc);
        }

//         Map<String, Object> result = new HashMap<>();


         List<Map<String, Object>> boarderList = new ArrayList<>();

         for (FestivalImg fes : festivalList) {
             Map<String, Object> result = new HashMap<>();
             result.put("FESTIVALID",fes.getFestivalid());
             result.put("FESTIVALNAME",fes.getFestivalname());
             result.put("LOCATION",fes.getLocation());
             result.put("STARTDATE",fes.getStartdate());
             result.put("ENDDATE",fes.getEnddate());
             result.put("DESCRIPTION",fes.getDescription());
             result.put("WEBSITE",fes.getWebsite());
             result.put("ROADADDRESS",fes.getRoadaddress());
             result.put("JIBUNADDRESS",fes.getJibunaddress());
             result.put("LATITUDE",fes.getLatitude());
             result.put("LONGITUDE",fes.getLongitude());
             result.put("IMAGE_NAME",fes.getImage_name());
             boarderList.add(result);
         }
        return boarderList;
     }
    @GetMapping({"/festivals?loc","/festivals","festivals/","/festivals?festival_id"})
    public List<Map<String, Object>> festivalSearchList(@RequestParam(required = false,defaultValue = "")String loc,
                                                  @RequestParam(required = false,defaultValue = "")String festival_id){
        List<FestivalImg> festivalList = null;
        if(loc.equals("") && festival_id.equals("")){
            festivalList = festivalMapper.findAllFestivalList();
        }else if(loc.equals("")){
            festivalList = festivalMapper.findIdFestivalList(festival_id);
        } else if (festival_id.equals("")) {
            festivalList = festivalMapper.findLocFestivalList(loc);
        }

//         Map<String, Object> result = new HashMap<>();


        List<Map<String, Object>> boarderList = new ArrayList<>();

        for (FestivalImg fes : festivalList) {
            Map<String, Object> result = new HashMap<>();
            result.put("FestivalID",fes.getFestivalid());
            result.put("FestivalName",fes.getFestivalname());
            result.put("Location",fes.getLocation());
            result.put("StartDate",fes.getStartdate());
            result.put("EndDate",fes.getEnddate());
            result.put("Description",fes.getDescription());
            result.put("Website",fes.getWebsite());
            result.put("RoadAddress",fes.getRoadaddress());
            result.put("JibunAddress",fes.getJibunaddress());
            result.put("Latitude",fes.getLatitude());
            result.put("Longitude",fes.getLongitude());
            result.put("ImageName",fes.getImage_name());
            boarderList.add(result);
        }
        return boarderList;
    }

     @GetMapping("/market")
    public List<Map<String, Object>> marketList(){
        List<Market> marketList = festivalMapper.findAllMarketList();
         List<Map<String, Object>> boarderList = new ArrayList<>();

         for (Market fes : marketList) {
             Map<String, Object> result = new HashMap<>();
             result.put("MARKETNAME",fes.getMarketname());
             result.put("MARKETTYPE",fes.getMarkettype());
             result.put("ROADADDRESS",fes.getRoadaddress());
             result.put("JIBUNADDRESS",fes.getJibunaddress());
             result.put("OPENINGPERIOD",fes.getOpeningperiod());
             result.put("LATITUDE",fes.getLatitude());
             result.put("LONGITUDE",fes.getLongitude());
             result.put("PUBLICTOILET",fes.getPublictoilet());
             result.put("PARKINGAVAILABILITY",fes.getParkingabailability());


             boarderList.add(result);
         }
        return boarderList;
     }

    @GetMapping("/eat_place")
    public List<Map<String, Object>> restaurantsList(){
        List<Restaurants> restaurantsList = festivalMapper.findAllRestaurantsList();
        List<Map<String, Object>> boarderList = new ArrayList<>();

        for (Restaurants fes : restaurantsList) {
            Map<String, Object> result = new HashMap<>();
            result.put("RESTAURANTNAME",fes.getRestaurantname());
            result.put("RESTAURANTADDRESS",fes.getRestaurantaddress());
            result.put("REGION",fes.getRegion());
            result.put("LATITUDE",fes.getLatitude());
            result.put("LONGITUDE",fes.getLongitude());



            boarderList.add(result);
        }
        return boarderList;
    }

    @GetMapping("events")
    public List<Map<String, Object>> eventsList(@RequestParam(required = false, defaultValue ="") String EVENTID, @RequestParam(required = false, defaultValue ="") String loc){
        Event findEventid;
        List<Event> eventsList = null;

        if(!EVENTID.equals("")){
            eventsList = festivalMapper.findIdEvent(EVENTID);
        }else if(!loc.equals("")){
            eventsList = festivalMapper.findRandom(loc);
        }else{
            eventsList = festivalMapper.findDefault();
        }
        List<Map<String, Object>> boarderList = new ArrayList<>();

        for (Event fes : eventsList) {
            Map<String, Object> result = new HashMap<>();
            result.put("AGERESTRICTION",fes.getAgerestriction());
            result.put("DESCRIPTION",fes.getDescription());
            result.put("ENDDATE",fes.getEnddate());
            result.put("ENDTIME",fes.getEndtime());
            result.put("EVENTID",fes.getEventid());
            result.put("EVENTNAME",fes.getEventname());
            result.put("FEEINFO",fes.getFeeinfo());
            result.put("JIBUNADDRESS",fes.getJibunaddress());
            result.put("LATITUDE",fes.getLatitude());
            result.put("LOCATION",fes.getLocation());
            result.put("LONGITUDE",fes.getLongitude());
            result.put("PARKINGAVAILABILITY",fes.getParkingavailability());
            result.put("ROADADDRESS",fes.getRoadaddress());
            result.put("STARTDATE",fes.getStartdate());
            result.put("STARTTIME",fes.getStarttime());
            boarderList.add(result);
        }
        return boarderList;
    }

    @GetMapping("garage_data")
    public Map<String,Object> getDetailGarage(@RequestParam(required = false, defaultValue = "")String id){

        List<Festival> location = new ArrayList<>();
        List<Event> eventLocation = new ArrayList<>();
        String latitude="";
        String longitude="";

        if(!id.equals("") && id.split("_")[0].equals("f")){
            location = festivalMapper.getLocation(id.split("_")[1]);
            latitude=location.get(0).getLatitude();
            longitude=location.get(0).getLongitude();
        }else if(!id.equals("") && id.split("_")[0].equals("e")){
            System.out.println(id.split("_")[0]+":::::::::왜여기?");
            eventLocation = festivalMapper.getEventLocation(id.split("_")[1]);
            latitude=eventLocation.get(0).getLatitude();
            longitude=eventLocation.get(0).getLongitude();
        }
        Map<String, Double> latloc = new HashMap<>();
        latloc.put("latitude",Double.parseDouble(latitude));
        latloc.put("longitude",Double.parseDouble(longitude));
        List<Market> marketList = festivalMapper.findAllMarketList(Double.parseDouble(latitude),Double.parseDouble(longitude));
        List<Restaurants> restaurantsList = festivalMapper.findAllRestaurantsList(Double.parseDouble(latitude), Double.parseDouble(longitude));

        Map<String, Object> result = new HashMap<>();
        result.put("festival_location",latloc);
        List<Map<String,Object>> marketM = new ArrayList<>();
        for(Market market : marketList){
            Map<String,Object> map = new HashMap<>();
            map.put("JIBUNADDRESS",market.getJibunaddress());
            map.put("LATITUDE",market.getLatitude());
            map.put("LONGITUDE",market.getLongitude());
            map.put("MARKETID",market.getMarketid());
            map.put("MARKETNAME",market.getMarketname());
            map.put("MARKETTYPE",market.getMarkettype());
            map.put("OPENINGPERIOD",market.getOpeningperiod());
            map.put("PARKINGAVAILABILITY",market.getParkingabailability());
            map.put("PUBLICTOILET",market.getPublictoilet());
            map.put("ROADADDRESS",market.getRoadaddress());
            marketM.add(map);
        }
        result.put("market_data",marketM);
        List<Map<String,Object>> restoaurantM = new ArrayList<>();
        for(Restaurants restarn : restaurantsList){
            Map<String,Object> map = new HashMap<>();
//            map.put("ID",restarn.get());
            map.put("LATITUDE",restarn.getLatitude());
            map.put("LONGITUDE",restarn.getLongitude());
            map.put("REGION",restarn.getRegion());
            map.put("RESTAURANTADDRESS",restarn.getRestaurantaddress());
            map.put("RESTAURANTNAME",restarn.getRestaurantname());

            marketM.add(map);
        }
        result.put("yumyum_data",restoaurantM);

        return result;
    }

    @GetMapping("locationrecommend")
    public List<Map<String, Object>> getLocationRec(@RequestParam(required = false, defaultValue = "")String lat,
                                             @RequestParam(required = false, defaultValue = "")String lon,
                                             @RequestParam(required = false, defaultValue = "")String locPo){

        if(lat!=null && lon!=null && locPo!=null){
            List<FestivalImg> festivalImgs = festivalMapper.findLocationLonlat(lat,lon);
            System.out.println(festivalImgs.get(0));

            List<Map<String, Object>> boarderList = new ArrayList<>();

            for (FestivalImg fes : festivalImgs) {
                Map<String, Object> result = new HashMap<>();
                result.put("FESTIVALID",fes.getFestivalid());
                result.put("FESTIVALNAME",fes.getFestivalname());
                result.put("LOCATION",fes.getLocation());
                result.put("STARTDATE",fes.getStartdate());
                result.put("ENDDATE",fes.getEnddate());
                result.put("DESCRIPTION",fes.getDescription());
                result.put("WEBSITE",fes.getWebsite());
                result.put("ROADADDRESS",fes.getRoadaddress());
                result.put("JIBUNADDRESS",fes.getJibunaddress());
                result.put("LATITUDE",fes.getLatitude());
                result.put("LONGITUDE",fes.getLongitude());
                result.put("IMAGE_NAME",fes.getImage_name());
                boarderList.add(result);
            }
            return boarderList;
        }else {
            return null;
        }


    }


}
