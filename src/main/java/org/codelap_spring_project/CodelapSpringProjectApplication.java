package org.codelap_spring_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@SpringBootApplication(scanBasePackages = "org.codelap_spring_project.controller")
public class CodelapSpringProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodelapSpringProjectApplication.class, args);
        String pythonExecutable = "/opt/anaconda3/bin/python3";
//        String pythonExecutable = "/opt/homebrew/bin/python3";
//        String pythonExecutable = "C:\\Users\\EZEN\\anaconda3\\python.exe";
        // 파이썬 스크립트 파일 경로
        String pythonScript = "py/chat_server_server.py";

        // 외부 프로세스 실행하여 파이썬 스크립트 실행
        try {
            ProcessBuilder processBuilder = new ProcessBuilder(pythonExecutable, pythonScript);
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();

            // 프로세스의 출력을 읽어오기
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            int exitCode = process.waitFor(); // 프로세스가 종료될 때까지 대기
            System.out.println("파이썬 스크립트 실행 종료 코드: " + exitCode);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

    }

}
