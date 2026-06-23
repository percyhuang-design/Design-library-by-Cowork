import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Search, Copy, Check, ArrowLeft, Sparkles, LayoutGrid, Box, Layers,
  ChevronRight, ChevronDown, ExternalLink, Code2, BookOpen, Hammer, X, Compass,
  TextCursorInput, MousePointerClick, Table2, BellRing, PanelTop, Wrench,
  CircleDot, Component, Star, Moon, Sun, ArrowUp, FileCode2, MessageSquareText, Plug2, Play
} from "lucide-react";
import { renderPreview, renderPatternPreview } from "./previews.jsx";

// Plump duo spark — a big full 4-point star + a small one (Gemini-fat lobes)
function Spark({ size = 22, className = "" }) {
  const STAR = "M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={STAR} transform="translate(-0.5 2) scale(0.9)" />
      <path d={STAR} transform="translate(13 0.2) scale(0.4)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// DATA (auto-extracted from ajenchen/design-system)
// ─────────────────────────────────────────────────────────────
const COMPONENTS = [
 {
  "name": "Accordion",
  "type": "component",
  "category": "資料展示",
  "summary": "垂直堆疊、可收合的多區塊容器——適合 FAQ、設定分組、進階選項可隱藏等情境。基於 Radix Accordion,視覺套用本 DS token。",
  "whenBullets": [
   "FAQ / 說明：常見問題、使用教學（預設全收合，使用者展開有興趣的）",
   "設定分組：一般 / 通知 / 安全 / 付款等多節 settings 頁（長 form 拆段）",
   "進階選項可隱藏：預設展示主要欄位，「進階選項」收合起來避免壓力",
   "單邊 sidebar 多分類(淺層分組):notion-style 工作區 sidebar 的 section 收合;檔案樹 / 深度 tree 改用 TreeView(見「何時不用」)",
   "多段獨立收合（非互斥切換）：各段內容垂直堆疊、可各自展開收合——若是「同一塊空間互斥切換視圖」改用 Tabs（見「何時不用」）"
  ],
  "code": "<div className=\"max-w-[480px]\">\n      <Accordion type=\"single\" collapsible defaultValue=\"refund-window\">\n        <AccordionItem value=\"refund-window\">\n          <AccordionTrigger>退款要多久才會入帳?</AccordionTrigger>\n          <AccordionContent>\n            信用卡退款於 5–10 個工作天內退回原付款帳戶,實際入帳時間依發卡銀行作業而定。\n          </AccordionContent>\n        </AccordionItem>\n        <AccordionItem value=\"refund-fee\">\n          <AccordionTrigger>退款會扣手續費嗎?</AccordionTrigger>\n          <AccordionContent>\n            標準訂單退款不收手續費;若為跨境訂單,匯率價差由發卡機構認列,本平台不另收費。\n          </AccordionContent>\n        </AccordionItem>\n      </Accordion>\n    </div>",
  "import": "import { Accordion } from '@qijenchen/design-system'"
 },
 {
  "name": "Alert",
  "type": "component",
  "category": "回饋與狀態",
  "summary": "Alert 是持久性通知，嵌入在頁面中。用於系統狀態提示、警告、錯誤訊息。使用者需要主動 dismiss 或處理。",
  "whenBullets": [
   "頁面內需要持續存在的狀態通知：方案即將到期、帳戶驗證未完成、需要更新付款方式",
   "頂部全域警告（placement=\"fixed\"）：系統維護中、服務降級、重要公告",
   "表單 / Dialog 內的 inline 提示：複雜動作的前置警告（刪除前的資料影響說明）",
   "需要使用者處理才會消失的訊息：有 CTA 可以解決問題、或需明確按下 dismiss"
  ],
  "code": "<div className=\"flex flex-col gap-3 max-w-lg\">\n      {ALL.map((v) => <Alert key={v} variant={v} appearance=\"subtle\" title={L[v]} endContent={actionBtn} />)}\n    </div>",
  "import": "import { Alert } from '@qijenchen/design-system'"
 },
 {
  "name": "AppShell",
  "type": "component",
  "category": "動作與導覽",
  "summary": "Web service 頁面層級的 layout primitive——組合 Sidebar + ChromeHeader + Aside + main content 成完整 page shell,定義跨元件 composition + responsive + a11y landmark canonical。",
  "whenBullets": [
   "多頁 web service 主結構(Linear / Notion / Slack / GitHub / Asana 類)",
   "需要 sidebar + main 持續共存,跨頁切換時 sidebar 不重渲染",
   "需要 right panel(info / inspector / detail pane)跟 main 並存"
  ],
  "code": "<AppShell />",
  "import": "import { AppShell } from '@qijenchen/design-system'"
 },
 {
  "name": "AspectRatio",
  "type": "component",
  "category": "版面與工具",
  "summary": "AspectRatio 是固定長寬比容器 primitive——確保內部 children(通常是 image / video / illustration)永遠保持指定 ratio,避免未載入時容器坍塌或 content-fit 造成的位移。",
  "whenBullets": [
   "圖片容器未載入前防坍塌:圖片 src 還沒 ready 時,容器高度若為 0 → 頁面 layout 跳動(CLS 問題)。AspectRatio 鎖死比例",
   "Coachmark / Tour media 區:onboarding 截圖 / illustration 統一 ratio",
   "Carousel item 圖像:輪播各張圖保持一致高度",
   "Card thumbnail(未來):product card / blog post cover",
   "Chart / 圖表 preview:dashboard 卡片內 chart 容器"
  ],
  "code": "<div className=\"max-w-[720px]\">\n      <h3 className=\"text-body font-bold text-foreground mb-1\">Airbnb listing hero</h3>\n      <p className=\"text-caption text-fg-muted mb-5 max-w-[600px] leading-relaxed\">\n        寬螢幕影片、feature 截圖、listing cover 標配——16/9 是最主流的 web hero ratio(Vercel、Airbnb、Linear hero section)。\n      </p>\n      <AspectRatio ratio={16 / 9} className=\"bg-muted rounded-lg overflow-hidden\">\n        <img\n          src=\"https://picsum.photos/seed/airbnb-hero/800/450\"\n          alt=\"Beachfront cottage in Santorini\"\n          className=\"w-full h-full object-cover\"\n        />\n      </AspectRatio>\n    </div>",
  "import": "import { AspectRatio } from '@qijenchen/design-system'"
 },
 {
  "name": "Avatar",
  "type": "component",
  "category": "資料展示",
  "summary": "Avatar 是視覺身份標識——代表一個人、一個實體（專案、組織、App）。不是裝飾。",
  "whenBullets": [
   "人員識別：留言者頭像、指派者、作者、團隊成員列表",
   "組織 / 專案識別：workspace logo、專案 icon、app 身份",
   "列表項目的主視覺 prefix：通訊錄、成員管理、chat room 列表",
   "hover 顯示完整人員卡：與 HoverCard 搭配呈現 ProfileCard content"
  ],
  "code": "<div className=\"flex flex-col gap-6\">\n      <div className=\"flex flex-col gap-1\">\n        <h3 className=\"text-h6 font-semibold text-foreground\">四種內容模式</h3>\n        <p className=\"text-caption text-fg-muted max-w-[720px]\">\n          按優先順序：有 src 顯示圖片 → 有 icon 顯示 Icon → 有 alt 顯示首字。都沒有時預設顯示 User icon。\n        </p>\n      </div>\n      <div className=\"flex items-center gap-6\">\n        {[\n          { label: 'Image', el: <Avatar size={40} src=\"https://i.pravatar.cc/80?u=a\" alt=\"Alice\" /> },\n          { label: 'Icon', el: <Avatar size={40} icon={Building2} color=\"blue\" /> },\n          { label: 'Text fallback', el: <Avatar size={40} alt=\"Bob\" color=\"purple\" /> },\n          { label: '預設（無任何 prop）', el: <Avatar size={40} /> },\n        ].map(({ label, el }) => (\n          <div key={label} className=\"flex flex-col items-center gap-2\">\n            {el}\n            <span className=\"text-caption text-fg-muted\">{label}</span>\n          </div>\n        ))}\n      </div>\n    </div>",
  "import": "import { Avatar } from '@qijenchen/design-system'"
 },
 {
  "name": "Badge",
  "type": "component",
  "category": "資料展示",
  "summary": "通知計數指示器，用於未讀數量、待辦計數。count 四級 severity（critical / high / medium / low）；dot 模式只 critical / high（單一 attention 點）。",
  "whenBullets": [
   "通知計數：收件匣未讀數（3）、待辦事項數（12）、notification center 新訊息數",
   "狀態紅點（dot 模式,只 critical/high）：新功能提示、「有新內容」不需具體數字的單一 attention 點",
   "疊加在互動元件右上角：Button iconOnly + Badge 通知 icon（鈴鐺 + 3）"
  ],
  "code": "<div className=\"flex flex-col gap-4\">\n      <div className=\"flex items-center gap-3\">\n        <Badge count={1} />\n        <Badge count={5} />\n        <Badge count={9} />\n        <span className=\"text-caption text-fg-muted\">個位數 → 正圓（16×16）</span>\n      </div>\n      <div className=\"flex items-center gap-3\">\n        <Badge count={10} />\n        <Badge count={42} />\n        <Badge count={99} />\n        <span className=\"text-caption text-fg-muted\">多位數 → 膠囊</span>\n      </div>\n      <div className=\"flex items-center gap-3\">\n        <Badge count={100} max={99} />\n        <Badge count={1000} max={999} />\n        <span className=\"text-caption text-fg-muted\">超過上限 → \"max+\"</span>\n      </div>\n    </div>",
  "import": "import { Badge } from '@qijenchen/design-system'"
 },
 {
  "name": "Breadcrumb",
  "type": "component",
  "category": "動作與導覽",
  "summary": "Breadcrumb 顯示「當前頁面在資訊階層中的位置」，同時提供快速回到上層的路徑導覽。 基於 shadcn/ui Breadcrumb 結構（純 HTML + Tailwind，無 Radix primitive），橋接設計系統 token。",
  "whenBullets": [
   "頁面深度 ≥ 3 層的資訊階層導覽（專案 / 子專案 / 任務，組織 / 團隊 / 成員 / 設定）",
   "檔案管理器類 UI（folder 路徑）",
   "電商多層分類（Home / Electronics / Phones / iPhone 15）"
  ],
  "code": "<Breadcrumb>\n      <BreadcrumbList>\n        <BreadcrumbItem>\n          <BreadcrumbLink href=\"/\">首頁</BreadcrumbLink>\n        </BreadcrumbItem>\n        <BreadcrumbSeparator />\n        <BreadcrumbItem>\n          <BreadcrumbLink href=\"/projects\">專案</BreadcrumbLink>\n        </BreadcrumbItem>\n        <BreadcrumbSeparator />\n        <BreadcrumbItem>\n          <BreadcrumbPage>新增專案</BreadcrumbPage>\n        </BreadcrumbItem>\n      </BreadcrumbList>\n    </Breadcrumb>",
  "import": "import { Breadcrumb } from '@qijenchen/design-system'"
 },
 {
  "name": "BulkActionBar",
  "type": "component",
  "category": "動作與導覽",
  "summary": "選取多項 item(table row / list item)後浮現的批次操作列。不獨立於選取狀態存在——selection.length === 0 時隱藏,> 0 時浮現。",
  "whenBullets": [
   "DataTable / list / Combobox(multi)/ TreeView 的 batch operation",
   "多項 item 選取後需要對全部執行同一操作(Delete / Archive / Move / Tag / Assign / Export 等)",
   "提供「批次 → 個別」的 dataset 全選 escape hatch(對 large dataset 提供「點此選取全部 M 個」)"
  ],
  "code": "<BulkActionBar />",
  "import": "import { BulkActionBar } from '@qijenchen/design-system'"
 },
 {
  "name": "Button",
  "type": "component",
  "category": "動作與導覽",
  "summary": "觸發操作或導覽的基礎互動元件。支援五種視覺強調等級（variant）、danger 語意疊加、四種尺寸、icon-only 模式。",
  "whenBullets": [
   "觸發 primary action / CTA:Submit form、Save、Publish、Send、Confirm 等改變 system state 的動作",
   "次要 navigation in flow:Wizard 的 Next / Back、Modal 的 Continue、Onboarding 的 Get started",
   "Submit form:<Button type=\"submit\"> form 結尾的提交鍵",
   "Confirm dialog:Dialog footer 的 Confirm / Cancel pair(action-bar.spec.md SSOT)",
   "Toolbar utility(xs / sm icon-only):text editor / canvas toolbar 的格式化 / 工具切換"
  ],
  "code": "<div className=\"flex flex-wrap items-center gap-3\">\n      <Button variant=\"primary\">主要動作</Button>\n      <Button variant=\"secondary\">次要動作</Button>\n      <Button variant=\"tertiary\">第三動作</Button>\n      <Button variant=\"text\">純文字</Button>\n      <Button variant=\"link\">連結樣式</Button>\n    </div>",
  "import": "import { Button } from '@qijenchen/design-system'"
 },
 {
  "name": "Calendar",
  "type": "component",
  "category": "表單與輸入",
  "summary": "事件檢視 canvas(月 view MVP)。對齊 Notion Calendar / Google Calendar;與 DatePicker(選日期 form control)職責不同,見 spec。",
  "whenBullets": [],
  "code": "<Calendar />",
  "import": "import { Calendar } from '@qijenchen/design-system'"
 },
 {
  "name": "Carousel",
  "type": "component",
  "category": "資料展示",
  "summary": "Carousel 用於在有限空間內輪播同類視覺內容——單次只顯示一張 slide，使用者透過箭頭 / 指示點切換至同類的其他視覺（圖片、產品照、使用者評語卡）。",
  "whenBullets": [
   "Hero banner:首頁 3–5 張大圖輪播(Airbnb city destinations、Netflix 精選)",
   "Product image gallery:單一商品 3–6 張不同角度 / 情境照(Stripe product page、Shopify)",
   "Testimonial / review cards:3–5 張 customer quote 卡片(Linear / Stripe 官網首頁)",
   "Onboarding walkthrough:3–5 步驟的 illustration 介紹(一次看一張,按順序推進)"
  ],
  "code": "<div className=\"max-w-[960px]\">\n      <p className=\"text-caption text-fg-muted mb-3\">\n        Airbnb / Booking 首頁風格 · 4 張城市主題大圖 · hover 顯示箭頭 · 底部白點指示\n      </p>\n      <Carousel opts={{ loop: true }}>\n        <CarouselContent>\n          {heroBanners.map((b) => (\n            <CarouselItem key={b.city}>\n              <div\n                className=\"relative h-[360px] rounded-lg overflow-hidden flex items-end p-8 bg-cover bg-center\"\n                style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.6) 100%), url(${b.image})` }}\n              >\n                <div className=\"text-white relative z-10\">\n                  <div className=\"text-caption font-medium opacity-90 mb-1\">推薦目的地</div>\n                  <div className=\"text-h2 font-bold mb-1\">{b.city}</div>\n                  <div className=\"text-body-lg opacity-95\">{b.tagline}</div>\n                </div>\n              </div>\n            </CarouselItem>\n          ))}\n        </CarouselContent>\n        <CarouselPrevious />\n        <CarouselNext />\n        <CarouselDots />\n      </Carousel>\n    </div>",
  "import": "import { Carousel } from '@qijenchen/design-system'"
 },
 {
  "name": "Chart",
  "type": "component",
  "category": "資料展示",
  "summary": "資料視覺化元件。基於 shadcn chart 結構 + Recharts v3 engine,tooltip / legend / grid / axis 全改用本 DS token。",
  "whenBullets": [
   "趨勢：時間序列數據（月營收、使用者增長、系統錯誤率變化）→ Line / Area chart",
   "比較：類別間數值對比（各部門預算、產品銷量、地區表現）→ Bar chart",
   "比例：整體的組成比例（流量來源、訂閱方案分布）→ Pie / Donut chart",
   "多維：多變量比較（產品特性雷達、員工技能圖）→ Radar chart",
   "分布：數據分散情況（交易金額分布、回應時間）→ Histogram / Scatter"
  ],
  "code": "<div>\n      <H3>六個月營收對比(Stripe dashboard 風格)</H3>\n      <Desc>\n        類別對比情境:每個月份是獨立的類別,以柱高呈現數值差異。單一數列不需要 legend,\n        tooltip 的 `indicator=\"dashed\"` 搭配單色表示單一系列。\n      </Desc>\n      <div className=\"max-w-2xl\">\n        <ChartContainer config={revenueConfig}>\n          <BarChart accessibilityLayer data={revenueData}>\n            <CartesianGrid vertical={false} />\n            <XAxis dataKey=\"month\" tickLine={false} axisLine={false} tickMargin={8} />\n            <YAxis\n              tickLine={false}\n              axisLine={false}\n              tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}\n            />\n            <ChartTooltip\n              content={\n                <ChartTooltipContent\n                  indicator=\"dashed\"\n                  formatter={(value) => `$${Number(value).toLocaleString()}`}\n                />\n              }\n            />\n            <Bar dataKey=\"revenue\" fill=\"var(--color-revenue)\" radius={4} />\n          </BarChart>\n        </ChartContainer>\n      </div>\n    </div>",
  "import": "import { Chart } from '@qijenchen/design-system'"
 },
 {
  "name": "Checkbox",
  "type": "component",
  "category": "表單與輸入",
  "summary": "Checkbox 和 Radio 是表單內的選擇控件，視覺語言完全一致，差異只有形狀和語意。兩者都綁在 form state、隨 submit 才生效（非即時套用——這是與 Switch 的根本差異，見下「與 Switch 的分界」）。",
  "whenBullets": [],
  "code": "<div className=\"flex flex-col gap-6 max-w-sm\">\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">edit</h3>\n        <Checkbox defaultChecked aria-label=\"同意條款(edit mode demo)\" />\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">display</h3>\n        <Checkbox mode=\"display\" checked />\n        <p className=\"text-caption text-fg-muted mt-1\">純視覺 glyph（✓ / —）；語意由 context（如 DataTable 表頭 + 行標籤）提供，display 不暴露獨立 aria-label。需螢幕報讀器可讀的勾選請用 edit / readonly 模式。</p>\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">readonly</h3>\n        <Checkbox readOnly checked aria-label=\"同意條款(readonly mode demo)\" />\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">disabled</h3>\n        <Checkbox disabled checked aria-label=\"同意條款(disabled mode demo)\" />\n      </div>\n    </div>",
  "import": "import { Checkbox } from '@qijenchen/design-system'"
 },
 {
  "name": "Chip",
  "type": "component",
  "category": "資料展示",
  "summary": "Chip 是 Material Design Filter Chip 的實作——用於從多個選項裡選取任意數量（多選）或單一選項（單選），視覺上是一排獨立的 pill。 基於 Radix ToggleGroup，橋接設計系統 token。",
  "whenBullets": [
   "Filter panel 的 tag 選取：語言、狀態、類別、標籤",
   "Toolbar 上的多選過濾：列表頁、搜尋結果頁",
   "標籤選取：為內容選擇適合的 tags"
  ],
  "code": "<Chip />",
  "import": "import { Chip } from '@qijenchen/design-system'"
 },
 {
  "name": "CircularProgress",
  "type": "component",
  "category": "回饋與狀態",
  "summary": "圓形進度／載入指示器，用於表達進行中的操作或完成比例（環狀呈現）。",
  "whenBullets": [
   "Button / Inline Action 的 loading 狀態:Button loading prop 內部渲染(無 value = indeterminate)",
   "Field loading 狀態(Input / NumberInput / Combobox / Select):consumer 傳 loading={true} → 元件內部保持可編輯(Ant Input.Search 派,UX「邊改邊讀」,非 Material readonly 派),自動在尾端渲染 <CircularProgress> + aria-busy=\"true\" 標示處理中(與 endAction 互斥;見 input.tsx loading 分支與 field-controls.spec.md「Loading state」)",
   "Cell / row 局部進度(cell 上傳中、cell async fetch 中):size 16-20 inline",
   "inline 可量化小進度(如 file uploader list row 的上傳 % / 倒數計時):有 value",
   "全頁 / empty surface 載入:<Empty icon={<CircularProgress size={48}/>}/> compose(Empty canonical 垂直堆疊,無需另造)"
  ],
  "code": "<div className=\"flex items-center gap-6\">\n      {/* CircularProgress 只提供一種預設尺寸(24);其他尺寸由 consumer context 自動縮放\n          (Button loading = iconSize / Input loading = iconSize / Empty = iconSize)。\n          不 parallel 展示多 sizes 因為 DS 不「提供各種 sizes」讓 consumer 挑,而是透過原則\n          在 consumer 端自動決定(見 spec.md「Size canonical」)。 */}\n      <CircularProgress />\n      <CircularProgress value={60} aria-label=\"進度 60%\" />\n      <CircularProgress value={90} affix=\"value\" aria-label=\"進度 90%\" />\n    </div>",
  "import": "import { CircularProgress } from '@qijenchen/design-system'"
 },
 {
  "name": "Coachmark",
  "type": "component",
  "category": "回饋與狀態",
  "summary": "Coachmark 是主動推送的功能介紹浮層——anchor 到特定 UI 元素,帶 media + title + description + footer 按鈕列,用於首次功能介紹 / onboarding 多步導覽 / 新功能提示。",
  "whenBullets": [],
  "code": "<Coachmark />",
  "import": "import { Coachmark } from '@qijenchen/design-system'"
 },
 {
  "name": "Combobox",
  "type": "component",
  "category": "表單與輸入",
  "summary": "Combobox 是多選下拉的輸入與顯示元件。選中值以 Tag 陣列呈現，支援單行溢出與多行換行兩種版面。底層依裝置走兩條實作（觸控偵測自動切換）：桌機（預設，非觸控）走自建浮層選單（SelectMenu → Popover + Command（cmdk）），手機 / 觸控裝置走隱藏的原生 <select>（配合 Tag 疊層 overlay）。詳見「A11y 預設」段的雙路徑設計。",
  "whenBullets": [
   "多選場景（使用者可選 0 個或多個）：Tag、分類、協作成員、通知訂閱",
   "選項數 6+（少於 6 且 2-5 可見的多選，用 Checkbox stack 更有效）",
   "空間受限：Table cell、toolbar filter、窄欄位 Form",
   "需要搜尋或大量選項：searchable 後可處理 50+ 選項"
  ],
  "code": "<Combobox />",
  "import": "import { Combobox } from '@qijenchen/design-system'"
 },
 {
  "name": "Command",
  "type": "component",
  "category": "動作與導覽",
  "summary": "Command 是 cmdk 的 shadcn passthrough 搜尋 + 鍵盤導覽清單 primitive。App 層級不直接使用 Command——透過 Select / Combobox / PeoplePicker 的 searchable 模式消費,底層自動切換到 SelectMenu(SelectMenu 包 Command)。唯一可以直接組合 Command 的場景是 Command Palette(Cmd+K)——跨頁全域搜尋與快速動作入口。",
  "whenBullets": [
   "SelectMenu 內部搜尋：Select / Combobox / PeoplePicker 的 searchable 模式底層",
   "Command Palette（Cmd+K）：全局跨頁搜尋、快速動作入口",
   "需要搜尋過濾 + 鍵盤導覽的選項清單"
  ],
  "code": "<Command />",
  "import": "import { Command } from '@qijenchen/design-system'"
 },
 {
  "name": "DataTable",
  "type": "component",
  "category": "資料展示",
  "summary": "基於 TanStack Table 的資料表格，支援虛擬捲動、排序、多種尺寸。",
  "whenBullets": [
   "結構化資料列表：專案列表、使用者管理、訂單清單、商品管理、報表檢視",
   "需要排序 / 篩選 / 分頁的資料：100+ 筆需要探索、搜尋、縮小範圍",
   "需要多欄位對齊掃視的資料：財務報表（數字右對齊縱向比較）、日期時間序列",
   "需要 inline 編輯 cell 的資料（editable table mode）",
   "簡單展示也用 DataTable（最少 config）——不維護第二個靜態 Table 元件"
  ],
  "code": "<DataTable columns={columnsWithPrice} data={sampleData} height=\"auto\" />",
  "import": "import { DataTable } from '@qijenchen/design-system'"
 },
 {
  "name": "DateGrid",
  "type": "component",
  "category": "表單與輸入",
  "summary": "DateGrid 是 DatePicker 內部的 date-grid primitive(月份格網 + 前後導航 + 日 cell),不直接面向 consumer。2026-04-21 從原本的 Calendar/ 改名為 DateGrid/,因為「Calendar」此命名在世界級 DS 慣例專指事件檢視 canvas(見 ../Calendar/calendar.spec.md),而本元件只是「選日期用的格網」,不做事件呈現。保留 Calendar 名字給 event view 元件是世界級對齊。",
  "whenBullets": [
   "Inline 月曆顯示:dashboard / 行事曆小卡 / 日期 filter bar",
   "DatePicker 浮層內嵌:DatePicker 消費本元件作為選日 popup(見 ../DatePicker/date-picker.spec.md)",
   "範圍選擇:mode=\"range\" 適用「from → to」場景(訂單日期範圍、查詢時段)",
   "多日選擇:mode=\"multiple\" 適用「勾選多個不連續日期」(event sign-up)"
  ],
  "code": "<DateGrid />",
  "import": "import { DateGrid } from '@qijenchen/design-system'"
 },
 {
  "name": "DatePicker",
  "type": "component",
  "category": "表單與輸入",
  "summary": "日期選擇元件。外觀同 Select，Calendar icon 取代 ChevronDown。支援 clearable 和格式化選項。",
  "whenBullets": [
   "單一日期選擇：出生日、到期日、提醒日、發佈日",
   "需要 locale-aware 顯示（Intl.DateTimeFormat 自動處理年月日順序、月份語言）",
   "需要視覺上與 Dialog / Popover / SelectMenu 一致的浮層體驗（所有浮層都用我們的 token）",
   "DataTable 的日期欄位（自動整合，meta.type='date'）"
  ],
  "code": "<DatePicker />",
  "import": "import { DatePicker } from '@qijenchen/design-system'"
 },
 {
  "name": "DescriptionList",
  "type": "component",
  "category": "資料展示",
  "summary": "唯讀 label + value 展示(HTML dl / dt / dd)。層級靠色彩區分而非字體大小。cols 控制欄數(1 / 2 / 3)。",
  "whenBullets": [
   "Profile / detail panel 的屬性列表：使用者資料（Email / Phone / Role / Created at）",
   "ProfileCard 的 info fields：HoverCard 內的次要資訊展示",
   "固定資訊展示：產品規格、訂單明細、設定值（唯讀）",
   "HTML 語義為 dl + dt + dd：對 screen reader 明確表達「屬性-值」關係"
  ],
  "code": "<div className=\"border border-border rounded-lg p-4 max-w-md\">\n      <DescriptionList cols={1}>\n        <DescriptionItem label=\"姓名\">Ada Chen</DescriptionItem>\n        <DescriptionItem label=\"Email\">ada.chen@example.com</DescriptionItem>\n        <DescriptionItem label=\"職稱\">Design Engineer</DescriptionItem>\n        <DescriptionItem label=\"團隊\">Design Systems</DescriptionItem>\n        <DescriptionItem label=\"時區\">UTC+8(台北)</DescriptionItem>\n      </DescriptionList>\n    </div>",
  "import": "import { DescriptionList } from '@qijenchen/design-system'"
 },
 {
  "name": "Dialog",
  "type": "component",
  "category": "覆蓋層",
  "summary": "Modal 對話框，基於 Radix Dialog。用於需要使用者注意力、阻斷背景互動的操作流程（建立、編輯、確認）。",
  "whenBullets": [
   "需要專注的操作流程：建立 / 編輯複雜表單、多步驟精靈、付款結帳",
   "破壞性動作確認：刪除、離開不儲存、登出多個裝置",
   "短暫但重要的資訊：首次引導、重要公告必須被看到才能繼續",
   "需要阻斷背景互動的脈絡：使用者必須完成或取消此流程才能回到頁面"
  ],
  "code": "<Dialog>\n      <DialogTrigger asChild>\n        <Button>邀請成員加入專案</Button>\n      </DialogTrigger>\n      <DialogContent>\n        <DialogHeader>\n          <DialogTitle>邀請成員到「Q3 設計改版」</DialogTitle>\n        </DialogHeader>\n        <DialogBody>\n          <p className=\"text-body\">輸入 Email 即可邀請。被邀請者會收到通知信並自動加入專案。</p>\n        </DialogBody>\n        <DialogFooter>\n          <DialogClose asChild>\n            <Button variant=\"tertiary\">取消</Button>\n          </DialogClose>\n          <Button variant=\"primary\">寄出邀請</Button>\n        </DialogFooter>\n      </DialogContent>\n    </Dialog>",
  "import": "import { Dialog } from '@qijenchen/design-system'"
 },
 {
  "name": "DropdownMenu",
  "type": "component",
  "category": "動作與導覽",
  "summary": "DropdownMenu 是按鈕觸發的動作選單——使用者從中選擇一個動作並立即執行。 基於 Radix DropdownMenu（shadcn 包裝），item 佈局消費 MenuItem primitive。",
  "whenBullets": [
   "次要動作集合：卡片右上角 ⋮ 三點選單（複製、刪除、分享、匯出）",
   "工具列的溢出動作：ToolBar 放不下的次要操作集中在 more menu",
   "即時生效的設定 toggle：顯示 / 隱藏欄位、排序方式、主題切換",
   "需要分群或子選單的動作清單：export as PDF / CSV / JSON 這類多層結構"
  ],
  "code": "<DropdownMenu>\n      <DropdownMenuTrigger asChild>\n        <Button variant=\"tertiary\" endIcon={ChevronDown}>操作</Button>\n      </DropdownMenuTrigger>\n      <DropdownMenuContent>\n        <DropdownMenuItem startIcon={Copy} shortcut=\"⌘C\">\n          複製\n        </DropdownMenuItem>\n        <DropdownMenuItem startIcon={Pencil} shortcut=\"⌘E\">\n          編輯\n        </DropdownMenuItem>\n        <DropdownMenuSeparator />\n        <DropdownMenuItem startIcon={Trash2} shortcut=\"⌘⌫\" className=\"text-error\">\n          刪除\n        </DropdownMenuItem>\n      </DropdownMenuContent>\n    </DropdownMenu>",
  "import": "import { DropdownMenu } from '@qijenchen/design-system'"
 },
 {
  "name": "Empty",
  "type": "component",
  "category": "回饋與狀態",
  "summary": "空狀態視覺元件——icon + title + description + action 的居中垂直堆疊。預設只需 description,其他皆可選。",
  "whenBullets": [
   "Table / list / grid 空狀態：DataTable 查無資料、搜尋無結果",
   "SelectMenu / Combobox 下拉空：「無選項」「找不到符合的項目」",
   "Page section 無內容：dashboard widget 暫無資料、設定頁未建立任何項目",
   "初次引導：讓使用者首次使用時知道「這裡會放什麼」+ 有 CTA 建立"
  ],
  "code": "<div className=\"border border-border rounded-lg p-8 max-w-md\">\n      <Empty\n        icon={SearchX}\n        title=\"找不到相符的任務\"\n        description=\"試試其他關鍵字,或調整篩選條件\"\n        action={<Button variant=\"tertiary\">清除所有篩選</Button>}\n      />\n    </div>",
  "import": "import { Empty } from '@qijenchen/design-system'"
 },
 {
  "name": "Field",
  "type": "component",
  "category": "表單與輸入",
  "summary": "Field 是表單欄位的佈局容器。只負責排版（label / control / description / error 的空間關係）與狀態 context（把 mode / disabled / required / invalid / id 傳給子元件），不擁有任何資料型別邏輯。",
  "whenBullets": [
   "表單欄位的 label + control + description + error 標準佈局：登入表單、設定頁、建立對話框",
   "需要 required 星號、disabled 狀態、invalid 驗證的統一行為",
   "需要 horizontal / vertical 排版切換：設定頁常用 horizontal（label 左 / control 右）",
   "多欄位垂直堆疊：搭配 FieldGroup 管理 density-aware 間距"
  ],
  "code": "<div className=\"max-w-sm\">\n      <FieldGroup>\n        <Field required>\n          <FieldLabel>姓名</FieldLabel>\n          <Input placeholder=\"請輸入姓名\" />\n          <FieldDescription>中英文皆可</FieldDescription>\n        </Field>\n\n        <Field>\n          <FieldLabel>Email</FieldLabel>\n          <Input placeholder=\"name@example.com\" />\n        </Field>\n\n        <Field required invalid>\n          <FieldLabel>密碼</FieldLabel>\n          <Input placeholder=\"至少 8 碼\" />\n          <FieldError>密碼長度不足</FieldError>\n        </Field>\n\n        <Field>\n          <FieldLabel>備註</FieldLabel>\n          <Input placeholder=\"選填\" />\n          <FieldDescription>其他專案相關說明</FieldDescription>\n        </Field>\n      </FieldGroup>\n    </div>",
  "import": "import { Field } from '@qijenchen/design-system'"
 },
 {
  "name": "FieldControlGroup",
  "type": "component",
  "category": "表單與輸入",
  "summary": "多個 Field controls 視覺接合成一個 input frame(border-collapse)。對齊 Ant Space.Compact / Bootstrap input-group idiom。",
  "whenBullets": [
   "兩個語意連動的 control 視覺一體(電話 = 國碼 + 號碼;金額 = 幣別 + 數字)",
   "DataTable 進階篩選 row(field + operator + value)",
   "Search input + Submit button",
   "Range input(start + end)",
   "Phone / address 多段輸入"
  ],
  "code": "<FieldControlGroup />",
  "import": "import { FieldControlGroup } from '@qijenchen/design-system'"
 },
 {
  "name": "FileItem",
  "type": "component",
  "category": "資料展示",
  "summary": "單一檔案的列項呈現——顯示檔名、類型、大小與操作（下載／刪除／預覽）。",
  "whenBullets": [
   "檔案上傳清單：drag-drop upload、multiple file selector 的選中檔案列表",
   "附件展示：email / comment / ticket 的附件列表（rich mode 顯示縮圖 + 檔名）",
   "批次處理進度：CSV / JSON 匯入的逐檔進度追蹤（compact mode，預設）",
   "上傳錯誤回報：顯示哪些檔案失敗 + 重試按鈕"
  ],
  "code": "// rich(預設 form surface)各 status 展示:uploading / completed(保留 100% 完成條)/ error\n    // 也可傳 onClick/onDownload 讓整 row 點開(預設 FileViewer,consumer 決定)\n    // Rich 永遠 border card → list wrapper `gap-2` 防邊框相黏\n    <div className=\"flex flex-col gap-2 max-w-md\">\n      <FileItem mode=\"rich\" name=\"Alan Profile.png\" status=\"uploading\" progress={40}\n        description=\"5.7 MB of 7.5MB\" thumbnailSrc=\"https://i.pravatar.cc/80?u=alan\" actions={deleteBtn} />\n      <FileItem mode=\"rich\" name=\"Alan Profile.png\" status=\"completed\"\n        description=\"5.7 MB\" thumbnailSrc=\"https://i.pravatar.cc/80?u=alan\"\n        onClick={noop} onDownload={noop} actions={deleteBtn} />\n      <FileItem mode=\"rich\" name=\"Alan Profile.png\" status=\"error\" progress={65}\n        description={errorDescWithLog} thumbnailSrc=\"https://i.pravatar.cc/80?u=alan\"\n        onRetry={noop} actions={deleteBtn} />\n    </div>",
  "import": "import { FileItem } from '@qijenchen/design-system'"
 },
 {
  "name": "FileUpload",
  "type": "component",
  "category": "表單與輸入",
  "summary": "FileUpload 是拖放 / 點擊上傳區塊——可拖曳檔案進入或點擊觸發檔案選取浮窗。負責「上傳觸發 + 拖放偵測」,不負責「已上傳檔案清單顯示」(那是 FileItem 的職責)。",
  "whenBullets": [
   "單檔上傳(頭像、大頭照、PDF 履歷):multiple={false}(預設)",
   "批次上傳(相簿、檔案附件、批次匯入):multiple={true}",
   "拖放支援為 UX 加分(圖片、檔案):pointer + touch 都能用",
   "搭配 FileItem 顯示已上傳:上傳後 consumer 以 FileItem list 列出"
  ],
  "code": "<div className=\"max-w-lg\">\n      <FileUpload\n        accept=\".pdf,.doc,.docx\"\n        maxSize={5_000_000}\n        title=\"上傳你的履歷\"\n        description=\"PDF / Word 格式,單檔最大 5 MB\"\n        onUpload={noop}\n        onReject={noop}\n      />\n    </div>",
  "import": "import { FileUpload } from '@qijenchen/design-system'"
 },
 {
  "name": "FileViewer",
  "type": "component",
  "category": "資料展示",
  "summary": "FileViewer 是可延伸的網頁檔案預覽殼層(modal fullscreen)——負責 overlay / toolbar / 鍵盤 / filmstrip / 詳細資訊面板一切 chrome,檔案本體由 renderer registry 按 file type 決定誰渲染。MVP 內建 ImageRenderer + FallbackRenderer,未來可透過 registerFileRenderer() 擴充 PDF / Video / Code 等 renderer 而不動 shell。",
  "whenBullets": [],
  "code": "<FileViewer />",
  "import": "import { FileViewer } from '@qijenchen/design-system'"
 },
 {
  "name": "HoverCard",
  "type": "component",
  "category": "覆蓋層",
  "summary": "HoverCard 是 hover 觸發的可互動浮層 primitive(基於 Radix HoverCard)。與 Tooltip 的差異:內容可互動(按鈕、連結、hover 子元素)。HoverCard 本身不含視覺樣式——bg / border / shadow / padding 由 consumer 決定。以下情境展示最常見的兩種 consumer pattern(亮色 ProfileCard / 深色 tooltip)以及自訂情境。",
  "whenBullets": [
   "人員資訊卡：Avatar hover 顯示 ProfileCard（姓名、角色、聯絡按鈕）",
   "溢出項目展開：人員列表 +N hover 展示完整清單",
   "內容預覽：連結 / 文件 hover 顯示標題 / 縮圖 / 摘要預覽",
   "不破壞當前畫面的補充資訊：hover 可看細節，不 hover 也能使用主要介面"
  ],
  "code": "<div className=\"flex flex-col gap-3 max-w-xl\">\n      <p className=\"text-caption text-fg-muted\">\n        GitHub PR reviewer hover 看人員卡 — 可點「傳訊息」或「查看個人頁」。\n      </p>\n      <div className=\"flex items-center gap-3\">\n        <span className=\"text-caption text-fg-muted\">Reviewer:</span>\n        <HoverCard>\n          <HoverCardTrigger asChild>\n            <button type=\"button\" aria-label=\"Ada Chen 個人資訊\" className=\"cursor-pointer rounded-full\">\n              <Avatar alt=\"Ada Chen\" color=\"indigo\" size={28} />\n            </button>\n          </HoverCardTrigger>\n          <HoverCardContent\n            className=\"bg-surface-raised border border-border rounded-lg p-0\"\n            style={{ boxShadow: 'var(--elevation-200)', width: 280 }}\n          >\n            <ProfileCard\n              name=\"Ada Chen\"\n              avatar={{ alt: 'Ada Chen', color: 'indigo' }}\n              subtitle=\"Design Engineer · Frontend\"\n              status=\"online\"\n              statusMessage=\"正在處理 login 頁重構\"\n              fields={[\n                { label: 'Timezone', value: 'UTC+8 台北' },\n                { label: 'Employee #', value: 'E-4821' },\n              ]}\n              onViewMore={() => {}}\n            />\n          </HoverCardContent>\n        </HoverCard>\n      </div>\n    </div>",
  "import": "import { HoverCard } from '@qijenchen/design-system'"
 },
 {
  "name": "Input",
  "type": "component",
  "category": "表單與輸入",
  "summary": "Input 是純文字的輸入與顯示元件。格式化邏輯為 identity（value → value）——使用者打什麼就存什麼、顯示什麼。",
  "whenBullets": [
   "純文字資料：姓名、標題、搜尋字串、slug、ID、隨意 label",
   "email / URL / password 等特殊但仍屬「文字」的資料（搭配 type=\"email\" / \"url\" / \"password\" + 適合的 startIcon）",
   "格式化邏輯是 identity 的場景——value → value，不需要千分位、不需要 locale、不需要 picker",
   "單行 輸入（多行用 Textarea）"
  ],
  "code": "<div className=\"flex flex-col gap-6 max-w-sm\">\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">edit</h3>\n        <p className=\"text-caption text-fg-muted mb-3\">Focus 時邊框變 primary</p>\n        <Input defaultValue=\"Wireless Bluetooth Headphones\" placeholder=\"輸入商品名稱\" aria-label=\"商品名稱(edit mode demo)\" />\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">display</h3>\n        <p className=\"text-caption text-fg-muted mb-3\">純展示（read-only 內容）— 無 input chrome / 無互動 affordance</p>\n        <Input mode=\"display\" value=\"Wireless Bluetooth Headphones\" aria-label=\"商品名稱(display mode demo)\" />\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">readonly</h3>\n        <p className=\"text-caption text-fg-muted mb-3\">neutral-2 底色、無邊框、文字正常色</p>\n        <Input mode=\"readonly\" defaultValue=\"Wireless Bluetooth Headphones\" aria-label=\"商品名稱(readonly mode demo)\" />\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">disabled</h3>\n        <p className=\"text-caption text-fg-muted mb-3\">停用原因用 Tooltip 或 Form help text 說明</p>\n        <Tooltip>\n          <TooltipTrigger asChild>\n            <div>\n              <Input mode=\"disabled\" defaultValue=\"Wireless Bluetooth Headphones\" aria-label=\"商品名稱(disabled mode demo)\" />\n            </div>\n          </TooltipTrigger>\n        \n  // …",
  "import": "import { Input } from '@qijenchen/design-system'"
 },
 {
  "name": "LinkInput",
  "type": "component",
  "category": "表單與輸入",
  "summary": "URL 輸入元件。有合法 URL 時以藍色連結顯示，Pencil icon 觸發編輯。blur 時驗證格式。",
  "whenBullets": [
   "需要儲存的外部 URL：網站連結、文件 URL、repo 地址、社群連結",
   "顯示時使用者希望直接點開：在 readonly / table cell / 設定頁可點擊開啟",
   "需要 URL 格式驗證（blur 時驗證 protocol + 結構）"
  ],
  "code": "<LinkInput />",
  "import": "import { LinkInput } from '@qijenchen/design-system'"
 },
 {
  "name": "Menu",
  "type": "component",
  "category": "動作與導覽",
  "summary": "MenuItem 是所有 menu 類元件的共用視覺佈局層——處理 prefix 對齊、尺寸、狀態。SelectMenu、DropdownMenu、未來的 ContextMenu 等都消費它。它只負責 layout（padding、gap、prefix alignment、typography），互動行為由各 menu 的 Radix primitive 外層控制。",
  "whenBullets": [],
  "code": "<MenuContainer><MenuGroup>\n      <MenuItem>收件匣</MenuItem>\n      <MenuItem>草稿</MenuItem>\n      <MenuItem>已傳送</MenuItem>\n    </MenuGroup></MenuContainer>",
  "import": "import { Menu } from '@qijenchen/design-system'"
 },
 {
  "name": "Notice",
  "type": "component",
  "category": "回饋與狀態",
  "summary": "Notice 是 Toast / Alert 共用的視覺佈局 primitive——只負責 layout 與 icon 選擇,色彩由 consumer 透過 data-theme + text-foreground 控制。App 層級不直接使用 <Notice>,而是透過 <Alert> / <Toast>。以下情境展示 Notice 被 consumer 包成兩種視覺風格(subtle / solid)後的樣貌。",
  "whenBullets": [],
  "code": "<div className=\"max-w-2xl\">\n      <SubtleShell variant=\"success\">\n        <Notice\n          variant=\"success\"\n          iconClassName={SUBTLE_ICON_COLOR.success}\n          title=\"專案已成功部署到 production 環境\"\n          endContent={\n            <Button variant=\"tertiary\" size=\"xs\">\n              查看部署紀錄\n            </Button>\n          }\n        />\n      </SubtleShell>\n    </div>",
  "import": "import { Notice } from '@qijenchen/design-system'"
 },
 {
  "name": "NumberInput",
  "type": "component",
  "category": "表單與輸入",
  "summary": "NumberInput 是數值的輸入與顯示元件。格式化邏輯：toLocaleString() + prefix/suffix + precision。",
  "whenBullets": [
   "所有數值資料：金額、數量、百分比、比率、測量值、年齡、計數",
   "需要格式化的 value：千分位（1,234,567）、貨幣前綴（$2,490）、百分比後綴（85.5%）、小數精度（0.00）",
   "需要 locale-aware 顯示（toLocaleString() 自動處理千分位分隔符、小數點形式）",
   "DataTable 的數值欄位（right-aligned + 自動格式化）"
  ],
  "code": "<NumberInput />",
  "import": "import { NumberInput } from '@qijenchen/design-system'"
 },
 {
  "name": "OverflowIndicator",
  "type": "component",
  "category": "版面與工具",
  "summary": "OverflowIndicator 是 +N 溢出指示器——當容器無法顯示全部項目時,以 +N 形式提示,hover 展開完整清單(HoverCard 承載,可互動)。由 Combobox / PeoplePicker / Avatar Group 等元件消費,App 不直接使用。",
  "whenBullets": [],
  "code": "<div className=\"flex flex-col gap-3 max-w-sm\">\n      <p className=\"text-caption text-fg-muted\">\n        Jira 任務 labels 欄位 — 單行模式時顯示前 2 個 tag,其餘折成 +N hover 展開。\n      </p>\n      <div className=\"border border-border rounded-md px-3 py-1.5 flex items-center gap-1 bg-surface\">\n        {labelTags.slice(0, 2).map((t) => (\n          <Tag key={t.value} size=\"sm\">\n            {t.label}\n          </Tag>\n        ))}\n        <OverflowIndicator count={labelTags.length - 2} shape=\"tag\" size=\"sm\">\n          {labelTags.slice(2).map((t) => (\n            <Tag key={t.value} size=\"sm\">\n              {t.label}\n            </Tag>\n          ))}\n        </OverflowIndicator>\n      </div>\n    </div>",
  "import": "import { OverflowIndicator } from '@qijenchen/design-system'"
 },
 {
  "name": "PeoplePicker",
  "type": "component",
  "category": "表單與輸入",
  "summary": "人員選擇元件。外觀同 Select，value 前面多 avatar。多人時 avatar 堆疊。",
  "whenBullets": [
   "指派人員：指派 task、assignee、reviewer 選擇",
   "加入成員：team / channel / project 加人",
   "@提及選擇器：文章 / 留言 / chat 內插入 @user",
   "多人協作選擇：訂單協作人員、共同擁有者",
   "需要 avatar 視覺識別：人員清單視覺辨識高於純文字 label"
  ],
  "code": "<PeoplePicker />",
  "import": "import { PeoplePicker } from '@qijenchen/design-system'"
 },
 {
  "name": "Popover",
  "type": "component",
  "category": "覆蓋層",
  "summary": "Popover 是點擊觸發的浮層容器——提供定位、動畫、焦點管理，內容由 consumer 決定。",
  "whenBullets": [
   "點擊觸發的輕量浮層：filter panel、date picker 展開、設定 mini panel",
   "需要放互動元素的浮層：按鈕、輸入框、checkbox 群組",
   "非 modal 的補充 UI：使用者可以忽略並繼續主流程，不阻斷背景互動"
  ],
  "code": "<Popover>\n      <PopoverTrigger asChild>\n        <Button variant=\"tertiary\" startIcon={Filter}>依狀態篩選</Button>\n      </PopoverTrigger>\n      <PopoverContent align=\"start\">\n        <PopoverHeader>\n          <PopoverTitle>依狀態篩選</PopoverTitle>\n        </PopoverHeader>\n        <PopoverBody>\n          {/* 此 Popover 是「多選 + footer save CTA」模式 — 勾多項按「套用」才 commit。\n              區別於 DropdownMenu「click 即觸發」。CheckboxGroup 設計準則 自帶 zero-gap\n              + Context 隔離,取代既有手刻 grid div(2026-04-29 migration)。 */}\n          {/* CheckboxGroup zero-gap canonical(checkbox.spec.md L225)— 取代既有手刻 grid div */}\n          <CheckboxGroup>\n            <Checkbox defaultChecked label=\"待處理\" />\n            <Checkbox defaultChecked label=\"進行中\" />\n            <Checkbox label=\"已完成\" />\n            <Checkbox label=\"已封存\" />\n          </CheckboxGroup>\n        </PopoverBody>\n        <PopoverFooter>\n          <Button variant=\"tertiary\" size=\"sm\" className=\"flex-1\">清除</Button>\n          <Button variant=\"primary\" size=\"sm\" className=\"flex-1\">套用</Button>\n        </PopoverFooter>\n      </PopoverContent>\n    </Popover>",
  "import": "import { Popover } from '@qijenchen/design-system'"
 },
 {
  "name": "ProfileCard",
  "type": "component",
  "category": "資料展示",
  "summary": "人物資訊卡片，集中呈現頭像、姓名、職稱與聯絡／操作入口。",
  "whenBullets": [
   "Avatar hover 顯示人員詳情：留言者 / 指派者 / 成員列表 hover 彈出詳細資訊",
   "@提及互動：@username hover 顯示該使用者的 card",
   "團隊 / 成員快速預覽：Settings 頁的成員列表、PR reviewer 清單的 hover 預覽",
   "需要快速動作的人員資訊：ProfileCard 可放 CTA button（Message / Invite / Follow）"
  ],
  "code": "<div className=\"p-16 flex flex-col gap-6\">\n      <ProfileCardHover name=\"Hanamizuki Yukinome 花水木雪乃芽\" src=\"https://i.pravatar.cc/128?u=hana\" subtitle=\"Design｜D-0042｜EMP-1001\" />\n      <ProfileCardHover name=\"Alice Chen\" src=\"https://i.pravatar.cc/128?u=alice\" subtitle=\"Design｜D-0042｜EMP-1001\" />\n      <ProfileCardHover name=\"Bob Lin\" src=\"https://i.pravatar.cc/128?u=bob\" subtitle=\"Engineering｜E-0087｜EMP-1002\" />\n    </div>",
  "import": "import { ProfileCard } from '@qijenchen/design-system'"
 },
 {
  "name": "ProgressBar",
  "type": "component",
  "category": "回饋與狀態",
  "summary": "量化 linear 進度(determinate progress)視覺 primitive。0–100% 已知進度、單向推進、可預期終點。未知進度或 inline 小空間改用 CircularProgress。",
  "whenBullets": [
   "批次任務進度：CSV 匯入、批量同步、報表生成（Linear batch action / Jira bulk edit / Airtable import）",
   "下載 / 匯出進度（非檔案上傳列表情境）:單檔下載進度、匯出 zip、報表生成",
   "多步驟流程的整體進度：表單 wizard「步驟 3/5 = 60%」（但步驟結構本身用 Steps 元件,ProgressBar 只表達整體完成比例）",
   "Table cell / row 內的 inline 進度：DataTable 裡「配額使用率 45%」、「完成度 78%」等單列靜態指標"
  ],
  "code": "<ProgressBar />",
  "import": "import { ProgressBar } from '@qijenchen/design-system'"
 },
 {
  "name": "RadioGroup",
  "type": "component",
  "category": "表單與輸入",
  "summary": "RadioGroup 是互斥單選且全選項可見的表單控件——從 2-5 個選項中挑恰好一個，每個選項一行獨立呈現（支援 label + description + 完整閱讀）。",
  "whenBullets": [
   "決策節點的互斥單選：付款方式、訂閱方案、票種、權限角色——使用者需要對比評估",
   "選項需要描述文字：法律條款、方案價格、feature 比較（Radio 的 description 支援完整閱讀，不截斷）",
   "2-5 個選項且全部可見：讓使用者一眼看完所有選項，不需要點兩次（Select）",
   "空間允許 O(n) 垂直展開：form 內、dialog 內、setting section 內"
  ],
  "code": "<div className=\"flex flex-col gap-6 max-w-md\">\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">edit</h3>\n        <RadioGroup defaultValue=\"yearly\" aria-label=\"付款方案(edit mode demo)\">\n          <SelectionItem control={<RadioGroupItem value=\"monthly\" id=\"m-edit\" />} label=\"月付方案\" htmlFor=\"m-edit\" />\n          <SelectionItem control={<RadioGroupItem value=\"yearly\" id=\"y-edit\" />} label=\"年付方案\" description=\"每年 $2,990，省下兩個月\" htmlFor=\"y-edit\" />\n          <SelectionItem control={<RadioGroupItem value=\"lifetime\" id=\"l-edit\" />} label=\"終身方案\" htmlFor=\"l-edit\" />\n        </RadioGroup>\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">display</h3>\n        <RadioGroup mode=\"display\" value=\"yearly\" aria-label=\"付款方案(display mode demo)\">\n          <SelectionItem control={<RadioGroupItem value=\"monthly\" id=\"m-disp\" />} label=\"月付方案\" htmlFor=\"m-disp\" />\n          <SelectionItem control={<RadioGroupItem value=\"yearly\" id=\"y-disp\" />} label=\"年付方案\" description=\"每年 $2,990，省下兩個月\" htmlFor=\"y-disp\" />\n          <SelectionItem control={<RadioGroupItem value=\"lifetime\" id=\"l-disp\" />} label=\"終身方案\" htmlFor=\"l-disp\" />\n        </RadioGroup>\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">readonly</h3>\n        <RadioGroup value=\"yearly\" aria-label=\"付款方案(readonly mode demo)\">\n          <SelectionItem c\n  // …",
  "import": "import { RadioGroup } from '@qijenchen/design-system'"
 },
 {
  "name": "Rating",
  "type": "component",
  "category": "表單與輸入",
  "summary": "星星評分元件——離散 1–5 分。interactive 送出評分 / readOnly 展示平均分；precision full 整星 / half 半星。",
  "whenBullets": [
   "送出評分（interactive）：Yelp / Google Reviews / Amazon 購物完後「幫這次服務評分」的送出前狀態",
   "展示評分（readOnly）：商品列表的星等 4.7 ★★★★★、評論列表每則評論的作者星等、Airbnb 房源總分",
   "後台商品管理：店家自己給商品的推薦星等（interactive）",
   "精度展示：平均分 4.7（precision=\"half\" 顯示半星），單筆 5（precision=\"full\" 整星）"
  ],
  "code": "<div className=\"flex flex-col gap-4 w-[420px]\">\n      {[\n        { name: 'AirPods Pro （第二代）', rating: 4.7, count: 12843 },\n        { name: 'Kindle Paperwhite', rating: 4.5, count: 8921 },\n        { name: 'Anker 快充行動電源 20000mAh', rating: 4.8, count: 23104 },\n        { name: 'UNIQLO 輕量羽絨外套', rating: 4.2, count: 592 },\n      ].map((p) => (\n        <div key={p.name} className=\"flex items-center gap-3 p-3 border border-border rounded-md bg-surface\">\n          <div className=\"flex-1 min-w-0\">\n            <div className=\"text-body font-medium truncate\">{p.name}</div>\n            <div className=\"flex items-center gap-2 mt-1\">\n              <Rating\n                value={p.rating}\n                readOnly\n                precision=\"half\"\n                size=\"sm\"\n                aria-label={`平均評分 ${p.rating} 星，共 5 星,${p.count} 則評論`}\n              />\n              <span className=\"text-caption text-fg-secondary\">{p.rating}</span>\n              <span className=\"text-caption text-fg-muted\">({p.count.toLocaleString()})</span>\n            </div>\n          </div>\n        </div>\n      ))}\n    </div>",
  "import": "import { Rating } from '@qijenchen/design-system'"
 },
 {
  "name": "ScrollArea",
  "type": "component",
  "category": "版面與工具",
  "summary": "自訂樣式的捲動容器，提供一致的捲軸外觀與溢出內容處理。",
  "whenBullets": [
   "寬內容橫向捲動——內容寬於容器的一般場景(寬表格類 demo、程式碼區塊等)。例外:DataTable 中央捲動區不用 ScrollArea——走 native overflow-x-auto + JS scrollLeft 同步(pinned column 結構需求,理由與 post-v1 重構計畫見 data-table.spec.md「捲軸 canonical」節;2026-06-12 收斂跨 spec 張力,以已實作且有 rationale 的 DataTable 側為準)",
   "Sheet / Dialog body 垂直捲動——內容可能超出容器高度",
   "Sidebar nav 長列表——導覽項目多於可見高度",
   "任何「內容可能溢出容器」且「跨 OS 視覺必須一致」的 sub-region"
  ],
  "code": "<div className=\"max-w-xl\">\n      <p className=\"text-caption text-fg-muted mb-3\">\n        長 issue 清單(12 筆),容器固定 320px 高。macOS / Windows 呈現一致,不吃寬度。\n      </p>\n      <ScrollArea className=\"h-[320px] border border-border rounded-lg\">\n        <div className=\"p-2\">\n          {LINEAR_ISSUES.map((issue) => (\n            <div key={issue.id} className=\"flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-hover cursor-pointer\">\n              <span className=\"text-caption font-mono text-fg-muted shrink-0 w-20\">{issue.id}</span>\n              <span className=\"text-body flex-1 truncate\">{issue.title}</span>\n              <span className=\"inline-flex items-center gap-1.5 text-footnote shrink-0\">\n                <span className=\"w-1.5 h-1.5 rounded-full\" style={{ backgroundColor: STATUS_COLORS[issue.status] }} />\n                <span className=\"text-fg-secondary\">{issue.status}</span>\n              </span>\n            </div>\n          ))}\n        </div>\n      </ScrollArea>\n    </div>",
  "import": "import { ScrollArea } from '@qijenchen/design-system'"
 },
 {
  "name": "SegmentedControl",
  "type": "component",
  "category": "表單與輸入",
  "summary": "SegmentedControl 是互斥多選一的 compact control——從 2–5 個選項裡挑恰好一個，視覺上是一排連體的分段按鈕。基於 Radix ToggleGroup（type=\"single\"），橋接設計系統 token。",
  "whenBullets": [
   "表單內的互斥選項：對齊（左 / 中 / 右）、檢視模式（清單 / 看板 / 行事曆）",
   "Filter / toolbar 的分段切換：全部 / 進行中 / 已完成、日 / 週 / 月",
   "Chart 的資料維度切換：本週 / 本月 / 本季",
   "「選了之後下方欄位跟著變」的 form section：付款方式、配送方式"
  ],
  "code": "<SegmentedControl />",
  "import": "import { SegmentedControl } from '@qijenchen/design-system'"
 },
 {
  "name": "Select",
  "type": "component",
  "category": "表單與輸入",
  "summary": "Select 是單選下拉的表單 control——從 3+ 選項中挑恰好一個，選項收在 dropdown 內展開。裝置自適應雙路徑:觸控裝置(pointer: coarse)走原生 <select> 取平台原生 picker;桌機走自建 combobox(role=\"combobox\" + Radix Popover + Command 渲染 SelectMenu)。詳下方「實作:裝置自適應雙路徑」段。",
  "whenBullets": [
   "表單中節省垂直空間：create user 的 role、profile settings 的 timezone、product form 的 category",
   "Toolbar / filter 的選擇：table 上方的 category filter、sort by、狀態篩選",
   "Table cell 的 inline edit：Jira-style task 的 status / priority / assignee（見下文「即時 vs on-submit」）",
   "選項 label 自帶語意：國家、類別、時區——使用者看 label 就知道要選什麼，不需要額外 description",
   "選項 10+ 且不需搜尋：時區、國家這類使用者熟悉的清單，靠捲動瀏覽即可定位（type-to-jump 逐字定位只有手機原生 <select> 才有；桌機是自建 combobox，非搜尋模式無逐字定位，選項偏多時建議直接開 searchable）"
  ],
  "code": "<Select />",
  "import": "import { Select } from '@qijenchen/design-system'"
 },
 {
  "name": "SelectMenu",
  "type": "component",
  "category": "表單與輸入",
  "summary": "SelectMenu 是 Popover + Command 組成的完整下拉選單浮層——提供搜尋 + 鍵盤導覽 + 分組 + 可建立新選項，作為選值類元件的 internal primitive（不直接使用）。",
  "whenBullets": [],
  "code": "<SelectMenu />",
  "import": "import { SelectMenu } from '@qijenchen/design-system'"
 },
 {
  "name": "SelectionControl",
  "type": "component",
  "category": "表單與輸入",
  "summary": "SelectionItem 是 Checkbox 與 RadioGroup 共用的 item 佈局 primitive——提供 control + optional prefix(icon/avatar) + content(label/description) 的 3-slot 結構,並處理 py = (field-height - 1lh) / 2 的 padding 公式讓單行高度對齊同 size 的 Input。App 層級應使用 Checkbox / RadioGroup,不直接使用 SelectionItem——前兩個情境展示 primitive 被 Checkbox / RadioGroup 包出的樣貌;後兩個(前綴圖示 / 前綴頭像)直接以 primitive 展示 prefix slot 結構(docs 結構展示用,非 App 層用法)。",
  "whenBullets": [],
  "code": "<div className=\"flex flex-col gap-2 max-w-md\">\n      <p className=\"text-caption text-fg-muted mb-2\">\n        帳號設定頁 — 勾選要接收的通知類型。由 Checkbox 消費 SelectionItem 提供結構。\n      </p>\n      <Checkbox defaultChecked label=\"產品更新電子報\" description=\"每兩週寄送,可隨時取消訂閱\" />\n      <Checkbox label=\"安全性警告\" description=\"登入裝置變動、密碼變更等重要事件\" />\n      <Checkbox defaultChecked label=\"Workspace 邀請通知\" />\n      <Checkbox label=\"行銷活動優惠\" description=\"我想收到優惠碼與限時活動資訊\" />\n    </div>",
  "import": "import { SelectionControl } from '@qijenchen/design-system'"
 },
 {
  "name": "Separator",
  "type": "component",
  "category": "版面與工具",
  "summary": "語意分隔元件（Radix Separator passthrough）——只用於 consumer 手動放置的分隔線。色彩固定為 --divider token，無 size / variant。",
  "whenBullets": [],
  "code": "<div role=\"listbox\" aria-label=\"settings sections demo\" className=\"border border-border rounded-lg max-w-md overflow-hidden\">\n      <MenuItem\n        startIcon={User}\n        description=\"Email、時區、顯示語言\"\n      >\n        帳號設定\n      </MenuItem>\n      <Separator />\n      <MenuItem\n        startIcon={Bell}\n        description=\"Email / 推播通知規則\"\n      >\n        通知\n      </MenuItem>\n      <Separator />\n      <MenuItem\n        startIcon={Shield}\n        description=\"資料分享範圍、權限層級\"\n      >\n        隱私\n      </MenuItem>\n    </div>",
  "import": "import { Separator } from '@qijenchen/design-system'"
 },
 {
  "name": "Sheet",
  "type": "component",
  "category": "覆蓋層",
  "summary": "Sheet 是從畫面邊緣滑入的浮層面板。消費者 API = 右側滑入（side=\"right\"，detail panel / 編輯 / filter drawer，對齊 Jira / Linear / Notion 右側 detail drawer 慣例）。top / bottom / left 變體保留 DS 內部基建用（例：Sidebar 在小視口從 left 滑入），消費者 code 禁止傳 side=\"top\" | \"bottom\" | \"left\"，這些用途需 user 授權（canonical 見 sheet.tsx L23-27 + showcase AR35）。",
  "whenBullets": [
   "側邊操作面板：filter panel、detail pane、task 編輯 side sheet",
   "暫時性內容展示：notification drawer、cart summary、activity history",
   "Mobile 側邊編輯：桌機 detail / 編輯 flow 在手機沿用同一個右側 Sheet（mobile 預設占 75% 寬）。內容過於複雜需全螢幕時改用 fullscreen Dialog 或導航到獨立頁面，不借 side=\"bottom\"（bottom 為 DS 內部基建變體、非消費者 API；需 mobile bottom sheet 另用專屬元件）",
   "跟主頁面平行的工作流程：使用者在主頁看清單，sheet 編輯某一項，不離開清單 context"
  ],
  "code": "<Sheet>\n      <SheetTrigger asChild>\n        <Button variant=\"primary\">建立新專案</Button>\n      </SheetTrigger>\n      <SheetContent side=\"right\" className=\"flex flex-col sm:max-w-lg\">\n        <SheetHeader>\n          <SheetTitle>建立新專案</SheetTitle>\n        </SheetHeader>\n        {/* Field-to-field gap = `--layout-space-loose`:form 用 `flex-col gap-*` 單值,保守選 loose\n            讓「非 fw ↔ 非 fw」Input↔Input 合規(規則 3 per-transition 原意 loose);\n            fw-adjacent 的微 tight 視覺損失 < 非 fw-adjacent 的 loose 破壞。\n            詳 `layoutSpace.spec.md` 規則 3 caveat。 */}\n        <SheetBody className=\"flex flex-col gap-[var(--layout-space-loose)]\">\n          <Field>\n            <FieldLabel>專案名稱</FieldLabel>\n            <Input placeholder=\"例:Q2 產品路線圖\" />\n          </Field>\n          <Field>\n            <FieldLabel>描述</FieldLabel>\n            <Textarea placeholder=\"簡述此專案的目標與範圍\" rows={4} />\n            <FieldDescription>選填,可在建立後補上</FieldDescription>\n          </Field>\n          {/* 多選場景:初始成員權限(從設計系統中組合出 Jira / Linear 專案建立流程的典型多選欄位)\n              label 明確是「多選權限」;若要做「開 / 關通知」這種 binary toggle,用 Switch 不用 CheckboxGroup。 */}\n          <Field>\n            <FieldLabel>初始成員權限</FieldLabel>\n            <FieldDescription>可勾選多項,所有成員預設獲得這些權限</FieldDescription>\n            <CheckboxGroup>\n              <Checkbox defaultChecked label=\"檢視專案內容\" />\n              <Checkbox defaultChecked label=\"新增與編輯任務\" />\n              <Checkb\n  // …",
  "import": "import { Sheet } from '@qijenchen/design-system'"
 },
 {
  "name": "Sidebar",
  "type": "component",
  "category": "動作與導覽",
  "summary": "應用程式的主導覽外殼——頁面固定的側邊導覽容器，支援展開 / 收合、桌機與行動裝置的不同形態、扁平選單與階層樹兩種內容。",
  "whenBullets": [
   "多頁 app 的主導覽：Slack、Linear、Notion、Figma 的左側 workspace + channel / project 清單",
   "需要在所有頁面持續存在的次導覽：settings 頁的分類、文件的章節跳轉",
   "workspace 切換 + 功能分組並存：頂部 workspace switcher + 下方常用功能 + 底部 settings",
   "需要展開 / 收合但不消失：小螢幕收合為 icon bar，大螢幕展開完整 label"
  ],
  "code": "<Sidebar />",
  "import": "import { Sidebar } from '@qijenchen/design-system'"
 },
 {
  "name": "Skeleton",
  "type": "component",
  "category": "回饋與狀態",
  "summary": "Skeleton 是載入中的內容佔位符——在資料載入完成前，用灰色色塊模擬真實內容的形狀與排版，讓使用者預期即將出現的佈局。",
  "whenBullets": [
   "初次載入資料的 list / table / card grid：保留內容形狀讓使用者預期佈局",
   "非同步載入的 dashboard widget / chart：資料來之前填滿空間避免跳動",
   "內容切換後的短暫載入：router 切換、tab 切換後的過渡狀態",
   "已知佈局結構的等待：佈局固定 + 資料動態的場景"
  ],
  "code": "<div className=\"flex flex-col gap-2 max-w-md\">\n      <Skeleton className=\"h-4 w-full\" />\n      <Skeleton className=\"h-4 w-full\" />\n      <Skeleton className=\"h-4 w-3/4\" />\n    </div>",
  "import": "import { Skeleton } from '@qijenchen/design-system'"
 },
 {
  "name": "Slider",
  "type": "component",
  "category": "表單與輸入",
  "summary": "使用者沿著一條軌道拖曳 thumb 選擇一個數值(single)或一段範圍(range)。適合連續或密集離散的數值選取,當使用者在意「相對位置」勝過「精確數字」時使用。",
  "whenBullets": [
   "「感受性」連續值:亮度 / 音量 / 縮放 / 透明度",
   "範圍選取:價格區間、日期區間、分數區間",
   "使用者在意「相對位置」勝過「精確數字」:粗略調整 > 精確輸入",
   "搭配顯示值:thumb 旁標籤或同步 NumberInput 讓使用者掌握精確數字"
  ],
  "code": "<div className=\"w-[360px] flex flex-col gap-6\">\n      <p className=\"text-caption text-fg-secondary max-w-[480px]\">\n        三個 size 下 track 厚度與 thumb 直徑一致——只有容器外高跟著\n        `--field-height-*` 變。這讓 Slider 能在 Field 內跟 Input / Select /\n        NumberInput 並排對齊,同時保持自己的視覺身分不變。\n      </p>\n      {(['sm', 'md', 'lg'] as const).map(size => (\n        <div key={size} className=\"flex flex-col gap-2\">\n          <div className=\"text-caption text-fg-muted\">\n            size = {size}(h-field-{size})\n          </div>\n          <div className=\"border border-dashed border-border rounded-md p-0\">\n            <Slider size={size} defaultValue={[40]} />\n          </div>\n        </div>\n      ))}\n    </div>",
  "import": "import { Slider } from '@qijenchen/design-system'"
 },
 {
  "name": "Steps",
  "type": "component",
  "category": "動作與導覽",
  "summary": "步驟流程指示器，呈現多步驟任務的目前進度與各步驟狀態。",
  "whenBullets": [
   "多步驟表單 / 精靈流程:註冊流程、訂單結帳、設定引導(step 1 → 2 → 3)",
   "訂單 / 任務進度:物流追蹤(已下單 → 揀貨 → 出貨 → 送達)、審批流程",
   "入職 / onboarding 進度:教學性流程,明確告知使用者「還剩幾步」",
   "CI / build 的 pipeline 狀態:有序步驟且每步有明確完成 / 進行中 / 失敗狀態",
   "步驟數量有限且已知(3–7 個最佳;超過 7 個考慮改為 section + progress bar)"
  ],
  "code": "<Steps />",
  "import": "import { Steps } from '@qijenchen/design-system'"
 },
 {
  "name": "Switch",
  "type": "component",
  "category": "表單與輸入",
  "summary": "Switch 是即時套用的布林開關——切換即生效，心智模型是「實體開關」（牆上 light switch、iPhone settings 開關）。",
  "whenBullets": [
   "系統設定類 toggle：Bluetooth / Wi-Fi / 飛航模式 / Dark mode / Push 通知",
   "即時功能開關：is_public / is_featured（admin 即時切換）、自動儲存 on/off",
   "獨立 inline control：切換即生效，旁邊沒有 submit / cancel button 流程",
   "物理開關類比：使用者心智模型是「我現在要打開 / 關閉這個功能」"
  ],
  "code": "<div className=\"flex flex-col gap-6 max-w-sm\">\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">edit</h3>\n        <Switch defaultChecked aria-label=\"啟用通知(edit mode demo)\" />\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">display</h3>\n        <Switch mode=\"display\" checked />\n        <p className=\"text-caption text-fg-muted mt-1\">純視覺 ✓ / —；語意由 context（如 DataTable 表頭 + 行標籤）提供，display 不暴露獨立 aria-label。需螢幕報讀器可讀請用 edit / readonly。</p>\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">readonly</h3>\n        <Switch readOnly checked aria-label=\"啟用通知(readonly demo)\" />\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">disabled</h3>\n        <Switch disabled checked aria-label=\"啟用通知(disabled demo)\" />\n      </div>\n    </div>",
  "import": "import { Switch } from '@qijenchen/design-system'"
 },
 {
  "name": "Tabs",
  "type": "component",
  "category": "動作與導覽",
  "summary": "Tabs 用於在同一個上下文底下切換平行的視圖——每個 tab 對應一塊獨立內容區，同時只顯示一塊。 基於 shadcn/ui Tabs（Radix Tabs），橋接設計系統 token。",
  "whenBullets": [
   "頁面內切換 同上下文的平行視圖：專案的「總覽 / 成員 / 設定」",
   "Dialog 內切換 複雜設定：「一般 / 進階 / 整合」",
   "Sidebar 面板內切換 次分類：團隊、頻道、標籤",
   "每塊 content 可以有自己的 header / toolbar / layout（container 規模的切換）"
  ],
  "code": "<Tabs defaultValue=\"overview\" className=\"w-[600px]\">\n      <TabsList>\n        <TabsTrigger value=\"overview\">總覽</TabsTrigger>\n        <TabsTrigger value=\"members\">成員</TabsTrigger>\n        <TabsTrigger value=\"notifications\" badge={<Badge count={3} />}>通知</TabsTrigger>\n        <TabsTrigger value=\"settings\">設定</TabsTrigger>\n      </TabsList>\n      <TabsContent value=\"overview\" className=\"text-body text-fg-secondary\">專案的總覽資訊（KPI、最近活動、團隊成員簡介）</TabsContent>\n      <TabsContent value=\"members\" className=\"text-body text-fg-secondary\">專案成員列表（3 人待邀請）</TabsContent>\n      <TabsContent value=\"notifications\" className=\"text-body text-fg-secondary\">3 則未讀通知（提及、指派、留言回覆）</TabsContent>\n      <TabsContent value=\"settings\" className=\"text-body text-fg-secondary\">專案設定（一般、權限、整合）</TabsContent>\n    </Tabs>",
  "import": "import { Tabs } from '@qijenchen/design-system'"
 },
 {
  "name": "Tag",
  "type": "component",
  "category": "資料展示",
  "summary": "Inline label，用於分類標籤、狀態標記、多選已選值。以色名命名 variant，語義由消費端決定。",
  "whenBullets": [
   "分類標籤：產品類別（Electronics / Food / Furniture）、文章 tag（React / Design / Tutorial）",
   "狀態標記：訂單狀態（In stock / Shipped / Delivered）——用 variant 色彩加速掃視",
   "多選已選值：Combobox / searchable 選擇後顯示的 tag 陣列",
   "user-generated label：使用者自己建立的標籤（如 Notion labels）"
  ],
  "code": "<div className=\"flex flex-wrap gap-2\">\n      <Tag color=\"neutral\" avatar={\n        <img src=\"https://i.pravatar.cc/32?u=alice\" alt=\"\" className=\"rounded-full object-cover\" />\n      }>\n        Alice Chen\n      </Tag>\n      <Tag color=\"neutral\" avatar={\n        <img src=\"https://i.pravatar.cc/32?u=bob\" alt=\"\" className=\"rounded-full object-cover\" />\n      }>\n        Bob Lin\n      </Tag>\n      <p className=\"w-full text-caption text-fg-muted\">Tag 內部統一 avatar 為 16px（跟 icon 一致），消費端不用指定尺寸</p>\n    </div>",
  "import": "import { Tag } from '@qijenchen/design-system'"
 },
 {
  "name": "Textarea",
  "type": "component",
  "category": "表單與輸入",
  "summary": "Textarea 是多行文字的輸入與顯示元件——Input 的多行版本。格式化邏輯為 identity（value → value）。",
  "whenBullets": [
   "多行 / 長文字輸入：評論、描述、備註、文章草稿、bio、issue content",
   "使用者需要看到已輸入的全部內容：邊寫邊 review（不像 Input 捲動）",
   "內容可能包含換行：段落、列表、程式碼片段",
   "沒有字符數強限制的自由輸入：content editor、markdown 編輯器 body"
  ],
  "code": "<Textarea />",
  "import": "import { Textarea } from '@qijenchen/design-system'"
 },
 {
  "name": "TimePicker",
  "type": "component",
  "category": "表單與輸入",
  "summary": "單一時間輸入。對齊 Ant Design TimePicker API;視覺 / 互動走本 DS 設計語言。完整規格見 time-picker.spec.md。",
  "whenBullets": [],
  "code": "<div className=\"flex flex-col gap-6 w-80\">\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">edit</h3>\n        <TimePicker value=\"14:30\" onChange={() => {}} aria-label=\"會議時段(edit mode demo)\" />\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">display</h3>\n        <TimePicker mode=\"display\" value=\"14:30\" aria-label=\"會議時段(display mode demo)\" />\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">readonly</h3>\n        <TimePicker mode=\"readonly\" value=\"14:30\" aria-label=\"會議時段(readonly mode demo)\" />\n      </div>\n      <div>\n        <h3 className=\"text-body font-bold text-foreground mb-2\">disabled</h3>\n        <TimePicker mode=\"disabled\" value=\"14:30\" aria-label=\"會議時段(disabled mode demo)\" />\n      </div>\n    </div>",
  "import": "import { TimePicker } from '@qijenchen/design-system'"
 },
 {
  "name": "Toast",
  "type": "component",
  "category": "回饋與狀態",
  "summary": "Toast 是短暫的浮動通知，自動消失。用於操作結果回饋（成功 / 失敗 / 警告）。不阻斷使用者操作。",
  "whenBullets": [
   "操作結果短暫回饋：儲存成功、訊息已送出、已複製到剪貼簿、刪除失敗",
   "背景非同步動作完成：檔案上傳完成、資料同步完成、通知已寄出",
   "需要「復原」按鈕的操作：刪除後 4 秒內可 Undo（sonner action 模式）",
   "非關鍵資訊：訊息即使使用者沒看到也不影響流程"
  ],
  "code": "<div className=\"flex gap-16\">\n      <div className=\"flex flex-col gap-4\">\n        <span className=\"text-caption text-fg-secondary font-medium\">light mode</span>\n        <div className=\"flex flex-col gap-3 p-8 rounded-lg bg-canvas border border-divider\">\n          {VARIANTS.map((v) => (\n            <div key={v} className=\"flex items-center gap-4\">\n              <span className=\"text-caption text-fg-secondary w-24 shrink-0\">套 {modeLabel(v, 'light')} theme</span>\n              <StaticToast variant={v} title={LABELS[v]} description={DESCRIPTIONS[v]} pageTheme=\"light\" />\n            </div>\n          ))}\n        </div>\n      </div>\n      <div className=\"flex flex-col gap-4\" data-theme=\"dark\">\n        <span className=\"text-caption text-fg-secondary font-medium\">dark mode</span>\n        <div className=\"flex flex-col gap-3 p-8 rounded-lg bg-canvas border border-divider\">\n          {VARIANTS.map((v) => (\n            <div key={v} className=\"flex items-center gap-4\">\n              <span className=\"text-caption text-fg-secondary w-24 shrink-0\">套 {modeLabel(v, 'dark')} theme</span>\n              <StaticToast variant={v} title={LABELS[v]} description={DESCRIPTIONS[v]} pageTheme=\"dark\" />\n            </div>\n          ))}\n        </div>\n      </div>\n    </div>",
  "import": "import { Toast } from '@qijenchen/design-system'"
 },
 {
  "name": "Tooltip",
  "type": "component",
  "category": "覆蓋層",
  "summary": "補充畫面上未能清楚傳達的資訊。hover 或 focus 時出現。",
  "whenBullets": [
   "畫面不夠清楚 → 用 tooltip 補充。 例如：icon-only 按鈕沒有文字 label，使用者需要 tooltip 才能確認這個 icon 代表什麼操作",
   "畫面已經清楚 → 不需要 tooltip。 例如：按鈕已有完整的文字 label（「儲存」「刪除」），tooltip 重複同樣的文字沒有價值",
   "截斷文字 → 用 tooltip 顯示完整內容。 但只有當文字實際被截斷時才顯示——tooltip 是補救機制，不是裝飾"
  ],
  "code": "<Tooltip defaultOpen>\n      <TooltipTrigger asChild>\n        <Button variant=\"secondary\" startIcon={Info}>\n          自動套用品牌\n        </Button>\n      </TooltipTrigger>\n      <TooltipContent>\n        <p>付款頁會自動帶入你的 logo 與主色</p>\n      </TooltipContent>\n    </Tooltip>",
  "import": "import { Tooltip } from '@qijenchen/design-system'"
 },
 {
  "name": "TreeView",
  "type": "component",
  "category": "資料展示",
  "summary": "TreeView 是階層結構的遞迴元件。一個 TreeItem 就是一個 node——有 children 就可展開,沒有就是 leaf。沒有第二個概念。",
  "whenBullets": [
   "階層結構資料：檔案管理器資料夾樹、部門組織架構、專案 / 子專案 / 任務、權限群組",
   "Sidebar 內的分層導覽：workspace > channel > thread、product > category > item",
   "可展開收合的清單：FAQ（但多個可同時展開,非 Accordion 互斥）、程式碼 tree、JSON viewer",
   "任意多層：從 1 層到 N 層深度都由同一個 TreeView 承載"
  ],
  "code": "<div className=\"w-[300px] border border-divider rounded-lg bg-surface overflow-hidden py-2\">\n      <TreeView aria-label=\"檔案瀏覽\" defaultExpandedIds={['src', 'components']}>\n        <TreeItem id=\"src\" icon={Folder} label=\"src\">\n          <TreeItem id=\"components\" icon={Folder} label=\"components\">\n            <TreeItem id=\"button\" icon={FileCode} label=\"Button.tsx\" />\n            <TreeItem id=\"input\" icon={FileCode} label=\"Input.tsx\" />\n            <TreeItem id=\"dialog\" icon={FileCode} label=\"Dialog.tsx\" />\n          </TreeItem>\n          <TreeItem id=\"utils\" icon={Folder} label=\"utils\">\n            <TreeItem id=\"cn\" icon={FileCode} label=\"cn.ts\" />\n          </TreeItem>\n          <TreeItem id=\"app\" icon={FileCode} label=\"App.tsx\" />\n          <TreeItem id=\"main\" icon={FileCode} label=\"main.tsx\" />\n        </TreeItem>\n        <TreeItem id=\"public\" icon={Folder} label=\"public\">\n          <TreeItem id=\"favicon\" icon={Image} label=\"favicon.svg\" />\n        </TreeItem>\n        <TreeItem id=\"pkg\" icon={FileText} label=\"package.json\" />\n        <TreeItem id=\"readme\" icon={FileText} label=\"README.md\" />\n      </TreeView>\n    </div>",
  "import": "import { TreeView } from '@qijenchen/design-system'"
 }
];

const CATEGORY_META = {
  "表單與輸入": { icon: TextCursorInput, color: "#6366f1" },
  "動作與導覽": { icon: MousePointerClick, color: "#0ea5e9" },
  "資料展示": { icon: Table2, color: "#10b981" },
  "回饋與狀態": { icon: BellRing, color: "#f59e0b" },
  "覆蓋層": { icon: PanelTop, color: "#ec4899" },
  "版面與工具": { icon: Wrench, color: "#8b5cf6" },
  "其他": { icon: CircleDot, color: "#64748b" },
};
const CATEGORY_ORDER = ["表單與輸入", "動作與導覽", "資料展示", "回饋與狀態", "覆蓋層", "版面與工具", "其他"];

// Planned business patterns (規劃中) — not yet built
const PATTERNS = [
  {
    name: "表單問卷", en: "Form / Survey",
    summary: "多步驟收集使用者輸入與結構化問答，含驗證、分頁與送出流程。",
    uses: ["Field", "Input", "Textarea", "RadioGroup", "Checkbox", "Select", "Steps", "Button"],
    flow: "起始說明 → 分段填答（單選／多選／文字）→ 即時驗證 → 檢視確認 → 送出回饋",
    flowId: "form", flowName: "新進員工報到表單",
  },
  {
    name: "待辦事項清單", en: "Todo List",
    summary: "任務的建立、勾選完成、分組與進度追蹤。",
    uses: ["Checkbox", "Input", "Badge", "Tag", "DataTable", "Empty", "Button"],
    flow: "快速新增 → 勾選／編輯 → 標籤分組 → 進度統計 → 空狀態引導",
  },
  {
    name: "多層級簽核", en: "Multi-level Approval",
    summary: "申請單跨多關卡審核（同意／退回），狀態流轉與稽核紀錄。",
    uses: ["Steps", "DataTable", "Dialog", "Badge", "DescriptionList", "Notice", "Button"],
    flow: "提交申請 → 收件匣審核 → 同意／退回（理由必填）→ 狀態回拋 → 結案查詢",
  },
  {
    name: "通知與提醒", en: "Notifications & Reminders",
    summary: "系統訊息、即時提醒與通知中心的呈現與管理。",
    uses: ["Toast", "Alert", "Notice", "Badge", "Popover", "DropdownMenu"],
    flow: "即時 Toast → 通知中心列表 → 已讀／未讀 → 動作入口 → 偏好設定",
  },
  {
    name: "權限控管", en: "Access Control",
    summary: "角色 × 資源的存取設定、可見性與審核權限管理。",
    uses: ["DataTable", "Checkbox", "Switch", "SegmentedControl", "PeoplePicker", "Dialog"],
    flow: "角色定義 → 資源指派 → 權限矩陣勾選 → 成員加入 → 生效預覽",
  },
  {
    name: "個人設定頁面", en: "Settings Page",
    summary: "帳號、偏好、通知等多分區的個人設定。",
    uses: ["Accordion", "Tabs", "Field", "Switch", "Select", "Avatar", "Button"],
    flow: "分區導覽 → 編輯欄位 → 即時／批次儲存 → 危險操作確認",
  },
].map(p => ({ ...p, type: "pattern", category: "情境模式", planned: !p.flowId }));

const ALL = [...COMPONENTS, ...PATTERNS];

// ─────────────────────────────────────────────────────────────
// Mock "AI" search — local keyword scoring (no backend)
// ─────────────────────────────────────────────────────────────
function searchItems(q) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  const terms = t.split(/[\s,，、。.；;]+/).filter(Boolean);
  const scored = ALL.map((it) => {
    const hay = [it.name, it.en || "", it.summary || "", it.category,
      (it.whenBullets || []).join(" "), (it.uses || []).join(" ")]
      .join(" ").toLowerCase();
    let s = 0;
    for (const term of terms) {
      if (!term) continue;
      if (it.name.toLowerCase() === term) s += 10;
      if (hay.includes(term)) s += 3;
    }
    // soft semantic hints
    const hints = {
      "表單": ["表單問卷", "Field", "Input"],
      "問卷": ["表單問卷"],
      "多步驟": ["表單問卷", "Steps"],
      "填寫": ["表單問卷", "Field"],
      "報到": ["表單問卷"],
      "選": ["Select", "RadioGroup", "Combobox", "SegmentedControl", "DropdownMenu"],
      "日期": ["DatePicker", "Calendar", "DateGrid", "TimePicker"],
      "上傳": ["FileUpload", "FileItem", "FileViewer"],
      "通知": ["Toast", "Alert", "Notice"],
      "表格": ["DataTable", "DescriptionList"],
      "搜尋": ["Combobox", "Command", "Input"],
      "確認": ["Dialog", "Alert"],
      "載入": ["Skeleton", "ProgressBar", "CircularProgress"],
      "步驟": ["Steps", "表單問卷"],
      "空": ["Empty"],
    };
    for (const [k, names] of Object.entries(hints)) {
      if (t.includes(k) && names.includes(it.name)) s += 6;
    }
    return { it, s };
  }).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
  return scored.slice(0, 4).map(x => x.it);
}

