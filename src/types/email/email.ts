class Email {
    to: string
    from: string | undefined
    subject: string
    text: string
    constructor(to : string, from = process.env.SMTP_USER || undefined, subject : string, text : string){
        this.to = to
        this.from = from
        this.subject = subject
        this.text = text
    }
}

export default Email