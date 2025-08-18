import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { buttonLoading } = useSelector((state) => state.messageReducer);
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser?._id) return;
    const res = await dispatch(
      sendMessageThunk({
        recieverId: selectedUser?._id,
        message: message.trim(),
      })
    );
    if (res?.payload?.success) {
      setMessage("");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Type a message"
        className="input input-bordered w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSendMessage(e);
        }}
        disabled={!selectedUser}
      />
      <button
        onClick={handleSendMessage}
        className="btn btn-square btn-outline btn-primary"
        disabled={buttonLoading || !selectedUser}
        title={selectedUser ? "Send" : "Select a user first"}
      >
        <IoIosSend />
      </button>
    </div>
  );
};

export default SendMessage;
