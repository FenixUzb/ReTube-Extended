// ==UserScript==
// @name         ReTube Extended (by FenixUzb)
// @namespace 	http://tampermonkey.net/retube-dev
// @version      1.6.0-dev
// @description  ReTube Extended
// @author       FenixUzb
// @match        *://www.youtube.com/*
// @match        *://music.youtube.com/*
// @icon          https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_info
// @grant GM_openInTab
// @grant GM_xmlhttpRequest
// @connect localhost
// @connect googleapis.com
// @connect returnyoutubedislikeapi.com
// @connect api.telegram.org
// @connect raw.githubusercontent.com
// @run-at document-start
// ==/UserScript==

(async () => {
	//#region Параметры
	let RTfirstLaunch = await GM_getValue('rt-firstLaunch')
	let RTcolors = await getSavedSetting('rt-colors')
	let RTanimateLoad = await getSavedSetting('rt-animateLoad')
	let RThideAllTrash = await getSavedSetting('rt-hideAllTrash')
	let RTwatchedVideo = await getSavedSetting('rt-watchedVideo')
	let RTbetterFont = await getSavedSetting('rt-betterFont')
	let RTvideoDateCreated = await getSavedSetting('rt-videoDateCreated')
	let RTfocusFix = await getSavedSetting('rt-focusFix')
	let RTnotificationsRemove = await getSavedSetting('rt-notificationsRemove')
	let RTcustomTitleIcon = await getSavedSetting('rt-customTitleIcon')
	let RTreturnDislikes = await getSavedSetting('rt-returnDislikes')
	let RTfullVideoNames = await getSavedSetting('rt-fullVideoNames')
	let RTstopChannelTrailer = await getSavedSetting('rt-stopChannelTrailer')
	let RTremainingTime = await getSavedSetting('rt-remainingTime')
	let RTrememberTime = await getSavedSetting('rt-rememberTime')
	let RTvideoQuality = await getSavedSetting('rt-videoQuality')
	let RTfixChannelLinks = await getSavedSetting('rt-fixChannelLinks')
	let RTshowTranslationTime = await getSavedSetting('rt-showTranslationTime')
	let RTdisablePlayerSleep = await getSavedSetting('rt-disablePlayerSleep')
	let RTshowVideoCountOnChannel = await getSavedSetting('rt-showVideoCountOnChannel')
	let RThotkeysAlwaysActive = await getSavedSetting('rt-hotkeysAlwaysActive')
	let RTscrollVolume = await getSavedSetting('rt-scrollVolume')
	let RTmiddleClickSearch = await getSavedSetting('rt-middleClickSearch')
	let RTtranslateCommentButton = await getSavedSetting('rt-translateCommentButton')
	let RTscrollSpeed = await getSavedSetting('rt-scrollSpeed')
	let RTDefaultVolume = await getSavedSetting('rt-defaultVolume')
	let RTRememberSpeed = await getSavedSetting('rt-rememberSpeed')
	let RTRememberSpeedBypass = await getSavedSetting('rt-rememberSpeedBypass')
	let RTFixesForNewYouTube = await getSavedSetting('rt-fixesForNewYouTube')
	let RTCopyTimestampUrl = await getSavedSetting('rt-copyTimestampUrl')
	let RTProgressInTitle = await getSavedSetting('rt-progressInTitle')
	let RTAutoExpandDescription = await getSavedSetting('rt-autoExpandDescription')
	let RTRedirectShorts = await getSavedSetting('rt-redirectShorts')
	let RTHideShorts = await getSavedSetting('rt-hideShorts')
	let RTDownloadThumbnail = await getSavedSetting('rt-downloadThumbnail')
	let RTReversePlaylist = await getSavedSetting('rt-reversePlaylist')
	let RTVideoAgeBadge = await getSavedSetting('rt-videoAgeBadge')
	let RTWatchTimeStats = await getSavedSetting('rt-watchTimeStats')
	let RTAutoLike = await getSavedSetting('rt-autoLike')
	let RTAutoLikePercent = await GM_getValue('rt-autoLikePercent') ?? '70'
	let RTTelegramBot = await getSavedSetting('rt-telegramBot')
	let RTTgBotMethod = await GM_getValue('rt-tgBotMethod') ?? 'server'
	let RTTgBotServerUrl = await GM_getValue('rt-tgBotServerUrl') ?? 'http://localhost:3000'
	let RTTgBotChatId = await GM_getValue('rt-tgBotChatId') ?? ''
	let RTTgBotUsername = await GM_getValue('rt-tgBotUsername') ?? ''
	let RTUserApiKey = await GM_getValue('rt-userApiKey') ?? ''
	let RTPlaybackRewind = await getSavedSetting('rt-playbackRewind')
	let RTRewindSeconds = await GM_getValue('rt-rewindSeconds') ?? '2'
	let RTScreenshotVideo = await getSavedSetting('rt-screenshotVideo')
	let RTScreenshotAction = await GM_getValue('rt-screenshotAction') ?? 'download'
	let RTShortcutsOverlay = await getSavedSetting('rt-shortcutsOverlay')
	let RTAutoSkipIntro = await getSavedSetting('rt-autoSkipIntro')
	let RTSkipMode = await GM_getValue('rt-skipMode') ?? 'button'
	let RTVideoStatsBadge = await getSavedSetting('rt-videoStatsBadge')
	let RTVideoBookmarks = await getSavedSetting('rt-videoBookmarks')
	let RTVideoUploadDays = await getSavedSetting('rt-videoUploadDays', RTvideoDateCreated)
	let RTLikeDislikeRatio = await getSavedSetting('rt-likeDislikeRatio', RTreturnDislikes)

	let RTHideTrashPlayer = await GM_getValue('rt-hideTrash-player') ?? 'true'
	let RTHideTrashUnderVideo = await GM_getValue('rt-hideTrash-underVideo') ?? 'true'
	let RTHideTrashSearch = await GM_getValue('rt-hideTrash-search') ?? 'true'

	let RTSettingsDateOnVideoBackgroundChange = await getSavedSetting('rt-settings-dateOnVideoBackgroundChange')
	let RTColorWatchedLabelBackground = await GM_getValue('rt-color-watchedLabelBackground') ?? '#343a41'
	let RTColorWatchedBackground = await GM_getValue('rt-color-watchedBackground') ?? '#bdbdbd'

	let RTColorYTMain = await GM_getValue('rt-color-YTMain') ?? '#1b222a'
	let RTColorYTAdditional = await GM_getValue('rt-color-YTAdditional') ?? '#222b35'
	let RTColorYTPlayer = await GM_getValue('rt-color-YTPlayer') ?? '#11161c'
	let RTColorYTText = await GM_getValue('rt-color-YTText') ?? '#c9d0d3'
	let RTColorYTLink = await GM_getValue('rt-color-YTLink') ?? '#a1bad7'
	let RTColorYTVideoProgress = await GM_getValue('rt-color-YTVideoProgress') ?? '#5785ba'

	let RTSelectYTColors = await GM_getValue('rt-select-YTColors') ?? 'default'
	let RTSelectVideoQuality = await GM_getValue('rt-select-videoQuality') ?? 'hd1440'
	let RTSelectTitleIconColor = await GM_getValue('rt-select-title-icon-color') ?? 'blue'
	let RTDefaultVolumeLevel = await GM_getValue('rt-select-defaultVolumeLevel') ?? '30'
	let RTSelectRememberSpeedLevel = await GM_getValue('rt-select-rememberSpeedLevel') ?? '1'

	let RTHeadTop = await GM_getValue('rt-head-top') ?? '100px'
	let RTHeadLeft = await GM_getValue('rt-head-left') ?? '100px'

	//#endregion
	//#region Переменные

	let apiKeysArrayLength = 0, noValidApiKeys = false, userLanguage = GetUserLanguage(), apiKeyQueue = Promise.resolve() // Создаем очередь вызовов для ApiKey()
	let playerHoverHandler, isScrolling = false, wheel = false
	let rtFeatureCleanups = new Map()
	//#endregion

	// Исправление document.head null для Firefox
	if (navigator.userAgent.includes('Firefox')) {
		while (!document.head) {
			await new Promise(resolve => setTimeout(resolve, 1));
		}
	}

	const rtHTMLPolicy = window.trustedTypes
		? (() => { try { return trustedTypes.createPolicy('retube-html', { createHTML: s => s }) } catch { return null } })()
		: null
	if (rtHTMLPolicy) {
		const _origIAH = Element.prototype.insertAdjacentHTML
		Element.prototype.insertAdjacentHTML = function(pos, html) {
			_origIAH.call(this, pos, typeof html === 'string' ? rtHTMLPolicy.createHTML(html) : html)
		}
	}

	if (RTanimateLoad) {
		waitSelector('head').then(() => {
			pushCSS('body, ytd-app, #background.ytd-masthead, #container.ytd-searchbox, #chips-wrapper.ytd-feed-filter-chip-bar-renderer, yt-chip-cloud-chip-renderer[chip-style=STYLE_HOME_FILTER], yt-chip-cloud-chip-renderer[chip-style=STYLE_REFRESH_TO_NOVEL_CHIP], #guide-content.ytd-app, ytd-mini-guide-renderer, ytd-mini-guide-entry-renderer, #description.ytd-watch-metadata, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal, yt-chip-cloud-chip-renderer[chip-style=STYLE_DEFAULT], .ytp-swatch-background-color, .header.ytd-playlist-panel-renderer, .badge-style-type-medium-grey.ytd-badge-supported-renderer, .playlist-items.ytd-playlist-panel-renderer, ytd-playlist-panel-video-renderer[selected][use-color-palette], tp-yt-app-toolbar.ytd-c4-tabbed-header-renderer, #channel-container.ytd-c4-tabbed-header-renderer, #background, #primary, #container, #contentContainer' +
				'{transition: background 1s cubic-bezier(.21,.98,1,1); animation: 1s show cubic-bezier(0, 0, 0.5, 1)} @keyframes show { 0% { opacity: 0; } 50% { opacity: 0; } 95% { opacity: 0.95; } 100% { opacity: 1; } }', 'rtAnim')
			pushCSS('ytd-video-renderer, ytd-channel-renderer, ytd-rich-item-renderer, ytd-playlist-video-renderer, ytd-playlist-renderer, .ytd-grid-renderer:is(ytd-grid-video-renderer, ytd-grid-playlist-renderer, ytd-grid-show-renderer, ytd-grid-channel-renderer, ytd-vertical-product-card-renderer), .ytd-item-section-renderer:is(ytd-radio-renderer, ytd-playlist-renderer, ytd-compact-video-renderer, ytd-compact-playlist-renderer, ytd-compact-radio-renderer, ytd-backstage-post-thread-renderer, ytd-channel-about-metadata-renderer, ytd-channel-video-player-renderer, ytd-message-renderer, ytd-background-promo-renderer), #body.ytd-comment-renderer, #description.ytd-watch-metadata, ytd-metadata-row-container-renderer, #description.ytd-video-secondary-info-renderer, ytd-video-primary-info-renderer, .arrow.yt-horizontal-list-renderer {animation: cubic-bezier(0.4, 0, 0.2, 1) fadeInUp .8s} @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px);}to {opacity: 1;transform: translateY(0px);}}', 'rtAnimFadeInUp')
			pushCSS('.ytd-recognition-shelf-renderer:is(#avatars-container, #action-button), .ytd-channel-sub-menu-renderer:is(#sort-menu, ytd-menu-renderer), #subscribe-button.ytd-shelf-renderer, #menu:is(.ytd-watch-metadata, .ytd-rich-shelf-renderer, .ytd-shelf-renderer), #sort-filter.ytd-horizontal-card-list-renderer, ytd-menu-renderer.ytd-reel-shelf-renderer {animation: cubic-bezier(0.4, 0, 0.2, 1) fadeInLeft .8s} @keyframes fadeInLeft {from {opacity: 0;transform: translateX(20px);}to {opacity: 1;transform: translateX(0px);}}', 'rtAnimFadeInLeft')
			pushCSS('#text-container.ytd-recognition-shelf-renderer, #items:is(.yt-horizontal-list-renderer, .ytd-horizontal-card-list-renderer), h2:is(.ytd-rich-shelf-renderer, .ytd-shelf-renderer), #subtitle.ytd-shelf-renderer, #primary-items.ytd-channel-sub-menu-renderer, .ytd-watch-metadata:is(h1, ytd-badge-supported-renderer, #owner), .thumbnail-and-metadata-wrapper.ytd-playlist-header-renderer, h3.ytd-channel-featured-content-renderer, .ytd-horizontal-card-list-renderer:is(#header, #header-button), h2.ytd-reel-shelf-renderer {animation: cubic-bezier(0.4, 0, 0.2, 1) fadeInRight .8s;} @keyframes fadeInRight {from {opacity: 0;transform: translateX(-20px);}to {opacity: 1;transform: translateX(0px);}}', 'rtAnimFadeInRight')
		})
	}

	if (RThideAllTrash) HideTrash(true)
	if (RTDefaultVolume) ForceDefaultVideoVolume(true)
	if (RTvideoDateCreated) EnableDateTimeCreated(true, RTSettingsDateOnVideoBackgroundChange)
	if (RTstopChannelTrailer) StopChannelTrailer()
	if (RTvideoQuality) VideoQuality()
	if (RTshowVideoCountOnChannel) EnableVideoCountOnChannel(true)
	if (RTRedirectShorts) RedirectShorts()

	if (document.readyState !== 'loading') ReTube(); else document.addEventListener('DOMContentLoaded', ReTube)

	async function ReTube() {
		if (!RTfirstLaunch && currentPage() != 'embed') {
			await Delay(1500)
			alert('ReTube.\nЧтобы открыть меню настроек, нажмите F2, находясь на сайте ютуба.')
			GM_setValue('rt-firstLaunch', 'yes')
		}

		if (RTcustomTitleIcon) CustomIcon(true, RTSelectTitleIconColor)
		if (RTfullVideoNames) FullVideoNames(true)
		if (RTnotificationsRemove) RemoveNotificationNumber()
		if (RTfocusFix) FocusAndScrollFix(true)
		if (RTremainingTime) RemainingTime()
		if (RTrememberTime) RememberTime()
		if (RTfixChannelLinks) FixChannelLinks()
		if (RTshowTranslationTime) ShowTranslationTime()
		if (RTdisablePlayerSleep) DisableSleep()
		if (RThotkeysAlwaysActive) HotkeysAlwaysActive()
		if (RTscrollVolume) ScrollVolume()
		if (RTmiddleClickSearch) MiddleClickSearch()
		if (RTtranslateCommentButton) TranslateCommentButton()
		if (RTscrollSpeed) ScrollSpeed()
		if (RTRememberSpeed) RememberSpeed()
		if (RTCopyTimestampUrl) CopyTimestampUrl()
		if (RTProgressInTitle) ProgressInTitle()
		if (RTAutoExpandDescription) AutoExpandDescription()
		if (RTHideShorts) HideShorts(true)
		if (RTDownloadThumbnail) DownloadThumbnail()
		if (RTReversePlaylist) ReversePlaylist()
		if (RTVideoAgeBadge) VideoAgeBadge(true)
		if (RTWatchTimeStats) WatchTimeStats()
		if (RTTelegramBot) SendToTelegramBot()
		if (RTAutoLike) AutoLike()
		if (RTPlaybackRewind) PlaybackRewind()
		if (RTScreenshotVideo) ScreenshotVideo()
		if (RTShortcutsOverlay) KeyboardShortcutsOverlay()
		if (RTAutoSkipIntro) AutoSkipIntroOutro()
		if (RTVideoStatsBadge) VideoStatsBadge()
		if (RTVideoBookmarks) VideoBookmarks()
		if (RTVideoUploadDays && !RTvideoDateCreated) VideoUploadDays()
		if (RTLikeDislikeRatio) LikeDislikeRatio()
		if (RTcolors) PaintYouTube(true)
		if (RTbetterFont) ImproveFont(true)
		if (RTwatchedVideo && !window.location.href.includes('feed/history')) MarkWatchedVideos(true)
		if (RTreturnDislikes) ReturnDislikes()
		if (RTFixesForNewYouTube) FixesForNewYouTube(true)

		await Delay(3000)
		document.querySelector('#rtAnim')?.remove()
	}

	document.addEventListener('keyup', function (e) {
		if (e.key === 'Escape') {
			const menu = document.querySelector('#retube-menu')
			if (menu && !menu.hasAttribute('hidden')) {
				menu.setAttribute('hidden', '')
				return
			}
		}
		if (e.key == 'F2' && currentPage() != 'embed') {
			const retubeMenuStyle = document.querySelector('#retube-menu-style')
			if (retubeMenuStyle) {
				document.querySelector('#retube-menu')?.toggleAttribute('hidden')
				return
			}

			//#region Стили меню
			pushCSS(`#retube-menu {animation: 0.3s show ease; background-color: rgb(37 37 45 / 36%); position: fixed; z-index: 999999; backdrop-filter: blur(10px); filter: drop-shadow(0 0 3px rgba(100,110,115,0.6)); border-radius: 7px} @keyframes show { from { opacity: 0; } to { opacity: 1; } }` +
				'.retube-label {font-size: 18px; color: rgb(201 208 211); font-family: "YouTube Sans"; padding-right: 4px; -webkit-user-select: none;} .retube-label:not(.info):hover {background: rgba(120 125 130 / 15%); border-radius: 6px}' +
				'.retube-additionalDiv:not(.color) {margin-left: 18px}' +
				'input[type="color"] {background: transparent; border: none; width: 25px; height: 25px}' +
				'[retube-tooltip] {position: relative} [retube-tooltip]::after {content: attr(retube-tooltip); position: absolute; white-space: pre; left: 0; top: 0; background: rgb(58, 67, 77); color: #fff; font-weight: 500; font-family: "YouTube Sans"; font-size: 18px; padding: 0.5em; box-shadow: 0 0 10px rgba(0, 0, 0 / 50%); pointer-events: none; opacity: 0; transition: 0.4s; border-radius: 13px; z-index: 999} [retube-tooltip]:hover::after {transition-delay: 0.8s; opacity: 1; top: 1.7em}' +
				'.retube-button {background: rgb(96 100 110 / 37%); color: rgb(201 208 211); border-radius: 5px; border-color: rgb(72 75 91); border-style: solid; margin: auto; display: flex; font-family: "YouTube Sans"; font-size: 16px; cursor: pointer} .retube-button:hover {background: rgb(96 100 110 / 60%)} .retube-button:not(.retube-button-reset) {margin-bottom: 5px}' +
				'.retube-button-reset {display: inline; width: 32px; height: 23px; margin-left: 5px}' +
				'.retube-button-hardReset {background: rgb(139 88 107 / 37%); border-color: rgb(91 69 85)} .retube-button-hardReset:hover {background: rgb(180 114 139 / 37%)}' +
				'.retube-label-additional {padding-left: 8px}' +
				'#rt-tabs {margin-bottom: 3px}' +
				'.rt-button-tab {background: transparent; border: none; border-radius: 10px; margin: 0px 2px; transition: background 0.3s ease, width 0.3s ease; width: 74px} .rt-button-tab.active {background: #8f9fb61f; width: 100px !important} .rt-button-tab:not(.active):hover {background: #96989b12} .rt-button-tab:focus {outline: none} .rt-button-settings-tab { width: 62px !important } .rt-button-settings-tab.active { width: 74px !important }' +
				'.rt-label-tabs {display: flex; flex-direction: column; font-size: 18px; color: rgb(201 208 211); font-family: "YouTube Sans";}' +
				'.rt-label-settings-tabs {display: flex; flex-direction: column; font-size: 15px; color: rgb(201 208 211); font-family: "YouTube Sans";}' +
				'.img-tab-icon {width: 30px; pointer-events: none}' +
				'.fade-in {opacity: 1; transition: opacity 0.3s ease} .fade-out {opacity: 0; max-height: 0; pointer-events: none}' +
				'.rt-title {margin-left: 4px; font-size: 22px; font-weight: bold}' +
				'.rt-select {border-color: rgb(72 75 91); border-radius: 10px; color: rgb(201 208 211); background: rgb(96 100 110 / 37%); height: 18px; margin-left: 3px;} .rt-select:focus {outline: none}' +
				'option {border-color: rgb(72 75 91); border-radius: 10px; background: rgb(96 100 110)}' +
				'.rt-label-head {font-weight: bold; margin-left: 6px; font-size: 20px; pointer-events: none} #rt-head {background: linear-gradient(rgb(67 77 105 / 37%), transparent); border-radius: 20px; display: flex; justify-content: space-between}' +
				'#rt-close-head {margin-left: auto}' +
				'.retube-label > input {accent-color: #9ba8c2} .retube-label > .important {accent-color: #7fa682}' +
				'.rt-input {border-color: rgb(72 75 91); border-radius: 8px; border-style: solid; color: rgb(201 208 211); background: rgb(96 100 110 / 37%); padding: 3px 8px; font-family: "YouTube Sans"; font-size: 14px; outline: none; width: 180px}'
				, 'retube-menu-style')
			//#endregion
			//#region Основа меню
			document.querySelector('body').insertAdjacentHTML('beforeend', '<div id="retube-menu"></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div id="rt-head"><span class="retube-label rt-label-head">ReTube Extended (by FenixUzb)</span><span id="rt-close-head"><img src="https://i.imgur.com/ibUUDqp.png" style="width: 21px; margin-right: 4px" id="rt-closeImg-head" /></span></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div id="rt-tabs"><button class="rt-button-tab" data-tab="1"><img src="https://i.imgur.com/UW7uxaH.png" class="img-tab-icon" style="width: 27px; height: 27px;" /><span class="rt-label-tabs">Главная</span></button><button class="rt-button-tab" data-tab="2"><img src="https://i.imgur.com/PQ9b4Ke.png" class="img-tab-icon" /><span class="rt-label-tabs">Цвета</span></button><button class="rt-button-tab" data-tab="3"><img src="https://i.imgur.com/fKkwgP1.png" class="img-tab-icon" /><span class="rt-label-tabs">Инфо</span></button></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div id="retube-tab1"></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div id="retube-tab2"></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div id="retube-tab3"></div>')
			//#endregion
			//#region Таб Главная
			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<div style="margin:4px 6px"><input type="text" id="rt-settings-search" placeholder="Поиск настроек..." style="width:100%; padding:4px 8px; border-radius:8px; border:1px solid rgb(72 75 91); background:rgb(96 100 110 / 37%); color:rgb(201 208 211); font-family:YouTube Sans; font-size:15px; outline:none; box-sizing:border-box"></div>')
			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<div id="rt-settings-tabs"><button class="rt-button-tab rt-button-settings-tab" data-settingsTab="1"><img src="https://i.imgur.com/l8f9xhj.png" class="img-tab-icon" style="width: 22px; height: 22px;" /><span class="rt-label-settings-tabs">Основные</span></button><button class="rt-button-tab rt-button-settings-tab" data-settingsTab="2"><img src="https://i.imgur.com/jCyfm4a.png" class="img-tab-icon" style="width: 22px; height: 22px;" /><span class="rt-label-settings-tabs">Другие</span></button><button class="rt-button-tab rt-button-settings-tab" data-settingsTab="3"><img src="https://i.imgur.com/PQ9b4Ke.png" class="img-tab-icon" style="width: 22px; height: 22px;" /><span class="rt-label-settings-tabs">Расшир.</span></button><button class="rt-button-tab rt-button-settings-tab" data-settingsTab="4"><svg viewBox="0 0 24 24" class="img-tab-icon" style="width: 22px; height: 22px;" fill="#c9d0d3"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg><span class="rt-label-settings-tabs">Интегр.</span></button></div>')
			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<div id="retube-settings-tab1"></div>')
			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<div id="retube-settings-tab2"></div>')
			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<div id="retube-settings-tab3"></div>')
			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<div id="retube-settings-tab4"></div>')

			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkboxAnimateLoad"></input>Плавные анимации страницы</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Скрывает ненужные элементы YouTube.||Подкатегории позволяют выбрать что именно скрыть."><input type="checkbox" id="rt-checkbox0"></input>Скрыть ненужные кнопки, надписи</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', `<div class="rt-hideTrashSub retube-additionalDiv"${RThideAllTrash ? '' : ' hidden'}><label class="retube-label" retube-tooltip="Кнопки перемотки, автовоспроизведения,||трансляции, мини-плеера в плеере"><input type="checkbox" id="rt-checkboxHideTrashPlayer"></input>Кнопки плеера</label></div>`)
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', `<div class="rt-hideTrashSub retube-additionalDiv"${RThideAllTrash ? '' : ' hidden'}><label class="retube-label" retube-tooltip="Кнопки Поделиться, Создать клип,||Скачать, Спасибо под видео"><input type="checkbox" id="rt-checkboxHideTrashUnderVideo"></input>Кнопки под видео</label></div>`)
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', `<div class="rt-hideTrashSub retube-additionalDiv"${RThideAllTrash ? '' : ' hidden'}><label class="retube-label" retube-tooltip="Кнопка клавиатуры, пожаловаться||на поисковые подсказки"><input type="checkbox" id="rt-checkboxHideTrashSearch"></input>Элементы поиска</label></div>`)

			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/rqgywVe.png"><input type="checkbox" id="rt-checkbox1">Помечать просмотренные видео</input></label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Дополнительно желательно отключить ClearType||в браузере"><input type="checkbox" id="rt-checkbox2">Изменить шрифт на Ubuntu</input></label></div>')

			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/ZQ3CFlm.png"><input type="checkbox" id="rt-checkbox3"></input>Показывать дату и время загрузки видео в названии</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', `<div class="rt-settingsDateOnVideoBackgroundDiv retube-additionalDiv"${RTvideoDateCreated ? '' : ' hidden'}><label class="retube-label" retube-tooltip="https://i.imgur.com/8NzFBsS.png"><input type="checkbox" id="rt-checkboxSettingsDateOnVideoBackground"></input>Обводка вместо заливки</label></div>`)

			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox4"></input>Сфокусироваться на видео при наведении</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox5"></input>Удалить с заголовка страницы количество уведомлений</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', `<div><label class="retube-label"><input type="checkbox" id="rt-checkbox6"></input>Синяя иконка в заголовке страницы</label><select id="rt-selectTitleIconColor" class="rt-select" ${RTcustomTitleIcon ? '' : ' hidden'}><option value="blue">Синяя</option><option value="gray">Серая</option></select></div>`)
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox7"></input>Вернуть дизлайки</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox8"></input>Показывать целиком заголовки видео</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox9"></input>Запретить автовоспроизведение трейлера канала</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox10"></input>Показывать оставшееся время видео</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox11"></input>Сохранение прогресса видео при перезагрузке страницы</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', `<div><label class="retube-label"><input type="checkbox" id="rt-checkbox12"></input>Принудительное качество видео</label><select id="rt-selectVideoQuality" class="rt-select" ${RTvideoQuality ? '' : ' hidden'}><option value="highres">8K/4320p</option><option value="hd2160">4K/2160p</option><option value="hd1440">QHD/1440p</option><option value="hd1080">FHD/1080p</option><option value="hd720">720p</option><option value="large">480p</option><option value="medium">360p</option><option value="small">240p</option><option value="tiny">144p</option></select></div>`)
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/bVYoFaS.png"><input type="checkbox" id="rt-checkbox13"></input>Исправить ссылки на канал в боковой панели</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/kICYHsq.png"><input type="checkbox" id="rt-checkbox14"></input>Показывать время трансляции</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Может быть полезно, если вы хотите слушать||музыку на фоне. Запрещает паузу видео при||отсутствии активности"><input type="checkbox" id="rt-checkbox15"></input>Отключить засыпание плеера</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/9V8WYnf.png"><input type="checkbox" id="rt-checkbox16"></input>Показывать количество видео на канале</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Клавиши перемотки видео,||регулировки звука."><input type="checkbox" id="rt-checkbox17"></input>Горячие клавиши плеера всегда активны</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/SRYep7k.png"><input type="checkbox" id="rt-checkbox18"></input>Изменение громкости видео на 1% (Shift + колесо)</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/YNFVrke.png"><input type="checkbox" id="rt-checkbox19"></input>Открывать результаты поиска в новой вкладке (СКМ)</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/PyJ1GvF.png"><input type="checkbox" id="rt-checkbox20"></input>Добавить кнопку перевода комментариев</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Правый клик: стандартная скорость||Колесо: регулировка скорости на 0.1x"><input type="checkbox" id="rt-checkbox21"></input>Изменение скорости видео на кнопке \'Настройки\'</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', `<div><label class="retube-label"><input type="checkbox" id="rt-checkbox23"></input>Принудительная громкость видео при запуске</label><select id="rt-selectDefaultVolume" class="rt-select" ${RTDefaultVolume ? '' : ' hidden'}><option value="100">100%</option><option value="80">80%</option><option value="70">70%</option><option value="60">60%</option><option value="50">50%</option><option value="40">40%</option><option value="30">30%</option><option value="20">20%</option><option value="10">10%</option><option value="5">5%</option><option value="1">1%</option><option value="0">0%</option></select></div>`)
			// pull request
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', `<div><label class="retube-label"><input type="checkbox" id="rt-checkbox24"></input>Принудительная скорость видео при запуске</label><select id="rt-selectRememberSpeed" class="rt-select" ${RTRememberSpeed ? '' : ' hidden'}></select></div>`)
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', `<div class="rt-rememberSpeedBypassDiv retube-additionalDiv"${RTRememberSpeed ? '' : ' hidden'}><label class="retube-label" retube-tooltip="Позволяет выбирать нестандартные значения||скорости, но может работать нестабильно"><input type="checkbox" id="rt-checkboxRememberSpeedBypass"></input>Разрешить нестандартные значения</label></div>`)

			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Клик по таймеру в плеере копирует||ссылку с текущей меткой времени||в буфер обмена"><input type="checkbox" id="rt-checkbox26"></input>Копировать ссылку с таймкодом по клику на время</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Показывает прогресс воспроизведения||в заголовке вкладки браузера||Пример: [45%] Название видео"><input type="checkbox" id="rt-checkbox27"></input>Показывать прогресс видео в заголовке вкладки</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Автоматически нажимает кнопку||Ещё под видео"><input type="checkbox" id="rt-checkbox28"></input>Автоматически раскрывать описание видео</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Автоматически перенаправляет||/shorts/ на обычный плеер"><input type="checkbox" id="rt-checkbox29"></input>Перенаправлять Shorts на обычный плеер</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Скрывает секции Shorts с главной,||подписок, поиска и боковой панели"><input type="checkbox" id="rt-checkbox30"></input>Скрыть Shorts</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Добавляет кнопку скачивания||превью видео в максимальном разрешении||в панель управления плеера"><input type="checkbox" id="rt-checkbox31"></input>Скачать превью видео</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Добавляет кнопку реверса порядка||воспроизведения в панели плейлиста"><input type="checkbox" id="rt-checkbox32"></input>Реверс порядка плейлиста</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Показывает цветную метку возраста||видео на превью:||• зелёный < 7 дней||• жёлтый < 30 дней||• оранжевый < 1 года||• красный > 1 года"><input type="checkbox" id="rt-checkbox33"></input>Возраст видео цветом на превью</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Подсчитывает общее время просмотра||видео и показывает статистику||в меню настроек (вкладка Инфо)"><input type="checkbox" id="rt-checkbox34"></input>Статистика времени просмотра</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', `<div><label class="retube-label" retube-tooltip="Автоматически ставит лайк видео||после просмотра определённого||процента от длительности"><input type="checkbox" id="rt-checkbox36"></input>Автолайк после просмотра</label><select id="rt-selectAutoLikePercent" class="rt-select" ${RTAutoLike ? '' : ' hidden'}><option value="30">30%</option><option value="50">50%</option><option value="70">70%</option><option value="80">80%</option><option value="90">90%</option></select></div>`)
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', `<div><label class="retube-label" retube-tooltip="При паузе видео автоматически||откатывает на N секунд назад,||чтобы не терять контекст"><input type="checkbox" id="rt-checkbox37"></input>Откат при паузе</label><select id="rt-selectRewindSeconds" class="rt-select" ${RTPlaybackRewind ? '' : ' hidden'}><option value="1">1 сек</option><option value="2">2 сек</option><option value="3">3 сек</option><option value="5">5 сек</option></select></div>`)
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', `<div><label class="retube-label" retube-tooltip="Добавляет кнопку в плеер и хоткей Shift+S||для скриншота текущего кадра видео"><input type="checkbox" id="rt-checkbox38"></input>Скриншот кадра видео</label><select id="rt-selectScreenshotAction" class="rt-select" ${RTScreenshotVideo ? '' : ' hidden'}><option value="download">Скачать</option><option value="clipboard">В буфер</option><option value="both">Оба</option></select></div>`)
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Shift+? показывает оверлей со||всеми горячими клавишами ReTube||и YouTube"><input type="checkbox" id="rt-checkbox39"></input>Шпаргалка горячих клавиш (Shift+?)</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', `<div><label class="retube-label" retube-tooltip="Определяет главы Intro/Outro||в видео и предлагает их пропустить||или пропускает автоматически"><input type="checkbox" id="rt-checkbox40"></input>Пропуск интро/аутро по главам</label><select id="rt-selectSkipMode" class="rt-select" ${RTAutoSkipIntro ? '' : ' hidden'}><option value="button">Кнопка</option><option value="auto">Авто</option></select></div>`)
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Показывает бейдж в углу плеера||с реальным разрешением, кодеком||(AV1/VP9/H.264) и битрейтом"><input type="checkbox" id="rt-checkbox41"></input>Бейдж кодека/битрейта в плеере</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Кнопка в плеере и горячая клавиша B||для сохранения текущего таймкода.||Список закладок появляется||справа от видео"><input type="checkbox" id="rt-checkbox42"></input>Закладки с таймкодами (B)</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Добавляет возраст публикации:||если дата/время включены — после даты,||иначе отдельным бейджем рядом с названием"><input type="checkbox" id="rt-checkbox43"></input>Дни с момента публикации</label></div>')
			document.querySelector('#retube-settings-tab3').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Отдельный бейдж рядом с названием:||▲лайки ▼дизлайки и %.||Использует Return YouTube Dislike API"><input type="checkbox" id="rt-checkbox44"></input>Соотношение лайков/дизлайков</label></div>')
			document.querySelector('#retube-settings-tab4').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Добавляет кнопку в плеер для отправки||ссылки на видео в Telegram-бот||для транскрибации"><input type="checkbox" id="rt-checkbox35"></input>Отправить видео в Telegram-бот</label></div>')
			document.querySelector('#retube-settings-tab4').insertAdjacentHTML('beforeend', `<div class="rt-tgBotSub retube-additionalDiv"${RTTelegramBot ? '' : ' hidden'}><label class="retube-label">Метод: <select id="rt-selectTgBotMethod" class="rt-select"><option value="server">Сервер транскрибера</option><option value="deeplink">Открыть в Telegram</option></select></label></div>`)
			document.querySelector('#retube-settings-tab4').insertAdjacentHTML('beforeend', `<div class="rt-tgBotSub rt-tgBotServer retube-additionalDiv"${RTTelegramBot ? '' : ' hidden'}><label class="retube-label">URL сервера: <input type="text" id="rt-tgBotServerUrl" class="rt-input" placeholder="http://localhost:3000"></label></div>`)
			document.querySelector('#retube-settings-tab4').insertAdjacentHTML('beforeend', `<div class="rt-tgBotSub rt-tgBotServer retube-additionalDiv"${RTTelegramBot ? '' : ' hidden'}><label class="retube-label">Chat ID: <input type="text" id="rt-tgBotChatId" class="rt-input" placeholder="123456789"></label></div>`)
			document.querySelector('#retube-settings-tab4').insertAdjacentHTML('beforeend', `<div class="rt-tgBotSub rt-tgBotDeeplink retube-additionalDiv"${RTTelegramBot ? '' : ' hidden'}><label class="retube-label">Username бота: <input type="text" id="rt-tgBotUsername" class="rt-input" placeholder="my_transcribe_bot"></label></div>`)
			document.querySelector('#retube-settings-tab4').insertAdjacentHTML('beforeend', '<div style="margin-top: 10px"><span class="retube-label info rt-title">YouTube Data API</span></div>')
			document.querySelector('#retube-settings-tab4').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Свой ключ YouTube Data API v3||для функций: дата видео, кол-во||видео на канале. Получить бесплатно||в Google Cloud Console">API ключ: <input type="text" id="rt-userApiKey" class="rt-input" placeholder="AIzaSy..."></label></div>')
			document.querySelector('#retube-settings-tab4').insertAdjacentHTML('beforeend', '<div style="margin-top: 10px"><span class="retube-label info rt-title">Менеджер кэша</span></div>')
			document.querySelector('#retube-settings-tab4').insertAdjacentHTML('beforeend', '<div id="rt-apiStatus" class="retube-label info" style="font-size: 13px; padding-left: 6px; cursor: pointer" title="Клик — обновить">Статус: загрузка...</div>')
			document.querySelector('#retube-settings-tab4').insertAdjacentHTML('beforeend', '<div style="margin-top: 6px; display: flex; flex-wrap: wrap; gap: 4px; padding-left: 6px"><button class="retube-button" id="rt-clearDateCache">Очистить даты</button><button class="retube-button" id="rt-clearCountCache">Очистить кол-во</button><button class="retube-button" id="rt-clearDislikeCache">Очистить дизлайки</button><button class="retube-button retube-button-hardReset" id="rt-resetApiKeys">Сбросить ключи</button></div>')

			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Возвращеает/исправляет некоторые функции:||• возможность скрола в полноэкранном режиме||• 4 видео в ряду на главной странице"><input type="checkbox" id="rt-checkbox25"></input>Вернуть старые функции</label></div>')

			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<br><button class="retube-button retube-button-save">Сохранить</button>')
			//#endregion
			//#region Таб Цвета
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div><label class="retube-label" retube-tooltip="Для корректной работы, тема||ютуба должна быть тёмной"><input type="checkbox" id="rt-checkboxMain"></input>Перекрасить YouTube</label><select id="rt-selectRTColors" class="rt-select"${RTcolors ? '' : ' hidden'}><option value="default">ReTube</option><option value="defaultDark">ReTube Dark</option><option value="dark">Тёмный</option><option value="purple">Пурпурный</option><option value="green">Зелёный</option><option value="custom">Свои цвета</option></select></div>`)

			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Основной<input type="color" id="rt-colorYTMain"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTMain'); colorInput.value = '#1b222a'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Дополнительный<input type="color" id="rt-colorYTAdditional"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTAdditional'); colorInput.value = '#222b35'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Плеер<input type="color" id="rt-colorYTPlayer"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTPlayer'); colorInput.value = '#11161c'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Текст<input type="color" id="rt-colorYTText"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTText'); colorInput.value = '#c9d0d3'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Ссылки<input type="color" id="rt-colorYTLink"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTLink'); colorInput.value = '#a1bad7'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Полоска прогресса<input type="color" id="rt-colorYTVideoProgress"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTVideoProgress'); colorInput.value = '#5785ba'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)

			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorWatched retube-additionalDiv color"${RTwatchedVideo ? '' : ' hidden'} style="margin-bottom: 5px; margin-top: 5px"><span class="retube-label info rt-title">Просмотрено</span></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorWatched retube-additionalDiv color"${RTwatchedVideo ? '' : ' hidden'}><label class="retube-label retube-label-additional">Задний цвет надписи<input type="color" id="rt-color1"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-color1'); colorInput.value = '#343a41'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorWatched retube-additionalDiv color"${RTwatchedVideo ? '' : ' hidden'}><label class="retube-label retube-label-additional">Задний цвет<input type="color" id="rt-color2"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-color2'); colorInput.value = '#ffffff'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)

			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors && RTSelectYTColors === 'custom' ? '' : ' hidden'} style="margin-top:8px; display:flex; gap:5px"><button class="retube-button" id="rt-exportColors" style="flex:1">Экспорт</button><button class="retube-button" id="rt-importColors" style="flex:1">Импорт</button></div>`)

			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', '<br><button class="retube-button retube-button-save">Сохранить</button>')
			//#endregion
			//#region Таб Инфо
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', `<br><div class="retube-label info" style="text-align: center; font-size: 24px; font-weight: bold">ReTube v${GM_info.script.version}</div>`)
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', '<div class="retube-label info" style="text-align: center;">Разработчик скрипта: Сергей (Eject)</div>')
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', '<div><br><button class="retube-button retube-button-github" onclick="window.open(`https://eject37.github.io`)">Мои работы</button></div>')
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', '<div><button class="retube-button retube-button-discord" onclick="window.open(`https://discord.gg/8baJSRxXSm`)">Мой Discord сервер</button></div>')
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', '<div><br><button class="retube-button retube-button-github" onclick="window.open(`https://eject37.github.io`)">Поддержать разработку (RU, UA card)</button></div>')
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', '<div class="retube-label info" id="rt-watch-time-display" style="text-align: center; margin-top: 10px; color: #aaa;"></div>')
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', '<div><br><button class="retube-button retube-button-hardReset">Сбросить ВСЕ настройки ReTube</button></div>')
			//#endregion

			//#region Переключение табов
			document.querySelectorAll('button[data-tab]').forEach(button => {
				button.addEventListener('click', function () {
					const tabId = button.getAttribute('data-tab');
					document.querySelectorAll('div[id^="retube-tab"]').forEach(el => {
						el.classList.remove('fade-in')
						el.classList.add('fade-out')
					})
					document.querySelector(`#retube-tab${tabId}`).classList.remove('fade-out')
					document.querySelector(`#retube-tab${tabId}`).classList.add('fade-in')
					document.querySelectorAll('button[data-tab]').forEach(x => x.classList.remove('active'))
					button.classList.add('active')
				})
			})

			document.querySelector('button[data-tab="1"]').dispatchEvent(new Event('click', { bubbles: true }))

			document.querySelectorAll('button[data-settingsTab]').forEach(button => {
				button.addEventListener('click', function () {
					const tabId = button.getAttribute('data-settingsTab');
					document.querySelectorAll('div[id^="retube-settings-tab"]').forEach(el => {
						el.classList.remove('fade-in')
						el.classList.add('fade-out')
					})
					document.querySelector(`#retube-settings-tab${tabId}`).classList.remove('fade-out')
					document.querySelector(`#retube-settings-tab${tabId}`).classList.add('fade-in')
					document.querySelectorAll('button[data-settingsTab]').forEach(x => x.classList.remove('active'))
					button.classList.add('active')
				})
			})

			document.querySelector('button[data-settingsTab="1"]').dispatchEvent(new Event('click', { bubbles: true }))
			//#endregion

			//#region Настройки и сохранение
			document.querySelector('#retube-menu').style.top = RTHeadTop
			document.querySelector('#retube-menu').style.left = RTHeadLeft

			const checkboxMain = document.querySelector('#rt-checkboxMain')
			const checkboxAnimateLoad = document.querySelector('#rt-checkboxAnimateLoad')
			const checkbox0 = document.querySelector('#rt-checkbox0')
			const checkbox1 = document.querySelector('#rt-checkbox1')
			const checkbox2 = document.querySelector('#rt-checkbox2')
			const checkbox3 = document.querySelector('#rt-checkbox3')
			const checkbox4 = document.querySelector('#rt-checkbox4')
			const checkbox5 = document.querySelector('#rt-checkbox5')
			const checkbox6 = document.querySelector('#rt-checkbox6')
			const checkbox7 = document.querySelector('#rt-checkbox7')
			const checkbox8 = document.querySelector('#rt-checkbox8')
			const checkbox9 = document.querySelector('#rt-checkbox9')
			const checkbox10 = document.querySelector('#rt-checkbox10')
			const checkbox11 = document.querySelector('#rt-checkbox11')
			const checkbox12 = document.querySelector('#rt-checkbox12')
			const checkbox13 = document.querySelector('#rt-checkbox13')
			const checkbox14 = document.querySelector('#rt-checkbox14')
			const checkbox15 = document.querySelector('#rt-checkbox15')
			const checkbox16 = document.querySelector('#rt-checkbox16')
			const checkbox17 = document.querySelector('#rt-checkbox17')
			const checkbox18 = document.querySelector('#rt-checkbox18')
			const checkbox19 = document.querySelector('#rt-checkbox19')
			const checkbox20 = document.querySelector('#rt-checkbox20')
			const checkbox21 = document.querySelector('#rt-checkbox21')
			const checkbox23 = document.querySelector('#rt-checkbox23')
			const checkbox24 = document.querySelector('#rt-checkbox24') // pull request
			const checkboxRememberSpeedBypass = document.querySelector('#rt-checkboxRememberSpeedBypass') // pull request
			const checkbox25 = document.querySelector('#rt-checkbox25')
			const checkboxHideTrashPlayer = document.querySelector('#rt-checkboxHideTrashPlayer')
			const checkboxHideTrashUnderVideo = document.querySelector('#rt-checkboxHideTrashUnderVideo')
			const checkboxHideTrashSearch = document.querySelector('#rt-checkboxHideTrashSearch')
			const checkbox26 = document.querySelector('#rt-checkbox26')
			const checkbox27 = document.querySelector('#rt-checkbox27')
			const checkbox28 = document.querySelector('#rt-checkbox28')
			const checkbox29 = document.querySelector('#rt-checkbox29')
			const checkbox30 = document.querySelector('#rt-checkbox30')
			const checkbox31 = document.querySelector('#rt-checkbox31')
			const checkbox32 = document.querySelector('#rt-checkbox32')
			const checkbox33 = document.querySelector('#rt-checkbox33')
			const checkbox34 = document.querySelector('#rt-checkbox34')
			const checkbox35 = document.querySelector('#rt-checkbox35')
			const checkbox36 = document.querySelector('#rt-checkbox36')
			const checkbox37 = document.querySelector('#rt-checkbox37')
			const checkbox38 = document.querySelector('#rt-checkbox38')
			const checkbox39 = document.querySelector('#rt-checkbox39')
			const checkbox40 = document.querySelector('#rt-checkbox40')
			const checkbox41 = document.querySelector('#rt-checkbox41')
			const checkbox42 = document.querySelector('#rt-checkbox42')
			const checkbox43 = document.querySelector('#rt-checkbox43')
			const checkbox44 = document.querySelector('#rt-checkbox44')
			const selectRewindSeconds = document.querySelector('#rt-selectRewindSeconds')
			const selectScreenshotAction = document.querySelector('#rt-selectScreenshotAction')
			const selectSkipMode = document.querySelector('#rt-selectSkipMode')
			const selectAutoLikePercent = document.querySelector('#rt-selectAutoLikePercent')
			const selectTgBotMethod = document.querySelector('#rt-selectTgBotMethod')
			const inputTgBotServerUrl = document.querySelector('#rt-tgBotServerUrl')
			const inputTgBotChatId = document.querySelector('#rt-tgBotChatId')
			const inputTgBotUsername = document.querySelector('#rt-tgBotUsername')
			const inputUserApiKey = document.querySelector('#rt-userApiKey')
			const checkboxSettings1 = document.querySelector('#rt-checkboxSettingsDateOnVideoBackground')
			const color1 = document.querySelector('#rt-color1')
			const color2 = document.querySelector('#rt-color2')

			const colorMain = document.querySelector('#rt-colorYTMain')
			const colorAdditional = document.querySelector('#rt-colorYTAdditional')
			const colorPlayer = document.querySelector('#rt-colorYTPlayer')
			const colorText = document.querySelector('#rt-colorYTText')
			const colorLink = document.querySelector('#rt-colorYTLink')
			const colorVideoProgress = document.querySelector('#rt-colorYTVideoProgress')

			const selectYTColors = document.querySelector('#rt-selectRTColors')
			const selectVideoQuality = document.querySelector('#rt-selectVideoQuality')
			const selectTitleIconColor = document.querySelector('#rt-selectTitleIconColor')
			const selectDefaultVolume = document.querySelector('#rt-selectDefaultVolume')
			const selectRememberSpeed = document.querySelector('#rt-selectRememberSpeed') // pull request

			checkboxMain.checked = RTcolors
			checkboxAnimateLoad.checked = RTanimateLoad
			checkbox0.checked = RThideAllTrash
			checkbox1.checked = RTwatchedVideo
			checkbox2.checked = RTbetterFont
			checkbox3.checked = RTvideoDateCreated
			checkbox4.checked = RTfocusFix
			checkbox5.checked = RTnotificationsRemove
			checkbox6.checked = RTcustomTitleIcon
			checkbox7.checked = RTreturnDislikes
			checkbox8.checked = RTfullVideoNames
			checkbox9.checked = RTstopChannelTrailer
			checkbox10.checked = RTremainingTime
			checkbox11.checked = RTrememberTime
			checkbox12.checked = RTvideoQuality
			checkbox13.checked = RTfixChannelLinks
			checkbox14.checked = RTshowTranslationTime
			checkbox15.checked = RTdisablePlayerSleep
			checkbox16.checked = RTshowVideoCountOnChannel
			checkbox17.checked = RThotkeysAlwaysActive
			checkbox18.checked = RTscrollVolume
			checkbox19.checked = RTmiddleClickSearch
			checkbox20.checked = RTtranslateCommentButton
			checkbox21.checked = RTscrollSpeed
			checkbox23.checked = RTDefaultVolume
			checkbox24.checked = RTRememberSpeed // pull request
			checkboxRememberSpeedBypass.checked = RTRememberSpeedBypass // pull request
			checkbox25.checked = RTFixesForNewYouTube
			checkboxHideTrashPlayer.checked = RTHideTrashPlayer === 'true'
			checkboxHideTrashUnderVideo.checked = RTHideTrashUnderVideo === 'true'
			checkboxHideTrashSearch.checked = RTHideTrashSearch === 'true'
			checkbox26.checked = RTCopyTimestampUrl
			checkbox27.checked = RTProgressInTitle
			checkbox28.checked = RTAutoExpandDescription
			checkbox29.checked = RTRedirectShorts
			checkbox30.checked = RTHideShorts
			checkbox31.checked = RTDownloadThumbnail
			checkbox32.checked = RTReversePlaylist
			checkbox33.checked = RTVideoAgeBadge
			checkbox34.checked = RTWatchTimeStats
			checkbox35.checked = RTTelegramBot
			checkbox36.checked = RTAutoLike
			checkbox37.checked = RTPlaybackRewind
			checkbox38.checked = RTScreenshotVideo
			checkbox39.checked = RTShortcutsOverlay
			checkbox40.checked = RTAutoSkipIntro
			checkbox41.checked = RTVideoStatsBadge
			checkbox42.checked = RTVideoBookmarks
			checkbox43.checked = RTVideoUploadDays
			checkbox44.checked = RTLikeDislikeRatio
			selectRewindSeconds.value = RTRewindSeconds
			selectScreenshotAction.value = RTScreenshotAction
			selectSkipMode.value = RTSkipMode
			selectAutoLikePercent.value = RTAutoLikePercent
			selectTgBotMethod.value = RTTgBotMethod
			inputTgBotServerUrl.value = RTTgBotServerUrl
			inputTgBotChatId.value = RTTgBotChatId
			inputTgBotUsername.value = RTTgBotUsername
			inputUserApiKey.value = RTUserApiKey
			// Показать/скрыть поля в зависимости от метода
			document.querySelectorAll('.rt-tgBotServer').forEach(el => el.toggleAttribute('hidden', !RTTelegramBot || selectTgBotMethod.value !== 'server'))
			document.querySelectorAll('.rt-tgBotDeeplink').forEach(el => el.toggleAttribute('hidden', !RTTelegramBot || selectTgBotMethod.value !== 'deeplink'))
			checkboxSettings1.checked = RTSettingsDateOnVideoBackgroundChange
			color1.value = RTColorWatchedLabelBackground
			color2.value = RTColorWatchedBackground

			colorMain.value = RTColorYTMain
			colorAdditional.value = RTColorYTAdditional
			colorPlayer.value = RTColorYTPlayer
			colorText.value = RTColorYTText
			colorLink.value = RTColorYTLink
			colorVideoProgress.value = RTColorYTVideoProgress

			selectYTColors.value = RTSelectYTColors
			selectVideoQuality.value = RTSelectVideoQuality
			selectTitleIconColor.value = RTSelectTitleIconColor
			selectDefaultVolume.value = RTDefaultVolumeLevel

			// pull request
			function populateSpeedSelect(isBypass) {
				selectRememberSpeed.innerHTML = '';
				const standardSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
				const granularSpeeds = [];
				for (let i = 0.25; i <= 4; i += 0.125) {
					granularSpeeds.push(Number(i.toPrecision(15)));
				}
				const speedList = isBypass ? granularSpeeds : standardSpeeds;

				speedList.forEach(speed => {
					const option = document.createElement('option');
					option.value = speed;
					option.textContent = `${speed}x`;
					selectRememberSpeed.appendChild(option);
				});

				if (!speedList.map(String).includes(String(RTSelectRememberSpeedLevel))) {
					const option = document.createElement('option');
					option.value = RTSelectRememberSpeedLevel;
					option.textContent = `${RTSelectRememberSpeedLevel}x (свой)`;
					selectRememberSpeed.appendChild(option);
				}
				selectRememberSpeed.value = RTSelectRememberSpeedLevel;
			}
			populateSpeedSelect(checkboxRememberSpeedBypass.checked);

			document.querySelectorAll('.retube-button-save').forEach(x => x.addEventListener('click', function () {
				GM_setValue('rt-colors', checkboxMain.checked ? 'true' : 'false')
				GM_setValue('rt-animateLoad', checkboxAnimateLoad.checked ? 'true' : 'false')
				GM_setValue('rt-hideAllTrash', checkbox0.checked ? 'true' : 'false')
				GM_setValue('rt-watchedVideo', checkbox1.checked ? 'true' : 'false')
				GM_setValue('rt-betterFont', checkbox2.checked ? 'true' : 'false')
				GM_setValue('rt-videoDateCreated', checkbox3.checked ? 'true' : 'false')
				GM_setValue('rt-focusFix', checkbox4.checked ? 'true' : 'false')
				GM_setValue('rt-notificationsRemove', checkbox5.checked ? 'true' : 'false')
				GM_setValue('rt-customTitleIcon', checkbox6.checked ? 'true' : 'false')
				GM_setValue('rt-returnDislikes', checkbox7.checked ? 'true' : 'false')
				GM_setValue('rt-fullVideoNames', checkbox8.checked ? 'true' : 'false')
				GM_setValue('rt-stopChannelTrailer', checkbox9.checked ? 'true' : 'false')
				GM_setValue('rt-remainingTime', checkbox10.checked ? 'true' : 'false')
				GM_setValue('rt-rememberTime', checkbox11.checked ? 'true' : 'false')
				GM_setValue('rt-videoQuality', checkbox12.checked ? 'true' : 'false')
				GM_setValue('rt-fixChannelLinks', checkbox13.checked ? 'true' : 'false')
				GM_setValue('rt-showTranslationTime', checkbox14.checked ? 'true' : 'false')
				GM_setValue('rt-disablePlayerSleep', checkbox15.checked ? 'true' : 'false')
				GM_setValue('rt-showVideoCountOnChannel', checkbox16.checked ? 'true' : 'false')
				GM_setValue('rt-hotkeysAlwaysActive', checkbox17.checked ? 'true' : 'false')
				GM_setValue('rt-scrollVolume', checkbox18.checked ? 'true' : 'false')
				GM_setValue('rt-middleClickSearch', checkbox19.checked ? 'true' : 'false')
				GM_setValue('rt-translateCommentButton', checkbox20.checked ? 'true' : 'false')
				GM_setValue('rt-scrollSpeed', checkbox21.checked ? 'true' : 'false')
				GM_setValue('rt-defaultVolume', checkbox23.checked ? 'true' : 'false')
				GM_setValue('rt-rememberSpeed', checkbox24.checked ? 'true' : 'false') // pull request
				GM_setValue('rt-rememberSpeedBypass', checkboxRememberSpeedBypass.checked ? 'true' : 'false') // pull request
				GM_setValue('rt-fixesForNewYouTube', checkbox25.checked ? 'true' : 'false')
				GM_setValue('rt-hideTrash-player', checkboxHideTrashPlayer.checked ? 'true' : 'false')
				GM_setValue('rt-hideTrash-underVideo', checkboxHideTrashUnderVideo.checked ? 'true' : 'false')
				GM_setValue('rt-hideTrash-search', checkboxHideTrashSearch.checked ? 'true' : 'false')
				GM_setValue('rt-copyTimestampUrl', checkbox26.checked ? 'true' : 'false')
				GM_setValue('rt-progressInTitle', checkbox27.checked ? 'true' : 'false')
				GM_setValue('rt-autoExpandDescription', checkbox28.checked ? 'true' : 'false')
				GM_setValue('rt-redirectShorts', checkbox29.checked ? 'true' : 'false')
				GM_setValue('rt-hideShorts', checkbox30.checked ? 'true' : 'false')
				GM_setValue('rt-downloadThumbnail', checkbox31.checked ? 'true' : 'false')
				GM_setValue('rt-reversePlaylist', checkbox32.checked ? 'true' : 'false')
				GM_setValue('rt-videoAgeBadge', checkbox33.checked ? 'true' : 'false')
				GM_setValue('rt-watchTimeStats', checkbox34.checked ? 'true' : 'false')
				GM_setValue('rt-telegramBot', checkbox35.checked ? 'true' : 'false')
				GM_setValue('rt-autoLike', checkbox36.checked ? 'true' : 'false')
				GM_setValue('rt-playbackRewind', checkbox37.checked ? 'true' : 'false')
				GM_setValue('rt-rewindSeconds', selectRewindSeconds.value)
				GM_setValue('rt-screenshotVideo', checkbox38.checked ? 'true' : 'false')
				GM_setValue('rt-screenshotAction', selectScreenshotAction.value)
				GM_setValue('rt-shortcutsOverlay', checkbox39.checked ? 'true' : 'false')
				GM_setValue('rt-autoSkipIntro', checkbox40.checked ? 'true' : 'false')
				GM_setValue('rt-skipMode', selectSkipMode.value)
				GM_setValue('rt-videoStatsBadge', checkbox41.checked ? 'true' : 'false')
				GM_setValue('rt-videoBookmarks', checkbox42.checked ? 'true' : 'false')
				GM_setValue('rt-videoUploadDays', checkbox43.checked ? 'true' : 'false')
				GM_setValue('rt-likeDislikeRatio', checkbox44.checked ? 'true' : 'false')
				GM_setValue('rt-autoLikePercent', selectAutoLikePercent.value)
				GM_setValue('rt-tgBotMethod', selectTgBotMethod.value)
				GM_setValue('rt-tgBotServerUrl', inputTgBotServerUrl.value.trim())
				GM_setValue('rt-tgBotChatId', inputTgBotChatId.value.trim())
				GM_setValue('rt-tgBotUsername', inputTgBotUsername.value)
				GM_setValue('rt-userApiKey', inputUserApiKey.value.trim())

				GM_setValue('rt-settings-dateOnVideoBackgroundChange', checkboxSettings1.checked ? 'true' : 'false')
				GM_setValue('rt-color-watchedLabelBackground', color1.value)
				GM_setValue('rt-color-watchedBackground', color2.value)

				GM_setValue('rt-color-YTMain', colorMain.value)
				GM_setValue('rt-color-YTAdditional', colorAdditional.value)
				GM_setValue('rt-color-YTPlayer', colorPlayer.value)
				GM_setValue('rt-color-YTText', colorText.value)
				GM_setValue('rt-color-YTLink', colorLink.value)
				GM_setValue('rt-color-YTVideoProgress', colorVideoProgress.value)

				GM_setValue('rt-select-YTColors', selectYTColors.value)
				GM_setValue('rt-select-videoQuality', selectVideoQuality.value)
				GM_setValue('rt-select-title-icon-color', selectTitleIconColor.value)
				GM_setValue('rt-select-defaultVolumeLevel', selectDefaultVolume.value)
				GM_setValue('rt-select-rememberSpeedLevel', selectRememberSpeed.value)

				GM_setValue('rt-head-top', document.querySelector('#retube-menu').style.top)
				GM_setValue('rt-head-left', document.querySelector('#retube-menu').style.left)

				x.textContent = 'Успешно сохранено'
				setTimeout(() => x.textContent = 'Сохранить', 1000)
			}))
			//#endregion

			//#region Функциональность всех кнопок|панелей|колорпикеров
			color1.addEventListener('input', function (e) {
				document.querySelectorAll('#progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--label-color', e.target.value + '80'))
				document.querySelectorAll('.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--label-color', e.target.value + '80'))
				document.querySelectorAll('.ytd-search ytd-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--label-color', e.target.value + '80'))
			})
			color2.addEventListener('input', function (e) {
				document.querySelectorAll('#progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--background-color', e.target.value + '80'))
				document.querySelectorAll('.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--background-color', e.target.value + '80'))
				document.querySelectorAll('.ytd-search #progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--background-color', e.target.value + '80'))
			})

			colorMain.addEventListener('input', debounce(e => {
				document.documentElement.style.setProperty('--YT-main-color', e.target.value)
				document.documentElement.style.setProperty('--YT-main-color-transparent', e.target.value + 'cc')
			}, 20))
			colorAdditional.addEventListener('input', debounce(e => {
				document.documentElement.style.setProperty('--YT-additional-color', e.target.value)
				document.documentElement.style.setProperty('--YT-hover-and-dateVideoLoad-color', ModifyColor(e.target.value, 4, 4, 4))
				document.documentElement.style.setProperty('--YT-hoverVideoButton-color', ModifyColor(e.target.value, 11, 12, 13))
				document.documentElement.style.setProperty('--YT-overlayMenu-color', ModifyColor(e.target.value, 5, 4, 3) + 'ba')
				document.documentElement.style.setProperty('--YT-hoverAndPanels2-color', ModifyColor(e.target.value, 14, 15, 15))
				document.documentElement.style.setProperty('--YT-searchBorder-color', ModifyColor(e.target.value, 62, 60, 70) + '42')
				document.documentElement.style.setProperty('--YT-searchBorderHover-color', ModifyColor(e.target.value, 92, 90, 100) + '42')
				document.documentElement.style.setProperty('--YT-icon-color', ModifyColor(e.target.value, 26, 22, 17))
				document.documentElement.style.setProperty('--YT-videoTime-color', ModifyColor(e.target.value, 11, 13, 15) + 'ba')
			}, 20))
			colorPlayer.addEventListener('input', debounce(e => document.documentElement.style.setProperty('--YT-player-color', e.target.value), 20))
			colorText.addEventListener('input', debounce(e => {
				document.documentElement.style.setProperty('--YT-text-color', e.target.value)
				document.documentElement.style.setProperty('--YT-icon-inactive', ModifyColor(e.target.value, -25, -23, -15))
				document.documentElement.style.setProperty('--YT-iconText-color', ModifyColor(e.target.value, -1, -8, -11))
				document.documentElement.style.setProperty('--YT-searchBoxPlaceholder-color', ModifyColor(e.target.value, -50, -50, -50))
			}, 20))
			colorLink.addEventListener('input', debounce(e => {
				document.documentElement.style.setProperty('--YT-link-color', e.target.value)
				document.documentElement.style.setProperty('--YT-notificationsBadge-color', ModifyColor(e.target.value, -95, -78, -58))
				document.documentElement.style.setProperty('--YT-panelActiveButton-color', ModifyColor(e.target.value, -56, -46, -20))
				document.documentElement.style.setProperty('--YT-HD4KBadge-color', ModifyColor(e.target.value, -97, -94, -78))
			}, 20))
			colorVideoProgress.addEventListener('input', debounce(e => document.documentElement.style.setProperty('--YT-videoProgress-color', e.target.value), 20))

			checkboxMain.addEventListener('change', e => {
				document.querySelectorAll(".rt-colorYT").forEach(x => x.toggleAttribute('hidden', !e.target.checked || selectYTColors.value != 'custom'))
				document.querySelector("#rt-selectRTColors").toggleAttribute('hidden', !e.target.checked)
				pushCSS('body, ytd-app, #background.ytd-masthead, #container.ytd-searchbox, #chips-wrapper.ytd-feed-filter-chip-bar-renderer, yt-chip-cloud-chip-renderer[chip-style=STYLE_HOME_FILTER], yt-chip-cloud-chip-renderer[chip-style=STYLE_REFRESH_TO_NOVEL_CHIP], #guide-content.ytd-app, ytd-mini-guide-renderer, ytd-mini-guide-entry-renderer, #description.ytd-watch-metadata, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal, yt-chip-cloud-chip-renderer[chip-style=STYLE_DEFAULT], .ytp-swatch-background-color, .header.ytd-playlist-panel-renderer, .badge-style-type-medium-grey.ytd-badge-supported-renderer, .playlist-items.ytd-playlist-panel-renderer, ytd-playlist-panel-video-renderer[selected][use-color-palette], tp-yt-app-toolbar.ytd-c4-tabbed-header-renderer, #channel-container.ytd-c4-tabbed-header-renderer, #background, #primary, #container, #contentContainer' +
					'{transition: background 1s ease !important}', 'rtChangeAnimation')
				PaintYouTube(e.target.checked)
				setTimeout(() => document.querySelector('#rtChangeAnimation')?.remove(), 1100)
			})
			checkbox0.addEventListener('change', e => {
				document.querySelectorAll('.rt-hideTrashSub').forEach(x => x.toggleAttribute('hidden', !e.target.checked))
				HideTrash(e.target.checked)
			})
			checkboxHideTrashPlayer.addEventListener('change', () => { if (checkbox0.checked) HideTrash(true) })
			checkboxHideTrashUnderVideo.addEventListener('change', () => { if (checkbox0.checked) HideTrash(true) })
			checkboxHideTrashSearch.addEventListener('change', () => { if (checkbox0.checked) HideTrash(true) })
			checkbox1.addEventListener('change', e => MarkWatchedVideos(e.target.checked))
			checkbox2.addEventListener('change', e => ImproveFont(e.target.checked))
			checkbox3.addEventListener('change', e => {
				RTvideoDateCreated = e.target.checked
				EnableDateTimeCreated(e.target.checked, document.querySelector('#rt-checkboxSettingsDateOnVideoBackground').checked)
				if (e.target.checked) {
					cleanupFeature('videoUploadDays')
					document.querySelector('.rt-upload-days')?.remove()
				} else if (checkbox43.checked) {
					VideoUploadDays()
				}
			})
			checkboxSettings1.addEventListener('change', e => EnableDateTimeCreated(document.querySelector('#rt-checkbox3').checked, e.target.checked))
			checkbox4.addEventListener('change', e => FocusAndScrollFix(e.target.checked))
			checkbox5.addEventListener('change', e => e.target.checked ? RemoveNotificationNumber() : cleanupFeature('notificationsRemove'))
			checkbox6.addEventListener('change', e => { selectTitleIconColor.toggleAttribute('hidden', !e.target.checked); CustomIcon(e.target.checked, selectTitleIconColor.value) })
			checkbox7.addEventListener('change', e => e.target.checked ? ReturnDislikes() : cleanupFeature('returnDislikes'))
			checkbox8.addEventListener('change', e => FullVideoNames(e.target.checked))
			checkbox9.addEventListener('change', e => e.target.checked ? StopChannelTrailer() : cleanupFeature('stopChannelTrailer'))
			checkbox10.addEventListener('change', e => e.target.checked ? RemainingTime() : cleanupFeature('remainingTime'))
			checkbox11.addEventListener('change', e => e.target.checked ? RememberTime() : cleanupFeature('rememberTime'))
			checkbox12.addEventListener('change', e => {
				selectVideoQuality.toggleAttribute('hidden', !e.target.checked)
				e.target.checked ? VideoQuality() : cleanupFeature('videoQuality')
			})
			checkbox13.addEventListener('change', e => e.target.checked ? FixChannelLinks() : cleanupFeature('fixChannelLinks'))
			checkbox14.addEventListener('change', e => e.target.checked ? ShowTranslationTime() : cleanupFeature('showTranslationTime'))
			checkbox15.addEventListener('change', e => e.target.checked ? DisableSleep() : cleanupFeature('disablePlayerSleep'))
			checkbox16.addEventListener('change', e => EnableVideoCountOnChannel(e.target.checked))
			checkbox17.addEventListener('change', e => e.target.checked ? HotkeysAlwaysActive() : cleanupFeature('hotkeysAlwaysActive'))
			checkbox18.addEventListener('change', e => {
				RTscrollVolume = e.target.checked
				e.target.checked ? ScrollVolume() : cleanupFeature('scrollVolume')
			})
			checkbox19.addEventListener('change', e => {
				RTmiddleClickSearch = e.target.checked
				e.target.checked ? MiddleClickSearch() : cleanupFeature('middleClickSearch')
			})
			checkbox20.addEventListener('change', e => e.target.checked ? TranslateCommentButton() : cleanupFeature('translateCommentButton'))
			checkbox21.addEventListener('change', e => {
				RTscrollSpeed = e.target.checked
				e.target.checked ? ScrollSpeed() : cleanupFeature('scrollSpeed')
			})
			checkbox23.addEventListener('change', e => (RTDefaultVolume = e.target.checked, ForceDefaultVideoVolume(e.target.checked), selectDefaultVolume.toggleAttribute('hidden', !e.target.checked)));
			checkbox25.addEventListener('change', e => FixesForNewYouTube(e.target.checked))
			checkbox26.addEventListener('change', e => {
				RTCopyTimestampUrl = e.target.checked
				e.target.checked ? CopyTimestampUrl() : cleanupFeature('copyTimestampUrl')
			})
			checkbox27.addEventListener('change', e => e.target.checked ? ProgressInTitle() : cleanupFeature('progressInTitle'))
			checkbox28.addEventListener('change', e => e.target.checked ? AutoExpandDescription() : cleanupFeature('autoExpandDescription'))
			checkbox29.addEventListener('change', e => e.target.checked ? RedirectShorts() : cleanupFeature('redirectShorts'))
			checkbox30.addEventListener('change', e => HideShorts(e.target.checked))
			checkbox31.addEventListener('change', e => e.target.checked ? DownloadThumbnail() : cleanupFeature('downloadThumbnail'))
			checkbox32.addEventListener('change', e => e.target.checked ? ReversePlaylist() : cleanupFeature('reversePlaylist'))
			checkbox33.addEventListener('change', e => VideoAgeBadge(e.target.checked))
			checkbox34.addEventListener('change', e => e.target.checked ? WatchTimeStats() : cleanupFeature('watchTimeStats'))
			checkbox36.addEventListener('change', e => {
				selectAutoLikePercent.toggleAttribute('hidden', !e.target.checked)
				e.target.checked ? AutoLike() : cleanupFeature('autoLike')
			})
			selectAutoLikePercent.addEventListener('change', e => { RTAutoLikePercent = e.target.value })
			selectScreenshotAction.addEventListener('change', e => { RTScreenshotAction = e.target.value })
			selectRewindSeconds.addEventListener('change', e => { RTRewindSeconds = e.target.value })
			selectSkipMode.addEventListener('change', e => { RTSkipMode = e.target.value })
			checkbox35.addEventListener('change', e => {
				document.querySelectorAll('.rt-tgBotSub').forEach(el => el.toggleAttribute('hidden', !e.target.checked))
				if (e.target.checked) {
					const method = selectTgBotMethod.value
					document.querySelectorAll('.rt-tgBotServer').forEach(el => el.toggleAttribute('hidden', method !== 'server'))
					document.querySelectorAll('.rt-tgBotDeeplink').forEach(el => el.toggleAttribute('hidden', method !== 'deeplink'))
					SendToTelegramBot()
				} else {
					cleanupFeature('telegramBot')
				}
			})
			selectTgBotMethod.addEventListener('change', e => {
				document.querySelectorAll('.rt-tgBotServer').forEach(el => el.toggleAttribute('hidden', e.target.value !== 'server'))
				document.querySelectorAll('.rt-tgBotDeeplink').forEach(el => el.toggleAttribute('hidden', e.target.value !== 'deeplink'))
			})
			checkbox37.addEventListener('change', e => {
				selectRewindSeconds.toggleAttribute('hidden', !e.target.checked)
				e.target.checked ? PlaybackRewind() : cleanupFeature('playbackRewind')
			})
			checkbox38.addEventListener('change', e => {
				RTScreenshotVideo = e.target.checked
				selectScreenshotAction.toggleAttribute('hidden', !e.target.checked)
				e.target.checked ? ScreenshotVideo() : cleanupFeature('screenshotVideo')
			})
			checkbox39.addEventListener('change', e => e.target.checked ? KeyboardShortcutsOverlay() : cleanupFeature('shortcutsOverlay'))
			checkbox40.addEventListener('change', e => {
				selectSkipMode.toggleAttribute('hidden', !e.target.checked)
				e.target.checked ? AutoSkipIntroOutro() : cleanupFeature('autoSkipIntro')
			})
			checkbox41.addEventListener('change', e => e.target.checked ? VideoStatsBadge() : cleanupFeature('videoStatsBadge'))
			checkbox42.addEventListener('change', e => e.target.checked ? VideoBookmarks() : cleanupFeature('videoBookmarks'))
			checkbox43.addEventListener('change', e => {
				RTVideoUploadDays = e.target.checked
				GM_setValue('rt-videoUploadDays', RTVideoUploadDays ? 'true' : 'false')
				cleanupFeature('videoUploadDays')
				document.querySelector('.rt-upload-days')?.remove()
				if (checkbox3.checked) {
					DateTimeCreated(true, checkboxSettings1.checked)
				} else if (RTVideoUploadDays) {
					VideoUploadDays()
				}
			})
			checkbox44.addEventListener('change', e => {
				RTLikeDislikeRatio = e.target.checked
				GM_setValue('rt-likeDislikeRatio', RTLikeDislikeRatio ? 'true' : 'false')
				e.target.checked ? LikeDislikeRatio() : cleanupFeature('likeDislikeRatio')
			})
			// Менеджер API/кэша
			const apiStatusEl = document.querySelector('#rt-apiStatus')
			async function updateApiStatus() {
				if (!apiStatusEl) return
				const userKey = await GM_getValue('rt-userApiKey')
				const validKey = localStorage.getItem('YOUTUBE_VALID_APIKEY')
				const keysCache = safeParseJSON(localStorage.getItem('YOUTUBE_API_KEYS'), [])
				const dates = safeParseJSON(localStorage.getItem('videoDates'), {})
				const counts = safeParseJSON(localStorage.getItem('videoCounts'), {})
				const isoDates = safeParseJSON(localStorage.getItem('videoPublishedISO'), {})
				const dislikeCount = Object.keys(localStorage).filter(k => k.startsWith('retube-dislikes-count:')).length
				const status = userKey?.trim() ? 'свой ключ' : (validKey ? 'авто-ключ ✓' : (keysCache.length ? 'не выбран' : (noValidApiKeys ? 'ключи закончились' : 'нет данных')))
				apiStatusEl.textContent = `Статус: ${status} • дат: ${Object.keys(dates).length + Object.keys(isoDates).length} • каналов: ${Object.keys(counts).length} • дизлайков: ${dislikeCount}`
			}
			apiStatusEl?.addEventListener('click', updateApiStatus)
			document.querySelector('#rt-clearDateCache')?.addEventListener('click', () => {
				localStorage.removeItem('videoDates')
				localStorage.removeItem('videoPublishedISO')
				updateApiStatus()
				showOSD('Кэш дат очищен')
			})
			document.querySelector('#rt-clearCountCache')?.addEventListener('click', () => {
				localStorage.removeItem('videoCounts')
				updateApiStatus()
				showOSD('Кэш кол-ва видео очищен')
			})
			document.querySelector('#rt-clearDislikeCache')?.addEventListener('click', () => {
				Object.keys(localStorage).filter(k => k.startsWith('retube-dislikes-count:')).forEach(k => localStorage.removeItem(k))
				updateApiStatus()
				showOSD('Кэш дизлайков очищен')
			})
			document.querySelector('#rt-resetApiKeys')?.addEventListener('click', () => {
				if (!confirm('Сбросить кэш API-ключей? При следующем запросе ключи будут заново загружены с GitHub.')) return
				CleanApiKeys()
				noValidApiKeys = false
				apiKeysArrayLength = 0
				updateApiStatus()
				showOSD('API-ключи сброшены')
			})
			updateApiStatus()

			// pull request
			checkbox24.addEventListener('change', e => {
				const isEnabled = e.target.checked;
				RTRememberSpeed = isEnabled;
				selectRememberSpeed.toggleAttribute('hidden', !isEnabled);
				document.querySelector(".rt-rememberSpeedBypassDiv").toggleAttribute('hidden', !isEnabled);
				if (isEnabled) {
					RememberSpeed();
					setPlaybackSpeedNow();
				}
				else {
					cleanupFeature('rememberSpeed')
				}
			});
			checkboxRememberSpeedBypass.addEventListener('change', e => {
				const isBypass = e.target.checked;
				RTRememberSpeedBypass = isBypass;
				RTSelectRememberSpeedLevel = selectRememberSpeed.value;
				populateSpeedSelect(isBypass);
				setPlaybackSpeedNow();
			});
			selectRememberSpeed.addEventListener('change', e => (RTSelectRememberSpeedLevel = e.target.value, setPlaybackSpeedNow()));

			checkbox1.addEventListener('change', e => document.querySelectorAll(".rt-colorWatched").forEach(x => x.toggleAttribute('hidden', !e.target.checked)))
			checkbox3.addEventListener('change', e => document.querySelector(".rt-settingsDateOnVideoBackgroundDiv").toggleAttribute('hidden', !e.target.checked))

			document.querySelectorAll('.retube-label').forEach(label => {
				const tooltipText = label.getAttribute('retube-tooltip');
				if (!tooltipText) return;

				const randomClass = `RT${Math.floor(Math.random() * 100000)}`;
				label.classList.add(randomClass);

				const styleContent = tooltipText.includes('http')
					? `content: ""; background-image: url("${tooltipText}"); background-size: cover; width: 400px; height: 225px;`
					: `content: "${tooltipText.replaceAll('||', '\\a')}"; white-space: pre;`;

				const tooltipStyle = document.createElement('style');
				tooltipStyle.textContent = `.retube-label.${randomClass}::after {${styleContent}}`;
				document.head.appendChild(tooltipStyle);
			});

			document.querySelectorAll('.retube-button-reset').forEach(button => {
				button.setAttribute('retube-tooltip', 'Сброс цвета')
				button.innerHTML = safeHTML('<img src="https://i.imgur.com/fguClbQ.png">');
			})
			document.querySelector('.retube-button-hardReset').addEventListener('click', () => {
				if (!confirm('Вы уверены что хотите сбросить все настройки ReTube?')) return

				GM_listValues().forEach(x => GM_deleteValue(x))
				location.reload()
			})

			// Экспорт/импорт цветовой схемы
			document.querySelector('#rt-exportColors').addEventListener('click', () => {
				const scheme = JSON.stringify({
					main: colorMain.value, additional: colorAdditional.value, player: colorPlayer.value,
					text: colorText.value, link: colorLink.value, progress: colorVideoProgress.value
				})
				navigator.clipboard.writeText(scheme).then(() => {
					const btn = document.querySelector('#rt-exportColors')
					btn.textContent = 'Скопировано!'
					setTimeout(() => btn.textContent = 'Экспорт', 1500)
				})
			})
			document.querySelector('#rt-importColors').addEventListener('click', () => {
				const input = prompt('Вставьте JSON цветовой схемы:')
				if (!input) return
				try {
					const s = JSON.parse(input)
					if (s.main) colorMain.value = s.main
					if (s.additional) colorAdditional.value = s.additional
					if (s.player) colorPlayer.value = s.player
					if (s.text) colorText.value = s.text
					if (s.link) colorLink.value = s.link
					if (s.progress) colorVideoProgress.value = s.progress
					;[colorMain, colorAdditional, colorPlayer, colorText, colorLink, colorVideoProgress].forEach(c => c.dispatchEvent(new Event('input', { bubbles: true })))
				} catch { alert('Неверный формат JSON') }
			})

			if (!checkboxMain.checked || selectYTColors.value != 'custom') document.querySelectorAll(".rt-colorYT").forEach(x => x.toggleAttribute('hidden', true))
			selectYTColors.addEventListener("change", e => {
				HideColors(true)
				pushCSS('body, ytd-app, #background.ytd-masthead, #container.ytd-searchbox, #chips-wrapper.ytd-feed-filter-chip-bar-renderer, yt-chip-cloud-chip-renderer[chip-style=STYLE_HOME_FILTER], yt-chip-cloud-chip-renderer[chip-style=STYLE_REFRESH_TO_NOVEL_CHIP], #guide-content.ytd-app, ytd-mini-guide-renderer, ytd-mini-guide-entry-renderer, #description.ytd-watch-metadata, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal, yt-chip-cloud-chip-renderer[chip-style=STYLE_DEFAULT], .ytp-swatch-background-color, .header.ytd-playlist-panel-renderer, .badge-style-type-medium-grey.ytd-badge-supported-renderer, .playlist-items.ytd-playlist-panel-renderer, ytd-playlist-panel-video-renderer[selected][use-color-palette], tp-yt-app-toolbar.ytd-c4-tabbed-header-renderer, #channel-container.ytd-c4-tabbed-header-renderer, #background, #primary, #container, #contentContainer' +
					'{transition: background 1s ease !important}', 'rtChangeAnim')

				const selected = e.target.value
				if (selected == 'default') {
					colorMain.value = '#1b222a'
					colorAdditional.value = '#222b35'
					colorPlayer.value = '#11161c'
					colorText.value = '#c9d0d3'
					colorLink.value = '#a1bad7'
					colorVideoProgress.value = '#5785ba'
				}
				else if (selected == 'defaultDark') {
					colorMain.value = '#101419'
					colorAdditional.value = '#1a2128'
					colorPlayer.value = '#0c0d0e'
					colorText.value = '#c9d0d3'
					colorLink.value = '#a1bad7'
					colorVideoProgress.value = '#5785ba'
				}
				else if (selected == 'dark') {
					colorMain.value = '#101214'
					colorAdditional.value = '#1b1e21'
					colorPlayer.value = '#080909'
					colorText.value = '#c9d0d3'
					colorLink.value = '#a1bad7'
					colorVideoProgress.value = '#5785ba'
				}
				else if (selected == 'purple') {
					colorMain.value = '#191014'
					colorAdditional.value = '#2e1f2a'
					colorPlayer.value = '#0e0c0e'
					colorText.value = '#c9d0d3'
					colorLink.value = '#d1a8b2'
					colorVideoProgress.value = '#954166'
				}
				else if (selected == 'green') {
					colorMain.value = '#101917'
					colorAdditional.value = '#1a2825'
					colorPlayer.value = '#0c0d0e'
					colorText.value = '#c9d0d3'
					colorLink.value = '#a5e4d9'
					colorVideoProgress.value = '#409c91'
				}
				else if (selected == 'custom') {
					HideColors(false)
				}
				CallColorEvent()

				setTimeout(() => document.querySelector('#rtChangeAnim')?.remove(), 1100)

				function HideColors(hide) {
					document.querySelectorAll(".rt-colorYT").forEach(x => x.toggleAttribute('hidden', hide))
				}
				function CallColorEvent() {
					colorMain.dispatchEvent(new Event('input', { bubbles: true }))
					colorAdditional.dispatchEvent(new Event('input', { bubbles: true }))
					colorPlayer.dispatchEvent(new Event('input', { bubbles: true }))
					colorText.dispatchEvent(new Event('input', { bubbles: true }))
					colorLink.dispatchEvent(new Event('input', { bubbles: true }))
					colorVideoProgress.dispatchEvent(new Event('input', { bubbles: true }))
				}
			})

			selectTitleIconColor.addEventListener("change", e => {
				const selected = e.target.value
				if (selected == 'blue') {
					CustomIcon(true, 'blue')
				}
				else if (selected == 'gray') {
					CustomIcon(true, 'gray')
				}
			})

			selectDefaultVolume.addEventListener("change", e => {
				RTDefaultVolumeLevel = e.target.value
			})
			selectVideoQuality.addEventListener("change", e => {
				RTSelectVideoQuality = e.target.value
				if (checkbox12.checked) {
					cleanupFeature('videoQuality')
					VideoQuality()
				}
			})

			const dragHeader = (() => {
				let isDragging = false;
				let offsetX, offsetY;

				const draggableWindow = document.querySelector('#retube-menu');
				const windowPadding = 10;
				const snapDistance = 20;

				const setPosition = (x, y) => {
					draggableWindow.style.left = `${x}px`;
					draggableWindow.style.top = `${y}px`;
				};

				return (e) => {
					if (e.type === 'mousedown') {
						e.preventDefault();
						isDragging = true;
						const { offsetLeft, offsetTop } = draggableWindow;
						offsetX = e.clientX - offsetLeft;
						offsetY = e.clientY - offsetTop;
					} else if (e.type === 'mousemove' && isDragging) {
						const x = e.clientX - offsetX;
						const y = e.clientY - offsetY;

						const snapX = x <= snapDistance ? windowPadding :
							x >= window.innerWidth - draggableWindow.offsetWidth - (snapDistance + 10) ? window.innerWidth - draggableWindow.offsetWidth - (windowPadding + 10) : x;
						const snapY = y <= snapDistance ? windowPadding :
							y >= window.innerHeight - draggableWindow.offsetHeight - snapDistance ? window.innerHeight - draggableWindow.offsetHeight - windowPadding : y;

						setPosition(snapX, snapY);
					} else if (e.type === 'mouseup') {
						isDragging = false;
					}
				};
			})();

			document.querySelector('#rt-head').addEventListener('mousedown', dragHeader);
			document.addEventListener('mousemove', dragHeader);
			document.addEventListener('mouseup', dragHeader);


			document.querySelector('#rt-closeImg-head').addEventListener('click', () => document.querySelector('#retube-menu')?.toggleAttribute('hidden'))

			// Поиск по настройкам
			document.querySelector('#rt-settings-search').addEventListener('input', e => {
				const query = e.target.value.toLowerCase().trim()
				const settingsTabs = document.querySelector('#rt-settings-tabs')
				if (query) {
					// Показываем все табы настроек при поиске
					document.querySelectorAll('div[id^="retube-settings-tab"]').forEach(el => {
						el.classList.remove('fade-out')
						el.classList.add('fade-in')
					})
					settingsTabs.style.display = 'none'
				} else {
					settingsTabs.style.display = ''
					// Восстанавливаем активный таб
					const activeTab = document.querySelector('.rt-button-settings-tab.active')
					if (activeTab) activeTab.dispatchEvent(new Event('click', { bubbles: true }))
				}
				document.querySelectorAll('#retube-tab1 .retube-label').forEach(label => {
					const row = label.closest('div')
					if (!row) return
					const text = label.textContent.toLowerCase()
					row.style.display = !query || text.includes(query) ? '' : 'none'
				})
			})
			//#endregion
		}
	})

	//#region Основные функции
	function PaintYouTube(paint) {
		if (!paint) {
			document.querySelector('#rt-paint')?.remove()
			return
		}

		pushCSS(`:root {--YT-main-color: ${RTColorYTMain}; --YT-main-color-transparent: ${RTColorYTMain + 'CC'}; --YT-additional-color: ${RTColorYTAdditional}; --YT-hover-and-dateVideoLoad-color: ${ModifyColor(RTColorYTAdditional, 4, 4, 4)};` +
			`--YT-hoverVideoButton-color: ${ModifyColor(RTColorYTAdditional, 11, 12, 13)}; --YT-text-color: ${RTColorYTText}; --YT-overlayMenu-color: ${ModifyColor(RTColorYTAdditional, 5, 4, 3)}ba;` +
			`--YT-hoverAndPanels2-color: ${ModifyColor(RTColorYTAdditional, 14, 15, 15)}; --YT-link-color: ${RTColorYTLink}; --YT-icon-inactive: ${ModifyColor(RTColorYTText, -25, -23, -15)};` +
			`--YT-searchBorder-color: ${ModifyColor(RTColorYTAdditional, 62, 60, 70)}42; --YT-searchBorderHover-color: ${ModifyColor(RTColorYTAdditional, 92, 90, 100)}42;` +
			`--YT-videoProgress-color: ${RTColorYTVideoProgress}; --YT-iconText-color: ${ModifyColor(RTColorYTText, -1, -8, -11)}; --YT-icon-color: ${ModifyColor(RTColorYTAdditional, 26, 22, 17)};` +
			`--YT-player-color: ${RTColorYTPlayer}; --YT-videoTime-color: ${ModifyColor(RTColorYTAdditional, 11, 13, 15)}ba;` +
			`--YT-notificationsBadge-color: ${ModifyColor(RTColorYTLink, -95, -78, -58)}; --YT-panelActiveButton-color: ${ModifyColor(RTColorYTLink, -56, -46, -20)};` +
			`--YT-HD4KBadge-color: ${ModifyColor(RTColorYTLink, -97, -94, -78)}; --YT-searchBoxPlaceholder-color: ${ModifyColor(RTColorYTText, -50, -50, -50)} }` +

			'html[dark], [dark] {--yt-spec-base-background: var(--YT-main-color)}' + // Цвет фона всего ютуба
			'html[darker-dark-theme][dark], [darker-dark-theme] [dark] {--yt-spec-text-primary: var(--YT-text-color)}' + // Цвет текста всего ютуба
			'html[dark], [dark] {--yt-spec-menu-background: var(--YT-overlayMenu-color)} ytd-simple-menu-header-renderer {background-color: transparent}' + // Цвет фона панели уведомлений
			'html[dark], [dark] {--yt-spec-raised-background: var(--YT-overlayMenu-color)} .YtSearchboxComponentSuggestionsContainer, .ytSearchboxComponentSuggestionsContainer {background-color: var(--YT-overlayMenu-color)}' + // Цвет элементов при поиске видео + цвет фона добавления в плейлист
			'html[dark], [dark] {--yt-spec-brand-background-primary: var(--YT-additional-color); --yt-spec-general-background-a: var(--YT-main-color)}' + // Задние цвета активного плейлиста
			'html[dark], [dark] {--yt-spec-badge-chip-background: var(--YT-additional-color); --yt-spec-button-chip-background-hover: var(--YT-hover-and-dateVideoLoad-color)}' + // Цвет фона описания видео
			'.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal:hover, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--filled:hover {background-color: var(--YT-hoverVideoButton-color)}' + // Цвет фона лайков и прочих кнопок при наведении
			'ytd-playlist-panel-renderer[use-color-palette][is-dark-theme] {--yt-active-playlist-panel-background-color: var(--YT-hover-and-dateVideoLoad-color)}' + // Цвет фона текущего видео в плейлисте
			'html[dark], [dark] {--yt-spec-call-to-action: var(--YT-link-color); --yt-spec-themed-blue: var(--YT-link-color)} .yt-core-attributed-string__link--call-to-action-color {color: var(--yt-spec-call-to-action) !important} .yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--text {color: var(--yt-spec-call-to-action)} .yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--text:hover {background-color: var(--YT-additional-color)}' + // Цвет ссылок
			'html[dark], [dark] {--ytd-searchbox-background: var(--YT-main-color)}' + // Задний цвет панели поиска
			'.YtSearchboxComponentInputBoxDark, .ytSearchboxComponentInputBoxDark {background-color: var(--YT-main-color)}' + // Панель поиска
			'.YtSuggestionComponentPersonalizedSuggestion, .YtSuggestionComponentSuggestion, .ytSuggestionComponentPersonalizedSuggestion, .ytSuggestionComponentSuggestion {color: var(--YT-text-color)} .YtSuggestionComponentRemoveLinkDark, .ytSuggestionComponentRemoveLinkDark {color: var(--YT-link-color)}' + // Цвет текста в окне результатов поиска
			'html[dark] {--yt-live-chat-background-color: var(--YT-main-color)}' +
			'ytd-playlist-panel-renderer#playlist {--yt-lightsource-secondary-title-color: var(--YT-text-color) !important; --yt-lightsource-primary-title-color: var(--YT-text-color) !important}' + // Цвет текста активного видео в плейлисте (название + канал)
			'html[system-icons][dark], html[system-icons] [dark] {--yt-spec-brand-icon-inactive: var(--YT-icon-inactive)}' +
			'html[dark] {--yt-spec-icon-active-other: var(--YT-icon-inactive)}' +
			'html[dark] {--yt-spec-brand-icon-active: var(--YT-icon-inactive)}' +
			'html[dark], [dark] {--ytd-searchbox-legacy-button-hover-border-color: var(--YT-searchBorderHover-color)}' +
			'html[dark], [dark] {--ytd-searchbox-legacy-border-color: var(--YT-searchBorder-color)}' +
			'html[dark], [dark] {--ytd-searchbox-legacy-button-border-color: var(--YT-searchBorder-color)}' +
			'html[dark], [dark] {--yt-spec-static-brand-red: var(--YT-videoProgress-color)} .YtThumbnailOverlayProgressBarHostWatchedProgressBarSegmentModern {background: var(--YT-videoProgress-color)}' + // Цвет прогресса просмотренных видео
			'.ytp-swatch-background-color, #progress.ytd-thumbnail-overlay-resume-playback-renderer, .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment {background: var(--YT-videoProgress-color) !important} .ytp-load-progress {transition: transform 1.5s ease-in-out}' + // Полоска прогресса видео + плавная прогрузка
			'.ytp-live-badge[disabled]:before {background: var(--YT-videoProgress-color) !important}' + // Круглый значок 'В эфире'
			'#ytp-id-17, #ytp-id-18, #ytp-id-19, .ytp-popup {background: var(--YT-overlayMenu-color) !important; backdrop-filter: blur(15px)}' + // Цвет фона настроек видео
			'html[dark], [dark] {--yt-spec-wordmark-text: var(--YT-iconText-color)}' + // Надпись возле иконки ютуба
			'path[d^="M14.4848 20C14.4848"] {fill: var(--YT-icon-color)}' + // Иконка ютуба
			'svg.external-icon > svg > g > path:nth-child(1), #card svg g g path:nth-child(1) {fill: var(--YT-icon-color)}' + // Иконка ютуба старый дизайн
			'#logo-icon > svg > g > g:nth-child(1) > path:nth-child(1) {fill: var(--YT-icon-color)}' + // Иконка ютуба очень старый дизайн
			'.html5-video-player {background: var(--YT-player-color)}' + // Цвет фона плеера
			'#time-status.ytd-thumbnail-overlay-time-status-renderer, .badge-shape-wiz--default.badge-shape-wiz--overlay, .badge-shape-wiz--thumbnail-default, .yt-badge-shape {background: var(--YT-videoTime-color); backdrop-filter: blur(10px)}' + // Фон рамки с длительносьтю видео
			'.badge-shape-wiz--live.badge-shape-wiz--overlay {background: var(--YT-HD4KBadge-color); backdrop-filter: blur(10px)}' + // Фон рамки 'В эфире'
			'.yt-spec-icon-badge-shape--type-notification .yt-spec-icon-badge-shape__badge {background-color: var(--YT-notificationsBadge-color); color: var(--YT-text-color) !important}' + // Цвет бэйджа количества уведомлений
			'sup.ytp-swatch-color-white {color: var(--YT-link-color)}' + // Цвет надписей HD в выборе качества
			'.ytp-chrome-controls .ytp-button[aria-pressed]:after {background-color: var(--YT-panelActiveButton-color) !important}' + // Цвет полоски снизу включённых субтитров

			'.ytp-button.ytp-settings-button.ytp-hd-quality-badge:after, .ytp-button.ytp-settings-button.ytp-4k-quality-badge:after, .ytp-button.ytp-settings-button.ytp-8k-quality-badge:after {background-color: var(--YT-HD4KBadge-color) !important; border-radius: 3px}' + // Надписи HD, 4K, 8K
			'.ytp-big-mode .ytp-settings-button.ytp-hd-quality-badge:after, .ytp-big-mode .ytp-settings-button.ytp-4k-quality-badge:after, .ytp-big-mode .ytp-settings-button.ytp-8k-quality-badge:after {border-radius: 6px !important}' + // Надписи HD, 4K, 8K в полном экране

			'.ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox {background: var(--YT-notificationsBadge-color) !important}' + // Задний цвет тугл кнопок в настройках видео
			'.ytp-popup.ytp-contextmenu {background: var(--YT-overlayMenu-color); border-radius: 10px; backdrop-filter: blur(10px)}' + // Задний цвет и закругление панели ПКМ по видео
			'html[dark], [dark] {--yt-spec-additive-background: var(--YT-searchBorderHover-color)}' + // Цвет наведения на элементы в поиске
			'.ytp-contextmenu .ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox {background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgdmVyc2lvbj0iMS4xIj48cGF0aCBkPSJNOSAxNi4yTDQuOCAxMmwtMS40IDEuNEw5IDE5IDIxIDdsLTEuNC0xLjRMOSAxNi4yeiIgZmlsbD0iI2ZmZiIgLz48L3N2Zz4=) !important;}' + // Фикс отображения чекбокса
			'html[dark], [dark] {--yt-spec-static-overlay-background-heavy: var(--YT-videoTime-color); --yt-spec-static-overlay-background-solid: var(--YT-videoTime-color)}' + // Кнопка на видео добавить в смотреть позже + при наведении
			'html[dark], [dark] {--yt-spec-static-overlay-background-brand: var(--YT-notificationsBadge-color)}' + // Кнопка/надпись на главной странице В эфире под видео
			'#icon.ytd-reel-shelf-renderer path, #icon.ytd-rich-shelf-renderer path {fill: var( --YT-icon-color)}' + // Иконка YouTube Shorts на главной странице и в сайдбаре
			'.tp-yt-paper-tooltip[style-target=tooltip], .ytp-tooltip-text {background-color: var(--YT-videoTime-color) !important; backdrop-filter: blur(10px); padding: 4px 8px; text-wrap: nowrap} .ytp-tooltip-bottom-text {background-color: transparent !important}' + // Задний цвет всплывающих подсказок (Нравится, Не нравится..)
			'html[dark] {--yt-live-chat-banner-gradient-scrim: linear-gradient(var(--YT-hover-and-dateVideoLoad-color), transparent )}' + // Градиент в чате ютуба закрепленного сообщения
			'#top-level-buttons-computed #segmented-dislike-button ytd-toggle-button-renderer *[aria-pressed="true"] yt-icon {color: rgb(249 137 137) !important}' + // Цвет кнопки дизлайка (нажатой)
			'.html5-video-player[aria-label*="в "] {background: rgb(0, 0, 0)}' + // Цвет фона плеера в полном экране
			'html[dark], [dark] {--yt-spec-outline: var(--YT-hoverAndPanels2-color)}' + // Панель упорядочить в комментариях + разные разделители
			'.ytp-bezel-text {border-radius: 20px !important; font-weight: bold; backdrop-filter: blur(4px); }' + // Параметры всплывашки регулировки звука
			'html[dark], [dark] {--ytd-searchbox-text-color: var(--YT-text-color)} #container.ytd-searchbox input.ytd-searchbox::placeholder, #container.ytd-searchbox>[slot=search-input] input::placeholder {color: var(--YT-searchBoxPlaceholder-color) !important}' + // Цвет текста в поисковой строке
			'.YtSearchboxComponentInput::placeholder, .ytSearchboxComponentInput::placeholder {color: var(--YT-searchBoxPlaceholder-color) !important} .YtSearchboxComponentInput, .ytSearchboxComponentInput {color: var(--YT-text-color)}' + // Цвет текста в поисковой строке (от 30.10.2024)
			'html[dark] .sbsb_a, .YtSearchboxComponentSuggestionsContainer, .ytSearchboxComponentSuggestionsContainer {backdrop-filter: blur(15px)}' + // Размытие элементов при поиске видео
			'.ytp-doubletap-static-circle {background-color: rgba(0 0 0 / 50%) !important; backdrop-filter: blur(4px);} .ytp-doubletap-tooltip-label { font-size: 15px !important; font-weight: bold !important; margin-left: 8px;}' + // Параметры всплывашки перемотки видео
			'ytd-searchbox[has-focus] #container.ytd-searchbox, .YtSearchboxComponentInputBoxDark.YtSearchboxComponentInputBoxHasFocus, .ytSearchboxComponentInputBoxDark.ytSearchboxComponentInputBoxHasFocus {border: 1px solid var(--ytd-searchbox-legacy-border-color) !important}' + // Обводка активной панели поиска
			'.YtSearchboxComponentInputBoxDark, .ytSearchboxComponentInputBoxDark {border-color: var(--ytd-searchbox-legacy-border-color)}' + // Обводка панели поиска
			'#card.yt-live-chat-viewer-engagement-message-renderer, #contents.yt-live-chat-mode-change-message-renderer {background-color: var(--YT-additional-color)}' + // В чате ютуба плашка, добро пожаловать в чат
			'tp-yt-paper-dialog {backdrop-filter: blur(17px); background-color: var(--YT-overlayMenu-color)}' + // Окно добавления видео в плейлист
			'#subscribe-button-shape > button {background-color: var(--YT-additional-color); color: var(--YT-text-color)} #subscribe-button-shape > button:hover {background-color: var(--YT-hoverVideoButton-color)}' + // Кнопка Подписаться
			'span.yt-core-attributed-string--link-inherit-color { color: var(--YT-text-color) !important }' + // Цвет текста описания видео
			'.ytp-tooltip.ytp-preview .ytp-tooltip-text, .ytp-tooltip-text, .tp-yt-paper-tooltip[style-target=tooltip] { border-radius: 12px !important }' + // Закругление всплывающих подсказок
			'html[dark], [dark] { --yt-spec-static-brand-white: var(--YT-text-color) }' +  // Цвет текста в чате на стриме
			'.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--filled { background-color: var(--YT-additional-color) }' + // Цвет фона лайков и прочих кнопок
			'html[dark] ::selection { background: var(--YT-hoverAndPanels2-color) !important; }' + // Цвет выделения текста
			'::-webkit-scrollbar {width: 9px; height: 9px; background-color: var(--YT-main-color) !important} html, ytd-app {scrollbar-color: unset !important}' + // Скроллбар
			'.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--filled {color: var(--YT-text-color)}' + // Цвет текста кнопок (лайк, дизлайк, сохранить)
			'#cinematics-container {display: none}' + // Отключаем профессиональное освещение
			'#button.ytd-topbar-menu-button-renderer {color: #fff !important}' + // Цвет иконки 'Создать видео'

			// Красим всплывающую подсказку слева снизу (например при добавлении видео в смотреть позже)
			'ytd-popup-container {z-index: 9999}' +
			'tp-yt-paper-toast.yt-notification-action-renderer {background-color: var(--YT-additional-color); box-shadow: 0 0 10px var(--YT-additional-color)}' +
			'#text.yt-notification-action-renderer, yt-notification-action-renderer[ui-refresh] #sub-text.yt-notification-action-renderer {color: var(--YT-text-color)}' +
			'.yt-spec-button-shape-next--call-to-action-inverse.yt-spec-button-shape-next--text {color: var(--YT-link-color)}' +

			// Красим панель 'До начала трансляции'
			'.ytp-offline-slate-bar {background: rgba(0, 0, 0, 0.4) !important; backdrop-filter: blur(15px) !important} .ytp-offline-slate-button {background: var(--YT-searchBorderHover-color) !important; border-radius: 15px !important}' +

			// Полоса прогресса загрузки страницы вверху сайта
			'#progress.yt-page-navigation-progress {background: var(--YT-videoProgress-color)}' +

			// Shorts
			'#cinematic-shorts-scrim {display: none}' +

			// Разные всплывающие окна (новые видео, нажатие на аватарку)
			'.ytd-popup-container {backdrop-filter: blur(15px)}' +

			// Кнопка Создать в шапке
			'.ytd-masthead button:has(path[d^="M20 12h"]) {background: transparent !important} .ytd-masthead button:has(path[d^="M20 12h"]):hover {background: var(--yt-spec-10-percent-layer) !important}' +
			'.ytd-masthead button:has(path[d^="M20 12h"]) > .yt-spec-button-shape-next__button-text-content {display: none !important}' +
			'.ytd-masthead button:has(path[d^="M20 12h"]) > .yt-spec-button-shape-next__icon {margin-right: -10px; margin-left: -10px; color: white}' +

			// Кружок на полосе прогресса видео (отображать только при наведении)
			'.ytp-progress-bar-container:not(:hover) .ytp-scrubber-button {display: none}' +

			// Шапка на новом дизайне, размытие
			'#frosted-glass.with-chipbar.ytd-app, ytd-masthead[frosted-glass-mode=without-chipbar] #background.ytd-masthead {background: var(--YT-main-color-transparent)}' +

			// Скрываем точки (действие с видео) в плейлистах до наведения на видео (было когда-то по умолчанию)
			'ytd-playlist-video-renderer:not(:hover) #menu {display: none}' +

			// Задняя панель где таймкоды эпизодов видео в панели справа
			'#time.ytd-macro-markers-list-item-renderer {background-color: var(--YT-hoverAndPanels2-color) !important}' +

			// Цвет текста заголовков видео (от 10.07.2025)
			'.yt-lockup-metadata-view-model-wiz__title {color: var(--YT-text-color) !important}'
			, 'rt-paint')
	}

	function HideTrash(hide) {
		document.querySelector('#rt-hideTrashStyle')?.remove()
		document.querySelector('#rt-hideTrashPlayerStyle')?.remove()
		document.querySelector('#rt-hideTrashUnderVideoStyle')?.remove()
		document.querySelector('#rt-hideTrashSearchStyle')?.remove()

		if (!hide) return

		// Получаем состояние подкатегорий (из чекбоксов если меню открыто, иначе из сохранённых настроек)
		const hidePlayer = document.querySelector('#rt-checkboxHideTrashPlayer')?.checked ?? RTHideTrashPlayer === 'true'
		const hideUnderVideo = document.querySelector('#rt-checkboxHideTrashUnderVideo')?.checked ?? RTHideTrashUnderVideo === 'true'
		const hideSearch = document.querySelector('#rt-checkboxHideTrashSearch')?.checked ?? RTHideTrashSearch === 'true'

		// Общие элементы (всегда скрываются при включении основного чекбокса)
		pushCSS('#voice-search-button {display: none}' + // Кнопка голосового поиска
			'#country-code {display: none}' + // Старна возле иконки

			'#footer, ytd-guide-section-renderer:nth-child(5) > div > ytd-guide-entry-renderer:nth-child(2),' +
			'ytd-guide-section-renderer:nth-child(5) > div > ytd-guide-entry-renderer:nth-child(3),' +
			'ytd-guide-section-renderer:nth-child(5) > div > ytd-guide-entry-renderer:nth-child(4),' +
			'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(2),' +
			'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(3),' +
			'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(4),' +
			'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(5),' +
			'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(6),' +
			'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(7),' +
			'ytd-guide-section-renderer:nth-child(1) > div > ytd-guide-entry-renderer:nth-child(2) {display: none}' + // Убирает лишние элементы с левой панели

			'.annotation.annotation-type-custom.iv-branding {display: none}' + // Аннотация канала в конце видео
			'#reaction-control-panel {display: none}' + // Панель реакция на трансляции в чате
			'[role="button"][aria-label="Добавить в очередь"], [role="button"][aria-label="Додати в чергу"] {display: none}' + // Кнопка на видео добавить в очередь
			'#premium-upsell-link, .ytd-guide-renderer.style-scope:nth-of-type(4) {display: none}' + // Кнопка оформить youtube premium + секция другие возможности в левой панели
			'yt-multi-page-menu-section-renderer:nth-child(5) {display: none}' + // Кнопки справка и отправить отзыв в меню аккаунта
			'.ytp-fullerscreen-edu-button-subtle {display: none !important}' + // Кнопка под прогрессбаром в полном экране (прокрутите для доп. информации)
			'button[id="infoButton"] {display: none !important}' + // Кнопка информационной панели от SponsorBlock (в плеере)
			'#sponsor-button {display: none !important}' + // Кнопка стать спонсором возле кнопки подписки на канал

			'.ytp-paid-content-overlay, .iv-branding, #movie_player > [class^="ytp-ce-"], .ytp-cards-teaser-text, ytm-paid-content-overlay-renderer, ' +
			'ytd-search-pyv-renderer, [class^="ytd-promoted-"], ytd-video-renderer + ytd-shelf-renderer, ytd-video-renderer + ytd-reel-shelf-renderer, ' +
			'#clarify-box, .ytd-watch-flexy.attached-message, ytd-popup-container tp-yt-paper-dialog ytd-single-option-survey-renderer, #donation-shelf ytd-donation-unavailable-renderer, ' +
			'.sparkles-light-cta, ytd-feed-nudge-renderer, .ytp-pause-overlay-container {display: none !important}' +

			// Кнопка Аннотации и Автовыключение в настройках видео
			'.ytp-settings-menu .ytp-panel-menu > .ytp-menuitem[role="menuitemcheckbox"], .ytp-settings-menu .ytp-panel-menu > .ytp-menuitem:has(path[d^="M16.67,4.31C19"]) {display: none !important}' +
			'ytd-rich-section-renderer:has(a[href^="/premium/"]) {display: none !important}' +  // На главной странице, реклама с предложением подписаться на yt music премиум
			'#newness-dot {display: none !important}' + // Убирает точки новых видео на левой панели
			'#teaser-carousel:has(> .ytVideoMetadataCarouselViewModelHost) {display: none !important}' // Запись чата под видео справа от информации о видео
			, 'rt-hideTrashStyle')

		// Кнопки плеера (перемотка, автовоспроизведение, трансляция, мини-плеер)
		if (hidePlayer) {
			pushCSS(
				'a.ytp-next-button.ytp-button, a.ytp-prev-button.ytp-button, .ytp-jump-button {display: none !important}' +
				'button[title="Автовоспроизведение выключено"], button[title="Автоматичне відтворення вимкнено"], .ytp-button:has(.ytp-autonav-toggle-button[aria-checked="false"]) {display: none !important}' +
				'button[title="Субтитры недоступны"], button[title="Субтитри недоступні"] {display: none !important}' +
				'.ytp-button.ytp-remote-button {display: none !important}' +
				'.ytp-button.ytp-miniplayer-button {display: none !important}'
				, 'rt-hideTrashPlayerStyle')
		}

		// Кнопки под видео (поделиться, клип, скачать, спасибо)
		if (hideUnderVideo) {
			pushCSS('ytd-download-button-renderer, yt-button-view-model:has(button[aria-label="Поделиться"]), yt-button-view-model:has(button[aria-label="Создать клип"]), yt-button-view-model:has(button[aria-label="Спасибо"]), yt-button-view-model:has(button[aria-label="Показать текст видео"]), ' +
				'yt-button-view-model:has(button[aria-label="Поділитися"]), yt-button-view-model:has(button[aria-label="Створити кліп"]), yt-button-view-model:has(button[aria-label="Дякую"]), yt-button-view-model:has(button[aria-label="Показати текстову версію"]), ' +
				'yt-button-view-model:has(button[aria-label="Share"]), yt-button-view-model:has(button[aria-label="Clip"]), yt-button-view-model:has(button[aria-label="Thank You"]), yt-button-view-model:has(button[aria-label="Show text version"])' +
				'{display: none}', 'rt-hideTrashUnderVideoStyle')
		}

		// Элементы поиска (клавиатура, пожаловаться)
		if (hideSearch) {
			pushCSS(
				'.sbfl_a, .YtSearchboxComponentReportButton, .ytSearchboxComponentReportButton {display: none !important}' +
				'.gsst_a, .YtSearchboxComponentYtdTextInputAssistantWrapper, .ytSearchboxComponentYtdTextInputAssistantWrapper {display: none !important}'
				, 'rt-hideTrashSearchStyle')
		}

		// Выключаем и скрываем Профессиональное освещение (если включена покраска ютуба) в настройках видео
		// Аннотации скрываем выше в css чтобы не было бага с остановкой видео
		waitSelector('.ytp-menuitem').then(() => {
			const panel = document.querySelector('.ytp-popup.ytp-settings-menu .ytp-panel-menu')
			if (RTcolors) {
				Array.from(panel?.children || []).forEach(x => (x.textContent.includes('Профессиональное освещение') || x.textContent.includes('Кінематографічне освітлення')) && x.getAttribute('aria-checked') == "true" && x.click())
				Array.from(panel?.children || []).forEach(x => (x.textContent.includes('Профессиональное освещение') || x.textContent.includes('Кінематографічне освітлення')) && x.remove())
			}

			// Быстро открываем и закрываем настройки видео (чтобы обновился размер элементов)
			const settings = document.querySelector('.ytp-settings-button')
			settings?.click()
			settings?.click()
		})
	}

	function MarkWatchedVideos(mark) {
		if (!mark) {
			document.querySelector('#rt-watchedVideoStyle')?.remove()
			return
		}

		pushCSS(`yt-thumbnail-overlay-progress-bar-view-model, ytd-thumbnail-overlay-resume-playback-renderer {--background-color: ${RTColorWatchedBackground + '80'}}` +
			'ytd-thumbnail-overlay-resume-playback-renderer::after {content: " " !important;top: -280px !important;position: absolute !important;background-color: var(--background-color) !important;padding: 7px !important; width: 100%;height: 10000%; animation: 0.5s show ease;}' +
			`yt-thumbnail-overlay-progress-bar-view-model, ytd-thumbnail-overlay-resume-playback-renderer {--label-color: ${RTColorWatchedLabelBackground + '80'}}` +
			'ytd-thumbnail-overlay-resume-playback-renderer:before {content: "ПРОСМОТРЕНО"; background-color: var(--label-color); top: -112px;font-size: 12px;color: white;position: absolute;z-index: 1;left: 0; margin: 8px;opacity: 1;padding: 4px 5px; border-radius: 9px;font-weight: 500;line-height: 1.2rem; backdrop-filter: blur(4px); animation: 0.5s show ease;}' +
			'ytd-thumbnail-overlay-time-status-renderer {z-index: 1}' +
			'#overlays > ytd-thumbnail-overlay-playback-status-renderer {display: none !important;}' +
			'ytd-expanded-shelf-contents-renderer ytd-thumbnail-overlay-resume-playback-renderer:after, ytd-video-renderer  ytd-thumbnail-overlay-resume-playback-renderer:after {top: -134px !important;width: 232px;height: 120px;}' +
			//'ytd-expanded-shelf-contents-renderer ytd-thumbnail-overlay-resume-playback-renderer:before, ytd-video-renderer ytd-thumbnail-overlay-resume-playback-renderer:before {top: -134px; font-size: 13px;}' +
			'#related ytd-thumbnail-overlay-resume-playback-renderer:after {top: -90px !important;width: 154px; height: 76px;}' +
			'#related ytd-thumbnail-overlay-resume-playback-renderer:before {top: -90px;font-size: 11px; padding: 3px 4px;}' +
			'.style-scope.ytd-grid-video-renderer:hover ytd-thumbnail-overlay-resume-playback-renderer:before, .style-scope.ytd-grid-video-renderer:hover ytd-thumbnail-overlay-resume-playback-renderer:after, div#dismissible.style-scope.ytd-video-renderer:hover ytd-thumbnail-overlay-resume-playback-renderer:after, div#dismissible.style-scope.ytd-video-renderer:hover ytd-thumbnail-overlay-resume-playback-renderer:before, div#dismissible.style-scope.ytd-compact-video-renderer:hover ytd-thumbnail-overlay-resume-playback-renderer:after, div#dismissible.style-scope.ytd-compact-video-renderer:hover ytd-thumbnail-overlay-resume-playback-renderer:before {display: none;}' +
			'.ytrp_rb_bg_bottom {bottom: unset !important; top: 0 !important;}' +
			'html .resume-playback-background, html  .resume-playback-progress-bar, html ytd-thumbnail-overlay-resume-playback-renderer {top: unset !important; bottom: 0 !important;}' +
			'.ytd-playlist-panel-video-renderer ytd-thumbnail-overlay-resume-playback-renderer::after {width: 92px; height: 48px; top: -52px !important; padding: 4px !important;}' +
			'.ytd-playlist-video-renderer ytd-thumbnail-overlay-resume-playback-renderer::after {top: -52px; padding: 4px}' +
			'.ytd-playlist-panel-video-renderer ytd-thumbnail-overlay-resume-playback-renderer::before {top: -52px; font-size: 9px; line-height: 1rem; margin: 4px; padding: 4px;}' +
			'.ytd-playlist-video-renderer ytd-thumbnail-overlay-resume-playback-renderer::before {top: -83px; font-size: 9px; line-height: 1rem; margin: 4px; padding: 4px;}' +
			'.ytd-playlist-panel-video-renderer:hover .ytd-playlist-panel-video-renderer ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-playlist-panel-video-renderer:hover .ytd-playlist-panel-video-renderer ytd-thumbnail-overlay-resume-playback-renderer::after {display: none;}' +
			'.ytd-playlist-video-renderer:hover .ytd-playlist-video-renderer ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-playlist-video-renderer:hover .ytd-playlist-video-renderer ytd-thumbnail-overlay-resume-playback-renderer::after {display: none;}' +
			`yt-thumbnail-view-model ytd-thumbnail-overlay-resume-playback-renderer, .ytd-search ytd-video-renderer ytd-thumbnail-overlay-resume-playback-renderer {--label-color: ${RTColorWatchedLabelBackground + '80'}}` +
			`yt-thumbnail-overlay-progress-bar-view-model::before, yt-thumbnail-view-model ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-search ytd-video-renderer ytd-thumbnail-overlay-resume-playback-renderer::before {content: "ПРОСМОТРЕНО"; top: -95px; background-color: var(--label-color); font-size: 14px; color: white; position: absolute; z-index: 1;left: 2px; opacity: 1; font-weight: 500; line-height: 1.5rem; margin: -65px 10px; padding: 4px 5px; border-radius: 9px; backdrop-filter: blur(4px); animation: 0.5s show ease;}` +
			`yt-thumbnail-view-model ytd-thumbnail-overlay-resume-playback-renderer, .ytd-search ytd-thumbnail-overlay-resume-playback-renderer {--background-color: ${RTColorWatchedBackground + '80'}}` +
			'yt-thumbnail-view-model ytd-thumbnail-overlay-resume-playback-renderer::after, .ytd-search ytd-thumbnail-overlay-resume-playback-renderer::after, yt-thumbnail-overlay-progress-bar-view-model::after {width: 100%;height: 30vh; content: " " !important;top: -28vh !important;position: absolute !important;background-color: var(--background-color) !important;padding: 7px !important; animation: 0.5s show ease;}' +
			'yt-thumbnail-view-model:hover ytd-thumbnail-overlay-resume-playback-renderer::before, yt-thumbnail-view-model:hover ytd-thumbnail-overlay-resume-playback-renderer::after, yt-thumbnail-view-model:hover yt-thumbnail-overlay-progress-bar-view-model::after, yt-thumbnail-view-model:hover yt-thumbnail-overlay-progress-bar-view-model::before {display: none;}' +
			'@keyframes show { from { opacity: 0; } to { opacity: 1; } }'
			, 'rt-watchedVideoStyle')
	}

	function ImproveFont(improve) {
		if (!improve) {
			document.querySelector('#rt-betterFontStyle')?.remove()
			return
		}

		pushCSS('@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"); @font-face {font-family: "Ubuntu Light Custom"; src: url("https://raw.githubusercontent.com/Eject37/ReTube/main/Ubuntu%20Light.woff2") format("woff2")}' +
			'yt-formatted-string.style-scope.ytd-rich-grid-media, span.style-scope.ytd-video-meta-block {font-family: Ubuntu !important; font-weight: 400 !important; font-style: normal !important;}' +
			'span.style-scope.ytd-compact-radio-renderer {font-family: Ubuntu !important; font-weight: 700 !important; font-style: normal !important;}' +

			'ytd-rich-grid-renderer.style-scope.ytd-two-column-browse-results-renderer, ytd-guide-section-renderer.style-scope.ytd-guide-renderer, .button.ytd-text-inline-expander, ' +
			'#title.ytd-structured-description-video-lockup-renderer, #subtitle.ytd-structured-description-video-lockup-renderer, h4.ytd-macro-markers-list-item-renderer, ' +
			'.metadata.ytd-notification-renderer, .metadata-stats.ytd-playlist-byline-renderer, .badge.ytd-badge-supported-renderer, #content-text.ytd-comment-view-model, ' +
			'.yt-content-metadata-view-model-wiz--medium-text .yt-content-metadata-view-model-wiz__metadata-text, .truncated-text-wiz--medium-text, .yt-attribution-view-model-wiz--medium-text .yt-attribution-view-model-wiz__attribution-text, ' +
			'#published-time-text.ytd-comment-view-model, #text.ytd-alert-with-button-renderer, #home-content-text.ytd-post-renderer, .badge-shape-wiz, ' +
			'tp-yt-paper-button, #index.ytd-playlist-video-renderer, .yt-lockup-metadata-view-model-wiz--compact .yt-lockup-metadata-view-model-wiz__title, ' +
			'.yt-content-metadata-view-model-wiz__metadata-text, .yt-list-item-view-model-wiz__container--compact .yt-list-item-view-model-wiz__title-wrapper, ' +
			'#channel-handle.ytd-active-account-header-renderer, ytd-active-account-header-renderer[enable-handles-account-menu-switcher] #account-name.ytd-active-account-header-renderer, ' +
			'.yt-video-attribute-view-model__subtitle, .yt-video-attribute-view-model__secondary-subtitle, .title.reel-player-header-renderer, .ytStorybookReelMultiFromatLinkViewModelLink, ' +
			'ytd-video-meta-block:not([rich-meta]) #byline-container.ytd-video-meta-block, ytd-post-renderer[uses-compact-lockup] #author-text.yt-simple-endpoint.ytd-post-renderer, .YtSearchboxComponentInput, .ytSearchboxComponentInput, ' +
			'#inner-background.ytd-thumbnail-overlay-endorsement-renderer, .yt-content-metadata-view-model__metadata-text {font-family: Ubuntu !important;}' +

			'div.style-scope.ytd-rich-grid-row, .yt-lockup-metadata-view-model-wiz--compact .yt-lockup-metadata-view-model-wiz__title {font-weight: 400 !important;}' +

			'span.style-scope.ytd-comment-renderer, #label.ytd-toggle-theme-compact-link-renderer {font-family: Ubuntu !important; font-weight: 500 !important;}' +

			'yt-formatted-string.style-scope.ytd-toggle-button-renderer.style-default-active {font-family: Ubuntu !important; font-weight: 700 !important;}' +
			'a.yt-simple-endpoint.style-scope.yt-formatted-string, tp-yt-paper-item.style-scope.ytd-guide-entry-renderer, iron-selector.style-scope.ytd-feed-filter-chip-bar-renderer, ' +
			'yt-formatted-string.title.style-scope.ytd-guide-entry-renderer, span.style-scope.ytd-rich-grid-slim-media, yt-formatted-string.style-scope.ytd-video-primary-info-renderer, div.style-scope.ytd-video-primary-info-renderer, ' +
			'div.top-level-buttons.style-scope.ytd-menu-renderer, div.style-scope.ytd-expander, a.yt-simple-endpoint.style-scope.ytd-rich-metadata-renderer, div.style-scope.ytd-rich-metadata-renderer, ' +
			'yt-formatted-string.less-button.style-scope.ytd-video-secondary-info-renderer, span.style-scope.yt-formatted-string, div.style-scope.yt-dropdown-menu, yt-formatted-string.style-scope.ytd-subscribe-button-renderer, ' +
			'yt-formatted-string.style-scope.ytd-button-renderer.style-suggestive.size-default, span.style-scope.ytd-compact-video-renderer, yt-formatted-string.style-scope.ytd-channel-name, ' +
			'yt-formatted-string.style-scope.ytd-button-renderer.style-default.size-default, yt-formatted-string.style-scope.ytd-toggle-button-renderer.style-text, yt-formatted-string.style-scope.yt-chip-cloud-chip-renderer, ' +
			'span.style-scope.ytd-compact-playlist-renderer, yt-formatted-string.message.style-scope.ytd-notification-renderer, yt-formatted-string.style-scope.ytd-simple-menu-header-renderer, ' +
			'yt-formatted-string.style-scope.ytd-compact-link-renderer, yt-formatted-string.style-scope.ytd-c4-tabbed-header-renderer, yt-formatted-string.title.style-scope.ytd-recognition-shelf-renderer, ' +
			'yt-formatted-string.subtitle.style-scope.ytd-recognition-shelf-renderer, span.style-scope.ytd-shelf-renderer, yt-formatted-string.style-scope.ytd-button-renderer.style-text.size-default, ' +
			'a.yt-simple-endpoint.style-scope.ytd-grid-video-renderer, yt-formatted-string.can-be-empty.style-scope.ytd-shelf-renderer, span.style-scope.ytd-grid-video-renderer, span.style-scope.ytd-badge-supported-renderer' +
			'yt-formatted-string.style-scope.ytd-channel-renderer, span.style-scope.ytd-channel-renderer, div.tab-content.style-scope.tp-yt-paper-tab, yt-formatted-string.style-scope.ytd-channel-about-metadata-renderer, ' +
			'yt-formatted-string.subheadline.style-scope.ytd-channel-about-metadata-renderer, div.style-scope.ytd-c4-tabbed-header-renderer, div.banner-visible-area.style-scope.ytd-c4-tabbed-header-renderer, ' +
			'ytd-browse.style-scope.ytd-page-manager, #search-input input, span.style-scope.ytd-rich-shelf-renderer, div span b, div div b, div.sbsb_a, span.sbpqs_a, li.sbsb_c.gsfs, ' +
			'yt-formatted-string.style-scope.ytd-reel-player-header-renderer, yt-formatted-string.style-scope.ytd-button-renderer, yt-formatted-string.style-scope.ytd-comment-renderer, div.style-scope.yt-formatted-string, ' +
			'div.style-scope.ytd-watch-flexy, yt-formatted-string.more-button.style-scope.ytd-video-secondary-info-renderer, yt-formatted-string.style-scope.ytd-sponsorships-tier-renderer, ' +
			'yt-formatted-string.style-scope.ytd-sponsorships-offer-renderer, div.scrollable.style-scope.tp-yt-paper-dialog-scrollable, yt-formatted-string.style-scope.ytd-sponsorships-perk-renderer, ' +
			'div.header.style-scope.ytd-playlist-panel-renderer, yt-formatted-string.title.style-scope.ytd-playlist-panel-renderer, yt-formatted-string.publisher.style-scope.ytd-playlist-panel-renderer, ' +
			'span.style-scope.ytd-playlist-panel-video-renderer, button.style-scope.yt-icon-button, yt-formatted-string.style-scope.ytd-button-renderer.style-primary.size-default, span.view-count.style-scope.ytd-video-view-count-renderer, ' +
			'yt-formatted-string.style-scope.ytd-video-owner-renderer, button.ytp-button.ytp-settings-button.ytp-hd-quality-badge, div.ytp-bezel-text-wrapper, span.ytp-time-duration, span.ytp-time-current, span.ytp-time-remaining-duration, ' +
			'div.ytp-left-controls, span.ytp-time-separator, a.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer, div.ytp-chapter-title-content, span.ytp-time-display.notranslate, a.yt-simple-endpoint.style-scope.ytd-video-renderer, ' +
			'yt-formatted-string.style-scope.ytd-video-renderer, a.yt-simple-endpoint.style-scope.ytd-grid-playlist-renderer, span.ytp-caption-segment, a.ytp-title-link.yt-uix-sessionlink.ytp-title-fullerscreen-link, div.ytp-menuitem-label, ' +
			'#simplebox-placeholder.ytd-comment-simplebox-renderer, #label.ytd-playlist-add-to-option-renderer, .ytd-menu-title-renderer, #rt-videoCount, #content.ytd-channel-tagline-renderer, #first-link.ytd-channel-header-links-view-model, ' +
			'#more.ytd-channel-header-links-view-model, .yt-spec-button-shape-next--call-to-action-inverse.yt-spec-button-shape-next--text, .yt-attribution-view-model-wiz--medium-text .yt-attribution-view-model-wiz__suffix, ' +
			'.YtSuggestionComponentBold, .yt-lockup-metadata-view-model-wiz--standard .yt-lockup-metadata-view-model-wiz__title, .yt-lockup-metadata-view-model__title, .yt-lockup-metadata-view-model__title' +
			'{font-family: "Ubuntu" !important; font-weight: 400 !important;}' +

			'.tp-yt-paper-tooltip[style-target=tooltip] {font-size: 1.35rem !important}' +
			'.ytp-tooltip {font-size: 125% !important}' +

			'.yt-spec-button-shape-next, yt-formatted-string.ytd-menu-service-item-renderer, ytd-text-inline-expander, ytd-rich-list-header-renderer[is-modern-sd] #title.ytd-rich-list-header-renderer, ' +
			'#time.ytd-macro-markers-list-item-renderer, #title.ytd-video-description-infocards-section-renderer, #subtitle.ytd-video-description-infocards-section-renderer, ' +
			'#guide-section-title.ytd-guide-section-renderer, .title.ytd-mini-guide-entry-renderer, .ytp-tooltip, .tp-yt-paper-tooltip[style-target=tooltip], ' +
			'#message.yt-live-chat-viewer-engagement-message-renderer, html, .animated-rolling-number-wiz, #video-title.ytd-reel-item-renderer, .html5-video-player, tp-yt-paper-toast.yt-notification-action-renderer, ' +
			'.truncated-text-wiz--medium-text .truncated-text-wiz__absolute-button, yt-formatted-string.ytd-menu-service-item-download-renderer, ' +
			'.more-button.ytd-comment-view-model, .less-button.ytd-comment-view-model, .YtChipShapeChip, ytd-thumbnail-overlay-bottom-panel-renderer, ' +
			'ytd-thumbnail-overlay-toggle-button-renderer[use-expandable-tooltip] #label.ytd-thumbnail-overlay-toggle-button-renderer, .ShortsLockupViewModelHostOutsideMetadataTitle,' +
			'ytd-thumbnail-overlay-hover-text-renderer, .ytChipShapeChip, .shortsLockupViewModelHostOutsideMetadataTitle, .shortsLockupViewModelHostMetadataSubhead,' +
			'.ytChipShapeText, .yt-tab-shape-wiz__tab, .animatedRollingNumberHost, .yt-list-item-view-model__title, .yt-badge-shape, .yt-tab-shape__tab {font-family: "Ubuntu Light Custom" !important}' +

			'ytd-watch-metadata[title-headline-xs] h1.ytd-watch-metadata {font-family: "YouTube Sans"; font-weight: 600}'
			, 'rt-betterFontStyle')
	}

	function DateTimeCreated(showDate, style2) {
		const FEATURE = 'videoDateCreated'
		cleanupFeature(FEATURE);

		// Удаление старых элементов и стилей
		['.video-date', '#dateVideoStyle', '#dateVideoStyle2'].forEach(selector => document.querySelector(selector)?.remove());
		removeEmptyTitleBadgeHost()

		if (!showDate || currentPage() != 'watch') return
		startFeature(FEATURE)
		addFeatureCleanup(FEATURE, () => {
			['.video-date', '#dateVideoStyle', '#dateVideoStyle2'].forEach(selector => document.querySelector(selector)?.remove())
			removeEmptyTitleBadgeHost()
		})

		const requestedVideoId = getVideoId()
		GetVideoDate(requestedVideoId).then(videoDate => {
			waitWatchTitleTarget().then(el => {
				if (!featureActive(FEATURE) || !el || requestedVideoId !== getVideoId()) return
				document.querySelector('.video-date')?.remove()

				const label = document.createElement('span')
				label.classList.add('video-date')
				label.style.order = '10'
				label.textContent = videoDate?.text || videoDate

				if (!document.querySelector('#dateVideoStyle')) {
					pushCSS('.video-date {border-radius: 18px; padding-inline: 7px; white-space: nowrap; height: 23px; line-height: 23px; font-size: 14px !important; font-weight: 500; display: inline-flex; align-items: center; background-color: var(--yt-spec-button-chip-background-hover); animation: 1s show ease} @keyframes show { from { opacity: 0; } to { opacity: 1; } }', 'dateVideoStyle')
					if (style2) {
						pushCSS('.video-date {background-color: var(--yt-spec-base-background); filter: drop-shadow(0 0 1px rgb(201 208 211))}', 'dateVideoStyle2')
					}
				}
				getWatchTitleBadgeHost()?.appendChild(label)
			})
		})

		async function GetVideoDate(videoId, retries = 0) {
			if (!videoId) return 'Не удалось определить видео';
			const cacheKey = 'videoDates';

			const cachedDates = safeParseJSON(localStorage.getItem(cacheKey), {});
			let fallbackDateText = null
			if (cachedDates[videoId]) {
				const cached = cachedDates[videoId]
				if (typeof cached === 'string') {
					fallbackDateText = cached
					const cachedIso = safeParseJSON(localStorage.getItem('videoPublishedISO'), {})?.[videoId]
					if (cachedIso) return Promise.resolve({ text: buildPublishedText(cachedIso, cached), iso: cachedIso })
				}
				if (cached?.text && cached?.iso) {
					return Promise.resolve({
						text: buildPublishedText(cached.iso, cached.text.split(' • ')[0]),
						iso: cached.iso
					})
				}
			}

			if (noValidApiKeys) return fallbackDateText ? buildPublishedText(null, fallbackDateText) : 'API ключи закончились';
			const apiKey = await ApiKey()
			if (!apiKey) return fallbackDateText ? buildPublishedText(null, fallbackDateText) : 'API ключи закончились'
			const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

			return fetch(apiUrl).then(response => response.json()).then(json => {
				if (!json.items?.[0]) throw new Error(`Пустой ответ API (items: ${JSON.stringify(json.items)}, error: ${JSON.stringify(json.error)})`)
				const iso = json.items[0].snippet.publishedAt
				const dateCreated = new Date(iso).toLocaleString('ru-RU', {
					day: 'numeric',
					month: 'numeric',
					year: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
					hour12: false,
				}).replace(',', '')
				const result = { text: buildPublishedText(iso, dateCreated), iso }

				cachedDates[videoId] = result;
				localStorage.setItem(cacheKey, JSON.stringify(cachedDates));
				const cachedISO = safeParseJSON(localStorage.getItem('videoPublishedISO'), {})
				cachedISO[videoId] = iso
				localStorage.setItem('videoPublishedISO', JSON.stringify(cachedISO))
				return result;
			}).catch(e => {
				console.warn('ReTube GetVideoDate error:', e)
				if (retries >= 3) return fallbackDateText ? buildPublishedText(null, fallbackDateText) : 'Ошибка API';
				CleanApiKeys();
				return GetVideoDate(videoId, retries + 1);
			})
		}
	}
	function EnableDateTimeCreated(enabled, style2) {
		const FEATURE = 'videoDateCreatedNav'
		cleanupFeature(FEATURE)
		DateTimeCreated(false)
		if (!enabled) return
		startFeature(FEATURE)
		addFeatureCleanup(FEATURE, () => DateTimeCreated(false))
		addFeatureCleanup(FEATURE, finishEvent(() => DateTimeCreated(true, style2)))
	}

	function ShowVideoCountOnChannel() {
		document.querySelector('#rt-videoCount')?.remove()
		if (currentPage() != 'watch') return;

		GetVideosCount().then(count => {
			waitSelector('#upload-info #owner-sub-count, ytm-slim-owner-renderer .subhead', { stop_on_page_change: true }).then(el => {
				if (!featureActive('showVideoCountOnChannel') || !el) return
				document.querySelector('#rt-videoCount')?.remove()
				el.insertAdjacentHTML('beforeend',
					`<span class="date style-scope ytd-video-secondary-info-renderer" style="margin-right:5px;" id="rt-videoCount"> • <span>${count}</span> видео</span>`);
			})
		})

		async function GetVideosCount(retries = 0) {
			await new Promise(resolve => setTimeout(resolve, 500)) // Задержка что бы на странице успел обновиться channelId
			if (noValidApiKeys) return 'API ключи закончились';

			const channelId = await getChannelId();
			if (!channelId) return 'Канал не найден';
			const cacheKey = 'videoCounts';

			const cachedCounts = safeParseJSON(localStorage.getItem(cacheKey), {});
			if (cachedCounts[channelId]) return Promise.resolve(cachedCounts[channelId]);

			const apiKey = await ApiKey()
			if (!apiKey) return 'API ключи закончились'
			const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

			return fetch(apiUrl).then(response => response.json()).then(json => {
				if (!json.items?.[0]) throw new Error(`Пустой ответ API (items: ${JSON.stringify(json.items)}, error: ${JSON.stringify(json.error)})`)
				const videoCount = json.items[0].statistics.videoCount;

				cachedCounts[channelId] = videoCount;
				localStorage.setItem(cacheKey, JSON.stringify(cachedCounts));
				return videoCount;
			}).catch(e => {
				console.warn('ReTube GetVideosCount error:', e)
				if (retries >= 3) return 'Ошибка API';
				CleanApiKeys();
				return GetVideosCount(retries + 1);
			})
		}
	}
	function EnableVideoCountOnChannel(enabled) {
		const FEATURE = 'showVideoCountOnChannel'
		cleanupFeature(FEATURE)
		document.querySelector('#rt-videoCount')?.remove()
		if (!enabled) return
		startFeature(FEATURE)
		addFeatureCleanup(FEATURE, () => document.querySelector('#rt-videoCount')?.remove())
		addFeatureCleanup(FEATURE, finishEvent(() => ShowVideoCountOnChannel()))
	}

	function FocusAndScrollFix(fix) {
		const FEATURE = 'focusFix'
		const playerSelector = 'video.video-stream.html5-main-video'
		if (!fix) {
			cleanupFeature(FEATURE)
			return
		}
		if (!startFeature(FEATURE)) return

		playerHoverHandler = PlayerHover
		waitSelector(playerSelector).then(player => {
			if (!featureActive(FEATURE) || !player) return
			addFeatureEvent(FEATURE, player, 'mouseenter', playerHoverHandler)
		})

		async function PlayerHover(evt) {
			if (currentPage() != 'watch' || isScrolling || document.querySelector('.ytSearchboxComponentInputBoxHasFocus') || (evt.relatedTarget instanceof Element && evt.relatedTarget.matches('.ytp-caption-segment'))) return;
			isScrolling = true
			wheel = false

			function WheelFix(e) {
				if (e.deltaY > 0) {
					wheel = true
					document.removeEventListener('wheel', WheelFix)
				}
			}
			addFeatureEvent(FEATURE, document, 'wheel', WheelFix)

			const easingFn = t => 1 - (1 - t) * (1 - t)

			const scrollToTop = async () => {
				const scrollTop = document.documentElement.scrollTop
				if (scrollTop > 0 && !wheel) {
					const progress = scrollTop / 1000;
					const easingValue = easingFn(progress)

					const scrollDistance = easingValue * 25;
					window.scrollTo(0, scrollTop - scrollDistance)
					window.requestAnimationFrame(scrollToTop)
				}
			}
			scrollToTop()

			isScrolling = false

			while (document.documentElement.scrollTop != 0) {
				await Delay(25)
			}
			document.querySelector(playerSelector)?.focus()
			document.removeEventListener('wheel', WheelFix)
		}
	}

	function RemoveNotificationNumber() {
		const FEATURE = 'notificationsRemove'
		if (!startFeature(FEATURE)) return
		try {
			const target = document.querySelector('head > title') || document.head
			if (!target) {
				cleanupFeature(FEATURE)
				return
			}
			document.title = document.title.replace(/^\(\d+\)\s*/, "");
			addFeatureObserver(FEATURE, target, { childList: true, subtree: true, characterData: true }, mutations => {
				mutations.forEach(mutation => {
					if (mutation.type === 'childList' || mutation.type === 'characterData') {
						if (document.title.match(/^\(\d+\)\s*/)) {
							document.title = document.title.replace(/^\(\d+\)\s*/, "");
						}
					}
				});
			});
		} catch (e) {
			console.error(e);
		}
	}

	function CustomIcon(custom, color) {
		document.querySelector('#rt-titleIcon')?.remove()
		const link = document.createElement('link')
		link.rel = 'icon'

		let customIconColor = color == 'blue' ? 'https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico' : 'https://github.com/Eject37/ReTube/raw/main/Gray6.ico'
		link.href = custom ? customIconColor : 'https://www.youtube.com/s/desktop/79c80fdc/img/favicon.ico'
		if (custom) link.id = 'rt-titleIcon'
		document.querySelector('head').appendChild(link)
	}

	function ReturnDislikes() {
		const FEATURE = 'returnDislikes'
		if (!startFeature(FEATURE)) return
		const CACHE_PREFIX = 'retube-dislikes-count:', SELECTOR_ID = 'retube-dislikes-count', BAR_ID = 'retube-like-dislike-bar';
		const LIKE_BUTTON_SELECTOR = '#actions like-button-view-model button, #segmented-like-button button, ytd-segmented-like-dislike-button-renderer #segmented-like-button button'
		const DISLIKE_BUTTON_SELECTOR = '#actions dislike-button-view-model button, #segmented-dislike-button button, ytd-segmented-like-dislike-button-renderer #segmented-dislike-button button'
		addFeatureCleanup(FEATURE, () => {
			document.getElementById(SELECTOR_ID)?.remove()
			document.getElementById(BAR_ID)?.remove()
		})

		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(async () => {
			if (currentPage() !== 'watch') return;
			await Delay(1000);
			waitSelector(DISLIKE_BUTTON_SELECTOR, { stop_on_page_change: true }).then(setDislikeCount);
		}));

		async function setDislikeCount(container) {
			if (!featureActive(FEATURE) || !container) return
			const videoId = getVideoId();
			if (!videoId) return console.error('return-dislike videoId: empty', videoId);

			container.style.width = 'auto'; // fix width

			let dislikeData = safeParseJSON(localStorage.getItem(CACHE_PREFIX + videoId), null);
			if (!dislikeData) {
				dislikeData = await getDislikeCount(videoId);
				if (dislikeData) {
					localStorage.setItem(CACHE_PREFIX + videoId, JSON.stringify(dislikeData));
				}
			}

			if (dislikeData) {
				insertToHTML(dislikeData, container);
				insertLikeBar(dislikeData);
			}
			else return;

			document.querySelectorAll(`${DISLIKE_BUTTON_SELECTOR}, ${LIKE_BUTTON_SELECTOR}`)
				.forEach(button => {
					addFeatureEvent(FEATURE, button, 'focusout', async () => {
						await Delay(500);
						insertToHTML({ dislikes: dislikeData.dislikes }, container);
					});
				});
		}

		async function getDislikeCount(videoId) {
			try {
				const response = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`);
				const json = await response.json();
				return json.dislikes != null ? { likes: Number(json.likes) || 0, dislikes: Number(json.dislikes) || 0 } : null;
			} catch (error) {
				console.error('Error fetching dislike count:', error);
				return null;
			}
		}

		function insertToHTML(data, container) {
			if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);

			const dislikeCount = container.getAttribute("aria-pressed") === 'true' ? data.dislikes + 1 : data.dislikes;
			const dislikeText = FormatDislikeCount(dislikeCount);

			let countElement = document.getElementById(SELECTOR_ID);
			if (!countElement) {
				container.insertAdjacentHTML('beforeend', `<span id="${SELECTOR_ID}" style="text-overflow:ellipsis; overflow:visible; white-space:nowrap; padding-left:3px;">${dislikeText}</span>`);
				countElement = document.getElementById(SELECTOR_ID);
			}

			countElement.textContent = dislikeText;
			container.title = dislikeText;
			const icon = container.querySelector('.yt-spec-button-shape-next__icon')
			if (icon) icon.style.marginRight = '3px';
		}

		function insertLikeBar(data) {
			document.getElementById(BAR_ID)?.remove();
			const total = data.likes + data.dislikes;
			if (total === 0) return;
			const likePercent = Math.round((data.likes / total) * 100);
			const segmentedButtons = document.querySelector('#actions ytd-segmented-like-dislike-button-view-model, #actions ytd-segmented-like-dislike-button-renderer, ytd-segmented-like-dislike-button-view-model, ytd-segmented-like-dislike-button-renderer');
			if (!segmentedButtons) return;
			const bar = document.createElement('div');
			bar.id = BAR_ID;
			bar.title = `${likePercent}% лайков`;
			bar.style.cssText = 'height:3px; border-radius:2px; margin-top:2px; overflow:hidden; display:flex; background:rgba(255,255,255,0.15);';
			bar.innerHTML = safeHTML(`<div style="width:${likePercent}%; background:#3ea6ff; border-radius:2px 0 0 2px"></div><div style="width:${100 - likePercent}%; background:rgba(255,255,255,0.15); border-radius:0 2px 2px 0"></div>`);
			segmentedButtons.appendChild(bar);
		}

		function FormatDislikeCount(count) {
			return Intl.NumberFormat(userLanguage, {
				notation: "compact",
				compactDisplay: "short",
			}).format(roundDown(count));
		}
	}

	function FullVideoNames(enable) {
		if (!enable) {
			document.querySelector('#rt-fullVideoNamesStyle')?.remove()
			return
		}

		pushCSS('#video-title.yt-simple-endpoint.ytd-grid-video-renderer, ' +
			'#video-title.ytd-compact-video-renderer, ' +
			'ytd-compact-video-renderer.use-ellipsis #video-title.ytd-compact-video-renderer {max-height: unset !important; -webkit-line-clamp: unset !important; word-wrap: break-word !important}' +

			'#video-title.ytd-video-renderer {max-height: unset !important; line-height: 2rem !important}' + // Страница истории
			'#metadata-line.ytd-grid-video-renderer {max-height: unset !important}' + // Чтобы полностью было видно фразу 'Трансляция закончилась N часа назад'
			'.ytp-videowall-still-info-title {max-height: unset !important}' + // Чтобы было видно весь текст на плитках в конце видео при наведении

			'.ytp-videowall-still-info-content {background-image: -moz-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important; background-image: -ms-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important; background-image: -o-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important; background-image: -webkit-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important; background-image: linear-gradient(to bottom,rgba(12,12,12,0.8) 0,transparent 200px) !important}' + // Темный фон для текста элементов плитки, которая показывается в конце видео (мы его начали показывать целиком в коде выше)
			'#video-title.ytd-playlist-panel-video-renderer {max-height: unset !important; -webkit-line-clamp: unset !important}' + // Для плейлистов
			'ytd-playlist-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {top: -66px; font-size: 9px}' + // Для плейлистов
			'#video-title.ytd-rich-grid-video-renderer, .yt-lockup-metadata-view-model__title {max-height: unset !important; overflow: unset !important; -webkit-line-clamp: unset !important}' + // Для нового дизайна главной страницы
			'#video-title.ytd-rich-grid-media {-webkit-line-clamp: unset !important; max-height: unset !important}' + // Для главной страницы с рекомендациями
			'h4.ytd-macro-markers-list-item-renderer {max-height: unset !important; -webkit-line-clamp: unset !important}' // Отображение заголовка целиком в списке участков видео
			, 'rt-fullVideoNamesStyle')
	}

	function StopChannelTrailer() {
		const FEATURE = 'stopChannelTrailer'
		if (!startFeature(FEATURE)) return
		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(() => {
			waitSelector('#c4-player.playing-mode', { stop_on_page_change: true }).then(player => player?.stopVideo?.())
		}))
	}

	function RemainingTime() {
		const FEATURE = 'remainingTime'
		if (!startFeature(FEATURE)) return
		const SELECTOR_ID = 'retube-player-time-remaining'
		const sbCache = {} // videoId -> segments[]
		let lastVideoId = null
		addFeatureCleanup(FEATURE, () => document.getElementById(SELECTOR_ID)?.remove())

		async function fetchSBSegments(videoId) {
			if (sbCache[videoId] !== undefined) return sbCache[videoId]
			try {
				const resp = await fetch(`https://sponsor.ajay.app/api/skipSegments?videoID=${videoId}&categories=["sponsor","selfpromo","interaction","intro","outro","music_offtopic"]`)
				if (!resp.ok) { sbCache[videoId] = []; return [] }
				const data = await resp.json()
				sbCache[videoId] = data.map(s => ({ start: s.segment[0], end: s.segment[1] }))
				return sbCache[videoId]
			} catch { sbCache[videoId] = []; return [] }
		}

		function getRemainingSkipTime(segments, currentTime, duration) {
			let skipTime = 0
			for (const seg of segments) {
				const start = Math.max(seg.start, currentTime)
				const end = Math.min(seg.end, duration)
				if (start < end) skipTime += end - start
			}
			return skipTime
		}

		waitSelector('.ytp-time-duration, ytm-time-display .time-display-content').then(container => {
			waitSelector('video').then(video => {
				if (!featureActive(FEATURE) || !container || !video) return
				const setRemainingHandler = setRemaining.bind(video)
				addFeatureEvent(FEATURE, video, 'timeupdate', setRemainingHandler)
				addFeatureEvent(FEATURE, video, 'ratechange', setRemainingHandler)
				addFeatureEvent(FEATURE, video, 'ended', () => insertToHTML({ 'container': container }))
				addFeatureEvent(FEATURE, document, 'yt-navigate-finish', () => {
					lastVideoId = null
					insertToHTML({ 'container': container })
				})
			});
			function setRemaining() {
				const player = getMoviePlayer()
				if (isNaN(this.duration)
					|| isPlayerLive(player)
					|| (currentPage() == 'embed' && window.self.location.href.includes('live_stream'))
					|| document.visibilityState == 'hidden'
					|| player?.classList.contains('ytp-autohide')
				) return;

				const videoId = getVideoId()
				if (videoId && videoId !== lastVideoId) {
					lastVideoId = videoId
					fetchSBSegments(videoId)
				}

				const segments = (videoId && sbCache[videoId]) || []
				const skipTime = getRemainingSkipTime(segments, this.currentTime, this.duration)
				const remaining = (this.duration - this.currentTime - skipTime) / this.playbackRate

				const text = '-' + timeFormat(Math.max(0, remaining))

				if (text) {
					insertToHTML({ 'text': text, 'container': container })
				}
			}
			function insertToHTML({ text = '', container }) {
				if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
				(document.getElementById(SELECTOR_ID) || (function () {
					container.insertAdjacentHTML('afterend', `&nbsp;<span id="${SELECTOR_ID}">${text}</span>`)
					return document.getElementById(SELECTOR_ID)
				})())
					.textContent = text
			}
		})
	}

	function RememberTime() {
		const FEATURE = 'rememberTime'
		if (!navigator.cookieEnabled && currentPage() == 'embed') return;
		if (!startFeature(FEATURE)) return

		const getCacheName = () => `retube-resume-playback-time:${getVideoId()}`
		let cacheName

		waitSelector('video').then(video => {
			if (!featureActive(FEATURE) || !video) return
			cacheName = getCacheName()
			resumePlayback.apply(video)
			addFeatureEvent(FEATURE, video, 'loadeddata', resumePlayback.bind(video))
			addFeatureEvent(FEATURE, video, 'timeupdate', savePlayback.bind(video))
			addFeatureEvent(FEATURE, video, 'ended', () => GM_setValue(cacheName, ''))
		})
		function savePlayback() {
			const moviePlayer = document.querySelector('#movie_player');
			if (!moviePlayer || moviePlayer.classList.contains('ad-showing') || this.duration < 30) return;

			this.currentTime > 15 ? GM_setValue(cacheName, String(~~this.currentTime)) : GM_setValue(cacheName, '');
		}
		async function resumePlayback() {
			if (new URLSearchParams(location.search).has('t')) return;

			cacheName = getCacheName()
			let time;
			const saved = await GM_getValue(cacheName);
			if ((time = +saved) && (time < (this.duration - 1))) {
				this.currentTime = time;
				showOSD(`Восстановлено: ${timeFormat(time)}`);
			}
		}
	}

	function VideoQuality() {
		const FEATURE = 'videoQuality'
		if (!startFeature(FEATURE)) return
		let selectedQuality = RTSelectVideoQuality

		const qualityFormatListWidth = {
			highres: 4320,
			hd2880: 2880,
			hd2160: 2160,
			hd1440: 1440,
			hd1080: 1080,
			hd720: 720,
			large: 480,
			medium: 360,
			small: 240,
			tiny: 144,
		}

		waitSelector('#movie_player').then(moviePlayer => {
			if (!featureActive(FEATURE) || !moviePlayer) return
			// keep save manual quality in the session
			if (currentPage() == 'watch') {
				addFeatureEvent(FEATURE, moviePlayer, 'onPlaybackQualityChange', quality => {
					if (document.activeElement?.getAttribute('role') == 'menuitemradio' && quality !== selectedQuality) {
						console.info(`Запоминаем качество "${quality}" для текущей сессии`)
						selectedQuality = quality
					}
				})
			}
			setQuality(null, moviePlayer)
			addFeatureEvent(FEATURE, moviePlayer, 'onStateChange', state => setQuality(state, moviePlayer))
		})

		async function setQuality(state, moviePlayer = getMoviePlayer()) {
			if (!selectedQuality) return console.error('selectedQuality unavailable', selectedQuality);
			if (!moviePlayer) return
			if ((state == null || 1 == state || 3 == state) && !setQuality.quality_lock) {
				setQuality.quality_lock = true;
				let availableQualityLevels;

				await waitUntil(() => typeof moviePlayer.getAvailableQualityLevels === 'function' && (availableQualityLevels = moviePlayer.getAvailableQualityLevels()) && availableQualityLevels.length, 50, 5000); // 50ms
				if (!availableQualityLevels?.length) {
					setQuality.quality_lock = false
					return
				}

				availableQualityLevels = availableQualityLevels.filter(i => qualityFormatListWidth[i]);
				if (!availableQualityLevels.length) {
					setQuality.quality_lock = false
					return
				}

				const availableQualityIdx = function () {
					let i = availableQualityLevels.indexOf(selectedQuality);
					if (i === -1) {
						const availableQuality = Object.keys(qualityFormatListWidth).filter(v => availableQualityLevels.includes(v) || (v == selectedQuality)),
							nearestQualityIdx = availableQuality.findIndex(q => q === selectedQuality) - 1
						i = availableQualityLevels[nearestQualityIdx] ? nearestQualityIdx : 0
					}
					return i
				}();

				const newQuality = availableQualityLevels[availableQualityIdx]

				if (typeof moviePlayer.setPlaybackQuality === 'function') {
					moviePlayer.setPlaybackQuality(newQuality)
				}
				if (typeof moviePlayer.setPlaybackQualityRange === 'function') {
					moviePlayer.setPlaybackQualityRange(newQuality, newQuality)
				}
			}
			else if (state <= 0) {
				setQuality.quality_lock = false
			}
		}
	}

	function FixChannelLinks() {
		const FEATURE = 'fixChannelLinks'
		if (!startFeature(FEATURE)) return
		addFeatureEvent(FEATURE, document, 'click', evt => patchLink(evt), { capture: true });
		addFeatureEvent(FEATURE, document, 'auxclick', evt => evt.button === 1 && patchLink(evt), { capture: true }); // mouse middle click

		function patchLink(evt) {
			let link, data, res;
			if (evt.isTrusted && currentPage() == "watch" && evt.target.closest('#channel-name') && (link = evt.target.closest('a'))) {
				if ((data = evt.target.closest('ytd-compact-video-renderer, ytd-video-meta-block')?.data) && (res = SearchInObjectByKey({
					'obj': data,
					'keys': 'navigationEndpoint',
					'match_fn': val => {
						return val?.commandMetadata?.webCommandMetadata?.webPageType == 'WEB_PAGE_TYPE_CHANNEL';
					},
				})?.data)
				) {
					const urlOrigData = link.data, urlOrig = link.href;

					link.data = res;
					link.href = link.data.commandMetadata.webCommandMetadata.url += '/videos';

					evt.target.addEventListener('mouseout', () => {
						link.data = urlOrigData;
						link.href = urlOrig;
					}, { capture: true, once: true });
				}
			}
		}
	}

	function ShowTranslationTime() {
		const FEATURE = 'showTranslationTime'
		if (!startFeature(FEATURE)) return
		addFeatureCleanup(FEATURE, () => {
			document.querySelector('#rt-translationTimeStyle')?.remove()
			document.querySelector('#rt-translationTimeStyle2')?.remove()
		})
		waitSelector('#movie_player video').then(video => {
			if (!featureActive(FEATURE) || !video) return
			addFeatureEvent(FEATURE, video, 'canplay', function () {
				const player = getMoviePlayer()
				if (isPlayerLive(player)) {
					pushCSS('#movie_player .ytp-chrome-controls .ytp-time-display.ytp-live {display: flex !important}', 'rt-translationTimeStyle')
					pushCSS('#movie_player .ytp-chrome-controls .ytp-live .ytp-time-current {display: block !important; margin-right: 5px;}', 'rt-translationTimeStyle2')
				}
				else {
					document.querySelector('#rt-translationTimeStyle')?.remove()
					document.querySelector('#rt-translationTimeStyle2')?.remove()
				}
			})

		})
	}

	function DisableSleep() {
		const FEATURE = 'disablePlayerSleep'
		if (!startFeature(FEATURE)) return
		setFeatureInterval(FEATURE, () => {
			const video = document.querySelector('video.video-stream')
			if (!document.hasFocus() && video && !video.paused) {
				document.dispatchEvent(
					new KeyboardEvent(
						'keyup',
						{
							keyCode: 143,
							which: 143,
							bubbles: true,
							cancelable: true,
						}
					)
				);
			}
		}, 1000 * 60 * 5); // 5 min
	}

	function HotkeysAlwaysActive() {
		const FEATURE = 'hotkeysAlwaysActive'
		if (!startFeature(FEATURE)) return
		let cachedMode = "";
		addFeatureEvent(FEATURE, document, "keydown", function onEvent(e) {
			if (currentPage() != 'watch' || e.code !== "Space" || document.querySelector('.CodeMirror-focused')) return;

			let ae = document.activeElement;
			if (ae.tagName.toLowerCase() == "input" || ae.hasAttribute("contenteditable")) return;

			let player = document.querySelector(".html5-video-player");
			if (player.classList.contains("paused-mode")) cachedMode = "paused-mode";
			if (player.classList.contains("playing-mode")) cachedMode = "playing-mode";
			if (player.classList.contains("ended-mode")) cachedMode = "ended-mode";

			setTimeout(() => {
				let player = document.querySelector(".html5-video-player");
				if (player.classList.contains(cachedMode)) {
					getMoviePlayer()?.focus({ preventScroll: true })
					document.querySelector("button.ytp-play-button")?.click();
					cachedMode = "";
				}
			}, 200);
		});

		addFeatureEvent(FEATURE, document, 'keyup', e => currentPage() == 'watch' && setFocus(e.target))
		addFeatureEvent(FEATURE, document, 'click', e => currentPage() == 'watch' && e.isTrusted && setFocus(e.target))
		function setFocus(target) {
			try {
				if (['input', 'textarea', 'select'].includes(target.localName) || target.isContentEditable || (target.classList.length > 0 && target.classList[0]?.includes('CodeMirror'))) return;
				getMoviePlayer()?.focus({ preventScroll: true })
			} catch { }
		}
	}

	function ScrollVolume() {
		const FEATURE = 'scrollVolume'
		if (!startFeature(FEATURE)) return
		waitSelector('#movie_player video').then(() => {
			waitSelector('.html5-video-container').then(container => {
				if (!featureActive(FEATURE) || !container) return
				addFeatureEvent(FEATURE, container, 'wheel', evt => {
					if (!evt.shiftKey) return;

					const moviePlayer = getMoviePlayer()
					if (!moviePlayer || typeof moviePlayer.getVolume !== 'function' || typeof moviePlayer.setVolume !== 'function') return
					const dir = (evt.deltaY > 0 ? -1 : 1) * 1
					const vol = Math.max(Math.min(Math.round(moviePlayer.getVolume()) + 1 * dir, 100), 0)
					vol > 0 && moviePlayer.isMuted?.() && moviePlayer.unMute?.()
					moviePlayer.setVolume(vol)

					let currentVideoVolume = moviePlayer.getVolume()
					showOSD(currentVideoVolume + '%');

					let obj = {
						"data": JSON.stringify({ "volume": currentVideoVolume, "muted": false }),
						"expiration": 17125032379999,
						"creation": Date.now()
					};

					localStorage.setItem("yt-player-volume", JSON.stringify(obj));
					sessionStorage.setItem("yt-player-volume", JSON.stringify(obj));

					evt.preventDefault();
					evt.stopImmediatePropagation();
				}, { capture: true });
			});
		})
	}

	function MiddleClickSearch() {
		const FEATURE = 'middleClickSearch'
		if (!startFeature(FEATURE)) return
		const inputText = () => document.querySelector('.YtSearchboxComponentInput, .ytSearchboxComponentInput, input.ytd-searchbox')?.value.trim() || ''
		const searchButton = '.YtSearchboxComponentSearchButton, .ytSearchboxComponentSearchButton, #search-icon-legacy'
		const searchSuggestion = '.sbsb_c.gsfs:not(.done), .YtSearchboxComponentSuggestionsContainer > .YtSuggestionComponentSuggestion:not(.done), .ytSearchboxComponentSuggestionsContainer > .ytSuggestionComponentSuggestion:not(.done)'
		const suggestionText = '.ytSuggestionComponentText'
		suggEl()

		waitSelector(searchButton).then(btn => {
			if (!featureActive(FEATURE) || !btn) return
			addFeatureEvent(FEATURE, btn, 'mousedown', e => {
				if (e.button === 1) {
					e.preventDefault()
				}
			})

			addFeatureEvent(FEATURE, btn, 'auxclick', e => {
				if (e.button !== 1) return;

				e.preventDefault()
				e.stopImmediatePropagation()

				const queryValue = inputText()
				if (!queryValue) return;
				GM_openInTab(`${location.origin}/results?search_query=${encodeURIComponent(queryValue).replace(/%20/gu, '+')}`, true)
			})
		})

		function suggEl() {
			if (!featureActive(FEATURE)) return
			waitSelector(searchSuggestion, { stop_on_page_change: true }).then(el => {
				if (!featureActive(FEATURE) || !el) return
				el.classList.add('done')

				addFeatureEvent(FEATURE, el, 'mousedown', e => {
					if (e.button != 1) return;

					e.preventDefault()
					e.stopImmediatePropagation()
				}, true)

				addFeatureEvent(FEATURE, el, 'auxclick', e => {
					if (e.button != 1) return;

					e.preventDefault()
					e.stopImmediatePropagation()

					const text = el.querySelector(suggestionText)?.getAttribute('aria-label') || el.getAttribute('aria-label') || el.textContent?.trim()
					if (!text) return
					GM_openInTab(`${location.origin}/results?search_query=${encodeURIComponent(text).replace(/%20/gu, '+')}`, true)
				})

				suggEl()
			})
		}
	}

	function TranslateCommentButton() {
		const FEATURE = 'translateCommentButton'
		if (!startFeature(FEATURE)) return
		const QS_TRANSLATE_BUTTON = "#header>#header-author>yt-formatted-string>#translate-button";
		const QS_CONTENT_TEXT = "#expander>#content>#content-text";
		const QS_BUTTON_CONTAINER = "#header>#header-author>#published-time-text";
		const TRANSLATE_TEXT = "Перевести", UNDO_TEXT = "Вернуть", LOADING_TEXT = "Перевод...", TARGET = navigator.language || navigator.userLanguage;
		const translateCache = new Map();

		const replaceNode = (a, b) => a.replaceWith(b);
		const resetTranslateButton = (tb) => {
			if (tb._ntext.isConnected) replaceNode(tb._ntext, tb._otext);
			tb._ntext.innerText = "";
			tb.innerText = TRANSLATE_TEXT;
			tb.onclick = translateButtonTranslate;
		};
		const translateButtonSetState = function () {
			const isTranslated = this._ntext.isConnected;
			replaceNode(isTranslated ? this._ntext : this._otext, isTranslated ? this._otext : this._ntext);
			this.innerText = isTranslated ? TRANSLATE_TEXT : UNDO_TEXT;
		};
		const translateButtonTranslate = function () {
			const originalText = this._otext.innerText;
			const cached = translateCache.get(originalText);
			if (cached) {
				this._ntext.innerText = cached;
				this.onclick = translateButtonSetState;
				this.onclick();
				return;
			}
			this.innerText = LOADING_TEXT;
			this.style.pointerEvents = 'none';
			this.onclick = translateButtonSetState;
			fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TARGET}&dt=t&q=${encodeURIComponent(originalText)}`)
				.then(response => response.json())
				.then(json => {
					const translated = json[0].map(item => item[0].replace('\n', ' ')).join(' ');
					translateCache.set(originalText, translated);
					this._ntext.innerText = translated;
					this.style.pointerEvents = '';
					this.onclick();
				})
				.catch(() => {
					this.innerText = TRANSLATE_TEXT;
					this.style.pointerEvents = '';
				});
		};
		const createTranslateButton = (main) => {
			const tb = document.createElement("a");
			tb.id = "translate-button";
			tb.dataset.rtTranslateButton = "true";
			tb.style.marginLeft = "5px";
			tb.className = "yt-simple-endpoint style-scope yt-formatted-string";

			tb._otext = main.querySelector(QS_CONTENT_TEXT);
			if (!tb._otext) return null;
			tb._ntext = document.createElement("div");
			tb._ntext.style.whiteSpace = "pre-wrap";

			// Добавляем наследование стилей от оригинального текста
			tb._ntext.style.fontSize = window.getComputedStyle(tb._otext).fontSize;
			tb._ntext.style.fontFamily = window.getComputedStyle(tb._otext).fontFamily;
			tb._ntext.style.lineHeight = "2rem";
			tb._ntext.style.color = "var(--yt-spec-text-primary)";
			tb._ntext.className = "style-scope ytd-comment-renderer translate-text yt-formatted-string";

			addFeatureObserver(FEATURE, tb._otext, { childList: true, subtree: true, characterData: true }, () => resetTranslateButton(tb));
			addFeatureCleanup(FEATURE, () => {
				if (tb._ntext?.isConnected && tb._otext) replaceNode(tb._ntext, tb._otext);
				tb.remove();
			})

			resetTranslateButton(tb);
			return tb;
		};

		const attachTranslateButton = (main) => {
			if (!main) return
			const existingButton = main.querySelector(QS_TRANSLATE_BUTTON);
			if (existingButton?.dataset?.rtTranslateButton) {
				resetTranslateButton(existingButton);
			} else if (!existingButton) {
				const container = main.querySelector(QS_BUTTON_CONTAINER)
				const button = createTranslateButton(main)
				if (container && button) container.appendChild(button);
			}
		}

		const injectTranslateButton = () => {
			document.querySelectorAll('ytd-comment-thread-renderer #body>#main').forEach(attachTranslateButton)
			addFeatureObserver(FEATURE, document, { childList: true, subtree: true }, mutations => {
				mutations.forEach(mutation => {
					if (mutation.target.id === "contents") {
						mutation.addedNodes.forEach(node => {
							if (!(node instanceof HTMLElement)) return;
							const main = node.querySelector("#body>#main");
							if (main) attachTranslateButton(main)
						});
					}
				});
			});
		};

		injectTranslateButton();
	}

	function AutoTranslateSubtitles() {
		const inline_script = () => {
			const tlang = navigator.language || 'ru-RU';
			const cache = { req_url: null, obj_url: null };
			const XMLHttpRequest_open = XMLHttpRequest.prototype.open;
			XMLHttpRequest.prototype.open = function () {
				const url = new URL(arguments[1], location.href);
				if (url.pathname == '/api/timedtext') {
					const lang = url.searchParams.get('lang');
					if (lang && lang != tlang) {
						const req_url = url.href;
						if (req_url == cache.req_url) {
							arguments[1] = cache.obj_url;
						} else {
							URL.revokeObjectURL(cache.obj_url);
							this.addEventListener('load', event => {
								cache.req_url = req_url;
								cache.obj_url = URL.createObjectURL(new Blob([this.responseText], { type: 'application/json' }));
							});
							url.searchParams.set('tlang', tlang);
							arguments[1] = url.href;
						}
					}
				}
				XMLHttpRequest_open.apply(this, arguments);
			};
		};

		const script = document.createElement("script");
		script.textContent = '(' + inline_script + ')();';

		if (document.head) {
			document.head.append(script);
		} else {
			new MutationObserver((mutationList, observer) => {
				document.head && (observer.disconnect(), document.head.append(script));
			}).observe(document, { subtree: true, childList: true });
		}
	}

	function ScrollSpeed() {
		const FEATURE = 'scrollSpeed'
		if (!startFeature(FEATURE)) return
		waitSelector('.ytp-settings-button').then(container => {
			if (!featureActive(FEATURE) || !container) return
			addFeatureEvent(FEATURE, container, 'wheel', e => {
				try {
					e.preventDefault()
					const player = document.querySelector('.video-stream.html5-main-video')
					if (!player) return
					const currentSpeed = player.playbackRate
					const newSpeed = Math.max(0.25, Math.min(4, parseFloat((e.deltaY < 0 ? currentSpeed + 0.1 : currentSpeed - 0.1).toFixed(2))))
					player.playbackRate = newSpeed
					showOSD(player.playbackRate + 'x')
				} catch { }
			})
			addFeatureEvent(FEATURE, container, 'contextmenu', e => {
				try {
					e.preventDefault()
					e.stopPropagation()
					e.stopImmediatePropagation()
					const player = document.querySelector('.video-stream.html5-main-video')
					if (!player) return
					player.playbackRate = 1
					showOSD(player.playbackRate + 'x')
				} catch { }
			})
		})
	}

	function ForceDefaultVideoVolume(enabled) {
		const FEATURE = 'defaultVolume'
		if (!enabled) {
			RTDefaultVolume = false
			cleanupFeature(FEATURE)
			return;
		}
		if (!startFeature(FEATURE)) return

		waitSelector('#movie_player video').then(video => {
			if (!featureActive(FEATURE) || !video) return
			addFeatureEvent(FEATURE, video, 'loadeddata', () => {
				const moviePlayer = getMoviePlayer()
				if (RTDefaultVolume && typeof moviePlayer?.setVolume === 'function') moviePlayer.setVolume(Number(RTDefaultVolumeLevel));
			}, { capture: true });
		})
	}

	function RememberSpeed() {
		const FEATURE = 'rememberSpeed'
		if (!startFeature(FEATURE)) return
		waitSelector('#movie_player video').then(video => {
			if (!featureActive(FEATURE) || !video) return
			addFeatureEvent(FEATURE, video, 'loadeddata', setPlaybackSpeedNow, { capture: true });
		});
	}

	function setPlaybackSpeedNow() {
		if (window.location.href.includes('/shorts/')) return;

		const ytPlayer = getMoviePlayer();
		const targetSpeed = parseFloat(RTSelectRememberSpeedLevel);
		if (!Number.isFinite(targetSpeed) || targetSpeed <= 0) return;

		if (RTRememberSpeedBypass) {
			try {
				const video = ytPlayer?.querySelector('video') || document.querySelector('video.video-stream');
				if (video) video.playbackRate = targetSpeed;
			} catch (error) {
				console.error("[ReTube] Error setting speed via bypass:", error);
			}
		} else {
			if (typeof ytPlayer?.setPlaybackRate === 'function') {
				ytPlayer.setPlaybackRate(targetSpeed);
			} else {
				const video = document.querySelector('video.video-stream');
				if (video) video.playbackRate = targetSpeed;
			}
		}
	}
	function FixesForNewYouTube(enabled) {
		if (!enabled) {
			document.querySelector('#rt-fixesForNewYouTube')?.remove()
			return
		}

		pushCSS(
			// скрол в полноэкранном режиме
			`
        	ytd-app[fullscreen] {
        	    overflow: auto !important;
        	}
        	ytd-app[scrolling] {
        	    position: absolute !important;
        	    top: 0 !important;
        	    left: 0 !important;
        	    right: calc((var(--ytd-app-fullerscreen-scrollbar-width) + 1px)*-1) !important;
        	    bottom: 0 !important;
        	    overflow-x: auto !important;
        	}
        	ytd-watch-flexy[fullscreen] #single-column-container.ytd-watch-flexy,
        	ytd-watch-flexy[fullscreen] #columns.ytd-watch-flexy {
        	    display: flex !important;
        	}`
			+
			// 4 видео на главной странице вместо 3х
			'#primary > .ytd-two-column-browse-results-renderer {--ytd-rich-grid-items-per-row: 4 !important}' +
			'ytd-rich-item-renderer[rendered-from-rich-grid][is-in-first-column] {margin-left: calc(var(--ytd-rich-grid-item-margin)/2) !important}' +
			'#contents.ytd-rich-grid-renderer {margin-left: 40px}'
			, 'rt-fixesForNewYouTube')
	}

	function CopyTimestampUrl() {
		const FEATURE = 'copyTimestampUrl'
		if (!startFeature(FEATURE)) return
		waitSelector('.ytp-time-current').then(timeEl => {
			if (!featureActive(FEATURE) || !timeEl) return
			timeEl.style.cursor = 'pointer'
			timeEl.title = 'Клик — скопировать ссылку с таймкодом'
			addFeatureCleanup(FEATURE, () => {
				timeEl.style.cursor = ''
				timeEl.title = ''
			})
			addFeatureEvent(FEATURE, timeEl, 'click', () => {
				if (currentPage() !== 'watch') return
				const video = document.querySelector('video.video-stream')
				if (!video) return
				const seconds = Math.floor(video.currentTime)
				const url = `${location.origin}/watch?v=${getVideoId()}&t=${seconds}s`
				navigator.clipboard.writeText(url).then(() => showOSD('Ссылка скопирована'))
			})
		})
	}

	function ProgressInTitle() {
		const FEATURE = 'progressInTitle'
		if (!startFeature(FEATURE)) return
		addFeatureCleanup(FEATURE, () => document.title = document.title.replace(/^\[\d+%\]\s*/, ''))
		waitSelector('video.video-stream').then(video => {
			if (!featureActive(FEATURE) || !video) return
			let lastProgress = -1
			addFeatureEvent(FEATURE, video, 'timeupdate', () => {
				if (currentPage() !== 'watch' || isNaN(video.duration)) return
				const progress = Math.round((video.currentTime / video.duration) * 100)
				if (progress === lastProgress) return
				lastProgress = progress
				const cleanTitle = document.title.replace(/^\[\d+%\]\s*/, '')
				document.title = `[${progress}%] ${cleanTitle}`
			})
			addFeatureEvent(FEATURE, document, 'yt-navigate-finish', () => {
				lastProgress = -1
				document.title = document.title.replace(/^\[\d+%\]\s*/, '')
			})
		})
	}

	function AutoExpandDescription() {
		const FEATURE = 'autoExpandDescription'
		if (!startFeature(FEATURE)) return
		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(async () => {
			if (currentPage() !== 'watch') return
			const selector = [
				'ytd-text-inline-expander:not([is-expanded]) tp-yt-paper-button#expand',
				'ytd-text-inline-expander:not([is-expanded]) #expand',
				'ytd-watch-metadata ytd-text-inline-expander button[aria-label*="Ещё"]',
				'ytd-watch-metadata ytd-text-inline-expander button[aria-label*="Show more"]',
				'ytd-watch-metadata ytd-text-inline-expander button[aria-label*="Показать ещё"]'
			].join(', ')
			waitSelector(selector, { stop_on_page_change: true }).then(btn => btn?.click?.())
		}))
	}

	function RedirectShorts() {
		const FEATURE = 'redirectShorts'
		if (!startFeature(FEATURE)) return
		function tryRedirect() {
			if (location.pathname.startsWith('/shorts/')) {
				const videoId = getVideoId()
				if (videoId) location.replace('/watch?v=' + videoId + location.search.replace(/^\?/, '&') + location.hash)
			}
		}
		tryRedirect()
		addFeatureEvent(FEATURE, document, 'yt-navigate-finish', tryRedirect)
	}

	function HideShorts(hide) {
		document.querySelector('#rt-hideShortsStyle')?.remove()
		if (hide) {
			pushCSS(`
				ytd-rich-section-renderer:has(ytd-reel-shelf-renderer),
				ytd-reel-shelf-renderer,
				ytd-guide-entry-renderer:has(a[href="/shorts"]),
				ytd-mini-guide-entry-renderer:has(a[href="/shorts"]),
				[is-shorts],
				ytd-reel-item-renderer
				{ display: none !important }
			`, 'rt-hideShortsStyle')
		}
	}

	function DownloadThumbnail() {
		const FEATURE = 'downloadThumbnail'
		if (!startFeature(FEATURE)) return
		addFeatureCleanup(FEATURE, () => document.querySelector('#rt-download-thumb-btn')?.remove())
		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(async () => {
			if (currentPage() !== 'watch') return
			const controls = await waitSelector('.ytp-right-controls', { stop_on_page_change: true })
			if (!controls || document.querySelector('#rt-download-thumb-btn')) return
			const btn = document.createElement('button')
			btn.id = 'rt-download-thumb-btn'
			btn.className = 'ytp-button'
			btn.title = 'Скачать превью'
			btn.style.cssText = 'opacity:0.9;'
			btn.innerHTML = safeHTML('<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>')
			addFeatureEvent(FEATURE, btn, 'click', async () => {
				const vid = getVideoId()
				if (!vid) return
				const qualities = ['maxresdefault', 'sddefault', 'hqdefault']
				for (const q of qualities) {
					try {
						const resp = await fetch(`https://i.ytimg.com/vi/${vid}/${q}.jpg`)
						if (resp.ok) {
							const blob = await resp.blob()
							const url = URL.createObjectURL(blob)
							const a = document.createElement('a')
							a.href = url
							a.download = `${vid}_${q}.jpg`
							document.body.appendChild(a)
							a.click()
							a.remove()
							URL.revokeObjectURL(url)
							showOSD('Превью скачано')
							return
						}
					} catch (e) { /* try next quality */ }
				}
				showOSD('Не удалось скачать превью')
			})
			controls.prepend(btn)
		}))
	}

	function ReversePlaylist() {
		const FEATURE = 'reversePlaylist'
		if (!startFeature(FEATURE)) return
		addFeatureCleanup(FEATURE, () => document.querySelector('#rt-reverse-playlist-btn')?.remove())
		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(async () => {
			if (currentPage() !== 'watch' || !new URLSearchParams(location.search).has('list')) return
			const menu = await waitSelector('ytd-playlist-panel-renderer #playlist-action-menu', { stop_on_page_change: true })
			if (!menu || document.querySelector('#rt-reverse-playlist-btn')) return
			const btn = document.createElement('button')
			btn.id = 'rt-reverse-playlist-btn'
			btn.className = 'ytp-button'
			btn.title = 'Перевернуть плейлист'
			btn.style.cssText = 'width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;background:none;border:none;opacity:0.9;'
			btn.innerHTML = safeHTML('<svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg>')
			addFeatureEvent(FEATURE, btn, 'click', () => {
				const container = document.querySelector('#items.ytd-playlist-panel-renderer')
				if (!container) return
				const items = [...container.querySelectorAll('ytd-playlist-panel-video-renderer')]
				items.reverse().forEach(item => container.appendChild(item))
				showOSD('Плейлист перевернут')
			})
			menu.appendChild(btn)
		}))
	}

	let rtAgeBadgeObserver = null
	function VideoAgeBadge(enabled) {
		document.querySelector('#rt-videoAgeBadgeStyle')?.remove()
		document.querySelectorAll('.rt-age-badge').forEach(el => el.remove())
		if (rtAgeBadgeObserver) { rtAgeBadgeObserver.disconnect(); rtAgeBadgeObserver = null }
		if (!enabled) return

		pushCSS(`
			.rt-age-badge {
				position: absolute;
				bottom: 4px;
				left: 4px;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				z-index: 10;
				pointer-events: none;
				box-shadow: 0 0 3px rgba(0,0,0,0.5);
			}
		`, 'rt-videoAgeBadgeStyle')

		function parseAge(text) {
			if (!text) return null
			const t = text.toLowerCase().trim()
			const match = t.match(/(\d+)\s*(секунд|минут|час|дн|день|дня|дней|недел|месяц|год|года|лет|second|minute|hour|day|week|month|year)/)
			if (!match) return null
			const num = parseInt(match[1])
			const unit = match[2]
			if (/секунд|second/.test(unit)) return 0
			if (/минут|minute/.test(unit)) return 0
			if (/час|hour/.test(unit)) return num / 24
			if (/дн|день|дня|дней|day/.test(unit)) return num
			if (/недел|week/.test(unit)) return num * 7
			if (/месяц|month/.test(unit)) return num * 30
			if (/год|года|лет|year/.test(unit)) return num * 365
			return null
		}

		function getColor(days) {
			if (days < 7) return '#4caf50'
			if (days < 30) return '#ffc107'
			if (days < 365) return '#ff9800'
			return '#f44336'
		}

		function processItems() {
			const selectors = 'ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytd-grid-video-renderer'
			document.querySelectorAll(selectors).forEach(item => {
				if (item.querySelector('.rt-age-badge')) return
				const metaSpans = item.querySelectorAll('#metadata-line span, #metadata #metadata-line span')
				let ageText = null
				for (const span of metaSpans) {
					if (/назад|ago/.test(span.textContent)) { ageText = span.textContent; break }
				}
				const days = parseAge(ageText)
				if (days === null) return
				const thumbnail = item.querySelector('ytd-thumbnail, #thumbnail')
				if (!thumbnail) return
				thumbnail.style.position = 'relative'
				const badge = document.createElement('div')
				badge.className = 'rt-age-badge'
				badge.style.backgroundColor = getColor(days)
				badge.title = ageText.trim()
				thumbnail.appendChild(badge)
				item.setAttribute('data-rt-age-badge', '')
			})
		}

		processItems()
		rtAgeBadgeObserver = new MutationObserver(processItems)
		rtAgeBadgeObserver.observe(document.body, { childList: true, subtree: true, characterData: true })
	}

	let rtWatchTimeInterval = null
	function WatchTimeStats() {
		const FEATURE = 'watchTimeStats'
		if (rtWatchTimeInterval) return
		if (!startFeature(FEATURE)) return
		let lastTick = null
		let saving = false

		async function loadData() {
			const raw = await GM_getValue('rt-watchTimeData')
			const data = safeParseJSON(raw, { total: 0, daily: {} })
			if (!data.daily) data.daily = {}
			if (!data.total) data.total = 0
			return data
		}

		function saveData(data) {
			// Trim daily entries older than 30 days
			const cutoff = Date.now() - 30 * 24 * 3600 * 1000
			for (const key of Object.keys(data.daily)) {
				if (new Date(key).getTime() < cutoff) delete data.daily[key]
			}
			GM_setValue('rt-watchTimeData', JSON.stringify(data))
		}

		function updateDisplay(data) {
			const el = document.querySelector('#rt-watch-time-display')
			if (!el) return
			const today = new Date().toISOString().slice(0, 10)
			const todaySec = data.daily[today] || 0
			el.textContent = `Сегодня: ${timeFormat(todaySec)} | Всего: ${timeFormat(data.total)}`
		}

		async function tick() {
			const video = document.querySelector('video.video-stream')
			if (!video || video.paused || document.visibilityState === 'hidden') {
				lastTick = null
				return
			}
			const now = performance.now()
			if (lastTick === null) {
				lastTick = now
				return
			}

			const delta = (now - lastTick) / 1000
			lastTick = now
			if (saving || delta <= 0 || delta > 10) return

			saving = true
			try {
				const data = await loadData()
				const today = new Date().toISOString().slice(0, 10)
				data.total = (data.total || 0) + delta
				data.daily[today] = (data.daily[today] || 0) + delta
				saveData(data)
				updateDisplay(data)
			} finally {
				saving = false
			}
		}

		rtWatchTimeInterval = setFeatureInterval(FEATURE, tick, 1000)
		addFeatureCleanup(FEATURE, () => rtWatchTimeInterval = null)
		addFeatureEvent(FEATURE, document, 'visibilitychange', () => {
			if (document.visibilityState === 'hidden') lastTick = null
		})
		addFeatureEvent(FEATURE, window, 'beforeunload', () => lastTick = null)

		// Initial display update
		loadData().then(data => updateDisplay(data))
	}

	function AutoLike() {
		const FEATURE = 'autoLike'
		if (!startFeature(FEATURE)) return
		const likedVideos = new Set()
		let detachVideoHandler = null
		addFeatureCleanup(FEATURE, () => detachVideoHandler?.())
		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(async () => {
			if (currentPage() !== 'watch') return
			const video = await waitSelector('video.video-stream', { stop_on_page_change: true })
			if (!featureActive(FEATURE) || !video) return
			detachVideoHandler?.()
			const handler = async () => {
				if (video.paused || isNaN(video.duration) || video.duration < 30) return
				const vid = getVideoId()
				if (!vid || likedVideos.has(vid)) return
				const percent = parseInt(RTAutoLikePercent || await GM_getValue('rt-autoLikePercent') || '70')
				const progress = (video.currentTime / video.duration) * 100
				if (progress < percent) return
				const likeBtn = document.querySelector('#actions like-button-view-model button, #segmented-like-button button, ytd-segmented-like-dislike-button-renderer #segmented-like-button button')
				if (!likeBtn || likeBtn.getAttribute('aria-pressed') === 'true') {
					likedVideos.add(vid)
					return
				}
				likeBtn.click()
				likedVideos.add(vid)
				showOSD('Автолайк')
			}
			video.addEventListener('timeupdate', handler)
			detachVideoHandler = () => video.removeEventListener('timeupdate', handler)
		}))
	}

	function SendToTelegramBot() {
		const FEATURE = 'telegramBot'
		if (!startFeature(FEATURE)) return
		addFeatureCleanup(FEATURE, () => document.querySelector('#rt-tg-send-btn')?.remove())
		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(async () => {
			const page = currentPage()
			if (page !== 'watch' && page !== 'shorts') return
			const controls = await waitSelector('.ytp-right-controls', { stop_on_page_change: true })
			if (!featureActive(FEATURE) || !controls || document.querySelector('#rt-tg-send-btn')) return
			const btn = document.createElement('button')
			btn.id = 'rt-tg-send-btn'
			btn.className = 'ytp-button'
			btn.title = 'Отправить в Telegram-бот'
			btn.style.cssText = 'opacity:0.9;'
			btn.innerHTML = safeHTML('<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>')
			addFeatureEvent(FEATURE, btn, 'click', async () => {
				try {
					const vid = getVideoId() || location.pathname.split('/shorts/')[1]?.split(/[?#]/)[0]
					if (!vid) { showOSD('Не удалось определить видео'); return }
					const videoUrl = `https://www.youtube.com/watch?v=${vid}`
					const method = await GM_getValue('rt-tgBotMethod') || 'server'
					if (method === 'server') {
						const serverUrl = await GM_getValue('rt-tgBotServerUrl') || 'http://localhost:3000'
						const chatId = await GM_getValue('rt-tgBotChatId')
						if (!chatId) { showOSD('Укажите Chat ID'); return }
						GM_xmlhttpRequest({
							method: 'POST',
							url: `${serverUrl}/api/v1/bot/send-url`,
							data: JSON.stringify({ url: videoUrl, chat_id: parseInt(chatId) }),
							headers: { 'Content-Type': 'application/json' },
							onload: (res) => {
								console.log('ReTube server response:', res.status, res.responseText)
								try {
									const data = JSON.parse(res.responseText)
									showOSD(res.status >= 200 && res.status < 300 ? 'Отправлено на обработку' : 'Ошибка: ' + (data.message || data.error || res.status))
								} catch { showOSD('Ошибка ответа: ' + res.status) }
							},
							onerror: () => showOSD('Сервер недоступен')
						})
					} else {
						const botUsername = await GM_getValue('rt-tgBotUsername')
						if (!botUsername) { showOSD('Укажите username бота'); return }
						navigator.clipboard.writeText(videoUrl)
						window.open(`tg://resolve?domain=${botUsername}`)
						showOSD('Ссылка скопирована — вставьте в чат бота')
					}
				} catch (e) { showOSD('Ошибка: ' + e.message) }
			})
			controls.prepend(btn)
		}))
	}

	function PlaybackRewind() {
		const FEATURE = 'playbackRewind'
		if (!startFeature(FEATURE)) return
		let attached = false
		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(() => {
			if (currentPage() !== 'watch' && currentPage() !== 'embed') return
			waitSelector('video.video-stream', { stop_on_page_change: true }).then(video => {
				if (!featureActive(FEATURE) || !video || attached) return
				attached = true
				let wasPausedByUser = false
				addFeatureEvent(FEATURE, video, 'pause', () => {
					if (video.ended || video.currentTime < 3 || video.seeking) return
					const player = getMoviePlayer()
					if (player?.classList.contains('ad-showing')) return
					wasPausedByUser = true
				})
				addFeatureEvent(FEATURE, video, 'play', () => {
					if (!wasPausedByUser) return
					wasPausedByUser = false
					const rewind = parseInt(RTRewindSeconds) || 2
					video.currentTime = Math.max(0, video.currentTime - rewind)
					showOSD(`-${rewind}с`)
				})
			})
		}))
	}

	function ScreenshotVideo() {
		const FEATURE = 'screenshotVideo'
		if (!startFeature(FEATURE)) return
		addFeatureCleanup(FEATURE, () => document.querySelector('#rt-screenshot-btn')?.remove())
		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(async () => {
			if (currentPage() !== 'watch' && currentPage() !== 'embed') return
			const controls = await waitSelector('.ytp-right-controls', { stop_on_page_change: true })
			if (!featureActive(FEATURE) || !controls || document.querySelector('#rt-screenshot-btn')) return
			const btn = document.createElement('button')
			btn.id = 'rt-screenshot-btn'
			btn.className = 'ytp-button'
			btn.title = 'Скриншот кадра (Shift+S)'
			btn.style.cssText = 'opacity:0.9;'
			btn.innerHTML = safeHTML('<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><circle cx="12" cy="13" r="3.2"/><path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>')
			addFeatureEvent(FEATURE, btn, 'click', () => takeScreenshot())
			controls.prepend(btn)
		}))
		addFeatureEvent(FEATURE, document, 'keydown', e => {
			if (e.key === 'S' && e.shiftKey && !e.ctrlKey && !e.altKey) {
				const active = document.activeElement
				if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return
				if (currentPage() !== 'watch' && currentPage() !== 'embed') return
				e.preventDefault()
				takeScreenshot()
			}
		})
		async function takeScreenshot() {
			const video = document.querySelector('video.video-stream')
			if (!video) return showOSD('Видео не найдено')
			const player = getMoviePlayer()
			const timestamp = video.currentTime
			const wasPaused = video.paused
			let originalQuality = null

			// Умное переключение на лучшее качество
			try {
				if (player && typeof player.getAvailableQualityLevels === 'function' && typeof player.getPlaybackQuality === 'function') {
					const available = player.getAvailableQualityLevels()
					originalQuality = player.getPlaybackQuality()
					const currentRes = video.videoWidth
					const bestQuality = available[0]
					if (available.length > 1 && bestQuality && bestQuality !== originalQuality) {
						const qualityMap = { highres: 4320, hd2160: 2160, hd1440: 1440, hd1080: 1080, hd720: 720, large: 480, medium: 360, small: 240, tiny: 144 }
						const bestRes = qualityMap[bestQuality] || 0
						if (bestRes > currentRes) {
							showOSD(`Захват в ${bestRes}p...`)
							// Ставим на паузу чтобы не убежал кадр
							if (!wasPaused) video.pause()
							// Переключаем качество
							if (typeof player.setPlaybackQualityRange === 'function') player.setPlaybackQualityRange(bestQuality, bestQuality)
							if (typeof player.setPlaybackQuality === 'function') player.setPlaybackQuality(bestQuality)
							// Ждём пока videoWidth реально изменится
							const upgraded = await new Promise(resolve => {
								const deadline = Date.now() + 8000
								const check = () => {
									if (video.videoWidth > currentRes) return resolve(true)
									if (Date.now() > deadline) return resolve(false)
									setTimeout(check, 150)
								}
								check()
							})
							if (upgraded) {
								// Перематываем на нужный кадр и ждём seeked
								video.currentTime = timestamp
								await new Promise(resolve => {
									const onSeeked = () => { video.removeEventListener('seeked', onSeeked); resolve() }
									video.addEventListener('seeked', onSeeked)
									setTimeout(resolve, 2000) // fallback
								})
								await new Promise(r => setTimeout(r, 300)) // дать отрисоваться
							}
						}
					}
				}
			} catch (e) { /* продолжаем скриншот с текущим качеством */ }

			// Делаем скриншот с тем качеством, что есть
			const canvas = document.createElement('canvas')
			canvas.width = video.videoWidth
			canvas.height = video.videoHeight
			canvas.getContext('2d').drawImage(video, 0, 0)
			const w = video.videoWidth, h = video.videoHeight

			// Восстанавливаем исходное качество
			if (originalQuality && player) {
				try {
					if (typeof player.setPlaybackQualityRange === 'function') player.setPlaybackQualityRange(originalQuality, originalQuality)
					if (typeof player.setPlaybackQuality === 'function') player.setPlaybackQuality(originalQuality)
				} catch (e) {}
			}
			// Возвращаем точную позицию и воспроизведение
			video.currentTime = timestamp
			if (!wasPaused) video.play()

			canvas.toBlob(blob => {
				if (!blob) return showOSD('Ошибка скриншота')
				const action = RTScreenshotAction
				if (action === 'clipboard' || action === 'both') {
					navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).catch(() => {})
				}
				if (action === 'download' || action === 'both') {
					const url = URL.createObjectURL(blob)
					const a = document.createElement('a')
					a.href = url
					a.download = `${getVideoId()}_${timeFormat(~~timestamp)}.png`
					document.body.appendChild(a)
					a.click()
					a.remove()
					URL.revokeObjectURL(url)
				}
				showOSD(`Скриншот ${w}×${h} сохранён`)
			}, 'image/png')
		}
	}

	function KeyboardShortcutsOverlay() {
		const FEATURE = 'shortcutsOverlay'
		if (!startFeature(FEATURE)) return
		let overlayEl = null
		addFeatureCleanup(FEATURE, () => {
			overlayEl?.remove()
			overlayEl = null
		})
		const toggle = () => {
			if (overlayEl) { overlayEl.remove(); overlayEl = null; return }
			const shortcuts = [
				['F2', 'Меню настроек ReTube'],
			]
			if (RTScreenshotVideo) shortcuts.push(['Shift+S', 'Скриншот кадра видео'])
			if (RTscrollVolume) shortcuts.push(['Shift+Scroll', 'Громкость ±1%'])
			if (RTscrollSpeed) shortcuts.push(['Scroll ⚙', 'Скорость ±0.1x'])
			if (RTCopyTimestampUrl) shortcuts.push(['Клик на время', 'Копировать ссылку с таймкодом'])
			if (RTmiddleClickSearch) shortcuts.push(['СКМ поиск', 'Открыть в новой вкладке'])

			const ytShortcuts = [
				['Space / K', 'Пауза / воспроизведение'],
				['J / L', '±10 секунд'],
				['← / →', '±5 секунд'],
				['F', 'Полный экран'],
				['M', 'Отключить звук'],
				['C', 'Субтитры'],
				['< / >', 'Скорость ±0.25x'],
				['0-9', 'Перемотка на 0-90%'],
				['T', 'Мини-плеер'],
				['I', 'Мини-плеер (новый)'],
			]

			overlayEl = document.createElement('div')
			overlayEl.id = 'rt-shortcuts-overlay'
			const makeTable = (title, items) => `<div class="rt-shortcuts-col"><h3>${title}</h3>${items.map(([key, desc]) => `<div class="rt-shortcuts-row"><kbd>${key}</kbd><span>${desc}</span></div>`).join('')}</div>`
			overlayEl.innerHTML = safeHTML(`<div class="rt-shortcuts-content">${makeTable('ReTube', shortcuts)}${makeTable('YouTube', ytShortcuts)}</div>`)
			document.body.appendChild(overlayEl)

			if (!document.querySelector('#rt-shortcutsOverlayStyle')) {
				pushCSS(`#rt-shortcuts-overlay { position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.75); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; font-family: 'YouTube Noto', Roboto, Arial, sans-serif; }
					.rt-shortcuts-content { display: flex; gap: 40px; padding: 32px; background: #1a1a1a; border-radius: 12px; max-width: 700px; color: #e0e0e0; }
					.rt-shortcuts-col h3 { margin: 0 0 12px; font-size: 16px; color: #fff; border-bottom: 1px solid #333; padding-bottom: 8px; }
					.rt-shortcuts-row { display: flex; align-items: center; gap: 12px; padding: 4px 0; font-size: 13px; }
					.rt-shortcuts-row kbd { display: inline-block; min-width: 60px; padding: 3px 8px; background: #2a2a2a; border: 1px solid #444; border-radius: 4px; font-size: 12px; text-align: center; color: #ccc; font-family: monospace; }
					.rt-shortcuts-row span { color: #aaa; }`, 'rt-shortcutsOverlayStyle')
			}
		}
		addFeatureEvent(FEATURE, document, 'keydown', e => {
			if (e.key === '?' && e.shiftKey) {
				const active = document.activeElement
				if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return
				e.preventDefault()
				toggle()
			}
			if (e.key === 'Escape' && overlayEl) { overlayEl.remove(); overlayEl = null }
		})
		addFeatureEvent(FEATURE, document, 'click', e => {
			if (overlayEl && e.target === overlayEl) { overlayEl.remove(); overlayEl = null }
		})
	}

	function AutoSkipIntroOutro() {
		const FEATURE = 'autoSkipIntro'
		if (!startFeature(FEATURE)) return
		let chapters = [], skipBtn = null, skippedSet = new Set()
		let detachTimeUpdate = null, lastParseAt = 0
		const introPattern = /\b(intro|opening)\b|вступлен|интро|заставк/i
		const outroPattern = /\b(outro|credits|closing)\b|end\s*screen|аутро|концовк|титр/i
		addFeatureCleanup(FEATURE, () => {
			detachTimeUpdate?.()
			skipBtn?.remove()
			skipBtn = null
		})

		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(() => {
			if (currentPage() !== 'watch') return
			chapters = []
			skippedSet.clear()
			skipBtn?.remove()
			skipBtn = null

			waitSelector('video.video-stream', { stop_on_page_change: true }).then(video => {
				if (!featureActive(FEATURE) || !video) return
				parseChapters()
				setTimeout(parseChapters, 1000)
				setTimeout(parseChapters, 3000)
				detachTimeUpdate?.()
				const handler = () => {
					if (!chapters.length && Date.now() - lastParseAt > 2000) parseChapters()
					handleTimeUpdate(video)
				}
				video.addEventListener('timeupdate', handler)
				detachTimeUpdate = () => video.removeEventListener('timeupdate', handler)
			})
		}))

		function parseChapters() {
			lastParseAt = Date.now()
			const raw = []
			const items = document.querySelectorAll('ytd-macro-markers-list-item-renderer')
			items.forEach(item => {
				const titleEl = item.querySelector('h4, #details .macro-markers')
				const timeEl = item.querySelector('#time, .macro-markers-list-item-time')
				if (!titleEl || !timeEl) return
				const title = titleEl.textContent.trim()
				const sec = parseTimeText(timeEl.textContent.trim())
				raw.push({ title, startTime: sec })
			})
			if (!raw.length) {
				const response = getMoviePlayer()?.getPlayerResponse?.()
				collectChapterRenderers(response).forEach(chapter => {
					const title = extractText(chapter.title)
					const startMs = Number(chapter.timeRangeStartMillis)
					if (title && Number.isFinite(startMs)) raw.push({ title, startTime: Math.floor(startMs / 1000) })
				})
			}
			if (!raw.length) return

			const uniqueRaw = []
			const seen = new Set()
			raw.sort((a, b) => a.startTime - b.startTime).forEach(item => {
				const key = `${item.startTime}:${item.title}`
				if (!seen.has(key)) {
					seen.add(key)
					uniqueRaw.push(item)
				}
			})
			const video = document.querySelector('video.video-stream')
			const duration = video?.duration || Infinity
			chapters = []
			for (let i = 0; i < uniqueRaw.length; i++) {
				const endTime = i < uniqueRaw.length - 1 ? uniqueRaw[i + 1].startTime : duration
				const isSkippable = introPattern.test(uniqueRaw[i].title) || outroPattern.test(uniqueRaw[i].title)
				if (isSkippable) {
					chapters.push({ ...uniqueRaw[i], endTime, type: introPattern.test(uniqueRaw[i].title) ? 'intro' : 'outro' })
				}
			}
		}

		function parseTimeText(text) {
			const timeParts = text.split(':').map(Number)
			if (timeParts.length === 3) return timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]
			if (timeParts.length === 2) return timeParts[0] * 60 + timeParts[1]
			return timeParts[0] || 0
		}

		function extractText(value) {
			return value?.simpleText || value?.runs?.map(run => run.text).join('') || ''
		}

		function collectChapterRenderers(obj, out = [], seen = new WeakSet()) {
			if (!obj || typeof obj !== 'object' || seen.has(obj)) return out
			seen.add(obj)
			if (obj.chapterRenderer) out.push(obj.chapterRenderer)
			Object.values(obj).forEach(value => collectChapterRenderers(value, out, seen))
			return out
		}

		function handleTimeUpdate(video) {
			const t = video.currentTime
			const active = chapters.find(ch => t >= ch.startTime && t < ch.endTime - 0.5)
			if (active && !skippedSet.has(active.startTime)) {
				if (RTSkipMode === 'auto') {
					skippedSet.add(active.startTime)
					video.currentTime = active.endTime
					showOSD(active.type === 'intro' ? 'Интро пропущено' : 'Аутро пропущено')
				} else {
					showSkipButton(video, active)
				}
			} else if (!active && skipBtn) {
				skipBtn.remove()
				skipBtn = null
			}
		}

		function showSkipButton(video, chapter) {
			if (skipBtn) return
			skipBtn = document.createElement('button')
			skipBtn.id = 'rt-skip-intro-btn'
			skipBtn.textContent = chapter.type === 'intro' ? 'Пропустить интро ▶' : 'Пропустить аутро ▶'
			addFeatureEvent(FEATURE, skipBtn, 'click', () => {
				skippedSet.add(chapter.startTime)
				video.currentTime = chapter.endTime
				showOSD(chapter.type === 'intro' ? 'Интро пропущено' : 'Аутро пропущено')
				skipBtn.remove()
				skipBtn = null
			})
			if (!document.querySelector('#rt-skipIntroBtnStyle')) {
				pushCSS(`#rt-skip-intro-btn { position: absolute; bottom: 70px; right: 12px; z-index: 99; padding: 10px 20px; background: rgba(0,0,0,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; font-size: 14px; cursor: pointer; font-family: 'YouTube Noto', Roboto, Arial, sans-serif; transition: background 0.2s; }
					#rt-skip-intro-btn:hover { background: rgba(255,255,255,0.15); }`, 'rt-skipIntroBtnStyle')
			}
			const player = getMoviePlayer()
			if (player) player.appendChild(skipBtn)
		}
	}
	function VideoStatsBadge() {
		const FEATURE = 'videoStatsBadge'
		if (!startFeature(FEATURE)) return
		pushCSS(`
			#rt-stats-badge { display: inline-flex; align-items: center; color: #eee; font-size: 1.09em; font-family: 'YouTube Noto', Roboto, Arial, sans-serif; white-space: nowrap; padding: 0 6px; opacity: 0.9; height: 100%; vertical-align: middle; transition: opacity .25s ease; }
			#rt-stats-badge::before { content: '•'; margin-right: 6px; color: #aaa; }
			.ytp-autohide #rt-stats-badge { opacity: 0 !important; pointer-events: none; }
		`, 'rt-statsBadgeStyle')

		let updateTimer = null
		addFeatureCleanup(FEATURE, () => {
			if (updateTimer) clearInterval(updateTimer)
			updateTimer = null
			document.querySelector('#rt-stats-badge')?.remove()
			document.querySelector('#rt-statsBadgeStyle')?.remove()
		})

		function getCodecName(mimeType) {
			if (!mimeType) return '?'
			const c = mimeType.match(/codecs="([^"]+)"/)
			if (!c) return '?'
			const codec = c[1].toLowerCase()
			if (codec.startsWith('av01')) return 'AV1'
			if (codec.startsWith('vp9') || codec.startsWith('vp09')) return 'VP9'
			if (codec.startsWith('vp8')) return 'VP8'
			if (codec.startsWith('avc1')) return 'H.264'
			if (codec.startsWith('hev1') || codec.startsWith('hvc1')) return 'H.265'
			return codec.split('.')[0].toUpperCase()
		}

		function formatBitrate(bps) {
			if (!bps) return ''
			const mbps = bps / 1_000_000
			return mbps >= 1 ? mbps.toFixed(1) + ' Mbps' : (bps / 1000).toFixed(0) + ' Kbps'
		}

		function updateBadge() {
			const video = document.querySelector('video.video-stream')
			const leftControls = document.querySelector('.ytp-left-controls')
			if (!video || !leftControls) return

			let badge = document.querySelector('#rt-stats-badge')
			if (!badge) {
				badge = document.createElement('span')
				badge.id = 'rt-stats-badge'
				const chapterContainer = leftControls.querySelector('.ytp-chapter-container')
				const timeDisplay = leftControls.querySelector('.ytp-time-display')
				if (chapterContainer) {
					chapterContainer.insertAdjacentElement('afterend', badge)
				} else if (timeDisplay) {
					timeDisplay.insertAdjacentElement('afterend', badge)
				} else {
					leftControls.appendChild(badge)
				}
			}

			const w = video.videoWidth
			const h = video.videoHeight
			if (!w || !h) { badge.textContent = ''; return }

			let codecName = '?'
			let bitrate = ''

			try {
				const response = getMoviePlayer()?.getPlayerResponse?.()
				const formats = response?.streamingData?.adaptiveFormats
				if (formats) {
					const videoFormats = formats.filter(f => f.mimeType?.startsWith('video/'))
					const match = videoFormats.find(f => f.width === w && f.height === h)
						|| videoFormats.find(f => f.height === h)
						|| videoFormats.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0)).find(f => f.mimeType?.startsWith('video/'))
					if (match) {
						codecName = getCodecName(match.mimeType)
						bitrate = formatBitrate(match.bitrate)
					}
				}
			} catch (e) {}

			badge.textContent = `${w}×${h} · ${codecName}${bitrate ? ' · ' + bitrate : ''}`
		}

		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(async () => {
			if (updateTimer) { clearInterval(updateTimer); updateTimer = null }
			document.querySelector('#rt-stats-badge')?.remove()
			await waitSelector('.ytp-left-controls')
			if (!featureActive(FEATURE)) return
			updateBadge()
			updateTimer = setInterval(updateBadge, 3000)
		}))
	}

	function VideoBookmarks() {
		const FEATURE = 'videoBookmarks'
		if (!startFeature(FEATURE)) return
		const STORAGE_KEY = 'rt-bookmarks-data'
		const getAll = () => safeParseJSON(localStorage.getItem(STORAGE_KEY), {})
		const saveAll = data => localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

		addFeatureCleanup(FEATURE, () => {
			document.querySelector('#rt-bookmark-btn')?.remove()
			document.querySelector('#rt-bookmarks-panel')?.remove()
			document.querySelector('#rt-bookmarks-style')?.remove()
		})

		pushCSS(
			'#rt-bookmark-btn:hover {opacity:1 !important}' +
			'#rt-bookmarks-panel {background:var(--yt-spec-badge-chip-background, rgba(255,255,255,0.06)); border-radius:12px; padding:12px; margin-bottom:12px}' +
			'#rt-bookmarks-panel .rt-bm-header {display:flex; align-items:center; justify-content:space-between; margin-bottom:8px}' +
			'#rt-bookmarks-panel .rt-bm-title {font-weight:bold; font-size:14px; color:var(--yt-spec-text-primary)}' +
			'#rt-bookmarks-panel .rt-bm-list {display:flex; flex-direction:column; gap:2px; max-height:280px; overflow-y:auto}' +
			'#rt-bookmarks-panel .rt-bm-item {display:flex; align-items:center; gap:8px; padding:4px 6px; border-radius:6px; font-size:13px; color:var(--yt-spec-text-primary)}' +
			'#rt-bookmarks-panel .rt-bm-item:hover {background:rgba(255,255,255,0.08)}' +
			'#rt-bookmarks-panel .rt-bm-time {font-family:monospace; color:var(--yt-spec-call-to-action); min-width:50px; cursor:pointer}' +
			'#rt-bookmarks-panel .rt-bm-time:hover {text-decoration:underline}' +
			'#rt-bookmarks-panel .rt-bm-label {flex:1; outline:none; padding:2px 4px; border-radius:4px; min-height:18px}' +
			'#rt-bookmarks-panel .rt-bm-label:focus {background:rgba(255,255,255,0.12)}' +
			'#rt-bookmarks-panel .rt-bm-del {opacity:0.5; cursor:pointer; font-size:18px; padding:0 6px; line-height:1}' +
			'#rt-bookmarks-panel .rt-bm-del:hover {opacity:1; color:#ff5252}' +
			'#rt-bookmarks-panel .rt-bm-actions button {background:rgba(255,255,255,0.08); border:none; color:var(--yt-spec-text-primary); padding:4px 10px; border-radius:14px; cursor:pointer; font-size:12px; margin-left:4px}' +
			'#rt-bookmarks-panel .rt-bm-actions button:hover {background:rgba(255,255,255,0.18)}'
			, 'rt-bookmarks-style')

		function escapeHtml(s) { return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]) }

		function addAtCurrent() {
			const video = document.querySelector('video.video-stream')
			const vid = getVideoId()
			if (!video || !vid) return
			const time = Math.floor(video.currentTime)
			const all = getAll()
			all[vid] = all[vid] || []
			if (all[vid].some(b => Math.abs(b.time - time) < 1)) { showOSD('Таймкод уже есть'); return }
			all[vid].push({ time, label: '' })
			all[vid].sort((a, b) => a.time - b.time)
			saveAll(all)
			showOSD(`Закладка ${timeFormat(time)}`)
			renderPanel()
		}

		async function renderPanel() {
			document.querySelector('#rt-bookmarks-panel')?.remove()
			if (currentPage() !== 'watch') return
			const vid = getVideoId()
			if (!vid) return
			const list = (getAll()[vid] || []).slice()
			if (!list.length) return

			const target = await waitSelector('#secondary, ytd-watch-next-secondary-results-renderer', { stop_on_page_change: true })
			if (!featureActive(FEATURE) || !target || document.querySelector('#rt-bookmarks-panel')) return

			const panel = document.createElement('div')
			panel.id = 'rt-bookmarks-panel'
			const items = list.map((b, i) =>
				`<div class="rt-bm-item" data-idx="${i}">` +
				`<span class="rt-bm-time" data-idx="${i}">${timeFormat(b.time)}</span>` +
				`<span class="rt-bm-label" contenteditable="true" data-idx="${i}" data-placeholder="Без названия">${escapeHtml(b.label)}</span>` +
				`<span class="rt-bm-del" data-idx="${i}" title="Удалить">×</span>` +
				`</div>`
			).join('')
			panel.innerHTML = safeHTML(
				`<div class="rt-bm-header">` +
				`<span class="rt-bm-title">Закладки (${list.length})</span>` +
				`<span class="rt-bm-actions"><button id="rt-bm-copy" title="Скопировать список с ссылками">Копировать</button><button id="rt-bm-clear">Очистить</button></span>` +
				`</div>` +
				`<div class="rt-bm-list">${items}</div>`
			)
			target.prepend(panel)

			panel.querySelectorAll('.rt-bm-time').forEach(el => el.addEventListener('click', () => {
				const idx = +el.dataset.idx
				const video = document.querySelector('video.video-stream')
				if (video && list[idx]) video.currentTime = list[idx].time
			}))
			panel.querySelectorAll('.rt-bm-label').forEach(el => {
				el.addEventListener('blur', () => {
					const idx = +el.dataset.idx
					const all = getAll()
					if (all[vid]?.[idx]) {
						all[vid][idx].label = el.textContent.trim()
						saveAll(all)
					}
				})
				el.addEventListener('keydown', e => {
					if (e.key === 'Enter') { e.preventDefault(); el.blur() }
				})
			})
			panel.querySelectorAll('.rt-bm-del').forEach(el => el.addEventListener('click', e => {
				e.stopPropagation()
				const idx = +el.dataset.idx
				const all = getAll()
				if (!all[vid]) return
				all[vid].splice(idx, 1)
				if (!all[vid].length) delete all[vid]
				saveAll(all)
				renderPanel()
			}))
			panel.querySelector('#rt-bm-copy')?.addEventListener('click', () => {
				const url = `https://youtu.be/${vid}`
				const lines = list.map(b => `${timeFormat(b.time)} ${b.label || ''}`.trim()).join('\n')
				const linksLines = list.map(b => `${url}?t=${b.time} — ${timeFormat(b.time)} ${b.label || ''}`.trim()).join('\n')
				navigator.clipboard.writeText(`${url}\n\n${lines}\n\n${linksLines}`)
				showOSD('Закладки скопированы')
			})
			panel.querySelector('#rt-bm-clear')?.addEventListener('click', () => {
				if (!confirm('Удалить все закладки этого видео?')) return
				const all = getAll()
				delete all[vid]
				saveAll(all)
				renderPanel()
			})
		}

		addFeatureEvent(FEATURE, document, 'keydown', e => {
			if (currentPage() !== 'watch') return
			if (e.ctrlKey || e.metaKey || e.altKey) return
			if (!['b', 'B', 'и', 'И'].includes(e.key)) return
			const t = e.target
			if (t?.matches?.('input, textarea, [contenteditable="true"]')) return
			e.preventDefault()
			addAtCurrent()
		})

		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(async () => {
			document.querySelector('#rt-bookmark-btn')?.remove()
			document.querySelector('#rt-bookmarks-panel')?.remove()
			if (currentPage() !== 'watch') return
			const controls = await waitSelector('.ytp-right-controls', { stop_on_page_change: true })
			if (!featureActive(FEATURE) || !controls || document.querySelector('#rt-bookmark-btn')) {
				renderPanel()
				return
			}
			const btn = document.createElement('button')
			btn.id = 'rt-bookmark-btn'
			btn.className = 'ytp-button'
			btn.title = 'Сохранить таймкод (B)'
			btn.style.cssText = 'opacity:0.9;'
			btn.innerHTML = safeHTML('<svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>')
			addFeatureEvent(FEATURE, btn, 'click', addAtCurrent)
			controls.prepend(btn)
			renderPanel()
		}))
	}

	function VideoUploadDays() {
		const FEATURE = 'videoUploadDays'
		if (!startFeature(FEATURE)) return
		const CACHE_KEY = 'videoPublishedISO'

		addFeatureCleanup(FEATURE, () => {
			document.querySelector('.rt-upload-days')?.remove()
			document.querySelector('#rt-upload-days-style')?.remove()
			removeEmptyTitleBadgeHost()
		})

		pushCSS(
			'.rt-upload-days {border-radius:18px; padding-inline:8px; height:23px; line-height:23px; font-size:14px !important; font-weight:500; display:inline-flex; align-items:center; background-color:var(--yt-spec-button-chip-background-hover); color:var(--yt-spec-text-primary); animation:1s show ease}' +
			'.rt-upload-days.fresh {color:#4caf50}' +
			'.rt-upload-days.recent {color:#ffc107}' +
			'.rt-upload-days.old {color:#ff9800}' +
			'.rt-upload-days.ancient {color:#f44336}'
			, 'rt-upload-days-style')

		async function getISO(videoId, retries = 0) {
			if (!videoId) return null
			const cache = safeParseJSON(localStorage.getItem(CACHE_KEY), {})
			if (cache[videoId]) return cache[videoId]
			if (noValidApiKeys) return null
			try {
				const apiKey = await ApiKey()
				if (!apiKey) return null
				const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
				const response = await fetch(apiUrl)
				const json = await response.json()
				if (!json.items?.[0]) throw new Error('Empty API response')
				const iso = json.items[0].snippet.publishedAt
				cache[videoId] = iso
				localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
				return iso
			} catch (e) {
				console.warn('ReTube videoUploadDays error:', e)
				if (retries < 3) {
					CleanApiKeys()
					return getISO(videoId, retries + 1)
				}
				return null
			}
		}

		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(async () => {
			document.querySelector('.rt-upload-days')?.remove()
			if (currentPage() !== 'watch' || RTvideoDateCreated) return
			const requestedVideoId = getVideoId()
			const iso = await getISO(requestedVideoId)
			if (!featureActive(FEATURE) || !iso) return
			const titleEl = await waitWatchTitleTarget()
			if (!featureActive(FEATURE) || !titleEl || requestedVideoId !== getVideoId()) return
			document.querySelector('.rt-upload-days')?.remove()
			const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
			const label = document.createElement('span')
			label.className = 'rt-upload-days'
			label.style.order = '20'
			label.textContent = formatDaysAgo(days)
			label.title = new Date(iso).toLocaleString(userLanguage)
			if (days < 7) label.classList.add('fresh')
			else if (days < 30) label.classList.add('recent')
			else if (days < 365) label.classList.add('old')
			else label.classList.add('ancient')
			getWatchTitleBadgeHost()?.appendChild(label)
		}))
	}

	function LikeDislikeRatio() {
		const FEATURE = 'likeDislikeRatio'
		if (!startFeature(FEATURE)) return
		const CACHE_PREFIX = 'retube-dislikes-count:', ID = 'rt-like-dislike-ratio'

		addFeatureCleanup(FEATURE, () => {
			document.getElementById(ID)?.remove()
			document.querySelector('#rt-ratio-style')?.remove()
			removeEmptyTitleBadgeHost()
		})

		pushCSS(
			`#${ID} {border-radius:18px; padding:0 8px 0 10px; height:23px; line-height:23px; font-size:13px !important; font-weight:500; display:inline-flex; align-items:center; background-color:var(--yt-spec-button-chip-background-hover); color:var(--yt-spec-text-primary); box-sizing:border-box; animation:1s show ease}` +
			`#${ID}.positive {box-shadow:inset 3px 0 0 #4caf50}` +
			`#${ID}.mixed {box-shadow:inset 3px 0 0 #ffc107}` +
			`#${ID}.negative {box-shadow:inset 3px 0 0 #f44336}`
			, 'rt-ratio-style')

		function normalizeVoteData(json) {
			if (!json || json.dislikes == null) return null
			return { likes: Number(json.likes) || 0, dislikes: Number(json.dislikes) || 0 }
		}

		function fetchVotesViaGM(url) {
			return new Promise(resolve => {
				if (typeof GM_xmlhttpRequest !== 'function') return resolve(null)
				GM_xmlhttpRequest({
					method: 'GET',
					url,
					headers: { Accept: 'application/json' },
					onload: response => {
						try {
							if (response.status < 200 || response.status >= 300) throw new Error(`HTTP ${response.status}`)
							resolve(normalizeVoteData(JSON.parse(response.responseText)))
						} catch (e) {
							console.warn('ReTube likeDislikeRatio GM error:', e)
							resolve(null)
						}
					},
					onerror: error => {
						console.warn('ReTube likeDislikeRatio GM request failed:', error)
						resolve(null)
					},
					ontimeout: () => resolve(null),
				})
			})
		}

		async function getData(vid) {
			if (!vid) return null
			const cached = safeParseJSON(localStorage.getItem(CACHE_PREFIX + vid), null)
			if (cached && cached.likes != null && cached.dislikes != null) return cached
			const url = `https://returnyoutubedislikeapi.com/votes?videoId=${vid}`
			try {
				const r = await fetch(url)
				if (!r.ok) throw new Error(`HTTP ${r.status}`)
				const data = normalizeVoteData(await r.json())
				if (!data) return null
				localStorage.setItem(CACHE_PREFIX + vid, JSON.stringify(data))
				return data
			} catch (e) {
				const data = await fetchVotesViaGM(url)
				if (data) {
					localStorage.setItem(CACHE_PREFIX + vid, JSON.stringify(data))
					return data
				}
				console.warn('ReTube likeDislikeRatio error:', e)
				return null
			}
		}

		async function renderRatio(retries = 0) {
			document.getElementById(ID)?.remove()
			if (currentPage() !== 'watch') return
			const requestedVideoId = getVideoId()
			await Delay(800)
			const data = await getData(requestedVideoId)
			const target = await waitUntil(getWatchTitleBadgeHost, 250, 8000)
			if (!featureActive(FEATURE)) return
			if (requestedVideoId !== getVideoId()) return
			if (!data || !target) {
				if (retries < 3) return renderRatio(retries + 1)
				return
			}
			document.getElementById(ID)?.remove()
			const total = data.likes + data.dislikes
			const percent = total > 0 ? Math.round((data.likes / total) * 100) : 0
			const ratio = data.dislikes > 0 ? (data.likes / data.dislikes).toFixed(1) : '∞'
			const el = document.createElement('span')
			el.id = ID
			el.style.order = '30'
			el.title = `${data.likes.toLocaleString(userLanguage)} лайков\n${data.dislikes.toLocaleString(userLanguage)} дизлайков\n${percent}% лайков\nСоотношение ${ratio}:1`
			el.textContent = `${percent}%`
			if (percent >= 90) el.classList.add('positive')
			else if (percent >= 60) el.classList.add('mixed')
			else el.classList.add('negative')
			target.appendChild(el)
		}

		addFeatureCleanup(FEATURE, runOnPageInitOrTransition(() => renderRatio()))
	}

	//#endregion

	//#region Доп функции
	function hexToRgb(hex) {
		const bigint = parseInt(hex.slice(1), 16)
		const r = (bigint >> 16) & 255
		const g = (bigint >> 8) & 255
		const b = bigint & 255
		return [r, g, b]
	}
	function rgbToHex(rgb) {
		const r = Math.round(rgb[0])
		const g = Math.round(rgb[1])
		const b = Math.round(rgb[2])
		return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`
	}
	function ModifyColor(hex, rAmount, gAmount, bAmount) {
		const rgb = hexToRgb(hex);
		const brightenedR = Math.max(Math.min(rgb[0] + rAmount, 255), 0);
		const brightenedG = Math.max(Math.min(rgb[1] + gAmount, 255), 0);
		const brightenedB = Math.max(Math.min(rgb[2] + bAmount, 255), 0);
		return rgbToHex([brightenedR, brightenedG, brightenedB]);
	}
	function pushCSS(value, id) {
		if (id) {
			const existing = document.getElementById(id)
			if (existing) { existing.textContent = value; return }
		}
		const style = document.head.appendChild(document.createElement('style'))
		style.textContent = value
		if (id) style.id = id
	}
	function safeHTML(html) { return rtHTMLPolicy ? rtHTMLPolicy.createHTML(html) : html }
	function debounce(callback, delay) {
		let timeoutId

		return function () {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => {
				callback.apply(this, arguments)
			}, delay)
		}
	}
	function startFeature(featureKey) {
		if (rtFeatureCleanups.has(featureKey)) return false
		rtFeatureCleanups.set(featureKey, [])
		return true
	}
	function cleanupFeature(featureKey) {
		const cleanups = rtFeatureCleanups.get(featureKey)
		if (!cleanups) return
		rtFeatureCleanups.delete(featureKey)
		cleanups.forEach(cleanup => {
			try { cleanup() } catch (e) { console.warn(`ReTube cleanup failed: ${featureKey}`, e) }
		})
	}
	function featureActive(featureKey) {
		return rtFeatureCleanups.has(featureKey)
	}
	function addFeatureCleanup(featureKey, cleanup) {
		if (typeof cleanup !== 'function') return
		if (!rtFeatureCleanups.has(featureKey)) rtFeatureCleanups.set(featureKey, [])
		rtFeatureCleanups.get(featureKey).push(cleanup)
	}
	function addFeatureEvent(featureKey, target, type, handler, options) {
		if (!target?.addEventListener || typeof handler !== 'function') return
		target.addEventListener(type, handler, options)
		addFeatureCleanup(featureKey, () => target.removeEventListener(type, handler, options))
	}
	function addFeatureObserver(featureKey, target, options, callback) {
		if (!target || typeof callback !== 'function') return
		const observer = new MutationObserver(callback)
		observer.observe(target, options)
		addFeatureCleanup(featureKey, () => observer.disconnect())
		return observer
	}
	function setFeatureInterval(featureKey, callback, delay) {
		const intervalId = setInterval(callback, delay)
		addFeatureCleanup(featureKey, () => clearInterval(intervalId))
		return intervalId
	}
	function safeParseJSON(value, fallback) {
		if (!value) return fallback
		try { return JSON.parse(value) } catch { return fallback }
	}
	function waitSelector(selector, limit_data) {
		if (typeof selector !== 'string') return console.error('wait > selector:', typeof selector);
		if (limit_data?.container && !(limit_data.container instanceof HTMLElement)) return console.error('wait > container not HTMLElement:', limit_data.container);
		if (selector.includes(':has(') && !CSS.supports('selector(:has(*))')) {
			return new Promise((resolve, reject) => {
				console.warn('CSS ":has()" unsupported');
				reject('CSS ":has()" unsupported');
			});
		}
		return new Promise(resolve => {
			let element, parentEl, observer1, stopWaiting;
			const root = limit_data?.container || document.body || document.documentElement || document;
			const removeStopListeners = () => {
				if (!stopWaiting) return
				document.removeEventListener('yt-navigate-start', stopWaiting)
				document.removeEventListener('yt-navigate-finish', stopWaiting)
				stopWaiting = null
			}
			if (element = root.querySelector(selector)) {
				return resolve(element);
			}
			observer1 = new MutationObserver((mutationRecordsArray, observer) => {
				for (const record of mutationRecordsArray) {
					for (const node of record.addedNodes) {
						if (![1, 3, 8].includes(node.nodeType) || !(node instanceof HTMLElement)) continue;
						if (node.matches && node.matches(selector)) {
							observer.disconnect();
							removeStopListeners()
							return resolve(node);
						}
						else if (
							(parentEl = node.parentElement || node)
							&& (parentEl instanceof HTMLElement)
							&& (element = parentEl.querySelector(selector))
						) {
							observer.disconnect();
							removeStopListeners()
							return resolve(element);
						}
					}
				}
				if (document?.readyState != 'loading'
					&& (element = (limit_data?.container || document?.body || document.documentElement || document).querySelector(selector))
				) {
					observer.disconnect();
					removeStopListeners()
					return resolve(element);
				}
			})
			observer1
				.observe(root, {
					childList: true,
					subtree: true,
					attributes: true,
				});
			if (limit_data?.stop_on_page_change) {
				let prevURL = location.href
				stopWaiting = () => {
					if (isURLChange()) {
						observer1.disconnect();
						removeStopListeners()
					}
				}
				document.addEventListener('yt-navigate-start', stopWaiting)
				document.addEventListener('yt-navigate-finish', stopWaiting)
				function isURLChange() {
					return (prevURL === location.href) ? false : prevURL = location.href;
				}
			}
		});
	}
	function waitUntil(condition, timeout, maxWaitMs = 10000) {
		if (typeof condition !== 'function') return console.error('waitUntil > condition is not fn:', typeof condition);

		return new Promise((resolve) => {
			let result, waitCondition, waitTimeout;
			const check = () => {
				try { return condition() } catch { return undefined }
			}
			const cleanup = () => {
				if (waitCondition) clearInterval(waitCondition)
				if (waitTimeout) clearTimeout(waitTimeout)
			}
			if (result = check()) {
				resolve(result);
			}
			else {
				waitCondition = setInterval(() => {
					if (result = check()) {
						cleanup();
						resolve(result);
					}
				}, ~~timeout || 500);
				if (maxWaitMs > 0) {
					waitTimeout = setTimeout(() => {
						cleanup()
						resolve(undefined)
					}, maxWaitMs)
				}
			}
		});
	}
	function runOnPageInitOrTransition(callback, onlyEvent) {
		if (!callback || typeof callback !== 'function') {
			return console.error('runOnPageInitOrTransition > callback not function:', ...arguments);
		}
		let prevURL = location.href;
		const isURLChange = () => (prevURL === location.href) ? false : prevURL = location.href;
		const onNavigateFinish = () => isURLChange() && callback();
		if (onlyEvent) {
			isURLChange()
		}
		else {
			isURLChange() || callback()
		}
		document.addEventListener('yt-navigate-finish', onNavigateFinish);
		return () => document.removeEventListener('yt-navigate-finish', onNavigateFinish);
	}
	function currentPage() {
		const pathnameArray = location.pathname.split('/').filter(Boolean)
		let [page, channelTab] = [pathnameArray[0], pathnameArray.pop()]
		channelTab = ['featured', 'videos', 'shorts', 'streams', 'playlists', 'community', 'channels', 'about', 'search'].includes(channelTab) ? channelTab : false
		return (page != 'live_chat')
			&& (['channel', 'c', 'user'].includes(page)
				|| page?.startsWith('@')
				|| /[A-Z\d_]/.test(page)
				|| channelTab
			) ? 'channel' : (page == 'clip') ? 'watch' : page || 'home'
	}
	function getVideoId() {
		const url = new URL(window.location.href)
		return url.searchParams.get("v") || (location.pathname.startsWith('/shorts/') ? location.pathname.split('/shorts/')[1]?.split(/[?#/]/)[0] : null)
	}
	function getMoviePlayer() {
		return document.getElementById("movie_player") || document.querySelector(".html5-video-player")
	}
	function getWatchTitleTarget() {
		const h1 = document.querySelector('ytd-watch-metadata h1') || document.querySelector('#title > h1') || document.querySelector('#above-the-fold #title h1')
		return h1?.querySelector('yt-formatted-string') || h1
	}
	function waitWatchTitleTarget() {
		return waitUntil(getWatchTitleTarget, 250, 5000)
	}
	function ensureTitleBadgeStyle() {
		pushCSS('.rt-title-badges {display:inline-flex; align-items:center; gap:5px; margin-left:7px; vertical-align:baseline; flex-wrap:wrap; transform:translateY(-2px)}', 'rt-title-badges-style')
	}
	function getWatchTitleBadgeHost() {
		const target = getWatchTitleTarget()
		if (!target) return null
		ensureTitleBadgeStyle()
		let host = Array.from(target.children || []).find(el => el.classList?.contains('rt-title-badges'))
		if (!host) {
			host = document.createElement('span')
			host.className = 'rt-title-badges'
			target.appendChild(host)
		}
		return host
	}
	function removeEmptyTitleBadgeHost() {
		document.querySelectorAll('.rt-title-badges').forEach(host => {
			if (!host.children.length) host.remove()
		})
	}
	function isPlayerLive(player = getMoviePlayer()) {
		try { return !!player?.getVideoData?.().isLive } catch { return false }
	}
	function timeFormat(time_sec) {
		const ts = Math.abs(+time_sec), d = ~~(ts / 86400), h = ~~((ts % 86400) / 3600), m = ~~((ts % 3600) / 60), s = ~~(ts % 60)
		return (d ? `${d}d ` : '') + (h ? (d ? h.toString().padStart(2, '0') : h) + ':' : '') + (h ? m.toString().padStart(2, '0') : m) + ':' + s.toString().padStart(2, '0')
	}
	function pluralRu(n, [one, few, many]) {
		const m10 = n % 10, m100 = n % 100
		if (m10 === 1 && m100 !== 11) return one
		if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few
		return many
	}
	function formatDaysAgo(days) {
		if (days <= 0) return 'Сегодня'
		if (days === 1) return 'Вчера'
		if (days < 7) return `${days} ${pluralRu(days, ['день', 'дня', 'дней'])} назад`
		if (days < 30) {
			const w = Math.floor(days / 7)
			return `${w} ${pluralRu(w, ['неделю', 'недели', 'недель'])} назад`
		}
		if (days < 365) {
			const m = Math.floor(days / 30)
			return `${m} ${pluralRu(m, ['месяц', 'месяца', 'месяцев'])} назад`
		}
		const y = Math.floor(days / 365)
		return `${y} ${pluralRu(y, ['год', 'года', 'лет'])} назад`
	}
	function getPublishedTime(iso, dateText) {
		const isoTime = iso ? new Date(iso).getTime() : NaN
		if (Number.isFinite(isoTime)) return isoTime
		const match = String(dateText ?? '').match(/(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/)
		if (match) {
			const [, day, month, year, hour = '0', minute = '0', second = '0'] = match
			const parsed = new Date(+year, +month - 1, +day, +hour, +minute, +second).getTime()
			if (Number.isFinite(parsed)) return parsed
		}
		const nativeTime = Date.parse(String(dateText ?? ''))
		return Number.isFinite(nativeTime) ? nativeTime : NaN
	}
	function buildPublishedText(iso, dateText) {
		const cleanDateText = String(dateText ?? '').split(' • ')[0]
		const showAge = RTVideoUploadDays || document.querySelector('#rt-checkbox43')?.checked === true
		if (!showAge) return cleanDateText
		const publishedTime = getPublishedTime(iso, cleanDateText)
		if (!Number.isFinite(publishedTime)) return cleanDateText
		const days = Math.max(0, Math.floor((Date.now() - publishedTime) / 86400000))
		return `${cleanDateText} • ${formatDaysAgo(days)}`
	}
	async function getChannelId() {
		const isChannelId = id => id && /UC([a-z0-9-_]{22})$/i.test(id);

		await waitUntil(() => document.body?.querySelector('ytd-watch-flexy')?.playerData?.videoDetails.channelId, 50, 3000);

		let result = [
			document.querySelector('meta[itemprop="channelId"][content]')?.content,
			(document.body?.querySelector('ytd-app')?.__data?.data?.response
				|| document.body?.querySelector('ytd-app')?.data?.response
				|| window.ytInitialData
			)
				?.metadata?.channelMetadataRenderer?.externalId,
			document.querySelector('link[itemprop="url"][href]')?.href.split('/')[4],
			location.pathname.split('/')[2],
			document.body?.querySelector('#video-owner a[href]')?.href.split('/')[4],
			document.body?.querySelector('a.ytp-ce-channel-title[href]')?.href.split('/')[4],
			document.body?.querySelector('ytd-watch-flexy')?.playerData?.videoDetails.channelId,
		].find(i => isChannelId(i));
		return result;
	}
	function finishEvent(callback) {
		return runOnPageInitOrTransition(callback)
	}
	function showOSD(text) {
		if (!text || (currentPage() != 'embed' && currentPage() != 'watch')) return;
		if (typeof window.fadeBezel === 'number') clearTimeout(window.fadeBezel); // reset fade

		const bezelEl = document.body.querySelector('.ytp-bezel-text');
		if (!bezelEl) return showFallbackOSD(text);

		const bezelContainer = bezelEl.parentElement.parentElement, CLASS_VALUE = 'ytp-text-root', SELECTOR = '.' + CLASS_VALUE; // для css

		if (!window.bezel_css_inited) {
			window.bezel_css_inited = true;
			pushCSS(
				`${SELECTOR} { display: block !important; }
				  ${SELECTOR} .ytp-bezel-text-wrapper {
					 pointer-events: none;
					 z-index: 40 !important;
				  }
				  ${SELECTOR} .ytp-bezel-text { display: inline-block !important; }
				  ${SELECTOR} .ytp-bezel { display: none !important; }`);
		}

		bezelEl.textContent = text;
		bezelContainer.classList.add(CLASS_VALUE);

		let ms = 1200;
		if ((text = String(text)) && (text.endsWith('%') || text.endsWith('x'))) {
			ms = 600
		}

		window.fadeBezel = setTimeout(() => {
			bezelContainer.classList.remove(CLASS_VALUE);
			bezelEl.textContent = ''; // fix not showing bug when frequent calls
		}, ms);
	}
	function showFallbackOSD(text) {
		let osd = document.querySelector('#rt-osd-fallback')
		if (!osd) {
			osd = document.createElement('div')
			osd.id = 'rt-osd-fallback'
			osd.style.cssText = 'position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:999999;background:rgba(0,0,0,.75);color:#fff;padding:8px 14px;border-radius:18px;font-weight:bold;font-size:14px;pointer-events:none;transition:opacity .2s ease;'
			document.body.appendChild(osd)
		}
		osd.textContent = text
		osd.style.opacity = '1'
		if (typeof window.fadeFallbackOSD === 'number') clearTimeout(window.fadeFallbackOSD)
		window.fadeFallbackOSD = setTimeout(() => {
			osd.style.opacity = '0'
		}, String(text).endsWith('%') || String(text).endsWith('x') ? 600 : 1200)
	}
	async function getSavedSetting(key, defaultValue = false) {
		const value = await GM_getValue(key)
		if (value == null) return defaultValue
		return value === true || value === 'true';
	}
	function SearchInObjectByKey({ obj, keys, match_fn = data => typeof data !== 'object' || data === null || Array.isArray(data), multiple = false, path = '' }) {
		if (typeof obj !== 'object') {
			console.error('searchInObjectByKey > keys is not Object:', ...arguments);
			return;
		}

		const setPath = d => (path ? path + '.' : '') + d;
		let hasKey, results = [];

		for (const prop in obj) {
			if (obj.hasOwnProperty(prop) && obj[prop]) {
				hasKey = typeof keys === 'string' ? (keys === prop) : keys.indexOf(prop) > -1;

				if (hasKey && (!match_fn || match_fn(obj[prop]))) {
					if (multiple) {
						results.push({
							'path': setPath(prop),
							'data': obj[prop],
						});
					} else {
						return {
							'path': setPath(prop),
							'data': obj[prop],
						};
					}
				} else if (Array.isArray(obj[prop])) {
					for (let i = 0; i < obj[prop].length; i++) {
						const resultArray = SearchInObjectByKey({
							obj: obj[prop][i],
							keys: keys,
							path: path + `[${i}]`,
							match_fn: match_fn,
						});
						if (resultArray) {
							if (multiple) results.push(resultArray);
							else return resultArray;
						}
					}
				} else if (typeof obj[prop] === 'function') {
					if (Object.keys(obj[prop]).length) {
						for (const j in obj[prop]) {
							if (typeof obj[prop][j] !== 'undefined') {
								const resultFunction = SearchInObjectByKey({
									obj: obj[prop][j],
									keys: keys,
									path: setPath(prop) + '.' + j,
									match_fn: match_fn,
								});
								if (resultFunction) {
									if (multiple) results.push(resultFunction);
									else return resultFunction;
								}
							}
						}
					}
				} else if (typeof obj[prop] === 'object') {
					const resultObject = SearchInObjectByKey({
						obj: obj[prop],
						keys: keys,
						path: setPath(prop),
						match_fn: match_fn,
					});
					if (resultObject) {
						if (multiple) results.push(resultObject);
						else return resultObject;
					}
				}
			}
		}

		if (multiple) return results;
	}
	async function Delay(ms = 1000) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}
	function GetUserLanguage() {
		if (document.documentElement.lang) {
			return document.documentElement.lang;
		} else if (navigator.language) {
			return navigator.language;
		} else {
			try {
				return new URL(
					Array.from(document.querySelectorAll("head > link[rel='search']"))
						?.find((n) => n?.getAttribute("href")?.includes("?locale="))
						?.getAttribute("href"),
				)?.searchParams?.get("locale");
			} catch {
				console.log("Cannot find browser locale. Use en as default for number formatting.");
				return "en";
			}
		}
	}
	function roundDown(num) {
		if (num < 1000) return num;
		const int = Math.floor(Math.log10(num) - 2);
		const decimal = int + (int % 3 ? 1 : 0);
		const value = Math.floor(num / 10 ** decimal);
		return value * 10 ** decimal;
	}

	// Основная функция для получения рабочего API-ключа
	async function ApiKey() {
		// Добавляем вызов в очередь
		return apiKeyQueue = apiKeyQueue.then(async () => {
			return await CheckApiKey() // Проверяем/получаем ключ
		}).catch(e => console.warn('ReTube API key error:', e));
	}

	// Проверяет наличие валидного ключа или получает новый
	async function CheckApiKey() {
		const STORAGE_VALID_APIKEY = 'YOUTUBE_VALID_APIKEY'

		// Если пользователь указал свой ключ — используем его
		const userKey = await GM_getValue('rt-userApiKey')
		if (userKey) return userKey

		// Если есть сохраненный валидный ключ — возвращаем его
		if (localStorage.getItem(STORAGE_VALID_APIKEY) !== null) return localStorage.getItem(STORAGE_VALID_APIKEY)

		// Итеративно перебираем ключи до первого рабочего
		while (!noValidApiKeys) {
			const key = await GetApiKey()
			if (!key || noValidApiKeys) return

			const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=dQw4w9WgXcQ&part=id&key=${key}`)
				.catch(() => null)
			if (response?.ok) {
				localStorage.setItem(STORAGE_VALID_APIKEY, key)
				return key
			}
		}
	}

	// Получает следующий API-ключ из списка
	async function GetApiKey() {
		const STORAGE_API_KEYS = 'YOUTUBE_API_KEYS';
		// Загружаем сохраненные ключи или получаем новые
		const storedApiKeys = localStorage.getItem(STORAGE_API_KEYS)
		let YOUTUBE_API_KEYS = storedApiKeys !== null ? safeParseJSON(storedApiKeys, null) : await getKeys();
		if (storedApiKeys !== null && !Array.isArray(YOUTUBE_API_KEYS)) {
			localStorage.removeItem(STORAGE_API_KEYS)
			YOUTUBE_API_KEYS = await getKeys()
		}

		// Загрузка и подготовка списка ключей
		async function getKeys() {
			return await fetch('https://raw.githubusercontent.com/Eject37/ReTube/refs/heads/main/Other/yt_api_keys.json').then(res => res.json()).then(keys => {
				shuffleArray(keys); // Перемешиваем массив ключей
				localStorage.setItem(STORAGE_API_KEYS, JSON.stringify(keys)); // Сохраняем
				return keys;
			}).catch(e => { // Обработка ошибок загрузки
				console.warn('ReTube: не удалось загрузить API ключи с GitHub:', e)
				localStorage.removeItem(STORAGE_API_KEYS);
			});
		}

		// Если загрузка ключей не удалась
		if (!YOUTUBE_API_KEYS || !YOUTUBE_API_KEYS.length) {
			noValidApiKeys = true;
			return;
		}

		// Если все ключи проверены и не работают
		if (apiKeysArrayLength >= YOUTUBE_API_KEYS.length) {
			noValidApiKeys = true; // Флаг окончания ключей
			localStorage.removeItem(STORAGE_API_KEYS); // Чистим хранилище что бы при обновлении вкладки заново получить ключи из github
			return;
		}

		// Берем следующий ключ из массива
		const apiKey = YOUTUBE_API_KEYS[apiKeysArrayLength];
		apiKeysArrayLength++;
		return 'AIzaSy' + apiKey;
	}
	function CleanApiKeys() {
		localStorage.removeItem('YOUTUBE_API_KEYS');
		localStorage.removeItem('YOUTUBE_VALID_APIKEY');
	}
	// Перемешивание массива
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1)); // случайный индекс
			[array[i], array[j]] = [array[j], array[i]]; // меняем местами элементы
		}
	}
	//#endregion
})()
