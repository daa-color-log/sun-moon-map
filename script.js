// --- Constants & Config ---
const DEFAULT_LOC = [37.5665, 126.9780];
const R_EARTH = 6371;

// --- DOM Elements Cache ---
const elements = {
    get chkDay() { return document.getElementById('chk-day'); },
    get chkMoon() { return document.getElementById('chk-moon'); },
    get chkPermanent() { return document.getElementById('chk-permanent'); },
    get datePicker() { return document.getElementById('date-picker'); },
    get dateValue() { return document.getElementById('date-value'); },
    get dateDay() { return document.getElementById('date-day'); },
    get locationText() { return document.getElementById('location-text'); },
    get themeToggleBtn() { return document.getElementById('theme-toggle-btn'); },
    get sidebarToggle() { return document.getElementById('sidebar-toggle'); },
    get langSelector() { return document.getElementById('lang-selector'); },
    get locateBtn() { return document.getElementById('locate-btn'); },
    get sunRiseValue() { return document.getElementById('sun-rise-val'); },
    get sunSetValue() { return document.getElementById('sun-set-val'); },
    get moonRiseValue() { return document.getElementById('moon-rise-val'); },
    get moonSetValue() { return document.getElementById('moon-set-val'); },
    get calendarModal() { return document.getElementById('calendar-modal'); },
    get calendarTitle() { return document.getElementById('calendar-title'); },
    get calendarDays() { return document.getElementById('calendar-days'); },
    get closeCalendar() { return document.getElementById('close-calendar'); },
    get prevMonth() { return document.getElementById('prev-month'); },
    get nextMonth() { return document.getElementById('next-month'); },
    get goToToday() { return document.getElementById('go-to-today'); },
    get dateSelectionTrigger() { return document.getElementById('date-selection-trigger'); }
};

// --- App State ---
const state = {
    showSun: true,
    showMoon: false,
    selectedDate: new Date(),
    viewDate: new Date(),
    currentLang: localStorage.getItem('appLang') || 'en',
    isManualTheme: false,
    mainAnchorLatLng: null,
    targetPins: [],
    hoverTimeData: [],
    drawDistKm: 2000,
    radiusKm: 10,
    showPermanentTooltips: true
};

