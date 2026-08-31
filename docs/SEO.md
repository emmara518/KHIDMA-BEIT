# البنية الفنية وتهيئة محركات البحث (Technical SEO) | خدمة بيت

## استراتيجية العناوين (Heading Hierarchy)
تحتوي الصفحة على وسم `H1` وحيد فقط، متبوعاً بعناوين `H2` منتظمة منطقياً:

1. **H1 الرئيسي**:
   - `خدمات منزلية متكاملة في المنطقة الشرقية`
2. **H2 الأقسام**:
   - `خدماتنا` (خدمات منزلية تحتاجها... في مكان واحد)
   - `وش تحتاج في بيتك؟`
   - `لماذا خدمة بيت؟`
   - `طلب الخدمة أسهل مما تتوقع`
   - `نخدمك في المنطقة الشرقية`
   - `الأسئلة الشائعة`
   - `تحتاج خدمة لمنزلك؟`

---

## البيانات المنظمة (Structured Data / JSON-LD)
تم تضمين مخططين رسميين:
1. **LocalBusiness / HomeAndConstructionBusiness Schema**:
   - اسم البراند (`خدمة بيت`) والوصف الرسمي.
   - قائمة المدن المشمولة بالخدمة في المنطقة الشرقية (`areaServed`).
   - قائمة الخدمات المتاحة (`knowsAbout`).
   - **سياسة الشفافية**: عدم تضمين `AggregateRating` أو تقييمات نجوم أو أرقام ترخيص إلا عند توفر بيانات موثقة من العميل.
2. **FAQPage Schema**:
   - مطابقة للأسئلة والأجوبة الظاهرة فعلياً في الموقع.

### تحسينات السيو المحلي (Local SEO / Google Maps)
أُضيفت العناصر التالية لتحسين الظهور في نتائج خرائط جوجل والتصنيف المحلي:
- **`openingHoursSpecification`**: ساعات العمل اليومية (من 8 صباحاً حتى 11 مساءً) في الـ JSON-LD — قابلة للتعديل من `src/config/business.ts`.
- **`hasMap`**: رابط فتح الموقع في خرائط جوجل (تُستخدم قيمة تلقائية من الإحداثيات إن لم يُحدد رابط رسمي بعد).
- **`geo` (GeoCoordinates)**: إحداثيات مأخوذة من `BUSINESS_CONFIG.geo` — استبدلها بإحداثيات العنوان الفعلي بعد إنشاء النشاط على خرائط جوجل.
- **`addressLocality` / `postalCode`**: المدينة الرئيسية (الدمام) وعناصر العنوان — تملأها من config فور توفرها.
- **`image`**: تشير الآن إلى `/og-image.png` بدلاً من مسار غير موجود.
- **قسم خريطة جوجل** (`LocationMap`): iframe بخريطة المنطقة الشرقية مع `loading="lazy"` و `title` وازارات فتح في خرائط جوجل + حجز واتساب.
- **Meta الجغرافية في `index.html`**: `geo.region=SA-04`، `geo.placename`، `ICBM`.
- **`public/robots.txt`** و **`public/sitemap.xml`**: خاصتان بالنطاق النهائي — حدّث النطاق فيهما وعند النشر على Vercel.
- **`favicon.svg`** في `public/` وإشارته في `index.html`.
- **`og-image.png`** (1200×630) مع وسوم `og:image` و `twitter:image`.

### تكامل Google Customer Reviews (تقييم الباعة + شارة المتجر)
- **استطلاع التقييم (Opt-in)**: يظهر على صفحة تأكيد الطلب `/confirmation` بعد إرسال نموذج الهيرو (يتطلب البريد الإلكتروني والموعد المفضل). يُمرَّر إليه `order_id`, `email`, `delivery_country` (SA) و `estimated_delivery_date` ديناميكياً عبر `src/utils/googleReviews.ts` عند تحميل `platform.js` ثم `gapi.surveyoptin.render`.
- **شارة المتجر (Store Widget)**: `src/components/MerchantBadge.tsx` يحمّل `merchantwidget.js` ويشغّلها بموقع `LEFT_BOTTOM` مع `region: 'SA'`؛ بارتفاع جانب إضافي على الجوال (`mobileBottomMargin`) حتى لا تتداخل مع شريط الحجز السفلي.
- **مركز التهيئة**: `BUSINESS_CONFIG.googleMerchantId` (5846699356)، `deliveryCountry`، `merchantWidgetPosition`.
- **المتطلبات**: `vercel.json` يعيد توجيه أي مسار إلى `index.html` حتى تعمل صفحة `/confirmation` على Vercel.
- **ملاحظات**: تظهر عبارة "لا يوجد تقييم بعد" في الشارة حتى يبدأ تجميع التقييمات؛ ويلزم استكمال التسجيل في Google Merchant Center وحساب Google Customer Reviews لتفعيل البرنامج.

### خطوات النشر على خرائط جوجل (من قِبل العميل)
1. إنشاء ملف نشاط (Google Business Profile) بالاسم: **خدمة بيت**.
2. استخدام نفس رقم الهاتف/الواتساب الظاهر في الموقع (اتساق NAP).
3. إدخال العنوان الفعلي وساعات العمل.
4. بعد إنشاء الملف، ضع رابط ملف الخريطة في `BUSINESS_CONFIG.mapsUrl` لتحديث `hasMap` والصورة، واستبدل إحداثيات `geo` بعنوانك الفعلي.
5. أضف رابطه في `socialLinks` (حقل sameAs) عند توفره.

---

## بنية المسارات المستقبلية (Future Route Architecture)
تم تجهيز الرموز والمعرفات (`slugs`) لدعم التوسع المستقبلي:
- مسارات الخدمات:
  - `/services/home-cleaning/`
  - `/services/villa-cleaning/`
  - `/services/sofa-cleaning/`
  - `/services/carpet-cleaning/`
  - `/services/tank-cleaning/`
  - `/services/ac-cleaning/`
  - `/services/pest-control/`
  - `/services/drain-cleaning/`
- مسارات المدن:
  - `/locations/dammam/`
  - `/locations/khobar/`
  - `/locations/qatif/`
  - `/locations/dhahran/`
  - `/locations/saihat/`
  - `/locations/jubail/`
  - `/locations/al-ahsa/`
- ومسارات الخدمة في المدينة مستقبلاً:
  - `/services/{service}/{city}/`
