package org.codelap_spring_project.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter


public class QaComment {

    private String qacommentid;
    private String qaid;
    private String author;
    private String created_at;
    private String content;
    private String parentcommentid;
    private String festivalid;

    private List<QaComment> children;

    public QaComment(String qacommentid, String qaid, String author, String created_at, String content, String parentcommentid, String festivalid, List<QaComment> children) {
        this.qacommentid = qacommentid;
        this.qaid = qaid;
        this.author = author;
        this.created_at = created_at;
        this.content = content;
        this.parentcommentid = parentcommentid;
        this.festivalid = festivalid;
        this.children = children;
    }

    public QaComment(){

    }
}
