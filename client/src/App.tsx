import React, { CSSProperties } from "react";
import Card from "./components/Card";
import { CardProps } from "./types";
import Modal from "./components/Modal";
import { useApp } from "./contexts/AppProvider";
import Loading from "./components/Loading";

const App: React.FC = () => {
    const { cardsData } = useApp();

    return (
        <div className="w-full flex justify-center items-center min-h-screen px-10 py-4">
            {Array.isArray(cardsData.cards) && (
                <div
                    className="w-full bg-white flex gap-5 overflow-x-scroll overflow-y-hidden pb-4 has-scrollbar"
                    style={{ "--scrollbar-size": "12px" } as CSSProperties}
                >
                    {cardsData.cards?.map((card: CardProps) => (
                        <Card key={card.id} {...card} />
                    ))}
                </div>
            )}

            <Modal />
            <Loading value={cardsData.isLoading} />
        </div>
    );
};

export default App;
