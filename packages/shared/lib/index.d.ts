export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type Query = {
    __typename?: 'Query';
    _?: Maybe<Scalars['Boolean']>;
    me?: Maybe<User>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    _?: Maybe<Scalars['Boolean']>;
    signInUser?: Maybe<User>;
};
export declare type User = {
    __typename?: 'User';
    name: Scalars['String'];
    email: Scalars['String'];
    photoUrl?: Maybe<Scalars['String']>;
    chargesEnabled: Scalars['Boolean'];
    id: Scalars['ID'];
};
