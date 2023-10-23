import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

function AdminCondition() {
    const dispatch = useDispatch();
    const { user, usersDataList } = useSelector((state) => ({
        user: state.Profile.user,
        usersDataList: state.Users.usersDataList,
    }));

    useEffect(() => {
        if (sessionStorage.getItem("authUser")) {
            const obj = JSON.parse(sessionStorage.getItem("authUser"));

            if (!isEmpty(user)) {
                obj.data.username = user.username;
                sessionStorage.removeItem("authUser");
                sessionStorage.setItem("authUser", JSON.stringify(obj));
            }
        }
    }, [user]);

    const sessionstoragedata = JSON.parse(sessionStorage.getItem("authUser"));
    const sessionUsername = sessionstoragedata.username;

    const currentUser = usersDataList.find(
        (user) => user.username === sessionUsername
    );

    const isAdmin = currentUser && currentUser.roles.includes("ROLE_ADMIN");

    return (
        <div>
            {isAdmin ? <p>You are an admin!</p> : <p>You are not an admin.</p>}
        </div>
    );
}

export default AdminCondition;
