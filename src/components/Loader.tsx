function Loader() {
    return (
        <>
            <div className="loaderContainer flex min-h-[70vh] items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-[6px] border-current border-t-transparent text-mountbattenPink "
                    role="status"
                    aria-label="loading"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
    );
}
export default Loader;
