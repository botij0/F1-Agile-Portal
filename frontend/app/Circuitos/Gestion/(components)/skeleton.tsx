const SkeletonCard = () => {
    return (
        <div
            className="
              bg-white w-[410px] rounded-lg  p-4 flex flex-col justify-center items-center gap-4 border-2  min-h-[300px]
              ">
            <div className="w-32 h-24 object-cover bg-gray-200 rounded-lg" />
            <div className="flex flex-col items-center gap-2 w-full">
                <div className="h-4 w-full bg-gray-200 rounded-lg mt-2"> </div>
                <div className="bg-gray-200 h-8 w-full rounded-lg mt-2"></div>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <div className="bg-gray-200 h-8 w-full rounded-lg mt-4"></div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonCard;