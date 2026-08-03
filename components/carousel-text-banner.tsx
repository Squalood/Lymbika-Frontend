"use client"

import Marquee from "react-fast-marquee"
import { Card, CardContent } from "@/components/ui/card"
import {
  BadgeCheck, ShoppingBag, Clock, GraduationCap, Shield, CreditCard,
  Hospital, Stethoscope, MessageCircleHeart, BookUser, ShieldCheck, Plane,
  type LucideIcon,
} from "lucide-react"
import React from "react"

const iconMap: Record<string, LucideIcon> = {
  BadgeCheck, ShoppingBag, Clock, GraduationCap, Shield, CreditCard,
  Hospital, Stethoscope, MessageCircleHeart, BookUser, ShieldCheck, Plane,
}

type BannerItem = { id: number; text: string; icon?: string }

const CarouselTextBanner = ({ items }: { items: BannerItem[] }) => {
  if (!items || items.length === 0) return null

  return (
    <div className="bg-gray-200 dark:bg-primary py-4">
      <Marquee gradient={false} speed={40} pauseOnHover={true}>
        {items.map(({ id, text, icon }) => {
          const Icon = icon ? (iconMap[icon] ?? BadgeCheck) : BadgeCheck
          return (
            <div key={id} className="mx-4 min-w-[250px] flex justify-center items-center">
              <Card className="shadow-none border-none bg-transparent">
                <CardContent className="flex flex-row justify-center items-center gap-2 py-0 text-center">
                  <Icon className="text-primary w-4 h-4" />
                  <p className="sm:text-base text-xs text-wrap dark:text-secondary">{text}</p>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </Marquee>
    </div>
  )
}

export default CarouselTextBanner
