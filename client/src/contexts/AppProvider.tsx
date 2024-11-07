import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { AppAction, AppState } from "../types";
import appReducer from "./appReducer";
import { initiateAppData } from "./actions";

const initialState: AppState = {
    tasks: [],
    selectedTask: null,
    modal: {
        status: false,
        taskId: undefined,
        cardId: undefined,
        attachments: [],
    },
    cardsData: {
        isLoading: false,
        cards: null,
        isError: false,
    },
};

const AppContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<React.Dispatch<AppAction> | undefined>(
    undefined
);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        initiateAppData(dispatch);
    }, [dispatch]);

    return (
        <AppContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppState {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppDispatch(): React.Dispatch<AppAction> {
    const context = useContext(AppDispatchContext);
    if (context === undefined) {
        throw new Error("useAppDispatch must be used within an AppProvider");
    }
    return context;
}
