import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  Search,
  MessageCircle,
  Send,
  User,
  Clock,
  CheckCheck,
  Check
} from 'lucide-react';

interface MessagesProps {
  onBack: () => void;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'incoming' | 'outgoing';
}

const Messages: React.FC<MessagesProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string>('admin');

  const conversations = [
    { id: 'admin', name: 'System Admin', unread: 3, lastMessage: 'Server maintenance scheduled', time: '2m ago' },
    { id: 'security', name: 'Security Team', unread: 1, lastMessage: 'Login attempt detected', time: '15m ago' },
    { id: 'support', name: 'Support Desk', unread: 0, lastMessage: 'Ticket resolved', time: '1h ago' },
    { id: 'dev', name: 'Dev Team', unread: 2, lastMessage: 'New deployment ready', time: '3h ago' }
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: 'System Admin',
      content: 'Server maintenance will be performed tonight at 2:00 AM UTC. Expected downtime: 30 minutes.',
      timestamp: '14:30',
      status: 'read',
      type: 'incoming'
    },
    {
      id: 2,
      sender: 'arch_004',
      content: 'Acknowledged. Will monitor systems during maintenance window.',
      timestamp: '14:32',
      status: 'delivered',
      type: 'outgoing'
    },
    {
      id: 3,
      sender: 'System Admin',
      content: 'Database backup completed successfully. All systems nominal.',
      timestamp: '14:45',
      status: 'delivered',
      type: 'incoming'
    },
    {
      id: 4,
      sender: 'System Admin',
      content: 'Please review the new security protocols document in the important section.',
      timestamp: '14:58',
      status: 'sent',
      type: 'incoming'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Check className="w-3 h-3 text-muted-foreground" />;
      case 'delivered': return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      case 'read': return <CheckCheck className="w-3 h-3 text-primary" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-2 md:p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={onBack} 
              variant="outline" 
              size="sm"
              className="terminal-border"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terminal
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold terminal-text">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 inline mr-2" />
                Messages
              </h1>
              <p className="text-muted-foreground font-mono text-sm">
                ~/messages - System Communications
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground font-mono hidden md:block">
            {new Date().toLocaleString()}
          </div>
        </div>

        {/* Messages Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
          {/* Conversations List */}
          <Card className="metric-card lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="terminal-text text-lg">Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-mono text-sm"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[50vh]">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedConversation === conv.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono font-medium text-sm">{conv.name}</span>
                      </div>
                      {conv.unread > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground font-mono truncate">
                      {conv.lastMessage}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono">{conv.time}</span>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Messages View */}
          <Card className="metric-card lg:col-span-2">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="terminal-text text-lg">
                {conversations.find(c => c.id === selectedConversation)?.name || 'Select Conversation'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-[50vh]">
              {/* Messages List */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg font-mono text-sm ${
                          message.type === 'outgoing'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <div className="mb-1">
                          <span className="font-medium text-xs opacity-80">
                            {message.sender}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                        <div className="flex items-center justify-between mt-2 text-xs opacity-60">
                          <span>{message.timestamp}</span>
                          {message.type === 'outgoing' && getStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="font-mono text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} size="sm" className="px-3">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;