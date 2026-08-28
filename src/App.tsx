/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef, memo, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MessageSquare, 
  Code, 
  Image as ImageIcon, 
  Video, 
  PenTool, 
  Mic, 
  Cpu, 
  Sparkles, 
  ExternalLink,
  Terminal,
  Palette,
  Film,
  FileText,
  Layout,
  ArrowRight,
  Menu,
  X,
  Star,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  CreditCard,
  Info,
  ChevronRight,
  Globe,
  Zap,
  Moon,
  Sun,
  Home,
  Compass,
  Settings,
  MoreHorizontal,
  Bot,
  Layers,
  Music,
  BarChart3,
  Megaphone,
  Scale,
  Stethoscope,
  GraduationCap,
  Gamepad2,
  Trash2,
  Box,
  Briefcase,
  Languages,
  Lock,
  TrendingUp,
  Users,
  FlaskConical,
  Share2,
  Heart,
  Plane,
  ShoppingCart,
  Download,
  Eraser,
  Square,
  Circle,
  Type,
  Save,
  Monitor,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  Minus,
  Triangle,
  Hexagon,
  Maximize2,
  RotateCcw,
  Pipette,
  Wand2,
  Diamond,
  PaintBucket,
  Highlighter,
  RotateCw
} from 'lucide-react';
import { AI_TOOLS, CATEGORIES } from './constants';
import { AITool, Category } from './types';

const ICON_MAP: Record<string, any> = {
  'Chat & Assistants': MessageSquare,
  'Code Generation': Code,
  'Image Generation': ImageIcon,
  'Video Production': Video,
  'Audio & Music': Music,
  'Writing & Content': PenTool,
  'Data Analysis': BarChart3,
  'Marketing & SEO': Megaphone,
  'Legal & Compliance': Scale,
  'Medical & Health': Stethoscope,
  'Education & Tutoring': GraduationCap,
  'Design & UI/UX': Palette,
  '3D & Gaming': Gamepad2,
  'Productivity & Workflow': Layers,
  'Customer Support': Bot,
  'Translation & Localization': Languages,
  'Cybersecurity': Lock,
  'Finance & Investing': TrendingUp,
  'HR & Recruiting': Users,
  'Research & Science': FlaskConical,
  'Social Media Management': Share2,
  'Personal Growth': Heart,
  'Travel & Planning': Plane,
  'E-commerce & Retail': ShoppingCart,
  'Developer': Monitor,
  'All': Globe,
  'Sparkles': Sparkles,
  'Terminal': Terminal,
  'Film': Film,
  'FileText': FileText,
  'Layout': Layout,
};

const MatrixColumn = memo(({ i }: { i: number }) => {
  const sanskritNames = ["आयुष आशुतोष गुप्ता", "आदित्य बोयनपल्ली"];
  const chars = useMemo(() => {
    const base = Array.from({ length: 20 }).map(() => String.fromCharCode(0x0905 + Math.random() * 60));
    if (Math.random() > 0.95) {
      const name = sanskritNames[Math.floor(Math.random() * sanskritNames.length)];
      const nameChars = name.split('');
      const start = Math.floor(Math.random() * (20 - nameChars.length));
      for (let k = 0; k < nameChars.length; k++) {
        base[start + k] = nameChars[k];
      }
    }
    return base;
  }, []);

  return (
    <div
      className="matrix-column"
      style={{
        left: `${i * 40}px`,
        animationDuration: `${Math.random() * 10 + 10}s`,
        animationDelay: `${Math.random() * 5}s`,
        color: Math.random() > 0.8 ? 'var(--accent)' : 'var(--accent-secondary)',
      }}
    >
      {chars.map((char, j) => (
        <div key={j} style={{ opacity: 1 - j / 20 }} className="py-0.5">
          {char}
        </div>
      ))}
    </div>
  );
});

const MatrixBackground = () => {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const updateColumns = () => {
      const count = Math.floor(window.innerWidth / 50);
      setColumns(Array.from({ length: count }, (_, i) => i));
    };
    
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return (
    <div className="matrix-container">
      {columns.map((i) => (
        <MatrixColumn key={i} i={i} />
      ))}
    </div>
  );
};

