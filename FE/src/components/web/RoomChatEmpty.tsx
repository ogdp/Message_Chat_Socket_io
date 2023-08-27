import { Link } from "react-router-dom";
const RoomChatEmpty = () => {
  return (
    <div className="w-full text-center min-h-full flex justify-center items-center">
      <div className="w-full text-center ">
        <h1 className="text-3xl my-4 font-medium">Empty mailbox</h1>
        <Link to={"/"}>
          {" "}
          <button className="bg-gradient-to-b from-gray-700 to-gray-900 hover:scale-95 transition-all text-white my-5 py-2 px-9 rounded-xl text-xl font-medium">
            Go back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RoomChatEmpty;