// --- i18n Data ---
const i18n = {
    ko: {
        title: "해와 달 지도",
        loc_fetching: "위치 정보를 가져오는 중...",
        help_text: "🗺️ <b>지도 조작 가이드</b><br>📍 <b>좌클릭</b>: 원하는 지점을 클릭하면 그곳이 분석의 <b>기준점</b>(내 위치)이 됩니다.<br>🎯 <b>우클릭 / 롱터치</b>: 기준점 설정 후 다른 곳을 조작하면 <b>목표 지점</b>까지의 직선과 방위각 핀이 생성됩니다.<br>✨ 기준점을 먼저 세워야 목표 핀을 꽂을 수 있습니다!",
        date_select: "날짜 선택",
        map_display_settings: "지도 궤적 표시 설정",
        sun_track: "☀️ 태양 궤적 (일출/일몰)",
        moon_track: "🌙 달 궤적 (월출/월몰)",
        sunrise: "일출",
        sunset: "일몰",
        moonrise: "월출",
        moonset: "월몰",
        btn_gps: "📍 현재 위치로 이동",
        btn_menu: "☰ 메뉴",
        today_none: "오늘 없음",
        theme_auto_day: "🌓 주간 (자동)",
        theme_auto_night: "🌓 야간 (자동)",
        theme_light: "🌞 라이트모드",
        theme_dark: "🌛 다크모드",
        loc_confirming: "위치 확인 중...",
        loc_init: "초기 위치 설정 중...<br><small>지도를 직접 클릭하여 기준점을 세워보세요.</small>",
        loc_init_fail: "초기 위치를 찾을 수 없습니다.<br><small>지도를 직접 클릭하여 기준점을 세워보세요.</small>",
        lat: "위도",
        lng: "경도",
        pin_aim: "목표 방위각: ",
        pin_del: "클릭하여 삭제",
        err_click_first: "먼저 지도를 좌클릭하여 기준점(내 위치)을 설정해주세요!",
        err_no_gps_support: "위치 정보를 지원하지 않습니다.",
        err_gps_failed_alert: "GPS 위치를 가져올 수 없습니다. 권한이 차단되었거나 신호가 약합니다.",
        err_gps_failed_text: "위치 권한이 거부되었거나 GPS 신호를 찾을 수 없습니다.<br><small>지도를 직접 클릭하여 기준점을 세워보세요.</small>",
        gps_requesting: "GPS 위치 정보 요청 중...<br><small>위치 권한을 허용해주세요.</small>",
        sun_pos_label: "현재 태양 위치",
        moon_pos_label: "현재 달 위치",
        alt_label: "고도",
        az_label: "방위각",
        sun_line_lbl: "☀️ 일출",
        sunset_line_lbl: "🌇 일몰",
        moon_line_lbl: "🌕 월출",
        moonset_line_lbl: "🌑 월몰",
        hour_suffix: "시",
        day_sun: "일", day_mon: "월", day_tue: "화", day_wed: "수", day_thu: "목", day_fri: "금", day_sat: "토",
        day_fmt: (d) => ` (${['일', '월', '화', '수', '목', '금', '토'][d]}요일)`,
        btn_today: "오늘",
        footer_all_rights: "All rights reserved.",
        footer_license_prefix: "Licensed under the ",
        location_settings: "위치 설정",
        language_settings: "언어 설정",
        toggle_permanent: "해/달 위치정보 항상 표시",
        pin_label_prefix: "기준점 "
    },
    en: {
        title: "Sun & Moon Map",
        loc_fetching: "Fetching location...",
        help_text: "🗺️ <b>Map Guide</b><br>📍 <b>Left-click</b> to set your <b>anchor point</b> (base location).<br>🎯 <b>Right-click / Long-press</b> to drop target pins and see <b>bearing lines</b> from your anchor.<br>✨ Set an anchor point first before adding targets!",
        date_select: "Select Date",
        map_display_settings: "Map Settings",
        sun_track: "☀️ Sun Track (Rise/Set)",
        moon_track: "🌙 Moon Track (Rise/Set)",
        sunrise: "Sunrise",
        sunset: "Sunset",
        moonrise: "Moonrise",
        moonset: "Moonset",
        btn_gps: "📍 My Location",
        btn_menu: "☰ Menu",
        today_none: "None today",
        theme_auto_day: "🌓 Day (Auto)",
        theme_auto_night: "🌓 Night (Auto)",
        theme_light: "🌞 Light Mode",
        theme_dark: "🌛 Dark Mode",
        loc_confirming: "Confirming location...",
        loc_init: "Initializing location...<br><small>Click on the map to set anchor.</small>",
        loc_init_fail: "Init location failed.<br><small>Click on the map to set anchor.</small>",
        lat: "Lat",
        lng: "Lng",
        pin_aim: "Target Azimuth: ",
        pin_del: "Click to delete",
        err_click_first: "Please left-click on the map first to set anchor!",
        err_no_gps_support: "Geolocation gets no support.",
        err_gps_failed_alert: "Unable to retrieve GPS location.",
        err_gps_failed_text: "Location permission denied.<br><small>Click on map to set anchor.</small>",
        gps_requesting: "Requesting GPS...<br><small>Please allow permission.</small>",
        sun_pos_label: "Current Sun Position",
        moon_pos_label: "Current Moon Position",
        alt_label: "Alt",
        az_label: "Azimuth",
        sun_line_lbl: "☀️ Sunrise",
        sunset_line_lbl: "🌇 Sunset",
        moon_line_lbl: "🌕 Moonrise",
        moonset_line_lbl: "🌑 Moonset",
        hour_suffix: ":00",
        day_sun: "Sun", day_mon: "Mon", day_tue: "Tue", day_wed: "Wed", day_thu: "Thu", day_fri: "Fri", day_sat: "Sat",
        day_fmt: (d) => ` (${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d]})`,
        btn_today: "Today",
        footer_all_rights: "All rights reserved.",
        footer_license_prefix: "Licensed under the ",
        location_settings: "Location Settings",
        language_settings: "Language Settings",
        toggle_permanent: "Always show Sun/Moon position",
        pin_label_prefix: "Point "
    },
    ja: {
        title: "太陽と月の地図",
        loc_fetching: "位置情報を取得中...",
        help_text: "🗺️ <b>操作ガイド</b><br>📍 <b>左クリック</b>: 地図上の地点をクリックして<b>基準点</b>（自分の位置）を設定します。<br>🎯 <b>右クリック / 長押し</b>: 基準点から<b>目標地点</b>までの直線と方位角を確認できるピンを追加します。<br>✨ 最初に基準点を設定してから目標ピンを追加してください。",
        date_select: "日付を選択",
        map_display_settings: "マップ表示設定",
        sun_track: "☀️ 太陽の軌跡",
        moon_track: "🌙 月の軌跡",
        sunrise: "日の出",
        sunset: "日の入り",
        moonrise: "月の出",
        moonset: "月の入り",
        btn_gps: "📍 現在地へ移動",
        btn_menu: "☰ メニュー",
        today_none: "本日はなし",
        theme_auto_day: "🌓 昼 (自動)",
        theme_auto_night: "🌓 夜 (自動)",
        theme_light: "🌞 ライトモード",
        theme_dark: "🌛 ダークモード",
        loc_confirming: "位置を確認中...",
        loc_init: "初期位置設定中...<br><small>直接クリックして基準点を設定してください。</small>",
        loc_init_fail: "初期位置が見つかりません。<br><small>基準点を設定してください。</small>",
        lat: "緯度",
        lng: "経度",
        pin_aim: "目標方位角: ",
        pin_del: "クリックして削除",
        err_click_first: "地図を左クリックして基準点を確認してください！",
        err_no_gps_support: "ブラウザが位置情報をサポートしていません。",
        err_gps_failed_alert: "GPS位置情報の取得に失敗しました。",
        err_gps_failed_text: "位置情報の取得が拒否されました。<br><small>地図をクリックして基準点を設定してください。</small>",
        gps_requesting: "GPS位置情報を取得中...<br><small>位置情報の利用を許可してください。</small>",
        sun_pos_label: "現在の太陽の位置",
        moon_pos_label: "現在の月の位置",
        alt_label: "高度",
        az_label: "方位角",
        sun_line_lbl: "☀️ 日の出",
        sunset_line_lbl: "🌇 日の入り",
        moon_line_lbl: "🌕 月の出",
        moonset_line_lbl: "🌑 月の入り",
        hour_suffix: "時",
        day_sun: "日", day_mon: "月", day_tue: "火", day_wed: "水", day_thu: "木", day_fri: "金", day_sat: "土",
        day_fmt: (d) => ` (${['日', '月', '火', '水', '木', '金', '土'][d]}曜日)`,
        btn_today: "本日",
        footer_all_rights: "All rights reserved.",
        footer_license_prefix: "Licensed under the ",
        location_settings: "位置設定",
        language_settings: "言語設定",
        toggle_permanent: "太陽/月の位置情報を常に表示",
        pin_label_prefix: "基準点 "
    },
    zh: {
        title: "日月地图",
        loc_fetching: "正在获取位置...",
        help_text: "🗺️ <b>操作指南</b><br>📍 <b>左键单击</b>: 在地图上点击以设置<b>基准点</b>（我的位置）。<br>🎯 <b>右键单击 / 长按</b>: 设置目标点并查看从基准点出发的<b>方位线</b>和引脚。<br>✨ 请先设置基准点，然后再添加目标点！",
        date_select: "选择日期",
        map_display_settings: "显示设置",
        sun_track: "☀️ 太阳轨迹",
        moon_track: "🌙 月亮轨迹",
        sunrise: "日出",
        sunset: "日落",
        moonrise: "月出",
        moonset: "月落",
        btn_gps: "📍 我的位置",
        btn_menu: "☰ 菜单",
        today_none: "今日无",
        theme_auto_day: "🌓 白天 (自动)",
        theme_auto_night: "🌓 黑夜 (自动)",
        theme_light: "🌞 亮色模式",
        theme_dark: "🌛 暗色模式",
        loc_confirming: "正在确认位置...",
        loc_init: "初始化位置...<br><small>请点击地图设置基准点。</small>",
        loc_init_fail: "初始化位置失败。<br><small>请点击地图设置基准点。</small>",
        lat: "纬度",
        lng: "经度",
        pin_aim: "目标方位角: ",
        pin_del: "点击删除",
        err_click_first: "请先在地图上左键单击设置基准点！",
        err_no_gps_support: "您的浏览器不支持地理位置。",
        err_gps_failed_alert: "无法获取GPS位置。",
        err_gps_failed_text: "位置权限被拒绝。<br><small>请在地图上点击设置基准点。</small>",
        gps_requesting: "正在请求GPS...<br><small>请允许位置权限。</small>",
        sun_pos_label: "当前太阳位置",
        moon_pos_label: "当前月亮位置",
        alt_label: "高度",
        az_label: "方位角",
        sun_line_lbl: "☀️ 日出",
        sunset_line_lbl: "🌇 日落",
        moon_line_lbl: "🌕 月出",
        moonset_line_lbl: "🌑 月落",
        hour_suffix: "点",
        day_sun: "日", day_mon: "一", day_tue: "二", day_wed: "三", day_thu: "四", day_fri: "五", day_sat: "六",
        day_fmt: (d) => ` (周${['日', '一', '二', '三', '四', '五', '六'][d]})`,
        btn_today: "今日",
        footer_all_rights: "All rights reserved.",
        footer_license_prefix: "Licensed under the ",
        location_settings: "位置设置",
        language_settings: "语言设置",
        toggle_permanent: "始终显示日/月位置信息",
        pin_label_prefix: "目标点 "
    },
    fr: {
        title: "Carte Soleil & Lune",
        loc_fetching: "Récupération...",
        help_text: "🗺️ <b>Guide de la carte</b><br>📍 <b>Clic-gauche</b> : Cliquez pour définir votre <b>point d'origine</b> (ma position).<br>🎯 <b>Clic-droit / Appui long</b> : Ajoutez des cibles pour voir la <b>ligne de visée</b> et l'azimut depuis l'origine.<br>✨ Définissez d'abord une origine avant d'ajouter des cibles !",
        date_select: "Date",
        map_display_settings: "Affichage",
        sun_track: "☀️ Trajectoire Solaire",
        moon_track: "🌙 Trajectoire Lunaire",
        sunrise: "Lever",
        sunset: "Coucher",
        moonrise: "Lever de lune",
        moonset: "Coucher de lune",
        btn_gps: "📍 Ma Position",
        btn_menu: "☰ Menu",
        today_none: "Aucun",
        theme_auto_day: "🌓 Jour (Auto)",
        theme_auto_night: "🌓 Nuit (Auto)",
        theme_light: "🌞 Mode Clair",
        theme_dark: "🌛 Mode Sombre",
        loc_confirming: "Confirmation...",
        loc_init: "Initialisation...<br><small>Cliquez pour définir la position.</small>",
        loc_init_fail: "Échec...<br><small>Cliquez pour définir la position.</small>",
        lat: "Lat",
        lng: "Lng",
        pin_aim: "Azimut: ",
        pin_del: "Cliquer pour effacer",
        err_click_first: "Veuillez d'abord faire un clic gauche !",
        err_no_gps_support: "Pas de GPS sur votre navigateur.",
        err_gps_failed_alert: "Impossible d'obtenir la position GPS.",
        err_gps_failed_text: "Permission refusée.<br><small>Cliquez sur la carte.</small>",
        gps_requesting: "Demande de position...<br><small>Autorisez le GPS.</small>",
        sun_pos_label: "Position du Soleil",
        moon_pos_label: "Position de la Lune",
        alt_label: "Alt",
        az_label: "Azimut",
        sun_line_lbl: "☀️ Lever du soleil",
        sunset_line_lbl: "🌇 Coucher du soleil",
        moon_line_lbl: "🌕 Lever de lune",
        moonset_line_lbl: "🌑 Coucher de lune",
        hour_suffix: "h",
        day_sun: "Dim", day_mon: "Lun", day_tue: "Mar", day_wed: "Mer", day_thu: "Jeu", day_fri: "Ven", day_sat: "Sam",
        day_fmt: (d) => ` (${['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][d]})`,
        btn_today: "Aujourd'hui",
        footer_all_rights: "All rights reserved.",
        footer_license_prefix: "Sous licence ",
        location_settings: "Paramètres de localisation",
        language_settings: "Paramètres de langue",
        toggle_permanent: "Toujours afficher position Soleil/Lune",
        pin_label_prefix: "Point "
    }
};

