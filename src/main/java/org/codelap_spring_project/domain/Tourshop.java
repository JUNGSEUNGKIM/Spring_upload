package org.codelap_spring_project.domain;

public class Tourshop {
    private String shopId;
    private String imagePath;
    private String imageName;
    private String tourTitle;
    private String content;
    private String tourPrice;
    private String location;

    public Tourshop(String shopId, String imagePath, String imageName, String tourTitle, String content, String tourPrice, String location) {
        this.shopId = shopId;
        this.imagePath = imagePath;
        this.imageName = imageName;
        this.tourTitle = tourTitle;
        this.content = content;
        this.tourPrice = tourPrice;
        this.location = location;
    }

    public Tourshop() {
    }

    public String getShopId() {
        return shopId;
    }

    public void setShopId(String shopId) {
        this.shopId = shopId;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
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

}
