package org.codelap_spring_project.domain;

public class FestivalImg extends Festival{
    private String image_name;

    public FestivalImg(String festivalid, String festivalname, String location, String startdate, String enddate, String description, String website, String roadaddress, String jibunaddress, String latitude, String longitude, String image_name) {
        super(festivalid, festivalname, location, startdate, enddate, description, website, roadaddress, jibunaddress, latitude, longitude);
        this.image_name = image_name;
    }

    public String getImage_name() {
        return image_name;
    }

    public void setImage_name(String image_name) {
        this.image_name = image_name;
    }
}
