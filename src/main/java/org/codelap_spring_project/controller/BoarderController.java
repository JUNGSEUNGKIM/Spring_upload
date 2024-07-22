package org.codelap_spring_project.controller;

import org.codelap_spring_project.domain.*;
import org.codelap_spring_project.repository.mybatis.BoarderMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.*;



@RestController
@CrossOrigin(origins = { "${cors.allowed-origins}" },allowCredentials = "true",methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RequestMapping("/boarder")
public class BoarderController {

    private final BoarderMapper boarderMapper;


    @Autowired
    public BoarderController(BoarderMapper boarderMapper) {
        this.boarderMapper = boarderMapper;
    }
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    /**
     * @name : register
     * @date : 2024. 6. 14.
     * @author : 김정승
     * @description : 게시판의 main페이지의 내용을 요청한다.
     */
    @GetMapping(value={"/svboardmain?page","/svboardmain","svboardmain/","/svboardmain?user_id"})
    public Map<String, Object> list(Model model,@RequestHeader("Authorization") String token, @RequestParam(required = false, defaultValue ="1") String page){
        String userId = jwtTokenProvider.getid(token);
        int currentPage = 1;
        if(page != null) {
//            System.out.println("::::::::::::insert" + page);
             currentPage= Integer.parseInt(page);
        }
        int totalPosts = boarderMapper.totalPage();
        System.out.println(totalPosts);
        int postPerPage = 9;
        int totalPages=  (int)Math.ceil((double)totalPosts/postPerPage);
        System.out.println(":::::::"+totalPages);
        int startRow = (currentPage -1) * postPerPage +1;
        int endRow = currentPage  * postPerPage;

        List<BoarderMain> boarders;
        boarders = boarderMapper.findAll(startRow, endRow);
        List<List<String>> boarderList = new ArrayList<>();

        for (BoarderMain boarder : boarders) {
            String[] board = new String[9]; // 적절한 크기로 변경해야 함
            board[0] = boarder.getBoarder_code();
            board[1] = boarder.getTitle();// 예시로 한 개의 요소만 담음
            board[2] = boarder.getAuthor();
            board[3] = boarder.getCreated_at();
            board[4] = boarder.getViews();
            board[5] = boarder.getLikes();
            board[6] = boarder.getContent();
            board[7] = boarder.getImage_name();
            board[8] = boarder.getComments_count();
            boarderList.add(Arrays.asList(board));
        }
//        System.out.println(boarderList);

        final int MAX_PAGE_LIMIT = 5;
        int startPage = (totalPages - currentPage) < MAX_PAGE_LIMIT ? totalPages - MAX_PAGE_LIMIT + 1 : currentPage;
        if(totalPages<MAX_PAGE_LIMIT){startPage=1;}
        int endPage = Math.min(startPage + MAX_PAGE_LIMIT -1, totalPages);


        model.addAttribute("items", boarders);
        Map<String, Object> data = new HashMap<>();
        data.put("board", boarderList); // 배열 형태의 데이터 추가
        data.put("currentPage", currentPage);
        data.put("endPage", endPage);
        data.put("maxPageNumber", MAX_PAGE_LIMIT);
        data.put("startPage", startPage);
        data.put("totalPage", totalPages);
        data.put("userId", userId);

        return data;
    }

    @GetMapping("/svboarddetail/{id}")
    public Map<String,Object> detailBoard(@PathVariable String id) {

        String board_code = "";
        if(id != null){
            board_code = id;
        }
        Map<String, Object> data = new HashMap<>();
        List<Boarder> boardResult = boarderMapper.detailBoard(id);
        List<Comment> commentResult = boarderMapper.detailBoardComment(id);
        List<Comment> comments = new ArrayList<>();
        Map<String, Comment> commentMap = new HashMap<>();

        for (Comment row : commentResult) {

             // 자식 댓글을 저장할 리스트
            String parentId = row.getParent_comment_id(); // 부모 댓글의 id

            if (parentId == null) {
                // 부모 댓글이 null이면 바로 댓글 리스트에 추가
                commentMap.put(row.getComment_id(),row);
                comments.add(row);

            } else {
                List<Comment> childComment = new ArrayList<>();
                // 부모 댓글이 있는 경우 부모 댓글을 찾아서 자식 댓글 리스트에 추가

                childComment.add(row);
                commentMap.get(parentId).setChildren(childComment);
            }
        }
        System.out.println(comments);



        data.put("board",boardResult.get(0));
        data.put("comments",comments);


        return data;
    }

    @GetMapping("/svboarddelete/{id}")
    public Map<String, Boolean> deleteBoard(@PathVariable String id) {
        String postId = id;
        boarderMapper.deleteBoardComment(id);

        boolean result = boarderMapper.deleteBoard(id);
        Map<String, Boolean> resultMe= new HashMap<>();
        resultMe.put("result",result);
        return resultMe;
    }

    @PostMapping("/svcreate" )
    public String createBoard(@RequestParam("files") MultipartFile[] files,@RequestHeader("Authorization") String token, @Valid @ModelAttribute BoaderInsert boarder, @RequestParam("festival_code") String festivalCode) throws IOException, SQLException {
        System.out.println(token);
        String userId = jwtTokenProvider.getid(token);
        boarder.setUser_id(userId);
        List<String> imagePaths = new ArrayList<>();
        List<String> imageNames = new ArrayList<>();

        for (MultipartFile file : files) {
//            String imagePath = "/uploads/" + file.getOriginalFilename(); // 파일 경로
//            String imageName = file.getOriginalFilename(); // 파일 이름\
            String imageName = UUID.randomUUID().toString();
            String imagePath = saveFile(file.getInputStream(), imageName);
            imagePaths.add(imagePath);
            imageNames.add(imageName);
        }
        String combinedImageNames = String.join(";", imageNames);
        String combinedImagePaths = String.join(";", imagePaths);
//        System.out.println(combinedImageNames +"::::::::::::::::::::::");
        String boarder_code = boarderMapper.getSequence();
//        System.out.println("Sequence :::::::" + boarder_code);
        boarder.setBoarder_code(boarder_code);
        boarder.setImage_name(combinedImageNames);
        boarder.setImage_path(combinedImagePaths);

        boarderMapper.createBoard(boarder);
        return "OK";
    }

    private String saveFile(InputStream inputStream, String path) throws IOException {
        // Implement file saving logic
        Path currentPath = Paths.get("");
        String currentDirectory = currentPath.toAbsolutePath().toString()+"/uploads/";
        System.out.println("현재 작업 디렉토리: " + currentDirectory);

        Path filePath = Paths.get(currentDirectory, path);

        // 파일을 저장하기 위한 OutputStream 생성
        try (OutputStream outputStream = new FileOutputStream(filePath.toFile())) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        } finally {
            // InputStream 닫기
            inputStream.close();
        }
        return filePath.toString();
    }

    @PostMapping("/svboardedit")
    public Map<String, Boolean> editItem(@Valid @RequestBody BoaderInsert boarder) {
        System.out.println(boarder.getBoarder_code());
        System.out.println(boarder.getContent()+"::::"+ boarder.getTitle());

        boolean result = boarderMapper.editBoarder(boarder);

        Map<String, Boolean> resultMSG = new HashMap<>();
        resultMSG.put("result", result);
        return resultMSG;
    }

    @PostMapping("/svaddcomment")
    public Map<String, Boolean> addcomment(@Valid @RequestBody CommentInsert comment) {
        System.out.println(comment.getContent()+comment.getBoarder_code()+comment.getUser_id());
        comment.setParent_comment_id("");
        if(comment.getComment_id() != null) {
            comment.setParent_comment_id(comment.getComment_id());
            comment.setComment_id("");
        }

        boolean result = boarderMapper.addcomment(comment);
//        System.out.println(":::::::::"+result);
        Map<String, Boolean> resultMSG = new HashMap<>();
        resultMSG.put("result", result);


        return resultMSG;
    }

    @PostMapping({"/sveditcomment","/sveditcomment/","/sveditcomment/{id}"})
    public Map<String, Boolean> editcomment(@Valid @RequestBody CommentInsert comment,@PathVariable String id){
        comment.setComment_id(id);
        System.out.println(comment.getComment_id()+comment.getContent());
        boolean result = boarderMapper.editComment(comment);
//        System.out.println(result);

        Map<String, Boolean> resultMSG = new HashMap<>();
        resultMSG.put("result", result);

        return resultMSG;
    }

    @PostMapping("/svdeletecomment/{comment_id}")
    public Map<String, Boolean> deletecomment(@PathVariable String comment_id,
                                              @RequestParam(required = false, defaultValue = "1") String boarder_code){
//        System.out.println(comment_id);
        boolean result = boarderMapper.deletecomment(comment_id);
        System.out.println(result);

        Map<String, Boolean> resultMSG = new HashMap<>();
        resultMSG.put("result", result);

        return resultMSG;
    }

    @GetMapping("/svmain")
    public Map<String,Object> mainBoardList(@RequestParam(required = false, defaultValue = "")String user_id){
        Map<String, Object> result = new HashMap<>();
        List<BoarderMain> mainList = boarderMapper.findAll(-1,5);
        List<List<String>> list = new ArrayList<>();
        for(BoarderMain main : mainList){
            List<String> boarder = new ArrayList<>();
            boarder.add(main.getBoarder_code());
            boarder.add(main.getAuthor());
            boarder.add(main.getTitle());
            boarder.add(main.getCreated_at());
            boarder.add(main.getContent());
            boarder.add(main.getViews());
            boarder.add(main.getLikes());
            boarder.add(main.getImage_name());
            list.add(boarder);
        }
        result.put("result",list);

        System.out.println(mainList.get(0).getBoarder_code());
        return result;
    }
}