// --- Init Map ---
const map = L.map('map', { zoomControl: false }).setView(DEFAULT_LOC, 7);
const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 20 }).addTo(map);
L.control.zoom({ position: 'bottomright' }).addTo(map);

const mainLayerGroup = L.layerGroup().addTo(map);
const extraPinsGroup = L.layerGroup().addTo(map);
let hoverLayer = null;

const anchorIcon = L.divIcon({
    className: 'transparent-icon',
    html: `<div style="position:relative; width:60px; height:60px; display:flex; align-items:center; justify-content:center; margin-left:-30px; margin-top:-30px;">
             <div class="pin"></div>
             <div class="pulse-ring"></div>
           </div>`,
    iconSize: [0, 0]
});

let mainAnchorMarker = null;

// --- Helper Functions ---

function getDestinationPoint(lat, lng, azimuthRadians, distanceKm) {
    const lat1 = lat * Math.PI / 180;
    const lng1 = lng * Math.PI / 180;
    const brng = azimuthRadians;
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(distanceKm / R_EARTH) + Math.cos(lat1) * Math.sin(distanceKm / R_EARTH) * Math.cos(brng));
    const lng2 = lng1 + Math.atan2(Math.sin(brng) * Math.sin(distanceKm / R_EARTH) * Math.cos(lat1), Math.cos(distanceKm / R_EARTH) - Math.sin(lat1) * Math.sin(lat2));
    return [lat2 * 180 / Math.PI, lng2 * 180 / Math.PI];
}

