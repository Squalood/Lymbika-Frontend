"use client"

import { useEffect, useRef, useState } from "react"

export type ChatDemoMessage = {
  from: "ai" | "user"
  text: string
}

type ChatDemoProps = {
  avatar?: string
  name?: string
  status?: string
  messages: ChatDemoMessage[]
  footer?: string
}

const FIRST_MESSAGE_DELAY = 700
const READING_PAUSE = 1600
const REPLY_PAUSE = 500
const TYPING_DURATION = 700

const ChatDemo = ({
  avatar = "🤖",
  name = "Alyus · Health Companion",
  status = "Activo 24/7",
  messages,
  footer,
}: ChatDemoProps) => {
  const [visibleCount, setVisibleCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el || !messages.length) return

    const timeouts: ReturnType<typeof setTimeout>[] = []

    const playSequence = () => {
      if (hasPlayedRef.current) return
      hasPlayedRef.current = true

      let elapsed = FIRST_MESSAGE_DELAY
      timeouts.push(setTimeout(() => setVisibleCount(1), elapsed))

      for (let i = 1; i < messages.length; i++) {
        const msg = messages[i]
        const pause = messages[i - 1].from === "ai" ? READING_PAUSE : REPLY_PAUSE
        elapsed += pause

        if (msg.from === "ai") {
          const typingStart = elapsed
          timeouts.push(setTimeout(() => setIsTyping(true), typingStart))
          elapsed += TYPING_DURATION
          const revealAt = elapsed
          timeouts.push(
            setTimeout(() => {
              setIsTyping(false)
              setVisibleCount(i + 1)
            }, revealAt)
          )
        } else {
          const revealAt = elapsed
          timeouts.push(setTimeout(() => setVisibleCount(i + 1), revealAt))
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          playSequence()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      timeouts.forEach(clearTimeout)
    }
  }, [messages])

  return (
    <div
      ref={containerRef}
      className="bg-white/[0.08] border border-white/[0.12] rounded-2xl p-5 flex flex-col"
    >
      <div className="flex items-center gap-2.5 pb-3.5 mb-4 border-b border-white/10">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-lg shrink-0">
          {avatar}
        </div>
        <div>
          <div className="text-sm font-bold text-white">{name}</div>
          <div className="flex items-center gap-1 text-[11.5px] text-green-500 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
            {status}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 min-h-[40px]">
        {messages.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
              msg.from === "ai"
                ? "self-start bg-white/10 text-white/90 rounded-tl-[4px]"
                : "self-end bg-primary text-white rounded-tr-[4px]"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="self-start flex gap-1 px-3.5 py-3 bg-white/10 rounded-xl rounded-tl-[4px]">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" />
          </div>
        )}
      </div>

      {footer && (
        <p className="text-center text-[11px] text-white/45 mt-3 pt-2.5 border-t border-white/[0.08]">
          {footer}
        </p>
      )}
    </div>
  )
}

export default ChatDemo
