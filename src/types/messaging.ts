// Messaging types for in-app chat

export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Conversation {
  id: string;
  buyer_id: string;
  vendor_id: string;
  product_id: string | null;
  last_message_at: string;
  buyer_unread_count: number;
  vendor_unread_count: number;
  is_archived_by_buyer: boolean;
  is_archived_by_vendor: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  status: MessageStatus;
  is_from_buyer: boolean;
  attachments: any[]; // JSONB
  created_at: string;
  read_at: string | null;
}

// Extended types for UI
export interface ConversationWithDetails extends Conversation {
  vendor?: {
    id: string;
    store_name: string;
    logo_url: string | null;
  };
  buyer?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  product?: {
    id: string;
    title: string;
    images: string[];
    price: number;
    currency: string;
  } | null;
  last_message?: Message;
}