function formatTime(dateObject) {
    if (!dateObject || isNaN(dateObject.getTime())) return i18n[state.currentLang].today_none;
    return dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getDisplayTimeStr(timestamp, baseTimestamp, showMinutes = false) {
    const d = new Date(timestamp);
    const base = new Date(baseTimestamp);
    
    // Estimate local timezone offset based on longitude (15 deg = 1 hour)
    let utcOffset = 0;
    if (state.mainAnchorLatLng) {
        utcOffset = Math.round(state.mainAnchorLatLng.lng / 15);
    } else {
        // Fallback to browser timezone if no anchor
        utcOffset = -d.getTimezoneOffset() / 60;
    }

    const totalHours = (d.getUTCHours() + utcOffset + 24) % 24;
    const baseTotalHours = (base.getUTCHours() + utcOffset + 24) % 24;

    const dZero = new Date(d); dZero.setUTCHours(0,0,0,0);
    const bZero = new Date(base); bZero.setUTCHours(0,0,0,0);
    const dayDiff = Math.round((dZero - bZero) / 86400000);
    
    const displayHour = totalHours + (dayDiff * 24);
    const mm = String(d.getUTCMinutes()).padStart(2, '0');

    if (showMinutes) return displayHour + ':' + mm;
    return displayHour + i18n[state.currentLang].hour_suffix;
}

function drawLineWithLabel(start, azimuth, color, labelText, layerGroup, drawDistKm) {
    const end = getDestinationPoint(start[0], start[1], azimuth, drawDistKm);
    L.polyline([start, end], { color, weight: 3, opacity: 0.85, dashArray: '8, 12' }).addTo(layerGroup);

    const startPx = map.latLngToContainerPoint(start);
    const rPx = 130;
    const dx = Math.sin(azimuth) * rPx;
    const dy = -Math.cos(azimuth) * rPx;
    const labelPos = map.containerPointToLatLng(L.point(startPx.x + dx, startPx.y + dy));

    L.marker(labelPos, {
        icon: L.divIcon({
            className: 'transparent-icon',
            html: `<div class="custom-line-label" style="color: ${color}; border-color: ${color};">${labelText}</div>`,
            iconSize: null
        }),
        interactive: false
    }).addTo(layerGroup);
}

// --- Core Calculation & Drawing Logic ---

function updateAstronomyTimesUI(sunTimes, moonTimes) {
    const t = i18n[state.currentLang];
    elements.sunRiseValue.innerText = sunTimes.sunrise ? formatTime(sunTimes.sunrise) : t.today_none;
    elements.sunSetValue.innerText = sunTimes.sunset ? formatTime(sunTimes.sunset) : t.today_none;
    elements.moonRiseValue.innerText = moonTimes.rise ? formatTime(moonTimes.rise) : t.today_none;
    elements.moonSetValue.innerText = moonTimes.set ? formatTime(moonTimes.set) : t.today_none;
}

function handleAutoTheme(lat, lng) {
    if (state.isManualTheme) return;
    const now = new Date();
    const times = SunCalc.getTimes(now, lat, lng);
    const isDaytime = now >= times.sunrise && now <= times.sunset;
    const t = i18n[state.currentLang];

    if (isDaytime) {
        document.body.classList.add('light-mode');
        tileLayer.setUrl('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png');
        elements.themeToggleBtn.innerText = t.theme_auto_day;
    } else {
        document.body.classList.remove('light-mode');
        tileLayer.setUrl('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
        elements.themeToggleBtn.innerText = t.theme_auto_night;
    }
}

function drawSunTrack(lat, lng, sunTimes, layerGroup, radiusKm, drawDistKm) {
    if (!sunTimes.sunrise || !sunTimes.sunset || !state.showSun) return;

    const t1 = sunTimes.sunrise.getTime();
    const t2 = sunTimes.sunset.getTime();
    const arcPoints = [[lat, lng]];
    const step = (t2 - t1) / 40;

    for (let timeT = t1; timeT <= t2; timeT += step) {
        const pos = SunCalc.getPosition(new Date(timeT), lat, lng);
        arcPoints.push(getDestinationPoint(lat, lng, pos.azimuth + Math.PI, radiusKm));
    }
    const sunsetPos = SunCalc.getPosition(sunTimes.sunset, lat, lng);
    arcPoints.push(getDestinationPoint(lat, lng, sunsetPos.azimuth + Math.PI, radiusKm));
    L.polygon(arcPoints, { color: 'none', fillColor: '#FFD700', fillOpacity: 0.15, interactive: false }).addTo(layerGroup);

    // Hourly labels
    const startHourObj = new Date(t1);
    startHourObj.setMinutes(0, 0, 0);
    for (let currentHourTime = startHourObj.getTime() + 3600000; currentHourTime < t2; currentHourTime += 3600000) {
        const az = SunCalc.getPosition(new Date(currentHourTime), lat, lng).azimuth + Math.PI;
        L.polyline([[lat, lng], getDestinationPoint(lat, lng, az, drawDistKm)], { color: '#ffffff', weight: 1.5, opacity: 0.6, dashArray: '3, 6', interactive: false }).addTo(layerGroup);
        
        const labelPos = getDestinationPoint(lat, lng, az, radiusKm * 0.65);
        L.marker(labelPos, {
            icon: L.divIcon({
                className: 'transparent-icon',
                html: `<div style="color: white; font-weight: 700; font-size: 0.85rem; text-shadow: 0px 1px 4px rgba(0,0,0,0.9), 0px 0px 2px rgba(0,0,0,0.8); transform: translate(-50%, -50%); white-space: nowrap;">${getDisplayTimeStr(currentHourTime, t1)}</div>`,
                iconSize: [0, 0]
            }),
            interactive: false
        }).addTo(layerGroup);
    }
}

function drawMoonTrack(lat, lng, moonTimes, sunTimes, layerGroup, radiusKm, drawDistKm) {
    if (!state.showMoon || (!moonTimes.rise && !moonTimes.set)) return;

    let mT1_raw = moonTimes.rise ? moonTimes.rise.getTime() : null;
    let mT2_raw = moonTimes.set ? moonTimes.set.getTime() : null;
    
    // Fallback if one is missing
    let mT1 = mT1_raw || (mT2_raw - 43200000);
    let mT2 = mT2_raw || (mT1_raw + 43200000);

    if (mT1 > mT2) {
        const tomorrow = SunCalc.getMoonTimes(new Date(mT1 + 86400000), lat, lng);
        mT2 = tomorrow.set ? tomorrow.set.getTime() : mT1 + 43200000;
    }

    const sunAzStart = sunTimes.sunrise ? SunCalc.getPosition(sunTimes.sunrise, lat, lng).azimuth + Math.PI : null;
    const sunAzEnd = sunTimes.sunset ? SunCalc.getPosition(sunTimes.sunset, lat, lng).azimuth + Math.PI : null;

    let currentMoonArc = [];
    const durM = mT2 - mT1;
    const stepM = Math.max(durM, 3600000) / 80;

    const isOverlappingSun = (az) => {
        if (!state.showSun || sunAzStart === null || sunAzEnd === null) return false;
        const s = sunAzStart - 0.01;
        const e = sunAzEnd + 0.01;
        return s < e ? (az >= s && az <= e) : (az >= s || az <= e);
    };

    for (let timeT = mT1; timeT <= mT2; timeT += stepM) {
        const az = SunCalc.getMoonPosition(new Date(timeT), lat, lng).azimuth + Math.PI;
        if (!isOverlappingSun(az)) {
            if (currentMoonArc.length === 0) currentMoonArc.push([lat, lng]);
            currentMoonArc.push(getDestinationPoint(lat, lng, az, radiusKm));
        } else if (currentMoonArc.length > 0) {
            currentMoonArc.push([lat, lng]);
            L.polygon(currentMoonArc, { color: 'none', fillColor: '#8A2BE2', fillOpacity: 0.15, interactive: false }).addTo(layerGroup);
            currentMoonArc = [];
        }
    }
    if (currentMoonArc.length > 0) {
        currentMoonArc.push([lat, lng]);
        L.polygon(currentMoonArc, { color: 'none', fillColor: '#8A2BE2', fillOpacity: 0.15, interactive: false }).addTo(layerGroup);
    }

    // Hourly labels
    const startMHourObj = new Date(mT1);
    startMHourObj.setMinutes(0, 0, 0);
    for (let currentMHourTime = startMHourObj.getTime() + 3600000; currentMHourTime < mT2; currentMHourTime += 3600000) {
        const az = SunCalc.getMoonPosition(new Date(currentMHourTime), lat, lng).azimuth + Math.PI;
        if (!isOverlappingSun(az)) {
            L.polyline([[lat, lng], getDestinationPoint(lat, lng, az, drawDistKm)], { color: '#ddaaff', weight: 1.0, opacity: 0.5, dashArray: '2, 6', interactive: false }).addTo(layerGroup);
            const labelPos = getDestinationPoint(lat, lng, az, radiusKm * 0.65);
            L.marker(labelPos, {
                icon: L.divIcon({
                    className: 'transparent-icon',
                    html: `<div style="color: #ddaaff; font-weight: 600; font-size: 0.75rem; text-shadow: 0px 1px 3px rgba(0,0,0,0.9); transform: translate(-50%, -50%); white-space: nowrap;">${getDisplayTimeStr(currentMHourTime, mT1)}</div>`,
                    iconSize: [0, 0]
                }),
                interactive: false
            }).addTo(layerGroup);
        }
    }
}

function drawRealTimePositions(lat, lng, layerGroup, drawDistKm) {
    const now = new Date();
    const sunPos = SunCalc.getPosition(now, lat, lng);
    const moonPos = SunCalc.getMoonPosition(now, lat, lng);
    const t = i18n[state.currentLang];
    const startPx = map.latLngToContainerPoint([lat, lng]);

    const drawPos = (pos, type, color, labelColor) => {
        if (pos.altitude <= 0) return;
        const az = pos.azimuth + Math.PI;
        const azDeg = (az * 180 / Math.PI) % 360;
        const end = getDestinationPoint(lat, lng, az, drawDistKm);
        L.polyline([[lat, lng], end], { color, weight: type === 'sun' ? 4 : 3, opacity: 1.0 }).addTo(layerGroup);

        const dist = type === 'sun' ? 120 : 100;
        const labelPos = map.containerPointToLatLng(L.point(startPx.x + Math.sin(az) * dist, startPx.y - Math.cos(az) * dist));
        L.marker(labelPos, {
            icon: L.divIcon({
                className: 'transparent-icon',
                html: `<div style="width: ${type === 'sun' ? 24 : 20}px; height: ${type === 'sun' ? 24 : 20}px; background-color: ${color}; border-radius: 50%; border: ${type === 'sun' ? 3 : 2}px solid white; box-shadow: 0 0 10px rgba(0,255,0,0.8); display: flex; align-items: center; justify-content: center;"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            })
        }).addTo(layerGroup).bindTooltip(`
            <div style="background: rgba(0,0,0,0.6); color: ${labelColor}; padding: 6px 10px; border-radius: 8px; border: 1.2px solid ${labelColor}; font-weight: 700; text-align: center; line-height: 1.3;">
                <div style="margin-bottom: 2px; font-size: 0.75rem; opacity: 0.85;">${type === 'sun' ? t.sun_pos_label : t.moon_pos_label}</div>
                <div style="font-size: 0.8rem;">${t.alt_label}: ${(pos.altitude * 180 / Math.PI).toFixed(1)}°</div>
                <div style="font-size: 0.8rem;">${t.az_label}: ${azDeg.toFixed(1)}°</div>
            </div>`, { direction: 'top', className: 'custom-tooltip', permanent: state.showPermanentTooltips });
    };

    if (state.showSun) drawPos(sunPos, 'sun', '#ff0000', '#ffaa00');
    if (state.showMoon) drawPos(moonPos, 'moon', '#0000ff', '#ddaaff');
}

function updateHoverData(lat, lng, sunTimes, moonTimes) {
    state.hoverTimeData = [];
    if (state.showSun && sunTimes.sunrise && sunTimes.sunset) {
        for (let t = sunTimes.sunrise.getTime(); t <= sunTimes.sunset.getTime(); t += 60000) {
            state.hoverTimeData.push({ t, az: SunCalc.getPosition(new Date(t), lat, lng).azimuth + Math.PI, type: 'sun', baseT: sunTimes.sunrise.getTime() });
        }
    }
    if (state.showMoon && (moonTimes.rise || moonTimes.set)) {
        let mT1_raw = moonTimes.rise ? moonTimes.rise.getTime() : null;
        let mT2_raw = moonTimes.set ? moonTimes.set.getTime() : null;
        let mT1 = mT1_raw || (mT2_raw - 43200000);
        let mT2 = mT2_raw || (mT1_raw + 43200000);
        
        if (mT1 > mT2) {
            const tmr = SunCalc.getMoonTimes(new Date(mT1 + 86400000), lat, lng);
            mT2 = tmr.set ? tmr.set.getTime() : mT1 + 43200000;
        }
        const sS = sunTimes.sunrise ? SunCalc.getPosition(sunTimes.sunrise, lat, lng).azimuth + Math.PI : null;
        const sE = sunTimes.sunset ? SunCalc.getPosition(sunTimes.sunset, lat, lng).azimuth + Math.PI : null;
        for (let t = mT1; t <= mT2; t += 60000) {
            const az = SunCalc.getMoonPosition(new Date(t), lat, lng).azimuth + Math.PI;
            if (!state.showSun || sS === null || sE === null || !(sS < sE ? (az >= sS && az <= sE) : (az >= sS || az <= sE))) {
                state.hoverTimeData.push({ t, az, type: 'moon', baseT: mT1 });
            }
        }
    }
}

function computeAndDraw(lat, lng, layerGroup, isMain = true) {
    const sunTimes = SunCalc.getTimes(state.selectedDate, lat, lng);
    const moonTimes = SunCalc.getMoonTimes(state.selectedDate, lat, lng);
    const t = i18n[state.currentLang];
    
    const bounds = map.getBounds();
    const diag = map.distance(bounds.getNorthEast(), bounds.getSouthWest());
    state.drawDistKm = (diag * 1.5) / 1000;
    state.radiusKm = (diag * 0.2) / 1000;

    if (isMain) {
        updateAstronomyTimesUI(sunTimes, moonTimes);
        handleAutoTheme(lat, lng);
        drawSunTrack(lat, lng, sunTimes, layerGroup, state.radiusKm, state.drawDistKm);
        drawMoonTrack(lat, lng, moonTimes, sunTimes, layerGroup, state.radiusKm, state.drawDistKm);
        updateHoverData(lat, lng, sunTimes, moonTimes);
    }

    // Rise/Set Lines
    if (state.showSun && sunTimes.sunrise) drawLineWithLabel([lat, lng], SunCalc.getPosition(sunTimes.sunrise, lat, lng).azimuth + Math.PI, '#ffaa00', t.sun_line_lbl, layerGroup, state.drawDistKm);
    if (state.showSun && sunTimes.sunset) drawLineWithLabel([lat, lng], SunCalc.getPosition(sunTimes.sunset, lat, lng).azimuth + Math.PI, '#ff5500', t.sunset_line_lbl, layerGroup, state.drawDistKm);
    if (state.showMoon && moonTimes.rise) drawLineWithLabel([lat, lng], SunCalc.getMoonPosition(moonTimes.rise, lat, lng).azimuth + Math.PI, '#a0a0ff', t.moon_line_lbl, layerGroup, state.drawDistKm);
    if (state.showMoon && moonTimes.set) drawLineWithLabel([lat, lng], SunCalc.getMoonPosition(moonTimes.set, lat, lng).azimuth + Math.PI, '#505080', t.moonset_line_lbl, layerGroup, state.drawDistKm);

    drawRealTimePositions(lat, lng, layerGroup, state.drawDistKm);
}

function redrawAll() {
    mainLayerGroup.clearLayers();
    extraPinsGroup.clearLayers();
    if (hoverLayer) hoverLayer.clearLayers();
    
    if (!state.mainAnchorLatLng) {
        elements.sunRiseValue.innerText = '--:--';
        elements.sunSetValue.innerText = '--:--';
        elements.moonRiseValue.innerText = '--:--';
        elements.moonSetValue.innerText = '--:--';
        return;
    }

    computeAndDraw(state.mainAnchorLatLng.lat, state.mainAnchorLatLng.lng, mainLayerGroup, true);
    
    const p1 = map.project(state.mainAnchorLatLng);
    const t = i18n[state.currentLang];
    
    state.targetPins.forEach(pin => {
        const marker = L.circleMarker([pin.lat, pin.lng], { radius: 8, fillColor: '#32CD32', color: '#fff', weight: 2, opacity: 1, fillOpacity: 1, bubblingMouseEvents: false }).addTo(extraPinsGroup);
        const p2 = map.project([pin.lat, pin.lng]);
        const bearing = (Math.atan2(p2.x - p1.x, p1.y - p2.y) * 180 / Math.PI + 360) % 360;

        const labelHtml = `<div class="target-pin-label" style="background: #32CD32; color: white; padding: 6px 12px; border-radius: 20px; font-weight: 800; font-size: 0.85rem; box-shadow: 0 3px 8px rgba(0,0,0,0.4); pointer-events: auto; cursor: pointer; border: 2px solid white; white-space: nowrap; display: inline-block;">${t.pin_label_prefix}${pin.index} (${bearing.toFixed(1)}°)</div>`;
        
        const labelMarker = L.marker([pin.lat, pin.lng], {
            icon: L.divIcon({
                className: 'transparent-icon',
                html: labelHtml,
                iconAnchor: [30, 48],
                iconSize: null
            })
        }).addTo(extraPinsGroup);

        const deleteHandler = (e) => { L.DomEvent.stopPropagation(e); removeTargetPin(pin.id); };
        marker.on('click', deleteHandler);
        labelMarker.on('click', deleteHandler);
        
        marker.bindTooltip(`${t.pin_aim}${bearing.toFixed(1)}°`, { direction: 'top' });
        L.polyline([[state.mainAnchorLatLng.lat, state.mainAnchorLatLng.lng], [pin.lat, pin.lng]], { color: '#32CD32', weight: 2, opacity: 0.7, dashArray: '4, 8' }).addTo(extraPinsGroup);
    });
}

function removeTargetPin(id) {
    state.targetPins = state.targetPins.filter(p => p.id !== id);
    redrawAll();
}

function getNextPinIndex() {
    const indices = state.targetPins.map(p => p.index).sort((a, b) => a - b);
    let next = 1;
    for (let idx of indices) {
        if (idx === next) next++;
        else if (idx > next) break;
    }
    return next;
}

let geocodeTimeout;
function setAnchor(latlng) {
    state.mainAnchorLatLng = latlng;
    if (!mainAnchorMarker) mainAnchorMarker = L.marker(latlng, { icon: anchorIcon, interactive: false }).addTo(map);
    else mainAnchorMarker.setLatLng(latlng);
    
    redrawAll();

    const t = i18n[state.currentLang];
    elements.locationText.innerText = t.loc_confirming;
    clearTimeout(geocodeTimeout);
    geocodeTimeout = setTimeout(() => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&zoom=10&addressdetails=1&accept-language=${state.currentLang}`;
        fetch(url).then(r => r.json()).then(data => {
            let name = "";
            if (data && data.address) {
                name = ((data.address.city || data.address.town || data.address.province || '') + ' ' + (data.address.borough || data.address.suburb || '')).trim();
            }
            elements.locationText.innerText = name || `${t.lat} ${latlng.lat.toFixed(2)}, ${t.lng} ${latlng.lng.toFixed(2)}`;
        }).catch(() => elements.locationText.innerText = `${t.lat} ${latlng.lat.toFixed(2)}, ${t.lng} ${latlng.lng.toFixed(2)}`);
    }, 400);
}

// --- Geolocation ---

function ipFallback() {
    const t = i18n[state.currentLang];
    elements.locationText.innerHTML = t.loc_init;
    fetch('https://get.geojs.io/v1/ip/geo.json').then(res => res.json()).then(data => {
        if (data.latitude && data.longitude) {
            const ll = L.latLng(parseFloat(data.latitude), parseFloat(data.longitude));
            map.flyTo(ll, 12);
            setTimeout(() => setAnchor(ll), 500);
        } else throw new Error();
    }).catch(() => {
        elements.locationText.innerHTML = t.loc_init_fail;
        map.flyTo(DEFAULT_LOC, 7);
    });
}

function doLocate(useAlert = false) {
    const t = i18n[state.currentLang];
    elements.locationText.innerHTML = t.gps_requesting;
    if (!navigator.geolocation) {
        if (useAlert) alert(t.err_no_gps_support);
        else ipFallback();
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const ll = L.latLng(pos.coords.latitude, pos.coords.longitude);
            map.flyTo(ll, 13);
            setTimeout(() => setAnchor(ll), 500);
        },
        (err) => {
            if (useAlert) {
                alert(t.err_gps_failed_alert);
                elements.locationText.innerHTML = t.err_gps_failed_text;
            } else ipFallback();
        },
        { enableHighAccuracy: true, timeout: useAlert ? 10000 : 5000, maximumAge: 0 }
    );
}

// --- UI Updates ---

function updateLanguage(lang) {
    state.currentLang = lang;
    localStorage.setItem('appLang', lang);
    const t = i18n[lang];
    document.title = t.title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'P' && key === 'help_text') el.innerHTML = t[key];
            else el.innerText = t[key];
        }
    });
    
    const isLight = document.body.classList.contains('light-mode');
    if (state.isManualTheme) elements.themeToggleBtn.innerText = isLight ? t.theme_light : t.theme_dark;
    else elements.themeToggleBtn.innerText = isLight ? t.theme_auto_day : t.theme_auto_night;

    updateDateDisplay();
    if (state.mainAnchorLatLng) redrawAll();
}

