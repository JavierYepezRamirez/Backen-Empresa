import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { check } from 'express-validator'
import multer from 'multer'
import {
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  getAllEmpelados,
  getEmpleadoById,
  getEmpleadoByRol,
  getEmpleadoByUsername
} from '../controllers/empleadoController.js'

const upload = multer ({ storage: multer.memoryStorage() })
const router = express.Router()

router.post(
  '/',
  //aqui va el middleware
  upload.single('imagen'),
  [
    check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    check('usuario').notEmpty().withMessage('El usuario es obligatorio'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña es de minimo 6 cracteres'),
  ],
  createEmpleado
)

router.put('/update/:id', authMiddleware, upload.single('imagen'), updateEmpleado )
router.delete('/delete/:id', authMiddleware, deleteEmpleado)
router.get('/', authMiddleware, getAllEmpelados)
router.get('/empleado/:id', authMiddleware, getEmpleadoById)
router.get('/rol/:rol', authMiddleware, getEmpleadoByRol)
router.get('/usuario/:usuario', authMiddleware, getEmpleadoByUsername)