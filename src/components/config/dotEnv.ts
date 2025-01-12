import DotEnv from "../../types/config/dotEnv";

const dotEnv: DotEnv = {
    PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "",
};

export default dotEnv;
