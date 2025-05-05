import {useEffect, useRef, useState} from 'react'
import './animation.css'
import { ANIMATIONS } from './animations'
import { CLASSNAMES } from './styles'
import { TPopup } from './types'

export const PopupTemplate = ({
                                  children,
                                  title,
                                  closing,
                                  isOpen,
                                  setIsOpen,
                                  position = 'center',
                              }: TPopup) => {
    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsOpen(false)
            setIsClosing(false)
        }, 350)
    }

    useEffect(() => {
        if (closing) {
            handleClose();
        }
    }, [closing]);

    const windowRef = useRef<HTMLDivElement | null>(null)

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
            handleClose()
        }
    }

    const [isClosing, setIsClosing] = useState(false)

    const variant = CLASSNAMES[position]
    const animation = isClosing
        ? ANIMATIONS.close[position]
        : ANIMATIONS.open[position]

    return (
        isOpen && (
            <div className={CLASSNAMES.POPUP} onClick={handleOverlayClick}>
                <div ref={windowRef} className={`${variant.WINDOW} ${animation}`}>
                    <div className={variant.PANEL}>
                        <p className={variant.TITLE}>{title}</p>
                        <button className={variant.CLOSE_BUTTON} onClick={handleClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className={variant.POPUP_CONTENT}>{children}</div>
                </div>
            </div>
        )
    )
}