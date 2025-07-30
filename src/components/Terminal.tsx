import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import Dashboard from './Dashboard';

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
  const [currentView, setCurrentView] = useState<'terminal' | 'dashboard'>('terminal');
  const [isVisible, setIsVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const availableCommands = [
    'help',
    'clear',
    'cd report',
    'cd dashboard',
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
  cd report   - Navigate to reports dashboard
  cd dashboard- Access admin dashboard
  ls          - List available sections
  whoami      - Display current user
  pwd         - Show current directory
  neofetch    - Display system information
  exit        - Exit terminal`;
        break;
      
      case 'clear':
        setHistory([]);
        return;
      
      case 'cd report':
      case 'cd dashboard':
        output = 'Loading dashboard...';
        setCurrentView('dashboard');
        break;
      
      case 'ls':
        output = `admybrand.com/
├── dashboard/
├── reports/
├── analytics/
├── users/
└── settings/`;
        break;
      
      case 'whoami':
        output = 'arch_004@admybrand.com';
        break;
      
      case 'pwd':
        output = '/home/arch_004/admybrand.com';
        break;
      
      case 'exit':
        output = 'Goodbye!';
        setIsVisible(false);
        break;
      
      case 'neofetch':
        output = `
         ▄▄▄▄▄▄▄▄▄    arch_004@admybrand.com
       ▄█████████████▄  ──────────────────────
     ▄███████████████▄  OS: ArchLinux Dashboard
    ████████▀▀▀████████ Host: Terminal Dashboard
   ███████▀     ▀██████ Kernel: Web 6.9.0-LTS
  ████████       ██████ Uptime: ${Math.floor(Date.now() / 1000 / 60)} mins
  ███████▄     ▄██████  Shell: terminal-dash
   ████████▄▄▄████████  Resolution: Responsive
    ▀███████████████▀   Theme: Catppuccin Mocha
     ▀█████████████▀    Terminal: admybrand.com
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[600px] bg-card terminal-border terminal-glow">
        <div className="p-6 h-full flex flex-col">
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
              <span className="text-muted-foreground font-mono text-sm ml-4">
                Terminal - admybrand.com
              </span>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="flex-1 overflow-y-auto font-mono text-sm space-y-2"
          >
            {/* Welcome Message */}
            <div className="text-primary terminal-text">
              Welcome to admybrand.com Terminal Dashboard
            </div>
            <div className="text-muted-foreground">
              Type 'help' to see available commands
            </div>
            <div className="text-muted-foreground mb-4">
              Use 'cd report' or 'cd dashboard' to access the admin panel
            </div>

            {/* Command History */}
            {history.map((entry, index) => (
              <div key={index} className="mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-success">arch_004@admybrand.com</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-info">~/admybrand.com</span>
                  <span className="text-primary">$</span>
                  <span className="text-foreground">{entry.command}</span>
                </div>
                {entry.output && (
                  <pre className="text-muted-foreground mt-1 whitespace-pre-wrap break-words">
                    {entry.output}
                  </pre>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-success">arch_004@admybrand.com</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-info">~/admybrand.com</span>
              <span className="text-primary">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-foreground font-mono"
                placeholder="Type a command..."
                autoFocus
              />
              <span className="text-primary terminal-cursor">▊</span>
            </form>
          </div>

          {/* Terminal Footer */}
          <div className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
            <div className="flex justify-between">
              <span>Press Tab for auto-completion</span>
              <span>Connected to admybrand.com</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Terminal;