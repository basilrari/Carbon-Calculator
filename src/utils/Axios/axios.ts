import axios from "axios";

const myInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
})


const myInstanceNext= axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_devbackendurl}`,
    withCredentials: true,
})