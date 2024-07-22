package org.codelap_spring_project.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QaBoarderMain {
    private String qaid;
    private String author;
    private String title;
    private String created_at;
    private String content;
    private String views;
    private String likes;
    private String imagename;
    private String festivalid;
    private String qacomments_count;


    public QaBoarderMain(String qaid, String author, String title, String created_at, String content, String views, String likes, String imagename, String festivalid, String qacomments_count) {
        this.qaid = qaid;
        this.author = author;
        this.title = title;
        this.created_at = created_at;
        this.content = content;
        this.views = views;
        this.likes = likes;
        this.imagename = imagename;
        this.festivalid = festivalid;
        this.qacomments_count = qacomments_count;
    }

    public QaBoarderMain(){

    }
}
