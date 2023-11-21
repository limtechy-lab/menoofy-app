import { X } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "./alert-dialog"
  import { Button } from "./button"
  
  export function DeleteAlertDialog({title, isDeleting, onContinue,}) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="text-destructive hover:text-destructive/90">
          {isDeleting ? (
            <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </>
            ) : (
            <>
                <X size={16} />
            </>
            )
          }
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {title} and remove some reference data if applicable.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  