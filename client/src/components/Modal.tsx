import React, { useState, useRef, DragEvent } from "react";
import { useApp, useAppDispatch } from "../contexts/AppProvider";
import { closeModal, uploadAttachments } from "../contexts/actions";
import Loading from "./Loading";
import { API_URL } from "../contexts/actionsTypes";
import { AttachmentProps } from "../types";

const Modal: React.FC = () => {
    const [name, setName] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();
    const { modal } = useApp();

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    };

    const handleFiles = (selectedFiles: File[]) => {
        setFiles([...files, ...selectedFiles]);

        // Generate previews
        selectedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    function handleReset() {
        setName("");
        setFiles([]);
        setPreviews([]);
    }
    function handleCloseModal() {
        handleReset();
        dispatch(closeModal());
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("taskId", String(modal.taskId));
            formData.append("cardId", String(modal.cardId));
            formData.append("name", name);

            files.forEach((file) => {
                formData.append("images[]", file);
            });

            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                alert("Upload failed");
                throw new Error("Upload failed");
            }

            const data = (await response.json()) as {
                status: string;
                data: AttachmentProps;
            };
            if ("status" in data && data.status === "success") {
                dispatch(uploadAttachments(data.data));
            }

            handleReset();
        } catch (error) {
            alert("Error uploading files!");
            console.error("Error uploading files:", error);
        } finally {
            setIsLoading(false);
        }
    }

    if (!modal.status) return null;

    return (
        <>
            <Loading value={isLoading} />
            <div className="fixed bg-black/30 w-full flex items-center justify-center h-screen z-10">
                <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-800">
                            All Attachments
                        </h2>
                        <button
                            onClick={handleCloseModal}
                            className="text-slate-500 hover:text-slate-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="overflow-x-auto has-scrollbar mb-5 max-h-[30vh]">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Images
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {modal.attachments &&
                                    modal.attachments.map((attachment) => {
                                        let imageUrls: string[] = [];
                                        try {
                                            imageUrls = JSON.parse(
                                                attachment.images as string
                                            );
                                        } catch (error) {
                                            console.warn(
                                                "Failed to parse images:",
                                                error
                                            );
                                            imageUrls = Array.isArray(
                                                attachment.images
                                            )
                                                ? attachment.images
                                                : [];
                                        }

                                        return (
                                            <tr key={attachment.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 break-words">
                                                    {attachment.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        {imageUrls.map(
                                                            (image, index) => (
                                                                <img
                                                                    key={index}
                                                                    src={`${API_URL}/images/${image}`}
                                                                    alt={`${
                                                                        attachment.name
                                                                    } - ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="size-10 object-cover rounded"
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-800">
                            Attach Files
                        </h2>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Images
                            </label>
                            <div
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        handleFiles(
                                            Array.from(e.target.files || [])
                                        )
                                    }
                                />
                                <p className="text-sm text-slate-600">
                                    Drag and drop files here or click to select
                                </p>
                            </div>

                            {previews.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-2 max-h-40 overflow-y-scroll has-scrollbar">
                                    {previews.map((preview, index) => (
                                        <div
                                            key={index}
                                            className="relative aspect-square"
                                        >
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;
