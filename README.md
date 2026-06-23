# Design Pattern Platform

一個類 Mobbin 的 UI component / pattern 分享平台,面向 PM 與工程師。基於 `@qijenchen/design-system`(私有設計系統)打造。

## 功能

- **Landing page**:自然語言問答式搜尋(送出後進入類 Google AI Mode 的純對話介面),依情境推薦元件 / 情境模式。
- **情境模式(Patterns)**:優先呈現於首頁。已完成的模式(如「表單問卷 — 新進員工報到」)可在詳情頁「預覽流程」**全螢幕、可真填、有驗證**地體驗整個多步驟流程;規劃中的模式保留入口並標記。
- **元件(62 個)**:每個元件有「何時使用」、可複製程式碼、以及**真實 DS 元件的互動範例**(51 個已接,渲染在隔離 iframe 中,深色模式同步)。
- **給 AI 使用**:每個元件 / 模式頁可一鍵複製 Markdown 或提示詞,供 AI agent 直接取用(MCP 整合規劃中)。
- **深色 / 淺色模式**;主題色採用 DS 的 Indigo token。

## 檔案

- `index.html` — 建置後的**離線單檔**成品,直接用瀏覽器開即可。
- `App.jsx` — 平台本體(React,單檔)。
- `previews.jsx` — 元件 / 模式的靜態縮圖。
- `build/` — 把真實 DS 元件打包成互動範例的建置管線(見 `BUILD.md`)。

## 開發 / 重新建置

見 [`BUILD.md`](./BUILD.md)。需要私有的 `@qijenchen/design-system` 原始碼(`ajenchen/design-system`)放在 `.source/`。
