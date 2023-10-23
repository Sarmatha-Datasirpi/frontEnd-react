import Error_500 from "./Error_500";
import React, { useEffect, useCallback, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";



export function ErrorModal({
    showModal,
    setShowModal,

    modalProps,

}) {
    const closeModal = (e) => {
        setShowModal(false);
    };
    const keyPress = useCallback(
        (e) => {
            if (e.key === "Escape" && showModal) {
                setShowModal(false);
            }
        },
        [setShowModal, showModal]
    );
    useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
    }, [keyPress]);
    const [key, setKey] = useState("general");

    return (
        <>
            {(() => {
                switch (modalProps.section) {
                    case "Error_500":
                        return (
                            <Error_500
                                showModal={showModal}
                                setShowModal={setShowModal}
                            />
                        );
                    case "Error_404":
                        return (
                            <Error_500
                                showModal={showModal}
                                setShowModal={setShowModal}
                            />
                        );
                    case "Error_400":
                        return (
                            <Error_500
                                showModal={showModal}
                                setShowModal={setShowModal}
                            />
                        );
                }
            })()}
        </>
    );
}
