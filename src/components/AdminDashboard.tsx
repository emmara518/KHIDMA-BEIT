import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Download,
  LayoutDashboard,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import { BUSINESS_CONFIG, CITIES_DATA, SERVICES_DATA } from '../config/business';
import { WhatsAppIcon } from './WhatsAppIcon';

type OrderStatus = 'new' | 'contacting' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface AdminOrder {
  id: string;
  name: string;
  phone: string;
  service: string;
  city: string;
  district: string;
  date: string;
  time: string;
  price: string;
  status: OrderStatus;
  notes: string;
  createdAt: string;
}

const STORAGE_KEY = 'khidma-beit-orders-v1';

const STATUS_META: Record<OrderStatus, { label: string; classes: string }> = {
  new: { label: 'جديد', classes: 'bg-amber-100 text-amber-800 border-amber-200' },
  contacting: { label: 'قيد التواصل', classes: 'bg-sky-100 text-sky-800 border-sky-200' },
  confirmed: { label: 'مؤكد', classes: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  in_progress: { label: 'قيد التنفيذ', classes: 'bg-violet-100 text-violet-800 border-violet-200' },
  completed: { label: 'مكتمل', classes: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  cancelled: { label: 'ملغي', classes: 'bg-stone-200 text-stone-600 border-stone-300' },
};

const STATUS_ORDER: OrderStatus[] = ['new', 'contacting', 'confirmed', 'in_progress', 'completed', 'cancelled'];

const EMPTY_FORM = {
  name: '',
  phone: '',
  service: SERVICES_DATA[0]?.name ?? '',
  city: CITIES_DATA[0]?.nameAr ?? '',
  district: '',
  date: '',
  time: '',
  price: '',
  status: 'new' as OrderStatus,
  notes: '',
};

function loadOrders(): AdminOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (/^05\d{8}$/.test(digits)) return `966${digits.slice(1)}`;
  if (/^5\d{8}$/.test(digits)) return `966${digits}`;
  return digits;
}

function formatDateAr(value: string): string {
  if (!value) return '—';
  const parsed = new Date(`${value}T00:00:00`);
  if (isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('ar-EG-u-nu-latn', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed);
}

export const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setOrders(loadOrders());
    document.title = 'لوحة إدارة الطلبات | خدمة بيت';
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const prevContent = meta?.getAttribute('content') ?? null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');
    return () => {
      if (prevContent === null) meta?.remove();
      else meta?.setAttribute('content', prevContent);
      document.title = 'خدمة بيت | خدمات منزلية في الدمام والخبر والمنطقة الشرقية';
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // تجاهل أخطاء التخزين (وضع التصفح الخاص مثلاً)
    }
  }, [orders]);

  const stats = useMemo(() => {
    const by = (s: OrderStatus) => orders.filter((o) => o.status === s).length;
    return {
      total: orders.length,
      fresh: by('new'),
      active: by('contacting') + by('confirmed') + by('in_progress'),
      done: by('completed'),
    };
  }, [orders]);

  const filtered = useMemo(() => {
    const q = search.trim();
    return orders
      .filter((o) => (statusFilter === 'all' ? true : o.status === statusFilter))
      .filter((o) =>
        q
          ? [o.name, o.phone, o.service, o.city, o.district, o.notes]
              .join(' ')
              .includes(q)
          : true
      )
      .slice()
      .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  }, [orders, search, statusFilter]);

  const setField = <K extends keyof typeof EMPTY_FORM>(key: K, value: (typeof EMPTY_FORM)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormError('');
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.district.trim()) {
      setFormError('أكمل الحقول المطلوبة: الاسم، الجوال، الحي.');
      return;
    }
    if (!/^[0-9+\s-]{9,15}$/.test(form.phone.trim())) {
      setFormError('رقم الجوال غير صالح. مثال: 0535025900');
      return;
    }
    if (editingId) {
      setOrders((prev) => prev.map((o) => (o.id === editingId ? { ...o, ...form } : o)));
    } else {
      const order: AdminOrder = {
        ...form,
        id: `KB-${Date.now().toString(36).toUpperCase()}`,
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [order, ...prev]);
    }
    resetForm();
  };

  const handleEdit = (order: AdminOrder) => {
    setForm({
      name: order.name,
      phone: order.phone,
      service: order.service,
      city: order.city,
      district: order.district,
      date: order.date,
      time: order.time,
      price: order.price,
      status: order.status,
      notes: order.notes,
    });
    setEditingId(order.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('حذف هذا الطلب نهائياً؟')) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(orders, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `khidma-beit-orders-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    { label: 'إجمالي الطلبات', value: stats.total },
    { label: 'طلبات جديدة', value: stats.fresh },
    { label: 'قيد المتابعة', value: stats.active },
    { label: 'طلبات مكتملة', value: stats.done },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#16211E]">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0E5E4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#0F6B5C] text-white text-lg font-black">
              ب
            </span>
            <span className="text-lg font-black text-[#1A3C34]">خدمة بيت</span>
          </a>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F7F6] text-[#0F6B5C] text-xs font-bold">
            <LayoutDashboard className="w-3.5 h-3.5" />
            لوحة إدارة الطلبات
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1A3C34]">إدارة طلبات العملاء</h1>
            <p className="mt-1 text-sm text-[#5C6B67]">
              تُحفظ الطلبات محلياً على هذا الجهاز ({BUSINESS_CONFIG.formattedPhoneDisplay})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              disabled={orders.length === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold bg-white border border-[#E0E5E4] hover:bg-[#F1F7F6] disabled:opacity-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              تصدير نسخة
            </button>
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-extrabold text-white bg-[#0F6B5C] hover:bg-[#0B5146] transition-colors"
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? 'إغلاق' : 'طلب جديد'}
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#E0E5E4] p-4">
              <p className="text-xs font-bold text-[#5C6B67]">{s.label}</p>
              <p className="mt-1 text-3xl font-black text-[#1A3C34]">{s.value}</p>
            </div>
          ))}
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 bg-white rounded-3xl border border-[#E0E5E4] shadow-sm p-5 sm:p-7"
          >
            <h2 className="text-lg font-black text-[#1A3C34]">
              {editingId ? 'تعديل الطلب' : 'إضافة طلب جديد'}
            </h2>
            {formError && (
              <p className="mt-3 text-sm font-bold text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                {formError}
              </p>
            )}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <label className="block">
                <span className="text-xs font-bold text-[#5C6B67]">الاسم *</span>
                <input
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                  placeholder="اسم العميل"
                  className="mt-1 w-full rounded-xl border border-[#E0E5E4] bg-[#FAFAF8] px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-[#5C6B67]">الجوال *</span>
                <input
                  value={form.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  placeholder="0535025900"
                  inputMode="tel"
                  dir="ltr"
                  className="mt-1 w-full rounded-xl border border-[#E0E5E4] bg-[#FAFAF8] px-3 py-2.5 text-sm font-bold text-left focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-[#5C6B67]">نوع الخدمة *</span>
                <select
                  value={form.service}
                  onChange={(e) => setField('service', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E0E5E4] bg-[#FAFAF8] px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold text-[#5C6B67]">المدينة *</span>
                <select
                  value={form.city}
                  onChange={(e) => setField('city', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E0E5E4] bg-[#FAFAF8] px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
                >
                  {CITIES_DATA.map((c) => (
                    <option key={c.id} value={c.nameAr}>
                      {c.nameAr}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold text-[#5C6B67]">الحي *</span>
                <input
                  value={form.district}
                  onChange={(e) => setField('district', e.target.value)}
                  placeholder="مثال: حي الشاطئ"
                  className="mt-1 w-full rounded-xl border border-[#E0E5E4] bg-[#FAFAF8] px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-[#5C6B67]">الحالة</span>
                <select
                  value={form.status}
                  onChange={(e) => setField('status', e.target.value as OrderStatus)}
                  className="mt-1 w-full rounded-xl border border-[#E0E5E4] bg-[#FAFAF8] px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
                >
                  {STATUS_ORDER.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_META[s].label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold text-[#5C6B67]">الموعد (التاريخ)</span>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setField('date', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E0E5E4] bg-[#FAFAF8] px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-[#5C6B67]">الموعد (الوقت)</span>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setField('time', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E0E5E4] bg-[#FAFAF8] px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-[#5C6B67]">السعر (ر.س)</span>
                <input
                  value={form.price}
                  onChange={(e) => setField('price', e.target.value)}
                  placeholder="مثال: 250"
                  inputMode="decimal"
                  dir="ltr"
                  className="mt-1 w-full rounded-xl border border-[#E0E5E4] bg-[#FAFAF8] px-3 py-2.5 text-sm font-bold text-left focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
                />
              </label>
              <label className="block sm:col-span-2 lg:col-span-3">
                <span className="text-xs font-bold text-[#5C6B67]">ملاحظات</span>
                <textarea
                  value={form.notes}
                  onChange={(e) => setField('notes', e.target.value)}
                  placeholder="تفاصيل إضافية عن الطلب (اختياري)"
                  rows={2}
                  className="mt-1 w-full rounded-xl border border-[#E0E5E4] bg-[#FAFAF8] px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
                />
              </label>
            </div>
            <div className="mt-5 flex gap-2">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-extrabold text-white bg-[#0F6B5C] hover:bg-[#0B5146] transition-colors"
              >
                {editingId ? 'حفظ التعديلات' : 'إضافة الطلب'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-full text-sm font-bold bg-white border border-[#E0E5E4] hover:bg-[#F1F7F6] transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6B67]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث بالاسم، الجوال، الخدمة، الحي..."
              className="w-full rounded-full border border-[#E0E5E4] bg-white pr-10 pl-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | OrderStatus)}
            className="rounded-full border border-[#E0E5E4] bg-white px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
          >
            <option value="all">كل الحالات</option>
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 bg-white rounded-3xl border border-dashed border-[#E0E5E4] p-10 text-center">
            <ClipboardList className="w-10 h-10 text-[#0F6B5C] mx-auto" />
            <h2 className="mt-3 text-lg font-black text-[#1A3C34]">
              {orders.length === 0 ? 'لا توجد طلبات بعد' : 'لا توجد نتائج مطابقة'}
            </h2>
            <p className="mt-1 text-sm text-[#5C6B67]">
              {orders.length === 0
                ? 'ابدأ بإضافة أول طلب حقيقي من زر "طلب جديد" بالأعلى.'
                : 'جرّب تغيير البحث أو فلتر الحالة.'}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((o) => {
              const waNumber = toWhatsAppNumber(o.phone);
              const waUrl = waNumber
                ? `https://wa.me/${waNumber}?text=${encodeURIComponent(`السلام عليكم ${o.name}، معك خدمة بيت بخصوص طلب ${o.service}.`)}`
                : '#';
              return (
                <article key={o.id} className="bg-white rounded-3xl border border-[#E0E5E4] p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-black text-[#1A3C34]">{o.name}</h3>
                      <p className="text-xs text-[#5C6B67] font-bold" dir="ltr">
                        {o.phone} • {o.id}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-black border ${STATUS_META[o.status].classes}`}
                    >
                      {STATUS_META[o.status].label}
                    </span>
                  </div>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0F6B5C] shrink-0" />
                      <span className="font-bold">{o.service}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#5C6B67]">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="font-bold">
                        {o.city} — {o.district}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#5C6B67]">
                      <CalendarDays className="w-4 h-4 shrink-0" />
                      <span className="font-bold">
                        {formatDateAr(o.date)}
                        {o.time ? ` • ${o.time}` : ''}
                        {o.price ? ` • ${o.price} ر.س` : ''}
                      </span>
                    </div>
                    {o.notes && <p className="text-xs text-[#5C6B67] leading-relaxed">{o.notes}</p>}
                  </dl>
                  <div className="mt-4">
                    <label className="text-[11px] font-bold text-[#5C6B67]">تغيير الحالة</label>
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                      className="mt-1 w-full rounded-xl border border-[#E0E5E4] bg-[#FAFAF8] px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40"
                    >
                      {STATUS_ORDER.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_META[s].label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-extrabold text-[#1A3C34] bg-[#25D366] hover:bg-[#1EBE5D] transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      واتساب
                    </a>
                    <a
                      href={`tel:+${o.phone.replace(/[^0-9]/g, '')}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-bold bg-white border border-[#E0E5E4] hover:bg-[#F1F7F6] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      اتصال
                    </a>
                    <button
                      type="button"
                      onClick={() => handleEdit(o)}
                      aria-label="تعديل الطلب"
                      className="p-2.5 rounded-full bg-white border border-[#E0E5E4] hover:bg-[#F1F7F6] transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(o.id)}
                      aria-label="حذف الطلب"
                      className="p-2.5 rounded-full bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <a
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-[#0F6B5C] hover:text-[#0B5146] transition-colors"
        >
          العودة للصفحة الرئيسية
          <ArrowRight className="w-4 h-4 rotate-180" />
        </a>
      </main>

      <footer className="border-t border-[#E0E5E4] py-5 text-center text-xs text-[#5C6B67]">
        خدمة بيت — لوحة إدارة الطلبات • {BUSINESS_CONFIG.formattedPhoneDisplay}
      </footer>
    </div>
  );
};
