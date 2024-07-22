package org.codelap_spring_project.domain;

public class UserInfo {
    private String id;
    private String password;
    private String name;
    private String gender;
    private String birth;
    private String nickname;
    private String locationx;
    private String locationy;

    private String tagfamily;

    public UserInfo(String id, String password, String name, String gender, String birth, String nickname, String locationx, String locationy, String tagfamily, String taglike) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.birth = birth;
        this.nickname = nickname;
        this.locationx = locationx;
        this.locationy = locationy;
        this.tagfamily = tagfamily;
        this.taglike = taglike;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getLocationx() {
        return locationx;
    }

    public void setLocationx(String locationx) {
        this.locationx = locationx;
    }

    public String getLocationy() {
        return locationy;
    }

    public void setLocationy(String locationy) {
        this.locationy = locationy;
    }

    public String getTagfamily() {
        return tagfamily;
    }

    public void setTagfamily(String tagfamily) {
        this.tagfamily = tagfamily;
    }

    public String getTaglike() {
        return taglike;
    }

    public void setTaglike(String taglike) {
        this.taglike = taglike;
    }

    private String taglike;





}
