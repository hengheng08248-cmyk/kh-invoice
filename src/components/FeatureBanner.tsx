import { useState, useEffect, useCallback } from 'react';
import {
  Receipt,
  Wallet,
  Package,
  BarChart3,
  Plus,
  Search,
  Download,
  QrCode,
  ChevronRight,
  X,
  TrendingUp,
  TrendingDown,
  FileDown,
  History,
  ArrowDownCircle,
  ArrowUpCircle,
} from 'lucide-react';
import { COLORS, latinFont, khmerFont } from '../lib/theme';

interface Props {
  lang: 'KH' | 'EN';
  onNavigate: (screen: 'InvoiceOverview' | 'Finance' | 'Stock' | 'Report' | 'Invoice') => void;
}

interface Tip {
  icon: typeof Receipt;
  iconBg: string;
  iconColor: string;
  titleKh: string;
  titleEn: string;
  descKh: string;
  descEn: string;
  stepKh: string;
  stepEn: string;
  ctaScreen?: 'InvoiceOverview' | 'Finance' | 'Stock' | 'Report' | 'Invoice';
  ctaKh: string;
  ctaEn: string;
}

const TIPS: Tip[] = [
  {
    icon: Receipt,
    iconBg: COLORS.invoiceTint,
    iconColor: COLORS.invoice,
    titleKh: 'បង្កើតវិក្កយបត្រ',
    titleEn: 'Create Invoices',
    descKh: 'បង្កើតវិក្កយបត្រដ៏ស្អាត បញ្ចូលទំនិញ និងកំណត់តម្លៃបានយ៉ាងងាយ',
    descEn: 'Build clean invoices — add items and set prices in seconds',
    stepKh: 'ចុចប៊ូតុង "+" ពណ៌ខៀវកណ្ដាល ឬ "វិក្កយបត្រ" នៅផ្ទាំងដើម',
    stepEn: 'Tap the blue "+" button in the middle, or "Invoice" on Home',
    ctaScreen: 'Invoice',
    ctaKh: 'បង្កើតឥឡូវនេះ',
    ctaEn: 'Create now',
  },
  {
    icon: FileDown,
    iconBg: COLORS.invoiceTint,
    iconColor: COLORS.invoice,
    titleKh: 'រក្សាទុកវិក្កយបត្រជា PDF',
    titleEn: 'Save Invoice as PDF',
    descKh: 'ផ្ទាំងមើលវិក្កយបត្រ → ចុច "រក្សាទុក PDF" ដើម្បីទាញយកផ្ទាំងស្អាតផ្ញើរទៅអតិថិជន',
    descEn: 'Preview tab → tap "Save PDF" to download a clean page to send customers',
    stepKh: 'បើកផ្ទាំង "មើល" លើវិក្កយបត្រ ហើយចុចប៊ូតុង "រក្សាទុក PDF"',
    stepEn: 'Open the "Preview" tab on an invoice, then tap "Save PDF"',
    ctaScreen: 'InvoiceOverview',
    ctaKh: 'មើលវិក្កយបត្រ',
    ctaEn: 'View invoices',
  },
  {
    icon: Wallet,
    iconBg: COLORS.successTint,
    iconColor: COLORS.success,
    titleKh: 'តាមដានចំណូល និងចំណាយ',
    titleEn: 'Track Income & Expense',
    descKh: 'កត់ត្រាចំណូល និងចំណាយជារាងរូបិយប័ណ្ណ USD និង KHR បាន',
    descEn: 'Record income and expenses in both USD and KHR currencies',
    stepKh: 'ចុច "ហិរញ្ញវត្ថុ" នៅបារក្រោម រួចចុច "+" ដើម្បីបន្ថែម',
    stepEn: 'Tap "Finance" on the bottom bar, then "+" to add an entry',
    ctaScreen: 'Finance',
    ctaKh: 'ទៅផ្ទាំងហិរញ្ញវត្ថុ',
    ctaEn: 'Go to Finance',
  },
  {
    icon: Package,
    iconBg: COLORS.stockTint,
    iconColor: COLORS.stock,
    titleKh: 'គ្រប់គ្រងស្តុកទំនិញ',
    titleEn: 'Manage Stock',
    descKh: 'បន្ថែមទំនិញ កំណត់តម្លៃលក់ និងព្រមានពេលស្តុកចុះទាប',
    descEn: 'Add products, set sell prices, and get alerted when stock runs low',
    stepKh: 'ចុច "ស្តុក" នៅបារក្រោម រួចចុច "បន្ថែម" ដើម្បីបង្កើតទំនិញ',
    stepEn: 'Tap "Stock" on the bottom bar, then "Add" to create a product',
    ctaScreen: 'Stock',
    ctaKh: 'ទៅផ្ទាំងស្តុក',
    ctaEn: 'Go to Stock',
  },
  {
    icon: ArrowDownCircle,
    iconBg: COLORS.stockTint,
    iconColor: COLORS.stock,
    titleKh: 'បញ្ចូល និងដកស្តុក',
    titleEn: 'Stock In & Out',
    descKh: 'ចុច "ចូល" ពេលទិញបន្ថែម និង "ចេញ" ពេលលក់ ប្រព័ន្ធធ្វើបច្ចុប្បន្នភាពដោយស្វ័យប្រវត្តិ',
    descEn: 'Tap "In" when restocking and "Out" when selling — auto-updates instantly',
    stepKh: 'នៅផ្ទាំងស្តុក ចុច "ចូល" ឬ "ចេញ" នៅក្រោមទំនិញនីមួយៗ',
    stepEn: 'On the Stock screen, tap "In" or "Out" under each product',
    ctaScreen: 'Stock',
    ctaKh: 'ទៅផ្ទាំងស្តុក',
    ctaEn: 'Go to Stock',
  },
  {
    icon: BarChart3,
    iconBg: COLORS.navyTint,
    iconColor: COLORS.navy,
    titleKh: 'មើលរបាយការណ៍',
    titleEn: 'View Reports',
    descKh: 'មើលសង្ខេបទិន្នន័យគ្រប់ផ្នែកតាមខែ ឬឆ្នាំ និងរក្សាទុកជា PDF',
    descEn: 'See a summary of every section by month or year, and save as PDF',
    stepKh: 'ចុច "របាយការណ៍" នៅផ្ទាំងដើមក្រោម "មុខងាររហ័ស"',
    stepEn: 'Tap "Report" on the Home screen under "Quick Actions"',
    ctaScreen: 'Report',
    ctaKh: 'មើលរបាយការណ៍',
    ctaEn: 'View report',
  },
  {
    icon: QrCode,
    iconBg: COLORS.accountTint,
    iconColor: COLORS.account,
    titleKh: 'បង្ហាញ QR ទូទាត់',
    titleEn: 'Show Payment QR',
    descKh: 'បង្ហាញកូដ QR លើវិក្កយបត្រ ដើម្បីអតិថិជនស្កេនបង់ប្រាក់បាន',
    descEn: 'Show a QR code on invoices so customers can scan to pay you',
    stepKh: 'ទៅ "គណនី" → "QR ទូទាត់ប្រាក់" ដើម្បីផ្ទុករូបភាព QR របស់អ្នក',
    stepEn: 'Go to "Account" → "Payment QR Code" to upload your QR image',
    ctaScreen: 'InvoiceOverview',
    ctaKh: 'មើលវិក្កយបត្រ',
    ctaEn: 'View invoices',
  },
];

