import {useMessageStore} from "../../store/useMessageStore.js"

const ActiveTabSwitch = () => {
  const {activeTab , setActiveTab} = useMessageStore()

  return <div className="tabs-box  m-1 bg-transparent grid grid-cols-2 grid-rows-1 rounded-full justify-center overflow-hidden">
    <button
      onClick={()=>setActiveTab("chats")}
      className={`${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"} p-2 rounded-full`}>
        Chats
    </button>

    <button
      onClick={()=>setActiveTab("contacts")}
      className={`${activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"} p-2 rounded-full`}>
        Contacts
    </button>
  </div>
}

export default ActiveTabSwitch
