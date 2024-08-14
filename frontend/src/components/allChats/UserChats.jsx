import { useSelector } from "react-redux";
const UserChats = () => {
  const { friendMsg, selectedFriendToMsg } = useSelector(
    (state) => state.adminFrd
  );
  const adminInfo = useSelector((state) => state.admin);
  console.log("adminInfo", adminInfo);

  console.log("friendMsg ====> ", friendMsg);
  return (
    <div>
      {friendMsg?.map((mapProp, ind) => (
        <div
          key={ind}
          className={`chat ${
            adminInfo?._id === mapProp?.sender ? "chat-end" : "chat-start"
          }`}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={`${
                  adminInfo?._id === mapProp?.sender
                    ? adminInfo.profilePic
                    : selectedFriendToMsg.profilePic
                }`}
              />
            </div>
          </div>
          <div className="chat-header">
            {`${
              adminInfo?._id === mapProp?.sender
                ? "You"
                : selectedFriendToMsg.profileName
            }`}

            <time className="text-xs opacity-50 ml-3">
              {new Date(mapProp?.updatedAt).toLocaleTimeString()}
            </time>
          </div>
          <div className="chat-bubble">{mapProp.message}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      ))}
    </div>
  );
};

export default UserChats;
