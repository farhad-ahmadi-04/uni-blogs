import { cn } from "@/lib/utils";

interface ITypography {
  children:React.ReactNode, 
  className?:string
}


export function TypographyH1({children, className}: ITypography) {
  return (
    <h1 className={cn('my-2 text-4xl font-extrabold tracking-tight text-balance', className)}>
      {children}
    </h1>
  )
}

export function TypographyH3({children, className}: ITypography) {
  return (
    <h3 className={cn("my-2 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  )
}


export function TypographyP({children, className}: ITypography) {
  return (
    <p className={cn("", className)}>
      {children}
    </p>
  )
}
