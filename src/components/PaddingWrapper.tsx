import { ReactNode } from 'react'

function PaddingWrapper({children}: {
    children: ReactNode
  }) {
  return (
    <>
      <div className="px-12">   
        {children}
      </div>
  </>
  )
}

export default PaddingWrapper