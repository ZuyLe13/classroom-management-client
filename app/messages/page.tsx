"use client";
import AuthGuard from '@/components/authGuard'
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { API_URL } from '@/constants/api';
import { getStudents, Student } from '@/services/studentService';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from "socket.io-client";

export interface Message {
  from: string;
  to: string;
  text: string;
  time: string;
};

export default function Messages() {
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const [selectedUser, setSelectedUser] = useState<Student | null>(null);
  const [users, setUsers] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    loadUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const loadMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/messages/history`, {
          params: { from: currentUser.phone, to: selectedUser.phone }
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    loadMessages();
  }, [selectedUser, currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    socketRef.current = io("http://localhost:5000", {
      auth: { phone: currentUser.phone }
    });

    socketRef.current.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [currentUser]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userList = await getStudents();
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !currentUser) {
    return <div className="p-4">Loading...</div>;
  }

  const filteredUsers = users.filter((u) => u.role !== currentUser.role);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser || !socketRef.current) return;

    const messageData = {
      from: currentUser.phone,
      to: selectedUser.phone,
      text: newMessage,
      time: new Date().toISOString(),
    };

    socketRef.current.emit("sendMessage", messageData);
    setNewMessage("");
  };

  const visibleMessages = selectedUser
    ? messages.filter(
        (m) =>
          (m.from === currentUser.phone && m.to === selectedUser.phone) ||
          (m.from === selectedUser.phone && m.to === currentUser.phone)
      )
    : [];

  return (
    <AuthGuard>
      <Header />
      <Sidebar />
      <div className="ml-[240px] mt-[74px] p-8 flex h-[calc(100vh-74px)] bg-gray-100">
        <div className="flex w-full h-full rounded-md overflow-hidden">
          <div className="w-1/6 bg-white flex flex-col">
            <h2 className="p-4 font-bold">All Messages</h2>
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.phone}
                  onClick={() => setSelectedUser(user)}
                  className={`p-3 cursor-pointer hover:bg-gray-200 
                    ${ selectedUser?.phone === user.phone ? "bg-gray-300" : ""}`}>
                  <p className="font-semibold">{user.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-red-50">
            <div className="flex-1 p-4 overflow-y-auto">
              {selectedUser ? (
                visibleMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      msg.from === currentUser.phone ? "text-right" : "text-left"
                    }`}
                  >
                    <p className="inline-block bg-white p-2 rounded-lg shadow">
                      {msg.text}
                      <span className="ml-2 text-xs text-gray-400">
                        {new Date(msg.time).toLocaleTimeString()}
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Select a user to chat</p>
              )}
            </div>

            {selectedUser && (
              <div className="p-4 flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                  className="input"
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="btn btn-primary"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
