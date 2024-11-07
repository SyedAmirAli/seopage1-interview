import type { CSSProperties } from "react";
import type { CardProps, TaskProps } from "../types";
import CardItem from "./CardItem";
import React from "react";

const Card: React.FC<CardProps> = ({ title, color, count, id, tasks }) => {
    return (
        <div className="min-w-[400px] px-3 pb-3 pt-1 bg-slate-100 rounded-xl">
            <div className="w-full px-4 pb-2 pt-4 flex justify-between items-center">
                <h3 className="flex items-center gap-2">
                    {color.length > 0 && (
                        <span
                            className="h-7 w-6 rounded-l-full bg-red-500 block"
                            style={{ backgroundColor: color }}
                        ></span>
                    )}
                    <span className="text-slate-600 font-semibold text-lg">
                        {title}
                    </span>
                </h3>

                <button className="bg-slate-200 size-10 text-lg text-slate-700 rounded-md font-bold">
                    {count}
                </button>
            </div>
            <div
                className="w-full overflow-x-hidden overflow-y-scroll max-h-[80vh] pr-2 has-scrollbar"
                style={{ "--scrollbar-size": "8px" } as CSSProperties}
            >
                <div className="w-full">
                    {Array.isArray(tasks) &&
                        tasks.map((task: TaskProps) => (
                            <CardItem key={task.id} {...task} cardId={id} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Card;
