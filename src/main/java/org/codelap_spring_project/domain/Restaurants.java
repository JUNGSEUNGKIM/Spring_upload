package org.codelap_spring_project.domain;

public class Restaurants {
    private String restaurantname;
    private String restaurantaddress;
    private String region;
    private String latitude;
    private String longitude;

    public Restaurants(String restaurantname, String restaurantaddress, String region, String latitude, String longitude) {
        this.restaurantname = restaurantname;
        this.restaurantaddress = restaurantaddress;
        this.region = region;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getRestaurantname() {
        return restaurantname;
    }

    public void setRestaurantname(String restaurantname) {
        this.restaurantname = restaurantname;
    }

    public String getRestaurantaddress() {
        return restaurantaddress;
    }

    public void setRestaurantaddress(String restaurantaddress) {
        this.restaurantaddress = restaurantaddress;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }
}
