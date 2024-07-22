package org.codelap_spring_project.domain;

public class TourshopInsert {

    private String shopId;
    private String imageName;
    private String imagePath;
    private String tourTitle;
    private String content;
    private String tourPrice;
    private String location;

    public TourshopInsert(String shopId, String imageName, String imagePath, String tourTitle, String content, String tourPrice, String location, String festivalId) {
        this.shopId = shopId;
        this.imageName = imageName;
        this.imagePath = imagePath;
        this.tourTitle = tourTitle;
        this.content = content;
        this.tourPrice = tourPrice;
        this.location = location;
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

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
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

}
