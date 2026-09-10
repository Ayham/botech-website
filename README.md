# Blue Orbit Technologies (BOTech) - Official Website

موقع الشركة الرسمي لشركة Blue Orbit Technologies - شركة تقنية متخصصة في تطوير الحلول البرمجية، التطبيقات، والمنتجات التقنية.

## التقنيات المستخدمة

- **React 18** + **TypeScript** - واجهة المستخدم
- **Vite** - أداة البناء والتطوير السريع
- **Tailwind CSS** - التصميم والاستايلينغ
- **React Router v6** - التوجيه (Routing)
- **React Helmet Async** - إدارة SEO و Meta tags
- **GitHub Actions** - النشر التلقائي
- **GitHub Pages** - الاستضافة المجانية

## هيكل المشروع

```
botech-website/
├── public/
│   ├── assets/           # الأصول الثابتة (صور، شعارات)
│   │   ├── brand/        # شعار الشركة، الفافكون، صورة OG
│   │   ├── company/      # صور الشركة العامة
│   │   ├── raseed/       # أصول منتج Raseed
│   │   ├── clover/       # أصول منتج Clover Flow
│   │   └── social/       # أيقونات التواصل (اختياري)
│   ├── robots.txt
│   └── CNAME             # botech-live.com
├── src/
│   ├── components/
│   │   ├── ui/           # مكونات UI أساسية (Button, Card, Input, etc.)
│   │   ├── layout/       # Header, Footer, Layout wrapper
│   │   ├── sections/     # أقسام الصفحات (Hero, Services, Products, etc.)
│   │   └── product/      # مكونات خاصة بالمنتجات
│   ├── pages/            # صفحات الموقع
│   ├── config/           # إعدادات الموقع، SEO، التنقل
│   ├── i18n/             # الترجمة (العربية/الإنجليزية) + RTL/LTR
│   ├── hooks/            # Custom hooks
│   ├── utils/            # دوال مساعدة
│   ├── routes.tsx        # إعداد التوجيه
│   ├── main.tsx          # نقطة الدخول
│   └── index.css         # الأنماط العامة + Tailwind
├── .github/workflows/    # GitHub Actions للنشر
├── ASSETS.md             # دليل وضع الأصول
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## الصفحات والمسارات

| المسار | الوصف |
|--------|---------|
| `/` | الصفحة الرئيسية (العربية) |
| `/en` | الصفحة الرئيسية (الإنجليزية) |
| `/about` | من نحن - المؤسس، المنهجية |
| `/services` | خدمات الشركة (10 خدمات) |
| `/work` | أعمالنا - المشاريع والمنتجات |
| `/contact` | تواصل معنا - نموذج + معلومات |
| `/raseed` | منتج Raseed - تطبيق تحويل الرصيد |
| `/clover` | منتج Clover Flow - POS وإدارة الأعمال |
| `/en/about` | About (English) |
| `/en/services` | Services (English) |
| `/en/work` | Work (English) |
| `/en/contact` | Contact (English) |
| `/en/raseed` | Raseed (English) |
| `/en/clover` | Clover Flow (English) |

## المميزات

- **ثنائي اللغة**: عربية (RTL) / إنجليزية (LTR) مع حفظ التفضيل
- **SEO جاهز**: Meta tags، Open Graph، Twitter Cards، Canonical، hreflang
- **أداء عالي**: Code splitting، Lazy loading، Assets محسنة
- **إمكانية الوصول (Accessibility)**: Semantic HTML، ARIA، Focus states، Color contrast
- **تصميم متجاوب**: Mobile-first، يعمل على جميع الأحجام
- **مكونات قابلة لإعادة الاستخدام**: نظام تصميم متسق
- **نشر تلقائي**: Push إلى main → GitHub Actions → GitHub Pages

## التطوير المحلي

```bash
# تثبيت التبعيات
npm install

# تشغيل سيرفر التطوير
npm run dev

# فحص الأنواع
npm run typecheck

# بناء الإنتاج
npm run build

# معاينة البناء
npm run preview
```

## النشر (Deployment)

### GitHub Pages Setup

1. أنشئ Repository على GitHub باسم `botech-website`
2. ارفع الكود:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: BOTech unified company website"
   git branch -M main
   git remote add origin https://github.com/your-org/botech-website.git
   git push -u origin main
   ```
3. في Settings > Pages:
   - Source: **GitHub Actions**
4. في Settings > Pages > Custom domain:
   - أدخل: `botech-live.com`
   - فعّل **Enforce HTTPS**
5. أضف سجلات DNS في GoDaddy (انظر أدناه)

### DNS Records (GoDaddy)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| CNAME | www | your-username.github.io | 600 |

### GitHub Secrets (إذا لزم)

لا توجد أسرار مطلوبة للنشر الأساسي. إذا احتجت متغيرات بيئة:
- Settings > Secrets and variables > Actions > New repository secret

## إدارة المحتوى

### معلومات الشركة
عدل `src/config/site.ts` لتحديث:
- اسم الشركة، الشعار، الوصف
- معلومات التواصل (إيميل، واتساب، هاتف، عنوان)
- روابط وسائل التواصل
- معلومات المؤسس
- الخدمات، المنتجات، أعمال الشركة

### الترجمة
- العربية: `src/i18n/translations.ts` (كائن `ar`)
- الإنجليزية: نفس الملف (كائن `en`)
- لا تترجم حرفيًا - اكتب نصوصًا طبيعية لكل لغة

### الأصول (Assets)
راجع `ASSETS.md` لمعرفة أين تضع كل ملف.

## إضافة منتج جديد

1. أضف بيانات المنتج في `src/config/site.ts` تحت `products`
2. أضف الترجمات في `src/i18n/translations.ts`
3. أنشئ صفحة المنتج في `src/pages/NewProduct.tsx` (استنسخ من Raseed/Clover)
4. أضف المسار في `src/routes.tsx`
5. أضف الأصول في `public/assets/new-product/`
6. أضف رابط المنتج في التنقل (footer, products section)

## متطلبات المتصفح

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## الترخيص

© 2024 Blue Orbit Technologies. All rights reserved.