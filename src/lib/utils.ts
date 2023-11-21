import { lazy } from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lazyLoad(path: string, namedExport: string | null) {
  return lazy(() => {
    /* @vite-ignore */
    const promise = import(path)
    if (namedExport == null) {
      return promise
    } else {
      return promise.then(module => ({ default: module[namedExport] }))
    }
  })
}


