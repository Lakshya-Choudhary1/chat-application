import React, { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore.js";
import AnimatedGradientBorder from "../components/AnimatedGradientBorder.jsx";
import ActiveTabSwitch from "../components/home/ActiveTabSwitch.jsx";
import ProfileHeader from "../components/home/ProfileHeader.jsx";
import ChatList from "../components/home/ChatList.jsx";
import ContactList from "../components/home/ContactList.jsx";
import NoConversationPlaceholder from "../components/home/NoConversationPlaceholder.jsx";
import ChatContainer from "../components/home/ChatContainer.jsx";




const Home = () => {

  
  const {
    getMyChatPartners,
    getAllContacts,
    activeTab,
    selectedUser
  } = useMessageStore();

  useEffect(() => {
    getAllContacts();
    getMyChatPartners();
  }, [getAllContacts, getMyChatPartners]);

  return (
    <div className="relative  h-screen w-screen ">
      <AnimatedGradientBorder className="h-full w-full ">
        <div className="h-full w-full flex  overflow-hidden bg-slate-800/60 backdrop-blur-md text-white ">

          {/* LEFT SIDEBAR */}
          <div className="w-80 flex flex-col  border-r-2  border-slate-600 ">

            {/* Profile */}
            <ProfileHeader />

            {/* Tabs */}
            <ActiveTabSwitch />

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 ">
              {activeTab === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT CHAT AREA */}
          <div className=" flex-1 flex flex-col text-slate-400">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>

        </div>
      </AnimatedGradientBorder>
    </div>
  );
};

export default Home;