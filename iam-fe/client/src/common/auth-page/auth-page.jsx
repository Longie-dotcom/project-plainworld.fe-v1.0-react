import InfoBox from "../info-box/info-box";
import Loading from "../loading/loading";
import IconHover from "../icon-hover/icon-hover";

import GoogleIcon from '../../assets/icon/google.png';
import './auth-page.css';

import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuths } from "../../hooks/raw/useAuths";
import { authConfigs } from "../../configs/authConfigs";

function AuthPage({ mode }) {
  const config = authConfigs[mode];
  if (!config) return null;

  const [formData, setFormData] = useState(
    Object.fromEntries(
      config.fields.map(f => [
        f.name,
        f.type === "select" && f.options.length > 0 ? f.options[0].value : ""
      ])
    )
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");

  const { login, forgotPassword, resetPassword } = useAuths({ setLoading, setError, setInfo });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "login") {
      console.log(formData);
      await login(formData);
      navigate("/dashboard");
    }

    if (mode === "forgot") {
      await forgotPassword({ email: formData.email });
    }

    if (mode === "reset") {
      await resetPassword({
        resetToken,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });
      navigate("/login");
    }
  };

  return (
    <div id={`auth-${mode}`} className="section-center">
      <div className="block w-full auth-section" style={{ maxWidth: "480px" }}>
        <div className="title mb-sm">{config.title}</div>
        {config.description && <p className="mb-md text-muted">{config.description}</p>}

        <form className="flex-col" onSubmit={handleSubmit}>
          {config.fields.map(f => {
            switch (f.type) {
              case "select":
                return (
                  <select
                    key={f.name}
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    required={f.required}
                    className="p-md border-rounded mb-sm"
                  >
                    {f.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                );

              case "checkbox":
                return (
                  <label key={f.name} className="checkbox-label mb-sm">
                    <input
                      type="checkbox"
                      name={f.name}
                      checked={formData[f.name]}
                      onChange={e => setFormData(prev => ({ ...prev, [f.name]: e.target.checked }))}
                    />
                    {f.label}
                  </label>
                );

              case "rememberMe":
              case "forgotPasswordLink":
                // These will be handled together below
                return null;

              case "loginWithGoogle":
              case "signUpLink":
                // handled separately below
                return null;

              default:
                return (
                  <input
                    key={f.name}
                    type={f.type}
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    required={f.required}
                    placeholder={f.label}
                    className="p-md border-rounded mb-sm"
                  />
                );
            }
          })}

          {/* Remember me + Forgot password in same line */}
          <div className="flex-between mb-md">
            {config.fields.find(f => f.type === "rememberMe") && (
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe || false}
                  onChange={e => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                />
                Remember me
              </label>
            )}
            {config.fields.find(f => f.type === "forgotPasswordLink") && (
              <a href={config.fields.find(f => f.type === "forgotPasswordLink").href} className="forgot-password-link">
                Forgot password?
              </a>
            )}
          </div>

          {/* Login button */}
          <button className="black-button p-md mb-sm w-full" type="submit">
            {config.submitText}
          </button>

          {/* Login with Google */}
          {config.fields.find(f => f.type === "loginWithGoogle") && (
            <div className="login-google p-md mb-sm">
              <IconHover src={GoogleIcon} allowHover={false} />
              <span>Login with Google</span>
            </div>
          )}

          {/* Sign up link */}
          {config.fields.find(f => f.type === "signUpLink") && (
            <a href={config.fields.find(f => f.type === "signUpLink").href} className="sign-up-link">
              {config.fields.find(f => f.type === "signUpLink").label}
            </a>
          )}
        </form>
      </div>

      {/* ----- Notifications ----- */}
      {loading && <Loading />}
      {error && <InfoBox title="Error" message={error} onClose={() => setError(null)} />}
      {info && <InfoBox title="Information" message={info} onClose={() => setInfo(null)} />}
    </div>
  );
}

export default AuthPage;
