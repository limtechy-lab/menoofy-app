import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/Label"

function StoreLogo() {
  return (
    <div className=" p-4">
        <div className="text-center">
            {/* <!-- Current Profile Photo --> */}
            <div className="mt-2">
                <img src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" className="w-20 h-20 m-auto rounded-full shadow" />
            </div>
        </div>
    </div>
  )
}

export default StoreLogo