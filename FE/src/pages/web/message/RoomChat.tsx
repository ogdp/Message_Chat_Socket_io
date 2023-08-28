import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoomChatEmpty from "../../../components/web/RoomChatEmpty";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
import { TMessage } from "../../../types/message";
import Loading from "../../../components/Loading";

const RoomChat = () => {
  const navigate = useNavigate();
  const socket: any = io(`${import.meta.env.VITE_URL_DB}`);
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  // console.log(id);
  if (!localStorage.getItem("historyRoomChat")) {
    localStorage.setItem("historyRoomChat", JSON.stringify([id]));
  } else {
    const historyRoomChat: any = localStorage.getItem("historyRoomChat");
    const arrRoom = JSON.parse(historyRoomChat);
    const existRoomID = arrRoom?.filter((item: string) => item == id);
    if (existRoomID?.length == 0) {
      arrRoom?.push(id);
      localStorage.setItem("historyRoomChat", JSON.stringify(arrRoom));
    }
  }

  const [messages, setMessages] = useState<any | TMessage | undefined>(
    undefined
  );
  const user: any = localStorage.getItem("myInfo");
  if (!user) return (window.location.href = "/");
  // console.log(id);

  // JOIN ROOM NGAY KHI VÀO BOXCHAT
  function sendRoomId(id: string) {
    // console.log(id);
    socket.emit("joinRoom", id);
    // console.log("DANG join");
  }

  sendRoomId(String(id));

  const getMessages = async () => {
    try {
      const { data }: any = await axios.get(
        `${import.meta.env.VITE_URL_DB}/api/chat/${id}`
      );
      if (data.message == "Tin nhắn không tồn tại") {
        navigate("/");
        return toast.error("Không tìm thấy room chat", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      socket.emit("join_room", id);
      const listMess = data.chat.docs.reverse();
      return listMess;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setMessages(await getMessages());
      } catch (error) {}
    })();
  }, []);

  const sendMessage = async (data: TMessage) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_URL_DB}/api/chat`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer <TOKEN>",
        },
        data: data,
      };
      await axios.request(config);
      // toast.success("Send message successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error sending message");
    }
  };

  useEffect(() => {
    socket.on("receive_message", () => {
      // console.log("Nhận thư");
      (async () => {
        try {
          setMessages(await getMessages());
        } catch (error) {}
      })();
    });
  }, []);

  const info_room: any = window.localStorage.getItem("info_room");
  const valueMess: any = React.useRef<any>(null);
  const onHandleSendMessage = async (e: any) => {
    e.preventDefault();
    const value1: any = await valueMess.current;

    const data = JSON.parse(info_room);
    data.message = value1.value;

    // Reset Input
    valueMess.current.value = "";
    // console.log(data);

    socket.emit("join_room", data.chatID);
    socket.emit("send_message", data);

    const updateMess = [...messages, data];
    setMessages(updateMess);
    try {
      await sendMessage(data);
    } catch (error) {
      console.log(error);
    }
  };
  if (messages == undefined) return <Loading />;
  if (id?.length === 0 || messages?.length === 0 || messages == undefined)
    return <RoomChatEmpty />;

  return (
    <>
      <ToastContainer />{" "}
      <h1 className="text-3xl font-medium my-5 text-center">
        <Link to={"/"} className="">
          Chat Box{" "}
        </Link>
      </h1>
      <div className="max-w-2xl mx-auto">
        <div>
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12">
              {messages?.map((item: any, index: number) => {
                if (item.userID == JSON.parse(info_room).userID) {
                  return (
                    <div
                      key={index}
                      className="col-start-6 col-end-13 p-3 rounded-lg"
                    >
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div
                          title={item.nameUser}
                          className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 text-white font-medium flex-shrink-0"
                        >
                          {item.nameUser.charAt(0).toUpperCase()}
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>{item.message}</div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="col-start-1 col-end-8 p-3 rounded-lg"
                    >
                      <div className="flex flex-row items-center">
                        <div
                          title={item.nameUser}
                          className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 text-white font-medium flex-shrink-0"
                        >
                          {item.nameUser.charAt(0).toUpperCase()}
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>{item.message}</div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}

              {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Vel ipsa commodi illum saepe numquam maxime asperiores
                      voluptate sit, minima perspiciatis.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    B
                  </div>
                  <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <div>I'm ok what about you?</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <form>
          <label htmlFor="chat" className="sr-only">
            Your message
          </label>
          <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() => {
                navigator.clipboard.writeText(String(url));
                return toast("Sao chép liên kết thành công !!!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                  theme: "light",
                });
              }}
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.9587 9.04132C24.9036 6.98623 21.6697 6.98623 19.6147 9.04132L17.1213 11.5347C15.9497 12.7062 14.0503 12.7062 12.8787 11.5347C11.7071 10.3631 11.7071 8.46359 12.8787 7.29201L15.372 4.79868C19.7703 0.40044 26.8031 0.40044 31.2013 4.79868C35.5996 9.19692 35.5996 16.2297 31.2013 20.628L28.708 23.1213C27.5364 24.2929 25.6369 24.2929 24.4653 23.1213C23.2938 21.9497 23.2938 20.0503 24.4653 18.8787L26.9587 16.3853C29.0138 14.3303 29.0138 11.0964 26.9587 9.04132ZM24.6213 11.3787C25.7929 12.5503 25.7929 14.4497 24.6213 15.6213L15.6213 24.6213C14.4497 25.7929 12.5503 25.7929 11.3787 24.6213C10.2071 23.4497 10.2071 21.5503 11.3787 20.3787L20.3787 11.3787C21.5503 10.2071 23.4497 10.2071 24.6213 11.3787ZM11.5347 12.8787C12.7062 14.0503 12.7062 15.9497 11.5347 17.1213L9.04132 19.6147C6.98623 21.6697 6.98623 24.9036 9.04132 26.9587C11.0964 29.0138 14.3303 29.0138 16.3853 26.9587L18.8787 24.4653C20.0503 23.2938 21.9497 23.2938 23.1213 24.4653C24.2929 25.6369 24.2929 27.5364 23.1213 28.708L20.628 31.2013C16.2297 35.5996 9.19692 35.5996 4.79868 31.2013C0.40044 26.8031 0.40044 19.7703 4.79868 15.372L7.29201 12.8787C8.46359 11.7071 10.3631 11.7071 11.5347 12.8787Z"
                  fill="#9CA3AF"
                />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <textarea
              id="chat"
              rows={1}
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
              defaultValue={""}
              ref={valueMess}
              // onChange={(e) => setMassageSend(e.target.value)}
            />
            <button
              onClick={(e) => onHandleSendMessage(e)}
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </form>
        <p className="mt-5">
          This textarea chatroom component is part of a larger, open-source
          library of Tailwind CSS components. Learn more by going to the
          official{" "}
          <a className="text-blue-600 hover:underline" href="#" target="_blank">
            Flowbite Documentation
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default RoomChat;
