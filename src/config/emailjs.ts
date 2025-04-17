const env = import.meta.env || {};

const emailjsConfig = {
    service_id  : env.VITE_EMAILJS_SERVICE_ID,
    template_id : env.VITE_EMAILJS_TEMPLATE_ID,
    options     : {publicKey : env.VITE_EMAILJS_PUBLIC_KEY,}
}

export { emailjsConfig }

