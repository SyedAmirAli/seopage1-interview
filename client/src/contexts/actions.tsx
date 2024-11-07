import { Dispatch } from "react";
import type {
    AppAction,
    AttachmentProps,
    CardProps,
    CardsProps,
    ModalProps,
} from "../types";
import {
    API_URL,
    INITIATE_DATA,
    TOGGLE_MODAL,
    UPLOAD_ATTACHMENTS,
} from "./actionsTypes";

export const uploadAttachments = (payload: AttachmentProps) =>
    ({ type: UPLOAD_ATTACHMENTS, payload } as AppAction);

export const openModal = (payload: ModalProps) =>
    ({ type: TOGGLE_MODAL, payload } as AppAction);

export const closeModal = (payload?: ModalProps) =>
    ({
        type: TOGGLE_MODAL,
        payload: payload || {
            status: false,
            taskId: undefined,
            cardId: undefined,
            attachments: undefined,
        },
    } as AppAction);

export const initiateData = (payload: CardsProps) =>
    ({ type: INITIATE_DATA, payload } as AppAction);

export async function initiateAppData(dispatch: Dispatch<AppAction>) {
    dispatch(initiateData({ cards: null, isLoading: true, isError: false }));

    try {
        const response = await fetch(`${API_URL}/`);
        const data = (await response.json()) as CardProps[];
        dispatch(
            initiateData({ cards: data, isLoading: false, isError: false })
        );
    } catch (error) {
        dispatch(
            initiateData({
                cards: null,
                isLoading: false,
                isError: true,
                error,
            })
        );

        alert("Server Error: Failed to fetch data");
    } finally {
        dispatch(initiateData({ isLoading: false, isError: false }));
    }
}

export function getAttachments(attachments: AttachmentProps[]): {
    count: number;
    images: string[];
} {
    let count = 0;
    const images: string[] = [];

    attachments.forEach((attachment) => {
        if (Array.isArray(attachment.images)) {
            count += attachment.images.length;
            images.push(...attachment.images);
        }

        try {
            const parseImage = JSON.parse(attachment.images as string);
            count += parseImage.length;
            images.push(...parseImage);
        } catch (error) {
            console.warn(error);
            return [];
        }
    });

    return { count, images };
}
