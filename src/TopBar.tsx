import React from "react";

export default function TopBar() {
    return (
        <div className="navbar navbar-dark bg-success">
            <div className="container">
                <div className="navbar-brand">
                    <img alt="Sappo Logo" width={50} height={80} src="logo.jpg"/>
                    <h2 className="d-inline-block ml-3">Sappo</h2>
                </div>
            </div>
        </div>
    )
}
