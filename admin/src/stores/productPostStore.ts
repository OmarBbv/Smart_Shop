import { create } from "zustand";

type Features = {
    status?: string;
    delivery?: string;
    price?: number | null;
    [key: string]: any;
};

export type Post = {
    name: string,
    categoryId: number | null,
    images: File[]
    features: Features;
    description: string,
    price: number | null
};

type State = {
    currentPost: Post;
    setCurrentPost: (post: Partial<Post>) => void;
    updateFeature: (name: string, value: string | number | null) => void;
    resetCurrentPost: () => void;
};

export const usePostStore = create<State>((set, get) => ({
    currentPost: {
        name: '',
        description: '',
        categoryId: null,
        price: null,
        images: [],
        features: {},
    },
    setCurrentPost: (post) =>
        set((state) => ({
            currentPost: {
                ...state.currentPost,
                ...post,
                features: {
                    ...state.currentPost.features,
                    ...(post.features || {}),
                },
            },
        })),
    updateFeature: (name, value) => {
        const currentFeatures = get().currentPost.features || {};
        set((state) => ({
            currentPost: {
                ...state.currentPost,
                features: {
                    ...currentFeatures,
                    [name]: value,
                },
            },
        }));
    },
    resetCurrentPost: () =>
        set({
            currentPost: {
                name: '',
                price: null,
                categoryId: null,
                description: '',
                images: [],
                features: {},
            },
        }),
}));
