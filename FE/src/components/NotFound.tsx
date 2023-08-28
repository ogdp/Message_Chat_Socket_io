import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <main className="p-4" id="main">
        <div className="mx-auto max-w-7xl">
          <section className="relative mx-auto flex max-w-3xl flex-col gap-2 py-24 sm:text-center md:gap-4">
            <h1 className="relative text-3xl font-extrabold md:text-5xl md:tracking-tight">
              404, Page not found
            </h1>
            <p className="relative text-base text-slate-600 md:text-lg">
              Trang web bạn yêu cầu không tồn tại.
            </p>
            <Link to={"/"}>
              <button className="disabled:opacity-50 transition border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 border-blue-700/75 focus:ring-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 px-3 py-1.5 text-sm font-medium rounded-md">
                Trang chủ
              </button>
            </Link>
          </section>
        </div>
      </main>
    </>
  );
};

export default NotFound;