const AUTOPLAY_MS = 6000;

export default function FeatureBanner({ lang, onNavigate }: Props) {
  const tr = (kh: string, en: string) => (lang === 'KH' ? kh : en);
  const [active, setActive] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((s) => (s + 1) % TIPS.length);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [next, dismissed, paused]);

  if (dismissed) return null;

  const tip = TIPS[active];
  const Icon = tip.icon;

  return (
    <div
      className="mx-3.5 mt-3 rounded-2xl overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, ${COLORS.navyGradientStart} 0%, ${COLORS.navyGradientEnd} 100%)`,
        boxShadow: '0 4px 14px rgba(12,68,124,0.18)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 120, height: 120, top: -40, right: -30, background: 'rgba(255,255,255,0.06)' }}
      />

      <button
        onClick={() => setDismissed(true)}
        aria-label={tr('បិទ', 'Dismiss')}
        className="absolute top-2 right-2 z-10 flex items-center justify-center"
        style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.18)' }}
      >
        <X size={14} color="#FFFFFF" strokeWidth={2} />
      </button>

      <div className="flex items-start gap-3 p-3.5 relative">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.16)' }}
        >
          <Icon size={22} color="#FFFFFF" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white">
            {tr(tip.titleKh, tip.titleEn)}
          </p>
          <p className="text-[11px] text-white/80 leading-relaxed mt-0.5">
            {tr(tip.descKh, tip.descEn)}
          </p>
          <p className="text-[10px] text-white/65 leading-relaxed mt-1">
            {tr(tip.stepKh, tip.stepEn)}
          </p>
          {tip.ctaScreen && (
            <button
              onClick={() => onNavigate(tip.ctaScreen!)}
              className="mt-2 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}
            >
              {tr(tip.ctaKh, tip.ctaEn)}
              <ChevronRight size={12} color="#FFFFFF" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 px-3.5 pb-2.5 justify-center">
        {TIPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Tip ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: active === i ? 18 : 6,
              height: 6,
              backgroundColor: active === i ? COLORS.accentGold : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
