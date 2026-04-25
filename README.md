# Bar Round

## 소개

![alt text](Gemini_Generated_Image_gmtnkwgmtnkwgmtn.png)

## 빌드하기

### 공통
1. 빌드 패키지 설치
```bash
npm install -g eas-cli
```
2. expo login
```bash
eas login

# expo의 ID와 패스워드 입력
Email or username
Password
```
3. build 설정하기
```bash
eas build:configure

# 프로젝트 생성 자동 생성 Y/N
Would you like to automatically create an EAS project for userName/productName?

# 어떤 플랫폼으로 구성할지 (IOS/Android/all)
Which platforms would you like to configure for EAS Build?

# 어떤 ID로 생성할지
# 보통은 com.회사이름(혹은 개발자이름).앱이름으로 지정
# 스토어에 올릴때 사용됨
What would you like your Android application id to be?

# 앱이 내것임을 증명하는 전자서명
# 안드로이드 생태계는 해당 서명이 있어야지만 설치되거나 스토어에 올라감
Generate a new Android Keystore?
```
### 안드로이드
 ```bash
 # 테스트 용 빌드
eas build --platform android --profile preview

# 스토어 업로드 빌드
eas build --platform android --profile production
 ```
 ### IOS
 - 빌드 과정 중 apple ID 로그인을 요청하며 인증서를 EXPO가 자동으로 생성
 ```bash
# 스토어 업로드 빌드
eas build --platform ios
```

### 내 컴퓨터에 직접 빌드
- IOS는 XCODE가, 안드로이드는 안드로이드 스튜디오가 설치되어 있어야 함
```bash
npx expo run:android  # 안드로이드 로컬 빌드 및 실행
npx expo run:ios      # iOS 로컬 빌드 및 실행 (Mac 전용)
```