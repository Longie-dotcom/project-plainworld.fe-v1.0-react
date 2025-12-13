import Modal from "../modal/modal";

import './form-view.css';

import React, { useState, useEffect } from "react";

function FormView({
    visible,
    onClose,
    fields = [],
    initialData = {},
    onSubmit,
    title = "Form"
}) {
    if (!visible) return null;

    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (visible) {
            const transformed = { ...initialData };
            if (initialData?.dob) {
                transformed.dob = new Date(initialData.dob).toISOString().split("T")[0];
            }
            setFormData(transformed);
        }
    }, [visible]);

    const onChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Modal visible={visible} onClose={onClose}>
            <h2 className="modal-title mb-md">{title}</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                }}
                className="flex-col gap-md scroll-hidden"
            >
                {fields.map(f => {
                    switch (f.type) {
                        case "text":
                        case "email":
                        case "date":
                        case "password":
                            return (
                                <div key={f.name} className="flex-col mb-md">
                                    <label className="mb-xs">{f.label}</label>
                                    <input
                                        type={f.type}
                                        name={f.name}
                                        value={formData[f.name] || ""}
                                        onChange={e => onChange(f.name, e.target.value)}
                                        className="p-md border-rounded"
                                    />
                                </div>
                            );

                        case "select":
                            return (
                                <div key={f.name} className="flex-col mb-md">
                                    <label className="mb-xs">{f.label}</label>
                                    <select
                                        name={f.name}
                                        value={formData[f.name] || ""}
                                        onChange={e => onChange(f.name, e.target.value)}
                                        className="p-md border-rounded"
                                    >
                                        <option value="">--Select--</option>
                                        {f.options?.map(opt => (
                                            <option
                                                key={opt.value ?? opt}
                                                value={opt.value ?? opt}
                                            >
                                                {opt.label ?? opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );

                        case "multiple-choice":
                            return (
                                <div key={f.name} className="flex-col mb-md">
                                    <label className="mb-xs">{f.label}</label>

                                    <div className="flex-col gap-xs">
                                        {f.options?.map(opt => {
                                            const value = opt.value ?? opt;
                                            const label = opt.label ?? opt;
                                            const selected = (formData[f.name] || []).includes(value);

                                            return (
                                                <label key={value} className="flex-row gap-xs align-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name={f.name}
                                                        value={value}
                                                        checked={selected}
                                                        onChange={() => {
                                                            let current = formData[f.name] || [];
                                                            if (selected) {
                                                                current = current.filter(v => v !== value);
                                                            } else {
                                                                current = [...current, value];
                                                            }
                                                            onChange(f.name, current);
                                                        }}
                                                    />
                                                    <span>{label}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );

                        default:
                            return null;
                    }
                })}

                <div className="flex-row gap-sm justify-end mt-md">
                    <button className="black-button" type="submit">
                        Save
                    </button>
                    <button className="black-button" type="button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default FormView;
