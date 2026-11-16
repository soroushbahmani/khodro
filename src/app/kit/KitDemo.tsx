"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const S = ({ id, t, children }: { id: string; t: string; children: React.ReactNode }) => (
  <section id={id} className="mt-12 scroll-mt-20"><h2 className="text-xl font-black">{t}</h2><Separator className="my-4" />{children}</section>
);

export default function KitDemo() {
  return (
    <div className="pb-8">
      <S id="type" t="تایپوگرافی">
        <h1 className="text-4xl font-black">تیتر یک — خودروگرافی</h1>
        <h2 className="mt-2 text-3xl font-black">تیتر دو</h2>
        <h3 className="mt-2 text-2xl font-extrabold">تیتر سه</h3>
        <p className="mt-3 leading-8">متن اصلی با فونت وزیرمتن؛ <b>پررنگ</b>، <i>مورب</i>، <u>خط‌دار</u>، <mark>هایلایت</mark>، <code className="rounded bg-muted px-1.5">کد</code> و <a href="#type" className="text-primary underline underline-offset-4">پیوند</a>.</p>
        <blockquote className="mt-3 border-s-4 border-primary ps-4 muted leading-8">نقل‌قول: قبل از خرید، خودرو را بخوان.</blockquote>
        <ul className="mt-3 list-disc ps-6 leading-8"><li>فهرست نقطه‌ای</li><li>مورد دوم</li></ul>
        <ol className="mt-2 list-decimal ps-6 leading-8"><li>فهرست شماره‌دار</li><li>مورد دوم</li></ol>
      </S>
      <S id="buttons" t="دکمه‌ها">
        <div className="flex flex-wrap gap-3">
          <Button>اصلی</Button><Button variant="secondary">ثانویه</Button><Button variant="outline">حاشیه‌دار</Button><Button variant="ghost">شفاف</Button>
          <Button variant="destructive">حذف</Button><Button variant="link">پیوند</Button><Button disabled>غیرفعال</Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-extrabold rounded-full">دکمه‌ی زرد برند</Button>
          <Button size="sm">کوچک</Button><Button size="lg">بزرگ</Button>
        </div>
      </S>
      <S id="forms" t="فرم‌ها">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2"><Label htmlFor="k1">فیلد متن</Label><Input id="k1" placeholder="نام و نام خانوادگی" /></div>
          <div className="grid gap-2"><Label htmlFor="k2">ایمیل</Label><Input id="k2" type="email" dir="ltr" placeholder="name@example.com" /></div>
          <div className="grid gap-2"><Label htmlFor="k3">عدد</Label><Input id="k3" type="number" placeholder="۱۲۰۰۰" /></div>
          <div className="grid gap-2"><Label>انتخاب</Label><Select dir="rtl"><SelectTrigger><SelectValue placeholder="خدمت را انتخاب کن" /></SelectTrigger><SelectContent><SelectItem value="a">کارشناسی</SelectItem><SelectItem value="b">خرید غیابی</SelectItem><SelectItem value="c">VIP</SelectItem></SelectContent></Select></div>
          <div className="grid gap-2 sm:col-span-2"><Label htmlFor="k4">توضیح</Label><Textarea id="k4" rows={3} placeholder="متن چندخطی" /></div>
          <label className="flex items-center gap-3"><Checkbox /> قبول شرایط</label>
          <label className="flex items-center gap-3"><Switch /> اعلان‌ها</label>
          <div className="grid gap-2"><Label>حالت</Label><ToggleGroup type="single" variant="outline" defaultValue="ok"><ToggleGroupItem value="ok">سالم</ToggleGroupItem><ToggleGroupItem value="warn">نیمه</ToggleGroupItem><ToggleGroupItem value="bad">معیوب</ToggleGroupItem></ToggleGroup></div>
        </div>
      </S>
      <S id="feedback" t="بازخورد و وضعیت">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>جدید</Badge><Badge variant="secondary">ثانویه</Badge><Badge variant="outline">حاشیه‌دار</Badge><Badge variant="destructive">معیوب</Badge>
          <Button variant="outline" onClick={() => toast.success("ذخیره شد")}>Toast موفق</Button>
          <Button variant="outline" onClick={() => toast.error("خطا رخ داد")}>Toast خطا</Button>
          <Button variant="outline" onClick={() => toast("پیام ساده")}>Toast ساده</Button>
        </div>
        <div className="mt-5 grid gap-3 max-w-md"><Progress value={72} aria-label="پیشرفت" /><div className="flex gap-3 items-center"><Skeleton className="size-12 rounded-full" /><div className="grid gap-2 flex-1"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div></div></div>
        <div className="mt-5 flex items-center gap-4"><Avatar><AvatarImage src="/brand/avatar.jpg" alt="" /><AvatarFallback>KG</AvatarFallback></Avatar>
          <Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm">راهنما (hover)</Button></TooltipTrigger><TooltipContent>این یک Tooltip است</TooltipContent></Tooltip></div>
      </S>
      <S id="layers" t="لایه‌ها و منوها">
        <div className="flex flex-wrap gap-3">
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">منوی بازشو</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>ویرایش</DropdownMenuItem><DropdownMenuItem>کپی</DropdownMenuItem><DropdownMenuItem>حذف</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
          <Sheet><SheetTrigger asChild><Button variant="outline">پنل کشویی</Button></SheetTrigger><SheetContent side="left"><SheetHeader><SheetTitle>پنل کشویی</SheetTitle><SheetDescription>برای فیلتر، جزئیات یا منو.</SheetDescription></SheetHeader></SheetContent></Sheet>
        </div>
      </S>
      <S id="nav" t="تب و آکاردئون">
        <Tabs defaultValue="a" dir="rtl"><TabsList><TabsTrigger value="a">کارشناسی</TabsTrigger><TabsTrigger value="b">گزارش</TabsTrigger><TabsTrigger value="c">حسابداری</TabsTrigger></TabsList>
          <TabsContent value="a" className="py-4 leading-8">محتوای تب کارشناسی.</TabsContent><TabsContent value="b" className="py-4 leading-8">محتوای تب گزارش.</TabsContent><TabsContent value="c" className="py-4 leading-8">محتوای تب حسابداری.</TabsContent></Tabs>
        <Accordion type="single" collapsible className="mt-4"><AccordionItem value="1"><AccordionTrigger>آکاردئون اول</AccordionTrigger><AccordionContent>پاسخ اول.</AccordionContent></AccordionItem><AccordionItem value="2"><AccordionTrigger>آکاردئون دوم</AccordionTrigger><AccordionContent>پاسخ دوم.</AccordionContent></AccordionItem></Accordion>
      </S>
      <S id="cards" t="کارت و جدول">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card><CardHeader><CardTitle>عنوان کارت</CardTitle><CardDescription>توضیح کوتاه</CardDescription></CardHeader><CardContent>محتوای کارت</CardContent></Card>
          <Card><CardHeader><CardTitle>نمره‌ی خودرو</CardTitle><CardDescription>نمونه</CardDescription></CardHeader><CardContent><div className="text-5xl font-black text-primary">۸۲</div></CardContent></Card>
        </div>
        <Card className="mt-4 py-0 overflow-hidden"><Table><TableHeader><TableRow><TableHead className="text-start">بخش</TableHead><TableHead className="text-start">وزن</TableHead><TableHead className="text-start">وضعیت</TableHead></TableRow></TableHeader>
          <TableBody><TableRow><TableCell>موتور</TableCell><TableCell>۲۵٪</TableCell><TableCell><Badge>سالم</Badge></TableCell></TableRow><TableRow><TableCell>بدنه</TableCell><TableCell>۲۰٪</TableCell><TableCell><Badge variant="secondary">نیمه</Badge></TableCell></TableRow></TableBody></Table></Card>
      </S>
    </div>
  );
}
