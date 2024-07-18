const jwt = require('jsonwebtoken');

const jwtMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(403)
      .send({ message: 'Se requiere autorización' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = await jwt.verify(token, process.env.SECRET_KEY);

    if (!payload) {
      return res.status(403).send({ message: 'El token no es valido' });
    }
    req.user = payload;
    next();
    return req.user;
  } catch (err) {
    console.log('error', err.toString());
    return res.status(403).send({ message: 'El token no es valido' });
  }
};

module.exports = { jwtMiddleware };