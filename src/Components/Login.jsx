import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import * as z from "zod";

export default function Login() {
    const inputBox1 = useRef();
    const inputBox2 = useRef();
    const inputBox3 = useRef();
    const inputBox4 = useRef();
    const emailInput = useRef();

    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState("");

    const buttonAction = useCallback(async function () {
        if (inputBox1.current.value && inputBox2.current.value && inputBox3.current.value && inputBox4.current.value) {
            // send otp to the backend server for verification
            const response = await fetch("http://localhost:3000/otp/verify-otp", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                    otp: `${inputBox1.current.value}${inputBox2.current.value}${inputBox3.current.value}${inputBox4.current.value}`
                })
            })

            const output = await response.json();

            if(response.status === 500 || response.status === 400 || response.status === 410 || response.status === 401) {
                alert(output.msg);
                return
            }

            alert(output.msg);
            navigate("/");

            return;
            
        }

        alert("Invalid OTP");
        inputBox4.current.focus();
    }, [userEmail])

    const checkNumbers = useCallback(function(value) {
        return parseInt(value) || parseInt(value) === 0 ? true : false; 
    }, [])

    useEffect(() => {
        // want to run only once when the component renders
        userEmail && inputBox1.current.focus();
    }, [userEmail]);

    useEffect(() => {
        emailInput.current.focus();
    }, []);

    return (
        <div className="login-container" style={{
            display: "flex", flexDirection: "column", gap: 20, alignItems: "center"
        }}>
            {!userEmail && <div className="login-input" style={{
                display: "flex", flexDirection: "column", gap: 20
            }}>
                <div className="heading" style={{
                    fontSize: 30, 
                }}>
                    {"Login via OTP"}
                </div>

                <input ref={emailInput} type="email" placeholder="enter valid email" />
            </div>}

            {userEmail && <div className="input-box-container" style={{
                display: "flex", flexDirection: "row", gap: 20
            }}>
                {/* input box 1 */}
                {/* type, inputMode numeric does not check if the user has added alphabets or numbers but provides number style keyword in mobile design */}
                <input type="tel" inputMode="numeric" pattern="\d*" onMouseDown={(event) => event.preventDefault()} ref={inputBox1} onInput={(event) => {
                    if (event.target.value) {
                        inputBox2.current.focus();
                        return
                    }
                }} style={{
                    borderRadius: "50%", aspectRatio: 1, width: 30, textAlign: "center", border: 0, cursor: "default"
                }} onKeyDown={(event) => {
                    // event.target.value represent the current value of the input box
                    if (event.key === "Backspace" && !event.target.value) {
                        event.preventDefault(); // prevent the default nature of the event
                        return
                    } 

                    if(event.key === "Backspace") {
                        return;
                    }
                    
                    // empty string is converted into 0
                    const result = checkNumbers(event.key);
                    if(!result) {
                        event.preventDefault();
                        return
                    }

                    if(inputBox1.current.value) {
                        inputBox2.current.focus();
                    }
                    
                }} />
                {/* input box 2 */}
                <input onMouseDown={(event) => event.preventDefault()} ref={inputBox2} onInput={(event) => {
                    // onInput fires when actually new value is inserted inside the input box if no value is inserted inside the box than it will not fired
                    if (event.target.value) {
                        inputBox3.current.focus();
                        return
                    }
                }} style={{
                    borderRadius: "50%", aspectRatio: 1, width: 30, textAlign: "center", border: 0, cursor: "default"
                }} onKeyDown={(event) => {
                    if (event.key === "Backspace" && !event.target.value) {
                        // Backspace key cleares the current focus input in our case it will be box 1 so we need to prevent the default action (below more description is given)
                        event.preventDefault();
                        inputBox1.current.focus();
                        return
                    }

                    if(event.key === "Backspace") {
                        return;
                    }

                    const result = checkNumbers(event.key);
                    if(!result) {
                        event.preventDefault();
                        return
                    }

                    if(inputBox2.current.value) {
                        inputBox3.current.focus();
                    }
                }} />
                {/* input box 3 */}
                <input onMouseDown={(event) => event.preventDefault()} ref={inputBox3} onInput={(event) => {
                    if (event.target.value) {
                        inputBox4.current.focus();
                        return
                    }
                }} style={{
                    borderRadius: "50%", aspectRatio: 1, width: 30, textAlign: "center", border: 0, cursor: "default"
                }} onKeyDown={(event) => {
                    if (event.key === "Backspace" && !event.target.value) {
                        event.preventDefault();
                        inputBox2.current.focus();
                        return
                    }

                    if(event.key === "Backspace") {
                        return;
                    }

                    const result = checkNumbers(event.key);
                    if(!result) {
                        event.preventDefault();
                        return
                    }

                    if(inputBox3.current.value) {
                        inputBox4.current.focus();
                    }
                }} />
                {/* input box 4 */}
                <input onMouseDown={(event) => event.preventDefault()} ref={inputBox4} onInput={(event) => {
                    // can automaitcally call the button action
                    buttonAction();

                }} style={{
                    borderRadius: "50%", aspectRatio: 1, width: 30, textAlign: "center", border: 0, cursor: "default"
                }} onKeyDown={(event) => {
                    if (event.key === "Backspace" && !event.target.value) {
                        event.preventDefault();
                        inputBox3.current.focus();
                        return;
                    }

                    if(event.key === "Backspace") {
                        return;
                    }

                    // to add only 1 number inside the input box
                    if(event.key !== "Backspace" && event.target.value.length >= 1) {
                        event.preventDefault();
                        return;
                    }

                    const result = checkNumbers(event.key);
                    if(!result) {
                        event.preventDefault();
                        return
                    }
                }} />


            </div>}

            <button onClick={() => {
                userEmail ? buttonAction() : ( async function() {
                    // this is called iife
                    const emailSchema = z.string().email();

                    if(!emailSchema.safeParse(emailInput.current.value).success) {
                        alert("enter valid email")
                        return;
                    }
                    // send request for otp
                    const response = await fetch("http://localhost:3000/otp/get-otp", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: emailInput.current.value
                        })
                    })

                    const output = await response.json();
                    console.log(emailInput.current.value);
                    if(response.status === 200) {
                        setUserEmail(emailInput.current.value);
                        alert(output.msg)
                        return
                    }

                    alert(output.msg)
                    

                })();
            }}>
                {userEmail ? "Submit OTP" : "Send OTP"}
            </button>
        </div>
    )
}

// will be making login based sytem using useRef hook 


/*

When you press a key on your keyboard, like the letter "A", here's the sequence of events that happens inside a browser:

"onKeyDown" fires first — this is your chance to intercept or respond to the key press before the character shows up in the input box.

The browser inserts the character into the input (e.g., now the box shows “A”). if the a key is pressed that does not changes the value than the onInput will not be called because the browser does not add the character inside the box

onKeyPress (deprecated) — used to fire after printable keys, but not commonly used anymore.

"onInput" fires — this happens after the value inside the box has changed. "onInput" fires only if the input’s value actually changes. means if we press a key that does not allow change in the value like tab, shift etc than it will not be called

"onKeyUp" fires — once you release the key.

// input box events will occur on the current element focused not on the element on which it is fired (Even if an event (like a keyboard event) originates from one element, if you change the focus during the event (like using .focus()), then the default browser behavior (like inserting or deleting text) will apply to the element that is focused at the time the browser finishes the event — not necessarily the one where the event started.)

*/