package org.codelap_spring_project.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QaBoarder {
    private String qaid;
    private String author;
    private String title;
    private String created_at;
    private String content;
    private String views;
    private String likes;
    private String imagepath;
    private String imagename;
    private String festivalid;


    public QaBoarder(String qaid, String author, String title, String created_at, String content, String views, String likes, String imagepath, String imagename, String festivalid) {
        this.qaid = qaid;
        this.author = author;
        this.title = title;
        this.created_at = created_at;
        this.content = content;
        this.views = views;
        this.likes = likes;
        this.imagepath = imagepath;
        this.imagename = imagename;
        this.festivalid = festivalid;
    }



    public QaBoarder(){
    }
}
