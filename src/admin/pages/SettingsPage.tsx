import { useState } from 'react';
import { useAdminTranslations } from '../i18n';
import { PageHeader } from '../components/PageHeader';
import { DataTable, type Column } from '../components/DataTable';
import { useAdminData } from '../hooks/useAdminData';
import { callAdmin } from '@/lib/admin-api';
import { IconSettings } from '../components/Icons';
import { Spinner } from '../components/Spinner';
import { Button } from '@/components/ui/Button';

interface SettingRow {
  id: string;
  key: string;
  value: unknown;
  description: string | null;
  updated_at: string;
}

interface CMSData {
  version: number;
  content: Record<string, unknown>;
  updatedAt: string | null;
}

type SectionKey = 'hero' | 'announcement' | 'contact' | 'products';

interface SectionField {
  key: string;
  labelKey?: string;
  spans?: boolean;
}

const SECTION_FIELDS: Record<SectionKey, SectionField[]> = {
  hero: [
    { key: 'badge' },
    { key: 'title', labelKey: 'heroTitle' },
    { key: 'subtitle', labelKey: 'heroSubtitle', spans: true },
  ],
  announcement: [{ key: 'announcement', spans: true }],
  contact: [
    { key: 'email', spans: true },
    { key: 'phone', spans: true },
    { key: 'whatsapp', spans: true },
  ],
  products: [],
};

function RawSettingsTable() {
  const t = useAdminTranslations();
  const { data, loading, error, refresh } = useAdminData<SettingRow[]>({
    connection: 'botech',
    module: 'settings',
    action: 'get',
  });
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function saveSetting(row: SettingRow, newValue: string) {
    setSavingKey(row.key);
    setSaveError(null);
    try {
      let parsed: unknown = newValue;
      try {
        parsed = JSON.parse(newValue);
      } catch {
        parsed = /^\d+$/.test(newValue) ? Number(newValue) : newValue;
      }
      await callAdmin({
        connection: 'botech',
        module: 'settings',
        action: 'update',
        params: { key: row.key, value: parsed },
      });
      refresh();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'save_failed');
    } finally {
      setSavingKey(null);
    }
  }

  function editableCell(row: SettingRow) {
    return (
      <div className="flex items-center gap-2">
        <input
          key={`${row.key}-${row.updated_at}`}
          defaultValue={typeof row.value === 'object' ? JSON.stringify(row.value) : String(row.value ?? '')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              saveSetting(row, (e.target as HTMLInputElement).value);
            }
          }}
          className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm font-mono"
        />
        <Button size="sm" variant="secondary" onClick={(e) => saveSetting(row, (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement)?.value ?? '')} loading={savingKey === row.key}>
          {t.settings.save}
        </Button>
      </div>
    );
  }

  const columns: Column<SettingRow>[] = [
    { key: 'key', header: t.settings.key, render: (r) => <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{r.key}</code> },
    { key: 'value', header: t.settings.value, render: editableCell },
    { key: 'description', header: 'Description', render: (r) => r.description ?? '—' },
    { key: 'updated_at', header: t.common.date, minWidth: true, render: (r) => (r.updated_at ? new Date(r.updated_at).toLocaleString() : '—') },
  ];

  return (
    <>
      {(error || saveError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {t.common.error}: {error ?? saveError}
        </div>
      )}
      <DataTable columns={columns} data={data} rowKey={(r) => r.id} loading={loading} emptyTitle={t.settings.noSettings} />
    </>
  );
}

