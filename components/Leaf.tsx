export default function Leaf({ className = "", monogram = false }: { className?: string; monogram?: boolean }) {
  return <svg className={className} viewBox="0 0 240 260" fill="none" aria-hidden="true">
    <g fill="currentColor"><path d="M120 209C89 159 87 76 120 5c33 71 31 154 0 204Z"/><path d="M115 213C64 190 29 139 20 67c62 36 96 83 95 146Z"/><path d="M125 213c51-23 86-74 95-146-62 36-96 83-95 146Z"/><path d="M112 216C61 222 25 199 1 153c59 2 95 22 111 63Z"/><path d="M128 216c51 6 87-17 111-63-59 2-95 22-111 63Z"/><path d="M113 219c-26 29-54 33-82 23 27-22 55-28 82-23Z"/><path d="M127 219c26 29 54 33 82 23-27-22-55-28-82-23Z"/><path d="M117 204h6v52h-6z"/></g>
    <g stroke="var(--leaf-vein, #0c442a)" strokeWidth="1.3" opacity=".7"><path d="M120 30v186M38 94l78 119m86-119-78 119M22 165l90 49m106-49-90 49"/><path d="m120 85-15-15m15 37-20-20m20 43-24-24m24 46-22-22m22-45 15-15m-15 37 20-20m-20 43 24-24m-24 46 22-22"/></g>
    {monogram && <><circle cx="120" cy="182" r="39" fill="#073823"/><text x="120" y="194" textAnchor="middle" fill="#f6efda" fontFamily="Georgia,serif" fontSize="38">PC</text></>}
  </svg>;
}
