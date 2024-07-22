package org.codelap_spring_project.domain;

import java.util.List;

public class TourshopReview {

    private String reviewId;
    private String shopId;
    private String review;
    private String author;
    private String created_at;
    private String parent_comment_id;

    private List<TourshopReview> children;

    public TourshopReview(){}

    public TourshopReview(List<TourshopReview> children, String reviewId, String shopId, String review, String author, String created_at, String parent_comment_id) {
        this.reviewId = reviewId;
        this.shopId = shopId;
        this.review = review;
        this.author = author;
        this.created_at = created_at;
        this.parent_comment_id = parent_comment_id;
        this.children = children;
    }

    public List<TourshopReview> getChildren() {
        return children;
    }

    public void setChildren(List<TourshopReview> children) {
        this.children = children;
    }

    public String getReviewId() {
        return reviewId;
    }

    public void setReviewId(String reviewId) {
        this.reviewId = reviewId;
    }

    public String getShopId() {
        return shopId;
    }

    public void setShopId(String shopId) {
        this.shopId = shopId;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCreate_at() {
        return created_at;
    }

    public void setCreate_at(String create_at) {
        this.created_at = create_at;
    }

    public String getParent_comment_id() {
        return parent_comment_id;
    }

    public void setParent_comment_id(String parent_comment_id) {
        this.parent_comment_id = parent_comment_id;
    }
}
