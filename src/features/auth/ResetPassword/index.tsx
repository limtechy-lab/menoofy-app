import ResetPasswordForm from "./ResetPasswordForm"


const ResetPassword = () => {
    return (
    <>
        <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                    Reset Password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                    Enter a new secure password for your account.
                    </p>
                </div>
                    <ResetPasswordForm />
                </div>
            </div>
            {/* <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
      
                <div className="relative z-20 flex items-center text-lg font-medium">
                <img className='h-10 w-30' src={logo} alt='Menoofy' />
                </div>
                <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                    <p className="text-lg">
                    &ldquo;This section is available for marketing and promotions. contact us for more info.&rdquo;
                    </p>
                    <footer className="text-sm">hello@menoofy.com</footer>
                </blockquote>
                </div>
            </div> */}
        </div>
    </>
    )
}

export default ResetPassword