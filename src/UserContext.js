import React, {createContext, useEffect, useState} from "react";
import axiosInstance from "./axiosInstance";
import {useToast} from "@chakra-ui/toast";

export const UsersContext = createContext();

const initialState = {
    id: undefined,
    username: undefined,
    createdAt: undefined,
    articles: [],
    isAdmin: undefined,
    isAuthor: undefined,
};
export const UsersProvider = (props) => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [id, setId] = useState(parseInt(window.localStorage.getItem("id")));
    const [isAuth, setIsAuth] = useState(Boolean(token) && Boolean(id));
    const [user, setUser] = useState(initialState);

    useEffect(() => {
        axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (Boolean(token)) {
            getUser({id});
            setIsAuth(Boolean(token) && Boolean(id));
        }
    }, [token, id]);

    const toast = useToast();

    const disconnect = () => {
        console.log("deconnection");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");
        setToken(null);
        setId(0);
        setUser(initialState);
        setIsAuth(false);
    };

    const getUser = ({id}) => {
        axiosInstance
            .get("Users/" + id)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("error", error);
            });
    };

    const connect = ({accessToken, id}) => {
        window.localStorage.setItem("token", accessToken);
        window.localStorage.setItem("id", parseInt(id).toString());
        setId(id);
        setToken(accessToken);
    };

    return (
        <UsersContext.Provider
            value={{
                toast,
                token,
                connect,
                user,
                disconnect,
                isAuth,
            }}
        >
            {props.children}
        </UsersContext.Provider>
    );
};
