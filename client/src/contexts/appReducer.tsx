import type {
    AppAction,
    AppState,
    CardProps,
    CardsProps,
    ModalProps,
    UploadAttachmentProps,
} from "../types";
import {
    INITIATE_DATA,
    TOGGLE_MODAL,
    UPLOAD_ATTACHMENTS,
} from "./actionsTypes";

let payload: UploadAttachmentProps;

export default function appReducer(
    state: AppState,
    action: AppAction
): AppState {
    switch (action.type) {
        case "SET_TASKS":
            return {
                ...state,
                tasks: action.payload,
            };
        case UPLOAD_ATTACHMENTS:
            payload = action.payload as UploadAttachmentProps;

            return {
                ...state,
                modal: {
                    ...state.modal,
                    attachments: [payload, ...(state.modal?.attachments || [])],
                },
                cardsData: {
                    ...state.cardsData,
                    cards: state.cardsData?.cards?.map((card: CardProps) => {
                        if (card.id === payload.cardId) {
                            return {
                                ...card,
                                tasks: card?.tasks?.map((task) => {
                                    if (task.id === payload.taskId) {
                                        return {
                                            ...task,
                                            attachments: [
                                                payload,
                                                ...(task?.attachments || []),
                                            ],
                                        };
                                    }

                                    return task;
                                }),
                            };
                        }

                        return card;
                    }),
                },
            }; // In case payload is null or undefined

        case TOGGLE_MODAL:
            return {
                ...state,
                modal: { ...state.modal, ...(action.payload as ModalProps) },
            };
        case INITIATE_DATA:
            return {
                ...state,
                cardsData: {
                    ...state.cardsData,
                    ...(action.payload as CardsProps),
                },
            };
        default:
            return state;
    }
}
