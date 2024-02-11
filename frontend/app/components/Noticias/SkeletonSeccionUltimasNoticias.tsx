export const SkeletonSeccionUltimasNoticias = () => {
  return (
    <div
      className="relative w-[900px] h-[524px] mt-5 overflow-hidden rounded-3xl border-solid border-8 border-red-700 mx-auto bg-[#fef2f2]"
      id="seccion-ultimas-noticias-skeleton"
    >
      <div className="justify-center flex animate-pulse">
        <div className="my-5 w-[850px] h-[464px] object-cover bg-gray-300 rounded-lg" />
        <div className="animate-ping  absolute inset-x-[45%] bottom-[50%] hidden py-2 text-center text-white md:block bg-red-700 rounded-lg">
          Loading...
        </div>
        <div className="absolute inset-x-[15%] bottom-10 hidden py-5 text-center text-white md:block bg-red-50 rounded-lg"></div>
      </div>
    </div>
  );
};
