import { ReactNode } from 'react'

function DashPageWrapper({title, children}: {
    title?: string
    children: ReactNode
  }) {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-start space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        </div>    
        {children}
      </div>
    </div>
  </>
  )
}

export default DashPageWrapper