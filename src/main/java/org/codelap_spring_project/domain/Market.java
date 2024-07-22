package org.codelap_spring_project.domain;

public class Market {
    private String marketid;
    private String marketname;
    private String markettype;
    private String roadaddress;
    private String jibunaddress;
    private String openingperiod;
    private String latitude;
    private String longitude;
    private String publictoilet;
    private String parkingabailability;

    public Market(String marketid, String marketname, String markettype, String roadaddress, String jibunaddress, String openingperiod, String latitude, String longitude, String publictoilet, String parkingabailability) {
        this.marketid = marketid;
        this.marketname = marketname;
        this.markettype = markettype;
        this.roadaddress = roadaddress;
        this.jibunaddress = jibunaddress;
        this.openingperiod = openingperiod;
        this.latitude = latitude;
        this.longitude = longitude;
        this.publictoilet = publictoilet;
        this.parkingabailability = parkingabailability;
    }

    public String getMarketid() {
        return marketid;
    }

    public void setMarketid(String marketid) {
        this.marketid = marketid;
    }

    public String getMarketname() {
        return marketname;
    }

    public void setMarketname(String marketname) {
        this.marketname = marketname;
    }

    public String getMarkettype() {
        return markettype;
    }

    public void setMarkettype(String markettype) {
        this.markettype = markettype;
    }

    public String getRoadaddress() {
        return roadaddress;
    }

    public void setRoadaddress(String roadaddress) {
        this.roadaddress = roadaddress;
    }

    public String getJibunaddress() {
        return jibunaddress;
    }

    public void setJibunaddress(String jibunaddress) {
        this.jibunaddress = jibunaddress;
    }

    public String getOpeningperiod() {
        return openingperiod;
    }

    public void setOpeningperiod(String openingperiod) {
        this.openingperiod = openingperiod;
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

    public String getPublictoilet() {
        return publictoilet;
    }

    public void setPublictoilet(String publictoilet) {
        this.publictoilet = publictoilet;
    }

    public String getParkingabailability() {
        return parkingabailability;
    }

    public void setParkingabailability(String parkingabailability) {
        this.parkingabailability = parkingabailability;
    }
}
