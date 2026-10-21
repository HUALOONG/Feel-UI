/**
 * 色板：对齐 Shadcn UI 的 HSL 语义色（亮色 / 暗色）。
 * 全部使用 HSL 三值字符串（如 `240 5.9% 10%`），消费方以 `hsl(var(--primary))` 引用。
 */
export interface ColorTokens {
  background: string
  foreground: string
  card: string
  'card-foreground': string
  popover: string
  'popover-foreground': string
  primary: string
  'primary-foreground': string
  secondary: string
  'secondary-foreground': string
  muted: string
  'muted-foreground': string
  accent: string
  'accent-foreground': string
  destructive: string
  'destructive-foreground': string
  border: string
  input: string
  ring: string
  'chart-1': string
  'chart-2': string
  'chart-3': string
  'chart-4': string
  'chart-5': string
}

export const lightColors: ColorTokens = {
  background: '0 0% 100%',
  foreground: '240 10% 3.9%',
  card: '0 0% 100%',
  'card-foreground': '240 10% 3.9%',
  popover: '0 0% 100%',
  'popover-foreground': '240 10% 3.9%',
  primary: '240 5.9% 10%',
  'primary-foreground': '0 0% 98%',
  secondary: '240 4.8% 95.9%',
  'secondary-foreground': '240 5.9% 10%',
  muted: '240 4.8% 95.9%',
  'muted-foreground': '240 3.8% 46.1%',
  accent: '240 4.8% 95.9%',
  'accent-foreground': '240 5.9% 10%',
  destructive: '0 84.2% 60.2%',
  'destructive-foreground': '0 0% 98%',
  border: '240 5.9% 90%',
  input: '240 5.9% 90%',
  ring: '240 5.9% 10%',
  'chart-1': '173 58% 39%',
  'chart-2': '197 37% 24%',
  'chart-3': '43 74% 66%',
  'chart-4': '27 87% 67%',
  'chart-5': '329 59% 44%',
}

export const darkColors: ColorTokens = {
  background: '240 10% 3.9%',
  foreground: '0 0% 98%',
  card: '240 10% 3.9%',
  'card-foreground': '0 0% 98%',
  popover: '240 10% 3.9%',
  'popover-foreground': '0 0% 98%',
  primary: '0 0% 98%',
  'primary-foreground': '240 5.9% 10%',
  secondary: '240 3.7% 15.9%',
  'secondary-foreground': '0 0% 98%',
  muted: '240 3.7% 15.9%',
  'muted-foreground': '240 5% 64.9%',
  accent: '240 3.7% 15.9%',
  'accent-foreground': '0 0% 98%',
  destructive: '0 62.8% 30.6%',
  'destructive-foreground': '0 0% 98%',
  border: '240 3.7% 15.9%',
  input: '240 3.7% 15.9%',
  ring: '240 4.9% 83.9%',
  'chart-1': '220 70% 50%',
  'chart-2': '160 60% 45%',
  'chart-3': '30 80% 55%',
  'chart-4': '280 65% 60%',
  'chart-5': '340 75% 55%',
}
