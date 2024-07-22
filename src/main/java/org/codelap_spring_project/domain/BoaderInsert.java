package org.codelap_spring_project.domain;

public class BoaderInsert {
    private String boarder_code;
    private String user_id;
    private String title;
    private String created_at;
    private String content;
    private String views;
    private String likes;
    private String image_path;
    private String image_name;
    private String festival_code;

    public BoaderInsert(String boarder_code, String user_id, String title, String created_at, String content, String views, String likes, String image_path, String image_name, String festival_code) {
        this.boarder_code = boarder_code;
        this.user_id = user_id;
        this.title = title;
        this.created_at = created_at;
        this.content = content;
        this.views = views;
        this.likes = likes;
        this.image_path = image_path;
        this.image_name = image_name;
        this.festival_code = festival_code;
    }

    public String getBoarder_code() {
        return boarder_code;
    }

    public void setBoarder_code(String boarder_code) {
        this.boarder_code = boarder_code;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
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

    public String getImage_path() {
        return image_path;
    }

    public void setImage_path(String image_path) {
        this.image_path = image_path;
    }

    public String getImage_name() {
        return image_name;
    }

    public void setImage_name(String image_name) {
        this.image_name = image_name;
    }

    public String getFestival_code() {
        return festival_code;
    }

    public void setFestival_code(String festival_code) {
        this.festival_code = festival_code;
    }
}
