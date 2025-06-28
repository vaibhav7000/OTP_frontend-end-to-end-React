import { useEffect } from "react";
import { useRef } from "react";

export default function Login() {
    const inputBox1 = useRef();
    const inputBox2 = useRef();
    const inputBox3 = useRef();
    const inputBox4 = useRef();

    useEffect(() => {
        // want to run only once when the component renders
        inputBox1.current.focus();
    }, []);

    return (
        <div className="login-container" style={{
            display: "flex", flexDirection: "column", gap: 20, alignItems: "center"
        }}>
            <div className="input-box-container" style={{
                display: "flex", flexDirection: "row", gap: 20
            }}>
                <input onMouseDown={(event) => event.preventDefault()} ref={inputBox1} maxLength={"1"} onInput={(event) => {
                    if(!event.target.value) {
                        return
                    }
                    inputBox2.current.focus();
                }} style={{
                    borderRadius: "50%", aspectRatio: 1, width: 30, textAlign: "center", border: 0
                }} onKeyDown={(event) => {
                    if(event.key === "Backspace" && !event.target.value) {
                        return;
                    }
                }}/>
                <input ref={inputBox2} maxLength={"1"} onInput={(event) => {
                    if(!event.target.value) {
                        inputBox1.current.focus();
                        return
                    }
                    inputBox3.current.focus();
                }} style={{
                    borderRadius: "50%", aspectRatio: 1, width: 30, textAlign: "center", border: 0
                }} onKeyDown={(event) => {
                    if(event.key === "Backspace" && !event.target.value) {
                        inputBox1.current.focus();
                    }
                }}/>
                <input ref={inputBox3} maxLength={"1"} onInput={(event) => {
                    if(!event.target.value) {
                        inputBox2.current.focus();
                        return
                    }
                    inputBox4.current.focus();
                }} style={{
                    borderRadius: "50%", aspectRatio: 1, width: 30, textAlign: "center", border: 0
                }} onKeyDown={(event) => {
                    if(event.key === "Backspace" && !event.target.value) {
                        inputBox2.current.focus();
                    }
                }} />
                <input ref={inputBox4} maxLength={"1"} onInput={(event) => {
                    if(!event.target.value) {
                        inputBox3.current.focus();
                        return
                    }
                }} style={{
                    borderRadius: "50%", aspectRatio: 1, width: 30, textAlign: "center", border: 0
                }} onKeyDown={(event) => {
                    if(event.key === "Backspace" && !event.target.value) {
                        inputBox3.current.focus();
                    }
                }}/>

                
            </div>

            <button onClick={() => {
                if(inputBox1.current.value && inputBox2.current.value && inputBox3.current.value && inputBox4.current.value) {
                    // send otp to the backend server for verification
                    return
                }

                alert("Invalid OTP");
            }}>
                Submit
            </button>
        </div>
    )
}

// will be making login based sytem using useRef hook 


/*

When you press a key on your keyboard, like the letter "A", here's the sequence of events that happens inside a browser:

onKeyDown fires first — this is your chance to intercept or respond to the key press before the character shows up in the input box.

The browser inserts the character into the input (e.g., now the box shows “A”).

onKeyPress (deprecated) — used to fire after printable keys, but not commonly used anymore.

onInput fires — this happens after the value inside the box has changed.

onKeyUp fires — once you release the key.

*/