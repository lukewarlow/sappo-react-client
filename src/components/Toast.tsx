import React from "react";
import styles from "./Toast.module.css";

export default function Toast(props: IToastProps) {
    return (
        <div className={`position-relative ${styles['toast-container']}`}>
            <div className={`toast fade show position-absolute ${styles['toast-position']}`} role="alert">
                <div className="toast-header">
                    <strong>{props.title}</strong>
                    <button type="button" className="ml-2 mb-1 close float-right" data-dismiss="toast">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    {props.message}
                </div>
            </div>
        </div>
    )
}

export interface IToastProps {
    readonly title: string;
    readonly message: string;
}
