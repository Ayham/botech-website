# BOTech Website - Assets Guide

هذا الدليل يوضح أين تضع كل ملف من Assets (الشعار، الصور، لقطات الشاشة، الأيقونات) في المشروع.

## هيكل المجلدات

```
public/assets/
├── brand/          # أصول العلامة التجارية للشركة
├── company/        # صور الشركة العامة
├── raseed/         # أصول منتج Raseed
├── clover/         # أصول منتج Clover Flow
└── social/         # أيقونات وسائل التواصل (اختياري)
```

---

## 1. Brand Assets — `public/assets/brand/`

| الملف | الوصف | المواصفات | مطلوب |
|--------|---------|------------|-------|
| `logo.svg` | شعار الشركة الرئيسي | SVG، متجه، خلفية شفافة | ✅ نعم |
| `logo-dark.svg` | شعار للخلفيات الداكنة | SVG، لون فاتح | ✅ نعم |
| `favicon.svg` | أيقونة المتصفح | SVG 32×32 أو 48×48 | ✅ نعم |
| `favicon.ico` | أيقونة متصفح احتياطية | ICO متعدد الأحجام (16, 32, 48) | ✅ نعم |
| `og-image.jpg` | صورة مشاركة وسائل التواصل | JPG 1200×630، < 300KB | ✅ نعم |
| `apple-touch-icon.png` | أيقونة iOS | PNG 180×180 | اختياري |

### ملاحظات:
- **logo.svg**: يستخدم في الهيدر والفوتر. يجب أن يكون متجهًا (SVG) لضمان الجودة على جميع الشاشات.
- **og-image.jpg**: تظهر عند مشاركة الرابط على فيسبوك، تويتر، واتساب، لينكدإن. يجب أن تحتوي على شعار الشركة واسمها.
- ضع الملفات مباشرة في المجلد دون مجلدات فرعية.

---

## 2. Company Assets — `public/assets/company/`

| الملف | الوصف | المواصفات | مطلوب |
|--------|---------|------------|-------|
| `hero-image.jpg` | صورة قسم Hero (اختياري) | JPG/WebP 1920×1080، < 500KB | لا |
| `about-image.jpg` | صورة صفحة "من نحن" | JPG/WebP 1200×800، < 300KB | لا |
| `founder-photo.jpg` | صورة المؤسس (اختياري) | JPG/WebP 400×400، مربع، < 200KB | لا |
| `office.jpg` | صورة المكتب/الفريق (اختياري) | JPG/WebP 1200×800، < 300KB | لا |

### ملاحظات:
- إذا لم تتوفر صورة، سيعرض التصميم placeholder أنيقًا بدلاً منها.
- يفضل استخدام صور حقيقية للفريق/المكتب بدلاً من صور ستوك (stock photos).

---

## 3. Raseed Assets — `public/assets/raseed/`

| الملف | الوصف | المواصفات | مطلوب |
|--------|---------|------------|-------|
| `logo.svg` | شعار منتج Raseed | SVG، متجه | ✅ نعم |
| `logo.png` | شعار PNG للـ App Store | PNG 1024×1024، خلفية شفافة | ✅ نعم |
| `cover.jpg` | صورة غلاف المنتج (للعمل/Work) | JPG/WebP 800×600، < 200KB | ✅ نعم |
| `og-image.jpg` | صورة مشاركة المنتج | JPG 1200×630، < 300KB | ✅ نعم |
| `screenshot-1.png` | لقطة شاشة 1: الشاشة الرئيسية | PNG 1080×2400 (نسبة 9:19.5) | ✅ نعم |
| `screenshot-2.png` | لقطة شاشة 2: تحويل الرصيد | PNG 1080×2400 | ✅ نعم |
| `screenshot-3.png` | لقطة شاشة 3: سجل العمليات | PNG 1080×2400 | ✅ نعم |
| `screenshot-4.png` | لقطة شاشة 4: جهات الاتصال | PNG 1080×2400 | لا |
| `screenshot-5.png` | لقطة شاشة 5: الإعدادات/الملف الشخصي | PNG 1080×2400 | لا |
| `hero-phone.png` | صورة الهاتف في قسم Hero | PNG 400×800 مع شفافية | لا |

### مواصفات لقطات الشاشة (Screenshots):
- **الأبعاد**: 1080×2400 بكسل (نسبة 9:19.5) - تناسب شاشات الهواتف الحديثة
- **التنسيق**: PNG (للشفافية) أو JPG عالي الجودة
- **المحتوى**: لقطات حقيقية من التطبيق، لا تستخدم mockups مزيفة
- **اللغة**: يفضل أن تكون اللقطات بالعربية (لغة التطبيق الأساسية)
- **الترتيب المقترح**:
  1. الشاشة الرئيسية / لوحة التحكم
  2. شاشة تحويل الرصيد
  3. سجل العمليات / التاريخ
  4. إدارة جهات الاتصال
  5. الإعدادات / الملف الشخصي

### ملاحظات:
- الصور ستعرض في معرض (gallery) في صفحة المنتج.
- إذا لم تتوفر جميع اللقطات، سيعمل التصميم بشكل جيد مع المتوفر منها.

---

## 4. Clover Flow Assets — `public/assets/clover/`

