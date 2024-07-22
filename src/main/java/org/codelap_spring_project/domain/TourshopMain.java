package org.codelap_spring_project.domain;

public class TourshopMain {

    private String shopId;
    private String imageName;
    private String tourTitle;
    private String content;
    private String tourPrice;
    private String location;
    private String reviews_count;


    public TourshopMain(){}

    public TourshopMain(String shopId, String imageName, String tourTitle, String content, String tourPrice, String location, String reviews_count) {
        this.shopId = shopId;
        this.imageName = imageName;
        this.tourTitle = tourTitle;
        this.content = content;
        this.tourPrice = tourPrice;
        this.location = location;
        this.reviews_count = reviews_count;
    }


    public String getShopId() {
        return shopId;
    }

    public void setShopId(String shopId) {
        this.shopId = shopId;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getTourTitle() {
        return tourTitle;
    }

    public void setTourTitle(String tourTitle) {
        this.tourTitle = tourTitle;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTourPrice() {
        return tourPrice;
    }

    public void setTourPrice(String tourPrice) {
        this.tourPrice = tourPrice;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getReviews_count() {
        return reviews_count;
    }

    public void setReviews_count(String reviews_count) {
        this.reviews_count = reviews_count;
    }
}
