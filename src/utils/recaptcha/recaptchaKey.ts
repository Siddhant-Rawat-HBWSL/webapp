let recaptchaKey = getRecapthcaKey();

/**
 * Retrieves the reCAPTCHA site key from the environment variables.
 */
function getRecapthcaKey() : string | undefined {
    return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
};

export default recaptchaKey;