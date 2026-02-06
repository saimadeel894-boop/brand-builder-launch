import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// MOQ Input
interface MoqInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  label?: string;
  required?: boolean;
  className?: string;
}

export function MoqInput({ 
  value, 
  onChange, 
  label = "MOQ (units)", 
  required = false,
  className 
}: MoqInputProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Input
          type="number"
          min={1}
          value={value ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val ? parseInt(val, 10) : undefined);
          }}
          placeholder="e.g., 500"
          required={required}
          className="pr-16"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          units
        </span>
      </div>
    </div>
  );
}

// Lead Time Input
export type LeadTimeUnit = "days" | "weeks" | "months";

interface LeadTimeInputProps {
  value: number | undefined;
  unit: LeadTimeUnit;
  onValueChange: (value: number | undefined) => void;
  onUnitChange: (unit: LeadTimeUnit) => void;
  label?: string;
  required?: boolean;
  className?: string;
}

export function LeadTimeInput({
  value,
  unit,
  onValueChange,
  onUnitChange,
  label = "Lead Time",
  required = false,
  className,
}: LeadTimeInputProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <div className="flex gap-2">
        <Input
          type="number"
          min={1}
          value={value ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onValueChange(val ? parseInt(val, 10) : undefined);
          }}
          placeholder="e.g., 4"
          required={required}
          className="flex-1"
        />
        <Select value={unit} onValueChange={(val) => onUnitChange(val as LeadTimeUnit)}>
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="days">Days</SelectItem>
            <SelectItem value="weeks">Weeks</SelectItem>
            <SelectItem value="months">Months</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// Price Input with Currency
export type Currency = "USD" | "EUR" | "JPY" | "CNY" | "KRW";

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  JPY: "¥",
  CNY: "¥",
  KRW: "₩",
};

interface PriceInputProps {
  value: number | undefined;
  currency: Currency;
  onValueChange: (value: number | undefined) => void;
  onCurrencyChange: (currency: Currency) => void;
  label?: string;
  required?: boolean;
  className?: string;
}

export function PriceInput({
  value,
  currency,
  onValueChange,
  onCurrencyChange,
  label = "Price (per unit)",
  required = false,
  className,
}: PriceInputProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <div className="flex gap-2">
        <Select value={currency} onValueChange={(val) => onCurrencyChange(val as Currency)}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD ($)</SelectItem>
            <SelectItem value="EUR">EUR (€)</SelectItem>
            <SelectItem value="JPY">JPY (¥)</SelectItem>
            <SelectItem value="CNY">CNY (¥)</SelectItem>
            <SelectItem value="KRW">KRW (₩)</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {currencySymbols[currency]}
          </span>
          <Input
            type="number"
            min={0}
            step={0.01}
            value={value ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              onValueChange(val ? parseFloat(val) : undefined);
            }}
            placeholder="0.00"
            required={required}
            className="pl-8"
          />
        </div>
      </div>
    </div>
  );
}

// Format price for display
export function formatPrice(
  amount: number | undefined, 
  currency: Currency = "USD"
): string {
  if (amount === undefined || amount === null) return "-";
  
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "JPY" || currency === "KRW" ? 0 : 2,
    maximumFractionDigits: currency === "JPY" || currency === "KRW" ? 0 : 2,
  });
  
  return `${formatter.format(amount)} / unit`;
}

// Format lead time for display
export function formatLeadTime(value: number | undefined, unit: LeadTimeUnit): string {
  if (value === undefined || value === null) return "-";
  const unitLabel = value === 1 ? unit.slice(0, -1) : unit;
  return `${value} ${unitLabel}`;
}

// Format MOQ for display
export function formatMoq(value: number | undefined): string {
  if (value === undefined || value === null) return "-";
  return `${value.toLocaleString()} units`;
}

// Parse stored string formats (for backwards compatibility)
export function parseStoredLeadTime(stored: string | undefined): { value: number | undefined; unit: LeadTimeUnit } {
  if (!stored) return { value: undefined, unit: "weeks" };
  
  const match = stored.match(/^(\d+)\s*(days?|weeks?|months?)$/i);
  if (match) {
    const value = parseInt(match[1], 10);
    const unitRaw = match[2].toLowerCase();
    const unit: LeadTimeUnit = 
      unitRaw.startsWith("day") ? "days" :
      unitRaw.startsWith("month") ? "months" : "weeks";
    return { value, unit };
  }
  
  return { value: undefined, unit: "weeks" };
}

export function parseStoredMoq(stored: string | undefined): number | undefined {
  if (!stored) return undefined;
  const cleaned = stored.replace(/[^\d]/g, "");
  return cleaned ? parseInt(cleaned, 10) : undefined;
}

export function parseStoredPrice(stored: string | undefined): { value: number | undefined; currency: Currency } {
  if (!stored) return { value: undefined, currency: "USD" };
  
  // Check for currency symbols or codes
  const currencyMatch = stored.match(/(USD|EUR|JPY|CNY|KRW|\$|€|¥|₩)/i);
  let currency: Currency = "USD";
  if (currencyMatch) {
    const sym = currencyMatch[1].toUpperCase();
    if (sym === "EUR" || sym === "€") currency = "EUR";
    else if (sym === "JPY") currency = "JPY";
    else if (sym === "CNY") currency = "CNY";
    else if (sym === "KRW" || sym === "₩") currency = "KRW";
    else if (sym === "¥") currency = "CNY"; // Default ¥ to CNY
  }
  
  // Extract numeric value
  const numMatch = stored.match(/[\d,.]+/);
  const value = numMatch ? parseFloat(numMatch[0].replace(/,/g, "")) : undefined;
  
  return { value, currency };
}
