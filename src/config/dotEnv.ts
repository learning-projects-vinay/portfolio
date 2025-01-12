import DotEnv from "../types/config/dotEnv";

const dotEnv: DotEnv = {
    PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "",
    APP_URL: process.env.NEXT_APP_URL ?? "",
};

export default dotEnv;
