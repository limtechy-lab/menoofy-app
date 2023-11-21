// import { ErrorBoundary, FallbackProps, useErrorBoundary } from 'react-error-boundary'

interface CustomErrorComponentProps {
    error: Error;
    resetErrorBoundary: () => void;
  }

function CustomErrorComponent( { error, resetErrorBoundary }: CustomErrorComponentProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light text-dark dark:bg-dark dark:text-cream">
        <div className="bg-light-gray rounded-lg shadow-xl p-8">
            <h1 className="text-2xl font-bold mb-4">Oops.. Something went wrong</h1>
            <p className="mb-4">
                {error.message}
            </p>
            <button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={resetErrorBoundary}>Try again</button>
        </div>
    </div>
  )
}

export default CustomErrorComponent