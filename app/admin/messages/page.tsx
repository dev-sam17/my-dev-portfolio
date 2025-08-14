"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, MailOpen, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { deleteMessage, getMessages, markMessageAsRead } from "@/lib/actions/messages";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

type Message = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Function to fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const result = await getMessages();
      if ("error" in result) {
        setError(result.error);
        setMessages([]);
      } else {
        setMessages(result as Message[]);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages. Please try again.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle message selection
  const handleSelectMessage = async (message: Message) => {
    setSelectedMessage(message);
    
    // Mark as read if not already read
    if (!message.read) {
      try {
        const result = await markMessageAsRead(message.id);
        if (!("error" in result)) {
          // Update the message in the local state
          setMessages(messages.map(m => 
            m.id === message.id ? { ...m, read: true } : m
          ));
        }
      } catch (err) {
        console.error("Error marking message as read:", err);
      }
    }
  };

  // Handle message deletion
  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    
    setIsDeleting(true);
    try {
      const result = await deleteMessage(messageToDelete);
      
      if (!("error" in result)) {
        // Remove the message from the local state
        setMessages(messages.filter(m => m.id !== messageToDelete));
        
        // If the deleted message was selected, clear the selection
        if (selectedMessage && selectedMessage.id === messageToDelete) {
          setSelectedMessage(null);
        }
        
        toast({
          title: "Message deleted",
          description: "The message has been successfully deleted.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete the message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error deleting message:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    }
  };

  // Open delete confirmation dialog
  const confirmDelete = (id: string) => {
    setMessageToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  // Count unread messages
  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6 mx-5 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/admin">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      ) : messages.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">No messages found.</div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1 h-[calc(100vh-180px)] overflow-hidden flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inbox</CardTitle>
                  <CardDescription>
                    {messages.length} {messages.length === 1 ? "message" : "messages"} total
                  </CardDescription>
                </div>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount} unread
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="divide-y">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${
                      selectedMessage?.id === message.id
                        ? "bg-slate-100 dark:bg-slate-800"
                        : ""
                    } ${!message.read ? "font-medium" : ""}`}
                    onClick={() => handleSelectMessage(message)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium">
                        {message.firstName} {message.lastName}
                      </div>
                      <div className="flex items-center">
                        {!message.read ? (
                          <Mail className="h-4 w-4 text-blue-500" />
                        ) : (
                          <MailOpen className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {message.email}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 h-[calc(100vh-180px)] overflow-hidden flex flex-col">
            {selectedMessage ? (
              <>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle>
                      {selectedMessage.firstName} {selectedMessage.lastName}
                    </CardTitle>
                    <CardDescription>
                      <a href={`mailto:${selectedMessage.email}`} className="hover:underline">
                        {selectedMessage.email}
                      </a>
                      {selectedMessage.phone && (
                        <>
                          <span className="mx-2">•</span>
                          <a href={`tel:${selectedMessage.phone}`} className="hover:underline">
                            {selectedMessage.phone}
                          </a>
                        </>
                      )}
                    </CardDescription>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => confirmDelete(selectedMessage.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Received {formatDate(selectedMessage.createdAt)}
                    </div>
                    <div className="whitespace-pre-wrap">{selectedMessage.message}</div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a message to view its contents</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeleteMessage();
              }}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster />
    </div>
  );
}
