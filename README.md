# خودروگرافی

سایت ایستا (بدون build) شامل سه صفحه‌ی به‌هم‌وصل:

| مسیر | محتوا |
|---|---|
| `/` | سند PRD و بررسی رقبا |
| `/demo/` | دموی کلیکی (DaisyUI 5 + Tailwind 4 از CDN)؛ لینک مستقیم: `/demo/#inbox`، `/demo/#report?role=inspector&theme=dark` |
| `/wireframe/` | وایرفریم صفحه‌ها |

اجرای محلی: `python3 -m http.server` و باز کردن `http://localhost:8000`.
دیپلوی: `vercel --prod`.
