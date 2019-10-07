import React, {useRef} from "react"


export default ({toggleDialog, callback}) => {
    const name = useRef()

    return (
        <dialog id="dialog--itinerary" className="dialog--time">
            <label htmlFor="starttime">Name</label>
            <input ref={name} type="text" name="name" autoFocus required />

            <button onClick={() => {
                callback(name.current.value)
                name.current.value = ""
            }}>Add to Products</button>

            <button style={{
                position: "absolute",
                top: "0.25em",
                right: "0.25em"
            }}
                id="closeBtn"
                onClick={() => toggleDialog(false)}>X</button>
        </dialog>
    )
}