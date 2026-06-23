import React from "react";
import {
  Check, ChevronDown, ChevronRight, Calendar as CalIcon, Clock, Star, X,
  Search, Bell, Link2, Plus, Minus, Upload, Info, AlertTriangle, CheckCircle2,
  MoreHorizontal, FileText, Folder, Image as ImageIcon, Trash2, Download,
  User, ChevronLeft, Home, Settings, Filter, Inbox
} from "lucide-react";

// tiny shared atoms ────────────────────────────────────────────
const Btn = ({ children, v = "primary", sz = "" }) => {
  const map = {
    primary: "bg-indigo-600 text-white",
    secondary: "bg-white text-slate-700 border border-slate-300",
    tertiary: "bg-slate-100 text-slate-600",
    text: "text-indigo-600",
  };
  return <div className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium ${map[v]} ${sz}`}>{children}</div>;
};
const Fld = ({ ph = "請輸入…", icon, right, w = "w-44", active }) => (
  <div className={`flex items-center gap-1.5 rounded-md border bg-white px-2.5 py-1.5 text-xs ${w} ${active ? "border-indigo-400 ring-2 ring-indigo-100" : "border-slate-300"}`}>
    {icon}
    <span className="flex-1 truncate text-slate-400">{ph}</span>
    {active && <span className="h-3.5 w-px animate-pulse bg-indigo-500" />}
    {right}
  </div>
);
const Avatar = ({ t = "PH", c = "#6366f1" }) => (
  <div className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold text-white" style={{ background: c }}>{t}</div>
);

// preview map ──────────────────────────────────────────────────
const P = {
  // 表單與輸入
  Input: () => <Fld ph="王小明" active />,
  Textarea: () => (
    <div className="w-48 rounded-md border border-slate-300 bg-white px-2.5 py-2 text-xs text-slate-400">
      多行內容…<div className="mt-3 h-px w-full" /><div className="mt-0.5 h-1.5 w-2/3 rounded bg-slate-100" />
    </div>
  ),
  NumberInput: () => <Fld ph="12" w="w-28" right={<div className="flex flex-col gap-0.5"><ChevronDown size={10} className="rotate-180 text-slate-400" /><ChevronDown size={10} className="text-slate-400" /></div>} />,
  LinkInput: () => <Fld ph="https://" icon={<Link2 size={12} className="text-slate-400" />} />,
  Select: () => <Fld ph="選擇部門" right={<ChevronDown size={12} className="text-slate-400" />} />,
  SelectMenu: () => (
    <div className="w-40 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      {["工程", "設計", "產品"].map((t, i) => (
        <div key={t} className={`flex items-center justify-between px-3 py-1.5 text-xs ${i === 1 ? "bg-indigo-50 text-indigo-700" : "text-slate-600"}`}>{t}{i === 1 && <Check size={12} />}</div>
      ))}
    </div>
  ),
  Combobox: () => <Fld ph="搜尋並選擇…" icon={<Search size={12} className="text-slate-400" />} right={<ChevronDown size={12} className="text-slate-400" />} />,
  Checkbox: () => (
    <div className="flex flex-col gap-2">
      {[["已同意條款", true], ["訂閱電子報", false]].map(([t, c]) => (
        <div key={t} className="flex items-center gap-2 text-xs text-slate-600">
          <div className={`flex h-4 w-4 items-center justify-center rounded ${c ? "bg-indigo-600" : "border border-slate-300 bg-white"}`}>{c && <Check size={11} className="text-white" />}</div>{t}
        </div>
      ))}
    </div>
  ),
  RadioGroup: () => (
    <div className="flex flex-col gap-2">
      {[["每月", true], ["每年", false]].map(([t, c]) => (
        <div key={t} className="flex items-center gap-2 text-xs text-slate-600">
          <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${c ? "border-indigo-600" : "border-slate-300"}`}>{c && <div className="h-2 w-2 rounded-full bg-indigo-600" />}</div>{t}
        </div>
      ))}
    </div>
  ),
  Switch: () => (
    <div className="flex items-center gap-3">
      <div className="flex h-5 w-9 items-center rounded-full bg-indigo-600 px-0.5"><div className="ml-auto h-4 w-4 rounded-full bg-white" /></div>
      <div className="flex h-5 w-9 items-center rounded-full bg-slate-300 px-0.5"><div className="h-4 w-4 rounded-full bg-white" /></div>
    </div>
  ),
  Slider: () => (
    <div className="w-44">
      <div className="relative h-1.5 rounded-full bg-slate-200"><div className="absolute h-1.5 w-3/5 rounded-full bg-indigo-600" /><div className="absolute left-3/5 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-600 bg-white shadow" /></div>
    </div>
  ),
  Rating: () => <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} className={i <= 4 ? "fill-amber-400 text-amber-400" : "text-slate-300"} />)}</div>,
  DatePicker: () => <Fld ph="2026 / 06 / 23" icon={<CalIcon size={12} className="text-slate-400" />} />,
  TimePicker: () => <Fld ph="14:30" w="w-28" icon={<Clock size={12} className="text-slate-400" />} />,
  Calendar: () => <MiniCal />,
  DateGrid: () => <MiniCal />,
  PeoplePicker: () => (
    <div className="flex items-center gap-1.5">
      <Avatar t="王" c="#6366f1" /><Avatar t="李" c="#10b981" /><Avatar t="陳" c="#f59e0b" />
      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-400"><Plus size={14} /></div>
    </div>
  ),
  FileUpload: () => (
    <div className="flex w-48 flex-col items-center gap-1 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-center">
      <Upload size={18} className="text-indigo-500" /><span className="text-[11px] text-slate-500">拖曳檔案或點擊上傳</span>
    </div>
  ),
  Field: () => (
    <div className="w-48">
      <div className="mb-1 text-[11px] font-medium text-slate-600">電子郵件 <span className="text-rose-500">*</span></div>
      <Fld ph="you@example.com" w="w-full" />
      <div className="mt-1 text-[10px] text-slate-400">我們不會公開你的信箱</div>
    </div>
  ),
  FieldControlGroup: () => (
    <div className="flex gap-2"><Fld ph="名" w="w-20" /><Fld ph="姓" w="w-20" /></div>
  ),
  SelectionControl: () => (
    <div className="w-48 rounded-lg border border-indigo-400 bg-indigo-50 px-3 py-2 ring-2 ring-indigo-100">
      <div className="flex items-center justify-between text-xs font-medium text-indigo-800">標準方案 <div className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600"><Check size={11} className="text-white" /></div></div>
    </div>
  ),
  SegmentedControl: () => (
    <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs">
      {["日", "週", "月"].map((t, i) => <div key={t} className={`rounded-md px-3 py-1 font-medium ${i === 1 ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}>{t}</div>)}
    </div>
  ),

  // 動作與導覽
  Button: () => <div className="flex flex-wrap items-center gap-2"><Btn>主要動作</Btn><Btn v="secondary">次要</Btn><Btn v="text">文字</Btn></div>,
  BulkActionBar: () => (
    <div className="flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2 text-xs text-white">
      <span className="font-medium">已選 3 筆</span><div className="h-3 w-px bg-slate-600" /><span className="text-slate-300">移動</span><span className="text-slate-300">刪除</span>
    </div>
  ),
  Breadcrumb: () => (
    <div className="flex items-center gap-1 text-xs text-slate-500"><Home size={12} /><span>產品</span><ChevronRight size={11} /><span>設定</span><ChevronRight size={11} /><span className="font-medium text-slate-800">權限</span></div>
  ),
  Tabs: () => (
    <div className="w-48">
      <div className="flex gap-4 border-b border-slate-200 text-xs">
        <div className="border-b-2 border-indigo-600 pb-1.5 font-medium text-indigo-600">總覽</div>
        <div className="pb-1.5 text-slate-400">活動</div><div className="pb-1.5 text-slate-400">設定</div>
      </div>
    </div>
  ),
  Sidebar: () => (
    <div className="w-32 rounded-lg border border-slate-200 bg-white p-1.5">
      {[[Home, "首頁", false], [Inbox, "收件匣", true], [Settings, "設定", false]].map(([Ic, t, a], i) => (
        <div key={i} className={`flex items-center gap-2 rounded px-2 py-1.5 text-[11px] ${a ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-500"}`}><Ic size={13} />{t}</div>
      ))}
    </div>
  ),
  Menu: () => P.DropdownMenu(),
  DropdownMenu: () => (
    <div className="w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-md text-xs">
      <div className="px-3 py-1.5 text-slate-600">編輯</div>
      <div className="px-3 py-1.5 text-slate-600">複製</div>
      <div className="my-1 h-px bg-slate-100" />
      <div className="flex items-center gap-2 px-3 py-1.5 text-rose-600"><Trash2 size={12} />刪除</div>
    </div>
  ),
  Command: () => (
    <div className="w-52 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md">
      <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 text-xs"><Search size={13} className="text-slate-400" /><span className="text-slate-400">輸入指令…</span></div>
      <div className="px-2 py-1 text-xs">
        <div className="flex items-center gap-2 rounded bg-indigo-50 px-2 py-1.5 text-indigo-700"><Plus size={12} />新增專案</div>
        <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600"><User size={12} />邀請成員</div>
      </div>
    </div>
  ),
  Steps: () => (
    <div className="flex items-center text-[10px]">
      {["填寫", "確認", "完成"].map((t, i) => (
        <React.Fragment key={t}>
          <div className="flex flex-col items-center gap-1">
            <div className={`flex h-5 w-5 items-center justify-center rounded-full text-white ${i <= 1 ? "bg-indigo-600" : "bg-slate-300"}`}>{i < 1 ? <Check size={11} /> : i + 1}</div>
            <span className={i <= 1 ? "text-slate-700" : "text-slate-400"}>{t}</span>
          </div>
          {i < 2 && <div className={`mx-1 mb-4 h-0.5 w-8 ${i < 1 ? "bg-indigo-600" : "bg-slate-200"}`} />}
        </React.Fragment>
      ))}
    </div>
  ),
  AppShell: () => (
    <div className="w-52 overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex h-5 items-center gap-1 border-b border-slate-100 bg-slate-50 px-2"><div className="h-2 w-2 rounded-full bg-slate-300" /><div className="ml-auto h-2 w-10 rounded bg-slate-200" /></div>
      <div className="flex h-20"><div className="w-12 border-r border-slate-100 bg-slate-50 p-1.5"><div className="mb-1 h-2 rounded bg-slate-200" /><div className="h-2 rounded bg-slate-200" /></div><div className="flex-1 p-2"><div className="mb-1.5 h-2 w-1/2 rounded bg-slate-200" /><div className="h-10 rounded bg-slate-100" /></div></div>
    </div>
  ),

  // 資料展示
  DataTable: () => (
    <div className="w-52 overflow-hidden rounded-lg border border-slate-200 text-[10px]">
      <div className="flex bg-slate-50 px-2 py-1 font-medium text-slate-500"><span className="flex-1">名稱</span><span className="w-12">狀態</span></div>
      {[["訂單 #1", "完成"], ["訂單 #2", "處理中"]].map(([a, b], i) => (
        <div key={i} className="flex border-t border-slate-100 px-2 py-1.5 text-slate-600"><span className="flex-1">{a}</span><span className="w-12 text-emerald-600">{b}</span></div>
      ))}
    </div>
  ),
  DescriptionList: () => (
    <div className="w-44 text-xs">
      {[["姓名", "王小明"], ["部門", "工程部"], ["到職", "2024/03"]].map(([k, v]) => (
        <div key={k} className="flex border-b border-slate-100 py-1"><span className="w-16 text-slate-400">{k}</span><span className="text-slate-700">{v}</span></div>
      ))}
    </div>
  ),
  Avatar: () => <div className="flex items-center gap-1.5"><Avatar t="王" c="#6366f1" /><Avatar t="李" c="#10b981" /><Avatar t="陳" c="#ec4899" /></div>,
  Badge: () => (
    <div className="flex items-center gap-4">
      <div className="relative"><Bell size={22} className="text-slate-500" /><div className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">5</div></div>
      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">啟用中</span>
    </div>
  ),
  Chip: () => (
    <div className="flex gap-1.5">
      {["設計", "前端"].map(t => <div key={t} className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-600">{t}<X size={11} className="text-slate-400" /></div>)}
    </div>
  ),
  Tag: () => (
    <div className="flex gap-1.5">
      <span className="rounded bg-indigo-100 px-2 py-0.5 text-[11px] font-medium text-indigo-700">緊急</span>
      <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700">待處理</span>
      <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700">已完成</span>
    </div>
  ),
  ProfileCard: () => (
    <div className="flex w-44 items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold text-white">PH</div>
      <div><div className="text-xs font-semibold text-slate-800">王小明</div><div className="text-[10px] text-slate-400">產品設計師</div></div>
    </div>
  ),
  FileItem: () => (
    <div className="flex w-48 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
      <FileText size={18} className="text-indigo-500" /><div className="flex-1"><div className="text-xs font-medium text-slate-700">提案.pdf</div><div className="text-[10px] text-slate-400">2.4 MB</div></div><Download size={14} className="text-slate-400" />
    </div>
  ),
  FileViewer: () => (
    <div className="w-36 overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between bg-slate-50 px-2 py-1 text-[10px] text-slate-500">提案.pdf<ImageIcon size={11} /></div>
      <div className="space-y-1 p-2"><div className="h-1.5 w-full rounded bg-slate-100" /><div className="h-1.5 w-4/5 rounded bg-slate-100" /><div className="h-1.5 w-2/3 rounded bg-slate-100" /></div>
    </div>
  ),
  Chart: () => (
    <div className="flex h-20 items-end gap-1.5">
      {[40, 65, 50, 80, 60, 90].map((h, i) => <div key={i} className="w-4 rounded-t bg-indigo-500" style={{ height: `${h}%`, opacity: 0.4 + i * 0.1 }} />)}
    </div>
  ),
  Carousel: () => (
    <div className="w-44"><div className="flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-purple-400 text-white"><ImageIcon size={22} /></div><div className="mt-1.5 flex justify-center gap-1">{[0, 1, 2].map(i => <div key={i} className={`h-1.5 rounded-full ${i === 0 ? "w-4 bg-indigo-600" : "w-1.5 bg-slate-300"}`} />)}</div></div>
  ),
  TreeView: () => (
    <div className="w-40 text-xs text-slate-600">
      <div className="flex items-center gap-1 py-0.5"><ChevronDown size={12} /><Folder size={13} className="text-indigo-500" />專案</div>
      <div className="ml-4 flex items-center gap-1 py-0.5"><ChevronRight size={12} /><Folder size={13} className="text-indigo-500" />設計</div>
      <div className="ml-4 flex items-center gap-1 py-0.5"><span className="w-3" /><FileText size={13} className="text-slate-400" />readme.md</div>
    </div>
  ),
  Accordion: () => (
    <div className="w-48 divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white text-xs">
      <div className="flex items-center justify-between px-3 py-2 font-medium text-slate-700">常見問題<ChevronDown size={13} className="text-indigo-500" /></div>
      <div className="px-3 py-2 text-[11px] text-slate-400">展開後顯示說明內容…</div>
      <div className="flex items-center justify-between px-3 py-2 text-slate-600">退款政策<ChevronRight size={13} className="text-slate-400" /></div>
    </div>
  ),

  // 回饋與狀態
  Alert: () => (
    <div className="flex w-52 items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
      <AlertTriangle size={15} className="mt-0.5 text-amber-500" /><div className="text-[11px] text-amber-800"><div className="font-medium">方案即將到期</div>請於 3 日內更新付款方式</div>
    </div>
  ),
  Toast: () => (
    <div className="flex w-48 items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs text-white shadow-lg">
      <CheckCircle2 size={15} className="text-emerald-400" />已成功儲存變更<X size={13} className="ml-auto text-slate-400" />
    </div>
  ),
  Notice: () => (
    <div className="flex w-48 items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-[11px] text-indigo-800"><Info size={14} className="text-indigo-500" />系統將於今晚維護</div>
  ),
  ProgressBar: () => (
    <div className="w-44"><div className="mb-1 flex justify-between text-[10px] text-slate-500"><span>上傳中</span><span>68%</span></div><div className="h-2 rounded-full bg-slate-200"><div className="h-2 w-2/3 rounded-full bg-indigo-600" /></div></div>
  ),
  CircularProgress: () => (
    <svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="24" fill="none" stroke="#e2e8f0" strokeWidth="6" /><circle cx="28" cy="28" r="24" fill="none" stroke="#6366f1" strokeWidth="6" strokeLinecap="round" strokeDasharray="150" strokeDashoffset="50" transform="rotate(-90 28 28)" /><text x="28" y="32" textAnchor="middle" fontSize="13" fill="#475569" fontWeight="600">67%</text></svg>
  ),
  Skeleton: () => (
    <div className="w-44 space-y-2"><div className="flex items-center gap-2"><div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" /><div className="flex-1 space-y-1.5"><div className="h-2.5 w-2/3 animate-pulse rounded bg-slate-200" /><div className="h-2 w-1/2 animate-pulse rounded bg-slate-100" /></div></div><div className="h-2 animate-pulse rounded bg-slate-100" /></div>
  ),
  Empty: () => (
    <div className="flex flex-col items-center gap-1.5 text-center"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100"><Inbox size={22} className="text-slate-400" /></div><div className="text-xs font-medium text-slate-500">尚無資料</div><div className="text-[10px] text-slate-400">建立第一筆項目開始</div></div>
  ),
  Coachmark: () => (
    <div className="relative"><div className="rounded-lg bg-indigo-600 px-3 py-2 text-[11px] text-white shadow-lg">點這裡新增專案 👆</div><div className="absolute -bottom-1 left-6 h-2 w-2 rotate-45 bg-indigo-600" /></div>
  ),

  // 覆蓋層
  Dialog: () => (
    <div className="w-48 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
      <div className="mb-1 text-xs font-semibold text-slate-800">刪除這筆資料?</div>
      <div className="mb-2.5 text-[10px] text-slate-400">此操作無法復原</div>
      <div className="flex justify-end gap-1.5"><Btn v="secondary" sz="!px-2 !py-1">取消</Btn><div className="inline-flex rounded-md bg-rose-600 px-2 py-1 text-[11px] font-medium text-white">刪除</div></div>
    </div>
  ),
  Sheet: () => (
    <div className="flex w-52 justify-end overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
      <div className="h-24 w-2/3 border-l border-slate-200 bg-white p-2"><div className="mb-2 h-2.5 w-1/2 rounded bg-slate-200" /><div className="space-y-1.5"><div className="h-2 rounded bg-slate-100" /><div className="h-2 w-4/5 rounded bg-slate-100" /></div></div>
    </div>
  ),
  Popover: () => (
    <div className="relative"><div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600 shadow-md">快速設定面板</div><div className="absolute -top-1 left-6 h-2 w-2 rotate-45 border-l border-t border-slate-200 bg-white" /></div>
  ),
  HoverCard: () => (
    <div className="w-44 rounded-lg border border-slate-200 bg-white p-2.5 shadow-md"><div className="flex items-center gap-2"><Avatar t="王" /><div><div className="text-xs font-semibold text-slate-800">@wang</div><div className="text-[10px] text-slate-400">128 篇貼文</div></div></div></div>
  ),
  Tooltip: () => (
    <div className="relative"><div className="rounded-md bg-slate-800 px-2 py-1 text-[11px] text-white shadow">複製連結</div><div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-800" /></div>
  ),

  // 版面與工具
  AspectRatio: () => (
    <div className="flex w-44 items-center justify-center rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 text-[10px] font-medium text-slate-500" style={{ aspectRatio: "16 / 9", height: 72 }}>16 : 9</div>
  ),
  Separator: () => (
    <div className="w-44 text-center"><div className="text-[11px] text-slate-500">區段一</div><div className="my-2 h-px bg-slate-200" /><div className="text-[11px] text-slate-400">區段二</div></div>
  ),
  ScrollArea: () => (
    <div className="relative h-20 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white p-2 text-[10px] text-slate-500">
      {Array.from({ length: 6 }).map((_, i) => <div key={i} className="border-b border-slate-50 py-1">項目 {i + 1}</div>)}
      <div className="absolute right-1 top-2 h-8 w-1.5 rounded-full bg-slate-300" />
    </div>
  ),
  OverflowIndicator: () => (
    <div className="flex items-center gap-1"><Avatar t="王" c="#6366f1" /><Avatar t="李" c="#10b981" /><Avatar t="陳" c="#f59e0b" /><div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-600">+5</div></div>
  ),
};

function MiniCal() {
  return (
    <div className="w-36 rounded-lg border border-slate-200 bg-white p-2">
      <div className="mb-1.5 flex items-center justify-between text-[10px] font-medium text-slate-600"><ChevronLeft size={11} />2026 六月<ChevronRight size={11} /></div>
      <div className="grid grid-cols-7 gap-0.5 text-center text-[8px] text-slate-400">{["一", "二", "三", "四", "五", "六", "日"].map(d => <div key={d}>{d}</div>)}</div>
      <div className="mt-0.5 grid grid-cols-7 gap-0.5 text-center text-[9px]">
        {Array.from({ length: 28 }).map((_, i) => <div key={i} className={`rounded py-0.5 ${i === 22 ? "bg-indigo-600 text-white" : "text-slate-600"}`}>{i + 1}</div>)}
      </div>
    </div>
  );
}

export function renderPreview(name) {
  const fn = P[name];
  return fn ? fn() : null;
}
export const HAS_PREVIEW = (name) => !!P[name];

// Static preview thumbnails for Pattern flows
const PATTERNS_P = {
  form: () => (
    <div className="w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2.5 flex items-center">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-medium text-white">1</div>
        <div className="mx-1.5 h-px flex-1 bg-slate-200" />
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[9px] text-slate-500">2</div>
        <div className="mx-1.5 h-px flex-1 bg-slate-200" />
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[9px] text-slate-500">3</div>
      </div>
      <div className="space-y-2">
        <div><div className="mb-1 h-1.5 w-9 rounded bg-slate-200" /><div className="h-5 rounded-md border border-slate-200 bg-slate-50" /></div>
        <div><div className="mb-1 h-1.5 w-12 rounded bg-slate-200" /><div className="h-5 rounded-md border border-slate-200 bg-slate-50" /></div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="h-5 w-10 rounded-md border border-slate-200" />
        <div className="flex h-5 w-14 items-center justify-center rounded-md bg-indigo-600 text-[9px] text-white">下一步</div>
      </div>
    </div>
  ),
};
export const renderPatternPreview = (flowId) => {
  const fn = PATTERNS_P[flowId];
  return fn ? fn() : null;
};
