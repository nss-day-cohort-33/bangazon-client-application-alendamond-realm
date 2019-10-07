import { useState, useEffect } from "react"

const useModal = selector => {

    const [modalIsOpen, setIsOpen] = useState(true)

    function toggleDialog(visible) {
        setIsOpen(!visible)
    }

    useEffect(() => {
        if (modalIsOpen) {
            document.querySelector(`${selector}`).close()
        } else {
            document.querySelector(`${selector}`).show()
        }
    })

    return { toggleDialog, modalIsOpen }
}

export default useModal