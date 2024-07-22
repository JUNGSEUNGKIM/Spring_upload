package org.codelap_spring_project.domain;

public class Festival {



    private String festivalid;
    private String festivalname;
    private String location;
    private String startdate;
    private String enddate;
    private String description;
    private String website;
    private String roadaddress;
    private String jibunaddress;
    private String latitude;
    private String longitude;

    public Festival() {
    }

    public Festival(String festivalid, String festivalname, String location, String startdate, String enddate, String description, String website, String roadaddress, String jibunaddress, String latitude, String longitude) {
        this.festivalid = festivalid;
        this.festivalname = festivalname;
        this.location = location;
        this.startdate = startdate;
        this.enddate = enddate;
        this.description = description;
        this.website = website;
        this.roadaddress = roadaddress;
        this.jibunaddress = jibunaddress;
        this.latitude = latitude;
        this.longitude = longitude;
    }


    public void setFestivalid(String festivalid) {
        this.festivalid = festivalid;
    }

    public void setFestivalname(String festivalname) {
        this.festivalname = festivalname;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }

    public void setEnddate(String enddate) {
        this.enddate = enddate;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public void setRoadaddress(String roadaddress) {
        this.roadaddress = roadaddress;
    }

    public void setJibunaddress(String jibunaddress) {
        this.jibunaddress = jibunaddress;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }



    public String getFestivalid() {
        return festivalid;
    }

    public String getFestivalname() {
        return festivalname;
    }

    public String getLocation() {
        return location;
    }

    public String getStartdate() {
        return startdate;
    }

    public String getEnddate() {
        return enddate;
    }

    public String getDescription() {
        return description;
    }

    public String getWebsite() {
        return website;
    }

    public String getRoadaddress() {
        return roadaddress;
    }

    public String getJibunaddress() {
        return jibunaddress;
    }

    public String getLatitude() {
        return latitude;
    }

    public String getLongitude() {
        return longitude;
    }







}
