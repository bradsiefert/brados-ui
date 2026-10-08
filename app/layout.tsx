import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UiPresetProvider } from "@/components/ui-preset-provider"
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast"
import { firaCode, sourceSans } from "@/app/fonts"
import { cn } from "@/lib/utils"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        sourceSans.variable,
        firaCode.variable,
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem("coss-ui-preset");if(p==="coss-default"){document.documentElement.dataset.uiPreset="coss-default"}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <UiPresetProvider>
            <ToastProvider>
              <AnchoredToastProvider>{children}</AnchoredToastProvider>
            </ToastProvider>
          </UiPresetProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
