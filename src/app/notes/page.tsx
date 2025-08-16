"use client"
import { useEffect, useState } from "react"

export default function Note() {
    const [upload, setUpload] = useState("");
    useEffect(() => {
        console.log("use effect here");
    }, [])


    return (
      <div className="flex flex-col">
        <textarea className="m-4 p-3 w-[50%] bg-white text-black"></textarea>
        <button 
            className="bg-gray-500"
            onClick={() => {
                setUpload("Upload");
                console.log(upload, "upload has been set");
            }}
        >
            Upload
        </button>
        <button className="bg-gray-500">2</button>
        <button className="bg-gray-500">Summarize</button>
      </div>
    )
}
