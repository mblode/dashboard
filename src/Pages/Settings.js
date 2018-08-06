import React from "react";

import SettingsForm from "../Components/SettingsForm";

const Settings = () => (
    <section className="section-card">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <h2 className="settings-name">Settings</h2>
                    <SettingsForm />
                </div>
            </div>
        </div>
    </section>
);

export default Settings;
