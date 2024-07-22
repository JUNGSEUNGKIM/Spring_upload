package org.codelap_spring_project.domain;

public class Event {
    private String eventid;
    private String eventname;
    private String location;
    private String description;
    private String startdate;
    private String enddate;
    private String starttime;
    private String endtime;
    private String feeinfo;

    private String agerestriction;
    private String parkingavailability;
    private String roadaddress;
    private String jibunaddress;
    private String latitude;
    private String longitude;

    public Event(String eventid, String eventname, String location, String description, String startdate, String enddate, String starttime, String endtime, String feeinfo, String agerestriction, String parkingavailability, String roadaddress, String jibunaddress, String latitude, String longitude) {
        this.eventid = eventid;
        this.eventname = eventname;
        this.location = location;
        this.description = description;
        this.startdate = startdate;
        this.enddate = enddate;
        this.starttime = starttime;
        this.endtime = endtime;
        this.feeinfo = feeinfo;
        this.agerestriction = agerestriction;
        this.parkingavailability = parkingavailability;
        this.roadaddress = roadaddress;
        this.jibunaddress = jibunaddress;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getEventid() {
        return eventid;
    }

    public void setEventid(String eventid) {
        this.eventid = eventid;
    }

    public String getEventname() {
        return eventname;
    }

    public void setEventname(String eventname) {
        this.eventname = eventname;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStartdate() {
        return startdate;
    }

    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }

    public String getEnddate() {
        return enddate;
    }

    public void setEnddate(String enddate) {
        this.enddate = enddate;
    }

    public String getStarttime() {
        return starttime;
    }

    public void setStarttime(String starttime) {
        this.starttime = starttime;
    }

    public String getEndtime() {
        return endtime;
    }

    public void setEndtime(String endtime) {
        this.endtime = endtime;
    }

    public String getFeeinfo() {
        return feeinfo;
    }

    public void setFeeinfo(String feeinfo) {
        this.feeinfo = feeinfo;
    }

    public String getAgerestriction() {
        return agerestriction;
    }

    public void setAgerestriction(String agerestriction) {
        this.agerestriction = agerestriction;
    }

    public String getParkingavailability() {
        return parkingavailability;
    }

    public void setParkingavailability(String parkingavailability) {
        this.parkingavailability = parkingavailability;
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
