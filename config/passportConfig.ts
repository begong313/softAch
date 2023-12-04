interface PassportConfig {
    setting: {
        session: boolean;
        failureRedirect: string;
    };
}

const passportConfig: PassportConfig = {
    setting: {
        session: false,
        failureRedirect: "/login-error",
    },
};

export default passportConfig;
