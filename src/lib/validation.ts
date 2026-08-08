export function validatePassword(password: string, confirm: string): string | null {
    if (password.length < 8) {
        return 'Password must be at least 8 characters.'
    }
    if (password !== confirm) {
        return 'Passwords do not match.'
    }
    return null
}


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email: string): boolean {
    return EMAIL_REGEX.test(email)
}

export function validateSignUpFields(first: string, last: string, email: string, password: string, confirm: string): string | null {
    if (!first?.trim() || !last?.trim() || !email?.trim() || !password || !confirm) {
        return 'Please fill in all fields.'
    }
    if (!validateEmail(email.trim())) {
        return 'Please enter a valid email address.'
    }
    return validatePassword(password, confirm)
}

export function validateLoginFields(email: string, password: string): string | null {
    if (!email?.trim() || !password) {
        return 'Please fill in all fields.'
    }
    if (!validateEmail(email.trim())) {
        return 'Please enter a valid email address.'
    }
    return null
}