function CmsEditor() {
  const t = useAdminTranslations();
  const { data, loading, error, refresh } = useAdminData<CMSData>({
    connection: 'botech',
    module: 'content',
    action: 'get',
  });

  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [draft, setDraft] = useState<Record<string, Record<string, string>>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);

  const pick = (sec: SectionKey, field?: string) => {
    const sectionContent = data?.content?.[sec] as Record<string, unknown> | undefined;
    if (!sectionContent) return undefined;
    if (field === undefined) return sectionContent;
    const v = sectionContent[field] as { ar?: string; en?: string } | string | undefined;
    if (typeof v === 'string') return { ar: v, en: v };
    return v ? { ar: v.ar ?? '', en: v.en ?? '' } : undefined;
  };

  const draftValue = (field: string, lang: 'ar' | 'en'): string =>
    draft[activeSection]?.[`${field}.${lang}`] ?? pick(activeSection, field)?.[lang] ?? '';

  const updateDraft = (field: string, lang: 'ar' | 'en', value: string) => {
    setDraft((d) => ({
      ...d,
      [activeSection]: { ...(d[activeSection] ?? {}), [`${field}.${lang}`]: value },
    }));
  };

  async function saveSection() {
    setSaving(true);
    setSaveError(null);
    try {
      if (activeSection === 'products') {
        await callAdmin({
          connection: 'botech',
          module: 'content',
          action: 'update',
          params: { section: 'products', value: productDraft },
        });
        refresh();
        setFlash(true);
        setTimeout(() => setFlash(false), 2500);
        return;
      }
      const fields = SECTION_FIELDS[activeSection];
      const value: Record<string, unknown> = {};
      for (const f of fields) {
        const ar = draftValue(f.key, 'ar').trim();
        const en = draftValue(f.key, 'en').trim();
        value[f.key] = { ar, en };
      }
      await callAdmin({
        connection: 'botech',
        module: 'content',
        action: 'update',
        params: { section: activeSection, value },
      });
      setDraft((d) => ({ ...d, [activeSection]: {} }));
      refresh();
      setFlash(true);
      setTimeout(() => setFlash(false), 2500);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'save_failed');
    } finally {
      setSaving(false);
    }
  }

  // Product status/tagline editing (raseed/clover)
  const productContent = (data?.content?.products ?? {}) as Record<
    string,
    { tagline?: { ar?: string; en?: string }; status?: string } | undefined
  >;
  const [productDraft, setProductDraft] = useState<
    Record<string, { tagline: { ar: string; en: string }; status: string }>
  >({});
  const pd = (key: string, field: 'tagline' | 'status', lang?: 'ar' | 'en') => {
    const d = productDraft[key];
    const src = productContent[key];
    if (field === 'status') return d?.status ?? src?.status ?? 'coming-soon';
    return d?.tagline?.[lang ?? 'ar'] ?? src?.tagline?.[lang ?? 'ar'] ?? '';
  };
  const setPd = (key: string, patch: Partial<{ tagline: { ar: string; en: string }; status: string }>) => {
    setProductDraft((d) => ({
      ...d,
      [key]: {
        status: patch.status ?? pd(key, 'status'),
        tagline: {
          ar: patch.tagline?.ar ?? pd(key, 'tagline', 'ar'),
          en: patch.tagline?.en ?? pd(key, 'tagline', 'en'),
        },
      },
    }));
  };

  if (loading && !data) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  const sections: { key: SectionKey; label: string }[] = [
    { key: 'hero', label: t.settings.hero },
    { key: 'announcement', label: t.settings.announcement },
    { key: 'contact', label: t.settings.contact },
    { key: 'products', label: t.common.products },
  ];

  return (
    <div>
      {(error || saveError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {t.common.error}: {error ?? saveError}
        </div>
      )}

      {flash && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">
          {t.settings.savedSection}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-5">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === s.key
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {sections.find((s) => s.key === activeSection)?.label}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {t.settings.version}: {data?.version ?? 0}
              {data?.updatedAt ? ` • ${t.settings.lastUpdated}: ${new Date(data.updatedAt).toLocaleString()}` : ''}
            </p>
          </div>
          <Button onClick={saveSection} loading={saving}>
            {t.settings.saveSection}
          </Button>
        </div>

        <div className="space-y-5">
          {activeSection === 'products' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.keys(productContent).length === 0 && (
                <div className="col-span-full text-sm text-gray-500">{t.settings.noSettings}</div>
              )}
              {Object.entries(productContent).map(([key]) => (
                <div key={key} className="border border-gray-200 rounded-xl p-5 space-y-4">
                  <p className="text-sm font-semibold text-gray-900 capitalize">{key}</p>
                  <label className="block">
                    <span className="text-xs text-gray-400">{t.crm.status}</span>
                    <select
                      value={pd(key, 'status')}
                      onChange={(e) => setPd(key, { status: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm mt-1"
                    >
                      <option value="available">Available</option>
                      <option value="coming-soon">Coming Soon</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs text-gray-400">{t.settings.arabic} — {t.settings.subtitle}</span>
                    <input
                      value={pd(key, 'tagline', 'ar')}
                      onChange={(e) => setPd(key, { tagline: { ar: e.target.value, en: pd(key, 'tagline', 'en') } })}
                      dir="rtl"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm mt-1"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-gray-400">{t.settings.english} — {t.settings.subtitle}</span>
                    <input
                      value={pd(key, 'tagline', 'en')}
                      onChange={(e) => setPd(key, { tagline: { ar: pd(key, 'tagline', 'ar'), en: e.target.value } })}
                      dir="ltr"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm mt-1"
                    />
                  </label>
                </div>
              ))}
            </div>
          ) : (
            SECTION_FIELDS[activeSection].map((field) => {
              const fieldLabel = t.settings[(field.labelKey ?? field.key) as keyof typeof t.settings] ?? field.key;
              return (
                <div key={field.key} className={field.spans ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'grid sm:grid-cols-2 gap-4'}>
                  <label className="block col-span-full">
                    <span className="text-sm font-medium text-gray-700">{fieldLabel}</span>
                  </label>
                  <label className="block">
                    <span className="text-xs text-gray-400">{t.settings.arabic}</span>
                    <input
                      value={draftValue(field.key, 'ar')}
                      onChange={(e) => updateDraft(field.key, 'ar', e.target.value)}
                      dir="rtl"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm mt-1"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-gray-400">{t.settings.english}</span>
                    <input
                      value={draftValue(field.key, 'en')}
                      onChange={(e) => updateDraft(field.key, 'en', e.target.value)}
                      dir="ltr"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 text-sm mt-1"
                    />
                  </label>
                </div>
              );
            })
          )}

          <p className="text-xs text-gray-400">{t.settings.previewNote}</p>
        </div>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const t = useAdminTranslations();
  const [tab, setTab] = useState<'cms' | 'raw'>('cms');

  return (
    <div>
      <PageHeader
        title={t.settings.title}
        subtitle={t.settings.subtitle}
        icon={<IconSettings size={24} />}
      />

      <div className="flex gap-2 mb-5 border-b border-gray-200 pb-3">
        <button
          onClick={() => setTab('cms')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'cms' ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {t.settings.cms}
        </button>
        <button
          onClick={() => setTab('raw')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'raw' ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {t.settings.rawSettings}
        </button>
      </div>

      {tab === 'cms' ? <CmsEditor /> : <RawSettingsTable />}
    </div>
  );
}