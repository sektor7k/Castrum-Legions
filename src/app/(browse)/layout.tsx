import { Navbar } from "./_components/navbar";
import { Suspense } from "react";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div >
            <Navbar />

            {children}

        </div>
    );
};

export default BrowseLayout;