| الملف | الوصف | المواصفات | مطلوب |
|--------|---------|------------|-------|
| `logo.svg` | شعار منتج Clover Flow | SVG، متجه | ✅ نعم |
| `logo.png` | شعار PNG للـ App Store | PNG 1024×1024، خلفية شفافة | ✅ نعم |
| `cover.jpg` | صورة غلاف المنتج (للعمل/Work) | JPG/WebP 800×600، < 200KB | ✅ نعم |
| `og-image.jpg` | صورة مشاركة المنتج | JPG 1200×630، < 300KB | ✅ نعم |
| `screenshot-1.png` | لقطة شاشة 1: POS / شاشة البيع | PNG 1080×2400 | ✅ نعم |
| `screenshot-2.png` | لقطة شاشة 2: إدارة المخزون | PNG 1080×2400 | ✅ نعم |
| `screenshot-3.png` | لقطة شاشة 3: إدارة العملاء | PNG 1080×2400 | ✅ نعم |
| `screenshot-4.png` | لقطة شاشة 4: التقارير/التحليلات | PNG 1080×2400 | لا |
| `screenshot-5.png` | لقطة شاشة 5: لوحة التحكم web | PNG 1920×1080 (سطح مكتب) | لا |
| `hero-dashboard.png` | صورة لوحة التحكم في Hero | PNG 1600×900 مع شفافية | لا |

### مواصفات لقطات الشاشة:
- **الهاتف (Android)**: 1080×2400 بكسل (نسبة 9:19.5)
- **الويب (Dashboard)**: 1920×1080 بكسل (نسبة 16:9)
- **التنسيق**: PNG مفضل للجودة، JPG مقبول
- **الترتيب المقترح**:
  1. شاشة نقطة البيع (POS)
  2. إدارة المخزون / المنتجات
  3. إدارة العملاء / الحسابات
  4. التقارير والتحليلات
  5. لوحة التحكم على الويب (Desktop)

---

## 5. Social Assets — `public/assets/social/` (اختياري)

| الملف | الوصف | المواصفات |
|--------|---------|------------|
| `facebook.svg` | أيقونة فيسبوك مخصصة | SVG 24×24 |
| `youtube.svg` | أيقونة يوتيوب مخصصة | SVG 24×24 |
| `linkedin.svg` | أيقونة لينكدإن مخصصة | SVG 24×24 |
| `twitter.svg` | أيقونة X/Twitter مخصصة | SVG 24×24 |
| `whatsapp.svg` | أيقونة واتساب مخصصة | SVG 24×24 |

### ملاحظات:
- المشروع يستخدم أيقونات SVG مدمجة (inline) افتراضيًا.
- هذا المجلد فقط إذا أردت أيقونات مخصصة بعلامتكم التجارية.

---

## قائمة التحقق (Checklist)

قبل النشر، تأكد من وجود الملفات الأساسية التالية:

### مطلوبة (Blocking):
- [ ] `public/assets/brand/logo.svg`
- [ ] `public/assets/brand/logo-dark.svg`
- [ ] `public/assets/brand/favicon.svg`
- [ ] `public/assets/brand/favicon.ico`
- [ ] `public/assets/brand/og-image.jpg`
- [ ] `public/assets/raseed/logo.svg`
- [ ] `public/assets/raseed/logo.png`
- [ ] `public/assets/raseed/cover.jpg`
- [ ] `public/assets/raseed/og-image.jpg`
- [ ] `public/assets/raseed/screenshot-1.png`
- [ ] `public/assets/raseed/screenshot-2.png`
- [ ] `public/assets/raseed/screenshot-3.png`
- [ ] `public/assets/clover/logo.svg`
- [ ] `public/assets/clover/logo.png`
- [ ] `public/assets/clover/cover.jpg`
- [ ] `public/assets/clover/og-image.jpg`
- [ ] `public/assets/clover/screenshot-1.png`
- [ ] `public/assets/clover/screenshot-2.png`
- [ ] `public/assets/clover/screenshot-3.png`

### مرغوبة (Recommended):
- [ ] `public/assets/brand/apple-touch-icon.png`
- [ ] `public/assets/company/founder-photo.jpg`
- [ ] `public/assets/raseed/screenshot-4.png`
- [ ] `public/assets/raseed/screenshot-5.png`
- [ ] `public/assets/clover/screenshot-4.png`
- [ ] `public/assets/clover/screenshot-5.png`

---

## نصائح لتحسين الأداء

1. **ضغط الصور**: استخدم أدوات مثل:
   - `imagemin` / `sharp` للضغط التلقائي
   - TinyPNG / Squoosh للضغط اليدوي
   - هدف: < 200KB للصور الكبيرة، < 100KB للصور المتوسطة

2. **تنسيقات حديثة**:
   - استخدم WebP للصور الفوتوغرافية (مع fallback لـ JPG)
   - استخدم SVG للشعارات والأيقونات
   - استخدم PNG فقط عند الحاجة للشفافية

3. **أبعاد مناسبة**:
   - لا ترفع صورًا أكبر من اللازم
   - الصور في Hero: 1920px عرض كحد أقصى
   - لقطات الشاشة: 1080px عرض للهاتف

4. **التسمية**:
   - استخدم kebab-case: `screenshot-1.png` وليس `Screenshot 1.png`
   - لا تستخدم مسافات أو أحرف عربية في أسماء الملفات

---

## كيفية الاختبار محليًا

```bash
# تشغيل السيرفر المحلي
npm run dev

# بناء الإنتاج للتحقق من الأصول
npm run build
npm run preview
```

تحقق من:
- [ ] جميع الصور تظهر بشكل صحيح
- [ ] لا توجد أخطاء 404 في Console المتصفح
- [ ] الصور محملة بسرعة (تحقق في Network tab)
- [ ] Open Graph تعمل (استخدم Facebook Debugger / Twitter Card Validator)