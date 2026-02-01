# 🎴 MarchCard - 高級刮刮卡體驗

一個使用 React 18 + TypeScript + Three.js 打造的高級刮刮卡互動體驗應用。

## ✨ 特色功能

- **3D 卡片渲染**: 使用 `@react-three/fiber` 和 Three.js 實現 3D 卡片效果
- **流暢刮卡體驗**: Canvas 實現的刮刮樂，支援滑鼠和觸控操作
- **智能偵測**: 自動計算刮開百分比，達到閾值自動揭曉
- **倒數計時器**: 15 分鐘倒數計時，秒級精確度
- **持久化儲存**: 使用 localStorage 保存狀態，重新整理不丟失
- **過期機制**: 倒數結束後自動失效，CTA 按鈕顯示"已失效"
- **GSAP 動畫**: 精心設計的進場、提示、揭曉和 CTA 脈衝動畫
- **玫瑰金/香檳色主題**: 高級質感的視覺設計
- **繁體中文界面**: 使用香港中性用語
- **音效切換**: 提供音效開關控制（UI 已實現）

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 開發模式

開發模式需要同時啟動前端開發伺服器和 Mock API 伺服器：

**終端 1 - 啟動 Mock API 伺服器:**
```bash
node server.js
```

**終端 2 - 啟動前端開發伺服器:**
```bash
npm run dev
```

然後在瀏覽器中打開 `http://localhost:5173`

### 構建生產版本

```bash
npm run build
```

構建後的文件將位於 `dist` 目錄。

### 預覽生產構建

```bash
npm run preview
```

## 📦 部署到 GitHub Pages

### 方法 1: 使用 GitHub Actions（推薦）

1. 在 GitHub 倉庫設定中啟用 GitHub Pages
2. 將 Source 設定為 "GitHub Actions"
3. 推送到 `main` 分支會自動觸發部署
4. 部署完成後，應用將在 `https://[your-username].github.io/marchcard/` 可用

### 方法 2: 手動部署

```bash
npm run deploy
```

## 🛠 技術棧

- **框架**: React 18 + TypeScript (strict mode)
- **3D 渲染**: Three.js + @react-three/fiber + @react-three/drei
- **動畫**: GSAP
- **構建工具**: Vite
- **API 模擬**: Express (開發環境)
- **部署**: GitHub Pages

## 📁 項目結構

```
marchcard/
├── src/
│   ├── components/          # React 組件
│   │   ├── ScratchCard.tsx  # 主刮刮卡組件
│   │   ├── Card3D.tsx       # 3D 卡片渲染
│   │   ├── ScratchCanvas.tsx # 刮刮樂畫布
│   │   ├── CountdownTimer.tsx # 倒數計時器
│   │   └── AudioToggle.tsx  # 音效切換
│   ├── hooks/               # 自定義 Hooks
│   ├── services/            # API 服務
│   ├── types/               # TypeScript 類型定義
│   ├── utils/               # 工具函數
│   └── assets/              # 靜態資源
├── server.js                # Mock API 伺服器
├── .github/workflows/       # GitHub Actions 配置
└── vite.config.ts           # Vite 配置
```

## 🎮 使用說明

1. **開始抽獎**: 點擊"開始抽獎"按鈕獲取刮刮卡
2. **刮開卡片**: 用滑鼠或手指在卡片上滑動刮開
3. **自動揭曉**: 刮開超過 60% 後自動顯示獎品
4. **倒數計時**: 右上角顯示剩餘時間（15 分鐘）
5. **兌換獎品**: 在時效內點擊"立即兌換"按鈕
6. **音效控制**: 左上角切換音效開關

## 🔧 API 端點

開發環境的 Mock API 提供以下端點：

- `POST /api/start` - 開始抽獎，返回卡片 ID 和過期時間
- `POST /api/reveal` - 揭曉獎品，返回獎品信息
- `POST /api/redeem` - 兌換獎品

## 🎨 自定義配置

### 修改刮開閾值

在 `ScratchCard.tsx` 中調整 `revealThreshold` 參數（默認 60%）：

```typescript
<ScratchCanvas onReveal={handleReveal} revealThreshold={60} />
```

### 修改倒數時間

在 `server.js` 中修改過期時間（默認 15 分鐘）：

```javascript
const expiresAt = Date.now() + 15 * 60 * 1000; // 15 分鐘
```

### 更換 3D 模型

1. 將 GLB 模型文件放入 `public` 目錄
2. 在 `Card3D.tsx` 中取消註解 GLTFLoader 代碼
3. 更新模型路徑

```typescript
const { scene } = useGLTF('/path/to/your-model.glb');
```

## 📝 開發注意事項

- TypeScript strict mode 已啟用
- 所有組件都有完整的類型定義
- localStorage 用於持久化狀態
- 生產環境需要配置真實的 API 端點
- GitHub Pages 部署時使用 `/marchcard/` 作為 base path

## 🐛 故障排除

### 開發模式下 API 請求失敗

確保 Mock API 伺服器正在運行（`node server.js`），並監聽在端口 3001。

### 部署後頁面空白

檢查 `vite.config.ts` 中的 `base` 路徑是否正確設置為 `/marchcard/`。

### Three.js 渲染問題

確保瀏覽器支援 WebGL。可以在 https://get.webgl.org/ 檢查。

## 📄 授權

此項目僅供學習和展示使用。

## 🙏 致謝

- React Three Fiber 社群
- GSAP 動畫庫
- Vite 構建工具

---

Made with ❤️ using React + TypeScript + Three.js
