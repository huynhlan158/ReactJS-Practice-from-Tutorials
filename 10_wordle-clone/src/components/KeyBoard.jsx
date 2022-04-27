import { useEffect, useCallback, memo } from 'react'
import { useBoard } from '../helpers'

import Key from './Key'

function KeyBoard () {
    const {onSelectLetter, onEnter, onDelete, disabledLetters} = useBoard()

    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"]

    const handleKeyBoard = useCallback(event => {
        if (event.key === 'Enter') {
            onEnter()
        } else if (event.key === 'Backspace') {
            onDelete()
        } else {
            keys1.forEach(key => {
                if(event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key)
                }
            })
            keys2.forEach(key => {
                if(event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key)
                }
            })
            keys3.forEach(key => {
                if(event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key)
                }
            })
        }
    })

    useEffect(() => {
        document.addEventListener('keydown', handleKeyBoard)

        return () => {
            document.removeEventListener('keydown', handleKeyBoard)
        }
    }, [handleKeyBoard])

    return (
        <div className="keyboard" onKeyDown={handleKeyBoard}>
            <div className="line1">
                {keys1.map(key => (
                    <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />
                ))}
            </div>
            <div className="line2">
                {keys2.map(key => (
                    <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />
                ))}
            </div>
            <div className="line3">
                <Key bigKey keyVal='ENTER' />
                {keys3.map(key => (
                    <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />
                    ))}
                <Key bigKey keyVal='DELETE' />
            </div>
        </div>
    )
}

export default KeyBoard