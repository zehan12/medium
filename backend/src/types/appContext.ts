interface AppBindings {
    DATABASE_URL: string;
    JWT_SECRET: string;
}

interface AppVariables {
    userId: string;
    username: string;
}

export type AppContext = {
    Bindings: AppBindings;
    Variables: AppVariables;
};
