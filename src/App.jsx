import  { useContext, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { Context } from "./context/Context"; // Import your Context

const App = () => {
    const { loadPreviousPrompts } = useContext(Context); // Destructure loadPreviousPrompts from context

    useEffect(() => {
        loadPreviousPrompts(); // Load previous prompts on component mount
    }, [loadPreviousPrompts]); // Dependency array to prevent unnecessary calls

    return (
        <>
            <div className="flex animate-fadeIn duration-1000">
                <Sidebar />
                <MainContent />
            </div>
        </>
    );
};

export default App;
