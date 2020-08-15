const jwt = require('jsonwebtoken');


module.exports = function async (req, res, next) {
        try{

        const decodedToken = jwt.verify(
          req.cookies.token,
          'aTk0M3F5NXR1Zzh3cmlwZXN0amYyOTgzNHdpb1tldTVyanFmY2lwcmVkeGdudnJtY2llYWsnd2x3'
        );

        if (decodedToken) {
            req.id = decodedToken.data.identifier;
            next()
        } else {
            return res.boom.unauthorized()
        }

        } catch(e){
            return res.boom.unauthorized()
        }
}
