package org.codelap_spring_project.domain;
/**
 * @name : register
 * @date : 2024. 6. 14.
 * @author : 김정승
 * @description : 게시판의 main페이지의 내용을 요청한다.
 */
public class BoarderMain {
    private String boarder_code;
    private String author;
    private String title;
    private String created_at;
    private String content;
    private String views;
    private String likes;
    private String image_name;
    private String comments_count;

    public BoarderMain(){}

    public BoarderMain(String boarder_code, String author, String title, String created_at, String content, String views, String likes, String image_name, String comments_count) {
        this.boarder_code = boarder_code;
        this.author = author;
        this.title = title;
        this.created_at = created_at;
        this.content = content;
        this.views = views;
        this.likes = likes;
        this.image_name = image_name;
        this.comments_count = comments_count;
    }

    public String getBoarder_code() {
        return boarder_code;
    }

    public void setBoarder_code(String boarder_code) {
        this.boarder_code = boarder_code;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getViews() {
        return views;
    }

    public void setViews(String views) {
        this.views = views;
    }

    public String getLikes() {
        return likes;
    }

    public void setLikes(String likes) {
        this.likes = likes;
    }

    public String getImage_name() {
        return image_name;
    }

    public void setImage_name(String image_name) {
        this.image_name = image_name;
    }

    public String getComments_count() {
        return comments_count;
    }

    public void setComments_count(String comments_count) {
        this.comments_count = comments_count;
    }
}