// ─────────────────────────────────────────────────────────────
// Small preview tile (Mobbin-style thumbnail)
// ─────────────────────────────────────────────────────────────
function PreviewTile({ item, big }) {
  const meta = CATEGORY_META[item.category] || CATEGORY_META["其他"];
  const preview = item.type === "component" ? renderPreview(item.name) : (item.flowId ? renderPatternPreview(item.flowId) : null);
  const h = big ? "h-60" : "h-44";

  if (preview) {
    return (
      <div className={"relative flex items-center justify-center overflow-hidden bg-slate-50 px-3 " + h}>
        <div className="absolute inset-0 opacity-70"
          style={{ backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="pointer-events-none relative flex select-none items-center justify-center">{preview}</div>
      </div>
    );
  }

  // fallback (planned patterns / no preview): icon tile
  const Icon = item.planned ? Compass : (meta.icon || Component);
  const color = item.planned ? "#a855f7" : meta.color;
  return (
    <div className={"relative flex items-center justify-center overflow-hidden " + h}
      style={{ background: `linear-gradient(135deg, ${color}14, ${color}05)` }}>
      <div className="absolute inset-0 opacity-50"
        style={{ backgroundImage: `radial-gradient(${color}22 1px, transparent 1px)`, backgroundSize: "14px 14px" }} />
      <div className="relative flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm" style={{ background: "white" }}>
          <Icon size={big ? 26 : 22} style={{ color }} strokeWidth={1.8} />
        </div>
        <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium tracking-wide" style={{ color }}>{item.name}</span>
      </div>
      {item.planned && (
        <span className="absolute right-2 top-2 rounded-full bg-purple-600 px-2 py-0.5 text-[10px] font-semibold text-white">規劃中</span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
function CopyButton({ text }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        try { navigator.clipboard.writeText(text); } catch (e) {}
        setDone(true); setTimeout(() => setDone(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
    >
      {done ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
      {done ? "已複製" : "複製"}
    </button>
  );
}

function Tag({ children, color }) {
  return (
    <span className="rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ background: (color || "#64748b") + "18", color: color || "#475569" }}>
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────────────────────
function Sidebar({ onSelect, onHome, current }) {
  const [filter, setFilter] = useState("");
  const f = filter.trim().toLowerCase();
  const match = (it) => !f || it.name.toLowerCase().includes(f) || (it.en || "").toLowerCase().includes(f) || (it.summary || "").toLowerCase().includes(f);

  const grouped = CATEGORY_ORDER.map(cat => ({
    cat, items: COMPONENTS.filter(c => c.category === cat && match(c))
  })).filter(g => g.items.length);
  const patterns = PATTERNS.filter(match);

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <button onClick={onHome}
        className="flex items-center gap-2 px-5 py-4 text-left">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Layers size={18} className="text-white" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-100">DS Library</div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">component & pattern hub</div>
        </div>
      </button>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
          <input
            value={filter} onChange={e => setFilter(e.target.value)}
            placeholder="篩選元件"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-2 text-sm text-slate-700 outline-none focus:border-indigo-300 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:bg-slate-800"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <button onClick={onHome}
          className={"mb-3 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium transition " +
            (!current ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800")}>
          <LayoutGrid size={15} className={!current ? "text-indigo-500" : "text-slate-400"} />
          探索
        </button>

        {patterns.length > 0 && (
          <div className="mb-3">
            <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-purple-500 dark:text-purple-400">
              情境模式
            </div>
            {patterns.map(p => (
              <button key={p.name} onClick={() => onSelect(p)}
                className={"flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition " +
                  (current === p ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800")}>
                <Compass size={14} className="text-purple-400" />
                <span className="flex-1">{p.name}</span>
                {p.planned && <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-600 dark:bg-purple-500/15 dark:text-purple-300">規劃中</span>}
              </button>
            ))}
          </div>
        )}

        {grouped.map(g => (
          <div key={g.cat} className="mb-3">
            <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {g.cat} <span className="text-slate-300 dark:text-slate-600">({g.items.length})</span>
            </div>
            {g.items.map(c => (
              <button key={c.name} onClick={() => onSelect(c)}
                className={"flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition " +
                  (current === c ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800")}>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────
// Home view
// ─────────────────────────────────────────────────────────────
function Home({ onSelect, onAsk }) {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("全部");

  const examples = [
    "想做一個多步驟填寫的問卷表單",
    "需要讓使用者上傳檔案",
    "顯示一筆一筆的資料表格",
    "操作成功後給即時提醒",
  ];

  const cats = ["全部", ...CATEGORY_ORDER.filter(c => COMPONENTS.some(x => x.category === c))];
  const shown = activeCat === "全部" ? COMPONENTS : COMPONENTS.filter(c => c.category === activeCat);
  const patternsReady = PATTERNS.filter(p => !p.planned);

  const doSearch = () => { if (q.trim()) onAsk(q.trim()); };

  return (
    <div className="mx-auto max-w-6xl px-8 py-14">
      {/* Hero */}
      <div className="mb-20 pt-6 text-center">
        <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-slate-800 dark:text-slate-50">
          讓好設計，成為團隊的共同語言
        </h1>
        <p className="mb-8 text-lg text-slate-500 dark:text-slate-400">
          從一句情境描述出發，找到對的元件與模式
        </p>

        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-indigo-300 focus-within:shadow-md dark:border-slate-700 dark:bg-slate-900">
            <Spark size={22} className="ml-2 text-indigo-500" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              onKeyDown={e => e.key === "Enter" && doSearch()}
              placeholder="例如：使用者需要在表單裡選一個日期"
              className="flex-1 bg-transparent px-1 py-2 text-[15px] text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            <button onClick={doSearch} aria-label="推薦元件"
              className="flex items-center justify-center rounded-xl bg-indigo-600 p-2.5 text-white transition hover:bg-indigo-700">
              <ArrowUp size={18} strokeWidth={2.4} />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap justify-start gap-2">
            {examples.map(ex => (
              <button key={ex}
                onClick={() => onAsk(ex)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500/40 dark:hover:text-indigo-300">
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 情境模式 — 優先呈現（Landing 只列已完成的） */}
      {patternsReady.length > 0 && (
        <>
          <div className="mb-4 flex items-baseline gap-2">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">情境模式</h2>
            <span className="text-sm text-slate-400 dark:text-slate-500">常見流程組合</span>
          </div>
          <div className="mb-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {patternsReady.map(it => (
              <button key={it.name} onClick={() => onSelect(it)}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <PreviewTile item={it} />
                <div className="p-5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">{it.name}</h3>
                    <ChevronRight size={16} className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:text-slate-600" />
                  </div>
                  <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{it.summary}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Components */}
      <div className="mb-4 flex items-baseline gap-2">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">元件</h2>
        <span className="text-sm text-slate-400 dark:text-slate-500">{COMPONENTS.length} 個</span>
      </div>

      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {cats.map(c => (
          <button key={c} onClick={() => setActiveCat(c)}
            className={"rounded-full px-3.5 py-1.5 text-sm font-medium transition " +
              (activeCat === c ? "bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800")}>
            {c}{c !== "全部" && <span className="ml-1 opacity-60">{COMPONENTS.filter(x => x.category === c).length}</span>}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map(it => (
          <button key={it.name} onClick={() => onSelect(it)}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <PreviewTile item={it} />
            <div className="p-5">
              <div className="mb-1.5 flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">{it.name}</h3>
                <ChevronRight size={16} className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:text-slate-600" />
              </div>
              <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{it.summary}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Live demo (real DS component rendered in an isolated iframe)
// ─────────────────────────────────────────────────────────────
const LIVE_DEMOS = new Set(typeof window !== "undefined" ? (window.__DS_DEMO_NAMES || []) : []);
function b64ToStr(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder("utf-8").decode(bytes);
}
function LiveDemo({ name, dark }) {
  const srcDoc = useMemo(() => {
    const css = b64ToStr(window.__DS_CSS_B64 || "");
    const js = b64ToStr(window.__DS_JS_B64 || "");
    const theme = dark ? "dark" : "light";
    return '<!DOCTYPE html><html data-theme="' + theme + '"><head><meta charset="utf-8"><style>' + css +
      '</style></head><body style="margin:0;background:transparent"><div id="root"></div><script>window.__DEMO_NAME=' +
      JSON.stringify(name) + ';window.__DEMO_THEME=' + JSON.stringify(theme) + '</script><script>' + js + '</script></body></html>';
  }, [name, dark]);
  return (
    <iframe title={name + " 互動範例"} srcDoc={srcDoc} sandbox="allow-scripts"
      className="block w-full" style={{ height: 340, border: 0 }} />
  );
}

// Full-screen interactive Pattern flow (isolated iframe)
function FlowOverlay({ flowId, title, dark, onClose }) {
  const srcDoc = useMemo(() => {
    const css = b64ToStr(window.__DS_CSS_B64 || "");
    const js = b64ToStr(window.__DS_JS_B64 || "");
    const theme = dark ? "dark" : "light";
    return '<!DOCTYPE html><html data-theme="' + theme + '"><head><meta charset="utf-8"><style>' + css +
      '</style></head><body style="margin:0"><div id="root"></div><script>window.__FLOW_NAME=' +
      JSON.stringify(flowId) + ';window.__FLOW_THEME=' + JSON.stringify(theme) + '</script><script>' + js + '</script></body></html>';
  }, [flowId, dark]);
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Compass size={15} className="text-purple-500" /> {title} · 流程體驗
        </div>
        <button onClick={onClose} title="關閉"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200">
          <X size={18} />
        </button>
      </div>
      <iframe title={title + " 流程"} srcDoc={srcDoc} sandbox="allow-scripts" className="w-full flex-1" style={{ border: 0 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// "Give to AI" — export this component's content for an AI agent
// ─────────────────────────────────────────────────────────────
function buildMarkdown(it) {
  if (it.type === "pattern") {
    return "# " + it.name + "（" + (it.en || "") + "） — Pattern\n" + (it.summary || "") +
      "\n\n## 流程\n" + (it.flow || "") +
      "\n\n## 組成元件\n" + (it.uses || []).join("、") +
      "\n\n來源：@qijenchen/design-system · pattern/" + it.name;
  }
  const bullets = (it.whenBullets || []).map(b => "- " + b).join("\n") || ("- " + (it.summary || ""));
  return "# " + it.name + " — " + it.category + "\n" + (it.summary || "") +
    "\n\n## 何時使用\n" + bullets +
    "\n\n## 用法\n" + (it.import || "") + "\n" + (it.code || "") +
    "\n\n來源：@qijenchen/design-system · components/" + it.name;
}
function buildPrompt(it) {
  if (it.type === "pattern") {
    return "請依照 @qijenchen/design-system 的 " + it.name +
      " pattern 來實作這個流程。以下是它的目的、流程與組成元件，請用這些 DS 元件組合、不要自行臆測：\n\n" + buildMarkdown(it);
  }
  return "請使用 @qijenchen/design-system 的 " + it.name +
    " 元件來實作。以下是它的用途與正式用法，請完全依此撰寫程式碼、不要自行臆測 API：\n\n" + buildMarkdown(it);
}

function GiveToAI({ item }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const md = useMemo(() => buildMarkdown(item), [item]);
  const copy = (text) => {
    try { navigator.clipboard.writeText(text); } catch (e) {}
    setOpen(false); setCopied(true); setTimeout(() => setCopied(false), 1600);
  };
  const openRaw = () => {
    try {
      const url = URL.createObjectURL(new Blob([md], { type: "text/markdown;charset=utf-8" }));
      window.open(url, "_blank");
    } catch (e) {}
    setOpen(false);
  };
  const Item = ({ icon, label, onClick, highlight, tag, disabled }) => (
    <button onClick={onClick} disabled={disabled}
      className={"flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition " +
        (disabled ? "text-slate-400 dark:text-slate-600"
          : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800") +
        (highlight ? " bg-slate-50 dark:bg-slate-800" : "")}>
      {icon}
      <span className="flex-1">{label}</span>
      {tag && <span className="rounded border border-slate-200 px-1.5 py-0.5 text-[11px] text-slate-400 dark:border-slate-700 dark:text-slate-500">{tag}</span>}
    </button>
  );
  return (
    <div className="relative">
      <div className="flex items-stretch">
        <button onClick={() => copy(md)}
          className="flex items-center gap-1.5 rounded-l-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700">
          {copied ? <Check size={15} /> : <Spark size={16} className="text-white" />}
          {copied ? "已複製" : "給 AI 使用"}
        </button>
        <button aria-label="更多選項" onClick={() => setOpen(o => !o)}
          className="flex items-center rounded-r-lg border-l border-white/25 bg-indigo-700 px-2 text-white transition hover:bg-indigo-800">
          <ChevronDown size={15} />
        </button>
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <Item icon={<FileCode2 size={17} className="text-slate-500" />} label="複製為 Markdown" onClick={() => copy(md)} highlight />
            <Item icon={<MessageSquareText size={17} className="text-slate-500" />} label="複製提示詞" onClick={() => copy(buildPrompt(item))} />
            <div className="my-1.5 h-px bg-slate-100 dark:bg-slate-800" />
            <Item icon={<Plug2 size={17} className="text-slate-500" />} label="在 IDE 使用（MCP）" tag="規劃中" disabled />
            <Item icon={<ExternalLink size={17} className="text-slate-500" />} label="開啟 Markdown 原始頁" onClick={openRaw} />
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Detail view
// ─────────────────────────────────────────────────────────────
function Detail({ item, onBack, onSelect, dark, onOpenFlow }) {
  const meta = CATEGORY_META[item.category] || CATEGORY_META["其他"];
  const isPattern = item.type === "pattern";
  const live = !isPattern && LIVE_DEMOS.has(item.name);

  const WhenBlock = (
    <section className="mb-8">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        <BookOpen size={15} /> 何時使用
      </div>
      {item.whenBullets && item.whenBullets.length ? (
        <ul className="space-y-2">
          {item.whenBullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
              <Check size={16} className="mt-1 shrink-0 text-emerald-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{item.summary}</p>
      )}
    </section>
  );

  const CodeBlock = (
    <section className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <Code2 size={15} /> 程式碼
        </div>
        <CopyButton text={(item.import ? item.import + "\n\n" : "") + (item.code || "")} />
      </div>
      <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-[13px] leading-relaxed text-slate-100">
        {item.import && <div className="mb-2 text-slate-400">{item.import}</div>}
        <code>{item.code}</code>
      </pre>
    </section>
  );

  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      <div className="mb-5 flex items-center justify-between">
        <button onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100">
          <ArrowLeft size={15} /> 返回
        </button>
        <GiveToAI item={item} />
      </div>

      {live ? (
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" /> 互動範例 · 真實元件，可直接操作
          </div>
          <LiveDemo name={item.name} dark={dark} />
        </div>
      ) : (
        <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <PreviewTile item={item} big />
        </div>
      )}
      {isPattern && item.flowId && (
        <button onClick={() => onOpenFlow(item.flowId, item.flowName || item.name)}
          className="mb-6 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300">
          <Play size={15} /> 預覽流程
        </button>
      )}
      <div className="mb-2 flex items-center gap-2">
        <Tag color={isPattern ? "#a855f7" : meta.color}>{item.category}</Tag>
        {isPattern && item.planned && <Tag color="#a855f7">規劃中</Tag>}
      </div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-50">{item.name}</h1>
      {item.en && <div className="text-sm text-slate-400 dark:text-slate-500">{item.en}</div>}
      <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{item.summary}</p>

      <div className="my-6 h-px bg-slate-100 dark:bg-slate-800" />

      {isPattern ? (
        <PatternBody item={item} onSelect={onSelect} onOpenFlow={onOpenFlow} />
      ) : (
        <>{WhenBlock}{CodeBlock}</>
      )}

      {/* Used-by */}
      {!isPattern && (
        <section className="mb-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            <ExternalLink size={15} /> 已實際使用的平台
          </div>
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center dark:border-slate-700 dark:bg-slate-800/50">
            <p className="text-sm text-slate-400 dark:text-slate-500">尚未串接使用數據</p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">日後可在此列出採用此元件的產品與連結，供使用者直接訪問參考</p>
          </div>
        </section>
      )}
    </div>
  );
}

function PatternBody({ item, onSelect, onOpenFlow }) {
  return (
    <>
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <Compass size={15} /> {item.planned ? "預計流程" : "流程"}
        </div>
        <div className="rounded-xl border border-purple-100 bg-purple-50/50 px-5 py-4 text-[15px] leading-relaxed text-slate-700 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-slate-200">
          {item.flow}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <Component size={15} /> {item.planned ? "預計組成元件" : "組成元件"}
        </div>
        <div className="flex flex-wrap gap-2">
          {item.uses.map(name => {
            const c = COMPONENTS.find(x => x.name === name);
            return (
              <button key={name} disabled={!c}
                onClick={() => c && onSelect(c)}
                className={"inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition " +
                  (c ? "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300" : "border-slate-100 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-600")}>
                <Box size={13} /> {name}
              </button>
            );
          })}
        </div>
      </section>

      {item.planned && (
        <section className="mb-4 rounded-xl border border-dashed border-purple-200 bg-purple-50/40 px-5 py-6 text-center dark:border-purple-500/30 dark:bg-purple-500/10">
          <Hammer size={20} className="mx-auto mb-2 text-purple-400" />
          <p className="text-sm font-medium text-purple-700 dark:text-purple-300">此 pattern 規劃中，尚未實作</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">將以上方 DS 元件組合而成，完成後此處會提供可直接取用的範例程式碼</p>
        </section>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
function ThemeToggle({ dark, setDark }) {
  return (
    <button onClick={() => setDark(d => !d)} title={dark ? "切換淺色模式" : "切換深色模式"}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

function Header({ dark, setDark }) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="text-sm text-slate-400 dark:text-slate-500">
        {COMPONENTS.length} 個元件 · {PATTERNS.length} 個情境模式
      </div>
      <ThemeToggle dark={dark} setDark={setDark} />
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// Chat mode (Google AI Mode-style conversational interface)
// ─────────────────────────────────────────────────────────────
function AiMessage({ m, onSelect }) {
  const r = m.results;
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
        <Spark size={24} className="text-indigo-600 dark:text-indigo-400" />
      </div>
      <div className="flex-1">
        {r.length ? (
          <>
            <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">
              針對「<span className="font-medium text-indigo-700 dark:text-indigo-300">{m.q}</span>」，最推薦使用{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-50">{r[0].name}</span>
              {r[0].summary ? `——${r[0].summary}` : ""}。
              {r.length > 1 && "也可以參考下列其他選項："}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {r.map(it => (
                <button key={it.name} onClick={() => onSelect(it)}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                  <PreviewTile item={it} />
                  <div className="flex items-center justify-between px-3 py-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-100">{it.name}</div>
                      <div className="truncate text-xs text-slate-400 dark:text-slate-500">{it.category}</div>
                    </div>
                    <ChevronRight size={15} className="text-slate-300 group-hover:text-indigo-500 dark:text-slate-600" />
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            這個情境我還沒找到合適的元件，換個說法描述看看？例如「使用者要從清單挑多個標籤」。
          </p>
        )}
      </div>
    </div>
  );
}

function ChatMode({ messages, onAsk, onSelect, onExit, dark, setDark }) {
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current && endRef.current.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  const send = () => { if (input.trim()) { onAsk(input.trim()); setInput(""); } };

  // AI-derived classification of the latest question (= category of the top recommendation)
  let topic = "元件推薦";
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "ai" && messages[i].results && messages[i].results.length) {
      topic = messages[i].results[0].category; break;
    }
  }

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-slate-950">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-100 px-5 dark:border-slate-800">
        <button onClick={onExit}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
          <ArrowLeft size={16} /> 返回探索
        </button>
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {topic}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle dark={dark} setDark={setDark} />
          <button onClick={onExit} title="關閉"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200">
            <X size={18} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-8 px-5 py-8">
          {messages.map((m, i) => m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-md bg-indigo-600 px-4 py-2.5 text-[15px] leading-relaxed text-white">{m.text}</div>
            </div>
          ) : (
            <AiMessage key={i} m={m} onSelect={onSelect} />
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <div className="shrink-0 border-t border-slate-100 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-indigo-300 focus-within:shadow-md dark:border-slate-700 dark:bg-slate-900">
          <Spark size={20} className="ml-2 text-indigo-500" />
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="繼續描述你的情境"
            className="flex-1 bg-transparent px-1 py-2 text-[15px] text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            autoFocus
          />
          <button onClick={send} aria-label="送出"
            className="flex items-center justify-center rounded-xl bg-indigo-600 p-2.5 text-white transition hover:bg-indigo-700">
            <ArrowUp size={18} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
export default function App() {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("home");      // "home" | "chat"
  const [messages, setMessages] = useState([]);
  const [dark, setDark] = useState(false);
  const [flow, setFlow] = useState(null);        // { id, title } | null

  useEffect(() => {
    const el = document.documentElement;
    if (dark) el.classList.add("dark"); else el.classList.remove("dark");
  }, [dark]);

  const ask = (q) => {
    const results = searchItems(q);
    setMessages(m => [...m, { role: "user", text: q }, { role: "ai", q, results }]);
    setView("chat");
  };
  const exitChat = () => { setMessages([]); setSelected(null); setView("home"); };
  const goHome = () => { setSelected(null); setView("home"); };

  const pureChat = view === "chat" && !selected;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100"
      style={{ fontFamily: "system-ui, -apple-system, 'Noto Sans TC', sans-serif" }}>
      {!pureChat && <Sidebar onSelect={setSelected} onHome={goHome} current={selected} />}
      <div className="flex-1 overflow-y-auto" style={{ height: "100vh" }}>
        {pureChat ? (
          <ChatMode messages={messages} onAsk={ask} onSelect={setSelected} onExit={exitChat} dark={dark} setDark={setDark} />
        ) : (
          <>
            <Header dark={dark} setDark={setDark} />
            {selected
              ? <Detail item={selected} onBack={() => setSelected(null)} onSelect={setSelected} dark={dark}
                  onOpenFlow={(id, title) => setFlow({ id, title })} />
              : <Home onSelect={setSelected} onAsk={ask} />}
          </>
        )}
      </div>
      {flow && <FlowOverlay flowId={flow.id} title={flow.title} dark={dark} onClose={() => setFlow(null)} />}
    </div>
  );
}
