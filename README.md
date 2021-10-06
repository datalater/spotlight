# 제작기

작업순서:

1. `background-image: radial-gradient()` 사용법 익히기

```css
.spotlight-mask  {
  /* A gradient at the center of its container,
     with transparent background and size of 150px,
     starting rgba(0, 0, 0, 0.4) */
  background-image: 
    radial-gradient(
      circle at center, 
      transparent 150px, 
      rgba(0, 0, 0, 0.4) 0
    );
}
```

> [mdn - radial-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient())

2. 마우스 이벤트의 좌표 속성 차이점 익히기

- `clientX`: 현재 보이는 화면 내의 X 좌표
- `offsetX`: 이벤트가 걸려 있는 DOM 요소 기준의 상대적 X 좌표
- `pageX`: 스크롤 화면을 포함한 전체 문서 기준의 X 좌표
- `screenX`: 사용자의 모니터 화면 전체 기준의 X 좌표

> [metagon111 - clientX, offsetX, pageX, screenX의 차이](http://megaton111.cafe24.com/2016/11/29/clientx-offsetx-pagex-screenx%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90/) 
