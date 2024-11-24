"use server"

import { cookies } from "next/headers";

const getCookies = async () => {
    const cookie = await cookies();
    const myCookie = cookie.get("authToken");
    return myCookie;
}

export default getCookies;