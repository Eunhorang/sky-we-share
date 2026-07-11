# 하늘을 나눠 가진 우리

> 푸른 날마다 다시 만나는 가족 그림전

청량한 하늘빛 아래 이어진 가족의 순간을 자유롭게 감상하는 공개 온라인 그림전입니다.

- 웹사이트: <https://eunhorang.github.io/sky-we-share/>
- 공개 방식: GitHub Pages
- 구성: 반응형 자유 배열 갤러리, 큰 그림 보기, 키보드 탐색

## 새 그림을 추가하는 가장 쉬운 방법

1. GitHub 저장소에서 `assets/gallery` 폴더를 엽니다.
2. 오른쪽 위의 **Add file → Upload files**를 누릅니다.
3. 새 그림을 끌어다 놓습니다.
4. 파일 이름은 기존 순서 다음으로 정합니다. 예: `sky-25.jpg`, `sky-26.png`
5. 아래의 **Commit changes**를 누릅니다.
6. 자동 작업이 그림 목록을 갱신하고 웹사이트를 다시 배포합니다. 보통 몇 분 뒤 반영됩니다.

지원 형식: JPG, JPEG, PNG, WebP, GIF, AVIF

> 새 그림의 기본 대체 설명은 자동으로 들어갑니다. 더 정확한 설명을 쓰고 싶다면 자동 갱신이 끝난 뒤 `gallery.json`에서 해당 그림의 `alt` 문장만 수정해 Commit하면 됩니다.

## 로컬에서 확인하기

```bash
python3 -m http.server 8000
```

브라우저에서 <http://localhost:8000>을 엽니다.

## 글꼴 및 저작권

- 웹 글꼴: Pretendard Variable (SIL Open Font License 1.1)
- 그림 이미지는 이 가족 그림전을 위한 개인 소장 작품입니다. 별도의 허락 없이 복제·재배포하지 마세요.
- 저장소를 공개해도 이미지의 저작권이나 이용 권한이 자동으로 허용되는 것은 아닙니다.
