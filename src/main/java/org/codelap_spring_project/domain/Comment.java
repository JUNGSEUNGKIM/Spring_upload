package org.codelap_spring_project.domain;

import java.util.List;

public class Comment {

    private String comment_id;
    private String boarder_code;
    private String content;
    private String author;
    private String create_at;
    private String parent_comment_id;



    private List<Comment> children;

    public Comment(){}

    public Comment(List<Comment> children, String comment_id, String boarder_code, String content, String author, String create_at, String parent_comment_id) {
        this.comment_id = comment_id;
        this.boarder_code = boarder_code;
        this.content = content;
        this.author = author;
        this.create_at = create_at;
        this.parent_comment_id = parent_comment_id;
        this.children = children;
    }
    public List<Comment> getChildren() {
        return children;
    }

    public void setChildren(List<Comment> children) {
        this.children = children;
    }

    public String getComment_id() {
        return comment_id;
    }

    public void setComment_id(String comment_id) {
        this.comment_id = comment_id;
    }

    public String getBoarder_code() {
        return boarder_code;
    }

    public void setBoarder_code(String boarder_code) {
        this.boarder_code = boarder_code;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCreate_at() {
        return create_at;
    }

    public void setCreate_at(String create_at) {
        this.create_at = create_at;
    }

    public String getParent_comment_id() {
        return parent_comment_id;
    }

    public void setParent_comment_id(String parent_comment_id) {
        this.parent_comment_id = parent_comment_id;
    }
}
