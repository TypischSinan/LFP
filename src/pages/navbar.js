import React from "react";

const Navbar = ({ navigateTo }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-300 p-4 flex justify-between rounded-lg">
            <button onClick={() => navigateTo("/")} 
            className="text-slate-500 font-bold"
            >
                Dashboard
            </button>
            <button
                onClick={() => navigateTo("/overview")}
                className="text-slate-500 font-bold"
            >
                Übung
            </button>
            <button
                onClick={() => navigateTo("/exam")}
                className="text-slate-500 font-bold"
            >
                Prüfung
             </button>
            </div>
    );
};

export default Navbar;