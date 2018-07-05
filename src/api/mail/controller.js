import { sendMail } from '../../services/sendgrid'

export const create = ({
  bodymen: {
    body: {
      email,
      data
    }
  }
}, res, next) => {
  console.log(email, data)
  console.log(typeof data)

  let bodyMail = ''
  // const parsedJSON = JSON.parse(data)
  if (typeof data === 'object') {
    Object.keys(data).map((key) => {
      let tempString = `<p> ${key} = ${data[key]} </p>`
      bodyMail = bodyMail.concat(tempString)
    })
  }  

  console.log(bodyMail)
  const content = `
        ${bodyMail}
      `
  sendMail({ toEmail: email, subject: 'ecomapss-api - Password Reset', content })
    .then((response) => response ? res.status(response.statusCode).end() : null)
    .catch(next)
}
