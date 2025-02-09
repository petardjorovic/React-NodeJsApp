import LoadingImg from "../assets/loading-gif.gif";

function LoadingComponent() {
  return (
    <div className="container mx-auto w-full h-full flex items-center justify-center p-[100px] bg-slate-200 dark:bg-slate-900">
      <div className="flex items-center justify-center p-50px p-[80px]">
        <img src={LoadingImg} alt="Loading..." />
      </div>
    </div>
  );
}

export default LoadingComponent;
