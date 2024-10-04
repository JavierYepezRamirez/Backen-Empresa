import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { defaultMaxListeners } from 'nodemailer/lib/mailer'
dotenv.config()

const transpoRter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendPasswordResetEmail = async (email, resetURL) => {
  await transpoRter.sendMail ({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Restablece Contraseña',
    html: 
    `
      <p>Haga click en el link para resetear su password 😍 <a href="${resetURL}">Restablecer</a>
      </p>
    `
  })
}