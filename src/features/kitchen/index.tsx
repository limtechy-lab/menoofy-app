import { useState, useEffect, useRef } from 'react'
import ReactToPrint from "react-to-print";

import DashPageWrapper from '../../components/DashPageWrapper'
import StoreForm from './storeForm'
import { useGetMyStoreQuery } from './storeApiSlice'
import QRCode from './QRCode';
import QRCodePdfPrint from './QRCodePdfPrint';


import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function Kitchen() {

  const [store, setStore] = useState(null);
  const { data, isLoading } = useGetMyStoreQuery(undefined);

  const componentRef = useRef();

  // const handlePrint = (e) => {
  //     e.preventDefault()
  //     setIsLoading(true)

  // }

  useEffect(() => {
      if (!data) return;
      const { data: storeData } = data ?? {};
      setStore(storeData);
  }, [data]);


  if (isLoading) {
    return (
        <div className=" h-screen w-screen flex justify-center items-center">
        <span className="loader"></span>
        </div>
    )
  }
  
  return (
    <DashPageWrapper title='Kitchen'>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 ">
          {store && (
            <StoreForm store={store} />
          )}
        </div>
        <div className="">
          <Card >
            <CardHeader>
              <CardTitle>QRCode Menu</CardTitle>
              <CardDescription>Download and share the QRCode with your costumers.</CardDescription>
            </CardHeader>
            <CardContent className='flex justify-center items-center'>
              <div className='flex flex-col gap-4 justify-center items-start'>
                {store && (
                  <>
                    <div className='flex flex-col gap-2 justify-center items-center dark:bg-white h-[140px] w-[140px]'>
                      <QRCode store_code={store.store_code} />                   
                    </div>
                    <div className="text-center w-full">
                      <ReactToPrint
                        trigger={() => (
                          <Button 
                            className='w-full'
                            // onClick={handlePrint}
                            // isLoading={isLoading}
                            // disabled={isLoading}
                          >
                            Download
                          </Button>
                        )}
                        content={() => componentRef.current}
                      />
                        <div className=" hidden">
                          <div ref={componentRef} className="p-5">
                            <QRCodePdfPrint store={store} />
                          </div>
                        </div>   
                    </div>
                  </>               
                )}
              </div>
            </CardContent>
        </Card>
        </div>
      </div>
    </DashPageWrapper>
  )
}

export default Kitchen