const TesseractLogo = memo(({ onClick }: { onClick?: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    const size = 35;
    
    // 16 vertices of a 4D hypercube (tesseract)
    const vertices: number[][] = [];
    for (let i = 0; i < 16; i++) {
      vertices.push([
        i & 1 ? 1 : -1,
        i & 2 ? 1 : -1,
        i & 4 ? 1 : -1,
        i & 8 ? 1 : -1
      ]);
    }

    const rotate4D = (v: number[], a: number) => {
      let [x, y, z, w] = v;
      const s = Math.sin(a);
      const c = Math.cos(a);
      
      // XY rotation
      let x1 = x * c - y * s;
      let y1 = x * s + y * c;
      
      // ZW rotation
      let z1 = z * c - w * s;
      let w1 = z * s + w * c;
      
      // YZ rotation
      let y2 = y1 * c - z1 * s;
      let z2 = y1 * s + z1 * c;
      
      return [x1, y2, z2, w1];
    };

    const project = (v: number[]) => {
      const [x, y, z, w] = v;
      // Stereographic projection from 4D to 3D
      const factor = 1 / (2.5 - w);
      const x3 = x * factor;
      const y3 = y * factor;
      const z3 = z * factor;
      
      // Weak perspective projection from 3D to 2D
      const factor2 = 1 / (2.5 - z3);
      return [x3 * factor2 * size + 40, y3 * factor2 * size + 40];
    };

    const draw = () => {
      ctx.clearRect(0, 0, 80, 80);
      angle += 0.015;

      const projected = vertices.map(v => project(rotate4D(v, angle)));

      ctx.lineWidth = 1.5;
      
      // Draw edges
      for (let i = 0; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
          let diff = 0;
          for (let k = 0; k < 4; k++) if ((i ^ j) & (1 << k)) diff++;
          
          if (diff === 1) {
            const grad = ctx.createLinearGradient(
              projected[i][0], projected[i][1],
              projected[j][0], projected[j][1]
            );
            grad.addColorStop(0, 'rgba(0, 255, 204, 0.8)');
            grad.addColorStop(1, 'rgba(57, 255, 20, 0.8)');
            
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(projected[i][0], projected[i][1]);
            ctx.lineTo(projected[j][0], projected[j][1]);
            ctx.stroke();
          }
        }
      }
      
      // Glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0, 255, 204, 0.5)';
    };

    let frameId: number;
    const animate = () => {
      draw();
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div 
      className="relative w-20 h-20 flex items-center justify-center cursor-pointer group"
      onClick={onClick}
    >
      <canvas ref={canvasRef} width={80} height={80} className="w-full h-full transition-transform duration-500 group-hover:scale-110" />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-1.5 h-1.5 bg-[var(--accent)] rounded-full blur-[1px]"
      />
      <div className="absolute inset-0 bg-[var(--accent)]/10 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
    </div>
  );
});

