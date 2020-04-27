export interface Dish {
    _id: string,
    name: string;
    description: string;
    image: string;
    category: string;
    label: string;
    price: number;
    comments: string[];  //TODO: replace by Comment[]
};
