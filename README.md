# ☀️ 해와 달 지도 (Sun & Moon Map)

이 프로젝트는 특정 위치와 날짜를 기준으로 **태양과 달의 궤적, 일출/일몰, 월출/월몰 시각 및 실시간 위치**를 지도 위에 시각화해주는 웹 애플리케이션입니다. 사진 작가, 천체 관측가, 혹은 단순히 자연의 흐름을 확인하고 싶은 분들에게 유용합니다.

---

## 🇰🇷 한국어 (Korean)

### 🚀 주요 기능
* **실시간 위치 추적**: 현재 GPS를 기반으로 내 위치의 일출/일몰, 월출/월몰 시각을 계산합니다.
* **태양 & 달 궤적 시각화**: 지도 위에 부채꼴 형태로 고도와 방위각에 따른 이동 경로를 표시합니다.
* **시간별 위치 확인**: 마우스를 궤적 근처에 올리면 해당 시간대의 방위각을 실시간으로 확인할 수 있습니다.
* **목표 지점 방위각 계산**: 지도 우클릭(모바일 롱터치)으로 특정 목표물까지의 선을 긋고 정확한 방위각을 측정할 수 있습니다.
* **자동 다크/라이트 모드**: 낮과 밤 상태에 따라 지도 테마가 자동으로 전환됩니다.

### 🖱️ 사용 방법
1. **좌클릭**: 기준점(내 위치)을 설정합니다.
2. **우클릭 (모바일 롱터치)**: 목표 지점까지 핀을 꽂고 방위각을 확인합니다.
3. **날짜 선택**: 특정 날짜의 궤적을 미리 볼 수 있습니다.

---

## 🇺🇸 English

### 🚀 Key Features
* **Real-time Tracking**: Calculates sunrise/sunset and moonrise/moonset based on your GPS.
* **Visual Trajectories**: Displays the path of the sun and moon using colored arcs and lines.
* **Hourly Positions**: Hover over the tracks to see the exact time and azimuth.
* **Target Azimuth Tool**: Right-click (or long press on mobile) to drop pins and measure precise bearing.
* **Adaptive Theme**: Automatically switches between light and dark modes based on local solar time.

### 🖱️ How to Use
1. **Left-click**: Set your anchor point.
2. **Right-click (Long-press)**: Drop a target pin to see the line and azimuth.
3. **Date Picker**: Change the date for future observations.

---

## 🇯🇵 日本語 (Japanese)

### 🚀 主な機能
* **リアルタイム位置追跡**: GPSに基づいて日の出/日の入り、月の出/月の入り時刻を計算します。
* **軌跡の視覚化**: 太陽と月の軌道と方位角をマップ上に表示します。
* **時間別の位置**: 軌跡にマウスポインタを合わせると、指定時間の方位角が表示されます。
* **目標方位角測定**: 右クリック（スマホは長押し）で目標地点までの正確な方位角を測定します。
* **自動テーマ変更**: 現地の太陽時間に合わせてライト/ダークモードが自動で切り替わります。

### 🖱️ 使い方
1. **左クリック**: 基準点（現在地）を設定します。
2. **右クリック（長押し）**: 目標地点にピンを立てて方位角を確認します。
3. **日付選択**: 指定した日付の軌跡をプレビューできます。

---

## 🇨🇳 中文 (Chinese)

### 🚀 主要功能
* **实时定位**: 根据您的GPS位置计算日出/日落和月出/月落时间。
* **轨迹可视化**: 在地图上直观显示太阳和月亮的移动轨迹与方位角。
* **按小时查看位置**: 将鼠标悬停在轨迹上即可查看特定时间的精确方位角。
* **目标方位角工具**: 右键单击（移动设备长按）可测量从您所在位置到目标点的精确方位角。
* **自适应主题**: 根据当地太阳时间自动切换浅色或深色模式。

### 🖱️ 使用方法
1. **左键单击**: 设置您的基准点。
2. **右键单击（长按）**: 放置目标引脚以查看连线和方位角。
3. **日期选择器**: 更改日期以规划未来的观测。

---

## 🇫🇷 Français (French)

### 🚀 Caractéristiques Principales
* **Suivi en temps réel**: Calcule l'heure de lever/coucher du soleil et de la lune en fonction de votre position.
* **Trajectoires Visuelles**: Affiche le parcours du soleil et de la lune sur la carte via des arcs colorés.
* **Positions Horaires**: Survolez les trajectoires pour voir le temps exact et l'azimut.
* **Outil d'Azimut Cible**: Clic droit (ou appui long sur mobile) pour placer des marqueurs et mesurer l'angle.
* **Thème Adaptatif**: Alterne automatiquement entre mode clair et sombre selon l'heure locale.

### 🖱️ Comment l'utiliser
1. **Clic-gauche**: Définir votre point d'ancrage.
2. **Clic-droit (Appui long)**: Placer un marqueur cible pour connaître l'azimut partiel.
3. **Sélecteur de date**: Changer de date pour des observations futures.

---

## 🛠️ Tech Stack
* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **Map Library**: [Leaflet.js](https://leafletjs.com/)
* **Astronomy Logic**: [SunCalc](https://github.com/mourner/suncalc)
* **Analytics**: Google Analytics (GA4)

---

## 📄 License & Copyright

Copyright (c) 2026 **daa-color-log**

This project is licensed under the **MIT License**.  
본 프로젝트는 MIT 라이선스에 따라 자유롭게 사용, 수정 및 배포가 가능합니다. 단, 사용 시 원저작자(daa-color-log) 명시가 필요합니다.
