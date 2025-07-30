import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import Dashboard from './Dashboard';
import Messages from './Messages';
import Important from './Important';

interface TerminalProps {
  onCommand?: (command: string) => void;
}

interface CommandHistory {
  command: string;
  output: string;
  timestamp: Date;
}

const Terminal: React.FC<TerminalProps> = ({ onCommand }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [currentView, setCurrentView] = useState<'terminal' | 'dashboard' | 'messages' | 'important'>('terminal');
  const [isVisible, setIsVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const availableCommands = [
    'help',
    'clear',
    'cd dashboard',
    'cd msg',
    'cd important',
    'ls',
    'whoami',
    'pwd',
    'exit',
    'neofetch'
  ];

  useEffect(() => {
    if (inputRef.current && currentView === 'terminal') {
      inputRef.current.focus();
    }
  }, [currentView]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const timestamp = new Date();
    let output = '';

    switch (cmd.toLowerCase().trim()) {
      case 'help':
        output = `Available commands:
  help        - Show this help message
  clear       - Clear terminal screen
  cd dashboard- Access admin dashboard & analytics
  cd msg      - Open messages and communications
  cd important- View critical alerts and notifications
  ls          - List available sections
  whoami      - Display current user
  pwd         - Show current directory
  neofetch    - Display system information
  exit        - Exit terminal`;
        break;
      
      case 'clear':
        setHistory([]);
        return;
      
      case 'cd dashboard':
        output = 'Loading dashboard...';
        setCurrentView('dashboard');
        break;
      
      case 'cd msg':
        output = 'Opening messages...';
        setCurrentView('messages');
        break;
      
      case 'cd important':
        output = 'Loading important notifications...';
        setCurrentView('important');
        break;
      
      case 'ls':
        output = `dashboard/
├── analytics/
├── messages/
├── important/
├── users/
└── settings/`;
        break;
      
      case 'whoami':
        output = '▲ arch_004';
        break;
      
      case 'pwd':
        output = '/home/arch_004/dashboard';
        break;
      
      case 'exit':
        output = 'Goodbye!';
        setIsVisible(false);
        break;
      
      case 'neofetch':
        output = `
         ▄▄▄▄▄▄▄▄▄    ▲ arch_004
       ▄█████████████▄  ──────────────────
     ▄███████████████▄  OS: ArchLinux Dashboard
    ████████▀▀▀████████ Host: Terminal Dashboard
   ███████▀     ▀██████ Kernel: Web 6.9.0-LTS
  ████████       ██████ Uptime: ${Math.floor(Date.now() / 1000 / 60)} mins
  ███████▄     ▄██████  Shell: terminal-dash
   ████████▄▄▄████████  Resolution: Responsive
    ▀███████████████▀   Theme: Catppuccin Mocha
     ▀█████████████▀    Terminal: Dashboard
       ▀▀▀▀▀▀▀▀▀▀▀      
                        CPU: React Engine
                        Memory: ${(performance as any).memory ? 
                          Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024) + 'MB' : 
                          'Unknown'}`;
        break;
      
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { command: cmd, output, timestamp }]);
    onCommand?.(cmd);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const matches = availableCommands.filter(cmd => 
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  if (currentView === 'dashboard') {
    return (
      <Dashboard 
        onBack={() => {
          setCurrentView('terminal');
          setHistory(prev => [...prev, { 
            command: 'exit dashboard', 
            output: 'Returned to terminal', 
            timestamp: new Date() 
          }]);
        }} 
      />
    );
  }

  if (currentView === 'messages') {
    return (
      <Messages 
        onBack={() => {
          setCurrentView('terminal');
          setHistory(prev => [...prev, { 
            command: 'exit messages', 
            output: 'Returned to terminal', 
            timestamp: new Date() 
          }]);
        }} 
      />
    );
  }

  if (currentView === 'important') {
    return (
      <Important 
        onBack={() => {
          setCurrentView('terminal');
          setHistory(prev => [...prev, { 
            command: 'exit important', 
            output: 'Returned to terminal', 
            timestamp: new Date() 
          }]);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 md:p-4">
      <Card className="w-full max-w-4xl h-[90vh] md:h-[600px] bg-card terminal-border terminal-glow">
        <div className="p-3 md:p-6 h-full flex flex-col">
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
              <span className="text-muted-foreground font-mono text-xs md:text-sm ml-2 md:ml-4">
                Terminal Dashboard
              </span>
            </div>
            <div className="text-xs text-muted-foreground font-mono hidden md:block">
              {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="flex-1 overflow-y-auto font-mono text-xs md:text-sm space-y-2"
          >
            {/* Welcome Message */}
            <div className="text-primary terminal-text">
              Welcome to Terminal Dashboard
            </div>
            <div className="text-muted-foreground">
              Type 'help' to see available commands
            </div>
            <div className="text-muted-foreground mb-4">
              Use 'cd dashboard', 'cd msg', or 'cd important' to access different sections
            </div>

            {/* Command History */}
            {history.map((entry, index) => (
              <div key={index} className="mb-3">
                <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                  <span className="text-success">▲ arch_004</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-info">~/dashboard</span>
                  <span className="text-primary">$</span>
                  <span className="text-foreground break-all">{entry.command}</span>
                </div>
                {entry.output && (
                  <pre className="text-muted-foreground mt-1 whitespace-pre-wrap break-words text-xs md:text-sm">
                    {entry.output}
                  </pre>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-1 md:gap-2 flex-wrap">
              <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                <span className="text-success">▲ arch_004</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-info">~/dashboard</span>
                <span className="text-primary">$</span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-foreground font-mono text-xs md:text-sm"
                placeholder="Type a command..."
                autoFocus
              />
            </form>
          </div>

          {/* Terminal Footer */}
          <div className="text-xs text-muted-foreground mt-2 md:mt-4 pt-2 md:pt-4 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <span className="text-center md:text-left">Tab: auto-complete</span>
              <span className="text-center md:text-right">Terminal Dashboard</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Terminal;