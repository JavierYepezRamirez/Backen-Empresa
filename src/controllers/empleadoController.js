import EmpleadoService from '../services/empleadoService.js'
import { validationResult } from 'express-validator'

const EmpleadoService = new EmpleadoService()

const handleValidationErrors = ( req, res, next ) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()
    })
  }
  next()
}

const createEmpleado = async (req, res) => {
  handleValidationErrors(req)
  try{
    const empleadoId = await EmpleadoService.
    createEmpleado(req.body, req.file)
    res.status(201).json({
      messege: true,
      empleadoId
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const updateEmpleado = async (req, res) => {
  handleValidationErrors(req)
  try{
    const id = req.params.id
    await EmpleadoService.updateEmpleado(id, req.body, req.file)
    res.status(201).json({
      messege: true
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const delateEmpleado = async (req, res) => {
  handleValidationErrors(req)
  try{
    const id = req.params.id
    await empleadoService.delateEmpleado(id)
    res.status(201).json({
      messege: true
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getAllEmpleados = async (req, res) => {
  try{
    const empleados = await EmpleadoService.getAllEmpleados()
    res.status(201).json({
      messege: true,
      empleados
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getEmpleadoById= (req, res) => {
  handleValidationErrors(req)
  try{
    const id = req.params.id
    const empleado = empleadoService.getEmpleadoById(id)
    if(!empleado) {
      res.status(404).json({
        success: false,
        message: 'Empleado not Found💀'
      })
    }
    res.status(201).json({
      messege: true,
      empleado
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getEmpleadoByUsername= (req, res) => {
  handleValidationErrors(req)
  try{
    const username = req.params.username
    const empleado = empleadoService.getEmpleadoByUsername(username)
    if(!empleado) {
      res.status(404).json({
        success: false,
        message: 'Empleado not Found💀'
      })
    }
    res.status(201).json({
      messege: true,
      empleado
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getEmpleadoByRol= (req, res) => {
  handleValidationErrors(req)
  try{
    const rol = req.params.rol
    const empleado = empleadoService.getEmpleadoByRol(rol)
    if(!empleado) {
      res.status(404).json({
        success: false,
        message: 'Empleado not Found💀'
      })
    }
    res.status(201).json({
      messege: true,
      empleado
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export {
  createEmpleado,
  updateEmpleado,
  delateEmpleado,
  getAllEmpleados,
  getEmpleadoById,
  getEmpleadoByRol,
  getEmpleadoByUsername
}