import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Lightweight validation (replaces the old Mongoose schema validation)
function validate({ fullname, email, message }) {
    const errors = [];

    if (!fullname || fullname.trim().length < 2) {
        errors.push("Name must be longer than 2 characters.");
    }
    if (fullname && fullname.trim().length > 50) {
        errors.push("Name must be shorter than 50 characters.");
    }
    if (!email || !/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i.test(email)) {
        errors.push("Please enter a valid email address.");
    }
    if (!message || message.trim().length === 0) {
        errors.push("Message cannot be empty.");
    }

    return errors;
}

export async function POST(req) {
    const { fullname, email, message } = await req.json();

    const errors = validate({ fullname, email, message });
    if (errors.length > 0) {
        return NextResponse.json({ msg: errors, success: false });
    }

    try {
        await resend.emails.send({
            // onboarding@resend.dev works without verifying a domain.
            // Once your own domain is verified on Resend, switch this to e.g.:
            // from: "Portfolio <noreply@yourdomain.com>"
            from: "Portfolio <onboarding@resend.dev>",
            to: process.env.CONTACT_TO_EMAIL,
            replyTo: email,
            subject: `New message from ${fullname} (Portfolio Contact Form)`,
            text: `Name: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>New message from the portfolio contact form</h2>
                    <p><strong>Name:</strong> ${fullname}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, "<br/>")}</p>
                </div>
            `,
        });

        return NextResponse.json({
            msg: ["Your message was sent successfully!"],
            success: true,
        });
    } catch (error) {
        console.error("Failed to send email:", error);
        return NextResponse.json({
            msg: ["Couldn't send your message. Please try again later."],
            success: false,
        });
    }
}
