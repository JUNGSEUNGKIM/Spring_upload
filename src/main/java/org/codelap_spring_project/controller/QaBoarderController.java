package org.codelap_spring_project.controller;

import jakarta.validation.Valid;
import org.codelap_spring_project.domain.*;
import org.codelap_spring_project.repository.mybatis.QaBoarderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.*;


@RestController
@CrossOrigin(origins = {"${cors.allowed-origins}"}, allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RequestMapping("/qaboarder")
public class QaBoarderController {

    private final QaBoarderMapper qaboarderMapper;


    @Autowired
    public QaBoarderController(QaBoarderMapper qaboarderMapper){
        this.qaboarderMapper = qaboarderMapper;
    }

    @Autowired
    private JwtTokenProvider jwtTokenProvider;



    @GetMapping(value={"/svqaboardmain?page", "/svqaboardmain", "svqaboardmain/", "/svquestionboardmain?user_id"})
    public Map<String, Object> list(Model model, @RequestHeader("Authorization") String token, @RequestParam(required = false, defaultValue = "1") String page){
        String userId = "admin";
//        String userId = jwtTokenProvider.getid(token);
        int currentPage = 1;
        if(page != null){
            System.out.println("::::::insert" + page);
            currentPage = Integer.parseInt(page);
        }
        int totalPosts = qaboarderMapper.totalPage();
        System.out.println(totalPosts);
        int postPerPage = 10;
        int totalPages = (int)Math.ceil((double)totalPosts/postPerPage);
        System.out.println(":::::::::" + totalPages);
        int startRow = (currentPage -1) * postPerPage +1;
        int endRow = currentPage * postPerPage;

        List<QaBoarderMain> qaboarders = qaboarderMapper.findAll(startRow, endRow);

        System.out.println("::::  아이디"+qaboarders.get(0).getQaid());
        List<List<String>> qaboarderList = new ArrayList<>();

        for (QaBoarderMain qaboarder : qaboarders){
            String[] qaboard = new String[9]; // 크기 맞추기
            qaboard[0] = qaboarder.getQaid();
            qaboard[1] = qaboarder.getTitle();
            qaboard[2] = qaboarder.getAuthor();
            qaboard[3] = qaboarder.getCreated_at();
            qaboard[4] = qaboarder.getViews();
            qaboard[5] = qaboarder.getLikes();
            qaboard[6] = qaboarder.getContent();
            qaboard[7] = qaboarder.getImagename();
            qaboard[8] = qaboarder.getQacomments_count();
            qaboarderList.add(Arrays.asList(qaboard));
        }

        final int MAX_QAPAGE_LIMIT = 5;
        int startPage = (totalPages - currentPage) < MAX_QAPAGE_LIMIT ? totalPages - MAX_QAPAGE_LIMIT + 1 : currentPage;
        if(totalPages<MAX_QAPAGE_LIMIT){startPage=1;}
        int endPage = Math.min(startPage + MAX_QAPAGE_LIMIT -1, totalPages);


        model.addAttribute("items", qaboarders);
        Map<String, Object> data = new HashMap<>();
        data.put("qaboard", qaboarderList); // 배열형태의 데이터 추가
        data.put("currentPage", currentPage);
        data.put("endPage", endPage);
        data.put("maxPageNumber", MAX_QAPAGE_LIMIT);
        data.put("startPage", startPage);
        data.put("totalPage", totalPages);
        data.put("userId", userId);

        return data;
    }

    @GetMapping("/svqaboarddetail/{id}")
    public Map<String, Object> detailQaBoard(@PathVariable String id){

        String qaid = "";
        if(id != null){
            qaid = id;
        }
        Map<String, Object> data = new HashMap<>();
        List<QaBoarder> qaboardResult = qaboarderMapper.detailQaBoard(qaid);
        List<QaComment> qaboardcommentResult = qaboarderMapper.detailQaBoardComment(qaid);
        List<QaComment> qacomments = new ArrayList<>();
        Map<String, QaComment> qacommentMap = new HashMap<>();

        for (QaComment row : qaboardcommentResult) {

            String parentId = row.getParentcommentid(); // 부모 댓글의 id

            if(parentId == null){
                // 부모 댓글id가 null이면 바로 댓글 리스트에 추가
                qacommentMap.put(row.getQacommentid(), row);
                qacomments.add(row);

            } else {
                // 부모 댓글이 있는 경우 부모 댓글을 찾아서 자식 댓글 리스트에 추가
                List<QaComment> childComment = new ArrayList<>();

                childComment.add(row);
                qacommentMap.get(parentId).setChildren(childComment);
//                System.out.println("::::::: 답글?"+childComment);
            }
        }
        System.out.println(qacomments);

        data.put("qaboard", qaboardResult.get(0));
        data.put("qacomments", qacomments);

        return data;
    }

    @GetMapping("/svqaboarddelete/{id}")
    public Map<String, Boolean> deleteQaBoard(@PathVariable String id){
//        String postId = id;
        qaboarderMapper.deleteQaBoardComment(id);
        System.out.println(":::::::: 댓글 아이디"+qaboarderMapper.deleteQaBoardComment(id));
        boolean result = qaboarderMapper.deleteQaBoard(id);
        Map<String, Boolean> resultMe = new HashMap<>();
        resultMe.put("result", result);
        return resultMe;
    }

    @PostMapping("/svqacreate")
    public String createQaBoard(@RequestParam("files") MultipartFile[] files, @RequestHeader("Authorization") String token, @Valid @ModelAttribute QaBoarderInsert qaboarder, @RequestParam("festival_code") String festivalId) throws IOException, SQLException{
        System.out.println("::::::::::::::::::::::::"+qaboarder.getContent());

        String userId = jwtTokenProvider.getid(token);
        qaboarder.setUserid(userId);
        List<String> imagePaths = new ArrayList<>();
        List<String> imageNames = new ArrayList<>();

        for (MultipartFile file : files){
            String imageName = UUID.randomUUID().toString();
            String imagePath = saveFile(file.getInputStream(), imageName);
            imagePaths.add(imagePath);
            imageNames.add(imageName);
        }
        String combinedImageNames = String.join(";", imageNames);
        String combinedImagePaths = String.join(";", imagePaths);
        System.out.println(qaboarder.getUserid());

        String qaid = qaboarderMapper.getQaSequence();

        qaboarder.setQaid(qaid);
        qaboarder.setImagename(combinedImageNames);
        qaboarder.setImagepath(combinedImagePaths);
        qaboarder.setFestivalid(festivalId);
        System.out.println("::::::::::::::::::::::::"+qaboarder.getImagename());
        System.out.println("::::::::::::::::::::::::"+qaboarder.getImagepath());
        System.out.println("::::::::::::::::::::::::"+qaboarder.getTitle());
        System.out.println("::::::::::::::::::::::::"+qaboarder.getQaid());
        System.out.println("::::::::::::::::::::::::"+qaboarder.getContent());
        System.out.println("::::::::::::::::::::::::"+qaboarder.getFestivalid());
//        qaboarder.setFestivalid("22");
        qaboarderMapper.createQaBoard(qaboarder);
        return "OK";
    }

    private String saveFile(InputStream inputStream, String path) throws IOException{
        Path currentPath = Paths.get("");
        String currentDirectory = currentPath.toAbsolutePath().toString()+"/uploads/";
        System.out.println("현재 작업 디렉토리: " + currentDirectory);

        Path filePath = Paths.get(currentDirectory, path);

        // 파일을 저장하기 위한 OutputStream 생성
        try (OutputStream outputStream = new FileOutputStream(filePath.toFile())) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1){
                outputStream.write(buffer, 0, bytesRead);
            }
        } finally {
            // InputStream 닫기
            inputStream.close();
        }
        return filePath.toString();
    }

    @PostMapping("/svqaboardedit")
    public Map<String, Boolean> editQaBoard(@Valid @RequestBody QaBoarderInsert qaboarder){
        boolean result = qaboarderMapper.editQaBoard(qaboarder);
        System.out.println(result);

        Map<String, Boolean> resultMSG = new HashMap<>();
        resultMSG.put("result", result);
        return resultMSG;
    }

    @PostMapping("/svqaaddcomment")
    public Map<String, Boolean> addQaComment(@Valid @RequestBody QaCommentInsert qacomment){
        System.out.println("Received qacomment: " + qacomment);
        System.out.println("Parent Comment ID: " + qacomment.getParentcommentid());
        System.out.println("::::::::::::댓글 내용 + 댓글 코드 + 유저아이디 + 패런트코멘트아이디 : "+ qacomment.getContent() + qacomment.getQaid() + qacomment.getUserid() + qacomment.getParentcommentid());
        qacomment.setParentcommentid("");
        if(qacomment.getQacommentid() != null){
            qacomment.setParentcommentid(qacomment.getQacommentid());
            System.out.println("getQacommentid:: "+qacomment.getQacommentid());
//            System.out.println(qacomment.parentcommentid);
            qacomment.setQacommentid("");
        }
        System.out.println(qacomment);
        System.out.println(qacomment.getQaid()+"::::::id");
        System.out.println(qacomment.getContent()+"::::::id");
        System.out.println(qacomment.getUserid()+"::::::id");
//        System.out.println(qacomment.getQaid()+"::::::id");
//        System.out.println(qacomment.getQaid()+"::::::id");
        boolean result = qaboarderMapper.addqacomment(qacomment);

        Map<String, Boolean> resultMSG = new HashMap<>();
        resultMSG.put("result", result);

        return resultMSG;
    }

    @PostMapping({"/sveditqacomment", "/sveditqacomment/", "/sveditqacomment/{id}"})
    public Map<String, Boolean> editQaComment(@Valid @RequestBody QaCommentInsert qacomment, @PathVariable String id){
        qacomment.setQacommentid(id);
        System.out.println(":::::: 댓글 유저 아이디: "+ qacomment.getUserid());
        System.out.println(":::::::: 수정댓글 내용: "+ qacomment.getContent());
        System.out.println("::::::::: 댓글수정 게시판 아이디: "+qacomment.getQaid());
        System.out.println("::::::: 댓글 수정 댓글 아이디: "+qacomment.getQacommentid());
        System.out.println(":::::댓글 아이디 + 댓글 내용:  "+qacomment.getQacommentid() + qacomment.getContent());
        boolean result = qaboarderMapper.editqacomment(qacomment);
//        qacomment.setContent(qacomment.getContent());
        Map<String, Boolean> resultMSG = new HashMap<>();
        resultMSG.put("result", result);

        return resultMSG;
    }

    @PostMapping("/svdeleteqacomment/{qacommentid}")
    public Map<String, Boolean> deleteQaComment(@PathVariable String qacommentid,
                                                @RequestParam(required = false, defaultValue = "1") String qaid){
//        System.out.println(qacommentid);
        boolean result = qaboarderMapper.deleteqacomment(qacommentid);
        System.out.println(result);

        Map<String, Boolean> resultMSG = new HashMap<>();
        resultMSG.put("result", result);

        return resultMSG;
    }

    @GetMapping("/svqamain")
    public Map<String, Object> qamainBoardList(@RequestParam(required = false, defaultValue = "") String userid){
        Map<String, Object> result = new HashMap<>();
        List<QaBoarderMain> mainList = qaboarderMapper.findAll(-1, 5);
        List<List<String>> list = new ArrayList<>();
        for(QaBoarderMain main : mainList){
            List<String> qaboarder = new ArrayList<>();
            qaboarder.add(main.getQaid());
            qaboarder.add(main.getAuthor());
            qaboarder.add(main.getTitle());
            qaboarder.add(main.getCreated_at());
            qaboarder.add(main.getContent());
            qaboarder.add(main.getViews());
            qaboarder.add(main.getLikes());
            qaboarder.add(main.getImagename());
            list.add(qaboarder);
        }
        result.put("result", list);

        System.out.println(mainList.get(0).getQaid());
        return result;
    }
}
