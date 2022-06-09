<h1 align="center">
  <br>
  <a href="https://jiwon-edu.herokuapp.com/">
    <img src="https://github.com/wn5865/natour/blob/main/public/img/logo-green-round.png" alt="EDU" width="50">
  </a>
  <br>
  EDU
</h1>

## 소개

- 이 프로젝트는 그린컴퓨터 아카데미 수료 포트폴리오로 제출한 온라인 강의 웹사이트입니다.
- 사용자가 회원가입 및 로그인을 하고 강의를 수강 및 등록할 수 있는 단순한 기능들을 수행할 수 있습니다.

## 배포 주소

Heroku에 배포한 사이트 주소 👉 https://jiwon-online-learning.herokuapp.com/

## 사용 기술

- 백엔드

  - [Spring Boot](https://spring.io/) - 자바 프레임워크
  - [MySQL](https://www.mysql.com) - 관계형 데이터베이스

- 프론트엔드

  - [Angular](https://angular.io) - 타입스크립트 기반 웹 어플리케이션 프레임워크
  - [Bootstrap CSS](https://getbootstrap.com) - CSS 프레임워크

- 기타
  - [okta](https://www.okta.com/) - 사용자 인증 클라우드 플랫폼

## 주요 기능

- 사용자 인증
  - okta를 사용하여 회원가입, 로그인, 비밀번호 찾기 기능 구현
- 강의
  - 로그인 후 유저가 강의를 수강하거나 강의를 직접 등록할 수 있음

## 사용방법

### 회원가입 및 로그인

- 홈페이지 상단의 로그인을 누르면 로그인 화면으로 이동
- 로그인 화면 하단의 '가입' 버튼을 눌러 회원가입

### 강의 수강

- 로그인 후 강의 상세정보 페이지에서 '수강하기' 버튼을 눌러 강의 수강 가능

### 강의 등록

- 로그인 후 상단의 '강의 등록하기' 클릭
- 강의 상세 정보를 입력하고 썸네일, 강의 영능을 업로드하면 강의 등록 가능

## 시연 영상

https://drive.google.com/file/d/13nEgJkqbKfgOWFrpwl8DO6l5TLtxP0QI/view?usp=sharing

## 향후 추가해야할 사항들

- 강의 북마크 기능
- 사용자가 강의 수강 후 리뷰를 남길 수 있는 기능
- 온라인 결제 플랫폼을 이용한 강의 구매 구현
- 관리자 페이지를 통한 강의 및 유저 관리
