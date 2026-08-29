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
