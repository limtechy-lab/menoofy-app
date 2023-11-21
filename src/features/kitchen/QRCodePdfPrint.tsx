import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import QRCode from "./QRCode";
import { app_url } from '../../lib/const'

function QRCodePdfPrint({ store }) {


  // const currentDate = new Date();
  //   const options = {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  //   hour12: true
  //   };

  return (
    <>
      <div className="w-full h-screen">
        <div className=" flex flex-col justify-around text-primary w-[3rem] absolute left-0 top-0 bottom-0 "> 
            <div className=" opacity-30 rotate-90">Menoofy</div>
            <div className=" opacity-20 rotate-90">Menoofy</div>
            <div className=" opacity-10 rotate-90">Menoofy</div>
            <div className=" opacity-5 rotate-90">Menoofy</div>
        </div>
        {/* <div className=" water_mark_section top-1/2 left-0 w-full absolute flex flex-col justify-center items-center rotate-45 font-[4rem] font-w-700 opacity-10 spacing-[1px] text-center text-4xl">
            <span>menoofy.com</span>
        </div> */}
        <Card className={cn("w-full min-h-screen" )}>
        <CardHeader className="flex flex-col justify-center items-center">
            <CardTitle className=" uppercase">Welcome to {store.name}</CardTitle>
            <CardDescription>Discover a world of culinary delights and handcrafted cocktails.</CardDescription>
        </CardHeader>
        <CardContent className=" flex flex-col gap-1 justify-center items-center pt-16">
            <QRCode store_code={store.store_code} />
            <span>Scan to see our digital menu</span>
        </CardContent>
        <CardFooter className=" flex flex-col gap-1 justify-center items-center text-xs">
            <span>OR Visit the link below</span>
            {`${app_url}/menu/${store.store_code}`}
        </CardFooter>
        </Card>
        {/* <div className=" container py-8 px-6">
            <header className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between">
                <h1 className=" font-heading font-bold uppercase tracking-wide text-2xl mb-3 ">
                    
                </h1>
            </header>

        </div>    */}
      </div>
    </>
  )
}

export default QRCodePdfPrint