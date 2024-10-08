import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import EmpleadoRepository from '../repositories/empleadoRepository.js'
import EmpleadoModel from '../models/EmpleadoModel.js'
import { sendPasswordResetEmail } from '../utlils/emailService.js'

const empleadoRepository = new EmpleadoRepository
const secret = process.env.JWT_SECRET
const saltRound = 10 

class EmpleadoService {
  async createEmpleado(datos, file) {
    const existEmpleado = await empleadoRepository.getEmpleadoByUsername(data.username)
    if (existEmpleado) {
      throw new Error('El username ya existe')
    }
    const hashedPass = await bcrypt.hash(data.password, saltRound)

    const newEmpleados = new EmpleadoModel (
      null,
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.direccion,
      data.telefono,
      data.ciudada,
      data.estado,
      data.username,
      hashedPass,
      data.rol,
      null
    )

    const empleadoId = await empleadoRepository.createEmpleado(newEmpleados)

    if(file) {
      const image = `${empleadoId}_image.peng`
      const imagePath = path.join('src', 'userImages', image)
      fs.writeFileSync(imagePath, file.buffer)
      await empleadoRepository.updateEmpleado(empleadoId, { imagen: image })
    }
  }

  async updateEmpleado (id, data, file) {
    const existEmpleado = await empleadoRepository.getEmpleadoById(id)
    if (!existEmpleado) {
      throw new Error('Empleado no encontrado')
    }

    if (data.password) {
      data.password =await bcrypt.hash(data.password,saltRound)
    }

    if (file) {
      const image = `${id}_image.png`
      const imagePath = path.join('src', 'userImages', image)
      fs.writeFileSync(image, file.buffer)
      data.imagen = image
    }

    await empleadoRepository.updateEmpleado(id, data)
  }

  async deleteEmpleado (id) {
    const existEmpleado = await empleadoRepository.getEmpleadoById(id)
    if (!existEmpleado) {
      throw new Error('Empleado no encontrado')
    }
    await empleadoRepository.deleteEmpleado(id)
  }

  async getAllEmpleados() {
    return await empleadoRepository.getAllEmpleados()
  }

  async getEmpleadoById (id) {
    return await empleadoRepository.getEmpleadoById(id)
  }

  async getEmpleadoByUsername (usuario) {
    return await empleadoRepository.getEmpleadoByUsername(usuario)
  }
  async getEmpleadoByRol (rol) {
    return await empleadoRepository.getEmpleadoByRol(rol)
  }

  async generatePasswordResetToken(usuario) {
    const existEmpleado = await empleadoRepository.getEmpleadoByUsername(usuario)

    if (!existEmpleado) {
      throw new Error ('Usuario no existe')
    }

    const token = jwt.sign({ id: existEmpleado.id }, secret, { expiresIn: '1h'})
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`

    await sendPasswordResetEmail(existEmpleado.usuario,resetUrl)
  }

  async resetPassword (token, newPassword) {
    try {
      const decode = jwt.verify(token, secret)
      const hashedPassword = await bcrypt.hash(newPassword, saltRound)
      await empleadoRepository.updateEmpleado(decode.id, {password: hashedPassword })
    } catch (error) {
      throw new Error('Token Invalido o Expirado')
    }
  }
}

export default EmpleadoService