function updateDateDisplay() {
    const d = state.selectedDate;
    elements.dateValue.innerText = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
    elements.dateDay.innerText = i18n[state.currentLang].day_fmt(d.getDay());
}

// --- Calendar Logic ---

function drawMoonSVG(phase) {
    const r = 45;
    let path = '';
    if (phase <= 0.25) {
        let rx = r - (phase / 0.25) * r;
        path = `M 50 ${50-r} A ${r} ${r} 0 0 1 50 ${50+r} A ${Math.max(rx, 0.1)} ${r} 0 0 0 50 ${50-r}`;
    } else if (phase <= 0.5) {
        let rx = ((phase - 0.25) / 0.25) * r;
        path = `M 50 ${50-r} A ${r} ${r} 0 0 1 50 ${50+r} A ${Math.max(rx, 0.1)} ${r} 0 0 1 50 ${50-r}`;
    } else if (phase <= 0.75) {
        let rx = r - ((phase - 0.5) / 0.25) * r;
        path = `M 50 ${50-r} A ${r} ${r} 0 0 0 50 ${50+r} A ${Math.max(rx, 0.1)} ${r} 0 0 0 50 ${50-r}`;
    } else {
        let rx = ((phase - 0.75) / 0.25) * r;
        path = `M 50 ${50-r} A ${r} ${r} 0 0 0 50 ${50+r} A ${Math.max(rx, 0.1)} ${r} 0 0 1 50 ${50-r}`;
    }
    return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#111"/><path d="${path}" fill="#fff"/></svg>`;
}

