export const Noticia = (props: any) => {
    return (
        <div
            className="relative float-left -mr-[100%] w-full transition-transform duration-[400ms] ease-in-out motion-reduce:transition-none overflow-hidden mt-5"
            data-te-carousel-active
            data-te-carousel-item
            style={{ backfaceVisibility: "hidden", marginTop: "0px" }}
        >
            <img
                src={props.url}
                className="block w-full h-[258px] rounded-3xl overflow-hidden border-solid border-8 border-red-700"
                alt="..."
            />
            <div className="absolute inset-x-[10%] bottom-2 hidden py-5 text-center text-white md:block">
                <h5
                    className="text-xl"
                    style={{
                        fontWeight: "bold",
                        background: "rgba(255,0,0,.5)",
                    }}
                >
                    {props.titulo}
                </h5>
            </div>
        </div>
    );
};
