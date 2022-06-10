const crypto = require('crypto')

// var secret = crypto.randomBytes(32).toString('base64')
const token_jwt ={}

const main_header =
{
    "alg" : "HS256",
    "typ" : "JWT",
}

token_jwt.genSecretKey = function() {
	return crypto.randomBytes(16).toString('base64');
}

token_jwt.genToken =function(payload,secret) {
	var encodedHeaderInBase64 = base64UrlEncodeJSON(main_header)
	var encodedPayloadInBase64 = base64UrlEncodeJSON(payload)
	var encodedSignatureInBase64 = generateSignature(encodedHeaderInBase64+'.'+encodedPayloadInBase64, secret)
	return encodedHeaderInBase64+'.'+encodedPayloadInBase64+'.'+encodedSignatureInBase64	
	
}
token_jwt.isValid = function(token, secret) {
    var info = {
      state : false
    };
    const parts = token.split('.')
    const header = base64UrlDecodeToJSON(parts[0])
    const payload = base64UrlDecodeToJSON(parts[1])
    if (header.alg !== 'HS256' || header.typ !== 'JWT') {
      info.info ="header's invalid";
      return info
    }
    const signature = parts[2]
    const exp = payload.exp
    if (exp) {
      if (exp < new Date().getTime()) {
        info.info ="token expired";
        return info
      }
    }
    info.state = generateSignature(parts[0]+'.'+parts[1], secret) === signature
    info.info = "token's correct"
    return info
  }


token_jwt.get_payload = function(token, secret) {
  const parts = token.split('.')
  if(parts.length != 3)
    return false;
  else
    return payload = base64UrlDecodeToJSON(parts[1])
}

function payloadWithExpirationTime (payload, minutesFromNow) {
    let date = new Date()
    date.setMinutes(date.getMinutes() + minutesFromNow)
    payload.exp = date.getTime()
    return payload
  } 

function base64UrlEncodeJSON (json) {
    return Buffer.from(
      JSON.stringify(json)
    ).toString('base64')
     .replace(/\+/g, '-')
     .replace(/\//g, '_')
  }


function generateSignature (str, secret) {
	return crypto
		.createHmac('sha256', secret)
		.update(str)
		.digest('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
}

function base64UrlDecodeToJSON (str) {
	return JSON.parse(
		Buffer.from(
		str.replace(/-/g, '+').replace(/_/g, '/'), 'base64'
		).toString('utf8')
	)
}


module.exports = token_jwt