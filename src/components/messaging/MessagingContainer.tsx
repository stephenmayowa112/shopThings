'use client';

import { useState } from 'react';
import { ConversationList } from './ConversationList';
import { MessageThread } from './MessageThread';
import type { Conversation } from '@/types/messaging';
import { MessageCircle } from 'lucide-react';

interface MessagingContainerProps {
  userId: string;
  isVendor?: boolean;
}

export function MessagingContainer({ userId, isVendor = false }: MessagingContainerProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  return (
    <div className="h-[calc(100vh-200px)] bg-white rounded-lg border border-border overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        {/* Conversation list - hidden on mobile when conversation is selected */}
        <div
          className={`border-r border-border ${
            selectedConversation ? 'hidden md:block' : 'block'
          }`}
        >
          <ConversationList
            userId={userId}
            isVendor={isVendor}
            onSelectConversation={setSelectedConversation}
            selectedConversationId={selectedConversation?.id}
          />
        </div>

        {/* Message thread */}
        <div className={`md:col-span-2 ${selectedConversation ? 'block' : 'hidden md:block'}`}>
          {selectedConversation ? (
            <MessageThread
              conversation={selectedConversation}
              userId={userId}
              isVendor={isVendor}
              onBack={() => setSelectedConversation(null)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <MessageCircle className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Select a conversation
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
