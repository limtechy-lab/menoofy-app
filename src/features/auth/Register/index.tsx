import { useState } from 'react';
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm';
import RegisterSuccess from './RegisterSuccess';
import logo from '../../../assets/logo.png'

const Register = () => {

    const [ successMsg, setSuccessMsg] = useState(false)
    const [regEmail, setRegEmail] = useState("")
    
    // Callback function to receive email from registerForm
    const handleRegSuccess = (newRegEmail) => {
        setRegEmail(newRegEmail);
        setSuccessMsg(true);
    };
 
    return (
        <>
        <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0 pb-4">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                    Sign up
                    </h1>
                    <p className="text-sm text-muted-foreground">
                    Create a new menoofy account.
                    </p>
                </div>
                {!successMsg ? (
                    <RegisterForm onRegSuccess={handleRegSuccess} />
                ) : (
                    <RegisterSuccess email={regEmail} />
                )}
                <p className="px-8 text-center text-sm text-muted-foreground">
                    {!successMsg ? "Already have any account? " : "Proceed to "}
                    <Link
                        to="/login"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Login
                    </Link>
                </p>
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

export default Register