import React from "react";
import assets from "../assets";
import { TaskProps } from "../types";
import { getAttachments, openModal } from "../contexts/actions";
import { useAppDispatch } from "../contexts/AppProvider";
import { API_URL } from "../contexts/actionsTypes";

const CardItem: React.FC<TaskProps> = ({
    id,
    clients,
    contributor,
    list,
    progressList,
    title,
    attachments,
    createdAt,
    commentCount,
    cardId,
}) => {
    const dispatch = useAppDispatch();

    function handleOpenModal() {
        dispatch(openModal({ status: true, taskId: id, cardId, attachments }));
    }

    const { count, images } = getAttachments(attachments);
    return (
        <div
            className="w-full p-4 bg-white rounded-md mt-3"
            id={`cardAndTask-${cardId}/${id}`}
        >
            <div className="w-full flex justify-between">
                {clients.map((client) => (
                    <figure
                        key={client.id}
                        className="flex items-center gap-2 text-lg font-bold"
                    >
                        <img
                            src={client.image}
                            alt={client.name}
                            className="size-10 rounded-full"
                        />
                        <figcaption className="text-md text-slate-700 font-medium">
                            {client.name}
                        </figcaption>
                    </figure>
                ))}
            </div>
            <div className="flex py-3">
                <p className="w-full flex gap-2 items-center justify-start">
                    <i className="block size-3.5 fill-slate-500">
                        {assets.svg.box}
                    </i>
                    <span className="block text-sm text-slate-500 font-medium">
                        {title.slice(0, 25) + "..."}
                    </span>
                </p>
                <p className="text-nowrap flex items-center justify-center gap-2 text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-md font-bold font-mono">
                    <i className="block size-3.5 mb-1.5 fill-slate-500">
                        {assets.svg.copy}
                    </i>
                    <span className="block pt-0.5">
                        {progressList}/{list}
                    </span>
                </p>
            </div>
            <div className="flex justify-between items-center">
                {contributor.recentContributors.map((com) => (
                    <img
                        key={com.id}
                        className="rounded-full size-10"
                        src={com.image}
                        alt={com.name}
                    />
                ))}

                <p className="p-3 bg-slate-100 rounded-full font-bold text-sm">
                    {contributor.count}+
                </p>
                <p className="flex items-center mt-1 px-px gap-2 h-full py-3 text-sm text-slate-700 fill-slate-600">
                    <i className="block size-5">{assets.svg.comment}</i>
                    <b className="block">{commentCount}</b>
                </p>
                <button
                    onClick={handleOpenModal}
                    className="group flex items-center mt-1 px-px gap-2 h-full py-3 text-sm text-slate-700 fill-slate-600 duration-500 hover:text-rose-500 hover:fill-rose-500 relative"
                >
                    <i className="block size-4">{assets.svg.attachment}</i>
                    <b className="block pt-px">{count}</b>

                    <figure className="absolute top-10 -left-5 p-2 gap-2 group-hover:flex hidden">
                        {images
                            .slice(0, 3)
                            .map((image: string, index: number) => (
                                <img
                                    key={index}
                                    src={`${API_URL}/images/${image}`}
                                    alt="attachment"
                                    className="size-10 p-1 bg-slate-200 rounded-full"
                                />
                            ))}

                        {images.length > 3 ? "..." : ""}
                    </figure>
                </button>
                <p className="flex items-center mt-1 px-px gap-2 h-full py-3 text-sm text-slate-700 fill-slate-600">
                    <i className="block size-4">{assets.svg.calender}</i>
                    <b className="block pt-px">{createdAt}</b>
                </p>
            </div>
        </div>
    );
};

export default CardItem;
