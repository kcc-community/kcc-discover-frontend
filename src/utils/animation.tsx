import React, { ReactNode } from 'react';
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';

interface FadeUpProps {
  children?: ReactNode
  delay?: number
  onClick?: () => void 
  playScale?: number
}

export function FadeInUp({ children, playScale = 0.1, delay, onClick }: FadeUpProps) {
  return (
    // @ts-ignore
    <OverPack playScale={playScale} replay={false} always={false}>
      <TweenOne
        animation={{ opacity: 1, y: -50, delay }}
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <div onClick={onClick} style={{ transform: 'translateY(50px)', display: 'inherit', pointerEvents: 'auto' }}>
          {children}
        </div>
      </TweenOne>
    </OverPack>
  )
}

export function FadeInLeft({ children, playScale = 0.2 }) {
  return (
    <OverPack playScale={playScale}>
      <TweenOne
        animation={{ opacity: 1, x: 20 }}
        style={{ opacity: 0, transform: 'translateX(-20)' }}
      >
        {children}
      </TweenOne>
    </OverPack>
  )
}


export function FadeInRight({ children, playScale = 0.2 }) {
  return (
    <OverPack playScale={playScale}>
      <TweenOne
        animation={{ opacity: 1, x: -20 }}
        style={{ opacity: 0, transform: 'translateX(20)' }}
      >
        {children}
      </TweenOne>
    </OverPack>
  )
}