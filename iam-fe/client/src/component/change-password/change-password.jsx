import InfoBox from "../../common/info-box/info-box";
import Loading from "../../common/loading/loading";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserCrud } from "../../hooks/crud/useUserCrud";

function ChangePassword() {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(0);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const { changePassword } = useUserCrud({ setLoading, setError, setInfo, setReload });

    const handleSubmit = async (e) => {
        e.preventDefault();
        changePassword({
            newConfirmedPassword: confirmPassword,
            newPassword,
            oldPassword
        });
    };

    return (
        <div id="change-password" className="section-center-horizontal">
            <div className="block w-full" style={{ maxWidth: "480px" }}>
                <div className="title mb-md">Change Password</div>
                <p className="text-muted mb-md">
                    Keep your account secure by updating your password regularly. Make sure your new password is strong and memorable.
                </p>

                <form className="flex-col" onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        placeholder="Enter old password"
                        className="p-md border-rounded mb-sm"
                    />

                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Enter new password"
                        className="p-md border-rounded mb-sm"
                    />

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm new password"
                        className="p-md border-rounded mb-sm"
                    />

                    <button className="black-button p-md border-rounded mb-sm" type="submit">
                        Request change password
                    </button>
                </form>
            </div>

            {loading && <Loading />}
            {error && (
                <InfoBox
                    message={error}
                    title="Error"
                    onClose={() => setError(null)}
                />
            )}
            {info && (
                <InfoBox
                    title="Information"
                    message={info}
                    onClose={() => {
                        setInfo(null);
                        navigate("/login");
                    }}
                />
            )}
        </div>
    );
}

export default ChangePassword;
