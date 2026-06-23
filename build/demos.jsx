import React from "react";
import { createRoot } from "react-dom/client";
import { Bell, Info, Filter, ChevronDown, Copy, Pencil, Trash2, Building2, Plus, Mail, SearchX, Settings, User, Bot, Archive, Folder, FileText, Check, ArrowRight, ArrowLeft, CircleCheck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const S = "@/design-system/components";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/design-system/components/Accordion/accordion";
import { Alert } from "@/design-system/components/Alert/alert";
import { Avatar } from "@/design-system/components/Avatar/avatar";
import { Badge } from "@/design-system/components/Badge/badge";
import { Button } from "@/design-system/components/Button/button";
import { Checkbox } from "@/design-system/components/Checkbox/checkbox";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose } from "@/design-system/components/Dialog/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/design-system/components/DropdownMenu/dropdown-menu";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/design-system/components/HoverCard/hover-card";
import { Input } from "@/design-system/components/Input/input";
import { NumberInput } from "@/design-system/components/NumberInput/number-input";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverBody } from "@/design-system/components/Popover/popover";
import { ProgressBar } from "@/design-system/components/ProgressBar/progress-bar";
import { RadioGroup, RadioGroupItem } from "@/design-system/components/RadioGroup/radio-group";
import { SelectionItem } from "@/design-system/components/SelectionControl/selection-item";
import { Slider } from "@/design-system/components/Slider/slider";
import { Switch } from "@/design-system/components/Switch/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/design-system/components/Tabs/tabs";
import { Tag } from "@/design-system/components/Tag/tag";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/design-system/components/Tooltip/tooltip";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/design-system/components/Breadcrumb/breadcrumb";
import { Separator } from "@/design-system/components/Separator/separator";
import { Chip, ChipGroup } from "@/design-system/components/Chip/chip";
import { DescriptionList, DescriptionItem } from "@/design-system/components/DescriptionList/description-list";
import { Empty } from "@/design-system/components/Empty/empty";
import { Textarea } from "@/design-system/components/Textarea/textarea";
import { LinkInput } from "@/design-system/components/LinkInput/link-input";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetBody, SheetFooter, SheetClose } from "@/design-system/components/Sheet/sheet";
import { MenuItem } from "@/design-system/components/Menu/menu-item";
import { FileItem } from "@/design-system/components/FileItem/file-item";
import { AspectRatio } from "@/design-system/components/AspectRatio/aspect-ratio";
import { Skeleton } from "@/design-system/components/Skeleton/skeleton";
import { CircularProgress } from "@/design-system/components/CircularProgress/circular-progress";
import { SegmentedControl, SegmentedControlItem } from "@/design-system/components/SegmentedControl/segmented-control";
import { Steps, StepItem, StepLabel, StepDescription, StepContent } from "@/design-system/components/Steps/steps";
import { Notice } from "@/design-system/components/Notice/notice";
import { ScrollArea } from "@/design-system/components/ScrollArea/scroll-area";
import { FileUpload } from "@/design-system/components/FileUpload/file-upload";
import { TimePicker } from "@/design-system/components/TimePicker/time-picker";
import { OverflowIndicator } from "@/design-system/components/OverflowIndicator/overflow-indicator";
import { Select } from "@/design-system/components/Select/select";
import { Combobox } from "@/design-system/components/Combobox/combobox";
import { DatePicker } from "@/design-system/components/DatePicker/date-picker";
import { Rating } from "@/design-system/components/Rating/rating";
import { Coachmark } from "@/design-system/components/Coachmark/coachmark";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/design-system/components/Field/field";
import { FieldControlGroup } from "@/design-system/components/FieldControlGroup/field-control-group";
import { BulkActionBar } from "@/design-system/components/BulkActionBar/bulk-action-bar";
import { TreeView, TreeItem } from "@/design-system/components/TreeView/tree-view";
import { Toaster, toast } from "@/design-system/components/Toast/toast";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/design-system/components/Command/command";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots } from "@/design-system/components/Carousel/carousel";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/design-system/components/Chart/chart";

