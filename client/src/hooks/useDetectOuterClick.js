import { useEffect } from "react";

export default function useDetectOuterClick(ref, component , setComponent) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!ref.current.contains(event.target)) {
                setComponent(false);
                if (component === "ComposeNote") {
                    console.log("Hello");
                    document.getElementById("blurer").style.display = "none"
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
}