function renderCalendar() {
    elements.calendarDays.innerHTML = '';
    const year = state.viewDate.getFullYear();
    const month = state.viewDate.getMonth();
    elements.calendarTitle.innerText = `${year}.${String(month + 1).padStart(2, '0')}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = new Date().toDateString();

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        elements.calendarDays.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dayDate = new Date(year, month, d);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dayDate.toDateString() === todayStr) {
            cell.classList.add('today');
            cell.innerHTML += `<span class="today-badge">${t.btn_today}</span>`;
        }

        const moonIllum = SunCalc.getMoonIllumination(dayDate);
        if (moonIllum.fraction > 0.99) cell.classList.add('full-moon');
        if (moonIllum.fraction < 0.01) cell.classList.add('new-moon');

        cell.innerHTML += `<span class="day-num" style="font-weight:700; font-size:1.1rem;">${d}</span>`;
        cell.innerHTML += `<div class="moon-svg" style="width:36px; height:36px; margin:4px 0;">${drawMoonSVG(moonIllum.phase)}</div>`;
        cell.innerHTML += `<span class="phase-pct">${(moonIllum.fraction * 100).toFixed(1)}%</span>`;
        
        if (moonIllum.fraction > 0.99 || moonIllum.fraction < 0.01) {
            const color = moonIllum.fraction > 0.99 ? '#ffd700' : '#d8bfd8';
            cell.innerHTML += `<div style="margin-top:4px; display:flex; justify-content:center; width:100%;"><span class="peak-time" style="font-size:0.7rem; color:${color}; background:#000; padding:1px 6px; border-radius:10px; font-weight:700; border:1px solid rgba(255,255,255,0.1); box-shadow: 0 2px 4px rgba(0,0,0,0.5);">04:32</span></div>`;
        }

        cell.onclick = (e) => {
            e.stopPropagation();
            state.selectedDate = new Date(dayDate);
            elements.datePicker.valueAsDate = state.selectedDate;
            updateDateDisplay();
            if (state.mainAnchorLatLng) redrawAll();
            elements.calendarModal.style.display = 'none';
        };
        elements.calendarDays.appendChild(cell);
    }
}

// --- Event Listeners ---

function initEventListeners() {
    elements.chkDay.addEventListener('change', (e) => { state.showSun = e.target.checked; redrawAll(); });
    elements.chkMoon.addEventListener('change', (e) => { state.showMoon = e.target.checked; redrawAll(); });
    elements.chkPermanent.addEventListener('change', (e) => { state.showPermanentTooltips = e.target.checked; redrawAll(); });
    elements.datePicker.addEventListener('change', (e) => {
        if (e.target.value) { state.selectedDate = new Date(e.target.value); updateDateDisplay(); redrawAll(); }
    });
    elements.themeToggleBtn.addEventListener('click', (e) => {
        state.isManualTheme = true;
        const isLight = document.body.classList.toggle('light-mode');
        const t = i18n[state.currentLang];
        tileLayer.setUrl(`https://{s}.basemaps.cartocdn.com/${isLight ? 'light' : 'dark'}_all/{z}/{x}/{y}{r}.png`);
        e.target.innerText = isLight ? t.theme_light : t.theme_dark;
    });
    elements.sidebarToggle.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-hidden');
        setTimeout(() => map.invalidateSize(), 350);
    });
    elements.langSelector.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
        if (state.mainAnchorLatLng) setAnchor(state.mainAnchorLatLng);
    });
    elements.locateBtn.addEventListener('click', () => doLocate(true));
    elements.dateSelectionTrigger.onclick = () => { elements.calendarModal.style.display = 'flex'; renderCalendar(); };
    elements.closeCalendar.onclick = () => { elements.calendarModal.style.display = 'none'; };
    elements.prevMonth.onclick = (e) => { e.stopPropagation(); state.viewDate.setMonth(state.viewDate.getMonth() - 1); renderCalendar(); };
    elements.nextMonth.onclick = (e) => { e.stopPropagation(); state.viewDate.setMonth(state.viewDate.getMonth() + 1); renderCalendar(); };
    elements.goToToday.onclick = (e) => {
        e.stopPropagation();
        state.viewDate = new Date();
        state.selectedDate = new Date();
        elements.datePicker.valueAsDate = state.selectedDate;
        updateDateDisplay();
        if (state.mainAnchorLatLng) redrawAll();
        renderCalendar();
    };

    map.on('click', (e) => setAnchor(e.latlng));
    map.on('contextmenu', (e) => {
        if (!state.mainAnchorLatLng) { alert(i18n[state.currentLang].err_click_first); return; }
        const nextIdx = getNextPinIndex();
        state.targetPins.push({ lat: e.latlng.lat, lng: e.latlng.lng, id: Date.now(), index: nextIdx });
        redrawAll();
    });
    map.on('zoomend', () => state.mainAnchorLatLng && redrawAll());
    map.on('resize', () => state.mainAnchorLatLng && redrawAll());
    map.on('mousemove', (e) => {
        if (!state.mainAnchorLatLng || state.hoverTimeData.length === 0) return;
        if (hoverLayer) hoverLayer.clearLayers();
        if (map.distance(state.mainAnchorLatLng, e.latlng) > state.radiusKm * 1500) return;

        const p1 = map.project(state.mainAnchorLatLng);
        const p2 = map.project(e.latlng);
        let mouseAz = Math.atan2(p2.x - p1.x, p1.y - p2.y);
        if (mouseAz < 0) mouseAz += 2 * Math.PI;

        let closest = null, minDiff = Infinity;
        for (let item of state.hoverTimeData) {
            let diff = Math.abs(item.az - mouseAz);
            if (diff > Math.PI) diff = Math.PI * 2 - diff;
            if (diff < minDiff) { minDiff = diff; closest = item; }
        }

        if (minDiff > 0.08) return;
        if (!hoverLayer) hoverLayer = L.layerGroup().addTo(map);

        const color = closest.type === 'sun' ? '#FFD700' : '#8A2BE2';
        L.polyline([[state.mainAnchorLatLng.lat, state.mainAnchorLatLng.lng], getDestinationPoint(state.mainAnchorLatLng.lat, state.mainAnchorLatLng.lng, closest.az, state.drawDistKm)], { color, weight: 2, dashArray: '4, 8' }).addTo(hoverLayer);

        const azDeg = (closest.az * 180 / Math.PI) % 360;
        const labelPos = getDestinationPoint(state.mainAnchorLatLng.lat, state.mainAnchorLatLng.lng, closest.az, state.radiusKm * 1.05);

        L.marker(labelPos, {
            icon: L.divIcon({
                className: 'transparent-icon',
                html: `<div style="display: inline-flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.6); color: ${color}; padding: 3px 8px; border-radius: 6px; font-weight: 800; border: 1.2px solid ${color}; font-size: 0.75rem; white-space: nowrap; transform: translate(-50%, -50%); box-shadow: 0 4px 12px rgba(0,0,0,0.5); text-shadow: 0 1px 2px rgba(0,0,0,1);">${getDisplayTimeStr(closest.t, closest.baseT, true)} | ${azDeg.toFixed(0)}°</div>`,
                iconSize: [0, 0]
            }),
            interactive: false
        }).addTo(hoverLayer);
    });
}

// --- Initialization ---

window.addEventListener('DOMContentLoaded', () => {
    // Extra Styles
    const style = document.createElement('style');
    style.innerHTML = `.leaflet-container { font-family: "Pretendard", sans-serif !important; -webkit-tap-highlight-color: transparent; } .transparent-icon { background: transparent; border: none; } .leaflet-tooltip-pane .custom-tooltip { background: transparent !important; border: none !important; box-shadow: none !important; }`;
    document.head.appendChild(style);

    initEventListeners();

    // Initial Setup
    const initNow = new Date();
    const roughTimes = SunCalc.getTimes(initNow, DEFAULT_LOC[0], DEFAULT_LOC[1]);
    const isDay = roughTimes.sunrise && roughTimes.sunset && (initNow >= roughTimes.sunrise && initNow <= roughTimes.sunset);
    
    state.showSun = isDay;
    state.showMoon = !isDay;
    elements.chkDay.checked = state.showSun;
    elements.chkMoon.checked = state.showMoon;
    elements.datePicker.valueAsDate = state.selectedDate;
    elements.langSelector.value = state.currentLang;

    updateLanguage(state.currentLang);
    doLocate();
});