import { Author } from './author.types';

export type AssetConnection = {
    edges: AssetEdge[];
}

export type AssetEdge = {
    node: Asset;
}

export type Asset = {
    url: string;
}

export type JsonContent = {
    type: string;
    attrs?: object;
    uid: string;
    children: JsonNode[];
}

export type JsonNode = {
    type: string;
    attrs?: object;
    uid: string;
    children?: JsonNode[];
    text?: string;
    bold?: boolean;
    italic?: boolean;
}

export type Link = {
    href: string;
    title: string;
}

export type BookAuthorrefConnection = {
    edges: BookAuthorrefEdge[];
};

export type BookAuthorrefEdge = {
    node: Author;
};

export interface LoadMoreVariables {
    limit?: number;
    skip?: number;
}