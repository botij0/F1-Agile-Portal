export const SkeletonItemCalendario = () => {
    return (
        <div className="grid grid-cols-5">
            <div className="col-span-1 h-20 bg-white justify-center items-center"></div>
            <div className="col-span-4 bg-gray-200 grid-rows-4 p-2">
                <div className="h-4 w-full bg-gray-300 rounded-lg mt-1"></div>
                <div className="h-4 w-full bg-gray-300 rounded-lg mt-1"></div>
                <div className="h-4 w-full bg-gray-300 rounded-lg mt-1"></div>
            </div>
        </div>
      );
}