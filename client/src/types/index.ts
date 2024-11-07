export interface CardProps {
    id: number;
    title: string;
    color: string;
    count: number;
    tasks?: TaskProps[];
}

export interface TaskProps {
    id: number;
    list: number;
    progressList: number;
    title: string;
    clients: {
        id: number;
        name: string;
        image: string;
    }[];
    contributor: {
        count: number;
        recentContributors: {
            id: number;
            name: string;
            image: string;
        }[];
    };
    commentCount: number;
    attachments: AttachmentProps[];
    createdAt: string;
    cardId?: number;
}

export interface AttachmentProps {
    id: number;
    name: string;
    images: string | string[];
}

export interface AppState {
    tasks: TaskProps[];
    selectedTask: TaskProps | null;
    modal: ModalProps;
    cardsData: CardsProps;
}

export interface ModalProps {
    status: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    taskId?: number;
    cardId?: number;
    attachments?: AttachmentProps[];
}

export interface CardsProps {
    isLoading?: boolean;
    cards?: CardProps[] | undefined | null;
    error?: unknown | null;
    isError?: boolean;
}

export interface UploadAttachmentProps {
    cardId: number;
    taskId: number;
    id: number;
    name: string;
    images: string | string[];
}

export type AppAction =
    | { type: "INITIATE_DATA"; payload: CardsProps }
    | { type: "SET_TASKS"; payload: TaskProps[] }
    | { type: "SELECT_TASK"; payload: TaskProps | null }
    | { type: "TOGGLE_MODAL"; payload: ModalProps };
