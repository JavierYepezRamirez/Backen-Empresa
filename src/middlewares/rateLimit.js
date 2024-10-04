import { RateLimiterMemory } from "rate-limiter-flexible"

 const rateLimite = new RateLimiterMemory({
  points: 5,
  duration: 1 
})

const rateLimitMiddleware = (req, res, next) => {
  rateLimite.consume(req.ip)
    .then(() => {
      next()
    })
    .catch(() => {
      res.status(429).json({
        message: 'Muchas peticiones... no la jodas😒'
      })
    })
}

export default rateLimitMiddleware