const DEMOS = {
  Accordion: () => (
    <div style={{ width: 420 }}>
      <Accordion type="single" collapsible defaultValue="a">
        <AccordionItem value="a"><AccordionTrigger>常見問題</AccordionTrigger><AccordionContent>點擊標題即可展開／收合，這是真實的 DS Accordion 元件。</AccordionContent></AccordionItem>
        <AccordionItem value="b"><AccordionTrigger>退款政策</AccordionTrigger><AccordionContent>購買後 30 天內可申請全額退款。</AccordionContent></AccordionItem>
        <AccordionItem value="c"><AccordionTrigger>進階選項</AccordionTrigger><AccordionContent>這裡放不常用的設定。</AccordionContent></AccordionItem>
      </Accordion>
    </div>
  ),
  Alert: () => (
    <div className="flex flex-col gap-3" style={{ width: 440 }}>
      <Alert variant="info" appearance="subtle" title="系統維護通知">今晚 02:00–04:00 進行例行維護。</Alert>
      <Alert variant="warning" appearance="subtle" title="方案即將到期">請於 3 日內更新付款方式。</Alert>
      <Alert variant="success" appearance="subtle" title="已成功儲存">你的變更已套用。</Alert>
    </div>
  ),
  Avatar: () => (
    <div className="flex items-center gap-4">
      <Avatar size={44} alt="Alice" color="indigo" />
      <Avatar size={44} icon={Building2} color="blue" />
      <Avatar size={44} alt="Bob" color="purple" />
      <Avatar size={44} />
    </div>
  ),
  Badge: () => (
    <div className="flex items-center gap-6">
      <div style={{ position: "relative" }}><Bell size={26} /><span style={{ position: "absolute", top: -6, right: -8 }}><Badge count={5} /></span></div>
      <Badge count={1} /><Badge count={42} /><Badge count={120} max={99} />
    </div>
  ),
  Button: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">主要動作</Button>
        <Button variant="secondary">次要</Button>
        <Button variant="tertiary">第三</Button>
        <Button variant="text">文字</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" startIcon={Plus}>新增</Button>
        <Button variant="secondary" danger startIcon={Trash2}>刪除</Button>
        <Button variant="primary" loading>載入中</Button>
      </div>
    </div>
  ),
  Checkbox: () => (
    <div className="flex flex-col gap-3" style={{ width: 280 }}>
      <SelectionItem control={<Checkbox id="c1" defaultChecked />} label="接收電子報" htmlFor="c1" />
      <SelectionItem control={<Checkbox id="c2" />} label="接收簡訊通知" description="僅在重要事件時發送" htmlFor="c2" />
      <SelectionItem control={<Checkbox id="c3" defaultChecked />} label="同意服務條款" htmlFor="c3" />
    </div>
  ),
  Dialog: () => (
    <Dialog>
      <DialogTrigger asChild><Button>邀請成員</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>邀請成員加入專案</DialogTitle></DialogHeader>
        <DialogBody><p className="text-body">輸入 Email 即可邀請，對方會收到通知信並自動加入。</p></DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button variant="tertiary">取消</Button></DialogClose>
          <Button variant="primary">送出邀請</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  DropdownMenu: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="tertiary" endIcon={ChevronDown}>操作</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem startIcon={Copy}>複製</DropdownMenuItem>
        <DropdownMenuItem startIcon={Pencil}>編輯</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem startIcon={Trash2} className="text-error">刪除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  HoverCard: () => (
    <div className="flex items-center gap-3">
      <span className="text-caption text-fg-muted">Reviewer：</span>
      <HoverCard>
        <HoverCardTrigger asChild>
          <button type="button" className="cursor-pointer rounded-full"><Avatar alt="Ada Chen" color="indigo" size={32} /></button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex items-center gap-3">
            <Avatar alt="Ada Chen" color="indigo" size={40} />
            <div><div className="text-body font-medium">Ada Chen</div><div className="text-caption text-fg-muted">前端工程師 · 128 commits</div></div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  Input: () => (
    <div className="flex flex-col gap-3" style={{ width: 280 }}>
      <Input placeholder="你的名字" />
      <Input placeholder="you@example.com" defaultValue="percy@studio.com" />
    </div>
  ),
  NumberInput: () => (
    <div className="flex flex-col gap-3" style={{ width: 220 }}>
      <NumberInput defaultValue={2490} prefix="$" />
      <NumberInput defaultValue={85.5} suffix="%" precision={1} />
    </div>
  ),
  Popover: () => (
    <Popover>
      <PopoverTrigger asChild><Button variant="tertiary" startIcon={Filter}>依狀態篩選</Button></PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader><PopoverTitle>依狀態篩選</PopoverTitle></PopoverHeader>
        <PopoverBody>
          <div className="flex flex-col gap-2">
            <SelectionItem control={<Checkbox id="p1" defaultChecked />} label="待處理" htmlFor="p1" />
            <SelectionItem control={<Checkbox id="p2" />} label="進行中" htmlFor="p2" />
            <SelectionItem control={<Checkbox id="p3" />} label="已完成" htmlFor="p3" />
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ),
  ProgressBar: () => (
    <div className="flex flex-col gap-4" style={{ width: 420 }}>
      <ProgressBar value={65} status="inProgress" affix="value" />
      <ProgressBar value={100} status="success" affix="value" />
    </div>
  ),
  RadioGroup: () => (
    <RadioGroup defaultValue="yearly" aria-label="付款方案" style={{ width: 360 }}>
      <SelectionItem control={<RadioGroupItem value="monthly" id="m" />} label="月付方案" htmlFor="m" />
      <SelectionItem control={<RadioGroupItem value="yearly" id="y" />} label="年付方案" description="每年 $2,990，省下兩個月" htmlFor="y" />
      <SelectionItem control={<RadioGroupItem value="lifetime" id="l" />} label="終身方案" htmlFor="l" />
    </RadioGroup>
  ),
  Slider: () => (
    <div className="flex flex-col gap-6" style={{ width: 360 }}>
      <Slider defaultValue={[40]} />
      <Slider defaultValue={[25, 75]} />
    </div>
  ),
  Switch: () => (
    <div className="flex flex-col gap-4" style={{ width: 300 }}>
      <Switch defaultChecked label="啟用通知" description="收到新訊息時提醒你" />
      <Switch label="自動儲存草稿" />
    </div>
  ),
  Tabs: () => (
    <Tabs defaultValue="overview" style={{ width: 520 }}>
      <TabsList>
        <TabsTrigger value="overview">總覽</TabsTrigger>
        <TabsTrigger value="members">成員</TabsTrigger>
        <TabsTrigger value="notifications" badge={<Badge count={3} />}>通知</TabsTrigger>
        <TabsTrigger value="settings">設定</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-body text-fg-secondary">專案總覽：KPI、最近活動、團隊成員。</TabsContent>
      <TabsContent value="members" className="text-body text-fg-secondary">成員列表（3 人待邀請）。</TabsContent>
      <TabsContent value="notifications" className="text-body text-fg-secondary">3 則未讀通知。</TabsContent>
      <TabsContent value="settings" className="text-body text-fg-secondary">一般、權限、整合設定。</TabsContent>
    </Tabs>
  ),
  Tag: () => (
    <div className="flex flex-wrap gap-2">
      <Tag color="blue">設計</Tag><Tag color="green">已完成</Tag><Tag color="amber">待處理</Tag><Tag color="red">緊急</Tag><Tag color="neutral">一般</Tag>
    </div>
  ),
  Tooltip: () => (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild><Button variant="secondary" startIcon={Info}>自動套用品牌</Button></TooltipTrigger>
      <TooltipContent><p>付款頁會自動帶入你的 logo 與主色</p></TooltipContent>
    </Tooltip>
  ),
  Breadcrumb: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">首頁</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">專案</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>權限設定</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  Separator: () => (
    <div className="w-64 overflow-hidden rounded-lg border border-border">
      <MenuItem startIcon={User} description="Email、時區、語言">帳號設定</MenuItem>
      <Separator />
      <MenuItem startIcon={Bell} description="通知規則">通知</MenuItem>
    </div>
  ),
  Chip: () => (
    <ChipGroup type="multiple" defaultValue={["typescript"]}>
      <Chip value="react">React</Chip>
      <Chip value="typescript">TypeScript</Chip>
      <Chip value="figma">Figma</Chip>
      <Chip value="deprecated" disabled>Deprecated</Chip>
    </ChipGroup>
  ),
  DescriptionList: () => (
    <div className="w-72 rounded-lg border border-border p-4">
      <DescriptionList cols={1}>
        <DescriptionItem label="姓名">Ada Chen</DescriptionItem>
        <DescriptionItem label="Email">ada@example.com</DescriptionItem>
        <DescriptionItem label="職稱">Design Engineer</DescriptionItem>
        <DescriptionItem label="時區">UTC+8（台北）</DescriptionItem>
      </DescriptionList>
    </div>
  ),
  Empty: () => (
    <div className="w-80 rounded-lg border border-border p-8">
      <Empty icon={SearchX} title="找不到相符的任務" description="試試其他關鍵字，或調整篩選條件" action={<Button variant="tertiary">清除所有篩選</Button>} />
    </div>
  ),
  Textarea: () => (
    <div style={{ width: 320 }}>
      <Textarea placeholder="描述這個專案的目的、時程、關鍵議題…" rows={5} />
    </div>
  ),
  LinkInput: () => {
    const [v, setV] = React.useState("https://github.com");
    return <div style={{ width: 300 }}><LinkInput value={v} onChange={(x) => setV(typeof x === "string" ? x : (x && x.target ? x.target.value : v))} /></div>;
  },
  Sheet: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="primary">建立新專案</Button></SheetTrigger>
      <SheetContent side="right" className="flex flex-col sm:max-w-lg">
        <SheetHeader><SheetTitle>建立新專案</SheetTitle></SheetHeader>
        <SheetBody><p className="text-body">填寫專案名稱與成員即可建立。</p></SheetBody>
        <SheetFooter>
          <SheetClose asChild><Button variant="tertiary">取消</Button></SheetClose>
          <Button variant="primary">建立</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  Menu: () => (
    <div className="w-64 overflow-hidden rounded-lg border border-border">
      <MenuItem startIcon={User} description="Email、時區、語言">帳號設定</MenuItem>
      <MenuItem startIcon={Bell} description="通知規則">通知</MenuItem>
      <MenuItem startIcon={Settings} description="權限與整合">進階設定</MenuItem>
    </div>
  ),
  FileItem: () => (
    <div className="flex flex-col gap-2" style={{ width: 320 }}>
      <FileItem mode="rich" name="提案.pdf" status="completed" description="2.4 MB" />
      <FileItem mode="rich" name="封面.png" status="uploading" progress={45} description="3.2 MB of 7 MB" />
    </div>
  ),
  AspectRatio: () => (
    <div style={{ width: 320 }}>
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
        <div className="flex h-full w-full items-center justify-center text-sm font-medium"
          style={{ background: "var(--color-indigo-2)", color: "var(--color-indigo-8)" }}>16 : 9</div>
      </AspectRatio>
    </div>
  ),
  Skeleton: () => (
    <div className="flex flex-col gap-2" style={{ width: 300 }}>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
  CircularProgress: () => (
    <div className="flex items-center gap-6">
      <CircularProgress />
      <CircularProgress value={60} aria-label="60%" />
      <CircularProgress value={90} affix="value" aria-label="90%" />
    </div>
  ),
  SegmentedControl: () => (
    <SegmentedControl defaultValue="week">
      <SegmentedControlItem value="day">日</SegmentedControlItem>
      <SegmentedControlItem value="week">週</SegmentedControlItem>
      <SegmentedControlItem value="month">月</SegmentedControlItem>
    </SegmentedControl>
  ),
  Steps: () => (
    <div style={{ width: 420 }}>
      <Steps defaultValue="info" completedValues={["info"]} expansion="multiple" defaultExpanded="all">
        <StepItem value="info">
          <StepLabel>基本資料</StepLabel>
          <StepDescription>填寫姓名與聯絡方式</StepDescription>
          <StepContent><p className="text-body text-fg-secondary">請輸入姓名、Email 與電話。</p></StepContent>
        </StepItem>
        <StepItem value="review">
          <StepLabel>確認</StepLabel>
          <StepDescription>檢查填寫內容</StepDescription>
          <StepContent><p className="text-body text-fg-secondary">確認無誤後送出。</p></StepContent>
        </StepItem>
        <StepItem value="done">
          <StepLabel>完成</StepLabel>
        </StepItem>
      </Steps>
    </div>
  ),
  Notice: () => (
    <div style={{ width: 440 }}>
      <Notice variant="info" title="系統將於今晚 02:00–04:00 進行例行維護" />
    </div>
  ),
  ScrollArea: () => (
    <ScrollArea className="h-[240px] w-72 rounded-lg border border-border">
      <div className="p-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2">
            <span className="text-caption font-mono text-fg-muted w-16 shrink-0">ENG-{100 + i}</span>
            <span className="text-body flex-1 truncate">任務項目 {i + 1}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  FileUpload: () => (
    <div style={{ width: 380 }}>
      <FileUpload accept=".pdf,.doc,.docx" maxSize={5000000} title="上傳你的履歷"
        description="PDF / Word 格式，單檔最大 5 MB" onUpload={() => {}} onReject={() => {}} />
    </div>
  ),
  TimePicker: () => {
    const [v, setV] = React.useState("14:30");
    return <div style={{ width: 200 }}><TimePicker value={v} onChange={(x) => setV(typeof x === "string" ? x : (x && x.target ? x.target.value : v))} aria-label="會議時段" /></div>;
  },
  OverflowIndicator: () => {
    const tags = [{ value: "a", label: "設計" }, { value: "b", label: "前端" }, { value: "c", label: "後端" }, { value: "d", label: "QA" }, { value: "e", label: "PM" }];
    return (
      <div className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5" style={{ width: 280 }}>
        {tags.slice(0, 2).map(t => <Tag key={t.value} size="sm">{t.label}</Tag>)}
        <OverflowIndicator count={tags.length - 2} shape="tag" size="sm">
          {tags.slice(2).map(t => <Tag key={t.value} size="sm">{t.label}</Tag>)}
        </OverflowIndicator>
      </div>
    );
  },
  Select: () => {
    const [v, setV] = React.useState("active");
    const opts = [{ value: "active", label: "啟用中" }, { value: "paused", label: "已暫停" }, { value: "archived", label: "已封存" }];
    return <div style={{ width: 220 }}><Select options={opts} value={v} onChange={setV} aria-label="狀態" /></div>;
  },
  Combobox: () => {
    const [v, setV] = React.useState(["design", "eng"]);
    const opts = [{ value: "design", label: "設計" }, { value: "eng", label: "工程" }, { value: "product", label: "產品" }, { value: "ops", label: "營運" }];
    return <div style={{ width: 260 }}><Combobox options={opts} value={v} onChange={setV} aria-label="類別" /></div>;
  },
  DatePicker: () => {
    const [v, setV] = React.useState("2026-06-23");
    return <div style={{ width: 240 }}><DatePicker value={v} onChange={(x) => setV(typeof x === "string" ? x : (x && x.target ? x.target.value : v))} /></div>;
  },
  Rating: () => {
    const [v, setV] = React.useState(4);
    return (
      <div className="flex flex-col gap-3">
        <Rating value={v} onChange={setV} />
        <Rating value={4.5} readOnly />
      </div>
    );
  },
  Field: () => (
    <div style={{ width: 320 }}>
      <FieldGroup>
        <Field required><FieldLabel>姓名</FieldLabel><Input placeholder="請輸入姓名" /><FieldDescription>中英文皆可</FieldDescription></Field>
        <Field><FieldLabel>暱稱</FieldLabel><Input placeholder="選填" /></Field>
      </FieldGroup>
    </div>
  ),
  FieldControlGroup: () => {
    const [code, setCode] = React.useState("+886");
    const codeOpts = [{ value: "+886", label: "+886" }, { value: "+1", label: "+1" }, { value: "+81", label: "+81" }];
    return (
      <div style={{ width: 340 }}>
        <Field>
          <FieldLabel>聯絡電話</FieldLabel>
          <FieldControlGroup block>
            <Select options={codeOpts} value={code} onChange={setCode} aria-label="國碼" />
            <Input placeholder="912 345 678" />
          </FieldControlGroup>
        </Field>
      </div>
    );
  },
  BulkActionBar: () => {
    const [sel, setSel] = React.useState(["m1", "m2", "m3"]);
    if (!sel.length) return <Button variant="secondary" onClick={() => setSel(["m1", "m2", "m3"])}>重新選取 3 封</Button>;
    return <BulkActionBar selection={sel} onClear={() => setSel([])}
      actions={<><Button variant="tertiary" size="md" startIcon={Archive}>封存</Button><Button variant="tertiary" size="md" startIcon={Trash2}>刪除</Button></>} />;
  },
  TreeView: () => (
    <div className="w-72 overflow-hidden rounded-lg border border-border py-2">
      <TreeView aria-label="檔案瀏覽" defaultExpandedIds={["src", "components"]}>
        <TreeItem id="src" icon={Folder} label="src">
          <TreeItem id="components" icon={Folder} label="components">
            <TreeItem id="button" icon={FileText} label="Button.tsx" />
            <TreeItem id="input" icon={FileText} label="Input.tsx" />
          </TreeItem>
          <TreeItem id="utils" icon={Folder} label="utils" />
        </TreeItem>
      </TreeView>
    </div>
  ),
  Toast: () => (
    <div className="flex flex-col items-center gap-3">
      <Toaster />
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => toast({ variant: "success", title: "已成功儲存", description: "你的變更已套用" })}>觸發成功</Button>
        <Button variant="secondary" onClick={() => toast({ variant: "error", title: "儲存失敗", description: "請稍後再試" })}>觸發錯誤</Button>
      </div>
    </div>
  ),
  Command: () => (
    <div className="w-80 overflow-hidden rounded-lg border border-border">
      <Command>
        <CommandInput placeholder="輸入指令或搜尋…" />
        <CommandList>
          <CommandEmpty>找不到結果</CommandEmpty>
          <CommandGroup heading="建議">
            <CommandItem><Plus size={15} />新增專案</CommandItem>
            <CommandItem><User size={15} />邀請成員</CommandItem>
            <CommandItem><Settings size={15} />開啟設定</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
  Carousel: () => {
    const slides = [["var(--color-indigo-6)", "台北"], ["var(--color-green-6)", "東京"], ["var(--color-amber-6)", "巴黎"], ["var(--color-magenta-6)", "紐約"]];
    return (
      <div style={{ width: 360 }}>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {slides.map(([c, city]) => (
              <CarouselItem key={city}>
                <div className="flex h-44 items-end rounded-lg p-5 text-lg font-medium text-white" style={{ background: c }}>{city}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
    );
  },
  Chart: () => {
    const data = [{ m: "1月", v: 42 }, { m: "2月", v: 65 }, { m: "3月", v: 50 }, { m: "4月", v: 80 }, { m: "5月", v: 60 }, { m: "6月", v: 90 }];
    const config = { v: { label: "營收", color: "var(--color-indigo-6)" } };
    return (
      <div style={{ width: 420 }}>
        <ChartContainer config={config}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="m" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="v" fill="var(--color-indigo-6)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    );
  },
};

// ════════════════════════════════════════════════════════════
// FLOWS — full-screen interactive Pattern simulations
// ════════════════════════════════════════════════════════════
const DEPT_OPTS = [{ value: "eng", label: "工程" }, { value: "design", label: "設計" }, { value: "product", label: "產品" }, { value: "ops", label: "營運" }, { value: "hr", label: "人資" }];
const CODE_OPTS = [{ value: "+886", label: "+886" }, { value: "+1", label: "+1" }, { value: "+81", label: "+81" }];
const labelOf = (opts, v) => (opts.find(o => o.value === v) || {}).label || "—";
const MEAL = { meat: "葷食", veg: "全素", lacto: "蛋奶素" };
const RESTRICT = { seafood: "海鮮", nuts: "堅果", gluten: "麩質" };
const BLANK = { name: "", email: "", dept: "", startDate: "", emName: "", emCode: "+886", emPhone: "", meal: "", restrict: [], shirt: "M", agree: false };
const STEP_TITLES = ["基本資料", "緊急聯絡人與偏好", "同意與送出"];
const STEP_VALUES = ["info", "emergency", "review"];

function OnboardingFlow() {
  const [step, setStep] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [data, setData] = React.useState(BLANK);
  const [errors, setErrors] = React.useState({});
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const toggleR = (v) => setData(d => ({ ...d, restrict: d.restrict.includes(v) ? d.restrict.filter(x => x !== v) : [...d.restrict, v] }));
  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!data.name.trim()) e.name = "請填寫姓名";
      if (!data.email.trim()) e.email = "請填寫 Email"; else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = "Email 格式不正確";
      if (!data.dept) e.dept = "請選擇部門";
      if (!data.startDate) e.startDate = "請選擇到職日";
    }
    if (s === 1) {
      if (!data.emName.trim()) e.emName = "請填寫緊急聯絡人";
      if (!data.emPhone.trim()) e.emPhone = "請填寫聯絡電話";
      if (!data.meal) e.meal = "請選擇用餐偏好";
    }
    if (s === 2) { if (!data.agree) e.agree = "請先同意條款才能送出"; }
    return e;
  };
  const next = () => { const e = validate(step); setErrors(e); if (Object.keys(e).length) return; if (step < 2) setStep(step + 1); else setDone(true); };
  const back = () => { setErrors({}); setStep(s => Math.max(0, s - 1)); };
  const reset = () => { setDone(false); setStep(0); setData(BLANK); setErrors({}); };

  const dateOnChange = (x) => set("startDate", typeof x === "string" ? x : (x && x.target ? x.target.value : ""));

  return (
    <div className="min-h-screen w-full" style={{ background: "var(--canvas)" }}>
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="mb-1 text-xl font-bold" style={{ color: "var(--foreground)" }}>新進員工報到</div>
        <div className="mb-8 text-sm" style={{ color: "var(--fg-muted)" }}>大約 2 分鐘 · 填完即完成報到</div>

        {done ? (
          <div className="rounded-xl border border-border p-12 text-center">
            <Empty icon={CircleCheck} title="報到完成！"
              description={"歡迎加入，" + (data.name || "新夥伴") + "。我們已收到你的報到資料，IT 與行政會盡快與你聯繫。"}
              action={<Button variant="tertiary" onClick={reset}>重新體驗</Button>} />
          </div>
        ) : (
          <>
            <Steps orientation="horizontal" value={STEP_VALUES[step]} completedValues={STEP_VALUES.slice(0, step)} expansion="none" linear>
              <StepItem value="info"><StepLabel>基本資料</StepLabel></StepItem>
              <StepItem value="emergency"><StepLabel>緊急聯絡人與偏好</StepLabel></StepItem>
              <StepItem value="review"><StepLabel>同意與送出</StepLabel></StepItem>
            </Steps>
            <h2 className="mb-5 mt-8 text-lg font-bold" style={{ color: "var(--foreground)" }}>{STEP_TITLES[step]}</h2>

            {step === 0 && (
              <FieldGroup>
                <Field required invalid={!!errors.name}><FieldLabel>姓名</FieldLabel><Input value={data.name} onChange={e => set("name", e.target.value)} placeholder="王小明" />{errors.name && <FieldError>{errors.name}</FieldError>}</Field>
                <Field required invalid={!!errors.email}><FieldLabel>Email</FieldLabel><Input value={data.email} onChange={e => set("email", e.target.value)} placeholder="you@company.com" />{errors.email && <FieldError>{errors.email}</FieldError>}</Field>
                <Field required invalid={!!errors.dept}><FieldLabel>部門</FieldLabel><Select options={DEPT_OPTS} value={data.dept} onChange={v => set("dept", v)} placeholder="選擇部門" />{errors.dept && <FieldError>{errors.dept}</FieldError>}</Field>
                <Field required invalid={!!errors.startDate}><FieldLabel>到職日</FieldLabel><DatePicker value={data.startDate} onChange={dateOnChange} />{errors.startDate && <FieldError>{errors.startDate}</FieldError>}</Field>
              </FieldGroup>
            )}

            {step === 1 && (
              <FieldGroup>
                <Field required invalid={!!errors.emName}><FieldLabel>緊急聯絡人</FieldLabel><Input value={data.emName} onChange={e => set("emName", e.target.value)} placeholder="聯絡人姓名" />{errors.emName && <FieldError>{errors.emName}</FieldError>}</Field>
                <Field required invalid={!!errors.emPhone}><FieldLabel>聯絡電話</FieldLabel>
                  <FieldControlGroup block>
                    <Select options={CODE_OPTS} value={data.emCode} onChange={v => set("emCode", v)} aria-label="國碼" />
                    <Input value={data.emPhone} onChange={e => set("emPhone", e.target.value)} placeholder="912 345 678" />
                  </FieldControlGroup>
                  {errors.emPhone && <FieldError>{errors.emPhone}</FieldError>}
                </Field>
                <Field required invalid={!!errors.meal}><FieldLabel>用餐偏好</FieldLabel>
                  <RadioGroup value={data.meal} onValueChange={v => set("meal", v)}>
                    <SelectionItem control={<RadioGroupItem value="meat" id="meal-meat" />} label="葷食" htmlFor="meal-meat" />
                    <SelectionItem control={<RadioGroupItem value="veg" id="meal-veg" />} label="全素" htmlFor="meal-veg" />
                    <SelectionItem control={<RadioGroupItem value="lacto" id="meal-lacto" />} label="蛋奶素" htmlFor="meal-lacto" />
                  </RadioGroup>
                  {errors.meal && <FieldError>{errors.meal}</FieldError>}
                </Field>
                <Field><FieldLabel>飲食禁忌（可複選）</FieldLabel>
                  <div className="flex flex-col gap-2">
                    {Object.entries(RESTRICT).map(([v, l]) => (
                      <SelectionItem key={v} control={<Checkbox id={"r-" + v} checked={data.restrict.includes(v)} onCheckedChange={() => toggleR(v)} />} label={l} htmlFor={"r-" + v} />
                    ))}
                  </div>
                </Field>
                <Field><FieldLabel>衣服尺寸</FieldLabel>
                  <SegmentedControl value={data.shirt} onValueChange={v => set("shirt", v)}>
                    <SegmentedControlItem value="S">S</SegmentedControlItem>
                    <SegmentedControlItem value="M">M</SegmentedControlItem>
                    <SegmentedControlItem value="L">L</SegmentedControlItem>
                    <SegmentedControlItem value="XL">XL</SegmentedControlItem>
                  </SegmentedControl>
                </Field>
              </FieldGroup>
            )}

            {step === 2 && (
              <>
                <div className="rounded-lg border border-border p-4">
                  <DescriptionList cols={1}>
                    <DescriptionItem label="姓名">{data.name || "—"}</DescriptionItem>
                    <DescriptionItem label="Email">{data.email || "—"}</DescriptionItem>
                    <DescriptionItem label="部門">{labelOf(DEPT_OPTS, data.dept)}</DescriptionItem>
                    <DescriptionItem label="到職日">{data.startDate || "—"}</DescriptionItem>
                    <DescriptionItem label="緊急聯絡人">{data.emName || "—"}</DescriptionItem>
                    <DescriptionItem label="聯絡電話">{data.emPhone ? data.emCode + " " + data.emPhone : "—"}</DescriptionItem>
                    <DescriptionItem label="用餐偏好">{MEAL[data.meal] || "—"}</DescriptionItem>
                    <DescriptionItem label="飲食禁忌">{data.restrict.length ? data.restrict.map(r => RESTRICT[r]).join("、") : "無"}</DescriptionItem>
                    <DescriptionItem label="衣服尺寸">{data.shirt}</DescriptionItem>
                  </DescriptionList>
                </div>
                <div className="mt-4">
                  <Field invalid={!!errors.agree}>
                    <SelectionItem control={<Checkbox id="agree" checked={data.agree} onCheckedChange={() => set("agree", !data.agree)} />}
                      label="我已閱讀並同意員工手冊與個資使用條款" htmlFor="agree" />
                    {errors.agree && <FieldError>{errors.agree}</FieldError>}
                  </Field>
                </div>
              </>
            )}

            <div className="mt-8 flex items-center justify-between">
              <Button variant="tertiary" startIcon={ArrowLeft} disabled={step === 0} onClick={back}>上一步</Button>
              <Button variant="primary" endIcon={step < 2 ? ArrowRight : undefined} onClick={next}>{step < 2 ? "下一步" : "送出報到"}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const FLOWS = { form: OnboardingFlow };

// runtime: render a demo (window.__DEMO_NAME) or a full-screen flow (window.__FLOW_NAME)
const theme = window.__DEMO_THEME || window.__FLOW_THEME || "light";
document.documentElement.setAttribute("data-theme", theme);
const root = createRoot(document.getElementById("root"));
if (window.__FLOW_NAME) {
  const Flow = FLOWS[window.__FLOW_NAME];
  root.render(<TooltipProvider>{Flow ? React.createElement(Flow) : <div style={{ padding: 40 }}>找不到此流程</div>}</TooltipProvider>);
} else {
  const fn = DEMOS[window.__DEMO_NAME];
  root.render(
    <TooltipProvider>
      <div className="flex items-center justify-center p-8" style={{ minHeight: 300, background: "transparent" }}>
        {fn ? React.createElement(fn) : <div style={{ color: "#94a3b8", fontSize: 13 }}>此元件尚無互動範例</div>}
      </div>
    </TooltipProvider>
  );
}

window.__DEMO_NAMES = Object.keys(DEMOS);
window.__FLOW_NAMES = Object.keys(FLOWS);
