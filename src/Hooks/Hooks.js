import { useCallback, useState } from "react";

export function usePaginate() {
    const [state, setState] = useState({
        data: [],
        current_page: 1,
        last_page: null,
        perPage: 0,
    });

    const slNo = (index) =>
        (state.current_page - 1) * state.perPage + (index + 1);

    const isListEmpty = useCallback(() => {
        return state.data.length === 0;
    }, [state]);

    return {
        pageCount: state.last_page,
        currentPage: state.current_page - 1,
        realPageNo: state.current_page,
        collection: state.data,
        perPage: state.perPage,
        slNo,
        setPagination: (newData) => {
            setState((prevState) => ({
                data: [...newData?.data],
                current_page: newData.current_page,
                last_page: newData.last_page,
                perPage: newData.per_page,
            }));
        },
        isListEmpty,
        setState,
    };
}