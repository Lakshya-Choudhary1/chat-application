import React, { useRef, useState } from "react";
import { Send, Image, X } from "lucide-react";
import { useMessageStore } from "../../store/useMessageStore.js";

const SendMessage = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    text: "",
    image: "",
  });

  const { sendMessageToUserId, selectedUser } = useMessageStore();

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (!file) return;

      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: fileReader.result,
        }));
      };

      fileReader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.text && !formData.image) return;

    await sendMessageToUserId(selectedUser._id, formData);

    setFormData({ text: "", image: "" });
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className=" bg-slate-900 border-t border-slate-700 px-2 py-2 box-border my-1 overflow-hidden">
      
      {/* Image Preview */}
      {formData.image && (
        <div className="mb-2 relative w-fit">
          <img
            src={formData.image}
            alt="preview"
            className="h-16 w-16 object-cover rounded-lg border border-slate-600"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
          >
            <X size={14} className="text-white" />
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-slate-800 rounded-full px-3 py-2"
      >
        {/* Text Input */}
        <input
          type="text"
          name="text"
          value={formData.text}
          onChange={handleOnChange}
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none text-white placeholder-slate-400 px-2 focus:bg-transparent" 
        />

        {/* Image Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="p-2 hover:bg-slate-700 rounded-full transition"
        >
          <Image size={20} className="text-slate-300" />
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          name="image"
          onChange={handleOnChange}
          className="hidden"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!formData.text && !formData.image}
          className={`p-2 rounded-full transition ${
            formData.text || formData.image
              ? "bg-cyan-600 hover:bg-cyan-700"
              : "bg-slate-600 cursor-not-allowed"
          }`}
        >
          <Send size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;