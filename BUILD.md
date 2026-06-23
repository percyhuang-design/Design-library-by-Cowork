# Build

`index.html` 是建置後的離線單檔成品,**直接用瀏覽器開即可**,平常不需要建置。要修改後重新產生時才需要以下流程。

## 架構

平台本身(`App.jsx` + `previews.jsx`)用 **Tailwind v3** + lucide-react,打包成 `app.bundle.js` / `app.css`。

真實的 DS 元件互動範例與情境模式流程(`build/demos.jsx`)直接從私有設計系統 `@qijenchen/design-system` 的原始碼打包,使用該設計系統的 **Tailwind v4 + tokens**,產生 `demos.bundle.js` / `demos.css`。

兩者用不同 Tailwind 版本會互相衝突,因此 DS 範例都渲染在**隔離的 iframe**(srcDoc)中;`assemble.py` 把兩個 bundle 以 base64 內嵌進單一 `index.html`,iframe 內以 `window.__FLOW_NAME` / `window.__DEMO_NAME` 決定要渲染哪個元件或流程。

## 前置作業

1. Node 18+ 與 Python 3。
2. clone 私有設計系統到 `.source/`(此目錄已 gitignore,不入庫):

   ```bash
   git clone https://github.com/ajenchen/design-system .source/design-system
   ```

## 重新建置

```bash
bash build/build.sh
```

會依序:安裝相依 → 打包平台 app → 打包真實 DS 元件 / 流程 → 產生 DS 的 Tailwind v4 CSS → 組裝出 `index.html`。

## 檔案說明(build/)

| 檔案 | 用途 |
|---|---|
| `entry.jsx` | 平台 app 進入點(掛載 `../App.jsx`) |
| `demos.jsx` | 真實 DS 元件的互動範例 `DEMOS` + 情境模式流程 `FLOWS`(如新進員工報到表單) |
| `app-tailwind.config.js` / `app-tailwind.css` | 平台 app 的 Tailwind v3 設定(含 DS Indigo 色票覆寫、darkMode class) |
| `ds-tailwind.css` | DS 範例的 Tailwind v4 入口(import DS tokens + 掃描 DS 元件原始碼) |
| `ds-bundle.package.json` | 建置所需相依(react、esbuild、tailwind、radix、recharts、embla、cmdk…) |
| `assemble.py` | 把兩個 bundle + css 內嵌組裝成 `../index.html` |

## 新增一個元件互動範例 / 情境模式流程

編輯 `build/demos.jsx`:在 `DEMOS` 加一個 `元件名: () => (<...>)`,或在 `FLOWS` 加一條流程,然後重跑 `build/build.sh`。`App.jsx` 會自動把有範例的元件 / 有流程的情境模式顯示出來。
