export type Todo = {
    id: number;
    status: 'pending' | 'working' | 'completed';
    title: string;
};

export type InputForm = {
    title: string;
    status: 'pending' | 'working' | 'completed';
}

export interface Weather {
    weather: { icon: string; description: string }[];
    main: { temp: number };
    wind: { speed: number };
}
