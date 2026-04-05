import { socketAuthMiddleware } from "./middleware/socketAuthMiddleware.js";

const userSocketMap = {}; // { userId: Set(socketIds) }


export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}

export const listen = (io) => {

  // Create a separate namespace for messages
  const messageNamespace = io.of("/messages");

  // Apply authentication middleware to the namespace
  messageNamespace.use(socketAuthMiddleware);

  // Handle connections to the message namespace
  messageNamespace.on("connection", (socket) => {
    console.log("🔥 ROOT CONNECTED:", socket.id);

    // Get userId from the authenticated socket
    const userId = socket.userId;

    console.log(`✅ User connected: ${socket.user.fullName} (${socket.id})`);

    // Initialize set
    if (!userSocketMap[userId]) {
      userSocketMap[userId] = new Set();
    }

    // Add socket ID to the user's set
    userSocketMap[userId].add(socket.id);
    
    // Emit the updated list of online users to all clients
    socket.emit("online-users", Object.keys(userSocketMap)); 
    messageNamespace.emit("online-users", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      userSocketMap[userId].delete(socket.id);

      if (userSocketMap[userId].size === 0) {
        delete userSocketMap[userId];
      }

      messageNamespace.emit("online-users", Object.keys(userSocketMap));

      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};