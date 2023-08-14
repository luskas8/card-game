import { Router } from 'express'
import logger from './logger.js'

const router = Router()

router.get('/health', async (req, res) => {
    logger.warn('Health check')
    res.json({ status: 200, message: 'Server online!' })
})

router.get('/', async (req, res) => {
    res.redirect(308, '/health')
})

export default router