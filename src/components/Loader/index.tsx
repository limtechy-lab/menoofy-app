// import './loader.css'

const Loader = () => {
  return (
    <>
      <div className="flex gap-x-1 justify-center items-center h-screen w-screen z-50">
        <h1
          className="origin-left duration-200"
        >
          Stacked
        </h1>
        <span
          className={`text-base font-semibold tracking-wide uppercase bg-primary text-white p-1 rounded-md cursor-pointer duration-500 animate-pulse`}
        >
          SMS
        </span>
      </div>
    </>
    // <div className="flex justify-start items-center bg-muted w-full">
    //   <div className="loader"></div>
    // </div>
  );
};

export default Loader;