const ToolCard = ({ 
  tool, 
  onSelect, 
  onAddToDeck, 
  onRemoveFromDeck,
  isInDeck 
}: { 
  tool: AITool; 
  onSelect: (t: AITool) => void;
  onAddToDeck: (t: AITool) => void;
  onRemoveFromDeck: (t: AITool) => void;
  isInDeck: boolean;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -10 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className="group relative bg-[var(--card-bg)] border border-[var(--border)] rounded-[2.5rem] p-7 hover:border-[var(--accent)]/50 transition-all duration-700 flex flex-col gap-6 overflow-hidden shadow-2xl cyber-chip-card"
  >
    {/* Cyber Chip Pattern Overlay */}
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(var(--accent)_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
    
    {/* Corner Accents */}
    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[var(--accent)]/20 rounded-tl-[2.5rem] group-hover:border-[var(--accent)]/60 transition-colors" />
    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[var(--accent)]/20 rounded-br-[2.5rem] group-hover:border-[var(--accent)]/60 transition-colors" />

    <div className="relative z-10 flex items-center justify-between">
      <div className="w-14 h-14 bg-[var(--accent)]/5 rounded-2xl flex items-center justify-center border border-[var(--accent)]/10 group-hover:border-[var(--accent)]/40 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(0,255,204,0.2)]">
        {(() => {
          const Icon = ICON_MAP[tool.categories[0]] || Sparkles;
          return <Icon className="w-7 h-7 text-[var(--accent)] group-hover:scale-110 transition-transform duration-500" />;
        })()}
      </div>
      <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[var(--accent)]/5 rounded-full text-xs font-black text-[var(--accent)] border border-[var(--accent)]/10">
        <Star className="w-3.5 h-3.5 fill-[var(--accent)]" />
        {tool.rating}
      </div>
    </div>

    <div className="relative z-10 space-y-2">
      <h3 className="text-xl font-black tracking-tight group-hover:text-[var(--accent)] transition-colors truncate uppercase">{tool.name}</h3>
    </div>

    <div className="relative z-10 grid grid-cols-2 gap-3 mt-auto">
      <button
        onClick={() => onSelect(tool)}
        className="py-3.5 bg-[var(--glass)] hover:bg-[var(--accent)]/10 rounded-2xl text-[10px] font-black tracking-[0.2em] transition-all border border-[var(--border)] uppercase hover:border-[var(--accent)]/30"
      >
        ANALYZE
      </button>
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="py-3.5 bg-[var(--accent)]/5 hover:bg-[var(--accent)] text-[var(--accent)] hover:text-black rounded-2xl text-[10px] font-black tracking-[0.2em] transition-all border border-[var(--accent)]/20 flex items-center justify-center gap-2 uppercase"
      >
        DEPLOY <ExternalLink className="w-3 h-3" />
      </a>
      <button
        onClick={() => isInDeck ? onRemoveFromDeck(tool) : onAddToDeck(tool)}
        className={`col-span-2 py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] transition-all border uppercase flex items-center justify-center gap-2.5 ${
          isInDeck 
            ? 'bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white border-red-500/20 hover:border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
            : 'bg-[var(--glass)] hover:bg-[var(--accent)]/10 text-[var(--text-muted)] hover:text-[var(--accent)] border-[var(--border)] hover:border-[var(--accent)]/30'
        }`}
      >
        {isInDeck ? <Trash2 size={14} /> : <Layers size={14} />}
        {isInDeck ? 'PURGE FROM DECK' : 'SYNC TO DECK'}
      </button>
    </div>
  </motion.div>
);

const NotepadView = memo(() => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [font, setFont] = useState('Inter');
  const [fontSize, setFontSize] = useState('4');

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const downloadTxt = () => {
    const text = editorRef.current?.innerText || '';
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "cruzelabs-note.txt";
    document.body.appendChild(element);
    element.click();
  };

  const clearAll = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  return (
    <div className="h-full flex flex-col p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Neural Notepad</h2>
          <p className="text-[var(--accent)]/60 text-xs font-bold uppercase tracking-widest">Rich Text • Neural Capture</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={clearAll}
            className="p-3 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all"
            title="Clear All"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button 
            onClick={downloadTxt}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:opacity-90 transition-all"
          >
            <Download className="w-4 h-4" />
            Export .txt
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 p-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-xl">
        <select 
          value={font} 
          onChange={(e) => {
            setFont(e.target.value);
            execCommand('fontName', e.target.value);
          }}
          className="bg-transparent text-xs font-bold uppercase p-2 border-r border-[var(--border)] focus:outline-none"
        >
          <option value="Inter">Inter</option>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times</option>
        </select>

        <select 
          value={fontSize} 
          onChange={(e) => {
            setFontSize(e.target.value);
            execCommand('fontSize', e.target.value);
          }}
          className="bg-transparent text-xs font-bold uppercase p-2 border-r border-[var(--border)] focus:outline-none"
        >
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="6">Huge</option>
          <option value="7">Giant</option>
        </select>

        <div className="flex gap-1 px-2 border-r border-[var(--border)]">
          <button onClick={() => execCommand('bold')} className="p-2 hover:bg-[var(--accent)]/10 rounded-lg transition-all" title="Bold"><Bold size={16} /></button>
          <button onClick={() => execCommand('italic')} className="p-2 hover:bg-[var(--accent)]/10 rounded-lg transition-all" title="Italic"><Italic size={16} /></button>
          <button onClick={() => execCommand('underline')} className="p-2 hover:bg-[var(--accent)]/10 rounded-lg transition-all" title="Underline"><Underline size={16} /></button>
        </div>

        <div className="flex gap-1 px-2">
          <button onClick={() => execCommand('justifyLeft')} className="p-2 hover:bg-[var(--accent)]/10 rounded-lg transition-all" title="Align Left"><AlignLeft size={16} /></button>
          <button onClick={() => execCommand('justifyCenter')} className="p-2 hover:bg-[var(--accent)]/10 rounded-lg transition-all" title="Align Center"><AlignCenter size={16} /></button>
          <button onClick={() => execCommand('justifyRight')} className="p-2 hover:bg-[var(--accent)]/10 rounded-lg transition-all" title="Align Right"><AlignRight size={16} /></button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={() => {}}
        className="flex-1 w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 text-[var(--text)] font-sans text-lg focus:outline-none focus:border-[var(--accent)]/50 overflow-y-auto shadow-2xl"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
});

const DrawingBoardView = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(4);
  const [opacity, setOpacity] = useState(100);
  const [tool, setTool] = useState<'brush' | 'pen' | 'marker' | 'eraser' | 'line' | 'rect' | 'circle' | 'triangle' | 'star' | 'hexagon' | 'diamond' | 'arrow'>('brush');
  const [fill, setFill] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas background to white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
      }
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        downloadImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory(prev => [...prev, canvas.toDataURL()]);
    setRedoStack([]);
  };

  const undo = () => {
    setHistory(prev => {
      if (prev.length <= 1) return prev;
      const newHistory = [...prev];
      const current = newHistory.pop();
      if (current) setRedoStack(rs => [current, ...rs]);
      
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const img = new Image();
          img.src = newHistory[newHistory.length - 1];
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
          };
        }
      }
      return newHistory;
    });
  };

  const redo = () => {
    setRedoStack(prev => {
      if (prev.length === 0) return prev;
      const newRedo = [...prev];
      const next = newRedo.shift();
      if (!next) return prev;
      
      setHistory(h => [...h, next]);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const img = new Image();
          img.src = next;
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
          };
        }
      }
      return newRedo;
    });
  };

  const rotateCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.height;
    tempCanvas.height = canvas.width;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate(Math.PI / 2);
    tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

    const oldWidth = canvas.width;
    const oldHeight = canvas.height;
    canvas.width = oldHeight;
    canvas.height = oldWidth;
    ctx.drawImage(tempCanvas, 0, 0);
    saveToHistory();
  };

  const getCoords = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = ('touches' in e) ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = ('touches' in e) ? e.touches[0].clientY : (e as MouseEvent).clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoords(e);
    setStartPos({ x, y });
    setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    if (tool === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
      ctx.globalCompositeOperation = 'source-over';
    } else {
      ctx.strokeStyle = color;
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.lineWidth = brushSize;
    ctx.lineCap = tool === 'marker' ? 'square' : 'round';
    ctx.lineJoin = tool === 'marker' ? 'miter' : 'round';
    ctx.globalAlpha = tool === 'marker' ? 0.3 : opacity / 100;
    
    setIsDrawing(true);
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoords(e);

    if (['brush', 'pen', 'eraser', 'marker'].includes(tool)) {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      if (snapshot) ctx.putImageData(snapshot, 0, 0);
      drawShape(ctx, startPos.x, startPos.y, x, y);
    }
  };

  const drawShape = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath();
    const w = x2 - x1;
    const h = y2 - y1;

    if (tool === 'line') {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    } else if (tool === 'rect') {
      ctx.rect(x1, y1, w, h);
    } else if (tool === 'circle') {
      const r = Math.sqrt(w * w + h * h);
      ctx.arc(x1, y1, r, 0, 2 * Math.PI);
    } else if (tool === 'triangle') {
      ctx.moveTo(x1 + w / 2, y1);
      ctx.lineTo(x1, y1 + h);
      ctx.lineTo(x1 + w, y1 + h);
      ctx.closePath();
    } else if (tool === 'star') {
      const r = Math.sqrt(w * w + h * h);
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * r + x1, -Math.sin((18 + i * 72) / 180 * Math.PI) * r + y1);
        ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * (r / 2) + x1, -Math.sin((54 + i * 72) / 180 * Math.PI) * (r / 2) + y1);
      }
      ctx.closePath();
    } else if (tool === 'hexagon') {
      const r = Math.sqrt(w * w + h * h);
      for (let i = 0; i < 6; i++) {
        ctx.lineTo(x1 + r * Math.cos(i * 2 * Math.PI / 6), y1 + r * Math.sin(i * 2 * Math.PI / 6));
      }
      ctx.closePath();
    } else if (tool === 'diamond') {
      ctx.moveTo(x1 + w / 2, y1);
      ctx.lineTo(x1 + w, y1 + h / 2);
      ctx.lineTo(x1 + w / 2, y1 + h);
      ctx.lineTo(x1, y1 + h / 2);
      ctx.closePath();
    } else if (tool === 'arrow') {
      const headlen = 15;
      const angle = Math.atan2(h, w);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
    }

    if (fill && !['line', 'arrow'].includes(tool)) {
      ctx.fillStyle = color;
      ctx.fill();
    }
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'cruzelabs-sketch.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-full flex flex-col bg-[#F0F2F5] text-slate-900">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-slate-200 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <PenTool className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-800">Pro Drawing Board</h2>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Creative Workspace • Whiteboard</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="px-4 py-2 bg-slate-100 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Ctrl+Z: Undo | Ctrl+Y: Redo | Ctrl+S: Save
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 flex flex-wrap items-center gap-4 bg-white border-b border-slate-200 shadow-sm">
        {/* Tool Group */}
        <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200">
          {[
            { id: 'brush', icon: PenTool, title: 'Brush' },
            { id: 'marker', icon: Highlighter, title: 'Marker' },
            { id: 'pen', icon: Wand2, title: 'Pen' },
            { id: 'eraser', icon: Eraser, title: 'Eraser' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id as any)}
              title={t.title}
              className={`p-2.5 rounded-lg transition-all ${tool === t.id ? 'bg-blue-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'}`}
            >
              <t.icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* Shapes Group */}
        <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200">
          {[
            { id: 'line', icon: Minus },
            { id: 'rect', icon: Square },
            { id: 'circle', icon: Circle },
            { id: 'triangle', icon: Triangle },
            { id: 'diamond', icon: Diamond },
            { id: 'arrow', icon: ArrowRight },
            { id: 'star', icon: Star },
            { id: 'hexagon', icon: Hexagon }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setTool(s.id as any)}
              className={`p-2.5 rounded-lg transition-all ${tool === s.id ? 'bg-blue-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'}`}
            >
              <s.icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* Fill Toggle */}
        <button 
          onClick={() => setFill(!fill)}
          className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${fill ? 'bg-blue-500 border-blue-600 text-white' : 'bg-slate-100 border-slate-200 text-slate-400'}`}
        >
          <PaintBucket className="w-4 h-4" />
          {fill ? 'Fill ON' : 'Fill OFF'}
        </button>

        {/* Color */}
        <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-3 py-1 border border-slate-200">
          <div className="relative w-8 h-8 rounded-full border-2 border-white shadow-inner overflow-hidden">
            <input 
              type="color" 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="absolute inset-0 w-full h-full scale-150 cursor-pointer"
            />
          </div>
          <Palette className="w-5 h-5 text-slate-400" />
        </div>

        {/* Size Slider */}
        <div className="flex items-center gap-4 bg-slate-100 rounded-xl px-4 py-2 border border-slate-200">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Size</span>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-32 accent-blue-500"
          />
          <span className="text-[10px] font-bold text-slate-600 w-8">{brushSize}px</span>
        </div>

        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex gap-2">
          <button onClick={rotateCanvas} title="Rotate 90°" className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-all"><RotateCw className="w-5 h-5" /></button>
          <button onClick={clearCanvas} title="Clear All" className="p-2.5 hover:bg-red-50 rounded-xl text-red-400 transition-all"><RotateCcw className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden" style={{ width: 'min(100%, 1200px)', aspectRatio: '16/9' }}>
          <canvas
            ref={canvasRef}
            width={1600}
            height={900}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair touch-none"
          />
        </div>

        {/* Floating Actions */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 p-2 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-2xl">
          <button onClick={undo} title="Undo (Ctrl+Z)" className="p-3 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-blue-500 transition-all"><Undo2 className="w-5 h-5" /></button>
          <button onClick={redo} title="Redo (Ctrl+Y)" className="p-3 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-blue-500 transition-all"><Redo2 className="w-5 h-5" /></button>
          <div className="w-px h-8 bg-slate-200" />
          <button 
            onClick={downloadImage}
            className="flex items-center gap-3 px-8 py-3 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Download className="w-5 h-5" />
            Save Sketch
          </button>
        </div>
      </div>
    </div>
  );
});

const ToolModal = ({ tool, onClose }: { tool: AITool; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="w-full max-w-2xl bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <div className="relative h-32 bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-secondary)]/10 flex items-center px-8">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-[var(--border)]">
          {(() => {
            const Icon = ICON_MAP[tool.categories[0]] || Sparkles;
            return <Icon className="w-8 h-8 text-[var(--accent)]" />;
          })()}
        </div>
        <div className="ml-6">
          <h2 className="text-3xl font-bold">{tool.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-lg font-bold">{tool.rating}</span>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto no-scrollbar">
        <div className="space-y-6">
          {tool.details.specializedInfo && tool.details.specializedInfo.length > 0 && (
            <section className="grid grid-cols-2 gap-4">
              {tool.details.specializedInfo.map((info, i) => (
                <div key={i} className="p-4 bg-[var(--accent)]/5 rounded-2xl border border-[var(--accent)]/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]/60 mb-1">{info.label}</p>
                  <p className="text-sm font-bold truncate">{info.value}</p>
                </div>
              ))}
            </section>
          )}

          {tool.details.canDo && tool.details.canDo.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Capabilities
              </h3>
              <ul className="space-y-2">
                {tool.details.canDo.map((item, i) => (
                  <li key={i} className="text-sm opacity-60 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 bg-[var(--accent)] rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tool.details.cannotDo && tool.details.cannotDo.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-red-400 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4" /> Limitations
              </h3>
              <ul className="space-y-2">
                {tool.details.cannotDo.map((item, i) => (
                  <li key={i} className="text-sm opacity-60 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 bg-red-400 rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {(!tool.details.canDo || tool.details.canDo.length === 0) && (!tool.details.cannotDo || tool.details.cannotDo.length === 0) && (
            <section className="h-full flex flex-col items-center justify-center text-center opacity-40 py-10">
              <Info size={32} className="mb-4" />
              <p className="text-sm font-bold">Detailed capabilities for this AI are currently being indexed.</p>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <section className="p-4 bg-white/5 rounded-2xl border border-[var(--border)]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Auth Requirements
            </h3>
            <p className="text-sm opacity-70 leading-relaxed">
              {tool.details.authReq}
            </p>
          </section>

          <section className="p-4 bg-white/5 rounded-2xl border border-[var(--border)]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Credit System
            </h3>
            <p className="text-sm opacity-70 leading-relaxed">
              {tool.details.credits}
            </p>
          </section>
        </div>
      </div>

      <div className="p-6 border-t border-[var(--border)] bg-white/[0.02] flex justify-end">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-[var(--accent)] text-black font-bold rounded-xl hover:bg-[var(--accent-secondary)] transition-all flex items-center gap-2"
        >
          Visit Website <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'explore' | 'notepad' | 'drawing'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [userDeck, setUserDeck] = useState<AITool[]>([]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('light');
  };

  const addToDeck = (tool: AITool) => {
    if (!userDeck.find(t => t.id === tool.id)) {
      setUserDeck([...userDeck, tool]);
    }
  };

  const removeFromDeck = (tool: AITool) => {
    setUserDeck(userDeck.filter(t => t.id !== tool.id));
  };

  const filteredTools = useMemo(() => {
    if (currentView === 'home') return [];
    if (!selectedCategory) return [];
    
    return AI_TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    }).sort((a, b) => b.rating - a.rating);
  }, [searchQuery, selectedCategory, currentView]);

  return (
    <div className="min-h-screen flex transition-colors duration-500 overflow-hidden font-sans">
      <MatrixBackground />
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-50 h-screen bg-[var(--sidebar-bg)] border-r border-[var(--border)] flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.2)]"
      >
        <div className="p-6 flex justify-center">
          <TesseractLogo onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
        
        <div className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto no-scrollbar">
          <button
            onClick={() => {
              setCurrentView('home');
              setSelectedCategory(null);
              setIsExploreOpen(false);
            }}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
              currentView === 'home' ? 'bg-[var(--accent)]/10 text-[var(--accent)] shadow-inner' : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/5'
            }`}
          >
            <Home className={`w-6 h-6 shrink-0 ${!isSidebarOpen ? 'mx-auto' : ''}`} />
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-bold tracking-tight text-base whitespace-nowrap"
                >
                  Home
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                isExploreOpen ? 'bg-[var(--accent)]/10 text-[var(--accent)] shadow-inner' : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/5'
              }`}
            >
              <Compass className={`w-6 h-6 shrink-0 ${!isSidebarOpen ? 'mx-auto' : ''}`} />
              <AnimatePresence mode="wait">
                {isSidebarOpen && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center flex-1"
                  >
                    <span className="font-bold tracking-tight text-base whitespace-nowrap">Explore</span>
                    <ChevronRight className={`ml-auto w-4 h-4 transition-transform duration-300 ${isExploreOpen ? 'rotate-90' : ''}`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {isExploreOpen && isSidebarOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-1 pl-10">
                    {CATEGORIES.map((cat) => {
                      const Icon = ICON_MAP[cat] || Sparkles;
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setCurrentView('explore');
                            setSelectedCategory(cat);
                          }}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-xs font-bold ${
                            selectedCategory === cat ? 'text-[var(--accent)] bg-[var(--accent)]/5' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{cat}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => {
              setCurrentView('notepad');
              setIsExploreOpen(false);
            }}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
              currentView === 'notepad' ? 'bg-[var(--accent)]/10 text-[var(--accent)] shadow-inner' : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/5'
            }`}
          >
            <FileText className={`w-6 h-6 shrink-0 ${!isSidebarOpen ? 'mx-auto' : ''}`} />
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-bold tracking-tight text-base whitespace-nowrap"
                >
                  Notepad
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => {
              setCurrentView('drawing');
              setIsExploreOpen(false);
            }}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
              currentView === 'drawing' ? 'bg-[var(--accent)]/10 text-[var(--accent)] shadow-inner' : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/5'
            }`}
          >
            <Palette className={`w-6 h-6 shrink-0 ${!isSidebarOpen ? 'mx-auto' : ''}`} />
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-bold tracking-tight text-base whitespace-nowrap"
                >
                  Sandbox
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Scattered Logos in Sidebar */}
          {(!isExploreOpen || !isSidebarOpen) && (
            <div className="mt-10 flex flex-col items-center gap-10 opacity-30 transition-opacity duration-700">
              {CATEGORIES.slice(0, 12).map((cat, i) => {
                const Icon = ICON_MAP[cat] || Sparkles;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.5, opacity: 1, color: 'var(--accent)' }}
                    animate={{ 
                      x: [0, (i % 2 === 0 ? 10 : -10), 0],
                      y: [0, (i % 3 === 0 ? 10 : -10), 0],
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{ 
                      duration: 10 + i, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                    className="cursor-pointer transition-colors"
                  >
                    <Icon size={isSidebarOpen ? 22 : 18} className="text-[var(--accent)]/40" />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col gap-2">
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-4 p-3.5 rounded-2xl text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/5 transition-all"
          >
            {theme === 'dark' ? <Sun className={`w-6 h-6 shrink-0 ${!isSidebarOpen ? 'mx-auto' : ''}`} /> : <Moon className={`w-6 h-6 shrink-0 ${!isSidebarOpen ? 'mx-auto' : ''}`} />}
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-bold tracking-tight text-base whitespace-nowrap"
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto no-scrollbar relative">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 md:p-12"
            >
              <div className="max-w-6xl mx-auto space-y-20">
                <header className="relative space-y-4">
                  <motion.h1 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase"
                  >
                    CRUZELABS<span className="text-[var(--accent)]">.AI</span>
                  </motion.h1>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, x: -20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="inline-block px-6 py-2 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full text-sm font-black tracking-[0.5em] text-[var(--accent)] uppercase shadow-[0_0_20px_rgba(0,255,204,0.1)]"
                  >
                    THE INTELLIGENCE HUB
                  </motion.div>
                  <motion.p 
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed font-medium pt-4"
                  >
                    Your command center for the next era of computing. Explore, manage, and deploy the world's most advanced AI models from a single interface.
                  </motion.p>
                </header>

                <section className="space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-3xl flex items-center justify-center border border-[var(--accent)]/20 shadow-inner">
                        <Layers className="w-8 h-8 text-[var(--accent)]" />
                      </div>
                      <h2 className="text-5xl font-black tracking-tight">User's Deck</h2>
                    </div>
                    <span className="text-sm font-black text-[var(--text-muted)] uppercase tracking-[0.3em] bg-white/5 px-6 py-2 rounded-full border border-[var(--border)]">
                      {userDeck.length} TOOLS SAVED
                    </span>
                  </div>
                  
                  {userDeck.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-24 rounded-[4rem] border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center text-center space-y-8 group hover:border-[var(--accent)]/40 transition-all duration-700 bg-white/[0.02]"
                    >
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                        <Box size={40} className="text-[var(--accent)]" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-3xl font-black opacity-60">Your deck is empty</h3>
                        <p className="text-[var(--text-muted)] text-lg max-sm mx-auto font-medium">Start exploring and add your favorite AI tools to your personal deck for quick access.</p>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentView('explore');
                          setIsExploreOpen(true);
                        }}
                        className="px-10 py-4 bg-[var(--accent)] text-black hover:scale-105 active:scale-95 border border-[var(--accent)]/20 rounded-2xl text-xs font-black tracking-widest transition-all shadow-[0_0_30px_rgba(0,255,204,0.3)]"
                      >
                        EXPLORE NOW
                      </button>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {userDeck.map((tool, i) => (
                        <motion.div
                          key={tool.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <ToolCard 
                            tool={tool} 
                            onSelect={setSelectedTool} 
                            onAddToDeck={addToDeck}
                            onRemoveFromDeck={removeFromDeck}
                            isInDeck={true}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </section>

                <section className="p-16 rounded-[4rem] bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--border)] relative overflow-hidden group">
                  <div className="relative z-10 space-y-8">
                    <h2 className="text-5xl font-black tracking-tighter leading-none">UNLIMITED<br/>POSSIBILITIES</h2>
                    <p className="text-lg text-[var(--text-muted)] max-w-md leading-relaxed">
                      From neural networks to generative art, discover tools that redefine what's possible in your workflow.
                    </p>
                    <button 
                      onClick={() => {
                        setCurrentView('explore');
                        setIsExploreOpen(true);
                      }}
                      className="px-10 py-5 bg-[var(--accent)] text-black font-black rounded-[2rem] hover:scale-105 active:scale-95 transition-all flex items-center gap-4 shadow-[0_0_30px_rgba(0,255,204,0.3)]"
                    >
                      OPEN DIRECTORY <ArrowRight size={24} />
                    </button>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[var(--accent)]/10 blur-[120px] rounded-full group-hover:bg-[var(--accent)]/20 transition-colors duration-1000" />
                </section>
              </div>
            </motion.div>
          ) : currentView === 'explore' ? (
            <motion.div
              key="explore"
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 md:p-12"
            >
              <div className="max-w-6xl mx-auto">
                {!selectedCategory ? (
                  <div className="h-[75vh] flex flex-col items-center justify-center text-center space-y-12">
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="w-56 h-56 border-2 border-dashed border-[var(--accent)]/30 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Compass size={64} className="text-[var(--accent)] opacity-60 animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h2 className="text-4xl md:text-5xl font-black tracking-tighter opacity-40 uppercase">Awaiting Selection</h2>
                      <p className="text-[var(--text-muted)] text-lg max-w-md mx-auto font-medium">Select a category from the sidebar to begin navigating the intelligence landscape.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-20">
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                      <div className="space-y-8">
                        <motion.div 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="flex items-center gap-6 text-[var(--accent)]"
                        >
                          <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-3xl flex items-center justify-center border border-[var(--accent)]/20 shadow-inner">
                            {(() => {
                              const Icon = ICON_MAP[selectedCategory] || Sparkles;
                              return <Icon size={36} />;
                            })()}
                          </div>
                          <span className="text-base font-bold uppercase tracking-[0.4em] drop-shadow-sm">{selectedCategory}</span>
                        </motion.div>
                        <motion.h2 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase"
                        >
                          {selectedCategory.split(' ')[0]} <span className="text-[var(--accent)] drop-shadow-[0_0_20px_rgba(0,255,204,0.2)]">{selectedCategory.split(' ').slice(1).join(' ')}</span>
                        </motion.h2>
                      </div>
                      
                      <div className="relative w-full max-w-lg group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors" />
                        <input
                          type="text"
                          placeholder="Filter intelligence..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full h-20 pl-16 pr-10 bg-white/5 border border-[var(--border)] rounded-[2rem] focus:border-[var(--accent)]/60 outline-none transition-all font-black text-lg placeholder:text-[var(--text-muted)]/40 shadow-xl"
                        />
                      </div>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                      {filteredTools.map((tool, i) => (
                        <motion.div
                          key={tool.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <ToolCard 
                            tool={tool} 
                            onSelect={setSelectedTool} 
                            onAddToDeck={addToDeck}
                            onRemoveFromDeck={removeFromDeck}
                            isInDeck={!!userDeck.find(t => t.id === tool.id)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : currentView === 'notepad' ? (
            <motion.div
              key="notepad"
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <NotepadView />
            </motion.div>
          ) : (
            <motion.div
              key="drawing"
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <DrawingBoardView />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Theme Toggle - Bottom Right */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[var(--card-bg)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--accent)] shadow-2xl z-[100] hover:border-[var(--accent)]/50 transition-all"
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
      </main>

      <AnimatePresence>
        {selectedTool && (
          <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
